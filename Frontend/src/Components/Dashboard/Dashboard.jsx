import { Outlet } from "react-router-dom"
import { AppContainer } from "../other/AppContainer/AppContainer"
import { NavbarBottom } from "../other/NavBarBottom/NavBarBottom"

export const Dashboard = () => {

  // todo Añadir el requerimiento de estar logueado 
  // const jwtToken = localStorage.getItem('jwtToken');
  // (jwtToken == null) ? (window.location.href = '/login') : console.log("verificó el token")
  return (
    <>
      <AppContainer>
        <NavbarBottom/>
        <Outlet/>
      </AppContainer>
    </>
  )
}
