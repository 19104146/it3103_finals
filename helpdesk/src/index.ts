import fastify from "fastify";

const server = fastify();

server.get("/ping", async () => {
  return "pong\n";
});

server.listen({ port: 3000 }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
