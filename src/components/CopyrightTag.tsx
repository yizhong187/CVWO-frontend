import React from "react";
import { Typography, Link } from "@mui/material";

const Copyright: React.FC<any> = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/yizhong187">
        Yizhong
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
