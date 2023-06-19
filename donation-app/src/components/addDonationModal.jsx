import React, { useState } from "react";
import { Modal, Button, Col, Row, Form, Input, Radio, Space } from "antd";
import { ValidateRules } from "../utils/functions";
import { createDonation } from "../services/helper";
import Loader from "./Loader";

const AddDonationModal = ({ showModal, setShowModal, getDonationsOnLoadPage }) => {
    const [loading, setLoading] = useState(false);
    const [form1] = Form.useForm();


    const onFinish = (values) => {
        if (values) addNewDonation(values)
    };

    /**********Add new donation logic here***********/
    const addNewDonation = async (formData) => {
        setLoading(true);
        try {
        
            let req = {
                name: formData?.name,
                location: formData?.location,
                theme: formData?.theme,
                price: {
                    currencyCode: 'GBP (£)',
                    amount: formData?.amount
                }
            }
            let res = await createDonation(req);
            console.log("res post data--->", res);
            setLoading(false);
            setShowModal(false)
            if (res.status === 200) {
                await getDonationsOnLoadPage()
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    };


    return (
        <>
            {loading && <Loader />}
            <Modal
                open={showModal}
                centered
                onCancel={() => setShowModal(false)}
                title="Add New Donation"
                footer={false}
                width={500}
            >
                <Form
                    id={"donationForm"}
                    key={"donationForm"}
                    name="basic"
                    form={form1}
                    onFinish={onFinish}
                    initialValues={{}}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Donation Name"
                                name="name"
                                rules={[
                                    ValidateRules.required,
                                    ValidateRules.name,
                                    ValidateRules.maxlimit200,
                                ]}
                            >
                                <Input size="large" placeholder="Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Location"
                                name="location"
                                rules={[ValidateRules.required, ValidateRules.alphaNumeric]}
                            >
                                <Input size="large" placeholder="Location" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Theme"
                                name="theme"
                                rules={[ValidateRules.required, ValidateRules.alphaNumeric]}
                            >
                                <Input size="large" placeholder="Theme" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Price"
                                name="amount"
                                rules={[ValidateRules.price]}
                            >
                                <Input size="large" placeholder="Price" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item>
                                <Button className="btn-txt" type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default AddDonationModal;
