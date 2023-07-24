import React, { useState, useEffect, useContext } from "react"

import {
	styled,
	Box,
	Button,
	TextareaAutosize,
	InputBase,
	FormControl,
} from "@mui/material"
import { AddCircle as Add } from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"

import { API } from "../../service/api"
import { DataContext } from "../../context/DataProvider"

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
const initialPost = {
	title: "",
	description: "",
	picture: "",
	username: "",
	categories: "",
	createdDate: new Date(),
}

const CreatePost = () => {
	const navigate = useNavigate()
	const location = useLocation()
	// const [hovered, setHovered] = useState(false)

	const [post, setPost] = useState(initialPost)
	const [file, setFile] = useState("")
	const { account } = useContext(DataContext)

	const url =
		post.picture ||
		"https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
	// console.log("The url is ", url);

	useEffect(() => {
		const getImage = async () => {
			if (file) {
				// console.log("In the if statement");
				const data = new FormData()
				data.append("name", file.name)
				data.append("file", file)
				const response = await API.uploadFile(data)
				post.picture = response.data
			}
			// console.log("out of if world");
		}
		getImage()
		post.categories = location.search?.split("=")[1] || "All"
		post.username = account.username
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file])

	const savePost = async () => {
		// console.log("The post is", post)
		await API.createPost(post)
		navigate("/")
	}

	const handleChange = (e) => {
		setPost({ ...post, [e.target.name]: e.target.value })
	}
	// console.log("Runnig again and again")
	return (
		<Container>
			<Image src={url} alt="post" />

			<StyledFormControl>
				<label htmlFor="fileInput">
					<Add fontSize="large" color="action" />
				</label>
				<input
					type="file"
					id="fileInput"
					style={{ display: "none" }}
					onChange={(e) => setFile(e.target.files[0])}
				/>
				<InputTextField
					name="title"
					placeholder="Title"
					onChange={(e) => handleChange(e)}
				/>
				<Button
					className="publishbutton"
					variant="contained"
					color="primary"
					onClick={() => savePost()}
				>
					Publish
				</Button>
			</StyledFormControl>

			<Textarea
				rowsMin={5}
				placeholder="Tell your story..."
				name="description"
				onChange={(e) => handleChange(e)}
			/>
		</Container>
	)
}

export default CreatePost
