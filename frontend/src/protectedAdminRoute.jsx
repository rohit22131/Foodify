import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      user = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdminRoute;