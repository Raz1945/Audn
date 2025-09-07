import { NavLink } from "react-router-dom"

export const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <NavLink to="/dashboard/profile/cupidoMusical/pl">

        <div className="card-container">

        {/* <img src={} alt="ilustracion" className='card__img' /> */}

        <div className='card__texts'>
          <p className="card__title">Cupido Playlist</p>
        </div>
      </div>
      </NavLink>
    </>
  )
}
