import fastify from "fastify";

const app = fastify();
const PORT = 3333;

app.get("/teste", () => console.log("hello world"))

app.listen({
    port: PORT,
}).then(() => {console.log(`HTTP server running on port: ${PORT}`)})