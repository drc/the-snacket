import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

const routes = [
  {
    to: "/",
    text: "Home",
  }
];

const Navigation = () => {
  return (
    <nav className={style.navbar}>
      {routes.map((r,idx) => (
        <NavLink key={idx} to={r.to} className={style.link} activeClassName={style.active} exact>
          {r.text}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
