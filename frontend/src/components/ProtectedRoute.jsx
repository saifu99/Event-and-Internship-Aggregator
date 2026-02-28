import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  //CHECK IF TOKEN EXISTS IN LOCALSTORAGE
  const token = localStorage.getItem("token");

  if (!token) {
    //IF NO TOKEN, REDIRECT TO LOGIN
    return <Navigate to="/login" replace />;
  }

  //Token exists, allow access
  return children;
}
