import styled from 'styled-components';
import { Switch, Paper, Typography } from '@material-ui/core';
import { useState, SyntheticEvent } from 'react';

const NightmodeSwitchBase = ({ className }: { className?: string }) => {
  const [nightmodeOn, setNightModeOn] = useState(true);
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
