import React from 'react';
import { Card, List, Space, Tag, Typography } from 'antd';
import { get } from 'lodash';

const { Text } = Typography;

export default () => {
  const RouterList = get(window, 'globalData.RouterList');

  return (
    <List
      header="API"
      dataSource={RouterList}
      renderItem={item => {
        const { method, url } = item;
        return (
          <List.Item>
            <Space style={{ display: 'flex' }}>
              <div style={{ width: 60 }}>
                <Tag color="green" style={{ margin: 0 }}>
                  {method}
                </Tag>
              </div>
              <Text>{url}</Text>
            </Space>
          </List.Item>
        );
      }}
      style={{ padding: 24 }}
    />
  );
};
