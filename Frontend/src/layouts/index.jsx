import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

export default function MainLayout({ children }) {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>

      <Box
        component="main"
      >
        {children}
      </Box>

    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};
