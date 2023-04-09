import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { valorMoedasAPI, moedasAPI } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(moedasAPI(this.state));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    const { id } = this.state;
    e.preventDefault();
    this.setState({ value: '', description: '', id: id + 1 });
    const { dispatch } = this.props;
    await dispatch(valorMoedasAPI({ ...this.state }));
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <form onSubmit={ (e) => this.handleSubmit(e) }>
        <div className="form-wallet">
          <label htmlFor="value">
            Valor:
            <input
              onChange={ this.handleChange }
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              onChange={ this.handleChange }
              data-testid="currency-input"
              name="currency"
            >
              {currencies.map((currency) => (
                <option key={ currency } value={ currency }>
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              onChange={ this.handleChange }
              data-testid="method-input"
              name="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              onChange={ this.handleChange }
              data-testid="tag-input"
              name="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              onChange={ this.handleChange }
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
            />
          </label>
        </div>
        <div className="button-submit">
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
