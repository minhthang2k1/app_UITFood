import React, { useEffect } from "react";
import "../css/Product.css";
import { Grid } from "@nextui-org/react";
import { Card4 } from "./Card4";
// call backend
import Axios from "axios";
import { IP } from "../constants/constants";

const Product = () => {
    const [dataProduct, setDataProduct] = React.useState([]);
    useEffect(() => {
        Axios.get(`${IP}/product`)
            .then((res) => {
                setDataProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <Grid.Container gap={2} justify="center">
            {dataProduct.map((item, index) => {
                return (
                    <Grid xs={12} sm={3}>
                        <Card4
                            index={index}
                            product_name={item.product_name}
                            product_image={item.product_image}
                            product_price={item.product_price}
                            product_quantity={item.product_quantity}
                        />
                    </Grid>
                );
            })}
        </Grid.Container>
    );
};

export default Product;
