import{b as s,j as e,y as d}from"./vendor.6fce431f.module.js";import{c as o,i as m}from"./index.5e18d48c.module.js";const h={personal:"C\xE1 nh\xE2n",business:"Doanh nghi\u1EC7p"},x={pending:"Ch\u01B0a ho\xE0n th\xE0nh",shipping:"\u0110ang v\u1EADn chuy\u1EC3n"},f=({store:n,type:t="standard",handleOnClick:i=()=>{},hasRightSide:c=!0,hasBorderBottom:l=!0,customRightSide:a,className:r})=>s("div",{className:o("flex flex-row items-center justify-between w-full",l&&" border-b",r&&r),onClick:i,children:[s("div",{className:"flex flex-row items-center",children:[e("div",{className:"w-auto flex-none",children:e("img",{src:m(n.pathImg),alt:"image product",className:" w-9 h-9 object-cover rounded-full bg-white"})}),s("div",{className:" p-3 pr-0",children:[e("div",{className:"line-clamp-2 text-sm font-medium break-words",children:n.nameStore}),t==="standard"&&e("span",{className:" pt-1 font-semibold text-sm text-gray-500",children:h[n.type]})]})]}),c&&(a||e(d,{size:20,zmp:"zi-chevron-right",className:" text-zinc-500"}))]},n.key);export{f as C,x as O};