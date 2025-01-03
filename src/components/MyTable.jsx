import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleClick = (user) => {
    navigate(`/posts/${user.id}`);
  };

  const tableHeaderStyle = {
    backgroundColor: "#1976d2",
    "& th": {
      color: "white",
      fontWeight: "bold",
      fontSize: "1rem",
    },
  };

  const tableRowStyle = {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
    "&:hover": {
      backgroundColor: "#e3f2fd",
      transition: "background-color 0.2s ease",
    },
  };

  const actionButtonStyle = {
    backgroundColor: "#1976d2",
    color: "white",
    borderRadius: "20px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#1565c0",
      transform: "translateY(-2px)",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
  };

  return loading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: "500",
          color: "#1976d2",
          animation: "pulse 1.5s infinite",
          "@keyframes pulse": {
            "0%": { opacity: 0.6 },
            "50%": { opacity: 1 },
            "100%": { opacity: 0.6 },
          },
        }}
      >
        Loading...
      </Typography>
    </Box>
  ) : (
    <Box sx={{ padding: "24px" }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textAlign: "center",
          marginBottom: "24px",
          fontWeight: "500",
          color: "#1976d2",
        }}
      >
        User Table
      </Typography>
      <TableContainer
        component={Paper}
        // sx={{
        //   boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        //   borderRadius: "12px",
        //   overflow: "hidden",
        // }}
        sx={{
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          overflow: "auto", 
          maxWidth: "100vw", 
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#555",
            },
          },
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow sx={tableHeaderStyle}>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id} sx={tableRowStyle}>
                <TableCell>{user.id}</TableCell>
                <TableCell sx={{ fontWeight: "500" }}>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Typography
                    component="a"
                    href={`mailto:${user.email}`}
                    sx={{
                      color: "#1976d2",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell>{`${user.address.street}, ${user.address.city}`}</TableCell>
                <TableCell align="center">
                  <Box
                    onClick={() => handleClick(user)}
                    sx={actionButtonStyle}
                  >
                    View Posts
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MyTable;
