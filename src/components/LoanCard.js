import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment-timezone';

import { flex } from '../commons/theme';
import { printPrice } from '../commons/utils';

import ClockIcon from '../assets/clock.svg';
import DummyIcon from '../assets/cash.svg';

const STATUS_COLOR_MAP = [
  'Y300',
  'G300',
  'R300',
  'G300',
];

export default class LoanCard extends React.Component {
  static propTypes = {
    loan: PropTypes.shape({
      createTime: PropTypes.string,
      disburseTime: PropTypes.string,
      dueTime: PropTypes.string,
      interestPct: PropTypes.string,
      isSyariah: PropTypes.number,
      lenderName: PropTypes.string,
      loanId: PropTypes.number,
      note: PropTypes.string,
      paymentTime: PropTypes.string,
      productPrice: PropTypes.number,
      productType: PropTypes.string,
      status: PropTypes.shape({
        status: PropTypes.number,
        description: PropTypes.string,
      }),
      tenorDays: PropTypes.number,
      urlProductLogo: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    loan: {
      status: {
        status: 2,
      },
    },
  };

  render() {
    const {
      createTime,
      disburseTime,
      dueTime,
      interestPct,
      isSyariah,
      lenderName,
      loanId,
      note,
      paymentTime,
      productPrice,
      productType,
      status,
      tenorDays,
      urlProductLogo,
    } = this.props.loan;

    return (
      <Wrapper>
        <LoanProduct color={STATUS_COLOR_MAP[Number(status.status)]}>
          <img src={urlProductLogo} />
          <span>{status.description}</span>
        </LoanProduct>
        <LoanDetail>
          <h2>{lenderName}</h2>
          <h3>{productType}</h3>
          <h1>{printPrice(productPrice)}</h1>
        </LoanDetail>
        <LoanPayment>
          {Number(status.status) === 0 && (
            <Fragment>
              <h4>Peminjaman anda sedang diproses oleh tim kami, mohon menunggu</h4>
            </Fragment>
          )}
          {Number(status.status) === 2 && (
            <Fragment>
              <h3>Alasan</h3>
              <h4>{note}</h4>
            </Fragment>
          )}
          {(Number(status.status) !== 0 && Number(status.status) !== 2) && (
            <Fragment>
              <h3>Jatuh Tempo</h3>
              <h2><img src={ClockIcon} />{moment(dueTime).fromNow()}</h2>
              <h1>Lunaskan ></h1>
            </Fragment>
          )}
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
    color: ${props => props.theme.color[props.color]};
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

  h4 {
    width: 100%;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1.25;
    margin: 0;
    text-align: left;
    color: ${props => props.theme.color.N500};
    text-transform: capitalize;
  }
`;
