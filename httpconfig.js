/**
 * 小程序网络请求配置文件
 */
var host = "https://.net.cn/ssh_eshop_mysql"

var httpconfig = {
  // host
  hostUri: `${host}`,
  
  // 首页顶部swiper
  getOpenIdServlet: `${host}/GetOpenIdServlet.servlet`,

  // 首页顶部swiper
  topImagesPathListServlet: `${host}/TopImagesPathListServlet.servlet`,

  // 首页顶部tab栏
  categoryListServlet: `${host}/CategoryListServlet.servlet`,

  // 首页产品列表
  productListByCategoryServlet: `${host}/ProductListByCategoryServlet.servlet`,

  // 产品详情页数据
  productDetailByProductIdService: `${host}/ProductDetailByProductIdServlet.servlet`,

  // 产品详情页数据
  saveCarProductServlet: `${host}/SaveCarProductServlet.servlet`,

  // 获取用户的购物车产品数据
  getCarProductServlet: `${host}/GetCarProductServlet.servlet`,

  // 获取用户地址数据
  getUserByUserIdServlet: `${host}/GetUserByUserIdServlet.servlet`,

  // 保存用户地址数据
  updateUserInformationServlet: `${host}/UpdateUserInformationServlet.servlet`,

  //获取历史订单数据
  getIndentHistoryServlet: `${host}/GetIndentHistoryServlet.servlet`,

  //下单
  buyProductServlet: `${host}/BuyProductServlet.servlet`,
};

module.exports = httpconfig