import { useMemo, useState } from 'react';
import { ButtonLogin } from '../ButtonLogin/ButtonLogin';
import { Navbar } from '../other/Navbar/Navbar';

import './index.css';

import { recoveryValidateUser } from '../../app/features/recoveryValidateUser';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const RECOVERY_URL = 'http://localhost:3000/recovery'; //TODO crear en el backend

export const Recovery = () => {
  const [userIdentifier, setUserIdentifier] = useState(''); // Puede recibir un user o un email
  const [userIdentifierFocus, setUserIdentifierFocus] = useState(false);
  const [validInputs, setValidInputs] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();

  useMemo(() => {
    const { validUserIdentifier } = recoveryValidateUser(userIdentifier);
    setValidInputs(validUserIdentifier);
    setErrMsg('');  // Limpiar el mensaje de error cuando el input es válido
  }, [userIdentifier]);

  const handleRecovery = async (e) => {
    e.preventDefault();

    console.log('Formulario enviado'); // TODO ELIMINAR

    if (!validInputs) {
      setErrMsg('Por favor, ingresa un nombre de usuario o un e-mail.');
      return;
    }
    try {
      console.log('Datos enviados', { userIdentifier });

      const response = await axios.post(
        RECOVERY_URL,
        {
          userIdentifier
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log('Respuesta recibida:', response.data);  // TODO ELIMINAR 

      // Guardar el email devuelto por el backend en localStorage
      const emailFromBackend = response.data.email; // Asegúrate de que el backend te envíe el email correctamente
      localStorage.setItem('email', emailFromBackend || userIdentifier);

      // Redirigir a la página de éxito
      navigate('/recoverySuccess');
    } catch (error) {
      setErrMsg('Hubo un problema con la solicitud de recuperación. Inténtalo nuevamente.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='recovery__wrapper'>
      <Navbar
        to={'/sing-in'}
        tabIndex={1}
        label="Ir a la página de inicio de sesión"
        text="Recuperar Cuenta"
      />
      <section className='section__wrapper'>
        <form className='recovery__form' onSubmit={handleRecovery}>
          <div className='recovery__label-wrapper'>
            <label htmlFor="userIdentifier" className='recovery__label'>
              Nombre de Usuario o E-mail:
            </label>
            <div className="relative">
              <input
                required
                value={userIdentifier}
                onChange={(e) => setUserIdentifier(e.target.value)}
                onFocus={() => setUserIdentifierFocus(true)}
                onBlur={() => setUserIdentifierFocus(false)}
                tabIndex="2"
                className={`recovery__input`}
              />
            </div>

            <p className='recovery__input_text'>
              Deberás poder ingresar al e-mail de la cuenta
              para poder recuperarla.
            </p>

            {errMsg && <p className="error">{errMsg}</p>}
          </div>

          <div className='recovery__button'>
            <ButtonLogin
              state={validInputs ? 'active' : 'disabled'}
              text="Continuar"
              tabIndex={validInputs ? '3' : '-1'}
              disabled={!validInputs}
              type='submit'
            />
          </div>
        </form>
      </section>
    </div>
  );
};
