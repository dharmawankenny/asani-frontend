import styled from 'styled-components';

import { flex } from '../commons/theme';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  ${props => flex({ direction: props.vertical ? 'column' : 'row', justify: 'flex-start', align: 'flex-start' })}
  margin: 0;
  padding: 1.5rem 1.5rem 3rem;

  @media screen and (min-width: ${props => props.theme.breakpoint.tablet}) {
    width: 32rem;
    margin: 0 auto;
  }
`;

export const SegmentContext = styled.div`
  width: 100%;
  ${flex({ justify: 'flex-start' })}
  margin: 0 0 1rem;
`;

export const FullSegmentHeader = styled.span`
  width: 100%;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 0.375rem;
  color: ${props => props.theme.color.mainProductBlue};
`;

export const SegmentHeader = styled.span`
  flex: 1;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 1rem 0 0;
  color: ${props => props.theme.color.mainProductBlue};
`;

export const SegmentAction = styled.button`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1;
  margin: 0;
  color: ${props => props.theme.color.N300};
`;

export const SegmentDescription = styled.span`
  display: block;
  width: 100%;
  font-size: 0.75rem;
  font-width: 400;
  line-height: 1.25;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.color.N300};
  text-align: left;

  strong {
    font-weight: 700;
    color: ${props => props.theme.color.N800};
  }
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  ${flex()}
  padding: 2rem;
`;

export const EmptyWrapper = styled.p`
  width: 100%;
  ${flex()}
  padding: 2rem 0;
  font-size: 0.875rem;
  line-height: 1.25;
  text-align: center;
  color: ${props => props.theme.color.N300};
`;
