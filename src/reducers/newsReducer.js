import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  news: null
};

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.NEWS_GET_NEWS_SUCCESS: {
      return {
        news: action.payload.articles
      }
    }

    default: {
      return state;
    }
  }
};


export default newsReducer;