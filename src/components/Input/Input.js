import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputLabel, InputError, InputWrapper, InputPrefix, InputSuffix } from './Input.styled';

export default function Input({
  label,
  prefix,
  suffix,
  error,
  ...inputProps
}) {
  return (
    <Fragment>
      {label && <InputLabel>{label}</InputLabel>}
      <InputWrapper>
        {prefix && <InputPrefix>{prefix}</InputPrefix>}
        <input {...inputProps} />
        {suffix && <InputSuffix>{suffix}</InputSuffix>}
      </InputWrapper>
      {error && <InputError>{error}</InputError>}
    </Fragment>
  );
}

Input.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  label: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  error: PropTypes.string,
};
