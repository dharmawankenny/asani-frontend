import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';

import ChevronDownIcon from '../assets/chevron_down.svg';
import CloseIcon from '../assets/close.svg';
import ImproveIcon from '../assets/improve.svg';
import SadIcon from '../assets/sad.svg';

import { flex } from '../commons/theme';
import { printPrice, fromNow } from '../commons/utils';

import Spinner from './Spinner';

export default class LoanDetailModal extends React.Component {
  static defaultProps = {
    loanDetail: {},
  };

  state = {
    showBanks: true,
    showOutlets: true,
  };

  componentDidUpdate(prevProps) {
    if (!this.props.active && prevProps.active) {
      document.body.style.overflow = 'auto';
    } else if (this.props.active && !prevProps.active) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    if (this.props.onClose()) {
      this.props.onClose();
    }

    document.body.style.overflow = 'auto';
  }

  toggleBanks = () => this.setState(prevState => ({ showBanks: !prevState.showBanks }));
  toggleOutlets = () => this.setState(prevState => ({ showOutlets: !prevState.showOutlets }));

  render() {
    const {
      productId,
      userId,
      destinationNumber,
      createTime,
      updateTime,
      status,
      disburseBy,
      disburseTime,
      rejectBy,
      rejectTime,
      dueTime,
      paymentTime,
      paymentMethod,
      note,
      productType,
      lenderName,
      productPrice,
      productNominal,
      tenorDays,
      interestPct,
      interestAnnualPct,
      interestAmount,
      totalBill,
      urlProductLogo,
      adminFee,
      penalty,
      isSyariah,
      outlet,
      outletAddr,
      banks,
    } = this.props.loanDetail;

    return (
      <Modal active={this.props.active}>
        <Content active={this.props.active}>
          <ContentAnimationWrapper active={this.props.active} loading={this.props.loading}>
            <Header>
              <h1>Detil Peminjaman</h1>
              <button onClick={this.props.onClose} id="asani-actions-close-loan-detail"><img src={CloseIcon} /></button>
            </Header>
            {this.props.loading && (
              <SpinnerWrapper>
                <Spinner color="N800" />
              </SpinnerWrapper>
            )}
            {this.props.loaded &&
              this.props.loanDetail &&
              !isEmpty(this.props.loanDetail) && (
                <Fragment>
                  {paymentTime && (
                    <InfoPrompt color="G300" margin="0 auto">
                      <img src={ImproveIcon} />
                      <span>Tepat waktu melunasi pembayaran akan menaikan skor kredit kamu!</span>
                    </InfoPrompt>
                  )}
                  {!paymentTime && dueTime && moment(dueTime).isSameOrAfter(moment()) && (
                    <InfoPrompt color="G300" margin="0 auto">
                      <img src={ImproveIcon} />
                      <span>Tepat waktu melunasi pembayaran akan menaikan skor kredit kamu!</span>
                    </InfoPrompt>
                  )}
                  {!paymentTime && dueTime && moment(dueTime).isBefore(moment()) && (
                    <InfoPrompt color="R300" margin="0 auto">
                      <img src={SadIcon} />
                      <span>Semakin terlambat kamu membayar tagihan, skor kredit kamu akan semakin memburuk!</span>
                    </InfoPrompt>
                  )}
                  <SummaryInfo>
                    <ProductLogo src={urlProductLogo} />
                    <LabelValue>
                      <span>Total Tagihan</span>
                      <span>{printPrice(totalBill)}</span>
                    </LabelValue>
                    <LabelValue>
                      <span>Pemberi pinjaman</span>
                      <span>{lenderName}</span>
                    </LabelValue>
                    <LabelValue>
                      <span>Jatuh tempo</span>
                      <span>{dueTime ? fromNow(dueTime) : '-'}</span>
                    </LabelValue>
                    <LabelValue>
                      <span>Status</span>
                      <span>{status}</span>
                    </LabelValue>
                  </SummaryInfo>
                  <Toggler active={this.state.showBanks}>
                    <button onClick={this.toggleBanks}>
                      <h1>Pembayaran Via Transfer Bank</h1>
                      <img src={ChevronDownIcon} />
                    </button>
                    <p>Pembayaran anda akan kami salurkan ke rekening pemberi pinjaman</p>
                    {banks.map(bank => (
                      <div>
                        <LabelValue>
                          <span>Bank</span>
                          <span>{bank.bankName}</span>
                        </LabelValue>
                        <LabelValue>
                          <span>No. Rekening</span>
                          <span>{bank.accountNumber}</span>
                        </LabelValue>
                        <LabelValue>
                          <span>Atas Nama</span>
                          <span>{bank.accountName}</span>
                        </LabelValue>
                      </div>
                    ))}
                  </Toggler>
                  {outlet &&
                    outletAddr && (
                      <Toggler active={this.state.showOutlets}>
                        <button onClick={this.toggleOutlets}>
                          <h1>Pembayaran Via Outlet</h1>
                          <img src={ChevronDownIcon} />
                        </button>
                        <div>
                          <LabelValue>
                            <span>Nama Outlet</span>
                            <span>{outlet}</span>
                          </LabelValue>
                          <LabelValue>
                            <span>Alamat Outlet</span>
                            <span>{outletAddr}</span>
                          </LabelValue>
                        </div>
                      </Toggler>
                    )}
                  <DetailedInfo>
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
                      <span>Tanggal Cair</span>
                      <span>{disburseTime ? moment(disburseTime).format('DD MMM YYYY') : '-'}</span>
                    </LabelValue>
                    <LabelValue>
                      <span>Tanggal Jatuh Tempo</span>
                      <span>{dueTime ? moment(dueTime).format('DD MMM YYYY') : '-'}</span>
                    </LabelValue>
                    <LabelValue>
                      <span>Tanggal Pelunasan</span>
                      <span>{paymentTime ? moment(paymentTime).format('DD MMM YYYY') : '-'}</span>
                    </LabelValue>
                    <LabelValue>
                      <span>Metode Pelunasan</span>
                      <span>{paymentMethod ? paymentMethod : '-'}</span>
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
                    <LabelValue>
                      <span>Pinalti</span>
                      <span>{Number(penalty) === 0 ? '0' : printPrice(Number(penalty))}</span>
                    </LabelValue>
                  </DetailedInfo>
                </Fragment>
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
  min-height: ${props => props.loading ? '100%' : 'auto'};
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

const ProductLogo = styled.img`
  height: 4rem;
  width: auto;
  margin: 0 0 1rem;
`;

const LabelValue = styled.div`
  ${flex({ justify: 'flex-start', align: 'flex-start' })}
  width: 100%;

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

const SummaryInfo = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  padding: 0.75rem 1.5rem;

  span {
    font-weight: 700;
  }

  & > div {
    margin: 0 0 0.5rem;

    &:last-of-type {
      margin: 0;
    }
  }
`;

const Toggler = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  padding: 0.75rem 1.5rem;
  margin: 0;

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
      line-height: 1;
      color: ${props => props.theme.color.N800};
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
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25;
    color: ${props => props.theme.color.N300};
    margin: ${props => props.active ? '0.5rem 0' : '0'};
  }

  & > div {
    width: 100%;
    max-height: ${props => props.active ? '20rem' : '0'};
    opacity: ${props => props.active ? '1' : '0'};
    transition: ${props => props.active ? '0.125s ease max-height, 0.125s ease opacity 0.125s' : '0.125s ease max-height 0.125s, 0.125s ease opacity'};
    pointer-events: none;

    & > div {
      margin: 0 0 0.5rem;

      &:first-of-type {
        margin: 0.5rem 0;
      }

      &:last-of-type {
        margin: 0.5rem 0;
      }
    }
  }
`;

const DetailedInfo = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  padding: 0.75rem 1.5rem 3rem;

  & > div {
    margin: 0 0 0.5rem;

    &:last-of-type {
      margin: 0;
    }
  }
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
