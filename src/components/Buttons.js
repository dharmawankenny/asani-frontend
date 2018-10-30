import styled from 'styled-components';

export const BigActionButton = styled.button`
  color: ${props => props.theme.color.N0};
  background: ${props => props.theme.color.mainProductBlue};
  width: 100%;
  margin: ${props => props.margin ? props.margin : '0'};
  padding: 1rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadow.base};
  border-radius: ${props => props.theme.borderRadius};
`;
