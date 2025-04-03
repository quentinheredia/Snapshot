import React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

const SnapForm: React.FC = () => {
  return (
      <div style={{ padding: '1rem' }}>
          <h2>Welcome to the step ladder!</h2>
          <p>This is your home page. Start building your app here.</p>
      </div>
  );
};

export default SnapForm;