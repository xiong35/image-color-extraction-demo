import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastType {
  value: string;
  _id: string;
  severity: "error" | "warning" | "info" | "success";
}

// 定义 slice state 的类型
interface ToastsState {
  toasts: ToastType[];
}

// 定义 state 对应类型的初始值
const initialState: ToastsState = {
  toasts: [],
};

export const toastsSlice = createSlice({
  name: "toastsReducer",
  // createSlice 将会根据 initialState 参数推断 state 的类型
  initialState,
  reducers: {
    // 使用 PayloadAction 类型来声明 action.payload 的内容
    addToast: (
      state,
      // 用 ConstructorParameters 获取 ToastType 类的第一个参数类型传给 PayloadAction
      action: PayloadAction<ToastType>
    ) => {
      const toast = {
        ...action.payload,
      };
      state.toasts = [...state.toasts, toast];
    },

    removeToast: (state, action: PayloadAction<string>) => {
      const toastToRemove = [...state.toasts].findIndex(
        (toast) => toast._id === action.payload
      );

      state.toasts.splice(toastToRemove, 1);
    },
  },
});

export const { addToast, removeToast } = toastsSlice.actions;

export default toastsSlice.reducer;
