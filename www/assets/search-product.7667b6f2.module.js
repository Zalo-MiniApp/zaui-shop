var c=Object.defineProperty;var o=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;var n=(a,e,t)=>e in a?c(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,l=(a,e)=>{for(var t in e||(e={}))m.call(e,t)&&n(a,t,e[t]);if(o)for(var t of o(e))u.call(e,t)&&n(a,t,e[t]);return a};import{r as h,j as r,P as p,g as P,x as g}from"./vendor.0e784a4e.module.js";import{C as f}from"./cart-item-horizontal.718b9ede.module.js";import{h as v,s as x,a as I}from"./index.ae370a27.module.js";import{C as j}from"./card.6d7c1d80.module.js";const w=()=>{const a=[],[e,t]=h.exports.useState({items:[],topPosition:0}),d=(s,i)=>{t(l({},i))};return r(p,{onPageBeforeIn:v,onPageBeforeOut:x,name:"search-product",className:"bg-white",children:r(j,{title:"365 S\u1EA3n ph\u1EA9m",children:r(P,{noHairlines:!0,noHairlinesBetween:!0,virtualList:!0,virtualListParams:{items:I.state.productResult,renderExternal:d,height:104},children:r("ul",{children:e.items.map((s,i)=>r(g,{link:"#",style:{top:`${e.topPosition}px`},virtualListIndex:a.indexOf(s),children:r("div",{className:" mb-2",children:r(f,{productId:i,pathImg:s.pathImg,nameProduct:s.nameProduct,salePrice:s.salePrice,retailPrice:s.retailPrice,pickerMode:!1})})},i))})})})})};export{w as default};