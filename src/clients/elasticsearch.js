import { Client } from "@elastic/elasticsearch";
import { env } from "../config/env.js";

export const es = new Client({ node: env.elastic.node });

export async function esHealth() {
    const res = await es.ping();
    return res === true;
}