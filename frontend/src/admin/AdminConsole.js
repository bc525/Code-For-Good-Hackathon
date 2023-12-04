import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { DropDown } from './DropDown';
import { Card } from './Card';
import './cardstyle.css';
import { Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import { EditPost } from './EditPost';

export const AdminConsole = () => {
  const [posts, setPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState([])
  const [editPost, setEditPost] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [option, setOption] = useState("ACTIVE");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/post/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPosts(data);
        setPostsToShow(data.filter((post) => {
          console.log(post)
          console.log(option)
          return post.postState === option;
        })) 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getPosts();

  }, [rerender]);

    const editClickHandler = () => {
        setEditPost(true);
    }

  useEffect(() => {
    setPostsToShow(posts.filter((post) => {
      console.log(post)
      console.log(option)
      return post.postState === option;
    }))
  }, [option])

  return (
    <div>
      <NavBar />
      <h1 class="my-4 text-4xl text-rta.darkGreen font-bold tracking-tight text-center leading-none md:text-5xl lg:text-6xl uppercase">
          WELCOME ADMIN!
        </h1>
      <DropDown setOption={setOption} />
      <div className="card-container pl-20 pr-20">
        {postsToShow.map((element) => (
          <Card key={element.id} post={element} setRerender={setRerender} />
        ))}
      </div>
      {editPost ?
        <EditPost setEditPost={setEditPost} setRerender={setRerender} /> :
        <Button onClick={editClickHandler}>Add New Post</Button>
      }
      <Outlet />
    </div>
  );
};
