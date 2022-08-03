import React, { ReactNode } from 'react';
import Box from 'zmp-framework/react/box';
import cx from '../utils/cx';

type CardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};
const Card = ({ title, className, children }: CardProps) => (
  <div>
    <Box m={0} p={4} className=" text-sm text-slate-600 bg-gray-100">
      {title}
    </Box>
    <div className={cx('p-3', className)}>{children}</div>
  </div>
);

export default Card;
