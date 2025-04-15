export const getPollBookamrked = (pollId, userBookmarks = [])=>{
    return userBookmarks.includes(pollId);
}