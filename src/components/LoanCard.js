import React from 'react';
import styled from 'styled-components';

import { flex } from '../commons/theme';

import DummyIcon from '../assets/cash.svg';

export default class LoanCard extends React.Component {
  render() {
    return (
      <Wrapper>
        <LoanProduct>
          <img src={DummyIcon} />
          <span>Cair</span>
        </LoanProduct>
        <LoanDetail>
          <h2>Loan Provider</h2>
          <h3>Product Name</h3>
          <h1>Rp X.XXX.XXX</h1>
        </LoanDetail>
        <LoanPayment>
          <h3>Jatuh Tempo</h3>
          <h2>3 Hari Lagi</h2>
          <h1>Lunaskan ></h1>
        </LoanPayment>
      </Wrapper>
    );
  }
}

const Wrapper = styled.button`
  width: 100%;
  background: ${props => props.theme.color.N0};
  box-shadow: ${props => props.theme.shadow.base};
  border-radius: ${props => props.theme.borderRadius};
  padding: 0.75rem;
  ${flex({ justify: 'flex-start', align: 'flex-start' })}
`;

const LoanProduct = styled.div`
  width: calc(20% - 0.5rem);
  ${flex()}

  img {
    width: 2.5rem;
    height: auto;
    margin: 0 0 0.5rem;
  }

  span {
    font-size: 0.75rem;
    padding: 0.125rem;
    width: 100%;
    ${flex()}
    border: 1px solid ${props => props.theme.color.G200};
    border-radius: ${props => props.theme.borderRadius};
    color: ${props => props.theme.color.G200};
  }
`;

const LoanDetail = styled.div`
  width: calc(45% - 1rem);
  margin: 0 1rem;
  ${flex()}

  h1,
  h2,
  h3 {
    width: 100%;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${props => props.theme.color.N800};
  }

  h1 {
    font-size: 0.875rem;
    font-weight: 700;
    margin: 0;
  }

  h2 {
    font-size: 0.875rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
  }

  h3 {
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0 0 1rem;
    color: ${props => props.theme.color.N300};
  }
`;

const LoanPayment = styled.div`
  width: calc(35% - 0.5rem);
  ${flex()}

  h1,
  h2,
  h3 {
    width: 100%;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${props => props.theme.color.N800};
  }

  h1 {
    font-size: 0.875rem;
    text-align: center;
    padding: 0.25rem;
    margin: 0;
    color: ${props => props.theme.color.N0};
    background: ${props => props.theme.color.mainProductBlue};
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: ${props => props.theme.shadow.base};
  }

  h2 {
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0 0 0.5rem;
  }

  h3 {
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0 0 0.25rem;
    color: ${props => props.theme.color.N300};
  }
`;
