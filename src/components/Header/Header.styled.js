import styled from 'styled-components';
import { flex } from '../../commons/theme';

export const Wrapper = styled.div`
  width: 100%;
  padding: ${props => (props.naked ? '1rem 1.5rem' : '1rem 1.5rem 0.75rem')};
  ${flex({ justify: 'space-between' })}
  background: ${props => (props.naked ? 'rgb(39, 151, 251)' : props.theme.color.N0)};
  box-shadow: ${props => (props.naked ? 'none' : props.theme.shadow.dark)};
`;

export const WhatsAppImg = styled.img`
  height: 1.5rem;
  width: auto;
  margin: 0px;
  padding: 0;
  padding-left: 8px;
  filter: invert(100%);
`;

export const LogoMenu = styled.div`
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  ${flex({ justify: 'space-between' })};
`;

export const Logo = styled.button`
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 2000;
  img {
    ${({ naked }) => (naked ? '' : 'filter: invert(100%);')}
    height: 2.5rem;
    width: auto;
  }
`;

export const WhatsAppText = styled.span`
  color: #fff;
  font-weight: 700;
  margin-right: 2px;
  font-size: 14px;
`;

export const RightMenu = styled.button`
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 2000;
  display: flex;
  align-items: center;
`;

export const MenuIconImg = styled.img`
  height: 0.5rem;
  width: auto;
`;

export const Menu = styled.div`
  position: fixed;
  z-index: 1000;
  transform: translate3d(0, ${props => (props.active ? '0' : '-100vh')}, 0);
  transition: ${props => (props.active ? 'none' : '0s ease all 0.25s')};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Overlay = styled.div`
  position: absolute;
  z-index: 1001;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.color.N800};
  opacity: ${props => (props.active ? '0.75' : '0')};
  transition: 0.25s ease all;
`;

export const Content = styled.div`
  position: absolute;
  z-index: 1002;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.color.N0};
  transform: translate3d(0, ${props => (props.active ? '0' : '-100%')}, 0);
  transition: 0.25s ease all;
  padding: 4.5rem 1.5rem 1.5rem;
`;

export const ContentAnimationWrapper = styled.div`
  width: 100%;
  ${flex({ justify: 'space-between' })}
  opacity: ${props => (props.active ? '1' : '0')};
  transition: ${props => (props.active ? '0.125s ease all 0.125s' : 'none')};

  @media screen and (min-width: ${props => props.theme.breakpoint.tablet}) {
    width: 32rem;
    margin: 0 auto;
  }
`;

export const NavigationButton = styled.button`
  ${flex()} width: calc(25% - 0.5rem);
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

export const FooterWrapper = styled.div`
  width: 100%;
  margin: 2rem 0 0;
`;
