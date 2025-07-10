
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const TASKS_COLLECTION = "tasks";

export const createTask = async (task) => {
  return await addDoc(collection(db, TASKS_COLLECTION), task);
};

export const getTasks = async () => {
  const snapshot = await getDocs(collection(db, TASKS_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateTask = async (id, task) => {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  return await updateDoc(taskRef, task);
};

export const deleteTask = async (id) => {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  return await deleteDoc(taskRef);
};
