export const onRequestGet: PagesFunction<{ DB?: D1Database }> = async (context) => {
	try {
		const { env } = context;
		const db = (env as unknown as { DB?: D1Database }).DB;
		let tables: string[] = [];
		if (db) {
			const result = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
			tables = (result.results ?? []).map((r: any) => r.name);
		} else {
			tables = ["Records"];
		}
		return new Response(JSON.stringify({ tables }), { headers: { "content-type": "application/json" } });
	} catch (e) {
		return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { "content-type": "application/json" } });
	}
};

