import { Link } from "react-router-dom"
import './index.css'
export const Welcome = () => {
  return (
    <div>
      <h1>
        Welcome!
      </h1>
      <Link to="/login">Login</Link>
    </div>
  )
}
