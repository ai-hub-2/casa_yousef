export const onRequestGet: PagesFunction<{ DB?: D1Database }> = async (context) => {
	try {
		const { request, env } = context;
		const url = new URL(request.url);
		const table = url.searchParams.get("table");
		const limit = Number(url.searchParams.get("limit") || 100);
		if (!table) return new Response(JSON.stringify({ error: "Missing table" }), { status: 400, headers: { "content-type": "application/json" } });

		const db = (env as unknown as { DB?: D1Database }).DB;
		let rows: unknown[] = [];
		if (db) {
			const stmt = db.prepare(`SELECT * FROM ${table} LIMIT ?1`);
			const res = await stmt.bind(limit).all();
			rows = res.results ?? [];
		} else {
			rows = [];
		}
		return new Response(JSON.stringify({ rows }), { headers: { "content-type": "application/json" } });
	} catch (e) {
		return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { "content-type": "application/json" } });
	}
};

