import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SITEMAP from '../../commons/sitemap';
import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';
import swal from 'sweetalert';
import {navigate} from '@reach/router'
import ChevronDownIcon from '../../assets/chevron_down.svg';
import CloseIcon from '../../assets/close.svg';
import LoanIcon from '../../assets/loan_history.svg';
import ImproveIcon from '../../assets/improve.svg';

import { flex } from '../../commons/theme';
import { printPrice, fromNow } from '../../commons/utils';

import { BigActionButton } from '../../components/Buttons';
import DocUpload from '../../components/DocUpload';
import Spinner from '../../components/Spinner';
import '../../assets/css/styles.css'
import Collapsible from 'react-collapsible';
// import '../assets/sass/main.scss'
import store from '../../store'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as productActions from '../../reducers/product';
import * as creditScoreActions from "../../reducers/creditScore";
import * as loanActions from "../../reducers/loan";
import * as userDocumentActions from "../../reducers/userDocument";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// @connect(
//     // state => ({ ...state }),
//     (state) => {
//         return {
//             ...state
//         }
//     },
//     dispatch => ({
//         creditScoreActions: bindActionCreators(creditScoreActions, dispatch),
//         productActions: bindActionCreators(productActions, dispatch),
//         loanActions: bindActionCreators(loanActions, dispatch),
//         userDocumentActions: bindActionCreators(userDocumentActions, dispatch),
//     })
// )
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function mapStateToProps(state) {
    // console.log(state)
    return { ...state };
}

