import React from "react";

import "./Review.css";

function Review() {
	// const review = [
	// 	{
	// 		review: "So much fun to use this website the small details are done great ❤️ . So user friendly and customizalbe. Loved a lot.",
	// 		name: "Deeraj V",
	// 		rating: 5,
	// 	},
	// 	{
	// 		review: "The UI is awesome and it's perfectly working and very usefull application but it takes time to load pages and also takes more data to load.",
	// 		name: "Akash S",
	// 		rating: 4.7,
	// 	},
	// ];

	return (
		<div className="review-row">
			<div class="customer-item shadow">
				<div>
					<p>
						So much fun to use this website the small details are
						done great ❤️ . So user friendly and customizalbe. Loved
						a lot.
					</p>
					<h3>Deeraj V</h3>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<p>5/5</p>
				</div>
			</div>

			<div class="customer-item shadow">
				<div>
					<p>
						The UI is awesome and it's perfectly working and very
						usefull application but it takes time to load pages and
						also takes more data to load.
					</p>
					<h3>Akash S</h3>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star-half-alt"></i>
					<p>4.7/5</p>
				</div>
			</div>
		</div>
	);
}

export default Review;
