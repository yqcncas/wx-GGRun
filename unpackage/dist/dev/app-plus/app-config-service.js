
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/Tip/Tip","pages/Course/Course","pages/AndDownload/AndDownload","pages/IphoneDownload/IphoneDownload","pages/storage/storage","pages/address/address","pages/editAddress/editAddress","pages/discount/discount","pages/enter/enter","pages/register/register","pages/ChangePwd/changePwd","pages/SuccessOrder/SuccessOrder","pages/Explain/Explain","pages/shopInfo/shopInfo","pages/freightDeatail/freightDeatail","pages/rich-text/rich-text","pages/remark/remark"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"GG来送","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF"},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"GG来送小程序","compilerVersion":"2.6.16","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"GG来送"}},{"path":"/pages/Tip/Tip","meta":{},"window":{"navigationBarTitleText":"提示"}},{"path":"/pages/Course/Course","meta":{},"window":{"navigationBarTitleText":"安装提示"}},{"path":"/pages/AndDownload/AndDownload","meta":{},"window":{"navigationBarTitleText":"Android下载"}},{"path":"/pages/IphoneDownload/IphoneDownload","meta":{},"window":{"navigationBarTitleText":"iPhone下载"}},{"path":"/pages/storage/storage","meta":{},"window":{"navigationBarTitleText":"GG来送"}},{"path":"/pages/address/address","meta":{},"window":{"navigationBarTitleText":"地址薄"}},{"path":"/pages/editAddress/editAddress","meta":{},"window":{"navigationBarTitleText":"编辑地址"}},{"path":"/pages/discount/discount","meta":{},"window":{"navigationBarTitleText":"优惠券"}},{"path":"/pages/enter/enter","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/ChangePwd/changePwd","meta":{},"window":{"navigationBarTitleText":"忘记密码"}},{"path":"/pages/SuccessOrder/SuccessOrder","meta":{},"window":{"navigationBarTitleText":"下单成功"}},{"path":"/pages/Explain/Explain","meta":{},"window":{"navigationBarTitleText":"使用说明"}},{"path":"/pages/shopInfo/shopInfo","meta":{},"window":{"navigationBarTitleText":"商品信息"}},{"path":"/pages/freightDeatail/freightDeatail","meta":{},"window":{"navigationBarTitleText":"运费明细"}},{"path":"/pages/rich-text/rich-text","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/remark/remark","meta":{},"window":{"navigationBarTitleText":"备注"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
