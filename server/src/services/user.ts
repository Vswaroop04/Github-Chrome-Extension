// src/services/userService.ts
import {
	collection,
	doc,
	setDoc,
	getDoc,
	updateDoc,
	deleteDoc,
	getDocs,
} from 'firebase/firestore';
import db from '@/config/db';
import { User } from '@/models/';

const usersCollection = collection(db, 'users');

export const addUser = async (user: User) => {
	const userDoc = doc(usersCollection);
	await setDoc(userDoc, user);
	return userDoc.id;
};

export const getUser = async (id: string): Promise<User | null> => {
	const userDoc = await getDoc(doc(usersCollection, id));
	if (userDoc.exists()) {
		return userDoc.data() as User;
	} else {
		return null;
	}
};

export const updateUser = async (id: string, user: Partial<User>) => {
	const userDoc = doc(usersCollection, id);
	await updateDoc(userDoc, user);
};

export const deleteUser = async (id: string) => {
	const userDoc = doc(usersCollection, id);
	await deleteDoc(userDoc);
};

export const getAllUsers = async (): Promise<User[]> => {
	const querySnapshot = await getDocs(usersCollection);
	return querySnapshot.docs.map((doc) => doc.data() as User);
};
