import { Bell } from '../../icons/Bell.jsx';
import { History } from '../../icons/history.jsx';
import '../Home.header/styles.css'

const HomeHeader = () => {
//todo Se podria corregir el guncionamiento de 'history' 
//todo  y de 'bell' (notificaciones)

  return (
    <div className='header-container'>
      <h1 className='header__title'>Música ya</h1>
      <div className='header__btn'>
        <History/>
        <Bell/>
      </div>
    </div>
  );
}

export default HomeHeader;
