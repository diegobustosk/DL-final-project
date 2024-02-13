import React, { Children, useEffect, useState } from "react";
import Navbar from "./Navbar";
import BurguerMenu from "./BurguerMenu";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-zinc-50 text-black h-screen">
      <Navbar toggleOpen={toggleOpen} />
      {isOpen && <BurguerMenu toggleOpen={toggleOpen} />}
      {children}
    </div>
  );
}

export default Layout;
