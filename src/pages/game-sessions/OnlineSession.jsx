import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Games, Players } from '@components/game-sessions';
import { useAuth } from '@providers/authProvider';
import { JoinRequest } from '@requests/game-sessions';
import { JoinForm } from '@components/game-sessions';

const Code = styled.code`
  font-size: 20px;
  padding: 10px;
  border-radius: 4px;
  background-color: #ced4db;
`

export default function OnlineSession() {
  const [session, setSession] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { axiosUnauthorized } = useAuth();
  const [unauthorized, setUnauthorized] = useState(axiosUnauthorized());

  const { state } = useLocation();
  let secret;
  if (state) secret = state.secret;

  useEffect(() => {
    if (!secret) {
      setError('No Game secret');
      setLoading(false);
      return;
    }
    if (unauthorized) {
      setTimeout(() => {
        setUnauthorized(axiosUnauthorized());
      }, 200);
      return;
    }

    JoinRequest(secret).then((result) => {
      if (result.status) {
        const newSession = result.session.data.attributes;
        newSession.nextMoveValue = newSession.lastMove && (newSession.lastMove.value + 1) % 2;
        setSession(newSession);
      } else {
        setError(result.message);
      }
      setLoading(false);
    })
  }, [secret, unauthorized, axiosUnauthorized]);

  return (
    <Container>
      {loading ? (
        <Row>
          <Col xs={12}>
            <span>Loading ...</span>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col xs={12}>
              <div>
                <span className="text-danger">{error}</span>
              </div>
            </Col>
          </Row>

          {session ? (
            <>
              <Row>
                <Col xs={12}>
                  <Players playersData={session.players} secret={secret} />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  {(session.players.length > 1) ? (
                    <Games initSession={session} />
                  ) : (
                    <div className="text-center">
                      <h2>Ask your friend to join with:</h2>
                      <Code>{secret}</Code>
                    </div>
                  )}
                </Col>
              </Row>
            </>
          ) : (
            <Row>
              <div>
                <span className="text-danger">Try again:</span>
              </div>
              <JoinForm />
            </Row>
          )}
        </>
      )}

    </Container>
  );
}