export const postSongToDB = (data) => {
  fetch("api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

export const checkUser = (user, setUser, dispatch) =>
  fetch("api/checkUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ user }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res !== 200) {
        dispatch(setUser(""));
        localStorage.setItem("user", "");
      }
    });

export const getSongs = (user, setSongs, dispatch) => {
  fetch(`api/getSongs/${user}`)
    .then((res) => res.json())
    .then((res) => {
      res.length ? dispatch(setSongs(res)) : dispatch(setSongs([]));
    });
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
  fetch("api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(id),
  });
};

export const login = (data, setUser, dispatch) => {
  fetch("api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res === 401) alert("Login Fault");
      else {
        localStorage.setItem("user", data.user);
        dispatch(setUser(data.user));
        window.location.hash = "/";
      }
    });
};

export const signUp = (data) => {
  fetch("/api/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res === 401) alert("User exists");
      else window.location.hash = "/Login";
    });
};

export const postLogout = () => fetch("api/logout", { method: "POST" });
