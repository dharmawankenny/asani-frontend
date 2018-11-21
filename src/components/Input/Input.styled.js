import styled from 'styled-components';
import { flex } from '../../commons/theme';

export const InputLabel = styled.span`
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

export const InputError = styled.span`
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

export const InputWrapper = styled.div`
  width: 100%;
  height: 3rem;
  ${flex({ justify: 'flex-start', align: 'stretch' })}
  border: 1px solid ${props => props.theme.color.N40};
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.color.N0};

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

export const InputPrefix = styled.div`
  margin: 0;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  color: ${props => props.theme.color.N300};
  border-right: 1px solid ${props => props.theme.color.N40};
`;

export const InputSuffix = styled.div`
  margin: 0;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  color: ${props => props.theme.color.N300};
  border-r: 1px solid ${props => props.theme.color.N40};
`;
