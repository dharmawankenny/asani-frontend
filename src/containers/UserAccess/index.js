import React, { Fragment } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';

import BgImage from '../../assets/bg.png';
import Imgjempol from '../../assets/Imgjempol.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { flex } from '../../commons/theme';

import { BigActionButton } from '../../components/Buttons';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { PageWrapper } from '../../components/PageBuilder';
import Spinner from '../../components/Spinner';

import { Consumer as AuthConsumer } from '../../contexts/auth';

import HelpIcon from '../../assets/help.svg';

import {
  postSendOTP,
  postCheckOTPLogin,
} from '../../api';

export default class UserAccess extends React.Component {
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
            <h1>
              {this.state.step === 0 && 'Beli Voucher Game dan Pulsa Sekarang, Bayarnya Nanti!'}
              {this.state.step === 1 && 'Kode verifikasi OTP telah dikirim ke nomor WhatsApp anda'}
            </h1>
            {this.state.step === 0 && (
              <Fragment>
				<Subheader>
				  <h5>
					Nomor WhatsApp Kamu
				  </h5>
				</Subheader>
                <Input
                  label=""
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
				<Subheader>
				  <h5>
					4 Angka Kode OTP Yang Diberikan Via WhatsApp
				  </h5>
				</Subheader>
                <Input
                  label=""
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
            <table>
              <tr>
                <td colSpan="2"> <h1></h1></td>
              </tr>
              <tr>
                <td width="57%" align="center"><FontAwesomeIconColor><FontAwesomeIcon icon="award" size='4x'/></FontAwesomeIconColor></td>
                <td width="50%" align="center"><FontAwesomeIconColor><FontAwesomeIcon icon="trophy" size='4x'/></FontAwesomeIconColor></td>
              </tr>
              <tr>
                <td width="57%" align="center"><KeunggulanText>GRATIS cek skor kredit</KeunggulanText></td>
                <td width="50%" align="center"><KeunggulanText>Bisa beli sekarang, bayar nanti</KeunggulanText></td>
              </tr>
              <tr>
                <td colSpan="2"> <h1></h1></td>
              </tr>
              <tr>
                <td width="57%" align="center"><FontAwesomeIconColor><FontAwesomeIcon icon="ban" size='4x'/></FontAwesomeIconColor></td>
                <td width="50%" align="center"><FontAwesomeIconColor><FontAwesomeIcon icon="thumbs-up" size='4x'/></FontAwesomeIconColor></td>
              </tr>
              <tr>
                <td width="57%" align="center"><KeunggulanText>Semua TANPA bunga & Denda</KeunggulanText></td>
                <td width="50%" align="center"><KeunggulanText>Banyak pilihan produk</KeunggulanText></td>
              </tr>
            </table>
          </Content>
		      <h1></h1>
		      <table>
		        <tr>
				      <td width="60%">
					      <Pttext>&copy; 2018 Asani</Pttext>
				        <Pttext>PT Teknologi Skoring Nusantara</Pttext>
				        <Pttext>Roxy Mas E2/35 Jl. K.H. Hasyim Ashari 125 Cideng, Gambir, Jakarta Pusat</Pttext>
				        <Pttext>Telp: +6281311442228</Pttext>
				      </td>
				      <td><Footer /></td>
			      </tr>
			    </table>
        </PageWrapper>
        <Background src={BgImage} />
      </Fragment>
    );
  }
}


const FontAwesomeIconColor = styled.div`
color: ${props => props.theme.color.N300};
`
const Subheader = styled.div`
color: ${props => props.theme.color.N300};
`

const  KeunggulanText = styled.div`
color: ${props => props.theme.color.N300};
font-size: 0.75rem;
`

const Pttext = styled.div`
color: ${props => props.theme.color.N200};
width: calc(100% - 0.5rem);
pointer-events: none;
font-size: 0.75rem;
`
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
  flex: 1;

  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.5;
    text-align: left;
    margin: 0 0 2rem;
    padding: 0;
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
