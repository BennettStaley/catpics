import { ReactNode } from 'react';
import styled from 'styled-components';

const GutterBase = ({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={className}>{children}</div>;
};

export const Gutter = styled(GutterBase)`
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  height: 100%;
  @media screen and (max-width: 600px) {
    padding: 8px;
  }
`;
