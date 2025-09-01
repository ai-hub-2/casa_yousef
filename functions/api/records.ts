export const onRequestGet: PagesFunction<{ DB?: D1Database }> = async (context) => {
	try {
		const { request, env } = context;
		const url = new URL(request.url);
		const limitParam = url.searchParams.get("limit");
		const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 20;

		let records: unknown[] = [];
		const maybeDb = (env as unknown as { DB?: D1Database }).DB;
		if (maybeDb && typeof (maybeDb as D1Database).prepare === "function") {
			const stmt = maybeDb.prepare("SELECT id, name, note, created_at FROM Records LIMIT ?1");
			const result = await stmt.bind(limit).all();
			records = result.results ?? [];
		} else {
			records = [
				{ id: 1, name: "Sample", note: "D1 not configured", created_at: new Date().toISOString() }
			];
		}

		return new Response(JSON.stringify({ records }), {
			headers: { "content-type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: String(error) }), {
			status: 500,
			headers: { "content-type": "application/json" }
		});
	}
};

