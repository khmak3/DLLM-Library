import { LoginUser } from "./platform";
import { UserService } from "./userService";
import { ItemService } from "./itemService";
import {
  Resolvers,
  Item,
  User,
} from "./generated/graphql";


interface Context {
  loginUser: LoginUser | null;
}

const itemService = new ItemService();
const userService = new UserService(itemService);

export const resolvers: Resolvers = {
  Query: {
    me: async (
      _: any,
      __: any,
      { loginUser }: Context
    ): Promise<User | null> => {
      return userService.me(loginUser);
    },
    itemsByLocation: async (
      _: any,
      {
        latitude,
        longitude,
        radiusKm,
        category,
        status,
        keyword,
        limit = 20,
        offset = 0,
      }: any,
      { loginUser }: Context
    ): Promise<Item[]> => {
      return itemService.itemsByLocation(
        loginUser,
        latitude,
        longitude,
        radiusKm,
        category,
        status,
        keyword,
        limit,
        offset
      );
    },
    itemsByUser: async (
      _: any,
      { userId, category, status, keyword, limit = 20, offset = 0 }: any,
      { loginUser }: Context
    ): Promise<Item[]> => {
      return itemService.itemsByUser(
        loginUser,
        userId,
        category,
        status,
        keyword,
        limit,
        offset
      );
    },
    item: async (
      _: any,
      { id }: any,
      { loginUser }: Context
    ): Promise<Item | null> => {
      return itemService.itemById(loginUser, id);
    },
    user: async (
      _: any,
      { id }: any,
      { loginUser }: Context
    ): Promise<User | null> => {
      return userService.userById(loginUser, id);
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { nickname, address }: any,
      { loginUser }: Context
    ): Promise<User> => {
      return userService.createUser(loginUser, nickname, address);
    },
    updateUser: async (
      _: any,
      { nickname, contactMethods, address }: any,
      { loginUser }: Context
    ): Promise<User> => {
      return userService.updateUser(
        loginUser,
        nickname,
        address,
        contactMethods
      );
    },
    createItem: async (
      _: any,
      args: any,
      { loginUser }: Context
    ): Promise<Item> => {
      if (!loginUser) throw new Error("Not authenticated");
      const owner = await userService.me(loginUser);
      if (!owner) throw new Error("Owner not found");
      return itemService.createItem(
        owner,
        args.name,
        args.description,
        args.condition,
        args.category,
        args.status,
        args.images,
        args.publishedYear,
        args.language
      );
    }
  },
};
