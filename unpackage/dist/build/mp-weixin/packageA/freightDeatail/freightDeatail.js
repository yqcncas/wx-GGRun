(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageA/freightDeatail/freightDeatail"],{"2b23":function(t,i,e){"use strict";e.r(i);var n=e("437e"),r=e.n(n);for(var f in n)"default"!==f&&function(t){e.d(i,t,(function(){return n[t]}))}(f);i["default"]=r.a},"437e":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={onLoad:function(t){this.freightInfo=JSON.parse(t.freightInfo),this.disposeSpecialTimePrice(),console.log(this.freightInfo),this.status=t.status},data:function(){return{freightInfo:{},status:0}},computed:{youhuiPrice:function(){var t=Number(this.freightInfo.goodsPredictAmount+this.freightInfo.taskReward-this.freightInfo.payAmount).toFixed(2);return console.log(t),t},newsyouhuiPrice:function(){var t=Number(this.freightInfo.taskReward-this.freightInfo.payAmount).toFixed(2);return console.log(t),t},elsePrice:function(){var t=Number(this.freightInfo.otherPrice-this.freightInfo.weatherSubsidy).toFixed(2);return console.log(t),t}},methods:{disposeSpecialTimePrice:function(){"{}"!=JSON.stringify(this.freightInfo)&&(null==this.freightInfo.specialTimePrice&&(this.freightInfo.specialTimePrice=0),"null"==this.freightInfo.specialTimePrice&&(this.freightInfo.specialTimePrice=0),"null"==this.freightInfo.goodsPredictAmount&&(this.freightInfo.goodsPredictAmount=0),null==this.freightInfo.goodsPredictAmount&&(this.freightInfo.goodsPredictAmount=0))}}};i.default=n},7893:function(t,i,e){"use strict";var n,r=function(){var t=this,i=t.$createElement,e=(t._self._c,JSON.stringify(t.freightInfo)),n=JSON.stringify(t.freightInfo),r=JSON.stringify(t.freightInfo),f=JSON.stringify(t.freightInfo),o=JSON.stringify(t.freightInfo),s=JSON.stringify(t.freightInfo),u=JSON.stringify(t.freightInfo),c=JSON.stringify(t.freightInfo),a=JSON.stringify(t.freightInfo);t.$mp.data=Object.assign({},{$root:{g0:e,g1:n,g2:r,g3:f,g4:o,g5:s,g6:u,g7:c,g8:a}})},f=[];e.d(i,"b",(function(){return r})),e.d(i,"c",(function(){return f})),e.d(i,"a",(function(){return n}))},"95f3":function(t,i,e){"use strict";var n=e("ceec"),r=e.n(n);r.a},ceec:function(t,i,e){},cf53:function(t,i,e){"use strict";(function(t){e("297d");n(e("66fd"));var i=n(e("eb08"));function n(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,e("543d")["createPage"])},eb08:function(t,i,e){"use strict";e.r(i);var n=e("7893"),r=e("2b23");for(var f in r)"default"!==f&&function(t){e.d(i,t,(function(){return r[t]}))}(f);e("95f3");var o,s=e("f0c5"),u=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);i["default"]=u.exports}},[["cf53","common/runtime","common/vendor"]]]);