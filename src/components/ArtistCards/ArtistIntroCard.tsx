import * as React from "react";
import Typography from "@mui/material/Typography";
import { CardMedia, Paper, Grid, CssBaseline } from "@mui/material";
import { SubforumModel } from "../../interfaces/SubforumModel";

type ArtistIntroCardProps = {
  subforum: SubforumModel;
};

const ArtistIntroCard: React.FC<ArtistIntroCardProps> = ({ subforum }) => {
  return (
    <>
      <CssBaseline />
      <main>
        <div>
          <Paper
            sx={{
              maxWidth: 900,
              width: "100%",
              margin: "auto",
              p: 2,
              minHeight: 300,
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                height: 1,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
              p={2}
            >
              <Grid item sx={{ marginInline: 1, height: 1, flex: "0 0 auto" }}>
                <CardMedia
                  component="img"
                  image={subforum.photoURL}
                  title="Artist Photo"
                  sx={{
                    maxWidth: 320,
                    maxHeight: 320,
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item sx={{ flex: "1" }}>
                <Typography
                  variant="h2"
                  component="h2"
                  mt={1}
                  mb={1}
                  sx={{ fontWeight: 400 }}
                >
                  {`${subforum.name}`}
                </Typography>
                <Typography variant="body1">
                  {`${subforum.description}`}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </main>
    </>
  );
};

export default ArtistIntroCard;
