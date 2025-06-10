/*
 * @Author: shuoshubao
 * @Date: 2025-06-06 19:30:11
 * @LastEditors: shuoshubao
 * @LastEditTime: 2025-06-06 22:55:20
 * @Description: 二维码
 */
import { createCanvas, registerFont } from 'canvas';
import path from 'path';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// qrcode
export const getQrcode = {
    url: '/api/qrcode',
    method: 'get',
    middleware: async ctx => {
        const text = ctx.query.text || uuidv4();

        const buffer = await QRCode.toBuffer(text, {
            margin: 1,
            width: 200
        });

        ctx.set('Content-Type', 'image/png');

        ctx.body = buffer;
    }
};

/**
 * 生成展位图片
 * @param {Object} options - 配置选项
 * @param {string} options.text - 展位文字
 * @param {number} options.width - 图片宽度
 * @param {number} options.height - 图片高度
 * @param {string} options.color - 文字颜色
 * @param {string} options.bgcolor - 背景颜色
 * @returns {Promise<Buffer>} - 返回图片的Buffer数据
 */
const getPlaceholderImage = async ({ width, height, color, bgcolor, fontSize }) => {
    // 注册字体
    registerFont(path.join(__dirname, 'arial.ttf'), { family: 'Arial' });

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const text = [width, height].join('x');

    // 绘制背景
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, width, height);

    // 设置文字样式
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${fontSize}px arial`;

    // 绘制文字
    ctx.fillText(text, width / 2, height / 2);

    return canvas.toBuffer('image/png');
};

// qrcode
export const getPlaceholder = {
    url: '/api/placeholder',
    method: 'get',
    middleware: async ctx => {
        const { width, height, color, bgcolor, fontSize } = ctx.query;

        const buffer = await getPlaceholderImage({
            width: +width || 200,
            height: +height || 200,
            color: color || '#fff',
            bgcolor: bgcolor || '#1677ff',
            fontSize: +fontSize || 30
        });

        ctx.set('Content-Type', 'image/png');

        ctx.body = buffer;
    }
};
