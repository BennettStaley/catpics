import styled from 'styled-components';
import { Paper, Button, Typography } from '@material-ui/core';

const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

export const ImageBoxBase = ({
  className,
  base64,
  name,
  size,
  onDelete,
}: {
  className?: string;
  base64: string;
  onDelete: () => void;
  name: string;
  id: number;
  size: number;
}) => {
  return (
    <Paper variant="elevation" className={className}>
      <div
        css={`
          display: block;
          height: 124px;
          width: 50%;
          > img {
            height: 100%;
            width: 100%;
          }
        `}
      >
        <img src={base64}></img>
      </div>
      <div
        css={`
          padding: 8px;
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `}
      >
        <Typography>{truncateString(name, 20)}</Typography>
        <div
          css={`
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Typography variant="body2">
            size: {(size / 1024).toFixed(2)}kb
          </Typography>
          <Button onClick={onDelete}>Delete</Button>
        </div>
      </div>
    </Paper>
  );
};

export const ImageBox = styled(ImageBoxBase)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 124px;
`;
