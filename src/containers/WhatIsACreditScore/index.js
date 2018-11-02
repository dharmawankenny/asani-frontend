import React, { Fragment } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { navigate } from '@reach/router';

import SITEMAP from '../../commons/sitemap';
import { flex } from '../../commons/theme';

import {
  Blog,
  BlogTitle,
  BlogSubtitle,
  BlogText,
  BlogLink,
} from '../../components/BlogBuilder';
import { BigActionButton } from '../../components/Buttons';
import Header from '../../components/Header';
import {
  PageWrapper,
  SpinnerWrapper,
} from '../../components/PageBuilder';

export default class WhatIsACreditScore extends React.Component {
  render() {
    return (
      <Fragment>
        <Header withMenu />
        <PageWrapper>
          <Blog>
            <YouTube videoId="j3YQAoN2wGM" opts={{ height: '240', width: window.innerWidth }} />
            <BlogTitle margin="1.5rem 0 1rem">
              Skor kredit? apa sih itu?
            </BlogTitle>
            <BlogSubtitle>
              Aenean cras est suspendisse inceptos leo hac vehicula felis varius ad scelerisque adipiscing vehicula natoque elit per justo ullamcorper tellus mauris himenaeos id tristique vivamus gravida vestibulum est.Ullamcorper scelerisque.
            </BlogSubtitle>
            <BlogText>
              Ullamcorper netus suspendisse condimentum scelerisque a adipiscing ultricies sem sagittis pharetra magnis elementum vestibulum felis mus a platea ullamcorper ac cras. Vulputate a lacinia eros vulputate orci at fringilla ullamcorper lorem nostra taciti parturient dignissim ac. Viverra dui vel parturient enim morbi ac a a convallis dui ac cum hac in vitae erat vestibulum sem odio commodo ac integer sociosqu cras a. Libero diam vestibulum torquent suscipit natoque et a a erat a tempus penatibus elit at venenatis vel consectetur in in interdum a vivamus a vulputate neque vestibulum. Elit duis nunc dui a leo a malesuada a a parturient volutpat ullamcorper leo morbi condimentum. In leo conubia a praesent a auctor bibendum imperdiet inceptos lacus nullam suspendisse consectetur diam a vestibulum dolor. Ac et cum rhoncus donec nunc a quis velit in semper parturient adipiscing mus eget a parturient per porta vel sociosqu ridiculus ut adipiscing diam luctus mattis. Dolor dui ut ullamcorper conubia habitant in posuere diam mi scelerisque ultrices sagittis praesent a elit mi hac consectetur neque id dictum congue a nulla convallis a ligula tempor. Mauris nibh curae posuere mi cubilia condimentum porta cum fermentum a proin imperdiet eleifend ullamcorper lacinia a a aptent nibh vestibulum.
            </BlogText>
            <BlogSubtitle>
              Aenean cras est suspendisse inceptos leo hac vehicula felis varius ad scelerisque adipiscing vehicula natoque elit per justo ullamcorper tellus mauris himenaeos id tristique vivamus gravida vestibulum est.Ullamcorper scelerisque.
            </BlogSubtitle>
            <BlogText>
              Ullamcorper netus suspendisse condimentum scelerisque a adipiscing ultricies sem sagittis pharetra magnis elementum vestibulum felis mus a platea ullamcorper ac cras. Vulputate a lacinia eros vulputate orci at fringilla ullamcorper lorem nostra taciti parturient dignissim ac. Viverra dui vel parturient enim morbi ac a a convallis dui ac cum hac in vitae erat vestibulum sem odio commodo ac integer sociosqu cras a. Libero diam vestibulum torquent suscipit natoque et a a erat a tempus penatibus elit at venenatis vel consectetur in in interdum a vivamus a vulputate neque vestibulum. Elit duis nunc dui a leo a malesuada a a parturient volutpat ullamcorper leo morbi condimentum. In leo conubia a praesent a auctor bibendum imperdiet inceptos lacus nullam suspendisse consectetur diam a vestibulum dolor. Ac et cum rhoncus donec nunc a quis velit in semper parturient adipiscing mus eget a parturient per porta vel sociosqu ridiculus ut adipiscing diam luctus mattis. Dolor dui ut ullamcorper conubia habitant in posuere diam mi scelerisque ultrices sagittis praesent a elit mi hac consectetur neque id dictum congue a nulla convallis a ligula tempor. Mauris nibh curae posuere mi cubilia condimentum porta cum fermentum a proin imperdiet eleifend ullamcorper lacinia a a aptent nibh vestibulum.
            </BlogText>
          </Blog>
        </PageWrapper>
      </Fragment>
    );
  }
}
