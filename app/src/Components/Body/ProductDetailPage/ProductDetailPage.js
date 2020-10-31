import React, { useState, useEffect } from "react";
import "./ProductDetailPage.css";
import Img from "./img.png";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

const ProductDetailPage = (props) => {
  const { slug } = useParams();
  const [product, setProduct] = useState({ price: 0 });
  const classes = useStyles();
  const [value, setValue] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8083/api/products/${slug}`)
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
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 1) {
      setValue(1);
    } else if (value > 300) {
      setValue(300);
    }
  };

  const addToCart = () => {
    const { sessionId } = JSON.parse(localStorage.getItem("cart"));
    const { price, id } = product;
    const data = {
      quantity: value,
      productId: id,
      rate: price,
      attributes: [],
    };
    console.log(JSON.stringify(data));
    fetch(`http://localhost:8084/api/cart/${sessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          props.history.push({
            pathname: "/cart",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
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
                <span>Price:</span> ${product.price * value}.00
              </div>
              <div>
                <span>Name:</span> {product.name}
              </div>
            </div>
          </div>
          <div className="short_description space">
            <h4>Available Options</h4>
            <div>
              {product.attributes
                ? product.attributes.map((attribute) => (
                    <div>
                      <label>{attribute.name}</label>
                      <select onChange={handleSelect}>
                        {attribute.options.map((option) => (
                          <option value={option.id} name={option.name}>
                            {option.name} - ${option.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))
                : ""}
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
              fontSize: 14,
              marginTop: 30,
            }}
            onClick={addToCart}
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
