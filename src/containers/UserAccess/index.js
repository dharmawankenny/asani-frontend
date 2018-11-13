import React, { Fragment } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import '../../assets/css/styles.css'
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
import backImage from '../../assets/web-bg.png'

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
    'Masuk/daftar nomor Whatsapp kamu di website asani.co.id.',
    'Cek kode OTP kamu di chat Whatsapp yang bersifat RAHASIA. Jangan diberitahu kepada siapapun.',
    'Pilih pinjaman produk dari pemberi pinjaman (lender) yang kamu inginkan.',
    'Upload dokumen: 1. Foto KTP, 2. Foto foto selfie kamu sambil memegang foto KTP dan harus memperlihatkan dengan jelas wajah dan informasi yang terdapat pada KTP.',
    'Verifikasi dan persetujuan pinjaman kamu diproses maksimal 30 menit di hari kerja.',
    'Setelah persetujuan pinjaman selesai, kamu akan mendapatkan produk yang diinginkan.',
    'Skor kredit kamu akan meningkat setelah kamu mengunggah dokumen atau pinjaman dilunasi!',
  ];

  static Testimonies = [
    {
      profileImg: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/testi1.png',
      name: 'Ari, 26 tahun',
      testimony: 'Seneng pake produk pulsa di Asani soalnya ga ada bunganya. Walaupun pinjaman, tapi harganya masih normal',
    },
    {
      profileImg: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/testi2.png',
      name: 'Agus, 19 tahun',
      testimony: 'Saya adalah gamer yang kadang butuh voucher games di malam hari. Pake Asani bisa mem-back up dulu, bayarnya paginya',
    },
    {
      profileImg: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/testi3.png',
      name: 'Wahid, 43 tahun',
      testimony: 'Kemarin ngambil kredit motor. Pake skor kreditnya Asani bisa dapet bunga lebih rendah. Karena pihak peminjam ada gambaran dari histori pinjaman sebelumnya',
    },
    {
      profileImg: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/testi4.png',
      name: 'Lusi, 45 tahun',
      testimony: 'Udah beli pulsa lebih dari 5 kali, dan belum pernah kecewa. Responsif dan cepat!',
    },
  ];

  static FAQ = [
    {
      question: 'Apa itu asani?',
      answer: 'Asani  adalah perusahaan skor kredit yang menyediakan angka atau nilai yang menunjukkan riwayat pembayaran pinjaman kamu. Asani dapat membantu kamu yang bahkan tidak memiliki catatan keuangan di bank untuk tetap mendapatkan pinjaman.<br /><br />Asani juga bekerja sama dengan partner lenders yang menawarkan pinjaman produk-produk yaitu digital, elektronik, mobil dan rumah khusus buat kamu!<br /><br />Keunggulan Asani: <ol><li>GRATIS cek skor kredit</li><li>Bisa beli sekarang</li><li>bayar nanti</li><li>Semua TANPA bunga dan denda</li><li>Banyak pilihan produk</li></ol>',
    },
    {
      question: 'Cara pakai asani?',
      answer: `<ol>${UserAccess.HowToUse.reduce((res, howTo) => `${res}<li>${howTo}</li>`, '')}</ol>`,
    },
    {
      question: 'Apakah Asani juga berperan sebagai pihak penyedia pinjaman?',
      answer: 'Tidak, Asani berperan sebagai platform yang menghubungkan antara penyedia pinjaman dan peminjam dana. Asani bekerja sama dengan pihak-pihak lain sebagai penyedia pinjaman yaitu Dompet Kilat dan Danamas.<br /><br />Melalui Asani, kamu dapat melakukan dua hal sekaligus yaitu pinjaman dan cek skor kredit kamu. Jika kamu melakukan pinjaman dan membayar sebelum jatuh tempo, maka skor kredit kamu akan meningkat. Dengan meningkatnya skor kredit, semakin banyak produk-produk yang dapat kamu coba!',
    },
    {
      question: 'Gimana metode pembayaran tagihan pinjaman di Asani?',
      answer: 'Kamu bisa membayar pinjaman melalui Rekening BCA 494 305 8698 atas nama PT Asani Teknologi Keuangan  dan Rekening BRI 122 3010 0054 1304 atas Nama PT Asani Teknologi Keuangan.',
    },
    {
      question: 'Produk-produk apa saja yang bisa dipakai untuk pinjaman pertama?',
      answer: 'Kalau kamu ingin memulai pinjaman pertama di Asani, minimal skor kredit kamu adalah 400. Jika kamu udah punya skor kredit 400, maka kamu bisa meminjam produk <strong>Pulsa dan Voucher Games</strong> yaitu:<br /><br />Pulsa Telkomsel 10 ribu, Google Play 20K, Steam Rp 8K, Steam Rp 12K, Garena 33 Shell, Mobile Legends 36 Diamond, Lyto 10K Game On, Megaxus 10K Mi Cash, MOL 100 Points dan Unipin Rp 10K.',
    },
    {
      question: 'Apakah saya bisa meminjam langsung nominal 100,000?',
      answer: 'Tidak bisa. Pinjaman kamu dimulai dari produk terendah hingga produk tertinggi, sesuai dengan minimal skor kredit yang dimiliki. Jadi, kalian harus mulai dari produk terendah dulu, karena skor kredit yang bagus tidak terjadi dalam satu malam, sehingga dibutuhkan proses.',
    },
    {
      question: 'Tips meningkatkan skor kredit?',
      answer: 'Kalau kamu udah cek skor kredit terupdate, dan kategori skor kredit masih rendah, saatnya kami kasih kamu tips dan trik caranya maintain dan meningkatkan skor kredit!<br /><br /><ol><li><strong>Ayo Mulai Lakukan Pinjaman Pertamamu!</strong><br />Salah satu tips untuk meningkatkan skor kredit kamu adalah memulai melakukan pinjaman pertama. Pinjaman pertama bisa kamu lakukan dengan produk pulsa dan voucher games. Detail produknya bisa kamu cek di  asani.co.id/<br /><br /></li><li><Strong>Upload Data Diri yang Sebenarnya</strong><br />Skor kredit dapat kamu gunakan untuk mengajukan kredit motor, kredit mobil, kredit rumah atau kredit apartemen ke bank atau institusi keuangan lainnya. Makanya, dibutuhkan data diri yang sebenarnya atau sesuai dengan data diri kamu.jangan lupa<br /><br /></li><li><strong>Perhatikan Tanggal Jatuh Tempo Pinjaman</strong><br />Sangat penting buat kamu untuk membayar pinjaman sebelum tanggal jatuh tempo. Maka ada baiknya, tanggal jatuh tempo dicatat agar tidak lupa. Selain itu, jangan lupa juga siapkan uang jauh-jauh hari untuk pembayaran pinjaman untuk menghindari kamu menggunakan uangnya untuk kebutuhan lain.</li></ol>',
    },
    {
      question: 'Bagaimana jika pembayaran tagihan pinjaman terlambat?',
      answer: 'Jika kamu membayar tagihan melebihi tanggal jatuh tempo, maka skor kamu akan menurun.',
    },
    {
      question: 'Bagaimana jika terlambat membayar tagihan akan mendapatkan denda atau bunga?',
      answer: 'Tidak, kamu tidak akan mendapatkan bunga atau denda jika terlambat membayar. Tetapi, jika kamu terlambat atau tidak membayar sama sekali, maka kamu tidak dapat meminjam selama tagihan belum dilunasi.',
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
      errorMessage = 'Nomor Ponsel terlalu pendek';
    } else if (cleanTelNumber.length > 13) {
      errorMessage = 'Nomor Ponsel terlalu panjang';
    }

    if (isNaN(cleanTelNumber)) {
      errorMessage = 'Nomor Ponsel hanya boleh berisi angka';
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
          text: 'Mohon maaf, sepertinya sedang ada gangguan pada sistem kami, terima kasih atas kesabaran dan pengertiannya.',
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
        text: 'Mohon maaf, sepertinya sedang ada gangguan pada sistem kami, terima kasih atas kesabaran dan pengertiannya.',
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
          text: 'Mohon maaf, sepertinya sedang ada gangguan pada sistem kami, terima kasih atas kesabaran dan pengertiannya.',
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
          <div className="bgColor" >
            <Header stopNavigation naked withHelp />
        <PageWrapper vertical>
          <Content>
            <MainFocus>
              <h1 style={{textAlign: "center", marginLeft: "auto", marginRight: "auto", fontSize: "32px", color: "white"}}>
                {this.state.step === 0 && 'Beli Pulsa dan Voucher Game Sekarang, Bayarnya Nanti!'}
                {this.state.step === 1 && 'Kode verifikasi OTP telah dikirim ke nomor WhatsApp anda'}
              </h1>
              {this.state.step === 0 && (
                <Fragment>
                  <div className="card-login">
                    <h1 style={{textAlign: "center", marginLeft: "auto", marginRight: "auto", paddingTop: "20px", marginBottom:"12px", fontWeight: 300}}>Cek Skor Kredit Kamu</h1>
                    <div className="card-padding" >
                        <Input
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
                    </div>
                  </div>
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
                  <h2>Banyak pilihan tawaran pinjaman</h2>
                </OurPro>
              </div>
            </Segment>
            <Segment>
              <h1>Tawaran Pinjaman Tersedia</h1>
              <div>
                {UserAccess.ProductsUrl.map(productUrl => <ProductIcon src={productUrl} />)}
              </div>
            </Segment>
            <Segment flex={{ justify: 'flex-start', align: 'flex-start' }}>
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
          </div>
         {/*<Background src={BgImage} />*/}
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
        <p dangerouslySetInnerHTML={{ __html: this.props.answer }} />
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
  min-height: calc(100vh - 15rem);
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

  & > p {
    font-size: 0.875rem;
    color: ${props => props.theme.color.N500};
    margin: -0.5rem 0 0.5rem;
    width: 100%;
    text-align: center;
  }

  & > div {
    width: 100%;
    ${props => props.flex ? flex(props.flex) : flex({ justify: 'center' })}
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
  width: calc((100% - 6rem) / 5);
  margin: 1.5rem 1.5rem 0 0;

  &:nth-of-type(1),
  &:nth-of-type(2),
  &:nth-of-type(3),
  &:nth-of-type(4),
  &:nth-of-type(5) {
    margin-top: 0.5rem;
  }

  &:last-of-type,
  &:nth-of-type(5n + 5) {
    margin-right: 0;
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
    display: ${props => props.active ? 'block' : 'none'};
    pointer-events: none;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${props => props.theme.color.N300};
    margin: ${props => props.active ? '0.5rem 0' : '0'};

    ol {
      width: 100%;
      margin: 0.5rem 0 0;
      padding: 0 0 0 1rem;
      font-size: 0.75rem;
      line-height: 1.25;
      color: ${props => props.theme.color.N500};

      li {
        margin: 0 0 1rem;

        &:last-of-type {
          margin: 0;
        }
      }
    }
  }
`;
