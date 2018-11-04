import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import { flex } from '../commons/theme';
import { printPrice } from '../commons/utils';

import LockIcon from '../assets/lock.svg';
import DummyIcon from '../assets/cash.svg';

export default class ProductCard extends React.Component {
  static propTypes = {
    product: PropTypes.shape({
      productId: PropTypes.number,
      lenderName: PropTypes.string,
      productPrice: PropTypes.number,
      productNominal: PropTypes.string,
      productType: PropTypes.string,
      minCreditScore: PropTypes.number,
      tenorDays: PropTypes.number,
      interestPct: PropTypes.string,
      urlProductLogo: PropTypes.string,
      isLocked: PropTypes.number,
    }).isRequired,
  };

  static defaultProps = {
    product: {},
  };

  render() {
    const {
      productId,
      lenderName,
      productPrice,
      productNominal,
      productType,
      minCreditScore,
      tenorDays,
      interestPct,
      urlProductLogo,
      isLocked,
    } = this.props.product;

    return (
      <Wrapper onClick={this.props.onClick} disabled={isLocked} id="asani-actions-view-product-detail">
        <ProductName locked={isLocked}>
          <img src={urlProductLogo} />
        </ProductName>
        <ProductDetail locked={isLocked}>
          <h1>{productType} {productNominal}</h1>
          <h2>{lenderName}</h2>
          {isLocked ? (<h3>Skor Minimal {minCreditScore}</h3>) : (<h3>Pasti Cair</h3>)}
        </ProductDetail>
        <ProductPrice locked={isLocked}>
          <h1>{printPrice(productPrice)}</h1>
          <span>Bayar {moment().add(tenorDays, 'days').fromNow()}</span>
          <h2>{isLocked ? (<Fragment><img src={LockIcon} /><span> Terkunci</span></Fragment>) : 'Pilih >'}</h2>
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
  width: calc(15% - 0.5rem);
  ${props => props.locked && 'filter: grayscale(100%);'}
  ${flex({ direction: 'column', justify: 'center' })}
  pointer-events: none;

  img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
    margin: 0 0 0.25rem;
    pointer-events: none;
  }
`;

const ProductDetail = styled.div`
  width: calc(45% - 0.75rem);
  margin: 0 1rem 0 1.25rem;
  ${flex({ justify: 'flex-start' })}
  pointer-events: none;

  h1,
  h2,
  h3 {
    width: 100%;
    text-align: left;
    color: ${props => props.locked ? props.theme.color.N100 : props.theme.color.N800};
    pointer-events: none;
  }

  h1 {
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.125;
    margin: 0 0 0.25rem;
  }

  h2 {
    font-size: 0.75rem;
    font-weight: 400;
    margin: 0 0 0.25rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  h3 {
    width: auto;
    font-size: 0.75rem;
    font-weight: 700;
    margin: 0 0 0.125rem;
    color: ${props => props.locked ? props.theme.color.R300 : props.theme.color.G300};
    ${flex({ justify: 'flex-start' })}
  }
`;

const ProductPrice = styled.div`
  width: calc(40% - 1rem);
  ${flex()}
  pointer-events: none;

  h1,
  h2,
  h3 {
    width: 100%;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${props => props.locked ? props.theme.color.N100 : props.theme.color.N800};
    text-align: left;
    pointer-events: none;
  }

  h1 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0.0625rem;
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
    ${flex()}

    span {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-weight: 700;
    }

    img {
      height: 0.875rem;
      width: auto;
      margin: 0 0.125rem 0 0;
    }
  }

  h3 {
    font-size: 0.75rem;
    font-weight: 700;
    margin: 0 0 0.125rem;
    color: ${props => props.locked ? props.theme.color.R300 : props.theme.color.G300};
  }

  & > span {
    width: 100%;
    text-align: left;
    font-size: 0.75rem;
    margin: 0 0 0.25rem;
    color: ${props => props.locked ? props.theme.color.N100 : props.theme.color.N800};
    text-align: left;
    pointer-events: none;
  }
`;
