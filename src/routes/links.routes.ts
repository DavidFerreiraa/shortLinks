import { FastifyInstance } from "fastify";
import { sql } from "../lib/postgres";
import postgres from "postgres";
import z from "zod";

export async function linksRoutes(fastify: FastifyInstance) {
    //Route to show all the links into short_links table.
    fastify.get("/api/links", async (request, reply) => {
        const result = await sql/*sql*/`
        SELECT * FROM short_links
        ORDER BY created_at DESC
    `

        return reply.status(200).send(result)
    })

    //Route to insert a link into short_links table.
    fastify.post("/api/links", async (request, reply) => {
        try {
            const createLinkSchema = z.object({
                code: z.string().min(3),
                url: z.string().url()
            })
        
            const { code, url } = createLinkSchema.parse(request.body);
        
            const result = await sql/*sql*/`
                INSERT INTO short_links (code, original_url)
                VALUES (${code}, ${url})
                RETURNING id
            `
        
            const link = result[0]
        
            return reply.status(201).send({ shortlinkId: link.id});
        } catch (err) {
            if (err instanceof postgres.PostgresError) {
                if (err.code === "23505") {
                    return reply.status(400).send({
                        message: "Duplicated code! This code already exists."
                    })
                }
            }
        }
    
        return reply.status(500).send({
            message: "Internal server error."
        })
    })
}