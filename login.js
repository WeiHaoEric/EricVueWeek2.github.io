//=== URL Settings ===
const BASE_URL = "https://vue3-course-api.hexschool.io";
const API_PATH = "hello-eric";
const Login_API = `${BASE_URL}/admin/signin`;

// TBD: temp for test
// const token = `eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjI0MTcyNzA4LCJ1c2VyX2lkIjoiMWYwRVo0bVhselRJbTdYWEZzc1huZ0JlQmd0MiIsInN1YiI6IjFmMEVaNG1YbHpUSW03WFhGc3NYbmdCZUJndDIiLCJpYXQiOjE2MjQxNzI3MDgsImV4cCI6MTYyNDYwNDcwOCwiZW1haWwiOiJ2dWFybmV0MDMxOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ2dWFybmV0MDMxOEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.TX4SyzyzOzzp2UW2H5IK6CW6e6nC29ABnrZCS5-6Sd6DcXMOsPz84hksVQdzFTN9kQ3oCIjjgb0kc7ghQO3JH1K5wcd0T4Z56YgRjZ8ieQ-BDJqEH_R8p5ESx9Q9dgDdI9wTvIg79ABgjMg47TSCK9BsB0COrXt1M5FkXq1CO0ZuBVT0bAXDG7OsWB8omQEVl6DGFlBoaoHH6Q3dNUYInI_UGp3jbjjGm0scNFMYRZ2lQEkng8-oahiVGPXWYxG6hWH5m6yEhD0hmML5zXWB_iuZy27fQtxAP01ywxFtB_UhvoB6092QPWcEkocqM6MXM8eiTsCj3_Zkcy-U22bhjQ`;

//=== Handle Event Func ===
function handleLogIn() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  axios
    .post(Login_API, { username, password })
    .then((res) => {
      const { expired, token } = res.data;
      console.log(token, expired);
      document.cookie = `hexToken = ${token}`;
      document.cookie = `expires = ${expired}`;

      const loginInfo = document.querySelector(".login-info");
      loginInfo.innerHTML = `<h3 style="color:green">順利登入，可操作以下的商品</h3>`;
    })
    .catch((rej) => console.log("failed:", rej));
}

// === Check Cookie has token and expires
function checkToken() {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  const expires = document.cookie.replace(
    /(?:(?:^|.*;\s*)expires\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );


  console.log("===>checkToken:", token, expires);

  const loginInfo = document.querySelector(".login-info");
  loginInfo.innerHTML = token
    ? `<h3 style="color:green">順利登入，可操作以下的商品</h3>`
    : `<h3 style="color: rgba(244, 135, 135, 0.813)">請先登入</h3>`;
}

//=== Get Loging Dom and set callback event ===
const btnLogIn = document.querySelector("#login");
btnLogIn.addEventListener("click", handleLogIn);
checkToken();
