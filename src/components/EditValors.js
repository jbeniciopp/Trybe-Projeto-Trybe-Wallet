import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { moedasAPI, fetchEditedValor } from '../redux/actions';

class EditValors extends Component {
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
    const { expenses, idToEdit, dispatch } = this.props;
    await dispatch(moedasAPI(this.state));
    this.setState({
      ...expenses[idToEdit],
    });
  }

  componentDidUpdate(prevProps) {
    const { expenses, idToEdit } = this.props;
    if (prevProps.expenses !== expenses) {
      this.setState({
        ...expenses[idToEdit],
      });
    }
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
    await dispatch(fetchEditedValor({ ...this.state }));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
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
              value={ currency }
            >
              {currencies.map((currencyp) => (
                <option key={ currencyp } value={ currencyp }>
                  {currencyp}
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
              value={ method }
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
              value={ tag }
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
          <button type="submit">Editar despesa</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

EditValors.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(EditValors);
