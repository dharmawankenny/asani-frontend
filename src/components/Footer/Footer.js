import React from 'react';
import styled from 'styled-components';

import WhatsAppIcon from '../../assets/whatsapp.png';

import { flex } from '../../commons/theme';

export default function Footer() {
    return (
      <Wrapper>
        <strong>Layanan Chat&nbsp;&nbsp;</strong><a href="https://api.whatsapp.com/send?phone=6281311442228" target="_blank">
          <Help src={WhatsAppIcon} />
        </a>
      </Wrapper>
    );
}

const Wrapper = styled.div`
  font-size: 0.80rem;
  color: ${props => props.theme.color.N300};
  width: 100%;
  ${flex({ justify: 'flex-end' })}

  a {
    ${flex()}
  }
`;

const Help = styled.img`
  color: ${props => props.theme.color.N300};
  height: 1.5rem;
  width: auto;
  margin: 0;
  padding: 0;
`;
