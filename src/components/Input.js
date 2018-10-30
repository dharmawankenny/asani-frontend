import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { flex } from '../commons/theme';

export default class Input extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.function,
    label: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    error: PropTypes.string,
  };

  render() {
    const { label = false, prefix = false, suffix = false, error = false, ...inputProps } = this.props;

    return (
      <Fragment>
        {label && (
          <InputLabel>{label}</InputLabel>
        )}
        <InputWrapper>
          {prefix && (
            <InputPrefix>{prefix}</InputPrefix>
          )}
          <input {...inputProps} />
          {suffix && (
            <InputSuffix>{suffix}</InputSuffix>
          )}
        </InputWrapper>
        {error && (
          <InputError>{error}</InputError>
        )}
      </Fragment>
    );
  }
}

const InputLabel = styled.span`
  width: 100%;
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: left;
  line-height: 1;
  margin: 0 0 0.25rem;
  padding: 0;
  color: ${props => props.theme.color.N300};
`;

const InputError = styled.span`
  width: 100%;
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: left;
  line-height: 1;
  margin: 0.25rem 0 0;
  padding: 0;
  color: ${props => props.theme.color.R300};
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 3rem;
  ${flex({ justify: 'flex-start', align: 'stretch' })}
  border: 1px solid ${props => props.theme.color.N40};
  border-radius: ${props => props.theme.borderRadius};

  input {
    flex: 1;
    min-width: 0;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    text-align: left;
    color: ${props => props.theme.color.N800};
  }
`;

const InputPrefix = styled.div`
  margin: 0;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  color: ${props => props.theme.color.N300};
  border-right: 1px solid ${props => props.theme.color.N40};
`;

const InputSuffix = styled.div`
  margin: 0;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  color: ${props => props.theme.color.N300};
  border-r: 1px solid ${props => props.theme.color.N40};
`;
