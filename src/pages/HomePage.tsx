import React, { useEffect, useState, useContext } from "react";
import { CssBaseline, Typography, Container, Grid } from "@mui/material";
import { typographyStyles, gridContainerStyles } from "../AppStyles";
import ArtistCard from "../components/ArtistCards/ArtistCard";
import { SubforumModel } from "../interfaces/SubforumModel";
import apiClient from "../services/api";
import { UserContext } from "../contexts/UserContext";
import LoginSnackbar from "../components/Common/LoginSnackbar";

const HomePage: React.FC = () => {
  // State for storing subforums and potential errors
  const [subforums, setSubforums] = useState<SubforumModel[]>([]);
  const [subforumError, setSubforumError] = useState("");

  // Using UserContext to access current user data
  const { user } = useContext(UserContext);

  // Setting the document title on component mount
  useEffect(() => {
    document.title = "Musicality Forum";
  }, []);

  // Fetching subforum data from the API on component mount
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
      <div>
        <Container sx={{ paddingBottom: 8 }}>
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
      </div>
      <LoginSnackbar />
    </>
  );
};

export default HomePage;
