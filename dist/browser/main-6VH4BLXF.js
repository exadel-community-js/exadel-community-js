var pp=Object.defineProperty,gp=Object.defineProperties;var mp=Object.getOwnPropertyDescriptors;var Zc=Object.getOwnPropertySymbols;var vp=Object.prototype.hasOwnProperty,yp=Object.prototype.propertyIsEnumerable;var Yc=(e,t,n)=>t in e?pp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||={})vp.call(t,n)&&Yc(e,n,t[n]);if(Zc)for(var n of Zc(t))yp.call(t,n)&&Yc(e,n,t[n]);return e},$=(e,t)=>gp(e,mp(t));var xi=null;var Si=1,Qc=Symbol("SIGNAL");function R(e){let t=xi;return xi=e,t}function Kc(){return xi}var Mi={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Dp(e){if(!(Ri(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===Si)){if(!e.producerMustRecompute(e)&&!_i(e)){e.dirty=!1,e.lastCleanEpoch=Si;return}e.producerRecomputeValue(e),e.dirty=!1,e.lastCleanEpoch=Si}}function Ti(e){return e&&(e.nextProducerIndex=0),R(e)}function Jc(e,t){if(R(t),!(!e||e.producerNode===void 0||e.producerIndexOfThis===void 0||e.producerLastReadVersion===void 0)){if(Ri(e))for(let n=e.nextProducerIndex;n<e.producerNode.length;n++)Ai(e.producerNode[n],e.producerIndexOfThis[n]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}function _i(e){Oi(e);for(let t=0;t<e.producerNode.length;t++){let n=e.producerNode[t],r=e.producerLastReadVersion[t];if(r!==n.version||(Dp(n),r!==n.version))return!0}return!1}function Ni(e){if(Oi(e),Ri(e))for(let t=0;t<e.producerNode.length;t++)Ai(e.producerNode[t],e.producerIndexOfThis[t]);e.producerNode.length=e.producerLastReadVersion.length=e.producerIndexOfThis.length=0,e.liveConsumerNode&&(e.liveConsumerNode.length=e.liveConsumerIndexOfThis.length=0)}function Ai(e,t){if(wp(e),e.liveConsumerNode.length===1&&Cp(e))for(let r=0;r<e.producerNode.length;r++)Ai(e.producerNode[r],e.producerIndexOfThis[r]);let n=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[n],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[n],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let r=e.liveConsumerIndexOfThis[t],o=e.liveConsumerNode[t];Oi(o),o.producerIndexOfThis[r]=t}}function Ri(e){return e.consumerIsAlwaysLive||(e?.liveConsumerNode?.length??0)>0}function Oi(e){e.producerNode??=[],e.producerIndexOfThis??=[],e.producerLastReadVersion??=[]}function wp(e){e.liveConsumerNode??=[],e.liveConsumerIndexOfThis??=[]}function Cp(e){return e.producerNode!==void 0}function bp(){throw new Error}var Ip=bp;function Xc(e){Ip=e}function C(e){return typeof e=="function"}function zt(e){let n=e(r=>{Error.call(r),r.stack=new Error().stack});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Mr=zt(e=>function(n){e(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n});function Fn(e,t){if(e){let n=e.indexOf(t);0<=n&&e.splice(n,1)}}var U=class e{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let i of n)i.remove(this);else n.remove(this);let{initialTeardown:r}=this;if(C(r))try{r()}catch(i){t=i instanceof Mr?i.errors:[i]}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let i of o)try{eu(i)}catch(s){t=t??[],s instanceof Mr?t=[...t,...s.errors]:t.push(s)}}if(t)throw new Mr(t)}}add(t){var n;if(t&&t!==this)if(this.closed)eu(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}}_hasParent(t){let{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t}_removeParent(t){let{_parentage:n}=this;n===t?this._parentage=null:Array.isArray(n)&&Fn(n,t)}remove(t){let{_finalizers:n}=this;n&&Fn(n,t),t instanceof e&&t._removeParent(this)}};U.EMPTY=(()=>{let e=new U;return e.closed=!0,e})();var Pi=U.EMPTY;function Tr(e){return e instanceof U||e&&"closed"in e&&C(e.remove)&&C(e.add)&&C(e.unsubscribe)}function eu(e){C(e)?e():e.unsubscribe()}var Te={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var qt={setTimeout(e,t,...n){let{delegate:r}=qt;return r?.setTimeout?r.setTimeout(e,t,...n):setTimeout(e,t,...n)},clearTimeout(e){let{delegate:t}=qt;return(t?.clearTimeout||clearTimeout)(e)},delegate:void 0};function _r(e){qt.setTimeout(()=>{let{onUnhandledError:t}=Te;if(t)t(e);else throw e})}function Ln(){}var tu=ki("C",void 0,void 0);function nu(e){return ki("E",void 0,e)}function ru(e){return ki("N",e,void 0)}function ki(e,t,n){return{kind:e,value:t,error:n}}var Dt=null;function Gt(e){if(Te.useDeprecatedSynchronousErrorHandling){let t=!Dt;if(t&&(Dt={errorThrown:!1,error:null}),e(),t){let{errorThrown:n,error:r}=Dt;if(Dt=null,n)throw r}}else e()}function ou(e){Te.useDeprecatedSynchronousErrorHandling&&Dt&&(Dt.errorThrown=!0,Dt.error=e)}var wt=class extends U{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,Tr(t)&&t.add(this)):this.destination=xp}static create(t,n,r){return new Wt(t,n,r)}next(t){this.isStopped?Li(ru(t),this):this._next(t)}error(t){this.isStopped?Li(nu(t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?Li(tu,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},Ep=Function.prototype.bind;function Fi(e,t){return Ep.call(e,t)}var ji=class{constructor(t){this.partialObserver=t}next(t){let{partialObserver:n}=this;if(n.next)try{n.next(t)}catch(r){Nr(r)}}error(t){let{partialObserver:n}=this;if(n.error)try{n.error(t)}catch(r){Nr(r)}else Nr(t)}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete()}catch(n){Nr(n)}}},Wt=class extends wt{constructor(t,n,r){super();let o;if(C(t)||!t)o={next:t??void 0,error:n??void 0,complete:r??void 0};else{let i;this&&Te.useDeprecatedNextContext?(i=Object.create(t),i.unsubscribe=()=>this.unsubscribe(),o={next:t.next&&Fi(t.next,i),error:t.error&&Fi(t.error,i),complete:t.complete&&Fi(t.complete,i)}):o=t}this.destination=new ji(o)}};function Nr(e){Te.useDeprecatedSynchronousErrorHandling?ou(e):_r(e)}function Sp(e){throw e}function Li(e,t){let{onStoppedNotification:n}=Te;n&&qt.setTimeout(()=>n(e,t))}var xp={closed:!0,next:Ln,error:Sp,complete:Ln};var Zt=typeof Symbol=="function"&&Symbol.observable||"@@observable";function he(e){return e}function Vi(...e){return Bi(e)}function Bi(e){return e.length===0?he:e.length===1?e[0]:function(n){return e.reduce((r,o)=>o(r),n)}}var k=(()=>{class e{constructor(n){n&&(this._subscribe=n)}lift(n){let r=new e;return r.source=this,r.operator=n,r}subscribe(n,r,o){let i=Tp(n)?n:new Wt(n,r,o);return Gt(()=>{let{operator:s,source:a}=this;i.add(s?s.call(i,a):a?this._subscribe(i):this._trySubscribe(i))}),i}_trySubscribe(n){try{return this._subscribe(n)}catch(r){n.error(r)}}forEach(n,r){return r=iu(r),new r((o,i)=>{let s=new Wt({next:a=>{try{n(a)}catch(c){i(c),s.unsubscribe()}},error:i,complete:o});this.subscribe(s)})}_subscribe(n){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(n)}[Zt](){return this}pipe(...n){return Bi(n)(this)}toPromise(n){return n=iu(n),new n((r,o)=>{let i;this.subscribe(s=>i=s,s=>o(s),()=>r(i))})}}return e.create=t=>new e(t),e})();function iu(e){var t;return(t=e??Te.Promise)!==null&&t!==void 0?t:Promise}function Mp(e){return e&&C(e.next)&&C(e.error)&&C(e.complete)}function Tp(e){return e&&e instanceof wt||Mp(e)&&Tr(e)}function $i(e){return C(e?.lift)}function _(e){return t=>{if($i(t))return t.lift(function(n){try{return e(n,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function N(e,t,n,r,o){return new Hi(e,t,n,r,o)}var Hi=class extends wt{constructor(t,n,r,o,i,s){super(t),this.onFinalize=i,this.shouldUnsubscribe=s,this._next=n?function(a){try{n(a)}catch(c){t.error(c)}}:super._next,this._error=o?function(a){try{o(a)}catch(c){t.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(a){t.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this))}}};function Yt(){return _((e,t)=>{let n=null;e._refCount++;let r=N(t,void 0,void 0,void 0,()=>{if(!e||e._refCount<=0||0<--e._refCount){n=null;return}let o=e._connection,i=n;n=null,o&&(!i||o===i)&&o.unsubscribe(),t.unsubscribe()});e.subscribe(r),r.closed||(n=e.connect())})}var Qt=class extends k{constructor(t,n){super(),this.source=t,this.subjectFactory=n,this._subject=null,this._refCount=0,this._connection=null,$i(t)&&(this.lift=t.lift)}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){let t=this._subject;return(!t||t.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:t}=this;this._subject=this._connection=null,t?.unsubscribe()}connect(){let t=this._connection;if(!t){t=this._connection=new U;let n=this.getSubject();t.add(this.source.subscribe(N(n,void 0,()=>{this._teardown(),n.complete()},r=>{this._teardown(),n.error(r)},()=>this._teardown()))),t.closed&&(this._connection=null,t=U.EMPTY)}return t}refCount(){return Yt()(this)}};var su=zt(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var te=(()=>{class e extends k{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let r=new Ar(this,this);return r.operator=n,r}_throwIfClosed(){if(this.closed)throw new su}next(n){Gt(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(n)}})}error(n){Gt(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:r}=this;for(;r.length;)r.shift().error(n)}})}complete(){Gt(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:r,isStopped:o,observers:i}=this;return r||o?Pi:(this.currentObservers=null,i.push(n),new U(()=>{this.currentObservers=null,Fn(i,n)}))}_checkFinalizedStatuses(n){let{hasError:r,thrownError:o,isStopped:i}=this;r?n.error(o):i&&n.complete()}asObservable(){let n=new k;return n.source=this,n}}return e.create=(t,n)=>new Ar(t,n),e})(),Ar=class extends te{constructor(t,n){super(),this.destination=t,this.source=n}next(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.next)===null||r===void 0||r.call(n,t)}error(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.error)===null||r===void 0||r.call(n,t)}complete(){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||n===void 0||n.call(t)}_subscribe(t){var n,r;return(r=(n=this.source)===null||n===void 0?void 0:n.subscribe(t))!==null&&r!==void 0?r:Pi}};var K=class extends te{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){let n=super._subscribe(t);return!n.closed&&t.next(this._value),n}getValue(){let{hasError:t,thrownError:n,_value:r}=this;if(t)throw n;return this._throwIfClosed(),r}next(t){super.next(this._value=t)}};var pe=new k(e=>e.complete());function au(e){return e&&C(e.schedule)}function cu(e){return e[e.length-1]}function uu(e){return C(cu(e))?e.pop():void 0}function ut(e){return au(cu(e))?e.pop():void 0}function du(e,t,n,r){function o(i){return i instanceof n?i:new n(function(s){s(i)})}return new(n||(n=Promise))(function(i,s){function a(l){try{u(r.next(l))}catch(d){s(d)}}function c(l){try{u(r.throw(l))}catch(d){s(d)}}function u(l){l.done?i(l.value):o(l.value).then(a,c)}u((r=r.apply(e,t||[])).next())})}function lu(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function Ct(e){return this instanceof Ct?(this.v=e,this):new Ct(e)}function fu(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(e,t||[]),o,i=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),o[Symbol.asyncIterator]=function(){return this},o;function s(f){return function(g){return Promise.resolve(g).then(f,d)}}function a(f,g){r[f]&&(o[f]=function(T){return new Promise(function(L,B){i.push([f,T,L,B])>1||c(f,T)})},g&&(o[f]=g(o[f])))}function c(f,g){try{u(r[f](g))}catch(T){h(i[0][3],T)}}function u(f){f.value instanceof Ct?Promise.resolve(f.value.v).then(l,d):h(i[0][2],f)}function l(f){c("next",f)}function d(f){c("throw",f)}function h(f,g){f(g),i.shift(),i.length&&c(i[0][0],i[0][1])}}function hu(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof lu=="function"?lu(e):e[Symbol.iterator](),n={},r("next"),r("throw"),r("return"),n[Symbol.asyncIterator]=function(){return this},n);function r(i){n[i]=e[i]&&function(s){return new Promise(function(a,c){s=e[i](s),o(a,c,s.done,s.value)})}}function o(i,s,a,c){Promise.resolve(c).then(function(u){i({value:u,done:a})},s)}}var Rr=e=>e&&typeof e.length=="number"&&typeof e!="function";function Or(e){return C(e?.then)}function Pr(e){return C(e[Zt])}function kr(e){return Symbol.asyncIterator&&C(e?.[Symbol.asyncIterator])}function Fr(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function _p(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Lr=_p();function jr(e){return C(e?.[Lr])}function Vr(e){return fu(this,arguments,function*(){let n=e.getReader();try{for(;;){let{value:r,done:o}=yield Ct(n.read());if(o)return yield Ct(void 0);yield yield Ct(r)}}finally{n.releaseLock()}})}function Br(e){return C(e?.getReader)}function Z(e){if(e instanceof k)return e;if(e!=null){if(Pr(e))return Np(e);if(Rr(e))return Ap(e);if(Or(e))return Rp(e);if(kr(e))return pu(e);if(jr(e))return Op(e);if(Br(e))return Pp(e)}throw Fr(e)}function Np(e){return new k(t=>{let n=e[Zt]();if(C(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Ap(e){return new k(t=>{for(let n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function Rp(e){return new k(t=>{e.then(n=>{t.closed||(t.next(n),t.complete())},n=>t.error(n)).then(null,_r)})}function Op(e){return new k(t=>{for(let n of e)if(t.next(n),t.closed)return;t.complete()})}function pu(e){return new k(t=>{kp(e,t).catch(n=>t.error(n))})}function Pp(e){return pu(Vr(e))}function kp(e,t){var n,r,o,i;return du(this,void 0,void 0,function*(){try{for(n=hu(e);r=yield n.next(),!r.done;){let s=r.value;if(t.next(s),t.closed)return}}catch(s){o={error:s}}finally{try{r&&!r.done&&(i=n.return)&&(yield i.call(n))}finally{if(o)throw o.error}}t.complete()})}function se(e,t,n,r=0,o=!1){let i=t.schedule(function(){n(),o?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(i),!o)return i}function $r(e,t=0){return _((n,r)=>{n.subscribe(N(r,o=>se(r,e,()=>r.next(o),t),()=>se(r,e,()=>r.complete(),t),o=>se(r,e,()=>r.error(o),t)))})}function Hr(e,t=0){return _((n,r)=>{r.add(e.schedule(()=>n.subscribe(r),t))})}function gu(e,t){return Z(e).pipe(Hr(t),$r(t))}function mu(e,t){return Z(e).pipe(Hr(t),$r(t))}function vu(e,t){return new k(n=>{let r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule())})})}function yu(e,t){return new k(n=>{let r;return se(n,t,()=>{r=e[Lr](),se(n,t,()=>{let o,i;try{({value:o,done:i}=r.next())}catch(s){n.error(s);return}i?n.complete():n.next(o)},0,!0)}),()=>C(r?.return)&&r.return()})}function Ur(e,t){if(!e)throw new Error("Iterable cannot be null");return new k(n=>{se(n,t,()=>{let r=e[Symbol.asyncIterator]();se(n,t,()=>{r.next().then(o=>{o.done?n.complete():n.next(o.value)})},0,!0)})})}function Du(e,t){return Ur(Vr(e),t)}function wu(e,t){if(e!=null){if(Pr(e))return gu(e,t);if(Rr(e))return vu(e,t);if(Or(e))return mu(e,t);if(kr(e))return Ur(e,t);if(jr(e))return yu(e,t);if(Br(e))return Du(e,t)}throw Fr(e)}function z(e,t){return t?wu(e,t):Z(e)}function y(...e){let t=ut(e);return z(e,t)}function Kt(e,t){let n=C(e)?e:()=>e,r=o=>o.error(n());return new k(t?o=>t.schedule(r,0,o):r)}function Ui(e){return!!e&&(e instanceof k||C(e.lift)&&C(e.subscribe))}var Ze=zt(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence"});function S(e,t){return _((n,r)=>{let o=0;n.subscribe(N(r,i=>{r.next(e.call(t,i,o++))}))})}var{isArray:Fp}=Array;function Lp(e,t){return Fp(t)?e(...t):e(t)}function Cu(e){return S(t=>Lp(e,t))}var{isArray:jp}=Array,{getPrototypeOf:Vp,prototype:Bp,keys:$p}=Object;function bu(e){if(e.length===1){let t=e[0];if(jp(t))return{args:t,keys:null};if(Hp(t)){let n=$p(t);return{args:n.map(r=>t[r]),keys:n}}}return{args:e,keys:null}}function Hp(e){return e&&typeof e=="object"&&Vp(e)===Bp}function Iu(e,t){return e.reduce((n,r,o)=>(n[r]=t[o],n),{})}function zr(...e){let t=ut(e),n=uu(e),{args:r,keys:o}=bu(e);if(r.length===0)return z([],t);let i=new k(Up(r,t,o?s=>Iu(o,s):he));return n?i.pipe(Cu(n)):i}function Up(e,t,n=he){return r=>{Eu(t,()=>{let{length:o}=e,i=new Array(o),s=o,a=o;for(let c=0;c<o;c++)Eu(t,()=>{let u=z(e[c],t),l=!1;u.subscribe(N(r,d=>{i[c]=d,l||(l=!0,a--),a||r.next(n(i.slice()))},()=>{--s||r.complete()}))},r)},r)}}function Eu(e,t,n){e?se(n,e,t):t()}function Su(e,t,n,r,o,i,s,a){let c=[],u=0,l=0,d=!1,h=()=>{d&&!c.length&&!u&&t.complete()},f=T=>u<r?g(T):c.push(T),g=T=>{i&&t.next(T),u++;let L=!1;Z(n(T,l++)).subscribe(N(t,B=>{o?.(B),i?f(B):t.next(B)},()=>{L=!0},void 0,()=>{if(L)try{for(u--;c.length&&u<r;){let B=c.shift();s?se(t,s,()=>g(B)):g(B)}h()}catch(B){t.error(B)}}))};return e.subscribe(N(t,f,()=>{d=!0,h()})),()=>{a?.()}}function W(e,t,n=1/0){return C(t)?W((r,o)=>S((i,s)=>t(r,i,o,s))(Z(e(r,o))),n):(typeof t=="number"&&(n=t),_((r,o)=>Su(r,o,e,n)))}function Jt(e=1/0){return W(he,e)}function xu(){return Jt(1)}function Xt(...e){return xu()(z(e,ut(e)))}function qr(e){return new k(t=>{Z(e()).subscribe(t)})}function ae(e,t){return _((n,r)=>{let o=0;n.subscribe(N(r,i=>e.call(t,i,o++)&&r.next(i)))})}function lt(e){return _((t,n)=>{let r=null,o=!1,i;r=t.subscribe(N(n,void 0,void 0,s=>{i=Z(e(s,lt(e)(t))),r?(r.unsubscribe(),r=null,i.subscribe(n)):o=!0})),o&&(r.unsubscribe(),r=null,i.subscribe(n))})}function Mu(e,t,n,r,o){return(i,s)=>{let a=n,c=t,u=0;i.subscribe(N(s,l=>{let d=u++;c=a?e(c,l,d):(a=!0,l),r&&s.next(c)},o&&(()=>{a&&s.next(c),s.complete()})))}}function en(e,t){return C(t)?W(e,t,1):W(e,1)}function dt(e){return _((t,n)=>{let r=!1;t.subscribe(N(n,o=>{r=!0,n.next(o)},()=>{r||n.next(e),n.complete()}))})}function Ye(e){return e<=0?()=>pe:_((t,n)=>{let r=0;t.subscribe(N(n,o=>{++r<=e&&(n.next(o),e<=r&&n.complete())}))})}function zi(e){return S(()=>e)}function Gr(e=zp){return _((t,n)=>{let r=!1;t.subscribe(N(n,o=>{r=!0,n.next(o)},()=>r?n.complete():n.error(e())))})}function zp(){return new Ze}function jn(e){return _((t,n)=>{try{t.subscribe(n)}finally{n.add(e)}})}function Le(e,t){let n=arguments.length>=2;return r=>r.pipe(e?ae((o,i)=>e(o,i,r)):he,Ye(1),n?dt(t):Gr(()=>new Ze))}function tn(e){return e<=0?()=>pe:_((t,n)=>{let r=[];t.subscribe(N(n,o=>{r.push(o),e<r.length&&r.shift()},()=>{for(let o of r)n.next(o);n.complete()},void 0,()=>{r=null}))})}function qi(e,t){let n=arguments.length>=2;return r=>r.pipe(e?ae((o,i)=>e(o,i,r)):he,tn(1),n?dt(t):Gr(()=>new Ze))}function Gi(e,t){return _(Mu(e,t,arguments.length>=2,!0))}function Wi(...e){let t=ut(e);return _((n,r)=>{(t?Xt(e,n,t):Xt(e,n)).subscribe(r)})}function ce(e,t){return _((n,r)=>{let o=null,i=0,s=!1,a=()=>s&&!o&&r.complete();n.subscribe(N(r,c=>{o?.unsubscribe();let u=0,l=i++;Z(e(c,l)).subscribe(o=N(r,d=>r.next(t?t(c,d,l,u++):d),()=>{o=null,a()}))},()=>{s=!0,a()}))})}function Zi(e){return _((t,n)=>{Z(e).subscribe(N(n,()=>n.complete(),Ln)),!n.closed&&t.subscribe(n)})}function J(e,t,n){let r=C(e)||t||n?{next:e,error:t,complete:n}:e;return r?_((o,i)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;o.subscribe(N(i,c=>{var u;(u=r.next)===null||u===void 0||u.call(r,c),i.next(c)},()=>{var c;a=!1,(c=r.complete)===null||c===void 0||c.call(r),i.complete()},c=>{var u;a=!1,(u=r.error)===null||u===void 0||u.call(r,c),i.error(c)},()=>{var c,u;a&&((c=r.unsubscribe)===null||c===void 0||c.call(r)),(u=r.finalize)===null||u===void 0||u.call(r)}))}):he}var ml="https://g.co/ng/security#xss",v=class extends Error{constructor(t,n){super(ta(t,n)),this.code=t}};function ta(e,t){return`${`NG0${Math.abs(e)}`}${t?": "+t:""}`}function Mo(e){return{toString:e}.toString()}var Wr="__parameters__";function qp(e){return function(...n){if(e){let r=e(...n);for(let o in r)this[o]=r[o]}}}function vl(e,t,n){return Mo(()=>{let r=qp(t);function o(...i){if(this instanceof o)return r.apply(this,i),this;let s=new o(...i);return a.annotation=s,a;function a(c,u,l){let d=c.hasOwnProperty(Wr)?c[Wr]:Object.defineProperty(c,Wr,{value:[]})[Wr];for(;d.length<=l;)d.push(null);return(d[l]=d[l]||[]).push(s),c}}return n&&(o.prototype=Object.create(n.prototype)),o.prototype.ngMetadataName=e,o.annotationCls=o,o})}var Hn=globalThis;function F(e){for(let t in e)if(e[t]===F)return t;throw Error("Could not find renamed property on target object.")}function ge(e){if(typeof e=="string")return e;if(Array.isArray(e))return"["+e.map(ge).join(", ")+"]";if(e==null)return""+e;if(e.overriddenName)return`${e.overriddenName}`;if(e.name)return`${e.name}`;let t=e.toString();if(t==null)return""+t;let n=t.indexOf(`
`);return n===-1?t:t.substring(0,n)}function Tu(e,t){return e==null||e===""?t===null?"":t:t==null||t===""?e:e+" "+t}var Gp=F({__forward_ref__:F});function yl(e){return e.__forward_ref__=yl,e.toString=function(){return ge(this())},e}function we(e){return Dl(e)?e():e}function Dl(e){return typeof e=="function"&&e.hasOwnProperty(Gp)&&e.__forward_ref__===yl}function w(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function To(e){return _u(e,Cl)||_u(e,bl)}function wl(e){return To(e)!==null}function _u(e,t){return e.hasOwnProperty(t)?e[t]:null}function Wp(e){let t=e&&(e[Cl]||e[bl]);return t||null}function Nu(e){return e&&(e.hasOwnProperty(Au)||e.hasOwnProperty(Zp))?e[Au]:null}var Cl=F({\u0275prov:F}),Au=F({\u0275inj:F}),bl=F({ngInjectableDef:F}),Zp=F({ngInjectorDef:F}),E=class{constructor(t,n){this._desc=t,this.ngMetadataName="InjectionToken",this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=w({token:this,providedIn:n.providedIn||"root",factory:n.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Il(e){return e&&!!e.\u0275providers}var Yp=F({\u0275cmp:F}),Qp=F({\u0275dir:F}),Kp=F({\u0275pipe:F}),Jp=F({\u0275mod:F}),oo=F({\u0275fac:F}),$n=F({__NG_ELEMENT_ID__:F}),Ru=F({__NG_ENV_ID__:F});function Qn(e){return typeof e=="string"?e:e==null?"":String(e)}function Xp(e){return typeof e=="function"?e.name||e.toString():typeof e=="object"&&e!=null&&typeof e.type=="function"?e.type.name||e.type.toString():Qn(e)}function eg(e,t){let n=t?`. Dependency path: ${t.join(" > ")} > ${e}`:"";throw new v(-200,e)}function na(e,t){throw new v(-201,!1)}var x=function(e){return e[e.Default=0]="Default",e[e.Host=1]="Host",e[e.Self=2]="Self",e[e.SkipSelf=4]="SkipSelf",e[e.Optional=8]="Optional",e}(x||{}),rs;function El(){return rs}function ue(e){let t=rs;return rs=e,t}function Sl(e,t,n){let r=To(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(n&x.Optional)return null;if(t!==void 0)return t;na(e,"Injector")}var tg={},Un=tg,os="__NG_DI_FLAG__",io="ngTempTokenPath",ng="ngTokenPath",rg=/\n/gm,og="\u0275",Ou="__source",sn;function ig(){return sn}function ft(e){let t=sn;return sn=e,t}function sg(e,t=x.Default){if(sn===void 0)throw new v(-203,!1);return sn===null?Sl(e,void 0,t):sn.get(e,t&x.Optional?null:void 0,t)}function M(e,t=x.Default){return(El()||sg)(we(e),t)}function p(e,t=x.Default){return M(e,_o(t))}function _o(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function is(e){let t=[];for(let n=0;n<e.length;n++){let r=we(e[n]);if(Array.isArray(r)){if(r.length===0)throw new v(900,!1);let o,i=x.Default;for(let s=0;s<r.length;s++){let a=r[s],c=ag(a);typeof c=="number"?c===-1?o=a.token:i|=c:o=a}t.push(M(o,i))}else t.push(M(r))}return t}function xl(e,t){return e[os]=t,e.prototype[os]=t,e}function ag(e){return e[os]}function cg(e,t,n,r){let o=e[io];throw t[Ou]&&o.unshift(t[Ou]),e.message=ug(`
`+e.message,o,n,r),e[ng]=o,e[io]=null,e}function ug(e,t,n,r=null){e=e&&e.charAt(0)===`
`&&e.charAt(1)==og?e.slice(2):e;let o=ge(t);if(Array.isArray(t))o=t.map(ge).join(" -> ");else if(typeof t=="object"){let i=[];for(let s in t)if(t.hasOwnProperty(s)){let a=t[s];i.push(s+":"+(typeof a=="string"?JSON.stringify(a):ge(a)))}o=`{${i.join(", ")}}`}return`${n}${r?"("+r+")":""}[${o}]: ${e.replace(rg,`
  `)}`}var ra=xl(vl("Optional"),8);var Ml=xl(vl("SkipSelf"),4);function It(e,t){let n=e.hasOwnProperty(oo);return n?e[oo]:null}function lg(e,t,n){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++){let o=e[r],i=t[r];if(n&&(o=n(o),i=n(i)),i!==o)return!1}return!0}function dg(e){return e.flat(Number.POSITIVE_INFINITY)}function oa(e,t){e.forEach(n=>Array.isArray(n)?oa(n,t):t(n))}function Tl(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n)}function so(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}var zn={},cn=[],un=new E(""),_l=new E("",-1),Nl=new E(""),ao=class{get(t,n=Un){if(n===Un){let r=new Error(`NullInjectorError: No provider for ${ge(t)}!`);throw r.name="NullInjectorError",r}return n}},Al=function(e){return e[e.OnPush=0]="OnPush",e[e.Default=1]="Default",e}(Al||{}),Be=function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e}(Be||{}),gt=function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e}(gt||{});function fg(e,t,n){let r=e.length;for(;;){let o=e.indexOf(t,n);if(o===-1)return o;if(o===0||e.charCodeAt(o-1)<=32){let i=t.length;if(o+i===r||e.charCodeAt(o+i)<=32)return o}n=o+1}}function ss(e,t,n){let r=0;for(;r<n.length;){let o=n[r];if(typeof o=="number"){if(o!==0)break;r++;let i=n[r++],s=n[r++],a=n[r++];e.setAttribute(t,s,a,i)}else{let i=o,s=n[++r];hg(i)?e.setProperty(t,i,s):e.setAttribute(t,i,s),r++}}return r}function Rl(e){return e===3||e===4||e===6}function hg(e){return e.charCodeAt(0)===64}function ia(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else{let n=-1;for(let r=0;r<t.length;r++){let o=t[r];typeof o=="number"?n=o:n===0||(n===-1||n===2?Pu(e,n,o,null,t[++r]):Pu(e,n,o,null,null))}}return e}function Pu(e,t,n,r,o){let i=0,s=e.length;if(t===-1)s=-1;else for(;i<e.length;){let a=e[i++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=i-1;break}}}for(;i<e.length;){let a=e[i];if(typeof a=="number")break;if(a===n){if(r===null){o!==null&&(e[i+1]=o);return}else if(r===e[i+1]){e[i+2]=o;return}}i++,r!==null&&i++,o!==null&&i++}s!==-1&&(e.splice(s,0,t),i=s+1),e.splice(i++,0,n),r!==null&&e.splice(i++,0,r),o!==null&&e.splice(i++,0,o)}var Ol="ng-template";function pg(e,t,n,r){let o=0;if(r){for(;o<t.length&&typeof t[o]=="string";o+=2)if(t[o]==="class"&&fg(t[o+1].toLowerCase(),n,0)!==-1)return!0}else if(sa(e))return!1;if(o=t.indexOf(1,o),o>-1){let i;for(;++o<t.length&&typeof(i=t[o])=="string";)if(i.toLowerCase()===n)return!0}return!1}function sa(e){return e.type===4&&e.value!==Ol}function gg(e,t,n){let r=e.type===4&&!n?Ol:e.value;return t===r}function mg(e,t,n){let r=4,o=e.attrs,i=o!==null?Dg(o):0,s=!1;for(let a=0;a<t.length;a++){let c=t[a];if(typeof c=="number"){if(!s&&!_e(r)&&!_e(c))return!1;if(s&&_e(c))continue;s=!1,r=c|r&1;continue}if(!s)if(r&4){if(r=2|r&1,c!==""&&!gg(e,c,n)||c===""&&t.length===1){if(_e(r))return!1;s=!0}}else if(r&8){if(o===null||!pg(e,o,c,n)){if(_e(r))return!1;s=!0}}else{let u=t[++a],l=vg(c,o,sa(e),n);if(l===-1){if(_e(r))return!1;s=!0;continue}if(u!==""){let d;if(l>i?d="":d=o[l+1].toLowerCase(),r&2&&u!==d){if(_e(r))return!1;s=!0}}}}return _e(r)||s}function _e(e){return(e&1)===0}function vg(e,t,n,r){if(t===null)return-1;let o=0;if(r||!n){let i=!1;for(;o<t.length;){let s=t[o];if(s===e)return o;if(s===3||s===6)i=!0;else if(s===1||s===2){let a=t[++o];for(;typeof a=="string";)a=t[++o];continue}else{if(s===4)break;if(s===0){o+=4;continue}}o+=i?1:2}return-1}else return wg(t,e)}function yg(e,t,n=!1){for(let r=0;r<t.length;r++)if(mg(e,t[r],n))return!0;return!1}function Dg(e){for(let t=0;t<e.length;t++){let n=e[t];if(Rl(n))return t}return e.length}function wg(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let r=e[n];if(typeof r=="number")return-1;if(r===t)return n;n++}return-1}function ku(e,t){return e?":not("+t.trim()+")":t}function Cg(e){let t=e[0],n=1,r=2,o="",i=!1;for(;n<e.length;){let s=e[n];if(typeof s=="string")if(r&2){let a=e[++n];o+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else r&8?o+="."+s:r&4&&(o+=" "+s);else o!==""&&!_e(s)&&(t+=ku(i,o),o=""),r=s,i=i||!_e(r);n++}return o!==""&&(t+=ku(i,o)),t}function bg(e){return e.map(Cg).join(",")}function Ig(e){let t=[],n=[],r=1,o=2;for(;r<e.length;){let i=e[r];if(typeof i=="string")o===2?i!==""&&t.push(i,e[++r]):o===8&&n.push(i);else{if(!_e(o))break;o=i}r++}return{attrs:t,classes:n}}function Y(e){return Mo(()=>{let t=Vl(e),n=$(m({},t),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection===Al.OnPush,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||Be.Emulated,styles:e.styles||cn,_:null,schemas:e.schemas||null,tView:null,id:""});Bl(n);let r=e.dependencies;return n.directiveDefs=Lu(r,!1),n.pipeDefs=Lu(r,!0),n.id=xg(n),n})}function Eg(e){return Et(e)||kl(e)}function Sg(e){return e!==null}function Fu(e,t){if(e==null)return zn;let n={};for(let r in e)if(e.hasOwnProperty(r)){let o=e[r],i,s,a=gt.None;Array.isArray(o)?(a=o[0],i=o[1],s=o[2]??i):(i=o,s=o),t?(n[i]=a!==gt.None?[r,a]:r,t[i]=s):n[i]=r}return n}function vn(e){return Mo(()=>{let t=Vl(e);return Bl(t),t})}function Pl(e){return{type:e.type,name:e.name,factory:null,pure:e.pure!==!1,standalone:e.standalone===!0,onDestroy:e.type.prototype.ngOnDestroy||null}}function Et(e){return e[Yp]||null}function kl(e){return e[Qp]||null}function Fl(e){return e[Kp]||null}function Ll(e){let t=Et(e)||kl(e)||Fl(e);return t!==null?t.standalone:!1}function jl(e,t){let n=e[Jp]||null;if(!n&&t===!0)throw new Error(`Type ${ge(e)} does not have '\u0275mod' property.`);return n}function Vl(e){let t={};return{type:e.type,providersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputTransforms:null,inputConfig:e.inputs||zn,exportAs:e.exportAs||null,standalone:e.standalone===!0,signals:e.signals===!0,selectors:e.selectors||cn,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:Fu(e.inputs,t),outputs:Fu(e.outputs),debugInfo:null}}function Bl(e){e.features?.forEach(t=>t(e))}function Lu(e,t){if(!e)return null;let n=t?Fl:Eg;return()=>(typeof e=="function"?e():e).map(r=>n(r)).filter(Sg)}function xg(e){let t=0,n=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,e.consts,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery].join("|");for(let o of n)t=Math.imul(31,t)+o.charCodeAt(0)<<0;return t+=2147483648,"c"+t}function No(e){return{\u0275providers:e}}function Mg(...e){return{\u0275providers:$l(!0,e),\u0275fromNgModule:!0}}function $l(e,...t){let n=[],r=new Set,o,i=s=>{n.push(s)};return oa(t,s=>{let a=s;as(a,i,[],r)&&(o||=[],o.push(a))}),o!==void 0&&Hl(o,i),n}function Hl(e,t){for(let n=0;n<e.length;n++){let{ngModule:r,providers:o}=e[n];aa(o,i=>{t(i,r)})}}function as(e,t,n,r){if(e=we(e),!e)return!1;let o=null,i=Nu(e),s=!i&&Et(e);if(!i&&!s){let c=e.ngModule;if(i=Nu(c),i)o=c;else return!1}else{if(s&&!s.standalone)return!1;o=e}let a=r.has(o);if(s){if(a)return!1;if(r.add(o),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let u of c)as(u,t,n,r)}}else if(i){if(i.imports!=null&&!a){r.add(o);let u;try{oa(i.imports,l=>{as(l,t,n,r)&&(u||=[],u.push(l))})}finally{}u!==void 0&&Hl(u,t)}if(!a){let u=It(o)||(()=>new o);t({provide:o,useFactory:u,deps:cn},o),t({provide:Nl,useValue:o,multi:!0},o),t({provide:un,useValue:()=>M(o),multi:!0},o)}let c=i.providers;if(c!=null&&!a){let u=e;aa(c,l=>{t(l,u)})}}else return!1;return o!==e&&e.providers!==void 0}function aa(e,t){for(let n of e)Il(n)&&(n=n.\u0275providers),Array.isArray(n)?aa(n,t):t(n)}var Tg=F({provide:String,useValue:F});function Ul(e){return e!==null&&typeof e=="object"&&Tg in e}function _g(e){return!!(e&&e.useExisting)}function Ng(e){return!!(e&&e.useFactory)}function cs(e){return typeof e=="function"}var Ao=new E(""),Jr={},Ag={},Yi;function ca(){return Yi===void 0&&(Yi=new ao),Yi}var be=class{},qn=class extends be{get destroyed(){return this._destroyed}constructor(t,n,r,o){super(),this.parent=n,this.source=r,this.scopes=o,this.records=new Map,this._ngOnDestroyHooks=new Set,this._onDestroyHooks=[],this._destroyed=!1,ls(t,s=>this.processProvider(s)),this.records.set(_l,nn(void 0,this)),o.has("environment")&&this.records.set(be,nn(void 0,this));let i=this.records.get(Ao);i!=null&&typeof i.value=="string"&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(Nl,cn,x.Self))}destroy(){this.assertNotDestroyed(),this._destroyed=!0;let t=R(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of n)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),R(t)}}onDestroy(t){return this.assertNotDestroyed(),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){this.assertNotDestroyed();let n=ft(this),r=ue(void 0),o;try{return t()}finally{ft(n),ue(r)}}get(t,n=Un,r=x.Default){if(this.assertNotDestroyed(),t.hasOwnProperty(Ru))return t[Ru](this);r=_o(r);let o,i=ft(this),s=ue(void 0);try{if(!(r&x.SkipSelf)){let c=this.records.get(t);if(c===void 0){let u=Lg(t)&&To(t);u&&this.injectableDefInScope(u)?c=nn(us(t),Jr):c=null,this.records.set(t,c)}if(c!=null)return this.hydrate(t,c)}let a=r&x.Self?ca():this.parent;return n=r&x.Optional&&n===Un?null:n,a.get(t,n)}catch(a){if(a.name==="NullInjectorError"){if((a[io]=a[io]||[]).unshift(ge(t)),i)throw a;return cg(a,t,"R3InjectorError",this.source)}else throw a}finally{ue(s),ft(i)}}resolveInjectorInitializers(){let t=R(null),n=ft(this),r=ue(void 0),o;try{let i=this.get(un,cn,x.Self);for(let s of i)s()}finally{ft(n),ue(r),R(t)}}toString(){let t=[],n=this.records;for(let r of n.keys())t.push(ge(r));return`R3Injector[${t.join(", ")}]`}assertNotDestroyed(){if(this._destroyed)throw new v(205,!1)}processProvider(t){t=we(t);let n=cs(t)?t:we(t&&t.provide),r=Og(t);if(!cs(t)&&t.multi===!0){let o=this.records.get(n);o||(o=nn(void 0,Jr,!0),o.factory=()=>is(o.multi),this.records.set(n,o)),n=t,o.multi.push(t)}this.records.set(n,r)}hydrate(t,n){let r=R(null);try{return n.value===Jr&&(n.value=Ag,n.value=n.factory()),typeof n.value=="object"&&n.value&&Fg(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{R(r)}}injectableDefInScope(t){if(!t.providedIn)return!1;let n=we(t.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(t){let n=this._onDestroyHooks.indexOf(t);n!==-1&&this._onDestroyHooks.splice(n,1)}};function us(e){let t=To(e),n=t!==null?t.factory:It(e);if(n!==null)return n;if(e instanceof E)throw new v(204,!1);if(e instanceof Function)return Rg(e);throw new v(204,!1)}function Rg(e){if(e.length>0)throw new v(204,!1);let n=Wp(e);return n!==null?()=>n.factory(e):()=>new e}function Og(e){if(Ul(e))return nn(void 0,e.useValue);{let t=Pg(e);return nn(t,Jr)}}function Pg(e,t,n){let r;if(cs(e)){let o=we(e);return It(o)||us(o)}else if(Ul(e))r=()=>we(e.useValue);else if(Ng(e))r=()=>e.useFactory(...is(e.deps||[]));else if(_g(e))r=()=>M(we(e.useExisting));else{let o=we(e&&(e.useClass||e.provide));if(kg(e))r=()=>new o(...is(e.deps));else return It(o)||us(o)}return r}function nn(e,t,n=!1){return{factory:e,value:t,multi:n?[]:void 0}}function kg(e){return!!e.deps}function Fg(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function Lg(e){return typeof e=="function"||typeof e=="object"&&e instanceof E}function ls(e,t){for(let n of e)Array.isArray(n)?ls(n,t):n&&Il(n)?ls(n.\u0275providers,t):t(n)}function et(e,t){e instanceof qn&&e.assertNotDestroyed();let n,r=ft(e),o=ue(void 0);try{return t()}finally{ft(r),ue(o)}}function jg(){return El()!==void 0||ig()!=null}function Vg(e){return typeof e=="function"}var tt=0,I=1,D=2,ne=3,Ne=4,Ae=5,co=6,uo=7,Qe=8,ln=9,$e=10,re=11,Gn=12,ju=13,Kn=14,He=15,St=16,rn=17,Ke=18,Ro=19,zl=20,ht=21,Qi=22,Ce=23,Ue=25,ql=1;var xt=7,lo=8,dn=9,me=10,fo=function(e){return e[e.None=0]="None",e[e.HasTransplantedViews=2]="HasTransplantedViews",e}(fo||{});function pt(e){return Array.isArray(e)&&typeof e[ql]=="object"}function nt(e){return Array.isArray(e)&&e[ql]===!0}function Gl(e){return(e.flags&4)!==0}function Oo(e){return e.componentOffset>-1}function ua(e){return(e.flags&1)===1}function Jn(e){return!!e.template}function ds(e){return(e[D]&512)!==0}var fs=class{constructor(t,n,r){this.previousValue=t,this.currentValue=n,this.firstChange=r}isFirstChange(){return this.firstChange}};function Wl(e,t,n,r){t!==null?t.applyValueToInputSignal(t,r):e[n]=r}function yn(){return Zl}function Zl(e){return e.type.prototype.ngOnChanges&&(e.setInput=$g),Bg}yn.ngInherit=!0;function Bg(){let e=Ql(this),t=e?.current;if(t){let n=e.previous;if(n===zn)e.previous=t;else for(let r in t)n[r]=t[r];e.current=null,this.ngOnChanges(t)}}function $g(e,t,n,r,o){let i=this.declaredInputs[r],s=Ql(e)||Hg(e,{previous:zn,current:null}),a=s.current||(s.current={}),c=s.previous,u=c[i];a[i]=new fs(u&&u.currentValue,n,c===zn),Wl(e,t,o,n)}var Yl="__ngSimpleChanges__";function Ql(e){return e[Yl]||null}function Hg(e,t){return e[Yl]=t}var Vu=null;var je=function(e,t,n){Vu?.(e,t,n)},Kl="svg",Ug="math";function ze(e){for(;Array.isArray(e);)e=e[tt];return e}function zg(e,t){return ze(t[e])}function Ie(e,t){return ze(t[e.index])}function Jl(e,t){return e.data[t]}function qg(e,t){return e[t]}function vt(e,t){let n=t[e];return pt(n)?n:n[tt]}function Gg(e){return(e[D]&4)===4}function la(e){return(e[D]&128)===128}function Wg(e){return nt(e[ne])}function ho(e,t){return t==null?null:e[t]}function Xl(e){e[rn]=0}function ed(e){e[D]&1024||(e[D]|=1024,la(e)&&ko(e))}function Po(e){return!!(e[D]&9216||e[Ce]?.dirty)}function hs(e){e[$e].changeDetectionScheduler?.notify(8),e[D]&64&&(e[D]|=1024),Po(e)&&ko(e)}function ko(e){e[$e].changeDetectionScheduler?.notify(0);let t=Mt(e);for(;t!==null&&!(t[D]&8192||(t[D]|=8192,!la(t)));)t=Mt(t)}function td(e,t){if((e[D]&256)===256)throw new v(911,!1);e[ht]===null&&(e[ht]=[]),e[ht].push(t)}function Zg(e,t){if(e[ht]===null)return;let n=e[ht].indexOf(t);n!==-1&&e[ht].splice(n,1)}function Mt(e){let t=e[ne];return nt(t)?t[ne]:t}var A={lFrame:ld(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var nd=!1;function Yg(){return A.lFrame.elementDepthCount}function Qg(){A.lFrame.elementDepthCount++}function Kg(){A.lFrame.elementDepthCount--}function rd(){return A.bindingsEnabled}function Jg(){return A.skipHydrationRootTNode!==null}function Xg(e){return A.skipHydrationRootTNode===e}function em(){A.skipHydrationRootTNode=null}function j(){return A.lFrame.lView}function Ee(){return A.lFrame.tView}function le(){let e=od();for(;e!==null&&e.type===64;)e=e.parent;return e}function od(){return A.lFrame.currentTNode}function tm(){let e=A.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function Xn(e,t){let n=A.lFrame;n.currentTNode=e,n.isParent=t}function id(){return A.lFrame.isParent}function nm(){A.lFrame.isParent=!1}function sd(){return nd}function Bu(e){nd=e}function rm(){let e=A.lFrame,t=e.bindingRootIndex;return t===-1&&(t=e.bindingRootIndex=e.tView.bindingStartIndex),t}function om(e){return A.lFrame.bindingIndex=e}function da(){return A.lFrame.bindingIndex++}function im(){return A.lFrame.inI18n}function sm(e,t){let n=A.lFrame;n.bindingIndex=n.bindingRootIndex=e,ps(t)}function am(){return A.lFrame.currentDirectiveIndex}function ps(e){A.lFrame.currentDirectiveIndex=e}function ad(){return A.lFrame.currentQueryIndex}function fa(e){A.lFrame.currentQueryIndex=e}function cm(e){let t=e[I];return t.type===2?t.declTNode:t.type===1?e[Ae]:null}function cd(e,t,n){if(n&x.SkipSelf){let o=t,i=e;for(;o=o.parent,o===null&&!(n&x.Host);)if(o=cm(i),o===null||(i=i[Kn],o.type&10))break;if(o===null)return!1;t=o,e=i}let r=A.lFrame=ud();return r.currentTNode=t,r.lView=e,!0}function ha(e){let t=ud(),n=e[I];A.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=!1}function ud(){let e=A.lFrame,t=e===null?null:e.child;return t===null?ld(e):t}function ld(e){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=t),t}function dd(){let e=A.lFrame;return A.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var fd=dd;function pa(){let e=dd();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function ga(){return A.lFrame.selectedIndex}function Tt(e){A.lFrame.selectedIndex=e}function hd(){let e=A.lFrame;return Jl(e.tView,e.selectedIndex)}function pd(){A.lFrame.currentNamespace=Kl}function gd(){um()}function um(){A.lFrame.currentNamespace=null}function lm(){return A.lFrame.currentNamespace}var md=!0;function ma(){return md}function va(e){md=e}function dm(e,t,n){let{ngOnChanges:r,ngOnInit:o,ngDoCheck:i}=t.type.prototype;if(r){let s=Zl(t);(n.preOrderHooks??=[]).push(e,s),(n.preOrderCheckHooks??=[]).push(e,s)}o&&(n.preOrderHooks??=[]).push(0-e,o),i&&((n.preOrderHooks??=[]).push(e,i),(n.preOrderCheckHooks??=[]).push(e,i))}function ya(e,t){for(let n=t.directiveStart,r=t.directiveEnd;n<r;n++){let i=e.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:u,ngOnDestroy:l}=i;s&&(e.contentHooks??=[]).push(-n,s),a&&((e.contentHooks??=[]).push(n,a),(e.contentCheckHooks??=[]).push(n,a)),c&&(e.viewHooks??=[]).push(-n,c),u&&((e.viewHooks??=[]).push(n,u),(e.viewCheckHooks??=[]).push(n,u)),l!=null&&(e.destroyHooks??=[]).push(n,l)}}function Xr(e,t,n){vd(e,t,3,n)}function eo(e,t,n,r){(e[D]&3)===n&&vd(e,t,n,r)}function Ki(e,t){let n=e[D];(n&3)===t&&(n&=16383,n+=1,e[D]=n)}function vd(e,t,n,r){let o=r!==void 0?e[rn]&65535:0,i=r??-1,s=t.length-1,a=0;for(let c=o;c<s;c++)if(typeof t[c+1]=="number"){if(a=t[c],r!=null&&a>=r)break}else t[c]<0&&(e[rn]+=65536),(a<i||i==-1)&&(fm(e,n,t,c),e[rn]=(e[rn]&4294901760)+c+2),c++}function $u(e,t){je(4,e,t);let n=R(null);try{t.call(e)}finally{R(n),je(5,e,t)}}function fm(e,t,n,r){let o=n[r]<0,i=n[r+1],s=o?-n[r]:n[r],a=e[s];o?e[D]>>14<e[rn]>>16&&(e[D]&3)===t&&(e[D]+=16384,$u(a,i)):$u(a,i)}var an=-1,Wn=class{constructor(t,n,r){this.factory=t,this.resolving=!1,this.canSeeViewProviders=n,this.injectImpl=r}};function hm(e){return e instanceof Wn}function pm(e){return(e.flags&8)!==0}function gm(e){return(e.flags&16)!==0}var Ji={},gs=class{constructor(t,n){this.injector=t,this.parentInjector=n}get(t,n,r){r=_o(r);let o=this.injector.get(t,Ji,r);return o!==Ji||n===Ji?o:this.parentInjector.get(t,n,r)}};function yd(e){return e!==an}function po(e){return e&32767}function mm(e){return e>>16}function go(e,t){let n=mm(e),r=t;for(;n>0;)r=r[Kn],n--;return r}var ms=!0;function mo(e){let t=ms;return ms=e,t}var vm=256,Dd=vm-1,wd=5,ym=0,Ve={};function Dm(e,t,n){let r;typeof n=="string"?r=n.charCodeAt(0)||0:n.hasOwnProperty($n)&&(r=n[$n]),r==null&&(r=n[$n]=ym++);let o=r&Dd,i=1<<o;t.data[e+(o>>wd)]|=i}function Cd(e,t){let n=bd(e,t);if(n!==-1)return n;let r=t[I];r.firstCreatePass&&(e.injectorIndex=t.length,Xi(r.data,e),Xi(t,null),Xi(r.blueprint,null));let o=Da(e,t),i=e.injectorIndex;if(yd(o)){let s=po(o),a=go(o,t),c=a[I].data;for(let u=0;u<8;u++)t[i+u]=a[s+u]|c[s+u]}return t[i+8]=o,i}function Xi(e,t){e.push(0,0,0,0,0,0,0,0,t)}function bd(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function Da(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,r=null,o=t;for(;o!==null;){if(r=Md(o),r===null)return an;if(n++,o=o[Kn],r.injectorIndex!==-1)return r.injectorIndex|n<<16}return an}function wm(e,t,n){Dm(e,t,n)}function Cm(e,t){if(t==="class")return e.classes;if(t==="style")return e.styles;let n=e.attrs;if(n){let r=n.length,o=0;for(;o<r;){let i=n[o];if(Rl(i))break;if(i===0)o=o+2;else if(typeof i=="number")for(o++;o<r&&typeof n[o]=="string";)o++;else{if(i===t)return n[o+1];o=o+2}}}return null}function Id(e,t,n){if(n&x.Optional||e!==void 0)return e;na(t,"NodeInjector")}function Ed(e,t,n,r){if(n&x.Optional&&r===void 0&&(r=null),!(n&(x.Self|x.Host))){let o=e[ln],i=ue(void 0);try{return o?o.get(t,r,n&x.Optional):Sl(t,r,n&x.Optional)}finally{ue(i)}}return Id(r,t,n)}function Sd(e,t,n,r=x.Default,o){if(e!==null){if(t[D]&2048&&!(r&x.Self)){let s=Sm(e,t,n,r,Ve);if(s!==Ve)return s}let i=xd(e,t,n,r,Ve);if(i!==Ve)return i}return Ed(t,n,r,o)}function xd(e,t,n,r,o){let i=Im(n);if(typeof i=="function"){if(!cd(t,e,r))return r&x.Host?Id(o,n,r):Ed(t,n,r,o);try{let s;if(s=i(r),s==null&&!(r&x.Optional))na(n);else return s}finally{fd()}}else if(typeof i=="number"){let s=null,a=bd(e,t),c=an,u=r&x.Host?t[He][Ae]:null;for((a===-1||r&x.SkipSelf)&&(c=a===-1?Da(e,t):t[a+8],c===an||!Uu(r,!1)?a=-1:(s=t[I],a=po(c),t=go(c,t)));a!==-1;){let l=t[I];if(Hu(i,a,l.data)){let d=bm(a,t,n,s,r,u);if(d!==Ve)return d}c=t[a+8],c!==an&&Uu(r,t[I].data[a+8]===u)&&Hu(i,a,t)?(s=l,a=po(c),t=go(c,t)):a=-1}}return o}function bm(e,t,n,r,o,i){let s=t[I],a=s.data[e+8],c=r==null?Oo(a)&&ms:r!=s&&(a.type&3)!==0,u=o&x.Host&&i===a,l=to(a,s,n,c,u);return l!==null?fn(t,s,l,a):Ve}function to(e,t,n,r,o){let i=e.providerIndexes,s=t.data,a=i&1048575,c=e.directiveStart,u=e.directiveEnd,l=i>>20,d=r?a:a+l,h=o?a+l:u;for(let f=d;f<h;f++){let g=s[f];if(f<c&&n===g||f>=c&&g.type===n)return f}if(o){let f=s[c];if(f&&Jn(f)&&f.type===n)return c}return null}function fn(e,t,n,r){let o=e[n],i=t.data;if(hm(o)){let s=o;s.resolving&&eg(Xp(i[n]));let a=mo(s.canSeeViewProviders);s.resolving=!0;let c,u=s.injectImpl?ue(s.injectImpl):null,l=cd(e,r,x.Default);try{o=e[n]=s.factory(void 0,i,e,r),t.firstCreatePass&&n>=r.directiveStart&&dm(n,i[n],t)}finally{u!==null&&ue(u),mo(a),s.resolving=!1,fd()}}return o}function Im(e){if(typeof e=="string")return e.charCodeAt(0)||0;let t=e.hasOwnProperty($n)?e[$n]:void 0;return typeof t=="number"?t>=0?t&Dd:Em:t}function Hu(e,t,n){let r=1<<e;return!!(n[t+(e>>wd)]&r)}function Uu(e,t){return!(e&x.Self)&&!(e&x.Host&&t)}var bt=class{constructor(t,n){this._tNode=t,this._lView=n}get(t,n,r){return Sd(this._tNode,this._lView,t,_o(r),n)}};function Em(){return new bt(le(),j())}function wa(e){return Mo(()=>{let t=e.prototype.constructor,n=t[oo]||vs(t),r=Object.prototype,o=Object.getPrototypeOf(e.prototype).constructor;for(;o&&o!==r;){let i=o[oo]||vs(o);if(i&&i!==n)return i;o=Object.getPrototypeOf(o)}return i=>new i})}function vs(e){return Dl(e)?()=>{let t=vs(we(e));return t&&t()}:It(e)}function Sm(e,t,n,r,o){let i=e,s=t;for(;i!==null&&s!==null&&s[D]&2048&&!(s[D]&512);){let a=xd(i,s,n,r|x.Self,Ve);if(a!==Ve)return a;let c=i.parent;if(!c){let u=s[zl];if(u){let l=u.get(n,Ve,r);if(l!==Ve)return l}c=Md(s),s=s[Kn]}i=c}return o}function Md(e){let t=e[I],n=t.type;return n===2?t.declTNode:n===1?e[Ae]:null}function Ca(e){return Cm(le(),e)}function zu(e,t=null,n=null,r){let o=Td(e,t,n,r);return o.resolveInjectorInitializers(),o}function Td(e,t=null,n=null,r,o=new Set){let i=[n||cn,Mg(e)];return r=r||(typeof e=="object"?void 0:ge(e)),new qn(i,t||ca(),r||null,o)}var _t=class e{static{this.THROW_IF_NOT_FOUND=Un}static{this.NULL=new ao}static create(t,n){if(Array.isArray(t))return zu({name:""},n,t,"");{let r=t.name??"";return zu({name:r},t.parent,t.providers,r)}}static{this.\u0275prov=w({token:e,providedIn:"any",factory:()=>M(_l)})}static{this.__NG_ELEMENT_ID__=-1}};var xm=new E("");xm.__NG_ELEMENT_ID__=e=>{let t=le();if(t===null)throw new v(204,!1);if(t.type&2)return t.value;if(e&x.Optional)return null;throw new v(204,!1)};var Mm="ngOriginalError";function es(e){return e[Mm]}var _d=!0,Nd=(()=>{class e{static{this.__NG_ELEMENT_ID__=Tm}static{this.__NG_ENV_ID__=n=>n}}return e})(),ys=class extends Nd{constructor(t){super(),this._lView=t}onDestroy(t){return td(this._lView,t),()=>Zg(this._lView,t)}};function Tm(){return new ys(j())}var Dn=(()=>{class e{constructor(){this.taskId=0,this.pendingTasks=new Set,this.hasPendingTasks=new K(!1)}get _hasPendingTasks(){return this.hasPendingTasks.value}add(){this._hasPendingTasks||this.hasPendingTasks.next(!0);let n=this.taskId++;return this.pendingTasks.add(n),n}remove(n){this.pendingTasks.delete(n),this.pendingTasks.size===0&&this._hasPendingTasks&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this._hasPendingTasks&&this.hasPendingTasks.next(!1)}static{this.\u0275prov=w({token:e,providedIn:"root",factory:()=>new e})}}return e})();var Ds=class extends te{constructor(t=!1){super(),this.destroyRef=void 0,this.pendingTasks=void 0,this.__isAsync=t,jg()&&(this.destroyRef=p(Nd,{optional:!0})??void 0,this.pendingTasks=p(Dn,{optional:!0})??void 0)}emit(t){let n=R(null);try{super.next(t)}finally{R(n)}}subscribe(t,n,r){let o=t,i=n||(()=>null),s=r;if(t&&typeof t=="object"){let c=t;o=c.next?.bind(c),i=c.error?.bind(c),s=c.complete?.bind(c)}this.__isAsync&&(i=this.wrapInTimeout(i),o&&(o=this.wrapInTimeout(o)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:o,error:i,complete:s});return t instanceof U&&t.add(a),a}wrapInTimeout(t){return n=>{let r=this.pendingTasks?.add();setTimeout(()=>{t(n),r!==void 0&&this.pendingTasks?.remove(r)})}}},X=Ds;function vo(...e){}function Ad(e){let t,n;function r(){e=vo;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{e(),r()}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{e(),r()})),()=>r()}function qu(e){return queueMicrotask(()=>e()),()=>{e=vo}}var ba="isAngularZone",yo=ba+"_ID",_m=0,q=class e{constructor(t){this.hasPendingMacrotasks=!1,this.hasPendingMicrotasks=!1,this.isStable=!0,this.onUnstable=new X(!1),this.onMicrotaskEmpty=new X(!1),this.onStable=new X(!1),this.onError=new X(!1);let{enableLongStackTrace:n=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:o=!1,scheduleInRootZone:i=_d}=t;if(typeof Zone>"u")throw new v(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!o&&r,s.shouldCoalesceRunChangeDetection=o,s.callbackScheduled=!1,s.scheduleInRootZone=i,Rm(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(ba)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new v(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new v(909,!1)}run(t,n,r){return this._inner.run(t,n,r)}runTask(t,n,r,o){let i=this._inner,s=i.scheduleEventTask("NgZoneEvent: "+o,t,Nm,vo,vo);try{return i.runTask(s,n,r)}finally{i.cancelTask(s)}}runGuarded(t,n,r){return this._inner.runGuarded(t,n,r)}runOutsideAngular(t){return this._outer.run(t)}},Nm={};function Ia(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function Am(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function t(){Ad(()=>{e.callbackScheduled=!1,ws(e),e.isCheckStableRunning=!0,Ia(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{t()}):e._outer.run(()=>{t()}),ws(e)}function Rm(e){let t=()=>{Am(e)},n=_m++;e._inner=e._inner.fork({name:"angular",properties:{[ba]:!0,[yo]:n,[yo+n]:!0},onInvokeTask:(r,o,i,s,a,c)=>{if(Om(c))return r.invokeTask(i,s,a,c);try{return Gu(e),r.invokeTask(i,s,a,c)}finally{(e.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&t(),Wu(e)}},onInvoke:(r,o,i,s,a,c,u)=>{try{return Gu(e),r.invoke(i,s,a,c,u)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!Pm(c)&&t(),Wu(e)}},onHasTask:(r,o,i,s)=>{r.hasTask(i,s),o===i&&(s.change=="microTask"?(e._hasPendingMicrotasks=s.microTask,ws(e),Ia(e)):s.change=="macroTask"&&(e.hasPendingMacrotasks=s.macroTask))},onHandleError:(r,o,i,s)=>(r.handleError(i,s),e.runOutsideAngular(()=>e.onError.emit(s)),!1)})}function ws(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function Gu(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function Wu(e){e._nesting--,Ia(e)}var Cs=class{constructor(){this.hasPendingMicrotasks=!1,this.hasPendingMacrotasks=!1,this.isStable=!0,this.onUnstable=new X,this.onMicrotaskEmpty=new X,this.onStable=new X,this.onError=new X}run(t,n,r){return t.apply(n,r)}runGuarded(t,n,r){return t.apply(n,r)}runOutsideAngular(t){return t()}runTask(t,n,r,o){return t.apply(n,r)}};function Om(e){return Rd(e,"__ignore_ng_zone__")}function Pm(e){return Rd(e,"__scheduler_tick__")}function Rd(e,t){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[t]===!0}var Je=class{constructor(){this._console=console}handleError(t){let n=this._findOriginalError(t);this._console.error("ERROR",t),n&&this._console.error("ORIGINAL ERROR",n)}_findOriginalError(t){let n=t&&es(t);for(;n&&es(n);)n=es(n);return n||null}},km=new E("",{providedIn:"root",factory:()=>{let e=p(q),t=p(Je);return n=>e.runOutsideAngular(()=>t.handleError(n))}});function Fm(){return wn(le(),j())}function wn(e,t){return new rt(Ie(e,t))}var rt=(()=>{class e{constructor(n){this.nativeElement=n}static{this.__NG_ELEMENT_ID__=Fm}}return e})();function Lm(e){return e instanceof rt?e.nativeElement:e}function jm(){return this._results[Symbol.iterator]()}var bs=class e{get changes(){return this._changes??=new X}constructor(t=!1){this._emitDistinctChangesOnly=t,this.dirty=!0,this._onDirty=void 0,this._results=[],this._changesDetected=!1,this._changes=void 0,this.length=0,this.first=void 0,this.last=void 0;let n=e.prototype;n[Symbol.iterator]||(n[Symbol.iterator]=jm)}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,n){return this._results.reduce(t,n)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,n){this.dirty=!1;let r=dg(t);(this._changesDetected=!lg(this._results,r,n))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.emit(this)}onDirty(t){this._onDirty=t}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}};function Od(e){return(e.flags&128)===128}var Pd=new Map,Vm=0;function Bm(){return Vm++}function $m(e){Pd.set(e[Ro],e)}function Is(e){Pd.delete(e[Ro])}var Zu="__ngContext__";function Nt(e,t){pt(t)?(e[Zu]=t[Ro],$m(t)):e[Zu]=t}function kd(e){return Ld(e[Gn])}function Fd(e){return Ld(e[Ne])}function Ld(e){for(;e!==null&&!nt(e);)e=e[Ne];return e}var Es;function jd(e){Es=e}function Vd(){if(Es!==void 0)return Es;if(typeof document<"u")return document;throw new v(210,!1)}var Ea=new E("",{providedIn:"root",factory:()=>Hm}),Hm="ng",Sa=new E(""),Cn=new E("",{providedIn:"platform",factory:()=>"unknown"});var xa=new E("",{providedIn:"root",factory:()=>Vd().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var Um="h",zm="b";var qm=()=>null;function Ma(e,t,n=!1){return qm(e,t,n)}var Bd=!1,Gm=new E("",{providedIn:"root",factory:()=>Bd});var Zr;function $d(){if(Zr===void 0&&(Zr=null,Hn.trustedTypes))try{Zr=Hn.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return Zr}function Fo(e){return $d()?.createHTML(e)||e}function Wm(e){return $d()?.createScriptURL(e)||e}var Yr;function Hd(){if(Yr===void 0&&(Yr=null,Hn.trustedTypes))try{Yr=Hn.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return Yr}function Yu(e){return Hd()?.createHTML(e)||e}function Qu(e){return Hd()?.createScriptURL(e)||e}var Xe=class{constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${ml})`}},Ss=class extends Xe{getTypeName(){return"HTML"}},xs=class extends Xe{getTypeName(){return"Style"}},Ms=class extends Xe{getTypeName(){return"Script"}},Ts=class extends Xe{getTypeName(){return"URL"}},_s=class extends Xe{getTypeName(){return"ResourceURL"}};function qe(e){return e instanceof Xe?e.changingThisBreaksApplicationSecurity:e}function ot(e,t){let n=Zm(e);if(n!=null&&n!==t){if(n==="ResourceURL"&&t==="URL")return!0;throw new Error(`Required a safe ${t}, got a ${n} (see ${ml})`)}return n===t}function Zm(e){return e instanceof Xe&&e.getTypeName()||null}function Ud(e){return new Ss(e)}function zd(e){return new xs(e)}function qd(e){return new Ms(e)}function Gd(e){return new Ts(e)}function Wd(e){return new _s(e)}function Ym(e){let t=new As(e);return Qm()?new Ns(t):t}var Ns=class{constructor(t){this.inertDocumentHelper=t}getInertBodyElement(t){t="<body><remove></remove>"+t;try{let n=new window.DOMParser().parseFromString(Fo(t),"text/html").body;return n===null?this.inertDocumentHelper.getInertBodyElement(t):(n.firstChild?.remove(),n)}catch{return null}}},As=class{constructor(t){this.defaultDoc=t,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(t){let n=this.inertDocument.createElement("template");return n.innerHTML=Fo(t),n}};function Qm(){try{return!!new window.DOMParser().parseFromString(Fo(""),"text/html")}catch{return!1}}var Km=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Lo(e){return e=String(e),e.match(Km)?e:"unsafe:"+e}function it(e){let t={};for(let n of e.split(","))t[n]=!0;return t}function er(...e){let t={};for(let n of e)for(let r in n)n.hasOwnProperty(r)&&(t[r]=!0);return t}var Zd=it("area,br,col,hr,img,wbr"),Yd=it("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),Qd=it("rp,rt"),Jm=er(Qd,Yd),Xm=er(Yd,it("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),ev=er(Qd,it("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Ku=er(Zd,Xm,ev,Jm),Kd=it("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),tv=it("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),nv=it("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),rv=er(Kd,tv,nv),ov=it("script,style,template"),Rs=class{constructor(){this.sanitizedSomething=!1,this.buf=[]}sanitizeChildren(t){let n=t.firstChild,r=!0,o=[];for(;n;){if(n.nodeType===Node.ELEMENT_NODE?r=this.startElement(n):n.nodeType===Node.TEXT_NODE?this.chars(n.nodeValue):this.sanitizedSomething=!0,r&&n.firstChild){o.push(n),n=av(n);continue}for(;n;){n.nodeType===Node.ELEMENT_NODE&&this.endElement(n);let i=sv(n);if(i){n=i;break}n=o.pop()}}return this.buf.join("")}startElement(t){let n=Ju(t).toLowerCase();if(!Ku.hasOwnProperty(n))return this.sanitizedSomething=!0,!ov.hasOwnProperty(n);this.buf.push("<"),this.buf.push(n);let r=t.attributes;for(let o=0;o<r.length;o++){let i=r.item(o),s=i.name,a=s.toLowerCase();if(!rv.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let c=i.value;Kd[a]&&(c=Lo(c)),this.buf.push(" ",s,'="',Xu(c),'"')}return this.buf.push(">"),!0}endElement(t){let n=Ju(t).toLowerCase();Ku.hasOwnProperty(n)&&!Zd.hasOwnProperty(n)&&(this.buf.push("</"),this.buf.push(n),this.buf.push(">"))}chars(t){this.buf.push(Xu(t))}};function iv(e,t){return(e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function sv(e){let t=e.nextSibling;if(t&&e!==t.previousSibling)throw Jd(t);return t}function av(e){let t=e.firstChild;if(t&&iv(e,t))throw Jd(t);return t}function Ju(e){let t=e.nodeName;return typeof t=="string"?t:"FORM"}function Jd(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var cv=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,uv=/([^\#-~ |!])/g;function Xu(e){return e.replace(/&/g,"&amp;").replace(cv,function(t){let n=t.charCodeAt(0),r=t.charCodeAt(1);return"&#"+((n-55296)*1024+(r-56320)+65536)+";"}).replace(uv,function(t){return"&#"+t.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Qr;function Ta(e,t){let n=null;try{Qr=Qr||Ym(e);let r=t?String(t):"";n=Qr.getInertBodyElement(r);let o=5,i=r;do{if(o===0)throw new Error("Failed to sanitize html because the input is unstable");o--,r=i,i=n.innerHTML,n=Qr.getInertBodyElement(r)}while(r!==i);let a=new Rs().sanitizeChildren(el(n)||n);return Fo(a)}finally{if(n){let r=el(n)||n;for(;r.firstChild;)r.firstChild.remove()}}}function el(e){return"content"in e&&lv(e)?e.content:null}function lv(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}var Re=function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e}(Re||{});function Ge(e){let t=_a();return t?Yu(t.sanitize(Re.HTML,e)||""):ot(e,"HTML")?Yu(qe(e)):Ta(Vd(),Qn(e))}function dv(e){let t=_a();return t?t.sanitize(Re.URL,e)||"":ot(e,"URL")?qe(e):Lo(Qn(e))}function fv(e){let t=_a();if(t)return Qu(t.sanitize(Re.RESOURCE_URL,e)||"");if(ot(e,"ResourceURL"))return Qu(qe(e));throw new v(904,!1)}function Xd(e){return Wm(e[0])}function hv(e,t){return t==="src"&&(e==="embed"||e==="frame"||e==="iframe"||e==="media"||e==="script")||t==="href"&&(e==="base"||e==="link")?fv:dv}function ef(e,t,n){return hv(t,n)(e)}function _a(){let e=j();return e&&e[$e].sanitizer}function tf(e){return e instanceof Function?e():e}var Rt=function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e}(Rt||{}),pv;function Na(e,t){return pv(e,t)}function on(e,t,n,r,o){if(r!=null){let i,s=!1;nt(r)?i=r:pt(r)&&(s=!0,r=r[tt]);let a=ze(r);e===0&&n!==null?o==null?af(t,n,a):Do(t,n,a,o||null,!0):e===1&&n!==null?Do(t,n,a,o||null,!0):e===2?_v(t,a,s):e===3&&t.destroyNode(a),i!=null&&Av(t,e,i,n,o)}}function gv(e,t){return e.createText(t)}function mv(e,t,n){e.setValue(t,n)}function nf(e,t,n){return e.createElement(t,n)}function vv(e,t){rf(e,t),t[tt]=null,t[Ae]=null}function yv(e,t,n,r,o,i){r[tt]=o,r[Ae]=t,jo(e,r,n,1,o,i)}function rf(e,t){t[$e].changeDetectionScheduler?.notify(9),jo(e,t,t[re],2,null,null)}function Dv(e){let t=e[Gn];if(!t)return ts(e[I],e);for(;t;){let n=null;if(pt(t))n=t[Gn];else{let r=t[me];r&&(n=r)}if(!n){for(;t&&!t[Ne]&&t!==e;)pt(t)&&ts(t[I],t),t=t[ne];t===null&&(t=e),pt(t)&&ts(t[I],t),n=t&&t[Ne]}t=n}}function wv(e,t,n,r){let o=me+r,i=n.length;r>0&&(n[o-1][Ne]=t),r<i-me?(t[Ne]=n[o],Tl(n,me+r,t)):(n.push(t),t[Ne]=null),t[ne]=n;let s=t[St];s!==null&&n!==s&&of(s,t);let a=t[Ke];a!==null&&a.insertView(e),hs(t),t[D]|=128}function of(e,t){let n=e[dn],r=t[ne];if(pt(r))e[D]|=fo.HasTransplantedViews;else{let o=r[ne][He];t[He]!==o&&(e[D]|=fo.HasTransplantedViews)}n===null?e[dn]=[t]:n.push(t)}function Aa(e,t){let n=e[dn],r=n.indexOf(t);n.splice(r,1)}function Os(e,t){if(e.length<=me)return;let n=me+t,r=e[n];if(r){let o=r[St];o!==null&&o!==e&&Aa(o,r),t>0&&(e[n-1][Ne]=r[Ne]);let i=so(e,me+t);vv(r[I],r);let s=i[Ke];s!==null&&s.detachView(i[I]),r[ne]=null,r[Ne]=null,r[D]&=-129}return r}function sf(e,t){if(!(t[D]&256)){let n=t[re];n.destroyNode&&jo(e,t,n,3,null,null),Dv(t)}}function ts(e,t){if(t[D]&256)return;let n=R(null);try{t[D]&=-129,t[D]|=256,t[Ce]&&Ni(t[Ce]),bv(e,t),Cv(e,t),t[I].type===1&&t[re].destroy();let r=t[St];if(r!==null&&nt(t[ne])){r!==t[ne]&&Aa(r,t);let o=t[Ke];o!==null&&o.detachView(e)}Is(t)}finally{R(n)}}function Cv(e,t){let n=e.cleanup,r=t[uo];if(n!==null)for(let i=0;i<n.length-1;i+=2)if(typeof n[i]=="string"){let s=n[i+3];s>=0?r[s]():r[-s].unsubscribe(),i+=2}else{let s=r[n[i+1]];n[i].call(s)}r!==null&&(t[uo]=null);let o=t[ht];if(o!==null){t[ht]=null;for(let i=0;i<o.length;i++){let s=o[i];s()}}}function bv(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let r=0;r<n.length;r+=2){let o=t[n[r]];if(!(o instanceof Wn)){let i=n[r+1];if(Array.isArray(i))for(let s=0;s<i.length;s+=2){let a=o[i[s]],c=i[s+1];je(4,a,c);try{c.call(a)}finally{je(5,a,c)}}else{je(4,o,i);try{i.call(o)}finally{je(5,o,i)}}}}}function Iv(e,t,n){return Ev(e,t.parent,n)}function Ev(e,t,n){let r=t;for(;r!==null&&r.type&168;)t=r,r=t.parent;if(r===null)return n[tt];{let{componentOffset:o}=r;if(o>-1){let{encapsulation:i}=e.data[r.directiveStart+o];if(i===Be.None||i===Be.Emulated)return null}return Ie(r,n)}}function Do(e,t,n,r,o){e.insertBefore(t,n,r,o)}function af(e,t,n){e.appendChild(t,n)}function tl(e,t,n,r,o){r!==null?Do(e,t,n,r,o):af(e,t,n)}function cf(e,t){return e.parentNode(t)}function Sv(e,t){return e.nextSibling(t)}function xv(e,t,n){return Tv(e,t,n)}function Mv(e,t,n){return e.type&40?Ie(e,n):null}var Tv=Mv,nl;function Ra(e,t,n,r){let o=Iv(e,r,t),i=t[re],s=r.parent||t[Ae],a=xv(s,r,t);if(o!=null)if(Array.isArray(n))for(let c=0;c<n.length;c++)tl(i,o,n[c],a,!1);else tl(i,o,n,a,!1);nl!==void 0&&nl(i,r,t,n,o)}function Vn(e,t){if(t!==null){let n=t.type;if(n&3)return Ie(t,e);if(n&4)return Ps(-1,e[t.index]);if(n&8){let r=t.child;if(r!==null)return Vn(e,r);{let o=e[t.index];return nt(o)?Ps(-1,o):ze(o)}}else{if(n&128)return Vn(e,t.next);if(n&32)return Na(t,e)()||ze(e[t.index]);{let r=uf(e,t);if(r!==null){if(Array.isArray(r))return r[0];let o=Mt(e[He]);return Vn(o,r)}else return Vn(e,t.next)}}}return null}function uf(e,t){if(t!==null){let r=e[He][Ae],o=t.projection;return r.projection[o]}return null}function Ps(e,t){let n=me+e+1;if(n<t.length){let r=t[n],o=r[I].firstChild;if(o!==null)return Vn(r,o)}return t[xt]}function _v(e,t,n){e.removeChild(null,t,n)}function Oa(e,t,n,r,o,i,s){for(;n!=null;){if(n.type===128){n=n.next;continue}let a=r[n.index],c=n.type;if(s&&t===0&&(a&&Nt(ze(a),r),n.flags|=2),(n.flags&32)!==32)if(c&8)Oa(e,t,n.child,r,o,i,!1),on(t,e,o,a,i);else if(c&32){let u=Na(n,r),l;for(;l=u();)on(t,e,o,l,i);on(t,e,o,a,i)}else c&16?Nv(e,t,r,n,o,i):on(t,e,o,a,i);n=s?n.projectionNext:n.next}}function jo(e,t,n,r,o,i){Oa(n,r,e.firstChild,t,o,i,!1)}function Nv(e,t,n,r,o,i){let s=n[He],c=s[Ae].projection[r.projection];if(Array.isArray(c))for(let u=0;u<c.length;u++){let l=c[u];on(t,e,o,l,i)}else{let u=c,l=s[ne];Od(r)&&(u.flags|=128),Oa(e,t,u,l,o,i,!0)}}function Av(e,t,n,r,o){let i=n[xt],s=ze(n);i!==s&&on(t,e,r,i,o);for(let a=me;a<n.length;a++){let c=n[a];jo(c[I],c,e,t,r,i)}}function Rv(e,t,n){e.setAttribute(t,"style",n)}function lf(e,t,n){n===""?e.removeAttribute(t,"class"):e.setAttribute(t,"class",n)}function df(e,t,n){let{mergedAttrs:r,classes:o,styles:i}=n;r!==null&&ss(e,t,r),o!==null&&lf(e,t,o),i!==null&&Rv(e,t,i)}var tr={};function nr(e=1){ff(Ee(),j(),ga()+e,!1)}function ff(e,t,n,r){if(!r)if((t[D]&3)===3){let i=e.preOrderCheckHooks;i!==null&&Xr(t,i,n)}else{let i=e.preOrderHooks;i!==null&&eo(t,i,0,n)}Tt(n)}function O(e,t=x.Default){let n=j();if(n===null)return M(e,t);let r=le();return Sd(r,n,we(e),t)}function hf(e,t,n,r,o,i){let s=R(null);try{let a=null;o&gt.SignalBased&&(a=t[r][Qc]),a!==null&&a.transformFn!==void 0&&(i=a.transformFn(i)),o&gt.HasDecoratorInputTransform&&(i=e.inputTransforms[r].call(t,i)),e.setInput!==null?e.setInput(t,a,i,n,r):Wl(t,a,r,i)}finally{R(s)}}function Ov(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let r=0;r<n.length;r++){let o=n[r];if(o<0)Tt(~o);else{let i=o,s=n[++r],a=n[++r];sm(s,i);let c=t[i];a(2,c)}}}finally{Tt(-1)}}function Vo(e,t,n,r,o,i,s,a,c,u,l){let d=t.blueprint.slice();return d[tt]=o,d[D]=r|4|128|8|64,(u!==null||e&&e[D]&2048)&&(d[D]|=2048),Xl(d),d[ne]=d[Kn]=e,d[Qe]=n,d[$e]=s||e&&e[$e],d[re]=a||e&&e[re],d[ln]=c||e&&e[ln]||null,d[Ae]=i,d[Ro]=Bm(),d[co]=l,d[zl]=u,d[He]=t.type==2?e[He]:d,d}function Bo(e,t,n,r,o){let i=e.data[t];if(i===null)i=Pv(e,t,n,r,o),im()&&(i.flags|=32);else if(i.type&64){i.type=n,i.value=r,i.attrs=o;let s=tm();i.injectorIndex=s===null?-1:s.injectorIndex}return Xn(i,!0),i}function Pv(e,t,n,r,o){let i=od(),s=id(),a=s?i:i&&i.parent,c=e.data[t]=Bv(e,a,n,t,r,o);return e.firstChild===null&&(e.firstChild=c),i!==null&&(s?i.child==null&&c.parent!==null&&(i.child=c):i.next===null&&(i.next=c,c.prev=i)),c}function pf(e,t,n,r){if(n===0)return-1;let o=t.length;for(let i=0;i<n;i++)t.push(r),e.blueprint.push(r),e.data.push(null);return o}function gf(e,t,n,r,o){let i=ga(),s=r&2;try{Tt(-1),s&&t.length>Ue&&ff(e,t,Ue,!1),je(s?2:0,o),n(r,o)}finally{Tt(i),je(s?3:1,o)}}function mf(e,t,n){if(Gl(t)){let r=R(null);try{let o=t.directiveStart,i=t.directiveEnd;for(let s=o;s<i;s++){let a=e.data[s];if(a.contentQueries){let c=n[s];a.contentQueries(1,c,s)}}}finally{R(r)}}}function vf(e,t,n){rd()&&(Wv(e,t,n,Ie(n,t)),(n.flags&64)===64&&bf(e,t,n))}function yf(e,t,n=Ie){let r=t.localNames;if(r!==null){let o=t.index+1;for(let i=0;i<r.length;i+=2){let s=r[i+1],a=s===-1?n(t,e):e[s];e[o++]=a}}}function Df(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=Pa(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function Pa(e,t,n,r,o,i,s,a,c,u,l){let d=Ue+r,h=d+o,f=kv(d,h),g=typeof u=="function"?u():u;return f[I]={type:e,blueprint:f,template:n,queries:null,viewQuery:a,declTNode:t,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof i=="function"?i():i,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:l}}function kv(e,t){let n=[];for(let r=0;r<t;r++)n.push(r<e?null:tr);return n}function Fv(e,t,n,r){let i=r.get(Gm,Bd)||n===Be.ShadowDom,s=e.selectRootElement(t,i);return Lv(s),s}function Lv(e){jv(e)}var jv=()=>null;function Vv(e,t,n,r){let o=Sf(t);o.push(n),e.firstCreatePass&&xf(e).push(r,o.length-1)}function Bv(e,t,n,r,o,i){let s=t?t.injectorIndex:-1,a=0;return Jg()&&(a|=128),{type:n,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:o,attrs:i,mergedAttrs:null,localNames:null,initialInputs:void 0,inputs:null,outputs:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function rl(e,t,n,r,o){for(let i in t){if(!t.hasOwnProperty(i))continue;let s=t[i];if(s===void 0)continue;r??={};let a,c=gt.None;Array.isArray(s)?(a=s[0],c=s[1]):a=s;let u=i;if(o!==null){if(!o.hasOwnProperty(i))continue;u=o[i]}e===0?ol(r,n,u,a,c):ol(r,n,u,a)}return r}function ol(e,t,n,r,o){let i;e.hasOwnProperty(n)?(i=e[n]).push(t,r):i=e[n]=[t,r],o!==void 0&&i.push(o)}function $v(e,t,n){let r=t.directiveStart,o=t.directiveEnd,i=e.data,s=t.attrs,a=[],c=null,u=null;for(let l=r;l<o;l++){let d=i[l],h=n?n.get(d):null,f=h?h.inputs:null,g=h?h.outputs:null;c=rl(0,d.inputs,l,c,f),u=rl(1,d.outputs,l,u,g);let T=c!==null&&s!==null&&!sa(t)?oy(c,l,s):null;a.push(T)}c!==null&&(c.hasOwnProperty("class")&&(t.flags|=8),c.hasOwnProperty("style")&&(t.flags|=16)),t.initialInputs=a,t.inputs=c,t.outputs=u}function Hv(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function Uv(e,t,n,r,o,i,s,a){let c=Ie(t,n),u=t.inputs,l;!a&&u!=null&&(l=u[r])?(ka(e,n,l,r,o),Oo(t)&&zv(n,t.index)):t.type&3?(r=Hv(r),o=s!=null?s(o,t.value||"",r):o,i.setProperty(c,r,o)):t.type&12}function zv(e,t){let n=vt(t,e);n[D]&16||(n[D]|=64)}function wf(e,t,n,r){if(rd()){let o=r===null?null:{"":-1},i=Yv(e,n),s,a;i===null?s=a=null:[s,a]=i,s!==null&&Cf(e,t,n,s,o,a),o&&Qv(n,r,o)}n.mergedAttrs=ia(n.mergedAttrs,n.attrs)}function Cf(e,t,n,r,o,i){for(let u=0;u<r.length;u++)wm(Cd(n,t),e,r[u].type);Jv(n,e.data.length,r.length);for(let u=0;u<r.length;u++){let l=r[u];l.providersResolver&&l.providersResolver(l)}let s=!1,a=!1,c=pf(e,t,r.length,null);for(let u=0;u<r.length;u++){let l=r[u];n.mergedAttrs=ia(n.mergedAttrs,l.hostAttrs),Xv(e,n,t,c,l),Kv(c,l,o),l.contentQueries!==null&&(n.flags|=4),(l.hostBindings!==null||l.hostAttrs!==null||l.hostVars!==0)&&(n.flags|=64);let d=l.type.prototype;!s&&(d.ngOnChanges||d.ngOnInit||d.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),s=!0),!a&&(d.ngOnChanges||d.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),a=!0),c++}$v(e,n,i)}function qv(e,t,n,r,o){let i=o.hostBindings;if(i){let s=e.hostBindingOpCodes;s===null&&(s=e.hostBindingOpCodes=[]);let a=~t.index;Gv(s)!=a&&s.push(a),s.push(n,r,i)}}function Gv(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n=="number"&&n<0)return n}return 0}function Wv(e,t,n,r){let o=n.directiveStart,i=n.directiveEnd;Oo(n)&&ey(t,n,e.data[o+n.componentOffset]),e.firstCreatePass||Cd(n,t),Nt(r,t);let s=n.initialInputs;for(let a=o;a<i;a++){let c=e.data[a],u=fn(t,e,a,n);if(Nt(u,t),s!==null&&ry(t,a-o,u,c,n,s),Jn(c)){let l=vt(n.index,t);l[Qe]=fn(t,e,a,n)}}}function bf(e,t,n){let r=n.directiveStart,o=n.directiveEnd,i=n.index,s=am();try{Tt(i);for(let a=r;a<o;a++){let c=e.data[a],u=t[a];ps(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&Zv(c,u)}}finally{Tt(-1),ps(s)}}function Zv(e,t){e.hostBindings!==null&&e.hostBindings(1,t)}function Yv(e,t){let n=e.directiveRegistry,r=null,o=null;if(n)for(let i=0;i<n.length;i++){let s=n[i];if(yg(t,s.selectors,!1))if(r||(r=[]),Jn(s))if(s.findHostDirectiveDefs!==null){let a=[];o=o||new Map,s.findHostDirectiveDefs(s,a,o),r.unshift(...a,s);let c=a.length;ks(e,t,c)}else r.unshift(s),ks(e,t,0);else o=o||new Map,s.findHostDirectiveDefs?.(s,r,o),r.push(s)}return r===null?null:[r,o]}function ks(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index)}function Qv(e,t,n){if(t){let r=e.localNames=[];for(let o=0;o<t.length;o+=2){let i=n[t[o+1]];if(i==null)throw new v(-301,!1);r.push(t[o],i)}}}function Kv(e,t,n){if(n){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)n[t.exportAs[r]]=e;Jn(t)&&(n[""]=e)}}function Jv(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t}function Xv(e,t,n,r,o){e.data[r]=o;let i=o.factory||(o.factory=It(o.type,!0)),s=new Wn(i,Jn(o),O);e.blueprint[r]=s,n[r]=s,qv(e,t,r,pf(e,n,o.hostVars,tr),o)}function ey(e,t,n){let r=Ie(t,e),o=Df(n),i=e[$e].rendererFactory,s=16;n.signals?s=4096:n.onPush&&(s=64);let a=$o(e,Vo(e,o,null,s,r,t,null,i.createRenderer(r,n),null,null,null));e[t.index]=a}function ty(e,t,n,r,o,i){let s=Ie(e,t);ny(t[re],s,i,e.value,n,r,o)}function ny(e,t,n,r,o,i,s){if(i==null)e.removeAttribute(t,o,n);else{let a=s==null?Qn(i):s(i,r||"",o);e.setAttribute(t,o,a,n)}}function ry(e,t,n,r,o,i){let s=i[t];if(s!==null)for(let a=0;a<s.length;){let c=s[a++],u=s[a++],l=s[a++],d=s[a++];hf(r,n,c,u,l,d)}}function oy(e,t,n){let r=null,o=0;for(;o<n.length;){let i=n[o];if(i===0){o+=4;continue}else if(i===5){o+=2;continue}if(typeof i=="number")break;if(e.hasOwnProperty(i)){r===null&&(r=[]);let s=e[i];for(let a=0;a<s.length;a+=3)if(s[a]===t){r.push(i,s[a+1],s[a+2],n[o+1]);break}}o+=2}return r}function If(e,t,n,r){return[e,!0,0,t,null,r,null,n,null,null]}function Ef(e,t){let n=e.contentQueries;if(n!==null){let r=R(null);try{for(let o=0;o<n.length;o+=2){let i=n[o],s=n[o+1];if(s!==-1){let a=e.data[s];fa(i),a.contentQueries(2,t[s],s)}}}finally{R(r)}}}function $o(e,t){return e[Gn]?e[ju][Ne]=t:e[Gn]=t,e[ju]=t,t}function Fs(e,t,n){fa(0);let r=R(null);try{t(e,n)}finally{R(r)}}function Sf(e){return e[uo]??=[]}function xf(e){return e.cleanup??=[]}function Mf(e,t){let n=e[ln],r=n?n.get(Je,null):null;r&&r.handleError(t)}function ka(e,t,n,r,o){for(let i=0;i<n.length;){let s=n[i++],a=n[i++],c=n[i++],u=t[s],l=e.data[s];hf(l,u,r,a,c,o)}}function iy(e,t,n){let r=zg(t,e);mv(e[re],r,n)}function sy(e,t){let n=vt(t,e),r=n[I];ay(r,n);let o=n[tt];o!==null&&n[co]===null&&(n[co]=Ma(o,n[ln])),Fa(r,n,n[Qe])}function ay(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n])}function Fa(e,t,n){ha(t);try{let r=e.viewQuery;r!==null&&Fs(1,r,n);let o=e.template;o!==null&&gf(e,t,o,1,n),e.firstCreatePass&&(e.firstCreatePass=!1),t[Ke]?.finishViewCreation(e),e.staticContentQueries&&Ef(e,t),e.staticViewQueries&&Fs(2,e.viewQuery,n);let i=e.components;i!==null&&cy(t,i)}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),r}finally{t[D]&=-5,pa()}}function cy(e,t){for(let n=0;n<t.length;n++)sy(e,t[n])}function uy(e,t,n,r){let o=R(null);try{let i=t.tView,a=e[D]&4096?4096:16,c=Vo(e,i,n,a,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),u=e[t.index];c[St]=u;let l=e[Ke];return l!==null&&(c[Ke]=l.createEmbeddedView(i)),Fa(i,c,n),c}finally{R(o)}}function il(e,t){return!t||t.firstChild===null||Od(e)}function ly(e,t,n,r=!0){let o=t[I];if(wv(o,t,e,n),r){let s=Ps(n,e),a=t[re],c=cf(a,e[xt]);c!==null&&yv(o,e[Ae],a,t,c,s)}let i=t[co];i!==null&&i.firstChild!==null&&(i.firstChild=null)}function wo(e,t,n,r,o=!1){for(;n!==null;){if(n.type===128){n=o?n.projectionNext:n.next;continue}let i=t[n.index];i!==null&&r.push(ze(i)),nt(i)&&dy(i,r);let s=n.type;if(s&8)wo(e,t,n.child,r);else if(s&32){let a=Na(n,t),c;for(;c=a();)r.push(c)}else if(s&16){let a=uf(t,n);if(Array.isArray(a))r.push(...a);else{let c=Mt(t[He]);wo(c[I],c,a,r,!0)}}n=o?n.projectionNext:n.next}return r}function dy(e,t){for(let n=me;n<e.length;n++){let r=e[n],o=r[I].firstChild;o!==null&&wo(r[I],r,o,t)}e[xt]!==e[tt]&&t.push(e[xt])}var Tf=[];function fy(e){return e[Ce]??hy(e)}function hy(e){let t=Tf.pop()??Object.create(gy);return t.lView=e,t}function py(e){e.lView[Ce]!==e&&(e.lView=null,Tf.push(e))}var gy=$(m({},Mi),{consumerIsAlwaysLive:!0,consumerMarkedDirty:e=>{ko(e.lView)},consumerOnSignalRead(){this.lView[Ce]=this}});function my(e){let t=e[Ce]??Object.create(vy);return t.lView=e,t}var vy=$(m({},Mi),{consumerIsAlwaysLive:!0,consumerMarkedDirty:e=>{let t=Mt(e.lView);for(;t&&!_f(t[I]);)t=Mt(t);t&&ed(t)},consumerOnSignalRead(){this.lView[Ce]=this}});function _f(e){return e.type!==2}var yy=100;function Nf(e,t=!0,n=0){let r=e[$e],o=r.rendererFactory,i=!1;i||o.begin?.();try{Dy(e,n)}catch(s){throw t&&Mf(e,s),s}finally{i||(o.end?.(),r.inlineEffectRunner?.flush())}}function Dy(e,t){let n=sd();try{Bu(!0),Ls(e,t);let r=0;for(;Po(e);){if(r===yy)throw new v(103,!1);r++,Ls(e,1)}}finally{Bu(n)}}function wy(e,t,n,r){let o=t[D];if((o&256)===256)return;let i=!1,s=!1;!i&&t[$e].inlineEffectRunner?.flush(),ha(t);let a=!0,c=null,u=null;i||(_f(e)?(u=fy(t),c=Ti(u)):Kc()===null?(a=!1,u=my(t),c=Ti(u)):t[Ce]&&(Ni(t[Ce]),t[Ce]=null));try{Xl(t),om(e.bindingStartIndex),n!==null&&gf(e,t,n,2,r);let l=(o&3)===3;if(!i)if(l){let f=e.preOrderCheckHooks;f!==null&&Xr(t,f,null)}else{let f=e.preOrderHooks;f!==null&&eo(t,f,0,null),Ki(t,0)}if(s||Cy(t),Af(t,0),e.contentQueries!==null&&Ef(e,t),!i)if(l){let f=e.contentCheckHooks;f!==null&&Xr(t,f)}else{let f=e.contentHooks;f!==null&&eo(t,f,1),Ki(t,1)}Ov(e,t);let d=e.components;d!==null&&Of(t,d,0);let h=e.viewQuery;if(h!==null&&Fs(2,h,r),!i)if(l){let f=e.viewCheckHooks;f!==null&&Xr(t,f)}else{let f=e.viewHooks;f!==null&&eo(t,f,2),Ki(t,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[Qi]){for(let f of t[Qi])f();t[Qi]=null}i||(t[D]&=-73)}catch(l){throw i||ko(t),l}finally{u!==null&&(Jc(u,c),a&&py(u)),pa()}}function Af(e,t){for(let n=kd(e);n!==null;n=Fd(n))for(let r=me;r<n.length;r++){let o=n[r];Rf(o,t)}}function Cy(e){for(let t=kd(e);t!==null;t=Fd(t)){if(!(t[D]&fo.HasTransplantedViews))continue;let n=t[dn];for(let r=0;r<n.length;r++){let o=n[r];ed(o)}}}function by(e,t,n){let r=vt(t,e);Rf(r,n)}function Rf(e,t){la(e)&&Ls(e,t)}function Ls(e,t){let r=e[I],o=e[D],i=e[Ce],s=!!(t===0&&o&16);if(s||=!!(o&64&&t===0),s||=!!(o&1024),s||=!!(i?.dirty&&_i(i)),s||=!1,i&&(i.dirty=!1),e[D]&=-9217,s)wy(r,e,r.template,e[Qe]);else if(o&8192){Af(e,1);let a=r.components;a!==null&&Of(e,a,1)}}function Of(e,t,n){for(let r=0;r<t.length;r++)by(e,t[r],n)}function La(e,t){let n=sd()?64:1088;for(e[$e].changeDetectionScheduler?.notify(t);e;){e[D]|=n;let r=Mt(e);if(ds(e)&&!r)return e;e=r}return null}var At=class{get rootNodes(){let t=this._lView,n=t[I];return wo(n,t,n.firstChild,[])}constructor(t,n,r=!0){this._lView=t,this._cdRefInjectingView=n,this.notifyErrorHandler=r,this._appRef=null,this._attachedToViewContainer=!1}get context(){return this._lView[Qe]}set context(t){this._lView[Qe]=t}get destroyed(){return(this._lView[D]&256)===256}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[ne];if(nt(t)){let n=t[lo],r=n?n.indexOf(this):-1;r>-1&&(Os(t,r),so(n,r))}this._attachedToViewContainer=!1}sf(this._lView[I],this._lView)}onDestroy(t){td(this._lView,t)}markForCheck(){La(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[D]&=-129}reattach(){hs(this._lView),this._lView[D]|=128}detectChanges(){this._lView[D]|=1024,Nf(this._lView,this.notifyErrorHandler)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new v(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let t=ds(this._lView),n=this._lView[St];n!==null&&!t&&Aa(n,this._lView),rf(this._lView[I],this._lView)}attachToAppRef(t){if(this._attachedToViewContainer)throw new v(902,!1);this._appRef=t;let n=ds(this._lView),r=this._lView[St];r!==null&&!n&&of(r,this._lView),hs(this._lView)}},hn=(()=>{class e{static{this.__NG_ELEMENT_ID__=Sy}}return e})(),Iy=hn,Ey=class extends Iy{constructor(t,n,r){super(),this._declarationLView=t,this._declarationTContainer=n,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,n){return this.createEmbeddedViewImpl(t,n)}createEmbeddedViewImpl(t,n,r){let o=uy(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:n,dehydratedView:r});return new At(o)}};function Sy(){return ja(le(),j())}function ja(e,t){return e.type&4?new Ey(t,e,wn(e,t)):null}var rM=new RegExp(`^(\\d+)*(${zm}|${Um})*(.*)`);var xy=()=>null;function sl(e,t){return xy(e,t)}var pn=class{},Ho=new E("",{providedIn:"root",factory:()=>!1});var Pf=new E(""),kf=new E(""),js=class{},Co=class{};function My(e){let t=Error(`No component factory found for ${ge(e)}.`);return t[Ty]=e,t}var Ty="ngComponent";var Vs=class{resolveComponentFactory(t){throw My(t)}},gn=class{static{this.NULL=new Vs}},mn=class{},rr=(()=>{class e{constructor(){this.destroyNode=null}static{this.__NG_ELEMENT_ID__=()=>_y()}}return e})();function _y(){let e=j(),t=le(),n=vt(t.index,e);return(pt(n)?n:e)[re]}var Ny=(()=>{class e{static{this.\u0275prov=w({token:e,providedIn:"root",factory:()=>null})}}return e})();function Bs(e,t,n){let r=n?e.styles:null,o=n?e.classes:null,i=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")i=a;else if(i==1)o=Tu(o,a);else if(i==2){let c=a,u=t[++s];r=Tu(r,c+": "+u+";")}}n?e.styles=r:e.stylesWithoutHost=r,n?e.classes=o:e.classesWithoutHost=o}var bo=class extends gn{constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){let n=Et(t);return new Zn(n,this.ngModule)}};function al(e,t){let n=[];for(let r in e){if(!e.hasOwnProperty(r))continue;let o=e[r];if(o===void 0)continue;let i=Array.isArray(o),s=i?o[0]:o,a=i?o[1]:gt.None;t?n.push({propName:s,templateName:r,isSignal:(a&gt.SignalBased)!==0}):n.push({propName:s,templateName:r})}return n}function Ay(e){let t=e.toLowerCase();return t==="svg"?Kl:t==="math"?Ug:null}var Zn=class extends Co{get inputs(){let t=this.componentDef,n=t.inputTransforms,r=al(t.inputs,!0);if(n!==null)for(let o of r)n.hasOwnProperty(o.propName)&&(o.transform=n[o.propName]);return r}get outputs(){return al(this.componentDef.outputs,!1)}constructor(t,n){super(),this.componentDef=t,this.ngModule=n,this.componentType=t.type,this.selector=bg(t.selectors),this.ngContentSelectors=t.ngContentSelectors?t.ngContentSelectors:[],this.isBoundToModule=!!n}create(t,n,r,o){let i=R(null);try{o=o||this.ngModule;let s=o instanceof be?o:o?.injector;s&&this.componentDef.getStandaloneInjector!==null&&(s=this.componentDef.getStandaloneInjector(s)||s);let a=s?new gs(t,s):t,c=a.get(mn,null);if(c===null)throw new v(407,!1);let u=a.get(Ny,null),l=a.get(pn,null),d={rendererFactory:c,sanitizer:u,inlineEffectRunner:null,changeDetectionScheduler:l},h=c.createRenderer(null,this.componentDef),f=this.componentDef.selectors[0][0]||"div",g=r?Fv(h,r,this.componentDef.encapsulation,a):nf(h,f,Ay(f)),T=512;this.componentDef.signals?T|=4096:this.componentDef.onPush||(T|=16);let L=null;g!==null&&(L=Ma(g,a,!0));let B=Pa(0,null,null,1,0,null,null,null,null,null,null),oe=Vo(null,B,null,T,null,null,d,h,a,null,L);ha(oe);let ie,Me,Ht=null;try{let fe=this.componentDef,Ut,Ei=null;fe.findHostDirectiveDefs?(Ut=[],Ei=new Map,fe.findHostDirectiveDefs(fe,Ut,Ei),Ut.push(fe)):Ut=[fe];let hp=Ry(oe,g);Ht=Oy(hp,g,fe,Ut,oe,d,h),Me=Jl(B,Ue),g&&Fy(h,fe,g,r),n!==void 0&&Ly(Me,this.ngContentSelectors,n),ie=ky(Ht,fe,Ut,Ei,oe,[jy]),Fa(B,oe,null)}catch(fe){throw Ht!==null&&Is(Ht),Is(oe),fe}finally{pa()}return new $s(this.componentType,ie,wn(Me,oe),oe,Me)}finally{R(i)}}},$s=class extends js{constructor(t,n,r,o,i){super(),this.location=r,this._rootLView=o,this._tNode=i,this.previousInputValues=null,this.instance=n,this.hostView=this.changeDetectorRef=new At(o,void 0,!1),this.componentType=t}setInput(t,n){let r=this._tNode.inputs,o;if(r!==null&&(o=r[t])){if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),n))return;let i=this._rootLView;ka(i[I],i,o,t,n),this.previousInputValues.set(t,n);let s=vt(this._tNode.index,i);La(s,1)}}get injector(){return new bt(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}};function Ry(e,t){let n=e[I],r=Ue;return e[r]=t,Bo(n,r,2,"#host",null)}function Oy(e,t,n,r,o,i,s){let a=o[I];Py(r,e,t,s);let c=null;t!==null&&(c=Ma(t,o[ln]));let u=i.rendererFactory.createRenderer(t,n),l=16;n.signals?l=4096:n.onPush&&(l=64);let d=Vo(o,Df(n),null,l,o[e.index],e,i,u,null,null,c);return a.firstCreatePass&&ks(a,e,r.length-1),$o(o,d),o[e.index]=d}function Py(e,t,n,r){for(let o of e)t.mergedAttrs=ia(t.mergedAttrs,o.hostAttrs);t.mergedAttrs!==null&&(Bs(t,t.mergedAttrs,!0),n!==null&&df(r,n,t))}function ky(e,t,n,r,o,i){let s=le(),a=o[I],c=Ie(s,o);Cf(a,o,s,n,null,r);for(let l=0;l<n.length;l++){let d=s.directiveStart+l,h=fn(o,a,d,s);Nt(h,o)}bf(a,o,s),c&&Nt(c,o);let u=fn(o,a,s.directiveStart+s.componentOffset,s);if(e[Qe]=o[Qe]=u,i!==null)for(let l of i)l(u,t);return mf(a,s,o),u}function Fy(e,t,n,r){if(r)ss(e,n,["ng-version","18.2.13"]);else{let{attrs:o,classes:i}=Ig(t.selectors[0]);o&&ss(e,n,o),i&&i.length>0&&lf(e,n,i.join(" "))}}function Ly(e,t,n){let r=e.projection=[];for(let o=0;o<t.length;o++){let i=n[o];r.push(i!=null?Array.from(i):null)}}function jy(){let e=le();ya(j()[I],e)}var Ot=(()=>{class e{static{this.__NG_ELEMENT_ID__=Vy}}return e})();function Vy(){let e=le();return Lf(e,j())}var By=Ot,Ff=class extends By{constructor(t,n,r){super(),this._lContainer=t,this._hostTNode=n,this._hostLView=r}get element(){return wn(this._hostTNode,this._hostLView)}get injector(){return new bt(this._hostTNode,this._hostLView)}get parentInjector(){let t=Da(this._hostTNode,this._hostLView);if(yd(t)){let n=go(t,this._hostLView),r=po(t),o=n[I].data[r+8];return new bt(o,n)}else return new bt(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){let n=cl(this._lContainer);return n!==null&&n[t]||null}get length(){return this._lContainer.length-me}createEmbeddedView(t,n,r){let o,i;typeof r=="number"?o=r:r!=null&&(o=r.index,i=r.injector);let s=sl(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(n||{},i,s);return this.insertImpl(a,o,il(this._hostTNode,s)),a}createComponent(t,n,r,o,i){let s=t&&!Vg(t),a;if(s)a=n;else{let g=n||{};a=g.index,r=g.injector,o=g.projectableNodes,i=g.environmentInjector||g.ngModuleRef}let c=s?t:new Zn(Et(t)),u=r||this.parentInjector;if(!i&&c.ngModule==null){let T=(s?u:this.parentInjector).get(be,null);T&&(i=T)}let l=Et(c.componentType??{}),d=sl(this._lContainer,l?.id??null),h=d?.firstChild??null,f=c.create(u,o,h,i);return this.insertImpl(f.hostView,a,il(this._hostTNode,d)),f}insert(t,n){return this.insertImpl(t,n,!0)}insertImpl(t,n,r){let o=t._lView;if(Wg(o)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else{let c=o[ne],u=new Ff(c,c[Ae],c[ne]);u.detach(u.indexOf(t))}}let i=this._adjustIndex(n),s=this._lContainer;return ly(s,o,i,r),t.attachToViewContainerRef(),Tl(ns(s),i,t),t}move(t,n){return this.insert(t,n)}indexOf(t){let n=cl(this._lContainer);return n!==null?n.indexOf(t):-1}remove(t){let n=this._adjustIndex(t,-1),r=Os(this._lContainer,n);r&&(so(ns(this._lContainer),n),sf(r[I],r))}detach(t){let n=this._adjustIndex(t,-1),r=Os(this._lContainer,n);return r&&so(ns(this._lContainer),n)!=null?new At(r):null}_adjustIndex(t,n=0){return t??this.length+n}};function cl(e){return e[lo]}function ns(e){return e[lo]||(e[lo]=[])}function Lf(e,t){let n,r=t[e.index];return nt(r)?n=r:(n=If(r,t,null,e),t[e.index]=n,$o(t,n)),Hy(n,t,e,r),new Ff(n,e,t)}function $y(e,t){let n=e[re],r=n.createComment(""),o=Ie(t,e),i=cf(n,o);return Do(n,i,r,Sv(n,o),!1),r}var Hy=qy,Uy=()=>!1;function zy(e,t,n){return Uy(e,t,n)}function qy(e,t,n,r){if(e[xt])return;let o;n.type&8?o=ze(r):o=$y(t,n),e[xt]=o}var Hs=class e{constructor(t){this.queryList=t,this.matches=null}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},Us=class e{constructor(t=[]){this.queries=t}createEmbeddedView(t){let n=t.queries;if(n!==null){let r=t.contentQueries!==null?t.contentQueries[0]:n.length,o=[];for(let i=0;i<r;i++){let s=n.getByIndex(i),a=this.queries[s.indexInDeclarationView];o.push(a.clone())}return new e(o)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}finishViewCreation(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let n=0;n<this.queries.length;n++)Va(t,n).matches!==null&&this.queries[n].setDirty()}},Io=class{constructor(t,n,r=null){this.flags=n,this.read=r,typeof t=="string"?this.predicate=Xy(t):this.predicate=t}},zs=class e{constructor(t=[]){this.queries=t}elementStart(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(t,n)}elementEnd(t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(t)}embeddedTView(t){let n=null;for(let r=0;r<this.length;r++){let o=n!==null?n.length:0,i=this.getByIndex(r).embeddedTView(t,o);i&&(i.indexInDeclarationView=r,n!==null?n.push(i):n=[i])}return n!==null?new e(n):null}template(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].template(t,n)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}},qs=class e{constructor(t,n=-1){this.metadata=t,this.matches=null,this.indexInDeclarationView=-1,this.crossesNgTemplate=!1,this._appliesToNextNode=!0,this._declarationNodeIndex=n}elementStart(t,n){this.isApplyingToNode(n)&&this.matchTNode(t,n)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,n){this.elementStart(t,n)}embeddedTView(t,n){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,n),new e(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,r=t.parent;for(;r!==null&&r.type&8&&r.index!==n;)r=r.parent;return n===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(t,n){let r=this.metadata.predicate;if(Array.isArray(r))for(let o=0;o<r.length;o++){let i=r[o];this.matchTNodeWithReadOption(t,n,Gy(n,i)),this.matchTNodeWithReadOption(t,n,to(n,t,i,!1,!1))}else r===hn?n.type&4&&this.matchTNodeWithReadOption(t,n,-1):this.matchTNodeWithReadOption(t,n,to(n,t,r,!1,!1))}matchTNodeWithReadOption(t,n,r){if(r!==null){let o=this.metadata.read;if(o!==null)if(o===rt||o===Ot||o===hn&&n.type&4)this.addMatch(n.index,-2);else{let i=to(n,t,o,!1,!1);i!==null&&this.addMatch(n.index,i)}else this.addMatch(n.index,r)}}addMatch(t,n){this.matches===null?this.matches=[t,n]:this.matches.push(t,n)}};function Gy(e,t){let n=e.localNames;if(n!==null){for(let r=0;r<n.length;r+=2)if(n[r]===t)return n[r+1]}return null}function Wy(e,t){return e.type&11?wn(e,t):e.type&4?ja(e,t):null}function Zy(e,t,n,r){return n===-1?Wy(t,e):n===-2?Yy(e,t,r):fn(e,e[I],n,t)}function Yy(e,t,n){if(n===rt)return wn(t,e);if(n===hn)return ja(t,e);if(n===Ot)return Lf(t,e)}function jf(e,t,n,r){let o=t[Ke].queries[r];if(o.matches===null){let i=e.data,s=n.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let u=s[c];if(u<0)a.push(null);else{let l=i[u];a.push(Zy(t,l,s[c+1],n.metadata.read))}}o.matches=a}return o.matches}function Gs(e,t,n,r){let o=e.queries.getByIndex(n),i=o.matches;if(i!==null){let s=jf(e,t,o,n);for(let a=0;a<i.length;a+=2){let c=i[a];if(c>0)r.push(s[a/2]);else{let u=i[a+1],l=t[-c];for(let d=me;d<l.length;d++){let h=l[d];h[St]===h[ne]&&Gs(h[I],h,u,r)}if(l[dn]!==null){let d=l[dn];for(let h=0;h<d.length;h++){let f=d[h];Gs(f[I],f,u,r)}}}}}return r}function Qy(e,t){return e[Ke].queries[t].queryList}function Vf(e,t,n){let r=new bs((n&4)===4);return Vv(e,t,r,r.destroy),(t[Ke]??=new Us).queries.push(new Hs(r))-1}function Ky(e,t,n){let r=Ee();return r.firstCreatePass&&(Bf(r,new Io(e,t,n),-1),(t&2)===2&&(r.staticViewQueries=!0)),Vf(r,j(),t)}function Jy(e,t,n,r){let o=Ee();if(o.firstCreatePass){let i=le();Bf(o,new Io(t,n,r),i.index),eD(o,e),(n&2)===2&&(o.staticContentQueries=!0)}return Vf(o,j(),n)}function Xy(e){return e.split(",").map(t=>t.trim())}function Bf(e,t,n){e.queries===null&&(e.queries=new zs),e.queries.track(new qs(t,n))}function eD(e,t){let n=e.contentQueries||(e.contentQueries=[]),r=n.length?n[n.length-1]:-1;t!==r&&n.push(e.queries.length-1,t)}function Va(e,t){return e.queries.getByIndex(t)}function tD(e,t){let n=e[I],r=Va(n,t);return r.crossesNgTemplate?Gs(n,e,t,[]):jf(n,e,r,t)}var ul=new Set;function Ba(e){ul.has(e)||(ul.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}function $a(e){let t=e.inputConfig,n={};for(let r in t)if(t.hasOwnProperty(r)){let o=t[r];Array.isArray(o)&&o[3]&&(n[r]=o[3])}e.inputTransforms=n}var mt=class{},Yn=class{};var Ws=class extends mt{constructor(t,n,r,o=!0){super(),this.ngModuleType=t,this._parent=n,this._bootstrapComponents=[],this.destroyCbs=[],this.componentFactoryResolver=new bo(this);let i=jl(t);this._bootstrapComponents=tf(i.bootstrap),this._r3Injector=Td(t,n,[{provide:mt,useValue:this},{provide:gn,useValue:this.componentFactoryResolver},...r],ge(t),new Set(["environment"])),o&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}},Zs=class extends Yn{constructor(t){super(),this.moduleType=t}create(t){return new Ws(this.moduleType,t,[])}};var Eo=class extends mt{constructor(t){super(),this.componentFactoryResolver=new bo(this),this.instance=null;let n=new qn([...t.providers,{provide:mt,useValue:this},{provide:gn,useValue:this.componentFactoryResolver}],t.parent||ca(),t.debugName,new Set(["environment"]));this.injector=n,t.runEnvironmentInitializers&&n.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(t){this.injector.onDestroy(t)}};function Ha(e,t,n=null){return new Eo({providers:e,parent:t,debugName:n,runEnvironmentInitializers:!0}).injector}function $f(e){return rD(e)?Array.isArray(e)||!(e instanceof Map)&&Symbol.iterator in e:!1}function nD(e,t){if(Array.isArray(e))for(let n=0;n<e.length;n++)t(e[n]);else{let n=e[Symbol.iterator](),r;for(;!(r=n.next()).done;)t(r.value)}}function rD(e){return e!==null&&(typeof e=="function"||typeof e=="object")}function oD(e,t,n){return e[t]=n}function Uo(e,t,n){let r=e[t];return Object.is(r,n)?!1:(e[t]=n,!0)}function iD(e){return(e.flags&32)===32}function sD(e,t,n,r,o,i,s,a,c){let u=t.consts,l=Bo(t,e,4,s||null,a||null);wf(t,n,l,ho(u,c)),ya(t,l);let d=l.tView=Pa(2,l,r,o,i,t.directiveRegistry,t.pipeRegistry,null,t.schemas,u,null);return t.queries!==null&&(t.queries.template(t,l),d.queries=t.queries.embeddedTView(l)),l}function aD(e,t,n,r,o,i,s,a,c,u){let l=n+Ue,d=t.firstCreatePass?sD(l,t,e,r,o,i,s,a,c):t.data[l];Xn(d,!1);let h=cD(t,e,d,n);ma()&&Ra(t,e,h,d),Nt(h,e);let f=If(h,e,h,d);return e[l]=f,$o(e,f),zy(f,d,e),ua(d)&&vf(t,e,d),c!=null&&yf(e,d,u),d}function Ua(e,t,n,r,o,i,s,a){let c=j(),u=Ee(),l=ho(u.consts,i);return aD(c,u,e,t,n,r,o,l,s,a),Ua}var cD=uD;function uD(e,t,n,r){return va(!0),t[re].createComment("")}var Bn=function(e){return e[e.EarlyRead=0]="EarlyRead",e[e.Write=1]="Write",e[e.MixedReadWrite=2]="MixedReadWrite",e[e.Read=3]="Read",e}(Bn||{}),lD=(()=>{class e{constructor(){this.impl=null}execute(){this.impl?.execute()}static{this.\u0275prov=w({token:e,providedIn:"root",factory:()=>new e})}}return e})(),ll=class e{constructor(){this.ngZone=p(q),this.scheduler=p(pn),this.errorHandler=p(Je,{optional:!0}),this.sequences=new Set,this.deferredRegistrations=new Set,this.executing=!1}static{this.PHASES=[Bn.EarlyRead,Bn.Write,Bn.MixedReadWrite,Bn.Read]}execute(){this.executing=!0;for(let t of e.PHASES)for(let n of this.sequences)if(!(n.erroredOrDestroyed||!n.hooks[t]))try{n.pipelinedValue=this.ngZone.runOutsideAngular(()=>n.hooks[t](n.pipelinedValue))}catch(r){n.erroredOrDestroyed=!0,this.errorHandler?.handleError(r)}this.executing=!1;for(let t of this.sequences)t.afterRun(),t.once&&(this.sequences.delete(t),t.destroy());for(let t of this.deferredRegistrations)this.sequences.add(t);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear()}register(t){this.executing?this.deferredRegistrations.add(t):(this.sequences.add(t),this.scheduler.notify(6))}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}static{this.\u0275prov=w({token:e,providedIn:"root",factory:()=>new e})}};function za(e,t,n,r){let o=j(),i=da();if(Uo(o,i,t)){let s=Ee(),a=hd();ty(a,o,e,t,n,r)}return za}function dD(e,t,n,r){return Uo(e,da(),n)?t+Qn(n)+r:tr}function de(e,t,n){let r=j(),o=da();if(Uo(r,o,t)){let i=Ee(),s=hd();Uv(i,s,r,e,t,r[re],n,!1)}return de}function dl(e,t,n,r,o){let i=t.inputs,s=o?"class":"style";ka(e,n,i[s],s,r)}function fD(e,t,n,r,o,i){let s=t.consts,a=ho(s,o),c=Bo(t,e,2,r,a);return wf(t,n,c,ho(s,i)),c.attrs!==null&&Bs(c,c.attrs,!1),c.mergedAttrs!==null&&Bs(c,c.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,c),c}function G(e,t,n,r){let o=j(),i=Ee(),s=Ue+e,a=o[re],c=i.firstCreatePass?fD(s,i,o,t,n,r):i.data[s],u=hD(i,o,c,a,t,e);o[s]=u;let l=ua(c);return Xn(c,!0),df(a,u,c),!iD(c)&&ma()&&Ra(i,o,u,c),Yg()===0&&Nt(u,o),Qg(),l&&(vf(i,o,c),mf(i,c,o)),r!==null&&yf(o,c),G}function H(){let e=le();id()?nm():(e=e.parent,Xn(e,!1));let t=e;Xg(t)&&em(),Kg();let n=Ee();return n.firstCreatePass&&(ya(n,e),Gl(e)&&n.queries.elementEnd(e)),t.classesWithoutHost!=null&&pm(t)&&dl(n,t,j(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&gm(t)&&dl(n,t,j(),t.stylesWithoutHost,!1),H}function V(e,t,n,r){return G(e,t,n,r),H(),V}var hD=(e,t,n,r,o,i)=>(va(!0),nf(r,o,lm()));var So="en-US";var pD=So;function gD(e){typeof e=="string"&&(pD=e.toLowerCase().replace(/_/g,"-"))}var mD=(e,t,n)=>{};function qa(e,t,n,r){let o=j(),i=Ee(),s=le();return yD(i,o,o[re],s,e,t,r),qa}function vD(e,t,n,r){let o=e.cleanup;if(o!=null)for(let i=0;i<o.length-1;i+=2){let s=o[i];if(s===n&&o[i+1]===r){let a=t[uo],c=o[i+2];return a.length>c?a[c]:null}typeof s=="string"&&(i+=2)}return null}function yD(e,t,n,r,o,i,s){let a=ua(r),u=e.firstCreatePass&&xf(e),l=t[Qe],d=Sf(t),h=!0;if(r.type&3||s){let T=Ie(r,t),L=s?s(T):T,B=d.length,oe=s?Me=>s(ze(Me[r.index])):r.index,ie=null;if(!s&&a&&(ie=vD(e,t,o,r.index)),ie!==null){let Me=ie.__ngLastListenerFn__||ie;Me.__ngNextListenerFn__=i,ie.__ngLastListenerFn__=i,h=!1}else{i=hl(r,t,l,i),mD(T,o,i);let Me=n.listen(L,o,i);d.push(i,Me),u&&u.push(o,oe,B,B+1)}}else i=hl(r,t,l,i);let f=r.outputs,g;if(h&&f!==null&&(g=f[o])){let T=g.length;if(T)for(let L=0;L<T;L+=2){let B=g[L],oe=g[L+1],Ht=t[B][oe].subscribe(i),fe=d.length;d.push(i,Ht),u&&u.push(o,r.index,fe,-(fe+1))}}}function fl(e,t,n,r){let o=R(null);try{return je(6,t,n),n(r)!==!1}catch(i){return Mf(e,i),!1}finally{je(7,t,n),R(o)}}function hl(e,t,n,r){return function o(i){if(i===Function)return r;let s=e.componentOffset>-1?vt(e.index,t):t;La(s,5);let a=fl(t,n,r,i),c=o.__ngNextListenerFn__;for(;c;)a=fl(t,n,c,i)&&a,c=c.__ngNextListenerFn__;return a}}function Hf(e,t,n,r){Jy(e,t,n,r)}function Uf(e,t,n){Ky(e,t,n)}function zo(e){let t=j(),n=Ee(),r=ad();fa(r+1);let o=Va(n,r);if(e.dirty&&Gg(t)===((o.metadata.flags&2)===2)){if(o.matches===null)e.reset([]);else{let i=tD(t,r);e.reset(i,Lm),e.notifyOnChanges()}return!0}return!1}function qo(){return Qy(j(),ad())}function DD(e,t,n,r){n>=e.data.length&&(e.data[n]=null,e.blueprint[n]=null),t[n]=r}function Se(e,t=""){let n=j(),r=Ee(),o=e+Ue,i=r.firstCreatePass?Bo(r,o,1,t,null):r.data[o],s=wD(r,n,i,t,e);n[o]=s,ma()&&Ra(r,n,s,i),Xn(i,!1)}var wD=(e,t,n,r,o)=>(va(!0),gv(t[re],r));function Go(e){return zf("",e,""),Go}function zf(e,t,n){let r=j(),o=dD(r,e,t,n);return o!==tr&&iy(r,ga(),o),zf}var CD=(()=>{class e{constructor(n){this._injector=n,this.cachedInjectors=new Map}getOrCreateStandaloneInjector(n){if(!n.standalone)return null;if(!this.cachedInjectors.has(n)){let r=$l(!1,n.type),o=r.length>0?Ha([r],this._injector,`Standalone[${n.type.name}]`):null;this.cachedInjectors.set(n,o)}return this.cachedInjectors.get(n)}ngOnDestroy(){try{for(let n of this.cachedInjectors.values())n!==null&&n.destroy()}finally{this.cachedInjectors.clear()}}static{this.\u0275prov=w({token:e,providedIn:"environment",factory:()=>new e(M(be))})}}return e})();function Q(e){Ba("NgStandalone"),e.getStandaloneInjector=t=>t.get(CD).getOrCreateStandaloneInjector(e)}function bD(e,t){let n=e[t];return n===tr?void 0:n}function ID(e,t,n,r,o,i){let s=t+n;return Uo(e,s,o)?oD(e,s+1,i?r.call(i,o):r(o)):bD(e,s+1)}function qf(e,t){let n=Ee(),r,o=e+Ue;n.firstCreatePass?(r=ED(t,n.pipeRegistry),n.data[o]=r,r.onDestroy&&(n.destroyHooks??=[]).push(o,r.onDestroy)):r=n.data[o];let i=r.factory||(r.factory=It(r.type,!0)),s,a=ue(O);try{let c=mo(!1),u=i();return mo(c),DD(n,j(),o,u),u}finally{ue(a)}}function ED(e,t){if(t)for(let n=t.length-1;n>=0;n--){let r=t[n];if(e===r.name)return r}}function Gf(e,t,n){let r=e+Ue,o=j(),i=qg(o,r);return SD(o,r)?ID(o,rm(),t,i.transform,n,i):i.transform(n)}function SD(e,t){return e[I].data[t].pure}var Wo=(()=>{class e{log(n){console.log(n)}warn(n){console.warn(n)}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"platform"})}}return e})();var Wf=new E("");function bn(e){return!!e&&typeof e.then=="function"}function Ga(e){return!!e&&typeof e.subscribe=="function"}var Zf=new E(""),Yf=(()=>{class e{constructor(){this.initialized=!1,this.done=!1,this.donePromise=new Promise((n,r)=>{this.resolve=n,this.reject=r}),this.appInits=p(Zf,{optional:!0})??[]}runInitializers(){if(this.initialized)return;let n=[];for(let o of this.appInits){let i=o();if(bn(i))n.push(i);else if(Ga(i)){let s=new Promise((a,c)=>{i.subscribe({complete:a,error:c})});n.push(s)}}let r=()=>{this.done=!0,this.resolve()};Promise.all(n).then(()=>{r()}).catch(o=>{this.reject(o)}),n.length===0&&r(),this.initialized=!0}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),Wa=new E("");function xD(){Xc(()=>{throw new v(600,!1)})}function MD(e){return e.isBoundToModule}var TD=10;function _D(e,t,n){try{let r=n();return bn(r)?r.catch(o=>{throw t.runOutsideAngular(()=>e.handleError(o)),o}):r}catch(r){throw t.runOutsideAngular(()=>e.handleError(r)),r}}var Pt=(()=>{class e{constructor(){this._bootstrapListeners=[],this._runningTick=!1,this._destroyed=!1,this._destroyListeners=[],this._views=[],this.internalErrorHandler=p(km),this.afterRenderManager=p(lD),this.zonelessEnabled=p(Ho),this.dirtyFlags=0,this.deferredDirtyFlags=0,this.externalTestViews=new Set,this.beforeRender=new te,this.afterTick=new te,this.componentTypes=[],this.components=[],this.isStable=p(Dn).hasPendingTasks.pipe(S(n=>!n)),this._injector=p(be)}get allViews(){return[...this.externalTestViews.keys(),...this._views]}get destroyed(){return this._destroyed}whenStable(){let n;return new Promise(r=>{n=this.isStable.subscribe({next:o=>{o&&r()}})}).finally(()=>{n.unsubscribe()})}get injector(){return this._injector}bootstrap(n,r){let o=n instanceof Co;if(!this._injector.get(Yf).done){let h=!o&&Ll(n),f=!1;throw new v(405,f)}let s;o?s=n:s=this._injector.get(gn).resolveComponentFactory(n),this.componentTypes.push(s.componentType);let a=MD(s)?void 0:this._injector.get(mt),c=r||s.selector,u=s.create(_t.NULL,[],c,a),l=u.location.nativeElement,d=u.injector.get(Wf,null);return d?.registerApplication(l),u.onDestroy(()=>{this.detachView(u.hostView),no(this.components,u),d?.unregisterApplication(l)}),this._loadComponent(u),u}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){if(this._runningTick)throw new v(101,!1);let n=R(null);try{this._runningTick=!0,this.synchronize()}catch(r){this.internalErrorHandler(r)}finally{this._runningTick=!1,R(n),this.afterTick.next()}}synchronize(){let n=null;this._injector.destroyed||(n=this._injector.get(mn,null,{optional:!0})),this.dirtyFlags|=this.deferredDirtyFlags,this.deferredDirtyFlags=0;let r=0;for(;this.dirtyFlags!==0&&r++<TD;)this.synchronizeOnce(n)}synchronizeOnce(n){if(this.dirtyFlags|=this.deferredDirtyFlags,this.deferredDirtyFlags=0,this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8,this.beforeRender.next(r);for(let{_lView:o,notifyErrorHandler:i}of this._views)ND(o,i,r,this.zonelessEnabled);if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&7)return}else n?.begin?.(),n?.end?.();this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:n})=>Po(n))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(n){let r=n;this._views.push(r),r.attachToAppRef(this)}detachView(n){let r=n;no(this._views,r),r.detachFromAppRef()}_loadComponent(n){this.attachView(n.hostView),this.tick(),this.components.push(n);let r=this._injector.get(Wa,[]);[...this._bootstrapListeners,...r].forEach(o=>o(n))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(n=>n()),this._views.slice().forEach(n=>n.destroy())}finally{this._destroyed=!0,this._views=[],this._bootstrapListeners=[],this._destroyListeners=[]}}onDestroy(n){return this._destroyListeners.push(n),()=>no(this._destroyListeners,n)}destroy(){if(this._destroyed)throw new v(406,!1);let n=this._injector;n.destroy&&!n.destroyed&&n.destroy()}get viewCount(){return this._views.length}warnIfDestroyed(){}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function no(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}function ND(e,t,n,r){if(!n&&!Po(e))return;Nf(e,t,n&&!r?0:1)}var Ys=class{constructor(t,n){this.ngModuleFactory=t,this.componentFactories=n}},Za=(()=>{class e{compileModuleSync(n){return new Zs(n)}compileModuleAsync(n){return Promise.resolve(this.compileModuleSync(n))}compileModuleAndAllComponentsSync(n){let r=this.compileModuleSync(n),o=jl(n),i=tf(o.declarations).reduce((s,a)=>{let c=Et(a);return c&&s.push(new Zn(c)),s},[]);return new Ys(r,i)}compileModuleAndAllComponentsAsync(n){return Promise.resolve(this.compileModuleAndAllComponentsSync(n))}clearCache(){}clearCacheFor(n){}getModuleId(n){}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var AD=(()=>{class e{constructor(){this.zone=p(q),this.changeDetectionScheduler=p(pn),this.applicationRef=p(Pt)}initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),RD=new E("",{factory:()=>!1});function Qf({ngZoneFactory:e,ignoreChangesOutsideZone:t,scheduleInRootZone:n}){return e??=()=>new q($(m({},Jf()),{scheduleInRootZone:n})),[{provide:q,useFactory:e},{provide:un,multi:!0,useFactory:()=>{let r=p(AD,{optional:!0});return()=>r.initialize()}},{provide:un,multi:!0,useFactory:()=>{let r=p(OD);return()=>{r.initialize()}}},t===!0?{provide:Pf,useValue:!0}:[],{provide:kf,useValue:n??_d}]}function Kf(e){let t=e?.ignoreChangesOutsideZone,n=e?.scheduleInRootZone,r=Qf({ngZoneFactory:()=>{let o=Jf(e);return o.scheduleInRootZone=n,o.shouldCoalesceEventChangeDetection&&Ba("NgZone_CoalesceEvent"),new q(o)},ignoreChangesOutsideZone:t,scheduleInRootZone:n});return No([{provide:RD,useValue:!0},{provide:Ho,useValue:!1},r])}function Jf(e){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:e?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:e?.runCoalescing??!1}}var OD=(()=>{class e{constructor(){this.subscription=new U,this.initialized=!1,this.zone=p(q),this.pendingTasks=p(Dn)}initialize(){if(this.initialized)return;this.initialized=!0;let n=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(n=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{q.assertNotInAngularZone(),queueMicrotask(()=>{n!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(n),n=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{q.assertInAngularZone(),n??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var PD=(()=>{class e{constructor(){this.appRef=p(Pt),this.taskService=p(Dn),this.ngZone=p(q),this.zonelessEnabled=p(Ho),this.disableScheduling=p(Pf,{optional:!0})??!1,this.zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run,this.schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}],this.subscriptions=new U,this.angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(yo):null,this.scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(p(kf,{optional:!0})??!1),this.cancelScheduledCallback=null,this.useMicrotaskScheduler=!1,this.runningTick=!1,this.pendingRenderTaskId=null,this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof Cs||!this.zoneIsDefined)}notify(n){if(!this.zonelessEnabled&&n===5)return;switch(n){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 7:{this.appRef.deferredDirtyFlags|=8;break}case 9:case 8:case 6:case 10:default:this.appRef.dirtyFlags|=8}if(!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?qu:Ad;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(){return!(this.disableScheduling||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(yo+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let n=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(r){throw this.taskService.remove(n),r}finally{this.cleanup()}this.useMicrotaskScheduler=!0,qu(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(n)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let n=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(n)}}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function kD(){return typeof $localize<"u"&&$localize.locale||So}var Ya=new E("",{providedIn:"root",factory:()=>p(Ya,x.Optional|x.SkipSelf)||kD()});var Qs=new E("");function Kr(e){return!e.moduleRef}function FD(e){let t=Kr(e)?e.r3Injector:e.moduleRef.injector,n=t.get(q);return n.run(()=>{Kr(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=t.get(Je,null),o;if(n.runOutsideAngular(()=>{o=n.onError.subscribe({next:i=>{r.handleError(i)}})}),Kr(e)){let i=()=>t.destroy(),s=e.platformInjector.get(Qs);s.add(i),t.onDestroy(()=>{o.unsubscribe(),s.delete(i)})}else{let i=()=>e.moduleRef.destroy(),s=e.platformInjector.get(Qs);s.add(i),e.moduleRef.onDestroy(()=>{no(e.allPlatformModules,e.moduleRef),o.unsubscribe(),s.delete(i)})}return _D(r,n,()=>{let i=t.get(Yf);return i.runInitializers(),i.donePromise.then(()=>{let s=t.get(Ya,So);if(gD(s||So),Kr(e)){let a=t.get(Pt);return e.rootComponent!==void 0&&a.bootstrap(e.rootComponent),a}else return LD(e.moduleRef,e.allPlatformModules),e.moduleRef})})})}function LD(e,t){let n=e.injector.get(Pt);if(e._bootstrapComponents.length>0)e._bootstrapComponents.forEach(r=>n.bootstrap(r));else if(e.instance.ngDoBootstrap)e.instance.ngDoBootstrap(n);else throw new v(-403,!1);t.push(e)}var ro=null;function jD(e=[],t){return _t.create({name:t,providers:[{provide:Ao,useValue:"platform"},{provide:Qs,useValue:new Set([()=>ro=null])},...e]})}function VD(e=[]){if(ro)return ro;let t=jD(e);return ro=t,xD(),BD(t),t}function BD(e){e.get(Sa,null)?.forEach(n=>n())}var kt=(()=>{class e{static{this.__NG_ELEMENT_ID__=$D}}return e})();function $D(e){return HD(le(),j(),(e&16)===16)}function HD(e,t,n){if(Oo(e)&&!n){let r=vt(e.index,t);return new At(r,r)}else if(e.type&175){let r=t[He];return new At(r,t)}return null}var Ks=class{constructor(){}supports(t){return $f(t)}create(t){return new Js(t)}},UD=(e,t)=>t,Js=class{constructor(t){this.length=0,this._linkedRecords=null,this._unlinkedRecords=null,this._previousItHead=null,this._itHead=null,this._itTail=null,this._additionsHead=null,this._additionsTail=null,this._movesHead=null,this._movesTail=null,this._removalsHead=null,this._removalsTail=null,this._identityChangesHead=null,this._identityChangesTail=null,this._trackByFn=t||UD}forEachItem(t){let n;for(n=this._itHead;n!==null;n=n._next)t(n)}forEachOperation(t){let n=this._itHead,r=this._removalsHead,o=0,i=null;for(;n||r;){let s=!r||n&&n.currentIndex<pl(r,o,i)?n:r,a=pl(s,o,i),c=s.currentIndex;if(s===r)o--,r=r._nextRemoved;else if(n=n._next,s.previousIndex==null)o++;else{i||(i=[]);let u=a-o,l=c-o;if(u!=l){for(let h=0;h<u;h++){let f=h<i.length?i[h]:i[h]=0,g=f+h;l<=g&&g<u&&(i[h]=f+1)}let d=s.previousIndex;i[d]=l-u}}a!==c&&t(s,a,c)}}forEachPreviousItem(t){let n;for(n=this._previousItHead;n!==null;n=n._nextPrevious)t(n)}forEachAddedItem(t){let n;for(n=this._additionsHead;n!==null;n=n._nextAdded)t(n)}forEachMovedItem(t){let n;for(n=this._movesHead;n!==null;n=n._nextMoved)t(n)}forEachRemovedItem(t){let n;for(n=this._removalsHead;n!==null;n=n._nextRemoved)t(n)}forEachIdentityChange(t){let n;for(n=this._identityChangesHead;n!==null;n=n._nextIdentityChange)t(n)}diff(t){if(t==null&&(t=[]),!$f(t))throw new v(900,!1);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let n=this._itHead,r=!1,o,i,s;if(Array.isArray(t)){this.length=t.length;for(let a=0;a<this.length;a++)i=t[a],s=this._trackByFn(a,i),n===null||!Object.is(n.trackById,s)?(n=this._mismatch(n,i,s,a),r=!0):(r&&(n=this._verifyReinsertion(n,i,s,a)),Object.is(n.item,i)||this._addIdentityChange(n,i)),n=n._next}else o=0,nD(t,a=>{s=this._trackByFn(o,a),n===null||!Object.is(n.trackById,s)?(n=this._mismatch(n,a,s,o),r=!0):(r&&(n=this._verifyReinsertion(n,a,s,o)),Object.is(n.item,a)||this._addIdentityChange(n,a)),n=n._next,o++}),this.length=o;return this._truncate(n),this.collection=t,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let t;for(t=this._previousItHead=this._itHead;t!==null;t=t._next)t._nextPrevious=t._next;for(t=this._additionsHead;t!==null;t=t._nextAdded)t.previousIndex=t.currentIndex;for(this._additionsHead=this._additionsTail=null,t=this._movesHead;t!==null;t=t._nextMoved)t.previousIndex=t.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(t,n,r,o){let i;return t===null?i=this._itTail:(i=t._prev,this._remove(t)),t=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null),t!==null?(Object.is(t.item,n)||this._addIdentityChange(t,n),this._reinsertAfter(t,i,o)):(t=this._linkedRecords===null?null:this._linkedRecords.get(r,o),t!==null?(Object.is(t.item,n)||this._addIdentityChange(t,n),this._moveAfter(t,i,o)):t=this._addAfter(new Xs(n,r),i,o)),t}_verifyReinsertion(t,n,r,o){let i=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null);return i!==null?t=this._reinsertAfter(i,t._prev,o):t.currentIndex!=o&&(t.currentIndex=o,this._addToMoves(t,o)),t}_truncate(t){for(;t!==null;){let n=t._next;this._addToRemovals(this._unlink(t)),t=n}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(t,n,r){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(t);let o=t._prevRemoved,i=t._nextRemoved;return o===null?this._removalsHead=i:o._nextRemoved=i,i===null?this._removalsTail=o:i._prevRemoved=o,this._insertAfter(t,n,r),this._addToMoves(t,r),t}_moveAfter(t,n,r){return this._unlink(t),this._insertAfter(t,n,r),this._addToMoves(t,r),t}_addAfter(t,n,r){return this._insertAfter(t,n,r),this._additionsTail===null?this._additionsTail=this._additionsHead=t:this._additionsTail=this._additionsTail._nextAdded=t,t}_insertAfter(t,n,r){let o=n===null?this._itHead:n._next;return t._next=o,t._prev=n,o===null?this._itTail=t:o._prev=t,n===null?this._itHead=t:n._next=t,this._linkedRecords===null&&(this._linkedRecords=new xo),this._linkedRecords.put(t),t.currentIndex=r,t}_remove(t){return this._addToRemovals(this._unlink(t))}_unlink(t){this._linkedRecords!==null&&this._linkedRecords.remove(t);let n=t._prev,r=t._next;return n===null?this._itHead=r:n._next=r,r===null?this._itTail=n:r._prev=n,t}_addToMoves(t,n){return t.previousIndex===n||(this._movesTail===null?this._movesTail=this._movesHead=t:this._movesTail=this._movesTail._nextMoved=t),t}_addToRemovals(t){return this._unlinkedRecords===null&&(this._unlinkedRecords=new xo),this._unlinkedRecords.put(t),t.currentIndex=null,t._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=t,t._prevRemoved=null):(t._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=t),t}_addIdentityChange(t,n){return t.item=n,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=t:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=t,t}},Xs=class{constructor(t,n){this.item=t,this.trackById=n,this.currentIndex=null,this.previousIndex=null,this._nextPrevious=null,this._prev=null,this._next=null,this._prevDup=null,this._nextDup=null,this._prevRemoved=null,this._nextRemoved=null,this._nextAdded=null,this._nextMoved=null,this._nextIdentityChange=null}},ea=class{constructor(){this._head=null,this._tail=null}add(t){this._head===null?(this._head=this._tail=t,t._nextDup=null,t._prevDup=null):(this._tail._nextDup=t,t._prevDup=this._tail,t._nextDup=null,this._tail=t)}get(t,n){let r;for(r=this._head;r!==null;r=r._nextDup)if((n===null||n<=r.currentIndex)&&Object.is(r.trackById,t))return r;return null}remove(t){let n=t._prevDup,r=t._nextDup;return n===null?this._head=r:n._nextDup=r,r===null?this._tail=n:r._prevDup=n,this._head===null}},xo=class{constructor(){this.map=new Map}put(t){let n=t.trackById,r=this.map.get(n);r||(r=new ea,this.map.set(n,r)),r.add(t)}get(t,n){let r=t,o=this.map.get(r);return o?o.get(t,n):null}remove(t){let n=t.trackById;return this.map.get(n).remove(t)&&this.map.delete(n),t}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function pl(e,t,n){let r=e.previousIndex;if(r===null)return r;let o=0;return n&&r<n.length&&(o=n[r]),r+t+o}function gl(){return new Qa([new Ks])}var Qa=(()=>{class e{static{this.\u0275prov=w({token:e,providedIn:"root",factory:gl})}constructor(n){this.factories=n}static create(n,r){if(r!=null){let o=r.factories.slice();n=n.concat(o)}return new e(n)}static extend(n){return{provide:e,useFactory:r=>e.create(n,r||gl()),deps:[[e,new Ml,new ra]]}}find(n){let r=this.factories.find(o=>o.supports(n));if(r!=null)return r;throw new v(901,!1)}}return e})();function Xf(e){try{let{rootComponent:t,appProviders:n,platformProviders:r}=e,o=VD(r),i=[Qf({}),{provide:pn,useExisting:PD},...n||[]],s=new Eo({providers:i,parent:o,debugName:"",runEnvironmentInitializers:!1});return FD({r3Injector:s.injector,platformInjector:o,rootComponent:t})}catch(t){return Promise.reject(t)}}function or(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function Ka(e){let t=R(null);try{return e()}finally{R(t)}}var sh=null;function In(){return sh}function ah(e){sh??=e}var Zo=class{};var ve=new E(""),ch=(()=>{class e{historyGo(n){throw new Error("")}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p(zD),providedIn:"platform"})}}return e})();var zD=(()=>{class e extends ch{constructor(){super(),this._doc=p(ve),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return In().getBaseHref(this._doc)}onPopState(n){let r=In().getGlobalEventTarget(this._doc,"window");return r.addEventListener("popstate",n,!1),()=>r.removeEventListener("popstate",n)}onHashChange(n){let r=In().getGlobalEventTarget(this._doc,"window");return r.addEventListener("hashchange",n,!1),()=>r.removeEventListener("hashchange",n)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(n){this._location.pathname=n}pushState(n,r,o){this._history.pushState(n,r,o)}replaceState(n,r,o){this._history.replaceState(n,r,o)}forward(){this._history.forward()}back(){this._history.back()}historyGo(n=0){this._history.go(n)}getState(){return this._history.state}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>new e,providedIn:"platform"})}}return e})();function uh(e,t){if(e.length==0)return t;if(t.length==0)return e;let n=0;return e.endsWith("/")&&n++,t.startsWith("/")&&n++,n==2?e+t.substring(1):n==1?e+t:e+"/"+t}function eh(e){let t=e.match(/#|\?|$/),n=t&&t.index||e.length,r=n-(e[n-1]==="/"?1:0);return e.slice(0,r)+e.slice(n)}function Ft(e){return e&&e[0]!=="?"?"?"+e:e}var En=(()=>{class e{historyGo(n){throw new Error("")}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p(lh),providedIn:"root"})}}return e})(),qD=new E(""),lh=(()=>{class e extends En{constructor(n,r){super(),this._platformLocation=n,this._removeListenerFns=[],this._baseHref=r??this._platformLocation.getBaseHrefFromDOM()??p(ve).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}prepareExternalUrl(n){return uh(this._baseHref,n)}path(n=!1){let r=this._platformLocation.pathname+Ft(this._platformLocation.search),o=this._platformLocation.hash;return o&&n?`${r}${o}`:r}pushState(n,r,o,i){let s=this.prepareExternalUrl(o+Ft(i));this._platformLocation.pushState(n,r,s)}replaceState(n,r,o,i){let s=this.prepareExternalUrl(o+Ft(i));this._platformLocation.replaceState(n,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}static{this.\u0275fac=function(r){return new(r||e)(M(ch),M(qD,8))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var ir=(()=>{class e{constructor(n){this._subject=new X,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=n;let r=this._locationStrategy.getBaseHref();this._basePath=ZD(eh(th(r))),this._locationStrategy.onPopState(o=>{this._subject.emit({url:this.path(!0),pop:!0,state:o.state,type:o.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(n=!1){return this.normalize(this._locationStrategy.path(n))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(n,r=""){return this.path()==this.normalize(n+Ft(r))}normalize(n){return e.stripTrailingSlash(WD(this._basePath,th(n)))}prepareExternalUrl(n){return n&&n[0]!=="/"&&(n="/"+n),this._locationStrategy.prepareExternalUrl(n)}go(n,r="",o=null){this._locationStrategy.pushState(o,"",n,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Ft(r)),o)}replaceState(n,r="",o=null){this._locationStrategy.replaceState(o,"",n,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Ft(r)),o)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(n=0){this._locationStrategy.historyGo?.(n)}onUrlChange(n){return this._urlChangeListeners.push(n),this._urlChangeSubscription??=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)}),()=>{let r=this._urlChangeListeners.indexOf(n);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(n="",r){this._urlChangeListeners.forEach(o=>o(n,r))}subscribe(n,r,o){return this._subject.subscribe({next:n,error:r,complete:o})}static{this.normalizeQueryParams=Ft}static{this.joinWithSlash=uh}static{this.stripTrailingSlash=eh}static{this.\u0275fac=function(r){return new(r||e)(M(En))}}static{this.\u0275prov=w({token:e,factory:()=>GD(),providedIn:"root"})}}return e})();function GD(){return new ir(M(En))}function WD(e,t){if(!e||!t.startsWith(e))return t;let n=t.substring(e.length);return n===""||["/",";","?","#"].includes(n[0])?n:t}function th(e){return e.replace(/\/index.html$/,"")}function ZD(e){if(new RegExp("^(https?:)?//").test(e)){let[,n]=e.split(/\/\/[^\/]+/);return n}return e}function dh(e,t){t=encodeURIComponent(t);for(let n of e.split(";")){let r=n.indexOf("="),[o,i]=r==-1?[n,""]:[n.slice(0,r),n.slice(r+1)];if(o.trim()===t)return decodeURIComponent(i)}return null}var Ja=class{constructor(t,n,r,o){this.$implicit=t,this.ngForOf=n,this.index=r,this.count=o}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},fh=(()=>{class e{set ngForOf(n){this._ngForOf=n,this._ngForOfDirty=!0}set ngForTrackBy(n){this._trackByFn=n}get ngForTrackBy(){return this._trackByFn}constructor(n,r,o){this._viewContainer=n,this._template=r,this._differs=o,this._ngForOf=null,this._ngForOfDirty=!0,this._differ=null}set ngForTemplate(n){n&&(this._template=n)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let n=this._ngForOf;if(!this._differ&&n)if(0)try{}catch{}else this._differ=this._differs.find(n).create(this.ngForTrackBy)}if(this._differ){let n=this._differ.diff(this._ngForOf);n&&this._applyChanges(n)}}_applyChanges(n){let r=this._viewContainer;n.forEachOperation((o,i,s)=>{if(o.previousIndex==null)r.createEmbeddedView(this._template,new Ja(o.item,this._ngForOf,-1,-1),s===null?void 0:s);else if(s==null)r.remove(i===null?void 0:i);else if(i!==null){let a=r.get(i);r.move(a,s),nh(a,o)}});for(let o=0,i=r.length;o<i;o++){let a=r.get(o).context;a.index=o,a.count=i,a.ngForOf=this._ngForOf}n.forEachIdentityChange(o=>{let i=r.get(o.currentIndex);nh(i,o)})}static ngTemplateContextGuard(n,r){return!0}static{this.\u0275fac=function(r){return new(r||e)(O(Ot),O(hn),O(Qa))}}static{this.\u0275dir=vn({type:e,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"},standalone:!0})}}return e})();function nh(e,t){e.context.$implicit=t.item}function YD(e,t){return new v(2100,!1)}var Xa=class{createSubscription(t,n){return Ka(()=>t.subscribe({next:n,error:r=>{throw r}}))}dispose(t){Ka(()=>t.unsubscribe())}},ec=class{createSubscription(t,n){return t.then(n,r=>{throw r})}dispose(t){}},QD=new ec,KD=new Xa,hh=(()=>{class e{constructor(n){this._latestValue=null,this.markForCheckOnValueUpdate=!0,this._subscription=null,this._obj=null,this._strategy=null,this._ref=n}ngOnDestroy(){this._subscription&&this._dispose(),this._ref=null}transform(n){if(!this._obj){if(n)try{this.markForCheckOnValueUpdate=!1,this._subscribe(n)}finally{this.markForCheckOnValueUpdate=!0}return this._latestValue}return n!==this._obj?(this._dispose(),this.transform(n)):this._latestValue}_subscribe(n){this._obj=n,this._strategy=this._selectStrategy(n),this._subscription=this._strategy.createSubscription(n,r=>this._updateLatestValue(n,r))}_selectStrategy(n){if(bn(n))return QD;if(Ga(n))return KD;throw YD(e,n)}_dispose(){this._strategy.dispose(this._subscription),this._latestValue=null,this._subscription=null,this._obj=null}_updateLatestValue(n,r){n===this._obj&&(this._latestValue=r,this.markForCheckOnValueUpdate&&this._ref?.markForCheck())}static{this.\u0275fac=function(r){return new(r||e)(O(kt,16))}}static{this.\u0275pipe=Pl({name:"async",type:e,pure:!1,standalone:!0})}}return e})();var ph="browser",JD="server";function tc(e){return e===JD}var Yo=class{};var oc=class extends Zo{constructor(){super(...arguments),this.supportsDOMEvents=!0}},ic=class e extends oc{static makeCurrent(){ah(new e)}onAndCancel(t,n,r){return t.addEventListener(n,r),()=>{t.removeEventListener(n,r)}}dispatchEvent(t,n){t.dispatchEvent(n)}remove(t){t.remove()}createElement(t,n){return n=n||this.getDefaultDocument(),n.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,n){return n==="window"?window:n==="document"?t:n==="body"?t.body:null}getBaseHref(t){let n=ew();return n==null?null:tw(n)}resetBaseElement(){sr=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return dh(document.cookie,t)}},sr=null;function ew(){return sr=sr||document.querySelector("base"),sr?sr.getAttribute("href"):null}function tw(e){return new URL(e,document.baseURI).pathname}var nw=(()=>{class e{build(){return new XMLHttpRequest}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})(),sc=new E(""),yh=(()=>{class e{constructor(n,r){this._zone=r,this._eventNameToPlugin=new Map,n.forEach(o=>{o.manager=this}),this._plugins=n.slice().reverse()}addEventListener(n,r,o){return this._findPluginFor(r).addEventListener(n,r,o)}getZone(){return this._zone}_findPluginFor(n){let r=this._eventNameToPlugin.get(n);if(r)return r;if(r=this._plugins.find(i=>i.supports(n)),!r)throw new v(5101,!1);return this._eventNameToPlugin.set(n,r),r}static{this.\u0275fac=function(r){return new(r||e)(M(sc),M(q))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})(),Qo=class{constructor(t){this._doc=t}},nc="ng-app-id",Dh=(()=>{class e{constructor(n,r,o,i={}){this.doc=n,this.appId=r,this.nonce=o,this.platformId=i,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=tc(i),this.resetHostNodes()}addStyles(n){for(let r of n)this.changeUsageCount(r,1)===1&&this.onStyleAdded(r)}removeStyles(n){for(let r of n)this.changeUsageCount(r,-1)<=0&&this.onStyleRemoved(r)}ngOnDestroy(){let n=this.styleNodesInDOM;n&&(n.forEach(r=>r.remove()),n.clear());for(let r of this.getAllStyles())this.onStyleRemoved(r);this.resetHostNodes()}addHost(n){this.hostNodes.add(n);for(let r of this.getAllStyles())this.addStyleToHost(n,r)}removeHost(n){this.hostNodes.delete(n)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(n){for(let r of this.hostNodes)this.addStyleToHost(r,n)}onStyleRemoved(n){let r=this.styleRef;r.get(n)?.elements?.forEach(o=>o.remove()),r.delete(n)}collectServerRenderedStyles(){let n=this.doc.head?.querySelectorAll(`style[${nc}="${this.appId}"]`);if(n?.length){let r=new Map;return n.forEach(o=>{o.textContent!=null&&r.set(o.textContent,o)}),r}return null}changeUsageCount(n,r){let o=this.styleRef;if(o.has(n)){let i=o.get(n);return i.usage+=r,i.usage}return o.set(n,{usage:r,elements:[]}),r}getStyleElement(n,r){let o=this.styleNodesInDOM,i=o?.get(r);if(i?.parentNode===n)return o.delete(r),i.removeAttribute(nc),i;{let s=this.doc.createElement("style");return this.nonce&&s.setAttribute("nonce",this.nonce),s.textContent=r,this.platformIsServer&&s.setAttribute(nc,this.appId),n.appendChild(s),s}}addStyleToHost(n,r){let o=this.getStyleElement(n,r),i=this.styleRef,s=i.get(r)?.elements;s?s.push(o):i.set(r,{elements:[o],usage:1})}resetHostNodes(){let n=this.hostNodes;n.clear(),n.add(this.doc.head)}static{this.\u0275fac=function(r){return new(r||e)(M(ve),M(Ea),M(xa,8),M(Cn))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})(),rc={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},cc=/%COMP%/g,wh="%COMP%",rw=`_nghost-${wh}`,ow=`_ngcontent-${wh}`,iw=!0,sw=new E("",{providedIn:"root",factory:()=>iw});function aw(e){return ow.replace(cc,e)}function cw(e){return rw.replace(cc,e)}function Ch(e,t){return t.map(n=>n.replace(cc,e))}var gh=(()=>{class e{constructor(n,r,o,i,s,a,c,u=null){this.eventManager=n,this.sharedStylesHost=r,this.appId=o,this.removeStylesOnCompDestroy=i,this.doc=s,this.platformId=a,this.ngZone=c,this.nonce=u,this.rendererByCompId=new Map,this.platformIsServer=tc(a),this.defaultRenderer=new ar(n,s,c,this.platformIsServer)}createRenderer(n,r){if(!n||!r)return this.defaultRenderer;this.platformIsServer&&r.encapsulation===Be.ShadowDom&&(r=$(m({},r),{encapsulation:Be.Emulated}));let o=this.getOrCreateRenderer(n,r);return o instanceof Ko?o.applyToHost(n):o instanceof cr&&o.applyStyles(),o}getOrCreateRenderer(n,r){let o=this.rendererByCompId,i=o.get(r.id);if(!i){let s=this.doc,a=this.ngZone,c=this.eventManager,u=this.sharedStylesHost,l=this.removeStylesOnCompDestroy,d=this.platformIsServer;switch(r.encapsulation){case Be.Emulated:i=new Ko(c,u,r,this.appId,l,s,a,d);break;case Be.ShadowDom:return new ac(c,u,n,r,s,a,this.nonce,d);default:i=new cr(c,u,r,l,s,a,d);break}o.set(r.id,i)}return i}ngOnDestroy(){this.rendererByCompId.clear()}static{this.\u0275fac=function(r){return new(r||e)(M(yh),M(Dh),M(Ea),M(sw),M(ve),M(Cn),M(q),M(xa))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})(),ar=class{constructor(t,n,r,o){this.eventManager=t,this.doc=n,this.ngZone=r,this.platformIsServer=o,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(t,n){return n?this.doc.createElementNS(rc[n]||n,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,n){(mh(t)?t.content:t).appendChild(n)}insertBefore(t,n,r){t&&(mh(t)?t.content:t).insertBefore(n,r)}removeChild(t,n){n.remove()}selectRootElement(t,n){let r=typeof t=="string"?this.doc.querySelector(t):t;if(!r)throw new v(-5104,!1);return n||(r.textContent=""),r}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,n,r,o){if(o){n=o+":"+n;let i=rc[o];i?t.setAttributeNS(i,n,r):t.setAttribute(n,r)}else t.setAttribute(n,r)}removeAttribute(t,n,r){if(r){let o=rc[r];o?t.removeAttributeNS(o,n):t.removeAttribute(`${r}:${n}`)}else t.removeAttribute(n)}addClass(t,n){t.classList.add(n)}removeClass(t,n){t.classList.remove(n)}setStyle(t,n,r,o){o&(Rt.DashCase|Rt.Important)?t.style.setProperty(n,r,o&Rt.Important?"important":""):t.style[n]=r}removeStyle(t,n,r){r&Rt.DashCase?t.style.removeProperty(n):t.style[n]=""}setProperty(t,n,r){t!=null&&(t[n]=r)}setValue(t,n){t.nodeValue=n}listen(t,n,r){if(typeof t=="string"&&(t=In().getGlobalEventTarget(this.doc,t),!t))throw new Error(`Unsupported event target ${t} for event ${n}`);return this.eventManager.addEventListener(t,n,this.decoratePreventDefault(r))}decoratePreventDefault(t){return n=>{if(n==="__ngUnwrap__")return t;(this.platformIsServer?this.ngZone.runGuarded(()=>t(n)):t(n))===!1&&n.preventDefault()}}};function mh(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var ac=class extends ar{constructor(t,n,r,o,i,s,a,c){super(t,i,s,c),this.sharedStylesHost=n,this.hostEl=r,this.shadowRoot=r.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=Ch(o.id,o.styles);for(let l of u){let d=document.createElement("style");a&&d.setAttribute("nonce",a),d.textContent=l,this.shadowRoot.appendChild(d)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,n){return super.appendChild(this.nodeOrShadowRoot(t),n)}insertBefore(t,n,r){return super.insertBefore(this.nodeOrShadowRoot(t),n,r)}removeChild(t,n){return super.removeChild(null,n)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},cr=class extends ar{constructor(t,n,r,o,i,s,a,c){super(t,i,s,a),this.sharedStylesHost=n,this.removeStylesOnCompDestroy=o,this.styles=c?Ch(c,r.styles):r.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},Ko=class extends cr{constructor(t,n,r,o,i,s,a,c){let u=o+"-"+r.id;super(t,n,r,i,s,a,c,u),this.contentAttr=aw(u),this.hostAttr=cw(u)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,n){let r=super.createElement(t,n);return super.setAttribute(r,this.contentAttr,""),r}},uw=(()=>{class e extends Qo{constructor(n){super(n)}supports(n){return!0}addEventListener(n,r,o){return n.addEventListener(r,o,!1),()=>this.removeEventListener(n,r,o)}removeEventListener(n,r,o){return n.removeEventListener(r,o)}static{this.\u0275fac=function(r){return new(r||e)(M(ve))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})(),vh=["alt","control","meta","shift"],lw={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},dw={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},fw=(()=>{class e extends Qo{constructor(n){super(n)}supports(n){return e.parseEventName(n)!=null}addEventListener(n,r,o){let i=e.parseEventName(r),s=e.eventCallback(i.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>In().onAndCancel(n,i.domEventName,s))}static parseEventName(n){let r=n.toLowerCase().split("."),o=r.shift();if(r.length===0||!(o==="keydown"||o==="keyup"))return null;let i=e._normalizeKey(r.pop()),s="",a=r.indexOf("code");if(a>-1&&(r.splice(a,1),s="code."),vh.forEach(u=>{let l=r.indexOf(u);l>-1&&(r.splice(l,1),s+=u+".")}),s+=i,r.length!=0||i.length===0)return null;let c={};return c.domEventName=o,c.fullKey=s,c}static matchEventFullKeyCode(n,r){let o=lw[n.key]||n.key,i="";return r.indexOf("code.")>-1&&(o=n.code,i="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),vh.forEach(s=>{if(s!==o){let a=dw[s];a(n)&&(i+=s+".")}}),i+=o,i===r)}static eventCallback(n,r,o){return i=>{e.matchEventFullKeyCode(i,n)&&o.runGuarded(()=>r(i))}}static _normalizeKey(n){return n==="esc"?"escape":n}static{this.\u0275fac=function(r){return new(r||e)(M(ve))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})();function bh(e,t){return Xf(m({rootComponent:e},hw(t)))}function hw(e){return{appProviders:[...yw,...e?.providers??[]],platformProviders:vw}}function pw(){ic.makeCurrent()}function gw(){return new Je}function mw(){return jd(document),document}var vw=[{provide:Cn,useValue:ph},{provide:Sa,useValue:pw,multi:!0},{provide:ve,useFactory:mw,deps:[]}];var yw=[{provide:Ao,useValue:"root"},{provide:Je,useFactory:gw,deps:[]},{provide:sc,useClass:uw,multi:!0,deps:[ve,q,Cn]},{provide:sc,useClass:fw,multi:!0,deps:[ve]},gh,Dh,yh,{provide:mn,useExisting:gh},{provide:Yo,useClass:nw,deps:[]},[]];var Ih=(()=>{class e{constructor(n){this._doc=n}getTitle(){return this._doc.title}setTitle(n){this._doc.title=n||""}static{this.\u0275fac=function(r){return new(r||e)(M(ve))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var Pe=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:function(r){let o=null;return r?o=new(r||e):o=M(Dw),o},providedIn:"root"})}}return e})(),Dw=(()=>{class e extends Pe{constructor(n){super(),this._doc=n}sanitize(n,r){if(r==null)return null;switch(n){case Re.NONE:return r;case Re.HTML:return ot(r,"HTML")?qe(r):Ta(this._doc,String(r)).toString();case Re.STYLE:return ot(r,"Style")?qe(r):r;case Re.SCRIPT:if(ot(r,"Script"))return qe(r);throw new v(5200,!1);case Re.URL:return ot(r,"URL")?qe(r):Lo(String(r));case Re.RESOURCE_URL:if(ot(r,"ResourceURL"))return qe(r);throw new v(5201,!1);default:throw new v(5202,!1)}}bypassSecurityTrustHtml(n){return Ud(n)}bypassSecurityTrustStyle(n){return zd(n)}bypassSecurityTrustScript(n){return qd(n)}bypassSecurityTrustUrl(n){return Gd(n)}bypassSecurityTrustResourceUrl(n){return Wd(n)}static{this.\u0275fac=function(r){return new(r||e)(M(ve))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var b="primary",Er=Symbol("RouteTitle"),hc=class{constructor(t){this.params=t||{}}has(t){return Object.prototype.hasOwnProperty.call(this.params,t)}get(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n[0]:n}return null}getAll(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n:[n]}return[]}get keys(){return Object.keys(this.params)}};function An(e){return new hc(e)}function ww(e,t,n){let r=n.path.split("/");if(r.length>e.length||n.pathMatch==="full"&&(t.hasChildren()||r.length<e.length))return null;let o={};for(let i=0;i<r.length;i++){let s=r[i],a=e[i];if(s[0]===":")o[s.substring(1)]=a;else if(s!==a.path)return null}return{consumed:e.slice(0,r.length),posParams:o}}function Cw(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(!We(e[n],t[n]))return!1;return!0}function We(e,t){let n=e?pc(e):void 0,r=t?pc(t):void 0;if(!n||!r||n.length!=r.length)return!1;let o;for(let i=0;i<n.length;i++)if(o=n[i],!Ah(e[o],t[o]))return!1;return!0}function pc(e){return[...Object.keys(e),...Object.getOwnPropertySymbols(e)]}function Ah(e,t){if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;let n=[...e].sort(),r=[...t].sort();return n.every((o,i)=>r[i]===o)}else return e===t}function Rh(e){return e.length>0?e[e.length-1]:null}function yt(e){return Ui(e)?e:bn(e)?z(Promise.resolve(e)):y(e)}var bw={exact:Ph,subset:kh},Oh={exact:Iw,subset:Ew,ignored:()=>!0};function Eh(e,t,n){return bw[n.paths](e.root,t.root,n.matrixParams)&&Oh[n.queryParams](e.queryParams,t.queryParams)&&!(n.fragment==="exact"&&e.fragment!==t.fragment)}function Iw(e,t){return We(e,t)}function Ph(e,t,n){if(!jt(e.segments,t.segments)||!ei(e.segments,t.segments,n)||e.numberOfChildren!==t.numberOfChildren)return!1;for(let r in t.children)if(!e.children[r]||!Ph(e.children[r],t.children[r],n))return!1;return!0}function Ew(e,t){return Object.keys(t).length<=Object.keys(e).length&&Object.keys(t).every(n=>Ah(e[n],t[n]))}function kh(e,t,n){return Fh(e,t,t.segments,n)}function Fh(e,t,n,r){if(e.segments.length>n.length){let o=e.segments.slice(0,n.length);return!(!jt(o,n)||t.hasChildren()||!ei(o,n,r))}else if(e.segments.length===n.length){if(!jt(e.segments,n)||!ei(e.segments,n,r))return!1;for(let o in t.children)if(!e.children[o]||!kh(e.children[o],t.children[o],r))return!1;return!0}else{let o=n.slice(0,e.segments.length),i=n.slice(e.segments.length);return!jt(e.segments,o)||!ei(e.segments,o,r)||!e.children[b]?!1:Fh(e.children[b],t,i,r)}}function ei(e,t,n){return t.every((r,o)=>Oh[n](e[o].parameters,r.parameters))}var at=class{constructor(t=new P([],{}),n={},r=null){this.root=t,this.queryParams=n,this.fragment=r}get queryParamMap(){return this._queryParamMap??=An(this.queryParams),this._queryParamMap}toString(){return Mw.serialize(this)}},P=class{constructor(t,n){this.segments=t,this.children=n,this.parent=null,Object.values(n).forEach(r=>r.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return ti(this)}},Lt=class{constructor(t,n){this.path=t,this.parameters=n}get parameterMap(){return this._parameterMap??=An(this.parameters),this._parameterMap}toString(){return jh(this)}};function Sw(e,t){return jt(e,t)&&e.every((n,r)=>We(n.parameters,t[r].parameters))}function jt(e,t){return e.length!==t.length?!1:e.every((n,r)=>n.path===t[r].path)}function xw(e,t){let n=[];return Object.entries(e.children).forEach(([r,o])=>{r===b&&(n=n.concat(t(o,r)))}),Object.entries(e.children).forEach(([r,o])=>{r!==b&&(n=n.concat(t(o,r)))}),n}var Bc=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>new gr,providedIn:"root"})}}return e})(),gr=class{parse(t){let n=new mc(t);return new at(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())}serialize(t){let n=`/${ur(t.root,!0)}`,r=Nw(t.queryParams),o=typeof t.fragment=="string"?`#${Tw(t.fragment)}`:"";return`${n}${r}${o}`}},Mw=new gr;function ti(e){return e.segments.map(t=>jh(t)).join("/")}function ur(e,t){if(!e.hasChildren())return ti(e);if(t){let n=e.children[b]?ur(e.children[b],!1):"",r=[];return Object.entries(e.children).forEach(([o,i])=>{o!==b&&r.push(`${o}:${ur(i,!1)}`)}),r.length>0?`${n}(${r.join("//")})`:n}else{let n=xw(e,(r,o)=>o===b?[ur(e.children[b],!1)]:[`${o}:${ur(r,!1)}`]);return Object.keys(e.children).length===1&&e.children[b]!=null?`${ti(e)}/${n[0]}`:`${ti(e)}/(${n.join("//")})`}}function Lh(e){return encodeURIComponent(e).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Jo(e){return Lh(e).replace(/%3B/gi,";")}function Tw(e){return encodeURI(e)}function gc(e){return Lh(e).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function ni(e){return decodeURIComponent(e)}function Sh(e){return ni(e.replace(/\+/g,"%20"))}function jh(e){return`${gc(e.path)}${_w(e.parameters)}`}function _w(e){return Object.entries(e).map(([t,n])=>`;${gc(t)}=${gc(n)}`).join("")}function Nw(e){let t=Object.entries(e).map(([n,r])=>Array.isArray(r)?r.map(o=>`${Jo(n)}=${Jo(o)}`).join("&"):`${Jo(n)}=${Jo(r)}`).filter(n=>n);return t.length?`?${t.join("&")}`:""}var Aw=/^[^\/()?;#]+/;function uc(e){let t=e.match(Aw);return t?t[0]:""}var Rw=/^[^\/()?;=#]+/;function Ow(e){let t=e.match(Rw);return t?t[0]:""}var Pw=/^[^=?&#]+/;function kw(e){let t=e.match(Pw);return t?t[0]:""}var Fw=/^[^&#]+/;function Lw(e){let t=e.match(Fw);return t?t[0]:""}var mc=class{constructor(t){this.url=t,this.remaining=t}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new P([],{}):new P([],this.parseChildren())}parseQueryParams(){let t={};if(this.consumeOptional("?"))do this.parseQueryParam(t);while(this.consumeOptional("&"));return t}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let n={};this.peekStartsWith("/(")&&(this.capture("/"),n=this.parseParens(!0));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1)),(t.length>0||Object.keys(n).length>0)&&(r[b]=new P(t,n)),r}parseSegment(){let t=uc(this.remaining);if(t===""&&this.peekStartsWith(";"))throw new v(4009,!1);return this.capture(t),new Lt(ni(t),this.parseMatrixParams())}parseMatrixParams(){let t={};for(;this.consumeOptional(";");)this.parseParam(t);return t}parseParam(t){let n=Ow(this.remaining);if(!n)return;this.capture(n);let r="";if(this.consumeOptional("=")){let o=uc(this.remaining);o&&(r=o,this.capture(r))}t[ni(n)]=ni(r)}parseQueryParam(t){let n=kw(this.remaining);if(!n)return;this.capture(n);let r="";if(this.consumeOptional("=")){let s=Lw(this.remaining);s&&(r=s,this.capture(r))}let o=Sh(n),i=Sh(r);if(t.hasOwnProperty(o)){let s=t[o];Array.isArray(s)||(s=[s],t[o]=s),s.push(i)}else t[o]=i}parseParens(t){let n={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=uc(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new v(4010,!1);let i;r.indexOf(":")>-1?(i=r.slice(0,r.indexOf(":")),this.capture(i),this.capture(":")):t&&(i=b);let s=this.parseChildren();n[i]=Object.keys(s).length===1?s[b]:new P([],s),this.consumeOptional("//")}return n}peekStartsWith(t){return this.remaining.startsWith(t)}consumeOptional(t){return this.peekStartsWith(t)?(this.remaining=this.remaining.substring(t.length),!0):!1}capture(t){if(!this.consumeOptional(t))throw new v(4011,!1)}};function Vh(e){return e.segments.length>0?new P([],{[b]:e}):e}function Bh(e){let t={};for(let[r,o]of Object.entries(e.children)){let i=Bh(o);if(r===b&&i.segments.length===0&&i.hasChildren())for(let[s,a]of Object.entries(i.children))t[s]=a;else(i.segments.length>0||i.hasChildren())&&(t[r]=i)}let n=new P(e.segments,t);return jw(n)}function jw(e){if(e.numberOfChildren===1&&e.children[b]){let t=e.children[b];return new P(e.segments.concat(t.segments),t.children)}return e}function Vt(e){return e instanceof at}function Vw(e,t,n=null,r=null){let o=$h(e);return Hh(o,t,n,r)}function $h(e){let t;function n(i){let s={};for(let c of i.children){let u=n(c);s[c.outlet]=u}let a=new P(i.url,s);return i===e&&(t=a),a}let r=n(e.root),o=Vh(r);return t??o}function Hh(e,t,n,r){let o=e;for(;o.parent;)o=o.parent;if(t.length===0)return lc(o,o,o,n,r);let i=Bw(t);if(i.toRoot())return lc(o,o,new P([],{}),n,r);let s=$w(i,o,e),a=s.processChildren?fr(s.segmentGroup,s.index,i.commands):zh(s.segmentGroup,s.index,i.commands);return lc(o,s.segmentGroup,a,n,r)}function ri(e){return typeof e=="object"&&e!=null&&!e.outlets&&!e.segmentPath}function mr(e){return typeof e=="object"&&e!=null&&e.outlets}function lc(e,t,n,r,o){let i={};r&&Object.entries(r).forEach(([c,u])=>{i[c]=Array.isArray(u)?u.map(l=>`${l}`):`${u}`});let s;e===t?s=n:s=Uh(e,t,n);let a=Vh(Bh(s));return new at(a,i,o)}function Uh(e,t,n){let r={};return Object.entries(e.children).forEach(([o,i])=>{i===t?r[o]=n:r[o]=Uh(i,t,n)}),new P(e.segments,r)}var oi=class{constructor(t,n,r){if(this.isAbsolute=t,this.numberOfDoubleDots=n,this.commands=r,t&&r.length>0&&ri(r[0]))throw new v(4003,!1);let o=r.find(mr);if(o&&o!==Rh(r))throw new v(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function Bw(e){if(typeof e[0]=="string"&&e.length===1&&e[0]==="/")return new oi(!0,0,e);let t=0,n=!1,r=e.reduce((o,i,s)=>{if(typeof i=="object"&&i!=null){if(i.outlets){let a={};return Object.entries(i.outlets).forEach(([c,u])=>{a[c]=typeof u=="string"?u.split("/"):u}),[...o,{outlets:a}]}if(i.segmentPath)return[...o,i.segmentPath]}return typeof i!="string"?[...o,i]:s===0?(i.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?n=!0:a===".."?t++:a!=""&&o.push(a))}),o):[...o,i]},[]);return new oi(n,t,r)}var Tn=class{constructor(t,n,r){this.segmentGroup=t,this.processChildren=n,this.index=r}};function $w(e,t,n){if(e.isAbsolute)return new Tn(t,!0,0);if(!n)return new Tn(t,!1,NaN);if(n.parent===null)return new Tn(n,!0,0);let r=ri(e.commands[0])?0:1,o=n.segments.length-1+r;return Hw(n,o,e.numberOfDoubleDots)}function Hw(e,t,n){let r=e,o=t,i=n;for(;i>o;){if(i-=o,r=r.parent,!r)throw new v(4005,!1);o=r.segments.length}return new Tn(r,!1,o-i)}function Uw(e){return mr(e[0])?e[0].outlets:{[b]:e}}function zh(e,t,n){if(e??=new P([],{}),e.segments.length===0&&e.hasChildren())return fr(e,t,n);let r=zw(e,t,n),o=n.slice(r.commandIndex);if(r.match&&r.pathIndex<e.segments.length){let i=new P(e.segments.slice(0,r.pathIndex),{});return i.children[b]=new P(e.segments.slice(r.pathIndex),e.children),fr(i,0,o)}else return r.match&&o.length===0?new P(e.segments,{}):r.match&&!e.hasChildren()?vc(e,t,n):r.match?fr(e,0,o):vc(e,t,n)}function fr(e,t,n){if(n.length===0)return new P(e.segments,{});{let r=Uw(n),o={};if(Object.keys(r).some(i=>i!==b)&&e.children[b]&&e.numberOfChildren===1&&e.children[b].segments.length===0){let i=fr(e.children[b],t,n);return new P(e.segments,i.children)}return Object.entries(r).forEach(([i,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(o[i]=zh(e.children[i],t,s))}),Object.entries(e.children).forEach(([i,s])=>{r[i]===void 0&&(o[i]=s)}),new P(e.segments,o)}}function zw(e,t,n){let r=0,o=t,i={match:!1,pathIndex:0,commandIndex:0};for(;o<e.segments.length;){if(r>=n.length)return i;let s=e.segments[o],a=n[r];if(mr(a))break;let c=`${a}`,u=r<n.length-1?n[r+1]:null;if(o>0&&c===void 0)break;if(c&&u&&typeof u=="object"&&u.outlets===void 0){if(!Mh(c,u,s))return i;r+=2}else{if(!Mh(c,{},s))return i;r++}o++}return{match:!0,pathIndex:o,commandIndex:r}}function vc(e,t,n){let r=e.segments.slice(0,t),o=0;for(;o<n.length;){let i=n[o];if(mr(i)){let c=qw(i.outlets);return new P(r,c)}if(o===0&&ri(n[0])){let c=e.segments[t];r.push(new Lt(c.path,xh(n[0]))),o++;continue}let s=mr(i)?i.outlets[b]:`${i}`,a=o<n.length-1?n[o+1]:null;s&&a&&ri(a)?(r.push(new Lt(s,xh(a))),o+=2):(r.push(new Lt(s,{})),o++)}return new P(r,{})}function qw(e){let t={};return Object.entries(e).forEach(([n,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(t[n]=vc(new P([],{}),0,r))}),t}function xh(e){let t={};return Object.entries(e).forEach(([n,r])=>t[n]=`${r}`),t}function Mh(e,t,n){return e==n.path&&We(t,n.parameters)}var hr="imperative",ee=function(e){return e[e.NavigationStart=0]="NavigationStart",e[e.NavigationEnd=1]="NavigationEnd",e[e.NavigationCancel=2]="NavigationCancel",e[e.NavigationError=3]="NavigationError",e[e.RoutesRecognized=4]="RoutesRecognized",e[e.ResolveStart=5]="ResolveStart",e[e.ResolveEnd=6]="ResolveEnd",e[e.GuardsCheckStart=7]="GuardsCheckStart",e[e.GuardsCheckEnd=8]="GuardsCheckEnd",e[e.RouteConfigLoadStart=9]="RouteConfigLoadStart",e[e.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",e[e.ChildActivationStart=11]="ChildActivationStart",e[e.ChildActivationEnd=12]="ChildActivationEnd",e[e.ActivationStart=13]="ActivationStart",e[e.ActivationEnd=14]="ActivationEnd",e[e.Scroll=15]="Scroll",e[e.NavigationSkipped=16]="NavigationSkipped",e}(ee||{}),xe=class{constructor(t,n){this.id=t,this.url=n}},vr=class extends xe{constructor(t,n,r="imperative",o=null){super(t,n),this.type=ee.NavigationStart,this.navigationTrigger=r,this.restoredState=o}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Fe=class extends xe{constructor(t,n,r){super(t,n),this.urlAfterRedirects=r,this.type=ee.NavigationEnd}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},De=function(e){return e[e.Redirect=0]="Redirect",e[e.SupersededByNewNavigation=1]="SupersededByNewNavigation",e[e.NoDataFromResolver=2]="NoDataFromResolver",e[e.GuardRejected=3]="GuardRejected",e}(De||{}),yc=function(e){return e[e.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",e[e.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",e}(yc||{}),st=class extends xe{constructor(t,n,r,o){super(t,n),this.reason=r,this.code=o,this.type=ee.NavigationCancel}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},Bt=class extends xe{constructor(t,n,r,o){super(t,n),this.reason=r,this.code=o,this.type=ee.NavigationSkipped}},yr=class extends xe{constructor(t,n,r,o){super(t,n),this.error=r,this.target=o,this.type=ee.NavigationError}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},ii=class extends xe{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ee.RoutesRecognized}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Dc=class extends xe{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ee.GuardsCheckStart}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},wc=class extends xe{constructor(t,n,r,o,i){super(t,n),this.urlAfterRedirects=r,this.state=o,this.shouldActivate=i,this.type=ee.GuardsCheckEnd}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Cc=class extends xe{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ee.ResolveStart}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},bc=class extends xe{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ee.ResolveEnd}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Ic=class{constructor(t){this.route=t,this.type=ee.RouteConfigLoadStart}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Ec=class{constructor(t){this.route=t,this.type=ee.RouteConfigLoadEnd}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},Sc=class{constructor(t){this.snapshot=t,this.type=ee.ChildActivationStart}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},xc=class{constructor(t){this.snapshot=t,this.type=ee.ChildActivationEnd}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Mc=class{constructor(t){this.snapshot=t,this.type=ee.ActivationStart}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Tc=class{constructor(t){this.snapshot=t,this.type=ee.ActivationEnd}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var Dr=class{},Rn=class{constructor(t,n){this.url=t,this.navigationBehaviorOptions=n}};function Gw(e,t){return e.providers&&!e._injector&&(e._injector=Ha(e.providers,t,`Route: ${e.path}`)),e._injector??t}function ke(e){return e.outlet||b}function Ww(e,t){let n=e.filter(r=>ke(r)===t);return n.push(...e.filter(r=>ke(r)!==t)),n}function Sr(e){if(!e)return null;if(e.routeConfig?._injector)return e.routeConfig._injector;for(let t=e.parent;t;t=t.parent){let n=t.routeConfig;if(n?._loadedInjector)return n._loadedInjector;if(n?._injector)return n._injector}return null}var _c=class{get injector(){return Sr(this.route?.snapshot)??this.rootInjector}set injector(t){}constructor(t){this.rootInjector=t,this.outlet=null,this.route=null,this.children=new hi(this.rootInjector),this.attachRef=null}},hi=(()=>{class e{constructor(n){this.rootInjector=n,this.contexts=new Map}onChildOutletCreated(n,r){let o=this.getOrCreateContext(n);o.outlet=r,this.contexts.set(n,o)}onChildOutletDestroyed(n){let r=this.getContext(n);r&&(r.outlet=null,r.attachRef=null)}onOutletDeactivated(){let n=this.contexts;return this.contexts=new Map,n}onOutletReAttached(n){this.contexts=n}getOrCreateContext(n){let r=this.getContext(n);return r||(r=new _c(this.rootInjector),this.contexts.set(n,r)),r}getContext(n){return this.contexts.get(n)||null}static{this.\u0275fac=function(r){return new(r||e)(M(be))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),si=class{constructor(t){this._root=t}get root(){return this._root.value}parent(t){let n=this.pathFromRoot(t);return n.length>1?n[n.length-2]:null}children(t){let n=Nc(t,this._root);return n?n.children.map(r=>r.value):[]}firstChild(t){let n=Nc(t,this._root);return n&&n.children.length>0?n.children[0].value:null}siblings(t){let n=Ac(t,this._root);return n.length<2?[]:n[n.length-2].children.map(o=>o.value).filter(o=>o!==t)}pathFromRoot(t){return Ac(t,this._root).map(n=>n.value)}};function Nc(e,t){if(e===t.value)return t;for(let n of t.children){let r=Nc(e,n);if(r)return r}return null}function Ac(e,t){if(e===t.value)return[t];for(let n of t.children){let r=Ac(e,n);if(r.length)return r.unshift(t),r}return[]}var ye=class{constructor(t,n){this.value=t,this.children=n}toString(){return`TreeNode(${this.value})`}};function Mn(e){let t={};return e&&e.children.forEach(n=>t[n.value.outlet]=n),t}var ai=class extends si{constructor(t,n){super(t),this.snapshot=n,$c(this,t)}toString(){return this.snapshot.toString()}};function qh(e){let t=Zw(e),n=new K([new Lt("",{})]),r=new K({}),o=new K({}),i=new K({}),s=new K(""),a=new ct(n,r,i,s,o,b,e,t.root);return a.snapshot=t.root,new ai(new ye(a,[]),t)}function Zw(e){let t={},n={},r={},o="",i=new _n([],t,r,o,n,b,e,null,{});return new ui("",new ye(i,[]))}var ct=class{constructor(t,n,r,o,i,s,a,c){this.urlSubject=t,this.paramsSubject=n,this.queryParamsSubject=r,this.fragmentSubject=o,this.dataSubject=i,this.outlet=s,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(S(u=>u[Er]))??y(void 0),this.url=t,this.params=n,this.queryParams=r,this.fragment=o,this.data=i}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(S(t=>An(t))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(S(t=>An(t))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function ci(e,t,n="emptyOnly"){let r,{routeConfig:o}=e;return t!==null&&(n==="always"||o?.path===""||!t.component&&!t.routeConfig?.loadComponent)?r={params:m(m({},t.params),e.params),data:m(m({},t.data),e.data),resolve:m(m(m(m({},e.data),t.data),o?.data),e._resolvedData)}:r={params:m({},e.params),data:m({},e.data),resolve:m(m({},e.data),e._resolvedData??{})},o&&Wh(o)&&(r.resolve[Er]=o.title),r}var _n=class{get title(){return this.data?.[Er]}constructor(t,n,r,o,i,s,a,c,u){this.url=t,this.params=n,this.queryParams=r,this.fragment=o,this.data=i,this.outlet=s,this.component=a,this.routeConfig=c,this._resolve=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=An(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=An(this.queryParams),this._queryParamMap}toString(){let t=this.url.map(r=>r.toString()).join("/"),n=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${t}', path:'${n}')`}},ui=class extends si{constructor(t,n){super(n),this.url=t,$c(this,n)}toString(){return Gh(this._root)}};function $c(e,t){t.value._routerState=e,t.children.forEach(n=>$c(e,n))}function Gh(e){let t=e.children.length>0?` { ${e.children.map(Gh).join(", ")} } `:"";return`${e.value}${t}`}function dc(e){if(e.snapshot){let t=e.snapshot,n=e._futureSnapshot;e.snapshot=n,We(t.queryParams,n.queryParams)||e.queryParamsSubject.next(n.queryParams),t.fragment!==n.fragment&&e.fragmentSubject.next(n.fragment),We(t.params,n.params)||e.paramsSubject.next(n.params),Cw(t.url,n.url)||e.urlSubject.next(n.url),We(t.data,n.data)||e.dataSubject.next(n.data)}else e.snapshot=e._futureSnapshot,e.dataSubject.next(e._futureSnapshot.data)}function Rc(e,t){let n=We(e.params,t.params)&&Sw(e.url,t.url),r=!e.parent!=!t.parent;return n&&!r&&(!e.parent||Rc(e.parent,t.parent))}function Wh(e){return typeof e.title=="string"||e.title===null}var Hc=(()=>{class e{constructor(){this.activated=null,this._activatedRoute=null,this.name=b,this.activateEvents=new X,this.deactivateEvents=new X,this.attachEvents=new X,this.detachEvents=new X,this.parentContexts=p(hi),this.location=p(Ot),this.changeDetector=p(kt),this.inputBinder=p(Uc,{optional:!0}),this.supportsBindingToComponentInputs=!0}get activatedComponentRef(){return this.activated}ngOnChanges(n){if(n.name){let{firstChange:r,previousValue:o}=n.name;if(r)return;this.isTrackedInParentContexts(o)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(o)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(n){return this.parentContexts.getContext(n)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let n=this.parentContexts.getContext(this.name);n?.route&&(n.attachRef?this.attach(n.attachRef,n.route):this.activateWith(n.route,n.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new v(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new v(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new v(4012,!1);this.location.detach();let n=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(n.instance),n}attach(n,r){this.activated=n,this._activatedRoute=r,this.location.insert(n.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(n.instance)}deactivate(){if(this.activated){let n=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(n)}}activateWith(n,r){if(this.isActivated)throw new v(4013,!1);this._activatedRoute=n;let o=this.location,s=n.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new Oc(n,a,o.injector);this.activated=o.createComponent(s,{index:o.length,injector:c,environmentInjector:r}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275dir=vn({type:e,selectors:[["router-outlet"]],inputs:{name:"name"},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],standalone:!0,features:[yn]})}}return e})(),Oc=class e{__ngOutletInjector(t){return new e(this.route,this.childContexts,t)}constructor(t,n,r){this.route=t,this.childContexts=n,this.parent=r}get(t,n){return t===ct?this.route:t===hi?this.childContexts:this.parent.get(t,n)}},Uc=new E("");function Yw(e,t,n){let r=wr(e,t._root,n?n._root:void 0);return new ai(r,t)}function wr(e,t,n){if(n&&e.shouldReuseRoute(t.value,n.value.snapshot)){let r=n.value;r._futureSnapshot=t.value;let o=Qw(e,t,n);return new ye(r,o)}else{if(e.shouldAttach(t.value)){let i=e.retrieve(t.value);if(i!==null){let s=i.route;return s.value._futureSnapshot=t.value,s.children=t.children.map(a=>wr(e,a)),s}}let r=Kw(t.value),o=t.children.map(i=>wr(e,i));return new ye(r,o)}}function Qw(e,t,n){return t.children.map(r=>{for(let o of n.children)if(e.shouldReuseRoute(r.value,o.value.snapshot))return wr(e,r,o);return wr(e,r)})}function Kw(e){return new ct(new K(e.url),new K(e.params),new K(e.queryParams),new K(e.fragment),new K(e.data),e.outlet,e.component,e)}var Cr=class{constructor(t,n){this.redirectTo=t,this.navigationBehaviorOptions=n}},Zh="ngNavigationCancelingError";function li(e,t){let{redirectTo:n,navigationBehaviorOptions:r}=Vt(t)?{redirectTo:t,navigationBehaviorOptions:void 0}:t,o=Yh(!1,De.Redirect);return o.url=n,o.navigationBehaviorOptions=r,o}function Yh(e,t){let n=new Error(`NavigationCancelingError: ${e||""}`);return n[Zh]=!0,n.cancellationCode=t,n}function Jw(e){return Qh(e)&&Vt(e.url)}function Qh(e){return!!e&&e[Zh]}var Xw=(e,t,n,r)=>S(o=>(new Pc(t,o.targetRouterState,o.currentRouterState,n,r).activate(e),o)),Pc=class{constructor(t,n,r,o,i){this.routeReuseStrategy=t,this.futureState=n,this.currState=r,this.forwardEvent=o,this.inputBindingEnabled=i}activate(t){let n=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(n,r,t),dc(this.futureState.root),this.activateChildRoutes(n,r,t)}deactivateChildRoutes(t,n,r){let o=Mn(n);t.children.forEach(i=>{let s=i.value.outlet;this.deactivateRoutes(i,o[s],r),delete o[s]}),Object.values(o).forEach(i=>{this.deactivateRouteAndItsChildren(i,r)})}deactivateRoutes(t,n,r){let o=t.value,i=n?n.value:null;if(o===i)if(o.component){let s=r.getContext(o.outlet);s&&this.deactivateChildRoutes(t,n,s.children)}else this.deactivateChildRoutes(t,n,r);else i&&this.deactivateRouteAndItsChildren(n,r)}deactivateRouteAndItsChildren(t,n){t.value.component&&this.routeReuseStrategy.shouldDetach(t.value.snapshot)?this.detachAndStoreRouteSubtree(t,n):this.deactivateRouteAndOutlet(t,n)}detachAndStoreRouteSubtree(t,n){let r=n.getContext(t.value.outlet),o=r&&t.value.component?r.children:n,i=Mn(t);for(let s of Object.values(i))this.deactivateRouteAndItsChildren(s,o);if(r&&r.outlet){let s=r.outlet.detach(),a=r.children.onOutletDeactivated();this.routeReuseStrategy.store(t.value.snapshot,{componentRef:s,route:t,contexts:a})}}deactivateRouteAndOutlet(t,n){let r=n.getContext(t.value.outlet),o=r&&t.value.component?r.children:n,i=Mn(t);for(let s of Object.values(i))this.deactivateRouteAndItsChildren(s,o);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null)}activateChildRoutes(t,n,r){let o=Mn(n);t.children.forEach(i=>{this.activateRoutes(i,o[i.value.outlet],r),this.forwardEvent(new Tc(i.value.snapshot))}),t.children.length&&this.forwardEvent(new xc(t.value.snapshot))}activateRoutes(t,n,r){let o=t.value,i=n?n.value:null;if(dc(o),o===i)if(o.component){let s=r.getOrCreateContext(o.outlet);this.activateChildRoutes(t,n,s.children)}else this.activateChildRoutes(t,n,r);else if(o.component){let s=r.getOrCreateContext(o.outlet);if(this.routeReuseStrategy.shouldAttach(o.snapshot)){let a=this.routeReuseStrategy.retrieve(o.snapshot);this.routeReuseStrategy.store(o.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),dc(a.route.value),this.activateChildRoutes(t,null,s.children)}else s.attachRef=null,s.route=o,s.outlet&&s.outlet.activateWith(o,s.injector),this.activateChildRoutes(t,null,s.children)}else this.activateChildRoutes(t,null,r)}},di=class{constructor(t){this.path=t,this.route=this.path[this.path.length-1]}},Nn=class{constructor(t,n){this.component=t,this.route=n}};function eC(e,t,n){let r=e._root,o=t?t._root:null;return lr(r,o,n,[r.value])}function tC(e){let t=e.routeConfig?e.routeConfig.canActivateChild:null;return!t||t.length===0?null:{node:e,guards:t}}function Pn(e,t){let n=Symbol(),r=t.get(e,n);return r===n?typeof e=="function"&&!wl(e)?e:t.get(e):r}function lr(e,t,n,r,o={canDeactivateChecks:[],canActivateChecks:[]}){let i=Mn(t);return e.children.forEach(s=>{nC(s,i[s.value.outlet],n,r.concat([s.value]),o),delete i[s.value.outlet]}),Object.entries(i).forEach(([s,a])=>pr(a,n.getContext(s),o)),o}function nC(e,t,n,r,o={canDeactivateChecks:[],canActivateChecks:[]}){let i=e.value,s=t?t.value:null,a=n?n.getContext(e.value.outlet):null;if(s&&i.routeConfig===s.routeConfig){let c=rC(s,i,i.routeConfig.runGuardsAndResolvers);c?o.canActivateChecks.push(new di(r)):(i.data=s.data,i._resolvedData=s._resolvedData),i.component?lr(e,t,a?a.children:null,r,o):lr(e,t,n,r,o),c&&a&&a.outlet&&a.outlet.isActivated&&o.canDeactivateChecks.push(new Nn(a.outlet.component,s))}else s&&pr(t,a,o),o.canActivateChecks.push(new di(r)),i.component?lr(e,null,a?a.children:null,r,o):lr(e,null,n,r,o);return o}function rC(e,t,n){if(typeof n=="function")return n(e,t);switch(n){case"pathParamsChange":return!jt(e.url,t.url);case"pathParamsOrQueryParamsChange":return!jt(e.url,t.url)||!We(e.queryParams,t.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Rc(e,t)||!We(e.queryParams,t.queryParams);case"paramsChange":default:return!Rc(e,t)}}function pr(e,t,n){let r=Mn(e),o=e.value;Object.entries(r).forEach(([i,s])=>{o.component?t?pr(s,t.children.getContext(i),n):pr(s,null,n):pr(s,t,n)}),o.component?t&&t.outlet&&t.outlet.isActivated?n.canDeactivateChecks.push(new Nn(t.outlet.component,o)):n.canDeactivateChecks.push(new Nn(null,o)):n.canDeactivateChecks.push(new Nn(null,o))}function xr(e){return typeof e=="function"}function oC(e){return typeof e=="boolean"}function iC(e){return e&&xr(e.canLoad)}function sC(e){return e&&xr(e.canActivate)}function aC(e){return e&&xr(e.canActivateChild)}function cC(e){return e&&xr(e.canDeactivate)}function uC(e){return e&&xr(e.canMatch)}function Kh(e){return e instanceof Ze||e?.name==="EmptyError"}var Xo=Symbol("INITIAL_VALUE");function On(){return ce(e=>zr(e.map(t=>t.pipe(Ye(1),Wi(Xo)))).pipe(S(t=>{for(let n of t)if(n!==!0){if(n===Xo)return Xo;if(n===!1||lC(n))return n}return!0}),ae(t=>t!==Xo),Ye(1)))}function lC(e){return Vt(e)||e instanceof Cr}function dC(e,t){return W(n=>{let{targetSnapshot:r,currentSnapshot:o,guards:{canActivateChecks:i,canDeactivateChecks:s}}=n;return s.length===0&&i.length===0?y($(m({},n),{guardsResult:!0})):fC(s,r,o,e).pipe(W(a=>a&&oC(a)?hC(r,i,e,t):y(a)),S(a=>$(m({},n),{guardsResult:a})))})}function fC(e,t,n,r){return z(e).pipe(W(o=>yC(o.component,o.route,n,t,r)),Le(o=>o!==!0,!0))}function hC(e,t,n,r){return z(t).pipe(en(o=>Xt(gC(o.route.parent,r),pC(o.route,r),vC(e,o.path,n),mC(e,o.route,n))),Le(o=>o!==!0,!0))}function pC(e,t){return e!==null&&t&&t(new Mc(e)),y(!0)}function gC(e,t){return e!==null&&t&&t(new Sc(e)),y(!0)}function mC(e,t,n){let r=t.routeConfig?t.routeConfig.canActivate:null;if(!r||r.length===0)return y(!0);let o=r.map(i=>qr(()=>{let s=Sr(t)??n,a=Pn(i,s),c=sC(a)?a.canActivate(t,e):et(s,()=>a(t,e));return yt(c).pipe(Le())}));return y(o).pipe(On())}function vC(e,t,n){let r=t[t.length-1],i=t.slice(0,t.length-1).reverse().map(s=>tC(s)).filter(s=>s!==null).map(s=>qr(()=>{let a=s.guards.map(c=>{let u=Sr(s.node)??n,l=Pn(c,u),d=aC(l)?l.canActivateChild(r,e):et(u,()=>l(r,e));return yt(d).pipe(Le())});return y(a).pipe(On())}));return y(i).pipe(On())}function yC(e,t,n,r,o){let i=t&&t.routeConfig?t.routeConfig.canDeactivate:null;if(!i||i.length===0)return y(!0);let s=i.map(a=>{let c=Sr(t)??o,u=Pn(a,c),l=cC(u)?u.canDeactivate(e,t,n,r):et(c,()=>u(e,t,n,r));return yt(l).pipe(Le())});return y(s).pipe(On())}function DC(e,t,n,r){let o=t.canLoad;if(o===void 0||o.length===0)return y(!0);let i=o.map(s=>{let a=Pn(s,e),c=iC(a)?a.canLoad(t,n):et(e,()=>a(t,n));return yt(c)});return y(i).pipe(On(),Jh(r))}function Jh(e){return Vi(J(t=>{if(typeof t!="boolean")throw li(e,t)}),S(t=>t===!0))}function wC(e,t,n,r){let o=t.canMatch;if(!o||o.length===0)return y(!0);let i=o.map(s=>{let a=Pn(s,e),c=uC(a)?a.canMatch(t,n):et(e,()=>a(t,n));return yt(c)});return y(i).pipe(On(),Jh(r))}var br=class{constructor(t){this.segmentGroup=t||null}},Ir=class extends Error{constructor(t){super(),this.urlTree=t}};function xn(e){return Kt(new br(e))}function CC(e){return Kt(new v(4e3,!1))}function bC(e){return Kt(Yh(!1,De.GuardRejected))}var kc=class{constructor(t,n){this.urlSerializer=t,this.urlTree=n}lineralizeSegments(t,n){let r=[],o=n.root;for(;;){if(r=r.concat(o.segments),o.numberOfChildren===0)return y(r);if(o.numberOfChildren>1||!o.children[b])return CC(`${t.redirectTo}`);o=o.children[b]}}applyRedirectCommands(t,n,r,o,i){if(typeof n!="string"){let a=n,{queryParams:c,fragment:u,routeConfig:l,url:d,outlet:h,params:f,data:g,title:T}=o,L=et(i,()=>a({params:f,data:g,queryParams:c,fragment:u,routeConfig:l,url:d,outlet:h,title:T}));if(L instanceof at)throw new Ir(L);n=L}let s=this.applyRedirectCreateUrlTree(n,this.urlSerializer.parse(n),t,r);if(n[0]==="/")throw new Ir(s);return s}applyRedirectCreateUrlTree(t,n,r,o){let i=this.createSegmentGroup(t,n.root,r,o);return new at(i,this.createQueryParams(n.queryParams,this.urlTree.queryParams),n.fragment)}createQueryParams(t,n){let r={};return Object.entries(t).forEach(([o,i])=>{if(typeof i=="string"&&i[0]===":"){let a=i.substring(1);r[o]=n[a]}else r[o]=i}),r}createSegmentGroup(t,n,r,o){let i=this.createSegments(t,n.segments,r,o),s={};return Object.entries(n.children).forEach(([a,c])=>{s[a]=this.createSegmentGroup(t,c,r,o)}),new P(i,s)}createSegments(t,n,r,o){return n.map(i=>i.path[0]===":"?this.findPosParam(t,i,o):this.findOrReturn(i,r))}findPosParam(t,n,r){let o=r[n.path.substring(1)];if(!o)throw new v(4001,!1);return o}findOrReturn(t,n){let r=0;for(let o of n){if(o.path===t.path)return n.splice(r),o;r++}return t}},Fc={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function IC(e,t,n,r,o){let i=Xh(e,t,n);return i.matched?(r=Gw(t,r),wC(r,t,n,o).pipe(S(s=>s===!0?i:m({},Fc)))):y(i)}function Xh(e,t,n){if(t.path==="**")return EC(n);if(t.path==="")return t.pathMatch==="full"&&(e.hasChildren()||n.length>0)?m({},Fc):{matched:!0,consumedSegments:[],remainingSegments:n,parameters:{},positionalParamSegments:{}};let o=(t.matcher||ww)(n,e,t);if(!o)return m({},Fc);let i={};Object.entries(o.posParams??{}).forEach(([a,c])=>{i[a]=c.path});let s=o.consumed.length>0?m(m({},i),o.consumed[o.consumed.length-1].parameters):i;return{matched:!0,consumedSegments:o.consumed,remainingSegments:n.slice(o.consumed.length),parameters:s,positionalParamSegments:o.posParams??{}}}function EC(e){return{matched:!0,parameters:e.length>0?Rh(e).parameters:{},consumedSegments:e,remainingSegments:[],positionalParamSegments:{}}}function Th(e,t,n,r){return n.length>0&&MC(e,n,r)?{segmentGroup:new P(t,xC(r,new P(n,e.children))),slicedSegments:[]}:n.length===0&&TC(e,n,r)?{segmentGroup:new P(e.segments,SC(e,n,r,e.children)),slicedSegments:n}:{segmentGroup:new P(e.segments,e.children),slicedSegments:n}}function SC(e,t,n,r){let o={};for(let i of n)if(pi(e,t,i)&&!r[ke(i)]){let s=new P([],{});o[ke(i)]=s}return m(m({},r),o)}function xC(e,t){let n={};n[b]=t;for(let r of e)if(r.path===""&&ke(r)!==b){let o=new P([],{});n[ke(r)]=o}return n}function MC(e,t,n){return n.some(r=>pi(e,t,r)&&ke(r)!==b)}function TC(e,t,n){return n.some(r=>pi(e,t,r))}function pi(e,t,n){return(e.hasChildren()||t.length>0)&&n.pathMatch==="full"?!1:n.path===""}function _C(e,t,n){return t.length===0&&!e.children[n]}var Lc=class{};function NC(e,t,n,r,o,i,s="emptyOnly"){return new jc(e,t,n,r,o,s,i).recognize()}var AC=31,jc=class{constructor(t,n,r,o,i,s,a){this.injector=t,this.configLoader=n,this.rootComponentType=r,this.config=o,this.urlTree=i,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.applyRedirects=new kc(this.urlSerializer,this.urlTree),this.absoluteRedirectCount=0,this.allowRedirects=!0}noMatchError(t){return new v(4002,`'${t.segmentGroup}'`)}recognize(){let t=Th(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(t).pipe(S(({children:n,rootSnapshot:r})=>{let o=new ye(r,n),i=new ui("",o),s=Vw(r,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,i.url=this.urlSerializer.serialize(s),{state:i,tree:s}}))}match(t){let n=new _n([],Object.freeze({}),Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),b,this.rootComponentType,null,{});return this.processSegmentGroup(this.injector,this.config,t,b,n).pipe(S(r=>({children:r,rootSnapshot:n})),lt(r=>{if(r instanceof Ir)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof br?this.noMatchError(r):r}))}processSegmentGroup(t,n,r,o,i){return r.segments.length===0&&r.hasChildren()?this.processChildren(t,n,r,i):this.processSegment(t,n,r,r.segments,o,!0,i).pipe(S(s=>s instanceof ye?[s]:[]))}processChildren(t,n,r,o){let i=[];for(let s of Object.keys(r.children))s==="primary"?i.unshift(s):i.push(s);return z(i).pipe(en(s=>{let a=r.children[s],c=Ww(n,s);return this.processSegmentGroup(t,c,a,s,o)}),Gi((s,a)=>(s.push(...a),s)),dt(null),qi(),W(s=>{if(s===null)return xn(r);let a=ep(s);return RC(a),y(a)}))}processSegment(t,n,r,o,i,s,a){return z(n).pipe(en(c=>this.processSegmentAgainstRoute(c._injector??t,n,c,r,o,i,s,a).pipe(lt(u=>{if(u instanceof br)return y(null);throw u}))),Le(c=>!!c),lt(c=>{if(Kh(c))return _C(r,o,i)?y(new Lc):xn(r);throw c}))}processSegmentAgainstRoute(t,n,r,o,i,s,a,c){return ke(r)!==s&&(s===b||!pi(o,i,r))?xn(o):r.redirectTo===void 0?this.matchSegmentAgainstRoute(t,o,r,i,s,c):this.allowRedirects&&a?this.expandSegmentAgainstRouteUsingRedirect(t,o,n,r,i,s,c):xn(o)}expandSegmentAgainstRouteUsingRedirect(t,n,r,o,i,s,a){let{matched:c,parameters:u,consumedSegments:l,positionalParamSegments:d,remainingSegments:h}=Xh(n,o,i);if(!c)return xn(n);typeof o.redirectTo=="string"&&o.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>AC&&(this.allowRedirects=!1));let f=new _n(i,u,Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,_h(o),ke(o),o.component??o._loadedComponent??null,o,Nh(o)),g=ci(f,a,this.paramsInheritanceStrategy);f.params=Object.freeze(g.params),f.data=Object.freeze(g.data);let T=this.applyRedirects.applyRedirectCommands(l,o.redirectTo,d,f,t);return this.applyRedirects.lineralizeSegments(o,T).pipe(W(L=>this.processSegment(t,r,n,L.concat(h),s,!1,a)))}matchSegmentAgainstRoute(t,n,r,o,i,s){let a=IC(n,r,o,t,this.urlSerializer);return r.path==="**"&&(n.children={}),a.pipe(ce(c=>c.matched?(t=r._injector??t,this.getChildConfig(t,r,o).pipe(ce(({routes:u})=>{let l=r._loadedInjector??t,{parameters:d,consumedSegments:h,remainingSegments:f}=c,g=new _n(h,d,Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,_h(r),ke(r),r.component??r._loadedComponent??null,r,Nh(r)),T=ci(g,s,this.paramsInheritanceStrategy);g.params=Object.freeze(T.params),g.data=Object.freeze(T.data);let{segmentGroup:L,slicedSegments:B}=Th(n,h,f,u);if(B.length===0&&L.hasChildren())return this.processChildren(l,u,L,g).pipe(S(ie=>new ye(g,ie)));if(u.length===0&&B.length===0)return y(new ye(g,[]));let oe=ke(r)===i;return this.processSegment(l,u,L,B,oe?b:i,!0,g).pipe(S(ie=>new ye(g,ie instanceof ye?[ie]:[])))}))):xn(n)))}getChildConfig(t,n,r){return n.children?y({routes:n.children,injector:t}):n.loadChildren?n._loadedRoutes!==void 0?y({routes:n._loadedRoutes,injector:n._loadedInjector}):DC(t,n,r,this.urlSerializer).pipe(W(o=>o?this.configLoader.loadChildren(t,n).pipe(J(i=>{n._loadedRoutes=i.routes,n._loadedInjector=i.injector})):bC(n))):y({routes:[],injector:t})}};function RC(e){e.sort((t,n)=>t.value.outlet===b?-1:n.value.outlet===b?1:t.value.outlet.localeCompare(n.value.outlet))}function OC(e){let t=e.value.routeConfig;return t&&t.path===""}function ep(e){let t=[],n=new Set;for(let r of e){if(!OC(r)){t.push(r);continue}let o=t.find(i=>r.value.routeConfig===i.value.routeConfig);o!==void 0?(o.children.push(...r.children),n.add(o)):t.push(r)}for(let r of n){let o=ep(r.children);t.push(new ye(r.value,o))}return t.filter(r=>!n.has(r))}function _h(e){return e.data||{}}function Nh(e){return e.resolve||{}}function PC(e,t,n,r,o,i){return W(s=>NC(e,t,n,r,s.extractedUrl,o,i).pipe(S(({state:a,tree:c})=>$(m({},s),{targetSnapshot:a,urlAfterRedirects:c}))))}function kC(e,t){return W(n=>{let{targetSnapshot:r,guards:{canActivateChecks:o}}=n;if(!o.length)return y(n);let i=new Set(o.map(c=>c.route)),s=new Set;for(let c of i)if(!s.has(c))for(let u of tp(c))s.add(u);let a=0;return z(s).pipe(en(c=>i.has(c)?FC(c,r,e,t):(c.data=ci(c,c.parent,e).resolve,y(void 0))),J(()=>a++),tn(1),W(c=>a===s.size?y(n):pe))})}function tp(e){let t=e.children.map(n=>tp(n)).flat();return[e,...t]}function FC(e,t,n,r){let o=e.routeConfig,i=e._resolve;return o?.title!==void 0&&!Wh(o)&&(i[Er]=o.title),LC(i,e,t,r).pipe(S(s=>(e._resolvedData=s,e.data=ci(e,e.parent,n).resolve,null)))}function LC(e,t,n,r){let o=pc(e);if(o.length===0)return y({});let i={};return z(o).pipe(W(s=>jC(e[s],t,n,r).pipe(Le(),J(a=>{if(a instanceof Cr)throw li(new gr,a);i[s]=a}))),tn(1),zi(i),lt(s=>Kh(s)?pe:Kt(s)))}function jC(e,t,n,r){let o=Sr(t)??r,i=Pn(e,o),s=i.resolve?i.resolve(t,n):et(o,()=>i(t,n));return yt(s)}function fc(e){return ce(t=>{let n=e(t);return n?z(n).pipe(S(()=>t)):y(t)})}var np=(()=>{class e{buildTitle(n){let r,o=n.root;for(;o!==void 0;)r=this.getResolvedTitleForRoute(o)??r,o=o.children.find(i=>i.outlet===b);return r}getResolvedTitleForRoute(n){return n.data[Er]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p(VC),providedIn:"root"})}}return e})(),VC=(()=>{class e extends np{constructor(n){super(),this.title=n}updateTitle(n){let r=this.buildTitle(n);r!==void 0&&this.title.setTitle(r)}static{this.\u0275fac=function(r){return new(r||e)(M(Ih))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),zc=new E("",{providedIn:"root",factory:()=>({})}),BC=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=Y({type:e,selectors:[["ng-component"]],standalone:!0,features:[Q],decls:1,vars:0,template:function(r,o){r&1&&V(0,"router-outlet")},dependencies:[Hc],encapsulation:2})}}return e})();function qc(e){let t=e.children&&e.children.map(qc),n=t?$(m({},e),{children:t}):m({},e);return!n.component&&!n.loadComponent&&(t||n.loadChildren)&&n.outlet&&n.outlet!==b&&(n.component=BC),n}var Gc=new E(""),$C=(()=>{class e{constructor(){this.componentLoaders=new WeakMap,this.childrenLoaders=new WeakMap,this.compiler=p(Za)}loadComponent(n){if(this.componentLoaders.get(n))return this.componentLoaders.get(n);if(n._loadedComponent)return y(n._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(n);let r=yt(n.loadComponent()).pipe(S(rp),J(i=>{this.onLoadEndListener&&this.onLoadEndListener(n),n._loadedComponent=i}),jn(()=>{this.componentLoaders.delete(n)})),o=new Qt(r,()=>new te).pipe(Yt());return this.componentLoaders.set(n,o),o}loadChildren(n,r){if(this.childrenLoaders.get(r))return this.childrenLoaders.get(r);if(r._loadedRoutes)return y({routes:r._loadedRoutes,injector:r._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(r);let i=HC(r,this.compiler,n,this.onLoadEndListener).pipe(jn(()=>{this.childrenLoaders.delete(r)})),s=new Qt(i,()=>new te).pipe(Yt());return this.childrenLoaders.set(r,s),s}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function HC(e,t,n,r){return yt(e.loadChildren()).pipe(S(rp),W(o=>o instanceof Yn||Array.isArray(o)?y(o):z(t.compileModuleAsync(o))),S(o=>{r&&r(e);let i,s,a=!1;return Array.isArray(o)?(s=o,a=!0):(i=o.create(n).injector,s=i.get(Gc,[],{optional:!0,self:!0}).flat()),{routes:s.map(qc),injector:i}}))}function UC(e){return e&&typeof e=="object"&&"default"in e}function rp(e){return UC(e)?e.default:e}var Wc=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p(zC),providedIn:"root"})}}return e})(),zC=(()=>{class e{shouldProcessUrl(n){return!0}extract(n){return n}merge(n,r){return n}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),qC=new E("");var GC=new E(""),WC=(()=>{class e{get hasRequestedNavigation(){return this.navigationId!==0}constructor(){this.currentNavigation=null,this.currentTransition=null,this.lastSuccessfulNavigation=null,this.events=new te,this.transitionAbortSubject=new te,this.configLoader=p($C),this.environmentInjector=p(be),this.urlSerializer=p(Bc),this.rootContexts=p(hi),this.location=p(ir),this.inputBindingEnabled=p(Uc,{optional:!0})!==null,this.titleStrategy=p(np),this.options=p(zc,{optional:!0})||{},this.paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly",this.urlHandlingStrategy=p(Wc),this.createViewTransition=p(qC,{optional:!0}),this.navigationErrorHandler=p(GC,{optional:!0}),this.navigationId=0,this.afterPreactivation=()=>y(void 0),this.rootComponentType=null;let n=o=>this.events.next(new Ic(o)),r=o=>this.events.next(new Ec(o));this.configLoader.onLoadEndListener=r,this.configLoader.onLoadStartListener=n}complete(){this.transitions?.complete()}handleNavigationRequest(n){let r=++this.navigationId;this.transitions?.next($(m(m({},this.transitions.value),n),{id:r}))}setupNavigations(n,r,o){return this.transitions=new K({id:0,currentUrlTree:r,currentRawUrl:r,extractedUrl:this.urlHandlingStrategy.extract(r),urlAfterRedirects:this.urlHandlingStrategy.extract(r),rawUrl:r,extras:{},resolve:()=>{},reject:()=>{},promise:Promise.resolve(!0),source:hr,restoredState:null,currentSnapshot:o.snapshot,targetSnapshot:null,currentRouterState:o,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null}),this.transitions.pipe(ae(i=>i.id!==0),S(i=>$(m({},i),{extractedUrl:this.urlHandlingStrategy.extract(i.rawUrl)})),ce(i=>{let s=!1,a=!1;return y(i).pipe(ce(c=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",De.SupersededByNewNavigation),pe;this.currentTransition=i,this.currentNavigation={id:c.id,initialUrl:c.rawUrl,extractedUrl:c.extractedUrl,targetBrowserUrl:typeof c.extras.browserUrl=="string"?this.urlSerializer.parse(c.extras.browserUrl):c.extras.browserUrl,trigger:c.source,extras:c.extras,previousNavigation:this.lastSuccessfulNavigation?$(m({},this.lastSuccessfulNavigation),{previousNavigation:null}):null};let u=!n.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),l=c.extras.onSameUrlNavigation??n.onSameUrlNavigation;if(!u&&l!=="reload"){let d="";return this.events.next(new Bt(c.id,this.urlSerializer.serialize(c.rawUrl),d,yc.IgnoredSameUrlNavigation)),c.resolve(!1),pe}if(this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))return y(c).pipe(ce(d=>{let h=this.transitions?.getValue();return this.events.next(new vr(d.id,this.urlSerializer.serialize(d.extractedUrl),d.source,d.restoredState)),h!==this.transitions?.getValue()?pe:Promise.resolve(d)}),PC(this.environmentInjector,this.configLoader,this.rootComponentType,n.config,this.urlSerializer,this.paramsInheritanceStrategy),J(d=>{i.targetSnapshot=d.targetSnapshot,i.urlAfterRedirects=d.urlAfterRedirects,this.currentNavigation=$(m({},this.currentNavigation),{finalUrl:d.urlAfterRedirects});let h=new ii(d.id,this.urlSerializer.serialize(d.extractedUrl),this.urlSerializer.serialize(d.urlAfterRedirects),d.targetSnapshot);this.events.next(h)}));if(u&&this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)){let{id:d,extractedUrl:h,source:f,restoredState:g,extras:T}=c,L=new vr(d,this.urlSerializer.serialize(h),f,g);this.events.next(L);let B=qh(this.rootComponentType).snapshot;return this.currentTransition=i=$(m({},c),{targetSnapshot:B,urlAfterRedirects:h,extras:$(m({},T),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.finalUrl=h,y(i)}else{let d="";return this.events.next(new Bt(c.id,this.urlSerializer.serialize(c.extractedUrl),d,yc.IgnoredByUrlHandlingStrategy)),c.resolve(!1),pe}}),J(c=>{let u=new Dc(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(u)}),S(c=>(this.currentTransition=i=$(m({},c),{guards:eC(c.targetSnapshot,c.currentSnapshot,this.rootContexts)}),i)),dC(this.environmentInjector,c=>this.events.next(c)),J(c=>{if(i.guardsResult=c.guardsResult,c.guardsResult&&typeof c.guardsResult!="boolean")throw li(this.urlSerializer,c.guardsResult);let u=new wc(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot,!!c.guardsResult);this.events.next(u)}),ae(c=>c.guardsResult?!0:(this.cancelNavigationTransition(c,"",De.GuardRejected),!1)),fc(c=>{if(c.guards.canActivateChecks.length)return y(c).pipe(J(u=>{let l=new Cc(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects),u.targetSnapshot);this.events.next(l)}),ce(u=>{let l=!1;return y(u).pipe(kC(this.paramsInheritanceStrategy,this.environmentInjector),J({next:()=>l=!0,complete:()=>{l||this.cancelNavigationTransition(u,"",De.NoDataFromResolver)}}))}),J(u=>{let l=new bc(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects),u.targetSnapshot);this.events.next(l)}))}),fc(c=>{let u=l=>{let d=[];l.routeConfig?.loadComponent&&!l.routeConfig._loadedComponent&&d.push(this.configLoader.loadComponent(l.routeConfig).pipe(J(h=>{l.component=h}),S(()=>{})));for(let h of l.children)d.push(...u(h));return d};return zr(u(c.targetSnapshot.root)).pipe(dt(null),Ye(1))}),fc(()=>this.afterPreactivation()),ce(()=>{let{currentSnapshot:c,targetSnapshot:u}=i,l=this.createViewTransition?.(this.environmentInjector,c.root,u.root);return l?z(l).pipe(S(()=>i)):y(i)}),S(c=>{let u=Yw(n.routeReuseStrategy,c.targetSnapshot,c.currentRouterState);return this.currentTransition=i=$(m({},c),{targetRouterState:u}),this.currentNavigation.targetRouterState=u,i}),J(()=>{this.events.next(new Dr)}),Xw(this.rootContexts,n.routeReuseStrategy,c=>this.events.next(c),this.inputBindingEnabled),Ye(1),J({next:c=>{s=!0,this.lastSuccessfulNavigation=this.currentNavigation,this.events.next(new Fe(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects))),this.titleStrategy?.updateTitle(c.targetRouterState.snapshot),c.resolve(!0)},complete:()=>{s=!0}}),Zi(this.transitionAbortSubject.pipe(J(c=>{throw c}))),jn(()=>{!s&&!a&&this.cancelNavigationTransition(i,"",De.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation=null,this.currentTransition=null)}),lt(c=>{if(a=!0,Qh(c))this.events.next(new st(i.id,this.urlSerializer.serialize(i.extractedUrl),c.message,c.cancellationCode)),Jw(c)?this.events.next(new Rn(c.url,c.navigationBehaviorOptions)):i.resolve(!1);else{let u=new yr(i.id,this.urlSerializer.serialize(i.extractedUrl),c,i.targetSnapshot??void 0);try{let l=et(this.environmentInjector,()=>this.navigationErrorHandler?.(u));if(l instanceof Cr){let{message:d,cancellationCode:h}=li(this.urlSerializer,l);this.events.next(new st(i.id,this.urlSerializer.serialize(i.extractedUrl),d,h)),this.events.next(new Rn(l.redirectTo,l.navigationBehaviorOptions))}else{this.events.next(u);let d=n.errorHandler(c);i.resolve(!!d)}}catch(l){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(l)}}return pe}))}))}cancelNavigationTransition(n,r,o){let i=new st(n.id,this.urlSerializer.serialize(n.extractedUrl),r,o);this.events.next(i),n.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let n=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),r=this.currentNavigation?.targetBrowserUrl??this.currentNavigation?.extractedUrl;return n.toString()!==r?.toString()&&!this.currentNavigation?.extras.skipLocationChange}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function ZC(e){return e!==hr}var YC=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p(QC),providedIn:"root"})}}return e})(),Vc=class{shouldDetach(t){return!1}store(t,n){}shouldAttach(t){return!1}retrieve(t){return null}shouldReuseRoute(t,n){return t.routeConfig===n.routeConfig}},QC=(()=>{class e extends Vc{static{this.\u0275fac=(()=>{let n;return function(o){return(n||(n=wa(e)))(o||e)}})()}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),op=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p(KC),providedIn:"root"})}}return e})(),KC=(()=>{class e extends op{constructor(){super(...arguments),this.location=p(ir),this.urlSerializer=p(Bc),this.options=p(zc,{optional:!0})||{},this.canceledNavigationResolution=this.options.canceledNavigationResolution||"replace",this.urlHandlingStrategy=p(Wc),this.urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred",this.currentUrlTree=new at,this.rawUrlTree=this.currentUrlTree,this.currentPageId=0,this.lastSuccessfulId=-1,this.routerState=qh(null),this.stateMemento=this.createStateMemento()}getCurrentUrlTree(){return this.currentUrlTree}getRawUrlTree(){return this.rawUrlTree}restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}getRouterState(){return this.routerState}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}registerNonRouterCurrentEntryChangeListener(n){return this.location.subscribe(r=>{r.type==="popstate"&&n(r.url,r.state)})}handleRouterEvent(n,r){if(n instanceof vr)this.stateMemento=this.createStateMemento();else if(n instanceof Bt)this.rawUrlTree=r.initialUrl;else if(n instanceof ii){if(this.urlUpdateStrategy==="eager"&&!r.extras.skipLocationChange){let o=this.urlHandlingStrategy.merge(r.finalUrl,r.initialUrl);this.setBrowserUrl(r.targetBrowserUrl??o,r)}}else n instanceof Dr?(this.currentUrlTree=r.finalUrl,this.rawUrlTree=this.urlHandlingStrategy.merge(r.finalUrl,r.initialUrl),this.routerState=r.targetRouterState,this.urlUpdateStrategy==="deferred"&&!r.extras.skipLocationChange&&this.setBrowserUrl(r.targetBrowserUrl??this.rawUrlTree,r)):n instanceof st&&(n.code===De.GuardRejected||n.code===De.NoDataFromResolver)?this.restoreHistory(r):n instanceof yr?this.restoreHistory(r,!0):n instanceof Fe&&(this.lastSuccessfulId=n.id,this.currentPageId=this.browserPageId)}setBrowserUrl(n,r){let o=n instanceof at?this.urlSerializer.serialize(n):n;if(this.location.isCurrentPathEqualTo(o)||r.extras.replaceUrl){let i=this.browserPageId,s=m(m({},r.extras.state),this.generateNgRouterState(r.id,i));this.location.replaceState(o,"",s)}else{let i=m(m({},r.extras.state),this.generateNgRouterState(r.id,this.browserPageId+1));this.location.go(o,"",i)}}restoreHistory(n,r=!1){if(this.canceledNavigationResolution==="computed"){let o=this.browserPageId,i=this.currentPageId-o;i!==0?this.location.historyGo(i):this.currentUrlTree===n.finalUrl&&i===0&&(this.resetState(n),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(r&&this.resetState(n),this.resetUrlToCurrentUrlTree())}resetState(n){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,n.finalUrl??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(n,r){return this.canceledNavigationResolution==="computed"?{navigationId:n,\u0275routerPageId:r}:{navigationId:n}}static{this.\u0275fac=(()=>{let n;return function(o){return(n||(n=wa(e)))(o||e)}})()}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),dr=function(e){return e[e.COMPLETE=0]="COMPLETE",e[e.FAILED=1]="FAILED",e[e.REDIRECTING=2]="REDIRECTING",e}(dr||{});function JC(e,t){e.events.pipe(ae(n=>n instanceof Fe||n instanceof st||n instanceof yr||n instanceof Bt),S(n=>n instanceof Fe||n instanceof Bt?dr.COMPLETE:(n instanceof st?n.code===De.Redirect||n.code===De.SupersededByNewNavigation:!1)?dr.REDIRECTING:dr.FAILED),ae(n=>n!==dr.REDIRECTING),Ye(1)).subscribe(()=>{t()})}function XC(e){throw e}var eb={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},tb={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},kn=(()=>{class e{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}constructor(){this.disposed=!1,this.console=p(Wo),this.stateManager=p(op),this.options=p(zc,{optional:!0})||{},this.pendingTasks=p(Dn),this.urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred",this.navigationTransitions=p(WC),this.urlSerializer=p(Bc),this.location=p(ir),this.urlHandlingStrategy=p(Wc),this._events=new te,this.errorHandler=this.options.errorHandler||XC,this.navigated=!1,this.routeReuseStrategy=p(YC),this.onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore",this.config=p(Gc,{optional:!0})?.flat()??[],this.componentInputBindingEnabled=!!p(Uc,{optional:!0}),this.eventsSubscription=new U,this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this,this.currentUrlTree,this.routerState).subscribe({error:n=>{this.console.warn(n)}}),this.subscribeToNavigationEvents()}subscribeToNavigationEvents(){let n=this.navigationTransitions.events.subscribe(r=>{try{let o=this.navigationTransitions.currentTransition,i=this.navigationTransitions.currentNavigation;if(o!==null&&i!==null){if(this.stateManager.handleRouterEvent(r,i),r instanceof st&&r.code!==De.Redirect&&r.code!==De.SupersededByNewNavigation)this.navigated=!0;else if(r instanceof Fe)this.navigated=!0;else if(r instanceof Rn){let s=r.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(r.url,o.currentRawUrl),c=m({browserUrl:o.extras.browserUrl,info:o.extras.info,skipLocationChange:o.extras.skipLocationChange,replaceUrl:o.extras.replaceUrl||this.urlUpdateStrategy==="eager"||ZC(o.source)},s);this.scheduleNavigation(a,hr,null,c,{resolve:o.resolve,reject:o.reject,promise:o.promise})}}rb(r)&&this._events.next(r)}catch(o){this.navigationTransitions.transitionAbortSubject.next(o)}});this.eventsSubscription.add(n)}resetRootComponentType(n){this.routerState.root.component=n,this.navigationTransitions.rootComponentType=n}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),hr,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((n,r)=>{setTimeout(()=>{this.navigateToSyncWithBrowser(n,"popstate",r)},0)})}navigateToSyncWithBrowser(n,r,o){let i={replaceUrl:!0},s=o?.navigationId?o:null;if(o){let c=m({},o);delete c.navigationId,delete c.\u0275routerPageId,Object.keys(c).length!==0&&(i.state=c)}let a=this.parseUrl(n);this.scheduleNavigation(a,r,s,i)}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return this.navigationTransitions.currentNavigation}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(n){this.config=n.map(qc),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(n,r={}){let{relativeTo:o,queryParams:i,fragment:s,queryParamsHandling:a,preserveFragment:c}=r,u=c?this.currentUrlTree.fragment:s,l=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":l=m(m({},this.currentUrlTree.queryParams),i);break;case"preserve":l=this.currentUrlTree.queryParams;break;default:l=i||null}l!==null&&(l=this.removeEmptyProps(l));let d;try{let h=o?o.snapshot:this.routerState.snapshot.root;d=$h(h)}catch{(typeof n[0]!="string"||n[0][0]!=="/")&&(n=[]),d=this.currentUrlTree.root}return Hh(d,n,l,u??null)}navigateByUrl(n,r={skipLocationChange:!1}){let o=Vt(n)?n:this.parseUrl(n),i=this.urlHandlingStrategy.merge(o,this.rawUrlTree);return this.scheduleNavigation(i,hr,null,r)}navigate(n,r={skipLocationChange:!1}){return nb(n),this.navigateByUrl(this.createUrlTree(n,r),r)}serializeUrl(n){return this.urlSerializer.serialize(n)}parseUrl(n){try{return this.urlSerializer.parse(n)}catch{return this.urlSerializer.parse("/")}}isActive(n,r){let o;if(r===!0?o=m({},eb):r===!1?o=m({},tb):o=r,Vt(n))return Eh(this.currentUrlTree,n,o);let i=this.parseUrl(n);return Eh(this.currentUrlTree,i,o)}removeEmptyProps(n){return Object.entries(n).reduce((r,[o,i])=>(i!=null&&(r[o]=i),r),{})}scheduleNavigation(n,r,o,i,s){if(this.disposed)return Promise.resolve(!1);let a,c,u;s?(a=s.resolve,c=s.reject,u=s.promise):u=new Promise((d,h)=>{a=d,c=h});let l=this.pendingTasks.add();return JC(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(l))}),this.navigationTransitions.handleNavigationRequest({source:r,restoredState:o,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:n,extras:i,resolve:a,reject:c,promise:u,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),u.catch(d=>Promise.reject(d))}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function nb(e){for(let t=0;t<e.length;t++)if(e[t]==null)throw new v(4008,!1)}function rb(e){return!(e instanceof Dr)&&!(e instanceof Rn)}var fi=(()=>{class e{constructor(n,r,o,i,s,a){this.router=n,this.route=r,this.tabIndexAttribute=o,this.renderer=i,this.el=s,this.locationStrategy=a,this.href=null,this.onChanges=new te,this.preserveFragment=!1,this.skipLocationChange=!1,this.replaceUrl=!1,this.routerLinkInput=null;let c=s.nativeElement.tagName?.toLowerCase();this.isAnchorElement=c==="a"||c==="area",this.isAnchorElement?this.subscription=n.events.subscribe(u=>{u instanceof Fe&&this.updateHref()}):this.setTabIndexIfNotOnNativeEl("0")}setTabIndexIfNotOnNativeEl(n){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",n)}ngOnChanges(n){this.isAnchorElement&&this.updateHref(),this.onChanges.next(this)}set routerLink(n){n==null?(this.routerLinkInput=null,this.setTabIndexIfNotOnNativeEl(null)):(Vt(n)?this.routerLinkInput=n:this.routerLinkInput=Array.isArray(n)?n:[n],this.setTabIndexIfNotOnNativeEl("0"))}onClick(n,r,o,i,s){let a=this.urlTree;if(a===null||this.isAnchorElement&&(n!==0||r||o||i||s||typeof this.target=="string"&&this.target!="_self"))return!0;let c={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(a,c),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let n=this.urlTree;this.href=n!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(n)):null;let r=this.href===null?null:ef(this.href,this.el.nativeElement.tagName.toLowerCase(),"href");this.applyAttributeValue("href",r)}applyAttributeValue(n,r){let o=this.renderer,i=this.el.nativeElement;r!==null?o.setAttribute(i,n,r):o.removeAttribute(i,n)}get urlTree(){return this.routerLinkInput===null?null:Vt(this.routerLinkInput)?this.routerLinkInput:this.router.createUrlTree(this.routerLinkInput,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}static{this.\u0275fac=function(r){return new(r||e)(O(kn),O(ct),Ca("tabindex"),O(rr),O(rt),O(En))}}static{this.\u0275dir=vn({type:e,selectors:[["","routerLink",""]],hostVars:1,hostBindings:function(r,o){r&1&&qa("click",function(s){return o.onClick(s.button,s.ctrlKey,s.shiftKey,s.altKey,s.metaKey)}),r&2&&za("target",o.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",or],skipLocationChange:[2,"skipLocationChange","skipLocationChange",or],replaceUrl:[2,"replaceUrl","replaceUrl",or],routerLink:"routerLink"},standalone:!0,features:[$a,yn]})}}return e})(),ip=(()=>{class e{get isActive(){return this._isActive}constructor(n,r,o,i,s){this.router=n,this.element=r,this.renderer=o,this.cdr=i,this.link=s,this.classes=[],this._isActive=!1,this.routerLinkActiveOptions={exact:!1},this.isActiveChange=new X,this.routerEventsSubscription=n.events.subscribe(a=>{a instanceof Fe&&this.update()})}ngAfterContentInit(){y(this.links.changes,y(null)).pipe(Jt()).subscribe(n=>{this.update(),this.subscribeToEachLinkOnChanges()})}subscribeToEachLinkOnChanges(){this.linkInputChangesSubscription?.unsubscribe();let n=[...this.links.toArray(),this.link].filter(r=>!!r).map(r=>r.onChanges);this.linkInputChangesSubscription=z(n).pipe(Jt()).subscribe(r=>{this._isActive!==this.isLinkActive(this.router)(r)&&this.update()})}set routerLinkActive(n){let r=Array.isArray(n)?n:n.split(" ");this.classes=r.filter(o=>!!o)}ngOnChanges(n){this.update()}ngOnDestroy(){this.routerEventsSubscription.unsubscribe(),this.linkInputChangesSubscription?.unsubscribe()}update(){!this.links||!this.router.navigated||queueMicrotask(()=>{let n=this.hasActiveLinks();this.classes.forEach(r=>{n?this.renderer.addClass(this.element.nativeElement,r):this.renderer.removeClass(this.element.nativeElement,r)}),n&&this.ariaCurrentWhenActive!==void 0?this.renderer.setAttribute(this.element.nativeElement,"aria-current",this.ariaCurrentWhenActive.toString()):this.renderer.removeAttribute(this.element.nativeElement,"aria-current"),this._isActive!==n&&(this._isActive=n,this.cdr.markForCheck(),this.isActiveChange.emit(n))})}isLinkActive(n){let r=ob(this.routerLinkActiveOptions)?this.routerLinkActiveOptions:this.routerLinkActiveOptions.exact||!1;return o=>{let i=o.urlTree;return i?n.isActive(i,r):!1}}hasActiveLinks(){let n=this.isLinkActive(this.router);return this.link&&n(this.link)||this.links.some(n)}static{this.\u0275fac=function(r){return new(r||e)(O(kn),O(rt),O(rr),O(kt),O(fi,8))}}static{this.\u0275dir=vn({type:e,selectors:[["","routerLinkActive",""]],contentQueries:function(r,o,i){if(r&1&&Hf(i,fi,5),r&2){let s;zo(s=qo())&&(o.links=s)}},inputs:{routerLinkActiveOptions:"routerLinkActiveOptions",ariaCurrentWhenActive:"ariaCurrentWhenActive",routerLinkActive:"routerLinkActive"},outputs:{isActiveChange:"isActiveChange"},exportAs:["routerLinkActive"],standalone:!0,features:[yn]})}}return e})();function ob(e){return!!e.paths}var ib=new E("");function sp(e,...t){return No([{provide:Gc,multi:!0,useValue:e},[],{provide:ct,useFactory:sb,deps:[kn]},{provide:Wa,multi:!0,useFactory:ab},t.map(n=>n.\u0275providers)])}function sb(e){return e.routerState.root}function ab(){let e=p(_t);return t=>{let n=e.get(Pt);if(t!==n.components[0])return;let r=e.get(kn),o=e.get(cb);e.get(ub)===1&&r.initialNavigation(),e.get(lb,null,x.Optional)?.setUpPreloading(),e.get(ib,null,x.Optional)?.init(),r.resetRootComponentType(n.componentTypes[0]),o.closed||(o.next(),o.complete(),o.unsubscribe())}}var cb=new E("",{factory:()=>new te}),ub=new E("",{providedIn:"root",factory:()=>1});var lb=new E("");var gi=class e{static \u0275fac=function(n){return new(n||e)};static \u0275cmp=Y({type:e,selectors:[["app-pet-the-cat"]],standalone:!0,features:[Q],decls:1,vars:0,consts:[["src",Xd`https://lizavetay.github.io/pet-the-cat/`]],template:function(n,r){n&1&&V(0,"iframe",0)},styles:["[_nghost-%COMP%]{display:contents}"]})};var ap=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>\u{1F525} Lava Checkbox Challenge</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: #111;
      color: white;
      font-family: sans-serif;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .checkbox-container {
      position: relative;
      padding: 30px;
      transition: transform 0.15s ease-in-out;
      z-index: 2;
    }

    input[type="checkbox"] {
      transform: scale(1.8);
      cursor: pointer;
    }

    label {
      font-size: 1.4rem;
      margin-left: 12px;
      cursor: pointer;
    }

    .teaser {
      margin-top: 20px;
      font-size: 1.4rem;
      color: #ffa500;
      z-index: 2;
    }

    canvas {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      display: none;
    }

    button#reset {
      margin-top: 40px;
      background: #333;
      color: white;
      border: 1px solid #888;
      padding: 10px 20px;
      font-size: 1rem;
      cursor: pointer;
      display: none;
    }
  </style>
</head>
<body>
  <canvas id="volcanoCanvas"></canvas>

  <div class="checkbox-container" id="checkboxBox">
    <input type="checkbox" id="shyCheckbox">
    <label for="shyCheckbox" id="checkboxLabel">Check me... if you dare \u{1F4A3}</label>
  </div>

  <div class="teaser" id="teaserText">\u{1F928} Why would you do that...</div>
  <button id="reset">Reset</button>

  <script>
    const checkbox = document.getElementById('shyCheckbox');
    const checkboxBox = document.getElementById('checkboxBox');
    const label = document.getElementById('checkboxLabel');
    const teaser = document.getElementById('teaserText');
    const canvas = document.getElementById('volcanoCanvas');
    const ctx = canvas.getContext('2d');
    const resetBtn = document.getElementById('reset');

    let isCaught = false;
    let dodgeCount = 0;
    let maxDodge = 6;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    checkboxBox.addEventListener('mouseenter', () => {
      if (isCaught || dodgeCount >= maxDodge) return;
      dodgeCount++;

      const moveX = (Math.random() - 0.5) * 300;
      const moveY = (Math.random() - 0.5) * 200;

      checkboxBox.style.transform = \`translate(\${moveX}px, \${moveY}px) rotate(\${moveX * 0.05}deg)\`;

      // dynamic label reaction
      const phrases = [
        "Nope! \u{1F61C}",
        "Too slow!",
        "I'm warning you...",
        "You asked for it!",
        "\u{1F608} Last chance...",
        "Oh no... \u{1F480}"
      ];
      label.textContent = phrases[dodgeCount - 1] || "OK... now you've done it.";
    });

    checkbox.addEventListener('click', () => {
      if (isCaught) return;
      isCaught = true;
      teaser.textContent = "\u{1F525} Told you not to check it!";
      canvas.style.display = 'block';
      eruptVolcano();
      resetBtn.style.display = 'inline-block';
    });

    function eruptVolcano() {
      const particles = [];
      const gravity = 0.05;
      const colors = ['orange', 'red', 'yellow', 'darkred'];

      function spawnParticle() {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 2;
        particles.push({
          x: canvas.width / 2,
          y: canvas.height - 40,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 8 + 3,
          life: Math.random() * 100 + 60,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      }

      function update() {
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.vy += gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          if (p.life <= 0) particles.splice(i, 1);
        }
      }

      function animate() {
        for (let i = 0; i < 8; i++) spawnParticle();
        update();
        draw();
        if (particles.length < 1000) requestAnimationFrame(animate);
      }

      animate();
    }

    resetBtn.addEventListener('click', () => {
      isCaught = false;
      dodgeCount = 0;
      checkbox.checked = false;
      label.textContent = "Check me... if you dare \u{1F4A3}";
      checkboxBox.style.transform = \`translate(0,0)\`;
      teaser.textContent = "\u{1F928} Why would you do that...";
      canvas.style.display = 'none';
      resetBtn.style.display = 'none';
    });
  <\/script>
</body>
</html>`;var mi=class e{constructor(t){this.sanitizer=t;this.code=t.bypassSecurityTrustHtml(ap)}code;static \u0275fac=function(n){return new(n||e)(O(Pe))};static \u0275cmp=Y({type:e,selectors:[["app-lava-checkbox"]],standalone:!0,features:[Q],decls:1,vars:1,consts:[[3,"srcdoc"]],template:function(n,r){n&1&&V(0,"iframe",0),n&2&&de("srcdoc",r.code,Ge)},styles:["[_nghost-%COMP%]{display:contents}"]})};var cp=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Realistic Form with Multi-Layer CAPTCHA</title>
	<style>
	* {
    box-sizing: border-box;
}

body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #eef1f7;
    font-family: "Arial", sans-serif;
}

.form-container {
    background: #ffffff;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    width: 380px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    color: #333;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

.captcha-box {
    margin-top: 15px;
}

.scratch-area {
    position: relative;
    width: 100%;
    height: 100px;
    border-radius: 5px;
    overflow: hidden;
    border: 2px solid #ccc;
    user-select: none;
    margin-bottom: 4px;
}

.layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.layer span {
    position: absolute;
    width: 100%;
    text-align: center;
    line-height: 100px;
    font-size: 26px;
    font-weight: bold;
    color: #222;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: grab;
    z-index: 1;
}

button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background: #0056b3;
}
	</style>
</head>
<body>
    <div class="form-container">
        <h2 style="text-align: center;">User Registration</h2>
        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" value="jokesters@js.com" placeholder="Enter your email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" value="**********" placeholder="Enter your password">
        </div>
        <div class="form-group captcha-box">
            <label for="codeInput">Scratch This CAPTCHA Area</label>
            <div class="scratch-area">
                <div class="layer active" id="layer1">
                    <canvas id="scratchCanvas1"></canvas>
                    <span id="text1"></span>
                </div>
                <div class="layer" id="layer2" style="display: none;">
                    <canvas id="scratchCanvas2"></canvas>
                    <span id="text2"></span>
                </div>
                <div class="layer" id="layer3" style="display: none;">
                    <canvas id="scratchCanvas3"></canvas>
                    <span id="text3"></span>
                </div>
            </div>
            <input type="text" id="codeInput" placeholder="Enter the CAPTCHA code">
        </div>
        <button onclick="validateCode()">Register</button>
    </div>
    <script>
	const layers = [
    { id: "layer1", color: "#888", nextLayerId: "layer2" },  // Medium-dark gray
    { id: "layer2", color: "#ccc", nextLayerId: "layer3" },  // Light gray
    { id: "layer3", color: "#f0f0f0", isLastLayer: true, secretCode: "JS-JOKESTERS" }  // Off-white
];
const secretCode = layers[2].secretCode;
let currentLayerIndex = 0;
let isDrawing = false;
let scratchPercentage = 0;
let canvas, ctx, container, textSpan;

function setupScratchLayer(layer) {
    container = document.getElementById(layer.id);
    canvas = container.querySelector("canvas");
    ctx = canvas.getContext("2d");
    textSpan = container.querySelector("span");

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    ctx.fillStyle = layer.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < 1000; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * 2;
        ctx.fillStyle = layer.color === "#f0f0f0" ? "#ddd" : layer.color === "#ccc" ? "#aaa" : "#666";
        ctx.fillRect(x, y, size, size);
    }
    ctx.globalAlpha = 1;

    canvas.addEventListener("mousedown", () => isDrawing = true);
    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("touchstart", () => isDrawing = true);
    canvas.addEventListener("touchend", () => isDrawing = false);
    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        scratch(e);
    });
}

function scratch(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    calculateScratchProgress();

    if (scratchPercentage >= 90 && !layers[currentLayerIndex].isLastLayer) {
        container.style.display = "none";
        const nextLayer = document.getElementById(layers[currentLayerIndex].nextLayerId);
        nextLayer.style.display = "block";
        currentLayerIndex++;
        setupScratchLayer(layers[currentLayerIndex]);
    } else if (scratchPercentage >= 90 && layers[currentLayerIndex].isLastLayer) {
        setTimeout(() => {
            textSpan.textContent = secretCode;
        }, 2000);
    }
}

function calculateScratchProgress() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;
    let transparentPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparentPixels++;
    }
    scratchPercentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
}

function validateCode() {
    const userCode = document.getElementById("codeInput").value.trim();
    if (currentLayerIndex === 2 && scratchPercentage >= 70 && userCode === secretCode) {
        alert("Registration Successful!");
    }
}

setupScratchLayer(layers[currentLayerIndex]);<\/script>
</body>
</html>`;var vi=class e{constructor(t){this.sanitizer=t;this.code=t.bypassSecurityTrustHtml(cp)}code;static \u0275fac=function(n){return new(n||e)(O(Pe))};static \u0275cmp=Y({type:e,selectors:[["app-captcha"]],standalone:!0,features:[Q],decls:1,vars:1,consts:[[3,"srcdoc"]],template:function(n,r){n&1&&V(0,"iframe",0),n&2&&de("srcdoc",r.code,Ge)},styles:["[_nghost-%COMP%]{display:contents}"]})};var up=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donate to JS-JOKESTERS</title>
    <style>
	* {
    box-sizing: border-box;
}

body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9e4b7; /* Warm yellow */
    font-family: "Comic Sans MS", "Arial", sans-serif;
}

.donation-container {
    background: #fff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    width: 400px;
    text-align: center;
}

h2 {
    color: #ff4500; /* Bright orange */
    margin-bottom: 10px;
}

p {
    color: #555;
    font-size: 16px;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
    color: #333;
}

input[type="text"] {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 2px dashed #ff4500;
    border-radius: 8px;
    outline: none;
}

.slider-box {
    margin-top: 20px;
}

.slider-container {
    position: relative;
    width: 100%;
    height: 80px;
}

input[type="range"] {
    width: 100%;
    margin: 30px 0;
    -webkit-appearance: none;
    background: #ffd700; /* Gold track */
    height: 12px;
    border-radius: 6px;
    outline: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background: #ff4500; /* Orange thumb */
    border-radius: 50%;
    cursor: grab;
}

.character {
    position: absolute;
    width: 40px;
    height: 40px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="15" r="8" fill="#ff4500"/><rect x="15" y="23" width="10" height="12" fill="#ff4500"/><circle cx="17" cy="13" r="2" fill="white"/><circle cx="23" cy="13" r="2" fill="white"/></svg>') no-repeat center;
    background-size: contain;
    top: -15px;
    transition: left 0.1s ease;
}

.taunt {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #ff4500;
    top: 50px;
    font-weight: bold;
}

.amount-display {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #333;
    top: 0;
    font-weight: bold;
}

button {
    width: 100%;
    padding: 12px;
    font-size: 18px;
    font-weight: bold;
    background: #ff4500;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover:not(:disabled) {
    background: #e5533d;
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.donation-message {
    margin-top: 15px;
    font-size: 16px;
    color: #ff4500;
    font-weight: bold;
}
	</style>
</head>
<body>
    <div class="donation-container">
        <h2>Fund JS-JOKESTERS!</h2>
        <p>Support our quest to build JavaScript comedy bots. Slide to donate!</p>
        <div class="form-group">
            <label for="donorName">Your Name</label>
            <input type="text" id="donorName" value="Generous User" placeholder="Enter your name">
        </div>
        <div class="form-group slider-box">
            <label for="donationSlider">Set Donation (Aim for $80!)</label>
            <div class="slider-container">
                <input type="range" id="donationSlider" min="5" max="100" value="5">
                <div class="character" id="sliderCharacter"></div>
                <div class="taunt" id="tauntText"></div>
                <div class="amount-display" id="amountDisplay">$5</div>
            </div>
        </div>
        <button id="donateButton">Donate Now</button>
        <div class="donation-message" id="donationMessage"></div>
    </div>
    <script>const slider = document.getElementById("donationSlider");
const character = document.getElementById("sliderCharacter");
const tauntText = document.getElementById("tauntText");
const amountDisplay = document.getElementById("amountDisplay");
const donateButton = document.getElementById("donateButton");
const donationMessage = document.getElementById("donationMessage");

const targetValue = 80; // Target donation amount
const maxValue = 100; // Max slider value
let isDragging = false;
let fightBackInterval;
let hasDonated = false; // Track donation state

const taunts = [
    "Joke bots need more!",
    "Cheap code, huh?",
    "Raise it, coder!",
    "I want bigger bucks!",
    "JS deserves better!"
];

// Update slider visuals
function updateSlider() {
    if (hasDonated) return; // Stop if donated
    const sliderRect = slider.getBoundingClientRect();
    const thumbWidth = 24;
    const percent = (slider.value - slider.min) / (slider.max - slider.min);
    const leftPos = percent * (sliderRect.width - thumbWidth);
    character.style.left = \`\${leftPos}px\`;
    amountDisplay.textContent = \`$\${slider.value}\`;
    if (!isDragging && parseInt(slider.value) < maxValue) {
        tauntText.textContent = taunts[Math.floor(Math.random() * taunts.length)];
    }
}

// Fight back by increasing value, stop at max or if donated
function fightBack() {
    if (hasDonated) {
        clearInterval(fightBackInterval);
        return;
    }
    if (!isDragging) {
        const currentValue = parseInt(slider.value);
        if (currentValue < maxValue) {
            const newValue = Math.min(maxValue, currentValue + 2);
            slider.value = newValue;
            updateSlider();
        } else {
            tauntText.textContent = "Maxed out, you big spender!";
            clearInterval(fightBackInterval);
        }
    }
}

// Start dragging
slider.addEventListener("mousedown", () => {
    if (hasDonated) return;
    isDragging = true;
    tauntText.textContent = "Trying to lowball me?";
    clearInterval(fightBackInterval);
});

slider.addEventListener("mouseup", () => {
    if (hasDonated) return;
    isDragging = false;
    updateTaunt();
    if (parseInt(slider.value) < maxValue) {
        fightBackInterval = setInterval(fightBack, 200);
    }
});

slider.addEventListener("input", () => {
    if (hasDonated) return;
    updateSlider();
    updateTaunt();
});

// Touch support
slider.addEventListener("touchstart", () => {
    if (hasDonated) return;
    isDragging = true;
    tauntText.textContent = "Trying to lowball me?";
    clearInterval(fightBackInterval);
});

slider.addEventListener("touchend", () => {
    if (hasDonated) return;
    isDragging = false;
    updateTaunt();
    if (parseInt(slider.value) < maxValue) {
        fightBackInterval = setInterval(fightBack, 200);
    }
});

slider.addEventListener("touchmove", () => {
    if (hasDonated) return;
    updateSlider();
    updateTaunt();
});

// Update taunt based on current value
function updateTaunt() {
    if (hasDonated) return;
    const currentValue = parseInt(slider.value);
    if (Math.abs(currentValue - targetValue) <= 5) {
        tauntText.textContent = \`Nice $\${currentValue}, you rock!\`;
        character.style.background = "url('data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 40 40\\"><circle cx=\\"20\\" cy=\\"15\\" r=\\"8\\" fill=\\"#ff4500\\"/><rect x=\\"15\\" y=\\"23\\" width=\\"10\\" height=\\"12\\" fill=\\"#ff4500\\"/><circle cx=\\"17\\" cy=\\"17\\" r=\\"2\\" fill=\\"white\\"/><circle cx=\\"23\\" cy=\\"17\\" r=\\"2\\" fill=\\"white\\"/></svg>') no-repeat center";
    } else if (currentValue < targetValue) {
        tauntText.textContent = "Too low for JS laughs!";
    } else if (currentValue === maxValue) {
        tauntText.textContent = "Maxed out, you big spender!";
    } else {
        tauntText.textContent = "Close, but aim for $80!";
    }
}

// Initial setup
updateSlider();
fightBackInterval = setInterval(fightBack, 200);

// Donate action with custom laughing message
donateButton.addEventListener("click", () => {
    if (hasDonated) return; // Stop if already donated
    const name = document.getElementById("donorName").value || "Generous User";
    const amount = parseInt(slider.value);
    let laughMessage;
    if (amount < 30) {
        laughMessage = \`HAHAHA! \${name}, you stingy fool, gave $\${amount} to JS-JOKESTERS? Cheap!\`;
    } else if (amount < targetValue) {
        laughMessage = \`HAHAHA! \${name}, you almost-generous fool, gave $\${amount} to JS-JOKESTERS!\`;
    } else if (Math.abs(amount - targetValue) <= 5) {
        laughMessage = \`HAHAHA! \${name}, you perfect fool, gave $\${amount} to JS-JOKESTERS! Spot on!\`;
    } else {
        laughMessage = \`HAHAHA! \${name}, you over-the-top generous fool, gave $\${amount} to JS-JOKESTERS! Wow!\`;
    }
    donationMessage.textContent = laughMessage;
    donateButton.disabled = true;
    slider.disabled = true;
    hasDonated = true; // Mark as donated
    clearInterval(fightBackInterval); // Stop fight back
    tauntText.textContent = "Much obliged, you glorious donor!"; // Polite and funny thank-you
});<\/script>
</body>
</html>`;var yi=class e{constructor(t){this.sanitizer=t;this.code=t.bypassSecurityTrustHtml(up)}code;static \u0275fac=function(n){return new(n||e)(O(Pe))};static \u0275cmp=Y({type:e,selectors:[["app-fund-the-project"]],standalone:!0,features:[Q],decls:1,vars:1,consts:[[3,"srcdoc"]],template:function(n,r){n&1&&V(0,"iframe",0),n&2&&de("srcdoc",r.code,Ge)},styles:["[_nghost-%COMP%]{display:contents}"]})};var lp=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete Your Account - Catch Me!</title>
    <style>
	* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4); /* Wild gradient */
    font-family: "Comic Sans MS", "Arial", sans-serif;
    overflow: hidden;
}

.delete-container {
    text-align: center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

h1 {
    color: #ff1493; /* Hot pink */
    font-size: 36px;
    margin-bottom: 10px;
    text-shadow: 2px 2px #ffd700;
}

p {
    color: #333;
    font-size: 18px;
    margin-bottom: 20px;
}

.chase-area {
    position: relative;
    width: 600px;
    height: 400px;
    background: rgba(255, 255, 255, 0.5);
    border: 3px dashed #ff4500;
    border-radius: 15px;
    overflow: hidden;
}

.runaway-button {
    position: absolute;
    padding: 15px 25px;
    font-size: 18px;
    font-weight: bold;
    background: #ff4500; /* Orange */
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: transform 0.1s ease;
    box-shadow: 0 5px #e5533d;
}

.runaway-button:hover {
    background: #e5533d;
    transform: scale(1.1);
}

.taunt-box {
    margin-top: 20px;
    font-size: 20px;
    color: #ff1493;
    font-weight: bold;
    text-shadow: 1px 1px #fff;
}

.status-message {
    margin-top: 15px;
    font-size: 18px;
    color: #333;
    font-weight: bold;
} 
	</style>
</head>
<body>
    <div class="delete-container">
        <h1>Delete Your Account?</h1>
        <p>Catch the button if you dare!</p>
        <div class="chase-area" id="chaseArea">
            <button id="deleteButton" class="runaway-button">Delete Me!</button>
        </div>
        <div class="taunt-box" id="tauntBox"></div>
        <div class="status-message" id="statusMessage"></div>
    </div>
    <script>
	const chaseArea = document.getElementById("chaseArea");
const deleteButton = document.getElementById("deleteButton");
const tauntBox = document.getElementById("tauntBox");
const statusMessage = document.getElementById("statusMessage");

let buttonX = 0;
let buttonY = 0;
let hasDeleted = false;

const taunts = [
    "Catch me if you can, loser!",
    "Nope, not today!",
    "Run, run, little mouse!",
    "You\u2019ll never delete me!",
    "Too slow, buddy!",
    "I\u2019m outta here!",
    "Haha, good luck!"
];

// Move button to a random position
function moveButton() {
    if (hasDeleted) return;
    const areaWidth = chaseArea.offsetWidth - deleteButton.offsetWidth;
    const areaHeight = chaseArea.offsetHeight - deleteButton.offsetHeight;
    buttonX = Math.floor(Math.random() * areaWidth);
    buttonY = Math.floor(Math.random() * areaHeight);
    deleteButton.style.left = \`\${buttonX}px\`;
    deleteButton.style.top = \`\${buttonY}px\`;
    tauntBox.textContent = taunts[Math.floor(Math.random() * taunts.length)];
}

// Check if cursor is near button
function isNearButton(event) {
    const rect = deleteButton.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const buffer = 50; // Distance to trigger dodge
    return (
        mouseX > rect.left - buffer &&
        mouseX < rect.right + buffer &&
        mouseY > rect.top - buffer &&
        mouseY < rect.bottom + buffer
    );
}

// Dodge on mouse move
chaseArea.addEventListener("mousemove", (event) => {
    if (hasDeleted) return;
    if (isNearButton(event)) {
        moveButton();
    }
});

// Dodge on touch move
chaseArea.addEventListener("touchmove", (event) => {
    if (hasDeleted) return;
    const touch = event.touches[0];
    if (isNearButton({ clientX: touch.clientX, clientY: touch.clientY })) {
        moveButton();
    }
});

// Handle delete when clicked
deleteButton.addEventListener("click", () => {
    if (hasDeleted) return;
    hasDeleted = true;
    deleteButton.style.background = "#ccc";
    deleteButton.style.boxShadow = "none";
    deleteButton.disabled = true;
    tauntBox.textContent = "Oh no, you got me!";
    statusMessage.textContent = "Account deleted! Poof, you\u2019re gone!";
});

// Initial position
moveButton();

// Periodic dodge for extra challenge
setInterval(() => {
    if (!hasDeleted && Math.random() < 0.3) { // 30% chance every second
        moveButton();
    }
}, 1000);
	<\/script>
</body>
</html>`;var Di=class e{constructor(t){this.sanitizer=t;this.code=t.bypassSecurityTrustHtml(lp)}code;static \u0275fac=function(n){return new(n||e)(O(Pe))};static \u0275cmp=Y({type:e,selectors:[["app-catch-button"]],standalone:!0,features:[Q],decls:1,vars:1,consts:[[3,"srcdoc"]],template:function(n,r){n&1&&V(0,"iframe",0),n&2&&de("srcdoc",r.code,Ge)},styles:["[_nghost-%COMP%]{display:contents}"]})};var dp=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Entry Form</title>
    <style>
	* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f5f5f5; /* Light gray background */
    font-family: "Roboto", sans-serif; /* Clean, modern font */
    overflow: hidden;
}

.form-container {
    text-align: center;
    padding: 30px;
    background: #ffffff; /* White container */
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    border: 1px solid #e0e0e0; /* Light border */
}

h1 {
    color: #333; /* Dark gray for text */
    font-size: 32px;
    margin-bottom: 15px;
    font-weight: 700;
}

p {
    color: #666; /* Medium gray */
    font-size: 16px;
    margin-bottom: 20px;
}

.dial-panel {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 25px;
}

.dial {
    width: 50px;
    height: 40px; /* Height matches one number */
    background: linear-gradient(145deg, #f0f0f0, #e0e0e0); /* Light gradient */
    border: 2px solid #4a90e2; /* Soft blue border */
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
    cursor: ns-resize;
}

.dial-numbers {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    font-size: 22px;
    color: #333; /* Dark gray numbers */
    transition: transform 0.15s ease-in-out; /* Smooth scrolling */
}

.dial-numbers span {
    display: block;
    height: 40px; /* Matches dial height */
    line-height: 40px; /* Center vertically */
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
}

#submitButton {
    padding: 12px 25px;
    font-size: 16px;
    background: #4a90e2; /* Soft blue */
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 10px rgba(74, 144, 226, 0.3);
    font-weight: 700;
    letter-spacing: 1px;
}

#submitButton:disabled {
    background: #b0b0b0; /* Gray when disabled */
    box-shadow: none;
    cursor: not-allowed;
}

#submitButton:hover:not(:disabled) {
    background: #357abd; /* Darker blue on hover */
    box-shadow: 0 4px 15px rgba(74, 144, 226, 0.5);
}

.taunt-text {
    margin-top: 20px;
    font-size: 18px;
    color: #e94e77; /* Soft pink for taunts */
    font-weight: 500;
}

.result-message {
    margin-top: 15px;
    font-size: 20px;
    color: #2ecc71; /* Green for success */
    font-weight: 500;
}

.snackbar {
    position: fixed;
    top: 20px;
    right: -300px; /* Hidden off-screen initially */
    background: #333; /* Dark background for snackbar */
    color: #fff;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 15px;
    transition: right 0.3s ease-in-out;
    z-index: 1000;
}

.snackbar.show {
    right: 20px; /* Slide in */
}

#otpMessage {
    font-size: 16px;
}

#otpCode {
    color: #2ecc71; /* Green OTP code */
    font-weight: 700;
}

#otpTimer {
    font-size: 14px;
    color: #ffcc00; /* Yellow for timer */
    margin-left: 10px;
}

#closeSnackbar {
    background: none;
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    padding: 5px;
}

#closeSnackbar:hover {
    color: #e94e77; /* Pink on hover */
}
	</style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="form-container">
        <h1>Enter Your OTP</h1>
        <p>Spin the dials to match the OTP sent to you!</p>
        <div class="dial-panel" id="dialPanel">
            <!-- Dials added via JS -->
        </div>
        <button id="submitButton" disabled>Verify OTP</button>
        <div class="taunt-text" id="tauntText"></div>
        <div class="result-message" id="resultMessage"></div>
    </div>
    <div class="snackbar" id="snackbar">
        <span id="otpMessage">Your OTP is: <strong id="otpCode"></strong></span>
        <span id="otpTimer">Expires in 30s</span>
        <button id="closeSnackbar">\u2715</button>
    </div>
    <audio id="clickSound" src="https://freesound.org/data/previews/245/245645_4052966-lq.mp3"></audio>
    <audio id="failSound" src="https://freesound.org/data/previews/13/13665_155703-lq.mp3"></audio>
    <audio id="successSound" src="https://freesound.org/data/previews/187/187944_2605540-lq.mp3"></audio>
    <script>
		const dialPanel = document.getElementById("dialPanel");
const submitButton = document.getElementById("submitButton");
const tauntText = document.getElementById("tauntText");
const resultMessage = document.getElementById("resultMessage");
const snackbar = document.getElementById("snackbar");
const otpCode = document.getElementById("otpCode");
const otpTimer = document.getElementById("otpTimer");
const closeSnackbar = document.getElementById("closeSnackbar");
const clickSound = document.getElementById("clickSound");
const failSound = document.getElementById("failSound");
const successSound = document.getElementById("successSound");

const otpLength = 6;
let targetOTP = generateOTP();
let dials = [];
let hasSubmitted = false;
let expiryTimeout;
let timerInterval;
let timeLeft = 30; // 30 seconds

const taunts = {
    incorrect: [
        "Spin faster, rookie!",
        "This vault\u2019s laughing at you!",
        "Wrong code, try harder!",
        "My robot cracks better than you!",
        "You\u2019re a total failure!",
        "Hurry up, newbie!",
        "Even bots laugh at this!"
    ],
    correct: [
        "Looking good, cracker!",
        "You\u2019re on the right track!",
        "Almost there, champ!",
        "Nice spin, keep going!",
        "You\u2019ve got this!"
    ]
};

// Generate random 6-digit OTP
function generateOTP() {
    return Array.from({ length: otpLength }, () => Math.floor(Math.random() * 10)).join("");
}

// Show OTP in snackbar with countdown
function showOTP() {
    otpCode.textContent = targetOTP;
    timeLeft = 30; // Reset timer to 30s
    otpTimer.textContent = \`Expires in \${timeLeft}s\`;
    snackbar.classList.add("show");

    // Update timer every second
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the interval at 0
            timeLeft = 0; // Ensure it doesn't go negative
        }
        otpTimer.textContent = \`Expires in \${timeLeft}s\`;
    }, 1000);

    // Expire after 30s
    expiryTimeout = setTimeout(() => {
        if (!hasSubmitted) {
            clearInterval(timerInterval); // Ensure interval is cleared
            snackbar.classList.remove("show");
            targetOTP = generateOTP();
            showOTP(); // Generate and show new OTP
            resultMessage.textContent = "OTP expired! A new code has been generated.";
            resultMessage.style.color = "#e94e77"; // Pink for expiry message
            dials.forEach(dial => {
                const numbers = dial.element.querySelector(".dial-numbers");
                numbers.style.transform = \`translateY(0)\`; // Reset dials to 0
                dial.getValue = () => 0;
            });
            checkCombination();
        }
    }, 30000); // 30s expiry
}

// Create a dial
function createDial(index) {
    const dial = document.createElement("div");
    dial.classList.add("dial");
    const numbers = document.createElement("div");
    numbers.classList.add("dial-numbers");
    for (let i = 0; i < 10; i++) {
        const span = document.createElement("span");
        span.textContent = i;
        numbers.appendChild(span);
    }
    dial.appendChild(numbers);
    dialPanel.appendChild(dial);

    let position = 0; // Current dial position (0-9)
    dial.dataset.index = index;

    // Wheel scroll
    dial.addEventListener("wheel", (event) => {
        if (hasSubmitted) return;
        event.preventDefault();
        const delta = event.deltaY > 0 ? 1 : -1;
        position = scrollDial(delta, position, numbers);
        checkCombination();
        clickSound.play().catch(() => console.log("Click blocked"));
    });

    // Drag scroll
    let isDragging = false;
    let startY;
    let lastDelta = 0;
    dial.addEventListener("mousedown", (event) => {
        if (hasSubmitted) return;
        isDragging = true;
        startY = event.clientY;
        lastDelta = 0;
    });
    document.addEventListener("mousemove", (event) => {
        if (!isDragging || hasSubmitted) return;
        const delta = (startY - event.clientY) / 40; // Match number height
        const deltaChange = Math.floor(delta) - lastDelta;
        if (Math.abs(deltaChange) >= 1) {
            position = scrollDial(deltaChange > 0 ? 1 : -1, position, numbers);
            lastDelta = Math.floor(delta);
            checkCombination();
            clickSound.play().catch(() => console.log("Click blocked"));
        }
    });
    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Touch scroll
    dial.addEventListener("touchstart", (event) => {
        if (hasSubmitted) return;
        startY = event.touches[0].clientY;
        lastDelta = 0;
    });
    dial.addEventListener("touchmove", (event) => {
        if (hasSubmitted) return;
        const delta = (startY - event.touches[0].clientY) / 40;
        const deltaChange = Math.floor(delta) - lastDelta;
        if (Math.abs(deltaChange) >= 1) {
            position = scrollDial(deltaChange > 0 ? 1 : -1, position, numbers);
            lastDelta = Math.floor(delta);
            checkCombination();
            clickSound.play().catch(() => console.log("Click blocked"));
        }
    });

    return { element: dial, getValue: () => position };
}

// Scroll the dial
function scrollDial(direction, currentPos, numbers) {
    const newPos = (currentPos + direction + 10) % 10; // Wrap around 0-9
    numbers.style.transform = \`translateY(-\${newPos * 40}px)\`; // 40px per step

    // Update the dial's position
    const dial = dials.find(d => d.element === numbers.parentElement);
    if (dial) {
        dial.getValue = () => newPos; // Update the getValue function
    }

    // Show taunt based on current combination
    const currentCombo = dials.map(dial => dial.getValue()).join("");
    if (Math.random() < 0.2) { // 20% taunt chance on user scroll
        if (currentCombo === targetOTP) {
            tauntText.textContent = taunts.correct[Math.floor(Math.random() * taunts.correct.length)];
        } else {
            tauntText.textContent = taunts.incorrect[Math.floor(Math.random() * taunts.incorrect.length)];
        }
    }
    return newPos;
}

// Check combination
function checkCombination() {
    const currentCombo = dials.map(dial => dial.getValue()).join("");
    if (currentCombo === targetOTP && !hasSubmitted) {
        submitButton.disabled = false;
        resultMessage.textContent = "OTP matched! Ready to verify!";
    } else {
        submitButton.disabled = true;
        resultMessage.textContent = "";
    }
}

// Submit the OTP
submitButton.addEventListener("click", () => {
    if (hasSubmitted || submitButton.disabled) return;
    hasSubmitted = true;
    clearTimeout(expiryTimeout);
    clearInterval(timerInterval);
    snackbar.classList.remove("show");
    successSound.play().catch(() => console.log("Success blocked"));
    tauntText.textContent = "You\u2019re a master cracker!";
    resultMessage.textContent = \`OTP verified successfully! Access granted!\`;
    submitButton.disabled = true;
    dials.forEach(dial => dial.element.style.borderColor = "#2ecc71"); // Green victory
});

// Close snackbar manually
closeSnackbar.addEventListener("click", () => {
    snackbar.classList.remove("show");
    clearTimeout(expiryTimeout);
    clearInterval(timerInterval);
    targetOTP = generateOTP();
    showOTP(); // Generate and show new OTP
    resultMessage.textContent = "New OTP generated.";
    resultMessage.style.color = "#e94e77"; // Pink for new OTP message
    dials.forEach(dial => {
        const numbers = dial.element.querySelector(".dial-numbers");
        numbers.style.transform = \`translateY(0)\`; // Reset dials to 0
        dial.getValue = () => 0;
    });
    checkCombination();
});

// Initialize dials
for (let i = 0; i < otpLength; i++) {
    dials.push(createDial(i));
}

// Show initial OTP
showOTP();

// Initial taunt
tauntText.textContent = "Enter the OTP, you code cracker!";

// Initial check to ensure button state is correct
checkCombination();
	<\/script>
</body>
</html>`;var wi=class e{constructor(t){this.sanitizer=t;this.code=t.bypassSecurityTrustHtml(dp)}code;static \u0275fac=function(n){return new(n||e)(O(Pe))};static \u0275cmp=Y({type:e,selectors:[["app-otp-dials"]],standalone:!0,features:[Q],decls:1,vars:1,consts:[[3,"srcdoc"]],template:function(n,r){n&1&&V(0,"iframe",0),n&2&&de("srcdoc",r.code,Ge)},styles:["[_nghost-%COMP%]{display:contents}"]})};var Ci=class e{static \u0275fac=function(n){return new(n||e)};static \u0275cmp=Y({type:e,selectors:[["app-squiggly-text"]],standalone:!0,features:[Q],decls:36,vars:0,consts:[["xmlns","http://www.w3.org/2000/svg","id","exadel-text-squiggly"],["id","exadel-text-squiggly-0"],["id","exadel-text-squiggly-turbulence-0","baseFrequency","0.02","numOctaves","3","result","noise","seed","0"],["in","SourceGraphic","in2","noise","scale","6"],["id","exadel-text-squiggly-1"],["id","exadel-text-squiggly-turbulence-1","baseFrequency","0.02","numOctaves","3","result","noise","seed","1"],["in","SourceGraphic","in2","noise","scale","8"],["id","exadel-text-squiggly-2"],["id","exadel-text-squiggly-turbulence-2","baseFrequency","0.02","numOctaves","3","result","noise","seed","2"],["id","exadel-text-squiggly-3"],["id","exadel-text-squiggly-turbulence-3","baseFrequency","0.02","numOctaves","3","result","noise","seed","3"],["id","exadel-text-squiggly-4"],["id","exadel-text-squiggly-turbulence-4","baseFrequency","0.02","numOctaves","3","result","noise","seed","4"],[1,"form-container","with-joke"],["for","name"],["type","text","id","name","required",""],["for","email"],["type","email","id","email","required",""],["for","subject"],["type","text","id","subject","required",""],["type","submit"]],template:function(n,r){n&1&&(pd(),G(0,"svg",0)(1,"style"),Se(2," #exadel-text-squiggly { display: none; } .with-joke :is(h2, label, button, p) { animation: exadel-text-squiggly-animation 0.34s linear infinite; } @keyframes exadel-text-squiggly-animation { 0% {filter: url('#exadel-text-squiggly-0');} 25% {filter: url('#exadel-text-squiggly-1');} 50% {filter: url('#exadel-text-squiggly-2');} 75% {filter: url('#exadel-text-squiggly-3');} 100% {filter: url('#exadel-text-squiggly-4');} } "),H(),G(3,"defs")(4,"filter",1),V(5,"feTurbulence",2)(6,"feDisplacementMap",3),H(),G(7,"filter",4),V(8,"feTurbulence",5)(9,"feDisplacementMap",6),H(),G(10,"filter",7),V(11,"feTurbulence",8)(12,"feDisplacementMap",3),H(),G(13,"filter",9),V(14,"feTurbulence",10)(15,"feDisplacementMap",6),H(),G(16,"filter",11),V(17,"feTurbulence",12)(18,"feDisplacementMap",3),H()()(),gd(),G(19,"div",13)(20,"h2"),Se(21,"Contact Form"),H(),G(22,"form")(23,"label",14),Se(24,"Full Name"),H(),V(25,"input",15),G(26,"label",16),Se(27,"Email Address"),H(),V(28,"input",17),G(29,"label",18),Se(30,"Subject"),H(),V(31,"input",19),G(32,"p"),Se(33," By using our services, you agree to these Terms of Service and accept responsibility for compliance with applicable laws. You must provide accurate information and keep your account details confidential. We reserve all rights to our content, and you may not reuse or distribute any part without explicit permission. Our company is not liable for indirect or consequential damages resulting from your use of our services. We reserve the right to terminate or... "),H(),G(34,"button",20),Se(35,"Send Message"),H()()())},styles:[".form-container[_ngcontent-%COMP%]{background-color:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 12px #0000001a;width:320px;margin-top:2rem}.form-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-top:0;margin-bottom:15px;color:#333;text-align:center}.form-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%], .form-container[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%]{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;box-sizing:border-box}.form-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;padding:10px;background:linear-gradient(90deg,#6a5af9,#d66efd);color:#fff;border:none;border-radius:6px;cursor:pointer;transition:opacity .3s}.form-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{opacity:.8}.form-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]:focus, .form-container[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%]:focus{border-color:#6a5af9;outline:none;box-shadow:0 0 0 3px #6a5af933}"]})};var bi=[{path:"pet-the-cat",component:gi,title:"Pet The Cat"},{path:"lava-checkbox",component:mi,title:"Lava Checkbox"},{path:"captcha",component:vi,title:"Captcha Scratch"},{path:"fund-project",component:yi,title:"Fund The Project"},{path:"catch-button",component:Di,title:"Catch The Button"},{path:"otp-dials",component:wi,title:"OTP Dials"},{path:"squiggly-text",component:Ci,title:"Squiggly Text"}];var fp={providers:[Kf({eventCoalescing:!0}),sp(bi)]};var fb=["content"];function hb(e,t){if(e&1&&(G(0,"li")(1,"a",2),Se(2),H()()),e&2){let n=t.$implicit;nr(),de("routerLink",n.path),nr(),Go(n.title)}}var Ii=class e{constructor(t,n){this.route=t;this.router=n}pageTitle$;routes=bi;content;ngOnInit(){this.pageTitle$=this.router.events.pipe(ae(t=>t instanceof Fe),S(()=>this.route.firstChild),ce(t=>t?.data||y({})),S(t=>(this.content.nativeElement.scrollIntoView({behavior:"smooth",block:"start"}),t[Object.getOwnPropertySymbols(t)[0]])))}static \u0275fac=function(n){return new(n||e)(O(ct),O(kn))};static \u0275cmp=Y({type:e,selectors:[["app-root"]],viewQuery:function(n,r){if(n&1&&Uf(fb,5),n&2){let o;zo(o=qo())&&(r.content=o.first)}},standalone:!0,features:[Q],decls:12,vars:4,consts:[["content",""],[4,"ngFor","ngForOf"],["routerLinkActive","active",3,"routerLink"]],template:function(n,r){n&1&&(G(0,"header")(1,"nav")(2,"h1"),Se(3,"JS Jokesters"),H(),G(4,"ul"),Ua(5,hb,3,2,"li",1),H()()(),G(6,"main")(7,"h2"),Se(8),qf(9,"async"),H(),V(10,"router-outlet",null,0),H()),n&2&&(nr(5),de("ngForOf",r.routes),nr(3),Go(Gf(9,2,r.pageTitle$)))},dependencies:[Hc,fi,hh,fh,ip],styles:["main[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;flex:1}nav[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:0 1rem}ul[_ngcontent-%COMP%]{display:flex;list-style:none;gap:1rem}a[_ngcontent-%COMP%]{color:#00005b;text-decoration:none;font-size:1rem;text-transform:uppercase;font-weight:600;padding:.25rem .75rem;border:1px solid blue;background-color:#efefef;transition:background-color .2s ease}a.active[_ngcontent-%COMP%]{background-color:#00005b;color:#efefef}a[_ngcontent-%COMP%]:hover:not(.active){background-color:#00f;color:#efefef}[_nghost-%COMP%]{display:flex;flex-direction:column}h1[_ngcontent-%COMP%]{margin:0;background:linear-gradient(90deg,#ff6ec4,#7873f5);-webkit-background-clip:text;-webkit-text-fill-color:transparent}h2[_ngcontent-%COMP%]{margin:.75rem}"]})};bh(Ii,fp).catch(e=>console.error(e));
