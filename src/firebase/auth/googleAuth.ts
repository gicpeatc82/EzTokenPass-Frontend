import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import getFirebase from '..';

export default async function googleAuth() {
  const app = getFirebase();
  const auth = getAuth(app);
  const providerGoogle = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, providerGoogle);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (!credential) {
    throw new Error('credential is null');
  }
  const token = credential.accessToken;
  if (!token) {
    throw new Error('token is null');
  }
  const user = result.user;
  return user;
}
