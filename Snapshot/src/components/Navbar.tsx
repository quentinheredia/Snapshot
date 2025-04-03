import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useColorScheme } from '@mui/joy/styles';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Button, Box, Link } from '@mui/joy';

const navbarButtonStyles = {
  px: 2,
  py: 1,
  textDecoration: 'none',
  color: 'primary.softActiveColor',
  transition: 'background-color 0.3s, border-color 0.3s',
  '&:hover': {
    backgroundColor: 'primary.softActiveColor',
    color: 'primary.softDisabledBg',
  },
};

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="soft">Change mode</Button>;
  }

  return (
    <Select
      variant="soft"
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
      }}
      sx={{ width: 'max-content' }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}

const Navbar: React.FC = () => {
  const [show, setShow] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShow(currentScrollPos < prevScrollPos || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <Box
      component="nav"
      sx={{
        p: 2,
        // Use theme tokens instead of hard-coded gradient colors
        backgroundColor: 'background.surface',
        boxShadow: 'sm',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid',
        borderColor: 'neutral.outlinedBorder',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'transform 0.3s ease',
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button component={RouterLink} to="/pages/home" variant="plain" sx={navbarButtonStyles}>
          Home
        </Button>
        <Button component={RouterLink} to="/pages/SnapshotLive" variant="plain" sx={navbarButtonStyles}>
          Financial Snapshot
        </Button>
        <Button component={RouterLink} to="/pages/Ladder" variant="plain" sx={navbarButtonStyles}>
          Step Ladder
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button component={RouterLink} to="/pages/login" variant="plain" sx={navbarButtonStyles}>
          Login
        </Button>
        <ModeToggle />
      </Box>
    </Box>
  );
};

export default Navbar;
