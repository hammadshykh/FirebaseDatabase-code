console.log(firebase.auth());

var email = document.getElementById("email");
var password = document.getElementById("password");
var name1 = document.getElementById("name");
var signup = document.getElementById("signup");
var signin = document.getElementById("signin");
var role = document.getElementsByName("user");
const eye = document.querySelector("#eye");
const slash = document.querySelector("#slash");
var getrole = "";
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
    slash.classList.remove("d-none");
    eye.classList.add("d-none");
    password.type = "text";
  }
});

slash.addEventListener("click", () => {
  event.preventDefault();
  if (password.type === "text") {
    password.type = "password";
    slash.classList.add("d-none");
    eye.classList.remove("d-none");
  } else {
    password.type = "text";
  }
});

signup.addEventListener("click", function () {
  console.log(email.value);
  console.log(password.value);
  for (var i = 0; i < role.length; i++) {
    if (role[i].checked) {
      getrole = role[i].value;
      break;
    }
    0;
  }
  if (getrole == "") {
    alert("select role");
  } else {
    console.log(getrole);
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(async (userdata) => {
      console.log(userdata.user.uid);

      var obj = {
        username: name1.value,
        email: email.value,
        password: password.value,
        role: getrole,
        USER_UID: userdata.user.uid,
      };

      await firebase
        .database()
        .ref(`${getrole.toString()}/`)
        .child(userdata.user.uid.toString())
        .set(obj);
      alert("user reg");
    })
    .catch((err) => {
      // console.log(err)
      alert(err);
    });
});
