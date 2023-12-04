import { useContext, useState } from "react"
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from "@mui/material/Dialog";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { Button } from "@mui/material";
import { APIContext } from "../App";
import { Outlet } from "react-router";
export const EditPost = ({ post, setEditPost, setRerender }) => {

  console.log(post)
  const [formData, setFormData] = useState(post ? post : {
    skills: [],
  });
  console.log(formData)

  const apilink = useContext(APIContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id ? e.target.id : e.target.name]: e.target.value
    })
  }

  const submitEdits = async (e) => {
    e.preventDefault();
    const meth = post ? "put" : "post"
    console.log(meth)
    try {
      const res = await fetch(`${apilink}/api/post/${post ? post._id : "createPost"}`, {
        method: meth,
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setEditPost(false)
      setRerender(rerender => !rerender)  
    } catch (err) { }

  }

  const close = () => {
    setEditPost(false);
  }

  return (
    <>
      <Dialog
        open={true}>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="string"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formData.title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="string"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formData.location}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="string"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formData.description}
          />
          <TextField
            autoFocus
            margin="dense"
            id="biography"
            label="Biography"
            type="string"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formData.biography}
          />
          <TextField
            autoFocus
            margin="dense"
            id="volunteersNeeded"
            label="# of Voluneteers"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formData.volunteersNeeded}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="postState"
              onChange={handleChange}
              label="Post Status"
              value={formData.postState}
              name="postState"
            >
              <MenuItem value={"DRAFT"}>Draft</MenuItem>
              <MenuItem value={"ACTIVE"}>Active</MenuItem>
              <MenuItem value={"DONE"}>Done</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Skills</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              multiple
              value={formData.skills}
              name="skills"
              label="Skills"
              onChange={handleChange}
            >
              <MenuItem value={"General Volunteer"}>General Volunteer</MenuItem>
              <MenuItem value={"Carpentry"}>Carpentry</MenuItem>
              <MenuItem value={"Window Replacement"}>Window Replacement</MenuItem>
              <MenuItem value={"Drywall/ Plaster work"}>Drywall/ Plaster work</MenuItem>
              <MenuItem value={"Flooring"}>Flooring</MenuItem>
              <MenuItem value={"Painting"}>Painting</MenuItem>
              <MenuItem value={"HVAC"}>HVAC</MenuItem>
              <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
              <MenuItem value={"Electrical"}>Electrical</MenuItem>
              <MenuItem value={"Landscaping"}>Landscaping</MenuItem>
            </Select>
          </FormControl>
          <div>
            <Button variant="text" onClick={submitEdits}>Submit Changes</Button>
            <Button variant="text" onClick={close}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Outlet>  </Outlet>
    </>

  )

}