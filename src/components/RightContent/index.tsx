// import { QuestionCircleOutlined } from '@ant-design/icons';
// import { SelectLang as UmiSelectLang } from '@umijs/max';
import { history } from '@@/core/history';
import { Button, Space } from 'antd';

export type SiderTheme = 'light' | 'dark';

export const Logout = () => {
  const loginOut = async () => {
    localStorage.removeItem('token');
    const urlParams = new URL(window.location.href).searchParams;
    history.push(urlParams.get('redirect') || '/');
  };
  return (
    <Space>
      <Button type={'primary'} onClick={loginOut}>
        退出
      </Button>
    </Space>
  );
};

// export const SelectLang = () => {
//   return (
//     <UmiSelectLang
//       style={{
//         padding: 4,
//       }}
//     />
//   );
// };
//
// export const Question = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         height: 26,
//       }}
//       onClick={() => {
//         window.open('https://pro.ant.design/docs/getting-started');
//       }}
//     >
//       <QuestionCircleOutlined/>
//     </div>
//   );
// };
