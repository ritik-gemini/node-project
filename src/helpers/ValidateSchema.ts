import Joi from "joi";

const userSchema: any = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().lowercase(),
});

export const validateSchema = (payload: any) => {
  const { error } = userSchema.validate(payload);
  if (error) return false;

  return true;
};
