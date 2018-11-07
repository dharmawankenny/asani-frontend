import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WhatsAppIcon from '../assets/whatsapp.png';

import { flex } from '../commons/theme';

export default class Footer extends React.Component {
  render() {
    return (
      <Wrapper>
        {/* <Switcher>
          <Switch active>
            ID
          </Switch>
          <Switch>
            EN
          </Switch>
        </Switcher> */}
        <strong>Layanan Chat&nbsp;&nbsp;</strong><a href="https://api.whatsapp.com/send?phone=6281311442228" target="_blank">
          <Help src={WhatsAppIcon} />
        </a>
      </Wrapper>
    );
  }
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

const Switcher = styled.div`
  width: 4rem;
  height: 1.5rem;
  ${flex()}
  border-radius: ${props => props.theme.borderRadius};
`;

const Switch = styled.button`
  width: 2rem;
  height: 1.5rem;
  margin: 0;
  padding: 0;
  ${flex()}
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  color: ${props => props.theme.color.N0};
  background: ${props => props.theme.color.N300};
  opacity: ${props => props.active ? '1' : '0.25'};
  transition: 0.25s ease all;

  &:first-of-type {
    border-radius: ${props => props.theme.borderRadius} 0 0 ${props => props.theme.borderRadius};
  }

  &:last-of-type {
    border-radius: 0 ${props => props.theme.borderRadius} ${props => props.theme.borderRadius} 0;
  }
`;

const Help = styled.img`
  color: ${props => props.theme.color.N300};
  height: 1.5rem;
  width: auto;
  margin: 0;
  padding: 0;
`;
