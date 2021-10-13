import axios from "axios";

export const GET_All_DOGS = "GET_All_DOGS";
export const GET_DOGS_API = "GET_DOGS_API";
export const GET_DOGS_DB = "GET_DOGS_DB";
export const GET_TEMPERAMENT = " GET_TEMPERAMENT";
export const ADD_DOGS = " ADD_DOGS";
export const SEARCH_BY_ID = "SEARCH_BY_ID";
export const SEARCH_BY_NAME = " SEARCH_BY_NAME";
export const DOG_DELETE = " DOG_DELETE";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const GET_ORDER_ASC = "GET_ORDER_ASC";
export const GET_ORDER_DESC = "GET_ORDER_DESC";
export const GET_HEIGHT_LOW = " GET_HEIGHT_LOW";
export const GET_HEIGHT_HIGH = " GET_HEIGHT_HIGH";
export const GET_WEIGH_LIGHTER = " GET_WEIGH_LIGHTER";
export const GET_WEIGH_HIGHEST = " GET_WEIGH_HIGHEST";
export const GET_HEIGHT_LIGHTER = " GET_HEIGHT_LIGHTER";
export const GET_HEIGHT_HIGHEST = " GET_HEIGHT_HIGHEST";

export function getAllDogs() {
  return async (dispatch) => {
    const { data } = await axios.get(`/dogs`);
    dispatch({ type: GET_All_DOGS, payload: data });
  };
}

export function getDogsApi() {
  return async (dispatch) => {
    const { data } = await axios.get(`/dogs/api`);
    dispatch({ type: GET_DOGS_API, payload: data });
  };
}

export function getDogsDb() {
  return async (dispatch) => {
    const { data } = await axios.get(`/dogs/db`);
    dispatch({ type: GET_DOGS_DB, payload: data });
  };
}

export const searchById = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`dogs/dogDetail/${id}`);
    dispatch({ type: SEARCH_BY_ID, payload: data });
  };
};

export const searchByName = (payload) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/dogs/search?q=${payload}`);
    dispatch({ type: SEARCH_BY_NAME, payload: data });
  };
};

export const createDogs = (payload) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/dogs/create`, payload);
    dispatch({ type: ADD_DOGS, payload: data });
  };
};

export const dogDelete = (id) => {
  return async (dispatch) => {
    await axios.delete(`dogs/dogDelete/${id}`);
    dispatch({ type: DOG_DELETE, payload: id });
  };
};

export const getTemperament = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`/temperaments`);
    dispatch({ type: GET_TEMPERAMENT, payload: data });
  };
};
export const filterTemperament = (payload) => {
  return (dispatch) => {
    dispatch({ type: FILTER_BY_TEMPERAMENT, payload: payload });
  };
};

export const filterOrderAsc = (payload) => {
  return (dispatch) => {
    dispatch({ type: GET_ORDER_ASC, payload: payload });
  };
};

export const filterOrderDes = (payload) => {
  return (dispatch) => {
    dispatch({ type: GET_ORDER_DESC, payload: payload });
  };
};

export const filterByWeighLighter = (payload) => {
  return (dispatch) => {
    dispatch({ type: GET_WEIGH_LIGHTER, payload: payload });
  };
};

export const filterByWeightHighest = (payload) => {
  return (dispatch) => {
    dispatch({ type: GET_WEIGH_HIGHEST, payload: payload });
  };
};

export const filterByHeightLow = (payload) => {
  return (dispatch) => {
    dispatch({ type: GET_HEIGHT_LIGHTER, payload });
  };
};

export const filterByHeightHigh = (payload) => {
  return (dispatch) => {
    dispatch({ type: GET_HEIGHT_HIGHEST, payload });
  };
};
