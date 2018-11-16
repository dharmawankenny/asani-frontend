import Home from './Home';
import HomeBackup from './Home/Home-Backup'
import UserAccessBackUp from './UserAccessBackUp';
import UserAccess from './UserAccess'
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
  AUTHENTICATION: UserAccessBackUp,
};

export default {
  AUTHENTICATED_PAGES,
  UNAUTHENTICATED_PAGES,
};
