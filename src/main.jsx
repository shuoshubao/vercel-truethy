/*
 * @Author: shuoshubao
 * @Date: 2025-06-06 23:20:09
 * @LastEditors: shuoshubao
 * @LastEditTime: 2025-06-07 01:09:24
 * @Description: 主入口
 */
import { Button, Flex } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => (
    <Flex gap="small" wrap>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
    </Flex>
);

createRoot(document.querySelector('#app')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
