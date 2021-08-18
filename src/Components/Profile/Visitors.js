import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
//import { getUser } from "../Firebase/auth";

import Empty from "../Empty/Empty";
import VisitorCard from "./VisitorCard";

function Visitors(props) {
	const [visitors, setVisitors] = useState([]);

	useEffect(() => {
		//const uid = getUser().uid;
		return db
			.collection("User Items")
			.doc(props.user_id)
			.collection("My Visitors")
			.onSnapshot((snapshot) => {
				const visitors_item = [];
				snapshot.forEach((doc) => {
					visitors_item.push({ ...doc.data(), id: doc.id });
				});
				setVisitors(visitors_item);
			});
	});

	return (
		<div className="border-0 p-2">
			<div className="lefttab">
				<div className="list-group">
					{visitors.length !== 0 ? (
						<div>
							{visitors.map((item, index) => (
								<VisitorCard
									item={item}
									user_id={props.user_id}
									friend_view={props.friend_view}
								></VisitorCard>
							))}
						</div>
					) : (
						<div className="m-auto p-5 d-flex align-items-center justify-content-center">
							<Empty></Empty>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Visitors;
