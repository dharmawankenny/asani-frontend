import React, { Fragment } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';

import { flex } from '../../commons/theme';

import { BigActionButton } from '../../components/Buttons';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { PageWrapper } from '../../components/PageBuilder';
import Spinner from '../../components/Spinner';

import { Consumer as AuthConsumer } from '../../contexts/auth';

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
        <Header stopNavigation />
        <PageWrapper vertical>
          <Content>
            <h1>
              {this.state.step === 0 && 'Cek skor kredit kamu GRATIS.\nTemukan pinjaman terbaikmu!'}
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
                  type="number"
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
          </Content>
          <Footer />
        </PageWrapper>
      </Fragment>
    );
  }
}

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
