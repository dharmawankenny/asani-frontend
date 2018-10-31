import React from 'react';
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

export default class LoanHistory extends React.Component {
  render() {
    return (
      <PageWrapper>
        <Header withMenu />
        <History>
          <FullSegmentHeader>Riwayat Peminjaman</FullSegmentHeader>
          <SegmentDescription>Berikut adalah daftar peminjaman yang sudah atau sedang kamu lakukan</SegmentDescription>
          <LoanCard />
          <LoanCard />
          <LoanCard />
          <LoanCard />
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
      margin: 1rem 0;
    }

    &:last-of-type {
      margin: 0;
    }
  }
`;
