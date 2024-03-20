import { FastifyInstance } from "fastify";
import { sql } from "../lib/postgres";
import z from "zod";
import { redis } from "../lib/redis";

export async function rootRoutes(fastify: FastifyInstance) {
    //Route to show all the links into short_links table.
    fastify.get("/:code", async (request, reply) => {
        const linkParamsSchema = z.object({
            code: z.string().min(3)
        })
    
        const { code } = linkParamsSchema.parse(request.params);
    
        const result = await sql/*sql*/`
            SELECT id, original_url
            FROM short_links
            WHERE short_links.code = ${code}
        `
    
        const link = result[0]?? reply.status(404).send({ message: "Link not found"});

        await redis.zIncrBy("metrics", 1, String(link.id));
    
        return reply.redirect(301, link.original_url)
    })
}