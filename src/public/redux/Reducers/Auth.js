const initialState = {
    isLogin : false,
    email: '',
    name:'',
    level: '',
    id: '',
    token: ''
}

const AuthReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case "LOGIN_TRUE":
            return {
                ...prevState,
                isLogin : true,
                email: action.data.email,
                name: action.data.name,
                level: action.data.level,
                id: action.data.id,
                token: action.data.token
            }
        case "LOGIN_FALSE":
            return {
                ...prevState,
                isLogin : false,
                email: '',
                name:'',
                level: '',
                id: '',
                token: ''
            }
        default:
            return {
                ...prevState
            }
    }
}

export default AuthReducer