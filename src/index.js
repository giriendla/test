import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import green from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import store from './store';


const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: pink,
      error: red,
      // Used by `getContrastText()` to maximize the contrast between the background and
      // the text.
      contrastThreshold: 3,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  });

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>
    , 
    document.getElementById('root'));
registerServiceWorker();
