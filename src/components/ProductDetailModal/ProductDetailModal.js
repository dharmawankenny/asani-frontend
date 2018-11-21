import React from 'react';
import isEmpty from 'lodash/isEmpty';
import swal from 'sweetalert';

import CloseIcon from '../../assets/close.svg';
import LoanIcon from '../../assets/loan_history.svg';

import { BigActionButton } from '../Buttons/Buttons';
import DocUpload from '../DocUpload/DocUpload';
import Spinner from '../Spinner/Spinner';
import {
  Modal,
  Content,
  ContentAnimationWrapper,
  SpinnerWrapper,
  ActionButtonWrapper,
  DocUploadWrapper,
  Header,
  Steps,
  Step,
} from './ProductDetailModal.styled';
import ProductDetail from './components/ProductDetail';
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

    if (this.props.purchaseSuccess && !prevProps.purchaseSuccess) {
      swal({
        icon: 'success',
        title: 'Pengajuan pinjaman berhasil!',
        text: 'Pinjaman kamu akan segera diproses, konfirmasi pinjaman akan segera dikirimkan ke WhatsApp kamu!',
        button: 'Oke, saya mengerti.',
      }).then(value => {
        if (value) {
          this.successfullyPurchasedCallback();
        }
      });
    }

    if (this.props.purchaseError && !prevProps.purchaseError) {
      swal({
        icon: 'error',
        title: 'Pengajuan pinjaman gagal :(',
        text:
          'Sepertinya kamu sudah memiliki pinjaman aktif, kamu hanya bisa memiliki satu pinjaman aktif pada suatu waktu.',
        button: 'Oke, saya mengerti.',
      }).then(value => {
        if (value) {
          this.successfullyPurchasedCallback();
        }
      });
    }

    if (this.props.userBanned && !prevProps.userBanned) {
      swal({
        icon: 'warning',
        title: 'Ooops akun kamu bermasalah',
        text: 'Akun kamu dalam pengawasan kami. Harap segera hubungi CS.',
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
  };

  successfullyPurchasedCallback = () => {
    this.props.resetPurchase();
    this.props.updateLoans();
    this.props.onClose();
  };
  handleProductClick = () => {
    const { productId, docRequired } = this.props.productDetail;
    if (docRequired && docRequired.length === 0) {
      return this.props.purchase(productId);
    }
    return this.setState({
      currentStep: 0,
    });
  };
  renderDocUploader = () => {
    const { currentStep } = this.state;
    const { loading, loaded, productDetail } = this.props;
    if (loading) {
      return (
        <SpinnerWrapper>
          <Spinner color="N800" />
        </SpinnerWrapper>
      );
    }
    const pageReady = loaded && productDetail && !isEmpty(productDetail);
    if (pageReady) {
      const { docRequired } = productDetail;
      return (
        <React.Fragment>
          {docRequired.length !== 0 && (
            <Steps>
              {docRequired.length > 0 &&
                docRequired.map((doc, index) => (
                  <Step key={index} active={this.state.currentStep >= index}>
                    <div className="logo">
                      <img src={doc.icon_url} />
                    </div>
                    <span>Upload {doc.doc_name}</span>
                    {index !== 0 && <div className="leftBar" />}
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
          {currentStep < docRequired.length && (
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
        </React.Fragment>
      );
    }
  };
  render() {
    const { productType, docRequired } = this.props.productDetail;

    return (
      <Modal active={this.props.active}>
        <Content active={this.props.active}>
          <ContentAnimationWrapper active={this.props.active} loading={this.props.loading}>
            <Header>
              <h1>Detil Peminjaman</h1>
              <button onClick={this.props.onClose} id="asani-actions-close-product-detail">
                <img src={CloseIcon} />
              </button>
            </Header>
            {this.renderDocUploader()}
            {this.props.loaded && this.state.currentStep === docRequired.length && (
              <ProductDetail productDetail={this.props.productDetail} />
            )}
            {this.props.loaded &&
              this.props.productDetail &&
              !isEmpty(this.props.productDetail) &&
              this.state.currentStep === docRequired.length && (
                <ActionButtonWrapper>
                  <BigActionButton
                    color={this.props.hasActiveLoans ? 'N300' : 'G300'}
                    onClick={this.handleProductClick}
                    disabled={this.props.purchaseLoading}
                    id={`asani-actions-purchase-product-${productType}`}
                  >
                    {!this.props.purchaseLoading && 'Ambil Pinjaman'}
                    {this.props.purchaseLoading && <Spinner color="N0" />}
                  </BigActionButton>
                </ActionButtonWrapper>
              )}
          </ContentAnimationWrapper>
        </Content>
      </Modal>
    );
  }
}
