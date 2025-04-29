import { JSONFilePreset } from "lowdb/node";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, '..', '..', '/db/db.json')

export const loadDb = async () => {
    const defaultData = { words: [] }
    return await JSONFilePreset<any>(DB_PATH, defaultData)
}