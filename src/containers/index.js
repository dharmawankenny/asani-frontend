import Home from './Home';
import UserAccess from './UserAccess';
import CreditScore from './CreditScore';

export const AUTHENTICATED_PAGES = {
  HOME: Home,
  CREDIT_SCORE: CreditScore,
};

export const UNAUTHENTICATED_PAGES = {
  AUTHENTICATION: UserAccess,
};

export default {
  AUTHENTICATED_PAGES,
  UNAUTHENTICATED_PAGES,
};
