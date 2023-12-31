import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh()],
	server: {
		proxy: {
			'/socket.io': {
				target: 'http://localhost:5000',
				changeOrigin: true,
				ws: true
			},
		}
	}
})
