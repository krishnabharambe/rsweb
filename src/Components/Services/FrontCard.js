import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, Hidden } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import axios from "axios";
import GridItem from "./GridItem";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
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
  btnright: {
    marginLeft: "auto",
    textDecoration: "none",
  },
});

export default function FrontCard() {
  const classes = useStyles();

  const [V_MainServices, setV_MainServices] = useState([]);

  const retriveAllMainServices = async () => {
    const response = await axios.get(
      "https://krishnabharambe.pythonanywhere.com/services/MainServicesList/"
    );
    console.log(response);
    return response.data;
  };

  useEffect(() => {
    //   const retriveV_services = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //   if (retriveV_services) setContacts(retriveV_services);

    const getAllMainServices = async () => {
      const allMainServices = await retriveAllMainServices();
      if (allMainServices) setV_MainServices(allMainServices);
    };

    getAllMainServices();
  }, []);

  const RenderServices = V_MainServices.map((service) => {
    return <GridItem key={service} service={service} />;
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box fontWeight="fontWeightBold">Services</Box>
        <Typography className={classes.pos} color="textSecondary"></Typography>
        <Typography variant="body2" component="p"></Typography>
        <Grid container>{RenderServices}</Grid>
      </CardContent>
      <CardActions>
        <Link to="/services/" className={classes.btnright}>
          <Button size="small">
            All Services <ChevronRightIcon />
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
