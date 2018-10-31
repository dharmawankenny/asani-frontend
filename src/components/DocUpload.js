import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { flex } from '../commons/theme';

import { BigActionButton } from './Buttons';

export default class DocUpload extends React.Component {
  static propTypes = {
    upload: PropTypes.func.isRequired,
    loading: PropTypes.boolean,
  };

  static defaultProps = {
    userDocument: {},
  };

  inputRef = React.createRef();

  clearInput = () => {
    this.inputRef.current.value = '';
  };

  handleInputChange = evt => {
    this.props.upload(evt.target.files[0], this.props.userDocument.doc_code);
    this.clearInput();
  };

  render() {
    return (
      <Wrapper>
        {this.props.progress < 0 && (
          <UploadButton>
            <img src={this.props.userDocument.icon_url} />
            <h1>Upload {this.props.userDocument.doc_name}</h1>
            <input ref={this.inputRef} type="file" accept="image/*" id="file-input" onChange={this.handleInputChange} />
          </UploadButton>
        )}
        {this.props.progress >= 0 &&
          !this.props.finished && (
          <ProgressBar progress={this.props.progress}>
            <h1>Uploading {this.props.progress}%</h1>
            <div>
              <div className="bar" />
              <div className="bg" />
            </div>
          </ProgressBar>
        )}
        {this.props.progress === 100 &&
          this.props.finished && (
            <FinishedState>
              <img src={this.props.userDocument.icon_url} />
              <h1>Upload {this.props.userDocument.doc_name} Berhasil!</h1>
              <BigActionButton onClick={this.props.finishedCallback}>{this.props.finishedText}</BigActionButton>
            </FinishedState>
          )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  ${flex()}
`;

const UploadButton = styled.div`
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  ${flex()}

  img {
    width: 10rem;
    height: 10rem;
    object-fit: contain;
  }

  h1 {
    width: 100%;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    margin: 1.5rem 0 0;
    color: ${props => props.theme.color.mainProductBlue};
  }

  input[type=file] {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  ${flex()}
  padding: 1.5rem;

  h1 {
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    margin: 0 0 1rem;
    color: ${props => props.theme.color.N800};
  }

  & > div {
    width: 100%;
    height: 0.75rem;
    border-radius: ${props => props.theme.borderRadius};
    position: relative;

    .bar,
    .bg {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      background: ${props => props.theme.color.mainProductBlue};
      border-radius: ${props => props.theme.borderRadius};
    }

    .bar {
      z-index: 2;
      width: ${props => props.progress}%;
    }

    .bg {
      z-index: 1;
      right: 0;
      opacity: 0.25;
    }
  }
`;

const FinishedState = styled.div`
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  ${flex()}

  img {
    width: 10rem;
    height: 10rem;
    object-fit: contain;
  }

  h1 {
    width: 100%;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    margin: 1rem 0;
    color: ${props => props.theme.color.mainProductBlue};
  }
`;
