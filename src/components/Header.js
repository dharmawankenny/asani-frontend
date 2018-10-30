import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from '@reach/router';

import LogoImg from '../assets/logo.png';
import MenuIcon from '../assets/menu.svg';
import HomeIcon from '../assets/home.svg';
import CreditScoreIcon from '../assets/credit_score.svg';
import LoanHistoryIcon from '../assets/loan_history.svg';
import LogoutIcon from '../assets/logout.svg';

import SITEMAP from '../commons/sitemap';
import { flex } from '../commons/theme';

import { Consumer as AuthConsumer } from '../contexts/auth';

import Footer from './Footer';

export default class Header extends React.Component {
  static propTypes = {
    withMenu: PropTypes.boolean,
  };

  state = {
    showMenu: false,
  };

  toggleMenu = () => {
    this.setState(prevState => {
      if (prevState.showMenu) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }

      return { showMenu: !prevState.showMenu };
    });
  };

  navigateTo = to => () => navigate(to);

  render() {
    return (
      <Wrapper>
        <Logo onClick={this.navigateTo(SITEMAP.HOME)}>
          <img src={LogoImg} />
        </Logo>
        {this.props.withMenu && (
          <MenuToggle onClick={this.toggleMenu}>
            <img src={MenuIcon} />
          </MenuToggle>
        )}
        {this.props.withMenu && (
          <Menu active={this.state.showMenu}>
            <Overlay active={this.state.showMenu} onClick={this.toggleMenu} />
            <Content active={this.state.showMenu}>
              <ContentAnimationWrapper active={this.state.showMenu}>
                <NavigationButton onClick={this.navigateTo(SITEMAP.HOME)}><img src={HomeIcon} /><span>Beranda</span></NavigationButton>
                <NavigationButton onClick={this.navigateTo(SITEMAP.CREDIT_SCORE)}><img src={CreditScoreIcon} /><span>Skor Kredit</span></NavigationButton>
                <NavigationButton onClick={this.navigateTo(SITEMAP.LOAN_HISTORY)}><img src={LoanHistoryIcon} /><span>Riwayat</span></NavigationButton>
                <AuthConsumer>
                  {({ logOut }) => (
                    <NavigationButton onClick={logOut}><img src={LogoutIcon} /><span>Keluar</span></NavigationButton>
                  )}
                </AuthConsumer>
                <FooterWrapper>
                  <Footer />
                </FooterWrapper>
              </ContentAnimationWrapper>
            </Content>
          </Menu>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  ${flex({ justify: 'space-between' })}
`;

const Logo = styled.button`
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 2000;

  img {
    height: 1.5rem;
    width: auto;
  }
`;

const MenuToggle = styled.button`
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 2000;

  img {
    height: 0.5rem;
    width: auto;
  }
`;

const Menu = styled.div`
  position: absolute;
  z-index: 1000;
  transform: translate3d(0, ${props => props.active ? '0' : '-100%'}, 0);
  transition: ${props => props.active ? 'none' : '0s ease all 0.25s'};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Overlay = styled.div`
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
`;

const Content = styled.div`
  position: absolute;
  z-index: 1002;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.color.N0};
  transform: translate3d(0, ${props => props.active ? '0' : '-100%'}, 0);
  transition: 0.25s ease all;
  padding: 5.5rem 2rem 2rem;
`;

const ContentAnimationWrapper = styled.div`
  width: 100%;
  ${flex({ justify: 'space-between' })}
  opacity: ${props => props.active ? '1' : '0'};
  transition: ${props => props.active ? '0.125s ease all 0.125s' : 'none'};
`;

const NavigationButton = styled.button`
  ${flex()}
  width: calc(25% - 0.5rem);
  height: 5rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1;
  color: ${props => props.theme.color.N800};
  box-shadow: ${props => props.theme.shadow.base};
  border-radius: ${props => props.theme.borderRadius};

  img {
    width: 2rem;
    height: 2rem;
    margin: 0 0 0.5rem;
  }

  span {
    width: 100%;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  margin: 2rem 0 0;
`;
