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
    // 'Bunga Terendah',
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

    if (this.props.product.loaded && this.props.product.products.length > 0) {
      this.updateFilterStructure(this.props.product.products);
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
    this.setState(prevState => {
      // if (this.isAllProductQueryEnabled(prevState.productQuery)) {
      const newProductQuery = { ...prevState.productQuery };
      Object.keys(newProductQuery).forEach(key => newProductQuery[key] = false );

      return {
        productQuery: {
          ...newProductQuery,
          [productKey]: true,
        },
      };
      // } else if (this.isAllProductQueryNotEnabled({ ...prevState.productQuery, [productKey]: false })) {
      //   const newProductQuery = { ...prevState.productQuery };
      //   Object.keys(newProductQuery).forEach(key => newProductQuery[key] = true );

      //   return {
      //     productQuery: {
      //       ...newProductQuery,
      //     },
      //   };
      // }

      // return {
      //   productQuery: {
      //     ...prevState.productQuery,
      //     [productKey]: !prevState.productQuery[productKey],
      //   },
      // };
    });
  };

  isAllProductQueryEnabled = productQuery => Object.values(productQuery).every(flag => flag);
  isAllProductQueryNotEnabled = productQuery => Object.values(productQuery).every(flag => !flag);

  toggleAllProduct = () => {
    console.log('toggleAll product')
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
    // this.props.productActions.getProductDetail(productId);
      navigate('/dashboard/product_id/'+productId)
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
    // } else if (this.state.sortQuery === Home.SORT_QUERIES[2]) {
    //   sortFunction = this.compareAscending('interestPct');
    } else if (this.state.sortQuery === Home.SORT_QUERIES[2]) {
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
    console.log(this.props)
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
                        {this.props.creditScore.scoreRange.map((scoreRange, index) => (
                          <ProgressSegment
                            zIndex={this.props.creditScore.scoreRange.length - index}
                            length={calculatePercentage((Number(scoreRange.upper_bounds + 1) - Number(scoreRange.lower_bounds)) + this.getLowerBoundary(), this.getLowerBoundary(), this.getUpperBoundary(), true)}
                            color={scoreRange.color}
                            offset={calculatePercentage(scoreRange.lower_bounds, this.getLowerBoundary(), this.getUpperBoundary(), true)}
                            leftRadius={index === 0}
                            rightRadius={index === this.props.creditScore.scoreRange.length - 1}
                          />
                        ))}
                        <ProgressSegment
                          zIndex={this.props.creditScore.scoreRange.length + 2}
                          length={calculatePercentage(this.props.creditScore.data.credit_score, this.getLowerBoundary(), this.getUpperBoundary(), true)}
                          color={this.props.creditScore.data.color}
                          opacity={1}
                          fullRadius
                        />
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
            <FullSegmentHeader>Tawaran pinjaman terbaik untuk kamu</FullSegmentHeader>
            <SegmentDescription margin="0 0 0.25rem">Proses instan, tanpa bunga, tanpa denda!</SegmentDescription>
            {this.props.product.loaded &&
              this.props.product.products.length > 0 && (
                <Filter>
                  <div>
                    <button
                      className={classNames('item', { active: this.isAllProductQueryEnabled(this.state.productQuery) })}
                      onClick={this.toggleAllProduct}
                      id="asani-actions-set-filter-type-to-all"
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
                        // onClick={() => navigate(SITEMAP.DETAIL_PAGE)}
                        //   onClick={() => console.log('This is page change')}
                        id={`asani-actions-set-filter-type-to-${product}`}
                      >
                        {product}
                      </button>
                    ))}
                  </div>
                </Filter>
              )}
            {this.props.product.loading && (
              <SpinnerWrapper>
                <Spinner color="N800" />
              </SpinnerWrapper>
            )}
            {this.props.product.loaded &&
              this.props.product.products.length > 0 &&
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
				  userBanned={this.props.product.userBanned}
                  purchaseError={this.props.product.purchaseError}
                  updateLoans={this.props.loanActions.getActiveLoans}
                  hasActiveLoans={this.props.loan.activeLoansLoaded && this.props.loan.activeLoans && this.props.loan.activeLoans.length > 0}
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
  height: 2rem;
  margin: 0.25rem 0 1rem;
  padding: 0.125rem 0;
  white-space: nowrap;
  overflow: auto;

  & > div {
    display: inline-block;

    button {
      font-size: 0.75rem;
      font-weight: 400;
      padding: 0.375rem;
      margin: 0 0.5rem 0 0;
      box-shadow: ${props => props.theme.shadow.base};
      border-radius: ${props => props.theme.borderRadius};

      &.active {
        color: ${props => props.theme.color.N0};
        background: ${props => props.theme.color.mainProductBlue};
      }

      &.grayscaled {
        color: ${props => props.theme.color.N800};
        background: ${props => props.theme.color.N0};
      }

      &:last-of-type {
        margin: 0;
      }
    }
  }
`;
