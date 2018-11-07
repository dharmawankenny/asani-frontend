import React, { Fragment } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';

import BgImage from '../../assets/bg.png';
import CreditScoreIcon from '../../assets/credit_score.svg';
import NoInterestIcon from '../../assets/no_interest.svg';
import BuyNowPayLaterIcon from '../../assets/buy_now_pay_later.svg';
import ManyProductsIcon from '../../assets/many_products.svg';
import EmptyProfileImg from '../../assets/empty_profile.png';
import { flex } from '../../commons/theme';

import { BigActionButton } from '../../components/Buttons';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { PageWrapper } from '../../components/PageBuilder';
import Spinner from '../../components/Spinner';

import { Consumer as AuthConsumer } from '../../contexts/auth';

import HelpIcon from '../../assets/help.svg';
import ChevronIcon from '../../assets/chevron_down_white.svg';
import ChevronBlueIcon from '../../assets/chevron_down.svg';

import {
  getAllBanners,
  postSendOTP,
  postCheckOTPLogin,
} from '../../api';

export default class UserAccess extends React.Component {
  static ProductsUrl = [
    'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_telkomsel.png',
    'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_xl.png',
    'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_indosat.png',
    'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_steam.png',
    'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_garena.png',
    'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_google.png',
    'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_gemscool.png',
    'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_mobilelegends.png',
    'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_pubg.png',
    'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_itunes.png',
  ];

  static HowToUse = [
    'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
  ];

