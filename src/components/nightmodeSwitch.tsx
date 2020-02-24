import styled from 'styled-components';
import { Switch, Paper, Typography, Theme } from '@material-ui/core';
import { useEffect, useState, SyntheticEvent, useContext } from 'react';
import { ThemeContext } from '../pages/_app';

const NightmodeSwitchBase = ({ className }: { className?: string }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [nightmodeOn, setNightModeOn] = useState(false);

  useEffect(() => {
    if (nightmodeOn) {
      console.log('on');
      setTheme({
        ...theme,
        palette: {
          ...theme.palette,
          type: 'dark',
        },
      } as Partial<Theme>);
    } else {
      setTheme({
        ...theme,
        palette: {
          ...theme.palette,
          type: 'light',
        },
      } as Partial<Theme>);
    }
  }, [nightmodeOn]);

  return (
    <Paper className={className}>
      <Switch
        checked={nightmodeOn}
        onChange={(_: SyntheticEvent<HTMLInputElement>, checked: boolean) => {
          setNightModeOn(checked);
        }}
      />
      <Typography variant="body2">Night Mode</Typography>
    </Paper>
  );
};

export const NightmodeSwitch = styled(NightmodeSwitchBase)`
  position: fixed;
  left: 24px;
  bottom: 24px;
  width: 154px;
  height: 38ppx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 12px;
`;
