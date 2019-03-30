import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Routes from './routes'
import './App.css';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#757575',
      contrastText: '#000'
    },
    primary: {
      main: '#03A9F4',
      contrastText: '#fff'
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    useNextVariants: true,
    fontFamily: ['"Lato"', 'sans-serif'].join(',')
  },
  overrides: {
    MuiButton: {
      text: {
        color: 'white',
        textTransform: 'none',
        fontWeightMedium: 500
      }
    }
  }
});
class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Routes/>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App;
