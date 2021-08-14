import React from "react";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

function BookCard(props) {
	const deleteBook = (book_id) => {
		const uid = getUser().uid;
		return db
			.collection("Todo")
			.doc(uid)
			.collection("My Books")
			.doc(book_id)
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
			<div className="book-card m-2">
				<div className="shadow border-0 p-4">
					<div className="d-flex justify-content-between align-items-center">
						<div className="d-flex justify-content-start align-items-center">
							<i class="mx-2 fas fa-book book-icon"></i>
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
								class="delete far fa-trash-alt"
								onClick={() => {
									deleteBook(props.item.book_id);
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

export default BookCard;
