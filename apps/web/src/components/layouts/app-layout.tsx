import { Navigate, Outlet } from "react-router";
import { Box, Container } from "@mui/material";
import { useAppSelector } from "@/store/hooks";

export default function AppLayout() {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
}