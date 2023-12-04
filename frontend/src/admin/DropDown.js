import React, { useState } from 'react';
import { Button } from '@mui/material';

export const DropDown = ({ setOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const Posts = () => {
    setIsOpen(!isOpen);
  };

  const clickHandler = (e) => {
    console.log(e.target.id)
    setOption(e.target.id)
  }

  return (
    <>
      <div className="dropdown">
        <div className="dropdown-content">
          <Button id="ACTIVE" onClick={clickHandler}>Active</Button>
          <Button id="DONE" onClick={clickHandler}>Archive</Button>
          <Button id="DRAFT" onClick={clickHandler}>Drafts</Button>
        </div>
      </div>
    </>
  );
};
