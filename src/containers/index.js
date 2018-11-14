import Home from './Home';
import UserAccess from './UserAccess';
import CreditScore from './CreditScore';
import LoanHistory from './LoanHistory';
import WhatIsACreditScore from './WhatIsACreditScore';
import DetailPage from './DetailPage';

export const AUTHENTICATED_PAGES = {
    HOME: Home,
    CREDIT_SCORE: CreditScore,
    LOAN_HISTORY: LoanHistory,
    WHAT_IS_CREDIT_SCORE: WhatIsACreditScore,
    DETAIL_PAGE: DetailPage,
};

export const UNAUTHENTICATED_PAGES = {
  AUTHENTICATION: UserAccess,
};

export default {
  AUTHENTICATED_PAGES,
  UNAUTHENTICATED_PAGES,
};
