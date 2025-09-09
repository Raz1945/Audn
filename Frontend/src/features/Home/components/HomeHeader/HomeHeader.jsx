import { Bell } from '@assets/icons/Bell.jsx';
import { History } from '@assets/icons/History.jsx';
import './styles.css'

export const HomeHeader = () => {

  return (
    <div className='header-container'>
      <h1 className='header__title'>Música ya</h1>
      <div className='header__btn'>
        <History />
        <Bell />
      </div>
    </div>
  );
}
