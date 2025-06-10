/*
 * @Author: shuoshubao
 * @Date: 2025-06-06 23:17:51
 * @LastEditors: shuoshubao
 * @LastEditTime: 2025-06-07 02:01:02
 * @Description: vite
 */
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
        base: '/',
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: fileURLToPath(new URL('./src', import.meta.url))
                }
            ]
        },
        plugins: [react()]
    };
});
