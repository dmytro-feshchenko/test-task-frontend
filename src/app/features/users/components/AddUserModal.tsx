import React, { useState } from 'react';
import {Modal, Form, Input, Select, Button} from 'antd';
import { useDispatch } from 'react-redux';
import { addUser } from '../userSlice';

interface AddUserModalProps {
    visible: boolean;
    onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ visible, onClose }) => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const handleFinish = async (values: any) => {
        // @ts-ignore
        await dispatch(addUser(values));
        form.resetFields();
        onClose();
    };

    return (
        <Modal title="Add new user" visible={visible} onCancel={onClose} footer={null}>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <button type="submit">Add user</button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUserModal;