import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white} from 'material-ui/styles/colors';
import {redA100} from 'material-ui/styles/colors';

const fujitsuRed = '#910000';

export const fjTheme = getMuiTheme({
  appBar: {
    color: white,
    height: 64,
    textColor: fujitsuRed,
  },
  palette: {
    accent1Color: white,
    canvasColor: fujitsuRed,
    disabledColor: redA100,
    textColor: white,
  },
  raisedButton: {
    secondaryTextColor: fujitsuRed,
  }
});
