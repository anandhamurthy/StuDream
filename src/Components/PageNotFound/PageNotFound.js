import React from "react";
import page_not_found from "../Img/page_not_found.gif";

function PageNotFound() {
	return (
		<div className=" m-auto p-5 d-flex align-items-center justify-content-center">
			<img src={page_not_found} width={"25%"} alt="" />
		</div>
	);
}

export default PageNotFound;
