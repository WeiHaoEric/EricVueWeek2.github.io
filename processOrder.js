//=== URL Settings ===
const PRODUCT_API = `${BASE_URL}/api/${API_PATH}/admin/products`;

console.log("Process Order!!");

//=== Handle Event Func ===
// {
//     "data": {
//       "title": "[賣]動物園造型衣服3",
//       "category": "衣服2",
//       "origin_price": 100,
//       "price": 300,
//       "unit": "個",
//       "description": "Sit down please 名設計師設計",
//       "content": "這是內容",
//       "is_enabled": 1,
//       "imageUrl" : "主圖網址",
//       "imagesUrl": [
//         "圖片網址一",
//         "圖片網址二",
//         "圖片網址三",
//         "圖片網址四",
//         "圖片網址五"
//       ]
//     }
//   }

axios.get(PRODUCT_API).then((res) => {
  console.log("商品列表：", res.data);
  const table = document.querySelector("#productList");

  const { success, products } = res.data;

  let renderData = "";
  products.forEach(({ title, origin_price, price, is_enabled }) => {
    renderData += `
    <tr>
        <td width=${"120"} style="text-align:center">${title}</td>
        <td width=${"120"} style="text-align:center">${origin_price}</td>
        <td width=${"120"} style="text-align:center">${price}</td>
        <td width=${"150"} style="text-align:center">${
      is_enabled ? "是" : "否"
    }</td>
        <td width=${"120"} style="text-align:center"><button type="button">刪除</button"></td>
    </tr>
`;
  });

  table.innerHTML = success ? renderData : null;
});
