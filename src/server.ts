import fastify from "fastify";
import { z } from "zod";
import { sql } from "./lib/postgres";
import postgres from "postgres";

const app = fastify();
const PORT = 3333;

app.get("/:code", async (request, reply) => {
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

    return reply.redirect(301, link.original_url)
})

app.get("/api/links", async (request, reply) => {
    const result = await sql/*sql*/`
        SELECT * FROM short_links
        ORDER BY created_at DESC
    `

    return reply.status(200).send(result)
})

app.post("/api/links", async (request, reply) => {
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

app.listen({
    port: PORT,
}).then(() => {console.log(`HTTP server running on port: ${PORT}`)})
