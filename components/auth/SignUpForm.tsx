import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import Image from "next/image";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import styles from "..//../styles/modal.module.css";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useModalStore } from "../../src/store/store-client";
import SpinIcon from "../UI/SpinIcon";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { db } from "../../firebase";
import { createUserProfileDocument } from "../../src/utils/createUserProfileDocument";

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
  onFinish,
}) => {
  const [form] = Form.useForm();

  const [error, setError] = useState<string | null>(null);

  const closeModal = useModalStore((state) => state.closeModal);

  const [googleLoading, setGoogleLoading] = useState(false);

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setFormLoading(true);
      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;
      // Create user document in Firestore
      await createUserProfileDocument(user);

      onSuccess();
      onFinish();
      setError(null);
      setFormLoading(false);

      return user;

      // if error
    } catch (error) {
      setError(error.message);
      onFailure(error);
    }
  };
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google sign-in successful:", user);

      // add new doc with user's information to Firestore
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
        });
      }

      onSuccess();
      closeModal();
      setGoogleLoading(false);
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
              <span>
                {googleLoading ? <SpinIcon /> : "Sign up with Google"}
              </span>
            </div>
          </Button>
        </Form.Item>
        <div className={styles.textContainer}>
          <span className={styles.customText}>or</span>
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
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
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[{ required: true, message: "Please confirm your password!" }]}
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
            <span>{formLoading ? <SpinIcon /> : "Sign up"}</span>
          </Button>
        </Form.Item>
      </Form>

      <div className={styles.already__haveAccount}>
        <button className={styles.createAccount} onClick={toggleLogin}>
          Already have an account?
        </button>
      </div>
    </>
  );
};

export default SignUpForm;
