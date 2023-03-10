import axios from 'axios';
//後端API的伺服器主頁連結
const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    // 因API回傳資料會是一個物件，所以以解構方式儲存成變數data
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });
    console.log(data);
    //意思是data裡面的authToken
    const { authToken } = data;
    if (authToken) {
      // 成功的話在data資料裡新增一個 prototype屬性名為success 值為 true , 其餘data值不變
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('[Login,Failed]:', error);
  }
};
