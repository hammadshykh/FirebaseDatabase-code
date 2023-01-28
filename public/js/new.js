var email = document.getElementById("email");
var password = document.getElementById("password");
var signin = document.getElementById("signin");
const eye = document.querySelector("#eye");
var getPass = "123";

if (!password.value === "") {
}

if (password.value !== getPass) {
  console.log(eye.className);
  eye.classList.remove("d-none");
}
eye.addEventListener("click", () => {
  event.preventDefault();
  if (password.type === "text") {
    password.type = "password";
  } else {
    password.type = "text";
  }
});

signin.addEventListener("click", function () {
  console.log(email.value);
  console.log(password.value);
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((userdata) => {
      console.log(userdata.user.uid);
      //admin
      firebase
        .database()
        .ref("Admin/")
        .child(userdata.user.uid)
        .once("value", (snap) => {
          if (snap.toJSON() == null) {
            firebase
              .database()
              .ref("user/")
              .child(userdata.user.uid)
              .once("value", (snap) => {
                console.log("user panel :", snap.toJSON());
                window.location.replace("user_panel.html");
              });
          } else {
            console.log("admin panel :", snap.toJSON());
            window.location.replace("Admin_panel.html");
          }
        });
    })
    .catch((err) => {
      // console.log(err)
      alert(err);
    });
});
