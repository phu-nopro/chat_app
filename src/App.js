
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './Style.scss';
import { useContext } from "react";
import { AuthContext } from './context/AuthContext';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
