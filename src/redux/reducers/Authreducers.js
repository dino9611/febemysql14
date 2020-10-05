const INITIAL_STATE={
    id:0,
    username:'',
    isLogin:false,
    isLoading:false,
    errormessage:""
}

// const new = { ... INITIAL_STATE,... {id,role,blabla}}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "LOGIN":
            return {...state,...action.payload,isLogin:true,isLoading:false}
        case "LOADING":
            return {...state,isLoading:true}
        case "ERROR":
            return {...state,errormessage:action.payload}
        default:
            return state
    }
}
