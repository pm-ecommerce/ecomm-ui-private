import React from "react";
import "./ProductList.css";
import Img from "./img.png";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: "22%",
    marginRight: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 0,
  },
  media: {
    height: 200,
  },
});

const ProductList = (props) => {
  console.log(props.list, 'list');
  const classes = useStyles();
  return (
    <div className="pl-comp-container">
      {props.list
        ? props.list.map((product, index) => (
            <Link to="/home/product" key={index}>
              <Card className={classes.root} >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={Img}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      ${product.price}.00
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))
        : ""}
    </div>
  );
};

export default ProductList;
