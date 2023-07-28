import { CopyOutlined } from '@ant-design/icons';
import { Button, Card, ConfigProvider, Modal, Table, Tag, Tooltip, message } from 'antd';
import copy from 'copy-to-clipboard';
import React, { useEffect, useState } from 'react';

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
    width: 100,
    render(value) {
      if (!value) {
        return '-';
      }
      return (
        <Button
          type="link"
          onClick={() => {
            Modal.info({
              title: 'Args',
              width: '50vw',
              closable: true,
              content: (
                <pre style={{ padding: 12, background: '#f9fafb', borderRadius: 4 }}>
                  <code>{JSON.stringify(value, null, 2)}</code>
                </pre>
              )
            });
          }}
        >
          查看
        </Button>
      );
    }
  },
  {
    title: 'Example',
    dataIndex: 'example',
    width: 100,
    render(value) {
      return (
        <Button
          type="link"
          onClick={() => {
            Modal.info({
              title: 'Example',
              width: '90vw',
              closable: true,
              content: (
                <pre style={{ padding: 12, background: '#f9fafb', borderRadius: 4 }}>
                  <code>{value}</code>
                </pre>
              )
            });
          }}
        >
          查看
        </Button>
      );
    }
  }
];

export default () => {
  const [loading, setLoading] = useState(true);
  const [publicPath, setPublicPath] = useState('');
  const [RouterList, setRouterList] = useState([]);

  useEffect(() => {
    setPublicPath(window.globalData.PUBLIC_PATH);
    setRouterList(window.globalData.RouterList);
    setLoading(false);
  }, []);

  const extraNode = (
    <Tooltip title="api url prefix">
      <CopyOutlined
        onClick={() => {
          copy(publicPath);
          message.success(['复制成功', publicPath].join(':'));
        }}
      />
    </Tooltip>
  );

  return (
    <ConfigProvider componentSize="small">
      <Card title="API" extra={!loading && extraNode} loading={loading}>
        <Table rowKey="url" columns={columns} dataSource={RouterList} />
      </Card>
    </ConfigProvider>
  );
};
