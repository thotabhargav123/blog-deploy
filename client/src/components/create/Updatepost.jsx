import React, { useState, useEffect } from "react"

import {
    styled,
    Box,
    Button,
    TextareaAutosize,
    InputBase,
    FormControl,
} from "@mui/material"
import { AddCircle as Add } from "@mui/icons-material"
import { useNavigate, useParams } from "react-router-dom"

import { API } from "../../service/api"

const Container = styled(Box)(({ theme }) => ({
    margin: "50px 100px",
    [theme.breakpoints.down("md")]: {
        margin: 0,
    },
}))

const Image = styled("img")({
    width: "100%",
    height: "50vh",
    objectFit: "cover",
})

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20px",
    "& label": {
        marginRight: "20px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        backgroundColor: "#f0f0f0",
        borderRadius: "50%",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
        "&:hover": {
            backgroundColor: "#e0e0e0",
        },
        "& svg": {
            fontSize: "24px",
            color: "#616161",
        },
    },
    [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "flex-start",
        "& label": {
            marginBottom: "10px",
        },
    },
}))

const InputTextField = styled(InputBase)(({ theme }) => ({
    flex: 1,
    margin: "0 30px",
    fontSize: "25px",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "4px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
    "&:hover, &:focus": {
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
    [theme.breakpoints.down("xs")]: {
        margin: "0",
        width: "100%",
    },
}))

const Textarea = styled(TextareaAutosize)(({ theme }) => ({
    width: "100%",
    border: "none",
    marginTop: "20px",
    fontSize: "18px",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "4px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
    "&:hover, &:focus": {
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
    "&:focus-visible": {
        outline: "none",
    },
}))

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date(),
}

const Update = () => {
    const navigate = useNavigate()
    // const [hovered, setHovered] = useState(false)

    const [post, setPost] = useState(initialPost)
    const [file, setFile] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [imageURL, setImageURL] = useState('');
    const { id } = useParams();
    // console.log("The id is ", id);

    const url =
        post.picture ||
        "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    // console.log("The url is ", url);

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            // console.log("The response is ", response.isSuccess);
            if (response.isSuccess) {
                setPost(response.data);
                // console.log("the post object is ", post);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData()
                data.append("name", file.name)
                data.append("file", file)
                const response = await API.uploadFile(data)
                // post.picture = response.data
                if (response.isSuccess) {
                    post.picture = response.data;
                    setImageURL(response.data);
                }
            }
        }
        getImage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file])

    const updateBlogPost = async () => {
        await API.updatePost(post)
        navigate(`/details/${id}`);
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    return (
        <Container>
            <Image src={post.picture || url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} value={post.title} name='title' placeholder="Title" />
                <Button className="publishbutton" variant="contained" color="primary" onClick={() => updateBlogPost()}  >
                    Update
                </Button>
            </StyledFormControl>

            <Textarea rowsMin={5} placeholder="Tell your story..." name='description' onChange={(e) => handleChange(e)} value={post.description}
            />
        </Container>
    )
}

export default Update
