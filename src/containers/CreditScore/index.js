import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import swal from 'sweetalert';
import isEmpty from 'lodash/isEmpty';

import ProgressDigitalIcon from '../../assets/progress_digital.svg';
import ProgressElectronicIcon from '../../assets/progress_electronic.svg';
import ProgressCarIcon from '../../assets/progress_car.svg';
import ProgressHomeIcon from '../../assets/progress_home.svg';
import LoanHistoryIcon from '../../assets/loan_history.svg';
import ApprovedIcon from '../../assets/approved.svg';
import RejectedIcon from '../../assets/rejected.svg';
import PendingIcon from '../../assets/pending.svg';
import ArrowIcon from '../../assets/progress_arrow.svg';

import { DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY, DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY } from '../../commons/constants';
import SITEMAP from '../../commons/sitemap';
import { flex } from '../../commons/theme';
import { calculatePercentage } from '../../commons/utils';

import DocUploadModal from '../../components/DocUploadModal/DocUploadModal';
import Header from '../../components/Header/Header';
import {
  PageWrapper,
  SegmentContext,
  SegmentHeader,
  FullSegmentHeader,
  ProgressBar,
  ProgressSegment,
  ArrowMarker,
  SegmentAction,
  SegmentDescription,
  SpinnerWrapper,
} from '../../components/PageBuilder/PageBuilder';
import Spinner from '../../components/Spinner/Spinner';

import * as creditScoreActions from '../../reducers/creditScore';
import * as userDocumentActions from '../../reducers/userDocument';

@connect(
  state => ({ creditScore: state.creditScore, userDocument: state.userDocument }),
  dispatch => ({
    creditScoreActions: bindActionCreators(creditScoreActions, dispatch),
    userDocumentActions: bindActionCreators(userDocumentActions, dispatch),
  })
)
export default class CreditScore extends React.Component {
  static ICON_MAP = [PendingIcon, ApprovedIcon, RejectedIcon];

  state = {
    focusedDoc: {},
  };

  componentDidMount() {
    if (!this.props.creditScore.loading && !this.props.creditScore.loaded) {
      this.props.creditScoreActions.getCreditScore();
    }

    if (!this.props.creditScore.scoreRangeLoading && !this.props.creditScore.scoreRangeLoaded) {
      this.props.creditScoreActions.getScoreRange();
    }

    if (!this.props.userDocument.loading && !this.props.userDocument.loaded) {
      this.props.userDocumentActions.getDocuments();
    }
  }

  openDocumentUploader = focusedDoc => this.setState({ focusedDoc });
  handleCloseDocumentUploader = () => this.setState({ focusedDoc: {} });

  getDocumentActionIcon = doc => CreditScore.ICON_MAP[Number(doc.status)];

  calculateCurrentProgress = () => {
    if (this.props.creditScore.loaded && this.props.creditScore.data && this.props.creditScore.data.credit_score) {
      return calculatePercentage(
        this.props.creditScore.data.credit_score,
        this.getLowerBoundary(),
        this.getUpperBoundary()
      );
    }

    return calculatePercentage(200, this.getLowerBoundary(), this.getUpperBoundary());
  };

  userDataDocumentAction = doc => () => {
    if (Number(doc.status) === -1) {
      this.openDocumentUploader(doc);
    } else if (Number(doc.status) === 0) {
      swal({
        icon: 'info',
        title: 'Dokumen dalam proses verifikasi',
        text:
          'Dokumen yang sudah kamu upload sedang dalam proses verifikasi oleh tim kami, tunggu saja sampai kami menghubungi kamu terkait informasi lebih lanjut',
      });
    } else if (Number(doc.status) === 1) {
      swal({
        icon: 'success',
        title: 'Dokumen sudah terverifikasi',
        text: 'Dokumen yang sudah kamu upload sudah benar dan sudah diverifikasi oleh tim kami, yay!',
      });
    } else if (Number(doc.status) === 2) {
      swal({
        icon: 'error',
        title: 'Ada kesalahan dalam dokumen yang kamu upload',
        text: doc.note,
        button: 'Upload ulang dokumen',
      }).then(value => {
        if (value) {
          this.openDocumentUploader(doc);
        }
      });
    }
  };

  successfullyUploadedCallback = () => {
    this.closeDocumentUploader();
    this.props.userDocumentActions.uploadingReset();
  };

  getLowerBoundary = () => {
    if (this.props.creditScore.scoreRangeLoaded && this.props.creditScore.scoreRange.length > 0) {
      let lowerBoundary = DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY;

      this.props.creditScore.scoreRange.forEach(sr => {
        if (Number(sr.lower_bounds) <= lowerBoundary) {
          lowerBoundary = Number(sr.lower_bounds);
        }
      });

      return lowerBoundary;
    }

    return DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY;
  };

