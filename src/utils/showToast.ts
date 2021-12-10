import { nanoid } from "@reduxjs/toolkit";

import { store } from "../redux/store";
import { addToast, removeToast } from "../redux/toasts/toastsSlice";

/**
 * 展示一个 toast
 * @param msg 展示的祖字符串
 * @param type toast 类型
 * - success: 成功, 绿色 toast
 * - warning: 警告, 黄色 toast
 * - error: 失败, 红色 toast
 * - info: 信息, 蓝色 toast
 */

export const showToast = (
  value: string,
  severity: "success" | "error" | "warning" | "info"
) => {
  const _id = nanoid();
  store.dispatch(addToast({ severity, value, _id }));

  setTimeout(() => {
    store.dispatch(removeToast(_id));
  }, 1800);
};
