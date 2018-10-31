import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { navigate } from '@reach/router';

import SITEMAP from '../../commons/sitemap';
import { flex } from '../../commons/theme';

import { BigActionButton } from '../../components/Buttons';
import Header from '../../components/Header';
import LoanCard from '../../components/LoanCard';
import {
  PageWrapper,
  SegmentContext,
  SegmentHeader,
  FullSegmentHeader,
  SegmentAction,
  SegmentDescription,
  SpinnerWrapper,
} from '../../components/PageBuilder';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';

import { Consumer as AuthConsumer } from '../../contexts/auth';

export default class Home extends React.Component {
  static SORT_QUERIES = [
    'Pasti Cair',
    'Nilai Kredit Tertinggi',
    'Bunga Terendah',
    'Tenor Terlama',
  ];

  state = {
    showFilterModal: false,
    sortQuery: 'Pasti Cair',
    productQuery: {
      Tunai: true,
      Pulsa: true,
      'Paket Data': true,
      Steam: true,
      'Mobile Legend': true,
      'PUBG Mobile': true,
    },
  };

  toggleFilter = () => {
    this.setState(prevState => {
      if (prevState.showFilterModal) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }

      return { showFilterModal: !prevState.showFilterModal };
    });
  }

  setSortQuery = sortQuery => () => this.setState({ sortQuery });

  toggleProductQuery = productKey => () => {
    this.setState(prevState => ({
      productQuery: {
        ...prevState.productQuery,
        [productKey]: !prevState.productQuery[productKey],
      },
    }));
  };

  isAllProductQueryEnabled = productQuery => Object.values(productQuery).every(flag => flag);

  toggleAllProduct = () => {
    this.setState(prevState => {
      const newProductQuery = { ...prevState.productQuery };

      if (this.isAllProductQueryEnabled(newProductQuery)) {
        Object.keys(newProductQuery).forEach(key => newProductQuery[key] = false);

        return { productQuery: { ...newProductQuery } };
      }

      Object.keys(newProductQuery).forEach(key => newProductQuery[key] = true);

      return { productQuery: { ...newProductQuery } };
    });
  };

  render() {
    return (
      <PageWrapper>
        <Header withMenu />
        <CreditScoreSummary>
          <SegmentContext>
            <SegmentHeader>Skor kredit kamu</SegmentHeader>
            <SegmentAction onClick={() => navigate(SITEMAP.CREDIT_SCORE)}>Info lebih lanjut ></SegmentAction>
          </SegmentContext>
          {/* <SpinnerWrapper>
            <Spinner color="N800" />
          </SpinnerWrapper> */}
          <h1>550</h1>
          <h2>Cukup Baik</h2>
          <div className="progress">
            <div className="bg" />
            <div className="bar" />
          </div>
        </CreditScoreSummary>
        <Loans>
          <SegmentContext>
            <SegmentHeader>Pinjaman aktif kamu</SegmentHeader>
            <SegmentAction onClick={() => navigate(SITEMAP.LOAN_HISTORY)}>Riwayat Pinjaman ></SegmentAction>
          </SegmentContext>
          <LoanCard />
          <LoanCard />
        </Loans>
        <Loans>
          <FullSegmentHeader>Pinjaman terbaik untuk kamu</FullSegmentHeader>
          <Filter active={this.state.showFilterModal}>
            <button onClick={this.toggleFilter}>
              <SegmentDescription>
                Sortir: <strong>Pasti Cair</strong>, Filter: <strong>Semua Produk</strong>
              </SegmentDescription>
            </button>
            <div>
              <div className="overlay" onClick={this.toggleFilter} />
              <div className="content">
                <div>
                  <h3>Sortir</h3>
                  {Home.SORT_QUERIES.map(sq => (
                    <button
                      className={classNames('item', { active: this.state.sortQuery === sq })}
                      onClick={this.setSortQuery(sq)}
                    >
                      {sq}
                    </button>
                  ))}
                  <h3>Filter</h3>
                  <button
                    className={classNames('item', { active: this.isAllProductQueryEnabled(this.state.productQuery) })}
                    onClick={this.toggleAllProduct}
                  >
                    Semua Produk
                  </button>
                  {Object.keys(this.state.productQuery).map(product => (
                    <button
                      className={classNames('item', {
                        active: this.state.productQuery[product],
                        grayscaled: this.isAllProductQueryEnabled(this.state.productQuery),
                      })}
                      onClick={this.toggleProductQuery(product)}
                    >
                      {product}
                    </button>
                  ))}
                  <BigActionButton onClick={this.toggleFilter}>Tutup Filter</BigActionButton>
                </div>
              </div>
            </div>
          </Filter>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard locked />
          <ProductCard locked />
          <ProductCard locked />
        </Loans>
      </PageWrapper>
    );
  }
}