  static Testimonies = [
    {
      profileImg: EmptyProfileImg,
      name: 'John Doe',
      testimony: 'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    },
    {
      profileImg: EmptyProfileImg,
      name: 'John Doe',
      testimony: 'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    },
    {
      profileImg: EmptyProfileImg,
      name: 'John Doe',
      testimony: 'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    },
    {
      profileImg: EmptyProfileImg,
      name: 'John Doe',
      testimony: 'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    },
  ];

  static FAQ = [
    {
      question: 'Lorem Ipsum Dolor Sit Amet At donec proin parturient a condimentum',
      answer: 'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    },
    {
      question: 'Lorem Ipsum Dolor Sit Amet At donec proin parturient a condimentum',
      answer: 'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    },
    {
      question: 'Lorem Ipsum Dolor Sit Amet At donec proin parturient a condimentum',
      answer: 'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    },
    {
      question: 'Lorem Ipsum Dolor Sit Amet At donec proin parturient a condimentum',
      answer: 'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    },
    {
      question: 'Lorem Ipsum Dolor Sit Amet At donec proin parturient a condimentum',
      answer: 'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    },
    {
      question: 'Lorem Ipsum Dolor Sit Amet At donec proin parturient a condimentum',
      answer: 'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    },
    {
      question: 'Lorem Ipsum Dolor Sit Amet At donec proin parturient a condimentum',
      answer: 'At donec proin parturient a condimentum parturient faucibus rutrum suspendisse dignissim justo a adipiscing habitant a scelerisque pulvinar cubilia tristique.',
    },
  ];

  state = {
    telNumber: '',
    telNumberError: '',
    otpCode: '',
    otpCodeError: '',
    step: 0,
    retryTimer: 300,
    loading: false,
  };

  componentWillUnmount() {
    if (this.retryInterval) {
      clearInterval(this.retryInterval);
    }
  }

  fetchBanners = async () => {
    const res = await getAllBanners();

    if (res && res.data && res.data.data) {
      this.setState({ banners: res.data.data, bannersLoading: false, bannersLoaded: true });
      console.log(res.data.data);
    }
  }

  setTelNumber = telNumber => this.setState({ telNumber });
  setOtpCode = otpCode => this.setState({ otpCode });

  validateTelNumber = async () => {
    const { telNumber } = this.state;
    const cleanTelNumber = telNumber.startsWith('0') ? telNumber.slice(1, telNumber.length) : telNumber;
    let errorMessage = '';

    if (cleanTelNumber.length < 8) {
      errorMessage = 'Nomor WhatsApp terlalu pendek';
    } else if (cleanTelNumber.length > 13) {
      errorMessage = 'Nomor WhatsApp terlalu panjang';
    }

    if (isNaN(cleanTelNumber)) {
      errorMessage = 'Nomor WhatsApp hanya boleh berisi angka';
    }

    if (errorMessage) {
      await this.setState({ telNumberError: errorMessage });
      return false;
    } else if (telNumber !== cleanTelNumber) {
      await this.setState({ telNumber: cleanTelNumber });
    }

    await this.setState({ telNumberError: '' });
    return true;
  }

  validateOTPCode = async () => {
    const { otpCode } = this.state;
    let errorMessage = '';

    if (otpCode.length !== 4) {
      errorMessage = 'Kode OTP hanya berisikan 4 angka';
    }

    if (isNaN(otpCode)) {
      errorMessage = 'Kode OTP hanya berisikan angka';
    }

    if (errorMessage) {
      await this.setState({ otpCodeError: errorMessage });
      return false;
    }

    await this.setState({ otpCodeError: '' });
    return true;
  }

  toRequestOTP = async () => {
    if (await this.validateTelNumber()) {
      // todo call api here
      await this.setState({ loading: true });

      const sendOTPResult = await postSendOTP(this.state.telNumber);

      if (sendOTPResult) {
        await this.setState({ step: 1 });

        this.retryInterval = setInterval(() => {
          this.setState(prevState => {
            if (prevState.retryTimer === 1) {
              clearInterval(this.retryInterval);
              return { retryTimer: 0 };
            }

            return { retryTimer: prevState.retryTimer - 1 };
          });
        }, 1000);
      } else {
        swal({
          text: 'Mohon maaf, sepertinya sedang ada gangguang pada sistem kami, terima kasih atas kesabaran dan pengertiannya.',
          icon: 'error',
        });
      }

      await this.setState({ loading: false });
    }
  };

  toRetryOTP = async () => {
    // todo call api here
    await this.setState({ loading: true });

    const sendOTPResult = await postSendOTP(this.state.telNumber);

    if (sendOTPResult) {
      await this.setState({ retryTimer: 300 });

      this.retryInterval = setInterval(() => {
        this.setState(prevState => {
          if (prevState.retryTimer === 1) {
            clearInterval(this.retryInterval);
            return { retryTimer: 0 };
          }

          return { retryTimer: prevState.retryTimer - 1 };
        });
      }, 1000);
    } else {
      swal({
        text: 'Mohon maaf, sepertinya sedang ada gangguang pada sistem kami, terima kasih atas kesabaran dan pengertiannya.',
        icon: 'error',
      });
    }

    await this.setState({ loading: false });
  };

  toVerifyOTP = logIn => async () => {
    // todo call api here
    if (await this.validateOTPCode()) {
      await this.setState({ loading: true });

      const checkOTPLoginResult = await postCheckOTPLogin(this.state.telNumber, this.state.otpCode);
      console.log(checkOTPLoginResult);

      if (checkOTPLoginResult && checkOTPLoginResult.data && checkOTPLoginResult.data.token) {
		    logIn(checkOTPLoginResult.data.token);
      } else if (checkOTPLoginResult.data.result === 2){
  		  swal({
    			text: 'Mohon maaf, sepertinya OTP kamu salah. Mohon periksa kembali.',
    			icon: 'error',
  		  });
	    } else {
        swal({
          text: 'Mohon maaf, sepertinya sedang ada gangguang pada sistem kami, terima kasih atas kesabaran dan pengertiannya.',
          icon: 'error',
        });
      }
      await this.setState({ loading: false });
    }
  };

  buildTimeString = time => {
    const minute = Math.floor(time / 60);
    const second = time % 60;

    return `${minute > 9 ? minute : `0${minute}`}:${second > 9 ? second : `0${second}`}`;
  };

  render() {
    return (
      <Fragment>
        <Header stopNavigation naked />
        <PageWrapper vertical>
          <Content>
            <MainFocus>
              <h1>
                {this.state.step === 0 && 'Beli Voucher Game dan Pulsa Sekarang, Bayarnya Nanti!'}
                {this.state.step === 1 && 'Kode verifikasi OTP telah dikirim ke nomor WhatsApp anda'}
              </h1>
              {this.state.step === 0 && (
                <Fragment>
                  <Input
                    label="Nomor WhatsApp Kamu"
                    prefix="+62"
                    type="tel"
                    placeholder="8XXXXXXXXX"
                    value={this.state.telNumber}
                    error={this.state.telNumberError}
                    onChange={evt => this.setTelNumber(evt.target.value)}
                  />
                  <BigActionButton onClick={this.state.loading ? null : this.toRequestOTP} margin="1rem 0 0" id="asani-actions-sign-in">
                    {!this.state.loading && 'Masuk / Daftar'}
                    {this.state.loading && (
                      <Spinner color="N0" />
                    )}
                  </BigActionButton>
                </Fragment>
              )}
            {this.state.step === 1 && (
              <Fragment>
                <Input
                  label="4 Angka Kode OTP Yang Diberikan Via WhatsApp"
                  type="text"
                  placeholder="XXXX"
                  value={this.state.otpCode}
                  error={this.state.otpCodeError}
                  onChange={evt => this.setOtpCode(evt.target.value)}
                />
                <AuthConsumer>
                  {({ logIn }) => (
                    <BigActionButton onClick={this.state.loading ? null : this.toVerifyOTP(logIn)} margin="1rem 0 0" id="asani-actions-verify-otp">
                      {!this.state.loading && 'Verifikasi Kode OTP'}
                      {this.state.loading && (
                        <Spinner color="N0" />
                      )}
                    </BigActionButton>
                  )}
                </AuthConsumer>
                {this.state.retryTimer > 0 && (
                  <RetryCounter>Kirim ulang kode verifikasi OTP dalam <strong>{this.buildTimeString(this.state.retryTimer)}</strong></RetryCounter>
                )}
                {this.state.retryTimer === 0 && (
                  <RetryButton onClick={this.state.loading ? null : this.toRetryOTP} id="asani-actions-retry-otp">
                    {!this.state.loading && 'Kirim Ulang Kode Verifikasi OTP'}
                    {this.state.loading && (
                      <Spinner color="N0" />
                    )}
                  </RetryButton>
                )}
              </Fragment>
            )}
            </MainFocus>
            <Segment margin="0 0 2rem">
              <h1>Keunggulan Kami</h1>
              <div>
                <OurPro margin="1rem 1rem 1rem 0">
                  <img src={CreditScoreIcon} />
                  <h2>Cek skor kredit gratis</h2>
                </OurPro>
                <OurPro margin="1rem 0 1rem 1rem">
                  <img src={NoInterestIcon} />
                  <h2>Tanpa bunga, tanpa denda</h2>
                </OurPro>
                <OurPro margin="1rem 1rem 0 0">
                  <img src={BuyNowPayLaterIcon} />
                  <h2>Beli sekarang bayar nanti</h2>
                </OurPro>
                <OurPro margin="1rem 0 0 1rem">
                  <img src={ManyProductsIcon} />
                  <h2>Banyak pilihan produk pinjaman</h2>
                </OurPro>
              </div>
            </Segment>
            <Segment>
              <h1>Produk Pinjaman Tersedia</h1>
              <div>
                {UserAccess.ProductsUrl.map(productUrl => <ProductIcon src={productUrl} />)}
              </div>
            </Segment>
            <Segment>
              <h1>Cara Pakai Asani</h1>
              <div>
                <OrderedList>
                  {UserAccess.HowToUse.map(howTo => <li>{howTo}</li>)}
                </OrderedList>
              </div>
            </Segment>
            <Segment>
              <h1>Testimoni Pelanggan</h1>
              <div>
                {UserAccess.Testimonies.map(tst => (
                  <Testimony>
                    <img src={tst.profileImg} />
                    <h2>{tst.name}</h2>
                    <p>{tst.testimony}</p>
                  </Testimony>
                ))}
              </div>
            </Segment>
            <Segment>
              <h1>FAQ</h1>
              <div>
                {UserAccess.FAQ.map(faq => (
                  <FAQItem {...faq} />
                ))}
              </div>
            </Segment>
          </Content>
				  <Footer withCopy />
        </PageWrapper>
        <Background src={BgImage} />
      </Fragment>
    );
  }
}

class FAQItem extends React.Component {
  state = {
    active: false,
  };

  toggleActive = () => this.setState(prevState => ({ active: !prevState.active }));

  render() {
    return (
      <FAQToggler active={this.state.active}>
        <button onClick={this.toggleActive}>
          <h1>{this.props.question}</h1>
          <img src={ChevronBlueIcon} />
        </button>
        <p>{this.props.answer}</p>
      </FAQToggler>
    );
  }
}

const Background = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100;
  z-index: -1;
  opacity: 0.5;
`;

const Content = styled.div`
  width: 100%;
  ${flex({ justify: 'flex-start' })}

  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.5;
    text-align: left;
    margin: 0 0 2rem;
    padding: 0;
  }
`;

const MainFocus = styled.div`
  width: 100%;
  min-height: calc(100vh - 5rem);
  ${flex({ justify: 'flex-start' })}
`;

const Carousel = styled.div`
  width: calc(100% + 3rem);
  margin: 0 -1.5rem 1.5rem;
  height: 10rem;
  position: relative;
  ${flex()}

  & > img {
    width: 100%;
    height: 10rem;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 4rem;
    width: 1.5rem;
    height: 2.5rem;
    background: rgba(9, 30, 66, 0.5);
    ${flex()}

    &.left {
      left: 0;

      img {
        transform: rotate(90deg);
      }
    }

    &.right {
      right: 0;

      img {
        transform: rotate(-90deg);
      }
    }

    img {
      width: 1rem;
      height: 1rem;
    }
  }
`;

const RetryCounter = styled.span`
  width: 100%;
  margin: 1rem 0 0;
  padding: 0;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  color: ${props => props.theme.color.N300};

  strong {
    font-weight: 700;
    color: ${props => props.theme.color.N800};
  }
`;

const RetryButton = styled.button`
  width: 100%;
  margin: 1rem 0 0;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  color: ${props => props.theme.color.N0};
  background: ${props => props.theme.color.N300};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadow.base};
`;

const Help = styled.img`
  height: 1.5rem;
  width: auto;
  margin: 0;
  padding: 0;
`;

const Segment = styled.div`
  width: 100%;
  margin: ${props => props.margin ? props.margin : '2rem 0'};

  & > h1 {
    font-size: 1.25rem;
    color: ${props => props.theme.color.N500};
    margin: 0 0 1rem;
    width: 100%;
    text-align: center;
  }

  & > div {
    width: 100%;
    ${flex({ justify: 'center' })}
  }
`;

const OurPro = styled.div`
  width: calc(50% - 1rem);
  margin: ${props => props.margin};
  ${flex()}
  position: relative;

  img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
  }

  h2 {
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25;
    text-align: center;
    margin: 0.75rem 0 0;
    color: ${props => props.theme.color.N500};
  }
`;

const ProductIcon = styled.img`
  width: calc((100% - 4.5rem) / 4);
  margin: 1.5rem 1.5rem 0 0;

  &:nth-of-type(1),
  &:nth-of-type(2),
  &:nth-of-type(3),
  &:nth-of-type(4) {
    margin-top: 0.5rem;
  }

  &:last-of-type,
  &:nth-of-type(4n + 4) {
    margin-right: 0;
  }
`;

const OrderedList = styled.ol`
  width: 100%;
  margin: 0.5rem 0 0;
  padding: 0 0 0 1rem;
  font-size: 0.875rem;
  line-height: 1.25;
  color: ${props => props.theme.color.N500};

  li {
    margin: 0 0 1rem;

    &:last-of-type {
      margin: 0;
    }
  }
`;

const Testimony = styled.div`
  width: calc(50% - 1rem);
  margin: 2rem 2rem 0 0;
  ${flex()}

  &:nth-of-type(1),
  &:nth-of-type(2) {
    margin-top: 1rem;
  }

  &:nth-of-type(2n + 2) {
    margin-right: 0;
  }

  img {
    width: 5rem;
    height: 5rem;
    object-fit: contain;
    border-radius: 5rem;
    box-shadow: ${props => props.theme.shadow.base};
    border: 0.1rem solid ${props => props.theme.color.N0};
  }

  h2,
  p {
    width: 100%;
    line-height: 1.25;
    text-align: center;
    color: ${props => props.theme.color.N500};
  }

  h2 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0.75rem 0 0;
  }

  p {
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0.25rem 0 0;
  }
`;

const FAQToggler = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  padding: 0 0 1rem;
  margin: 0.5rem 0 0;

  button {
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.color.N40};
    padding: 0 0 0.5rem;
    ${flex({ justify: 'flex-start' })}

    h1 {
      flex: 1;
      font-size: 0.875rem;
      font-weight: 400;
      text-align: left;
      line-height: 1.25;
      color: ${props => props.theme.color.N500};
      margin: 0;
    }

    img {
      width: 1rem;
      height: 1rem;
      object-fit: contain;
      margin: 0 0 0 1rem;
      transform: rotate(${props => props.active ? '180deg' : '0deg'});
      transition: 0.25s ease all;
    }
  }

  p {
    width: 100%;
    max-height: ${props => props.active ? '20rem' : '0'};
    opacity: ${props => props.active ? '1' : '0'};
    transition: ${props => props.active ? '0.125s ease max-height, 0.125s ease opacity 0.125s' : '0.125s ease max-height 0.125s, 0.125s ease opacity'};
    pointer-events: none;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${props => props.theme.color.N300};
    margin: ${props => props.active ? '0.5rem 0' : '0'};
  }
`;
