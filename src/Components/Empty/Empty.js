import React from "react";
import empty from "../Img/empty-box.gif";

import "./Empty.css";

function Empty() {
	return (
		<div className=" m-auto p-2 d-flex align-items-center justify-content-center">
			<img src={empty} width={"45%"} alt="" />
		</div>
	);
}

export default Empty;
