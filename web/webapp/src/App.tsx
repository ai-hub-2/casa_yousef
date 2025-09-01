import './App.css'

function App() {
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
			<p>
				إن كنت تبحث عن نسخة ويب، سنقوم بتوفير واجهات على Cloudflare Pages لاحقاً لعرض البيانات
				وتقارير للقراءة فقط، مع مزامنة من التطبيق المكتبي.
			</p>
		</>
	)
}

export default App
