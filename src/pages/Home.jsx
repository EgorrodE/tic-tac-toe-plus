import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceSix, faDice } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '@providers/authProvider';
import { JoinForm, CreateButton } from '@components/game-sessions';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Link to="/local-game" className="btn btn-primary btn-lg w-100">
            <FontAwesomeIcon icon={faDiceSix} />
            {' '}
            Play on one device
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2 className="text-center">OR</h2>
        </Col>
      </Row>
      {currentUser ? (
        <>
          <Row>
            <Col xs={12}>
              <CreateButton />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2 className="text-center">OR</h2>
            </Col>
          </Row>
          <Row>
            <JoinForm />
          </Row>
        </>
      ) : (
        <Row>
          <Col xs={12} className="text-center">
            <Link to="/login">Log in</Link>
            {' '}
            to play with online opponent
          </Col>
        </Row>
      )}
    </Container>
  );
}