import React, { useState } from "react";
import { Modal, Form } from "antd";
import styles from "..//../styles/modal.module.css";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useRouter } from "next/router";
import { useModalStore } from "../../src/store/store-client";

interface LoginModalProps {
  children?: React.ReactNode;
}

const LoginModal: React.FC<LoginModalProps> = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const visible = useModalStore((state) => state.visible);
  const closeModal = useModalStore((state) => state.closeModal);
  const router = useRouter();

  const logInTitle = (
    <div className={styles.loginTitle}>Log in to Summarist</div>
  );

  const signUpTitle = (
    <div className={styles.signupTitle}>Sign up to Summarist</div>
  );

  const toggleSignUp = () => {
    setIsSignedUp(!isSignedUp);
  };

  const toggleLogin = () => {
    setIsSignedUp(false);
  };

  const handleFormSubmit = (values?: any) => {
    console.log("Form values", values);

    closeModal();
  };

  const onLoginSuccess = () => {
    router.push("/for-you");

    closeModal();
  };

  const onLoginFailure = (error: boolean) => (
    <div>
      <p>There was an error logging in.</p>
    </div>
  );

  const onSignUpSuccess = () => {
    router.push("/for-you");

    closeModal();
  };

  const signUpFailure = (error: boolean) => (
    <p>An error occurred while signing up.</p>
  );

  return (
    <div>
      <Modal
        title={isSignedUp ? signUpTitle : logInTitle}
        open={visible}
        onCancel={closeModal}
        footer={null}
        destroyOnClose={true}
        wrapClassName={styles.modalContainer}
        width={400}
      >
        {isSignedUp ? (
          <SignUpForm
            onSuccess={onSignUpSuccess}
            onFailure={signUpFailure}
            onFinish={handleFormSubmit}
            toggleLogin={toggleLogin}
          />
        ) : (
          <LoginForm
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            onFinish={handleFormSubmit}
            toggleSignUp={toggleSignUp}
          />
        )}
      </Modal>
    </div>
  );
};

export default LoginModal;
