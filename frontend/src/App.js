
import { AdminConsole } from "./admin/AdminConsole";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { ViewPost } from "./components/ViewPost";
import { React, createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { VolLandingPage } from './volunteer/VolLandingPage';
import { Desc } from './volunteer/card-desc';
import { Card } from './admin/Card';
import { PostLandingPage } from './volunteer/card-desc-landing';
import { LandingPage } from './components/LandingPage'
import { HomeownersApplication } from './components/HomeownersApplication'
import { UserProfile } from './components/volunteers/UserProfile'
import { Logout } from "./components/Logout";

export const APIContext = createContext();
export const AuthContext = createContext(null);
// export const APIContext = createContext();

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <AuthContext.Provider value={{ token, user, setUser }}>
        <APIContext.Provider value={"http://localhost:4000"}>
          <BrowserRouter>
            <div className="pages">
              <Routes>
                <Route
                  path="/"
                  element={<LandingPage setToken={setToken} setUser={setUser} />}
                />
                <Route
                  path="/homeowners-application"
                  element={<HomeownersApplication />}
                />
                <Route
                  path="/login"
                  element={<Login setToken={setToken} setUser={setUser} />}
                />
                <Route
                  path="/signup"
                  element={<SignUp setToken={setToken} setUser={setUser} />}
                />
                <Route
                  path="/logout"
                  element={<Logout setToken={setToken} setUser={setUser} />}
                />
                {user &&
                  <>
                    {!user.isAdmin &&
                      <Route
                        path="/volunteer/:id"
                        element={<UserProfile />}
                      />}
                    {!user.isAdmin &&
                      <Route
                        path="/volunteer"
                        element={<VolLandingPage />}
                      />}
                    {user.isAdmin &&
                      <Route
                        path="/admin"
                        element={<AdminConsole />}
                      />
                    }
                  </>
                }
              </Routes>
            </div>
          </BrowserRouter>
        </APIContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;