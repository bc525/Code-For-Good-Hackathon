import React, { useState, useEffect, useContext } from 'react';
import { VolCard } from "./VolCard";
import NavBar from '../components/Navbar';
import './cardstylevol.css';
import Button from '@mui/material/Button';
import { AuthContext } from '../App';

export const VolLandingPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filter, setFilter] = useState('All');
  const [rerender, setRerender] = useState(false);
  const {user} = useContext(AuthContext)
  const [numApplied, setNumApplied] = useState(0);


  useEffect(() => {
    const getPosts = async () => {
      try {
        let response = await fetch(`http://localhost:4000/api/post/`);
        const jsonData = await response.json();
        setOpportunities(jsonData);
        let count = 0;
        jsonData.filter(opp => {
          if (opp.volunteers.some((usr) => usr['id'] === user ? user._id : "dd")) count++;
        })
        setNumApplied(count)
      } catch (error) {
        console.error(error);
      }
    }
    getPosts();
  }, [rerender]);


  const filteredOpportunities = opportunities.filter(opp => {
    if (opp.postState === "DRAFT") return false;
    if (filter === 'All') return true;
    if (filter === 'Active' && opp.volunteers.some((usr) => usr['id'] === user ? user._id : "dd")) {
      return true
    };
    return false;
  });

  return (
    <>
    <div className="container-row container mx-auto px-4 pt-6">
      <NavBar currentPage="Dashboard" />
      <h1 className="my-4 text-4xl text-rta.darkGreen font-bold tracking-tight text-center leading-none md:text-5xl lg:text-6xl uppercase">
        HELLO {user?.userName}!
      </h1>
        <div className="filter-container">
          <Button onClick={() => setFilter('All')} className={filter === 'All' ? 'active-filter' : ''} color="success">All</Button>
          <Button onClick={() => setFilter('Active')} className={filter === 'Active' ? 'active-filter' : ''} color="success">Applied ({numApplied})</Button>
        </div>

        <div className="card-container">
          {filteredOpportunities.map((obj) => (
            <VolCard
              post={obj} setRerender={setRerender}
            />
          ))}
        </div>
      </div>
    </>
  )
}

