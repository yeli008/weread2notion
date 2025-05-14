/**
 * Notion API 数据模型定义
 */

/**
 * Notion查询结果
 */
export interface NotionQueryResponse {
  object: string;
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
}

/**
 * Notion页面
 */
export interface NotionPage {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  parent: {
    type: string;
    database_id?: string;
    page_id?: string;
    workspace?: boolean;
  };
  properties: Record<string, any>;
}

/**
 * Notion块
 */
export interface NotionBlock {
  object: string;
  id: string;
  type: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  parent: {
    type: string;
    page_id?: string;
    block_id?: string;
  };
  [blockType: string]: any;
}

/**
 * Notion块查询结果
 */
export interface NotionBlocksResponse {
  object: string;
  results: NotionBlock[];
  next_cursor: string | null;
  has_more: boolean;
}

/**
 * 书籍检查结果
 */
export interface BookExistsResult {
  exists: boolean;
  pageId?: string;
}

/**
 * 书籍写入结果
 */
export interface BookWriteResult {
  success: boolean;
  pageId?: string;
}

/**
 * Notion内容块类型
 */
export interface NotionRichText {
  type: string;
  text: {
    content: string;
    link?: {
      url: string;
    };
  };
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
}

/**
 * Notion标题块
 */
export interface NotionHeading {
  rich_text: NotionRichText[];
}

/**
 * Notion段落块
 */
export interface NotionParagraph {
  rich_text: NotionRichText[];
}

/**
 * Notion引用块
 */
export interface NotionQuote {
  rich_text: NotionRichText[];
}

/**
 * Notion分割线块
 */
export interface NotionDivider {
  // 分割线没有额外属性
}

/**
 * Notion文件块
 */
export interface NotionFile {
  type: "external";
  external: {
    url: string;
  };
  name: string;
}

/**
 * Notion页面属性
 */
export interface BookProperties {
  书名: {
    title: NotionRichText[];
  };
  作者: {
    rich_text: NotionRichText[];
  };
  译者?: {
    rich_text: NotionRichText[];
  };
  类型?: {
    rich_text: NotionRichText[];
  };
  封面?: {
    files: NotionFile[];
  };
  ISBN?: {
    rich_text: NotionRichText[];
  };
  出版社?: {
    rich_text: NotionRichText[];
  };
  分类?: {
    rich_text: NotionRichText[];
  };
  是否读完?: {
    select: {
      name: string;
    };
  };
  [key: string]: any;
}
