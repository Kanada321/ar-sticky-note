// @ts-ignore
import React from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(
    document.getElementById('app') as HTMLElement
)

root.render(
    <React.StrictMode>
        <h1>Hello React !!!</h1>
        <p>test2</p>
    </React.StrictMode>
)
