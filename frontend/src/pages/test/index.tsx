import React from "react";

const Test: React.FC = () => {
	return (
		<div className="Test">
			<header className="App-header">
				<p>
					Edit <code>src/App.tx</code> and save to reload .
				</p>

				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<button
					onClick={() =>
						window.electron.notificationApi.sendNotification(
							"notification from react"
						)
					}
				>
					click here
				</button>
			</header>
		</div>
	);
};

export default Test;
