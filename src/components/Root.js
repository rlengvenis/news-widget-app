import React from 'react'
import {Provider} from 'react-redux'

import store from '../configureStore'

import './Root.css';


const Root = () => (
  <Provider store={store}>
    <div>
      <main className="container">
          Hello world
      </main>
    </div>
  </Provider>
);

export default Root;
