import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { palette } from "../theme/Theme";

const Container = styled.div`
  padding: 8px 12px;
  color: #fff;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background: linear-gradient(
    90deg,
    ${palette.primary.main} 0%,
    ${palette.primary.dark} 100%
  );
`;

const Title = styled.h1`
  font-family: "Exo 2";
  text-align: left;
  font-size: 36px;
  color: #fff;
  margin: 4px 0 0 0;
`;

const SubTitle = styled.h1`
  text-align: left;
  font-size: 18px;
  color: #aaa;
  margin: 0 0 16px 0;
`;

interface TopBarProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  disableBack?: boolean;
  children?: React.ReactNode;
}
function TopBar({
  onBack,
  disableBack,
  title,
  subtitle,
  children,
}: TopBarProps) {
  const history = useHistory();
  const backButton = (
    <IconButton
      style={{ color: "#AAA" }}
      disabled={disableBack}
      component="span"
      onClick={() => (onBack ? onBack() : history.goBack())}
      hidden={disableBack}
    >
      {disableBack ? <>&nbsp;</> : <ArrowBackIosIcon />}
    </IconButton>
  );
  return (
    <Container>
      {backButton}
      {title && <Title>{title}</Title>}
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
      {children}
    </Container>
  );
}

export default TopBar;
