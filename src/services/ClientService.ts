import { prisma } from "../database";
import { Client } from "../models";

class ClientService {
  async create(client: Client) {
    try {
      let res = await prisma.client.create({
        data: {
          name: client.name,
          fone: client.fone,
          realtorId: client.realtorId,
          observation: client.observation,
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async findClientById(id: string) {
    let clientDB = await prisma.client.findUnique({
      where: { id: id },
      include: { realtor: true },
    });
    if (!clientDB?.id) {
      throw { error: "user not found" };
    }
    return clientDB;
  }

  async findAll() {
    let clientDB = await prisma.client.findMany({ include: { realtor: true } });
    return clientDB.map((e) => {
      return {
        id: e.id,
        name: e.name,
        fone: e.fone,
        observation: e.observation,
        realtor: e.realtor,
      };
    });
  }

  async updateClient(client: Client) {
    let clientDB = await prisma.client.update({
      where: {
        id: client.id,
      },
      data: {
        name: client.name,
        fone: client.fone,
        realtorId: client.realtorId,
        observation: client.observation,
      },
    });
    return clientDB;
  }
}

export const clientService = new ClientService();
