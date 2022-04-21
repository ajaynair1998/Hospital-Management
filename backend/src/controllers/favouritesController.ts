import Favourite from "../models/Favourite";
import _ from "lodash";
const FavouritesController: IFavouritesController = {
	async get(event, args) {
		try {
			console.log(args);
			const favourites = await Favourite.findAll({
				where: {
					category: "chief_complaint",
				},
				raw: true,
			});

			console.log(
				"🚀 ~ file: favouritesController.ts ~ line 16 ~ get ~ favourites",
				favourites[0]
			);

			return { status: 200, data: favourites };
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async post(event, args) {
		try {
			console.log(args);
			let category: string = args.category;
			let data: string = args.data;

			if (category === null || data === null) {
				throw new Error("Incorrect favourite type or data");
			}
			let favouriteExists = await Favourite.findAll({
				where: {
					category: category,
					data: data,
				},
			});

			if (favouriteExists.length > 0) {
				throw new Error("Already exists");
			}

			await Favourite.create({
				category: category,
				data: data,
			});

			return {
				status: 200,
				message: `${data} added successfully to ${category}`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IFavouritesController {
	get: (event: any, args: any) => Promise<any>;
	post: (event: any, args: any) => Promise<any>;
}

export default FavouritesController;
