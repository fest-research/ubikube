import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Ubikube from './ubikube';

// Fixes https://github.com/callemall/material-ui/issues/4670
injectTapEventPlugin();

ReactDOM.render(
  <Ubikube />,
  document.getElementById('root'),
);
