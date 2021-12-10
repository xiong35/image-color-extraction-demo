/**
 * ## 将给定时间转换为 fmt 指定的格式化字符串
 * @param date Date 对象或 string/number 类型 毫秒/秒 时间戳(内部有归一化操作)
 * @param fmt 需要转化的字符串, 参考 https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/format-datetimefunction
 * @param onlyUseFormat 是否只进行给定时间格式的转化, 若为false, 则可能会返回"刚刚"或"xx分钟前"
 * @returns 格式化字符串
 */
export function dateFormat(
  date: Date | number | string,
  fmt = "YYYY/mm/dd HH:MM",
  onlyUseFormat = false
) {
  // 归一化为 Date 对象
  if (typeof date === "string") {
    date = Number(date.length < 13 ? date + "000" : date);
  }
  if (typeof date === "number") {
    date = new Date(date < 1000000000000 ? date * 1000 : date);
  }

  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (!onlyUseFormat) {
    const diff = (now.getTime() - date.getTime()) / (1000 * 60); // min
    if (diff < 1) {
      // 1 min 以内
      return "刚刚";
    } else if (diff < 59) {
      // 59 min 内
      return `${Math.round(diff)} 分钟前`;
    }

    if (now.getFullYear() === date.getFullYear()) {
      // 今年
      if (now.getDate() === date.getDate()) {
        // 今天内
        fmt = `今天 HH:MM`;
      } else if (yesterday.getDate() === date.getDate()) {
        // 昨天
        fmt = `昨天 HH:MM`;
      } else {
        fmt = "mm/dd HH:MM";
      }
    } else {
      // 去年
      fmt = "YYYY/mm/dd HH:MM";
    }
  }

  const opt: Record<string, string> = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };

  return Object.keys(opt).reduce(
    (prevStr, curKey) =>
      prevStr.replace(new RegExp(`(${curKey})`, "g"), (match) =>
        opt[curKey].padStart(match.length, "0")
      ),
    fmt
  );
}
