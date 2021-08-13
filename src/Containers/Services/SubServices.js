import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Box, List } from "@material-ui/core";
import SubServiceItem from "../../Components/Services/SubServiceItem";
import ServiceDetail from "../../Components/Services/ServiceDetail";
import axios from "axios";

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

export default function AllServices(props) {
  //   state = {
  //     SubServiceFlag: true,
  //   };

  const [SubServiceFlag, setSubServiceFlag] = useState(false);

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

  const [V_SubServices, setV_SubServices] = useState([]);

  //getting all services efrom api
  const retriveAllSubServices = async () => {
    const url =
      "https://krishnabharambe.pythonanywhere.com/services/allServicesList/" +
      id +
      "/";
    const response = await axios.get(url);
    if (!response.data || response.data.length == 0) {
      setSubServiceFlag(false);
    } else {
      setSubServiceFlag(true);
      return response.data;
    }
  };

  useEffect(() => {
    //   const retriveV_services = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //   if (retriveV_services) setContacts(retriveV_services);

    const getAllSubServices = async () => {
      const allSubServices = await retriveAllSubServices();
      if (allSubServices) {
        setV_SubServices(allSubServices);
      }
    };

    getAllSubServices();
  }, []);

  const RenderSubServices = V_SubServices.map((service) => {
    return <SubServiceItem service={service} />;
  });
  if (SubServiceFlag) {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Box fontWeight="fontWeightBold">{title}</Box>
          <List className={classes.root}>{RenderSubServices}</List>
        </CardContent>
      </Card>
    );
  }
  {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Box fontWeight="fontWeightBold">{title}</Box>
          <ServiceDetail mService={props.location.state.service} />
        </CardContent>
      </Card>
    );
  }
}
