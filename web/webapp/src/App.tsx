import { useEffect, useState } from 'react'
import './App.css'

type RecordItem = { id: number; name: string; note?: string; created_at?: string }

function App() {
	const [records, setRecords] = useState<RecordItem[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const load = async () => {
			try {
				const res = await fetch('/api/records?limit=10')
				if (!res.ok) throw new Error(`HTTP ${res.status}`)
				const data = await res.json()
				setRecords(Array.isArray(data.records) ? data.records : [])
			} catch (e) {
				setError(String(e))
			} finally {
				setLoading(false)
			}
		}
		load()
	}, [])

	return (
		<>
			<h1>Sky CASA</h1>
			<p>
				تطبيق Sky CASA لسطح المكتب. قم بتنزيل الإصدار الرسمي وتشغيله على ويندوز.
			</p>
			<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
				<a href="/downloads/Sky_CASA.exe" download>
					<button>تنزيل البرنامج (Windows)</button>
				</a>
				<a href="https://github.com/ai-hub-2/casa_yousef" target="_blank" rel="noreferrer">
					<button>الاطلاع على الكود</button>
				</a>
			</div>
			<hr />
			<h2>سجل البيانات (قراءة فقط)</h2>
			{loading ? (
				<p>جاري التحميل...</p>
			) : error ? (
				<p style={{ color: 'red' }}>خطأ: {error}</p>
			) : (
				<ul>
					{records.map((r) => (
						<li key={r.id}>
							<strong>{r.name}</strong>
							{r.note ? ` — ${r.note}` : ''}
							{r.created_at ? ` (${r.created_at})` : ''}
						</li>
					))}
				</ul>
			)}
		</>
	)
}

export default App