  getUpperBoundary = () => {
    if (this.props.creditScore.scoreRangeLoaded && this.props.creditScore.scoreRange.length > 0) {
      let upperBoundary = DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY;

      this.props.creditScore.scoreRange.forEach(sr => {
        if (Number(sr.upper_bounds) >= upperBoundary) {
          upperBoundary = Number(sr.upper_bounds);
        }
      });

      return upperBoundary;
    }

    return DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY;
  };

  render() {
    return (
      <Fragment>
        <Header withMenu />
        <PageWrapper>
          <Dashboard>
            <ScoreProgress>
              <SegmentContext>
                <SegmentHeader>{`Skor kredit kamu`}</SegmentHeader>
                <SegmentAction
                  onClick={() => navigate(SITEMAP.WHAT_IS_CREDIT_SCORE)}
                >{`Apa itu skor kredit? >`}</SegmentAction>
              </SegmentContext>
              <DocUploadModal
                active={!isEmpty(this.state.focusedDoc)}
                userDocument={this.state.focusedDoc}
                onClose={this.handleCloseDocumentUploader}
                upload={this.props.userDocumentActions.uploadDocument}
                progress={this.props.userDocument.uploadProgress}
                finished={this.props.userDocument.uploadFinished}
                finishedText="Oke"
                finishedCallback={this.successfullyUploadedCallback}
              />
              {this.props.creditScore.loaded && this.props.creditScore.data && (
                <Current
                  progress={calculatePercentage(
                    this.props.creditScore.data.credit_score,
                    this.getLowerBoundary(),
                    this.getUpperBoundary()
                  )}
                  levelColor={this.props.creditScore.data.color}
                >
                  <div>
                    <h1>{this.props.creditScore.data.credit_score}</h1>
                    <h3>{this.props.creditScore.data.level}</h3>
                  </div>
                </Current>
              )}
              {(this.props.creditScore.loading || this.props.creditScore.scoreRangeLoading) && (
                <SpinnerWrapper>
                  <Spinner color="N800" />
                </SpinnerWrapper>
              )}
              {this.props.creditScore.scoreRangeLoaded && this.props.creditScore.scoreRange.length > 0 && (
                <Progress>
                  <ProgressBar
                    progress={this.calculateCurrentProgress()}
                    levelColor={
                      this.props.creditScore.loaded && this.props.creditScore.data
                        ? this.props.creditScore.data.color
                        : '#36B37E'
                    }
                  >
                    <span>{this.getLowerBoundary()}</span>
                    <div>
                      {this.props.creditScore.scoreRange.map((scoreRange, index) => (
                        <ProgressSegment
                          key={index}
                          zIndex={this.props.creditScore.scoreRange.length - index}
                          length={calculatePercentage(
                            Number(scoreRange.upper_bounds + 1) -
                              Number(scoreRange.lower_bounds) +
                              this.getLowerBoundary(),
                            this.getLowerBoundary(),
                            this.getUpperBoundary(),
                            true
                          )}
                          color={scoreRange.color}
                          offset={calculatePercentage(
                            scoreRange.lower_bounds,
                            this.getLowerBoundary(),
                            this.getUpperBoundary(),
                            true
                          )}
                          leftRadius={index === 0}
                          rightRadius={index === this.props.creditScore.scoreRange.length - 1}
                        />
                      ))}
                      <ProgressSegment
                        zIndex={this.props.creditScore.scoreRange.length + 2}
                        length={calculatePercentage(
                          this.props.creditScore.data.credit_score,
                          this.getLowerBoundary(),
                          this.getUpperBoundary(),
                          true
                        )}
                        color={this.props.creditScore.data.color}
                        opacity={1}
                        fullRadius
                      />
                      <ArrowMarker progress={this.calculateCurrentProgress()} invert>
                        <img src={ArrowIcon} />
                      </ArrowMarker>
                      <ArrowMarker
                        progress={calculatePercentage(300, this.getLowerBoundary(), this.getUpperBoundary())}
                      >
                        <img src={ArrowIcon} />
                      </ArrowMarker>
                      <ArrowMarker
                        progress={calculatePercentage(600, this.getLowerBoundary(), this.getUpperBoundary())}
                      >
                        <img src={ArrowIcon} />
                      </ArrowMarker>
                      <ArrowMarker
                        progress={calculatePercentage(700, this.getLowerBoundary(), this.getUpperBoundary())}
                      >
                        <img src={ArrowIcon} />
                      </ArrowMarker>
                      <ArrowMarker
                        progress={calculatePercentage(800, this.getLowerBoundary(), this.getUpperBoundary())}
                      >
                        <img src={ArrowIcon} />
                      </ArrowMarker>
                    </div>
                    <span>{this.getUpperBoundary()}</span>
                  </ProgressBar>
                  <ProgressMarkers>
                    <ProgressMarker
                      progress={calculatePercentage(300, this.getLowerBoundary(), this.getUpperBoundary())}
                    >
                      <img src={ProgressDigitalIcon} />
                      <span>Digital</span>
                    </ProgressMarker>
                    <ProgressMarker
                      progress={calculatePercentage(600, this.getLowerBoundary(), this.getUpperBoundary())}
                    >
                      <img src={ProgressElectronicIcon} />
                      <span>Uang tunai</span>
                    </ProgressMarker>
                    <ProgressMarker
                      progress={calculatePercentage(700, this.getLowerBoundary(), this.getUpperBoundary())}
                    >
                      <img src={ProgressCarIcon} />
                      <span>Mobil</span>
                    </ProgressMarker>
                    <ProgressMarker
                      progress={calculatePercentage(800, this.getLowerBoundary(), this.getUpperBoundary())}
                    >
                      <img src={ProgressHomeIcon} />
                      <span>Rumah</span>
                    </ProgressMarker>
                  </ProgressMarkers>
                </Progress>
              )}
            </ScoreProgress>
          </Dashboard>
          <UserData>
            <FullSegmentHeader>Tingkatkan skor kredit kamu!</FullSegmentHeader>
            <SegmentDescription>Pastikan dokumen-dokumen yang diupload dapat terbaca dengan jelas.</SegmentDescription>
            <UserDataAction onClick={() => navigate(SITEMAP.HOME)}>
              <img src={LoanHistoryIcon} />
              <span>Ambil dan Lunasi Pinjaman</span>
            </UserDataAction>
            {this.props.userDocument.loading && (
              <SpinnerWrapper>
                <Spinner color="N800" />
              </SpinnerWrapper>
            )}
            {this.props.userDocument.loaded &&
              this.props.userDocument.userDocuments &&
              this.props.userDocument.userDocuments.map((doc, idx) => (
                <UserDataAction onClick={this.userDataDocumentAction(doc)} key={idx}>
                  <img src={doc.icon_url} />
                  <span>Upload {doc.doc_name}</span>
                  {Number(doc.status) !== -1 && <img src={this.getDocumentActionIcon(doc)} />}
                </UserDataAction>
              ))}
          </UserData>
        </PageWrapper>
      </Fragment>
    );
  }
}

