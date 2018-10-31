import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import swal from 'sweetalert';

import ProgressDigitalIcon from '../../assets/progress_digital.svg';
import ProgressElectronicIcon from '../../assets/progress_electronic.svg';
import ProgressCarIcon from '../../assets/progress_car.svg';
import ProgressHomeIcon from '../../assets/progress_home.svg';
import LoanHistoryIcon from '../../assets/loan_history.svg';
import ApprovedIcon from '../../assets/approved.svg';
import RejectedIcon from '../../assets/rejected.svg';
import PendingIcon from '../../assets/pending.svg';
import ArrowIcon from '../../assets/progress_arrow.svg';

import {
  DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY,
  DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY,
} from '../../commons/constants';
import SITEMAP from '../../commons/sitemap';
import { flex } from '../../commons/theme';
import { calculatePercentage } from '../../commons/utils';

import { BigActionButton } from '../../components/Buttons';
import DocUpload from '../../components/DocUpload';
import Header from '../../components/Header';
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
  static ICON_MAP = [
    PendingIcon,
    ApprovedIcon,
    RejectedIcon,
  ];

  componentDidMount() {
    if (!this.props.creditScore.loading && !this.props.creditScore.loaded) {
      this.props.creditScoreActions.getCreditScore();
    }

    if (!this.props.userDocument.loading && !this.props.userDocument.loaded) {
      this.props.userDocumentActions.getDocuments();
    }
  }

  getDocumentActionIcon = doc => Number(doc.status) === -1 ? doc.icon_url : CreditScore.ICON_MAP[Number(doc.status)];

  calculateCurrentProgress = () => {
    if (this.props.creditScore.loaded && this.props.creditScore.data && this.props.creditScore.data.credit_score) {
      return calculatePercentage(this.props.creditScore.data.credit_score);
    }

    return calculatePercentage(200);
  }

  userDataDocumentAction = doc => () => {
    if (Number(doc.status) === -1) {
      // open uploader
    } else if (Number(doc.status) === 0) {
      swal({
        icon:'info',
        title: 'Dokumen dalam proses verifikasi',
        text: 'Dokumen yang sudah kamu upload sedang dalam proses verifikasi oleh tim kami, tunggu saja sampai kami menghubungi kamu terkait informasi lebih lanjut',
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
        text: doc.notes,
        button: 'Upload ulang dokumen',
      }).then(value => {
        if (value) {
          // open uploader
          console.log('abc');
        }
      });
    }
  };

  render() {
    const dummyData = {
      score: 650,
      level: 'Cukup Baik',
      documents: [
        {
          name: 'KTP',
          status: '-1',
          iconUrl: ProgressDigitalIcon,
        },
        {
          name: 'Selfie dengan KTP',
          status: '1',
          iconUrl: ProgressDigitalIcon,
        },
        {
          name: 'Slip Gaji',
          status: '2',
          iconUrl: ProgressDigitalIcon,
          notes: 'Slip gaji anda salah tanggal, notes terkait error yang terjadi',
        },
        {
          name: 'Kartu Keluarga',
          status: '0',
          iconUrl: ProgressDigitalIcon,
        },
      ],
    };

    const progress = calculatePercentage(dummyData.score);

    return (
      <PageWrapper>
        <Header withMenu />
        <Dashboard>
          <ScoreProgress>
            <SegmentContext>
              <SegmentHeader>Skor kredit kamu</SegmentHeader>
              <SegmentAction onClick={() => navigate(SITEMAP.WHAT_IS_CREDIT_SCORE)}>Apa itu skor kredit? ></SegmentAction>
            </SegmentContext>
            <DocUpload upload={this.props.userDocumentActions.uploadDocument} />
            {this.props.creditScore.loading && (
              <SpinnerWrapper>
                <Spinner color="N800" />
              </SpinnerWrapper>
            )}
            {this.props.creditScore.loaded &&
              this.props.creditScore.data && (
                <Current progress={calculatePercentage(this.props.creditScore.data.credit_score)} levelColor={this.props.creditScore.data.color}>
                  <div>
                    <h1>{this.props.creditScore.data.credit_score}</h1>
                    <h3>{this.props.creditScore.data.level}</h3>
                  </div>
                </Current>
              )}
            <Progress>
              <ProgressBar
                progress={this.calculateCurrentProgress()}
                levelColor={this.props.creditScore.loaded && this.props.creditScore.data ? this.props.creditScore.data.color : '#36B37E'}
              >
                <span>{DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY}</span>
                <span>{DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY}</span>
                <div>
                  <div className="bg" />
                  <div className="bar" />
                  <ArrowMarker progress={this.calculateCurrentProgress()} invert><img src={ArrowIcon} /></ArrowMarker>
                  <ArrowMarker progress={calculatePercentage(300)}><img src={ArrowIcon} /></ArrowMarker>
                  <ArrowMarker progress={calculatePercentage(600)}><img src={ArrowIcon} /></ArrowMarker>
                  <ArrowMarker progress={calculatePercentage(700)}><img src={ArrowIcon} /></ArrowMarker>
                  <ArrowMarker progress={calculatePercentage(800)}><img src={ArrowIcon} /></ArrowMarker>
                </div>
              </ProgressBar>
              <ProgressMarkers>
                <ProgressMarker progress={calculatePercentage(300)}>
                  <img src={ProgressDigitalIcon} />
                  <span>Digital</span>
                </ProgressMarker>
                <ProgressMarker progress={calculatePercentage(600)}>
                  <img src={ProgressElectronicIcon} />
                  <span>Elektronik</span>
                </ProgressMarker>
                <ProgressMarker progress={calculatePercentage(700)}>
                  <img src={ProgressCarIcon} />
                  <span>Mobil</span>
                </ProgressMarker>
                <ProgressMarker progress={calculatePercentage(800)}>
                  <img src={ProgressHomeIcon} />
                  <span>Rumah</span>
                </ProgressMarker>
              </ProgressMarkers>
            </Progress>
          </ScoreProgress>
        </Dashboard>
        <UserData>
          <FullSegmentHeader>Tingkatkan skor kredit kamu</FullSegmentHeader>
          <SegmentDescription>
            Upload dokumen-dokumen dan lakukan aksi-aksi rekomendasi dari kami dibawah ini
          </SegmentDescription>
          <UserDataAction onClick={() => navigate(SITEMAP.HOME)}>
            <img src={LoanHistoryIcon} />
            <span>Lunaskan Pinjaman</span>
          </UserDataAction>
          {this.props.userDocument.loading && (
            <SpinnerWrapper>
              <Spinner color="N800" />
            </SpinnerWrapper>
          )}
          {this.props.userDocument.loaded &&
            this.props.userDocument.userDocuments &&
            this.props.userDocument.userDocuments.map(doc => (
              <UserDataAction onClick={this.userDataDocumentAction(doc)}>
                <img src={this.getDocumentActionIcon(doc)} />
                <span>Upload {doc.doc_name}</span>
              </UserDataAction>
            ))}
        </UserData>
      </PageWrapper>
    );
  }
}

