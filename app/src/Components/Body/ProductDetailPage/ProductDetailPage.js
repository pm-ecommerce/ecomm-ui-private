import React, { useState, useEffect } from "react";
import "./ProductDetailPage.css";
import Img from "./img.png";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root : {
        width : 250,
    },
    input : {
        width : 42,
    },
});

const ProductDetailPage = (props) => {
  const [product, setProduct] = useState({ price: 0 });
  const classes = useStyles();
  const [value, setValue] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8083/api/products/${props.location.slug}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "product page");
        if (res.data) setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [props]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue < 1 ? 1 : newValue);
  };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 1) {
            setValue(1);
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
                <span>Ex Tax:</span> ${product.price * value}.00
              </div>
              <div>
                <span>Name:</span> {product.name}
              </div>
              <div>
                <span>Status:</span> {product.status}
              </div>
              <div>
                <span>Category:</span>{" "}
                {product.category ? product.category.name : ""}
              </div>
            </div>
          </div>
          <div className="short_description space">
            <h4>Available Options</h4>
            <div >
              {(product.attributes) ? product.attributes.map((attribute) => (
                <div>
                    <label>{attribute.name}</label>
                    <select>
                        {attribute.options.map(option => (
                            <option value={option.id}>{option.name} - ${option.price}</option>
                        ))}
                    </select>
                </div>
              )) : ''}
            </div>
          </div>
          <Typography id="input-slider" gutterBottom>
            Quantity
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={typeof value === "number" ? value : 1}
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
          <p>{product.description}</p>
        </div>
        </div>
      </div>
    );
};

export default ProductDetailPage;
