(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[297],{5034:function(e,n,t){"use strict";t.d(n,{V:function(){return S}});var r=t(7294),o={root:"m-ddec01c0",icon:"m-dde7bd57",cite:"m-dde51a35"},i=t(8442),a=t(7625),l=t(9190),c=t(9231),s=t(7366),d=t(8533),u=t(5297),h=t(868),p=t(2151),m=t(6047),b=Object.defineProperty,x=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,g=(e,n,t)=>n in e?b(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,j=(e,n)=>{for(var t in n||(n={}))f.call(n,t)&&g(e,t,n[t]);if(x)for(var t of x(n))v.call(n,t)&&g(e,t,n[t]);return e},k=(e,n)=>{var t={};for(var r in e)f.call(e,r)&&0>n.indexOf(r)&&(t[r]=e[r]);if(null!=e&&x)for(var r of x(e))0>n.indexOf(r)&&v.call(e,r)&&(t[r]=e[r]);return t};let w={iconSize:48},y=(0,s.Z)((e,{color:n,iconSize:t,radius:r})=>{let o=(0,d.E)({color:n||e.primaryColor,theme:e,colorScheme:"dark"}),i=(0,d.E)({color:n||e.primaryColor,theme:e,colorScheme:"light"});return{root:{"--bq-bg-light":(0,u.m)(i.value,.07),"--bq-bg-dark":(0,u.m)(o.value,.06),"--bq-bd":(0,h.p)(n,e),"--bq-icon-size":(0,p.h)(t),"--bq-radius":(0,m.H5)(r)}}}),S=(0,i.d)((e,n)=>{let t=(0,a.w)("Blockquote",w,e),{classNames:i,className:s,style:d,styles:u,unstyled:h,vars:p,children:m,icon:b,iconSize:x,cite:f}=t,v=k(t,["classNames","className","style","styles","unstyled","vars","children","icon","iconSize","cite"]),g=(0,l.y)({name:"Blockquote",classes:o,props:t,className:s,style:d,classNames:i,styles:u,unstyled:h,vars:p,varsResolver:y});return r.createElement(c.x,j(j({component:"blockquote",ref:n},g("root")),v),b&&r.createElement("span",j({},g("icon")),b),m,f&&r.createElement("cite",j({},g("cite")),f))});S.classes=o,S.displayName="@mantine/core/Blockquote"},5694:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}});var r=(0,t(853).Z)("blockquote","IconBlockquote",[["path",{d:"M6 15h15",key:"svg-0"}],["path",{d:"M21 19h-15",key:"svg-1"}],["path",{d:"M15 11h6",key:"svg-2"}],["path",{d:"M21 7h-6",key:"svg-3"}],["path",{d:"M9 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2",key:"svg-4"}],["path",{d:"M3 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2",key:"svg-5"}]])},5643:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/breakdown",function(){return t(3736)}])},3736:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return w},default:function(){return y}});var r=t(5893),o=t(442),i=t(5034),a=t(1231),l=t(5240),c=t(3047),s=t(7294),d=t(862),u=t(5063),h=t(9554),p=t(6445),m=t(5772),b=t(2815);function x(e){let{image:n,value:t,label:o}=e;return(0,r.jsxs)(c.Z,{wrap:"nowrap",children:[n?(0,r.jsx)("img",{src:n,alt:o,width:25}):(0,r.jsx)(d.k,{w:25,color:"gray",radius:"xl",children:(0,r.jsx)(u.Z,{})}),(0,r.jsx)(a.x,{size:"sm",children:o})]})}function f(e){let{data:n,defaultOption:t,onChangeCb:o}=e,i=(0,h.K)({onDropdownClose:()=>i.resetSelectedOption()}),[a,l]=(0,s.useState)(n[null!=t?t:0].value),c=n.find(e=>e.value===a),d=n.map(e=>(0,r.jsx)(p.h.Option,{value:e.value,children:(0,r.jsx)(x,{...e})},e.value));return(0,r.jsxs)(p.h,{width:320,store:i,withinPortal:!1,onOptionSubmit:e=>{l(e),i.closeDropdown(),o(e)},children:[(0,r.jsx)(p.h.Target,{children:(0,r.jsx)(m.M,{component:"button",type:"button",pointer:!0,rightSection:(0,r.jsx)(p.h.Chevron,{}),onClick:()=>i.toggleDropdown(),rightSectionPointerEvents:"none",multiline:!0,children:c?(0,r.jsx)(x,{...c}):(0,r.jsx)(b.I.Placeholder,{children:"Pick value"})})}),(0,r.jsx)(p.h.Dropdown,{children:(0,r.jsx)(p.h.Options,{children:d})})]})}var v=t(5818),g=t(7378),j=t(2819),k=t(5694),w=!0;function y(e){let{anticheats:n,breakdown:t,...d}=e,{overview:u}=(0,s.useContext)(g.J),[h,p]=(0,s.useState)(n.at(0)),m=new Map(t),b=m.get(h);return(0,r.jsxs)(o.K,{align:"center",mt:70,mb:50,children:[(0,r.jsx)(i.V,{cite:"- Starz0r",mb:50,color:"gray",icon:(0,r.jsx)(k.Z,{}),children:(0,r.jsx)(a.x,{fz:"18px",children:"A comprehensive and crowd-sourced list of games using anti-cheats and their compatibility with GNU/Linux or Wine/Proton."})}),(0,r.jsx)(l.D,{mt:20,children:"Total"}),(0,r.jsx)(v.Z,{variant:u,total:d.total,broken:d.broken,denied:d.denied,planned:d.planned,running:d.running,supported:d.supported}),(0,r.jsxs)(c.Z,{mt:30,wrap:"nowrap",children:[(0,r.jsx)(l.D,{children:"Breakdown for"}),(0,r.jsx)(f,{searchable:!0,onChangeCb:p,value:h,nothingFoundMessage:"No such AntiCheat",placeholder:"Select Anticheat...",data:n.map(e=>{let n=(0,j.R7)(e);return{value:e,label:e,image:n}})})]}),(0,r.jsx)(v.Z,{variant:u,total:b.total,broken:b.broken,denied:b.denied,planned:b.planned,running:b.running,supported:b.supported})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=5643)}),_N_E=e.O()}]);