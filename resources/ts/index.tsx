// @ts-ignore
import React from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore
import App from '@/App'

const root = createRoot(
    document.getElementById('app') as HTMLElement
)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
