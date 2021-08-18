import React, { useState } from "react";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import "./Cupboard.css";

function AlbumCard(props) {
	const deleteAlbum = (album_id) => {
		const uid = getUser().uid;
		return db
			.collection("User Items")
			.doc(uid)
			.collection("My Albums")
			.doc(album_id)
			.delete()
			.then(() => {
				console.log("Document successfully deleted!");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
	};
	return (
		<div>
			<div className="album-card m-2">
				<div className="shadow border-0 p-4">
					<div className="d-flex justify-content-between align-items-center">
						<div className=" d-flex justify-content-start align-items-center">
							<i className=" mx-2 far fa-images album-icon"></i>

							<div>
								<p className="mx-3 my-0">
									<b>{props.item.name}</b>
								</p>
								<p className="mx-3 my-0">
									<i>{props.item.description}</i>
								</p>
							</div>
						</div>

						{props.friend_view ? (
							<i
								className="delete far fa-trash-alt"
								onClick={() => {
									deleteAlbum(props.item.album_id);
								}}
							></i>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AlbumCard;
