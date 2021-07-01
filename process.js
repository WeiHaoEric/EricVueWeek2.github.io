//=== URL Settings ===
const BASE_URL = "https://vue3-course-api.hexschool.io";
const API_PATH = "hello-eric";
const Login_API = `${BASE_URL}/admin/signin`;
const USER_CHECK_API = `${BASE_URL}/api/user/check`;
const PRODUCT_API = `${BASE_URL}/api/${API_PATH}/admin/products`;
const DELETE_ITEM_API = `${BASE_URL}/api/${API_PATH}/admin/product`; // api_path/admin/product/:product_id
const ADD_PRODUCT_API = `${BASE_URL}/api/${API_PATH}/admin/product`; // api_path/admin/product

const EricApp = {
  init() {
    //=== Main Procedure ===
    const btnLogIn = document.querySelector("#login");
    const btnAddItem = document.querySelector("#add-item");
    
    btnLogIn.addEventListener("click", this.handleLogIn.bind(this));
    btnAddItem.addEventListener("click", this.handleAddItem.bind(this));


    this.checkToken();
  },

  //=== Handle Event Func ===
  handleLogIn() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    axios
      .post(Login_API, { username, password })
      .then((res) => {
        const { expired, token } = res.data;
        // document.cookie = `hexToken = ${token};expires = ${new Date(expired)}`;
        const expires = new Date(expired);
        document.cookie = `hexToken=${token}; expires=${expires};`;

        const loginInfo = document.querySelector(".login-info");
        loginInfo.innerHTML = `<h3 style="color:green">順利登入，可操作以下的商品</h3>`;

        console.log("===>this:", this);
        this.assignTokenToAxios(token);
      })
      .catch((rej) => console.log("failed:", rej));
  },

  handleAddItem() {
    // title(String)、category(String)、unit(String)、origin_price(Number)、price(Number) 為必填欄位
    const productName = document.querySelector("#product");
    const productNum = document.querySelector("#product-number");
    const originalPrice = document.querySelector("#original-price");
    const actualPrice = document.querySelector("#actual-price");
    const enableSelect = document.querySelector(".enable-select");

    const postData = {
      data: {
        title: productName.value,
        category: "life",
        unit: productNum.value,
        origin_price: parseInt(originalPrice.value),
        price: parseInt(actualPrice.value),
        is_enabled: enableSelect.value,
      },
    };

    axios
      .post(ADD_PRODUCT_API, postData)
      .then((res) => {
        console.log("商品新增成功:", res);
        this.render();
      })
      .catch((rej) => console.log("商品新增錯誤:", rej));
  },

  handleDeleteItem(prdId) {
    return () => {
      axios
        .delete(`${DELETE_ITEM_API}/${prdId}`)
        .then((res) => {
          console.log("成功刪除:", res);
          this.render();
        })
        .catch((rej) => {
          console.log("失敗刪除:", rej);
        });
    };
  },

  // === Check Cookie has token and expires
  assignTokenToAxios(newToken) {
    axios.defaults.headers.common["Authorization"] = newToken;

    axios.post(USER_CHECK_API).then((res) => {
      console.log("確認使用者是否登入:", res);
      if (res.data.success) this.render();
    });
  },

  checkToken() {
    const token = document.cookie.split(";")[0].split("=")[1];
    const loginInfo = document.querySelector(".login-info");
    loginInfo.innerHTML = token
      ? `<h3 style="color:green">順利登入，可操作以下的商品</h3>`
      : `<h3 style="color: rgba(244, 135, 135, 0.813)">請先登入</h3>`;

    if (token) this.assignTokenToAxios(token);
  },

  //=== Handle Event , ===
  render() {
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
        btn.addEventListener("click", this.handleDeleteItem(idList[idx]))
      );
    });
  },
};

EricApp.init();
