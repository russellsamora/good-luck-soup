(function(e,t){if(typeof define==="function"&&define.amd){define([],t)}else if(typeof exports==="object"){module.exports=t()}else{e.Handlebars=e.Handlebars||t()}})(this,function(){var e=function(){"use strict";function t(e){this.string=e}var e;t.prototype.toString=function(){return""+this.string};e=t;return e}();var t=function(e){"use strict";function o(e){return r[e]}function u(e){for(var t=1;t<arguments.length;t++){for(var n in arguments[t]){if(Object.prototype.hasOwnProperty.call(arguments[t],n)){e[n]=arguments[t][n]}}}return e}function c(e){if(e instanceof n){return e.toString()}else if(e==null){return""}else if(!e){return e+""}e=""+e;if(!s.test(e)){return e}return e.replace(i,o)}function h(e){if(!e&&e!==0){return true}else if(l(e)&&e.length===0){return true}else{return false}}function p(e,t){return(e?e+".":"")+t}var t={};var n=e;var r={"&":"&","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};var i=/[&<>"'`]/g;var s=/[&<>"'`]/;t.extend=u;var a=Object.prototype.toString;t.toString=a;var f=function(e){return typeof e==="function"};if(f(/x/)){f=function(e){return typeof e==="function"&&a.call(e)==="[object Function]"}}var f;t.isFunction=f;var l=Array.isArray||function(e){return e&&typeof e==="object"?a.call(e)==="[object Array]":false};t.isArray=l;t.escapeExpression=c;t.isEmpty=h;t.appendContextPath=p;return t}(e);var n=function(){"use strict";function n(e,n){var r;if(n&&n.firstLine){r=n.firstLine;e+=" - "+r+":"+n.firstColumn}var i=Error.prototype.constructor.call(this,e);for(var s=0;s<t.length;s++){this[t[s]]=i[t[s]]}if(r){this.lineNumber=r;this.column=n.firstColumn}}var e;var t=["description","fileName","lineNumber","message","name","number","stack"];n.prototype=new Error;e=n;return e}();var r=function(e,t){"use strict";function h(e,t){this.helpers=e||{};this.partials=t||{};p(this)}function p(e){e.registerHelper("helperMissing",function(){if(arguments.length===1){return undefined}else{throw new i("Missing helper: '"+arguments[arguments.length-1].name+"'")}});e.registerHelper("blockHelperMissing",function(t,n){var i=n.inverse,s=n.fn;if(t===true){return s(this)}else if(t===false||t==null){return i(this)}else if(a(t)){if(t.length>0){if(n.ids){n.ids=[n.name]}return e.helpers.each(t,n)}else{return i(this)}}else{if(n.data&&n.ids){var o=m(n.data);o.contextPath=r.appendContextPath(n.data.contextPath,n.name);n={data:o}}return s(t,n)}});e.registerHelper("each",function(e,t){if(!t){throw new i("Must pass iterator to #each")}var n=t.fn,s=t.inverse;var o=0,u="",l;var c;if(t.data&&t.ids){c=r.appendContextPath(t.data.contextPath,t.ids[0])+"."}if(f(e)){e=e.call(this)}if(t.data){l=m(t.data)}if(e&&typeof e==="object"){if(a(e)){for(var h=e.length;o<h;o++){if(l){l.index=o;l.first=o===0;l.last=o===e.length-1;if(c){l.contextPath=c+o}}u=u+n(e[o],{data:l})}}else{for(var p in e){if(e.hasOwnProperty(p)){if(l){l.key=p;l.index=o;l.first=o===0;if(c){l.contextPath=c+p}}u=u+n(e[p],{data:l});o++}}}}if(o===0){u=s(this)}return u});e.registerHelper("if",function(e,t){if(f(e)){e=e.call(this)}if(!t.hash.includeZero&&!e||r.isEmpty(e)){return t.inverse(this)}else{return t.fn(this)}});e.registerHelper("unless",function(t,n){return e.helpers["if"].call(this,t,{fn:n.inverse,inverse:n.fn,hash:n.hash})});e.registerHelper("with",function(e,t){if(f(e)){e=e.call(this)}var n=t.fn;if(!r.isEmpty(e)){if(t.data&&t.ids){var i=m(t.data);i.contextPath=r.appendContextPath(t.data.contextPath,t.ids[0]);t={data:i}}return n(e,t)}else{return t.inverse(this)}});e.registerHelper("log",function(t,n){var r=n.data&&n.data.level!=null?parseInt(n.data.level,10):1;e.log(r,t)});e.registerHelper("lookup",function(e,t){return e&&e[t]})}var n={};var r=e;var i=t;var s="2.0.0";n.VERSION=s;var o=6;n.COMPILER_REVISION=o;var u={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};n.REVISION_CHANGES=u;var a=r.isArray,f=r.isFunction,l=r.toString,c="[object Object]";n.HandlebarsEnvironment=h;h.prototype={constructor:h,logger:d,log:v,registerHelper:function(e,t){if(l.call(e)===c){if(t){throw new i("Arg not supported with multiple helpers")}r.extend(this.helpers,e)}else{this.helpers[e]=t}},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){if(l.call(e)===c){r.extend(this.partials,e)}else{this.partials[e]=t}},unregisterPartial:function(e){delete this.partials[e]}};var d={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(e,t){if(d.level<=e){var n=d.methodMap[e];if(typeof console!=="undefined"&&console[n]){console[n].call(console,t)}}}};n.logger=d;var v=d.log;n.log=v;var m=function(e){var t=r.extend({},e);t._parent=e;return t};n.createFrame=m;return n}(t,n);var i=function(e,t,n){"use strict";function f(e){var t=e&&e[0]||1,n=o;if(t!==n){if(t<n){var r=u[n],i=u[t];throw new s("Template was precompiled with an older version of Handlebars than the current runtime. "+"Please update your precompiler to a newer version ("+r+") or downgrade your runtime to an older version ("+i+").")}else{throw new s("Template was precompiled with a newer version of Handlebars than the current runtime. "+"Please update your runtime to a newer version ("+e[1]+").")}}}function l(e,t){if(!t){throw new s("No environment passed to template")}if(!e||!e.main){throw new s("Unknown template object: "+typeof e)}t.VM.checkRevision(e.compiler);var n=function(n,r,o,u,a,f,l,c,h){if(a){u=i.extend({},u,a)}var p=t.VM.invokePartial.call(this,n,o,u,f,l,c,h);if(p==null&&t.compile){var d={helpers:f,partials:l,data:c,depths:h};l[o]=t.compile(n,{data:c!==undefined,compat:e.compat},t);p=l[o](u,d)}if(p!=null){if(r){var v=p.split("\n");for(var m=0,g=v.length;m<g;m++){if(!v[m]&&m+1===g){break}v[m]=r+v[m]}p=v.join("\n")}return p}else{throw new s("The partial "+o+" could not be compiled when running in runtime-only mode")}};var r={lookup:function(e,t){var n=e.length;for(var r=0;r<n;r++){if(e[r]&&e[r][t]!=null){return e[r][t]}}},lambda:function(e,t){return typeof e==="function"?e.call(t):e},escapeExpression:i.escapeExpression,invokePartial:n,fn:function(t){return e[t]},programs:[],program:function(e,t,n){var r=this.programs[e],i=this.fn(e);if(t||n){r=c(this,e,i,t,n)}else if(!r){r=this.programs[e]=c(this,e,i)}return r},data:function(e,t){while(e&&t--){e=e._parent}return e},merge:function(e,t){var n=e||t;if(e&&t&&e!==t){n=i.extend({},t,e)}return n},noop:t.VM.noop,compilerInfo:e.compiler};var o=function(t,n){n=n||{};var i=n.data;o._setup(n);if(!n.partial&&e.useData){i=d(t,i)}var s;if(e.useDepths){s=n.depths?[t].concat(n.depths):[t]}return e.main.call(r,t,r.helpers,r.partials,i,s)};o.isTop=true;o._setup=function(n){if(!n.partial){r.helpers=r.merge(n.helpers,t.helpers);if(e.usePartial){r.partials=r.merge(n.partials,t.partials)}}else{r.helpers=n.helpers;r.partials=n.partials}};o._child=function(t,n,i){if(e.useDepths&&!i){throw new s("must pass parent depths")}return c(r,t,e[t],n,i)};return o}function c(e,t,n,r,i){var s=function(t,s){s=s||{};return n.call(e,t,e.helpers,e.partials,s.data||r,i&&[t].concat(i))};s.program=t;s.depth=i?i.length:0;return s}function h(e,t,n,r,i,o,u){var a={partial:true,helpers:r,partials:i,data:o,depths:u};if(e===undefined){throw new s("The partial "+t+" could not be found")}else if(e instanceof Function){return e(n,a)}}function p(){return""}function d(e,t){if(!t||!("root"in t)){t=t?a(t):{};t.root=e}return t}var r={};var i=e;var s=t;var o=n.COMPILER_REVISION;var u=n.REVISION_CHANGES;var a=n.createFrame;r.checkRevision=f;r.template=l;r.program=c;r.invokePartial=h;r.noop=p;return r}(t,n,r);var s=function(e,t,n,r,i){"use strict";var s;var o=e;var u=t;var a=n;var f=r;var l=i;var c=function(){var e=new o.HandlebarsEnvironment;f.extend(e,o);e.SafeString=u;e.Exception=a;e.Utils=f;e.escapeExpression=f.escapeExpression;e.VM=l;e.template=function(t){return l.template(t,e)};return e};var h=c();h.create=c;h["default"]=h;s=h;return s}(r,e,n,t,i);return s})