import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";

import axios from '../../api/axios';

import { Navbar } from "./navbar";
import { updateUser } from '../../app/features/userSlice';
import { updatePassword } from '../../app/features/passwordSlice';
import { validate } from '../../app/features/validate';
import { InputInstruction } from "../other/InputInstruction/InputInstruction";

const REGISTER_URL = '/register';

export const Register2 = () => {
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const dispatch = useDispatch();

  const emailFromStore = useSelector((state) => state.email.value);
  const userFromStore = useSelector((state) => state.user.value);
  const passwordFromStore = useSelector((state) => state.password.value);

  const handleChangeUser = (e) => {
    setUser(e.target.value);
    dispatch(updateUser(e.target.value));
  };

  const handleChangePwd = (e) => {
    setPwd(e.target.value);
    dispatch(updatePassword(e.target.value));
  };

  useMemo(() => {
    const { validName, validPwd } = validate(userFromStore, passwordFromStore, emailFromStore);
    setValidName(validName);
    setValidPwd(validPwd);
  }, [userFromStore, passwordFromStore, emailFromStore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email: emailFromStore, username: userFromStore, password: passwordFromStore })

    if (!validName) {
      setErrMsg('Nombre de usuario no válido.');
      return;
    }
    if (!validPwd) {
      setErrMsg('Contraseña no válida.');
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email: emailFromStore,
          username: userFromStore,
          password: passwordFromStore
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response.data);
      console.log('accessToken', response.data.password);
      console.log(JSON.stringify(response));

    } catch (error) {
      setErrMsg('Error al enviar datos.');
      console.error(error);
    }
  };

  return (
    <div className="register__wrapper">
      <Navbar
        to={'/login'}
        tabIndex='1'
        label='Ir a la página de inicio de sesión'
        text='Crear Cuenta'
      />
      <section>
        <h1 className="section__title">Ingresa un nombre de usuario y contraseña.</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="register__label">
            Nombre de Usuario:
          </label>
          <div className='relative'>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={user}
              required
              aria-invalid={!validName}
              aria-describedby="uidnote"
              onChange={handleChangeUser}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              placeholder='Username'
              className={`register__input ${validName ? 'valid' : ''} ${validName || !user ? '' : 'invalid'}`}
            />
            <InputInstruction focus={userFocus} refe={user} valid={validName}>
              4 to 20 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </InputInstruction>
          </div>
          <label htmlFor="password" className="register__label">
            Contraseña:
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={pwd}
              required
              aria-invalid={!validPwd}
              aria-describedby="pwdnote"
              onChange={handleChangePwd}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder='Password'
              className={`register__input ${validPwd ? 'valid' : ''} ${validPwd || !pwd ? '' : 'invalid'}`}
            />
            <InputInstruction focus={pwdFocus} refe={pwd} valid={validPwd}>
              8 to 20 characters.<br />
              Must include uppercase and lowercase letters, a number, and a special character.<br />
              Allowed special characters: !, @, #, $, %.
            </InputInstruction>
          </div>

          <button aria-label="Continuar al registro 3" onClick={() => 'continuar'}>Continuar</button>

        </form>
        <div className="errRef">
          <p className={`errmsg ${errMsg ? "visible" : ""}`} aria-live="assertive">
            {errMsg}
          </p>
        </div>
      </section>
    </div>
  );
};
