import NextApp from 'next/app';
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import {
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

const theme = {
  ...createMuiTheme({
    palette: {
      common: { black: '#000', white: '#fff' },
      background: { paper: '#fff', default: '#fafafa' },
      primary: {
        light: 'rgba(250, 128, 119, 1)',
        main: 'rgba(244, 67, 54, 1)',
        dark: 'rgba(211, 47, 47, 1)',
        contrastText: '#fff',
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
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
      },
    },
  }),
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
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </StyledThemeProvider>
      </MaterialThemeProvider>
    );
  }
}
