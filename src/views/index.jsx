import { Card, ConfigProvider, Table, Tag } from 'antd';
import { get } from 'lodash';
import React from 'react';

const ColorsMap = {
  GET: '#0f6ab4',
  POST: '#10a54a',
  PUT: '#c5862b',
  DELETE: '#a41e22',
  PATCH: '#d38042',
  HEAD: '#ffd20f'
};

const columns = [
  {
    title: 'Method',
    dataIndex: 'method',
    width: 70,
    render(value) {
      const Method = value.toUpperCase();
      return (
        <Tag style={{ margin: 0 }} color={ColorsMap[Method]}>
          {Method}
        </Tag>
      );
    }
  },
  {
    title: 'Url',
    dataIndex: 'url'
  },
  {
    title: 'Description',
    dataIndex: 'description'
  },
  {
    title: 'Args',
    dataIndex: 'args',
    render(value) {
      const { type, properties } = value;
      if (type === 'object') {
        Object.entries(properties).forEach(([key, value]) => {
          delete properties[key].examples;
        });
        return (
          <pre style={{ margin: 0 }}>
            <code>{JSON.stringify(properties, ' ', 2)}</code>
          </pre>
        );
      }
      return '-';
    }
  },
  {
    title: 'Example',
    dataIndex: 'args',
    render(value, record) {
      const { method, url } = record;
      const { type, examples } = value;
      if (type === 'object') {
        const [example] = examples;
        let fetchCode = '';
        if (method === 'get') {
          fetchCode = `
            fetch('${url}?${new URLSearchParams(example)}')
          `;
        } else {
          fetchCode = `
            fetch('${url}', {
              method: '${method.toUpperCase()}',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: '${JSON.stringify(example)}'
            })
          `;
        }
        return (
          <pre style={{ margin: 0 }}>
            <code>{fetchCode.trim()}</code>
          </pre>
        );
      }
      if (method === 'get') {
        return `fetch('${url}')`;
      }
      return `fetch('${url}', {
        method: '${method.toUpperCase()}',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })`;
    }
  }
];

export default props => {
  const RouterList = props.RouterList ?? get(window, 'globalData.RouterList');

  return (
    <ConfigProvider componentSize="small">
      <Card title="API">
        <Table rowKey="url" columns={columns} dataSource={RouterList} />
      </Card>
    </ConfigProvider>
  );
};
