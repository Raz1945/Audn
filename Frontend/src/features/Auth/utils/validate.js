const USER_REGEX = /^[a-zA-Z0-9_-]{4,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validate = (username, password, email) => {
  const errors = {};

  const resultName = USER_REGEX.test(username);
  errors.validName = resultName;

  const resultPwd = PWD_REGEX.test(password);
  errors.validPwd = resultPwd;

  const resultEmail = EMAIL_REGEX.test(email);
  errors.validEmail = resultEmail;

  return errors
}

