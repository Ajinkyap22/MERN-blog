import Preview from "./Preview";
import axios from "axios";
import { useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios.get("https://localhost:3000/api/posts").then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  };
}

export default Home;
