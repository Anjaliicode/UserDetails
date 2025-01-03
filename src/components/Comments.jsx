import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Comments() {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error in fetching comments", error);
        setLoading(false);
      });
  }, [postId]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error in fetching comments", error);
        setLoading(false);
      });
  }, [postId]);

  const handlePost = () => {
    if (post) {
      navigate(`/posts/${post.userId}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading ? (
        <div style={{ textAlign: "center", margin: "25px 0" }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ 
              fontWeight: "bold", 
              color: "#003366",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            }}
          >
            Loading...
          </Typography>
        </div>
      ) : (
        <>
          <button
            style={{
              border: "2px solid white",
              backgroundColor: "#1976d2",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              fontWeight: "500",
              fontSize: "16px",
              '&:hover': {
                backgroundColor: "#004480",
              },
            }}
            onClick={() => handlePost(post)}
          >
            ← Back to Posts
          </button>

          {/* Post Details Card */}
          <Box
            sx={{
              textAlign: "center",
              borderRadius: "8px",
              margin: "25px 0",
              backgroundColor: "#f8f9fa",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                padding: "24px 20px",
                borderBottom: "1px solid #eee"
              }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.7,
                padding: "20px 24px",
                fontSize: "16px"
              }}
            >
              {post.body}
            </Typography>
          </Box>

          {/* Comments Header */}
          <Box
            sx={{
              textAlign: "center",
              margin: "25px 0",
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h4" component="h1" fontWeight="bold">
              Comments
            </Typography>
          </Box>

          {/* Comments Grid */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "flex-start",
            }}
          >
            {comments.map((comment) => (
              <Card
                key={comment.id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 12px)",
                    md: "calc(33.333% - 16px)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 250,
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      color: "#1976d2",
                      mb: 1,
                    }}
                  >
                    {comment.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#666",
                      mb: 2,
                      fontStyle: "italic",
                    }}
                  >
                    {comment.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.6,
                    }}
                  >
                    {comment.body}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}

export default Comments;

