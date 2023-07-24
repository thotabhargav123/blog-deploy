import React from "react";
import { styled, Box, Typography, Button } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
    border: "1px solid #d3cede",
    borderRadius: "10px",
    margin: "10px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between", // To add space at the bottom
    transition: "box-shadow 0.3s ease",
    "&:hover": {
        boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
    },

}));

const Image = styled("img")(({ theme }) => ({
    width: "100%",
    objectFit: "cover",
    borderRadius: "10px 10px 0 0",
    height: 150,
    transition: "transform 0.3s ease", // For image zoom effect
    "&:hover": {
        transform: "scale(1.05)", // Zoom in effect on hover
    },
}));

const Heading = styled(Typography)(({ theme }) => ({
    fontSize: 18,
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
    textDecoration: "none",
    position: "relative",
    backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    // eslint-disable-next-line no-dupe-keys
    color: "transparent",
    "-webkit-background-clip": "text",
    textShadow: `1px 1px 2px ${theme.palette.primary.dark}`,
}));

const CategoryButton = styled(Button)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: "#fff",
    textTransform: "capitalize",
    padding: theme.spacing(0.5, 2),
    marginBottom: theme.spacing(1),
    "&:hover": {
        background: theme.palette.primary.dark,
    },
}));

const Details = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    wordBreak: "break-word",
    textAlign: "center",
    color: theme.palette.text.secondary,
}));


const Texts = styled(Typography)(({ theme }) => ({
    fontSize: 12,
    marginBottom: theme.spacing(0.5),
    textTransform: "uppercase",
}));



const DateTimeContainer = styled("div")(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    // position: "absolute",
    bottom: theme.spacing(1),
  }));
  
  const DateTimeText = styled("div")(({ theme }) => ({
    fontSize: 10,
    color: "#888", // Grey color
  }));
  
  const Post = ({ post }) => {
    const date = new Date(post.createdDate);
  
    // Format the date as "dd/mm/yyyy"
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const url =
      post.picture ||
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";
  
    const addEllipsis = (str, limit) => {
      return str.length > limit ? str.substring(0, limit) + "..." : str;
    };
  
    return (
      <Container>
        <Image src={url} alt="post" />
  
        <Heading>{addEllipsis(post.title, 20)}</Heading>
        <Texts>Author: {post.username}</Texts>
        <Details>{addEllipsis(post.description, 100)}</Details>
        <CategoryButton variant="contained">{post.categories}</CategoryButton>
        <DateTimeContainer>
          <DateTimeText style={{ width: "50%" }}>{formattedDate}</DateTimeText>
          <DateTimeText style={{ width: "50%", textAlign: "right" }}>{formattedTime}</DateTimeText>
        </DateTimeContainer>
      </Container>
    );
  };
  
  export default Post;