import React from 'react';
import styled from 'styled-components';

import { flex } from '../../commons/theme';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import LoanCard from '../../components/LoanCard';
import { PageWrapper } from '../../components/PageBuilder';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';

import { Consumer as AuthConsumer } from '../../contexts/auth';

export default class Home extends React.Component {
  render() {
    return (
      <PageWrapper>
        <Header withMenu />
        <CreditScoreSummary>
          <SegmentContext>
            <SegmentHeader>Skor kredit kamu</SegmentHeader>
            <SegmentAction>Info lebih lanjut ></SegmentAction>
          </SegmentContext>
          {/* <SpinnerWrapper>
            <Spinner color="N800" />
          </SpinnerWrapper> */}
          <h1>550</h1>
          <h2>Cukup Baik</h2>
          <div className="progress">
            <div className="bg" />
            <div className="bar" />
          </div>
        </CreditScoreSummary>
        <Loans>
          <SegmentContext>
            <SegmentHeader>Pinjaman aktif kamu</SegmentHeader>
            <SegmentAction>Riwayat Pinjaman ></SegmentAction>
          </SegmentContext>
          <LoanCard />
          <LoanCard />
        </Loans>
        <Loans>
          <BigSegmentHeader>Pinjaman terbaik untuk kamu</BigSegmentHeader>
          <SegmentContext>
            <SegmentHeader>Pinjaman pilihan pasti cair</SegmentHeader>
          </SegmentContext>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <SegmentContext>
            <DividerSegmentHeader>Naikan skor kredit kamu dan buka kesempatan membuka pinjaman dibawah ini</DividerSegmentHeader>
          </SegmentContext>
          <ProductCard locked />
          <ProductCard locked />
          <ProductCard locked />
        </Loans>
      </PageWrapper>
    );
  }
}

const SegmentContext = styled.div`
  width: 100%;
  ${flex({ justify: 'flex-start' })}
  margin: 0 0 1rem;
`;

const BigSegmentHeader = styled.span`
  width: 100%;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 1rem;
  color: ${props => props.theme.color.mainProductBlue};
`;

const SegmentHeader = styled.span`
  flex: 1;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 1rem 0 0;
  color: ${props => props.theme.color.N300};
`;

const DividerSegmentHeader = styled.span`
  flex: 1;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25;
  margin: 1.5rem 0 0;
  color: ${props => props.theme.color.N300};
`;

const SegmentAction = styled.button`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1;
  margin: 0;
  color: ${props => props.theme.color.N300};
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  ${flex()}
  padding: 2rem;
`;

const CreditScoreSummary = styled.div`
  width: 100%;
  margin: 3rem 0 0;
  ${flex({ justify: 'space-between' })}

  h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    margin: 0 1rem 0 0;
    text-align: left;
    color: ${props => props.theme.color.N800};
  }

  h2 {
    flex: 1;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: right;
    color: ${props => props.theme.color.Y200};
    margin: 0;
  }

  .progress {
    width: 100%;
    height: 0.75rem;
    margin: 0.5rem 0 0;
    border-radius: ${props => props.theme.borderRadius};
    position: relative;
    box-shadow: ${props => props.theme.shadow.base};

    .bar,
    .bg {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      background: ${props => props.theme.color.Y200};
      border-radius: ${props => props.theme.borderRadius};
    }

    .bar {
      z-index: 2;
      width: 60%;
    }

    .bg {
      z-index: 1;
      right: 0;
      opacity: 0.25;
    }
  }
`;

const Loans = styled.div`
  width: 100%;
  margin: 3rem 0 0;
  ${flex()}

  button {
    margin: 0 0 1rem;

    &:last-of-type {
      margin: 0;
    }
  }
`;
