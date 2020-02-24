import NextApp from 'next/app';
import React, { useState, createContext, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import {
  Theme,
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

type ThemeContextType = [Partial<Theme>, (e: Partial<Theme>) => void];

const defaultTheme = {
  palette: {
    type: 'light',
    primary: {
      light: 'rgba(250, 128, 119, 1)',
      main: 'rgba(244, 67, 54, 1)',
      dark: 'rgba(211, 47, 47, 1)',
    },
    secondary: {
      light: 'rgba(99, 202, 250, 1)',
      main: 'rgba(3, 169, 244, 1)',
      dark: 'rgba(0, 116, 168, 1)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
  },
};

export const ThemeContext = createContext<ThemeContextType>([
  defaultTheme as Partial<Theme>,
  () => {},
]);

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [themeState, setThemeState] = useState(defaultTheme as Partial<Theme>);

  const MUITheme = {
    ...createMuiTheme(themeState as Partial<Theme>),
  };

  return (
    <ThemeContext.Provider value={[themeState, setThemeState]}>
      <MaterialThemeProvider theme={MUITheme}>
        <StyledThemeProvider theme={MUITheme}>
          <CssBaseline />
          {children}
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </ThemeContext.Provider>
  );
};

export default class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeContextProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeContextProvider>
    );
  }
}
