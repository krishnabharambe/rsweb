import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ServiceItem(props) {
  const classes = useStyles();

  console.log(props);
  const {
    id,
    title,
    description,
    shortdescription,
    status,
    icon,
    uploaded_at,
  } = props.service;

  return (
    <Link
      to={{
        pathname: "/services/" + id + "/",
        state: { service: props.service },
      }}
      style={{ color: "inherit", textDecoration: "inherit" }}
      key={id}
    >
      <ListItem key={id}>
        <ListItemAvatar>
          <Avatar
            variant="rounded"
            src={"https://krishnabharambe.pythonanywhere.com" + icon}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText primary={title} secondary={shortdescription} />
      </ListItem>
    </Link>
  );
}
