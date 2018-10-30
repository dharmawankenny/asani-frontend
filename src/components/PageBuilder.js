import styled from 'styled-components';

import { flex } from '../commons/theme';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  ${props => flex({ direction: props.vertical ? 'column' : 'row', justify: 'flex-start', align: 'flex-start' })}
  margin: 0;
  padding: 2rem;
`;
