import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white} from 'material-ui/styles/colors';
import {grey500} from 'material-ui/styles/colors';

const fujitsuRed = '#c80000';

export const fjTheme = getMuiTheme({
  toolbar: {
    backgroundColor: fujitsuRed,
    height: 64,
    titleFontSize: 24,
  },
  palette: {
    accent1Color: fujitsuRed,
    primary1Color: fujitsuRed,
    canvasColor: white,
    disabledColor: grey500,
    textColor: fujitsuRed,
  },
  raisedButton: {
    secondaryTextColor: white,
  }
});
