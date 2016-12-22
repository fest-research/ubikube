import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red600} from 'material-ui/styles/colors';

export const fjTheme = getMuiTheme({
  appBar: {
    height: 50,
    color: red600,
  },
  palette: {
    primary1Color: red600,
    accent1Color: red600,
    textColor: red600,
  }
});
