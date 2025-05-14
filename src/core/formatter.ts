/**
 * 数据格式化处理模块
 */

import { HighlightsResponse, ThoughtsResponse } from "../config/types";
import { WeReadClient } from "../api/weread/client";
import { getSyncState } from "../utils/file";

/**
 * 获取并格式化书籍的划线数据
 */
export async function getBookHighlightsFormatted(
  cookie: string,
  bookId: string,
  useIncremental: boolean = true
): Promise<HighlightsResponse> {
  console.log(`\n获取书籍(ID: ${bookId})的划线数据...`);

  const wereadClient = new WeReadClient(cookie);
  return await wereadClient.getHighlights(bookId, useIncremental);
}

/**
 * 获取并格式化书籍的想法数据
 */
export async function getBookThoughtsFormatted(
  cookie: string,
  bookId: string,
  useIncremental: boolean = true
): Promise<ThoughtsResponse> {
  console.log(`\n获取书籍(ID: ${bookId})的想法数据...`);

  const wereadClient = new WeReadClient(cookie);
  return await wereadClient.getThoughts(bookId, useIncremental);
}

/**
 * 增强书籍元数据
 * 合并从书架和笔记本获取的书籍数据
 */
export async function enhanceBookMetadata(
  cookie: string,
  shelfBooks: any[],
  notebookBooks: any[]
): Promise<any[]> {
  // 创建书籍映射表，以bookId为键
  const bookMap = new Map();

  // 首先添加书架中的书籍
  for (const book of shelfBooks) {
    bookMap.set(book.bookId, {
      ...book,
      source: ["shelf"],
      finishReadingStatus: book.finishReading ? "已读完" : "未读完",
    });
  }

  // 然后添加或合并笔记本中的书籍数据
  for (const nbBook of notebookBooks) {
    const bookId = nbBook.bookId;

    if (bookMap.has(bookId)) {
      // 如果书架中已有该书，合并数据
      const existingBook = bookMap.get(bookId);
      bookMap.set(bookId, {
        ...existingBook,
        ...nbBook.book, // 笔记本中的book对象包含更详细的书籍信息
        hasHighlights: true,
        highlightCount: nbBook.marksCount || 0,
        source: [...existingBook.source, "notebook"],
      });
    } else {
      // 如果书架中没有，直接添加
      bookMap.set(bookId, {
        ...nbBook.book,
        bookId: nbBook.bookId,
        hasHighlights: true,
        highlightCount: nbBook.marksCount || 0,
        source: ["notebook"],
        finishReadingStatus: "未读完", // 默认为未读完
      });
    }
  }

  // 转换为数组
  const mergedBooks = Array.from(bookMap.values());
  console.log(`合并后共有 ${mergedBooks.length} 本书`);

  return mergedBooks;
}
