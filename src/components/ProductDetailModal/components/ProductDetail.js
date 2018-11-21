import React from 'react';
import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';
import ImproveIcon from '../../../assets/improve.svg';

import { printPrice } from '../../../commons/utils';
import { ProductLogo, InfoPrompt, BillValue, LabelValue, Info, SummaryInfo } from '../ProductDetailModal.styled';

export default function ProductDetail({ productDetail }) {
  if (!productDetail && isEmpty(productDetail)) {
    return null;
  }
  const {
    productType,
    lenderName,
    productPrice,
    productNominal,
    productDesc,
    tenorDays,
    // interestPct,
    interestAmount,
    // interestAnnualPct,
    totalBill,
    urlProductLogo,
    adminFee,
    // penalty,
  } = productDetail;
  return (
    <React.Fragment>
      <SummaryInfo>
        <ProductLogo src={urlProductLogo} />
        {productDesc && (
          <Info>
            <span>{productDesc}</span>
          </Info>
        )}
        <LabelValue>
          <span>{'Pemberi pinjaman'}</span>
          <span>{lenderName}</span>
        </LabelValue>
        <LabelValue>
          <span>{'Produk'}</span>
          <span>{productType}</span>
        </LabelValue>
        <LabelValue>
          <span>{'Harga Produk'}</span>
          <span>{printPrice(productPrice)}</span>
        </LabelValue>
        <LabelValue>
          <span>{'Nominal'}</span>
          <span>{productNominal}</span>
        </LabelValue>
        {/* <LabelValue>
        <span>% Bunga</span>
        <span>{interestPct}%</span>
      </LabelValue> */}
        <LabelValue>
          <span>{'Nominal Bunga'}</span>
          <span>{printPrice(interestAmount)}</span>
        </LabelValue>
        <LabelValue>
          <span>{'Admin Fee'}</span>
          <span>{Number(adminFee) === 0 ? '0' : printPrice(Number(adminFee))}</span>
        </LabelValue>
        <BillValue>
          <span>{'Total Tagihan'}</span>
          <span>{printPrice(totalBill)}</span>
          <span>
            Bayar{' '}
            {moment()
              .add(tenorDays, 'days')
              .fromNow()}
          </span>
        </BillValue>
      </SummaryInfo>
      <InfoPrompt color="G300" margin="0 auto 1.5rem">
        <img src={ImproveIcon} alt={'ImproveIcon'} />
        <span>{'Tepat waktu melunasi pembayaran akan menaikan skor kredit kamu!'}</span>
      </InfoPrompt>
      <Info align="center">
        <span>{'Dengan menekan tombol ambil pinjaman, saya setuju dengan detail pinjaman di atas.'}</span>
      </Info>
    </React.Fragment>
  );
}
