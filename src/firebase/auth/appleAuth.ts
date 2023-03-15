import { getAuth, signInWithPopup, OAuthProvider } from 'firebase/auth';
import getFirebase from '..';

export default async function appleAuth() {
  const app = getFirebase();
  const auth = getAuth(app);
  const provider = new OAuthProvider('apple.com');

  const result = await signInWithPopup(auth, provider);
  const credential = OAuthProvider.credentialFromResult(result);
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