const CreditScoreSummary = styled.div`
  width: 100%;
  margin: 3rem 0 0;
  ${flex({ justify: 'space-between' })}

  h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    margin: 0 1rem 0 0;
    text-align: left;
    color: ${props => props.theme.color.N800};
  }

  h2 {
    flex: 1;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: right;
    color: ${props => props.theme.color.Y200};
    margin: 0;
  }

  .progress {
    width: 100%;
    height: 0.75rem;
    margin: 0.5rem 0 0;
    border-radius: ${props => props.theme.borderRadius};
    position: relative;
    box-shadow: ${props => props.theme.shadow.base};

    .bar,
    .bg {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      background: ${props => props.theme.color.Y200};
      border-radius: ${props => props.theme.borderRadius};
    }

    .bar {
      z-index: 2;
      width: 60%;
    }

    .bg {
      z-index: 1;
      right: 0;
      opacity: 0.25;
    }
  }
`;

const Loans = styled.div`
  width: 100%;
  margin: 3rem 0 0;
  ${flex()}

  button {
    margin: 0 0 1rem;

    &:last-of-type {
      margin: 0;
    }
  }
`;

const Filter = styled.div`
  width: 100%;
  ${flex()}
  margin: 0 0 1rem;

  & > button {
    width: 100%;

    strong {
      font-weight: 400;
    }
  }

  & > div {
    position: fixed;
    z-index: 3000;
    transform: translate3d(0, ${props => props.active ? '0' : '100%'}, 0);
    transition: ${props => props.active ? 'none' : '0s ease all 0.25s'};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .overlay {
      position: absolute;
      z-index: 1001;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${props => props.theme.color.N800};
      opacity: ${props => props.active ? '0.75' : '0'};
      transition: 0.25s ease all;
    }

    .content {
      position: absolute;
      z-index: 1002;
      width: 100%;
      max-height: 75%;
      overflow: auto;
      bottom: 0;
      left: 0;
      right: 0;
      background: ${props => props.theme.color.N0};
      transform: translate3d(0, ${props => props.active ? '0' : '100%'}, 0);
      transition: 0.25s ease all;
      padding: 1.5rem;

      & > div {
        width: 100%;
        ${flex({ justify: 'flex-start' })}
        opacity: ${props => props.active ? '1' : '0'};
        transition: ${props => props.active ? '0.125s ease all 0.125s' : 'none'};

        h3 {
          width: 100%;
          margin: 0 0 1rem;
          font-size: 1rem;
          font-weight: 400;
          text-align: left;
          color: ${props => props.theme.color.N300};
        }

        .item {
          width: 100%;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 400;
          ${flex({ justify: 'flex-start' })}
          border: 1px solid ${props => props.theme.color.N40};
          color: ${props => props.theme.color.N300};
          border-radius: ${props => props.theme.borderRadius};

          &.active {
            color: ${props => props.theme.color.N0};
            background: ${props => props.theme.color.mainProductBlue};
            border-color: ${props => props.theme.color.mainProductBlue};
          }

          &.grayscaled {
            color: ${props => props.theme.color.N300};
            background: ${props => props.theme.color.N40};
            border-color: ${props => props.theme.color.N40};
          }
        }
      }
    }
  }
`;
