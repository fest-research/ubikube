import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { white } from 'material-ui/styles/colors';
import { grey500 } from 'material-ui/styles/colors';

const red = '#C80000';

export const mainTheme = getMuiTheme({
  toolbar: {
    backgroundColor: red
  },
  palette: {
    accent1Color: red,
    canvasColor: white,
    disabledColor: grey500,
    primary1Color: red,
    textColor: red
  },
  raisedButton: {
    secondaryTextColor: white
  }
});
