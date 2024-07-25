import { Products, Order, Contact} from "./"

export type Client = {
	id?: string,
	createdAt?: Date,
	updatedAt?: Date,
	published?: boolean,
	observation: string | null,
	interest?: Products[],
	orders?: Order[],
	contacts?: Contact[],
	name: string,
	fone: string,
	realtorId: string
}