const Dashboard = styled.div`
  width: 100%;
  ${flex()}
  margin: 3rem 0 0;
`;

const ScoreProgress = styled.div`
  width: 100%;
  position: relative;
`;

const Current = styled.div`
  width: 100%;
  ${flex({ justify: 'flex-start' })}

  h2 {
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
    transform: translate3d(${props => props.progress > 80 ? '-100%' : props.progress < 20 ? '0' : '-50%'}, 0, 0);

    h1,
    h3 {
      text-align: ${props => props.progress > 80 ? 'right' : props.progress < 20 ? 'left' : 'center'};
    }

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
  ${flex()}
  margin: 0.5rem 0 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  ${flex({ justify: 'space-between' })}

  & > div {
    width: 100%;
    height: 0.75rem;
    border-radius: ${props => props.theme.borderRadius};
    position: relative;

    .bar,
    .bg {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      background: ${props => props.levelColor};
      border-radius: ${props => props.theme.borderRadius};
    }

    .bar {
      z-index: 2;
      width: ${props => props.progress}%;
    }

    .bg {
      z-index: 1;
      right: 0;
      opacity: 0.25;
    }
  }

  span {
    font-size: 0.875rem;
    margin: 0 0 0.5rem;
    color: ${props => props.theme.color.N300};
  }
`;

const ArrowMarker = styled.div`
  position: absolute;
  ${props => props.invert ? 'top: -0.125rem;' : 'bottom: -0.125rem;'}
  left: ${props => props.progress}%;
  transform: translate3d(-50%, ${props => props.invert ? '-100%' : '100%'}, 0)${props => props.invert && ' rotate(180deg)'};
  padding: 0;
  ${flex()}

  img {
    width: 0.5rem;
    height: auto;
  }
`;

const ProgressMarkers = styled.div`
  width: 100%;
  height: 5rem;
  ${flex({ justify: 'flex-start' })}
  margin: 0.25rem 0 0;
`;

const ProgressMarker = styled.div`
  position: absolute;
  width: 2rem;
  left: ${props => props.progress}%;
  transform: translate3d(-50%, 0, 0);
  ${flex()}

  img {
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
  ${flex()}
  margin: 3rem 0 0;
`;

const UserDataAction = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.color.N0};
  box-shadow: ${props => props.theme.shadow.base};
  border-radius: ${props => props.theme.borderRadius};
  margin: 0 0 1rem;
  ${flex({ justify: 'flex-start' })}

  &:first-of-type {
    margin: 1rem 0;
  }

  &:last-of-type {
    margin: 0;
  }

  img {
    height: 1.75rem;
    width: 1.75rem;
    object-fit: contain;
    margin: 0 0.5rem 0 0;
  }

  span {
    flex: 1;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    color: ${props => props.theme.color.N800};
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
