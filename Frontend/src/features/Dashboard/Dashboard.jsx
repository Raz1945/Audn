import { Outlet } from "react-router-dom"
import { AppContainer } from "../../components/layout/AppContainer/AppContainer"
import { Sidebar } from "../../components/layout/Sidebar/Sidebar"

export const Dashboard = () => {

  return (
    <>
      <AppContainer>
        <Sidebar />
        <Outlet />
      </AppContainer>
    </>
  )
}
