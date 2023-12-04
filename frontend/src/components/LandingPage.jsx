import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function LandingPage({ setToken, setUser }) {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user"))
        if (token) {
            setToken(token)
        }
        if (user) {
            console.log(user)
            setUser(user)
            if (!user.isadmin) {
                nav(`/volunteer`);
            } else {
                nav('/admin')
            }
        }
    }, [])

    useEffect(() => {
        const getRandomUser = async () => {
          try {
            const response = await fetch("http://localhost:4000/api/user/");
            const users = await response.json();
    
            if (users && users.length > 0) {
              const randomUser = users[Math.floor(Math.random() * users.length)];
              setName(randomUser.userName);
              setBio(randomUser.personalInfo);
              setSkills(randomUser.skills);
            }
          } catch (error) {
            console.error("Failed to fetch users:", error);
          }
        };
    
        getRandomUser();
      }, []);

  return (
    <div className="container mx-auto text-xl text-text.black">
      <div className="flex flex-col lg:flex mx-8">
        <NavBar currentPage="Home" />
        <h1 class="my-4 text-4xl text-rta.darkGreen font-bold tracking-tight text-center leading-none md:text-5xl lg:text-6xl uppercase">
          MAKING A DIFFERENCE IN AURORA
        </h1>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex flex-col mt-14 text-center text-5xl lg:mt-28">
            <div className="space-y-5">
              <div className="lg:flex lg:flex-row justify-between space-x-0 lg:space-x-10 space-y-5 lg:space-y-0 mx-4">
                <div className="text-bold">
                  90
                  <div className="text-normal text-2xl">
                    Homes Rebuilt in 2022
                  </div>
                </div>
                <div className="text-bold">
                  ~250
                  <div className="text-normal text-2xl ">
                    Aurora Residents Helped in 2022
                  </div>
                </div>
                <div className="text-bold">
                  30
                  <div className="text-normal text-2xl">years</div>
                </div>
              </div>
              <button
                onClick={() =>
                  window.open(
                    "https://www.paypal.com/donate?hosted_button_id=NTF9LK8XJTCGG",
                    "_blank"
                  )
                }
                className="border-2 border-black rounded-full bg-rta.green text-2xl p-2"
              >
                Donate Now
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col justify-between mt-12 text-center text-5xl lg:mt-14">
            <div className="flex flex-col justify-center">
              <iframe
                className="inline-block aspect-video"
                src="https://www.youtube.com/embed/wbW6Kc5zYYg?si=WjIurf0_XV-VKLUf"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <h1 class="pt-10 my-4 text-4xl text-rta.darkGreen font-bold tracking-tight text-center leading-none md:text-5xl lg:text-6xl uppercase">
          VOLUNTEER OF THE MONTH
        </h1>

        <div className="container mx-auto mt-10 pb-40">
          <div className="flex bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex-none">
              <img
                src="https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg"
                alt="Profile"
                className="rounded-lg w-60"
              />
            </div>
            <div className="flex-1 ml-6">
              <div className="font-bold text-6xl mb-2">{name}</div>{" "}
              {/* Increased font size */}
              <p className="text-gray-700 text-4xl mb-4">{bio}</p>{" "}
              {/* Increased font size */}
              <div className="text-sm text-gray-600">
                <b>Skills: </b>
                {skills.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
