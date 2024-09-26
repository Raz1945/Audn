const USER_REGEX = /^[a-zA-Z0-9_-]{4,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Si fuera necesario validar el formato de usuario y de la contraseña

export const singInValidateUser = (userIdentifier, password) => {
  const errors = {};

  const isUsername = USER_REGEX.test(userIdentifier);
  const isEmail = EMAIL_REGEX.test(userIdentifier);
  errors.validUserIdentifier = isUsername || isEmail;
  
  const resultPwd = PWD_REGEX.test(password);
  errors.validPassword = resultPwd;


  return errors;
};
