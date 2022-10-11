import { Button, ButtonProps, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles/makeStyles";
import React from "react";

interface StandartButtonProps {}

const useStyles = makeStyles(function (theme: Theme) {
  return {
    standartButton: {
      borderRadius: "25px",
      fontSize: "1.2em",
      width: "70%",
      display: "flex",
      margin: "10px auto",
      padding: "10px",
    },
  };
});

const StandartButton = <C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }> & StandartButtonProps
) => {
  const classes = useStyles();

  return (
    <Button
      color="primary"
      variant="contained"
      {...props}
      className={classes.standartButton}
    >
      {props.children}
    </Button>
  );
};
export default StandartButton;
