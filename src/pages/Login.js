import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSave } from '../redux/actions';
import logo from '../logo Trybe Wallet.png';

class Login extends React.Component {
  state = {
    email: '',
    emailVerification: false,
    buttonVerification: true,
  };

  onChangeEmail = (e) => {
    // console.log(e.target.value);
    const emailRegExp = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[A-Za-z]+$/;
    const isAValidEmail = emailRegExp.test(e.target.value);
    this.setState({
      emailVerification: isAValidEmail,
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    const { emailVerification } = this.state;
    const passwordLength = 6;
    const isAValidPassword = e.target.value.length >= passwordLength;

    if (emailVerification && isAValidPassword) {
      this.setState({ buttonVerification: false });
    }
  };

  onClickButton = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;

    dispatch(userSave(email));
    history.push('/carteira');
  };

  render() {
    const { buttonVerification } = this.state;
    return (
      <div className="login-div">
        <form className="login">
          <img
            src={ logo }
            alt="logo Trybe Wallet"
            className="logo-img"
          />
          <div className="inputs">
            <input
              type="email"
              placeholder="Email"
              onChange={ this.onChangeEmail }
              data-testid="email-input"
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={ this.onChangePassword }
              data-testid="password-input"
            />
            <button
              type="submit"
              disabled={ buttonVerification }
              onClick={ this.onClickButton }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
