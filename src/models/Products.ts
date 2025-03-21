export type Product = {
	id?: string,
	createdAt?: Date,
	updatedAt?: Date,
	published: boolean,
	active: boolean,
	price: number,
	forecast?: Date,
	stock: number,
	name: string,
}