import styled from 'styled-components';

import { flex } from '../commons/theme';

export const Blog = styled.div`
  width: 100%;
  ${flex()}
  margin: 1.5rem 0 0;
`;

export const BlogTitle = styled.h1`
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.25;
  text-align: left;
  color: ${props => props.color ? props.theme.color[props.color] : props.theme.color.N800};
  margin: ${props => props.margin ? props.margin : '1rem 0'};
`;

export const BlogSubtitle = styled.h2`
  width: 100%;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.75;
  text-align: left;
  color: ${props => props.color ? props.theme.color[props.color] : props.theme.color.N600};
  margin: ${props => props.margin ? props.margin : '0.75rem 0'};
`;

export const BlogText = styled.p`
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2;
  text-align: left;
  color: ${props => props.color ? props.theme.color[props.color] : props.theme.color.N400};
  margin: ${props => props.margin ? props.margin : '0.25rem 0'};
`;

export const BlogLink = styled.a`
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: left;
  text-decoration: underline;
  color: ${props => props.color ? props.theme.color[props.color] : props.theme.color.mainProductBlue};
  margin: ${props => props.margin ? props.margin : '0.25rem 0'};
`;
