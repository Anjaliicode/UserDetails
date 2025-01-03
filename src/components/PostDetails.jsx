import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
  Box,
  Skeleton,
  Alert,

} from "@mui/material";

function PostDetails() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [userId]);

  // const { userId } = useParams();  
  //   const [posts, setPosts] = useState([]);  
  //   const [loading, setLoading] = useState(true); // Loading state  
  //   const navigate = useNavigate();  
  
  //   useEffect(() => {  
  //     fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)  
  //       .then((response) => response.json())  
  //       .then((data) => {  
  //         setPosts(data);  
  //         setLoading(false); // Set loading to false after fetching data  
  //       })  
  //       .catch((error) => {  
  //         console.error("Error in fetching posts", error);  
  //         setLoading(false); // Set loading to false in case of error  
  //       });  
  //   }, [userId]); 

  const handleSeeComments = (post) => {
    navigate(`/comments/${post.id}`);
  };

  const handleUser = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1 }} />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Box
              key={n}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 16px)",
                },
              }}
            >
              <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} />
            </Box>
          ))}
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ position: 'relative' }}>
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            backgroundColor: "#1976d2",
            color: "white",
            borderRadius: "8px",
            padding: "10px",
            position: 'relative',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            User Posts
          </Typography>
          {/* <Button
            onClick={handleUser}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            ← Back
          </Button> */}
        </Box>

        {/* Posts Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "flex-start",
            mb: 4,
          }}
        >
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 16px)",
                },
                display: "flex",
                flexDirection: "column",
                minHeight: 250,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
                backgroundColor: '#f8f9fa',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography 
                  variant="h6" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#1976d2',
                    mb: 2,
                  }}
                >
                  {post.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.6,
                  }}
                >
                  {post.body}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, justifyContent: 'flex-end' }}>
                <Button
                  size="medium"
                  onClick={() => handleSeeComments(post)}
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    padding: "8px 16px",
                    textTransform: 'none',
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: "#004480",
                    },
                  }}
                >
                  See Comments
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        {/* Back to Users Button */}
        <Button
          onClick={handleUser}
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            textTransform: 'none',
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: "#004480",
            },
          }}
        >
          Back to Users
        </Button>
      </Box>
    </Container>
  );
}

export default PostDetails;