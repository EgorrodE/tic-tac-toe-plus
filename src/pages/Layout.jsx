import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import { Head } from '@components/layout';

const ContainerWrapper = styled.div`
  max-width: 80vh;
`;

export default function Layout() {
  return (
    <ContainerWrapper className='mx-auto'>
      <Container >
        <Head />

        <Outlet />
      </Container>
    </ContainerWrapper>
  )
}