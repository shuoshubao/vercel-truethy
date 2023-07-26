import React from 'react';
import { Card, Table, Tag } from 'antd';
import { get } from 'lodash';

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
    render(value) {
      const Method = value.toUpperCase();
      return <Tag color={ColorsMap[Method]}>{Method}</Tag>;
    }
  },
  {
    title: 'Url',
    dataIndex: 'url'
  }
];

export default props => {
  const RouterList = props.RouterList ?? get(window, 'globalData.RouterList');

  return (
    <Card title="API">
      <Table rowKey="url" columns={columns} dataSource={RouterList} />
    </Card>
  );
};
