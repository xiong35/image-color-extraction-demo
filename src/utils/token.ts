/* 操作 token 的函数 */

const TOKEN_KEY = "__Flicker__token";

export type Token = {
  value: string;
  expire?: number;
};

export function setToken(token: Token) {
  const now = new Date();
  now.setDate(now.getDate() + 7);
  token.expire = now.getTime();
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export function getToken(): Token | null {
  const tokenStr = window.localStorage.getItem(TOKEN_KEY);
  if (!tokenStr) return null;

  const token = JSON.parse(tokenStr) as Token;
  if (!token.value || !token.expire) return null;

  if (token.expire < Date.now()) {
    clearToken();
    return null;
  }

  return token;
}
