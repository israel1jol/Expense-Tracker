const _auth = {
    id:"",
    firstname:"",
    lastname:"",
    username:"",
    email:"",
    token:"",
    profilePic:"",
    isAuthenticated:false
}

export default function reducer(state=_auth, action){
    const initial_state = state;

    switch(action.type){
        case "login_user":
            return action.payload;
        case "logout_user":
            return _auth;
        default:
            return initial_state;
    }
}