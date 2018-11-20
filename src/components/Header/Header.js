import React from 'react';
import Headroom from 'react-headroom';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import LogoImg from '../../assets/asani-logo.png';
import MenuIcon from '../../assets/menu.svg';
import HomeIcon from '../../assets/home.svg';
import CreditScoreIcon from '../../assets/credit_score.svg';
import LoanHistoryIcon from '../../assets/loan_history.svg';
import LogoutIcon from '../../assets/logout.svg';
import WhatsAppIcon from '../../assets/whatsapp.svg';

import SITE_MAP from '../../commons/sitemap';

import { Consumer as AuthConsumer } from '../../contexts/auth';

import Footer from '../Footer/Footer';

// Styled
import {
  Wrapper,
  LogoMenu,
  Logo,
  RightMenu,
  Menu,
  Overlay,
  Content,
  ContentAnimationWrapper,
  NavigationButton,
  FooterWrapper,
  WhatsAppImg,
  MenuIconImg,
  WhatsAppText,
} from './Header.styled';

export default class Header extends React.Component {
  static propTypes = {
    withMenu: PropTypes.bool,
    withContactButton: PropTypes.bool,
    stopNavigation: PropTypes.bool,
    naked: PropTypes.bool,
  };

  state = {
    showMenu: false,
    shouldRenderToDom: false,
  };

  portalDom = document.createElement('div');

  static defaultProps = {
    withContactButton: false,
  };

  componentDidMount() {
    document.body.appendChild(this.portalDom);
    this.setState({ shouldRenderToDom: true });
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  handleToggleMenu = () => {
    this.setState(prevState => {
      if (prevState.showMenu) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
      return { showMenu: !prevState.showMenu };
    });
  };

  navigateTo = to => () => {
    if (!this.props.stopNavigation) {
      navigate(to);
    }
  };

  isLinkActive = link => window.location.pathname === link;
  renderMenu = () => {
    const { withMenu } = this.props;
    if (!withMenu) {
      return null;
    }
    return (
      <Menu active={this.state.showMenu}>
        <Overlay active={this.state.showMenu} onClick={this.handleToggleMenu} />
        <Content active={this.state.showMenu}>
          <ContentAnimationWrapper active={this.state.showMenu}>
            <NavigationButton
              onClick={this.navigateTo(SITE_MAP.HOME)}
              disabled={this.isLinkActive(SITE_MAP.HOME)}
            >
              <img src={HomeIcon} alt={'HomeIcon'} />
              <span>{'Beranda'}</span>
            </NavigationButton>
            <NavigationButton
              onClick={this.navigateTo(SITE_MAP.CREDIT_SCORE)}
              disabled={this.isLinkActive(SITE_MAP.CREDIT_SCORE)}
            >
              <img src={CreditScoreIcon} alt={'CreditScoreIcon'} />
              <span>{'Skor Kredit'}</span>
            </NavigationButton>
            <NavigationButton
              onClick={this.navigateTo(SITE_MAP.LOAN_HISTORY)}
              disabled={this.isLinkActive(SITE_MAP.LOAN_HISTORY)}
            >
              <img src={LoanHistoryIcon} alt={'LoanHistoryIcon'} />
              <span>{'Riwayat'}</span>
            </NavigationButton>
            <AuthConsumer>
              {({ logOut }) => (
                <NavigationButton onClick={logOut}>
                  <img src={LogoutIcon} alt={'LogoutIcon'} />
                  <span>{'Keluar'}</span>
                </NavigationButton>
              )}
            </AuthConsumer>
            <FooterWrapper>
              <Footer />
            </FooterWrapper>
          </ContentAnimationWrapper>
        </Content>
      </Menu>
    );
  };
  renderRightMenu = () => {
    const { withMenu, withContactButton } = this.props;
    const showWhatsApp = !withMenu && withContactButton;
    if (showWhatsApp) {
      return (
        <RightMenu>
          <WhatsAppText>{'Layanan Chat'}</WhatsAppText>
          <WhatsAppImg src={WhatsAppIcon} alt={'WhatsApp'} />
        </RightMenu>
      );
    }
    if (!withMenu) {
      return null;
    }
    return (
      <RightMenu onClick={this.handleToggleMenu}>
        <MenuIconImg src={MenuIcon} />
      </RightMenu>
    );
  };
  render() {
    return (
      <Headroom>
        <Wrapper naked={this.props.naked}>
          <LogoMenu>
            <Logo onClick={this.navigateTo(SITE_MAP.HOME)}>
              <img src={LogoImg} alt={'LogoImg'} />
            </Logo>
            {this.renderRightMenu()}
          </LogoMenu>
          {this.renderMenu()}
        </Wrapper>
      </Headroom>
    );
  }
}
