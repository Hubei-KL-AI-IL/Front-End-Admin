// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/v1/auth/login */
export async function login(
  body: API.LoginParams,
  options?: {
    [key: string]: any;
  },
) {
  return request<API.LoginResult>('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文档列表 GET /api/v1/visitor/document */
export async function getDocs(
  params: {
    // query
    /** 模块 */
    block?: string;
    /** 分组 */
    group?: string;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<API.DocList>('/api/v1/visitor/document', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建/更新文档 POST /api/v1/editor/document */
export async function addDoc(
  params: {},
  options?: {
    block: string;
    group: string;
    title: string;
    create_at: number;
    content: string;
  },
) {
  return request<API.AddDocResult>('/api/v1/editor/document', {
    method: 'POST',
    params: {
      ...params,
    },
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    ...(options || {}),
  });
}

/** 删除文档 DELETE /api/v1/editor/document */
export async function removeDoc(
  params: {
    id?: number;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<API.RemoveDocResult>('/api/v1/editor/document', {
    method: 'DELETE',
    params: {
      ...params,
    },
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    ...(options || {}),
  });
}
