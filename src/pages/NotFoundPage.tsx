import React, { useEffect } from "react";
import ErrorCard from "../components/Common/ErrorCard";
import HandymanIcon from "@mui/icons-material/Handyman";

const NotFoundPage: React.FC = () => {
  // Set the document title when the component mounts
  useEffect(() => {
    document.title = "Musicality Forum";
  }, []);

  // Render  ErrorCard component with a "404 Page Not Found" message and HandymanIcon
  return <ErrorCard text="404 Page Not Found!" Icon={HandymanIcon} />;
};

export default NotFoundPage;
