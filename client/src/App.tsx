import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { BooksPage } from "./pages/BooksPage";
import { LoginPage } from "./pages/LoginPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import "./index.css";

function App() {
  const { authenticated } = useAuth();

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  console.log("Authenticated:", authenticated);

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <BooksPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={<Navigate to={authenticated ? "/books" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
