import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBarChart2, FiClock, FiLayers } from "react-icons/fi";
import "../App.css";

const Home = () => {
  return (
    <Box
      className="page-enter content-wrap"
      sx={{ pt: { xs: 8, md: 14 }, pb: 10 }}
    >
      <Box className="hero-grid">
        <Box>
          <span className="eyebrow">A conversation with my work</span>
          <Typography className="hero-title" component="h1">
            Ask Chirayu
            <br />
            <span>anything.</span>
          </Typography>
          <Typography className="hero-copy">
            A living introduction to a career, a way of thinking, and the work
            behind the screen. Ask about projects, decisions, lessons, or just
            start with a question of your own.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
            <Button
              component={Link}
              to="/chat"
              variant="contained"
              endIcon={<FiArrowUpRight />}
              sx={{
                bgcolor: "#5ee8d0",
                color: "#071522",
                px: 2.5,
                py: 1.4,
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                ":hover": { bgcolor: "#9bf5e3" },
              }}
            >
              Start a conversation
            </Button>
            <Button
              href="#what-i-do"
              sx={{ color: "#5ee8d0", px: 2, py: 1.4, textTransform: "none" }}
            >
              See what to ask ↓
            </Button>
          </Box>
        </Box>
        <Box className="hero-panel">
          <span className="eyebrow">
            A public portfolio, not a profile form
          </span>
          <Typography
            variant="h5"
            sx={{ mt: 4, fontWeight: 600, lineHeight: 1.25 }}
          >
            Curiosity is the interface.
          </Typography>
          <Typography sx={{ mt: 2, color: "#a3b9b8", lineHeight: 1.7 }}>
            No logins. No polished monologue. Just a conversational way to
            understand the person, the practice, and the possibilities.
          </Typography>
          <Box
            sx={{
              mt: 4,
              pt: 2,
              borderTop: "1px solid rgba(174,225,215,.18)",
              display: "flex",
              justifyContent: "space-between",
              color: "#5ee8d0",
              fontSize: 13,
            }}
          >
            <span>Open to humans</span>
            <span>2026 / now</span>
          </Box>
        </Box>
      </Box>
      <Box id="what-i-do" sx={{ mt: { xs: 10, md: 16 } }}>
        <span className="eyebrow">A few useful signals</span>
        <Box className="feature-grid" sx={{ mt: 3 }}>
          <Box className="feature-card">
            <FiBarChart2 size={22} color="#5ee8d0" />
            <Typography variant="h6" sx={{ mt: 3, fontWeight: 600 }}>
              Built to scale
            </Typography>
            <Typography sx={{ mt: 1, lineHeight: 1.6 }}>
              From startup MVPs to enterprise applications, Chirayu has built maintainable systems across AI, SaaS, healthcare, fintech, and real-time products
            </Typography>
          </Box>
          <Box className="feature-card">
            <FiClock size={22} color="#5ee8d0" />
            <Typography variant="h6" sx={{ mt: 3, fontWeight: 600 }}>
              End-to-End Engineering
            </Typography>
            <Typography sx={{ mt: 1, lineHeight: 1.6 }}>
             5+ years building products across React, Next.js, Node.js, APIs, databases, authentication, real-time systems, and AI integrations
            </Typography>
          </Box>
          <Box className="feature-card">
            <FiLayers size={22} color="#5ee8d0" />
            <Typography variant="h6" sx={{ mt: 3, fontWeight: 600 }}>
              Performance
            </Typography>
            <Typography sx={{ mt: 1, lineHeight: 1.6 }}>
              Delivered measurable gains including 40% faster overall performance, 30–40% lower module load times, and ~35% faster API responses
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
