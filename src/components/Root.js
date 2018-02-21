import React from 'react'
import {Provider} from 'react-redux'

import store from '../configureStore'

import './Root.css';

import NewsPage from './newsPage/NewsPage';


const Root = () => (
  <Provider store={store}>
    <div>
      <main className="container">
        <NewsPage/>
      </main>
    </div>
  </Provider>
);

export default Root;
