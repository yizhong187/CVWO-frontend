import { Paper, Typography, Grid, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type ErrorCardProps = {
  text: string;
  Icon: React.ElementType;
};

const ErrorCard: React.FC<ErrorCardProps> = ({ text, Icon }) => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        maxWidth: 900,
        width: "100%",
        margin: "auto",
        p: 2,
        minHeight: 300,
      }}
    >
      <Grid container spacing={7} alignItems="center" justifyContent="center">
        <Grid item>
          <Typography
            variant="h2"
            component="h2"
            marginTop={2}
            sx={{ fontWeight: 400, display: "flex", alignItems: "center" }}
          >
            <Icon sx={{ fontSize: "inherit", marginRight: 1 }} />
            {text}
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button variant="outlined" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ErrorCard;
