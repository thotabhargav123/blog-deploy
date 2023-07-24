import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    padding: '20px',
    borderRadius: '10px',
    background: '#f0f0f0', // Light gray background
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Add a shadow to create depth
    transition: 'box-shadow 0.3s ease', // Add transition for a smooth effect on hover
    '&:hover': {
        boxShadow: '0 16px 24px rgba(0, 0, 0, 0.1)', // On hover, increase the shadow to create a 3D effect
    },
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '10px',
    transition: 'transform 0.3s ease', // Add transition for a smooth zoom effect on hover
    '&:hover': {
        transform: 'scale(1.03)', // Zoom in effect on hover
    },
});

const EditIcon = styled(Edit)(({ theme }) => ({
    margin: '5px',
    padding: '5px',
    borderRadius: '10px',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Add transition for a smooth scale effect on hover
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        transform: 'scale(1.1)', // Add a scale effect on hover for 3D effect
    },
}));

const DeleteIcon = styled(Delete)(({ theme }) => ({
    margin: '5px',
    padding: '5px',
    borderRadius: '10px',
    color: theme.palette.error.main,
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Add transition for a smooth scale effect on hover
    '&:hover': {
        backgroundColor: theme.palette.error.main,
        color: '#fff',
        transform: 'scale(1.1)', // Add a scale effect on hover for 3D effect
    },
}));

const Heading = styled(Typography)(({ theme }) => ({
    fontSize: '38px',
    fontWeight: 600,
    textAlign: 'center',
    margin: '50px 0 10px 0',
    color: theme.palette.primary.dark,
}));

const Author = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DateText = styled(Typography)(({ theme }) => ({
    marginLeft: 'auto',
    color: theme.palette.text.secondary,
}));

const Description = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    lineHeight: '1.6',
    color: theme.palette.text.primary,
    marginTop: '20px',
    wordWrap: 'break-word',
}));



const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [id]);

    const deleteBlog = async () => {
        console.log("In the delete blog function");
        let response = await API.deletePost(post._id);
        console.log("The response is ", response);
        navigate('/')
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />

            <Box style={{ float: 'right' }}>
                {account.username === post.username && (
                    <>
                        <Link to={`/update/${post._id}`}>
                            <EditIcon />
                        </Link>
                        <DeleteIcon onClick={() => deleteBlog()} />
                    </>
                )}
            </Box>

            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body2">Author: <span style={{ fontWeight: 600 }}>{post.username}</span></Typography>
                </Link>
                <DateText variant="body2">{new Date(post.createdDate).toDateString()}</DateText>
            </Author>

            <Description>{post.description}</Description>

            {/* <Comments post={post} /> */}
        </Container>
    )
}

export default DetailView;