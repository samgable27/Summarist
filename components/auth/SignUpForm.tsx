import React from "react";
import { Form, Input, Button } from "antd";
import Image from "next/image";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import styles from "..//../modal.module.css";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useModalStore } from "../../pages/store";

interface SignUpFormProps {
  children?: React.ReactNode;
  onFinish: (values?: any) => void;
  onSuccess: () => void;
  onFailure: (error?: any) => void;
  toggleLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSuccess,
  onFailure,
  toggleLogin,
}) => {
  const [form] = Form.useForm();
  const closeModal = useModalStore((state) => state.closeModal);

  const handleSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;
      onSuccess();
      return user;

      // if error
    } catch (error) {
      onFailure(error);
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
      <Form
        className={styles.formContainer}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
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
                  top: "1px",
                }}
              />
              <h3>Sign up with Google</h3>
            </div>
          </Button>
        </Form.Item>
        <div className={styles.textContainer}>
          <span className={styles.customText}>or</span>
        </div>
        <Form.Item
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
            Sign up
          </Button>
        </Form.Item>
      </Form>

      <div className={styles.forgot__pwdContainer}>
        <span onClick={toggleLogin}>Already have an account?</span>
      </div>
    </>
  );
};

export default SignUpForm;
