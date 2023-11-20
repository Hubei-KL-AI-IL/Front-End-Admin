import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import './index.less';
import { history } from 'umi';

const Edit: React.FC = () => {
  // 从其他页传过来需要编辑的文档内容
  const { state } = history.location;
  console.log(state);

  return (
    <PageContainer />
  );
};

export default Edit;
