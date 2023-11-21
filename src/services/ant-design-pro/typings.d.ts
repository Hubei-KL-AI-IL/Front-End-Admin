// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: {
      key?: string;
      label?: string;
    }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: {
        label?: string;
        key?: string;
      };
      city?: {
        label?: string;
        key?: string;
      };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    code?: 1000;
    data?: {
      token: string;
    };
    message?: '登录成功';
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  // enum Block  {
  //   laboratory = 'laboratory',
  //   team = 'team',
  //   research = 'research',
  //   talent = 'talent',
  //   news = 'news',
  //   cooperate = 'cooperate',
  //   contact = 'contact'
  // }

  // type DocGroup = {
  //   [Block.laboratory]: ["实验室介绍","现任领导","研究方向","组织架构"],
  //   [Block.team]: ["教授","副教授","讲师"],
  //   [Block.research]: ["优秀论文","知识产权","成果奖励"],
  //   [Block.talent]: ["人才培养","人才引进","团队建设"],
  //   [Block.news]: ["新闻中心","通知公告"],
  //   [Block.cooperate]: ["学术交流","对外开放","开放基金"],
  //   [Block.contact]: ["联系我们"]
  // }

  type DocItem = {
    id?: number;
    block?: string;
    group?: string;
    title?: string;
    content?: string;
    create_at?: string;
  };

  type DocListItem = {
    id?: number;
    block?: string;
    group?: string;
    title?: string;
    content?: string;
    create_at?: number;
  };

  type DocList = {
    code?: 1000;
    data?: {
      Docs: DocListItem[];
    };
    message?: 'get document success';
  };

  type AddDocResult = {
    code: 1000;
    message: 'create document success';
  };

  type RemoveDocResult = {
    code: 1000;
    message: 'delete document success';
  };

  type LoginParams = {
    username?: string;
    password?: string;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
