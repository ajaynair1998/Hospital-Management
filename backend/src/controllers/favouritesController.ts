// import Favourite from "../models/Favourite";
const FavouritesController: IFavouritesController = {
	async get(event, args) {
		try {
			let data: any;
			console.log(args);
			return { status: 200, data: data };
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
