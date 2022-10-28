export * as User from "../actions/user";
import type { Context } from "../context";

export type Validation = (args: ProtectedActionParam) => {
  isValid: (() => boolean) | boolean;
  errorMessage: string;
};

export type ProtectedActionParam<A = any, R = any> = {
  ctx: Context;
  args?: A;
  root?: R;
  validations?: Validation[];
};

export type ProtectedActionCallbackFuncType<X> = (
  args: ProtectedActionParam
) => X;

/**
 * This checks weather a user have a session and tokens in the context
 * @param args.ctx - context passed from createContext
 * @param args.validations - any extra checks if you need
 * @returns result of action you passed in the HOC
 */
function protectedAction(args: ProtectedActionParam) {
  const { token, user } = args.ctx;

  if (!token || !user) {
    throw new Error("need to signed in in order to execute the action");
  }

  args.validations?.forEach((validator) => {
    const { isValid, errorMessage } = validator(args);
    const validate = isValid instanceof Function ? isValid : () => isValid;
    if (!validate()) {
      throw new Error(errorMessage);
    }
  });

  return <T>(action: ProtectedActionCallbackFuncType<T>) => {
    return action(args);
  };
}

export { protectedAction };
