import type { ListRoute } from "./routes";

export const list: AppRouterHandler<ListRoute> = (c) => {
  return c.json([{
    name: "BR Kumite",
    date: new Date(),
  }]);
};
