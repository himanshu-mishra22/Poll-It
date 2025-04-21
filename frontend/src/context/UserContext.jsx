import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user data (logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  //updating user stats
  const updateUserStats = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //update total Polls Created Or deleted locally
  const onPollCreateOrDelete = (type = "create") => {
    const totalPollsCreated = user.totalPollsCreated || 0;
    updateUserStats(
      "totalPollsCreated",
      type ==="create" ? totalPollsCreated + 1 : totalPollsCreated - 1
    );
  };

  //update total Polls counts locally
  const onUserVoted = () => {
    const totalPollsVotes = user.totalPollsVotes || 0;
    updateUserStats("totalPollsVotes", totalPollsVotes + 1);
  };

  //add or remove pollId form bookmarks
  const toggleBookmarkId = (id) => {
    const bookmarks = user?.bookmarks || [];
    const index = bookmarks.indexOf(id);

    if (index === -1) {
      setUser((prev) => ({
        ...prev,
          bookmarks: [...bookmarks, id],
          totalPollsBookmarked: prev.totalPollsBookmarked + 1,
        
      }));
    } else {
      setUser((prev) => ({
        ...prev,
          bookmarks: bookmarks.filter((item) => item !== id),
          totalPollsBookmarked: Math.max(prev.totalPollsBookmarked - 1, 0),
        
      }));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        onPollCreateOrDelete,
        onUserVoted,
        toggleBookmarkId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
