import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Customer from "./components/Customer";
import Product from "./components/Product";
import Turnover from "./components/Turnover";
import Invoice from "./components/Invoice";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { Mail } from "./components/Mail";
import { Password } from "./components/Password";

function App() {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };
    return (
        <>
            <div></div>
            <div>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">
                            Bánh Mì UITFood
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/customer">Customer</Nav.Link>
                                <Nav.Link href="/product">Product</Nav.Link>
                                <Nav.Link href="/turnover">Turnover</Nav.Link>
                                <Nav.Link href="/invoice">Invoice</Nav.Link>
                                <Nav.Link onClick={handler}>
                                    <div>
                                        Login
                                        <Modal
                                            closeButton
                                            preventClose
                                            aria-labelledby="modal-title"
                                            open={visible}
                                            onClose={closeHandler}
                                        >
                                            <Modal.Header>
                                                <Text
                                                    id="modal-title"
                                                    size={18}
                                                >
                                                    Chào mừng đến với
                                                    <Text b size={18}>
                                                        {" "}
                                                        UITFood
                                                    </Text>
                                                </Text>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Input
                                                    clearable
                                                    bordered
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Email"
                                                    contentLeft={
                                                        <Mail fill="currentColor" />
                                                    }
                                                />
                                                <Input
                                                    clearable
                                                    bordered
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Mật khẩu"
                                                    contentLeft={
                                                        <Password fill="currentColor" />
                                                    }
                                                />
                                                <Row justify="space-between">
                                                    <Checkbox>
                                                        <Text size={14}>
                                                            Remember me
                                                        </Text>
                                                    </Checkbox>
                                                    <Text size={14}>
                                                        Quên mật khẩu?
                                                    </Text>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button
                                                    auto
                                                    flat
                                                    color="error"
                                                    onClick={closeHandler}
                                                >
                                                    Đóng
                                                </Button>
                                                <Button
                                                    auto
                                                    onClick={closeHandler}
                                                >
                                                    Đăng nhập
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <Router basename={"/"}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="customer" element={<Customer />} />
                    <Route path="product" element={<Product />} />
                    <Route path="turnover" element={<Turnover />} />
                    <Route path="invoice" element={<Invoice />} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
