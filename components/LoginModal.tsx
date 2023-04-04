import React from "react";
import { Button, Modal, Form, Input, ConfigProvider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useModalStore } from "../pages/store";

type Props = {};

const LoginModal = (props: Props) => {
  const [form] = Form.useForm();
  const visible = useModalStore((state) => state.visible);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleSubmit = (values: { username: string; password: string }) => {
    console.log("Login values:", values);
    // Perform login logic here
    closeModal();
  };

  return (
    <Modal
      title="Login"
      open={visible}
      onCancel={closeModal}
      footer={null}
      destroyOnClose
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
