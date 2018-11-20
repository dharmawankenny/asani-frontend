import React from 'react';
import styled from 'styled-components';

import CreditScore from '../../assets/credit_score.svg';
import NoInterest from '../../assets/nointerest.svg';
import PayLater from '../../assets/paylater.svg';
import ManyProducts from '../../assets/manyproducts.svg';

export const features = [
  {
    id: 'CreditScore',
    imgSrc: CreditScore,
    text: 'Cek & tingkatkan skor kredit kamu, gratis!',
  },
  {
    id: 'NoInterest',
    imgSrc: NoInterest,
    text: 'Pilih pinjaman terbaikmu dari mitra lender kami',
  },
  {
    id: 'PayLater',
    imgSrc: PayLater,
    text: 'Proses cepat, teman disaat darurat',
  },
  {
    id: 'ManyProducts',
    imgSrc: ManyProducts,
    text: 'Tanpa bunga, tanpa denda, tanpa jaminan',
  },
];

export default function FeaturesMap() {
  return (
    <Wrapper>
      {features.map(feature => (
        <FeatureCard key={feature.id}>
          <img src={feature.imgSrc} alt={feature.id} />
          <p>{feature.text}</p>
        </FeatureCard>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 32rem;
  flex-wrap: wrap;
  align-items: center;
  margin: 60px auto;
`;

const FeatureCard = styled.div`
  width: calc(50% - 1rem);
  margin: 1rem 1rem 1rem 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
    margin: 0 auto;
  }
  p {
    margin: 0;
    width: 100%;
    margin-top: 0.75rem;
    font-size: 1rem;
    display: block;
    font-weight: 400;
    line-height: 1.25;
    text-align: center;
    color: #42526e;
  }
`;
