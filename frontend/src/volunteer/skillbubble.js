import React from 'react';

const skillBubbleS = {
  display: 'inline-block',
  backgroundColor: 'lightgreen',
  color: 'white',
  padding: '5px 10px',
  margin: '5px',
  borderRadius: '20px',
};

const skillBubble = ({ skill }) => {
  return <span style={skillBubbleS} skill={skill}></span>;
};

export default skillBubble;