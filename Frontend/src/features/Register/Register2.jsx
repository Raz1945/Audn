import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '@api/axios';

import { updateUser } from '@app/slices/userSlice';
import { updatePassword } from '@app/slices/passwordSlice';
import { validate } from '@app/utils/validate';

import { InputInstruction } from '@components/ui/Inputs/InputInstruction/InputInstruction';
import { ButtonStandard } from '@components/ui/Buttons/ButtonStandard/ButtonStandard';
import { Input_Checkbox } from '@/components/ui/Inputs/Input_Checkbox/Input_Checkbox';

import { Navbar } from '@components/layout/Navbar/Navbar';

const REGISTER_URL = '/register';

export const Register2 = () => {
  const [user, setUser] = useState('');
  const [validUser, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [isAgreed, setIsAgreed] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook para la redirección

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

  // Validación de nombre de usuario y contraseña
  useMemo(() => {
    const { validName, validPwd } = validate(userFromStore, passwordFromStore, emailFromStore);
    setValidName(validName);
    setValidPwd(validPwd);
  }, [userFromStore, passwordFromStore, emailFromStore]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si los campos son válidos
    if (!validUser) {
      setErrMsg('Nombre de usuario no válido.');
      return;
    }
    if (!validPwd) {
      setErrMsg('Contraseña no válida.');
      return;
    }
    if (!isAgreed) {
      setErrMsg('Debes aceptar los términos y condiciones.');
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email: emailFromStore,
          username: userFromStore,
          password: passwordFromStore,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log(response.data); // todo ELIMINAR 

      navigate('/LoginSuccess');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrMsg('El nombre de usuario no está disponible.');
      } else {
        setErrMsg('Error en el registro. Inténtelo de nuevo más tarde.');
      }
      setPwd('');
      console.error(error);
    }
  };

  return (
    <div className="register__wrapper">
      <Navbar
        to={'/login'}
        tabIndex="1"
        label="Ir a la página de inicio de sesión"
        text="Crear Cuenta"
      />

      <section className="section__wrapper">
        <h1 className="section__title">Ingresa un nombre de usuario y contraseña.</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__label-wrapper">
            <label htmlFor="username" className="register__label">
              Nombre de Usuario:
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                autoComplete="off"
                value={user}
                required
                aria-invalid={!validUser}
                aria-describedby="uidnote"
                onChange={handleChangeUser}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder="Username"
                className={`register__input ${validUser && !validUser !== null ? 'valid' : ''} ${validUser || !user ? '' : 'invalid'}`}
              />
              <InputInstruction focus={!userFocus} refe={user} valid={validUser}>
                4 to 20 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </InputInstruction>

              <p className={`${validUser && !validUser !== null ? 'register__input-text-green' : 'none'} ${validUser || !user ? '' : 'invalid'}`}>
                El nombre de usuario está disponible.
              </p>
            </div>
          </div>

          <div className="register__label-wrapper">
            <label
              htmlFor="password" className="register__label">
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
                placeholder="Password"
                className={`register__input normal ${validPwd ? 'valid' : ''} ${validPwd || !pwd ? '' : 'invalid'}`}
              />
              <InputInstruction focus={!pwdFocus} refe={pwd} valid={validPwd}>
                8 to 20 characters.<br />
                Must include uppercase and lowercase letters, a number, and a special character.<br />
                Allowed special characters: !, @, #, $, %.
              </InputInstruction>
            </div>
          </div>

          <div className="register__checkbox-wapper">
            <Input_Checkbox onChange={(e) => setIsAgreed(e.target.checked)} />
            <span className="register__checkbox-text">He leído y acepto los
              <span className="register__text-orange">Términos</span> y
              <span className="register__text-orange">Condiciones.</span>
            </span>
          </div>

          <div className="section__button">
            <ButtonStandard
              text="Continuar"
              tabIndex="3"
              state={validPwd && validUser && isAgreed ? 'active' : 'disabled'}
              type="submit"
            />
          </div>
        </form>

        <div className="errRef">
          <p className={`errmsg ${errMsg ? 'visible' : ''}`} aria-live="assertive">
            {errMsg}
          </p>
        </div>
      </section>
    </div>
  );
};
