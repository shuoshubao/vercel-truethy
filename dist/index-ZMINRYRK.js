(()=>{var I=Object.create;var u=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var D=Object.getPrototypeOf,L=Object.prototype.hasOwnProperty;var s=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var U=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of A(e))!L.call(t,i)&&i!==o&&u(t,i,{get:()=>e[i],enumerable:!(r=b(e,i))||r.enumerable});return t};var p=(t,e,o)=>(o=t!=null?I(D(t)):{},U(e||!t||!t.__esModule?u(o,"default",{value:t,enumerable:!0}):o,t));var c=s((v,f)=>{f.exports=window.React});var h=s((M,y)=>{y.exports=window.ReactDOM});var E=s(l=>{"use strict";var g=h();l.createRoot=g.createRoot,l.hydrateRoot=g.hydrateRoot;var q});var x=s((J,C)=>{C.exports=window.antd});var T=s((z,w)=>{w.exports=window._});var P=p(c()),O=p(E());var a=p(x()),_=p(T()),n=p(c()),$={GET:"#0f6ab4",POST:"#10a54a",PUT:"#c5862b",DELETE:"#a41e22",PATCH:"#d38042",HEAD:"#ffd20f"},j=[{title:"Method",dataIndex:"method",width:70,render(t){let e=t.toUpperCase();return n.default.createElement(a.Tag,{style:{margin:0},color:$[e]},e)}},{title:"Url",dataIndex:"url"},{title:"Description",dataIndex:"description"},{title:"Args",dataIndex:"args",render(t){let{type:e,properties:o}=t;return e==="object"?(Object.entries(o).forEach(([r,i])=>{delete o[r].examples}),n.default.createElement("pre",{style:{margin:0}},n.default.createElement("code",null,JSON.stringify(o," ",2)))):"-"}},{title:"Example",dataIndex:"args",render(t,e){let{method:o,url:r}=e,{type:i,examples:S}=t;if(i==="object"){let[m]=S,d="";return o==="get"?d=`
            fetch('${r}?${new URLSearchParams(m)}')
          `:d=`
            fetch('${r}', {
              method: '${o.toUpperCase()}',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: '${JSON.stringify(m)}'
            })
          `,n.default.createElement("pre",{style:{margin:0}},n.default.createElement("code",null,d.trim()))}return o==="get"?`fetch('${r}')`:`fetch('${r}', {
        method: '${o.toUpperCase()}',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })`}}],R=t=>{let e=t.RouterList??(0,_.get)(window,"globalData.RouterList");return n.default.createElement(a.ConfigProvider,{componentSize:"small"},n.default.createElement(a.Card,{title:"API"},n.default.createElement(a.Table,{rowKey:"url",columns:j,dataSource:e})))};(0,O.hydrateRoot)(document.querySelector("#app"),P.default.createElement(R,null));})();
