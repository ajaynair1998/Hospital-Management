import Favourite from "../models/Favourite";
import _ from "lodash";
interface IGet {
	category: string;
}
interface IPost {
	category: string;
	data: string;
}

interface IDelete {
	id: number;
}
const FavouritesController: IFavouritesController = {
	async get(event, args: IGet) {
		try {
			let category = args.category;
			let favourites;
			if (category === undefined || null || "") {
				throw new Error("Unexpected category for favourite");
			}
			if (category === "all") {
				favourites = await Favourite.findAll({
					raw: true,
					// limit: 10,
					order: [["id", "DESC"]],
				});
			} else {
				favourites = await Favourite.findAll({
					where: {
						category: category,
					},
					raw: true,
				});
			}

			return { status: 200, data: favourites };
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async post(event, args: IPost) {
		try {
			let category = args.category;
			let data = args.data;

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
	async delete(event, args: IDelete) {
		try {
			let id = args.id;

			if (id === null || id === undefined) {
				throw new Error("Undefined or null as id");
			}
			let favouriteExists = await Favourite.destroy({
				where: {
					id: id,
				},
			});

			if (favouriteExists > 0) {
				return {
					status: 200,
					message: `Favourite with id ${id} was deleted successfully`,
				};
			} else {
				throw new Error("The favourite with this id doesnt exist");
			}
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IFavouritesController {
	get: (event: any, args: any) => Promise<any>;
	post: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default FavouritesController;
