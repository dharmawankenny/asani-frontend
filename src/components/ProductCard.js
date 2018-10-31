import React from 'react';
import styled from 'styled-components';

import { flex } from '../commons/theme';

import LockIcon from '../assets/lock.svg';
import DummyIcon from '../assets/cash.svg';

export default class ProductCard extends React.Component {
  render() {
    return (
      <Wrapper>
        <ProductName locked={this.props.locked}>
          <img src={DummyIcon} />
          <span>Voucher Game</span>
        </ProductName>
        <ProductDetail>
          <h1>Loan Provider</h1>
          <h2>Bunga XX%</h2>
          <h3>Tenor XX Waktu</h3>
        </ProductDetail>
        <ProductPrice locked={this.props.locked}>
          {!this.props.locked && <h3>Pasti Cair</h3>}
          {this.props.locked && <h3><img src={LockIcon} /> Skor Minimal 750</h3>}
          <h1>Rp X.XXX.XXX</h1>
          <h2>Pilih ></h2>
        </ProductPrice>
      </Wrapper>
    );
  }
}

const Wrapper = styled.button`
  width: 100%;
  background: ${props => props.theme.color.N0};
  box-shadow: ${props => props.theme.shadow.base};
  border-radius: ${props => props.theme.borderRadius};
  padding: 0.75rem;
  ${flex({ justify: 'flex-start', align: 'stretch' })}
`;

const ProductName = styled.div`
  width: calc(17.5% - 0.5rem);
  ${flex()}
  ${props => props.locked && 'filter: grayscale(100%);'}

  img {
    width: 2.5rem;
    max-width: 100%;
    height: 2.5rem;
    object-fit: contain;
    margin: 0 0 0.25rem;
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
    margin: 0;
    color: ${props => props.theme.color.mainProductBlue};
  }
`;

const ProductDetail = styled.div`
  width: calc(35% - 0.75rem);
  margin: 0 1rem 0 1.25rem;
  ${flex({ align: 'center' })}

  h1,
  h2,
  h3 {
    width: 100%;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${props => props.theme.color.N800};
  }

  h1 {
    font-size: 0.75rem;
    font-weight: 700;
    margin: 0 0 0.375rem;
  }

  h2 {
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0 0 0.125rem;
  }

  h3 {
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0;
  }
`;

const ProductPrice = styled.div`
  width: calc(47.5% - 1rem);
  ${flex()}

  h1,
  h2,
  h3 {
    width: 100%;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${props => props.theme.color.N800};
    text-align: left;
  }

  h1 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
  }

  h2 {
    font-size: 0.875rem;
    font-weight: 700;
    margin: 0;
    padding: 0.25rem;
    border-radius: ${props => props.theme.borderRadius};
    color: ${props => props.theme.color.N0};
    background: ${props => props.locked ? props.theme.color.N100 : props.theme.color.mainProductBlue};
    box-shadow: ${props => props.theme.shadow.base};
    text-align: center;
  }

  h3 {
    font-size: 0.75rem;
    font-weight: 700;
    margin: 0 0 0.125rem;
    color: ${props => props.locked ? props.theme.color.R300 : props.theme.color.G300};
    ${flex({ justify: 'flex-start' })}

    img {
      height: 0.875rem;
      width: auto;
      margin: 0 0.125rem 0 0;
    }
  }
`;
