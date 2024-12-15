import { Container, Row, Col } from 'react-bootstrap';

import { LoginForm } from '@components/users';


export default function Login() {
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={8} md={6} lg={4}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};
