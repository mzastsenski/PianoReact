export const postSongToDB = (data) => {
  fetch("api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

export const checkUser = (user, setUser) =>
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
        setUser("");
        localStorage.setItem("user", "");
      }
    });

export const getSongs = (user, setSongs) => {
  fetch(`api/getSongs/${user}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      res.length ? setSongs(res) : setSongs([]);
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

export const login = (data, setUser) => {
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
        setUser(data.user);
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
