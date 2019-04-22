import React from 'react';
import ReactDOM from 'react-dom';
import {StaticRouter} from "react-router-dom";
import RoutersComponent from '../index';

describe('Routers Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <StaticRouter>
        <RoutersComponent/>
      </StaticRouter>
    , div);
  });
});