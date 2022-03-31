import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../pages/login";
import { SigninPage } from "../pages/signin";

const NotAuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" replace/>} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signin" element={<SigninPage />} />
    </Routes>
  );
}

export default NotAuthenticatedRoutes;
