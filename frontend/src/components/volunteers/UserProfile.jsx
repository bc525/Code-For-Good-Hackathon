import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Navbar";
import { AuthContext } from "../../App";

export function UserProfile() {
  const [userData, setUserData] = useState({});
  const { user } = useContext(AuthContext);
  const id = user?._id;

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
    "Landscaping",
  ];

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const json = await response.json();
        setUserData(json);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
        console.log("save entered")
      const response = await fetch(`http://localhost:4000/api/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Failed to update user data");
      const json = await response.json();
      console.log(json);
      setUserData(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-6">
      <NavBar currentPage="Home" />
      <h1 className="my-4 text-4xl text-rta.darkGreen font-bold tracking-tight text-center leading-none md:text-5xl lg:text-6xl uppercase">
        YOUR PROFILE
      </h1>
      <div className="mt-4">
        <input
          className="block w-full p-3 border rounded my-2"
          name="userName"
          value={userData.userName}
          onChange={handleInputChange}
          placeholder="User Name"
        />
        <input
          className="block w-full p-3 border rounded my-2"
          type="date"
          name="birthday"
          value={userData.birthday}
          onChange={handleInputChange}
          placeholder="Birthday"
        />
        <input
          className="block w-full p-3 border rounded my-2"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          className="block w-full p-3 border rounded my-2"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
        />
        <input
          className="block w-full p-3 border rounded my-2"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <input
          className="block w-full p-3 border rounded my-2"
          name="emergencyContact"
          value={userData.emergencyContact}
          onChange={handleInputChange}
          placeholder="Emergency Contact"
        />
        <input
          className="block w-full p-3 border rounded my-2"
          name="shirtSize"
          value={userData.shirtSize}
          onChange={handleInputChange}
          placeholder="Shirt Size"
        />
        <textarea
          className="block w-full p-3 border rounded my-2"
          name="personalInfo"
          value={userData.personalInfo}
          onChange={handleInputChange}
          placeholder="Personal Info"
        ></textarea>
        <select
          multiple
          value={userData.skills}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions).map(
              (option) => option.value
            );
            setUserData({ ...userData, skills: selectedOptions });
          }}
          className="block w-full p-3 border rounded my-2"
        >
          {skillOptions.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        <label className="block my-2">
          <input
            className="mr-2"
            type="checkbox"
            name="isAdmin"
            checked={userData.isAdmin}
            onChange={(e) =>
              setUserData({ ...userData, isAdmin: e.target.checked })
            }
          />
          Are you an Admin?
        </label>
        <label className="block my-2">
          <input
            className="mr-2"
            type="checkbox"
            name="isGroup"
            checked={userData.isGroup}
            onChange={(e) =>
              setUserData({ ...userData, isGroup: e.target.checked })
            }
          />
          Are you a Group?
        </label>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-5 py-2 rounded mt-3 hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
