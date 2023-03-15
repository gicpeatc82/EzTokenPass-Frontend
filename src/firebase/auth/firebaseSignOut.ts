import { getAuth, signOut } from 'firebase/auth';
import getFirebase from '..';

export default async function firebaseSignOut() {
  const app = getFirebase();
  const auth = getAuth(app);

  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}
