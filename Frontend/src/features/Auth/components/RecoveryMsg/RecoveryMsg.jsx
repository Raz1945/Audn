import { ButtonLink } from '../../../../components/ui/Buttons/ButtonLink/ButtonLink';
import { PaperPlane } from '../../../../assets/icons/PaperPlane';
import './index.css';

export const RecoveryMsg = () => {
  // Obtener la dirección de e-mail del localStorage
  const mail = localStorage.getItem('email');

  return (
    <>
      <div className='recoveryMsg__wrapper'>
        <p className='recoveryMsg__text'>
          Te enviamos un mensaje a <span className='highlight'>{mail}</span> con un link verificador.
        </p>

        <PaperPlane />

        <p className='recoveryMsg__text'>
          Para recuperar tu cuenta, debes ingresar al mismo y luego seguir las instrucciones.
        </p>

        <ButtonLink
          to={'/login'}
          type='button'
          text='Entendido'
          hierarchy='sextenary'
        />
      </div>
    </>
  );
};
