import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grow,
  Typography,
} from "@material-ui/core";
import "./styles/product.css";
import { Rating } from "..";

export default function Product({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: index / 1 }}
      drag={true}
      dragElastic={1}
      dragConstraints={{ top: 1, bottom: 1, right: 1, left: 1 }}
    >
      <Grow in timeout={1000}>
        <Card className="customCard">
          <CardActionArea>
            <Link to={`/product/${product._id}`}>
              <CardMedia
                className="customCard_image"
                title={product.name}
                image={product.image}
              />
            </Link>
            <CardContent className="customCard_content">
              <Typography variant="body2" className="customCard_name">
                {product.name}
              </Typography>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grow>
    </motion.div>
  );
}
