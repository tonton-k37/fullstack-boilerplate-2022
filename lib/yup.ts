import * as yup from "yup";

const yupSchemaForSignUp = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

export { yupSchemaForSignUp };
