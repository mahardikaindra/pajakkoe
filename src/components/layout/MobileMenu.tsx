// src/components/layout/MobileMenu.tsx
import React, { useState } from "react";

interface MobileMenuProps {
  menuItems: string[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleMenu} style={styles.menuButton}>
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>
      {isOpen && (
        <ul style={styles.menuList}>
          {menuItems.map((item, index) => (
            <li key={index} style={styles.menuItem}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  menuButton: {
    backgroundColor: "#282c34",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  menuList: {
    listStyleType: "none" as const,
    padding: 0,
    marginTop: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
  },
  menuItem: {
    padding: "10px 20px",
    borderBottom: "1px solid #ccc",
  },
};

export default MobileMenu;
