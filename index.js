var x=Object.create;var i=Object.defineProperty,D=Object.defineProperties,F=Object.getOwnPropertyDescriptor,C=Object.getOwnPropertyDescriptors,b=Object.getOwnPropertyNames,s=Object.getOwnPropertySymbols,N=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable;var c=(t,e,r)=>e in t?i(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,f=(t,e)=>{for(var r in e||(e={}))a.call(e,r)&&c(t,r,e[r]);if(s)for(var r of s(e))p.call(e,r)&&c(t,r,e[r]);return t},l=(t,e)=>D(t,C(e)),S=t=>i(t,"__esModule",{value:!0});var d=(t,e)=>{var r={};for(var n in t)a.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&s)for(var n of s(t))e.indexOf(n)<0&&p.call(t,n)&&(r[n]=t[n]);return r};var T=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of b(e))!a.call(t,o)&&(r||o!=="default")&&i(t,o,{get:()=>e[o],enumerable:!(n=F(e,o))||n.enumerable});return t},L=(t,e)=>T(S(i(t!=null?x(N(t)):{},"default",!e&&t&&t.__esModule?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var w=require("fs"),y=L(require("node-fetch")),g=require("util");var u=require("fast-xml-parser"),M=new u.XMLParser({stopNodes:["rss.channel.item.description"]});function P(t){return t.startsWith("<![CDATA[")&&t.endsWith("]]>")?t.replace("<![CDATA[","").replace("]]>","").trimStart().trimEnd():t}function U(t){return t.replace(/(<([^>]+)>)/gi,"")}function h(t){let r=M.parse(t).rss.channel.item,n=[];return Array.isArray(r)?n=r:n.push(r),n.map(E=>{let m=E,{description:I}=m,v=d(m,["description"]);return l(f({},v),{description:U(P(I))})})}var W=(0,g.promisify)(w.writeFile),A=process.env.FEED_URL;if(A===void 0)throw new Error("environment variable FEED_ENV needs to be set");async function _(){let e=await(await(0,y.default)(A)).text(),r=h(e);await W("~/items.json",JSON.stringify(r),"utf-8")}_().then(()=>console.log("done.")).catch(t=>console.error(t));
//# sourceMappingURL=index.js.map
