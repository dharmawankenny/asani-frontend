import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import classNames from 'classnames';
import { navigate } from '@reach/router';
import isEmpty from 'lodash/isEmpty';

import ArrowIcon from '../../assets/progress_arrow.svg';

import {
  DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY,
  DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY,
} from '../../commons/constants';
import SITEMAP from '../../commons/sitemap';
import { flex } from '../../commons/theme';
import { calculatePercentage } from '../../commons/utils';

import { BigActionButton } from '../../components/Buttons';
import Header from '../../components/Header';
import LoanCard from '../../components/LoanCard';
import LoanDetailModal from '../../components/LoanDetailModal';
import ProductDetailModal from '../../components/ProductDetailModal';
import {
  PageWrapper,
  SegmentContext,
  SegmentHeader,
  FullSegmentHeader,
  ProgressBar,
  ProgressSegment,
  ArrowMarker,
  SegmentAction,
  SegmentDescription,
  SpinnerWrapper,
  EmptyWrapper,
} from '../../components/PageBuilder';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';

import { Consumer as AuthConsumer } from '../../contexts/auth';

import * as creditScoreActions from '../../reducers/creditScore';
import * as productActions from '../../reducers/product';
import * as loanActions from '../../reducers/loan';
import * as userDocumentActions from '../../reducers/userDocument';

