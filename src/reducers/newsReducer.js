import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  news: null
};

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.NEWS_GET_NEWS_SUCCESS: {
      const {articles} = action.payload;

      return {
        news: articles,
        filterTypes: articles.reduce((results, article) => {
          if (results.indexOf(article.source.name) === -1) { //Could use Set data structure
            results.push(article.source.name)
          }
          return results;
        }, [])
      }
    }

    default: {
      return state;
    }
  }
};


export default newsReducer;