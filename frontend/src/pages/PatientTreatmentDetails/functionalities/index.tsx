import React from "react";
import styled from "styled-components";
import ChiefComplaints from "./ChiefComplaints";

let FunctionalityContainer = styled.div``;

const Functionalities = () => {
	let addNewFavourite = async (
		category: string,
		data: string
	): Promise<any> => {
		try {
			let response = await window.electron.favouritesApi.post({
				category,
				data,
			});
			console.log(response);
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	};
	return (
		<FunctionalityContainer>
			<ChiefComplaints addNewFavourite={addNewFavourite} />
		</FunctionalityContainer>
	);
};

export default Functionalities;
