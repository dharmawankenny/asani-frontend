import '@babel/polyfill';
import 'normalize.css';

import React from 'react';
import { Provider } from 'react-redux';
import { Router, navigate } from '@reach/router';
import { ThemeProvider } from 'styled-components';

import SITEMAP from './commons/sitemap';
import theme from './commons/theme';

import { Provider as UserProvider } from './contexts/user';

import { AUTHENTICATED_PAGES, UNAUTHENTICATED_PAGES } from './containers';

import { api } from './api';

import configureStore from './store';

const store = configureStore();

const UnAuthenticated = ({ auth, componentKey, ...rest }) => {
  if (!auth) {
    const Component = UNAUTHENTICATED_PAGES[componentKey];
    return <Component {...rest} />;
  }

  return null;
};

const Authenticated = ({ auth, componentKey, ...rest }) => {
  if (auth) {
    const Component = AUTHENTICATED_PAGES[componentKey];
    return <Component {...rest} />;
  }

  return null;
};

export default class App extends React.Component {
  state = {
    loggedIn: localStorage.getItem('asaniMainAuthToken') ? true : false,
    user: JSON.parse(localStorage.getItem('asaniMainUser')),
    loading: false,
  };

  componentWillMount() {
    if (this.state.loggedIn) {
      const token = localStorage.getItem('asaniMainAuthToken');
      api.defaults.headers.common['Authorization'] = `JWT ${token}`;
    }
  }

  componentDidMount() {
    if (!this.state.loggedIn && !window.location.pathname.startsWith(SITEMAP.AUTHENTICATION)) {
      navigate(SITEMAP.AUTHENTICATION);
    } else if (this.state.loggedIn && window.location.pathname.startsWith(SITEMAP.AUTHENTICATION)) {
      navigate(SITEMAP.HOME);
    }
  }

  logIn = async (token, user) => {
    await localStorage.setItem('asaniMainAuthToken', token);
    await localStorage.setItem('asaniMainUser', JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = `JWT ${token}`
    this.setState({ loggedIn: true, user });
    navigate(SITEMAP.HOME);
  };

  logOut = async () => {
    await localStorage.removeItem('asaniMainAuthToken');
    await localStorage.removeItem('asaniMainUser');
    api.defaults.headers.common['Authorization'] = null;
    this.setState({ loggedIn: false, user: null });
    navigate(SITEMAP.AUTHENTICATION);
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <UserProvider value={this.state.user}>
            <Router>
              <UnAuthenticated
                path={SITEMAP.AUTHENTICATION}
                auth={this.state.loggedIn}
                componentKey="userAccess"
                logIn={this.logIn}
              />
              <Authenticated
                path={SITEMAP.HOME}
                auth={this.state.loggedIn}
                componentKey="home"
                logOut={this.logOut}
              />
            </Router>
          </UserProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}
