import { ButtonStandard } from '../ButtonStandard/ButtonStandard';
import { AppleIcon } from '../icons/AppleIcon';
import { GoogleIcon } from '../icons/GoogleIcon';

import './index.css';

export const Login = () => {

  return (
    <>
      <div className="bg">

        <div className="login__logo" tabIndex="-1"> 
          <picture className='login__picture'>
            <img src="./logo-large.png" alt="logo audn" />
          </picture>
          <p className='login__title'>Musica a pedida.</p>
        </div>
        <div className="btn-layout">
          <div className='btn-wrapper'>
            <ButtonStandard
              text="Registrarse gratis"
              hierarchy='primary'
              to={'/register'}
              tabindex='1'
            />
            <ButtonStandard
              text="Continuar con Google"
              icon_left={<GoogleIcon />}
              hierarchy='cuaternary'
              to="/google-login"
              tabindex='2'
            />
            <ButtonStandard
              text="Continuar con Apple"
              icon_left={<AppleIcon />}
              hierarchy='cuaternary'
              to="/apple-login"
              tabindex='3'
            />
          </div>
          <ButtonStandard
            text="Iniciar Sesión"
            hierarchy='none'
            to="/sing-in"
            tabindex='4'
          />
        </div>

    </div >
    </>
  );
};
