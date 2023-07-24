import React from "react";
import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { API } from "../../../service/api";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({ category: category || "" });
      setPosts(response.data);
    };
    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item key={post.id} lg={4} md={6} xs={12}>
              <Link to = {`details/${post._id}`} style = {{textDecoration:'none', color:'inherit'}}>
				<Post post={post} />
			  </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
          No data is available for the selected category.
        </Box>
      )}
    </>
  );
};

export default Posts;
