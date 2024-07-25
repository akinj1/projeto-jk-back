import * as jwt from "jsonwebtoken";
import * as bcryptjs from "bcryptjs";
import config from "../../config";
import { prisma } from "../database";
import { User, UserUpdateInput, UserImage } from "../models";

class UserService {
  async create(user: User, image?: UserImage) {
    let password = await bcryptjs.hash(user.password, 8);
    let roleId = user.roleId;
    try {
      if (!user.roleId) {
        const role = await prisma.role.findUnique({
          where: {
            name: "USER",
          },
        });
        if (role) {
          roleId = role.id;
        }
      }
      let res = await prisma.user.create({
        data: {
          userName: user.userName,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: password,
          roleId: roleId || "",
        },
      });
      if (image) {
        await prisma.userImage.create({
          data: {
            url: image.url,
            key: image.key,
            name: image.name,
            userId: res.id,
          },
        });
      }
      return res;
    } catch (error) {
      throw error;
    }
  }

  async login(data: { email: string; password: string }) {
    const { email, password } = data;
    if (!email) {
      throw new Error("login is required");
    }
    if (!password) {
      throw new Error("o password is required");
    }

    let userDB = await prisma.user.findUnique({ where: { email: email } });

    if (!userDB?.password || !userDB?.email || !userDB?.id) {
      throw new Error("user not found");
    }

    let passwordValid = await bcryptjs.compare(password, userDB.password);

    const token = jwt.sign(
      { id: userDB.id, email: userDB.email },
      config.db.tokenSecret || "",
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );
    if (passwordValid) {
      await prisma.user.update({
        where: { email: email },
        data: { token: token },
      });
      return token;
    } else {
      throw new Error("invalid password");
    }
  }

  async findByToken(token: string) {
    let userDB = await prisma.user.findUnique({
      where: { token: token },
      include: { role: true, images: true },
    });

    if (!userDB?.password || !userDB?.email || !userDB?.id) {
      throw new Error("user not found");
    }

    return userDB;
  }

  async findUserById(id: string) {
    if (!id) {
      throw new Error("id is required");
    }
    let userDB = await prisma.user.findUnique({
      where: { id: id },
      include: { role: true, images: true },
    });
    if (!userDB?.password || !userDB?.email || !userDB?.id) {
      throw new Error("user not found");
    }
    return userDB;
  }

  async findAll() {
    let userDB = await prisma.user.findMany({
      include: { role: true, images: true },
    });
    return userDB.map((e) => {
      return {
        id: e.id,
        email: e.email,
        firstName: e.firstName,
        lastName: e.lastName,
        userName: e.userName,
        roleId: e.roleId,
        surName: e.surName,
      };
    });
  }

  async updateUser(user: UserUpdateInput, image?: UserImage) {
    let userDB = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId,
      },
      include: {
        images: true,
      },
    });

    if (image) {
      prisma.userImage.upsert({
        where: { userId: user.id },
        create: {
          url: image.url,
          userId: user.id,
          key: image.key,
          name: image.name,
        },
        update: { url: image.url, key: image.key, name: image.name },
      });
    }

    console.log(userDB);
    return { ...userDB, password: undefined, token: undefined };
  }
}

export const userService = new UserService();
