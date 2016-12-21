import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';

// Fixes common issues with onTouchTap: https://github.com/callemall/material-ui/issues/4670
injectTapEventPlugin();

const root = document.getElementById('root');
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    root,
  );
};

render();

if (module.hot) {
  module.hot.accept('./components/App', render);
}
