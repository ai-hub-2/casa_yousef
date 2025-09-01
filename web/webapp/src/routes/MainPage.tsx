import { useEffect, useState } from 'react'

export function MainPage() {
	const [tables, setTables] = useState<string[]>([])
	const [selected, setSelected] = useState<string>('')
	const [rows, setRows] = useState<any[]>([])
	const [status, setStatus] = useState<string>('Ready')

	useEffect(() => {
		const load = async () => {
			const res = await fetch('/api/tables')
			const data = await res.json()
			setTables(data.tables || [])
			if ((data.tables || []).length) setSelected(data.tables[0])
		}
		load()
	}, [])

	const loadAll = async () => {
		if (!selected) return
		setStatus('Loading data...')
		const res = await fetch(`/api/table-data?table=${encodeURIComponent(selected)}&limit=500`)
		const data = await res.json()
		setRows(data.rows || [])
		setStatus(`Loaded ${data.rows?.length || 0} records from ${selected}`)
	}

	return (
		<div style={{ padding: 16 }}>
			<h1>Sky CASA - Medical Laboratory Analysis System</h1>
			<select value={selected} onChange={(e) => setSelected(e.target.value)} style={{ marginBottom: 8 }}>
				{tables.map((t) => (
					<option key={t} value={t}>{t}</option>
				))}
			</select>
			<div style={{ marginBottom: 8 }}>
				<button onClick={loadAll}>Load All Data</button>
				<a href="/rec" style={{ marginLeft: 8 }}><button>Patient Records</button></a>
			</div>
			<div style={{ marginBottom: 8 }}>{status}</div>
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

