import React from "react";

import "./Brains.css";
import BrainCard from "./BrainCard";

function SingleBrainView(props) {
	return (
		<div className="p-5 container-fluid brain-bg">
			<div className="d-flex justify-content-start align-items-center">
				<i className="text-white fas fa-brain"></i>
				<h3 className="m-2 text-white">My Brains</h3>
			</div>
			<div className="row align-items-center">
				<div className="border-0 p-2">
					<div>
						<div className="signle-brain-left-tab">
							<div className=" list-group ">
								<div>
									<div className="rounded mx-2">
										<div className="rb-container">
											<ul className="rb">
												{props.items.map(
													(item, index) => (
														<BrainCard
															item={item}
															friend_view={
																props.friend_view
															}
														></BrainCard>
													)
												)}
											</ul>
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

export default SingleBrainView;
