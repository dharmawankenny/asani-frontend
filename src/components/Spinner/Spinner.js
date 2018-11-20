import React from 'react';
import styled from 'styled-components';

const Spinner = ({ color }) => (
  <SpinnerWraper color={color}>
    <div />
    <div />
    <div />
    <div />
  </SpinnerWraper>
);

const SpinnerWraper = styled.div`
  display: inline-block;
  position: relative;
  width: 5rem;
  height: 0.75rem;

  div {
    position: absolute;
    top: 0;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: ${props => props.theme.color[props.color]};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
      left: 0.5rem;
      animation: lds-ellipsis1 0.6s infinite;
    }

    &:nth-child(2) {
      left: 0.5rem;
      animation: lds-ellipsis2 0.6s infinite;
    }

    &:nth-child(3) {
      left: 2rem;
      animation: lds-ellipsis2 0.6s infinite;
    }

    &:nth-child(4) {
      left: 3.5rem;
      animation: lds-ellipsis3 0.6s infinite;
    }
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {;
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(1.5rem, 0);
    }
  }
`;

export default Spinner;
