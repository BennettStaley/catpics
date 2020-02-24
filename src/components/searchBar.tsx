import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const SearchBarBase = ({
  className,
  onChange,
  value,
}: {
  onChange: (e: any) => any;
  value: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <TextField
        onChange={onChange}
        value={value}
        fullWidth
        label="search"
        variant="filled"
      ></TextField>
    </div>
  );
};

export const SearchBar = styled(SearchBarBase)`
  width: 100%;
  height: 100%;
  @media screen and (min-width: 600px) {
    max-width: 360px;
  }
`;
