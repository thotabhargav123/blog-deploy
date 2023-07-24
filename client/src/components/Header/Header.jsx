import React from "react";
import { AppBar, Toolbar, Typography, Button, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const StyledAppBar = styled(AppBar)`
  background-color: #ff6600;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled(Link)({
  textDecoration: "none",
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "1.5rem",
  animation: `${slideIn} 0.5s ease-out`,
});

const NavLinksContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#ffffff",
  marginRight: "20px",
  transition: `color 0.3s ease`,
  position: "relative",
  "&:hover": {
    color: "#ffffffb3",
    "&::after": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "2px",
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.common.white,
      animation: `${slideIn} 0.3s ease-out`,
    },
  },
}));

const ButtonLink = styled(Link)({
	textDecoration: "none",
	'&:hover': {
		color: '#ffffff',
	},
	padding:`5px 7px`,
});

const LogoutButton = styled(Button)`
  background-color: #ffffff;
  color: #ff6600;
  padding:0;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #ff6600;
    color: #ffffff;
  }
`;

const Header = () => {
  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <LogoLink to="/">Logo</LogoLink>
        <NavLinksContainer>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <LogoutButton variant="contained">
            <ButtonLink to="/login">Logout</ButtonLink>
          </LogoutButton>
        </NavLinksContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
