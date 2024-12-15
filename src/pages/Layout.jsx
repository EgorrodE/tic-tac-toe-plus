import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { Head } from '@components/layout';

export default function Layout() {
  return (
    <>
      <Container >
        <Head />

        <Outlet />
      </Container>
    </>
  )
}