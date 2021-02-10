import React from 'react';
import Layout from './Pages/Layout';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#900000'
      },
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
