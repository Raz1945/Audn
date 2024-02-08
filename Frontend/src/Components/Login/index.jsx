import { ButtonStandar } from '../btn-standar/ButtonStandar'
import DefaultIcon from './DefaultIcon'
import './index.css'

export const Login = () => {



  return (
    <>
      <div className="layout">
        <picture>
          <img src="./logo-large.png" alt="logo audn" />
        </picture>
        <p>Musica a pedida.</p>
        <div className="btn-layout">
          <div className='btn-container'>

            <ButtonStandar text="Registrarse Gratis"
              icon_left={<DefaultIcon/>}
              icon_right={<DefaultIcon/>}
            />
            {/* <ButtonStandar text="Continuar con Google" /> */}
            {/* <ButtonStandar text="Continuar con Apple" /> */}
            <ButtonStandar />
          </div>
          <ButtonStandar text="Iniciar Sesión" />
        </div>
      </div>
    </>
  )
}

