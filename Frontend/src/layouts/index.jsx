import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
// import { usePathname } from '../routes/hooks/use-pathname';

// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  // const pathname = usePathname()

  // const homePage = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      {/* <Header /> */}

      <Box
        component="main"
        
      >
        {children}
      </Box>

      {/* <Footer /> */}
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};
