import app from "./app";
const port = process.env.PORT || 8080;

const server = Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`Listening on localhost:${server.port}`);
