(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[154],{1832:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/editor",function(){return n(428)}])},428:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return C}});var s=n(5893),a=n(8540),o=n(9231),l=n(3047),r=n(1412),c=n(1231),i=n(1059),u=n(442),d=n(8233),p=n(7218),h=n(3909),g=n(473),x=n(5990),m=n(8687),j=n(2557),f=n(5572),b=n(2600),v=n(5294),w=n(4075),I=n(3600),y=n(330),P=n(7294);let S=n(7596),k=[...new Set(f.map(e=>e.anticheats).flat())].map(e=>({value:e,label:e}));function C(e){let{style:t}=e,{width:n}=(0,b.n)(),C=(0,y.c)({initialValues:f}),[N,z]=P.useState(null),[_,D]=P.useState(0),R=C.values[_],T=R.slug,U=(0,s.jsxs)(a.U.Item,{value:T,children:[(0,s.jsxs)(o.x,{style:{display:"flex",alignItems:"center"},children:[(0,s.jsx)(a.U.Control,{children:(0,s.jsxs)(l.Z,{wrap:"nowrap",children:[(0,s.jsx)(r.q,{src:R.logo,radius:"xl",size:"lg"}),(0,s.jsx)(c.x,{children:R.name})]})}),(0,s.jsx)(i.A,{size:"lg",onClick:()=>{C.values.splice(_,1),C.setDirty(null),D(0)},children:(0,s.jsx)(w.Z,{size:16})})]}),(0,s.jsxs)(u.K,{align:"stretch",justify:"center",children:[(0,s.jsx)(d.o,{label:"URL",...C.getInputProps("".concat(_,".url"))}),(0,s.jsx)(d.o,{label:"Slug",required:!0,...C.getInputProps("".concat(_,".slug"))}),(0,s.jsx)(d.o,{label:"Game Name",required:!0,...C.getInputProps("".concat(_,".name"))}),(0,s.jsx)(d.o,{label:"Logo URL",...C.getInputProps("".concat(_,".logo"))}),(0,s.jsx)(p.X,{label:"Runs on Linux natively?",...C.getInputProps("".concat(_,".native"),{type:"checkbox"})}),(0,s.jsx)(h.p,{data:["Broken","Running","Denied","Supported","Planned"],label:"Status",...C.getInputProps("".concat(_,".status"))}),(0,s.jsx)(d.o,{label:"Reference Information on Status",...C.getInputProps("".concat(_,".reference"))}),(0,s.jsx)(g.N,{data:k,label:"Anti-Cheat(s) In-use",searchable:!0,required:!0,...C.getInputProps("".concat(_,".anticheats"))}),"Updates",C.values[_].updates.map((e,t)=>(0,s.jsxs)("div",{children:[(0,s.jsx)(d.o,{label:"Title",...C.getInputProps("".concat(_,".updates.").concat(t,".name"))}),(0,s.jsx)(d.o,{label:"Reference URL",...C.getInputProps("".concat(_,".updates.").concat(t,".reference"))}),(0,s.jsx)(d.o,{label:"Date & Time",...C.getInputProps("".concat(_,".updates.").concat(t,".date"))}),(0,s.jsx)(x.z,{color:"red",onClick:()=>{C.removeListItem("".concat(_,".updates"),t)},children:"Remove Above Update"})]},t)),(0,s.jsx)(x.z,{onClick:()=>{C.insertListItem("".concat(_,".updates"),{name:"",date:new Date(Date.now()).toUTCString(),reference:""})},children:"Add Update"}),"Notes",R.notes.map((e,t)=>(0,s.jsxs)("div",{children:[(0,s.jsx)(d.o,{label:"Title",...C.getInputProps("".concat(_,".notes.").concat(t,".0"))}),(0,s.jsx)(d.o,{label:"Reference URL",...C.getInputProps("".concat(_,".notes.").concat(t,".1"))}),(0,s.jsx)(x.z,{color:"red",onClick:()=>{C.removeListItem("".concat(_,".notes"),t)},children:"Remove Above Note"})]},t)),(0,s.jsx)(x.z,{onClick:()=>{C.insertListItem("".concat(_,".notes"),[,,])},children:"Add Note"}),(0,s.jsx)("div",{})]},T)]},T);return(0,s.jsxs)(u.K,{align:"center",children:["You should never see this text. This text purely exists to push down the dropdown into view. If you can see this text, notify a maintainer.",(0,s.jsx)(h.p,{id:"gamesDropdown",data:C.values.map(e=>e.name),label:"Games",onChange:e=>{D(e.currentTarget.selectedIndex)},defaultValue:C.values[_].name}),(0,s.jsx)(m.x,{type:"never",w:t?void 0:.8*n,className:t,children:(0,s.jsxs)(a.U,{defaultValue:"gamelist",children:[(0,s.jsxs)("form",{children:[U,(0,s.jsx)(x.z,{color:"lime",onClick:()=>{C.values.push({url:"",slug:"new-game-"+(0,v.k)(),name:"",logo:"",native:!1,status:"Broken",reference:"",anticheats:[,],updates:[],notes:[],storeIds:{},dateChanged:new Date(Date.now()).toISOString()}),D(C.values.length-1),C.setDirty(null)},children:"Add New Game"}),(0,s.jsx)(x.z,{variant:"light",onClick:async()=>{let e=new Map(C.values.map(e=>[e.slug,e])),t=new Map(f.map(e=>[e.slug,e]));for(let[n,s]of e)try{S.deepStrictEqual(s,t.get(n))}catch(e){C.values.find((e,t)=>{e.slug===n&&(C.values[t].dateChanged=new Date(Date.now()).toISOString())})}let n={method:"POST",mode:"cors",cache:"no-cache",referrerPolicy:"no-referrer",body:JSON.stringify(C.values,null,4),headers:{"Content-Type":"application/json"}};try{let e=await fetch("https://export.areweanticheatyet.com/submit",n);e.ok?z((0,s.jsx)(j.b,{icon:(0,s.jsx)(I.Z,{size:16}),title:"Submitted!",color:"lime",children:"Your requested changes were successfully sent off for processing and review. Please wait up to 72 for changes to propagate."})):z((0,s.jsx)(j.b,{icon:(0,s.jsx)(I.Z,{size:16}),title:"No luck, try again later.",color:"yellow",children:"A small problem occured when trying to submit your changes. Please wait at least 5 minutes before retrying."}))}catch(e){z((0,s.jsx)(j.b,{icon:(0,s.jsx)(I.Z,{size:16}),title:"Possible Server Issue.",color:"red",children:"There was a problem reaching the submission server. Please try again later."})),console.error(e)}},children:"Submit Changes"})]}),N]})})]})}}},function(e){e.O(0,[207,774,888,179],function(){return e(e.s=1832)}),_N_E=e.O()}]);