import React from "react";
import loading from "../Img/loading.gif";

function Loading() {
	return (
		<div className=" d-flex align-items-center justify-content-center">
			<img src={loading} width={"10%"} alt="" />
		</div>
	);
}

export default Loading;
