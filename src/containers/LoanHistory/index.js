import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { navigate } from '@reach/router';

import SITEMAP from '../../commons/sitemap';
import { flex } from '../../commons/theme';

import { BigActionButton } from '../../components/Buttons';
import Header from '../../components/Header';
import LoanCard from '../../components/LoanCard';
import {
  PageWrapper,
  SegmentContext,
  SegmentHeader,
  FullSegmentHeader,
  SegmentAction,
  SegmentDescription,
  SpinnerWrapper,
} from '../../components/PageBuilder';
import Spinner from '../../components/Spinner';

import * as loanActions from '../../reducers/loan';

@connect(
  state => ({ loan: state.loan }),
  dispatch => ({
    loanActions: bindActionCreators(loanActions, dispatch),
  })
)
export default class LoanHistory extends React.Component {
  componentDidMount() {
    if (!this.props.loan.loading && !this.props.loan.loaded) {
      this.props.loanActions.getLoans();
    }
  }

  render() {
    return (
      <PageWrapper>
        <Header withMenu />
        <History>
          <FullSegmentHeader>Riwayat Peminjaman</FullSegmentHeader>
          <SegmentDescription>Berikut adalah daftar peminjaman yang sudah atau sedang kamu lakukan</SegmentDescription>
          {this.props.loan.loading && (
            <SpinnerWrapper>
              <Spinner color="N800" />
            </SpinnerWrapper>
          )}
          {this.props.loan.loaded &&
            this.props.loan.loans &&
            this.props.loan.loans.length > 0 &&
            this.props.loan.loans.map(loan => <LoanCard loan={loan} />)}
          {this.props.loan.loaded &&
            this.props.loan.loans &&
            this.props.loan.loans.length === 0 && (
              <EmptyWrapper>
                Anda belum pernah melakukan pinjaman, ajukan pinjaman sekarang juga dan naikan skor kredit anda!
              </EmptyWrapper>
            )}
        </History>
      </PageWrapper>
    );
  }
}

const History = styled.div`
  width: 100%;
  ${flex()}
  margin: 3rem 0 0;

  & > button {
    margin: 0 0 1rem;

    &:first-of-type {
      margin-top: 1rem;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;
