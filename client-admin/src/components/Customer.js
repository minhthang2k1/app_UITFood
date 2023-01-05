import React, { useState, useEffect } from "react";
import "../css/Customer.css";
import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
// call backend
import Axios from "axios";
import { IP } from "../constants/constants";

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        Axios.get(`${IP}/data`)
            .then((res) => {
                setCustomers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const columns = [
        { name: "ID", uid: "id" },
        { name: "NAME", uid: "name" },
        { name: "PHONE", uid: "phone" },
        { name: "GENDER", uid: "gender" },
        { name: "STATUS", uid: "status" },
        { name: "ACTIONS", uid: "actions" },
    ];
    const users = customers.map((customer) => {
        return {
            id: customer.cus_id,
            name: customer.cus_name,
            gender: customer.cus_gender,
            phone: customer.cus_numphone,
            team: "Management",
            status: "active",
            age: "29",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            email: customer.cus_email,
        };
    });
    console.log(users);
    const renderCell = (user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "id":
                return <div>{user.id}</div>;
            case "name":
                return (
                    <User
                        squared
                        src={user.avatar}
                        name={cellValue}
                        css={{ p: 0 }}
                    >
                        {user.email}
                    </User>
                );
            case "phone":
                return <div>{user.phone}</div>;
            case "gender":
                return (
                    <Col>
                        <Row>
                            <Text
                                b
                                size={14}
                                css={{ tt: "capitalize", textAlign: "center" }}
                            >
                                {cellValue === 0 ? "Nam" : "Nữ"}
                            </Text>
                        </Row>
                    </Col>
                );
            case "status":
                return (
                    <StyledBadge type={user.status}>{cellValue}</StyledBadge>
                );

            case "actions":
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Details">
                                <IconButton
                                    onClick={() =>
                                        console.log("View user", user.id)
                                    }
                                >
                                    <EyeIcon size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Edit user">
                                <IconButton
                                    onClick={() =>
                                        console.log("Edit user", user.id)
                                    }
                                >
                                    <EditIcon size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Delete user"
                                color="error"
                                onClick={() =>
                                    console.log("Delete user", user.id)
                                }
                            >
                                <IconButton>
                                    <DeleteIcon size={20} fill="#FF0080" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                );
            default:
                return cellValue;
        }
    };
    return (
        <Table
            aria-label="Example table with custom cells"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
            selectionMode="none"
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column
                        key={column.uid}
                        hideHeader={column.uid === "actions"}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={users}>
                {(item) => (
                    <Table.Row>
                        {(columnKey) => (
                            <Table.Cell>
                                {renderCell(item, columnKey)}
                            </Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
};

export default Customer;
