import { getDocs, removeDoc } from '@/services/ant-design-pro/api';
import { PageContainer } from '@ant-design/pro-components';
import { Button, message, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
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

const News: React.FC = () => {
  const [docs, setDocs] = useState<DocListItem[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const formatDate = (timeStamp: number) => {
    const t = new Date(timeStamp);
    return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
  };

  useEffect(() => {
    let newDocs: DocListItem[] = [];
    setLoading(true);
    getDocs({
      block: '新闻动态',
      group: '新闻中心',
    }).then((res1) => {
      if (res1.data) {
        newDocs = [...newDocs, ...res1.data.Docs];
      }
      getDocs({
        block: '新闻动态',
        group: '通知公告',
      }).then((res2) => {
        if (res2.data) {
          newDocs = [...newDocs, ...res2.data.Docs];
        }
        newDocs.forEach((doc) => {
          if (doc.create_at) {
            doc.time = formatDate(doc.create_at);
          }
        });
        setDocs(newDocs);
        setLoading(false);
      });
    });
  }, []);

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '删除',
      content: '确定删除吗？',
      onOk: () => {
        removeDoc({
          id,
        }).then((res) => {
          if (res.code === 1000 && res.message === 'delete document success') {
            message.success('删除成功');
            setDocs(docs.filter((doc) => doc.id !== id));
          }
        });
      },
    });
  };

  return (
    <PageContainer
      header={{
        extra: [
          <Button
            key="new"
            type={'primary'}
            size={'large'}
            onClick={() => {
              history.push('/admin/edit', { block: '新闻动态' });
            }}
          >
            新增
          </Button>,
        ],
      }}
    >
      <Table dataSource={docs} loading={loading}>
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
                  history.push('/admin/edit', record);
                }}
              >
                编辑
              </a>
              <a
                onClick={() => {
                  handleDelete(record.id as number);
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

export default News;
