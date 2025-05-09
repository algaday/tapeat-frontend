'use client';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';

import { componentsOverrides } from './overrides';
import breakpoints from './theme/breakpoints';
import palette from './theme/palette';
import shadows, { customShadows } from './theme/shadows';
import typography from './theme/typography';

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: palette.light,
        typography,
        breakpoints,
        shape: { borderRadius: 8 },
        shadows: shadows.light,
        customShadows: customShadows.light,
      }),
    [],
  );

  theme.components = componentsOverrides(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
