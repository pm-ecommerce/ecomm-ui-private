const userInfo = (state = {}, action) => {
    console.log(action, 'action');
    switch(action.type) {
        case 'SAVE_USER_INFO':
            console.log(action.data, 'reducer');
            return action.data;
        default: 
            return state;
    }
}

export default userInfo;