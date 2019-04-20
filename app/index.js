import React from 'react';

// generates router from `src/routers/routes` with help of router_helper functions
import RoutersComponent from './router';

// you can add some global styles in `src/assets/styles/index.scss`
import '../src/assets/styles/index.scss';

const App = () => {
  return (
    <RoutersComponent />
  )
};

export default App;
