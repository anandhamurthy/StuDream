import React from "react";
import "./Education.css";
function SubjectCard(props) {
	return (
		<div>
			<div class="m-2" id={"card-" + (props.index % 10)}>
				<div className="shadow-sm border-0 p-4">
					<h5 className="text-white text-center">
						{props.item.subject_name}
					</h5>
					<p className="text-white text-center">
						{props.item.subject_marks} /{" "}
						{props.item.subject_total_marks}
					</p>
				</div>
			</div>
		</div>
	);
}

export default SubjectCard;
