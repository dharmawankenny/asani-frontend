import React from 'react';

import { Consumer as UserConsumer } from '../../contexts/user';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <UserConsumer>
          {user => user && <h1>Halo {user.id}</h1>}
        </UserConsumer>
        <button onClick={this.props.logOut}>Log Out</button>
      </div>
    );
  }
}
