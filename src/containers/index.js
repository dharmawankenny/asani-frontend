import Home from './Home';
import UserAccess from './UserAccess';

export const AUTHENTICATED_PAGES = {
  home: Home,
};

export const UNAUTHENTICATED_PAGES = {
  userAccess: UserAccess,
};

export default {
  AUTHENTICATED_PAGES,
  UNAUTHENTICATED_PAGES,
};
