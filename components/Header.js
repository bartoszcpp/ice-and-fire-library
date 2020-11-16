import Link from "next/link";
import React, { useState } from "react";

const Header = (props) => {
  const [refresh, setRefresh] = useState(props);
  return (
    <div className="header">
      <div className="logo-container row">
        <div className="col-6">
          <h1 className="m-auto w-ft">Ice</h1>
        </div>

        <div className="col-6">
          <h1 className="m-auto w-ft">Fire</h1>
        </div>
      </div>
      <div className="w-100">
        <Link onClick={() => setRefresh(true)} href="/">
          <img className="img-fluid m-auto" src="/logo.png"></img>
        </Link>
      </div>
    </div>
  );
};

export default Header;
