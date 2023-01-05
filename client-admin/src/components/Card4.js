import { Card, Col, Row, Button, Text } from "@nextui-org/react";

export const Card4 = ({
    index,
    product_name,
    product_image,
    product_price,
    product_quantity,
}) => (
    <Card css={{ w: "100%", h: "400px" }}>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
                <Text
                    size={12}
                    weight="bold"
                    transform="uppercase"
                    color="#ffffffAA"
                >
                    New
                </Text>
                <Text h3 color="black">
                    {product_name}
                </Text>
            </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
            <Card.Image
                src={product_image}
                width="100%"
                height="100%"
                objectFit="cover"
                alt="Card example background"
            />
        </Card.Body>
        <Card.Footer
            isBlurred
            css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop:
                    "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
            }}
        >
            <Row>
                <Col>
                    <Text color="#000" size={12}>
                        Số lượng : {product_quantity}
                    </Text>
                </Col>
                <Col>
                    <Row justify="flex-end">
                        <Button flat auto rounded color="secondary">
                            <Text
                                css={{ color: "inherit" }}
                                size={12}
                                weight="bold"
                                transform="uppercase"
                            >
                                {product_price} đ
                            </Text>
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Card.Footer>
    </Card>
);
