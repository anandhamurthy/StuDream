import React, { useState, useEffect } from "react";

import { storage } from "../Firebase/firebase";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";
import Empty from "../Empty/Empty";

import "./Cupboard.css";
import BookCard from "./BookCard";
import DocCard from "./DocCard";
import AlbumCard from "./AlbumCard";

function Cupboard(props) {
	const [error, setError] = useState(null);

	const [progressBar, setProgressBar] = useState(null);

	const [uploadBook, setUploadBook] = useState(null);
	const [uploadDoc, setUploadDoc] = useState(null);
	const [uploadAlbum, setUploadAlbum] = useState(null);

	const [book, setBook] = useState([]);
	const [doc, setDoc] = useState([]);
	const [album, setAlbum] = useState([]);

	const [myBook, setMyBook] = useState([]);
	const [myDoc, setMyDoc] = useState([]);
	const [myAlbum, setMyAlbum] = useState([]);

	const [urls, setUrls] = useState([]);
	const [name, setName] = useState("");
	const [date, setDate] = useState("");
	const [description, setDescription] = useState("");
	const [progress, setProgress] = useState(0);
	const [file_type, setFileType] = useState("Book");

	useEffect(() => {
		const uid = getUser().uid;
		return db
			.collection("Todo")
			.doc(props.user_id)
			.collection("My Books")
			.onSnapshot((snapshot) => {
				const bookItems = [];
				snapshot.forEach((doc) => {
					bookItems.push({ ...doc.data(), id: doc.id });
				});
				setMyBook(bookItems);
			});
	}, []);

	useEffect(() => {
		const uid = getUser().uid;
		return db
			.collection("Todo")
			.doc(props.user_id)
			.collection("My Docs")
			.onSnapshot((snapshot) => {
				const docItems = [];
				snapshot.forEach((doc) => {
					docItems.push({ ...doc.data(), id: doc.id });
				});
				setMyDoc(docItems);
			});
	}, []);

	useEffect(() => {
		const uid = getUser().uid;
		return db
			.collection("Todo")
			.doc(props.user_id)
			.collection("My Albums")
			.onSnapshot((snapshot) => {
				const albumItems = [];
				snapshot.forEach((doc) => {
					albumItems.push({ ...doc.data(), id: doc.id });
				});
				setMyAlbum(albumItems);
			});
	}, []);

	const handleBookChange = (event) => {
		setUploadBook(true);
		setBook([event.target.files[0]]);
	};

	const handleDocChange = (event) => {
		setUploadDoc(true);
		setDoc([event.target.files[0]]);
	};

	const handleAlbumChange = (event) => {
		for (let i = 0; i < event.target.files.length; i++) {
			const newImage = event.target.files[i];
			newImage["id"] = Math.random();
			setAlbum((prevState) => [...prevState, newImage]);
		}
		setUploadAlbum(true);
	};

	const handleBookUpload = () => {
		setProgressBar(true);
		const promises = [];
		book.map((book_item) => {
			const uploadTask = storage
				.ref(`Book/${book_item.name}`)
				.put(book_item);
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
						.ref("Book")
						.child(book_item.name)
						.getDownloadURL()
						.then((urls) => {
							setUrls((prevState) => [...prevState, urls]);
						});
				}
			);
		});

		Promise.all(promises)
			.then(() => {
				alert("Uploaded Successfully");
				setUploadBook(null);
			})
			.catch((err) => console.log(err));
	};

	const handleDocUpload = () => {
		const promises = [];
		setProgressBar(true);
		doc.map((doc_item) => {
			const uploadTask = storage
				.ref(`Doc/${doc_item.name}`)
				.put(doc_item);
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
						.ref("Doc")
						.child(doc_item.name)
						.getDownloadURL()
						.then((urls) => {
							setUrls((prevState) => [...prevState, urls]);
						});
				}
			);
		});

		Promise.all(promises)
			.then(() => {
				alert("Uploaded Successfully");
				setUploadDoc(null);
			})
			.catch((err) => console.log(err));
	};

	const handleAlbumUpload = () => {
		const promises = [];
		setProgressBar(true);
		album.map((album_item) => {
			const uploadTask = storage
				.ref(`image/${album_item.name}`)
				.put(album_item);
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
						.ref("image")
						.child(album_item.name)
						.getDownloadURL()
						.then((urls) => {
							setUrls((prevState) => [...prevState, urls]);
						});
				}
			);
		});

		Promise.all(promises)
			.then(() => {
				alert("Uploaded Successfully");
				setUploadAlbum(null);
			})
			.catch((err) => console.log(err));
	};

	const onBookSubmit = async (event) => {
		event.preventDefault();

		if (name === "") {
			setError("Enter name..");
			return;
		}

		if (description === "") {
			setError("Enter description..");
			return;
		}

		if (urls.length === 0) {
			setError("Attach Book..");
			return;
		}

		const submitButton = document.querySelector(".add_book");
		setProgressBar(null);
		submitButton.disabled = true;

		var user = getUser();
		console.log(user.uid);
		const key = db
			.collection("Todo")
			.doc(user.uid)
			.collection("My Books")
			.doc().id;
		return db
			.collection("Todo")
			.doc(user.uid)
			.collection("My Books")
			.doc(key)
			.set({
				name: name,
				description: description,
				book: urls,
				user_id: user.uid,
				book_id: key,
			})
			.then(() => {
				console.log("Document successfully written!");
				setName("");
				setDescription("");
				setUrls("");
				submitButton.disabled = false;
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
			});
	};

	const onDocSubmit = async (event) => {
		event.preventDefault();

		if (name === "") {
			setError("Enter Name..");
			return;
		}

		if (description === "") {
			setError("Enter Description..");
			return;
		}

		if (urls.length === 0) {
			setError("Attach Document..");
			return;
		}

		const submitButton = document.querySelector(".add_doc");
		setProgressBar(null);
		submitButton.disabled = true;

		var user = getUser();
		console.log(user.uid);
		const key = db
			.collection("Todo")
			.doc(user.uid)
			.collection("My Docs")
			.doc().id;
		return db
			.collection("Todo")
			.doc(user.uid)
			.collection("My Docs")
			.doc(key)
			.set({
				name: name,
				description: description,
				doc: urls,
				user_id: user.uid,
				doc_id: key,
			})
			.then(() => {
				console.log("Document successfully written!");
				setName("");
				setDescription("");
				setUrls("");
				submitButton.disabled = false;
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
			});
	};

	const onAlbumSubmit = async (event) => {
		event.preventDefault();

		if (name === "") {
			setError("Enter name");
			return;
		}

		if (description === "") {
			setError("Enter Description..");
			return;
		}

		if (date === "") {
			setError("Enter Date..");
			return;
		}

		if (urls.length === 0) {
			setError("Attach Images..");
			return;
		}

		const submitButton = document.querySelector(".add_album");
		setProgressBar(null);
		submitButton.disabled = true;

		var user = getUser();
		console.log(user.uid);
		const key = db
			.collection("Todo")
			.doc(user.uid)
			.collection("My Albums")
			.doc().id;
		return db
			.collection("Todo")
			.doc(user.uid)
			.collection("My Albums")
			.doc(key)
			.set({
				name: name,
				description: description,
				album: urls,
				user_id: user.uid,
				album_id: key,
			})
			.then(() => {
				console.log("Document successfully written!");
				setName("");
				setDescription("");
				setUrls("");
				submitButton.disabled = false;
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
			});
	};

	return props.friend_view ? (
		<div className="p-5 container-fluid">
			<div className="d-flex justify-content-start align-items-center">
				<i class="fas fa-door-closed"></i>
				<h3 className="m-2 text-dark">My Cupboard</h3>
			</div>

			<div className="row align-items-center">
				<div className="p-2 col-lg-6 order-lg-1 mt-5 mt-lg-0">
					<div className=" shadow border-0 card p-4">
						<div>
							<ul
								class="nav nav-tabs my-2"
								id="myTab"
								role="tablist"
							>
								<li class="nav-item" role="presentation">
									<button
										class="nav-link active"
										id="book-tab"
										data-bs-toggle="tab"
										data-bs-target="#book"
										type="button"
										role="tab"
										aria-controls="book"
										aria-selected="true"
									>
										Books
									</button>
								</li>
								<li class="nav-item" role="presentation">
									<button
										class="nav-link"
										id="document-tab"
										data-bs-toggle="tab"
										data-bs-target="#document"
										type="button"
										role="tab"
										aria-controls="document"
										aria-selected="false"
									>
										Documents
									</button>
								</li>
								<li class="nav-item" role="presentation">
									<button
										class="nav-link"
										id="album-tab"
										data-bs-toggle="tab"
										data-bs-target="#album"
										type="button"
										role="tab"
										aria-controls="album"
										aria-selected="false"
									>
										Albums
									</button>
								</li>
							</ul>
						</div>

						<div>
							<div class="tab-content" id="myTabContent">
								<div
									class="tab-pane fade show active"
									id="book"
									role="tabpanel"
									aria-labelledby="book-tab"
								>
									<div className="lefttab">
										<div className=" list-group">
											{myBook.length ? (
												myBook.map((book, index) => (
													<div>
														<BookCard
															item={book}
														></BookCard>
													</div>
												))
											) : (
												<div className="m-auto p-5 d-flex align-items-center justify-content-center">
													<Empty></Empty>
												</div>
											)}
										</div>
									</div>
								</div>
								<div
									class="tab-pane fade"
									id="document"
									role="tabpanel"
									aria-labelledby="document-tab"
								>
									<div className="lefttab">
										<div className=" list-group">
											{myDoc.length ? (
												myDoc.map((doc, index) => (
													<div>
														<DocCard
															item={doc}
														></DocCard>
													</div>
												))
											) : (
												<div className="m-auto p-5 d-flex align-items-center justify-content-center">
													<Empty></Empty>
												</div>
											)}
										</div>
									</div>
								</div>
								<div
									class="tab-pane fade"
									id="album"
									role="tabpanel"
									aria-labelledby="album-tab"
								>
									<div className="lefttab">
										<div className=" list-group">
											{myAlbum.length ? (
												myAlbum.map((album, index) => (
													<div>
														<AlbumCard
															item={album}
														></AlbumCard>
													</div>
												))
											) : (
												<div className="m-auto p-5 d-flex align-items-center justify-content-center">
													<Empty></Empty>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="p-2 d-md-block col-lg-6 order-lg-1">
					<div className=" shadow border-0 card p-4">
						<div className="card-body">
							<div>
								<h4 className="text-dark">Add Items</h4>
								<p className="my-2 text-dark">Add a item</p>

								{progressBar ? (
									<progress value={progress} max="100" />
								) : (
									""
								)}

								<div className="input-group mb-3">
									<span
										className="shadow rounded-left border-0 input-group-text bg-white"
										id="basic-addon1"
									>
										<i className="fas fa-project-diagram"></i>
									</span>
									<select
										className="custom-select shadow rounded-right border-0 form-control"
										id="priority"
										required
										value={file_type}
										onChange={(event) =>
											setFileType(event.target.value)
										}
									>
										<option value="Book">Books</option>
										<option value="Document">
											Documents
										</option>
										<option value="Album">Album</option>
									</select>
								</div>
								<div className="input-group mb-3">
									<span
										className="shadow rounded-left border-0 input-group-text bg-white"
										id="basic-addon1"
									>
										<i class="far fa-file"></i>
									</span>
									<input
										type="text"
										className="shadow rounded-right border-0 form-control"
										placeholder="Name"
										value={name}
										onChange={(event) =>
											setName(event.target.value)
										}
									/>
								</div>
								<div className="input-group mb-3">
									<span
										className="shadow rounded-left border-0 input-group-text bg-white"
										id="basic-addon1"
									>
										<i class="far fa-file"></i>
									</span>
									<input
										type="text"
										className="shadow rounded-right border-0 form-control"
										placeholder="Description"
										value={description}
										onChange={(event) =>
											setDescription(event.target.value)
										}
									/>
								</div>

								{(() => {
									if (file_type === "Book") {
										return (
											<div>
												<p>Add {file_type}s as PDF</p>
												<div className="input-group mb-3">
													<input
														type="file"
														accept=".pdf, .doc, .docx, .xcel, .ppt, .pptx"
														className="shadow rounded-right border-0 form-control"
														onChange={
															handleBookChange
														}
													/>
												</div>
											</div>
										);
									} else if (file_type === "Document") {
										return (
											<div>
												<p>
													Add {file_type}s as PDF |
													WORD | PPT | EXCEL{" "}
												</p>
												<div className="input-group mb-3">
													<input
														type="file"
														accept=".pdf, .doc, .docx, .xcel, .ppt, .pptx"
														className="shadow rounded-right border-0 form-control"
														onChange={
															handleDocChange
														}
													/>
												</div>
											</div>
										);
									} else {
										return (
											<div>
												<div className="input-group mb-3">
													<span
														className="shadow rounded-left border-0 input-group-text bg-white"
														id="basic-addon1"
													>
														<i class="far fa-file"></i>
													</span>
													<input
														type="datetime-local"
														className="shadow rounded-right border-0 form-control"
														placeholder="Date"
														onChange={(event) =>
															setDate(
																event.target
																	.value
															)
														}
													/>
												</div>
												<p>Add Image {file_type}</p>
												<div className="input-group mb-3">
													<input
														type="file"
														multiple
														accept="image/png, image/jpeg"
														className="shadow rounded-right border-0 form-control"
														onChange={
															handleAlbumChange
														}
													/>
												</div>
											</div>
										);
									}
								})()}

								{error}

								<div className="row">
									<div className="col-6">
										{book.length ||
										doc.length ||
										album.length
											? (() => {
													if (file_type === "Book") {
														return uploadBook ? (
															<button
																type="button"
																onClick={
																	handleBookUpload
																}
																className="shadow border-0 rounded-0 mx-2 btn btn-primary px-4"
															>
																Upload
															</button>
														) : (
															""
														);
													} else if (
														file_type === "Document"
													) {
														return uploadDoc ? (
															<button
																type="button"
																onClick={
																	handleDocUpload
																}
																className="shadow border-0 rounded-0 mx-2 btn btn-primary px-4"
															>
																Upload
															</button>
														) : (
															""
														);
													} else {
														return uploadAlbum ? (
															<button
																type="button"
																onClick={
																	handleAlbumUpload
																}
																className="shadow border-0 rounded-0 mx-2 btn btn-primary px-4"
															>
																Upload
															</button>
														) : (
															""
														);
													}
											  })()
											: ""}
										{(() => {
											if (file_type === "Book") {
												return (
													<button
														type="button"
														onClick={onBookSubmit}
														className="add_book shadow border-0 rounded-0 mx-2 btn btn-primary px-4"
													>
														Add Book
													</button>
												);
											} else if (
												file_type === "Document"
											) {
												return (
													<button
														type="button"
														onClick={onDocSubmit}
														className="add_doc shadow border-0 rounded-0 mx-2 btn btn-primary px-4"
													>
														Add Document
													</button>
												);
											} else {
												return (
													<button
														type="button"
														onClick={onAlbumSubmit}
														className="add_album shadow border-0 rounded-0 mx-2 btn btn-primary px-4"
													>
														Add Album
													</button>
												);
											}
										})()}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className="p-5 container-fluid">
			<div className="d-flex justify-content-start align-items-center">
				<i class="fas fa-door-closed"></i>
				<h3 className="m-2 text-dark">My Cupboard</h3>
			</div>

			<div className="row align-items-center">
				<div className="p-2 col-lg-12 order-lg-1 mt-5 mt-lg-0">
					<div className=" shadow border-0 card p-4">
						<div>
							<ul
								class="nav nav-tabs my-2"
								id="myTab"
								role="tablist"
							>
								<li class="nav-item" role="presentation">
									<button
										class="nav-link active"
										id="book-tab"
										data-bs-toggle="tab"
										data-bs-target="#book"
										type="button"
										role="tab"
										aria-controls="book"
										aria-selected="true"
									>
										Books
									</button>
								</li>
								<li class="nav-item" role="presentation">
									<button
										class="nav-link"
										id="document-tab"
										data-bs-toggle="tab"
										data-bs-target="#document"
										type="button"
										role="tab"
										aria-controls="document"
										aria-selected="false"
									>
										Documents
									</button>
								</li>
								<li class="nav-item" role="presentation">
									<button
										class="nav-link"
										id="album-tab"
										data-bs-toggle="tab"
										data-bs-target="#album"
										type="button"
										role="tab"
										aria-controls="album"
										aria-selected="false"
									>
										Albums
									</button>
								</li>
							</ul>
						</div>

						<div>
							<div class="tab-content" id="myTabContent">
								<div
									class="tab-pane fade show active"
									id="book"
									role="tabpanel"
									aria-labelledby="book-tab"
								>
									<div className="lefttab">
										<div className=" list-group">
											{myBook.length ? (
												myBook.map((book, index) => (
													<div>
														<BookCard
															item={book}
															user_id={
																props.user_id
															}
															friend_view={
																props.friend_view
															}
														></BookCard>
													</div>
												))
											) : (
												<div className="m-auto p-5 d-flex align-items-center justify-content-center">
													<Empty></Empty>
												</div>
											)}
										</div>
									</div>
								</div>
								<div
									class="tab-pane fade"
									id="document"
									role="tabpanel"
									aria-labelledby="document-tab"
								>
									<div className="lefttab">
										<div className=" list-group">
											{myDoc.length ? (
												myDoc.map((doc, index) => (
													<div>
														<DocCard
															item={doc}
															user_id={
																props.user_id
															}
															friend_view={
																props.friend_view
															}
														></DocCard>
													</div>
												))
											) : (
												<div className="m-auto p-5 d-flex align-items-center justify-content-center">
													<Empty></Empty>
												</div>
											)}
										</div>
									</div>
								</div>
								<div
									class="tab-pane fade"
									id="album"
									role="tabpanel"
									aria-labelledby="album-tab"
								>
									<div className="lefttab">
										<div className=" list-group">
											{myAlbum.length ? (
												myAlbum.map((album, index) => (
													<div>
														<AlbumCard
															item={album}
															user_id={
																props.user_id
															}
															friend_view={
																props.friend_view
															}
														></AlbumCard>
													</div>
												))
											) : (
												<div className="m-auto p-5 d-flex align-items-center justify-content-center">
													<Empty></Empty>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cupboard;
