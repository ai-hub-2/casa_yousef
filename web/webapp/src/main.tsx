import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { MainPage } from './routes/MainPage'
import { RecPage } from './routes/RecPage'

const router = createBrowserRouter([
	{ path: '/', element: <MainPage /> },
	{ path: '/rec', element: <RecPage /> },
	{ path: '/app', element: <App /> },
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
