import { Outlet } from "react-router-dom"
import { AppContainer } from "../other/AppContainer/AppContainer"
import { NavbarBottom } from "../other/NavBarBottom/NavBarBottom"

export const Dashboard = () => {

  return (
    <>
      <AppContainer>
        <NavbarBottom/>
        <Outlet/>
      </AppContainer>
    </>
  )
}
