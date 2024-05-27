


import {  ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

import { baseTheme } from "./assets/global/Theme-variable";


const Bookmarks = () => {
  const routing = useRoutes(Router);
  const theme = baseTheme;
  return (
    <ThemeProvider theme={theme}>
     
      {routing}
    </ThemeProvider>
  );
}
 
export default Bookmarks


