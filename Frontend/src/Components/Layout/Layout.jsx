import { Outlet } from "react-router-dom"
import './index.css'

export const Layout = () => {
  return (
    <main className="layout">
      <Outlet />
    </main>
  )
}

