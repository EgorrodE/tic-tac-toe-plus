import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import Field from './field';
import { initValue } from '../data/constants';
import figureNameByValue from '../services/figureNameByValue';

const BorderedDiv = styled(Col)`
  position: relative;
  border-width: 4px !important;
  ${({ height }) => `
    height: ${height}px;
  `}
  &.available {
    background-color: rgba(25, 135, 84, 0.4);
  }

  .global-image{
    opacity: 0.7;

    &:hover {
      opacity: 0.2;
    }
  }
`;

export default function Game({ values, globalValue, rowIndex, gameIndex, onFieldClick, available, lastMove }) {
  const figureName = figureNameByValue(globalValue);

  const isFieldAvailable = (fieldValue) => (globalValue === initValue && available && fieldValue === initValue);
  const isLastMove = (fieldRowIndex, fieldIndex) => (
    lastMove && lastMove[0] === fieldRowIndex && lastMove[1] === fieldIndex
  );

  const [availableWidth, setAvailableWidth] = useState(0);
  const containerRef = useRef(null);
  useEffect(() => {
    setAvailableWidth(containerRef.current ? containerRef.current.offsetWidth : 0);
  }, [containerRef]);

  const onFieldClickWrapper = (path) => onFieldClick([rowIndex, gameIndex, 'values', ...path]);
  const className = () => {
    let result = 'position-relative p-2 p-sm-3 p-md-4 border-dark';
    if (gameIndex !== 0) result += ' border-start';
    if (rowIndex !== 0) result += ' border-top';
    if (available && !globalValue) result += ' available';
    return result;
  }

  return (
    <BorderedDiv
      className={`${className()}`}
      height={availableWidth}
      ref={containerRef}
      xs={4}
    >
      {values.length > 0 && values.map((rowValues, fieldRowIndex) => (
        <Row key={fieldRowIndex} className="m-0">
          {rowValues.map((fieldValue, fieldIndex) => (
            <Field
              key={fieldIndex}
              value={fieldValue}
              gameRowIndex={rowIndex}
              gameIndex={gameIndex}
              fieldRowIndex={fieldRowIndex}
              fieldIndex={fieldIndex}
              onFieldClick={onFieldClickWrapper}
              available={isFieldAvailable(fieldValue)}
              isLastMove={isLastMove(fieldRowIndex, fieldIndex)}
            />
          ))}
        </Row>
      ))}
      {figureName && (
        <div className="global-image position-absolute w-100 h-100 top-0 start-0">
          <img src={`${figureName}.svg`} alt={`${figureName}`} className="w-100 h-100" />
        </div>
      )}
    </BorderedDiv>
  );
}