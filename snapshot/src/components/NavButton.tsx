import React, { useState } from "react";
import { Button as RBButton } from "react-bootstrap";

interface NavButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const btnStyle = {
    backgroundColor: isHovered ? "#f0f0f0" : "#FFFFFF",
    color: isHovered ? "#333" : "black",
    border: "1px solid black",
    borderRadius: "10px",
    padding: "12px 36px",
    margin: "10px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  return (
    <RBButton
      style={btnStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </RBButton>
  );
};

export default NavButton;