const Dashboard = styled.div`
  width: 100%;
  ${flex()} margin: 3rem 0 0;
`;

const ScoreProgress = styled.div`
  width: 100%;
  position: relative;
`;

const Current = styled.div`
  width: calc(100% - 4rem);
  position: relative;
  margin: 0 auto 1rem;
  ${flex({ justify: 'flex-start' })} h2 {
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    text-align: center;
    margin: 0 0 1rem;
    color: ${props => props.theme.color.mainProductBlue};
  }

  & > div {
    position: relative;
    left: ${props => props.progress}%;
    transform: translate3d(
      ${props => {
        switch (props.progress) {
          case 80:
            return '-100%';
          case 20:
            return '0';
          default:
            return '-50%';
        }
      }},
      0,
      0
    );

    h1,
    h3 {
      text-align: ${props => {
        switch (props.progress) {
          case 80:
            return 'right';
          case 20:
            return 'left';
          default:
            return 'center';
        }
      }}

    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1;
      width: 100%;
      margin: 0 0 0.125rem;
      color: ${props => props.theme.color.N800};
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1;
      margin: 0;
      color: ${props => props.levelColor};
    }
  }
`;

const Progress = styled.div`
  width: 100%;
  ${flex()} margin: 0.5rem 0 0;
`;

const ProgressMarkers = styled.div`
  width: calc(100% - 4rem);
  height: 5rem;
  ${flex({ justify: 'flex-start' })} margin: 0.25rem 0 0;
  position: relative;
`;

const ProgressMarker = styled.div`
  position: absolute;
  width: 2rem;
  left: ${props => props.progress}%;
  transform: translate3d(-50%, 0, 0);
  ${flex()} img {
    width: 1.75rem;
    height: 1.75rem;
    object-fit: contain;
    object-position: center;
    margin: 0 0 0.25rem;
  }

  span {
    font-size: 0.75rem;
    line-height: 1;
    margin: 0;
    text-align: center;
    color: ${props => props.theme.color.N800};
  }
`;

const UserData = styled.div`
  width: 100%;
  ${flex()} margin: 3rem 0 0;
`;

const UserDataAction = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.color.N0};
  box-shadow: ${props => props.theme.shadow.base};
  border-radius: ${props => props.theme.borderRadius};
  margin: 0 0 1rem;
  ${flex({ justify: 'flex-start' })} &:first-of-type {
    margin: 1rem 0;
  }

  &:last-of-type {
    margin: 0;
  }

  img {
    height: 1.75rem;
    width: 1.75rem;
    object-fit: contain;
    margin: 0;
  }

  span {
    flex: 1;
    margin: 0 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.125;
    color: ${props => props.theme.color.N800};
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
