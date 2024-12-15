import { Container, Row, Col } from 'react-bootstrap';

import { useAuth } from '@providers/authProvider';
import { Figure } from '@components/game-sessions';
import Spinner from '@components/Spinner';

export default function Players({ playersData }) {
  let currentPlayer, opponent;
  const { currentUser } = useAuth();

  playersData.forEach(player => {
    if (player.id === currentUser.id) return currentPlayer = player;
    opponent = player;
  });

  return (
    <Container>
      <Row className='my-2 by-1'>
        <Col xs={1}>
          <Figure value={currentPlayer.figure} />
        </Col>
        <Col xs={4}>
          <h2 className="m-0">You</h2>
        </Col>
        <Col xs={2}>
          <h3 className="text-center">VS</h3>
        </Col>
        {opponent ? (
          <>
            <Col xs={4}>
              <h2 className="m-0 text-right">Opponent#{opponent.id}</h2>
            </Col>
            <Col xs={1}>
              <Figure value={opponent.figure} />
            </Col>
          </>
        ) : (
          <>
            <Col xs={4}>
              <h2 className="m-0 text-end">Waiting...</h2>
            </Col>
            <Col xs={1}>
              <h2><Spinner /></h2>
            </Col>
          </>
        )}
      </Row>
    </Container >
  )
}