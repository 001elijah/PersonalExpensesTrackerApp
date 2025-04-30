import {FirebaseAuthTypes,getAuth} from '@react-native-firebase/auth';

import {LoginData, RegisterData} from '../types/User.ts';

const auth = getAuth();

export const registerAPI = async ({
  displayName,
  email,
  password,
}: RegisterData) => {
  const {user} = await auth.createUserWithEmailAndPassword(email, password);
  await user.updateProfile({
    displayName,
  });
  return user;
};

export const loginAPI = async ({email, password}: LoginData) => {
  const {user} = await auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const logoutAPI = async () => await auth.signOut();

export const authStateChanged = (
  callback: (user: FirebaseAuthTypes.User | null) => void,
) => {
  return auth.onAuthStateChanged(callback);
};

export const getUserProfileAPI = () => {
  return new Promise<FirebaseAuthTypes.User | null>((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // Unsubscribe immediately after getting the user
      resolve(user);
    });
  });
};
