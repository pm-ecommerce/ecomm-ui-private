export const getCategories = () => async (dispatch) => {
    console.log('get category');
    const response = await fetch('http://localhost:8083/api/categories/');
    dispatch({type: 'CATEGORIES_RECOVERED', data: response.data});
}