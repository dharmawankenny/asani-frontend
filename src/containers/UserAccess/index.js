import React from 'react';

export default class UserAccess extends React.Component {
  state = {
    telNumber: '',
  };

  setTelNumber = telNumber => this.setState({ telNumber });

  render() {
    return (
      <div>
        <h1>Cek Skor Kredit Kamu GRATIS, Temukan Pinjaman Terbaikmu!</h1>
        <div>
          <span>+62</span>
          <input type="tel" placeholder="081123xxxxxx" value={this.state.telNumber} onChange={evt => this.setTelNumber(evt.target.value)} />
        </div>
        <button onClick={() => this.props.logIn(this.state.telNumber, { id: this.state.telNumber })}>Masuk / Daftar</button>
        <div>
          <button>id</button>
          <span>|</span>
          <button>en</button>
          <a>help</a>
        </div>
      </div>
    );
  }
}
