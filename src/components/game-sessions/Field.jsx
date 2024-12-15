import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

import { initValue } from '@data/constants';

import Figure from './Figure';

const BorderedDiv = styled(Col)`
  box-sizing: border-box;
  border-width: 2px !important;
  ${({ height }) => `
    height: ${height}px;
  `}

  &.available {
    cursor: pointer;
    background-color: rgba(25, 135, 84, 0.4);

    &:hover {
      background-color: rgba(233, 236, 239, 0.3);
    }
  }
  &.last-move {
    background-color: rgb(13, 110, 253, 0.5);
  }
`;

export default function Field({
  value,
  fieldRowIndex,
  fieldIndex,
  onFieldClick,
  available,
  isLastMove,
}) {
  const [availableWidth, setAvailableWidth] = useState(0);
  const containerRef = useRef(null);
  useEffect(() => {
    setAvailableWidth(containerRef.current ? containerRef.current.offsetWidth : 0);
  }, [containerRef]);

  const className = () => {
    let result = 'p-0 border-dark';
    if (fieldIndex !== 0) result += ' border-start';
    if (fieldRowIndex !== 0) result += ' border-top';
    if (available && !value) result += ' available';
    if (isLastMove) result += ' last-move';
    return result;
  }

  return (
    <BorderedDiv
      className={`${className()}`}
      height={availableWidth}
      ref={containerRef}
      xs={4}
      onClick={() => onFieldClick([fieldRowIndex, fieldIndex])}
    >
      {value !== initValue && <Figure value={value} />}
    </BorderedDiv>
  );
}