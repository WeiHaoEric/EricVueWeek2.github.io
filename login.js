//=== URL Settings ===
const BASE_URL = "https://vue3-course-api.hexschool.io";
const API_PATH = "hello-eric";
const Login_API = `${BASE_URL}/admin/signin`;
const USER_CHECK_API = `${BASE_URL}/api/user/check`;


// TBD: temp for test
const token = `eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjI0MTc1NzI2LCJ1c2VyX2lkIjoiMWYwRVo0bVhselRJbTdYWEZzc1huZ0JlQmd0MiIsInN1YiI6IjFmMEVaNG1YbHpUSW03WFhGc3NYbmdCZUJndDIiLCJpYXQiOjE2MjQxNzU3MjYsImV4cCI6MTYyNDYwNzcyNiwiZW1haWwiOiJ2dWFybmV0MDMxOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ2dWFybmV0MDMxOEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mKO2W0Srki9gLD9Uff8nlbzQNqAl59ekHSjRRey9ttpl8_nTIPRJy3obz_RIAjz_fSfybP4axt6fRhFQul30RUfrdmnJ0wLpMS_CK3At1o1Zi6WXkqnPYn8HrAzqNVchLU8wVgvtRjnKiPeLu-1-uFLXkdXY6-5e4llhhNr9Mhl2n76z6ST4_CBLqvOycdnNmqYLra9wYJZWN-GxejFrqNUgGb--P7E3vsTlFdD7wqa8SMtB8SsJsD6efj0oJJbZ_XO3VcKiCIHdwaiuuC2AMopOX6C9pwAlwheYBIJnOgOjm67_Do_7n14LV7AKWm7-lO-nuW7zLnrN-rIvmxJ9Gw`;

//=== Handle Event Func ===
function handleLogIn() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  axios
    .post(Login_API, { username, password })
    .then((res) => {
      const { expired, token } = res.data;
      document.cookie = `hexToken = ${token}`;
      document.cookie = `expires = ${expired}`;

      const loginInfo = document.querySelector(".login-info");
      loginInfo.innerHTML = `<h3 style="color:green">順利登入，可操作以下的商品</h3>`;

      assignTokenToAxios(token);
    })
    .catch((rej) => console.log("failed:", rej));
}

// === Check Cookie has token and expires
function assignTokenToAxios(newToken) {
  console.log("===>assignTokenToAxios");
  axios.defaults.headers.common["Authorization"] = newToken;

  axios.post(USER_CHECK_API).then((res) => {
    console.log("check user:", res);
  });

  axios.get(PRODUCT_API).then((res) => console.log("商品列表:", res));
}

function checkToken() {
  //   const token = document.cookie.replace(
  //     /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
  //     "$1"
  //   );
  //   const expires = document.cookie.replace(
  //     /(?:(?:^|.*;\s*)expires\s*\=\s*([^;]*).*$)|^.*$/,
  //     "$1"
  //   );

  //   console.log("===>checkToken:", token);

  const loginInfo = document.querySelector(".login-info");
  loginInfo.innerHTML = token
    ? `<h3 style="color:green">順利登入，可操作以下的商品</h3>`
    : `<h3 style="color: rgba(244, 135, 135, 0.813)">請先登入</h3>`;

  if (token) assignTokenToAxios(token);
}

//=== Get Loging Dom and set callback event ===
const btnLogIn = document.querySelector("#login");
btnLogIn.addEventListener("click", handleLogIn);
checkToken();
