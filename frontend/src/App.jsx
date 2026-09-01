// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Account from "./pages/Account.jsx";

function App() {
  // Check localStorage for an existing token on app load
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  return (
    <Routes>
      {/* If not authenticated, redirect from / to /account */}
      <Route 
        path="/" 
        element={isAuthenticated ? <HomePage /> : <Navigate to="/account" />} 
      />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;