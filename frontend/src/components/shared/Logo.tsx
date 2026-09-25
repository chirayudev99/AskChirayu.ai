import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        // marginLeft: "auto",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Typography
          sx={{ fontWeight: 700, letterSpacing: "-.04em", color: "#eef7f2" }}
        >
          ask<span style={{ color: "#5ee8d0" }}>chirayu</span>
          <span style={{ color: "#ffb870" }}>.</span>
        </Typography>
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          color: "#a3b9b8",
        }}
      >
        PERSONAL AI PORTFOLIO
      </Typography>
    </div>
  );
};

export default Logo;
