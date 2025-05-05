import {FirebaseAuthTypes, getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {FirestoreExpenseData} from '../types/ExpenseTypes.ts';
import {User, LoginData, RegisterData} from '../types/User.ts';
import {transformExpenseData} from '../utils/transformExpensesData.ts';

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
  return new Promise<FirebaseAuthTypes.User | null>(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe(); // Unsubscribe immediately after getting the user
      resolve(user);
    });
  });
};

export const createExpenseAPI = async ({
  uid,
  title,
  amount,
  category,
  date,
}: FirestoreExpenseData): Promise<FirestoreExpenseData> => {
  const docRef = await firestore()
    .collection('expenses')
    .add({uid, title, amount, category, date});
  const docSnapshot = await docRef.get();
  const data = docSnapshot.data();
  return transformExpenseData(docSnapshot.id, data);
};

export const readExpensesAPI = async (
  uid: User['uid'],
): Promise<FirestoreExpenseData[]> => {
  const snapshot = await firestore()
    .collection('expenses')
    .where('uid', '==', uid)
    .get();
  return snapshot.docs.map(doc => transformExpenseData(doc.id, doc.data()));
};

export const updateExpenseAPI = async ({
  id,
  title,
  amount,
  category,
  date,
}: FirestoreExpenseData) => {
  if (id) {
    await firestore()
      .collection('expenses')
      .doc(id)
      .update({title, amount, category, date});
    const docSnapshot = await firestore().collection('expenses').doc(id).get();
    const updatedData = docSnapshot.data();
    return transformExpenseData(docSnapshot.id, updatedData);
  }
};

export const deleteExpenseAPI = async (id: string) => {
  await firestore().collection('expenses').doc(id).delete();
};
