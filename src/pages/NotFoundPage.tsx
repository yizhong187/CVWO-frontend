import React, { useEffect } from "react";
import ErrorCard from "../components/Common/ErrorCard";
import HandymanIcon from "@mui/icons-material/Handyman";

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = "Musicality Forum";
  }, []);

  return <ErrorCard text="404 Page Not Found!" Icon={HandymanIcon} />;
};

export default NotFoundPage;
