import '@babel/polyfill';
import 'normalize.css';

import React from 'react';
import { Provider } from 'react-redux';
import { Router, navigate } from '@reach/router';
import { ThemeProvider } from 'styled-components';
import moment from 'moment-timezone';

import SITEMAP from './commons/sitemap';
import theme from './commons/theme';

import { Provider as AuthProvider } from './contexts/auth';

import { AUTHENTICATED_PAGES, UNAUTHENTICATED_PAGES } from './containers';

import NotFound from './containers/NotFound';

import { api } from './api';

import configureStore from './store';

moment.tz.setDefault('Asia/Jakarta');
moment.locale('id-id')

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
    loading: false,
  };

  componentWillMount() {
    if (this.state.loggedIn) {
      const token = localStorage.getItem('asaniMainAuthToken');
      api.defaults.headers.common['Authorization'] = `${token}`;
    }
  }

  componentDidMount() {
    if (!this.state.loggedIn && !window.location.pathname.startsWith(SITEMAP.AUTHENTICATION)) {
      navigate(SITEMAP.AUTHENTICATION);
    } else if (this.state.loggedIn && window.location.pathname.startsWith(SITEMAP.AUTHENTICATION)) {
      navigate(SITEMAP.HOME);
    }
  }

  logIn = async (token) => {
    await localStorage.setItem('asaniMainAuthToken', token);
    api.defaults.headers.common['Authorization'] = `${token}`;
    this.setState({ loggedIn: true });
    navigate(SITEMAP.HOME);
  };

  logOut = async () => {
    await localStorage.removeItem('asaniMainAuthToken');
    delete api.defaults.headers.common['Authorization'];
    this.setState({ loggedIn: false });
    navigate(SITEMAP.AUTHENTICATION);
  };

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AuthProvider value={{ logIn: this.logIn, logOut: this.logOut }}>
            <Router>
              {Object.keys(UNAUTHENTICATED_PAGES).map(key => (
                <UnAuthenticated
                  auth={this.state.loggedIn}
                  componentKey={key}
                  path={SITEMAP[key]}
                />
              ))}
              {Object.keys(AUTHENTICATED_PAGES).map(key => (
                <Authenticated
                  auth={this.state.loggedIn}
                  componentKey={key}
                  path={SITEMAP[key]}
                />
              ))}
              <NotFound path="/*" />
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}
