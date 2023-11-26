import { addDoc } from '@/services/ant-design-pro/api';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Cascader, ConfigProvider, Input, message } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';

const Edit: React.FC = () => {
  // 从其他页传过来需要编辑的文档内容
  const { state } = history.location as {
    state: API.DocItem;
  };

  const uploadHandler = (
    blobInfo: {
      blob: () => string | Blob;
      filename: () => string | undefined;
    },
    progress: (arg0: number) => void,
  ) =>
    new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.open('POST', '/api/v1/editor/file');
      xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`);
      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject('HTTP Error: ' + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.data.file_urls[0] !== 'string') {
          reject('Invalid JSON: ' + xhr.responseText);
          return;
        }

        resolve(json.data.file_urls[0]);
      };

      xhr.onerror = () => {
        reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };

      const formData = new FormData();
      formData.append('image', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });

  const [content, setContent] = useState(state?.content || '');
  const onEditorChange = (value: { toString: () => React.SetStateAction<string> }) => {
    // console.log(value);
    setContent(value as string);
  };

  interface Groups {
    value: string | number;
    label: string;
    children?: Groups[];
  }

  const [group, setGroup] = useState<string[]>([state.block || '', state.group || '']);
  const changeGroup = (value: string[]) => {
    setGroup(value);
  };
  const options: Groups[] = [
    {
      value: '实验室概况',
      label: '实验室概况',
      children: [
        {
          value: '实验室介绍',
          label: '实验室介绍',
        },
        {
          value: '现任领导',
          label: '现任领导',
        },
        {
          value: '研究方向',
          label: '研究方向',
        },
        {
          value: '组织架构',
          label: '组织架构',
        },
      ],
    },
    {
      value: '科研队伍',
      label: '科研队伍',
      children: [
        {
          value: '教授',
          label: '教授',
        },
        {
          value: '副教授',
          label: '副教授',
        },
        {
          value: '讲师',
          label: '讲师',
        },
      ],
    },
    {
      value: '科学研究',
      label: '科学研究',
      children: [
        {
          value: '优秀论文',
          label: '优秀论文',
        },
        {
          value: '知识产权',
          label: '知识产权',
        },
        {
          value: '成果奖励',
          label: '成果奖励',
        },
      ],
    },
    {
      value: '人才培养',
      label: '人才培养',
      children: [
        {
          value: '人才培养',
          label: '人才培养',
        },
        {
          value: '人才引进',
          label: '人才引进',
        },
        {
          value: '团队建设',
          label: '团队建设',
        },
      ],
    },
    {
      value: '新闻动态',
      label: '新闻动态',
      children: [
        {
          value: '新闻中心',
          label: '新闻中心',
        },
        {
          value: '通知公告',
          label: '通知公告',
        },
      ],
    },
    {
      value: '合作交流',
      label: '合作交流',
      children: [
        {
          value: '学术交流',
          label: '学术交流',
        },
        {
          value: '对外开放',
          label: '对外开放',
        },
        {
          value: '开放基金',
          label: '开放基金',
        },
      ],
    },
    {
      value: '联系我们',
      label: '联系我们',
      children: [
        {
          value: '联系我们',
          label: '联系我们',
        },
      ],
    },
  ];

  const [title, setTitle] = useState(state.title || '');

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    if (title && group[0] && group[1] && content) {
      addDoc({
        block: group[0],
        group: group[1],
        title: title,
        create_at: Number(new Date()),
        content: content,
      }).then(() => {
        message.success('提交成功');
        history.back();
      });
    }
    if (!title) {
      message.error('标题不能为空');
    }
    if (!group[0] || !group[1]) {
      message.error('分组不能为空');
    }
    if (!content) {
      message.error('内容不能为空');
    }
  };

  return (
    <PageContainer
      header={{
        title: `${state.title || '新建'}`,
        ghost: true,
        breadcrumb: {
          items: [
            state.block
              ? {
                  path: '',
                  title: `${state.block}`,
                }
              : {},
            state.group
              ? {
                  path: '',
                  title: `${state.group}`,
                }
              : {},
            {
              path: '',
              title: `${state.title || '新建'}`,
            },
          ],
        },
        extra: [
          // <Button key="reset">重置</Button>,
          <Button key="submit" type="primary" size="large" onClick={handleSubmit}>
            提交
          </Button>,
        ],
      }}
    >
      <ProCard direction={'column'}>
        <ProCard layout="center">
          <ProCard colSpan="40%">
            <Input
              placeholder="请输入标题"
              style={{ width: '100%' }}
              onChange={changeTitle}
              value={title}
            />
          </ProCard>
          <ProCard colSpan="25%">
            <ConfigProvider
              theme={{
                components: {
                  Cascader: {
                    dropdownHeight: 240,
                  },
                },
              }}
            >
              {/* @ts-ignore*/}
              <Cascader
                options={options}
                expandTrigger="hover"
                /* @ts-ignore*/
                onChange={changeGroup}
                placeholder="请选择分组"
                defaultValue={[group[0], group[1]]}
                style={{ width: '100%' }}
              />
            </ConfigProvider>
          </ProCard>
        </ProCard>
        <ProCard layout="center" ghost={true}>
          <Editor
            tinymceScriptSrc={'/tinymce/tinymce.min.js'}
            disabled={false}
            init={{
              min_height: 550,
              width: 1025,
              plugins:
                'accordion lists advlist anchor autolink link autoresize charmap code directionality emoticons fullscreen help image insertdatetime media preview quickbars save searchreplace table visualblocks visualchars wordcount',
              toolbar: [
                { name: 'history', items: ['undo', 'redo'] },
                { name: 'styles', items: ['blocks', 'fontfamily', 'fontsize'] },
                {
                  name: 'formatting',
                  items: [
                    'bold',
                    'italic',
                    'underline',
                    'superscript',
                    'subscript',
                    'forecolor',
                    'backcolor',
                  ],
                },
                { name: 'insert', items: ['image', 'link', 'table'] },
                { name: 'alignment', items: ['align'] },
                { name: 'list', items: ['bullist', 'numlist'] },
                { name: 'indentation', items: ['outdent', 'indent'] },
                {
                  name: 'other',
                  items: [
                    'restoredraft',
                    'charmap',
                    'emoticons',
                    'fullscreen',
                    'preview',
                    'searchreplace',
                    'wordcount',
                  ],
                },
              ],
              quickbars_selection_toolbar:
                'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
              quickbars_insert_toolbar: false,
              toolbar_sticky: true,
              link_context_toolbar: true,
              placeholder: '请输入文字......',
              auto_focus: 'textarea',
              autoresize_bottom_margin: 50,
              // autosave_interval: "10s",
              // autosave_restore_when_empty: true,
              // autosave_retention: "720m",
              insertdatetime_element: true,
              image_advtab: true,
              image_prepend_url: 'https://www.example.com/images/',
              images_upload_handler: uploadHandler,
              imagetools_cors_hosts: [
                'work.muxi-tech.xyz',
                'work.muxixyz.com',
                'ossworkbench.muxixyz.com',
              ],
              file_picker_types: 'file image media',
              statusbar: false,
              resize: 'both',
              browser_spellcheck: true,
              referrer_policy: 'origin',
              language: 'zh_CN',
              // base_url: '/tinymce-react-demo',
              language_url: '/langs/zh_CN.js',
              promotion: false,
            }}
            value={content}
            onEditorChange={onEditorChange}
          />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};
export default Edit;
