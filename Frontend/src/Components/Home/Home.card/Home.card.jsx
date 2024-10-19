import './styles.css'
import { NavLink } from 'react-router-dom';

const HomeCard = ({ to, img, title, subTitle }) => {

  return (
    <NavLink to={to}>
      <div className="card-container">

        <img src={img} alt="ilustracion" className='card__img' />

        <div className='card__texts'>
          <p className="card__title">{title}</p>
          <p className="card__p">{subTitle}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default HomeCard;
