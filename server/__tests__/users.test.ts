import router from "@routes/users";
import { describe, expect, it } from "vitest";

describe("users", () => {
  it("list response", async () => {
    const response = await router.request("/users");
    const result = await response.text();

    console.log(result);

    expect(false).toBe(true);
  });
});
