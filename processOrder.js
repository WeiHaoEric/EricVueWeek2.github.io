//=== URL Settings ===
const PRODUCT_API = `${BASE_URL}/api/:${API_PATH}/products`;
console.log("Process Order!!");

axios.get(PRODUCT_API).then((res) => console.log(PRODUCT_API, res));
