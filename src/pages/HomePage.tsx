import React, { useEffect, useState, useContext } from "react";
import {
  CssBaseline,
  Typography,
  Container,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { typographyStyles, gridContainerStyles } from "../AppStyles";
import ArtistCard from "../components/ArtistCard";
import { SubforumModel } from "../interfaces/SubforumModel";
import apiClient from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { SnackbarContext } from "../contexts/LoginSnackBarContext";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const [subforums, setSubforums] = useState<SubforumModel[]>([]);
  const [subforumError, setSubforumError] = useState("");

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }
  const { user } = userContext;

  const { snackbarOpen, closeSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    const fetchSubforums = async () => {
      try {
        const response = await apiClient.get("/subforums");
        setSubforums(response.data);
      } catch (err) {
        setSubforumError("An error occurred");
        console.error(err);
      }
    };

    fetchSubforums();
  }, []);

  if (subforumError) {
    return <div>Subforum retrival error: {subforumError}</div>;
  }

  return (
    <>
      <CssBaseline />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message="Logged in successfully"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Logged in successfully!
        </Alert>
      </Snackbar>
      <div>
        <Container>
          <Typography
            variant="h4"
            align="center"
            paddingBottom={4}
            paddingTop={4}
            sx={typographyStyles}
          >
            Hey {user?.name || "Guest"}! Find your favourite artists and join
            the best communities!
          </Typography>
          <div>
            <Grid container spacing={4} sx={gridContainerStyles}>
              {subforums.map((subforum: SubforumModel) => (
                <Grid key={subforum.id} item xs={4}>
                  <ArtistCard
                    title={subforum.name}
                    content={subforum.description}
                    id={subforum.id}
                    photoURL={subforum.photoURL}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
        <Typography variant="h6" align="left" sx={typographyStyles} p={2}>
          Can't find an artist? Drop us a{" "}
          <Link to="/request-form">request</Link>!
        </Typography>
      </div>
    </>
  );
};

export default HomePage;
