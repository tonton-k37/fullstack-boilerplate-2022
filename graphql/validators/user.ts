import type { Validation, ProtectedActionParam } from "./index";

/**
 * this is just an exapmle
 * @param args - ProtectedActionParam
 */
const exampleValidateUpdateUser: Validation = (args: ProtectedActionParam) => {
  const isValid = () => !!args?.args;
  const errorMessage = "validation failed";

  return {
    isValid,
    errorMessage,
  };
};

export { exampleValidateUpdateUser };
