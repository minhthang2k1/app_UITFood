import React from "react";
import { Grid } from "@nextui-org/react";
import { Card4 } from "./Card4";

const Card = () => {
    return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={12} sm={4}>
                <Card4 />
            </Grid>
            <Grid xs={12} sm={4}>
                <Card4 />
            </Grid>
            <Grid xs={12} sm={4}>
                <Card4 />
            </Grid>
            <Grid xs={12} sm={5}>
                <Card4 />
            </Grid>
            <Grid xs={12} sm={7}>
                <Card4 />
            </Grid>
        </Grid.Container>
    );
};

export default Card;
