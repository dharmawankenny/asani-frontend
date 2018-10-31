import Home from './Home';
import UserAccess from './UserAccess';
import CreditScore from './CreditScore';
import LoanHistory from './LoanHistory';
import WhatIsACreditScore from './WhatIsACreditScore';

export const AUTHENTICATED_PAGES = {
  HOME: Home,
  CREDIT_SCORE: CreditScore,
  LOAN_HISTORY: LoanHistory,
  WHAT_IS_CREDIT_SCORE: WhatIsACreditScore,
};

export const UNAUTHENTICATED_PAGES = {
  AUTHENTICATION: UserAccess,
};

export default {
  AUTHENTICATED_PAGES,
  UNAUTHENTICATED_PAGES,
};