function mapDispatchToProps(dispatch) {
    return {
        creditScoreActions: bindActionCreators(creditScoreActions, dispatch),
        productActions: bindActionCreators(productActions, dispatch),
        loanActions: bindActionCreators(loanActions, dispatch),
        userDocumentActions: bindActionCreators(userDocumentActions, dispatch), };
}
class DetailPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            currentStep: 0,
            active: false,
            open: false,
        }

    }
    static defaultProps = {
        productDetail: {},
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    nextStep = () => {
        this.setState(({
            currentStep: this.state.currentStep + 1,
            open: false
        }))
    }

    componentDidMount () {
        this.props.productActions.getProductDetail(this.props.id)
        let temp = !isEmpty(this.props.loan.detailedLoan) || this.props.loan.detailLoading
        // this.setState({
        //     ...state,
        //     currentStep:
        // })

    }
    componentDidUpdate(prevProps) {
        const temp = !isEmpty(this.props.loan.detailedLoan) || this.props.loan.detailLoading
        const prevTemp = !isEmpty(prevProps.loan.detailedLoan) || prevProps.loan.detailLoading
        if (!temp && prevTemp) {
            console.log('if !temp && prevTemo')
            console.log(!temp, prevTemp)
            document.body.style.overflow = 'auto';
        } else if (temp && !prevTemp) {
            console.log('else temp && !prevTemo')
            console.log(temp, !prevTemp)
            document.body.style.overflow = 'hidden';
        }
        const purchaseSuccess = this.props.product.purchaseLoaded
        const prevPurchaseSuccess = !prevProps.product.purchaseLoaded
        if (purchaseSuccess && prevPurchaseSuccess) {
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
        const purchaseError = this.props.product.purchaseError
        const prevPurchaseError = prevProps.product.purchaseError
        if (purchaseError && prevPurchaseError) {
            swal({
                icon: 'error',
                title: 'Pengajuan pinjaman gagal :(',
                text: 'Sepertinya kamu sudah memiliki pinjaman aktif, kamu hanya bisa memiliki satu pinjaman aktif pada suatu waktu.',
                button: 'Oke, saya mengerti.',
            }).then(value => {
                if (value) {
                    this.successfullyPurchasedCallback();
                }
            });
        }
        const userBanned = this.props.product.userBanned
        const prevUserBanned = !prevProps.product.userBanned
        if (userBanned && prevUserBanned) {
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
        // this.props.onClose();
    }

    successfullyUploadedCallback = () => {
        console.log('before step'.this.currentStep)
        this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
    }

    successfullyPurchasedCallback = () => {
        this.props.resetPurchase();
        this.props.updateLoans();
    }
    // render() {
    //     return (
    //         <div>
    //             <h1>Hello word</h1>
    //         </div>
    //     );
    // }
    render() {
        const {url_icon_1} = this.props.userDocument
        const {url_icon_2} = this.props.userDocument
        const loading = this.props.product.detailLoading
        const loaded = this.props.product.detailLoaded
        const productDetail = this.props.product.detailedProduct
        const uploadDocument = userDocumentActions.uploadDocument
        const resetUploader = userDocumentActions.uploadingReset
        const uploadProgress = this.props.userDocument.uploadProgress
        const uploadFinished = this.props.userDocument.uploadFinished
        const purchase = productActions.purchaseProduct
        const resetPurchase = productActions.resetPurchase
        const purchaseLoading = this.props.product.purchaseLoading
        const purchaseSuccess = this.props.product.purchaseLoaded
        const userBanned = this.props.product.userBanned
        const purchaseError = this.props.product.purchaseError
        const updateLoans = loanActions.getActiveLoans
        const hasActiveLoans = this.props.loan.activeLoansLoaded && this.props.loan.activeLoans && this.props.loan.activeLoans.length > 0
        const {
            productType,
            lenderName,
            productPrice,
            productNominal,
            productDesc,
            tenorDays,
            interestPct,
            interestAmount,
            interestAnnualPct,
            totalBill,
            urlProductLogo,
            adminFee,
            penalty,
            docRequired,
            banks
        } = productDetail;
        return (
            <Fragment>
                <Header>
                    <h1>Detil Peminjaman</h1>
                    <button onClick={() => navigate(SITEMAP.HOME)} id="asani-actions-close-product-detail"><img src={CloseIcon} /></button>
                </Header>
                {loading && (
                    <SpinnerWrapper>
                        <Spinner color="N800" />
                    </SpinnerWrapper>
                )}
                {loaded &&
                productDetail &&
                !isEmpty(productDetail) &&
                docRequired.length !== 0 && (
                    <Steps>
                        {/*<Step active={this.state.currentStep === docRequired.length}>*/}
                            <Step active={this.state.currentStep === 0}>
                            <div className="logo">
                                <img src={LoanIcon} />
                            </div>
                            <div className="rightBar" />
                            <span>Review Peminjaman</span>
                        </Step>
                        {docRequired.length === 2 && (
                            <Fragment>
                                <Step>
                                    <Step active={this.state.currentStep === 1 }>
                                        <div className="logo">
                                            <img src={url_icon_1} />
                                        </div>
                                        <div className="leftBar" />
                                        <div className="rightBar" />
                                        <span>Upload {docRequired[0].doc_name}</span>
                                        <div className="rightBar" />
                                    </Step>
                                </Step>
                                <Step>
                                    <Step active={this.state.currentStep === 2 }>
                                        <div className="logo">
                                            {/*<img src={docRequired[1].icon_url} />*/}
                                            <img src={url_icon_2} alt=""/>
                                        </div>
                                        <div className="leftBar" />
                                        <span> Upload Selfie Dengan KTP</span>
                                    </Step>
                                </Step>
                            </Fragment>
                        )}
                        {docRequired.length === 1 && (
                            <Step>
                                <Step active={this.state.currentStep === 2 }>
                                    <div className="logo">
                                        {/*<img src={docRequired[1].icon_url} />*/}
                                        <img src="https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/icon_selfie.png" alt=""/>
                                    </div>
                                    <div className="leftBar" />
                                    <span> Upload Selfie Dengan KTP</span>

                                </Step>
                            </Step>
                        )}
                        {/*{docRequired.length > 0 &&*/}
                        {/*docRequired.map((doc, index) => (*/}
                            {/*<Step key={index} active={this.state.currentStep >= index}>*/}
                                {/*<div className="logo">*/}
                                    {/*<img src={doc.icon_url} />*/}
                                {/*</div>*/}
                                {/*<div className="leftBar" />*/}
                                {/*<div className="rightBar" />*/}
                                {/*<span>Upload {doc.doc_name}</span>*/}
                                {/*{index !== 0 && (*/}
                                    {/*<div className="rightBar" />*/}
                                {/*)}*/}
                            {/*</Step>*/}
                        {/*))}*/}
                    </Steps>
                )}
                {loaded &&
                productDetail &&
                !isEmpty(productDetail) &&
                this.state.currentStep === 0 &&
                docRequired.length && (
                    <Fragment>
                        <SummaryInfo>
                            <ProductLogo src={urlProductLogo} />
                            {productDesc && (
                                <Info><span>{productDesc}</span></Info>
                            )}
                            <LabelValue>
                                <span>Pemberi pinjaman</span>
                                <span>{lenderName}</span>
                            </LabelValue>
                            <LabelValue>
                                <span>Produk</span>
                                <span>{productType}</span>
                            </LabelValue>
                            <LabelValue>
                                <span>Harga Produk</span>
                                <span>{printPrice(productPrice)}</span>
                            </LabelValue>
                            <LabelValue>
                                <span>Nominal</span>
                                <span>{productNominal}</span>
                            </LabelValue>
                            {/* <LabelValue>
                      <span>% Bunga</span>
                      <span>{interestPct}%</span>
                    </LabelValue> */}
                            <LabelValue>
                                <span>Nominal Bunga</span>
                                <span>{printPrice(interestAmount)}</span>
                            </LabelValue>
                            <LabelValue>
                                <span>Admin Fee</span>
                                <span>{Number(adminFee) === 0 ? '0' : printPrice(Number(adminFee))}</span>
                            </LabelValue>
                            <BillValue>
                                <span>Total Tagihan</span>
                                <span>{printPrice(totalBill)}</span>
                                <span>Bayar {moment().add(tenorDays, 'days').fromNow()}</span>
                            </BillValue>
                        </SummaryInfo>
                        <div style={{width: "calc(100% - 3rem)"}}>
                            <button>
                                <Collapsible trigger="Metode Pembayaran">
                                    {
                                        banks.map((bank, index) => (
                                            <div key={index} className="collapsible">
                                                <span> Nama Bank: <b>{bank.bankName}</b>  </span> <br/>
                                                <span>Nomor Rekening : {bank.accountNumber} </span><br/>
                                                <span>Atas Nama : {bank.accountName} </span>
                                            </div>
                                        ))
                                    }
                                </Collapsible>
                            </button>
                        </div>
                        <InfoPrompt color="G300" margin="0 auto 1.5rem">
                            <img src={ImproveIcon} />
                            <span>Tepat waktu melunasi pembayaran akan menaikan skor kredit kamu!</span>
                        </InfoPrompt>
                        <Info align="center"><span>Dengan menekan tombol ambil pinjaman, saya setuju dengan detail pinjaman di atas.</span></Info>
                    </Fragment>
                )}
                {loaded &&
                productDetail &&
                !isEmpty(productDetail) &&
                this.state.currentStep > 0 && (
                    <DocUploadWrapper>
                        <DocUpload
                            userDocument={docRequired[this.state.currentStep-1]}
                            upload={uploadDocument}
                            progress={uploadProgress}
                            finished={uploadFinished}
                            finishedText="Selanjutnya"
                            finishedCallback={this.successfullyUploadedCallback}
                            nextStep = {this.nextStep}
                        />
                    </DocUploadWrapper>
                )}
                {loaded &&
                productDetail &&
                !isEmpty(productDetail) &&
                this.state.currentStep === 0 &&
                docRequired.length && (
                    <ActionButtonWrapper>
                        <BigActionButton
                            color={hasActiveLoans ? 'N300' : 'G300'}
                            // onClick={() => purchase(productDetail.productId)}
                            onClick={this.handleClickOpen}
                            disabled={purchaseLoading} id={`asani-actions-purchase-product-${productType}`}
                        >
                            {!purchaseLoading && 'Ambil Pinjaman'}
                            {purchaseLoading && (
                                <Spinner color="N0" />
                            )}
                        </BigActionButton>
                    </ActionButtonWrapper>
                )}
                {loaded &&
                productDetail &&
                !isEmpty(productDetail) &&
                docRequired.length===0 && (
                    <div>
                        <h1>Terima Kasih</h1>
                        <ActionButtonWrapper>
                            <BigActionButton
                                color={hasActiveLoans ? 'N300' : 'G300'}
                                // onClick={() => purchase(productDetail.productId)}
                                onClick={()=> navigate('/dashboard')}
                                disabled={purchaseLoading} id={`asani-actions-purchase-product-${productType}`}
                            >
                                Beranda
                            </BigActionButton>
                        </ActionButtonWrapper>
                    </div>
                )}
                <div>
                    <Dialog
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            {"2 Langkah Lagi"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Dibutuhkan foto ktp + selfie dengan ktp.
                                Silahkan siapkan KTP anda
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Close
                            </Button>
                            <Button onClick={this.nextStep} color="primary">
                                Unggah KTP
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Fragment>
        )
        // return (
        //     <Modal active={this.props.active}>
        //         <Content active={this.props.active}>
        //             <ContentAnimationWrapper active={this.props.active} loading={this.props.loading}>
        //                 <Header>
        //                     <h1>Detil Peminjaman</h1>
        //                     <button onClick={this.props.onClose} id="asani-actions-close-product-detail"><img src={CloseIcon} /></button>
        //                 </Header>
        //                 {this.props.loading && (
        //                     <SpinnerWrapper>
        //                         <Spinner color="N800" />
        //                     </SpinnerWrapper>
        //                 )}
        //                 {this.props.loaded &&
        //                 this.props.productDetail &&
        //                 !isEmpty(this.props.productDetail) &&
        //                 docRequired.length !== 0 && (
        //                     <Steps>
        //                         {docRequired.length > 0 &&
        //                         docRequired.map((doc, index) => (
        //                             <Step active={this.state.currentStep >= index}>
        //                                 <div className="logo">
        //                                     <img src={doc.icon_url} />
        //                                 </div>
        //                                 <span>Upload {doc.doc_name}</span>
        //                                 {index !== 0 && (
        //                                     <div className="leftBar" />
        //                                 )}
        //                                 <div className="rightBar" />
        //                             </Step>
        //                         ))}
        //                         <Step active={this.state.currentStep === docRequired.length}>
        //                             <div className="logo">
        //                                 <img src={LoanIcon} />
        //                             </div>
        //                             <div className="leftBar" />
        //                             <span>Review Peminjaman</span>
        //                         </Step>
        //                     </Steps>
        //                 )}
        //                 {this.props.loaded &&
        //                 this.props.productDetail &&
        //                 !isEmpty(this.props.productDetail) &&
        //                 this.state.currentStep < docRequired.length && (
        //                     <DocUploadWrapper>
        //                         <DocUpload
        //                             userDocument={docRequired[this.state.currentStep]}
        //                             upload={this.props.uploadDocument}
        //                             progress={this.props.uploadProgress}
        //                             finished={this.props.uploadFinished}
        //                             finishedText="Selanjutnya"
        //                             finishedCallback={this.successfullyUploadedCallback}
        //                         />
        //                     </DocUploadWrapper>
        //                 )}
        //                 {this.props.loaded &&
        //                 this.props.productDetail &&
        //                 !isEmpty(this.props.productDetail) &&
        //                 this.state.currentStep === docRequired.length && (
        //                     <Fragment>
        //                         <SummaryInfo>
        //                             <ProductLogo src={urlProductLogo} />
        //                             {productDesc && (
        //                                 <Info><span>{productDesc}</span></Info>
        //                             )}
        //                             <LabelValue>
        //                                 <span>Pemberi pinjaman</span>
        //                                 <span>{lenderName}</span>
        //                             </LabelValue>
        //                             <LabelValue>
        //                                 <span>Produk</span>
        //                                 <span>{productType}</span>
        //                             </LabelValue>
        //                             <LabelValue>
        //                                 <span>Harga Produk</span>
        //                                 <span>{printPrice(productPrice)}</span>
        //                             </LabelValue>
        //                             <LabelValue>
        //                                 <span>Nominal</span>
        //                                 <span>{productNominal}</span>
        //                             </LabelValue>
        //                             {/* <LabelValue>
        //               <span>% Bunga</span>
        //               <span>{interestPct}%</span>
        //             </LabelValue> */}
        //                             <LabelValue>
        //                                 <span>Nominal Bunga</span>
        //                                 <span>{printPrice(interestAmount)}</span>
        //                             </LabelValue>
        //                             <LabelValue>
        //                                 <span>Admin Fee</span>
        //                                 <span>{Number(adminFee) === 0 ? '0' : printPrice(Number(adminFee))}</span>
        //                             </LabelValue>
        //                             <BillValue>
        //                                 <span>Total Tagihan</span>
        //                                 <span>{printPrice(totalBill)}</span>
        //                                 <span>Bayar {moment().add(tenorDays, 'days').fromNow()}</span>
        //                             </BillValue>
        //                         </SummaryInfo>
        //                         <div style={{width: "calc(100% - 3rem)"}}>
        //                             <button>
        //                                 <Collapsible trigger="Metode Pembayaran">
        //                                     {
        //                                         banks.map((bank, index) => (
        //                                             <div key={index} className="collapsible">
        //                                                 <span> Nama Bank: <b>{bank.bankName}</b>  </span> <br/>
        //                                                 <span>Nomor Rekening : {bank.accountNumber} </span><br/>
        //                                                 <span>Atas Nama : {bank.accountName} </span>
        //                                             </div>
        //                                         ))
        //                                     }
        //                                 </Collapsible>
        //                             </button>
        //                         </div>
        //                         <InfoPrompt color="G300" margin="0 auto 1.5rem">
        //                             <img src={ImproveIcon} />
        //                             <span>Tepat waktu melunasi pembayaran akan menaikan skor kredit kamu!</span>
        //                         </InfoPrompt>
        //                         <Info align="center"><span>Dengan menekan tombol ambil pinjaman, saya setuju dengan detail pinjaman di atas.</span></Info>
        //                     </Fragment>
        //                 )}
        //                 {this.props.loaded &&
        //                 this.props.productDetail &&
        //                 !isEmpty(this.props.productDetail) &&
        //                 this.state.currentStep === docRequired.length && (
        //                     <ActionButtonWrapper>
        //                         <BigActionButton
        //                             color={this.props.hasActiveLoans ? 'N300' : 'G300'}
        //                             onClick={() => this.props.purchase(this.props.productDetail.productId)}
        //                             disabled={this.props.purchaseLoading} id={`asani-actions-purchase-product-${productType}`}
        //                         >
        //                             {!this.props.purchaseLoading && 'Ambil Pinjaman'}
        //                             {this.props.purchaseLoading && (
        //                                 <Spinner color="N0" />
        //                             )}
        //                         </BigActionButton>
        //                     </ActionButtonWrapper>
        //                 )}
        //             </ContentAnimationWrapper>
        //         </Content>
        //     </Modal>
        // );
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
  margin: 0.5rem 0 2rem;
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
      pointer-events: none;
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
  margin: 1.5rem 0 0;

  span {
    width: 100%;
    font-size: 0.875rem;
    font-weight: 400;
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

    :nth-child(3) {
      color: ${props => props.theme.color.N300};
      margin: 0.25rem 0 0;
    }
  }
`;

const LabelValue = styled.div`
  ${flex({ justify: 'flex-start', align: 'flex-start' })}
  width: 100%;
  margin: 0 0 0.5rem;

  &:last-of-type {
    margin: 0;
  }

  span {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25;
    text-align: left;
    ${flex({ justify: 'flex-start' })}

    :nth-child(1) {
      width: calc(37.5% - 0.5rem);
      color: ${props => props.theme.color.N300};
      margin: 0 1rem 0 0;
      line-height: 1.125;
    }

    :nth-child(2) {
      width: calc(62.5% - 0.5rem);
      color: ${props => props.theme.color.N800};
    }
  }
`;

const Info = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: calc(100% - 3rem);
  padding: 0;
  margin: 0.5rem auto;
  color: ${props => props.theme.color.N300};

  span {
    width: 100%;
    font-size: 0.875rem;
    font-weight: 400;
    text-align: ${props => props.align ? props.align : 'left'};
    line-height: 1.25;
    color: ${props => props.theme.color.N300};
  }
`;

const SummaryInfo = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  padding: 0 1.5rem;
  margin: 0 0 2rem;
`;


export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);