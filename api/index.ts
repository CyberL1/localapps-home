import fastify, { FastifyRequest } from "fastify";

const app = fastify();

app.delete(
  "/home-api/apps/:appId",
  async (req: FastifyRequest<{ Params: { appId: string } }>, reply) => {
    const deleteReq = await fetch(
      `${process.env.ORIGIN}/api/apps/${req.params.appId}`,
      {
        method: "DELETE",
        headers: { Authorization: process.env.LOCALAPPS_API_KEY! },
      },
    );

    reply.code(deleteReq.status);

    if (!deleteReq.ok) {
      const json = await deleteReq.json();
      reply.send(json);
    }
  },
);

app.listen({ port: Number(process.env.PORT), host: "0.0.0.0" });
