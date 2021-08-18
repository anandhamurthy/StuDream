import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";
import Empty from "../Empty/Empty";

import "./Cupboard.css";
import BookCard from "./BookCard";
import DocCard from "./DocCard";
import AlbumCard from "./AlbumCard";

function ProfileCupboard(props) {
	const [myBook, setMyBook] = useState([]);
	const [myDoc, setMyDoc] = useState([]);
	const [myAlbum, setMyAlbum] = useState([]);

	const [albumImages, setAlbumImages] = useState([]);
	const [showImages, setShowImages] = useState(false);

	function changeMyTab(album_images, show_val) {
		setShowImages(show_val);
		setAlbumImages(album_images);
	}

	useEffect(() => {
		const uid = getUser().uid;
		return db
			.collection("User Items")
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
			.collection("User Items")
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
			.collection("User Items")
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

	return (
		<div className="border-0 card p-2">
			<div>
				<ul className="nav nav-tabs" id="myTab" role="tablist">
					<li className="nav-item" role="presentation">
						<button
							className="nav-link active"
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
					<li className="nav-item" role="presentation">
						<button
							className="nav-link"
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
					<li className="nav-item" role="presentation">
						<button
							className="nav-link"
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
				<div>
					<div className="tab-content" id="myTabContent">
						<div
							className="tab-pane fade show active"
							id="book"
							role="tabpanel"
							aria-labelledby="book-tab"
						>
							{myBook.length ? (
								myBook.map((exam, index) => (
									<div>
										<BookCard
											item={exam}
											index={index}
											user_id={props.user_id}
											friend_view={props.friend_view}
										></BookCard>
									</div>
								))
							) : (
								<div className="m-auto p-5 d-flex align-items-center justify-content-center">
									<Empty></Empty>
								</div>
							)}
						</div>
						<div
							className="tab-pane fade"
							id="document"
							role="tabpanel"
							aria-labelledby="document-tab"
						>
							{myDoc.length ? (
								myDoc.map((exam, index) => (
									<div>
										<DocCard
											item={exam}
											index={index}
											user_id={props.user_id}
											friend_view={props.friend_view}
										></DocCard>
									</div>
								))
							) : (
								<div className="m-auto p-5 d-flex align-items-center justify-content-center">
									<Empty></Empty>
								</div>
							)}
						</div>
						<div
							className="tab-pane fade"
							id="album"
							role="tabpanel"
							aria-labelledby="album-tab"
						>
							<div>
								{myAlbum.length ? (
									myAlbum.map((album, index) => (
										<div
											onClick={() => {
												changeMyTab(album.album, true);
											}}
										>
											<AlbumCard
												item={album}
												index={index}
												user_id={props.user_id}
												friend_view={props.friend_view}
											></AlbumCard>
										</div>
									))
								) : (
									<div className="m-auto p-5 d-flex align-items-center justify-content-center">
										<Empty></Empty>
									</div>
								)}
							</div>

							{showImages && albumImages.length != 0 ? (
								<div>
									<div className="d-flex justify-content-start align-items-center">
										<i
											onClick={() => {
												changeMyTab([], false);
											}}
											className="back fas fa-arrow-left"
										></i>
										<h5 className="m-2 text-dark">
											Album Photos
										</h5>
									</div>
									<div className="shadow card p-4 border-0">
										<div className="lefttab">
											<div className=" list-group">
												<div className="d-flex justify-content-between flex-wrap">
													{albumImages.length ? (
														albumImages.map(
															(
																img_item,
																index
															) => (
																<img
																	className="achievement-img img-fluid rounded shadow-sm"
																	src={
																		img_item
																	}
																	alt=""
																></img>
															)
														)
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
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileCupboard;
