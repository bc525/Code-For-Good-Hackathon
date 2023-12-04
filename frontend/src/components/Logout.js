import { useEffect } from "react"
import { LandingPage } from "./LandingPage";
import { useNavigate } from "react-router";

export const Logout = ({ setToken, setUser }) => {
  const nav = useNavigate();
  useEffect(() => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  }, [])

  const goHome = () => {
    nav('/')
  }

  return (
    <>
      <div>You have been successfully logged out!</div>
      <button onClick={goHome}>Go Home</button>
    </>
  )
}