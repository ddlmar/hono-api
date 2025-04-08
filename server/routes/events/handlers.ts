import type { ListRoute } from "./routes";

export const list: AppRouterHandler<ListRoute> = async (c) => {
  return c.json([{
    name: "BR Kumite",
    date: new Date(),
  }]);
};
