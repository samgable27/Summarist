import React from "react";
import { Button, Modal, Form, Input, ConfigProvider } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useModalStore } from "../pages/store";
import styles from "../modal.module.css";
type Props = {};

const LoginModal = (props: Props) => {
  const [form] = Form.useForm();
  const visible = useModalStore((state) => state.visible);
  const closeModal = useModalStore((state) => state.closeModal);

  const customTitle = (
    <div className={styles.customTitle}>Log in to Summarist</div>
  );

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Login values:", values);
    closeModal();
  };

  return (
    <div className={styles.modal__background}>
      <Modal
        title={customTitle}
        open={visible}
        onCancel={closeModal}
        footer={null}
        destroyOnClose={true}
        wrapClassName={styles.modal}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              className={styles.input__field}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              className={styles.inputField__password}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", backgroundColor: "#2bd97c" }}
              className={styles.login__btn}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginModal;
