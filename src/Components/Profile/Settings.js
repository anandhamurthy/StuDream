import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import { storage } from "../Firebase/firebase";

import "./Profile.css";

function Settings(props) {
	const [cupboard, setCupboard] = useState(false);
	const [profileImage, setProfileImage] = useState([]);
	const [inspiration, setInspiration] = useState([]);

	const [ins1Image, setIns1Image] = useState([]);
	const [ins2Image, setIns2Image] = useState([]);
	const [ins3Image, setIns3Image] = useState([]);
	const [ins4Image, setIns4Image] = useState([]);

	const [uploadShow, setUploadShow] = useState(null);
	const [submitShow, setSubmitShow] = useState(null);

	const [uploadIns1Show, setUploadIns1Show] = useState(null);
	const [submitIns1Show, setSubmitIns1Show] = useState(null);

	const [uploadIns2Show, setUploadIns2Show] = useState(null);
	const [submitIns2Show, setSubmitIns2Show] = useState(null);

	const [uploadIns3Show, setUploadIns3Show] = useState(null);
	const [submitIns3Show, setSubmitIns3Show] = useState(null);

	const [uploadIns4Show, setUploadIns4Show] = useState(null);
	const [submitIns4Show, setSubmitIns4Show] = useState(null);

	const [url, setUrl] = useState([]);

	const [progressBar, setProgressBar] = useState(null);
	const [progress, setProgress] = useState(0);

	const [myQuote, setMyQuote] = useState("");
	const [myBrain, setMyBrain] = useState([]);
	const [myBrainName1, setBrainName1] = useState("");
	const [myBrainName2, setBrainName2] = useState("");
	const [myBrainName3, setBrainName3] = useState("");
	const [myBrainName4, setBrainName4] = useState("");
	const [myBrainName5, setBrainName5] = useState("");
	const [myBrainName6, setBrainName6] = useState("");
	const [myBrainName7, setBrainName7] = useState("");

	const onSubmitQuote = async (event) => {
		event.preventDefault();
		var user = getUser();
		console.log(user.uid);
		return db
			.collection("Users")
			.doc(user.uid)
			.update({
				quote: myQuote,
			})
			.then(() => {
				console.log("Document successfully written!");
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	};

	const onSubmitBrain1 = async (event) => {
		event.preventDefault();

		if (myBrainName1 === "") {
			alert("Enter Brain 1 Name..");
			return;
		}
		var user = getUser();
		console.log(user.uid);
		myBrain[0] = myBrainName1;
		return db
			.collection("Users")
			.doc(user.uid)
			.update({
				brain_names: myBrain,
			})
			.then(() => {
				console.log("Document successfully written!");
				alert("Successfully Updated!");
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	};

	const onSubmitBrain2 = async (event) => {
		event.preventDefault();

		if (myBrainName2 === "") {
			alert("Enter Brain 2 Name..");
			return;
		}
		var user = getUser();
		console.log(user.uid);
		myBrain[1] = myBrainName2;
		return db
			.collection("Users")
			.doc(user.uid)
			.update({
				brain_names: myBrain,
			})
			.then(() => {
				console.log("Document successfully written!");
				alert("Successfully Updated!");
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	};

	const onSubmitBrain3 = async (event) => {
		event.preventDefault();

		if (myBrainName3 === "") {
			alert("Enter Brain 3 Name..");
			return;
		}
		var user = getUser();
		console.log(user.uid);
		myBrain[2] = myBrainName3;
		return db
			.collection("Users")
			.doc(user.uid)
			.update({
				brain_names: myBrain,
			})
			.then(() => {
				console.log("Document successfully written!");
				alert("Successfully Updated!");
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	};

	const onSubmitBrain4 = async (event) => {
		event.preventDefault();

		if (myBrainName4 === "") {
			alert("Enter Brain 4 Name..");
			return;
		}
		var user = getUser();
		console.log(user.uid);
		myBrain[3] = myBrainName4;
		return db
			.collection("Users")
			.doc(user.uid)
			.update({
				brain_names: myBrain,
			})
			.then(() => {
				console.log("Document successfully written!");
				alert("Successfully Updated!");
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	};

	const onSubmitBrain5 = async (event) => {
		event.preventDefault();

		if (myBrainName5 === "") {
			alert("Enter Brain 5 Name..");
			return;
		}
		var user = getUser();
		console.log(user.uid);
		myBrain[4] = myBrainName5;
		return db
			.collection("Users")
			.doc(user.uid)
			.update({
				brain_names: myBrain,
			})
			.then(() => {
				console.log("Document successfully written!");
				alert("Successfully Updated!");
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	};

	const onSubmitBrain6 = async (event) => {
		event.preventDefault();

		if (myBrainName6 === "") {
			alert("Enter Brain 6 Name..");
			return;
		}
		var user = getUser();
		console.log(user.uid);
		myBrain[5] = myBrainName6;
		return db
			.collection("Users")
			.doc(user.uid)
			.update({
				brain_names: myBrain,
			})
			.then(() => {
				console.log("Document successfully written!");
				alert("Successfully Updated!");
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	};

	const onSubmitBrain7 = async (event) => {
		event.preventDefault();

		if (myBrainName7 === "") {
			alert("Enter Brain 7 Name..");
			return;
		}
		var user = getUser();
		console.log(user.uid);
		myBrain[6] = myBrainName7;
		return db
			.collection("Users")
			.doc(user.uid)
			.update({
				brain_names: myBrain,
			})
			.then(() => {
				console.log("Document successfully written!");
				alert("Successfully Updated!");
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	};
	useEffect(() => {
		const uid = getUser().uid;
		return db
			.collection("Users")
			.doc(uid)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setCupboard(doc.data().isCupboard);
					setMyBrain(doc.data().brain_names);
					setMyQuote(doc.data().quote);
					setInspiration(doc.data()["inspiration_images"]);
				} else {
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	}, []);

	const lockCupboard = () => {
		setCupboard(!cupboard);
		const uid = getUser().uid;
		return db
			.collection("Users")
			.doc(uid)
			.update({
				isCupboard: cupboard,
			})
			.then(() => {
				console.log("Document successfully updated!");
			})
			.catch((error) => {
				console.error("Error updating document: ", error);
			});
	};

	const handleProfileImageChange = (event) => {
		setUploadShow(true);
		setProfileImage([event.target.files[0]]);
	};

	const handleIns1Change = (event) => {
		setUploadIns1Show(true);
		setIns1Image([event.target.files[0]]);
	};

	const handleIns2Change = (event) => {
		setUploadIns2Show(true);
		setIns2Image([event.target.files[0]]);
	};

	const handleIns3Change = (event) => {
		setUploadIns3Show(true);
		setIns3Image([event.target.files[0]]);
	};

	const handleIns4Change = (event) => {
		setUploadIns4Show(true);
		setIns4Image([event.target.files[0]]);
	};

	const handleUpload = () => {
		setProgressBar(true);
		const promises = [];
		profileImage.map((item) => {
			const uploadTask = storage
				.ref(`Profile Images/${item.name}`)
				.put(item);
			promises.push(uploadTask);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);
				},
				(error) => {
					console.log(error);
				},
				async () => {
					await storage
						.ref("Profile Images")
						.child(item.name)
						.getDownloadURL()
						.then((urls) => {
							setUrl((prevState) => [...prevState, urls]);
						});
				}
			);
		});

		Promise.all(promises)
			.then(() => {
				alert("Uploaded Successfully");
				setUploadShow(null);
				setSubmitShow(true);
			})
			.catch((err) => console.log(err));
	};

	const handleIns1Upload = () => {
		setProgressBar(true);
		const promises = [];
		ins1Image.map((item) => {
			const uploadTask = storage
				.ref(`Inspiration Images/${item.name}`)
				.put(item);
			promises.push(uploadTask);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);
				},
				(error) => {
					console.log(error);
				},
				async () => {
					await storage
						.ref("Inspiration Images")
						.child(item.name)
						.getDownloadURL()
						.then((urls) => {
							setUrl((prevState) => [...prevState, urls]);
						});
				}
			);
		});

		Promise.all(promises)
			.then(() => {
				alert("Uploaded Successfully");
				setUploadIns1Show(null);
				setSubmitIns1Show(true);
			})
			.catch((err) => console.log(err));
	};

	const handleIns2Upload = () => {
		setProgressBar(true);
		const promises = [];
		ins2Image.map((item) => {
			const uploadTask = storage
				.ref(`Inspiration Images/${item.name}`)
				.put(item);
			promises.push(uploadTask);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);
				},
				(error) => {
					console.log(error);
				},
				async () => {
					await storage
						.ref("Inspiration Images")
						.child(item.name)
						.getDownloadURL()
						.then((urls) => {
							setUrl((prevState) => [...prevState, urls]);
						});
				}
			);
		});

		Promise.all(promises)
			.then(() => {
				alert("Uploaded Successfully");
				setUploadIns2Show(null);
				setSubmitIns2Show(true);
			})
			.catch((err) => console.log(err));
	};

	const handleIns3Upload = () => {
		setProgressBar(true);
		const promises = [];
		ins3Image.map((item) => {
			const uploadTask = storage
				.ref(`Inspiration Images/${item.name}`)
				.put(item);
			promises.push(uploadTask);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);
				},
				(error) => {
					console.log(error);
				},
				async () => {
					await storage
						.ref("Inspiration Images")
						.child(item.name)
						.getDownloadURL()
						.then((urls) => {
							setUrl((prevState) => [...prevState, urls]);
						});
				}
			);
		});

		Promise.all(promises)
			.then(() => {
				alert("Uploaded Successfully");
				setUploadIns3Show(null);
				setSubmitIns3Show(true);
			})
			.catch((err) => console.log(err));
	};

	const handleIns4Upload = () => {
		setProgressBar(true);
		const promises = [];
		ins4Image.map((item) => {
			const uploadTask = storage
				.ref(`Inspiration Images/${item.name}`)
				.put(item);
			promises.push(uploadTask);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);
				},
				(error) => {
					console.log(error);
				},
				async () => {
					await storage
						.ref("Inspiration Images")
						.child(item.name)
						.getDownloadURL()
						.then((urls) => {
							setUrl((prevState) => [...prevState, urls]);
						});
				}
			);
		});

		Promise.all(promises)
			.then(() => {
				alert("Uploaded Successfully");
				setUploadIns4Show(null);
				setSubmitIns4Show(true);
			})
			.catch((err) => console.log(err));
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		if (url.length === 0) {
			alert("Add Image File..");
			return;
		}

		const submitButton = document.querySelector(".add_profile_image");

		submitButton.disabled = true;
		setProgressBar(null);

		return db
			.collection("Users")
			.doc(props.user_id)
			.update({
				profile_image: url[0],
			})
			.then(() => {
				console.log("Document successfully written!");
				setUrl([]);
				submitButton.disabled = false;
				setSubmitShow(null);
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
				setSubmitShow(null);
			});
	};

	const onIns1Submit = async (event) => {
		event.preventDefault();

		if (url.length === 0) {
			alert("Add Image File..");
			return;
		}

		const submitButton = document.querySelector(".add_ins1_image");

		submitButton.disabled = true;
		setProgressBar(null);
		inspiration[0] = url[0];

		return db
			.collection("Users")
			.doc(props.user_id)
			.update({
				inspiration_images: inspiration,
			})
			.then(() => {
				console.log("Document successfully written!");
				setUrl([]);
				submitButton.disabled = false;
				setSubmitIns1Show(null);
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
				setSubmitIns1Show(null);
			});
	};

	const onIns2Submit = async (event) => {
		event.preventDefault();

		if (url.length === 0) {
			alert("Add Image File..");
			return;
		}

		const submitButton = document.querySelector(".add_ins2_image");

		submitButton.disabled = true;
		setProgressBar(null);
		inspiration[1] = url[0];

		return db
			.collection("Users")
			.doc(props.user_id)
			.update({
				inspiration_images: inspiration,
			})
			.then(() => {
				console.log("Document successfully written!");
				setUrl([]);
				submitButton.disabled = false;
				setSubmitIns2Show(null);
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
				setSubmitIns2Show(null);
			});
	};

	const onIns3Submit = async (event) => {
		event.preventDefault();

		if (url.length === 0) {
			alert("Add Image File..");
			return;
		}

		const submitButton = document.querySelector(".add_ins3_image");

		submitButton.disabled = true;
		setProgressBar(null);
		inspiration[2] = url[0];

		return db
			.collection("Users")
			.doc(props.user_id)
			.update({
				inspiration_images: inspiration,
			})
			.then(() => {
				console.log("Document successfully written!");
				setUrl([]);
				submitButton.disabled = false;
				setSubmitIns3Show(null);
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
				setSubmitIns3Show(null);
			});
	};

	const onIns4Submit = async (event) => {
		event.preventDefault();

		if (url.length === 0) {
			alert("Add Image File..");
			return;
		}

		const submitButton = document.querySelector(".add_ins4_image");

		submitButton.disabled = true;
		setProgressBar(null);
		inspiration[3] = url[0];

		return db
			.collection("Users")
			.doc(props.user_id)
			.update({
				inspiration_images: inspiration,
			})
			.then(() => {
				console.log("Document successfully written!");
				setUrl([]);
				submitButton.disabled = false;
				setSubmitIns4Show(null);
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
				setSubmitIns4Show(null);
			});
	};

	function logout() {
		localStorage.setItem("isUser", false);
		window.location = "/";
	}

	return (
		<div className="border-0 p-2">
			<div className="card-body">
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">Inspiration 1</h6>
					</div>
					<div className="col-sm-3 text-secondary">
						Change my inspiration 1 image!
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="file"
							accept="image/png, image/jpeg"
							className="shadow-sm rounded-right border-0 form-control"
							onChange={handleIns1Change}
						/>
					</div>
				</div>
				{uploadIns1Show || submitIns1Show ? (
					<div className="row my-5">
						<div className="col-sm-6 text-secondary">
							{progressBar ? (
								<progress value={progress} max="100" />
							) : (
								""
							)}
						</div>
						<div className="col-sm-3">
							{uploadIns1Show ? (
								<button
									className="btn btn-primary btn-sm"
									onClick={handleIns1Upload}
								>
									Upload
								</button>
							) : (
								""
							)}
						</div>

						<div className="col-sm-3">
							{submitIns1Show ? (
								<button
									className="add_ins1_image btn btn-primary btn-sm"
									onClick={onIns1Submit}
								>
									Submit
								</button>
							) : (
								""
							)}
						</div>
					</div>
				) : (
					""
				)}
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">Inspiration 2</h6>
					</div>
					<div className="col-sm-3 text-secondary">
						Change my inspiration 2 image!
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="file"
							accept="image/png, image/jpeg"
							className="shadow-sm rounded-right border-0 form-control"
							onChange={handleIns2Change}
						/>
					</div>
				</div>
				{uploadIns2Show || submitIns2Show ? (
					<div className="row my-5">
						<div className="col-sm-6 text-secondary">
							{progressBar ? (
								<progress value={progress} max="100" />
							) : (
								""
							)}
						</div>
						<div className="col-sm-3">
							{uploadIns2Show ? (
								<button
									className="btn btn-primary btn-sm"
									onClick={handleIns2Upload}
								>
									Upload
								</button>
							) : (
								""
							)}
						</div>

						<div className="col-sm-3">
							{submitIns2Show ? (
								<button
									className="add_ins2_image btn btn-primary btn-sm"
									onClick={onIns2Submit}
								>
									Submit
								</button>
							) : (
								""
							)}
						</div>
					</div>
				) : (
					""
				)}
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">Inspiration 3</h6>
					</div>
					<div className="col-sm-3 text-secondary">
						Change my inspiration 3 image!
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="file"
							accept="image/png, image/jpeg"
							className="shadow-sm rounded-right border-0 form-control"
							onChange={handleIns3Change}
						/>
					</div>
				</div>
				{uploadIns3Show || submitIns3Show ? (
					<div className="row my-5">
						<div className="col-sm-6 text-secondary">
							{progressBar ? (
								<progress value={progress} max="100" />
							) : (
								""
							)}
						</div>
						<div className="col-sm-3">
							{uploadIns3Show ? (
								<button
									className="btn btn-primary btn-sm"
									onClick={handleIns3Upload}
								>
									Upload
								</button>
							) : (
								""
							)}
						</div>

						<div className="col-sm-3">
							{submitIns3Show ? (
								<button
									className="add_ins3_image btn btn-primary btn-sm"
									onClick={onIns3Submit}
								>
									Submit
								</button>
							) : (
								""
							)}
						</div>
					</div>
				) : (
					""
				)}
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">Inspiration 4</h6>
					</div>
					<div className="col-sm-3 text-secondary">
						Change my inspiration 4 image!
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="file"
							accept="image/png, image/jpeg"
							className="shadow-sm rounded-right border-0 form-control"
							onChange={handleIns4Change}
						/>
					</div>
				</div>
				{uploadIns4Show || submitIns4Show ? (
					<div className="row my-5">
						<div className="col-sm-6 text-secondary">
							{progressBar ? (
								<progress value={progress} max="100" />
							) : (
								""
							)}
						</div>
						<div className="col-sm-3">
							{uploadIns4Show ? (
								<button
									className="btn btn-primary btn-sm"
									onClick={handleIns4Upload}
								>
									Upload
								</button>
							) : (
								""
							)}
						</div>

						<div className="col-sm-3">
							{submitIns4Show ? (
								<button
									className="add_ins4_image btn btn-primary btn-sm"
									onClick={onIns4Submit}
								>
									Submit
								</button>
							) : (
								""
							)}
						</div>
					</div>
				) : (
					""
				)}
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">My Quote</h6>
					</div>
					<div className="col-sm-6 text-secondary">
						<textarea
							type="text"
							rows="3"
							className="shadow-sm rounded-right border-0 form-control"
							placeholder="Todo.."
							value={myQuote}
							onChange={(event) => setMyQuote(event.target.value)}
						/>
					</div>
					<div className="col-sm-3 text-secondary">
						<button
							className="update_quote btn btn-primary btn-sm"
							onClick={onSubmitQuote}
						>
							Update
						</button>
					</div>
				</div>
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">{myBrain[0]}</h6>
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="text"
							className="shadow-sm rounded-right border-0 form-control"
							placeholder="Change the brain 1 name.."
							value={myBrainName1}
							onChange={(event) =>
								setBrainName1(event.target.value)
							}
						/>
					</div>
					<div className="col-sm-3 text-secondary">
						<button
							className="btn btn-primary btn-sm"
							onClick={onSubmitBrain1}
						>
							Update
						</button>
					</div>
				</div>
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">{myBrain[1]}</h6>
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="text"
							className="shadow-sm rounded-right border-0 form-control"
							placeholder="Change the brain 2 name.."
							onChange={(event) =>
								setBrainName2(event.target.value)
							}
						/>
					</div>
					<div className="col-sm-3 text-secondary">
						<button
							className="btn btn-primary btn-sm"
							onClick={onSubmitBrain2}
						>
							Update
						</button>
					</div>
				</div>
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">{myBrain[2]}</h6>
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="text"
							className="shadow-sm rounded-right border-0 form-control"
							placeholder="Change the brain 3 name.."
							onChange={(event) =>
								setBrainName3(event.target.value)
							}
						/>
					</div>
					<div className="col-sm-3 text-secondary">
						<button
							className="btn btn-primary btn-sm"
							onClick={onSubmitBrain3}
						>
							Update
						</button>
					</div>
				</div>
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">{myBrain[3]}</h6>
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="text"
							className="shadow-sm rounded-right border-0 form-control"
							placeholder="Change the brain 4 name.."
							onChange={(event) =>
								setBrainName4(event.target.value)
							}
						/>
					</div>
					<div className="col-sm-3 text-secondary">
						<button
							className="btn btn-primary btn-sm"
							onClick={onSubmitBrain4}
						>
							Update
						</button>
					</div>
				</div>
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">{myBrain[4]}</h6>
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="text"
							className="shadow-sm rounded-right border-0 form-control"
							placeholder="Change the brain 5 name.."
							onChange={(event) =>
								setBrainName5(event.target.value)
							}
						/>
					</div>
					<div className="col-sm-3 text-secondary">
						<button
							className="btn btn-primary btn-sm"
							onClick={onSubmitBrain5}
						>
							Update
						</button>
					</div>
				</div>
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">{myBrain[5]}</h6>
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="text"
							className="shadow-sm rounded-right border-0 form-control"
							placeholder="Change the brain 6 name.."
							onChange={(event) =>
								setBrainName6(event.target.value)
							}
						/>
					</div>
					<div className="col-sm-3 text-secondary">
						<button
							className="btn btn-primary btn-sm"
							onClick={onSubmitBrain6}
						>
							Update
						</button>
					</div>
				</div>
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">{myBrain[6]}</h6>
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="text"
							className="shadow-sm rounded-right border-0 form-control"
							placeholder="Change the brain 7 name.."
							onChange={(event) =>
								setBrainName7(event.target.value)
							}
						/>
					</div>
					<div className="col-sm-3 text-secondary">
						<button
							className="btn btn-primary btn-sm"
							onClick={onSubmitBrain7}
						>
							Update
						</button>
					</div>
				</div>
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">Profile Image</h6>
					</div>
					<div className="col-sm-3 text-secondary">
						Change my profile image!
					</div>
					<div className="col-sm-6 text-secondary">
						<input
							type="file"
							accept="image/png, image/jpeg"
							className="shadow-sm rounded-right border-0 form-control"
							onChange={handleProfileImageChange}
						/>
					</div>
				</div>
				{uploadShow || submitShow ? (
					<div className="row my-5">
						<div className="col-sm-6 text-secondary">
							{progressBar ? (
								<progress value={progress} max="100" />
							) : (
								""
							)}
						</div>
						<div className="col-sm-3">
							{uploadShow ? (
								<button
									className="btn btn-primary btn-sm"
									onClick={handleUpload}
								>
									Upload
								</button>
							) : (
								""
							)}
						</div>

						<div className="col-sm-3">
							{submitShow ? (
								<button
									className="add_profile_image btn btn-primary btn-sm"
									onClick={onSubmit}
								>
									Submit
								</button>
							) : (
								""
							)}
						</div>
					</div>
				) : (
					""
				)}
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">Lock my Cupboard</h6>
					</div>
					<div className="col-sm-6 text-secondary">
						If on will not be visible to your friends
					</div>

					<div className="col-sm-3 text-secondary">
						{cupboard ? (
							<button
								className="btn btn-primary btn-sm"
								onClick={lockCupboard}
							>
								ON
							</button>
						) : (
							<button
								className="btn btn-primary btn-sm"
								onClick={lockCupboard}
							>
								OFF
							</button>
						)}
					</div>
				</div>
				<hr></hr>
				<div className="row">
					<div className="col-sm-3">
						<h6 className="mb-0">Logout</h6>
					</div>
					<div className="col-sm-6 text-secondary">
						Lock your room and go out!
					</div>
					<div className="col-sm-3 text-secondary">
						<button
							className="btn btn-primary btn-sm"
							onClick={logout}
						>
							Logout
						</button>
					</div>
				</div>
				<hr></hr>
			</div>
		</div>
	);
}

export default Settings;
