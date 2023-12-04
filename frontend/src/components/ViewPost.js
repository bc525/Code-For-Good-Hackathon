import { useEffect, useState, useContext } from "react";
import { APIContext, AuthContext } from "../App";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';

export const ViewPost = () => {
  const { id } = useParams();
  const apilink = useContext(APIContext);
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({});

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apilink}/api/post/add`, {
        method: 'patch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, user })
      })
      const json = await res.json();
      if (json) {
        console.log(json)
      }
      return json.message;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`${apilink}/api/post/${id}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      })
      const json = await res.json();
      setPost(json);
    }

    getPost().catch(console.error);
  }, [id])

  return (
    <>
      {post &&
        <div>
          <div>{post.title}</div>
          <div>{post.location}</div>
          {post.skills && post.skills.map(element => {
            return <div>{element}</div>
          })}
          <div>{post.biography}</div>
          <div>{post.description}</div>
          {post.volunteers && post.volunteers.map(element => {
            return <div>{element.name}</div>
          })}
          <div>{post.volunteersNeeded}</div>
        </div>
      }
      <Button onClick={handleApply}>Apply</Button>
    </>

  )
}