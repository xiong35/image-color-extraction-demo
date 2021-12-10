/**
 * 接受表单的值作为参数, 返回`undefined`则表示合法, 否则返回对应的提示信息
 */
export type Validator = (value: string) => Promise<string | undefined>;

/**
 * 指定 validator 并给出 value, 若合法返回 true, 不合法会弹出提示框并返回 false
 * @param validator
 * @param value
 * @returns boolean
 */
export async function useValidator(validator: Validator, value: string) {
  const res = await validator(value);
  if (res === undefined) return true;
  alert(res);
  return false;
}

export const userNameValidator: Validator = async (value: string) => {
  if (value.length === 0 || value.length > 12) return "昵称长度需在 1~12 之间";

  // 匹配中文，英文字母和数字及_
  if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(value)) return "昵称包含奇怪的字符";
};
export const emailValidator: Validator = async (value: string) => {
  if (!/^.+@.+$/.test(value)) return "邮箱格式不正确";
};

export const passwordValidator: Validator = async (value: string) => {
  if (value.length < 6) return "密码长度至少为 6 个字符";
};

export const validateCodeValidator: Validator = async (value: string) => {
  if (!/^\d{5,5}$/.test(value)) return "验证码格式有误";
};

export const phoneValidator: Validator = async (value: string) => {
  if (!/^1\d{10}$/.test(value)) return "手机号格式有误";
};

export const replyValidator: Validator = async (value: string) => {
  const REPLY_LEN = 200;
  if (value.length === 0) return "评论不能为空";
  if (value.length > REPLY_LEN) return `评论不能超过 ${REPLY_LEN} 字`;
};

export const postTitleValidator: Validator = async (value: string) => {
  const TITLE_LEN = 40;
  if (value.length === 0) return "帖子标题不能为空";
  if (value.length > TITLE_LEN) return `帖子标题不能超过 ${TITLE_LEN} 字`;
};

export const postContentValidator: Validator = async (value: string) => {
  const CONTENT_MAX_LEN = 50000;
  const CONTENT_MIN_LEN = 10;
  if (value.length === 0) return "帖子主体不能为空";
  if (value.length < CONTENT_MIN_LEN)
    return `帖子不能少于 ${CONTENT_MIN_LEN} 字`;
  if (value.length > CONTENT_MAX_LEN)
    return `帖子不能超过 ${CONTENT_MAX_LEN} 字`;
};
