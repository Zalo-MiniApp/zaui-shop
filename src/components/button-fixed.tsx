import React, { forwardRef, ReactNode } from 'react';
import Box from 'zmp-framework/react/box';
import Button from 'zmp-framework/react/button';

export type ButtonType = {
  id: number;
  content: string;
  onClick: (e?) => void;
  type: 'primary' | 'secondary';
};

type ButtonFixedProps = {
  children?: ReactNode;
  listBtn?: ButtonType[];
};
const ButtonFixed = forwardRef<HTMLDivElement, ButtonFixedProps>((props, ref) => {
  const { children, listBtn } = props;
  return (
    <Box
      m={0}
      p={4}
      className="bg-white fixed bottom-0 left-0 right-0 z-[999999] shadow-btn-fixed"
      // @ts-ignore
      ref={ref}
    >
      {children && <Box m={0}>{children}</Box>}
      <Box m={0} flex className="gap-4">
        {listBtn?.map((btn) => (
          <Button key={btn.id} responsive typeName={btn.type} large onClick={btn.onClick}>
            {btn.content}
          </Button>
        ))}
      </Box>
    </Box>
  );
});

export default ButtonFixed;
