import * as React from 'react'
import { render } from 'react-dom'
import App from 'components/App'

declare var module: { hot: any };

const rootEl = document.getElementById('root');

render(
  <App />,
  rootEl
);

if (module.hot) {
  module.hot.accept('./components/App', function () {
    let HMREnabledApp = require('./components/App').default;
    render(
      <HMREnabledApp />,
      rootEl
    )
  })
}
