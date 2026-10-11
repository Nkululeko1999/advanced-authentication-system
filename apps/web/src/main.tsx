import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from "@advanced-auth/theme";
import './index.css'
import { RouterProvider } from 'react-router';
import { router } from './router/index.tsx';
import { Provider } from 'react-redux';
import store from './store/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      
    </ThemeProvider>
  </StrictMode>,
)
