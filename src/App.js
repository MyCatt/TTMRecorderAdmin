import { BrowserRouter, Routes, Route } from "react-router-dom";
import './style/app.css';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/PrivateRoute";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  return (
    <div className="app">
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                {/* Other routes */}
              </Routes>
            </AuthProvider>
          </BrowserRouter>
    </div>
  );
}

export default App;
