import { Outlet } from "react-router-dom"
import './index.css'

export const AppLayout = () => {
  return (
    <main className="appLayout">
      <Outlet />
    </main>
  )
}

