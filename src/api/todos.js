import axios from 'axios';
//共用網址資料的部分，存在baseUrl變數中
const baseUrl = 'https://todo-list.alphacamp.io/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);
//getTods GET瀏覽資料設定，使用非同步
export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`);
    return res.data.data;
  } catch (error) {
    console.error('[Get Todos failed]', error);
  }
};
//createTodo 新增資料 POST
export const createTodo = async (payload) => {
  //逗號後者的參數為
  //<要新增todos物件裡面的title跟isDone (Key值)>
  const { title, isDone } = payload;
  try {
    const res = await axiosInstance.post(`${baseUrl}/todos`, { title, isDone });
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]', error);
  }
};
//patch 更新資料設定
export const patchTodo = async (payload) => {
  //逗號後者的參數為<要更新todos物件裡面的id,title 跟isDone (Key值)>
  const { id, title, isDone } = payload;
  try {
    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch {}
};
export const deleteTodo = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error('Delete Todo failed', error);
  }
};
