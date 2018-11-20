import React from 'react';
import styled from 'styled-components';

const tempResponse = {
  mainPartner: {
    id: 'DOMPET_KILAT',
    imgSrc: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_dompetkilat.png',
  },
  partners: [
    {
      id: 'TELKOMSEL',
      imgSrc: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_telkomsel.png',
    },
    {
      id: 'XL',
      imgSrc: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_xl.png',
    },
    {
      id: 'INDOSAT',
      imgSrc: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_indosat.png',
    },
    {
      id: 'SMARTFREN',
      imgSrc: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_smartfren.png',
    },
    {
      id: 'TRI',
      imgSrc: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_tri.png',
    },
    {
      id: 'GOOGLE',
      imgSrc: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_google.png',
    },
    {
      id: 'GARENA',
      imgSrc: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_garena.png',
    },
    {
      id: 'STEAM',
      imgSrc: 'https://s3-ap-southeast-1.amazonaws.com/asani-imagestorage/logo_operator/logo_steam.png',
    },
  ],
};
export default function ThirdPartiesMap() {
  const { mainPartner, partners } = tempResponse;
  return (
    <Wrapper>
      <h3>{'Mitra Lender'}</h3>
      <ImageWrapper>
        <div>
          <img src={mainPartner.imgSrc} alt={mainPartner.id} />
        </div>
      </ImageWrapper>
      <h3>{'Tawaran Pinjaman Tersedia'}</h3>
      <ImageWrapper>
        {partners.map(partner => (
          <PartnerImage src={partner.imgSrc} alt={partner.id} key={partner.id} />
        ))}
      </ImageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f4f5f7;
  margin: 0 auto;
  border-radius: 5px;
  text-align: center;
  max-width: 32rem;
  padding: 3rem 1.5rem;
  img {
    width: 92px;
  }
`;
const ImageWrapper = styled.div`
  padding: 30px 0;
`;
const PartnerImage = styled.img`
  width: calc((100% - 6rem) / 4);
  margin: 1.5rem 1.5rem 0 0;
`;
