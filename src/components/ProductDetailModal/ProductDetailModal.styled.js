import styled from 'styled-components';
import { flex } from '../../commons/theme';

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3000;
  transform: translate3d(0, ${props => (props.active ? '0' : '100%')}, 0);
  transition: ${props => (props.active ? 'none' : '0s ease all 0.25s')};
`;

export const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.color.N0};
  transform: translate3d(0, ${props => (props.active ? '0' : '100%')}, 0);
  transition: 0.25s ease all;
  padding: 0;
  overflow: auto;
`;

export const ContentAnimationWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  ${flex({ justify: 'space-between', direction: 'column' })}
  opacity: ${props => (props.active ? '1' : '0')};
  transition: ${props => (props.active ? '0.125s ease all 0.125s' : 'none')};

  @media screen and (min-width: ${props => props.theme.breakpoint.tablet}) {
    width: 32rem;
    margin: 0 auto;
  }
`;

export const SpinnerWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  ${flex()}
`;

export const ActionButtonWrapper = styled.div`
  width: 100%;
  padding: 0 1.5rem;
  margin: 0.5rem 0 2rem;
`;

export const DocUploadWrapper = styled.div`
  width: 100%;
  flex: 1;
  ${flex()}
  padding: 1.5rem;
`;

export const Header = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  padding: 1.25rem 1.5rem 1rem;
  border-bottom: 1px solid ${props => props.theme.color.N40};
  margin: 0 0 1rem;

  h1 {
    flex: 1;
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${props => props.theme.color.N800};
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  button {
    margin: 0 0 0 1rem;

    img {
      width: 1rem;
      height: 1rem;
      pointer-events: none;
    }
  }
`;

export const Steps = styled.div`
  width: 100%;
  ${flex({ align: 'flex-start' })}
`;

export const Step = styled.div`
  width: 5rem;
  margin: 0 0 0.5rem;
  ${flex()}
  position: relative;

  .logo {
    position: relative;
    z-index: 1;
    width: 3rem;
    height: 3rem;
    padding: 0.625rem;
    border-radius: 3rem;
    border: 1px solid ${props => props.theme.color.mainProductBlue};
    background: ${props => (props.active ? props.theme.color.mainProductBlue : props.theme.color.N0)};

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      ${props => props.active && 'filter: brightness(0) invert(1);'}
    }
  }

  .leftBar,
  .rightBar {
    position: absolute;
    top: calc(1.5rem - 1px);
    width: 50%;
    height: 1px;
    background: ${props => props.theme.color.mainProductBlue};
  }

  .leftBar {
    left: 0;
  }

  .rightBar {
    left: 50%;
  }

  span {
    margin: 0.5rem 0 0;
    width: 100%;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.25;
    text-align: center;
    color: ${props => (props.active ? props.theme.mainProductBlue : props.theme.color.N800)};
  }
`;

export const ProductLogo = styled.img`
  height: 8rem;
  width: auto;
  margin: 0 0 1rem;
`;

export const InfoPrompt = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: calc(100% - 3rem);
  padding: 1rem 1rem 1rem 0.75rem;
  margin: ${props => props.margin};
  border-left: 0.25rem solid ${props => props.theme.color[props.color]};
  color: ${props => props.theme.color.N300};
  background: ${props => props.theme.color.N20};
  border-radius: ${props => props.theme.borderRadius};

  span {
    flex: 1;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25;
  }

  img {
    width: 2rem;
    height: 2rem;
    object-fit: contain;
    margin: 0 1rem 0 0;
  }
`;

export const BillValue = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  margin: 1.5rem 0 0;

  span {
    width: 100%;
    font-size: 0.875rem;
    font-weight: 400;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    ${flex({ justify: 'flex-start' })}

    :nth-child(1) {
      color: ${props => props.theme.color.N300};
      margin: 0 0 0.5rem;
    }

    :nth-child(2) {
      color: ${props => props.theme.color.N800};
      font-size: 1.5rem;
      font-weight: 700;
    }

    :nth-child(3) {
      color: ${props => props.theme.color.N300};
      margin: 0.25rem 0 0;
    }
  }
`;

export const LabelValue = styled.div`
  ${flex({ justify: 'flex-start', align: 'flex-start' })}
  width: 100%;
  margin: 0 0 0.5rem;

  &:last-of-type {
    margin: 0;
  }

  span {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25;
    text-align: left;
    ${flex({ justify: 'flex-start' })}

    :nth-child(1) {
      width: calc(37.5% - 0.5rem);
      color: ${props => props.theme.color.N300};
      margin: 0 1rem 0 0;
      line-height: 1.125;
    }

    :nth-child(2) {
      width: calc(62.5% - 0.5rem);
      color: ${props => props.theme.color.N800};
    }
  }
`;

export const Info = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: calc(100% - 3rem);
  padding: 0;
  margin: 0.5rem auto;
  color: ${props => props.theme.color.N300};

  span {
    width: 100%;
    font-size: 0.875rem;
    font-weight: 400;
    text-align: ${props => (props.align ? props.align : 'left')};
    line-height: 1.25;
    color: ${props => props.theme.color.N300};
  }
`;

export const SummaryInfo = styled.div`
  ${flex({ justify: 'flex-start' })}
  width: 100%;
  padding: 0 1.5rem;
  margin: 0 0 2rem;
`;
