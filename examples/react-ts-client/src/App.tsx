import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '@/pages/Home';
import Todo from '@/pages/Todo';
import NotFound from '@/pages/NotFound';
import theme from '@/theme';

export function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              React CRUD Client
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo/:id" element={<Todo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function WrappedApp() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </HashRouter>
  );
}
