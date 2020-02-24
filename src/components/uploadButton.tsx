import React, { SyntheticEvent } from 'react';

import styled from 'styled-components';
import { Button, Typography } from '@material-ui/core';

const UploadButtonBase = ({
  error,
  assistiveText,
  // loading,
  // loadingText,
  upload,
  className,
}: {
  error?: boolean;
  assistiveText?: string;
  upload: (e: SyntheticEvent<HTMLInputElement, Event>) => void;
  className?: string;
}) => {
  const uploadClick = () => {
    const input = document.getElementsByClassName(`${className}__Input`);
    if (input[0]) {
      const button = input[0] as HTMLElement;
      button.click();
    }
  };
  return (
    <div className={className}>
      <Button fullWidth variant="contained" onClick={() => uploadClick()}>
        upload
      </Button>
      <input
        onChange={e => {
          upload(e);
        }}
        className={`${className}__Input`}
        accept="image/x-png,image/jpeg"
        type="file"
        name="uploadimage"
      />
      {error && <Typography color="error">{assistiveText}</Typography>}
    </div>
  );
};

export const UploadButton = styled(UploadButtonBase)`
  display: block;
  width: 100%;

  @media screen and (min-width: 600px) {
    max-width: 198px;
  }
  > input {
    display: none;
  }
`;
