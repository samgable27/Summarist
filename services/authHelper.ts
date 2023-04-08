import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("logged in user", user);

    return user;
  } catch (error) {
    console.error("error signing in", error);

    return null;
  }
};
