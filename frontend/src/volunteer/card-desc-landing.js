import { Desc } from "./card-desc"
import React, { useState, useEffect } from 'react';


export const PostLandingPage = () => {
  const [opportunities, setOpportunities] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      try {
        let response = await fetch(`http://localhost:4000/api/post/6520bb4eb0df050d98ad267c`);
        const jsonData = await response.json();
        setOpportunities(jsonData);
        console.log("here")
        console.log(jsonData);
      } catch (error) {
        console.error(error);
      }
    }
    getPosts();
  }, []);


  return (
    <>
      <div className="landing-post-desc">
        <h1>Job Posting</h1>
        <Desc
          title={opportunities.title}
          description={opportunities.description}
          skills={opportunities.skills}
          volunteersNeeded={opportunities.volunteersNeeded}
          postState={opportunities.postState}
        />
      </div>
    </>
  )
}