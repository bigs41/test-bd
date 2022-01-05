(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{105:function(t,n,e){"use strict";var c=e(8),l=Object(c.defineComponent)({name:"SLogo",setup:function(){return{isAnimating:Object(c.ref)(!1)}}}),o=e(6),r=Object(o.a)(l,(function(){var t=this.$createElement,n=this._self._c||t;return n("svg",{staticClass:"c-logo",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 64 64",preserveAspectRatio:"none"}},[n("defs",[n("mask",{attrs:{id:"logoMask"}},[n("circle",{attrs:{cx:"32",cy:"32",r:"32",fill:"#FFF"}}),this._v(" "),n("g",{attrs:{stroke:"#000",fill:"none","stroke-linecap":"round","stroke-width":"2"}},[n("path",{staticClass:"c-logo__line",class:{"c-logo__line--animating":this.isAnimating},attrs:{d:"M44.963 26.545c.444-.505.46-1.256-.014-1.743l-5.854-6.037c-1.852-1.91-4.28-2.865-6.708-2.865s-4.856.955-6.708 2.865c-3.705 3.82-3.705 10.015 0 13.835l5.87 6.052c.243.23.548.348.851.348.302 0 .602-.118.838-.361l5.857-6.04 5.867-6.054z"}}),this._v(" "),n("path",{staticClass:"c-logo__line",class:{"c-logo__line--animating":this.isAnimating},attrs:{d:"M19.737 38.155c-.444.505-.46 1.256.014 1.743l5.854 6.037c1.852 1.91 4.28 2.865 6.708 2.865s4.856-.955 6.708-2.865c3.705-3.82 3.705-10.015 0-13.835l-5.87-6.052a1.246 1.246 0 0 0-.851-.348c-.302 0-.602.118-.838.361l-5.857 6.04-5.867 6.054z"}})])])]),this._v(" "),n("circle",{staticClass:"c-logo__circle",attrs:{cx:"32",cy:"32",r:"32",fill:"currentColor",mask:"url(#logoMask)"}})])}),[],!1,null,null,null).exports,v=Object(c.defineComponent)({name:"SNavigation",components:{SLogo:r},setup:function(){return{nlPath:Object(c.computed)((function(){return"/nl/"})),enPath:Object(c.computed)((function(){return"/"}))}}}),_=Object(o.a)(v,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("nav",{staticClass:"c-navigation"},[e("nuxt-link",{staticClass:"c-navigation__logo",attrs:{to:"/"}},[e("s-logo"),t._v(" "),e("span",{staticClass:"sr-only"},[t._v("Home")])],1),t._v(" "),e("div",{staticClass:"c-navigation__left"},[e("nuxt-link",{staticClass:"c-navigation__item",attrs:{to:"/","active-class":"c-navigation__item--active",exact:""}},[t._v("\n      Home\n    ")]),t._v(" "),e("nuxt-link",{staticClass:"c-navigation__item",attrs:{to:"/work","active-class":"c-navigation__item--active"}},[t._v("\n      Work\n    ")]),t._v(" "),e("nuxt-link",{staticClass:"c-navigation__item",attrs:{to:"/about","active-class":"c-navigation__item--active",exact:""}},[t._v("\n      About\n    ")]),t._v(" "),e("nuxt-link",{staticClass:"c-navigation__item",attrs:{to:"/articles","active-class":"c-navigation__item--active"}},[t._v("\n      Articles\n    ")]),t._v(" "),e("nuxt-link",{staticClass:"c-navigation__item",attrs:{to:"/contact","active-class":"c-navigation__item--active",exact:""}},[t._v("\n      Contact\n    ")])],1)],1)}),[],!1,null,null,null).exports,m=Object(c.defineComponent)({name:"SContent",components:{SNavigation:_}}),f=Object(o.a)(m,(function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"c-content"},[this._t("default")],2)}),[],!1,null,null,null).exports,h=Object(o.a)({},(function(){var t=this.$createElement,n=this._self._c||t;return n("svg",this._g({attrs:{width:"0",height:"0",xmlns:"http://www.w3.org/2000/svg"}},this.$listeners),[n("defs",[n("filter",{attrs:{id:"titleFilter",x:"-20%",y:"-20%",width:"140%",height:"140%"}},[n("feTurbulence",{attrs:{type:"fractalNoise",baseFrequency:"0.001 0.01",numOctaves:"26",seed:"1",stitchTiles:"stitch",result:"turbulence"}}),n("feDisplacementMap",{attrs:{in:"SourceGraphic",in2:"turbulence",scale:"20",result:"displacementMap",xChannelSelector:"R",yChannelSelector:"G"}}),n("feGaussianBlur",{attrs:{in:"displacementMap",stdDeviation:"1","color-interpolation-filters":"sRGB",result:"blur"}}),n("feColorMatrix",{attrs:{in:"blur",values:"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7",result:"contrast"}}),n("feOffset",{attrs:{in:"contrast",dy:"2"}})],1)])])}),[],!1,null,null,null).exports,d=Object(c.defineComponent)({name:"Default",components:{SContent:f,SFilters:h,SNavigation:_}}),C=Object(o.a)(d,(function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"c-main"},[n("s-filters"),this._v(" "),n("s-navigation"),this._v(" "),n("s-content",[n("nuxt")],1)],1)}),[],!1,null,null,null);n.a=C.exports},106:function(t,n,e){t.exports=e(107)},147:function(t,n,e){},76:function(t,n,e){"use strict";var c=e(1),l=e(8),o=e.n(l);c.default.use(o.a)}},[[106,11,3,12]]]);