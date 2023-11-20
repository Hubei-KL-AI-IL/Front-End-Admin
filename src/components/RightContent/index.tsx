// import { QuestionCircleOutlined } from '@ant-design/icons';
import {Button, Space} from 'antd';
import React from 'react';
// import { useModel } from 'umi';
// import HeaderSearch from '../HeaderSearch';
// import Avatar from './AvatarDropdown';
import styles from './index.less';
// import {outLogin} from "@/services/ant-design-pro/api";
import {history} from "@@/core/history";
import {stringify} from "querystring";
export type SiderTheme = 'light' | 'dark';
const GlobalHeaderRight: React.FC = () => {

  const className = styles.right;

  const loginOut = async () => {
    localStorage.removeItem('token');
    const { query = {}, search, pathname } = history.location;
    const { redirect } = query;
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  return (
    <Space className={className}>
      <Button type={'primary'} onClick={loginOut}>退出</Button>
    </Space>
  );
};
export default GlobalHeaderRight;
