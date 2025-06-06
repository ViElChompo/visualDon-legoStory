import { defineConfig } from 'vite'
import dsv from '@rollup/plugin-dsv'

export default defineConfig({
    plugins: [
        dsv(),
],
assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif']
})

