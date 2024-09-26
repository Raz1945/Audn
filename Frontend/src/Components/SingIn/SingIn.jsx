import axios from '../../api/axios';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { singInValidateUser } from '../../app/features/singInValidateUser';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import { Navbar } from "../other/Navbar/Navbar";


import './index.css';
import '../../validate.css'

import { InputInstruction } from '../other/InputInstruction/InputInstruction';

export const SingIn = () => {
  const [userIdentifier, setUserIdentifier] = useState(''); // puede recibir un user o un email
  const [userIdentifierFocus, setUserIdentifierFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [validUserIdentifier, setValidUserIdentifier] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validInputs, setValidInputs] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();



  // Validar correo o nombre de usuario y contraseña
  useMemo(() => {
    const { validUserIdentifier, validPassword } = singInValidateUser(userIdentifier, password);
    console.log("Validación de userIdentifier: ", validUserIdentifier);
    console.log("Validación de password: ", validPassword);

    setValidUserIdentifier(validUserIdentifier);
    setValidPassword(validPassword);
    setValidInputs(validUserIdentifier && validPassword);
  }, [userIdentifier, password]);



  const handleLogin = async (e) => {

    console.log('enviar datos a backend') // TODO ELIMINAR LUEGO

    e.preventDefault();

    try {
      // Solicitud POST
      const response = await axios.post('http://localhost:3000/login', {
        userIdentifier,
        password,
      });

      // Si la respuesta es exitosa, se almacena el token
      localStorage.setItem('token', response.data.accessToken);

      // Redirigir al usuario
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrMsg('Credenciales incorrectas. Inténtalo de nuevo.');
      } else {
        setErrMsg('Error al iniciar sesión. Inténtalo más tarde.');
      }
    }
  };

  return (
    <div className="singin__wrapper">
      <Navbar
        to={'/login'}
        tabIndex="1"
        label="Ir a la página de inicio de sesión"
        text="Iniciar Sesión"
      />
      <section className="section__wrapper">
        <form className="singin__form" onSubmit={handleLogin}>
          <div className='singin__label-wrapper'>
            <label htmlFor="userIdentifier" className="singin__label">
              Nombre de Usuario o E-mail:
            </label>
            <div className="relative">
              <input
                placeholder="Audn"
                required
                value={userIdentifier}
                onChange={(e) => setUserIdentifier(e.target.value)}
                onFocus={() => setUserIdentifierFocus(true)}
                onBlur={() => setUserIdentifierFocus(false)}
                tabIndex="1"
                className={`singin__input ${validUserIdentifier ? "valid" : ""} ${validUserIdentifier || !userIdentifier ? "" : "invalid"}`}
              />
            </div>
            <InputInstruction focus={!userIdentifierFocus} refe={userIdentifier} valid={validUserIdentifier}>
              4 a 20 caracteres.<br />
              Debe comenzar con una letra.<br />
              Se permiten letras, números, guiones bajos y guiones.

            </InputInstruction>
          </div>

          <div className='singin__label-wrapper'>
            <label
              htmlFor="password"
              className={`singin__label normal ${validPassword ? 'normal' : ''} 
              ${validPassword || !password ? '' : 'invalid-text'}`}
            >
              Contraseña:
            </label>
            <div className="relative">
              <input
                type="password"
                id='password'
                value={password}
                required
                aria-invalid={!validPassword}
                aria-describedby='passwordnote'
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                tabIndex="2"
                placeholder="******"
                className={`singin__input normal ${validPassword ? "valid" : ""} ${validPassword || !password ? "" : "invalid"}`}
              />
              <InputInstruction focus={!passwordFocus} refe={password} valid={validPassword}>
                8 a 20 caracteres.<br />
                Debe incluir letras mayúsculas y minúsculas, un número y un carácter especial.<br />
                Caracteres especiales permitidos: !, @, #, $, %.
              </InputInstruction>

            </div>
          </div>

          {errMsg && <p className="error">{errMsg}</p>}

          <div className="section__button">
            <ButtonLink
              state={validInputs ? 'active' : 'disabled'}
              text="Continuar"
              tabIndex={validInputs ? '3' : '-1'}
              disabled={!validInputs}
            />
          </div>

          <Link className="btn-link" tabIndex="-1">
            Hola
          </Link>
        </form>
      </section>
    </div>
  );
};
