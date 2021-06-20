//=== URL Settings ===
const ALL_PRODUCT_API = `${BASE_URL}/api/:${API_PATH}/products/all`; ///api/:api_path/products/all
const ADD_PRODUCT_API = `${BASE_URL}/api/:${API_PATH}/admin/product`;

console.log("Process Order!!");

//=== Get DOMs ===
const productName = document.querySelector("#product");
const productNum = document.querySelector("#product-number");

const originalPrice = document.querySelector("#original-price");
const actualPrice = document.querySelector("#actual-price");
const enableSelect = document.querySelector(".enable-select");
const btnAddItem = document.querySelector("#add-item");

// console.log(btnAddItem, productName, originalPrice, actualPrice, enableSelect);

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

function handleAddItem() {
  const postData = {
    title: productName.value,
    unit: productNum.value,
    origin_price: originalPrice.value,
    price: actualPrice.value,
    is_enabled: enableSelect.value,
  };

  console.log("===>handleAddItem:", postData);
  axios.post(ADD_PRODUCT_API, postData).then((res) => {
    console.log("add_item", res);
  });
}

btnAddItem.addEventListener("click", handleAddItem);

// axios.get(ALL_PRODUCT_API).then((res) => console.log(ALL_PRODUCT_API, res));
