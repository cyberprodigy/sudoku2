import { ContainerProps, Paper, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles/makeStyles";
import React from "react";

interface StandartContainerProps {}

const useStyles = makeStyles(function (theme: Theme) {
  return {
    StandartContainer: {
      backgroundColor: "#FFFFFF",
      paddingBottom: "33px",
    },
  };
});

const StandartContainer = <C extends React.ElementType>(
  props: ContainerProps<C, { component?: C }> & StandartContainerProps
) => {
  const classes = useStyles();

  return (
    <Paper {...props} className={classes.StandartContainer}>
      {props.children}
    </Paper>
  );
};
export default StandartContainer;
