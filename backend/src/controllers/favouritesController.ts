import Favourite from "../models/Favourite";
const FavouritesController: IFavouritesController = {
	async get(event, args) {
		try {
			console.log(args);
			await Favourite.create({
				category: "chief_complaint",
				data: "main",
			});
			let favourites = await Favourite.findAll({
				where: {
					category: "chief_complaint",
				},
			});
			console.log(
				"🚀 ~ file: favouritesController.ts ~ line 16 ~ get ~ favourites",
				favourites
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
			let data: any = args;
			return { status: 200, data: data };
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
