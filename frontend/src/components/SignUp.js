import { useState, useContext } from "react";
import { APIContext } from "../App";
import "../stylesheets/navbar.css"
import NavBar from './Navbar'
import { useNavigate } from "react-router-dom";

export const SignUp = ({ setToken, setUser }) => {
  const nav = useNavigate();
  const apilink = useContext(APIContext);
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [shirtSize, setShirtSize] = useState("");
  const [personalInfo, setPersonalInfo] = useState("");
  const [skills, setSkills] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGroup, setIsGroup] = useState(false);

  const skillOptions = [
    "General Volunteer",
    "Carpentry",
    "Window Replacement",
    "Drywall/Plaster work",
    "Flooring",
    "Painting",
    "HVAC",
    "Plumbing",
    "Electrical",
    "Landscaping"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:4000/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          birthday,
          email,
          phoneNumber,
          password,
          emergencyContact,
          shirtSize,
          personalInfo,
          skills,
          isAdmin,
          isGroup,
        }),
      });

      console.log(JSON.stringify({
        userName,
        birthday,
        email,
        phoneNumber,
        password,
        emergencyContact,
        shirtSize,
        personalInfo,
        skills,
        isAdmin,
        isGroup,
      }))

      const json = await res.json();

      if (json.token) {
        localStorage.setItem("token", json.token);
        localStorage.setItem("user", JSON.stringify(json.user));

        // Use json.user to navigate to appropriate route based on isAdmin property
        if (json.user.isAdmin) {
          // Navigate to the admin dashboard
          nav("/admin");
        } else {
          // Navigate to the volunteer dashboard
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
    <div>
      <NavBar currentPage="Signup" />
      <h2 class="font-bold text-rta.darkGreen text-3xl uppercase">Change a homeowner's life with Rebuilding Together Aurora!</h2>
      <div className="mx-auto container text-xl">
        <div className="flex flex-col lg:flex mx-8">
          <form onSubmit={handleSubmit}>
            <div>
              <div>Name:</div>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Name"
                className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg outline-rta.darkGreen"
              />
            </div>
            <div className="signupItem">
              <div>Birthday:</div>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="Birthday (MM/DD/YYYY)"
                className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg outline-rta.darkGreen"
              />
            </div>
            <div className="signupItem">
              <div>Email:</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg outline-rta.darkGreen"
              />
            </div>
            <div className="signupItem">
              <div>Phone Number:</div>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg outline-rta.darkGreen"
              />
            </div>
            <div className="signupItem">
              <div>Password:</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg outline-rta.darkGreen"
              />
            </div>
            <div className="signupItem">
              <div>Emergency Contact:</div>
              <input
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="Emergency Contact"
                className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg outline-rta.darkGreen"
              />
            </div>
            <div className="signupItem">
              <div>Shirt Size:</div>
              <input
                value={shirtSize}
                onChange={(e) => setShirtSize(e.target.value)}
                placeholder="Shirt Size"
                className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg outline-rta.darkGreen"
              />
            </div>
            <div className="signupItem">
              <div>Personal Information:</div>
              <textarea
                value={personalInfo}
                onChange={(e) => setPersonalInfo(e.target.value)}
                placeholder="Personal Information"
                className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg outline-rta.darkGreen"
              ></textarea>
            </div>
            <div>
              <div>Skills:</div>
              <select
                multiple
                value={skills}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions).map(
                    (option) => option.value
                  );
                  setSkills(selectedOptions);
                }}
                className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg outline-rta.darkGreen"

              >
                {skillOptions.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <div className="signupItem"><input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />{" "}
              Sign up as Admin</div>
            <div className="signupItem"><input
              type="checkbox"
              checked={isGroup}
              onChange={(e) => setIsGroup(e.target.checked)}
            />{" "}
              Sign up as a Group</div>
            <div className="signupItem"><button className="border bg-rta.darkGreen text-white rounded-lg p-2 w-full" type="submit">Sign Up</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};
