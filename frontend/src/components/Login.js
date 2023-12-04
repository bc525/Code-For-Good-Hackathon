import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../App";
import NavBar from './Navbar'

export const Login = ({ setToken, setUser }) => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apilink = useContext(APIContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apilink}/api/user/login`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const json = await res.json();
      if (json.token) {
        localStorage.setItem("token", json.token);
        localStorage.setItem("user", JSON.stringify(json.user));
        if (json.user.isAdmin) {
          nav("/admin");
        } else {
          nav(`/volunteer`);
        }
        setToken(json.token);
        setUser(json.user);
      }
      return json.message;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto text-xl text-fg.default">
        <NavBar currentPage="Login" />
        <div className="text-center mt-14 lg:mt-28 space-y-5">
            <h1 className="text-4xl text-rta.darkGreen font-bold tracking-tight leading-none md:text-5xl lg:text-6xl uppercase">
                YOUR HELP IS APPRECIATED!
            </h1>
            <h1 className="text-2xl text-rta.darkGreen tracking-tight leading-none md:text-xl lg:text-2xl">
                We are grateful to have you as part of the team of leaders helping to repair, restore, and revitalize Aurora's second ward!
            </h1>
        </div>
        <div className="flex flex-col justify-center mt-12 text-left text-xl lg:mt-14 mx-auto w-full lg:w-1/2  pb-40">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-3xl uppercase text-rta.darkGreen text-center">Login</div>
                <div>Email:</div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg outline-rta.darkGreen"
                />
                <div>Password:</div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg outline-rta.darkGreen"
                />
                <button type="submit" className="border-2 border-black rounded-full bg-rta.green text-2xl py-2 px-4 block mx-auto mt-4">
                    Login
                </button>
            </form>
        </div>
    </div>
);
  };
