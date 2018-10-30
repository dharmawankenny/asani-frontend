import React from 'react';
import styled from 'styled-components';

import { flex } from '../commons/theme';

import DummyIcon from '../assets/cash.svg';

export default class ProductCard extends React.Component {
  render() {
    return (
      <Wrapper locked={this.props.locked}>
        <ProductName>
          <img src={DummyIcon} />
          <span>Cash</span>
        </ProductName>
        <ProductDetail>
          <h1>Loan Provider</h1>
          <h2>Bunga XX%</h2>
          <h3>Tenor XX Waktu</h3>
        </ProductDetail>
        <ProductPrice>
          <h1>Rp X.XXX.XXX</h1>
          <h3>Pasti Cair</h3>
          <h2>{this.props.locked ? 'Terkunci' : 'Pilih >'}</h2>
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
  filter: ${props => props.locked ? 'grayscale(100%)' : 'none'};
`;

const ProductName = styled.div`
  width: calc(15% - 0.25rem);
  ${flex()}

  img {
    width: 2.5rem;
    height: auto;
    margin: 0 0 0.25rem;
  }

  span {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
    color: ${props => props.theme.color.mainProductBlue};
  }
`;

const ProductDetail = styled.div`
  width: calc(42.5% - 0.5rem);
  margin: 0 0rem 0 1rem;
  ${flex({ align: 'flex-start' })}

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
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  h2 {
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0 0 0.25rem;
  }

  h3 {
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0;
  }
`;

const ProductPrice = styled.div`
  width: calc(42.5% - 0.25rem);
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
    text-align: center;
  }

  h1 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0;
  }

  h2 {
    font-size: 0.875rem;
    font-weight: 700;
    margin: 0;
    padding: 0.25rem;
    border-radius: ${props => props.theme.borderRadius};
    color: ${props => props.theme.color.N0};
    background: ${props => props.theme.color.mainProductBlue};
  }

  h3 {
    font-size: 0.75rem;
    font-weight: 700;
    margin: 0 0 0.375rem;
    color: ${props => props.theme.color.G500};
  }
`;
