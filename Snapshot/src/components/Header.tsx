import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
