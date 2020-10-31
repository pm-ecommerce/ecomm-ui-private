export const getCategories = () => async (dispatch) => {
  console.log("get category");
  const response = await fetch("http://localhost:8083/api/categories/");
  dispatch({ type: "CATEGORIES_RECOVERED", data: response.data });
};

export const saveUserInfo = (userInfo) => {
    console.log(userInfo, 'user info');
  return {
    type: 'SAVE_USER_INFO',
    data: {userInfo:userInfo, isOnline: true}
  };
};
