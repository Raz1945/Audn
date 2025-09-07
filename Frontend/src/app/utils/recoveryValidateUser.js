const USER_REGEX = /^[a-zA-Z0-9_-]{4,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Si fuera necesario validar el formato de usuario y de la contraseña
export const recoveryValidateUser = (userIdentifier) => {
  const errors = {};

  const isUsername = USER_REGEX.test(userIdentifier);
  const isEmail = EMAIL_REGEX.test(userIdentifier);
  errors.validUserIdentifier = isUsername || isEmail;
  
  return errors;
};