export const USER = 'USER';
export const ADD_OPTIONS = 'ADD_OPTIONS';
export const ADD_VALOR = 'ADD_VALOR';
export const DELETE_VALORS = 'DELETE_VALORS';
export const EDIT_VALORS = 'EDIT_VALORS';
export const ADD_EDIT_VALORS = 'ADD_EDIT_VALORS';

const api = 'https://economia.awesomeapi.com.br/json/all';

export const deleteCurrentValor = (id) => ({
  type: DELETE_VALORS,
  id,
});

export const userSave = (payload) => ({
  type: USER,
  payload,
});

export const addOptions = (payload) => ({
  type: ADD_OPTIONS,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_VALOR,
  payload,
});

export const editValors = (expense) => ({
  type: EDIT_VALORS,
  id: expense.id,
  payload: expense,
});

export const addEditedValor = (expense) => ({
  type: ADD_EDIT_VALORS,
  payload: expense,
});

export const moedasAPI = () => async (dispatch) => {
  const moedasApi = await fetch(api)
    .then((response) => response.json())
    .then((data) => dispatch(addOptions(data)));
  return moedasApi;
};

export const valorMoedasAPI = (expense) => async (dispatch) => {
  await fetch(api)
    .then((response) => response.json())
    .then((data) => dispatch(addExpense({ ...expense, exchangeRates: data })));
};

export const fetchEditedValor = (expense) => async (dispatch) => {
  await fetch(api)
    .then((response) => response.json())
    .then((data) => dispatch(addEditedValor({ ...expense, exchangeRates: data })));
};
