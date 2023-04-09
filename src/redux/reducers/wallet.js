import {
  ADD_OPTIONS,
  ADD_VALOR,
  DELETE_VALORS,
  EDIT_VALORS,
  ADD_EDIT_VALORS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_OPTIONS:
    delete action.payload.USDT;
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case ADD_VALOR:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_VALORS:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_VALORS:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.payload,
          };
        }
        return expense;
      }),
      editor: true,
      idToEdit: action.id,
    };
  case ADD_EDIT_VALORS:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return {
            ...expense,
            ...action.payload,
          };
        }
        return expense;
      }),
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
};

export default wallet;
