

import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SkillBubble from '../admin/SkillBubble';
import { APIContext, AuthContext } from '../App';

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

export const VolCard = ({ post, setRerender }) => {
  const { title, description, location, volunteers, skills, biography, volunteersNeeded, postState } = post;
  const apilink = useContext(APIContext);
  const { user } = useContext(AuthContext);

  const [openDialog, setOpenDialog] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apilink}/api/post/add`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post._id, volunteerId: user._id }),
      });
      const json = await res.json();
      if (json) {
        console.log(json);
      }
      setRerender((rerender) => !rerender);
      return json.message;
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewMore = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  console.log(post.volunteers);

  return (
    <>
      <div style={cardStyles} className="card">
        <h3 style={titleStyles}>{title}</h3>
        <p style={infoStyles}>{description}</p>
        <p style={infoStyles}>Location: {location}</p>
        <p style={infoStyles}>Number of Volunteers: {volunteers.length}</p>
        <div>
          {skills.map((skill, index) => (
            <SkillBubble key={index} skill={skill} />
          ))}
        </div>
        {post.volunteers.some((usr) => usr['id'] === user ? user._id : "dd") ? (
          <Button color="error">Withdraw</Button>
        ) : (
          <Button onClick={handleApply}>Apply</Button>
        )}
        <Button onClick={handleViewMore}>View More</Button>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="view-more-dialog-title"
        aria-describedby="view-more-dialog-description"
      >
        <DialogTitle id="view-more-dialog-title">View More Details</DialogTitle>
        <DialogContent>
          <DialogContentText id="view-more-dialog-description">
            <p><u><strong>Title:</strong></u> {title}</p>
            <p><u><strong>Biography:</strong></u> {biography}</p>
            <p><u><strong>Description:</strong></u> {description}</p>
            <p><u><strong>Volunteers Needed:</strong></u> {volunteersNeeded}</p>
            <p><u><strong>Volunteers:</strong></u> {volunteers.join(', ')}</p>
            <p><u><strong>Post State:</strong></u> {postState}</p>
            <p><u><strong>Skills:</strong></u> {skills.join(', ')}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
