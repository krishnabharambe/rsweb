import { Box, Button, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  TextMarginTop: {
    marginTop: 12,
  },
});

function SubServiceDetail(props) {
  console.log(props);
  const {
    id,
    title,
    description,
    shortdescription,
    status,
    icon,
    uploaded_at,
  } = props.location.state.service;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box fontWeight="fontWeightBold">{title}</Box>
        <Typography className={classes.TextMarginTop}>
          {shortdescription}
        </Typography>
        <Typography className={classes.TextMarginTop}>{description}</Typography>
        <Typography>
          <br />
        </Typography>
        <Button
          lassName={classes.TextMarginTop}
          variant="outlined"
          color="primary"
        >
          Book Service
        </Button>
      </CardContent>
    </Card>
  );
}

export default SubServiceDetail;
