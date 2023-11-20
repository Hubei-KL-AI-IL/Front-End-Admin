import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import {Button, message, Space, Table} from 'antd';
import { getDocs, removeDoc } from '@/services/ant-design-pro/api';
import { history } from 'umi';

type DocListItem = {
  id?: number;
  block?: string;
  group?: string;
  title?: string;
  content?: string;
  create_at?: number;
  time?: string;
};

const { Column } = Table;

const Cooperate: React.FC = () => {
  const [docs, setDocs] = useState<DocListItem[]>([]);

  const formatDate = (timeStamp: number) => {
    const t = new Date(timeStamp);
    return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
  };

  useEffect(() => {
    let newDocs: DocListItem[] = [];
    getDocs({
      block: '合作交流',
      group: '学术交流',
    }).then((res1) => {
      if (res1.data) {
        newDocs = [...newDocs, ...res1.data.Docs];
      }
      getDocs({
        block: '合作交流',
        group: '对外开放',
      }).then((res2) => {
        if (res2.data) {
          newDocs = [...newDocs, ...res2.data.Docs];
        }
        getDocs({
          block: '合作交流',
          group: '开放基金',
        }).then((res3) => {
          if (res3.data) {
            newDocs = [...newDocs, ...res3.data.Docs];
          }
          newDocs.forEach((doc) => {
            if (doc.create_at) {
              doc.time = formatDate(doc.create_at);
            }
          });
          setDocs(newDocs);
        });
      });
    });
  }, []);

  return (
    <PageContainer>
      <div
        style={{
          width: '100%',
          padding: '16px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          type={'primary'}
          size={'large'}
          style={{
            borderRadius: '8px',
            width: '100px',
          }}
          onClick={() => {
            history.push('/admin/edit');
          }}
        >
          新增
        </Button>
      </div>
      <Table dataSource={docs}>
        <Column title="模块" dataIndex="block" key="block" />
        <Column title="分组" dataIndex="group" key="group" />
        <Column title="标题" dataIndex="title" key="title" />
        <Column title="时间" dataIndex="time" key="time" />
        <Column
          title="操作"
          key="action"
          render={(_: any, record: DocListItem) => (
            <Space size="middle">
              <a
                onClick={() => {
                  history.push({
                    pathname: '/admin/edit',
                    state: {
                      doc: record,
                    },
                  });
                }}
              >
                编辑
              </a>
              <a
                onClick={() => {
                  removeDoc({ id: record.id }).then(
                    res => {
                      if(res.message && res.message === 'delete document success') {
                        message.success('删除成功!');
                        const newDocs = docs.filter((doc) => {
                          return doc.id !== record.id;
                        })
                        setDocs(newDocs);
                      } else {
                        message.error('出错了，请重试');
                      }
                    }
                  ).catch(
                    err => {
                      console.log(err);
                      message.error('出错了，请重试');
                    }
                  )
                }}
              >
                删除
              </a>
            </Space>
          )}
        />
      </Table>
    </PageContainer>
  );
};

export default Cooperate;
