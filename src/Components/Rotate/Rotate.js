import React from "react";
import rotate from "../Img/rotate.gif";

import "./Rotate.css";

function Rotate() {
	return (
		<div className=" m-auto p-2 d-flex align-items-center justify-content-center">
			<img src={rotate} width={"45%"} alt="" />
		</div>
	);
}

export default Rotate;
