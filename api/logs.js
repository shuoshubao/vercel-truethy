/*
 * @Author: shuoshubao
 * @Date: 2025-06-05 20:04:34
 * @LastEditors: shuoshubao
 * @LastEditTime: 2025-06-07 09:41:25
 * @Description: 模拟数据
 */
import md5 from 'md5';

// 获取表格数据
export const getTableData = {
    url: '/api/logs/table/:total',
    method: 'get',
    middleware: ctx => {
        const total = +ctx.params.total;

        const page = +ctx.query.page || 1;
        const limit = +ctx.query.limit || 10;

        const dataSource = Array(total).fill(null);

        ctx.body = {
            code: 0,
            data: {
                page: 1,
                limit: 10,
                total,
                list: dataSource.slice((page - 1) * limit, page * limit).map((item, index) => {
                    const value = (page - 1) * limit + index;
                    return {
                        id: md5(value),
                        index: value,
                        name: `item: ${value + 1}`
                    };
                })
            }
        };
    }
};
