//=== URL Settings ===
const BASE_URL = "https://vue3-course-api.hexschool.io";
const API_PATH = "hello-eric";
const Login_API = `${BASE_URL}/admin/signin`;
const USER_CHECK_API = `${BASE_URL}/api/user/check`;
const PRODUCT_API = `${BASE_URL}/api/${API_PATH}/admin/products`;
const DELETE_ITEM_API = `${BASE_URL}/api/${API_PATH}/admin/product`; ///api/:api_path/admin/product/:product_id

// TBD: temp for test
// const token = `eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjI0MTc1NzI2LCJ1c2VyX2lkIjoiMWYwRVo0bVhselRJbTdYWEZzc1huZ0JlQmd0MiIsInN1YiI6IjFmMEVaNG1YbHpUSW03WFhGc3NYbmdCZUJndDIiLCJpYXQiOjE2MjQxNzU3MjYsImV4cCI6MTYyNDYwNzcyNiwiZW1haWwiOiJ2dWFybmV0MDMxOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ2dWFybmV0MDMxOEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mKO2W0Srki9gLD9Uff8nlbzQNqAl59ekHSjRRey9ttpl8_nTIPRJy3obz_RIAjz_fSfybP4axt6fRhFQul30RUfrdmnJ0wLpMS_CK3At1o1Zi6WXkqnPYn8HrAzqNVchLU8wVgvtRjnKiPeLu-1-uFLXkdXY6-5e4llhhNr9Mhl2n76z6ST4_CBLqvOycdnNmqYLra9wYJZWN-GxejFrqNUgGb--P7E3vsTlFdD7wqa8SMtB8SsJsD6efj0oJJbZ_XO3VcKiCIHdwaiuuC2AMopOX6C9pwAlwheYBIJnOgOjm67_Do_7n14LV7AKWm7-lO-nuW7zLnrN-rIvmxJ9Gw`;

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

function handleDeleteItem(prdId) {
  return () => {
    axios
      .delete(`${DELETE_ITEM_API}/${prdId}`)
      .then((res) => {
        console.log("成功刪除:", res);
        render();
      })
      .catch((rej) => {
        console.log("失敗刪除:", rej);
      });
  };
}

// === Check Cookie has token and expires
function assignTokenToAxios(newToken) {
  console.log("===>assignTokenToAxios", newToken);
  axios.defaults.headers.common["Authorization"] = newToken;

  axios.post(USER_CHECK_API).then((res) => {
    console.log("check user:", res);
    if (res.data.success) render();
  });
}

function checkToken() {
  console.log("===>checkToken:", document.cookie);
  const token = document.cookie.split(";")[0].split("=")[1];
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

//======

//=== Handle Event Function ===
function render() {
  const idList = [];
  axios.get(PRODUCT_API).then((res) => {
    const table = document.querySelector("#productList");
    const { success, products } = res.data;

    let renderData = "";
    products.forEach(
      ({ title, origin_price, price, is_enabled, id: prdId }, idx) => {
        renderData += `
			<tr>
					<td width=${"120"} style="text-align:center">${title}</td>
					<td width=${"120"} style="text-align:center">${origin_price}</td>
					<td width=${"120"} style="text-align:center">${price}</td>
					<td width=${"150"} style="text-align:center">${is_enabled ? "是" : "否"}</td>
					<td width=${"120"} style="text-align:center">
						<button type="button" id="btn-delete">
							刪除
						</button">
					</td>
			</tr>
	`;

        idList.push(prdId);
      }
    );

    table.innerHTML = success ? renderData : null;

    const btnList = document.querySelectorAll("#btn-delete");
    btnList.forEach((btn, idx) =>
      btn.addEventListener("click", handleDeleteItem(idList[idx]))
    );
  });
}
