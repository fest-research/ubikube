import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white} from 'material-ui/styles/colors';
import {grey500} from 'material-ui/styles/colors';

const fujitsuRed = '#C80000';

export const theme = getMuiTheme({
  toolbar: {
    backgroundColor: fujitsuRed
  },
  palette: {
    accent1Color: fujitsuRed,
    canvasColor: white,
    disabledColor: grey500,
    primary1Color: fujitsuRed,
    textColor: fujitsuRed
  },
  raisedButton: {
    secondaryTextColor: white
  }
});
