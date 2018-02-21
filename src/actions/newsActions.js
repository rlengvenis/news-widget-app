import axios from 'axios';
import * as actionTypes from './actionTypes';

const URL_ENDPOINT = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ffa63911c2844212b97b9b510fb5140a';

export const fetchNews = () => async (dispatch) => {
  try {
    const response = await axios.get(URL_ENDPOINT);

    dispatch({
      type: actionTypes.NEWS_GET_NEWS_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    dispatch({
      type: actionTypes.NOTIFICATIONS_SHOW_ERROR,
      payload: 'Error occurred while getting contact list'
    });
  }
};

