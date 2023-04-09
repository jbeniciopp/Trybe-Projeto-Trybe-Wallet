import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCurrentValor, editValors } from '../redux/actions';
import editar from '../Editar.png';
import apagar from '../Apagar.png';

class Table extends Component {
  deleteValor = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteCurrentValor(id));
  };

  editValor = async (expense) => {
    const { dispatch } = this.props;
    await dispatch(editValors(expense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table">
        <table>
          <thead>
            <tr>
              <th className="th1">Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th className="thu">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{(+expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{(+expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    (
                      +expense.exchangeRates[expense.currency].ask * expense.value
                    ).toFixed(2)
                  }
                </td>
                <td>Real Brasileiro</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    name={ expense.id }
                    onClick={ () => this.editValor(expense) }
                  >
                    <img src={ editar } alt="editar" />
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteValor(expense.id) }
                  >
                    <img src={ apagar } alt="apagar" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
