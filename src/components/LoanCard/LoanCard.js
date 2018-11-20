import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment-timezone';

import { flex } from '../../commons/theme';
import { printPrice } from '../../commons/utils';

import ClockIcon from '../../assets/clock.svg';
import DummyIcon from '../../assets/cash.svg';

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
      paymentMethod,
      totalBill,
      productNominal,
      status,
      tenorDays,
      urlProductLogo,
    } = this.props.loan;

    const dueTimeString = moment(dueTime).fromNow();

    return (
      <Wrapper onClick={this.props.onClick} id="asani-actions-view-loan-detail">
        <LoanHeader color={status.color}>
          <span>{status.description}</span>
        </LoanHeader>
        <LoanProduct>
          <img src={urlProductLogo} />
        </LoanProduct>
        <LoanDetail>
          <h1>{productNominal}</h1>
          <h2>{printPrice(totalBill)}</h2>
          <h3>oleh {lenderName}</h3>
        </LoanDetail>
        <LoanPayment color={status.color}>
          {Number(status.status) === 0 && (
            <h5>{note ? note : 'Dalam proses verifikasi maksimal 30 menit pada hari dan jam kerja.'}</h5>
          )}
          {Number(status.status) === 2 && (
            <Fragment>
              <h3>Alasan</h3>
              <h6>{note ? note : 'Catatan belum tersedia'}</h6>
            </Fragment>
          )}
          {Number(status.status) === 3 && (
            <Fragment>
              <h3>Lunas Pada</h3>
              <h4>{moment(paymentTime).format('DD MMM YYYY')}</h4>
              <span>Melalui {paymentMethod}</span>
            </Fragment>
          )}
          {(Number(status.status) > 0 && Number(status.status) < 2) && (
            <Fragment>
              <h3>Jatuh Tempo</h3>
              <h2>{`${dueTimeString.charAt(0).toUpperCase()}${dueTimeString.slice(1)}`}</h2>
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
  ${flex({ justify: 'flex-start' })}
`;

const LoanHeader = styled.div`
  width: calc(100% + 1.5rem);
  margin: -0.75rem -0.75rem 0.5rem;
  padding: 0.375rem 0.75rem;
  color: ${props => props.theme.color.N0};
  background: ${props => props.color};
  ${flex({ justify: 'flex-start' })}
  border-radius: ${props => props.theme.borderRadius} ${props => props.theme.borderRadius} 0 0;
  pointer-events: none;

  span {
    font-size: 0.825rem;
    font-weight: 700;
    text-align: left;
  }
`;

const LoanProduct = styled.div`
  width: calc(15% - 0.5rem);
  ${props => props.locked && 'filter: grayscale(100%);'}
  ${flex({ direction: 'column' })}
  pointer-events: none;

  img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
    margin: 0 0 0.25rem;
  }
`;

const LoanDetail = styled.div`
  width: calc(45% - 0.75rem);
  margin: 0 1rem 0 1.25rem;
  ${flex()}
  pointer-events: none;

  h1,
  h2,
  h3 {
    width: 100%;
    text-align: left;
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
    margin: 0.25rem 0 0.125rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  h3 {
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${props => props.theme.color.N300};
  }
`;

const LoanPayment = styled.div`
  width: calc(40% - 1rem);
  ${flex()}
  pointer-events: none;

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
    font-weight: 700;

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

  h4,
  h5,
  h6 {
    width: 100%;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.25;
    margin: 0;
    text-align: left;
    text-transform: capitalize;
    color: ${props => props.color};
  }

  h4 {
    font-size: 0.875rem;
    font-weight: 700;
  }

  span {
    width: 100%;
    font-size: 0.65rem;
    line-height: 1.125;
    text-align: left;
    margin: 0.125rem 0 0;
    color: ${props => props.theme.color.N300};
  }
`;
