import React, { useState, useEffect, useRef } from 'react';
import { cloneDeep, get, set, isEqual } from 'lodash';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';

import Game from './game';
import { initGames, initValue, crossValue, circleValue, fieldsCount, winGames } from '../data/constants';

const ContainerWrapper = styled.div`
  max-width: 80vh;
`

export default function Games() {
  const [gamesValues, setGamesValues] = useState(cloneDeep(initGames));
  const [moves, setMoves] = useState([]);
  const [availableGame, setAvailableGame] = useState(false);
  const [nextMoveValue, setNextMoveValue] = useState(crossValue);
  const [globalGamesValue, setGlobalGamesValue] = useState(initValue);

  const restart = () => {
    setGamesValues(cloneDeep(initGames));
    setMoves([]);
    setAvailableGame(false);
    setNextMoveValue(crossValue);
    setGlobalGamesValue(initValue);
  }

  const isCrossMove = () => nextMoveValue === crossValue;
  const isGlobalWin = () => globalGamesValue !== initValue;
  const isGameAvailable = (rowIndex, gameIndex) => (
    !isGlobalWin() && (!availableGame || (availableGame[0] === rowIndex && availableGame[1] === gameIndex))
  )
  const hasLastMove = (rowIndex, gameIndex) => {
    if (moves.length <= 0) return false;

    const lastMove = moves[moves.length - 1].path;
    return lastMove[0] === rowIndex && lastMove[1] === gameIndex && lastMove.slice(3, 5);
  }

  const isMoveValid = (path) => {
    const gamePath = path.slice(0, 2);
    const gameValue = get(gamesValues, [...gamePath, 'globalValue']);
    if (gameValue !== initValue) return false;

    let fieldValue = get(gamesValues, path);
    if (fieldValue !== initValue) return false;

    if (moves.length <= 0) return true;

    const lastMove = moves[moves.length - 1];
    const lastMoveFieldPath = lastMove.path.slice(3, 5);
    const lastMoveGameValue = get(gamesValues, lastMoveFieldPath).globalValue
    return lastMoveGameValue !== initValue || isEqual(gamePath, lastMoveFieldPath);
  }

  const gameToBinaryMoves = (gameValues) => {
    let crossMoves = 0;
    let circleMoves = 0;
    gameValues.forEach((gameRow, rowIndex) => {
      gameRow.forEach((fieldValue, fieldIndex) => {
        const increment = Math.pow(2, rowIndex * fieldsCount + fieldIndex);
        if (fieldValue === crossValue) crossMoves += increment;
        if (fieldValue === circleValue) circleMoves += increment;
      })
    });

    return { crossMoves, circleMoves };
  };

  const globalGamesValueAfterMove = (newValues) => {
    const gamesGlobalValues = newValues.map((gameRow) => (
      gameRow.map((game) => game.globalValue)
    ));
    return gameValueAfterMove(gamesGlobalValues);
  }

  const gameValueAfterMove = (gameValues) => {
    const { crossMoves, circleMoves } = gameToBinaryMoves(gameValues);
    const gameBinaryMoves = isCrossMove() ? crossMoves : circleMoves;
    if (winGames.some((winGame) => winGame === (winGame & gameBinaryMoves))) {
      return isCrossMove() ? crossValue : circleValue;
    }
    return initValue;
  }

  const nextAvailableGame = (newValues, path) => {
    const fieldPath = path.slice(3, 5);
    return get(newValues, [...fieldPath, 'globalValue']) === initValue && fieldPath;
  }

  const onFieldClick = (path) => {
    if (!isMoveValid(path)) return;

    const newValues = cloneDeep(gamesValues);
    set(newValues, path, nextMoveValue);

    const newGameValue = gameValueAfterMove(get(newValues, [...path.slice(0, 2), 'values']));
    if (newGameValue !== initValue) {
      set(newValues, [...path.slice(0, 2), 'globalValue'], newGameValue);
      setGlobalGamesValue(globalGamesValueAfterMove(newValues));
    }
    setGamesValues(newValues);
    setMoves([...moves, { path, value: nextMoveValue }]);
    setAvailableGame(nextAvailableGame(newValues, path));
    setNextMoveValue(isCrossMove() ? circleValue : crossValue);
  };

  const [availableWidth, setAvailableWidth] = useState(0);
  const containerRef = useRef(null);
  useEffect(() => {
    setAvailableWidth(containerRef.current ? containerRef.current.offsetWidth : 0);
  }, [containerRef]);

  return (
    <ContainerWrapper className='mx-auto'>
      <Container>
        <Row className="mb-2">
          <Col xs={8}>
            <h2 className="text-start">
              {isCrossMove() ? 'Cross' : 'Circle'} {isGlobalWin() ? 'wins!' : 'makes a move.'}
            </h2>
          </Col>
          <Col xs={4} className="text-end">
            <Button className="btn btn-primary" onClick={restart}>Restart</Button>
          </Col>
        </Row>
      </Container>
      <Container ref={containerRef}>
        {gamesValues.map((rowValues, rowIndex) => (
          <Row key={rowIndex}>
            {rowValues.map((game, gameIndex) => (
              <Game
                values={game.values}
                globalValue={game.globalValue}
                rowIndex={rowIndex}
                gameIndex={gameIndex}
                onFieldClick={onFieldClick}
                availableGamesWidth={availableWidth}
                key={gameIndex}
                available={isGameAvailable(rowIndex, gameIndex)}
                lastMove={hasLastMove(rowIndex, gameIndex)}
              />
            ))}
          </Row>
        ))}
      </Container>
    </ContainerWrapper>
  );
}