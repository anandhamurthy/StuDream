import React from "react";
import "./ViewImg.css";
function ViewImg(props) {
	return (
		<div
			id="my-img-view"
			className="d-flex justify-content-center align-items-center"
		>
			<img id="img_view" src={props.img} alt=""></img>
		</div>
	);
}

export default ViewImg;
