import { db } from "./firebase";
import { getUser } from "./auth";

const userCollection = db.collection("Users");

export const createUser = (id, name, email, room_id) =>
	userCollection
		.doc(id)
		.set({
			name: name,
			user_id: id,
			email_id: email,
			room_id: room_id,
		})
		.then(() => {
			console.log("Document successfully written!");
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});

export const getInspirationImages = () => {
	const uid = getUser().uid;
	let images = [];
	db.collection("Users")
		.doc(uid)
		.get()
		.then((doc) => {
			if (doc.exists) {
				images.push(doc.data()["inspiration_images"]);
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		})
		.catch((error) => {
			console.log("Error getting document:", error);
		});
	return images;
};

export const getTodos = () => {
	const uid = getUser().uid;
	db.collection("Todo")
		.doc(uid)
		.collection("My Todo")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
			});
		});
};
