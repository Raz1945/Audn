import "./AppLayout.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";

export const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
};
