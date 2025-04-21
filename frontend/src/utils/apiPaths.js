export const BASE_URL = "https://poll-it.onrender.com";


//utils/apiPaths.js
export const API_PATHS = {
    AUTH:{
        LOGIN:"/auth/login",
        REGISTER:"/auth/register",
        GET_USER_INFO:"/auth/getUser",
    },
    POLLS:{
        CREATE:"/poll/create",
        GET_ALL_POLLS:"/poll/getAllPolls",
        GET_BY_ID: (pollId)=> `poll/${pollId}`,
        VOTE:(pollId)=> `poll/${pollId}/vote`,
        CLOSE: (pollId)=> `poll/${pollId}/close`,
        BOOKMARK:(pollId)=> `poll/${pollId}/bookmark`,
        GET_BOOKMARKED: "/poll/user/bookmarked",
        VOTED_POLLS:"poll/votedPolls",
        DELETE: (pollId)=> `poll/${pollId}/delete`

    },


    IMAGE:{
        UPLOAD_IMAGE:"/auth/upload-image",
    },
};