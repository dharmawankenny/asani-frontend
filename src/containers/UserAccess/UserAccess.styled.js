import styled from 'styled-components';
import { flex } from '../../commons/theme';

export const FontAwesomeIconColor = styled.div`
  color: ${props => props.theme.color.N300};
`;
export const Subheader = styled.div`
  color: ${props => props.theme.color.N300};
`;

export const KeunggulanText = styled.div`
  color: ${props => props.theme.color.N300};
  font-size: 0.75rem;
`;

export const Pttext = styled.div`
  color: ${props => props.theme.color.N200};
  width: calc(100% - 0.5rem);
  pointer-events: none;
  font-size: 0.75rem;
`;
export const Background = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100;
  z-index: -1;
  opacity: 0.5;
`;

export const Content = styled.div`
  width: 100%;
  ${flex({ justify: 'flex-start' })} flex: 1;

  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.5;
    text-align: left;
    margin: 0 0 2rem;
    padding: 0;
  }
`;

export const FormBox = styled.div`
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 512px;
  margin: 0 auto;
  padding: 16px;
  margin-top: -140px;
  z-index: 5000;
  position: relative;
  h1 {
    margin: 0 auto 12px;
    text-align: center;
    line-height: 1.2;
    color: rgb(66, 82, 110);
    font-size: 20px;
    padding: 0;
  }
`;

export const BottomFooter = styled.div`
  max-width: 32rem;
  margin: 0 auto;
`;

export const MastheadBackground = styled.div`
  background-color: rgb(39, 151, 251);
  padding-bottom: 200px;
`;

export const MastheadImage = styled.img`
  width: 512px;
  display: block;
  height: 260px;
  margin: 0 auto;
`;

export const FormBoxSubheader = styled.div`
  width: 100%;
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: left;
  line-height: 1;
  margin: 0 0 0.25rem;
  padding: 0;
  color: #5e6c84;
`;

export const RetryCounter = styled.span`
  width: 100%;
  margin: 1rem 0 0;
  padding: 0;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  color: ${props => props.theme.color.N300};

  strong {
    font-weight: 700;
    color: ${props => props.theme.color.N800};
  }
`;

export const RetryButton = styled.button`
  width: 100%;
  margin: 1rem 0 0;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  color: ${props => props.theme.color.N0};
  background: ${props => props.theme.color.N300};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadow.base};
`;

export const Help = styled.img`
  height: 1.5rem;
  width: auto;
  margin: 0;
  padding: 0;
`;
