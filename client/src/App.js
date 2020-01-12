import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { userRouters } from "./routes";
import { useAuth } from "./hooks/auth.hoock";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import "materialize-css";

const App = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const route = userRouters(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{route}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
