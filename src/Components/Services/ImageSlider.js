import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import image1 from "./../../assets/Images/SliderImages/1.png";
import image2 from "./../../assets/Images/SliderImages/2.png";
import image3 from "./../../assets/Images/SliderImages/3.png";
import image4 from "./../../assets/Images/SliderImages/4.png";
import image5 from "./../../assets/Images/SliderImages/5.png";
import { Hidden } from "@material-ui/core";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath: image1,
  },
  {
    label: "Bird",
    imgPath: image2,
  },
  {
    label: "Bali, Indonesia",
    imgPath: image3,
  },
  {
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath: image4,
  },
  {
    label: "Goč, Serbia",
    imgPath: image5,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 10,
    borderRadius: "12%",
  },
  img: {
    height: 125,
    display: "block",
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
}));

function ImageSlider() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Hidden mdUp>
      <div className={classes.root} width={1}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  className={classes.img}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </div>
    </Hidden>
  );
}

export default ImageSlider;
