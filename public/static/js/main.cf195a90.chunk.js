(this.webpackJsonpsilence_remover_view=this.webpackJsonpsilence_remover_view||[]).push([[0],{80:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(24),i=n.n(r),s=n(22),o=n(27),l=n(108),j=n(111),u=n(112),d=n(117),b=n(113),h=n(116),p=n(110),m=n(83),f=n(40),g=n.n(f),x=n(45),O=n(109),v=n(118),w=n(115),y=n(51),k=n.n(y),S=n(46),I=n(107),B=n(114),_=n(2);function F(e){return Object(_.jsxs)(B.a,{display:"flex",alignItems:"center",children:[Object(_.jsx)(B.a,{width:"100%",mr:1,children:Object(_.jsx)(I.a,Object(S.a)({variant:"determinate"},e))}),Object(_.jsx)(B.a,{minWidth:35,children:Object(_.jsx)(m.a,{variant:"body2",color:"textSecondary",children:"".concat(Math.round(e.value),"%")})})]})}var A=n(42);n(71),n(81);A.a.initializeApp({apiKey:"AIzaSyBb_EoxxeKeP3rz2PxsdnkhweWas3aJ6j8",authDomain:"silence-remover-311310.firebaseapp.com",projectId:"silence-remover-311310",storageBucket:"silence-remover-311310.appspot.com",messagingSenderId:"624264456579",appId:"1:624264456579:web:93d49901462b545ff2aeb6",measurementId:"G-EYY26ZH17C"});var C=A.a,E=Object(l.a)((function(e){return{input:{display:"none"},warn:{textAlign:"right",fontSize:"5px",color:"gray"}}}));function P(e){var t=e.callback,n=E(),r=Object(a.useState)(null),i=Object(s.a)(r,2),o=i[0],l=i[1],j=Object(a.useState)(-30),u=Object(s.a)(j,2),d=u[0],b=u[1],h=Object(a.useState)(null),p=Object(s.a)(h,2),f=p[0],y=p[1],S=function(){var e=Object(x.a)(g.a.mark((function e(n){var a,c,r,i,s,o;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=n.currentTarget.files[0],y(a),c=C.app().storage(),r=c.ref(),i=C.auth().currentUser,s=r.child("files/".concat(i.uid,"/_").concat(d,"dB_").concat(a.name)),(o=s.put(a)).on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes*100;l(t)})),o.then((function(e){console.info(e),t(s.name)}));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(_.jsx)(c.a.Fragment,{children:Object(_.jsxs)(O.a,{container:!0,justify:"space-around",children:[Object(_.jsxs)(O.a,{item:!0,xs:12,children:[Object(_.jsx)(m.a,{id:"discrete-slider",gutterBottom:!0,children:"\u7121\u97f3\u3057\u304d\u3044\u5024(dB)"}),Object(_.jsx)(v.a,{defaultValue:-30,getAriaValueText:function(e){return"-".concat(e," dB")},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:10,marks:!0,onChange:function(e,t){return b(t)},min:-80,max:-10}),Object(_.jsx)("div",{className:n.warn,children:"\u3053\u306e\u6570\u5024\u3088\u308a\u3082\u4e0b\u306e\u97f3\u91cf\u3092\u524a\u9664\u3057\u307e\u3059\u3002\u7121\u97f3\u304c\u307e\u3060\u6b8b\u3063\u3066\u3044\u308b\u3068\u304d\u306f\u53f3\u306b\u3082\u3063\u3066\u3044\u304d\u307e\u3057\u3087\u3046"})]}),Object(_.jsxs)(O.a,{item:!0,container:!0,xs:12,justify:"center",children:[Object(_.jsx)("input",{accept:"audio/*",className:n.input,onChange:S,id:"contained-button-file",type:"file"}),Object(_.jsx)("label",{htmlFor:"contained-button-file",children:Object(_.jsx)(w.a,{disabled:!!f,component:"span",variant:"contained",color:"primary",size:"large",startIcon:Object(_.jsx)(k.a,{}),children:"\u30d5\u30a1\u30a4\u30eb\u3092\u9078\u629e "})})]}),Object(_.jsx)(O.a,{item:!0,xs:12,children:Object(_.jsx)(m.a,{align:"center",children:null===f||void 0===f?void 0:f.name})}),Object(_.jsx)(O.a,{item:!0,xs:12,children:o?Object(_.jsx)(F,{value:o}):null})]})})}function T(e){var t=e.filename,n=e.callback;return c.a.useEffect((function(){if(t)var e=C.app().storage(),a=C.auth().currentUser,c=e.ref(),r=c.child("files/".concat(a.uid)),i=setInterval((function(){return r.listAll().then((function(e){var r;(console.info(e.items),null===(r=e.items.find((function(e){return e.name==="out_".concat(t)})))||void 0===r?void 0:r.name)&&c.child("files/".concat(a.uid,"/out_").concat(t)).getDownloadURL().then((function(e){clearInterval(i),window.open(e),n()}))}))}),5e3)}),[t]),Object(_.jsx)(c.a.Fragment,{children:Object(_.jsx)(O.a,{container:!0,children:Object(_.jsx)(O.a,{item:!0,xs:12,children:Object(_.jsxs)(m.a,{align:"center",children:["\u30d5\u30a1\u30a4\u30eb\u306e\u5909\u63db\u3092\u5f85\u3063\u3066\u3044\u307e\u3059\u3002\u3002\u3002",Object(_.jsx)(I.a,{})]})})})})}function z(e){e.filename,e.callback;return Object(_.jsx)(c.a.Fragment,{children:Object(_.jsxs)(O.a,{container:!0,children:[Object(_.jsx)(O.a,{item:!0,xs:12,children:Object(_.jsx)(m.a,{align:"center",variant:"h4",children:"\u5909\u63db\u304c\u5b98\u50da\u3057\u307e\u3057\u305f\u3002"})}),Object(_.jsx)(O.a,{item:!0,xs:12,children:Object(_.jsx)(m.a,{align:"center",variant:"h6",children:"\u97f3\u58f0\u304c\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3055\u308c\u307e\u3059\u3002"})})]})})}function L(){return Object(_.jsxs)(m.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyright \xa9 ",Object(_.jsx)(p.a,{color:"inherit",href:"https://twitter.com/techan54321",children:"\u7121\u97f3\u30ea\u30e0\u30fc\u30d0\u30fc from 165cmtallboy"})," ",(new Date).getFullYear(),".",Object(_.jsx)(p.a,{color:"inherit",href:"https://forms.gle/kcP2bX38ro7ni3436",children:"\u304a\u554f\u3044\u5408\u308f\u305b"})," "]})}var N=Object(l.a)((function(e){return{layout:Object(o.a)({width:"auto",marginLeft:e.spacing(2),marginRight:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(2)),{width:600,marginLeft:"auto",marginRight:"auto"}),paper:Object(o.a)({marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(3)),{marginTop:e.spacing(6),marginBottom:e.spacing(6),padding:e.spacing(3)}),stepper:{padding:e.spacing(3,0,5)},button:{marginTop:e.spacing(3),marginLeft:e.spacing(1)}}})),D=["\u30d5\u30a1\u30a4\u30eb\u3092\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9","\u30c7\u30fc\u30bf\u3092\u5909\u63db","\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9"];function U(){var e=N(),t=c.a.useState(0),n=Object(s.a)(t,2),a=n[0],r=n[1],i=c.a.useState(null),o=Object(s.a)(i,2),l=o[0],p=o[1];c.a.useEffect((function(){C.auth().onAuthStateChanged((function(e){if(e)console.info("okay i know who you are:",e);else{console.info("user not logged in!");var t=new C.auth.GoogleAuthProvider;t.setCustomParameters({hd:"g.kogakuin.jp"}),C.auth().signInWithPopup(t).then((function(e){var t=e.user;console.info("okay logged in:",t)})).catch((function(e){alert(e.message),window.location.reload()}))}}))}),[]);var f=function(e){r(1),p(e)},g=function(){r(2)};return Object(_.jsxs)(c.a.Fragment,{children:[Object(_.jsx)(j.a,{}),Object(_.jsxs)("main",{className:e.layout,children:[Object(_.jsxs)(u.a,{className:e.paper,children:[Object(_.jsx)(m.a,{component:"h1",variant:"h4",align:"center",children:"\u7121\u97f3\u30ea\u30e0\u30fc\u30d0\u30fc"}),Object(_.jsx)(d.a,{activeStep:a,className:e.stepper,children:D.map((function(e){return Object(_.jsx)(b.a,{children:Object(_.jsx)(h.a,{children:e})},e)}))}),Object(_.jsx)(c.a.Fragment,{children:Object(_.jsx)(c.a.Fragment,{children:function(e){switch(e){case 0:return Object(_.jsx)(P,{callback:f});case 1:return Object(_.jsx)(T,{filename:l,callback:g});case 2:return Object(_.jsx)(z,{});default:throw new Error("Unknown step")}}(a)})})]}),Object(_.jsx)(L,{})]})]})}i.a.render(Object(_.jsx)(c.a.StrictMode,{children:Object(_.jsx)(U,{})}),document.getElementById("root"))}},[[80,1,2]]]);
//# sourceMappingURL=main.cf195a90.chunk.js.map