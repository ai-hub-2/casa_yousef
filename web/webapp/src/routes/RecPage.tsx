import { useEffect, useState } from 'react'

export function RecPage() {
	const [q, setQ] = useState('')
	const [rows, setRows] = useState<any[]>([])

	const load = async (query: string) => {
		const res = await fetch(`/api/patients?q=${encodeURIComponent(query)}&limit=200`)
		const data = await res.json()
		setRows(data.rows || [])
	}

	useEffect(() => {
		load('')
	}, [])

	return (
		<div style={{ padding: 16 }}>
			<h1>Patient Records</h1>
			<div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
				<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Enter patient name to search..." />
				<button onClick={() => load(q)}>Search</button>
				<button onClick={() => { setQ(''); load('') }}>Refresh</button>
				<a href="/"><button>Back</button></a>
			</div>
			<div style={{ overflow: 'auto', maxHeight: 500, border: '1px solid #ccc' }}>
				<table style={{ width: '100%', borderCollapse: 'collapse' }}>
					<thead>
						<tr>
							{rows[0] && Object.keys(rows[0]).map((k) => (
								<th key={k} style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: 8 }}>{k}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((r, idx) => (
							<tr key={idx}>
								{Object.keys(rows[0] || {}).map((k) => (
									<td key={k} style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>{String(r[k] ?? '')}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

