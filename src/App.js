import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Routes from './routes'
import './App.css';

const theme = createMuiTheme({
  palette: {
    secondary: {
      light: '#ffd95b',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#000'
    },
    primary: {
      light: '#52c7b8',
      main: '#0f8235',
      dark: '#00675b',
      contrastText: '#fff'
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    useNextVariants: true,
    fontFamily: ['"Lato"', 'sans-serif'].join(',')
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
