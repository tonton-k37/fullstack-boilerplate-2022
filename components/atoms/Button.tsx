import { Button as ChakraButton } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

const Button: FC<{ text?: string; buttonProps?: ButtonProps }> = ({
  text = "press me",
  buttonProps,
}) => {
  return <ChakraButton {...buttonProps}>{text}</ChakraButton>;
};

export { Button };
export type { ButtonProps };
