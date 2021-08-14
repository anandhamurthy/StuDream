import React from "react";
import "./Education.css";
function ExamCard(props) {
	return (
		<div>
			<div class="exam-card m-2" id={"card-" + (props.index % 10)}>
				<div className="shadow border-0 p-4">
					<h5 className="text-white text-center">
						{props.item.exam_name}
					</h5>
					<p className="text-white text-center">
						{props.item.exam_date}
					</p>
				</div>
			</div>
		</div>
	);
}

export default ExamCard;
