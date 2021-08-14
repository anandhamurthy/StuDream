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

	return (
		<div className="border-0 card p-2">
			<div>
				<ul class="nav nav-tabs" id="myTab" role="tablist">
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
				<div>
					<div class="tab-content" id="myTabContent">
						<div
							class="tab-pane fade show active"
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
							class="tab-pane fade"
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
							class="tab-pane fade"
							id="album"
							role="tabpanel"
							aria-labelledby="album-tab"
						>
							{myAlbum.length ? (
								myAlbum.map((exam, index) => (
									<div>
										<AlbumCard
											item={exam}
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
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileCupboard;
