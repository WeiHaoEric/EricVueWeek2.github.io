//=== URL Settings ===
const BASE_URL = "https://vue3-course-api.hexschool.io";
const API_PATH = "hello-eric";
const Login_API = `${BASE_URL}/admin/signin`;

//=== Event Func ===
function handleLogIn() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  axios
    .post(Login_API, { username, password })
    .then((res) => {
      const { expired, token } = res;
      document.cookie.hexToken = token;
      document.cookie.expired = expired;

      const loginInfo = document.querySelector(".login-info");
      loginInfo.innerHTML = `<h3 style="color:green">順利登入，可操作以下的商品</h3>`;
    })
    .catch((rej) => console.log("failed:", rej));
}

//=== Get Loging Dom and set callback event ===
const btnLogIn = document.querySelector("#login");
btnLogIn.addEventListener("click", handleLogIn);
