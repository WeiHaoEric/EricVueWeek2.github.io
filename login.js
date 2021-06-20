//=== URL Settings ===
const BASE_URL = "https://vue3-course-api.hexschool.io";
const API_PATH = "hello-eric";
const Login_API = `${BASE_URL}/admin/signin`;

//=== Handle Event Func ===
function handleLogIn() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  axios
    .post(Login_API, { username, password })
    .then((res) => {
      const { expired, token } = res.data;
      console.log(token, expired);
      document.cookie = `hexToken = ${token};`;
      document.cookie = `expires = ${expired};`;

      const loginInfo = document.querySelector(".login-info");
      loginInfo.innerHTML = `<h3 style="color:green">順利登入，可操作以下的商品</h3>`;
    })
    .catch((rej) => console.log("failed:", rej));
}

// === Check Cookie has token and expires
function checkToken(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const expires = document.cookie.replace(/(?:(?:^|.*;\s*)expires\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    console.log("===>cookie:", document.cookie);
    console.log("token:", token, "expires:", expires);
}



//=== Get Loging Dom and set callback event ===
const btnLogIn = document.querySelector("#login");
btnLogIn.addEventListener("click", handleLogIn);
checkToken();