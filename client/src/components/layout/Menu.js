import React from "react";
import { slide as Menu  } from "react-burger-menu";

export default props => {
  return (
    <Menu {...props}>
      <a className="menu-item" href="/dashboard">
        Home
      </a>

      <a className="menu-item" href="/map">
        Live Map
      </a>

      <a className="menu-item" href="/services">
        Logout
      </a>

    </Menu>
  );
};