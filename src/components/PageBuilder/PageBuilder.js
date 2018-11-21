import styled from 'styled-components';

import { flex } from '../../commons/theme';

export const PageWrapper = styled.div`
  width: 100%;
  max-width: 32rem;
  padding: 0 1.5rem 3rem;
  margin: 0 auto;
  min-height: calc(100vh - 4rem);
  ${props => flex({ direction: props.vertical ? 'column' : 'row', justify: 'flex-start', align: 'flex-start' })}
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
  font-size: 1.125rem;
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

export const ProgressBar = styled.div`
  width: 100%;
  ${flex({ justify: 'space-between' })}

  span {
    width: 2rem;
    font-size: 0.875rem;
    margin: 0;
    color: ${props => props.theme.color.N300};

    &:first-of-type {
      text-align: left;
    }

    &:last-of-type {
      text-align: right;
    }
  }

  & > div {
    flex: 1;
    margin: 0;
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
      background: ${props => props.levelColor};
      border-radius: ${props => props.theme.borderRadius};
    }

    .bar {
      z-index: 2;
      width: ${props => props.progress}%;
    }

    .bg {
      z-index: 0;
      right: 0;
      opacity: 0.25;
    }
  }
`;

export const ProgressSegment = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  left: ${props => props.offset ? `${props.offset}%` : '0'};
  bottom: 0;
  z-index: ${props => props.zIndex};
  width: ${props => props.length}%;
  background: ${props => props.color ? props.color : props.theme.color.mainProductBlue};
  opacity: ${props => props.opacity ? props.opacity : '0.125'};
  ${props => props.leftRadius && `border-radius: ${props.theme.borderRadius} 0 0 ${props.theme.borderRadius};`}
  ${props => props.rightRadius && `border-radius: 0 ${props.theme.borderRadius} ${props.theme.borderRadius} 0;`}
  ${props => props.fullRadius && `border-radius: ${props.theme.borderRadius};`}
`;

export const ArrowMarker = styled.div`
  position: absolute;
  ${props => props.invert ? 'top: -0.125rem;' : 'bottom: -0.125rem;'}
  left: ${props => props.progress}%;
  transform: translate3d(-50%, ${props => props.invert ? '-100%' : '100%'}, 0)${props => props.invert && ' rotate(180deg)'};
  padding: 0;
  ${flex()}

  img {
    width: 0.5rem;
    height: auto;
  }
`;
