import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';

import ChevronDownIcon from '../assets/chevron_down.svg';
import CloseIcon from '../assets/close.svg';
import LoanIcon from '../assets/loan_history.svg';
import ImproveIcon from '../assets/improve.svg';

import { flex } from '../commons/theme';
import { printPrice, fromNow } from '../commons/utils';

import { BigActionButton } from './Buttons';
import DocUpload from './DocUpload';
import Spinner from './Spinner';

export default class ProductDetailModal extends React.Component {
  static defaultProps = {
    productDetail: {},
  };

  state = {
    currentStep: 0,
  };

  componentDidUpdate(prevProps) {
    if (!this.props.active && prevProps.active) {
      document.body.style.overflow = 'auto';
    } else if (this.props.active && !prevProps.active) {
      document.body.style.overflow = 'hidden';
    }

    if (this.props.purchaseSuccess && !this.props.purchaseSuccess) {
      swal({
        icon: 'success',
        title: 'Selamat! Pinjaman kamu akan segera diproses, konfirmasi pinjaman akan segera dikirimkan ke WhatsApp kamu!',
        button: 'Oke, saya mengerti.',
      }).then(value => {
        if (value) {
          this.successfullyPurchasedCallback();
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.onClose();
    document.body.style.overflow = 'auto';
  }

  successfullyUploadedCallback = () => {
    this.props.resetUploader();
    this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
  }

  successfullyPurchasedCallback = () => {
    this.props.resetPurchase();
    this.props.onClose();
  }

  render() {
    const {
      productType,
      lenderName,
      productPrice,
      productNominal,
      tenorDays,
      interestPct,
      interestAmount,
      interestAnnualPct,
      totalBill,
      urlProductLogo,
      adminFee,
      penalty,
      docRequired,
    } = this.props.productDetail;

    return (
      <Modal active={this.props.active}>
        <Content active={this.props.active}>
          <ContentAnimationWrapper active={this.props.active} loading={this.props.loading}>
            <Header>
              <h1>Detil Peminjaman</h1>
              <button onClick={this.props.onClose}><img src={CloseIcon} /></button>
            </Header>
            {this.props.loading && (
              <SpinnerWrapper>
                <Spinner color="N800" />
              </SpinnerWrapper>
            )}
            {this.props.loaded &&
              this.props.productDetail &&
              !isEmpty(this.props.productDetail) &&
              docRequired.length !== 0 && (
                <Steps>
                  {docRequired.length > 0 &&
                    docRequired.map((doc, index) => (
                      <Step active={this.state.currentStep >= index}>
                        <div className="logo">
                          <img src={doc.icon_url} />
                        </div>
                        <span>Upload {doc.doc_name}</span>
                        {index !== 0 && (
                          <div className="leftBar" />
                        )}
                        <div className="rightBar" />
                      </Step>
                    ))}
                  <Step active={this.state.currentStep === docRequired.length}>
                    <div className="logo">
                      <img src={LoanIcon} />
                    </div>
                    <div className="leftBar" />
                    <span>Review Peminjaman</span>
                  </Step>
                </Steps>
              )}
            {this.props.loaded &&
              this.props.productDetail &&
              !isEmpty(this.props.productDetail) &&
              this.state.currentStep < docRequired.length && (
                <DocUploadWrapper>
                  <DocUpload
                    userDocument={docRequired[this.state.currentStep]}
                    upload={this.props.uploadDocument}
                    progress={this.props.uploadProgress}
                    finished={this.props.uploadFinished}
                    finishedText="Selanjutnya"
                    finishedCallback={this.successfullyUploadedCallback}
                  />
                </DocUploadWrapper>
              )}
            {this.props.loaded &&
              this.props.productDetail &&
              !isEmpty(this.props.productDetail) &&
              this.state.currentStep === docRequired.length && (
                <Fragment>
                  <SummaryInfo>
                    <ProductLogo src={urlProductLogo} />
                    <BillValue>
                      <span>Total Tagihan</span>
                      <span>{printPrice(totalBill)}</span>
                    </BillValue>
                    <LabelValue>
                      <span>Pemberi pinjaman</span>
                      <span>{lenderName}</span>
                    </LabelValue>
                    <LabelValue>
                      <span>Produk</span>
                      <span>{productType}</span>
                    </LabelValue>
                    <LabelValue>
                      <span>Nominal</span>
                      <span>{productNominal}</span>
                    </LabelValue>
                    <LabelValue>
                      <span>Tenor</span>
                      <span>{tenorDays} Hari</span>
                    </LabelValue>
                    <LabelValue>
                      <span>% Bunga</span>
                      <span>{interestPct}%</span>
                    </LabelValue>
                    <LabelValue>
                      <span>Nominal Bunga</span>
                      <span>{printPrice(interestAmount)}</span>
                    </LabelValue>
                    <LabelValue>
                      <span>Admin Fee</span>
                      <span>{Number(adminFee) === 0 ? '0' : printPrice(Number(adminFee))}</span>
                    </LabelValue>
                  </SummaryInfo>
                  <InfoPrompt color="G300" margin="0 auto">
                    <img src={ImproveIcon} />
                    <span>Tepat waktu melunasi pembayaran akan menaikan skor kredit kamu!</span>
                  </InfoPrompt>
                </Fragment>
              )}
              {this.props.loaded &&
                this.props.productDetail &&
                !isEmpty(this.props.productDetail) &&
                this.state.currentStep === docRequired.length && (
                  <ActionButtonWrapper>
                    <BigActionButton color="G300" onClick={() => this.props.purchase(this.props.productDetail.productId)} disabled={this.props.purchaseLoading}>
                      {!this.props.purchaseLoading && 'Ambil Pinjaman'}
                      {this.props.purchaseLoading && (
                        <Spinner color="N0" />
                      )}
                    </BigActionButton>
                  </ActionButtonWrapper>
              )}
          </ContentAnimationWrapper>
        </Content>
      </Modal>
    );
  }
}

const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3000;
  transform: translate3d(0, ${props => props.active ? '0' : '100%'}, 0);
  transition: ${props => props.active ? 'none' : '0s ease all 0.25s'};
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.color.N0};
  transform: translate3d(0, ${props => props.active ? '0' : '100%'}, 0);
  transition: 0.25s ease all;
  padding: 0;
  overflow: auto;
`;

const ContentAnimationWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  ${flex({ justify: 'space-between', direction: 'column' })}
  opacity: ${props => props.active ? '1' : '0'};
  transition: ${props => props.active ? '0.125s ease all 0.125s' : 'none'};

  @media screen and (min-width: ${props => props.theme.breakpoint.tablet}) {
    width: 32rem;
    margin: 0 auto;
  }
`;

const SpinnerWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  ${flex()}
`;

const ActionButtonWrapper = styled.div`
  width: 100%;
  padding: 0 1.5rem;
  margin: 2rem 0;
`;

const DocUploadWrapper = styled.div`
  width: 100%;
  flex: 1;
  ${flex()}
  padding: 1.5rem;
`;

const Header = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  padding: 1.25rem 1.5rem 1rem;
  border-bottom: 1px solid ${props => props.theme.color.N40};
  margin: 0 0 1rem;

  h1 {
    flex: 1;
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${props => props.theme.color.N800};
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  button {
    margin: 0 0 0 1rem;

    img {
      width: 1rem;
      height: 1rem;
    }
  }
`;

const Steps = styled.div`
  width: 100%;
  ${flex({ align: 'flex-start' })}
`;

const Step = styled.div`
  width: 5rem;
  margin: 0 0 0.5rem;
  ${flex()}
  position: relative;

  .logo {
    position: relative;
    z-index: 1;
    width: 3rem;
    height: 3rem;
    padding: 0.625rem;
    border-radius: 3rem;
    border: 1px solid ${props => props.theme.color.mainProductBlue};
    background: ${props => props.active ? props.theme.color.mainProductBlue : props.theme.color.N0};

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      ${props => props.active && 'filter: brightness(0) invert(1);'}
    }
  }

  .leftBar,
  .rightBar {
    position: absolute;
    top: calc(1.5rem - 1px);
    width: 50%;
    height: 1px;
    background: ${props => props.theme.color.mainProductBlue};
  }

  .leftBar {
    left: 0;
  }

  .rightBar {
    left: 50%;
  }

  span {
    margin: 0.5rem 0 0;
    width: 100%;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.25;
    text-align: center;
    color: ${props => props.active ? props.theme.mainProductBlue : props.theme.color.N800};
  }
`;

const ProductLogo = styled.img`
  height: 8rem;
  width: auto;
  margin: 0 0 1rem;
`;

const InfoPrompt = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: calc(100% - 3rem);
  padding: 1rem 1rem 1rem 0.75rem;
  margin: ${props => props.margin};
  border-left: 0.25rem solid ${props => props.theme.color[props.color]};
  color: ${props => props.theme.color.N300};
  background: ${props => props.theme.color.N20};
  border-radius: ${props => props.theme.borderRadius};

  span {
    flex: 1;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25;
  }

  img {
    width: 2rem;
    height: 2rem;
    object-fit: contain;
    margin: 0 1rem 0 0;
  }
`;

const BillValue = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  margin: 0 0 2rem;

  span {
    width: 100%;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    ${flex({ justify: 'flex-start' })}

    :nth-child(1) {
      color: ${props => props.theme.color.N300};
      margin: 0 0 0.5rem;
    }

    :nth-child(2) {
      color: ${props => props.theme.color.N800};
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
`;

const LabelValue = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  margin: 0 0 0.5rem;

  &:last-of-type {
    margin: 0;
  }

  span {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    ${flex({ justify: 'flex-start' })}

    :nth-child(1) {
      width: calc(37.5% - 0.5rem);
      color: ${props => props.theme.color.N300};
      margin: 0 1rem 0 0;
    }

    :nth-child(2) {
      width: calc(62.5% - 0.5rem);
      color: ${props => props.theme.color.N800};
    }
  }
`;

const SummaryInfo = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  padding: 0 1.5rem;
  margin: 0 0 2rem;
`;
