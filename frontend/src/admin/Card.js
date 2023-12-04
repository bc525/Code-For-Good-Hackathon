import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SkillBubble from './SkillBubble';
import { Button } from '@mui/material';
import { APIContext } from '../App';
import { EditPost } from './EditPost';

const cardStyles = {
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const titleStyles = {
  fontWeight: 'bold',
  fontSize: '1.2em',
  color: 'green',
};

const infoStyles = {
  margin: '5px 0',
  color: 'black',
};

const viewPostStyles = {
  color: 'rta.darkGreen',
  textDecoration: 'underline',
};

export const Card = ({ post, setRerender }) => {
  const { title, description, location, volunteersNeeded, skills } = post;
  const apilink = useContext(APIContext)
  const [editPost, setEditPost] = useState(false);

  const editClickHandler = () => {
    setEditPost(true);
  }

  const deletePost = async () => {
    await fetch(`${apilink}/api/post/${post._id}`, {
      method: "delete"
    })
    setRerender(rerender => !rerender);
  }

  return (
    <div style={cardStyles} className="card">
      <h3 style={titleStyles}>{title}</h3>
      <p style={infoStyles}>{description}</p>
      <p style={infoStyles}>Location: {location}</p>
      <p style={infoStyles}>Number of Volunteers: {volunteersNeeded}</p>
      <div>
        {skills.map((skill, index) => (
          <SkillBubble key={index} skill={skill} />
        ))}
      </div>
      {editPost ?
        <EditPost post={post} setEditPost={setEditPost} setRerender={setRerender}/> :
        <Button onClick={editClickHandler}>Edit Post</Button>
      }
      <Button onClick={deletePost} color="error"> Delete</Button>
      <Button color="success"> Notify</Button>
    </div>
  );
};
