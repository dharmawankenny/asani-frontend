import React from 'react';
import ReactDOM from 'react-dom';
import Headroom from 'react-headroom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from '@reach/router';

import LogoImg from '../assets/asani-mediakit-white.png';
import MenuIcon from '../assets/menu.svg';
import HomeIcon from '../assets/home.svg';
import CreditScoreIcon from '../assets/credit_score.svg';
import LoanHistoryIcon from '../assets/loan_history.svg';
import LogoutIcon from '../assets/logout.svg';
import WhatsAppIcon from '../assets/whatsapp.png';

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
    shouldRenderToDom: false,
  };

  portalDom = document.createElement('div');

  componentDidMount() {
    document.body.appendChild(this.portalDom);
    this.setState({ shouldRenderToDom: true });
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

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

  navigateTo = to => () => {
    if (!this.props.stopNavigation) {
      navigate(to);
    }
  };

  isLinkActive = link => window.location.pathname === link;

  render() {
    // if (this.state.shouldRenderToDom) {
    //   return ReactDOM.createPortal(
    return (
          <Headroom style={{position: "fixed"}} disable={this.props.naked}>
            <Wrapper naked={this.props.naked}>
                <div style={{backgroundColor: "#2797FB", width: "100%"}}>
                  <LogoMenu>
                    <Logo onClick={this.navigateTo(SITEMAP.HOME)}>
                      <img style={{width:"100px", height:"32px", marginTop:"5px"}} src={LogoImg} />
                    </Logo>
                    {this.props.withMenu && (
                      <MenuToggle onClick={this.toggleMenu}>
                        <img style={{marginTop:"5px", paddingRight: "16px"}} src={MenuIcon} />
                      </MenuToggle>
                    )}
                    {this.props.withHelp && (
                      <a style={{color: "white", paddingRight:"16px"}} href="https://api.whatsapp.com/send?phone=6281311442228" target="_blank">
                        Layanan Chat<Help src={WhatsAppIcon} />
                      </a>
                    )}
                  </LogoMenu>
                </div>
              {this.props.withMenu && (
                <Menu active={this.state.showMenu}>
                  <Overlay active={this.state.showMenu} onClick={this.toggleMenu} />
                  <Content active={this.state.showMenu}>
                    <ContentAnimationWrapper active={this.state.showMenu}>
                      <NavigationButton
                        onClick={this.navigateTo(SITEMAP.HOME)}
                        disabled={this.isLinkActive(SITEMAP.HOME)}
                      >
                        <img src={HomeIcon} />
                        <span>Beranda</span>
                      </NavigationButton>
                      <NavigationButton
                        onClick={this.navigateTo(SITEMAP.CREDIT_SCORE)}
                        disabled={this.isLinkActive(SITEMAP.CREDIT_SCORE)}
                      >
                        <img src={CreditScoreIcon} />
                        <span>Skor Kredit</span>
                      </NavigationButton>
                      <NavigationButton
                        onClick={this.navigateTo(SITEMAP.LOAN_HISTORY)}
                        disabled={this.isLinkActive(SITEMAP.LOAN_HISTORY)}
                      >
                        <img src={LoanHistoryIcon} />
                        <span>Riwayat</span>
                      </NavigationButton>
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
          </Headroom>
    );
    //     this.portalDom
    //   );
    // }

    // return null;
  }
}

// const Wrapper = styled.div`
//   width: 100%;
//   padding: ${props => props.naked ? '1.5rem' : '1rem 1.5rem 0.75rem'};
//   ${flex({ justify: 'space-between' })}
//   background: ${props => props.naked ? 'none' : props.theme.color.N0};
//   box-shadow: ${props => props.naked ? 'none' : props.theme.shadow.dark};
// `;
const Wrapper = styled.div`
  width: 100%;
  padding: ${props => props.naked ? '0px' : '0px'};
  ${flex({ justify: 'space-between' })}
  background: ${props => props.naked ? 'none' : props.theme.color.N0};
  box-shadow: ${props => props.naked ? 'none' : props.theme.shadow.dark};
`;

const LogoMenu = styled.div`
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  ${flex({ justify: 'space-between' })}

  a {
    ${flex()}
    text-decoration: none;
    color: ${props => props.theme.color.N300};
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1;
  }
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
  position: fixed;
  z-index: 1000;
  transform: translate3d(0, ${props => props.active ? '0' : '-100vh'}, 0);
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
  height: 100vh;
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
  padding: 4.5rem 1.5rem 1.5rem;
`;

const ContentAnimationWrapper = styled.div`
  width: 100%;
  ${flex({ justify: 'space-between' })}
  opacity: ${props => props.active ? '1' : '0'};
  transition: ${props => props.active ? '0.125s ease all 0.125s' : 'none'};

  @media screen and (min-width: ${props => props.theme.breakpoint.tablet}) {
    width: 32rem;
    margin: 0 auto;
  }
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

  &:disabled {
    color: ${props => props.theme.color.N0};
    background: ${props => props.theme.color.mainProductBlue};

    img {
      filter: brightness(0) invert(1);
    }
  }

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

const Help = styled.img`
  color: ${props => props.theme.color.N300};
  height: 1.25rem;
  width: auto;
  margin: 0 0 0 0.25rem;
  padding: 0;
`;
