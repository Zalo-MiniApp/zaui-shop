import React, { forwardRef, ReactNode } from "react";
import { Box, Button } from "zmp-ui";
import { cx } from "../../utils";

export type ButtonType = {
  id: number;
  content: string;
  onClick: (e?) => void;
  type: "primary" | "secondary";
};

type ButtonFixedProps = {
  children?: ReactNode;
  listBtn?: ButtonType[];
  hidden?: boolean;
  zIndex?: Number;
};
const ButtonFixed = forwardRef<HTMLDivElement, ButtonFixedProps>(
  (props, ref) => {
    const { children, listBtn, hidden, zIndex } = props;
    return (
      <Box
        m={0}
        p={4}
        className={cx(
          "bg-white fixed bottom-0 left-0 right-0 shadow-btn-fixed",
          zIndex ? `$z-[${zIndex}]` : "z-[99999]",
          hidden && "anime-move-down"
        )}
        // @ts-ignore
        ref={ref}
      >
        {children && <Box m={0}>{children}</Box>}
        <Box m={0} flex className="gap-4">
          {listBtn?.map((btn) => (
            <Button
              key={btn.id}
              fullWidth
              variant={btn.type}
              size="large"
              onClick={btn.onClick}
            >
              {btn.content}
            </Button>
          ))}
        </Box>
      </Box>
    );
  }
);

export default ButtonFixed;
