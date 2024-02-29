import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black w-full text-white relative shadow-sm">
      <div className="flex flex-col md:flex-row justify-center items-center h-auto md:h-16 p-4 md:p-0">
        <div className="mb-4 md:mb-0">
          <h4 className="text-sm text-gray-600">
            Hecho con ❤️ por
            <a
              href="https://cl.linkedin.com/in/diego-bustos-kehdy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {" "}
              diegobustosk
            </a>
          </h4>
        </div>

        <div className="pl-0 md:pl-16">
          <Link className="p-2" to="/about-us">
            About Us
          </Link>
          {/* <Link className="p-2" to="/contact">
            Contact
          </Link> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
