export const onRequestGet: PagesFunction<{ DB?: D1Database }> = async (context) => {
	try {
		const { request, env } = context;
		const url = new URL(request.url);
		const q = (url.searchParams.get('q') || '').trim();
		const limit = Number(url.searchParams.get('limit') || 100);

		const db = (env as unknown as { DB?: D1Database }).DB;
		let rows: unknown[] = [];
		if (db) {
			if (q) {
				const stmt = db.prepare("SELECT * FROM Patients WHERE name LIKE ?1 LIMIT ?2");
				const res = await stmt.bind(`%${q}%`, limit).all();
				rows = res.results ?? [];
			} else {
				const stmt = db.prepare("SELECT * FROM Patients LIMIT ?1");
				const res = await stmt.bind(limit).all();
				rows = res.results ?? [];
			}
		}

		return new Response(JSON.stringify({ rows }), { headers: { 'content-type': 'application/json' } });
	} catch (e) {
		return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'content-type': 'application/json' } });
	}
};

