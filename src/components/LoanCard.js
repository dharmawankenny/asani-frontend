import React from 'react';
import styled from 'styled-components';

import { flex } from '../commons/theme';

import ClockIcon from '../assets/clock.svg';
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
          <h2><img src={ClockIcon} />3 Hari Lagi</h2>
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
  ${flex({ justify: 'flex-start', align: 'stretch' })}
`;

const LoanProduct = styled.div`
  width: calc(17.5% - 0.5rem);
  ${flex({ direction: 'column' })}

  img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
    margin: 0 0 0.25rem;
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
    margin: 0;
    color: ${props => props.theme.color.G300};
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
    margin: 0 0 0.125rem;
  }

  h3 {
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0 0 0.5rem;
    color: ${props => props.theme.color.N300};
  }
`;

const LoanPayment = styled.div`
  width: calc(37.5% - 0.5rem);
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
    ${flex({ justify: 'flex-start' })}

    img {
      width: 0.875rem;
      height: 0.875rem;
      object-fit: contain;
      margin: 0 0.25rem 0 0;
    }
  }

  h3 {
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0 0 0.25rem;
    color: ${props => props.theme.color.N300};
  }
`;
