import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import getFirebase from '..';

export default async function facebookAuth() {
  const app = getFirebase();
  const auth = getAuth(app);
  const providerFace = new FacebookAuthProvider();

  const result = await signInWithPopup(auth, providerFace);
  const credential = FacebookAuthProvider.credentialFromResult(result);
  if (!credential) {
    throw new Error('credential is null');
  }
  const user = result.user;
  return user;
}
