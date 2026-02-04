import { es } from "../../clients/elasticsearch.js";
import { z } from "zod";

const indexSchema = z.object({
    index: z.string().min(1),
    id: z.string().min(1),
    doc: z.record(z.any())
});

export async function indexDoc(req, res, next) {
    try {
        const { index, id, doc } = indexSchema.parse(req.body);

        await es.index({
            index,
            id,
            document: doc,
            refresh: "wait_for"
        });

        res.json({ ok: true });
    } catch (e) {
        next(e);
    }
}

export async function search(req, res, next) {
    try {
        const index = String(req.query.index || "");
        const q = String(req.query.q || "");

        if (!index || !q) {
            return res.status(400).json({ message: "Provide index and q query params" });
        }

        const result = await es.search({
            index,
            query: {
                multi_match: { query: q, fields: ["*"] }
            }
        });

        const hits = result.hits?.hits?.map(h => ({
            id: h._id,
            score: h._score,
            source: h._source
        })) ?? [];

        res.json({ hits });
    } catch (e) {
        next(e);
    }
}
