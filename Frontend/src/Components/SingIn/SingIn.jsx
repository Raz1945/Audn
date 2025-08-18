import axios from '../../api/axios';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { singInValidateUser } from '../../app/features/singInValidateUser';
import { Navbar } from '../other/Navbar/Navbar';
import { InputInstruction } from '../other/InputInstruction/InputInstruction';
import { ButtonLogin } from '../ButtonLogin/ButtonLogin';

import './index.css';
import '../../validate.css';

const LOGIN_URL = 'http://localhost:3000/login';

export const SingIn = () => {
  const [userIdentifier, setUserIdentifier] = useState(''); // puede recibir un user o un email
  const [userIdentifierFocus, setUserIdentifierFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [validUserIdentifier, setValidUserIdentifier] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validInputs, setValidInputs] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();

  // Validar correo o nombre de usuario y contraseña
  useMemo(() => {
    const { validUserIdentifier, validPassword } = singInValidateUser(userIdentifier, password);
    setValidUserIdentifier(validUserIdentifier);
    setValidPassword(validPassword);
    setValidInputs(validUserIdentifier && validPassword);
  }, [userIdentifier, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verifica si esto se imprime
    console.log('Formulario enviado'); // TODO ELIMINAR

    // Verificar que los campos de entrada sean válidos
    if (!validUserIdentifier || !validPassword) {
      setErrMsg('Por favor, ingresa un nombre de usuario y contraseña válidos.');
      return;
    }

    try {
      // Depuración de datos enviados
      console.log('Datos enviados:', { userIdentifier, password }); // TODO ELIMINAR 

      // Solicitud POST al backend
      const response = await axios.post(
        LOGIN_URL,
        {
          userIdentifier,
          password
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true // Si es necesario manejar cookies/sesiones
        }
      );

      // Depuración de respuesta
      console.log('Respuesta recibida:', response.data);  // TODO ELIMINAR 

      // Si la respuesta es exitosa, se almacena el token
      localStorage.setItem('token', response.data.accessToken); // TODO ELIMINAR 

      // Redirigir al usuario
      navigate('/LoginSuccess');
    } catch (error) {
      if (error.response) {
        console.log('Error Response:', error.response); // Log para facilitar depuración
        if (error.response.status === 401) {
          setErrMsg('Credenciales incorrectas. Inténtalo de nuevo.');
        } else {
          setErrMsg('Error al iniciar sesión. Inténtalo más tarde.');
        }
      } else {
        console.error('Error:', error);
        setErrMsg('Error desconocido. Inténtalo más tarde.');
      }
    }
  };

  return (
    <div className="singin__wrapper">
      <Navbar
        to="/login"
        tabIndex="1"
        label="Ir a la página de inicio de sesión"
        text="Iniciar Sesión"
      />
      <section className="section__wrapper">
        <form className="singin__form" onSubmit={handleLogin}>

          <div className="singin__label-wrapper">
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
                className={`singin__input ${validUserIdentifier ? 'valid' : ''} ${validUserIdentifier || !userIdentifier ? '' : 'invalid'}`}
              />
            </div>
          </div>

          <div className="singin__label-wrapper">
            <label
              htmlFor="password" className="singin__label">
              Contraseña:
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                required
                aria-invalid={!validPassword}
                aria-describedby="passwordnote"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                tabIndex="2"
                placeholder="******"
                className={`singin__input normal ${validPassword ? 'valid' : ''} ${validPassword || !password ? '' : 'invalid'}`}
              />
              <InputInstruction focus={!passwordFocus} refe={password} valid={validPassword}>
                8 a 20 caracteres.<br />
                Debe incluir letras mayúsculas y minúsculas, un número y un carácter especial.<br />
                Caracteres especiales permitidos: !, @, #, $, %.
              </InputInstruction>
            </div>
          </div>

          {errMsg && <p className="error">{errMsg}</p>}

        <div className='secction__center'>

          <div className="section__button">
            <ButtonLogin
              state={validInputs ? 'active' : 'disabled'}
              text="Iniciar Sesión"
              tabIndex={validInputs ? '3' : '-1'}
              disabled={!validInputs}
              type="submit"
            />
          </div>
          
          <Link to={'/recovery'} className="recovery-link" tabIndex="9" >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        </form>
      </section>
    </div>
  );
};
