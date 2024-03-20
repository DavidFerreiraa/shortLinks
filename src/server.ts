import Fastify from "fastify";

import { linksRoutes } from "./routes/links.routes";
import { rootRoutes } from "./routes/root.routes";

const fastify = Fastify();
const PORT = 3333;

const start = async () => {

    await fastify.register(linksRoutes);
    await fastify.register(rootRoutes);

    await fastify.listen({
        port: PORT,
    }).then(() => {console.log(`HTTP server running on port: ${PORT}`)})
}

start();