@connect(
  state => ({ ...state }),
  dispatch => ({
    creditScoreActions: bindActionCreators(creditScoreActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch),
    loanActions: bindActionCreators(loanActions, dispatch),
    userDocumentActions: bindActionCreators(userDocumentActions, dispatch),
  })
)
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

  componentDidMount() {
    if (!this.props.creditScore.loading && !this.props.creditScore.loaded) {
      this.props.creditScoreActions.getCreditScore();
    }

    if (!this.props.creditScore.scoreRangeLoading && !this.props.creditScore.scoreRangeLoaded) {
      this.props.creditScoreActions.getScoreRange();
    }

    if (!this.props.product.loading && !this.props.product.loaded) {
      this.props.productActions.getProducts();
    }

    if (!this.props.loan.activeLoansLoading && !this.props.loan.activeLoansLoaded) {
      this.props.loanActions.getActiveLoans();
    }

    if (!this.props.userDocument.loading && !this.props.userDocument.loaded) {
      this.props.userDocumentActions.getDocuments();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.product.loaded && this.props.product.products.length > 0 && !prevProps.product.loaded && prevProps.product.products.length === 0) {
      this.updateFilterStructure(this.props.product.products);
    }
  }

  updateFilterStructure(products) {
    const filters = {};

    products.forEach(product => filters[product.productType] = true);

    this.setState({ productQuery: { ...filters } })
  }

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

  onActiveLoanClick = loanId => () => {
    this.props.loanActions.getLoanDetail(loanId);
  };

  onProductClick = productId => () => {
    this.props.productActions.getProductDetail(productId);
  };

  compareByUnlocked = (a, b) => {
    if (Number(a.isLocked) < Number(b.isLocked)) {
      return -1;
    } else if (Number(a.isLocked) > Number(b.isLocked)) {
      return 1;
    }

    return 0;
  };

  compareAscending = key => (a, b) => {
    if (Number(a[key]) < Number(b[key])) {
      return -1;
    } else if (Number(a[key]) > Number(b[key])) {
      return 1;
    }

    return 0;
  };

  compareDescending = key => (a, b) => {
    if (Number(a[key]) < Number(b[key])) {
      return 1;
    } else if (Number(a[key]) > Number(b[key])) {
      return -1;
    }

    return 0;
  };

  applyFilter = productList => {
    let sortFunction = this.compareAscending('isLocked');

    if (this.state.sortQuery === Home.SORT_QUERIES[1]) {
      sortFunction = this.compareDescending('productPrice');
    } else if (this.state.sortQuery === Home.SORT_QUERIES[2]) {
      sortFunction = this.compareAscending('interestPct');
    } else if (this.state.sortQuery === Home.SORT_QUERIES[3]) {
      sortFunction = this.compareDescending('tenorDays');
    }

    return productList
      .filter(product => this.state.productQuery[product.productType])
      .sort(sortFunction);
  };

  printSortQuery = () => this.state.sortQuery;
  printFilter = () => {
    if (this.isAllProductQueryEnabled(this.state.productQuery)) {
      return 'Semua Produk';
    }

    return Object.keys(this.state.productQuery).reduce((res, cur) => {
      if (this.state.productQuery[cur]) {
        if (res === '') {
          res = cur;
        } else {
          res = `${res}, ${cur}`;
        }
      }

      return res;
    }, '')
  };

  getLowerBoundary = () => {
    if (this.props.creditScore.scoreRangeLoaded && this.props.creditScore.scoreRange.length > 0) {
      let lowerBoundary = DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY;

      this.props.creditScore.scoreRange.forEach(sr => {
        if (Number(sr.lower_bounds) <= lowerBoundary) {
          lowerBoundary = Number(sr.lower_bounds);
        }
      });

      return lowerBoundary;
    }

    return DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY;
  };

  getUpperBoundary = () => {
    if (this.props.creditScore.scoreRangeLoaded && this.props.creditScore.scoreRange.length > 0) {
      let upperBoundary = DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY;

      this.props.creditScore.scoreRange.forEach(sr => {
        if (Number(sr.upper_bounds) >= upperBoundary) {
          upperBoundary = Number(sr.upper_bounds);
        }
      });

      return upperBoundary;
    }

    return DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY;
  };

  render() {
    return (
      <Fragment>
        <Header withMenu />
        <PageWrapper>
          <CreditScoreSummary onClick={() => navigate(SITEMAP.CREDIT_SCORE)}>
            <SegmentContext>
              <SegmentHeader>Skor kredit kamu</SegmentHeader>
              <SegmentAction>Info lebih lanjut ></SegmentAction>
            </SegmentContext>
            {(this.props.creditScore.loading || this.props.creditScore.scoreRangeLoading) && (
              <SpinnerWrapper>
                <Spinner color="N800" />
              </SpinnerWrapper>
            )}
            {this.props.creditScore.loaded &&
              this.props.creditScore.data &&
              this.props.creditScore.scoreRangeLoaded &&
              this.props.creditScore.scoreRange.length > 0 && (
                <Fragment>
                  <h1>{this.props.creditScore.data.credit_score}</h1>
                  <h2 style={{ color: this.props.creditScore.data.color }}>{this.props.creditScore.data.level}</h2>
                  <ProgressBarWrapper>
                    <ProgressBar>
                      <div>
                        <div className="bg" />
                        {this.props.creditScore.scoreRange.map((scoreRange, index) => (
                          <ProgressSegment
                            zIndex={this.props.creditScore.scoreRange.length - index}
                            length={calculatePercentage(scoreRange.upper_bounds, this.getLowerBoundary(), this.getUpperBoundary())}
                            color={scoreRange.color}
                          />
                        ))}
                        <ArrowMarker progress={calculatePercentage(this.props.creditScore.data.credit_score, this.getLowerBoundary(), this.getUpperBoundary())} invert><img src={ArrowIcon} /></ArrowMarker>
                      </div>
                    </ProgressBar>
                  </ProgressBarWrapper>
                </Fragment>
              )}
          </CreditScoreSummary>
          {this.props.loan.activeLoansLoaded &&
            this.props.loan.activeLoans &&
            this.props.loan.activeLoans.length > 0 && (
            <Loans>
              {/* <SegmentContext>
                <SegmentHeader>Pinjaman aktif kamu</SegmentHeader>
                <SegmentAction onClick={() => navigate(SITEMAP.LOAN_HISTORY)}>Riwayat Pinjaman ></SegmentAction>
              </SegmentContext> */}
              {this.props.loan.activeLoans.map(loan => <LoanCard loan={loan} onClick={this.onActiveLoanClick(loan.loanId)} />)}
            </Loans>
          )}
          {this.props.loan.activeLoansLoaded &&
            this.props.loan.activeLoans &&
            this.props.loan.activeLoans.length > 0 && (
              <LoanDetailModal
                active={!isEmpty(this.props.loan.detailedLoan) || this.props.loan.detailLoading}
                loading={this.props.loan.detailLoading}
                loaded={this.props.loan.detailLoaded}
                loanDetail={this.props.loan.detailedLoan}
                onClose={this.props.loanActions.resetDetail}
              />
            )}
          <Loans>
            <FullSegmentHeader>Pinjaman terbaik untuk kamu</FullSegmentHeader>
            <Filter active={this.state.showFilterModal}>
              <button onClick={this.toggleFilter}>
                Sortir: <strong>{this.printSortQuery()}</strong>, Filter: <strong>{this.printFilter()}</strong>
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
            {this.props.product.loading && (
              <SpinnerWrapper>
                <Spinner color="N800" />
              </SpinnerWrapper>
            )}
            {this.props.product.loaded &&
              this.props.product.products &&
              this.applyFilter(this.props.product.products).map(product => (
                <ProductCard product={product} onClick={this.onProductClick(product.productId)} />
              ))}
            {this.props.product.loaded &&
              this.props.product.products && (
                <ProductDetailModal
                  active={!isEmpty(this.props.product.detailedProduct) || this.props.product.detailLoading}
                  loading={this.props.product.detailLoading}
                  loaded={this.props.product.detailLoaded}
                  productDetail={this.props.product.detailedProduct}
                  onClose={() => {
                    this.props.productActions.resetDetail();
                    this.props.userDocumentActions.uploadingReset();
                  }}
                  uploadDocument={this.props.userDocumentActions.uploadDocument}
                  resetUploader={this.props.userDocumentActions.uploadingReset}
                  uploadProgress={this.props.userDocument.uploadProgress}
                  uploadFinished={this.props.userDocument.uploadFinished}
                  purchase={this.props.productActions.purchaseProduct}
                  resetPurchase={this.props.productActions.resetPurchase}
                  purchaseLoading={this.props.product.purchaseLoading}
                  purchaseSuccess={this.props.product.purchaseLoaded}
                  updateLoans={this.props.loanActions.getActiveLoans}
                />
              )}
            {this.props.product.loaded &&
              this.props.product.products &&
              this.props.product.products.length === 0 && (
                <EmptyWrapper>
                  Mohon Maaf, sepertinya tidak ada pinjaman terbaik untuk kamu saat ini, tunggu pembaharuan selanjutnya ya!
                </EmptyWrapper>
              )}
          </Loans>
        </PageWrapper>
      </Fragment>
    );
  }
}

const CreditScoreSummary = styled.button`
  width: 100%;
  margin: 3rem 0 0;
  ${flex({ justify: 'space-between' })}
  text-align: left;

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
    color: ${props => props.theme.color.G300};
    margin: 0;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  margin: 1rem 0 0;
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
    display: block;
    width: 100%;
    font-size: 0.85rem;
    font-width: 400;
    line-height: 1.25;
    margin: 0;
    padding: 0;
    color: ${props => props.theme.color.N300};
    text-align: left;

    strong {
      font-weight: 700;
      text-decoration: underline;
      color: ${props => props.theme.color.N800};
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
