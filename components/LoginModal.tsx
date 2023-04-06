import React from "react";
import { Button, Modal, Form, Input, ConfigProvider } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useModalStore } from "../pages/store";
import styles from "../modal.module.css";
import Image from "next/image";
type Props = {};

const LoginModal = (props: Props) => {
  const [form] = Form.useForm();
  const visible = useModalStore((state) => state.visible);
  const closeModal = useModalStore((state) => state.closeModal);

  const customTitle = (
    <div className={styles.customTitle}>Log in to Summarist</div>
  );

  const handleSubmit = (values: { email: string; password: string }) => {
    closeModal();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = form.getFieldsValue();
    handleSubmit(values);
  };

  return (
    <Modal
      title={customTitle}
      open={visible}
      onCancel={closeModal}
      footer={null}
      destroyOnClose={true}
      wrapClassName={styles.modalContainer}
    >
      <Form
        className={styles.formContainer}
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
      >
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
      <div className={styles.textContainer}>
        <span className={styles.customText}>or</span>
      </div>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", backgroundColor: "#2bd97c" }}
          className={styles.guest__btn}
        >
          <div className={styles.guest__btnContainer}>
            <UserOutlined
              style={{
                fontSize: "22px",
                position: "relative",
                right: "10px",
              }}
            />
            <h3>Log in as a Guest</h3>
          </div>
        </Button>
      </Form.Item>
      <div className={styles.textContainer}>
        <span className={styles.customText}>or</span>
      </div>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#2bd97c",
          }}
          className={styles.google__btn}
        >
          <div className={styles.google__iconContainer}>
            <Image
              alt=""
              src="/images/google.png"
              height={32}
              width={32}
              style={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                marginRight: "10px",
                position: "absolute",
                left: "1px",
                top: "1px",
              }}
            />
            <h3>Log in with Google</h3>
          </div>
        </Button>
        <div className={styles.forgot__pwdContainer}>
          <span>Forgot your password?</span>
          <span>Don't have an account?</span>
        </div>
      </Form.Item>
    </Modal>
  );
};

export default LoginModal;
