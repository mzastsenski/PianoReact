export const postSongToDB = (data) => {
  fetch("api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  // .then((res) => res.json())
  // .then(console.log);
};

export const editSong = (data) => {
  fetch("api/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

export const deleteSongFromDB = (id) => {
  console.log(id);
  fetch("api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(id),
  });
};

export const getAllSongs = (callback) => {
  fetch("api/get")
    .then((res) => res.json())
    .then((res) => callback(res));
};
