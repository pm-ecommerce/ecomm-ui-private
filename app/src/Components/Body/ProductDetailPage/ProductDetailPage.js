import React, { useEffect } from "react";
import "./ProductDetailPage.css";
import Img from "./img.png";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import orange from "@material-ui/core/colors/deepOrange";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

const ProductDetailPage = () => {
  const price = 40;
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  useEffect(() => {}, []);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 300) {
      setValue(300);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-box">
        <div className="product-detail-left">
          <div className="product-detail-img-list">
            <ul>
              <li className="owl-item">
                <img src={Img} style={{ width: "100%", height: "100%" }} />
              </li>
              <li className="owl-item">
                <img src={Img} style={{ width: "100%", height: "100%" }} />
              </li>
              <li className="owl-item">
                <img src={Img} style={{ width: "100%", height: "100%" }} />
              </li>
              <li className="owl-item">
                <img src={Img} style={{ width: "100%", height: "100%" }} />
              </li>
            </ul>
          </div>
          <div className="prodct-detail-img">
            <img src={Img} className="product-img" />
          </div>
        </div>
        <div className="product-detail-right">
          <div className="product-detail-title">
            <h1>Chicken swinesha</h1>
          </div>
          <div className="product-box-desc">
            <div className="inner-box-desc space">
              <div className="price-tax">
                <span>Ex Tax:</span> ${price * value}.00
              </div>
              <div>
                <span>Brand:</span> Apple
              </div>
              <div>
                <span>Product Code:</span> Product 15
              </div>
              <div>
                <span>Reward Points:</span> 100
              </div>
            </div>
          </div>
          <div className="short_description space">
            <h4>Overview</h4>
            <div className="overview">
              The 30-inch Apple Cinema HD Display delivers an amazing 2560 x
              1600 pixel resolution. Designed specifically for the creative
              professional, this display provides more space for easier access
              to all the tools and palettes needed to edit, format and composite
              your work. Combine this display with a Mac Pro, MacBook Pro, or
              PowerMac G5 and there's no limit to what you can achieve. The
              Cinema HD features an active-matrix liquid crystal display that
              produces flicker-free images that deliver twice the brightness,
              twice the sharpness and twice the contrast ratio of a typical CRT
              display. Unlike other flat panels, it's designed with a pure
              digital interface to deliver distortion-free images that never
              need adjusting. With over 4 million digital pixels, the display is
              uniquely suited for scientific and technical applications such as
              visualizing molecular structures or analyzing geological data.
            </div>
          </div>
          <Typography id="input-slider" gutterBottom>
            Quantity
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item>
              <Input
                className={classes.input}
                value={value}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 1,
                  max: 100,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#ff3c20",
              color: "white",
              border: "none",
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="description-container">
        <h1>Description</h1>
        <div className="description-content">
          <p>
            DESCRIPTION REVIEWS (1) TAGS CUSTOM TAB The 30-inch Apple Cinema HD
            Display delivers an amazing 2560 x 1600 pixel resolution. Designed
            specifically for the creative professional, this display provides
            more space for easier access to all the tools and palettes needed to
            edit, format and composite your work. Combine this display with a
            Mac Pro, MacBook Pro, or PowerMac G5 and there's no limit to what
            you can achieve. The Cinema HD features an active-matrix liquid
            crystal display that produces flicker-free images that deliver twice
            the brightness, twice the sharpness and twice the contrast ratio of
            a typical CRT display. Unlike other flat panels, it's designed with
            a pure digital interface to deliver distortion-free images that
            never need adjusting. With over 4 million digital pixels, the
            display is uniquely suited for scientific and technical applications
            such as visualizing molecular structures or analyzing geological
            data. Offering accurate, brilliant color performance, the Cinema HD
            delivers up to 16.7 million colors across a wide gamut allowing you
            to see subtle nuances between colors from soft pastels to rich jewel
            tones. A wide viewing angle ensures uniform color from edge to edge.
            Apple's ColorSync technology allows you to create custom profiles to
            maintain consistent color onscreen and in print. The result: You can
            confidently use this display in all your color-critical
            applications. Housed in a new aluminum design, the display has a
            very thin bezel that enhances visual accuracy. Each display features
            two FireWire 400 ports and two USB 2.0 ports, making attachment of
            desktop peripherals, such as iSight, iPod, digital and still
            cameras, hard drives, printers and scanners, even more accessible
            and convenient. Taking advantage of the much thinner and lighter
            footprint of an LCD, the new displays support the VESA (Video
            Electronics Standards Association) mounting interface standard.
            Customers with the optional Cinema Display VESA Mount Adapter kit
            gain the flexibility to mount their display in locations most
            appropriate for their work environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
