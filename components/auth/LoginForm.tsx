import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "..//../modal.module.css";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../firebase";
import { useModalStore } from "../../src/store/store-client";

interface LoginFormProps {
  children?: React.ReactNode;
  onFinish: (values?: any) => void;
  onSuccess: () => void;
  onFailure: (error?: any) => void;
  toggleSignUp: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onFailure,
  toggleSignUp,
  onFinish,
}) => {
  const [form] = Form.useForm();

  const [error, setError] = useState<string | null>(null);

  const closeModal = useModalStore((state) => state.closeModal);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      // Perform async request for login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      onSuccess();
      onFinish();
      setError(null);

      return user;
    } catch (error) {
      setError(error.message);
      onFailure(error);
      console.log("Error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google sign-in successful:", user);

      onSuccess();
      closeModal();
    } catch (error) {
      console.log("Error during Google sign-in:", error);
    }
  };

  return (
    <>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <Form
        className={styles.formContainer}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
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
                left: -10,
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
          onClick={handleGoogleSignIn}
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
                top: "0px",
              }}
            />
            <h3>Log in with Google</h3>
          </div>
        </Button>
        <div className={styles.forgot__pwdContainer}>
          <span>Forgot your password?</span>
          <button className={styles.createAccount} onClick={toggleSignUp}>
            Don't have an account?
          </button>
        </div>
      </Form.Item>
    </>
  );
};

export default LoginForm;
