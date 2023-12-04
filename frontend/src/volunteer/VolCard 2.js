import Button from '@mui/material/Button';

export const Card = ({ generalAddress, skills, volunteersNeeded }) => {

  return (
    <div className="card">
      <p>{generalAddress}</p>
      <p>{skills}</p>
      <p>{volunteersNeeded}</p>
      <Button className="button-card" color="success">
        Click me
      </Button>
    </div>
  );
}

