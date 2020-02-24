import styled from 'styled-components';
import { Paper, useTheme, Typography } from '@material-ui/core';

const LoadingBoxBase = ({
  className,
  base64,
}: {
  className?: string;
  base64: string | null;
}) => {
  const { palette } = useTheme();
  return (
    <Paper variant="elevation" className={className}>
      <div
        css={`
          position: relative;
          height: 124px;
          width: 50%;
          > img {
            height: 100%;
            width: 100%;
          }
        `}
      >
        <div
          css={`
            text-align: center;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background: rgba(0, 0, 0, 0.5);
            background-blend-mode: overlay;
          `}
        />

        <img src={base64 || ''}></img>
      </div>
      <div
        css={`
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        `}
      >
        <Typography>Uploading...</Typography>
        <div
          css={`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            margin: 0 auto;
            border: 8px solid ${palette.text.disabled};
            border-top: 8px solid ${palette.primary.main};
            border-radius: 50%;
            width: 48px;
            height: 48px;
            animation: spin 2s linear infinite;
          `}
        />
      </div>
    </Paper>
  );
};

export const LoadingBox = styled(LoadingBoxBase)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 124px;
`;
