!function(){var t,e,r,i,o,n,a={9868:function(t,e,r){"use strict";var i=r(8736);class o{static async createModelService(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[64,64],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5;console.log("createModelService called");let n=new o;return console.log("createModelService constructor called"),await n.init(t,e,r,i),console.log("createModelService finished"),n}async initMatrixFromPath(t){"/"===t[0]&&(t="".concat("https://techlauncher-mlai-edge-physics.github.io","/").concat(t)),console.log("initMatrixFromPath called with path: ".concat(t));let e=await fetch(t).then(async t=>await t.json());if(null==e)throw Error("The matrix from ".concat(t," is null"));this.initMatrixFromJSON(this.normalizeMatrix(e))}bindOutput(t){this.outputCallback=t}async startSimulation(){this.isPaused=!1,this.iterate().catch(t=>{console.error("error in iterate",t),this.isPaused=!0})}pauseSimulation(){this.isPaused=!0}async init(t,e,r,o){console.log("init called"),this.session=await i.InferenceSession.create(t,{executionProviders:["wasm"],graphOptimizationLevel:"all"}),console.log("init session created"),this.channelSize=o,this.gridSize=e,this.batchSize=r,this.tensorShape=[r,e[0],e[1],o],this.tensorSize=r*e[0]*e[1]*o}initMatrixFromJSON(t){if(console.log("initMatrixFromJSON called"),this.matrixArray=new Float32Array(t.flat(1/0)),this.matrixArray.length!==this.tensorSize)throw Error("matrixArray length ".concat(this.matrixArray.length," does not match tensorSize ").concat(this.tensorSize))}async iterate(){if(null==this.session)throw Error("session is null, createModelServices() must be called at first");console.log("iterate called"),console.log("this.matrixArray",this.matrixArray);let t=new i.Tensor("float32",this.matrixArray,this.tensorShape),e={};e[this.session.inputNames[0]]=t,this.session.run(e).then(t=>{console.log("outputs type",typeof t),t.Output.data instanceof Float32Array&&(this.outputCallback(t.Output.data),this.copyOutputToMatrix(t.Output.data),setTimeout(()=>{this.isPaused||this.iterate().catch(t=>{console.error("error in iterate",t),this.isPaused=!0})}))}).catch(t=>{console.error("error in session.run",t),this.isPaused=!0})}normalizeMatrix(t){for(let e=0;e<this.channelSize;e++){let r=0;for(let i=0;i<this.batchSize;i++)for(let o=0;o<this.gridSize[0];o++)for(let n=0;n<this.gridSize[1];n++)r+=t[i][o][n][e];this.meanArray.push(Math.sqrt(r/(this.batchSize*this.gridSize[0]*this.gridSize[1]))),r=0;for(let i=0;i<this.batchSize;i++)for(let o=0;o<this.gridSize[0];o++)for(let n=0;n<this.gridSize[1];n++)t[i][o][n][e]-=this.meanArray[e],r+=t[i][o][n][e]**2;this.stdArray.push(r/(this.batchSize*this.gridSize[0]*this.gridSize[1]));for(let r=0;r<this.batchSize;r++)for(let i=0;i<this.gridSize[0];i++)for(let o=0;o<this.gridSize[1];o++)t[r][i][o][e]/=this.stdArray[e]}return t}copyOutputToMatrix(t){if(0===this.matrixArray.length)throw Error("matrixArray is empty");let e=0,r=0,i=0;for(;e<t.length;){if(i>=3&&(i=0,(r+=2)>=this.matrixArray.length))throw Error("toIndex ".concat(r," exceeds matrixArray length ").concat(this.matrixArray.length));this.matrixArray[r]=t[e],e++,r++,i++}if(e!==t.length)throw Error("fromIndex ".concat(e," does not match outputs length ").concat(t.length));if(r+2!==this.matrixArray.length)throw Error("toIndex ".concat(r," does not match matrixArray length ").concat(this.matrixArray.length))}updateForce(t,e){let r=this.getIndex(t);this.matrixArray[r+3]+=e.x,this.matrixArray[r+4]+=e.y}getIndex(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e*this.gridSize[0]*this.gridSize[1]+t.y*this.gridSize[0]+t.x}constructor(){this.session=null,this.matrixArray=new Float32Array,this.gridSize=[0,0],this.batchSize=0,this.tensorShape=[0,0,0,0],this.tensorSize=0,this.isPaused=!0,this.stdArray=[],this.meanArray=[],this.channelSize=0}}let n=null;async function a(){let t=t=>{postMessage({type:"output",output:t})},e=await o.createModelService("../chunks/pages/model/bno_small.onnx",[64,64],1);return e.bindOutput(t),await e.initMatrixFromPath("".concat("https://techlauncher-mlai-edge-physics.github.io","/initData/pvf_incomp_44_0.json")),e}self.onmessage=function(t){let e=t.data;if(null==e)throw Error("data is null");if(null==e.func)throw Error("data.type is null");switch(console.log("worker received message",e),e.func){case"init":null==n&&a().then(t=>{n=t,this.postMessage({type:"init"})}).catch(t=>{console.error("error in initModelService",t)});break;case"start":if(null==n)throw Error("modelService is null");n.startSimulation().catch(t=>{console.error("error in startSimulation",t)});break;case"pause":if(null==n)throw Error("modelService is null");n.pauseSimulation();break;case"updateForce":if(null==n)throw Error("modelService is null");n.updateForce(e.args.loc,e.args.forceDelta)}}}},s={};function c(t){var e=s[t];if(void 0!==e)return e.exports;var r=s[t]={exports:{}},i=!0;try{a[t](r,r.exports,c),i=!1}finally{i&&delete s[t]}return r.exports}c.m=a,c.x=function(){var t=c.O(void 0,[770,240],function(){return c(9868)});return c.O(t)},t=[],c.O=function(e,r,i,o){if(r){o=o||0;for(var n=t.length;n>0&&t[n-1][2]>o;n--)t[n]=t[n-1];t[n]=[r,i,o];return}for(var a=1/0,n=0;n<t.length;n++){for(var r=t[n][0],i=t[n][1],o=t[n][2],s=!0,l=0;l<r.length;l++)a>=o&&Object.keys(c.O).every(function(t){return c.O[t](r[l])})?r.splice(l--,1):(s=!1,o<a&&(a=o));if(s){t.splice(n--,1);var h=i();void 0!==h&&(e=h)}}return e},c.d=function(t,e){for(var r in e)c.o(e,r)&&!c.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},c.f={},c.e=function(t){return Promise.all(Object.keys(c.f).reduce(function(e,r){return c.f[r](t,e),e},[]))},c.u=function(t){return"static/chunks/"+(770===t?"e2fde11a":t)+"-"+({240:"866920120bfc80d5",770:"8ac54a9317306ec1"})[t]+".js"},c.miniCssF=function(t){},c.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(t){if("object"==typeof window)return window}}(),c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.tt=function(){return void 0===e&&(e={createScriptURL:function(t){return t}},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("nextjs#bundler",e))),e},c.tu=function(t){return c.tt().createScriptURL(t)},c.p="/_next/",r={868:1},c.f.i=function(t,e){r[t]||importScripts(c.tu(c.p+c.u(t)))},o=(i=self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push.bind(i),i.push=function(t){var e=t[0],i=t[1],n=t[2];for(var a in i)c.o(i,a)&&(c.m[a]=i[a]);for(n&&n(c);e.length;)r[e.pop()]=1;o(t)},n=c.x,c.x=function(){return Promise.all([c.e(770),c.e(240)]).then(n)},_N_E=c.x()}();