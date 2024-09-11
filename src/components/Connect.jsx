import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Connect = () => {
  return (
    <div className="faded-text pt-2">
      {/* faded-text = custom class */}
      <span>Connect on : </span>
      <div className="flex gap-4 pt-3">
        <a href="https://github.com/ARPIT73881">
          <FaGithub size={20} />
        </a>
        <a href="https://www.linkedin.com/in/arpit73881/">
          <FaLinkedin size={20} />
        </a>
        <a href="https://www.instagram.com/arpit73881/">
          <FaInstagram size={20} />
        </a>
        <a href="https://www.facebook.com/arpit73881/">
          <FaFacebook size={20} />
        </a>
      </div>
    </div>
  );
};

export default Connect;
