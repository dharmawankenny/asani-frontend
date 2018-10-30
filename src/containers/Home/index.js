import React from 'react';
import styled from 'styled-components';

import { flex } from '../../commons/theme';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { PageWrapper } from '../../components/PageBuilder';
import Spinner from '../../components/Spinner';

import { Consumer as AuthConsumer } from '../../contexts/auth';

export default class Home extends React.Component {
  render() {
    return (
      <PageWrapper>
        <Header withMenu />
        <CreditScoreSummary>
          <SegmentContext>
            <SegmentHeader>Skor kredit saya</SegmentHeader>
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
      </PageWrapper>
    );
  }
}

const SegmentContext = styled.div`
  width: 100%;
  ${flex({ justify: 'flex-start' })}
  margin: 0 0 1rem;
`;

const SegmentHeader = styled.span`
  flex: 1;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 1rem 0 0;
  color: ${props => props.theme.color.N300};
`;

const SegmentAction = styled.button`
  font-size: 1rem;
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
    font-size: 4rem;
    font-weight: 700;
    line-height: 1;
    margin: 0 1rem 0 0;
    text-align: left;
    color: ${props => props.theme.color.N800};
  }

  h2 {
    flex: 1;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: right;
    color: ${props => props.theme.color.Y200};
    margin: 0;
  }

  .progress {
    width: 100%;
    height: 1rem;
    margin: 0.5rem 0 0;
    border-radius: ${props => props.theme.borderRadius};
    position: relative;

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
