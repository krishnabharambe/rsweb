import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Box, List } from "@material-ui/core";
import axios from "axios";
import ServiceItem from "./../../Components/Services/ServiceItem"
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
});

export default function AllServices() {
  const classes = useStyles();

  const [V_services, setV_services] = useState([]);
  //getting all services efrom api
  const retriveAllServices = async () => {
    const response = await axios.get(
      "https://krishnabharambe.pythonanywhere.com/services/allServicesList/"
    );
    // console.log(response);
    return response.data;
  };

  useEffect(() => {
    //   const retriveV_services = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //   if (retriveV_services) setContacts(retriveV_services);

    const getAllServices = async () => {
      const allServices = await retriveAllServices();
      if (allServices) setV_services(allServices);
    };

    getAllServices();
  }, []);

  const RenderServices = V_services.map((service) => {
    return <ServiceItem service={service} />;
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box fontWeight="fontWeightBold">All Services</Box>
        <List className={classes.root}>{RenderServices}</List>
      </CardContent>
    </Card>
  );
}
