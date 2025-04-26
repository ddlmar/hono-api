import type { User } from "@schema/users";
import createApp, { createAppTest } from "@lib/createApp";
import router from "@routes/users";
import { testClient } from "hono/testing";
import { describe, expectTypeOf, it } from "vitest";

describe("users", () => {
  const testRouter = createAppTest(router);
  const app = createApp();

  it("list successfully users response", async () => {
    const response = await testRouter.request("/users");
    const result: Array<User> = await response.json();

    expectTypeOf(result).toBeArray();
  });

  it("list successfully users response in client", async () => {
    const client = testClient(app.route("/", router));

    const response = await client.users.$get();
    const result = await response.json();

    expectTypeOf(result).toBeArray();
  });
});
