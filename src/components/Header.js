import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../logo Trybe Wallet.png';

class Header extends Component {
  round = (value) => (
    Math.round(value * 100) / 100).toFixed(2);

  getTotal = (expenses) => this.round(
    expenses.length > 0
      ? expenses.reduce((acc, { currency, exchangeRates, value }) => {
        const valorTrocado = parseFloat(exchangeRates[currency].ask) * value;
        const soma = acc + valorTrocado;
        return soma;
      }, 0).toFixed(2)
      : 0,
  );

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <img
          src={ logo }
          alt="logo Trybe Wallet"
          className="logo-img"
        />
        <p data-testid="email-field">
          User:
          {' '}
          { email }
        </p>
        <div className="dispesas">
          <p>
            Despesas:
            {' '}
            <span data-testid="total-field">
              { this.getTotal(expenses) }
            </span>
          </p>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default connect(mapStateToProps)(Header);
