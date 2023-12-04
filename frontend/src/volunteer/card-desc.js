import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const Desc = ({ title, description, skills, volunteersNeeded, postState }) => {

  return (
    <div className="description-page">
      <p>{title}</p>
      <p>{description}</p>
      <p>{skills}</p>
      <p>{volunteersNeeded}</p>
      <p>{postState}</p>
      <Link to="./card-desc-landing">
        <Button color="success">
          Apply!
        </Button>
      </Link>
    </div>
  );
}