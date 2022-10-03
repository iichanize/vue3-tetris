(function(){"use strict";var t={4424:function(t,n,i){var e=i(9242),o=i(3396);const s={id:"app"};function a(t,n,i,e,a,l){const r=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)("div",s,[(0,o.Wm)(r)])}var l=(0,o.aZ)({name:"App",components:{},data(){return{}},methods:{}}),r=i(89);const c=(0,r.Z)(l,[["render",a]]);var p=c,u=i(2483);const m=t=>((0,o.dD)("data-v-5b8515fc"),t=t(),(0,o.Cn)(),t),h=m((()=>(0,o._)("h1",null,"Vue Practice",-1))),L={id:"links"},d={id:"tetris"},v=m((()=>(0,o._)("span",null,"Tetris",-1))),g={id:"ranking"},w=m((()=>(0,o._)("span",null,"Score Ranking",-1)));function S(t,n,i,e,s,a){return(0,o.wg)(),(0,o.iD)("div",null,[h,(0,o._)("div",L,[(0,o._)("div",d,[v,(0,o._)("button",{onClick:n[0]||(n[0]=(...n)=>t.moveToTetris&&t.moveToTetris(...n))},"PLAY")]),(0,o._)("div",g,[w,(0,o._)("button",{onClick:n[1]||(n[1]=(...n)=>t.moveToRanking&&t.moveToRanking(...n))},"SHOW")])])])}var O=(0,o.aZ)({name:"Top",setup(t,n){const i=(0,u.tv)(),e=()=>i.replace({name:"Tetris"}),o=()=>i.replace({name:"Ranking"});return{moveToTetris:e,moveToRanking:o}}});const y=(0,r.Z)(O,[["render",S],["__scopeId","data-v-5b8515fc"]]);var _=y,f=i(7139);const Z=t=>((0,o.dD)("data-v-16044380"),t=t(),(0,o.Cn)(),t),E=(0,o.uE)('<div class="arrow" data-v-16044380><div id="first" data-v-16044380>↑</div><div id="second" data-v-16044380>↑</div><div id="third" data-v-16044380>↑</div></div><div class="holdFrame" data-v-16044380></div><div class="title" id="hold" data-v-16044380>HOLD</div><div class="stockFrame" data-v-16044380></div><div class="title" id="stock" data-v-16044380>NEXT</div>',5),C={key:0,class:"end"},B={class:"message"},I=Z((()=>(0,o._)("div",{class:"header"},[(0,o._)("span",null," Result ")],-1))),K={key:0,class:"body"},x={class:"footer"};function k(t,n,i,s,a,l){const r=(0,o.up)("PlayBoardLayer");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(r,{onEnding:t.ending,onScore:t.resultScore},null,8,["onEnding","onScore"]),E,t.flag?((0,o.wg)(),(0,o.iD)("div",C,[(0,o._)("div",B,[I,t.flag?((0,o.wg)(),(0,o.iD)("div",K,[(0,o._)("span",null,"スコア："+(0,f.zw)(t.score),1),(0,o._)("span",null,[(0,o.Uk)("ユーザー名： "),(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":n[0]||(n[0]=n=>t.userName=n)},null,512),[[e.nr,t.userName]])])])):(0,o.kq)("",!0),(0,o._)("div",x,[(0,o._)("button",{id:"sendButton",onClick:n[1]||(n[1]=(...n)=>t.moveToRanking&&t.moveToRanking(...n))},"ランキングへ送信")])])])):(0,o.kq)("",!0)],64)}var b=i(4870);const M=t=>((0,o.dD)("data-v-3abde733"),t=t(),(0,o.Cn)(),t),T={class:"PlayBoardLayerRoot"},N={class:"level"},R={class:"score"},H=M((()=>(0,o._)("br",null,null,-1)));function J(t,n,i,e,s,a){const l=(0,o.up)("Block"),r=(0,o.up)("MinoLayer");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",T,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.stageState.wallList,(t=>((0,o.wg)(),(0,o.j4)(l,{key:t.id,class:"BlockElement",x:t.position.x,y:t.position.y,angle:t.angle,color:t.color},null,8,["x","y","angle","color"])))),128)),(0,o.Wm)(r,{onMap:t.getMap,onScore:t.updateScore,onLevel:t.setLevel},null,8,["onMap","onScore","onLevel"])]),(0,o._)("div",N,"Lv."+(0,f.zw)(t.level),1),(0,o._)("div",R,[(0,o.Uk)("SCORE"),H,(0,o.Uk)((0,f.zw)(t.totalScore),1)])],64)}i(7658);const D=t=>{t.scale;const n=`color: ${t.color};transform: translate(${t.x}px, ${t.y}px);`;return(0,o.h)("div",{class:"BlockRoot",style:n})},A=t=>{let n=!1;return(0,o.bv)((()=>{const i=()=>{requestAnimationFrame((()=>{if(n)return;const e=t();e&&i()}))};i()})),(0,o.Jd)((()=>{n=!0})),{}};var P=i(2482);class z{constructor(t=0,n=0,i=0){(0,P.Z)(this,"x",void 0),(0,P.Z)(this,"y",void 0),this.x=t,this.y=n}get length(){return Math.sqrt(this.x**2+this.y**2)}get angle(){const t=t=>t/Math.PI*180;return t(Math.atan2(this.y,this.x))}add(t){return new z(this.x+t.x,this.y+t.y)}sub(t){return new z(this.x-t.x,this.y-t.y)}times(t){return new z(this.x*t,this.y*t)}unit(t=1){const n=this.length;return new z(this.x/n*t,this.y/n*t)}limit(t=1){return this.length<=t?this:this.unit(t)}rotate(t){const n=t=>t*Math.PI/180,i=n(this.angle+t),e=this.length;return new z(Math.cos(i)*e,Math.sin(i)*e)}}class j{}(0,P.Z)(j,"BLOCK_SIZE",40),(0,P.Z)(j,"NAMES",["T","I","O","L","J","S","Z"]),(0,P.Z)(j,"COLORS",{T:"138, 43, 226",I:"0, 255, 255",L:"0, 0, 255",J:"255, 165, 0",O:"255, 255, 0",S:"0, 255, 0",Z:"255, 0, 0"}),(0,P.Z)(j,"SHAPE",{T:[new z(0,0),new z(0,-1),new z(-1,0),new z(1,0)],I:[new z(0,0),new z(-1,0),new z(1,0),new z(2,0)],L:[new z(0,0),new z(-1,0),new z(1,0),new z(1,-1)],J:[new z(0,0),new z(-1,-1),new z(-1,0),new z(1,0)],O:[new z(0,0),new z(1,0),new z(0,-1),new z(1,-1)],S:[new z(0,0),new z(-1,0),new z(0,-1),new z(1,-1)],Z:[new z(0,0),new z(-1,-1),new z(0,-1),new z(1,0)]});var Y=j;const W=.25;let q=0;const F=()=>Y.NAMES[Math.floor(7*Math.random())];class U{constructor(t,n,i,e,o,s){(0,P.Z)(this,"id",q++),(0,P.Z)(this,"position",new z(0,0)),(0,P.Z)(this,"name",F()),(0,P.Z)(this,"angle",360*Math.random()),(0,P.Z)(this,"vector",new z),(0,P.Z)(this,"force",W),(0,P.Z)(this,"color",""),(0,P.Z)(this,"shape",[]),(0,P.Z)(this,"insensitiveTerms",0),this.position=new z(t,n),this.name=i,this.color=s?"rgba("+e+", "+s+")":"rgba("+e+", 1.0)",this.shape=o}update(){const t=new z(0,Y.BLOCK_SIZE);this.position=this.position.add(t),this.position.y>20*Y.BLOCK_SIZE&&(this.position=new z(this.position.x,20*Y.BLOCK_SIZE)),this.position.y<0&&(this.position=new z(this.position.x,0))}drop(){const t=new z(0,Y.BLOCK_SIZE);this.position=this.position.add(t),this.position.y>21*Y.BLOCK_SIZE&&(this.position=new z(this.position.x,21*Y.BLOCK_SIZE))}slideLeft(){this.position=new z(this.position.x-Y.BLOCK_SIZE,this.position.y)}slideRight(){this.position=new z(this.position.x+Y.BLOCK_SIZE,this.position.y)}slideUp(){this.position=new z(this.position.x,this.position.y-Y.BLOCK_SIZE)}setForce(t){this.force=t}resize(t){this.position=new z(this.position.x+t,this.position.y)}}const X={class:"MinoLayerRoot"};function $(t,n,i,e,s,a){const l=(0,o.up)("Block");return(0,o.wg)(),(0,o.iD)("div",X,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.stageState.ghost,(t=>((0,o.wg)(),(0,o.j4)(l,{key:t.id,class:"BlockElement",x:t.position.x,y:t.position.y,angle:t.angle,color:t.color,scale:t.scale},null,8,["x","y","angle","color","scale"])))),128)),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.stageState.minoList,(t=>((0,o.wg)(),(0,o.j4)(l,{key:t.id,class:"BlockElement",x:t.position.x,y:t.position.y,angle:t.angle,color:t.color,scale:t.scale},null,8,["x","y","angle","color","scale"])))),128)),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.stageState.holdMino,(t=>((0,o.wg)(),(0,o.j4)(l,{key:t.id,class:"BlockElement",x:t.position.x,y:t.position.y,angle:t.angle,color:t.color,scale:t.scale},null,8,["x","y","angle","color","scale"])))),128)),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.stageState.stock,(t=>((0,o.wg)(),(0,o.j4)(l,{key:t.id,class:"BlockElement",x:t.position.x,y:t.position.y,angle:t.angle,color:t.color,scale:t.scale},null,8,["x","y","angle","color","scale"])))),128))])}const G=(t,n)=>{const i=n=>{t?.(n)};return(0,o.bv)((()=>{const t=n??document.body;t.addEventListener("keydown",i)})),(0,o.Ah)((()=>{const t=n??document.body;t.removeEventListener("keydown",i)})),{}};var V=i(6265),Q=i.n(V);class tt{async sendScore(t,n){const i={name:t,score:n},e=await Q().post("https://tetris-vue-db.herokuapp.com/score/register",i);return e.data}async getRanking(){const t=await Q().get("https://tetris-vue-db.herokuapp.com/score/ranking").catch((t=>t.response));return t.data}async healthCheck(){await Q().get("https://tetris-vue-db.herokuapp.com/score/").catch((t=>t.response));return!0}}var nt=(0,o.aZ)({name:"MinoLayer",components:{Block:D},props:{keyInput:{type:String,default:""}},setup(t,n){new tt;let i=(0,b.iH)("");const e=(0,b.qj)({minoList:[],map:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],t:0,healthCheckTime:0,name:JSON.parse(JSON.stringify(Y.NAMES)),holdMino:[],stock:[],ghost:[],totalScore:0,ren:0,deleteLineNum:0,level:1});let s=!1,a=!0,l=(0,b.iH)(Math.floor(.5*window.innerWidth)-5*Y.BLOCK_SIZE),r=2*Y.BLOCK_SIZE;const c=()=>{e.map=JSON.parse(JSON.stringify(new Array(22).fill(new Array(10).fill(0)))),e.minoList.map((t=>{e.map[(t.position.y-r)/Y.BLOCK_SIZE+2][(t.position.x-l.value)/Y.BLOCK_SIZE]=1}))},p=()=>{e.name.push("T"),e.name.push("I"),e.name.push("O"),e.name.push("L"),e.name.push("J"),e.name.push("S"),e.name.push("Z")},u=()=>{let t=Math.floor(Math.random()*e.name.length);0===e.name.length&&p();const n=e.name[t];return e.name.splice(t,1),n},m=()=>{let t=l.value+14*Y.BLOCK_SIZE,n=20*Y.BLOCK_SIZE;const i=u(),o=Y.COLORS[i],s=JSON.parse(JSON.stringify(Y.SHAPE[i]));for(let a=0;a<s.length;a++)e.stock.push(new U(t+s[a].x*Y.BLOCK_SIZE,n+s[a].y*Y.BLOCK_SIZE,i,o,s))},h=()=>{const t=l.value-5*Y.BLOCK_SIZE,n=r+3*Y.BLOCK_SIZE;for(let i=0;i<4;i++){let o=e.minoList.length;const s=e.minoList[o-1],a=JSON.parse(JSON.stringify(s.name)),l=Y.COLORS[a],r=JSON.parse(JSON.stringify(Y.SHAPE[a]));e.holdMino.push(new U(t+r[i].x*Y.BLOCK_SIZE,n+r[i].y*Y.BLOCK_SIZE,a,l,r)),e.minoList.splice(o-1,1)}if(4!==e.holdMino.length){const t=e.holdMino[0];let n=l.value+4*Y.BLOCK_SIZE,i=1*Y.BLOCK_SIZE;const o=JSON.parse(JSON.stringify(t.name)),s=Y.COLORS[o],a=JSON.parse(JSON.stringify(Y.SHAPE[o]));for(let l=0;l<4;l++)e.minoList.push(new U(n+a[l].x*Y.BLOCK_SIZE,i+a[l].y*Y.BLOCK_SIZE,o,s,a)),e.holdMino.shift()}else L(),d()},L=()=>{let t=l.value+4*Y.BLOCK_SIZE,n=1*Y.BLOCK_SIZE,i=e.stock[0].name;const o=JSON.parse(JSON.stringify(Y.SHAPE[i])),s=Y.COLORS[i];m();for(let a=0;a<o.length;a++)e.minoList.push(new U(t+o[a].x*Y.BLOCK_SIZE,n+o[a].y*Y.BLOCK_SIZE,i,s,o)),e.stock.shift()},d=()=>{e.stock.map(((t,n)=>{t.position=new z(t.position.x,(4+Y.SHAPE[t.name][n%4].y+3*Math.floor(n/4))*Y.BLOCK_SIZE)}))},v=t=>{let n=t.length;return!(n<4)&&(t[t.length-1].position.y===21*Y.BLOCK_SIZE||t[t.length-2].position.y===21*Y.BLOCK_SIZE||t[t.length-3].position.y===21*Y.BLOCK_SIZE||t[t.length-4].position.y===21*Y.BLOCK_SIZE)},g=t=>{let n=t.length;if(n<4)return!1;for(let i=0;i<4;i++)if(1==e.map[(t[n-(i+1)].position.y-r)/Y.BLOCK_SIZE+3][(t[n-(i+1)].position.x-l.value)/Y.BLOCK_SIZE])return!0;return!1};G((async t=>{if(console.log("KEY:",t.key),i.value=t.key,"ArrowLeft"===i.value&&(y(),w(),S(),M()),"ArrowRight"===i.value&&(_(),w(),O(),M()),"ArrowDown"===i.value&&(v(e.minoList)||g(e.minoList)||(f(e.minoList),e.t=1,e.totalScore+=5,n.emit("score",e.totalScore))),"ArrowUp"===i.value){while(!v(e.minoList)&&!g(e.minoList))f(e.minoList),e.totalScore+=5;n.emit("score",e.totalScore),s=!0}"x"===i.value&&(await K(),M()),"z"===i.value&&(await x(),M()),"a"===i.value&&a&&(h(),a=!1,s=!0)}));const w=async()=>{let t=0,n=e.minoList.length;return(e.minoList[n-1].position.x>l.value+9*Y.BLOCK_SIZE||e.minoList[n-2].position.x>l.value+9*Y.BLOCK_SIZE||e.minoList[n-3].position.x>l.value+9*Y.BLOCK_SIZE||e.minoList[n-4].position.x>l.value+9*Y.BLOCK_SIZE)&&(y(),t++,w()),(e.minoList[n-1].position.x<l.value||e.minoList[n-2].position.x<l.value||e.minoList[n-3].position.x<l.value||e.minoList[n-4].position.x<l.value)&&(_(),t++,w()),t},S=async()=>{let t=0;const n=[e.minoList[e.minoList.length-4].position,e.minoList[e.minoList.length-3].position,e.minoList[e.minoList.length-2].position,e.minoList[e.minoList.length-1].position];return 1!=e.map[(n[0].y-r)/Y.BLOCK_SIZE+2][(n[0].x-l.value)/Y.BLOCK_SIZE]&&1!=e.map[(n[1].y-r)/Y.BLOCK_SIZE+2][(n[1].x-l.value)/Y.BLOCK_SIZE]&&1!=e.map[(n[2].y-r)/Y.BLOCK_SIZE+2][(n[2].x-l.value)/Y.BLOCK_SIZE]&&1!=e.map[(n[3].y-r)/Y.BLOCK_SIZE+2][(n[3].x-l.value)/Y.BLOCK_SIZE]||(_(),t++,t+=await S()),t},O=async()=>{let t=0;const n=[e.minoList[e.minoList.length-4].position,e.minoList[e.minoList.length-3].position,e.minoList[e.minoList.length-2].position,e.minoList[e.minoList.length-1].position];return 1!==e.map[(n[0].y-r)/Y.BLOCK_SIZE+2][(n[0].x-l.value)/Y.BLOCK_SIZE]&&1!==e.map[(n[1].y-r)/Y.BLOCK_SIZE+2][(n[1].x-l.value)/Y.BLOCK_SIZE]&&1!==e.map[(n[2].y-r)/Y.BLOCK_SIZE+2][(n[2].x-l.value)/Y.BLOCK_SIZE]&&1!==e.map[(n[3].y-r)/Y.BLOCK_SIZE+2][(n[3].x-l.value)/Y.BLOCK_SIZE]||(y(),t++,t+=await O()),t},y=()=>{let t=e.minoList.length;for(let n=0;n<4;n++)e.minoList[t-(n+1)].slideLeft()},_=()=>{let t=e.minoList.length;for(let n=0;n<4;n++)e.minoList[t-(n+1)].slideRight()},f=t=>{let n=t.length;if(0!=n)for(let i=0;i<4;i++)t[n-(i+1)].drop()},Z=()=>{let t=e.minoList.length;if("O"!=e.minoList[t-4].name)for(let n=0;n<4;n++)e.minoList[t-(4-n)].position=new z(e.minoList[t-4].position.x-e.minoList[t-(4-n)].shape[n].y*Y.BLOCK_SIZE,e.minoList[t-4].position.y+e.minoList[t-(4-n)].shape[n].x*Y.BLOCK_SIZE),e.minoList[t-(4-n)].shape[n]=new z(-1*e.minoList[t-(4-n)].shape[n].y,e.minoList[t-(4-n)].shape[n].x)},E=()=>{let t=e.minoList.length;if("O"!=e.minoList[t-4].name)for(let n=1;n<4;n++)e.minoList[t-(4-n)].position=new z(e.minoList[t-4].position.x+e.minoList[t-(4-n)].shape[n].y*Y.BLOCK_SIZE,e.minoList[t-4].position.y-e.minoList[t-(4-n)].shape[n].x*Y.BLOCK_SIZE),e.minoList[t-(4-n)].shape[n]=new z(e.minoList[t-(4-n)].shape[n].y,-1*e.minoList[t-(4-n)].shape[n].x)},C=(t,n)=>{let i=e.minoList.length;for(let o=0;o<4;o++)e.minoList[i-(4-o)].position=t[o],e.minoList[i-(4-o)].shape[o]=n[o]},B=t=>"I"===t,I=(t,n,i,o)=>{let s=e.minoList.length;return((B(e.minoList[s-4].name)?n>2:n>1)||e.minoList[s-1].position.x<l.value||e.minoList[s-2].position.x<l.value||e.minoList[s-3].position.x<l.value||e.minoList[s-4].position.x<l.value||e.minoList[s-1].position.x>l.value+9*Y.BLOCK_SIZE||e.minoList[s-2].position.x>l.value+9*Y.BLOCK_SIZE||e.minoList[s-3].position.x>l.value+9*Y.BLOCK_SIZE||e.minoList[s-4].position.x>l.value+9*Y.BLOCK_SIZE)&&(C(i,o),!0)},K=async()=>{const t=e.minoList.length;let n=[e.minoList[t-4].position,e.minoList[t-3].position,e.minoList[t-2].position,e.minoList[t-1].position],i=[e.minoList[t-4].shape[0],e.minoList[t-3].shape[1],e.minoList[t-2].shape[2],e.minoList[t-1].shape[3]];if(Z(),v(e.minoList))return void C(n,i);const o=await w();let s=await S();I(o,s,n,i)&&Z();const a=await O();I(o,a,n,i)},x=async()=>{const t=e.minoList.length;let n=[e.minoList[t-4].position,e.minoList[t-3].position,e.minoList[t-2].position,e.minoList[t-1].position],i=[e.minoList[t-4].shape[0],e.minoList[t-3].shape[1],e.minoList[t-2].shape[2],e.minoList[t-1].shape[3]];if(E(),v(e.minoList))return void C(n,i);const o=await w();let s=await O();I(o,s,n,i)&&E();const a=await S();I(o,a,n,i)},k=()=>{let t=0,n=!1;for(let i=2;i<e.map.length;i++){let o=0;for(let t=0;t<e.map[i].length;t++)o+=e.map[i][t];if(10===o){e.deleteLineNum++,t++,n=!0;for(let t=e.minoList.length-1;t>=0;t--){let n=e.minoList[t].position.y,o=r+(i-2)*Y.BLOCK_SIZE;n===o?e.minoList.splice(t,1):n<o&&e.minoList[t].drop()}c(),e.deleteLineNum%10===0&&Math.ceil(e.deleteLineNum/10)<30&&(e.level=Math.ceil(e.deleteLineNum/10)+1)}}n?e.ren++:e.ren=0,e.totalScore+=t*t*100,e.totalScore+=t*t*e.ren*20,t=0},M=()=>{const t=e.minoList.length;e.ghost=JSON.parse(JSON.stringify([]));for(let n=0;n<4;n++){let i=e.minoList[t-(n+1)].position.x,o=e.minoList[t-(n+1)].position.y;const s=e.minoList[t-(n+1)].name,a=JSON.parse(JSON.stringify(e.minoList[t-(n+1)].shape)),l=Y.COLORS[s],r="0.3";e.ghost.push(new U(i,o,s,l,a,r))}while(!v(e.ghost)&&!g(e.ghost))f(e.ghost)};for(let o=0;o<4;o++)m();L(),d(),M(),A((()=>1!==e.map[1][4]&&((e.t%(52-Math.floor(1.7*e.level))===0||s)&&(v(e.minoList)||g(e.minoList)?(c(),k(),console.log("REN",e.ren),console.log("SCORE",e.totalScore),T(),L(),d(),M(),a=!0,n.emit("score",e.totalScore)):(f(e.minoList),M()),s&&(s=!1,e.t=0)),e.t++,e.healthCheckTime++,!0)));const T=()=>{n.emit("map",e.map),n.emit("level",e.level)},N=()=>{const t=Math.floor(.5*window.innerWidth)-5*Y.BLOCK_SIZE;for(let n=0;n<e.minoList.length;n++)e.minoList[n].resize(t-l.value);for(let n=0;n<e.holdMino.length;n++)e.holdMino[n].resize(t-l.value);for(let n=0;n<e.ghost.length;n++)e.ghost[n].resize(t-l.value);for(let n=0;n<e.stock.length;n++)e.stock[n].resize(t-l.value);l.value=t};return(0,o.bv)((()=>{window.addEventListener("resize",N)})),{baseX:l,drawMino:m,hold:h,stageState:e,mapEmit:T}}});const it=(0,r.Z)(nt,[["render",$],["__scopeId","data-v-2a17cd6c"]]);var et=it,ot=(0,o.aZ)({name:"PlayBoardLayer",components:{Block:D,MinoLayer:et},props:{},setup(t,n){const i=(0,b.qj)({map:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],wallList:[],t:0}),e=t=>{i.map=t};let s=(0,b.iH)(Math.floor(.5*window.innerWidth)-6*Y.BLOCK_SIZE),a=(0,b.iH)(Math.floor(.5*window.innerWidth)+5*Y.BLOCK_SIZE);const l=()=>{let t=2*Y.BLOCK_SIZE,n=22*Y.BLOCK_SIZE,e=0;for(let o=0;o<21;o++)i.wallList.push(new U(s.value,t+o*Y.BLOCK_SIZE,"wall","128,128,128",[])),i.wallList.push(new U(a.value,t+o*Y.BLOCK_SIZE,"wall","128,128,128",[])),e<10&&(i.wallList.push(new U(s.value+(e+1)*Y.BLOCK_SIZE,n,"wall","128, 128, 128",[])),e++)};let r=(0,b.iH)(0);const c=t=>{r.value=t};let p=(0,b.iH)(1);const u=t=>{p.value=t};l(),console.log("Game Start"),A((()=>1!==i.map[1][4]||(console.log("Game Over"),n.emit("ending",!0),n.emit("score",r.value),!1)));const m=()=>{const t=Math.floor(.5*window.innerWidth)-6*Y.BLOCK_SIZE;for(let n=0;n<i.wallList.length;n++)i.wallList[n].resize(t-s.value);s.value=t};return(0,o.bv)((()=>{window.addEventListener("resize",m)})),{baseX1:s,baseX2:a,stageState:i,getMap:e,totalScore:r,updateScore:c,level:p,setLevel:u}}});const st=(0,r.Z)(ot,[["render",J],["__scopeId","data-v-3abde733"]]);var at=st,lt=(0,o.aZ)({name:"Stage",components:{PlayBoardLayer:at},props:{maxFish:{type:Number,default:50}},setup(t,n){let i=(0,b.iH)(!1),e=(0,b.iH)(0),o=(0,b.iH)("");const s=(0,u.tv)(),a=new tt,l=t=>{t&&(i.value=!0)},r=t=>{e.value=t},c=async(t,n)=>await a.sendScore(t,n),p=()=>(c(o.value,e.value),s.replace({name:"Ranking"}));return{flag:i,score:e,userName:o,ending:l,resultScore:r,moveToRanking:p}}});const rt=(0,r.Z)(lt,[["render",k],["__scopeId","data-v-16044380"]]);var ct=rt;const pt=t=>((0,o.dD)("data-v-6322b73a"),t=t(),(0,o.Cn)(),t),ut=pt((()=>(0,o._)("h1",null,"Score Ranking TOP 10",-1))),mt={id:"ranking"};function ht(t,n,i,e,s,a){return(0,o.wg)(),(0,o.iD)(o.HY,null,[ut,(0,o._)("div",mt,[(0,o._)("table",null,[(0,o._)("thead",null,[(0,o._)("tr",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.headers,((t,n)=>((0,o.wg)(),(0,o.iD)("th",{key:n},(0,f.zw)(t),1)))),128))])]),(0,o._)("tbody",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.ranking,((t,n)=>((0,o.wg)(),(0,o.iD)("tr",{key:t.id},[(0,o._)("th",null,(0,f.zw)(n+1),1),(0,o._)("td",null,(0,f.zw)(t.name),1),(0,o._)("td",null,(0,f.zw)(t.score),1)])))),128))])]),(0,o._)("button",{id:"return",onClick:n[0]||(n[0]=(...n)=>t.moveToTop&&t.moveToTop(...n))},"Topへ戻る")])],64)}var Lt=(0,o.aZ)({name:"Ranking",setup(t,n){const i=(0,u.tv)(),e=new tt;let o=(0,b.iH)([]);const s=["No.","名前","スコア"],a=async()=>{o.value=await e.getRanking()},l=()=>i.replace({name:"Top"});return a(),{ranking:o,headers:s,moveToTop:l}}});const dt=(0,r.Z)(Lt,[["render",ht],["__scopeId","data-v-6322b73a"]]);var vt=dt;const gt=[{path:"/",name:"Top",component:_},{path:"/tetris",name:"Tetris",component:ct},{path:"/ranking",name:"Ranking",component:vt}],wt=(0,u.p7)({history:(0,u.PO)(""),routes:gt});var St=wt;(0,e.ri)(p).use(St).mount("#app")}},n={};function i(e){var o=n[e];if(void 0!==o)return o.exports;var s=n[e]={exports:{}};return t[e](s,s.exports,i),s.exports}i.m=t,function(){var t=[];i.O=function(n,e,o,s){if(!e){var a=1/0;for(p=0;p<t.length;p++){e=t[p][0],o=t[p][1],s=t[p][2];for(var l=!0,r=0;r<e.length;r++)(!1&s||a>=s)&&Object.keys(i.O).every((function(t){return i.O[t](e[r])}))?e.splice(r--,1):(l=!1,s<a&&(a=s));if(l){t.splice(p--,1);var c=o();void 0!==c&&(n=c)}}return n}s=s||0;for(var p=t.length;p>0&&t[p-1][2]>s;p--)t[p]=t[p-1];t[p]=[e,o,s]}}(),function(){i.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(n,{a:n}),n}}(),function(){i.d=function(t,n){for(var e in n)i.o(n,e)&&!i.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){var t={143:0};i.O.j=function(n){return 0===t[n]};var n=function(n,e){var o,s,a=e[0],l=e[1],r=e[2],c=0;if(a.some((function(n){return 0!==t[n]}))){for(o in l)i.o(l,o)&&(i.m[o]=l[o]);if(r)var p=r(i)}for(n&&n(e);c<a.length;c++)s=a[c],i.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return i.O(p)},e=self["webpackChunkvue3_tetris"]=self["webpackChunkvue3_tetris"]||[];e.forEach(n.bind(null,0)),e.push=n.bind(null,e.push.bind(e))}();var e=i.O(void 0,[998],(function(){return i(4424)}));e=i.O(e)})();
//# sourceMappingURL=app.7e1fb0c8.js.map