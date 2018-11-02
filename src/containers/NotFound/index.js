import React, { Fragment } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';

import SITEMAP from '../../commons/sitemap';
import { flex } from '../../commons/theme';

import { BigActionButton } from '../../components/Buttons';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { PageWrapper } from '../../components/PageBuilder';

export default class NotFound extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <PageWrapper vertical>
          <Header />
          <Content>
            <h1>404 :(</h1>
            <h2>Oh Tidak, anda tersesat, halaman yang anda cari tidak tersedia pada Asani :(</h2>
            <BigActionButton onClick={() => navigate(SITEMAP.HOME)}>Kembali ke Beranda</BigActionButton>
          </Content>
          <Footer />
        </PageWrapper>
      </Fragment>
    );
  }
}

const Content = styled.div`
  flex: 1;
  ${flex()}

  h1 {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
    margin: 0 0 2rem;
    text-align: center;
    color: ${props => props.theme.color.N800};
  }

  h2 {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25;
    text-align: center;
    margin: 0 0 2rem;
    color: ${props => props.theme.color.N300};
  }
`;
