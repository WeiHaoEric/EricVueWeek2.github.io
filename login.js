//=== URL Settings ===
const BASE_URL = "https://vue3-course-api.hexschool.io";
const API_PATH = "hello-eric";
const Login_API = `${BASE_URL}/admin/signin`;

//=== Event Func ===
function handleLogIn() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  console.log("===>", Login_API);
  axios
    .post(Login_API, { username, password })
    .then((res) => console.log("success get:", res))
    .catch((rej) => console.log("failed:", rej));
}

//=== Get Loging Dom and set callback event ===
const btnLogIn = document.querySelector("#login");
btnLogIn.addEventListener("click", handleLogIn);
