import { Container, Row, Col } from 'react-bootstrap';

import { ProfileDropdown, LogoutLink } from '@components/users';

export default function Head() {
  return (
    <Container>
      <Row className='my-2'>
        <Col xs={3}>
          <ProfileDropdown />
        </Col>
        <Col xs={6}>
          <h1 className="text-center">Tic Tac Toe Plus</h1>
        </Col>
      </Row>
    </Container>
  )
}