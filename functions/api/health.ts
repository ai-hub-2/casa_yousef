export const onRequestGet: PagesFunction = async () => {
	return new Response(
		JSON.stringify({ status: "ok", time: new Date().toISOString() }),
		{ headers: { "content-type": "application/json" } }
	);
};

