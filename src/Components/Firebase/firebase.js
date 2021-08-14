import firebase from "firebase";

const config = {
	apiKey: "AIzaSyCclDkMhDKwgrUrtaLv-HvxRFI_qdudOO8",
	authDomain: "studream-a9bb7.firebaseapp.com",
	projectId: "studream-a9bb7",
	storageBucket: "studream-a9bb7.appspot.com",
	messagingSenderId: "400481620374",
	appId: "1:400481620374:web:dabcbcfb2cdbf573438db7",
	measurementId: "G-9V66YVMPQ5",
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();
