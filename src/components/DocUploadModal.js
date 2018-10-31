import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CloseIcon from '../assets/close.svg';
import { flex } from '../commons/theme';

import DocUpload from './DocUpload';
import Spinner from './Spinner';

export default class DocUploadModal extends React.Component {
  static defaultProps = {
    userDocument: {},
  };

  state = {
    showBanks: true,
    showOutlets: true,
  };

  componentDidUpdate(prevProps) {
    if (!this.props.active && prevProps.active) {
      document.body.style.overflow = 'auto';
    } else if (this.props.active && !prevProps.active) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    if (this.props.onClose()) {
      this.props.onClose();
    }

    document.body.style.overflow = 'auto';
  }

  toggleBanks = () => this.setState(prevState => ({ showBanks: !prevState.showBanks }));
  toggleOutlets = () => this.setState(prevState => ({ showOutlets: !prevState.showOutlets }));

  render() {
    const { active, onClose, ...docUploadProps } = this.props;

    return (
      <Modal active={active}>
        <Content active={active}>
          <ContentAnimationWrapper active={active}>
            <Header>
              <h1>Upload {this.props.userDocument.doc_name}</h1>
              <button onClick={onClose}><img src={CloseIcon} /></button>
            </Header>
            <DocUpload {...docUploadProps} />
          </ContentAnimationWrapper>
        </Content>
      </Modal>
    );
  }
}

const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3000;
  transform: translate3d(0, ${props => props.active ? '0' : '100%'}, 0);
  transition: ${props => props.active ? 'none' : '0s ease all 0.25s'};
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.color.N0};
  transform: translate3d(0, ${props => props.active ? '0' : '100%'}, 0);
  transition: 0.25s ease all;
  padding: 0;
  overflow: auto;
`;

const ContentAnimationWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  ${flex({ justify: 'space-between', direction: 'column' })}
  opacity: ${props => props.active ? '1' : '0'};
  transition: ${props => props.active ? '0.125s ease all 0.125s' : 'none'};

  @media screen and (min-width: ${props => props.theme.breakpoint.tablet}) {
    width: 32rem;
    margin: 0 auto;
  }
`;

const SpinnerWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  ${flex()}
`;

const Header = styled.div`
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
    }
  }
`;