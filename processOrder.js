//=== URL Settings ===
const PRODUCT_API = `${BASE_URL}/api/${API_PATH}/admin/products`;
const DELETE_ITEM_API = `${BASE_URL}/api/${API_PATH}/admin/product`; ///api/:api_path/admin/product/:product_id

//=== Handle Event Function ===
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

console.log("Process Order!!");

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

render();
