import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class DocUpload extends React.Component {
  static propTypes = {
    upload: PropTypes.func.isRequired,
    loading: PropTypes.boolean,
  };

  handleInputChange = evt => {
    this.props.upload(evt.target.files[0]);
  };

  render() {
    return (
      <input type="file" accept="image/*" id="file-input" onChange={this.handleInputChange} />
    );
  }
}
