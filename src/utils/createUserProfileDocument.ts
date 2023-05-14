import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface User {
  uid: string;
  email: string;
}

export const createUserProfileDocument = async (
  user: User,
  additionalData?: object
) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  // fetch the document and check if it exists
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        email,
        createdAt,
        ...additionalData,
      });
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }

  const getUserDocument = async (uid: string) => {
    if (!uid) return null;
    try {
      const userDocument = await getDoc(doc(db, "users", uid));
      return userDocument;
    } catch (error) {
      console.error("Error fetching user document: ", error);
    }
  };
  return getUserDocument(user.uid);
};
