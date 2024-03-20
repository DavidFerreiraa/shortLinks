import { FastifyInstance } from "fastify";
import { redis } from "../lib/redis";

export async function metricsRoutes(fastify: FastifyInstance) {
    fastify.get("/api/metrics", async (request, reply) => {
        const result = await redis.zRangeByScoreWithScores("metrics", 0, 50)

        const metrics = result.sort((a, b) => b.score - a.score).map(item => {
            return {
                shortLinkId: Number(item.value),
                clicks: Number(item.score)
            }
        })

        return reply.status(200).send(metrics);
    })
}