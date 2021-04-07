import { act } from "react-dom/test-utils"




export const init = (userEmail, userName, userPassword, userNickName) => {
    return {
        type: "INIT",
        userEmail: userEmail,
        userName: userName,
        userPassword: userPassword,
        userNickName: userNickName
    }
}

export const resetState = () => {
    return {
        type : "RESET"
    }
}

export const setCurrentUser = (currentUser) => {
    return {
        type : "SET_CURRENT_USER",
        currentUser:currentUser
    }
}

export const setCurrentError = (currentError) => {
    return {
        type : "SET_CURRENT_ERROR",
        currentError : currentError
    }
}

export const setCurrentSucceed = (currentSucceed) => {
    return {
        type : "SET_CURRENT_SUCCEED",
        currentSucceed : currentSucceed
    }
}

const initialState =  {
    currentUser : '',
    currentError : '',
    currentSucceed : '',

}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "INIT":
        {
            return {...state, [action.userEmail] : {
                userName:action.userName,
                userPassword:action.userPassword,
                userNickName:action.userNickName
            }}
        }
        case "RESET":
            return {currentUser:''};
        case "SET_CURRENT_USER":
            return {...state,currentUser:action.currentUser}
        case "SET_CURRENT_ERROR" :
            return {...state, currentError:action.currentError}
        case "SET_CURRENT_SUCCEED" :
            return {...state, currentSucceed : action.currentSucceed, ...state}
    }
    return state;
}

export default rootReducer;


