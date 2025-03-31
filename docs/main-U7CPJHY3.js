var mp=Object.defineProperty,vp=Object.defineProperties;var yp=Object.getOwnPropertyDescriptors;var Yc=Object.getOwnPropertySymbols;var Dp=Object.prototype.hasOwnProperty,wp=Object.prototype.propertyIsEnumerable;var Qc=(e,t,n)=>t in e?mp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||={})Dp.call(t,n)&&Qc(e,n,t[n]);if(Yc)for(var n of Yc(t))wp.call(t,n)&&Qc(e,n,t[n]);return e},$=(e,t)=>vp(e,yp(t));var Mi=null;var Si=1,Kc=Symbol("SIGNAL");function R(e){let t=Mi;return Mi=e,t}function Jc(){return Mi}var Ti={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Cp(e){if(!(Oi(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===Si)){if(!e.producerMustRecompute(e)&&!Ni(e)){e.dirty=!1,e.lastCleanEpoch=Si;return}e.producerRecomputeValue(e),e.dirty=!1,e.lastCleanEpoch=Si}}function _i(e){return e&&(e.nextProducerIndex=0),R(e)}function Xc(e,t){if(R(t),!(!e||e.producerNode===void 0||e.producerIndexOfThis===void 0||e.producerLastReadVersion===void 0)){if(Oi(e))for(let n=e.nextProducerIndex;n<e.producerNode.length;n++)Ri(e.producerNode[n],e.producerIndexOfThis[n]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}function Ni(e){Pi(e);for(let t=0;t<e.producerNode.length;t++){let n=e.producerNode[t],r=e.producerLastReadVersion[t];if(r!==n.version||(Cp(n),r!==n.version))return!0}return!1}function Ai(e){if(Pi(e),Oi(e))for(let t=0;t<e.producerNode.length;t++)Ri(e.producerNode[t],e.producerIndexOfThis[t]);e.producerNode.length=e.producerLastReadVersion.length=e.producerIndexOfThis.length=0,e.liveConsumerNode&&(e.liveConsumerNode.length=e.liveConsumerIndexOfThis.length=0)}function Ri(e,t){if(bp(e),e.liveConsumerNode.length===1&&Ip(e))for(let r=0;r<e.producerNode.length;r++)Ri(e.producerNode[r],e.producerIndexOfThis[r]);let n=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[n],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[n],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let r=e.liveConsumerIndexOfThis[t],o=e.liveConsumerNode[t];Pi(o),o.producerIndexOfThis[r]=t}}function Oi(e){return e.consumerIsAlwaysLive||(e?.liveConsumerNode?.length??0)>0}function Pi(e){e.producerNode??=[],e.producerIndexOfThis??=[],e.producerLastReadVersion??=[]}function bp(e){e.liveConsumerNode??=[],e.liveConsumerIndexOfThis??=[]}function Ip(e){return e.producerNode!==void 0}function Ep(){throw new Error}var xp=Ep;function eu(e){xp=e}function C(e){return typeof e=="function"}function qt(e){let n=e(r=>{Error.call(r),r.stack=new Error().stack});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Mr=qt(e=>function(n){e(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n});function Fn(e,t){if(e){let n=e.indexOf(t);0<=n&&e.splice(n,1)}}var U=class e{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let i of n)i.remove(this);else n.remove(this);let{initialTeardown:r}=this;if(C(r))try{r()}catch(i){t=i instanceof Mr?i.errors:[i]}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let i of o)try{tu(i)}catch(s){t=t??[],s instanceof Mr?t=[...t,...s.errors]:t.push(s)}}if(t)throw new Mr(t)}}add(t){var n;if(t&&t!==this)if(this.closed)tu(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}}_hasParent(t){let{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t}_removeParent(t){let{_parentage:n}=this;n===t?this._parentage=null:Array.isArray(n)&&Fn(n,t)}remove(t){let{_finalizers:n}=this;n&&Fn(n,t),t instanceof e&&t._removeParent(this)}};U.EMPTY=(()=>{let e=new U;return e.closed=!0,e})();var ki=U.EMPTY;function Tr(e){return e instanceof U||e&&"closed"in e&&C(e.remove)&&C(e.add)&&C(e.unsubscribe)}function tu(e){C(e)?e():e.unsubscribe()}var Ae={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Gt={setTimeout(e,t,...n){let{delegate:r}=Gt;return r?.setTimeout?r.setTimeout(e,t,...n):setTimeout(e,t,...n)},clearTimeout(e){let{delegate:t}=Gt;return(t?.clearTimeout||clearTimeout)(e)},delegate:void 0};function _r(e){Gt.setTimeout(()=>{let{onUnhandledError:t}=Ae;if(t)t(e);else throw e})}function Ln(){}var nu=Fi("C",void 0,void 0);function ru(e){return Fi("E",void 0,e)}function ou(e){return Fi("N",e,void 0)}function Fi(e,t,n){return{kind:e,value:t,error:n}}var wt=null;function Wt(e){if(Ae.useDeprecatedSynchronousErrorHandling){let t=!wt;if(t&&(wt={errorThrown:!1,error:null}),e(),t){let{errorThrown:n,error:r}=wt;if(wt=null,n)throw r}}else e()}function iu(e){Ae.useDeprecatedSynchronousErrorHandling&&wt&&(wt.errorThrown=!0,wt.error=e)}var Ct=class extends U{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,Tr(t)&&t.add(this)):this.destination=Tp}static create(t,n,r){return new Zt(t,n,r)}next(t){this.isStopped?ji(ou(t),this):this._next(t)}error(t){this.isStopped?ji(ru(t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?ji(nu,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},Sp=Function.prototype.bind;function Li(e,t){return Sp.call(e,t)}var Vi=class{constructor(t){this.partialObserver=t}next(t){let{partialObserver:n}=this;if(n.next)try{n.next(t)}catch(r){Nr(r)}}error(t){let{partialObserver:n}=this;if(n.error)try{n.error(t)}catch(r){Nr(r)}else Nr(t)}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete()}catch(n){Nr(n)}}},Zt=class extends Ct{constructor(t,n,r){super();let o;if(C(t)||!t)o={next:t??void 0,error:n??void 0,complete:r??void 0};else{let i;this&&Ae.useDeprecatedNextContext?(i=Object.create(t),i.unsubscribe=()=>this.unsubscribe(),o={next:t.next&&Li(t.next,i),error:t.error&&Li(t.error,i),complete:t.complete&&Li(t.complete,i)}):o=t}this.destination=new Vi(o)}};function Nr(e){Ae.useDeprecatedSynchronousErrorHandling?iu(e):_r(e)}function Mp(e){throw e}function ji(e,t){let{onStoppedNotification:n}=Ae;n&&Gt.setTimeout(()=>n(e,t))}var Tp={closed:!0,next:Ln,error:Mp,complete:Ln};var Yt=typeof Symbol=="function"&&Symbol.observable||"@@observable";function he(e){return e}function Bi(...e){return $i(e)}function $i(e){return e.length===0?he:e.length===1?e[0]:function(n){return e.reduce((r,o)=>o(r),n)}}var k=(()=>{class e{constructor(n){n&&(this._subscribe=n)}lift(n){let r=new e;return r.source=this,r.operator=n,r}subscribe(n,r,o){let i=Np(n)?n:new Zt(n,r,o);return Wt(()=>{let{operator:s,source:a}=this;i.add(s?s.call(i,a):a?this._subscribe(i):this._trySubscribe(i))}),i}_trySubscribe(n){try{return this._subscribe(n)}catch(r){n.error(r)}}forEach(n,r){return r=su(r),new r((o,i)=>{let s=new Zt({next:a=>{try{n(a)}catch(c){i(c),s.unsubscribe()}},error:i,complete:o});this.subscribe(s)})}_subscribe(n){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(n)}[Yt](){return this}pipe(...n){return $i(n)(this)}toPromise(n){return n=su(n),new n((r,o)=>{let i;this.subscribe(s=>i=s,s=>o(s),()=>r(i))})}}return e.create=t=>new e(t),e})();function su(e){var t;return(t=e??Ae.Promise)!==null&&t!==void 0?t:Promise}function _p(e){return e&&C(e.next)&&C(e.error)&&C(e.complete)}function Np(e){return e&&e instanceof Ct||_p(e)&&Tr(e)}function Hi(e){return C(e?.lift)}function _(e){return t=>{if(Hi(t))return t.lift(function(n){try{return e(n,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function N(e,t,n,r,o){return new Ui(e,t,n,r,o)}var Ui=class extends Ct{constructor(t,n,r,o,i,s){super(t),this.onFinalize=i,this.shouldUnsubscribe=s,this._next=n?function(a){try{n(a)}catch(c){t.error(c)}}:super._next,this._error=o?function(a){try{o(a)}catch(c){t.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(a){t.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this))}}};function Qt(){return _((e,t)=>{let n=null;e._refCount++;let r=N(t,void 0,void 0,void 0,()=>{if(!e||e._refCount<=0||0<--e._refCount){n=null;return}let o=e._connection,i=n;n=null,o&&(!i||o===i)&&o.unsubscribe(),t.unsubscribe()});e.subscribe(r),r.closed||(n=e.connect())})}var Kt=class extends k{constructor(t,n){super(),this.source=t,this.subjectFactory=n,this._subject=null,this._refCount=0,this._connection=null,Hi(t)&&(this.lift=t.lift)}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){let t=this._subject;return(!t||t.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:t}=this;this._subject=this._connection=null,t?.unsubscribe()}connect(){let t=this._connection;if(!t){t=this._connection=new U;let n=this.getSubject();t.add(this.source.subscribe(N(n,void 0,()=>{this._teardown(),n.complete()},r=>{this._teardown(),n.error(r)},()=>this._teardown()))),t.closed&&(this._connection=null,t=U.EMPTY)}return t}refCount(){return Qt()(this)}};var au=qt(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var te=(()=>{class e extends k{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let r=new Ar(this,this);return r.operator=n,r}_throwIfClosed(){if(this.closed)throw new au}next(n){Wt(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(n)}})}error(n){Wt(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:r}=this;for(;r.length;)r.shift().error(n)}})}complete(){Wt(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:r,isStopped:o,observers:i}=this;return r||o?ki:(this.currentObservers=null,i.push(n),new U(()=>{this.currentObservers=null,Fn(i,n)}))}_checkFinalizedStatuses(n){let{hasError:r,thrownError:o,isStopped:i}=this;r?n.error(o):i&&n.complete()}asObservable(){let n=new k;return n.source=this,n}}return e.create=(t,n)=>new Ar(t,n),e})(),Ar=class extends te{constructor(t,n){super(),this.destination=t,this.source=n}next(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.next)===null||r===void 0||r.call(n,t)}error(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.error)===null||r===void 0||r.call(n,t)}complete(){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||n===void 0||n.call(t)}_subscribe(t){var n,r;return(r=(n=this.source)===null||n===void 0?void 0:n.subscribe(t))!==null&&r!==void 0?r:ki}};var K=class extends te{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){let n=super._subscribe(t);return!n.closed&&t.next(this._value),n}getValue(){let{hasError:t,thrownError:n,_value:r}=this;if(t)throw n;return this._throwIfClosed(),r}next(t){super.next(this._value=t)}};var pe=new k(e=>e.complete());function cu(e){return e&&C(e.schedule)}function uu(e){return e[e.length-1]}function lu(e){return C(uu(e))?e.pop():void 0}function ut(e){return cu(uu(e))?e.pop():void 0}function fu(e,t,n,r){function o(i){return i instanceof n?i:new n(function(s){s(i)})}return new(n||(n=Promise))(function(i,s){function a(l){try{u(r.next(l))}catch(d){s(d)}}function c(l){try{u(r.throw(l))}catch(d){s(d)}}function u(l){l.done?i(l.value):o(l.value).then(a,c)}u((r=r.apply(e,t||[])).next())})}function du(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function bt(e){return this instanceof bt?(this.v=e,this):new bt(e)}function hu(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(e,t||[]),o,i=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),o[Symbol.asyncIterator]=function(){return this},o;function s(f){return function(g){return Promise.resolve(g).then(f,d)}}function a(f,g){r[f]&&(o[f]=function(T){return new Promise(function(j,B){i.push([f,T,j,B])>1||c(f,T)})},g&&(o[f]=g(o[f])))}function c(f,g){try{u(r[f](g))}catch(T){h(i[0][3],T)}}function u(f){f.value instanceof bt?Promise.resolve(f.value.v).then(l,d):h(i[0][2],f)}function l(f){c("next",f)}function d(f){c("throw",f)}function h(f,g){f(g),i.shift(),i.length&&c(i[0][0],i[0][1])}}function pu(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof du=="function"?du(e):e[Symbol.iterator](),n={},r("next"),r("throw"),r("return"),n[Symbol.asyncIterator]=function(){return this},n);function r(i){n[i]=e[i]&&function(s){return new Promise(function(a,c){s=e[i](s),o(a,c,s.done,s.value)})}}function o(i,s,a,c){Promise.resolve(c).then(function(u){i({value:u,done:a})},s)}}var Rr=e=>e&&typeof e.length=="number"&&typeof e!="function";function Or(e){return C(e?.then)}function Pr(e){return C(e[Yt])}function kr(e){return Symbol.asyncIterator&&C(e?.[Symbol.asyncIterator])}function Fr(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Ap(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Lr=Ap();function jr(e){return C(e?.[Lr])}function Vr(e){return hu(this,arguments,function*(){let n=e.getReader();try{for(;;){let{value:r,done:o}=yield bt(n.read());if(o)return yield bt(void 0);yield yield bt(r)}}finally{n.releaseLock()}})}function Br(e){return C(e?.getReader)}function Q(e){if(e instanceof k)return e;if(e!=null){if(Pr(e))return Rp(e);if(Rr(e))return Op(e);if(Or(e))return Pp(e);if(kr(e))return gu(e);if(jr(e))return kp(e);if(Br(e))return Fp(e)}throw Fr(e)}function Rp(e){return new k(t=>{let n=e[Yt]();if(C(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Op(e){return new k(t=>{for(let n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function Pp(e){return new k(t=>{e.then(n=>{t.closed||(t.next(n),t.complete())},n=>t.error(n)).then(null,_r)})}function kp(e){return new k(t=>{for(let n of e)if(t.next(n),t.closed)return;t.complete()})}function gu(e){return new k(t=>{Lp(e,t).catch(n=>t.error(n))})}function Fp(e){return gu(Vr(e))}function Lp(e,t){var n,r,o,i;return fu(this,void 0,void 0,function*(){try{for(n=pu(e);r=yield n.next(),!r.done;){let s=r.value;if(t.next(s),t.closed)return}}catch(s){o={error:s}}finally{try{r&&!r.done&&(i=n.return)&&(yield i.call(n))}finally{if(o)throw o.error}}t.complete()})}function ae(e,t,n,r=0,o=!1){let i=t.schedule(function(){n(),o?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(i),!o)return i}function $r(e,t=0){return _((n,r)=>{n.subscribe(N(r,o=>ae(r,e,()=>r.next(o),t),()=>ae(r,e,()=>r.complete(),t),o=>ae(r,e,()=>r.error(o),t)))})}function Hr(e,t=0){return _((n,r)=>{r.add(e.schedule(()=>n.subscribe(r),t))})}function mu(e,t){return Q(e).pipe(Hr(t),$r(t))}function vu(e,t){return Q(e).pipe(Hr(t),$r(t))}function yu(e,t){return new k(n=>{let r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule())})})}function Du(e,t){return new k(n=>{let r;return ae(n,t,()=>{r=e[Lr](),ae(n,t,()=>{let o,i;try{({value:o,done:i}=r.next())}catch(s){n.error(s);return}i?n.complete():n.next(o)},0,!0)}),()=>C(r?.return)&&r.return()})}function Ur(e,t){if(!e)throw new Error("Iterable cannot be null");return new k(n=>{ae(n,t,()=>{let r=e[Symbol.asyncIterator]();ae(n,t,()=>{r.next().then(o=>{o.done?n.complete():n.next(o.value)})},0,!0)})})}function wu(e,t){return Ur(Vr(e),t)}function Cu(e,t){if(e!=null){if(Pr(e))return mu(e,t);if(Rr(e))return yu(e,t);if(Or(e))return vu(e,t);if(kr(e))return Ur(e,t);if(jr(e))return Du(e,t);if(Br(e))return wu(e,t)}throw Fr(e)}function z(e,t){return t?Cu(e,t):Q(e)}function y(...e){let t=ut(e);return z(e,t)}function Jt(e,t){let n=C(e)?e:()=>e,r=o=>o.error(n());return new k(t?o=>t.schedule(r,0,o):r)}function zi(e){return!!e&&(e instanceof k||C(e.lift)&&C(e.subscribe))}var Ze=qt(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence"});function x(e,t){return _((n,r)=>{let o=0;n.subscribe(N(r,i=>{r.next(e.call(t,i,o++))}))})}var{isArray:jp}=Array;function Vp(e,t){return jp(t)?e(...t):e(t)}function bu(e){return x(t=>Vp(e,t))}var{isArray:Bp}=Array,{getPrototypeOf:$p,prototype:Hp,keys:Up}=Object;function Iu(e){if(e.length===1){let t=e[0];if(Bp(t))return{args:t,keys:null};if(zp(t)){let n=Up(t);return{args:n.map(r=>t[r]),keys:n}}}return{args:e,keys:null}}function zp(e){return e&&typeof e=="object"&&$p(e)===Hp}function Eu(e,t){return e.reduce((n,r,o)=>(n[r]=t[o],n),{})}function zr(...e){let t=ut(e),n=lu(e),{args:r,keys:o}=Iu(e);if(r.length===0)return z([],t);let i=new k(qp(r,t,o?s=>Eu(o,s):he));return n?i.pipe(bu(n)):i}function qp(e,t,n=he){return r=>{xu(t,()=>{let{length:o}=e,i=new Array(o),s=o,a=o;for(let c=0;c<o;c++)xu(t,()=>{let u=z(e[c],t),l=!1;u.subscribe(N(r,d=>{i[c]=d,l||(l=!0,a--),a||r.next(n(i.slice()))},()=>{--s||r.complete()}))},r)},r)}}function xu(e,t,n){e?ae(n,e,t):t()}function Su(e,t,n,r,o,i,s,a){let c=[],u=0,l=0,d=!1,h=()=>{d&&!c.length&&!u&&t.complete()},f=T=>u<r?g(T):c.push(T),g=T=>{i&&t.next(T),u++;let j=!1;Q(n(T,l++)).subscribe(N(t,B=>{o?.(B),i?f(B):t.next(B)},()=>{j=!0},void 0,()=>{if(j)try{for(u--;c.length&&u<r;){let B=c.shift();s?ae(t,s,()=>g(B)):g(B)}h()}catch(B){t.error(B)}}))};return e.subscribe(N(t,f,()=>{d=!0,h()})),()=>{a?.()}}function Y(e,t,n=1/0){return C(t)?Y((r,o)=>x((i,s)=>t(r,i,o,s))(Q(e(r,o))),n):(typeof t=="number"&&(n=t),_((r,o)=>Su(r,o,e,n)))}function Xt(e=1/0){return Y(he,e)}function Mu(){return Xt(1)}function en(...e){return Mu()(z(e,ut(e)))}function qr(e){return new k(t=>{Q(e()).subscribe(t)})}function ce(e,t){return _((n,r)=>{let o=0;n.subscribe(N(r,i=>e.call(t,i,o++)&&r.next(i)))})}function lt(e){return _((t,n)=>{let r=null,o=!1,i;r=t.subscribe(N(n,void 0,void 0,s=>{i=Q(e(s,lt(e)(t))),r?(r.unsubscribe(),r=null,i.subscribe(n)):o=!0})),o&&(r.unsubscribe(),r=null,i.subscribe(n))})}function Tu(e,t,n,r,o){return(i,s)=>{let a=n,c=t,u=0;i.subscribe(N(s,l=>{let d=u++;c=a?e(c,l,d):(a=!0,l),r&&s.next(c)},o&&(()=>{a&&s.next(c),s.complete()})))}}function tn(e,t){return C(t)?Y(e,t,1):Y(e,1)}function dt(e){return _((t,n)=>{let r=!1;t.subscribe(N(n,o=>{r=!0,n.next(o)},()=>{r||n.next(e),n.complete()}))})}function Ye(e){return e<=0?()=>pe:_((t,n)=>{let r=0;t.subscribe(N(n,o=>{++r<=e&&(n.next(o),e<=r&&n.complete())}))})}function qi(e){return x(()=>e)}function Gr(e=Gp){return _((t,n)=>{let r=!1;t.subscribe(N(n,o=>{r=!0,n.next(o)},()=>r?n.complete():n.error(e())))})}function Gp(){return new Ze}function jn(e){return _((t,n)=>{try{t.subscribe(n)}finally{n.add(e)}})}function je(e,t){let n=arguments.length>=2;return r=>r.pipe(e?ce((o,i)=>e(o,i,r)):he,Ye(1),n?dt(t):Gr(()=>new Ze))}function nn(e){return e<=0?()=>pe:_((t,n)=>{let r=[];t.subscribe(N(n,o=>{r.push(o),e<r.length&&r.shift()},()=>{for(let o of r)n.next(o);n.complete()},void 0,()=>{r=null}))})}function Gi(e,t){let n=arguments.length>=2;return r=>r.pipe(e?ce((o,i)=>e(o,i,r)):he,nn(1),n?dt(t):Gr(()=>new Ze))}function Wi(e,t){return _(Tu(e,t,arguments.length>=2,!0))}function Zi(...e){let t=ut(e);return _((n,r)=>{(t?en(e,n,t):en(e,n)).subscribe(r)})}function ue(e,t){return _((n,r)=>{let o=null,i=0,s=!1,a=()=>s&&!o&&r.complete();n.subscribe(N(r,c=>{o?.unsubscribe();let u=0,l=i++;Q(e(c,l)).subscribe(o=N(r,d=>r.next(t?t(c,d,l,u++):d),()=>{o=null,a()}))},()=>{s=!0,a()}))})}function Yi(e){return _((t,n)=>{Q(e).subscribe(N(n,()=>n.complete(),Ln)),!n.closed&&t.subscribe(n)})}function J(e,t,n){let r=C(e)||t||n?{next:e,error:t,complete:n}:e;return r?_((o,i)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;o.subscribe(N(i,c=>{var u;(u=r.next)===null||u===void 0||u.call(r,c),i.next(c)},()=>{var c;a=!1,(c=r.complete)===null||c===void 0||c.call(r),i.complete()},c=>{var u;a=!1,(u=r.error)===null||u===void 0||u.call(r,c),i.error(c)},()=>{var c,u;a&&((c=r.unsubscribe)===null||c===void 0||c.call(r)),(u=r.finalize)===null||u===void 0||u.call(r)}))}):he}var vl="https://g.co/ng/security#xss",v=class extends Error{constructor(t,n){super(na(t,n)),this.code=t}};function na(e,t){return`${`NG0${Math.abs(e)}`}${t?": "+t:""}`}function Mo(e){return{toString:e}.toString()}var Wr="__parameters__";function Wp(e){return function(...n){if(e){let r=e(...n);for(let o in r)this[o]=r[o]}}}function yl(e,t,n){return Mo(()=>{let r=Wp(t);function o(...i){if(this instanceof o)return r.apply(this,i),this;let s=new o(...i);return a.annotation=s,a;function a(c,u,l){let d=c.hasOwnProperty(Wr)?c[Wr]:Object.defineProperty(c,Wr,{value:[]})[Wr];for(;d.length<=l;)d.push(null);return(d[l]=d[l]||[]).push(s),c}}return n&&(o.prototype=Object.create(n.prototype)),o.prototype.ngMetadataName=e,o.annotationCls=o,o})}var Hn=globalThis;function L(e){for(let t in e)if(e[t]===L)return t;throw Error("Could not find renamed property on target object.")}function ge(e){if(typeof e=="string")return e;if(Array.isArray(e))return"["+e.map(ge).join(", ")+"]";if(e==null)return""+e;if(e.overriddenName)return`${e.overriddenName}`;if(e.name)return`${e.name}`;let t=e.toString();if(t==null)return""+t;let n=t.indexOf(`
`);return n===-1?t:t.substring(0,n)}function _u(e,t){return e==null||e===""?t===null?"":t:t==null||t===""?e:e+" "+t}var Zp=L({__forward_ref__:L});function Dl(e){return e.__forward_ref__=Dl,e.toString=function(){return ge(this())},e}function Ce(e){return wl(e)?e():e}function wl(e){return typeof e=="function"&&e.hasOwnProperty(Zp)&&e.__forward_ref__===Dl}function w(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function To(e){return Nu(e,bl)||Nu(e,Il)}function Cl(e){return To(e)!==null}function Nu(e,t){return e.hasOwnProperty(t)?e[t]:null}function Yp(e){let t=e&&(e[bl]||e[Il]);return t||null}function Au(e){return e&&(e.hasOwnProperty(Ru)||e.hasOwnProperty(Qp))?e[Ru]:null}var bl=L({\u0275prov:L}),Ru=L({\u0275inj:L}),Il=L({ngInjectableDef:L}),Qp=L({ngInjectorDef:L}),E=class{constructor(t,n){this._desc=t,this.ngMetadataName="InjectionToken",this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=w({token:this,providedIn:n.providedIn||"root",factory:n.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function El(e){return e&&!!e.\u0275providers}var Kp=L({\u0275cmp:L}),Jp=L({\u0275dir:L}),Xp=L({\u0275pipe:L}),eg=L({\u0275mod:L}),oo=L({\u0275fac:L}),$n=L({__NG_ELEMENT_ID__:L}),Ou=L({__NG_ENV_ID__:L});function Qn(e){return typeof e=="string"?e:e==null?"":String(e)}function tg(e){return typeof e=="function"?e.name||e.toString():typeof e=="object"&&e!=null&&typeof e.type=="function"?e.type.name||e.type.toString():Qn(e)}function ng(e,t){let n=t?`. Dependency path: ${t.join(" > ")} > ${e}`:"";throw new v(-200,e)}function ra(e,t){throw new v(-201,!1)}var S=function(e){return e[e.Default=0]="Default",e[e.Host=1]="Host",e[e.Self=2]="Self",e[e.SkipSelf=4]="SkipSelf",e[e.Optional=8]="Optional",e}(S||{}),os;function xl(){return os}function le(e){let t=os;return os=e,t}function Sl(e,t,n){let r=To(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(n&S.Optional)return null;if(t!==void 0)return t;ra(e,"Injector")}var rg={},Un=rg,is="__NG_DI_FLAG__",io="ngTempTokenPath",og="ngTokenPath",ig=/\n/gm,sg="\u0275",Pu="__source",an;function ag(){return an}function ft(e){let t=an;return an=e,t}function cg(e,t=S.Default){if(an===void 0)throw new v(-203,!1);return an===null?Sl(e,void 0,t):an.get(e,t&S.Optional?null:void 0,t)}function M(e,t=S.Default){return(xl()||cg)(Ce(e),t)}function p(e,t=S.Default){return M(e,_o(t))}function _o(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function ss(e){let t=[];for(let n=0;n<e.length;n++){let r=Ce(e[n]);if(Array.isArray(r)){if(r.length===0)throw new v(900,!1);let o,i=S.Default;for(let s=0;s<r.length;s++){let a=r[s],c=ug(a);typeof c=="number"?c===-1?o=a.token:i|=c:o=a}t.push(M(o,i))}else t.push(M(r))}return t}function Ml(e,t){return e[is]=t,e.prototype[is]=t,e}function ug(e){return e[is]}function lg(e,t,n,r){let o=e[io];throw t[Pu]&&o.unshift(t[Pu]),e.message=dg(`
`+e.message,o,n,r),e[og]=o,e[io]=null,e}function dg(e,t,n,r=null){e=e&&e.charAt(0)===`
`&&e.charAt(1)==sg?e.slice(2):e;let o=ge(t);if(Array.isArray(t))o=t.map(ge).join(" -> ");else if(typeof t=="object"){let i=[];for(let s in t)if(t.hasOwnProperty(s)){let a=t[s];i.push(s+":"+(typeof a=="string"?JSON.stringify(a):ge(a)))}o=`{${i.join(", ")}}`}return`${n}${r?"("+r+")":""}[${o}]: ${e.replace(ig,`
  `)}`}var oa=Ml(yl("Optional"),8);var Tl=Ml(yl("SkipSelf"),4);function Et(e,t){let n=e.hasOwnProperty(oo);return n?e[oo]:null}function fg(e,t,n){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++){let o=e[r],i=t[r];if(n&&(o=n(o),i=n(i)),i!==o)return!1}return!0}function hg(e){return e.flat(Number.POSITIVE_INFINITY)}function ia(e,t){e.forEach(n=>Array.isArray(n)?ia(n,t):t(n))}function _l(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n)}function so(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}var zn={},un=[],ln=new E(""),Nl=new E("",-1),Al=new E(""),ao=class{get(t,n=Un){if(n===Un){let r=new Error(`NullInjectorError: No provider for ${ge(t)}!`);throw r.name="NullInjectorError",r}return n}},Rl=function(e){return e[e.OnPush=0]="OnPush",e[e.Default=1]="Default",e}(Rl||{}),$e=function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e}($e||{}),gt=function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e}(gt||{});function pg(e,t,n){let r=e.length;for(;;){let o=e.indexOf(t,n);if(o===-1)return o;if(o===0||e.charCodeAt(o-1)<=32){let i=t.length;if(o+i===r||e.charCodeAt(o+i)<=32)return o}n=o+1}}function as(e,t,n){let r=0;for(;r<n.length;){let o=n[r];if(typeof o=="number"){if(o!==0)break;r++;let i=n[r++],s=n[r++],a=n[r++];e.setAttribute(t,s,a,i)}else{let i=o,s=n[++r];gg(i)?e.setProperty(t,i,s):e.setAttribute(t,i,s),r++}}return r}function Ol(e){return e===3||e===4||e===6}function gg(e){return e.charCodeAt(0)===64}function sa(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else{let n=-1;for(let r=0;r<t.length;r++){let o=t[r];typeof o=="number"?n=o:n===0||(n===-1||n===2?ku(e,n,o,null,t[++r]):ku(e,n,o,null,null))}}return e}function ku(e,t,n,r,o){let i=0,s=e.length;if(t===-1)s=-1;else for(;i<e.length;){let a=e[i++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=i-1;break}}}for(;i<e.length;){let a=e[i];if(typeof a=="number")break;if(a===n){if(r===null){o!==null&&(e[i+1]=o);return}else if(r===e[i+1]){e[i+2]=o;return}}i++,r!==null&&i++,o!==null&&i++}s!==-1&&(e.splice(s,0,t),i=s+1),e.splice(i++,0,n),r!==null&&e.splice(i++,0,r),o!==null&&e.splice(i++,0,o)}var Pl="ng-template";function mg(e,t,n,r){let o=0;if(r){for(;o<t.length&&typeof t[o]=="string";o+=2)if(t[o]==="class"&&pg(t[o+1].toLowerCase(),n,0)!==-1)return!0}else if(aa(e))return!1;if(o=t.indexOf(1,o),o>-1){let i;for(;++o<t.length&&typeof(i=t[o])=="string";)if(i.toLowerCase()===n)return!0}return!1}function aa(e){return e.type===4&&e.value!==Pl}function vg(e,t,n){let r=e.type===4&&!n?Pl:e.value;return t===r}function yg(e,t,n){let r=4,o=e.attrs,i=o!==null?Cg(o):0,s=!1;for(let a=0;a<t.length;a++){let c=t[a];if(typeof c=="number"){if(!s&&!Re(r)&&!Re(c))return!1;if(s&&Re(c))continue;s=!1,r=c|r&1;continue}if(!s)if(r&4){if(r=2|r&1,c!==""&&!vg(e,c,n)||c===""&&t.length===1){if(Re(r))return!1;s=!0}}else if(r&8){if(o===null||!mg(e,o,c,n)){if(Re(r))return!1;s=!0}}else{let u=t[++a],l=Dg(c,o,aa(e),n);if(l===-1){if(Re(r))return!1;s=!0;continue}if(u!==""){let d;if(l>i?d="":d=o[l+1].toLowerCase(),r&2&&u!==d){if(Re(r))return!1;s=!0}}}}return Re(r)||s}function Re(e){return(e&1)===0}function Dg(e,t,n,r){if(t===null)return-1;let o=0;if(r||!n){let i=!1;for(;o<t.length;){let s=t[o];if(s===e)return o;if(s===3||s===6)i=!0;else if(s===1||s===2){let a=t[++o];for(;typeof a=="string";)a=t[++o];continue}else{if(s===4)break;if(s===0){o+=4;continue}}o+=i?1:2}return-1}else return bg(t,e)}function wg(e,t,n=!1){for(let r=0;r<t.length;r++)if(yg(e,t[r],n))return!0;return!1}function Cg(e){for(let t=0;t<e.length;t++){let n=e[t];if(Ol(n))return t}return e.length}function bg(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let r=e[n];if(typeof r=="number")return-1;if(r===t)return n;n++}return-1}function Fu(e,t){return e?":not("+t.trim()+")":t}function Ig(e){let t=e[0],n=1,r=2,o="",i=!1;for(;n<e.length;){let s=e[n];if(typeof s=="string")if(r&2){let a=e[++n];o+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else r&8?o+="."+s:r&4&&(o+=" "+s);else o!==""&&!Re(s)&&(t+=Fu(i,o),o=""),r=s,i=i||!Re(r);n++}return o!==""&&(t+=Fu(i,o)),t}function Eg(e){return e.map(Ig).join(",")}function xg(e){let t=[],n=[],r=1,o=2;for(;r<e.length;){let i=e[r];if(typeof i=="string")o===2?i!==""&&t.push(i,e[++r]):o===8&&n.push(i);else{if(!Re(o))break;o=i}r++}return{attrs:t,classes:n}}function G(e){return Mo(()=>{let t=Bl(e),n=$(m({},t),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection===Rl.OnPush,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||$e.Emulated,styles:e.styles||un,_:null,schemas:e.schemas||null,tView:null,id:""});$l(n);let r=e.dependencies;return n.directiveDefs=ju(r,!1),n.pipeDefs=ju(r,!0),n.id=Tg(n),n})}function Sg(e){return xt(e)||Fl(e)}function Mg(e){return e!==null}function Lu(e,t){if(e==null)return zn;let n={};for(let r in e)if(e.hasOwnProperty(r)){let o=e[r],i,s,a=gt.None;Array.isArray(o)?(a=o[0],i=o[1],s=o[2]??i):(i=o,s=o),t?(n[i]=a!==gt.None?[r,a]:r,t[i]=s):n[i]=r}return n}function yn(e){return Mo(()=>{let t=Bl(e);return $l(t),t})}function kl(e){return{type:e.type,name:e.name,factory:null,pure:e.pure!==!1,standalone:e.standalone===!0,onDestroy:e.type.prototype.ngOnDestroy||null}}function xt(e){return e[Kp]||null}function Fl(e){return e[Jp]||null}function Ll(e){return e[Xp]||null}function jl(e){let t=xt(e)||Fl(e)||Ll(e);return t!==null?t.standalone:!1}function Vl(e,t){let n=e[eg]||null;if(!n&&t===!0)throw new Error(`Type ${ge(e)} does not have '\u0275mod' property.`);return n}function Bl(e){let t={};return{type:e.type,providersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputTransforms:null,inputConfig:e.inputs||zn,exportAs:e.exportAs||null,standalone:e.standalone===!0,signals:e.signals===!0,selectors:e.selectors||un,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:Lu(e.inputs,t),outputs:Lu(e.outputs),debugInfo:null}}function $l(e){e.features?.forEach(t=>t(e))}function ju(e,t){if(!e)return null;let n=t?Ll:Sg;return()=>(typeof e=="function"?e():e).map(r=>n(r)).filter(Mg)}function Tg(e){let t=0,n=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,e.consts,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery].join("|");for(let o of n)t=Math.imul(31,t)+o.charCodeAt(0)<<0;return t+=2147483648,"c"+t}function No(e){return{\u0275providers:e}}function _g(...e){return{\u0275providers:Hl(!0,e),\u0275fromNgModule:!0}}function Hl(e,...t){let n=[],r=new Set,o,i=s=>{n.push(s)};return ia(t,s=>{let a=s;cs(a,i,[],r)&&(o||=[],o.push(a))}),o!==void 0&&Ul(o,i),n}function Ul(e,t){for(let n=0;n<e.length;n++){let{ngModule:r,providers:o}=e[n];ca(o,i=>{t(i,r)})}}function cs(e,t,n,r){if(e=Ce(e),!e)return!1;let o=null,i=Au(e),s=!i&&xt(e);if(!i&&!s){let c=e.ngModule;if(i=Au(c),i)o=c;else return!1}else{if(s&&!s.standalone)return!1;o=e}let a=r.has(o);if(s){if(a)return!1;if(r.add(o),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let u of c)cs(u,t,n,r)}}else if(i){if(i.imports!=null&&!a){r.add(o);let u;try{ia(i.imports,l=>{cs(l,t,n,r)&&(u||=[],u.push(l))})}finally{}u!==void 0&&Ul(u,t)}if(!a){let u=Et(o)||(()=>new o);t({provide:o,useFactory:u,deps:un},o),t({provide:Al,useValue:o,multi:!0},o),t({provide:ln,useValue:()=>M(o),multi:!0},o)}let c=i.providers;if(c!=null&&!a){let u=e;ca(c,l=>{t(l,u)})}}else return!1;return o!==e&&e.providers!==void 0}function ca(e,t){for(let n of e)El(n)&&(n=n.\u0275providers),Array.isArray(n)?ca(n,t):t(n)}var Ng=L({provide:String,useValue:L});function zl(e){return e!==null&&typeof e=="object"&&Ng in e}function Ag(e){return!!(e&&e.useExisting)}function Rg(e){return!!(e&&e.useFactory)}function us(e){return typeof e=="function"}var Ao=new E(""),Jr={},Og={},Qi;function ua(){return Qi===void 0&&(Qi=new ao),Qi}var Ie=class{},qn=class extends Ie{get destroyed(){return this._destroyed}constructor(t,n,r,o){super(),this.parent=n,this.source=r,this.scopes=o,this.records=new Map,this._ngOnDestroyHooks=new Set,this._onDestroyHooks=[],this._destroyed=!1,ds(t,s=>this.processProvider(s)),this.records.set(Nl,rn(void 0,this)),o.has("environment")&&this.records.set(Ie,rn(void 0,this));let i=this.records.get(Ao);i!=null&&typeof i.value=="string"&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(Al,un,S.Self))}destroy(){this.assertNotDestroyed(),this._destroyed=!0;let t=R(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of n)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),R(t)}}onDestroy(t){return this.assertNotDestroyed(),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){this.assertNotDestroyed();let n=ft(this),r=le(void 0),o;try{return t()}finally{ft(n),le(r)}}get(t,n=Un,r=S.Default){if(this.assertNotDestroyed(),t.hasOwnProperty(Ou))return t[Ou](this);r=_o(r);let o,i=ft(this),s=le(void 0);try{if(!(r&S.SkipSelf)){let c=this.records.get(t);if(c===void 0){let u=Vg(t)&&To(t);u&&this.injectableDefInScope(u)?c=rn(ls(t),Jr):c=null,this.records.set(t,c)}if(c!=null)return this.hydrate(t,c)}let a=r&S.Self?ua():this.parent;return n=r&S.Optional&&n===Un?null:n,a.get(t,n)}catch(a){if(a.name==="NullInjectorError"){if((a[io]=a[io]||[]).unshift(ge(t)),i)throw a;return lg(a,t,"R3InjectorError",this.source)}else throw a}finally{le(s),ft(i)}}resolveInjectorInitializers(){let t=R(null),n=ft(this),r=le(void 0),o;try{let i=this.get(ln,un,S.Self);for(let s of i)s()}finally{ft(n),le(r),R(t)}}toString(){let t=[],n=this.records;for(let r of n.keys())t.push(ge(r));return`R3Injector[${t.join(", ")}]`}assertNotDestroyed(){if(this._destroyed)throw new v(205,!1)}processProvider(t){t=Ce(t);let n=us(t)?t:Ce(t&&t.provide),r=kg(t);if(!us(t)&&t.multi===!0){let o=this.records.get(n);o||(o=rn(void 0,Jr,!0),o.factory=()=>ss(o.multi),this.records.set(n,o)),n=t,o.multi.push(t)}this.records.set(n,r)}hydrate(t,n){let r=R(null);try{return n.value===Jr&&(n.value=Og,n.value=n.factory()),typeof n.value=="object"&&n.value&&jg(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{R(r)}}injectableDefInScope(t){if(!t.providedIn)return!1;let n=Ce(t.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(t){let n=this._onDestroyHooks.indexOf(t);n!==-1&&this._onDestroyHooks.splice(n,1)}};function ls(e){let t=To(e),n=t!==null?t.factory:Et(e);if(n!==null)return n;if(e instanceof E)throw new v(204,!1);if(e instanceof Function)return Pg(e);throw new v(204,!1)}function Pg(e){if(e.length>0)throw new v(204,!1);let n=Yp(e);return n!==null?()=>n.factory(e):()=>new e}function kg(e){if(zl(e))return rn(void 0,e.useValue);{let t=Fg(e);return rn(t,Jr)}}function Fg(e,t,n){let r;if(us(e)){let o=Ce(e);return Et(o)||ls(o)}else if(zl(e))r=()=>Ce(e.useValue);else if(Rg(e))r=()=>e.useFactory(...ss(e.deps||[]));else if(Ag(e))r=()=>M(Ce(e.useExisting));else{let o=Ce(e&&(e.useClass||e.provide));if(Lg(e))r=()=>new o(...ss(e.deps));else return Et(o)||ls(o)}return r}function rn(e,t,n=!1){return{factory:e,value:t,multi:n?[]:void 0}}function Lg(e){return!!e.deps}function jg(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function Vg(e){return typeof e=="function"||typeof e=="object"&&e instanceof E}function ds(e,t){for(let n of e)Array.isArray(n)?ds(n,t):n&&El(n)?ds(n.\u0275providers,t):t(n)}function et(e,t){e instanceof qn&&e.assertNotDestroyed();let n,r=ft(e),o=le(void 0);try{return t()}finally{ft(r),le(o)}}function Bg(){return xl()!==void 0||ag()!=null}function $g(e){return typeof e=="function"}var tt=0,I=1,D=2,ne=3,Oe=4,Pe=5,co=6,uo=7,Qe=8,dn=9,He=10,re=11,Gn=12,Vu=13,Kn=14,Ue=15,St=16,on=17,Ke=18,Ro=19,ql=20,ht=21,Ki=22,be=23,ze=25,Gl=1;var Mt=7,lo=8,fn=9,me=10,fo=function(e){return e[e.None=0]="None",e[e.HasTransplantedViews=2]="HasTransplantedViews",e}(fo||{});function pt(e){return Array.isArray(e)&&typeof e[Gl]=="object"}function nt(e){return Array.isArray(e)&&e[Gl]===!0}function Wl(e){return(e.flags&4)!==0}function Oo(e){return e.componentOffset>-1}function la(e){return(e.flags&1)===1}function Jn(e){return!!e.template}function fs(e){return(e[D]&512)!==0}var hs=class{constructor(t,n,r){this.previousValue=t,this.currentValue=n,this.firstChange=r}isFirstChange(){return this.firstChange}};function Zl(e,t,n,r){t!==null?t.applyValueToInputSignal(t,r):e[n]=r}function Dn(){return Yl}function Yl(e){return e.type.prototype.ngOnChanges&&(e.setInput=Ug),Hg}Dn.ngInherit=!0;function Hg(){let e=Kl(this),t=e?.current;if(t){let n=e.previous;if(n===zn)e.previous=t;else for(let r in t)n[r]=t[r];e.current=null,this.ngOnChanges(t)}}function Ug(e,t,n,r,o){let i=this.declaredInputs[r],s=Kl(e)||zg(e,{previous:zn,current:null}),a=s.current||(s.current={}),c=s.previous,u=c[i];a[i]=new hs(u&&u.currentValue,n,c===zn),Zl(e,t,o,n)}var Ql="__ngSimpleChanges__";function Kl(e){return e[Ql]||null}function zg(e,t){return e[Ql]=t}var Bu=null;var Ve=function(e,t,n){Bu?.(e,t,n)},Jl="svg",qg="math";function qe(e){for(;Array.isArray(e);)e=e[tt];return e}function Gg(e,t){return qe(t[e])}function Ee(e,t){return qe(t[e.index])}function Xl(e,t){return e.data[t]}function Wg(e,t){return e[t]}function vt(e,t){let n=t[e];return pt(n)?n:n[tt]}function Zg(e){return(e[D]&4)===4}function da(e){return(e[D]&128)===128}function Yg(e){return nt(e[ne])}function ho(e,t){return t==null?null:e[t]}function ed(e){e[on]=0}function td(e){e[D]&1024||(e[D]|=1024,da(e)&&ko(e))}function Po(e){return!!(e[D]&9216||e[be]?.dirty)}function ps(e){e[He].changeDetectionScheduler?.notify(8),e[D]&64&&(e[D]|=1024),Po(e)&&ko(e)}function ko(e){e[He].changeDetectionScheduler?.notify(0);let t=Tt(e);for(;t!==null&&!(t[D]&8192||(t[D]|=8192,!da(t)));)t=Tt(t)}function nd(e,t){if((e[D]&256)===256)throw new v(911,!1);e[ht]===null&&(e[ht]=[]),e[ht].push(t)}function Qg(e,t){if(e[ht]===null)return;let n=e[ht].indexOf(t);n!==-1&&e[ht].splice(n,1)}function Tt(e){let t=e[ne];return nt(t)?t[ne]:t}var A={lFrame:dd(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var rd=!1;function Kg(){return A.lFrame.elementDepthCount}function Jg(){A.lFrame.elementDepthCount++}function Xg(){A.lFrame.elementDepthCount--}function od(){return A.bindingsEnabled}function em(){return A.skipHydrationRootTNode!==null}function tm(e){return A.skipHydrationRootTNode===e}function nm(){A.skipHydrationRootTNode=null}function V(){return A.lFrame.lView}function xe(){return A.lFrame.tView}function de(){let e=id();for(;e!==null&&e.type===64;)e=e.parent;return e}function id(){return A.lFrame.currentTNode}function rm(){let e=A.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function Xn(e,t){let n=A.lFrame;n.currentTNode=e,n.isParent=t}function sd(){return A.lFrame.isParent}function om(){A.lFrame.isParent=!1}function ad(){return rd}function $u(e){rd=e}function im(){let e=A.lFrame,t=e.bindingRootIndex;return t===-1&&(t=e.bindingRootIndex=e.tView.bindingStartIndex),t}function sm(e){return A.lFrame.bindingIndex=e}function fa(){return A.lFrame.bindingIndex++}function am(){return A.lFrame.inI18n}function cm(e,t){let n=A.lFrame;n.bindingIndex=n.bindingRootIndex=e,gs(t)}function um(){return A.lFrame.currentDirectiveIndex}function gs(e){A.lFrame.currentDirectiveIndex=e}function cd(){return A.lFrame.currentQueryIndex}function ha(e){A.lFrame.currentQueryIndex=e}function lm(e){let t=e[I];return t.type===2?t.declTNode:t.type===1?e[Pe]:null}function ud(e,t,n){if(n&S.SkipSelf){let o=t,i=e;for(;o=o.parent,o===null&&!(n&S.Host);)if(o=lm(i),o===null||(i=i[Kn],o.type&10))break;if(o===null)return!1;t=o,e=i}let r=A.lFrame=ld();return r.currentTNode=t,r.lView=e,!0}function pa(e){let t=ld(),n=e[I];A.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=!1}function ld(){let e=A.lFrame,t=e===null?null:e.child;return t===null?dd(e):t}function dd(e){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=t),t}function fd(){let e=A.lFrame;return A.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var hd=fd;function ga(){let e=fd();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function ma(){return A.lFrame.selectedIndex}function _t(e){A.lFrame.selectedIndex=e}function pd(){let e=A.lFrame;return Xl(e.tView,e.selectedIndex)}function gd(){A.lFrame.currentNamespace=Jl}function md(){dm()}function dm(){A.lFrame.currentNamespace=null}function fm(){return A.lFrame.currentNamespace}var vd=!0;function va(){return vd}function ya(e){vd=e}function hm(e,t,n){let{ngOnChanges:r,ngOnInit:o,ngDoCheck:i}=t.type.prototype;if(r){let s=Yl(t);(n.preOrderHooks??=[]).push(e,s),(n.preOrderCheckHooks??=[]).push(e,s)}o&&(n.preOrderHooks??=[]).push(0-e,o),i&&((n.preOrderHooks??=[]).push(e,i),(n.preOrderCheckHooks??=[]).push(e,i))}function Da(e,t){for(let n=t.directiveStart,r=t.directiveEnd;n<r;n++){let i=e.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:u,ngOnDestroy:l}=i;s&&(e.contentHooks??=[]).push(-n,s),a&&((e.contentHooks??=[]).push(n,a),(e.contentCheckHooks??=[]).push(n,a)),c&&(e.viewHooks??=[]).push(-n,c),u&&((e.viewHooks??=[]).push(n,u),(e.viewCheckHooks??=[]).push(n,u)),l!=null&&(e.destroyHooks??=[]).push(n,l)}}function Xr(e,t,n){yd(e,t,3,n)}function eo(e,t,n,r){(e[D]&3)===n&&yd(e,t,n,r)}function Ji(e,t){let n=e[D];(n&3)===t&&(n&=16383,n+=1,e[D]=n)}function yd(e,t,n,r){let o=r!==void 0?e[on]&65535:0,i=r??-1,s=t.length-1,a=0;for(let c=o;c<s;c++)if(typeof t[c+1]=="number"){if(a=t[c],r!=null&&a>=r)break}else t[c]<0&&(e[on]+=65536),(a<i||i==-1)&&(pm(e,n,t,c),e[on]=(e[on]&4294901760)+c+2),c++}function Hu(e,t){Ve(4,e,t);let n=R(null);try{t.call(e)}finally{R(n),Ve(5,e,t)}}function pm(e,t,n,r){let o=n[r]<0,i=n[r+1],s=o?-n[r]:n[r],a=e[s];o?e[D]>>14<e[on]>>16&&(e[D]&3)===t&&(e[D]+=16384,Hu(a,i)):Hu(a,i)}var cn=-1,Wn=class{constructor(t,n,r){this.factory=t,this.resolving=!1,this.canSeeViewProviders=n,this.injectImpl=r}};function gm(e){return e instanceof Wn}function mm(e){return(e.flags&8)!==0}function vm(e){return(e.flags&16)!==0}var Xi={},ms=class{constructor(t,n){this.injector=t,this.parentInjector=n}get(t,n,r){r=_o(r);let o=this.injector.get(t,Xi,r);return o!==Xi||n===Xi?o:this.parentInjector.get(t,n,r)}};function Dd(e){return e!==cn}function po(e){return e&32767}function ym(e){return e>>16}function go(e,t){let n=ym(e),r=t;for(;n>0;)r=r[Kn],n--;return r}var vs=!0;function mo(e){let t=vs;return vs=e,t}var Dm=256,wd=Dm-1,Cd=5,wm=0,Be={};function Cm(e,t,n){let r;typeof n=="string"?r=n.charCodeAt(0)||0:n.hasOwnProperty($n)&&(r=n[$n]),r==null&&(r=n[$n]=wm++);let o=r&wd,i=1<<o;t.data[e+(o>>Cd)]|=i}function bd(e,t){let n=Id(e,t);if(n!==-1)return n;let r=t[I];r.firstCreatePass&&(e.injectorIndex=t.length,es(r.data,e),es(t,null),es(r.blueprint,null));let o=wa(e,t),i=e.injectorIndex;if(Dd(o)){let s=po(o),a=go(o,t),c=a[I].data;for(let u=0;u<8;u++)t[i+u]=a[s+u]|c[s+u]}return t[i+8]=o,i}function es(e,t){e.push(0,0,0,0,0,0,0,0,t)}function Id(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function wa(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,r=null,o=t;for(;o!==null;){if(r=Td(o),r===null)return cn;if(n++,o=o[Kn],r.injectorIndex!==-1)return r.injectorIndex|n<<16}return cn}function bm(e,t,n){Cm(e,t,n)}function Im(e,t){if(t==="class")return e.classes;if(t==="style")return e.styles;let n=e.attrs;if(n){let r=n.length,o=0;for(;o<r;){let i=n[o];if(Ol(i))break;if(i===0)o=o+2;else if(typeof i=="number")for(o++;o<r&&typeof n[o]=="string";)o++;else{if(i===t)return n[o+1];o=o+2}}}return null}function Ed(e,t,n){if(n&S.Optional||e!==void 0)return e;ra(t,"NodeInjector")}function xd(e,t,n,r){if(n&S.Optional&&r===void 0&&(r=null),!(n&(S.Self|S.Host))){let o=e[dn],i=le(void 0);try{return o?o.get(t,r,n&S.Optional):Sl(t,r,n&S.Optional)}finally{le(i)}}return Ed(r,t,n)}function Sd(e,t,n,r=S.Default,o){if(e!==null){if(t[D]&2048&&!(r&S.Self)){let s=Mm(e,t,n,r,Be);if(s!==Be)return s}let i=Md(e,t,n,r,Be);if(i!==Be)return i}return xd(t,n,r,o)}function Md(e,t,n,r,o){let i=xm(n);if(typeof i=="function"){if(!ud(t,e,r))return r&S.Host?Ed(o,n,r):xd(t,n,r,o);try{let s;if(s=i(r),s==null&&!(r&S.Optional))ra(n);else return s}finally{hd()}}else if(typeof i=="number"){let s=null,a=Id(e,t),c=cn,u=r&S.Host?t[Ue][Pe]:null;for((a===-1||r&S.SkipSelf)&&(c=a===-1?wa(e,t):t[a+8],c===cn||!zu(r,!1)?a=-1:(s=t[I],a=po(c),t=go(c,t)));a!==-1;){let l=t[I];if(Uu(i,a,l.data)){let d=Em(a,t,n,s,r,u);if(d!==Be)return d}c=t[a+8],c!==cn&&zu(r,t[I].data[a+8]===u)&&Uu(i,a,t)?(s=l,a=po(c),t=go(c,t)):a=-1}}return o}function Em(e,t,n,r,o,i){let s=t[I],a=s.data[e+8],c=r==null?Oo(a)&&vs:r!=s&&(a.type&3)!==0,u=o&S.Host&&i===a,l=to(a,s,n,c,u);return l!==null?hn(t,s,l,a):Be}function to(e,t,n,r,o){let i=e.providerIndexes,s=t.data,a=i&1048575,c=e.directiveStart,u=e.directiveEnd,l=i>>20,d=r?a:a+l,h=o?a+l:u;for(let f=d;f<h;f++){let g=s[f];if(f<c&&n===g||f>=c&&g.type===n)return f}if(o){let f=s[c];if(f&&Jn(f)&&f.type===n)return c}return null}function hn(e,t,n,r){let o=e[n],i=t.data;if(gm(o)){let s=o;s.resolving&&ng(tg(i[n]));let a=mo(s.canSeeViewProviders);s.resolving=!0;let c,u=s.injectImpl?le(s.injectImpl):null,l=ud(e,r,S.Default);try{o=e[n]=s.factory(void 0,i,e,r),t.firstCreatePass&&n>=r.directiveStart&&hm(n,i[n],t)}finally{u!==null&&le(u),mo(a),s.resolving=!1,hd()}}return o}function xm(e){if(typeof e=="string")return e.charCodeAt(0)||0;let t=e.hasOwnProperty($n)?e[$n]:void 0;return typeof t=="number"?t>=0?t&wd:Sm:t}function Uu(e,t,n){let r=1<<e;return!!(n[t+(e>>Cd)]&r)}function zu(e,t){return!(e&S.Self)&&!(e&S.Host&&t)}var It=class{constructor(t,n){this._tNode=t,this._lView=n}get(t,n,r){return Sd(this._tNode,this._lView,t,_o(r),n)}};function Sm(){return new It(de(),V())}function Ca(e){return Mo(()=>{let t=e.prototype.constructor,n=t[oo]||ys(t),r=Object.prototype,o=Object.getPrototypeOf(e.prototype).constructor;for(;o&&o!==r;){let i=o[oo]||ys(o);if(i&&i!==n)return i;o=Object.getPrototypeOf(o)}return i=>new i})}function ys(e){return wl(e)?()=>{let t=ys(Ce(e));return t&&t()}:Et(e)}function Mm(e,t,n,r,o){let i=e,s=t;for(;i!==null&&s!==null&&s[D]&2048&&!(s[D]&512);){let a=Md(i,s,n,r|S.Self,Be);if(a!==Be)return a;let c=i.parent;if(!c){let u=s[ql];if(u){let l=u.get(n,Be,r);if(l!==Be)return l}c=Td(s),s=s[Kn]}i=c}return o}function Td(e){let t=e[I],n=t.type;return n===2?t.declTNode:n===1?e[Pe]:null}function ba(e){return Im(de(),e)}function qu(e,t=null,n=null,r){let o=_d(e,t,n,r);return o.resolveInjectorInitializers(),o}function _d(e,t=null,n=null,r,o=new Set){let i=[n||un,_g(e)];return r=r||(typeof e=="object"?void 0:ge(e)),new qn(i,t||ua(),r||null,o)}var Nt=class e{static{this.THROW_IF_NOT_FOUND=Un}static{this.NULL=new ao}static create(t,n){if(Array.isArray(t))return qu({name:""},n,t,"");{let r=t.name??"";return qu({name:r},t.parent,t.providers,r)}}static{this.\u0275prov=w({token:e,providedIn:"any",factory:()=>M(Nl)})}static{this.__NG_ELEMENT_ID__=-1}};var Tm=new E("");Tm.__NG_ELEMENT_ID__=e=>{let t=de();if(t===null)throw new v(204,!1);if(t.type&2)return t.value;if(e&S.Optional)return null;throw new v(204,!1)};var _m="ngOriginalError";function ts(e){return e[_m]}var Nd=!0,Ad=(()=>{class e{static{this.__NG_ELEMENT_ID__=Nm}static{this.__NG_ENV_ID__=n=>n}}return e})(),Ds=class extends Ad{constructor(t){super(),this._lView=t}onDestroy(t){return nd(this._lView,t),()=>Qg(this._lView,t)}};function Nm(){return new Ds(V())}var wn=(()=>{class e{constructor(){this.taskId=0,this.pendingTasks=new Set,this.hasPendingTasks=new K(!1)}get _hasPendingTasks(){return this.hasPendingTasks.value}add(){this._hasPendingTasks||this.hasPendingTasks.next(!0);let n=this.taskId++;return this.pendingTasks.add(n),n}remove(n){this.pendingTasks.delete(n),this.pendingTasks.size===0&&this._hasPendingTasks&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this._hasPendingTasks&&this.hasPendingTasks.next(!1)}static{this.\u0275prov=w({token:e,providedIn:"root",factory:()=>new e})}}return e})();var ws=class extends te{constructor(t=!1){super(),this.destroyRef=void 0,this.pendingTasks=void 0,this.__isAsync=t,Bg()&&(this.destroyRef=p(Ad,{optional:!0})??void 0,this.pendingTasks=p(wn,{optional:!0})??void 0)}emit(t){let n=R(null);try{super.next(t)}finally{R(n)}}subscribe(t,n,r){let o=t,i=n||(()=>null),s=r;if(t&&typeof t=="object"){let c=t;o=c.next?.bind(c),i=c.error?.bind(c),s=c.complete?.bind(c)}this.__isAsync&&(i=this.wrapInTimeout(i),o&&(o=this.wrapInTimeout(o)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:o,error:i,complete:s});return t instanceof U&&t.add(a),a}wrapInTimeout(t){return n=>{let r=this.pendingTasks?.add();setTimeout(()=>{t(n),r!==void 0&&this.pendingTasks?.remove(r)})}}},X=ws;function vo(...e){}function Rd(e){let t,n;function r(){e=vo;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{e(),r()}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{e(),r()})),()=>r()}function Gu(e){return queueMicrotask(()=>e()),()=>{e=vo}}var Ia="isAngularZone",yo=Ia+"_ID",Am=0,q=class e{constructor(t){this.hasPendingMacrotasks=!1,this.hasPendingMicrotasks=!1,this.isStable=!0,this.onUnstable=new X(!1),this.onMicrotaskEmpty=new X(!1),this.onStable=new X(!1),this.onError=new X(!1);let{enableLongStackTrace:n=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:o=!1,scheduleInRootZone:i=Nd}=t;if(typeof Zone>"u")throw new v(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!o&&r,s.shouldCoalesceRunChangeDetection=o,s.callbackScheduled=!1,s.scheduleInRootZone=i,Pm(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Ia)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new v(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new v(909,!1)}run(t,n,r){return this._inner.run(t,n,r)}runTask(t,n,r,o){let i=this._inner,s=i.scheduleEventTask("NgZoneEvent: "+o,t,Rm,vo,vo);try{return i.runTask(s,n,r)}finally{i.cancelTask(s)}}runGuarded(t,n,r){return this._inner.runGuarded(t,n,r)}runOutsideAngular(t){return this._outer.run(t)}},Rm={};function Ea(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function Om(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function t(){Rd(()=>{e.callbackScheduled=!1,Cs(e),e.isCheckStableRunning=!0,Ea(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{t()}):e._outer.run(()=>{t()}),Cs(e)}function Pm(e){let t=()=>{Om(e)},n=Am++;e._inner=e._inner.fork({name:"angular",properties:{[Ia]:!0,[yo]:n,[yo+n]:!0},onInvokeTask:(r,o,i,s,a,c)=>{if(km(c))return r.invokeTask(i,s,a,c);try{return Wu(e),r.invokeTask(i,s,a,c)}finally{(e.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&t(),Zu(e)}},onInvoke:(r,o,i,s,a,c,u)=>{try{return Wu(e),r.invoke(i,s,a,c,u)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!Fm(c)&&t(),Zu(e)}},onHasTask:(r,o,i,s)=>{r.hasTask(i,s),o===i&&(s.change=="microTask"?(e._hasPendingMicrotasks=s.microTask,Cs(e),Ea(e)):s.change=="macroTask"&&(e.hasPendingMacrotasks=s.macroTask))},onHandleError:(r,o,i,s)=>(r.handleError(i,s),e.runOutsideAngular(()=>e.onError.emit(s)),!1)})}function Cs(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function Wu(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function Zu(e){e._nesting--,Ea(e)}var bs=class{constructor(){this.hasPendingMicrotasks=!1,this.hasPendingMacrotasks=!1,this.isStable=!0,this.onUnstable=new X,this.onMicrotaskEmpty=new X,this.onStable=new X,this.onError=new X}run(t,n,r){return t.apply(n,r)}runGuarded(t,n,r){return t.apply(n,r)}runOutsideAngular(t){return t()}runTask(t,n,r,o){return t.apply(n,r)}};function km(e){return Od(e,"__ignore_ng_zone__")}function Fm(e){return Od(e,"__scheduler_tick__")}function Od(e,t){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[t]===!0}var Je=class{constructor(){this._console=console}handleError(t){let n=this._findOriginalError(t);this._console.error("ERROR",t),n&&this._console.error("ORIGINAL ERROR",n)}_findOriginalError(t){let n=t&&ts(t);for(;n&&ts(n);)n=ts(n);return n||null}},Lm=new E("",{providedIn:"root",factory:()=>{let e=p(q),t=p(Je);return n=>e.runOutsideAngular(()=>t.handleError(n))}});function jm(){return Cn(de(),V())}function Cn(e,t){return new rt(Ee(e,t))}var rt=(()=>{class e{constructor(n){this.nativeElement=n}static{this.__NG_ELEMENT_ID__=jm}}return e})();function Vm(e){return e instanceof rt?e.nativeElement:e}function Bm(){return this._results[Symbol.iterator]()}var Is=class e{get changes(){return this._changes??=new X}constructor(t=!1){this._emitDistinctChangesOnly=t,this.dirty=!0,this._onDirty=void 0,this._results=[],this._changesDetected=!1,this._changes=void 0,this.length=0,this.first=void 0,this.last=void 0;let n=e.prototype;n[Symbol.iterator]||(n[Symbol.iterator]=Bm)}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,n){return this._results.reduce(t,n)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,n){this.dirty=!1;let r=hg(t);(this._changesDetected=!fg(this._results,r,n))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.emit(this)}onDirty(t){this._onDirty=t}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}};function Pd(e){return(e.flags&128)===128}var kd=new Map,$m=0;function Hm(){return $m++}function Um(e){kd.set(e[Ro],e)}function Es(e){kd.delete(e[Ro])}var Yu="__ngContext__";function At(e,t){pt(t)?(e[Yu]=t[Ro],Um(t)):e[Yu]=t}function Fd(e){return jd(e[Gn])}function Ld(e){return jd(e[Oe])}function jd(e){for(;e!==null&&!nt(e);)e=e[Oe];return e}var xs;function Vd(e){xs=e}function Bd(){if(xs!==void 0)return xs;if(typeof document<"u")return document;throw new v(210,!1)}var xa=new E("",{providedIn:"root",factory:()=>zm}),zm="ng",Sa=new E(""),bn=new E("",{providedIn:"platform",factory:()=>"unknown"});var Ma=new E("",{providedIn:"root",factory:()=>Bd().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var qm="h",Gm="b";var Wm=()=>null;function Ta(e,t,n=!1){return Wm(e,t,n)}var $d=!1,Zm=new E("",{providedIn:"root",factory:()=>$d});var Zr;function Hd(){if(Zr===void 0&&(Zr=null,Hn.trustedTypes))try{Zr=Hn.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return Zr}function Fo(e){return Hd()?.createHTML(e)||e}function Ym(e){return Hd()?.createScriptURL(e)||e}var Yr;function Ud(){if(Yr===void 0&&(Yr=null,Hn.trustedTypes))try{Yr=Hn.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return Yr}function Qu(e){return Ud()?.createHTML(e)||e}function Ku(e){return Ud()?.createScriptURL(e)||e}var Xe=class{constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${vl})`}},Ss=class extends Xe{getTypeName(){return"HTML"}},Ms=class extends Xe{getTypeName(){return"Style"}},Ts=class extends Xe{getTypeName(){return"Script"}},_s=class extends Xe{getTypeName(){return"URL"}},Ns=class extends Xe{getTypeName(){return"ResourceURL"}};function Ge(e){return e instanceof Xe?e.changingThisBreaksApplicationSecurity:e}function ot(e,t){let n=Qm(e);if(n!=null&&n!==t){if(n==="ResourceURL"&&t==="URL")return!0;throw new Error(`Required a safe ${t}, got a ${n} (see ${vl})`)}return n===t}function Qm(e){return e instanceof Xe&&e.getTypeName()||null}function zd(e){return new Ss(e)}function qd(e){return new Ms(e)}function Gd(e){return new Ts(e)}function Wd(e){return new _s(e)}function Zd(e){return new Ns(e)}function Km(e){let t=new Rs(e);return Jm()?new As(t):t}var As=class{constructor(t){this.inertDocumentHelper=t}getInertBodyElement(t){t="<body><remove></remove>"+t;try{let n=new window.DOMParser().parseFromString(Fo(t),"text/html").body;return n===null?this.inertDocumentHelper.getInertBodyElement(t):(n.firstChild?.remove(),n)}catch{return null}}},Rs=class{constructor(t){this.defaultDoc=t,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(t){let n=this.inertDocument.createElement("template");return n.innerHTML=Fo(t),n}};function Jm(){try{return!!new window.DOMParser().parseFromString(Fo(""),"text/html")}catch{return!1}}var Xm=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Lo(e){return e=String(e),e.match(Xm)?e:"unsafe:"+e}function it(e){let t={};for(let n of e.split(","))t[n]=!0;return t}function er(...e){let t={};for(let n of e)for(let r in n)n.hasOwnProperty(r)&&(t[r]=!0);return t}var Yd=it("area,br,col,hr,img,wbr"),Qd=it("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),Kd=it("rp,rt"),ev=er(Kd,Qd),tv=er(Qd,it("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),nv=er(Kd,it("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Ju=er(Yd,tv,nv,ev),Jd=it("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),rv=it("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),ov=it("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),iv=er(Jd,rv,ov),sv=it("script,style,template"),Os=class{constructor(){this.sanitizedSomething=!1,this.buf=[]}sanitizeChildren(t){let n=t.firstChild,r=!0,o=[];for(;n;){if(n.nodeType===Node.ELEMENT_NODE?r=this.startElement(n):n.nodeType===Node.TEXT_NODE?this.chars(n.nodeValue):this.sanitizedSomething=!0,r&&n.firstChild){o.push(n),n=uv(n);continue}for(;n;){n.nodeType===Node.ELEMENT_NODE&&this.endElement(n);let i=cv(n);if(i){n=i;break}n=o.pop()}}return this.buf.join("")}startElement(t){let n=Xu(t).toLowerCase();if(!Ju.hasOwnProperty(n))return this.sanitizedSomething=!0,!sv.hasOwnProperty(n);this.buf.push("<"),this.buf.push(n);let r=t.attributes;for(let o=0;o<r.length;o++){let i=r.item(o),s=i.name,a=s.toLowerCase();if(!iv.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let c=i.value;Jd[a]&&(c=Lo(c)),this.buf.push(" ",s,'="',el(c),'"')}return this.buf.push(">"),!0}endElement(t){let n=Xu(t).toLowerCase();Ju.hasOwnProperty(n)&&!Yd.hasOwnProperty(n)&&(this.buf.push("</"),this.buf.push(n),this.buf.push(">"))}chars(t){this.buf.push(el(t))}};function av(e,t){return(e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function cv(e){let t=e.nextSibling;if(t&&e!==t.previousSibling)throw Xd(t);return t}function uv(e){let t=e.firstChild;if(t&&av(e,t))throw Xd(t);return t}function Xu(e){let t=e.nodeName;return typeof t=="string"?t:"FORM"}function Xd(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var lv=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,dv=/([^\#-~ |!])/g;function el(e){return e.replace(/&/g,"&amp;").replace(lv,function(t){let n=t.charCodeAt(0),r=t.charCodeAt(1);return"&#"+((n-55296)*1024+(r-56320)+65536)+";"}).replace(dv,function(t){return"&#"+t.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Qr;function _a(e,t){let n=null;try{Qr=Qr||Km(e);let r=t?String(t):"";n=Qr.getInertBodyElement(r);let o=5,i=r;do{if(o===0)throw new Error("Failed to sanitize html because the input is unstable");o--,r=i,i=n.innerHTML,n=Qr.getInertBodyElement(r)}while(r!==i);let a=new Os().sanitizeChildren(tl(n)||n);return Fo(a)}finally{if(n){let r=tl(n)||n;for(;r.firstChild;)r.firstChild.remove()}}}function tl(e){return"content"in e&&fv(e)?e.content:null}function fv(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}var ke=function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e}(ke||{});function Se(e){let t=Na();return t?Qu(t.sanitize(ke.HTML,e)||""):ot(e,"HTML")?Qu(Ge(e)):_a(Bd(),Qn(e))}function hv(e){let t=Na();return t?t.sanitize(ke.URL,e)||"":ot(e,"URL")?Ge(e):Lo(Qn(e))}function pv(e){let t=Na();if(t)return Ku(t.sanitize(ke.RESOURCE_URL,e)||"");if(ot(e,"ResourceURL"))return Ku(Ge(e));throw new v(904,!1)}function ef(e){return Ym(e[0])}function gv(e,t){return t==="src"&&(e==="embed"||e==="frame"||e==="iframe"||e==="media"||e==="script")||t==="href"&&(e==="base"||e==="link")?pv:hv}function tf(e,t,n){return gv(t,n)(e)}function Na(){let e=V();return e&&e[He].sanitizer}function nf(e){return e instanceof Function?e():e}var Ot=function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e}(Ot||{}),mv;function Aa(e,t){return mv(e,t)}function sn(e,t,n,r,o){if(r!=null){let i,s=!1;nt(r)?i=r:pt(r)&&(s=!0,r=r[tt]);let a=qe(r);e===0&&n!==null?o==null?cf(t,n,a):Do(t,n,a,o||null,!0):e===1&&n!==null?Do(t,n,a,o||null,!0):e===2?Av(t,a,s):e===3&&t.destroyNode(a),i!=null&&Ov(t,e,i,n,o)}}function vv(e,t){return e.createText(t)}function yv(e,t,n){e.setValue(t,n)}function rf(e,t,n){return e.createElement(t,n)}function Dv(e,t){of(e,t),t[tt]=null,t[Pe]=null}function wv(e,t,n,r,o,i){r[tt]=o,r[Pe]=t,jo(e,r,n,1,o,i)}function of(e,t){t[He].changeDetectionScheduler?.notify(9),jo(e,t,t[re],2,null,null)}function Cv(e){let t=e[Gn];if(!t)return ns(e[I],e);for(;t;){let n=null;if(pt(t))n=t[Gn];else{let r=t[me];r&&(n=r)}if(!n){for(;t&&!t[Oe]&&t!==e;)pt(t)&&ns(t[I],t),t=t[ne];t===null&&(t=e),pt(t)&&ns(t[I],t),n=t&&t[Oe]}t=n}}function bv(e,t,n,r){let o=me+r,i=n.length;r>0&&(n[o-1][Oe]=t),r<i-me?(t[Oe]=n[o],_l(n,me+r,t)):(n.push(t),t[Oe]=null),t[ne]=n;let s=t[St];s!==null&&n!==s&&sf(s,t);let a=t[Ke];a!==null&&a.insertView(e),ps(t),t[D]|=128}function sf(e,t){let n=e[fn],r=t[ne];if(pt(r))e[D]|=fo.HasTransplantedViews;else{let o=r[ne][Ue];t[Ue]!==o&&(e[D]|=fo.HasTransplantedViews)}n===null?e[fn]=[t]:n.push(t)}function Ra(e,t){let n=e[fn],r=n.indexOf(t);n.splice(r,1)}function Ps(e,t){if(e.length<=me)return;let n=me+t,r=e[n];if(r){let o=r[St];o!==null&&o!==e&&Ra(o,r),t>0&&(e[n-1][Oe]=r[Oe]);let i=so(e,me+t);Dv(r[I],r);let s=i[Ke];s!==null&&s.detachView(i[I]),r[ne]=null,r[Oe]=null,r[D]&=-129}return r}function af(e,t){if(!(t[D]&256)){let n=t[re];n.destroyNode&&jo(e,t,n,3,null,null),Cv(t)}}function ns(e,t){if(t[D]&256)return;let n=R(null);try{t[D]&=-129,t[D]|=256,t[be]&&Ai(t[be]),Ev(e,t),Iv(e,t),t[I].type===1&&t[re].destroy();let r=t[St];if(r!==null&&nt(t[ne])){r!==t[ne]&&Ra(r,t);let o=t[Ke];o!==null&&o.detachView(e)}Es(t)}finally{R(n)}}function Iv(e,t){let n=e.cleanup,r=t[uo];if(n!==null)for(let i=0;i<n.length-1;i+=2)if(typeof n[i]=="string"){let s=n[i+3];s>=0?r[s]():r[-s].unsubscribe(),i+=2}else{let s=r[n[i+1]];n[i].call(s)}r!==null&&(t[uo]=null);let o=t[ht];if(o!==null){t[ht]=null;for(let i=0;i<o.length;i++){let s=o[i];s()}}}function Ev(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let r=0;r<n.length;r+=2){let o=t[n[r]];if(!(o instanceof Wn)){let i=n[r+1];if(Array.isArray(i))for(let s=0;s<i.length;s+=2){let a=o[i[s]],c=i[s+1];Ve(4,a,c);try{c.call(a)}finally{Ve(5,a,c)}}else{Ve(4,o,i);try{i.call(o)}finally{Ve(5,o,i)}}}}}function xv(e,t,n){return Sv(e,t.parent,n)}function Sv(e,t,n){let r=t;for(;r!==null&&r.type&168;)t=r,r=t.parent;if(r===null)return n[tt];{let{componentOffset:o}=r;if(o>-1){let{encapsulation:i}=e.data[r.directiveStart+o];if(i===$e.None||i===$e.Emulated)return null}return Ee(r,n)}}function Do(e,t,n,r,o){e.insertBefore(t,n,r,o)}function cf(e,t,n){e.appendChild(t,n)}function nl(e,t,n,r,o){r!==null?Do(e,t,n,r,o):cf(e,t,n)}function uf(e,t){return e.parentNode(t)}function Mv(e,t){return e.nextSibling(t)}function Tv(e,t,n){return Nv(e,t,n)}function _v(e,t,n){return e.type&40?Ee(e,n):null}var Nv=_v,rl;function Oa(e,t,n,r){let o=xv(e,r,t),i=t[re],s=r.parent||t[Pe],a=Tv(s,r,t);if(o!=null)if(Array.isArray(n))for(let c=0;c<n.length;c++)nl(i,o,n[c],a,!1);else nl(i,o,n,a,!1);rl!==void 0&&rl(i,r,t,n,o)}function Vn(e,t){if(t!==null){let n=t.type;if(n&3)return Ee(t,e);if(n&4)return ks(-1,e[t.index]);if(n&8){let r=t.child;if(r!==null)return Vn(e,r);{let o=e[t.index];return nt(o)?ks(-1,o):qe(o)}}else{if(n&128)return Vn(e,t.next);if(n&32)return Aa(t,e)()||qe(e[t.index]);{let r=lf(e,t);if(r!==null){if(Array.isArray(r))return r[0];let o=Tt(e[Ue]);return Vn(o,r)}else return Vn(e,t.next)}}}return null}function lf(e,t){if(t!==null){let r=e[Ue][Pe],o=t.projection;return r.projection[o]}return null}function ks(e,t){let n=me+e+1;if(n<t.length){let r=t[n],o=r[I].firstChild;if(o!==null)return Vn(r,o)}return t[Mt]}function Av(e,t,n){e.removeChild(null,t,n)}function Pa(e,t,n,r,o,i,s){for(;n!=null;){if(n.type===128){n=n.next;continue}let a=r[n.index],c=n.type;if(s&&t===0&&(a&&At(qe(a),r),n.flags|=2),(n.flags&32)!==32)if(c&8)Pa(e,t,n.child,r,o,i,!1),sn(t,e,o,a,i);else if(c&32){let u=Aa(n,r),l;for(;l=u();)sn(t,e,o,l,i);sn(t,e,o,a,i)}else c&16?Rv(e,t,r,n,o,i):sn(t,e,o,a,i);n=s?n.projectionNext:n.next}}function jo(e,t,n,r,o,i){Pa(n,r,e.firstChild,t,o,i,!1)}function Rv(e,t,n,r,o,i){let s=n[Ue],c=s[Pe].projection[r.projection];if(Array.isArray(c))for(let u=0;u<c.length;u++){let l=c[u];sn(t,e,o,l,i)}else{let u=c,l=s[ne];Pd(r)&&(u.flags|=128),Pa(e,t,u,l,o,i,!0)}}function Ov(e,t,n,r,o){let i=n[Mt],s=qe(n);i!==s&&sn(t,e,r,i,o);for(let a=me;a<n.length;a++){let c=n[a];jo(c[I],c,e,t,r,i)}}function Pv(e,t,n){e.setAttribute(t,"style",n)}function df(e,t,n){n===""?e.removeAttribute(t,"class"):e.setAttribute(t,"class",n)}function ff(e,t,n){let{mergedAttrs:r,classes:o,styles:i}=n;r!==null&&as(e,t,r),o!==null&&df(e,t,o),i!==null&&Pv(e,t,i)}var tr={};function nr(e=1){hf(xe(),V(),ma()+e,!1)}function hf(e,t,n,r){if(!r)if((t[D]&3)===3){let i=e.preOrderCheckHooks;i!==null&&Xr(t,i,n)}else{let i=e.preOrderHooks;i!==null&&eo(t,i,0,n)}_t(n)}function O(e,t=S.Default){let n=V();if(n===null)return M(e,t);let r=de();return Sd(r,n,Ce(e),t)}function pf(e,t,n,r,o,i){let s=R(null);try{let a=null;o&gt.SignalBased&&(a=t[r][Kc]),a!==null&&a.transformFn!==void 0&&(i=a.transformFn(i)),o&gt.HasDecoratorInputTransform&&(i=e.inputTransforms[r].call(t,i)),e.setInput!==null?e.setInput(t,a,i,n,r):Zl(t,a,r,i)}finally{R(s)}}function kv(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let r=0;r<n.length;r++){let o=n[r];if(o<0)_t(~o);else{let i=o,s=n[++r],a=n[++r];cm(s,i);let c=t[i];a(2,c)}}}finally{_t(-1)}}function Vo(e,t,n,r,o,i,s,a,c,u,l){let d=t.blueprint.slice();return d[tt]=o,d[D]=r|4|128|8|64,(u!==null||e&&e[D]&2048)&&(d[D]|=2048),ed(d),d[ne]=d[Kn]=e,d[Qe]=n,d[He]=s||e&&e[He],d[re]=a||e&&e[re],d[dn]=c||e&&e[dn]||null,d[Pe]=i,d[Ro]=Hm(),d[co]=l,d[ql]=u,d[Ue]=t.type==2?e[Ue]:d,d}function Bo(e,t,n,r,o){let i=e.data[t];if(i===null)i=Fv(e,t,n,r,o),am()&&(i.flags|=32);else if(i.type&64){i.type=n,i.value=r,i.attrs=o;let s=rm();i.injectorIndex=s===null?-1:s.injectorIndex}return Xn(i,!0),i}function Fv(e,t,n,r,o){let i=id(),s=sd(),a=s?i:i&&i.parent,c=e.data[t]=Hv(e,a,n,t,r,o);return e.firstChild===null&&(e.firstChild=c),i!==null&&(s?i.child==null&&c.parent!==null&&(i.child=c):i.next===null&&(i.next=c,c.prev=i)),c}function gf(e,t,n,r){if(n===0)return-1;let o=t.length;for(let i=0;i<n;i++)t.push(r),e.blueprint.push(r),e.data.push(null);return o}function mf(e,t,n,r,o){let i=ma(),s=r&2;try{_t(-1),s&&t.length>ze&&hf(e,t,ze,!1),Ve(s?2:0,o),n(r,o)}finally{_t(i),Ve(s?3:1,o)}}function vf(e,t,n){if(Wl(t)){let r=R(null);try{let o=t.directiveStart,i=t.directiveEnd;for(let s=o;s<i;s++){let a=e.data[s];if(a.contentQueries){let c=n[s];a.contentQueries(1,c,s)}}}finally{R(r)}}}function yf(e,t,n){od()&&(Yv(e,t,n,Ee(n,t)),(n.flags&64)===64&&If(e,t,n))}function Df(e,t,n=Ee){let r=t.localNames;if(r!==null){let o=t.index+1;for(let i=0;i<r.length;i+=2){let s=r[i+1],a=s===-1?n(t,e):e[s];e[o++]=a}}}function wf(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=ka(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function ka(e,t,n,r,o,i,s,a,c,u,l){let d=ze+r,h=d+o,f=Lv(d,h),g=typeof u=="function"?u():u;return f[I]={type:e,blueprint:f,template:n,queries:null,viewQuery:a,declTNode:t,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof i=="function"?i():i,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:l}}function Lv(e,t){let n=[];for(let r=0;r<t;r++)n.push(r<e?null:tr);return n}function jv(e,t,n,r){let i=r.get(Zm,$d)||n===$e.ShadowDom,s=e.selectRootElement(t,i);return Vv(s),s}function Vv(e){Bv(e)}var Bv=()=>null;function $v(e,t,n,r){let o=Sf(t);o.push(n),e.firstCreatePass&&Mf(e).push(r,o.length-1)}function Hv(e,t,n,r,o,i){let s=t?t.injectorIndex:-1,a=0;return em()&&(a|=128),{type:n,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:o,attrs:i,mergedAttrs:null,localNames:null,initialInputs:void 0,inputs:null,outputs:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function ol(e,t,n,r,o){for(let i in t){if(!t.hasOwnProperty(i))continue;let s=t[i];if(s===void 0)continue;r??={};let a,c=gt.None;Array.isArray(s)?(a=s[0],c=s[1]):a=s;let u=i;if(o!==null){if(!o.hasOwnProperty(i))continue;u=o[i]}e===0?il(r,n,u,a,c):il(r,n,u,a)}return r}function il(e,t,n,r,o){let i;e.hasOwnProperty(n)?(i=e[n]).push(t,r):i=e[n]=[t,r],o!==void 0&&i.push(o)}function Uv(e,t,n){let r=t.directiveStart,o=t.directiveEnd,i=e.data,s=t.attrs,a=[],c=null,u=null;for(let l=r;l<o;l++){let d=i[l],h=n?n.get(d):null,f=h?h.inputs:null,g=h?h.outputs:null;c=ol(0,d.inputs,l,c,f),u=ol(1,d.outputs,l,u,g);let T=c!==null&&s!==null&&!aa(t)?sy(c,l,s):null;a.push(T)}c!==null&&(c.hasOwnProperty("class")&&(t.flags|=8),c.hasOwnProperty("style")&&(t.flags|=16)),t.initialInputs=a,t.inputs=c,t.outputs=u}function zv(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function qv(e,t,n,r,o,i,s,a){let c=Ee(t,n),u=t.inputs,l;!a&&u!=null&&(l=u[r])?(Fa(e,n,l,r,o),Oo(t)&&Gv(n,t.index)):t.type&3?(r=zv(r),o=s!=null?s(o,t.value||"",r):o,i.setProperty(c,r,o)):t.type&12}function Gv(e,t){let n=vt(t,e);n[D]&16||(n[D]|=64)}function Cf(e,t,n,r){if(od()){let o=r===null?null:{"":-1},i=Kv(e,n),s,a;i===null?s=a=null:[s,a]=i,s!==null&&bf(e,t,n,s,o,a),o&&Jv(n,r,o)}n.mergedAttrs=sa(n.mergedAttrs,n.attrs)}function bf(e,t,n,r,o,i){for(let u=0;u<r.length;u++)bm(bd(n,t),e,r[u].type);ey(n,e.data.length,r.length);for(let u=0;u<r.length;u++){let l=r[u];l.providersResolver&&l.providersResolver(l)}let s=!1,a=!1,c=gf(e,t,r.length,null);for(let u=0;u<r.length;u++){let l=r[u];n.mergedAttrs=sa(n.mergedAttrs,l.hostAttrs),ty(e,n,t,c,l),Xv(c,l,o),l.contentQueries!==null&&(n.flags|=4),(l.hostBindings!==null||l.hostAttrs!==null||l.hostVars!==0)&&(n.flags|=64);let d=l.type.prototype;!s&&(d.ngOnChanges||d.ngOnInit||d.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),s=!0),!a&&(d.ngOnChanges||d.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),a=!0),c++}Uv(e,n,i)}function Wv(e,t,n,r,o){let i=o.hostBindings;if(i){let s=e.hostBindingOpCodes;s===null&&(s=e.hostBindingOpCodes=[]);let a=~t.index;Zv(s)!=a&&s.push(a),s.push(n,r,i)}}function Zv(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n=="number"&&n<0)return n}return 0}function Yv(e,t,n,r){let o=n.directiveStart,i=n.directiveEnd;Oo(n)&&ny(t,n,e.data[o+n.componentOffset]),e.firstCreatePass||bd(n,t),At(r,t);let s=n.initialInputs;for(let a=o;a<i;a++){let c=e.data[a],u=hn(t,e,a,n);if(At(u,t),s!==null&&iy(t,a-o,u,c,n,s),Jn(c)){let l=vt(n.index,t);l[Qe]=hn(t,e,a,n)}}}function If(e,t,n){let r=n.directiveStart,o=n.directiveEnd,i=n.index,s=um();try{_t(i);for(let a=r;a<o;a++){let c=e.data[a],u=t[a];gs(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&Qv(c,u)}}finally{_t(-1),gs(s)}}function Qv(e,t){e.hostBindings!==null&&e.hostBindings(1,t)}function Kv(e,t){let n=e.directiveRegistry,r=null,o=null;if(n)for(let i=0;i<n.length;i++){let s=n[i];if(wg(t,s.selectors,!1))if(r||(r=[]),Jn(s))if(s.findHostDirectiveDefs!==null){let a=[];o=o||new Map,s.findHostDirectiveDefs(s,a,o),r.unshift(...a,s);let c=a.length;Fs(e,t,c)}else r.unshift(s),Fs(e,t,0);else o=o||new Map,s.findHostDirectiveDefs?.(s,r,o),r.push(s)}return r===null?null:[r,o]}function Fs(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index)}function Jv(e,t,n){if(t){let r=e.localNames=[];for(let o=0;o<t.length;o+=2){let i=n[t[o+1]];if(i==null)throw new v(-301,!1);r.push(t[o],i)}}}function Xv(e,t,n){if(n){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)n[t.exportAs[r]]=e;Jn(t)&&(n[""]=e)}}function ey(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t}function ty(e,t,n,r,o){e.data[r]=o;let i=o.factory||(o.factory=Et(o.type,!0)),s=new Wn(i,Jn(o),O);e.blueprint[r]=s,n[r]=s,Wv(e,t,r,gf(e,n,o.hostVars,tr),o)}function ny(e,t,n){let r=Ee(t,e),o=wf(n),i=e[He].rendererFactory,s=16;n.signals?s=4096:n.onPush&&(s=64);let a=$o(e,Vo(e,o,null,s,r,t,null,i.createRenderer(r,n),null,null,null));e[t.index]=a}function ry(e,t,n,r,o,i){let s=Ee(e,t);oy(t[re],s,i,e.value,n,r,o)}function oy(e,t,n,r,o,i,s){if(i==null)e.removeAttribute(t,o,n);else{let a=s==null?Qn(i):s(i,r||"",o);e.setAttribute(t,o,a,n)}}function iy(e,t,n,r,o,i){let s=i[t];if(s!==null)for(let a=0;a<s.length;){let c=s[a++],u=s[a++],l=s[a++],d=s[a++];pf(r,n,c,u,l,d)}}function sy(e,t,n){let r=null,o=0;for(;o<n.length;){let i=n[o];if(i===0){o+=4;continue}else if(i===5){o+=2;continue}if(typeof i=="number")break;if(e.hasOwnProperty(i)){r===null&&(r=[]);let s=e[i];for(let a=0;a<s.length;a+=3)if(s[a]===t){r.push(i,s[a+1],s[a+2],n[o+1]);break}}o+=2}return r}function Ef(e,t,n,r){return[e,!0,0,t,null,r,null,n,null,null]}function xf(e,t){let n=e.contentQueries;if(n!==null){let r=R(null);try{for(let o=0;o<n.length;o+=2){let i=n[o],s=n[o+1];if(s!==-1){let a=e.data[s];ha(i),a.contentQueries(2,t[s],s)}}}finally{R(r)}}}function $o(e,t){return e[Gn]?e[Vu][Oe]=t:e[Gn]=t,e[Vu]=t,t}function Ls(e,t,n){ha(0);let r=R(null);try{t(e,n)}finally{R(r)}}function Sf(e){return e[uo]??=[]}function Mf(e){return e.cleanup??=[]}function Tf(e,t){let n=e[dn],r=n?n.get(Je,null):null;r&&r.handleError(t)}function Fa(e,t,n,r,o){for(let i=0;i<n.length;){let s=n[i++],a=n[i++],c=n[i++],u=t[s],l=e.data[s];pf(l,u,r,a,c,o)}}function ay(e,t,n){let r=Gg(t,e);yv(e[re],r,n)}function cy(e,t){let n=vt(t,e),r=n[I];uy(r,n);let o=n[tt];o!==null&&n[co]===null&&(n[co]=Ta(o,n[dn])),La(r,n,n[Qe])}function uy(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n])}function La(e,t,n){pa(t);try{let r=e.viewQuery;r!==null&&Ls(1,r,n);let o=e.template;o!==null&&mf(e,t,o,1,n),e.firstCreatePass&&(e.firstCreatePass=!1),t[Ke]?.finishViewCreation(e),e.staticContentQueries&&xf(e,t),e.staticViewQueries&&Ls(2,e.viewQuery,n);let i=e.components;i!==null&&ly(t,i)}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),r}finally{t[D]&=-5,ga()}}function ly(e,t){for(let n=0;n<t.length;n++)cy(e,t[n])}function dy(e,t,n,r){let o=R(null);try{let i=t.tView,a=e[D]&4096?4096:16,c=Vo(e,i,n,a,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),u=e[t.index];c[St]=u;let l=e[Ke];return l!==null&&(c[Ke]=l.createEmbeddedView(i)),La(i,c,n),c}finally{R(o)}}function sl(e,t){return!t||t.firstChild===null||Pd(e)}function fy(e,t,n,r=!0){let o=t[I];if(bv(o,t,e,n),r){let s=ks(n,e),a=t[re],c=uf(a,e[Mt]);c!==null&&wv(o,e[Pe],a,t,c,s)}let i=t[co];i!==null&&i.firstChild!==null&&(i.firstChild=null)}function wo(e,t,n,r,o=!1){for(;n!==null;){if(n.type===128){n=o?n.projectionNext:n.next;continue}let i=t[n.index];i!==null&&r.push(qe(i)),nt(i)&&hy(i,r);let s=n.type;if(s&8)wo(e,t,n.child,r);else if(s&32){let a=Aa(n,t),c;for(;c=a();)r.push(c)}else if(s&16){let a=lf(t,n);if(Array.isArray(a))r.push(...a);else{let c=Tt(t[Ue]);wo(c[I],c,a,r,!0)}}n=o?n.projectionNext:n.next}return r}function hy(e,t){for(let n=me;n<e.length;n++){let r=e[n],o=r[I].firstChild;o!==null&&wo(r[I],r,o,t)}e[Mt]!==e[tt]&&t.push(e[Mt])}var _f=[];function py(e){return e[be]??gy(e)}function gy(e){let t=_f.pop()??Object.create(vy);return t.lView=e,t}function my(e){e.lView[be]!==e&&(e.lView=null,_f.push(e))}var vy=$(m({},Ti),{consumerIsAlwaysLive:!0,consumerMarkedDirty:e=>{ko(e.lView)},consumerOnSignalRead(){this.lView[be]=this}});function yy(e){let t=e[be]??Object.create(Dy);return t.lView=e,t}var Dy=$(m({},Ti),{consumerIsAlwaysLive:!0,consumerMarkedDirty:e=>{let t=Tt(e.lView);for(;t&&!Nf(t[I]);)t=Tt(t);t&&td(t)},consumerOnSignalRead(){this.lView[be]=this}});function Nf(e){return e.type!==2}var wy=100;function Af(e,t=!0,n=0){let r=e[He],o=r.rendererFactory,i=!1;i||o.begin?.();try{Cy(e,n)}catch(s){throw t&&Tf(e,s),s}finally{i||(o.end?.(),r.inlineEffectRunner?.flush())}}function Cy(e,t){let n=ad();try{$u(!0),js(e,t);let r=0;for(;Po(e);){if(r===wy)throw new v(103,!1);r++,js(e,1)}}finally{$u(n)}}function by(e,t,n,r){let o=t[D];if((o&256)===256)return;let i=!1,s=!1;!i&&t[He].inlineEffectRunner?.flush(),pa(t);let a=!0,c=null,u=null;i||(Nf(e)?(u=py(t),c=_i(u)):Jc()===null?(a=!1,u=yy(t),c=_i(u)):t[be]&&(Ai(t[be]),t[be]=null));try{ed(t),sm(e.bindingStartIndex),n!==null&&mf(e,t,n,2,r);let l=(o&3)===3;if(!i)if(l){let f=e.preOrderCheckHooks;f!==null&&Xr(t,f,null)}else{let f=e.preOrderHooks;f!==null&&eo(t,f,0,null),Ji(t,0)}if(s||Iy(t),Rf(t,0),e.contentQueries!==null&&xf(e,t),!i)if(l){let f=e.contentCheckHooks;f!==null&&Xr(t,f)}else{let f=e.contentHooks;f!==null&&eo(t,f,1),Ji(t,1)}kv(e,t);let d=e.components;d!==null&&Pf(t,d,0);let h=e.viewQuery;if(h!==null&&Ls(2,h,r),!i)if(l){let f=e.viewCheckHooks;f!==null&&Xr(t,f)}else{let f=e.viewHooks;f!==null&&eo(t,f,2),Ji(t,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[Ki]){for(let f of t[Ki])f();t[Ki]=null}i||(t[D]&=-73)}catch(l){throw i||ko(t),l}finally{u!==null&&(Xc(u,c),a&&my(u)),ga()}}function Rf(e,t){for(let n=Fd(e);n!==null;n=Ld(n))for(let r=me;r<n.length;r++){let o=n[r];Of(o,t)}}function Iy(e){for(let t=Fd(e);t!==null;t=Ld(t)){if(!(t[D]&fo.HasTransplantedViews))continue;let n=t[fn];for(let r=0;r<n.length;r++){let o=n[r];td(o)}}}function Ey(e,t,n){let r=vt(t,e);Of(r,n)}function Of(e,t){da(e)&&js(e,t)}function js(e,t){let r=e[I],o=e[D],i=e[be],s=!!(t===0&&o&16);if(s||=!!(o&64&&t===0),s||=!!(o&1024),s||=!!(i?.dirty&&Ni(i)),s||=!1,i&&(i.dirty=!1),e[D]&=-9217,s)by(r,e,r.template,e[Qe]);else if(o&8192){Rf(e,1);let a=r.components;a!==null&&Pf(e,a,1)}}function Pf(e,t,n){for(let r=0;r<t.length;r++)Ey(e,t[r],n)}function ja(e,t){let n=ad()?64:1088;for(e[He].changeDetectionScheduler?.notify(t);e;){e[D]|=n;let r=Tt(e);if(fs(e)&&!r)return e;e=r}return null}var Rt=class{get rootNodes(){let t=this._lView,n=t[I];return wo(n,t,n.firstChild,[])}constructor(t,n,r=!0){this._lView=t,this._cdRefInjectingView=n,this.notifyErrorHandler=r,this._appRef=null,this._attachedToViewContainer=!1}get context(){return this._lView[Qe]}set context(t){this._lView[Qe]=t}get destroyed(){return(this._lView[D]&256)===256}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[ne];if(nt(t)){let n=t[lo],r=n?n.indexOf(this):-1;r>-1&&(Ps(t,r),so(n,r))}this._attachedToViewContainer=!1}af(this._lView[I],this._lView)}onDestroy(t){nd(this._lView,t)}markForCheck(){ja(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[D]&=-129}reattach(){ps(this._lView),this._lView[D]|=128}detectChanges(){this._lView[D]|=1024,Af(this._lView,this.notifyErrorHandler)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new v(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let t=fs(this._lView),n=this._lView[St];n!==null&&!t&&Ra(n,this._lView),of(this._lView[I],this._lView)}attachToAppRef(t){if(this._attachedToViewContainer)throw new v(902,!1);this._appRef=t;let n=fs(this._lView),r=this._lView[St];r!==null&&!n&&sf(r,this._lView),ps(this._lView)}},pn=(()=>{class e{static{this.__NG_ELEMENT_ID__=My}}return e})(),xy=pn,Sy=class extends xy{constructor(t,n,r){super(),this._declarationLView=t,this._declarationTContainer=n,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,n){return this.createEmbeddedViewImpl(t,n)}createEmbeddedViewImpl(t,n,r){let o=dy(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:n,dehydratedView:r});return new Rt(o)}};function My(){return Va(de(),V())}function Va(e,t){return e.type&4?new Sy(t,e,Cn(e,t)):null}var iM=new RegExp(`^(\\d+)*(${Gm}|${qm})*(.*)`);var Ty=()=>null;function al(e,t){return Ty(e,t)}var gn=class{},Ho=new E("",{providedIn:"root",factory:()=>!1});var kf=new E(""),Ff=new E(""),Vs=class{},Co=class{};function _y(e){let t=Error(`No component factory found for ${ge(e)}.`);return t[Ny]=e,t}var Ny="ngComponent";var Bs=class{resolveComponentFactory(t){throw _y(t)}},mn=class{static{this.NULL=new Bs}},vn=class{},rr=(()=>{class e{constructor(){this.destroyNode=null}static{this.__NG_ELEMENT_ID__=()=>Ay()}}return e})();function Ay(){let e=V(),t=de(),n=vt(t.index,e);return(pt(n)?n:e)[re]}var Ry=(()=>{class e{static{this.\u0275prov=w({token:e,providedIn:"root",factory:()=>null})}}return e})();function $s(e,t,n){let r=n?e.styles:null,o=n?e.classes:null,i=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")i=a;else if(i==1)o=_u(o,a);else if(i==2){let c=a,u=t[++s];r=_u(r,c+": "+u+";")}}n?e.styles=r:e.stylesWithoutHost=r,n?e.classes=o:e.classesWithoutHost=o}var bo=class extends mn{constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){let n=xt(t);return new Zn(n,this.ngModule)}};function cl(e,t){let n=[];for(let r in e){if(!e.hasOwnProperty(r))continue;let o=e[r];if(o===void 0)continue;let i=Array.isArray(o),s=i?o[0]:o,a=i?o[1]:gt.None;t?n.push({propName:s,templateName:r,isSignal:(a&gt.SignalBased)!==0}):n.push({propName:s,templateName:r})}return n}function Oy(e){let t=e.toLowerCase();return t==="svg"?Jl:t==="math"?qg:null}var Zn=class extends Co{get inputs(){let t=this.componentDef,n=t.inputTransforms,r=cl(t.inputs,!0);if(n!==null)for(let o of r)n.hasOwnProperty(o.propName)&&(o.transform=n[o.propName]);return r}get outputs(){return cl(this.componentDef.outputs,!1)}constructor(t,n){super(),this.componentDef=t,this.ngModule=n,this.componentType=t.type,this.selector=Eg(t.selectors),this.ngContentSelectors=t.ngContentSelectors?t.ngContentSelectors:[],this.isBoundToModule=!!n}create(t,n,r,o){let i=R(null);try{o=o||this.ngModule;let s=o instanceof Ie?o:o?.injector;s&&this.componentDef.getStandaloneInjector!==null&&(s=this.componentDef.getStandaloneInjector(s)||s);let a=s?new ms(t,s):t,c=a.get(vn,null);if(c===null)throw new v(407,!1);let u=a.get(Ry,null),l=a.get(gn,null),d={rendererFactory:c,sanitizer:u,inlineEffectRunner:null,changeDetectionScheduler:l},h=c.createRenderer(null,this.componentDef),f=this.componentDef.selectors[0][0]||"div",g=r?jv(h,r,this.componentDef.encapsulation,a):rf(h,f,Oy(f)),T=512;this.componentDef.signals?T|=4096:this.componentDef.onPush||(T|=16);let j=null;g!==null&&(j=Ta(g,a,!0));let B=ka(0,null,null,1,0,null,null,null,null,null,null),ie=Vo(null,B,null,T,null,null,d,h,a,null,j);pa(ie);let se,Ne,Ut=null;try{let fe=this.componentDef,zt,xi=null;fe.findHostDirectiveDefs?(zt=[],xi=new Map,fe.findHostDirectiveDefs(fe,zt,xi),zt.push(fe)):zt=[fe];let gp=Py(ie,g);Ut=ky(gp,g,fe,zt,ie,d,h),Ne=Xl(B,ze),g&&jy(h,fe,g,r),n!==void 0&&Vy(Ne,this.ngContentSelectors,n),se=Ly(Ut,fe,zt,xi,ie,[By]),La(B,ie,null)}catch(fe){throw Ut!==null&&Es(Ut),Es(ie),fe}finally{ga()}return new Hs(this.componentType,se,Cn(Ne,ie),ie,Ne)}finally{R(i)}}},Hs=class extends Vs{constructor(t,n,r,o,i){super(),this.location=r,this._rootLView=o,this._tNode=i,this.previousInputValues=null,this.instance=n,this.hostView=this.changeDetectorRef=new Rt(o,void 0,!1),this.componentType=t}setInput(t,n){let r=this._tNode.inputs,o;if(r!==null&&(o=r[t])){if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),n))return;let i=this._rootLView;Fa(i[I],i,o,t,n),this.previousInputValues.set(t,n);let s=vt(this._tNode.index,i);ja(s,1)}}get injector(){return new It(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}};function Py(e,t){let n=e[I],r=ze;return e[r]=t,Bo(n,r,2,"#host",null)}function ky(e,t,n,r,o,i,s){let a=o[I];Fy(r,e,t,s);let c=null;t!==null&&(c=Ta(t,o[dn]));let u=i.rendererFactory.createRenderer(t,n),l=16;n.signals?l=4096:n.onPush&&(l=64);let d=Vo(o,wf(n),null,l,o[e.index],e,i,u,null,null,c);return a.firstCreatePass&&Fs(a,e,r.length-1),$o(o,d),o[e.index]=d}function Fy(e,t,n,r){for(let o of e)t.mergedAttrs=sa(t.mergedAttrs,o.hostAttrs);t.mergedAttrs!==null&&($s(t,t.mergedAttrs,!0),n!==null&&ff(r,n,t))}function Ly(e,t,n,r,o,i){let s=de(),a=o[I],c=Ee(s,o);bf(a,o,s,n,null,r);for(let l=0;l<n.length;l++){let d=s.directiveStart+l,h=hn(o,a,d,s);At(h,o)}If(a,o,s),c&&At(c,o);let u=hn(o,a,s.directiveStart+s.componentOffset,s);if(e[Qe]=o[Qe]=u,i!==null)for(let l of i)l(u,t);return vf(a,s,o),u}function jy(e,t,n,r){if(r)as(e,n,["ng-version","18.2.13"]);else{let{attrs:o,classes:i}=xg(t.selectors[0]);o&&as(e,n,o),i&&i.length>0&&df(e,n,i.join(" "))}}function Vy(e,t,n){let r=e.projection=[];for(let o=0;o<t.length;o++){let i=n[o];r.push(i!=null?Array.from(i):null)}}function By(){let e=de();Da(V()[I],e)}var Pt=(()=>{class e{static{this.__NG_ELEMENT_ID__=$y}}return e})();function $y(){let e=de();return jf(e,V())}var Hy=Pt,Lf=class extends Hy{constructor(t,n,r){super(),this._lContainer=t,this._hostTNode=n,this._hostLView=r}get element(){return Cn(this._hostTNode,this._hostLView)}get injector(){return new It(this._hostTNode,this._hostLView)}get parentInjector(){let t=wa(this._hostTNode,this._hostLView);if(Dd(t)){let n=go(t,this._hostLView),r=po(t),o=n[I].data[r+8];return new It(o,n)}else return new It(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){let n=ul(this._lContainer);return n!==null&&n[t]||null}get length(){return this._lContainer.length-me}createEmbeddedView(t,n,r){let o,i;typeof r=="number"?o=r:r!=null&&(o=r.index,i=r.injector);let s=al(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(n||{},i,s);return this.insertImpl(a,o,sl(this._hostTNode,s)),a}createComponent(t,n,r,o,i){let s=t&&!$g(t),a;if(s)a=n;else{let g=n||{};a=g.index,r=g.injector,o=g.projectableNodes,i=g.environmentInjector||g.ngModuleRef}let c=s?t:new Zn(xt(t)),u=r||this.parentInjector;if(!i&&c.ngModule==null){let T=(s?u:this.parentInjector).get(Ie,null);T&&(i=T)}let l=xt(c.componentType??{}),d=al(this._lContainer,l?.id??null),h=d?.firstChild??null,f=c.create(u,o,h,i);return this.insertImpl(f.hostView,a,sl(this._hostTNode,d)),f}insert(t,n){return this.insertImpl(t,n,!0)}insertImpl(t,n,r){let o=t._lView;if(Yg(o)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else{let c=o[ne],u=new Lf(c,c[Pe],c[ne]);u.detach(u.indexOf(t))}}let i=this._adjustIndex(n),s=this._lContainer;return fy(s,o,i,r),t.attachToViewContainerRef(),_l(rs(s),i,t),t}move(t,n){return this.insert(t,n)}indexOf(t){let n=ul(this._lContainer);return n!==null?n.indexOf(t):-1}remove(t){let n=this._adjustIndex(t,-1),r=Ps(this._lContainer,n);r&&(so(rs(this._lContainer),n),af(r[I],r))}detach(t){let n=this._adjustIndex(t,-1),r=Ps(this._lContainer,n);return r&&so(rs(this._lContainer),n)!=null?new Rt(r):null}_adjustIndex(t,n=0){return t??this.length+n}};function ul(e){return e[lo]}function rs(e){return e[lo]||(e[lo]=[])}function jf(e,t){let n,r=t[e.index];return nt(r)?n=r:(n=Ef(r,t,null,e),t[e.index]=n,$o(t,n)),zy(n,t,e,r),new Lf(n,e,t)}function Uy(e,t){let n=e[re],r=n.createComment(""),o=Ee(t,e),i=uf(n,o);return Do(n,i,r,Mv(n,o),!1),r}var zy=Wy,qy=()=>!1;function Gy(e,t,n){return qy(e,t,n)}function Wy(e,t,n,r){if(e[Mt])return;let o;n.type&8?o=qe(r):o=Uy(t,n),e[Mt]=o}var Us=class e{constructor(t){this.queryList=t,this.matches=null}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},zs=class e{constructor(t=[]){this.queries=t}createEmbeddedView(t){let n=t.queries;if(n!==null){let r=t.contentQueries!==null?t.contentQueries[0]:n.length,o=[];for(let i=0;i<r;i++){let s=n.getByIndex(i),a=this.queries[s.indexInDeclarationView];o.push(a.clone())}return new e(o)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}finishViewCreation(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let n=0;n<this.queries.length;n++)Ba(t,n).matches!==null&&this.queries[n].setDirty()}},Io=class{constructor(t,n,r=null){this.flags=n,this.read=r,typeof t=="string"?this.predicate=tD(t):this.predicate=t}},qs=class e{constructor(t=[]){this.queries=t}elementStart(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(t,n)}elementEnd(t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(t)}embeddedTView(t){let n=null;for(let r=0;r<this.length;r++){let o=n!==null?n.length:0,i=this.getByIndex(r).embeddedTView(t,o);i&&(i.indexInDeclarationView=r,n!==null?n.push(i):n=[i])}return n!==null?new e(n):null}template(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].template(t,n)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}},Gs=class e{constructor(t,n=-1){this.metadata=t,this.matches=null,this.indexInDeclarationView=-1,this.crossesNgTemplate=!1,this._appliesToNextNode=!0,this._declarationNodeIndex=n}elementStart(t,n){this.isApplyingToNode(n)&&this.matchTNode(t,n)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,n){this.elementStart(t,n)}embeddedTView(t,n){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,n),new e(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,r=t.parent;for(;r!==null&&r.type&8&&r.index!==n;)r=r.parent;return n===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(t,n){let r=this.metadata.predicate;if(Array.isArray(r))for(let o=0;o<r.length;o++){let i=r[o];this.matchTNodeWithReadOption(t,n,Zy(n,i)),this.matchTNodeWithReadOption(t,n,to(n,t,i,!1,!1))}else r===pn?n.type&4&&this.matchTNodeWithReadOption(t,n,-1):this.matchTNodeWithReadOption(t,n,to(n,t,r,!1,!1))}matchTNodeWithReadOption(t,n,r){if(r!==null){let o=this.metadata.read;if(o!==null)if(o===rt||o===Pt||o===pn&&n.type&4)this.addMatch(n.index,-2);else{let i=to(n,t,o,!1,!1);i!==null&&this.addMatch(n.index,i)}else this.addMatch(n.index,r)}}addMatch(t,n){this.matches===null?this.matches=[t,n]:this.matches.push(t,n)}};function Zy(e,t){let n=e.localNames;if(n!==null){for(let r=0;r<n.length;r+=2)if(n[r]===t)return n[r+1]}return null}function Yy(e,t){return e.type&11?Cn(e,t):e.type&4?Va(e,t):null}function Qy(e,t,n,r){return n===-1?Yy(t,e):n===-2?Ky(e,t,r):hn(e,e[I],n,t)}function Ky(e,t,n){if(n===rt)return Cn(t,e);if(n===pn)return Va(t,e);if(n===Pt)return jf(t,e)}function Vf(e,t,n,r){let o=t[Ke].queries[r];if(o.matches===null){let i=e.data,s=n.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let u=s[c];if(u<0)a.push(null);else{let l=i[u];a.push(Qy(t,l,s[c+1],n.metadata.read))}}o.matches=a}return o.matches}function Ws(e,t,n,r){let o=e.queries.getByIndex(n),i=o.matches;if(i!==null){let s=Vf(e,t,o,n);for(let a=0;a<i.length;a+=2){let c=i[a];if(c>0)r.push(s[a/2]);else{let u=i[a+1],l=t[-c];for(let d=me;d<l.length;d++){let h=l[d];h[St]===h[ne]&&Ws(h[I],h,u,r)}if(l[fn]!==null){let d=l[fn];for(let h=0;h<d.length;h++){let f=d[h];Ws(f[I],f,u,r)}}}}}return r}function Jy(e,t){return e[Ke].queries[t].queryList}function Bf(e,t,n){let r=new Is((n&4)===4);return $v(e,t,r,r.destroy),(t[Ke]??=new zs).queries.push(new Us(r))-1}function Xy(e,t,n){let r=xe();return r.firstCreatePass&&($f(r,new Io(e,t,n),-1),(t&2)===2&&(r.staticViewQueries=!0)),Bf(r,V(),t)}function eD(e,t,n,r){let o=xe();if(o.firstCreatePass){let i=de();$f(o,new Io(t,n,r),i.index),nD(o,e),(n&2)===2&&(o.staticContentQueries=!0)}return Bf(o,V(),n)}function tD(e){return e.split(",").map(t=>t.trim())}function $f(e,t,n){e.queries===null&&(e.queries=new qs),e.queries.track(new Gs(t,n))}function nD(e,t){let n=e.contentQueries||(e.contentQueries=[]),r=n.length?n[n.length-1]:-1;t!==r&&n.push(e.queries.length-1,t)}function Ba(e,t){return e.queries.getByIndex(t)}function rD(e,t){let n=e[I],r=Ba(n,t);return r.crossesNgTemplate?Ws(n,e,t,[]):Vf(n,e,r,t)}var ll=new Set;function $a(e){ll.has(e)||(ll.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}function Ha(e){let t=e.inputConfig,n={};for(let r in t)if(t.hasOwnProperty(r)){let o=t[r];Array.isArray(o)&&o[3]&&(n[r]=o[3])}e.inputTransforms=n}var mt=class{},Yn=class{};var Zs=class extends mt{constructor(t,n,r,o=!0){super(),this.ngModuleType=t,this._parent=n,this._bootstrapComponents=[],this.destroyCbs=[],this.componentFactoryResolver=new bo(this);let i=Vl(t);this._bootstrapComponents=nf(i.bootstrap),this._r3Injector=_d(t,n,[{provide:mt,useValue:this},{provide:mn,useValue:this.componentFactoryResolver},...r],ge(t),new Set(["environment"])),o&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}},Ys=class extends Yn{constructor(t){super(),this.moduleType=t}create(t){return new Zs(this.moduleType,t,[])}};var Eo=class extends mt{constructor(t){super(),this.componentFactoryResolver=new bo(this),this.instance=null;let n=new qn([...t.providers,{provide:mt,useValue:this},{provide:mn,useValue:this.componentFactoryResolver}],t.parent||ua(),t.debugName,new Set(["environment"]));this.injector=n,t.runEnvironmentInitializers&&n.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(t){this.injector.onDestroy(t)}};function Ua(e,t,n=null){return new Eo({providers:e,parent:t,debugName:n,runEnvironmentInitializers:!0}).injector}function Hf(e){return iD(e)?Array.isArray(e)||!(e instanceof Map)&&Symbol.iterator in e:!1}function oD(e,t){if(Array.isArray(e))for(let n=0;n<e.length;n++)t(e[n]);else{let n=e[Symbol.iterator](),r;for(;!(r=n.next()).done;)t(r.value)}}function iD(e){return e!==null&&(typeof e=="function"||typeof e=="object")}function sD(e,t,n){return e[t]=n}function Uo(e,t,n){let r=e[t];return Object.is(r,n)?!1:(e[t]=n,!0)}function aD(e){return(e.flags&32)===32}function cD(e,t,n,r,o,i,s,a,c){let u=t.consts,l=Bo(t,e,4,s||null,a||null);Cf(t,n,l,ho(u,c)),Da(t,l);let d=l.tView=ka(2,l,r,o,i,t.directiveRegistry,t.pipeRegistry,null,t.schemas,u,null);return t.queries!==null&&(t.queries.template(t,l),d.queries=t.queries.embeddedTView(l)),l}function uD(e,t,n,r,o,i,s,a,c,u){let l=n+ze,d=t.firstCreatePass?cD(l,t,e,r,o,i,s,a,c):t.data[l];Xn(d,!1);let h=lD(t,e,d,n);va()&&Oa(t,e,h,d),At(h,e);let f=Ef(h,e,h,d);return e[l]=f,$o(e,f),Gy(f,d,e),la(d)&&yf(t,e,d),c!=null&&Df(e,d,u),d}function za(e,t,n,r,o,i,s,a){let c=V(),u=xe(),l=ho(u.consts,i);return uD(c,u,e,t,n,r,o,l,s,a),za}var lD=dD;function dD(e,t,n,r){return ya(!0),t[re].createComment("")}var Bn=function(e){return e[e.EarlyRead=0]="EarlyRead",e[e.Write=1]="Write",e[e.MixedReadWrite=2]="MixedReadWrite",e[e.Read=3]="Read",e}(Bn||{}),fD=(()=>{class e{constructor(){this.impl=null}execute(){this.impl?.execute()}static{this.\u0275prov=w({token:e,providedIn:"root",factory:()=>new e})}}return e})(),dl=class e{constructor(){this.ngZone=p(q),this.scheduler=p(gn),this.errorHandler=p(Je,{optional:!0}),this.sequences=new Set,this.deferredRegistrations=new Set,this.executing=!1}static{this.PHASES=[Bn.EarlyRead,Bn.Write,Bn.MixedReadWrite,Bn.Read]}execute(){this.executing=!0;for(let t of e.PHASES)for(let n of this.sequences)if(!(n.erroredOrDestroyed||!n.hooks[t]))try{n.pipelinedValue=this.ngZone.runOutsideAngular(()=>n.hooks[t](n.pipelinedValue))}catch(r){n.erroredOrDestroyed=!0,this.errorHandler?.handleError(r)}this.executing=!1;for(let t of this.sequences)t.afterRun(),t.once&&(this.sequences.delete(t),t.destroy());for(let t of this.deferredRegistrations)this.sequences.add(t);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear()}register(t){this.executing?this.deferredRegistrations.add(t):(this.sequences.add(t),this.scheduler.notify(6))}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}static{this.\u0275prov=w({token:e,providedIn:"root",factory:()=>new e})}};function qa(e,t,n,r){let o=V(),i=fa();if(Uo(o,i,t)){let s=xe(),a=pd();ry(a,o,e,t,n,r)}return qa}function hD(e,t,n,r){return Uo(e,fa(),n)?t+Qn(n)+r:tr}function oe(e,t,n){let r=V(),o=fa();if(Uo(r,o,t)){let i=xe(),s=pd();qv(i,s,r,e,t,r[re],n,!1)}return oe}function fl(e,t,n,r,o){let i=t.inputs,s=o?"class":"style";Fa(e,n,i[s],s,r)}function pD(e,t,n,r,o,i){let s=t.consts,a=ho(s,o),c=Bo(t,e,2,r,a);return Cf(t,n,c,ho(s,i)),c.attrs!==null&&$s(c,c.attrs,!1),c.mergedAttrs!==null&&$s(c,c.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,c),c}function W(e,t,n,r){let o=V(),i=xe(),s=ze+e,a=o[re],c=i.firstCreatePass?pD(s,i,o,t,n,r):i.data[s],u=gD(i,o,c,a,t,e);o[s]=u;let l=la(c);return Xn(c,!0),ff(a,u,c),!aD(c)&&va()&&Oa(i,o,u,c),Kg()===0&&At(u,o),Jg(),l&&(yf(i,o,c),vf(i,c,o)),r!==null&&Df(o,c),W}function H(){let e=de();sd()?om():(e=e.parent,Xn(e,!1));let t=e;tm(t)&&nm(),Xg();let n=xe();return n.firstCreatePass&&(Da(n,e),Wl(e)&&n.queries.elementEnd(e)),t.classesWithoutHost!=null&&mm(t)&&fl(n,t,V(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&vm(t)&&fl(n,t,V(),t.stylesWithoutHost,!1),H}function F(e,t,n,r){return W(e,t,n,r),H(),F}var gD=(e,t,n,r,o,i)=>(ya(!0),rf(r,o,fm()));var xo="en-US";var mD=xo;function vD(e){typeof e=="string"&&(mD=e.toLowerCase().replace(/_/g,"-"))}var yD=(e,t,n)=>{};function Ga(e,t,n,r){let o=V(),i=xe(),s=de();return wD(i,o,o[re],s,e,t,r),Ga}function DD(e,t,n,r){let o=e.cleanup;if(o!=null)for(let i=0;i<o.length-1;i+=2){let s=o[i];if(s===n&&o[i+1]===r){let a=t[uo],c=o[i+2];return a.length>c?a[c]:null}typeof s=="string"&&(i+=2)}return null}function wD(e,t,n,r,o,i,s){let a=la(r),u=e.firstCreatePass&&Mf(e),l=t[Qe],d=Sf(t),h=!0;if(r.type&3||s){let T=Ee(r,t),j=s?s(T):T,B=d.length,ie=s?Ne=>s(qe(Ne[r.index])):r.index,se=null;if(!s&&a&&(se=DD(e,t,o,r.index)),se!==null){let Ne=se.__ngLastListenerFn__||se;Ne.__ngNextListenerFn__=i,se.__ngLastListenerFn__=i,h=!1}else{i=pl(r,t,l,i),yD(T,o,i);let Ne=n.listen(j,o,i);d.push(i,Ne),u&&u.push(o,ie,B,B+1)}}else i=pl(r,t,l,i);let f=r.outputs,g;if(h&&f!==null&&(g=f[o])){let T=g.length;if(T)for(let j=0;j<T;j+=2){let B=g[j],ie=g[j+1],Ut=t[B][ie].subscribe(i),fe=d.length;d.push(i,Ut),u&&u.push(o,r.index,fe,-(fe+1))}}}function hl(e,t,n,r){let o=R(null);try{return Ve(6,t,n),n(r)!==!1}catch(i){return Tf(e,i),!1}finally{Ve(7,t,n),R(o)}}function pl(e,t,n,r){return function o(i){if(i===Function)return r;let s=e.componentOffset>-1?vt(e.index,t):t;ja(s,5);let a=hl(t,n,r,i),c=o.__ngNextListenerFn__;for(;c;)a=hl(t,n,c,i)&&a,c=c.__ngNextListenerFn__;return a}}function Uf(e,t,n,r){eD(e,t,n,r)}function zf(e,t,n){Xy(e,t,n)}function zo(e){let t=V(),n=xe(),r=cd();ha(r+1);let o=Ba(n,r);if(e.dirty&&Zg(t)===((o.metadata.flags&2)===2)){if(o.matches===null)e.reset([]);else{let i=rD(t,r);e.reset(i,Vm),e.notifyOnChanges()}return!0}return!1}function qo(){return Jy(V(),cd())}function CD(e,t,n,r){n>=e.data.length&&(e.data[n]=null,e.blueprint[n]=null),t[n]=r}function Me(e,t=""){let n=V(),r=xe(),o=e+ze,i=r.firstCreatePass?Bo(r,o,1,t,null):r.data[o],s=bD(r,n,i,t,e);n[o]=s,va()&&Oa(r,n,s,i),Xn(i,!1)}var bD=(e,t,n,r,o)=>(ya(!0),vv(t[re],r));function Go(e){return qf("",e,""),Go}function qf(e,t,n){let r=V(),o=hD(r,e,t,n);return o!==tr&&ay(r,ma(),o),qf}var ID=(()=>{class e{constructor(n){this._injector=n,this.cachedInjectors=new Map}getOrCreateStandaloneInjector(n){if(!n.standalone)return null;if(!this.cachedInjectors.has(n)){let r=Hl(!1,n.type),o=r.length>0?Ua([r],this._injector,`Standalone[${n.type.name}]`):null;this.cachedInjectors.set(n,o)}return this.cachedInjectors.get(n)}ngOnDestroy(){try{for(let n of this.cachedInjectors.values())n!==null&&n.destroy()}finally{this.cachedInjectors.clear()}}static{this.\u0275prov=w({token:e,providedIn:"environment",factory:()=>new e(M(Ie))})}}return e})();function Z(e){$a("NgStandalone"),e.getStandaloneInjector=t=>t.get(ID).getOrCreateStandaloneInjector(e)}function ED(e,t){let n=e[t];return n===tr?void 0:n}function xD(e,t,n,r,o,i){let s=t+n;return Uo(e,s,o)?sD(e,s+1,i?r.call(i,o):r(o)):ED(e,s+1)}function Gf(e,t){let n=xe(),r,o=e+ze;n.firstCreatePass?(r=SD(t,n.pipeRegistry),n.data[o]=r,r.onDestroy&&(n.destroyHooks??=[]).push(o,r.onDestroy)):r=n.data[o];let i=r.factory||(r.factory=Et(r.type,!0)),s,a=le(O);try{let c=mo(!1),u=i();return mo(c),CD(n,V(),o,u),u}finally{le(a)}}function SD(e,t){if(t)for(let n=t.length-1;n>=0;n--){let r=t[n];if(e===r.name)return r}}function Wf(e,t,n){let r=e+ze,o=V(),i=Wg(o,r);return MD(o,r)?xD(o,im(),t,i.transform,n,i):i.transform(n)}function MD(e,t){return e[I].data[t].pure}var Wo=(()=>{class e{log(n){console.log(n)}warn(n){console.warn(n)}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"platform"})}}return e})();var Zf=new E("");function In(e){return!!e&&typeof e.then=="function"}function Wa(e){return!!e&&typeof e.subscribe=="function"}var Yf=new E(""),Qf=(()=>{class e{constructor(){this.initialized=!1,this.done=!1,this.donePromise=new Promise((n,r)=>{this.resolve=n,this.reject=r}),this.appInits=p(Yf,{optional:!0})??[]}runInitializers(){if(this.initialized)return;let n=[];for(let o of this.appInits){let i=o();if(In(i))n.push(i);else if(Wa(i)){let s=new Promise((a,c)=>{i.subscribe({complete:a,error:c})});n.push(s)}}let r=()=>{this.done=!0,this.resolve()};Promise.all(n).then(()=>{r()}).catch(o=>{this.reject(o)}),n.length===0&&r(),this.initialized=!0}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),Za=new E("");function TD(){eu(()=>{throw new v(600,!1)})}function _D(e){return e.isBoundToModule}var ND=10;function AD(e,t,n){try{let r=n();return In(r)?r.catch(o=>{throw t.runOutsideAngular(()=>e.handleError(o)),o}):r}catch(r){throw t.runOutsideAngular(()=>e.handleError(r)),r}}var kt=(()=>{class e{constructor(){this._bootstrapListeners=[],this._runningTick=!1,this._destroyed=!1,this._destroyListeners=[],this._views=[],this.internalErrorHandler=p(Lm),this.afterRenderManager=p(fD),this.zonelessEnabled=p(Ho),this.dirtyFlags=0,this.deferredDirtyFlags=0,this.externalTestViews=new Set,this.beforeRender=new te,this.afterTick=new te,this.componentTypes=[],this.components=[],this.isStable=p(wn).hasPendingTasks.pipe(x(n=>!n)),this._injector=p(Ie)}get allViews(){return[...this.externalTestViews.keys(),...this._views]}get destroyed(){return this._destroyed}whenStable(){let n;return new Promise(r=>{n=this.isStable.subscribe({next:o=>{o&&r()}})}).finally(()=>{n.unsubscribe()})}get injector(){return this._injector}bootstrap(n,r){let o=n instanceof Co;if(!this._injector.get(Qf).done){let h=!o&&jl(n),f=!1;throw new v(405,f)}let s;o?s=n:s=this._injector.get(mn).resolveComponentFactory(n),this.componentTypes.push(s.componentType);let a=_D(s)?void 0:this._injector.get(mt),c=r||s.selector,u=s.create(Nt.NULL,[],c,a),l=u.location.nativeElement,d=u.injector.get(Zf,null);return d?.registerApplication(l),u.onDestroy(()=>{this.detachView(u.hostView),no(this.components,u),d?.unregisterApplication(l)}),this._loadComponent(u),u}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){if(this._runningTick)throw new v(101,!1);let n=R(null);try{this._runningTick=!0,this.synchronize()}catch(r){this.internalErrorHandler(r)}finally{this._runningTick=!1,R(n),this.afterTick.next()}}synchronize(){let n=null;this._injector.destroyed||(n=this._injector.get(vn,null,{optional:!0})),this.dirtyFlags|=this.deferredDirtyFlags,this.deferredDirtyFlags=0;let r=0;for(;this.dirtyFlags!==0&&r++<ND;)this.synchronizeOnce(n)}synchronizeOnce(n){if(this.dirtyFlags|=this.deferredDirtyFlags,this.deferredDirtyFlags=0,this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8,this.beforeRender.next(r);for(let{_lView:o,notifyErrorHandler:i}of this._views)RD(o,i,r,this.zonelessEnabled);if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&7)return}else n?.begin?.(),n?.end?.();this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:n})=>Po(n))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(n){let r=n;this._views.push(r),r.attachToAppRef(this)}detachView(n){let r=n;no(this._views,r),r.detachFromAppRef()}_loadComponent(n){this.attachView(n.hostView),this.tick(),this.components.push(n);let r=this._injector.get(Za,[]);[...this._bootstrapListeners,...r].forEach(o=>o(n))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(n=>n()),this._views.slice().forEach(n=>n.destroy())}finally{this._destroyed=!0,this._views=[],this._bootstrapListeners=[],this._destroyListeners=[]}}onDestroy(n){return this._destroyListeners.push(n),()=>no(this._destroyListeners,n)}destroy(){if(this._destroyed)throw new v(406,!1);let n=this._injector;n.destroy&&!n.destroyed&&n.destroy()}get viewCount(){return this._views.length}warnIfDestroyed(){}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function no(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}function RD(e,t,n,r){if(!n&&!Po(e))return;Af(e,t,n&&!r?0:1)}var Qs=class{constructor(t,n){this.ngModuleFactory=t,this.componentFactories=n}},Ya=(()=>{class e{compileModuleSync(n){return new Ys(n)}compileModuleAsync(n){return Promise.resolve(this.compileModuleSync(n))}compileModuleAndAllComponentsSync(n){let r=this.compileModuleSync(n),o=Vl(n),i=nf(o.declarations).reduce((s,a)=>{let c=xt(a);return c&&s.push(new Zn(c)),s},[]);return new Qs(r,i)}compileModuleAndAllComponentsAsync(n){return Promise.resolve(this.compileModuleAndAllComponentsSync(n))}clearCache(){}clearCacheFor(n){}getModuleId(n){}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var OD=(()=>{class e{constructor(){this.zone=p(q),this.changeDetectionScheduler=p(gn),this.applicationRef=p(kt)}initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),PD=new E("",{factory:()=>!1});function Kf({ngZoneFactory:e,ignoreChangesOutsideZone:t,scheduleInRootZone:n}){return e??=()=>new q($(m({},Xf()),{scheduleInRootZone:n})),[{provide:q,useFactory:e},{provide:ln,multi:!0,useFactory:()=>{let r=p(OD,{optional:!0});return()=>r.initialize()}},{provide:ln,multi:!0,useFactory:()=>{let r=p(kD);return()=>{r.initialize()}}},t===!0?{provide:kf,useValue:!0}:[],{provide:Ff,useValue:n??Nd}]}function Jf(e){let t=e?.ignoreChangesOutsideZone,n=e?.scheduleInRootZone,r=Kf({ngZoneFactory:()=>{let o=Xf(e);return o.scheduleInRootZone=n,o.shouldCoalesceEventChangeDetection&&$a("NgZone_CoalesceEvent"),new q(o)},ignoreChangesOutsideZone:t,scheduleInRootZone:n});return No([{provide:PD,useValue:!0},{provide:Ho,useValue:!1},r])}function Xf(e){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:e?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:e?.runCoalescing??!1}}var kD=(()=>{class e{constructor(){this.subscription=new U,this.initialized=!1,this.zone=p(q),this.pendingTasks=p(wn)}initialize(){if(this.initialized)return;this.initialized=!0;let n=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(n=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{q.assertNotInAngularZone(),queueMicrotask(()=>{n!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(n),n=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{q.assertInAngularZone(),n??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var FD=(()=>{class e{constructor(){this.appRef=p(kt),this.taskService=p(wn),this.ngZone=p(q),this.zonelessEnabled=p(Ho),this.disableScheduling=p(kf,{optional:!0})??!1,this.zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run,this.schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}],this.subscriptions=new U,this.angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(yo):null,this.scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(p(Ff,{optional:!0})??!1),this.cancelScheduledCallback=null,this.useMicrotaskScheduler=!1,this.runningTick=!1,this.pendingRenderTaskId=null,this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof bs||!this.zoneIsDefined)}notify(n){if(!this.zonelessEnabled&&n===5)return;switch(n){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 7:{this.appRef.deferredDirtyFlags|=8;break}case 9:case 8:case 6:case 10:default:this.appRef.dirtyFlags|=8}if(!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?Gu:Rd;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(){return!(this.disableScheduling||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(yo+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let n=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(r){throw this.taskService.remove(n),r}finally{this.cleanup()}this.useMicrotaskScheduler=!0,Gu(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(n)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let n=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(n)}}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function LD(){return typeof $localize<"u"&&$localize.locale||xo}var Qa=new E("",{providedIn:"root",factory:()=>p(Qa,S.Optional|S.SkipSelf)||LD()});var Ks=new E("");function Kr(e){return!e.moduleRef}function jD(e){let t=Kr(e)?e.r3Injector:e.moduleRef.injector,n=t.get(q);return n.run(()=>{Kr(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=t.get(Je,null),o;if(n.runOutsideAngular(()=>{o=n.onError.subscribe({next:i=>{r.handleError(i)}})}),Kr(e)){let i=()=>t.destroy(),s=e.platformInjector.get(Ks);s.add(i),t.onDestroy(()=>{o.unsubscribe(),s.delete(i)})}else{let i=()=>e.moduleRef.destroy(),s=e.platformInjector.get(Ks);s.add(i),e.moduleRef.onDestroy(()=>{no(e.allPlatformModules,e.moduleRef),o.unsubscribe(),s.delete(i)})}return AD(r,n,()=>{let i=t.get(Qf);return i.runInitializers(),i.donePromise.then(()=>{let s=t.get(Qa,xo);if(vD(s||xo),Kr(e)){let a=t.get(kt);return e.rootComponent!==void 0&&a.bootstrap(e.rootComponent),a}else return VD(e.moduleRef,e.allPlatformModules),e.moduleRef})})})}function VD(e,t){let n=e.injector.get(kt);if(e._bootstrapComponents.length>0)e._bootstrapComponents.forEach(r=>n.bootstrap(r));else if(e.instance.ngDoBootstrap)e.instance.ngDoBootstrap(n);else throw new v(-403,!1);t.push(e)}var ro=null;function BD(e=[],t){return Nt.create({name:t,providers:[{provide:Ao,useValue:"platform"},{provide:Ks,useValue:new Set([()=>ro=null])},...e]})}function $D(e=[]){if(ro)return ro;let t=BD(e);return ro=t,TD(),HD(t),t}function HD(e){e.get(Sa,null)?.forEach(n=>n())}var Ft=(()=>{class e{static{this.__NG_ELEMENT_ID__=UD}}return e})();function UD(e){return zD(de(),V(),(e&16)===16)}function zD(e,t,n){if(Oo(e)&&!n){let r=vt(e.index,t);return new Rt(r,r)}else if(e.type&175){let r=t[Ue];return new Rt(r,t)}return null}var Js=class{constructor(){}supports(t){return Hf(t)}create(t){return new Xs(t)}},qD=(e,t)=>t,Xs=class{constructor(t){this.length=0,this._linkedRecords=null,this._unlinkedRecords=null,this._previousItHead=null,this._itHead=null,this._itTail=null,this._additionsHead=null,this._additionsTail=null,this._movesHead=null,this._movesTail=null,this._removalsHead=null,this._removalsTail=null,this._identityChangesHead=null,this._identityChangesTail=null,this._trackByFn=t||qD}forEachItem(t){let n;for(n=this._itHead;n!==null;n=n._next)t(n)}forEachOperation(t){let n=this._itHead,r=this._removalsHead,o=0,i=null;for(;n||r;){let s=!r||n&&n.currentIndex<gl(r,o,i)?n:r,a=gl(s,o,i),c=s.currentIndex;if(s===r)o--,r=r._nextRemoved;else if(n=n._next,s.previousIndex==null)o++;else{i||(i=[]);let u=a-o,l=c-o;if(u!=l){for(let h=0;h<u;h++){let f=h<i.length?i[h]:i[h]=0,g=f+h;l<=g&&g<u&&(i[h]=f+1)}let d=s.previousIndex;i[d]=l-u}}a!==c&&t(s,a,c)}}forEachPreviousItem(t){let n;for(n=this._previousItHead;n!==null;n=n._nextPrevious)t(n)}forEachAddedItem(t){let n;for(n=this._additionsHead;n!==null;n=n._nextAdded)t(n)}forEachMovedItem(t){let n;for(n=this._movesHead;n!==null;n=n._nextMoved)t(n)}forEachRemovedItem(t){let n;for(n=this._removalsHead;n!==null;n=n._nextRemoved)t(n)}forEachIdentityChange(t){let n;for(n=this._identityChangesHead;n!==null;n=n._nextIdentityChange)t(n)}diff(t){if(t==null&&(t=[]),!Hf(t))throw new v(900,!1);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let n=this._itHead,r=!1,o,i,s;if(Array.isArray(t)){this.length=t.length;for(let a=0;a<this.length;a++)i=t[a],s=this._trackByFn(a,i),n===null||!Object.is(n.trackById,s)?(n=this._mismatch(n,i,s,a),r=!0):(r&&(n=this._verifyReinsertion(n,i,s,a)),Object.is(n.item,i)||this._addIdentityChange(n,i)),n=n._next}else o=0,oD(t,a=>{s=this._trackByFn(o,a),n===null||!Object.is(n.trackById,s)?(n=this._mismatch(n,a,s,o),r=!0):(r&&(n=this._verifyReinsertion(n,a,s,o)),Object.is(n.item,a)||this._addIdentityChange(n,a)),n=n._next,o++}),this.length=o;return this._truncate(n),this.collection=t,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let t;for(t=this._previousItHead=this._itHead;t!==null;t=t._next)t._nextPrevious=t._next;for(t=this._additionsHead;t!==null;t=t._nextAdded)t.previousIndex=t.currentIndex;for(this._additionsHead=this._additionsTail=null,t=this._movesHead;t!==null;t=t._nextMoved)t.previousIndex=t.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(t,n,r,o){let i;return t===null?i=this._itTail:(i=t._prev,this._remove(t)),t=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null),t!==null?(Object.is(t.item,n)||this._addIdentityChange(t,n),this._reinsertAfter(t,i,o)):(t=this._linkedRecords===null?null:this._linkedRecords.get(r,o),t!==null?(Object.is(t.item,n)||this._addIdentityChange(t,n),this._moveAfter(t,i,o)):t=this._addAfter(new ea(n,r),i,o)),t}_verifyReinsertion(t,n,r,o){let i=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null);return i!==null?t=this._reinsertAfter(i,t._prev,o):t.currentIndex!=o&&(t.currentIndex=o,this._addToMoves(t,o)),t}_truncate(t){for(;t!==null;){let n=t._next;this._addToRemovals(this._unlink(t)),t=n}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(t,n,r){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(t);let o=t._prevRemoved,i=t._nextRemoved;return o===null?this._removalsHead=i:o._nextRemoved=i,i===null?this._removalsTail=o:i._prevRemoved=o,this._insertAfter(t,n,r),this._addToMoves(t,r),t}_moveAfter(t,n,r){return this._unlink(t),this._insertAfter(t,n,r),this._addToMoves(t,r),t}_addAfter(t,n,r){return this._insertAfter(t,n,r),this._additionsTail===null?this._additionsTail=this._additionsHead=t:this._additionsTail=this._additionsTail._nextAdded=t,t}_insertAfter(t,n,r){let o=n===null?this._itHead:n._next;return t._next=o,t._prev=n,o===null?this._itTail=t:o._prev=t,n===null?this._itHead=t:n._next=t,this._linkedRecords===null&&(this._linkedRecords=new So),this._linkedRecords.put(t),t.currentIndex=r,t}_remove(t){return this._addToRemovals(this._unlink(t))}_unlink(t){this._linkedRecords!==null&&this._linkedRecords.remove(t);let n=t._prev,r=t._next;return n===null?this._itHead=r:n._next=r,r===null?this._itTail=n:r._prev=n,t}_addToMoves(t,n){return t.previousIndex===n||(this._movesTail===null?this._movesTail=this._movesHead=t:this._movesTail=this._movesTail._nextMoved=t),t}_addToRemovals(t){return this._unlinkedRecords===null&&(this._unlinkedRecords=new So),this._unlinkedRecords.put(t),t.currentIndex=null,t._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=t,t._prevRemoved=null):(t._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=t),t}_addIdentityChange(t,n){return t.item=n,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=t:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=t,t}},ea=class{constructor(t,n){this.item=t,this.trackById=n,this.currentIndex=null,this.previousIndex=null,this._nextPrevious=null,this._prev=null,this._next=null,this._prevDup=null,this._nextDup=null,this._prevRemoved=null,this._nextRemoved=null,this._nextAdded=null,this._nextMoved=null,this._nextIdentityChange=null}},ta=class{constructor(){this._head=null,this._tail=null}add(t){this._head===null?(this._head=this._tail=t,t._nextDup=null,t._prevDup=null):(this._tail._nextDup=t,t._prevDup=this._tail,t._nextDup=null,this._tail=t)}get(t,n){let r;for(r=this._head;r!==null;r=r._nextDup)if((n===null||n<=r.currentIndex)&&Object.is(r.trackById,t))return r;return null}remove(t){let n=t._prevDup,r=t._nextDup;return n===null?this._head=r:n._nextDup=r,r===null?this._tail=n:r._prevDup=n,this._head===null}},So=class{constructor(){this.map=new Map}put(t){let n=t.trackById,r=this.map.get(n);r||(r=new ta,this.map.set(n,r)),r.add(t)}get(t,n){let r=t,o=this.map.get(r);return o?o.get(t,n):null}remove(t){let n=t.trackById;return this.map.get(n).remove(t)&&this.map.delete(n),t}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function gl(e,t,n){let r=e.previousIndex;if(r===null)return r;let o=0;return n&&r<n.length&&(o=n[r]),r+t+o}function ml(){return new Ka([new Js])}var Ka=(()=>{class e{static{this.\u0275prov=w({token:e,providedIn:"root",factory:ml})}constructor(n){this.factories=n}static create(n,r){if(r!=null){let o=r.factories.slice();n=n.concat(o)}return new e(n)}static extend(n){return{provide:e,useFactory:r=>e.create(n,r||ml()),deps:[[e,new Tl,new oa]]}}find(n){let r=this.factories.find(o=>o.supports(n));if(r!=null)return r;throw new v(901,!1)}}return e})();function eh(e){try{let{rootComponent:t,appProviders:n,platformProviders:r}=e,o=$D(r),i=[Kf({}),{provide:gn,useExisting:FD},...n||[]],s=new Eo({providers:i,parent:o,debugName:"",runEnvironmentInitializers:!1});return jD({r3Injector:s.injector,platformInjector:o,rootComponent:t})}catch(t){return Promise.reject(t)}}function or(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function Ja(e){let t=R(null);try{return e()}finally{R(t)}}var ah=null;function En(){return ah}function ch(e){ah??=e}var Zo=class{};var ve=new E(""),uh=(()=>{class e{historyGo(n){throw new Error("")}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p(GD),providedIn:"platform"})}}return e})();var GD=(()=>{class e extends uh{constructor(){super(),this._doc=p(ve),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return En().getBaseHref(this._doc)}onPopState(n){let r=En().getGlobalEventTarget(this._doc,"window");return r.addEventListener("popstate",n,!1),()=>r.removeEventListener("popstate",n)}onHashChange(n){let r=En().getGlobalEventTarget(this._doc,"window");return r.addEventListener("hashchange",n,!1),()=>r.removeEventListener("hashchange",n)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(n){this._location.pathname=n}pushState(n,r,o){this._history.pushState(n,r,o)}replaceState(n,r,o){this._history.replaceState(n,r,o)}forward(){this._history.forward()}back(){this._history.back()}historyGo(n=0){this._history.go(n)}getState(){return this._history.state}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>new e,providedIn:"platform"})}}return e})();function lh(e,t){if(e.length==0)return t;if(t.length==0)return e;let n=0;return e.endsWith("/")&&n++,t.startsWith("/")&&n++,n==2?e+t.substring(1):n==1?e+t:e+"/"+t}function th(e){let t=e.match(/#|\?|$/),n=t&&t.index||e.length,r=n-(e[n-1]==="/"?1:0);return e.slice(0,r)+e.slice(n)}function Lt(e){return e&&e[0]!=="?"?"?"+e:e}var xn=(()=>{class e{historyGo(n){throw new Error("")}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p(dh),providedIn:"root"})}}return e})(),WD=new E(""),dh=(()=>{class e extends xn{constructor(n,r){super(),this._platformLocation=n,this._removeListenerFns=[],this._baseHref=r??this._platformLocation.getBaseHrefFromDOM()??p(ve).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}prepareExternalUrl(n){return lh(this._baseHref,n)}path(n=!1){let r=this._platformLocation.pathname+Lt(this._platformLocation.search),o=this._platformLocation.hash;return o&&n?`${r}${o}`:r}pushState(n,r,o,i){let s=this.prepareExternalUrl(o+Lt(i));this._platformLocation.pushState(n,r,s)}replaceState(n,r,o,i){let s=this.prepareExternalUrl(o+Lt(i));this._platformLocation.replaceState(n,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}static{this.\u0275fac=function(r){return new(r||e)(M(uh),M(WD,8))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var ir=(()=>{class e{constructor(n){this._subject=new X,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=n;let r=this._locationStrategy.getBaseHref();this._basePath=QD(th(nh(r))),this._locationStrategy.onPopState(o=>{this._subject.emit({url:this.path(!0),pop:!0,state:o.state,type:o.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(n=!1){return this.normalize(this._locationStrategy.path(n))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(n,r=""){return this.path()==this.normalize(n+Lt(r))}normalize(n){return e.stripTrailingSlash(YD(this._basePath,nh(n)))}prepareExternalUrl(n){return n&&n[0]!=="/"&&(n="/"+n),this._locationStrategy.prepareExternalUrl(n)}go(n,r="",o=null){this._locationStrategy.pushState(o,"",n,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Lt(r)),o)}replaceState(n,r="",o=null){this._locationStrategy.replaceState(o,"",n,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Lt(r)),o)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(n=0){this._locationStrategy.historyGo?.(n)}onUrlChange(n){return this._urlChangeListeners.push(n),this._urlChangeSubscription??=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)}),()=>{let r=this._urlChangeListeners.indexOf(n);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(n="",r){this._urlChangeListeners.forEach(o=>o(n,r))}subscribe(n,r,o){return this._subject.subscribe({next:n,error:r,complete:o})}static{this.normalizeQueryParams=Lt}static{this.joinWithSlash=lh}static{this.stripTrailingSlash=th}static{this.\u0275fac=function(r){return new(r||e)(M(xn))}}static{this.\u0275prov=w({token:e,factory:()=>ZD(),providedIn:"root"})}}return e})();function ZD(){return new ir(M(xn))}function YD(e,t){if(!e||!t.startsWith(e))return t;let n=t.substring(e.length);return n===""||["/",";","?","#"].includes(n[0])?n:t}function nh(e){return e.replace(/\/index.html$/,"")}function QD(e){if(new RegExp("^(https?:)?//").test(e)){let[,n]=e.split(/\/\/[^\/]+/);return n}return e}function fh(e,t){t=encodeURIComponent(t);for(let n of e.split(";")){let r=n.indexOf("="),[o,i]=r==-1?[n,""]:[n.slice(0,r),n.slice(r+1)];if(o.trim()===t)return decodeURIComponent(i)}return null}var Xa=class{constructor(t,n,r,o){this.$implicit=t,this.ngForOf=n,this.index=r,this.count=o}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},hh=(()=>{class e{set ngForOf(n){this._ngForOf=n,this._ngForOfDirty=!0}set ngForTrackBy(n){this._trackByFn=n}get ngForTrackBy(){return this._trackByFn}constructor(n,r,o){this._viewContainer=n,this._template=r,this._differs=o,this._ngForOf=null,this._ngForOfDirty=!0,this._differ=null}set ngForTemplate(n){n&&(this._template=n)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let n=this._ngForOf;if(!this._differ&&n)if(0)try{}catch{}else this._differ=this._differs.find(n).create(this.ngForTrackBy)}if(this._differ){let n=this._differ.diff(this._ngForOf);n&&this._applyChanges(n)}}_applyChanges(n){let r=this._viewContainer;n.forEachOperation((o,i,s)=>{if(o.previousIndex==null)r.createEmbeddedView(this._template,new Xa(o.item,this._ngForOf,-1,-1),s===null?void 0:s);else if(s==null)r.remove(i===null?void 0:i);else if(i!==null){let a=r.get(i);r.move(a,s),rh(a,o)}});for(let o=0,i=r.length;o<i;o++){let a=r.get(o).context;a.index=o,a.count=i,a.ngForOf=this._ngForOf}n.forEachIdentityChange(o=>{let i=r.get(o.currentIndex);rh(i,o)})}static ngTemplateContextGuard(n,r){return!0}static{this.\u0275fac=function(r){return new(r||e)(O(Pt),O(pn),O(Ka))}}static{this.\u0275dir=yn({type:e,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"},standalone:!0})}}return e})();function rh(e,t){e.context.$implicit=t.item}function KD(e,t){return new v(2100,!1)}var ec=class{createSubscription(t,n){return Ja(()=>t.subscribe({next:n,error:r=>{throw r}}))}dispose(t){Ja(()=>t.unsubscribe())}},tc=class{createSubscription(t,n){return t.then(n,r=>{throw r})}dispose(t){}},JD=new tc,XD=new ec,ph=(()=>{class e{constructor(n){this._latestValue=null,this.markForCheckOnValueUpdate=!0,this._subscription=null,this._obj=null,this._strategy=null,this._ref=n}ngOnDestroy(){this._subscription&&this._dispose(),this._ref=null}transform(n){if(!this._obj){if(n)try{this.markForCheckOnValueUpdate=!1,this._subscribe(n)}finally{this.markForCheckOnValueUpdate=!0}return this._latestValue}return n!==this._obj?(this._dispose(),this.transform(n)):this._latestValue}_subscribe(n){this._obj=n,this._strategy=this._selectStrategy(n),this._subscription=this._strategy.createSubscription(n,r=>this._updateLatestValue(n,r))}_selectStrategy(n){if(In(n))return JD;if(Wa(n))return XD;throw KD(e,n)}_dispose(){this._strategy.dispose(this._subscription),this._latestValue=null,this._subscription=null,this._obj=null}_updateLatestValue(n,r){n===this._obj&&(this._latestValue=r,this.markForCheckOnValueUpdate&&this._ref?.markForCheck())}static{this.\u0275fac=function(r){return new(r||e)(O(Ft,16))}}static{this.\u0275pipe=kl({name:"async",type:e,pure:!1,standalone:!0})}}return e})();var gh="browser",ew="server";function nc(e){return e===ew}var Yo=class{};var ic=class extends Zo{constructor(){super(...arguments),this.supportsDOMEvents=!0}},sc=class e extends ic{static makeCurrent(){ch(new e)}onAndCancel(t,n,r){return t.addEventListener(n,r),()=>{t.removeEventListener(n,r)}}dispatchEvent(t,n){t.dispatchEvent(n)}remove(t){t.remove()}createElement(t,n){return n=n||this.getDefaultDocument(),n.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,n){return n==="window"?window:n==="document"?t:n==="body"?t.body:null}getBaseHref(t){let n=nw();return n==null?null:rw(n)}resetBaseElement(){sr=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return fh(document.cookie,t)}},sr=null;function nw(){return sr=sr||document.querySelector("base"),sr?sr.getAttribute("href"):null}function rw(e){return new URL(e,document.baseURI).pathname}var ow=(()=>{class e{build(){return new XMLHttpRequest}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})(),ac=new E(""),Dh=(()=>{class e{constructor(n,r){this._zone=r,this._eventNameToPlugin=new Map,n.forEach(o=>{o.manager=this}),this._plugins=n.slice().reverse()}addEventListener(n,r,o){return this._findPluginFor(r).addEventListener(n,r,o)}getZone(){return this._zone}_findPluginFor(n){let r=this._eventNameToPlugin.get(n);if(r)return r;if(r=this._plugins.find(i=>i.supports(n)),!r)throw new v(5101,!1);return this._eventNameToPlugin.set(n,r),r}static{this.\u0275fac=function(r){return new(r||e)(M(ac),M(q))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})(),Qo=class{constructor(t){this._doc=t}},rc="ng-app-id",wh=(()=>{class e{constructor(n,r,o,i={}){this.doc=n,this.appId=r,this.nonce=o,this.platformId=i,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=nc(i),this.resetHostNodes()}addStyles(n){for(let r of n)this.changeUsageCount(r,1)===1&&this.onStyleAdded(r)}removeStyles(n){for(let r of n)this.changeUsageCount(r,-1)<=0&&this.onStyleRemoved(r)}ngOnDestroy(){let n=this.styleNodesInDOM;n&&(n.forEach(r=>r.remove()),n.clear());for(let r of this.getAllStyles())this.onStyleRemoved(r);this.resetHostNodes()}addHost(n){this.hostNodes.add(n);for(let r of this.getAllStyles())this.addStyleToHost(n,r)}removeHost(n){this.hostNodes.delete(n)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(n){for(let r of this.hostNodes)this.addStyleToHost(r,n)}onStyleRemoved(n){let r=this.styleRef;r.get(n)?.elements?.forEach(o=>o.remove()),r.delete(n)}collectServerRenderedStyles(){let n=this.doc.head?.querySelectorAll(`style[${rc}="${this.appId}"]`);if(n?.length){let r=new Map;return n.forEach(o=>{o.textContent!=null&&r.set(o.textContent,o)}),r}return null}changeUsageCount(n,r){let o=this.styleRef;if(o.has(n)){let i=o.get(n);return i.usage+=r,i.usage}return o.set(n,{usage:r,elements:[]}),r}getStyleElement(n,r){let o=this.styleNodesInDOM,i=o?.get(r);if(i?.parentNode===n)return o.delete(r),i.removeAttribute(rc),i;{let s=this.doc.createElement("style");return this.nonce&&s.setAttribute("nonce",this.nonce),s.textContent=r,this.platformIsServer&&s.setAttribute(rc,this.appId),n.appendChild(s),s}}addStyleToHost(n,r){let o=this.getStyleElement(n,r),i=this.styleRef,s=i.get(r)?.elements;s?s.push(o):i.set(r,{elements:[o],usage:1})}resetHostNodes(){let n=this.hostNodes;n.clear(),n.add(this.doc.head)}static{this.\u0275fac=function(r){return new(r||e)(M(ve),M(xa),M(Ma,8),M(bn))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})(),oc={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},uc=/%COMP%/g,Ch="%COMP%",iw=`_nghost-${Ch}`,sw=`_ngcontent-${Ch}`,aw=!0,cw=new E("",{providedIn:"root",factory:()=>aw});function uw(e){return sw.replace(uc,e)}function lw(e){return iw.replace(uc,e)}function bh(e,t){return t.map(n=>n.replace(uc,e))}var mh=(()=>{class e{constructor(n,r,o,i,s,a,c,u=null){this.eventManager=n,this.sharedStylesHost=r,this.appId=o,this.removeStylesOnCompDestroy=i,this.doc=s,this.platformId=a,this.ngZone=c,this.nonce=u,this.rendererByCompId=new Map,this.platformIsServer=nc(a),this.defaultRenderer=new ar(n,s,c,this.platformIsServer)}createRenderer(n,r){if(!n||!r)return this.defaultRenderer;this.platformIsServer&&r.encapsulation===$e.ShadowDom&&(r=$(m({},r),{encapsulation:$e.Emulated}));let o=this.getOrCreateRenderer(n,r);return o instanceof Ko?o.applyToHost(n):o instanceof cr&&o.applyStyles(),o}getOrCreateRenderer(n,r){let o=this.rendererByCompId,i=o.get(r.id);if(!i){let s=this.doc,a=this.ngZone,c=this.eventManager,u=this.sharedStylesHost,l=this.removeStylesOnCompDestroy,d=this.platformIsServer;switch(r.encapsulation){case $e.Emulated:i=new Ko(c,u,r,this.appId,l,s,a,d);break;case $e.ShadowDom:return new cc(c,u,n,r,s,a,this.nonce,d);default:i=new cr(c,u,r,l,s,a,d);break}o.set(r.id,i)}return i}ngOnDestroy(){this.rendererByCompId.clear()}static{this.\u0275fac=function(r){return new(r||e)(M(Dh),M(wh),M(xa),M(cw),M(ve),M(bn),M(q),M(Ma))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})(),ar=class{constructor(t,n,r,o){this.eventManager=t,this.doc=n,this.ngZone=r,this.platformIsServer=o,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(t,n){return n?this.doc.createElementNS(oc[n]||n,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,n){(vh(t)?t.content:t).appendChild(n)}insertBefore(t,n,r){t&&(vh(t)?t.content:t).insertBefore(n,r)}removeChild(t,n){n.remove()}selectRootElement(t,n){let r=typeof t=="string"?this.doc.querySelector(t):t;if(!r)throw new v(-5104,!1);return n||(r.textContent=""),r}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,n,r,o){if(o){n=o+":"+n;let i=oc[o];i?t.setAttributeNS(i,n,r):t.setAttribute(n,r)}else t.setAttribute(n,r)}removeAttribute(t,n,r){if(r){let o=oc[r];o?t.removeAttributeNS(o,n):t.removeAttribute(`${r}:${n}`)}else t.removeAttribute(n)}addClass(t,n){t.classList.add(n)}removeClass(t,n){t.classList.remove(n)}setStyle(t,n,r,o){o&(Ot.DashCase|Ot.Important)?t.style.setProperty(n,r,o&Ot.Important?"important":""):t.style[n]=r}removeStyle(t,n,r){r&Ot.DashCase?t.style.removeProperty(n):t.style[n]=""}setProperty(t,n,r){t!=null&&(t[n]=r)}setValue(t,n){t.nodeValue=n}listen(t,n,r){if(typeof t=="string"&&(t=En().getGlobalEventTarget(this.doc,t),!t))throw new Error(`Unsupported event target ${t} for event ${n}`);return this.eventManager.addEventListener(t,n,this.decoratePreventDefault(r))}decoratePreventDefault(t){return n=>{if(n==="__ngUnwrap__")return t;(this.platformIsServer?this.ngZone.runGuarded(()=>t(n)):t(n))===!1&&n.preventDefault()}}};function vh(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var cc=class extends ar{constructor(t,n,r,o,i,s,a,c){super(t,i,s,c),this.sharedStylesHost=n,this.hostEl=r,this.shadowRoot=r.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=bh(o.id,o.styles);for(let l of u){let d=document.createElement("style");a&&d.setAttribute("nonce",a),d.textContent=l,this.shadowRoot.appendChild(d)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,n){return super.appendChild(this.nodeOrShadowRoot(t),n)}insertBefore(t,n,r){return super.insertBefore(this.nodeOrShadowRoot(t),n,r)}removeChild(t,n){return super.removeChild(null,n)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},cr=class extends ar{constructor(t,n,r,o,i,s,a,c){super(t,i,s,a),this.sharedStylesHost=n,this.removeStylesOnCompDestroy=o,this.styles=c?bh(c,r.styles):r.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},Ko=class extends cr{constructor(t,n,r,o,i,s,a,c){let u=o+"-"+r.id;super(t,n,r,i,s,a,c,u),this.contentAttr=uw(u),this.hostAttr=lw(u)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,n){let r=super.createElement(t,n);return super.setAttribute(r,this.contentAttr,""),r}},dw=(()=>{class e extends Qo{constructor(n){super(n)}supports(n){return!0}addEventListener(n,r,o){return n.addEventListener(r,o,!1),()=>this.removeEventListener(n,r,o)}removeEventListener(n,r,o){return n.removeEventListener(r,o)}static{this.\u0275fac=function(r){return new(r||e)(M(ve))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})(),yh=["alt","control","meta","shift"],fw={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},hw={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},pw=(()=>{class e extends Qo{constructor(n){super(n)}supports(n){return e.parseEventName(n)!=null}addEventListener(n,r,o){let i=e.parseEventName(r),s=e.eventCallback(i.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>En().onAndCancel(n,i.domEventName,s))}static parseEventName(n){let r=n.toLowerCase().split("."),o=r.shift();if(r.length===0||!(o==="keydown"||o==="keyup"))return null;let i=e._normalizeKey(r.pop()),s="",a=r.indexOf("code");if(a>-1&&(r.splice(a,1),s="code."),yh.forEach(u=>{let l=r.indexOf(u);l>-1&&(r.splice(l,1),s+=u+".")}),s+=i,r.length!=0||i.length===0)return null;let c={};return c.domEventName=o,c.fullKey=s,c}static matchEventFullKeyCode(n,r){let o=fw[n.key]||n.key,i="";return r.indexOf("code.")>-1&&(o=n.code,i="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),yh.forEach(s=>{if(s!==o){let a=hw[s];a(n)&&(i+=s+".")}}),i+=o,i===r)}static eventCallback(n,r,o){return i=>{e.matchEventFullKeyCode(i,n)&&o.runGuarded(()=>r(i))}}static _normalizeKey(n){return n==="esc"?"escape":n}static{this.\u0275fac=function(r){return new(r||e)(M(ve))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac})}}return e})();function Ih(e,t){return eh(m({rootComponent:e},gw(t)))}function gw(e){return{appProviders:[...ww,...e?.providers??[]],platformProviders:Dw}}function mw(){sc.makeCurrent()}function vw(){return new Je}function yw(){return Vd(document),document}var Dw=[{provide:bn,useValue:gh},{provide:Sa,useValue:mw,multi:!0},{provide:ve,useFactory:yw,deps:[]}];var ww=[{provide:Ao,useValue:"root"},{provide:Je,useFactory:vw,deps:[]},{provide:ac,useClass:dw,multi:!0,deps:[ve,q,bn]},{provide:ac,useClass:pw,multi:!0,deps:[ve]},mh,wh,Dh,{provide:vn,useExisting:mh},{provide:Yo,useClass:ow,deps:[]},[]];var Eh=(()=>{class e{constructor(n){this._doc=n}getTitle(){return this._doc.title}setTitle(n){this._doc.title=n||""}static{this.\u0275fac=function(r){return new(r||e)(M(ve))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var ye=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:function(r){let o=null;return r?o=new(r||e):o=M(Cw),o},providedIn:"root"})}}return e})(),Cw=(()=>{class e extends ye{constructor(n){super(),this._doc=n}sanitize(n,r){if(r==null)return null;switch(n){case ke.NONE:return r;case ke.HTML:return ot(r,"HTML")?Ge(r):_a(this._doc,String(r)).toString();case ke.STYLE:return ot(r,"Style")?Ge(r):r;case ke.SCRIPT:if(ot(r,"Script"))return Ge(r);throw new v(5200,!1);case ke.URL:return ot(r,"URL")?Ge(r):Lo(String(r));case ke.RESOURCE_URL:if(ot(r,"ResourceURL"))return Ge(r);throw new v(5201,!1);default:throw new v(5202,!1)}}bypassSecurityTrustHtml(n){return zd(n)}bypassSecurityTrustStyle(n){return qd(n)}bypassSecurityTrustScript(n){return Gd(n)}bypassSecurityTrustUrl(n){return Wd(n)}bypassSecurityTrustResourceUrl(n){return Zd(n)}static{this.\u0275fac=function(r){return new(r||e)(M(ve))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var b="primary",Er=Symbol("RouteTitle"),pc=class{constructor(t){this.params=t||{}}has(t){return Object.prototype.hasOwnProperty.call(this.params,t)}get(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n[0]:n}return null}getAll(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n:[n]}return[]}get keys(){return Object.keys(this.params)}};function An(e){return new pc(e)}function bw(e,t,n){let r=n.path.split("/");if(r.length>e.length||n.pathMatch==="full"&&(t.hasChildren()||r.length<e.length))return null;let o={};for(let i=0;i<r.length;i++){let s=r[i],a=e[i];if(s[0]===":")o[s.substring(1)]=a;else if(s!==a.path)return null}return{consumed:e.slice(0,r.length),posParams:o}}function Iw(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(!We(e[n],t[n]))return!1;return!0}function We(e,t){let n=e?gc(e):void 0,r=t?gc(t):void 0;if(!n||!r||n.length!=r.length)return!1;let o;for(let i=0;i<n.length;i++)if(o=n[i],!Rh(e[o],t[o]))return!1;return!0}function gc(e){return[...Object.keys(e),...Object.getOwnPropertySymbols(e)]}function Rh(e,t){if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;let n=[...e].sort(),r=[...t].sort();return n.every((o,i)=>r[i]===o)}else return e===t}function Oh(e){return e.length>0?e[e.length-1]:null}function yt(e){return zi(e)?e:In(e)?z(Promise.resolve(e)):y(e)}var Ew={exact:kh,subset:Fh},Ph={exact:xw,subset:Sw,ignored:()=>!0};function xh(e,t,n){return Ew[n.paths](e.root,t.root,n.matrixParams)&&Ph[n.queryParams](e.queryParams,t.queryParams)&&!(n.fragment==="exact"&&e.fragment!==t.fragment)}function xw(e,t){return We(e,t)}function kh(e,t,n){if(!Bt(e.segments,t.segments)||!ei(e.segments,t.segments,n)||e.numberOfChildren!==t.numberOfChildren)return!1;for(let r in t.children)if(!e.children[r]||!kh(e.children[r],t.children[r],n))return!1;return!0}function Sw(e,t){return Object.keys(t).length<=Object.keys(e).length&&Object.keys(t).every(n=>Rh(e[n],t[n]))}function Fh(e,t,n){return Lh(e,t,t.segments,n)}function Lh(e,t,n,r){if(e.segments.length>n.length){let o=e.segments.slice(0,n.length);return!(!Bt(o,n)||t.hasChildren()||!ei(o,n,r))}else if(e.segments.length===n.length){if(!Bt(e.segments,n)||!ei(e.segments,n,r))return!1;for(let o in t.children)if(!e.children[o]||!Fh(e.children[o],t.children[o],r))return!1;return!0}else{let o=n.slice(0,e.segments.length),i=n.slice(e.segments.length);return!Bt(e.segments,o)||!ei(e.segments,o,r)||!e.children[b]?!1:Lh(e.children[b],t,i,r)}}function ei(e,t,n){return t.every((r,o)=>Ph[n](e[o].parameters,r.parameters))}var at=class{constructor(t=new P([],{}),n={},r=null){this.root=t,this.queryParams=n,this.fragment=r}get queryParamMap(){return this._queryParamMap??=An(this.queryParams),this._queryParamMap}toString(){return _w.serialize(this)}},P=class{constructor(t,n){this.segments=t,this.children=n,this.parent=null,Object.values(n).forEach(r=>r.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return ti(this)}},Vt=class{constructor(t,n){this.path=t,this.parameters=n}get parameterMap(){return this._parameterMap??=An(this.parameters),this._parameterMap}toString(){return Vh(this)}};function Mw(e,t){return Bt(e,t)&&e.every((n,r)=>We(n.parameters,t[r].parameters))}function Bt(e,t){return e.length!==t.length?!1:e.every((n,r)=>n.path===t[r].path)}function Tw(e,t){let n=[];return Object.entries(e.children).forEach(([r,o])=>{r===b&&(n=n.concat(t(o,r)))}),Object.entries(e.children).forEach(([r,o])=>{r!==b&&(n=n.concat(t(o,r)))}),n}var $c=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>new gr,providedIn:"root"})}}return e})(),gr=class{parse(t){let n=new vc(t);return new at(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())}serialize(t){let n=`/${ur(t.root,!0)}`,r=Rw(t.queryParams),o=typeof t.fragment=="string"?`#${Nw(t.fragment)}`:"";return`${n}${r}${o}`}},_w=new gr;function ti(e){return e.segments.map(t=>Vh(t)).join("/")}function ur(e,t){if(!e.hasChildren())return ti(e);if(t){let n=e.children[b]?ur(e.children[b],!1):"",r=[];return Object.entries(e.children).forEach(([o,i])=>{o!==b&&r.push(`${o}:${ur(i,!1)}`)}),r.length>0?`${n}(${r.join("//")})`:n}else{let n=Tw(e,(r,o)=>o===b?[ur(e.children[b],!1)]:[`${o}:${ur(r,!1)}`]);return Object.keys(e.children).length===1&&e.children[b]!=null?`${ti(e)}/${n[0]}`:`${ti(e)}/(${n.join("//")})`}}function jh(e){return encodeURIComponent(e).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Jo(e){return jh(e).replace(/%3B/gi,";")}function Nw(e){return encodeURI(e)}function mc(e){return jh(e).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function ni(e){return decodeURIComponent(e)}function Sh(e){return ni(e.replace(/\+/g,"%20"))}function Vh(e){return`${mc(e.path)}${Aw(e.parameters)}`}function Aw(e){return Object.entries(e).map(([t,n])=>`;${mc(t)}=${mc(n)}`).join("")}function Rw(e){let t=Object.entries(e).map(([n,r])=>Array.isArray(r)?r.map(o=>`${Jo(n)}=${Jo(o)}`).join("&"):`${Jo(n)}=${Jo(r)}`).filter(n=>n);return t.length?`?${t.join("&")}`:""}var Ow=/^[^\/()?;#]+/;function lc(e){let t=e.match(Ow);return t?t[0]:""}var Pw=/^[^\/()?;=#]+/;function kw(e){let t=e.match(Pw);return t?t[0]:""}var Fw=/^[^=?&#]+/;function Lw(e){let t=e.match(Fw);return t?t[0]:""}var jw=/^[^&#]+/;function Vw(e){let t=e.match(jw);return t?t[0]:""}var vc=class{constructor(t){this.url=t,this.remaining=t}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new P([],{}):new P([],this.parseChildren())}parseQueryParams(){let t={};if(this.consumeOptional("?"))do this.parseQueryParam(t);while(this.consumeOptional("&"));return t}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let n={};this.peekStartsWith("/(")&&(this.capture("/"),n=this.parseParens(!0));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1)),(t.length>0||Object.keys(n).length>0)&&(r[b]=new P(t,n)),r}parseSegment(){let t=lc(this.remaining);if(t===""&&this.peekStartsWith(";"))throw new v(4009,!1);return this.capture(t),new Vt(ni(t),this.parseMatrixParams())}parseMatrixParams(){let t={};for(;this.consumeOptional(";");)this.parseParam(t);return t}parseParam(t){let n=kw(this.remaining);if(!n)return;this.capture(n);let r="";if(this.consumeOptional("=")){let o=lc(this.remaining);o&&(r=o,this.capture(r))}t[ni(n)]=ni(r)}parseQueryParam(t){let n=Lw(this.remaining);if(!n)return;this.capture(n);let r="";if(this.consumeOptional("=")){let s=Vw(this.remaining);s&&(r=s,this.capture(r))}let o=Sh(n),i=Sh(r);if(t.hasOwnProperty(o)){let s=t[o];Array.isArray(s)||(s=[s],t[o]=s),s.push(i)}else t[o]=i}parseParens(t){let n={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=lc(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new v(4010,!1);let i;r.indexOf(":")>-1?(i=r.slice(0,r.indexOf(":")),this.capture(i),this.capture(":")):t&&(i=b);let s=this.parseChildren();n[i]=Object.keys(s).length===1?s[b]:new P([],s),this.consumeOptional("//")}return n}peekStartsWith(t){return this.remaining.startsWith(t)}consumeOptional(t){return this.peekStartsWith(t)?(this.remaining=this.remaining.substring(t.length),!0):!1}capture(t){if(!this.consumeOptional(t))throw new v(4011,!1)}};function Bh(e){return e.segments.length>0?new P([],{[b]:e}):e}function $h(e){let t={};for(let[r,o]of Object.entries(e.children)){let i=$h(o);if(r===b&&i.segments.length===0&&i.hasChildren())for(let[s,a]of Object.entries(i.children))t[s]=a;else(i.segments.length>0||i.hasChildren())&&(t[r]=i)}let n=new P(e.segments,t);return Bw(n)}function Bw(e){if(e.numberOfChildren===1&&e.children[b]){let t=e.children[b];return new P(e.segments.concat(t.segments),t.children)}return e}function $t(e){return e instanceof at}function $w(e,t,n=null,r=null){let o=Hh(e);return Uh(o,t,n,r)}function Hh(e){let t;function n(i){let s={};for(let c of i.children){let u=n(c);s[c.outlet]=u}let a=new P(i.url,s);return i===e&&(t=a),a}let r=n(e.root),o=Bh(r);return t??o}function Uh(e,t,n,r){let o=e;for(;o.parent;)o=o.parent;if(t.length===0)return dc(o,o,o,n,r);let i=Hw(t);if(i.toRoot())return dc(o,o,new P([],{}),n,r);let s=Uw(i,o,e),a=s.processChildren?fr(s.segmentGroup,s.index,i.commands):qh(s.segmentGroup,s.index,i.commands);return dc(o,s.segmentGroup,a,n,r)}function ri(e){return typeof e=="object"&&e!=null&&!e.outlets&&!e.segmentPath}function mr(e){return typeof e=="object"&&e!=null&&e.outlets}function dc(e,t,n,r,o){let i={};r&&Object.entries(r).forEach(([c,u])=>{i[c]=Array.isArray(u)?u.map(l=>`${l}`):`${u}`});let s;e===t?s=n:s=zh(e,t,n);let a=Bh($h(s));return new at(a,i,o)}function zh(e,t,n){let r={};return Object.entries(e.children).forEach(([o,i])=>{i===t?r[o]=n:r[o]=zh(i,t,n)}),new P(e.segments,r)}var oi=class{constructor(t,n,r){if(this.isAbsolute=t,this.numberOfDoubleDots=n,this.commands=r,t&&r.length>0&&ri(r[0]))throw new v(4003,!1);let o=r.find(mr);if(o&&o!==Oh(r))throw new v(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function Hw(e){if(typeof e[0]=="string"&&e.length===1&&e[0]==="/")return new oi(!0,0,e);let t=0,n=!1,r=e.reduce((o,i,s)=>{if(typeof i=="object"&&i!=null){if(i.outlets){let a={};return Object.entries(i.outlets).forEach(([c,u])=>{a[c]=typeof u=="string"?u.split("/"):u}),[...o,{outlets:a}]}if(i.segmentPath)return[...o,i.segmentPath]}return typeof i!="string"?[...o,i]:s===0?(i.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?n=!0:a===".."?t++:a!=""&&o.push(a))}),o):[...o,i]},[]);return new oi(n,t,r)}var Tn=class{constructor(t,n,r){this.segmentGroup=t,this.processChildren=n,this.index=r}};function Uw(e,t,n){if(e.isAbsolute)return new Tn(t,!0,0);if(!n)return new Tn(t,!1,NaN);if(n.parent===null)return new Tn(n,!0,0);let r=ri(e.commands[0])?0:1,o=n.segments.length-1+r;return zw(n,o,e.numberOfDoubleDots)}function zw(e,t,n){let r=e,o=t,i=n;for(;i>o;){if(i-=o,r=r.parent,!r)throw new v(4005,!1);o=r.segments.length}return new Tn(r,!1,o-i)}function qw(e){return mr(e[0])?e[0].outlets:{[b]:e}}function qh(e,t,n){if(e??=new P([],{}),e.segments.length===0&&e.hasChildren())return fr(e,t,n);let r=Gw(e,t,n),o=n.slice(r.commandIndex);if(r.match&&r.pathIndex<e.segments.length){let i=new P(e.segments.slice(0,r.pathIndex),{});return i.children[b]=new P(e.segments.slice(r.pathIndex),e.children),fr(i,0,o)}else return r.match&&o.length===0?new P(e.segments,{}):r.match&&!e.hasChildren()?yc(e,t,n):r.match?fr(e,0,o):yc(e,t,n)}function fr(e,t,n){if(n.length===0)return new P(e.segments,{});{let r=qw(n),o={};if(Object.keys(r).some(i=>i!==b)&&e.children[b]&&e.numberOfChildren===1&&e.children[b].segments.length===0){let i=fr(e.children[b],t,n);return new P(e.segments,i.children)}return Object.entries(r).forEach(([i,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(o[i]=qh(e.children[i],t,s))}),Object.entries(e.children).forEach(([i,s])=>{r[i]===void 0&&(o[i]=s)}),new P(e.segments,o)}}function Gw(e,t,n){let r=0,o=t,i={match:!1,pathIndex:0,commandIndex:0};for(;o<e.segments.length;){if(r>=n.length)return i;let s=e.segments[o],a=n[r];if(mr(a))break;let c=`${a}`,u=r<n.length-1?n[r+1]:null;if(o>0&&c===void 0)break;if(c&&u&&typeof u=="object"&&u.outlets===void 0){if(!Th(c,u,s))return i;r+=2}else{if(!Th(c,{},s))return i;r++}o++}return{match:!0,pathIndex:o,commandIndex:r}}function yc(e,t,n){let r=e.segments.slice(0,t),o=0;for(;o<n.length;){let i=n[o];if(mr(i)){let c=Ww(i.outlets);return new P(r,c)}if(o===0&&ri(n[0])){let c=e.segments[t];r.push(new Vt(c.path,Mh(n[0]))),o++;continue}let s=mr(i)?i.outlets[b]:`${i}`,a=o<n.length-1?n[o+1]:null;s&&a&&ri(a)?(r.push(new Vt(s,Mh(a))),o+=2):(r.push(new Vt(s,{})),o++)}return new P(r,{})}function Ww(e){let t={};return Object.entries(e).forEach(([n,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(t[n]=yc(new P([],{}),0,r))}),t}function Mh(e){let t={};return Object.entries(e).forEach(([n,r])=>t[n]=`${r}`),t}function Th(e,t,n){return e==n.path&&We(t,n.parameters)}var hr="imperative",ee=function(e){return e[e.NavigationStart=0]="NavigationStart",e[e.NavigationEnd=1]="NavigationEnd",e[e.NavigationCancel=2]="NavigationCancel",e[e.NavigationError=3]="NavigationError",e[e.RoutesRecognized=4]="RoutesRecognized",e[e.ResolveStart=5]="ResolveStart",e[e.ResolveEnd=6]="ResolveEnd",e[e.GuardsCheckStart=7]="GuardsCheckStart",e[e.GuardsCheckEnd=8]="GuardsCheckEnd",e[e.RouteConfigLoadStart=9]="RouteConfigLoadStart",e[e.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",e[e.ChildActivationStart=11]="ChildActivationStart",e[e.ChildActivationEnd=12]="ChildActivationEnd",e[e.ActivationStart=13]="ActivationStart",e[e.ActivationEnd=14]="ActivationEnd",e[e.Scroll=15]="Scroll",e[e.NavigationSkipped=16]="NavigationSkipped",e}(ee||{}),_e=class{constructor(t,n){this.id=t,this.url=n}},vr=class extends _e{constructor(t,n,r="imperative",o=null){super(t,n),this.type=ee.NavigationStart,this.navigationTrigger=r,this.restoredState=o}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Le=class extends _e{constructor(t,n,r){super(t,n),this.urlAfterRedirects=r,this.type=ee.NavigationEnd}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},we=function(e){return e[e.Redirect=0]="Redirect",e[e.SupersededByNewNavigation=1]="SupersededByNewNavigation",e[e.NoDataFromResolver=2]="NoDataFromResolver",e[e.GuardRejected=3]="GuardRejected",e}(we||{}),Dc=function(e){return e[e.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",e[e.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",e}(Dc||{}),st=class extends _e{constructor(t,n,r,o){super(t,n),this.reason=r,this.code=o,this.type=ee.NavigationCancel}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},Ht=class extends _e{constructor(t,n,r,o){super(t,n),this.reason=r,this.code=o,this.type=ee.NavigationSkipped}},yr=class extends _e{constructor(t,n,r,o){super(t,n),this.error=r,this.target=o,this.type=ee.NavigationError}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},ii=class extends _e{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ee.RoutesRecognized}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},wc=class extends _e{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ee.GuardsCheckStart}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Cc=class extends _e{constructor(t,n,r,o,i){super(t,n),this.urlAfterRedirects=r,this.state=o,this.shouldActivate=i,this.type=ee.GuardsCheckEnd}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},bc=class extends _e{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ee.ResolveStart}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Ic=class extends _e{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ee.ResolveEnd}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Ec=class{constructor(t){this.route=t,this.type=ee.RouteConfigLoadStart}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},xc=class{constructor(t){this.route=t,this.type=ee.RouteConfigLoadEnd}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},Sc=class{constructor(t){this.snapshot=t,this.type=ee.ChildActivationStart}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Mc=class{constructor(t){this.snapshot=t,this.type=ee.ChildActivationEnd}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Tc=class{constructor(t){this.snapshot=t,this.type=ee.ActivationStart}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},_c=class{constructor(t){this.snapshot=t,this.type=ee.ActivationEnd}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var Dr=class{},Rn=class{constructor(t,n){this.url=t,this.navigationBehaviorOptions=n}};function Zw(e,t){return e.providers&&!e._injector&&(e._injector=Ua(e.providers,t,`Route: ${e.path}`)),e._injector??t}function Fe(e){return e.outlet||b}function Yw(e,t){let n=e.filter(r=>Fe(r)===t);return n.push(...e.filter(r=>Fe(r)!==t)),n}function xr(e){if(!e)return null;if(e.routeConfig?._injector)return e.routeConfig._injector;for(let t=e.parent;t;t=t.parent){let n=t.routeConfig;if(n?._loadedInjector)return n._loadedInjector;if(n?._injector)return n._injector}return null}var Nc=class{get injector(){return xr(this.route?.snapshot)??this.rootInjector}set injector(t){}constructor(t){this.rootInjector=t,this.outlet=null,this.route=null,this.children=new hi(this.rootInjector),this.attachRef=null}},hi=(()=>{class e{constructor(n){this.rootInjector=n,this.contexts=new Map}onChildOutletCreated(n,r){let o=this.getOrCreateContext(n);o.outlet=r,this.contexts.set(n,o)}onChildOutletDestroyed(n){let r=this.getContext(n);r&&(r.outlet=null,r.attachRef=null)}onOutletDeactivated(){let n=this.contexts;return this.contexts=new Map,n}onOutletReAttached(n){this.contexts=n}getOrCreateContext(n){let r=this.getContext(n);return r||(r=new Nc(this.rootInjector),this.contexts.set(n,r)),r}getContext(n){return this.contexts.get(n)||null}static{this.\u0275fac=function(r){return new(r||e)(M(Ie))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),si=class{constructor(t){this._root=t}get root(){return this._root.value}parent(t){let n=this.pathFromRoot(t);return n.length>1?n[n.length-2]:null}children(t){let n=Ac(t,this._root);return n?n.children.map(r=>r.value):[]}firstChild(t){let n=Ac(t,this._root);return n&&n.children.length>0?n.children[0].value:null}siblings(t){let n=Rc(t,this._root);return n.length<2?[]:n[n.length-2].children.map(o=>o.value).filter(o=>o!==t)}pathFromRoot(t){return Rc(t,this._root).map(n=>n.value)}};function Ac(e,t){if(e===t.value)return t;for(let n of t.children){let r=Ac(e,n);if(r)return r}return null}function Rc(e,t){if(e===t.value)return[t];for(let n of t.children){let r=Rc(e,n);if(r.length)return r.unshift(t),r}return[]}var De=class{constructor(t,n){this.value=t,this.children=n}toString(){return`TreeNode(${this.value})`}};function Mn(e){let t={};return e&&e.children.forEach(n=>t[n.value.outlet]=n),t}var ai=class extends si{constructor(t,n){super(t),this.snapshot=n,Hc(this,t)}toString(){return this.snapshot.toString()}};function Gh(e){let t=Qw(e),n=new K([new Vt("",{})]),r=new K({}),o=new K({}),i=new K({}),s=new K(""),a=new ct(n,r,i,s,o,b,e,t.root);return a.snapshot=t.root,new ai(new De(a,[]),t)}function Qw(e){let t={},n={},r={},o="",i=new _n([],t,r,o,n,b,e,null,{});return new ui("",new De(i,[]))}var ct=class{constructor(t,n,r,o,i,s,a,c){this.urlSubject=t,this.paramsSubject=n,this.queryParamsSubject=r,this.fragmentSubject=o,this.dataSubject=i,this.outlet=s,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(x(u=>u[Er]))??y(void 0),this.url=t,this.params=n,this.queryParams=r,this.fragment=o,this.data=i}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(x(t=>An(t))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(x(t=>An(t))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function ci(e,t,n="emptyOnly"){let r,{routeConfig:o}=e;return t!==null&&(n==="always"||o?.path===""||!t.component&&!t.routeConfig?.loadComponent)?r={params:m(m({},t.params),e.params),data:m(m({},t.data),e.data),resolve:m(m(m(m({},e.data),t.data),o?.data),e._resolvedData)}:r={params:m({},e.params),data:m({},e.data),resolve:m(m({},e.data),e._resolvedData??{})},o&&Zh(o)&&(r.resolve[Er]=o.title),r}var _n=class{get title(){return this.data?.[Er]}constructor(t,n,r,o,i,s,a,c,u){this.url=t,this.params=n,this.queryParams=r,this.fragment=o,this.data=i,this.outlet=s,this.component=a,this.routeConfig=c,this._resolve=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=An(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=An(this.queryParams),this._queryParamMap}toString(){let t=this.url.map(r=>r.toString()).join("/"),n=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${t}', path:'${n}')`}},ui=class extends si{constructor(t,n){super(n),this.url=t,Hc(this,n)}toString(){return Wh(this._root)}};function Hc(e,t){t.value._routerState=e,t.children.forEach(n=>Hc(e,n))}function Wh(e){let t=e.children.length>0?` { ${e.children.map(Wh).join(", ")} } `:"";return`${e.value}${t}`}function fc(e){if(e.snapshot){let t=e.snapshot,n=e._futureSnapshot;e.snapshot=n,We(t.queryParams,n.queryParams)||e.queryParamsSubject.next(n.queryParams),t.fragment!==n.fragment&&e.fragmentSubject.next(n.fragment),We(t.params,n.params)||e.paramsSubject.next(n.params),Iw(t.url,n.url)||e.urlSubject.next(n.url),We(t.data,n.data)||e.dataSubject.next(n.data)}else e.snapshot=e._futureSnapshot,e.dataSubject.next(e._futureSnapshot.data)}function Oc(e,t){let n=We(e.params,t.params)&&Mw(e.url,t.url),r=!e.parent!=!t.parent;return n&&!r&&(!e.parent||Oc(e.parent,t.parent))}function Zh(e){return typeof e.title=="string"||e.title===null}var Uc=(()=>{class e{constructor(){this.activated=null,this._activatedRoute=null,this.name=b,this.activateEvents=new X,this.deactivateEvents=new X,this.attachEvents=new X,this.detachEvents=new X,this.parentContexts=p(hi),this.location=p(Pt),this.changeDetector=p(Ft),this.inputBinder=p(zc,{optional:!0}),this.supportsBindingToComponentInputs=!0}get activatedComponentRef(){return this.activated}ngOnChanges(n){if(n.name){let{firstChange:r,previousValue:o}=n.name;if(r)return;this.isTrackedInParentContexts(o)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(o)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(n){return this.parentContexts.getContext(n)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let n=this.parentContexts.getContext(this.name);n?.route&&(n.attachRef?this.attach(n.attachRef,n.route):this.activateWith(n.route,n.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new v(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new v(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new v(4012,!1);this.location.detach();let n=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(n.instance),n}attach(n,r){this.activated=n,this._activatedRoute=r,this.location.insert(n.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(n.instance)}deactivate(){if(this.activated){let n=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(n)}}activateWith(n,r){if(this.isActivated)throw new v(4013,!1);this._activatedRoute=n;let o=this.location,s=n.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new Pc(n,a,o.injector);this.activated=o.createComponent(s,{index:o.length,injector:c,environmentInjector:r}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275dir=yn({type:e,selectors:[["router-outlet"]],inputs:{name:"name"},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],standalone:!0,features:[Dn]})}}return e})(),Pc=class e{__ngOutletInjector(t){return new e(this.route,this.childContexts,t)}constructor(t,n,r){this.route=t,this.childContexts=n,this.parent=r}get(t,n){return t===ct?this.route:t===hi?this.childContexts:this.parent.get(t,n)}},zc=new E("");function Kw(e,t,n){let r=wr(e,t._root,n?n._root:void 0);return new ai(r,t)}function wr(e,t,n){if(n&&e.shouldReuseRoute(t.value,n.value.snapshot)){let r=n.value;r._futureSnapshot=t.value;let o=Jw(e,t,n);return new De(r,o)}else{if(e.shouldAttach(t.value)){let i=e.retrieve(t.value);if(i!==null){let s=i.route;return s.value._futureSnapshot=t.value,s.children=t.children.map(a=>wr(e,a)),s}}let r=Xw(t.value),o=t.children.map(i=>wr(e,i));return new De(r,o)}}function Jw(e,t,n){return t.children.map(r=>{for(let o of n.children)if(e.shouldReuseRoute(r.value,o.value.snapshot))return wr(e,r,o);return wr(e,r)})}function Xw(e){return new ct(new K(e.url),new K(e.params),new K(e.queryParams),new K(e.fragment),new K(e.data),e.outlet,e.component,e)}var Cr=class{constructor(t,n){this.redirectTo=t,this.navigationBehaviorOptions=n}},Yh="ngNavigationCancelingError";function li(e,t){let{redirectTo:n,navigationBehaviorOptions:r}=$t(t)?{redirectTo:t,navigationBehaviorOptions:void 0}:t,o=Qh(!1,we.Redirect);return o.url=n,o.navigationBehaviorOptions=r,o}function Qh(e,t){let n=new Error(`NavigationCancelingError: ${e||""}`);return n[Yh]=!0,n.cancellationCode=t,n}function eC(e){return Kh(e)&&$t(e.url)}function Kh(e){return!!e&&e[Yh]}var tC=(e,t,n,r)=>x(o=>(new kc(t,o.targetRouterState,o.currentRouterState,n,r).activate(e),o)),kc=class{constructor(t,n,r,o,i){this.routeReuseStrategy=t,this.futureState=n,this.currState=r,this.forwardEvent=o,this.inputBindingEnabled=i}activate(t){let n=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(n,r,t),fc(this.futureState.root),this.activateChildRoutes(n,r,t)}deactivateChildRoutes(t,n,r){let o=Mn(n);t.children.forEach(i=>{let s=i.value.outlet;this.deactivateRoutes(i,o[s],r),delete o[s]}),Object.values(o).forEach(i=>{this.deactivateRouteAndItsChildren(i,r)})}deactivateRoutes(t,n,r){let o=t.value,i=n?n.value:null;if(o===i)if(o.component){let s=r.getContext(o.outlet);s&&this.deactivateChildRoutes(t,n,s.children)}else this.deactivateChildRoutes(t,n,r);else i&&this.deactivateRouteAndItsChildren(n,r)}deactivateRouteAndItsChildren(t,n){t.value.component&&this.routeReuseStrategy.shouldDetach(t.value.snapshot)?this.detachAndStoreRouteSubtree(t,n):this.deactivateRouteAndOutlet(t,n)}detachAndStoreRouteSubtree(t,n){let r=n.getContext(t.value.outlet),o=r&&t.value.component?r.children:n,i=Mn(t);for(let s of Object.values(i))this.deactivateRouteAndItsChildren(s,o);if(r&&r.outlet){let s=r.outlet.detach(),a=r.children.onOutletDeactivated();this.routeReuseStrategy.store(t.value.snapshot,{componentRef:s,route:t,contexts:a})}}deactivateRouteAndOutlet(t,n){let r=n.getContext(t.value.outlet),o=r&&t.value.component?r.children:n,i=Mn(t);for(let s of Object.values(i))this.deactivateRouteAndItsChildren(s,o);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null)}activateChildRoutes(t,n,r){let o=Mn(n);t.children.forEach(i=>{this.activateRoutes(i,o[i.value.outlet],r),this.forwardEvent(new _c(i.value.snapshot))}),t.children.length&&this.forwardEvent(new Mc(t.value.snapshot))}activateRoutes(t,n,r){let o=t.value,i=n?n.value:null;if(fc(o),o===i)if(o.component){let s=r.getOrCreateContext(o.outlet);this.activateChildRoutes(t,n,s.children)}else this.activateChildRoutes(t,n,r);else if(o.component){let s=r.getOrCreateContext(o.outlet);if(this.routeReuseStrategy.shouldAttach(o.snapshot)){let a=this.routeReuseStrategy.retrieve(o.snapshot);this.routeReuseStrategy.store(o.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),fc(a.route.value),this.activateChildRoutes(t,null,s.children)}else s.attachRef=null,s.route=o,s.outlet&&s.outlet.activateWith(o,s.injector),this.activateChildRoutes(t,null,s.children)}else this.activateChildRoutes(t,null,r)}},di=class{constructor(t){this.path=t,this.route=this.path[this.path.length-1]}},Nn=class{constructor(t,n){this.component=t,this.route=n}};function nC(e,t,n){let r=e._root,o=t?t._root:null;return lr(r,o,n,[r.value])}function rC(e){let t=e.routeConfig?e.routeConfig.canActivateChild:null;return!t||t.length===0?null:{node:e,guards:t}}function Pn(e,t){let n=Symbol(),r=t.get(e,n);return r===n?typeof e=="function"&&!Cl(e)?e:t.get(e):r}function lr(e,t,n,r,o={canDeactivateChecks:[],canActivateChecks:[]}){let i=Mn(t);return e.children.forEach(s=>{oC(s,i[s.value.outlet],n,r.concat([s.value]),o),delete i[s.value.outlet]}),Object.entries(i).forEach(([s,a])=>pr(a,n.getContext(s),o)),o}function oC(e,t,n,r,o={canDeactivateChecks:[],canActivateChecks:[]}){let i=e.value,s=t?t.value:null,a=n?n.getContext(e.value.outlet):null;if(s&&i.routeConfig===s.routeConfig){let c=iC(s,i,i.routeConfig.runGuardsAndResolvers);c?o.canActivateChecks.push(new di(r)):(i.data=s.data,i._resolvedData=s._resolvedData),i.component?lr(e,t,a?a.children:null,r,o):lr(e,t,n,r,o),c&&a&&a.outlet&&a.outlet.isActivated&&o.canDeactivateChecks.push(new Nn(a.outlet.component,s))}else s&&pr(t,a,o),o.canActivateChecks.push(new di(r)),i.component?lr(e,null,a?a.children:null,r,o):lr(e,null,n,r,o);return o}function iC(e,t,n){if(typeof n=="function")return n(e,t);switch(n){case"pathParamsChange":return!Bt(e.url,t.url);case"pathParamsOrQueryParamsChange":return!Bt(e.url,t.url)||!We(e.queryParams,t.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Oc(e,t)||!We(e.queryParams,t.queryParams);case"paramsChange":default:return!Oc(e,t)}}function pr(e,t,n){let r=Mn(e),o=e.value;Object.entries(r).forEach(([i,s])=>{o.component?t?pr(s,t.children.getContext(i),n):pr(s,null,n):pr(s,t,n)}),o.component?t&&t.outlet&&t.outlet.isActivated?n.canDeactivateChecks.push(new Nn(t.outlet.component,o)):n.canDeactivateChecks.push(new Nn(null,o)):n.canDeactivateChecks.push(new Nn(null,o))}function Sr(e){return typeof e=="function"}function sC(e){return typeof e=="boolean"}function aC(e){return e&&Sr(e.canLoad)}function cC(e){return e&&Sr(e.canActivate)}function uC(e){return e&&Sr(e.canActivateChild)}function lC(e){return e&&Sr(e.canDeactivate)}function dC(e){return e&&Sr(e.canMatch)}function Jh(e){return e instanceof Ze||e?.name==="EmptyError"}var Xo=Symbol("INITIAL_VALUE");function On(){return ue(e=>zr(e.map(t=>t.pipe(Ye(1),Zi(Xo)))).pipe(x(t=>{for(let n of t)if(n!==!0){if(n===Xo)return Xo;if(n===!1||fC(n))return n}return!0}),ce(t=>t!==Xo),Ye(1)))}function fC(e){return $t(e)||e instanceof Cr}function hC(e,t){return Y(n=>{let{targetSnapshot:r,currentSnapshot:o,guards:{canActivateChecks:i,canDeactivateChecks:s}}=n;return s.length===0&&i.length===0?y($(m({},n),{guardsResult:!0})):pC(s,r,o,e).pipe(Y(a=>a&&sC(a)?gC(r,i,e,t):y(a)),x(a=>$(m({},n),{guardsResult:a})))})}function pC(e,t,n,r){return z(e).pipe(Y(o=>wC(o.component,o.route,n,t,r)),je(o=>o!==!0,!0))}function gC(e,t,n,r){return z(t).pipe(tn(o=>en(vC(o.route.parent,r),mC(o.route,r),DC(e,o.path,n),yC(e,o.route,n))),je(o=>o!==!0,!0))}function mC(e,t){return e!==null&&t&&t(new Tc(e)),y(!0)}function vC(e,t){return e!==null&&t&&t(new Sc(e)),y(!0)}function yC(e,t,n){let r=t.routeConfig?t.routeConfig.canActivate:null;if(!r||r.length===0)return y(!0);let o=r.map(i=>qr(()=>{let s=xr(t)??n,a=Pn(i,s),c=cC(a)?a.canActivate(t,e):et(s,()=>a(t,e));return yt(c).pipe(je())}));return y(o).pipe(On())}function DC(e,t,n){let r=t[t.length-1],i=t.slice(0,t.length-1).reverse().map(s=>rC(s)).filter(s=>s!==null).map(s=>qr(()=>{let a=s.guards.map(c=>{let u=xr(s.node)??n,l=Pn(c,u),d=uC(l)?l.canActivateChild(r,e):et(u,()=>l(r,e));return yt(d).pipe(je())});return y(a).pipe(On())}));return y(i).pipe(On())}function wC(e,t,n,r,o){let i=t&&t.routeConfig?t.routeConfig.canDeactivate:null;if(!i||i.length===0)return y(!0);let s=i.map(a=>{let c=xr(t)??o,u=Pn(a,c),l=lC(u)?u.canDeactivate(e,t,n,r):et(c,()=>u(e,t,n,r));return yt(l).pipe(je())});return y(s).pipe(On())}function CC(e,t,n,r){let o=t.canLoad;if(o===void 0||o.length===0)return y(!0);let i=o.map(s=>{let a=Pn(s,e),c=aC(a)?a.canLoad(t,n):et(e,()=>a(t,n));return yt(c)});return y(i).pipe(On(),Xh(r))}function Xh(e){return Bi(J(t=>{if(typeof t!="boolean")throw li(e,t)}),x(t=>t===!0))}function bC(e,t,n,r){let o=t.canMatch;if(!o||o.length===0)return y(!0);let i=o.map(s=>{let a=Pn(s,e),c=dC(a)?a.canMatch(t,n):et(e,()=>a(t,n));return yt(c)});return y(i).pipe(On(),Xh(r))}var br=class{constructor(t){this.segmentGroup=t||null}},Ir=class extends Error{constructor(t){super(),this.urlTree=t}};function Sn(e){return Jt(new br(e))}function IC(e){return Jt(new v(4e3,!1))}function EC(e){return Jt(Qh(!1,we.GuardRejected))}var Fc=class{constructor(t,n){this.urlSerializer=t,this.urlTree=n}lineralizeSegments(t,n){let r=[],o=n.root;for(;;){if(r=r.concat(o.segments),o.numberOfChildren===0)return y(r);if(o.numberOfChildren>1||!o.children[b])return IC(`${t.redirectTo}`);o=o.children[b]}}applyRedirectCommands(t,n,r,o,i){if(typeof n!="string"){let a=n,{queryParams:c,fragment:u,routeConfig:l,url:d,outlet:h,params:f,data:g,title:T}=o,j=et(i,()=>a({params:f,data:g,queryParams:c,fragment:u,routeConfig:l,url:d,outlet:h,title:T}));if(j instanceof at)throw new Ir(j);n=j}let s=this.applyRedirectCreateUrlTree(n,this.urlSerializer.parse(n),t,r);if(n[0]==="/")throw new Ir(s);return s}applyRedirectCreateUrlTree(t,n,r,o){let i=this.createSegmentGroup(t,n.root,r,o);return new at(i,this.createQueryParams(n.queryParams,this.urlTree.queryParams),n.fragment)}createQueryParams(t,n){let r={};return Object.entries(t).forEach(([o,i])=>{if(typeof i=="string"&&i[0]===":"){let a=i.substring(1);r[o]=n[a]}else r[o]=i}),r}createSegmentGroup(t,n,r,o){let i=this.createSegments(t,n.segments,r,o),s={};return Object.entries(n.children).forEach(([a,c])=>{s[a]=this.createSegmentGroup(t,c,r,o)}),new P(i,s)}createSegments(t,n,r,o){return n.map(i=>i.path[0]===":"?this.findPosParam(t,i,o):this.findOrReturn(i,r))}findPosParam(t,n,r){let o=r[n.path.substring(1)];if(!o)throw new v(4001,!1);return o}findOrReturn(t,n){let r=0;for(let o of n){if(o.path===t.path)return n.splice(r),o;r++}return t}},Lc={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function xC(e,t,n,r,o){let i=ep(e,t,n);return i.matched?(r=Zw(t,r),bC(r,t,n,o).pipe(x(s=>s===!0?i:m({},Lc)))):y(i)}function ep(e,t,n){if(t.path==="**")return SC(n);if(t.path==="")return t.pathMatch==="full"&&(e.hasChildren()||n.length>0)?m({},Lc):{matched:!0,consumedSegments:[],remainingSegments:n,parameters:{},positionalParamSegments:{}};let o=(t.matcher||bw)(n,e,t);if(!o)return m({},Lc);let i={};Object.entries(o.posParams??{}).forEach(([a,c])=>{i[a]=c.path});let s=o.consumed.length>0?m(m({},i),o.consumed[o.consumed.length-1].parameters):i;return{matched:!0,consumedSegments:o.consumed,remainingSegments:n.slice(o.consumed.length),parameters:s,positionalParamSegments:o.posParams??{}}}function SC(e){return{matched:!0,parameters:e.length>0?Oh(e).parameters:{},consumedSegments:e,remainingSegments:[],positionalParamSegments:{}}}function _h(e,t,n,r){return n.length>0&&_C(e,n,r)?{segmentGroup:new P(t,TC(r,new P(n,e.children))),slicedSegments:[]}:n.length===0&&NC(e,n,r)?{segmentGroup:new P(e.segments,MC(e,n,r,e.children)),slicedSegments:n}:{segmentGroup:new P(e.segments,e.children),slicedSegments:n}}function MC(e,t,n,r){let o={};for(let i of n)if(pi(e,t,i)&&!r[Fe(i)]){let s=new P([],{});o[Fe(i)]=s}return m(m({},r),o)}function TC(e,t){let n={};n[b]=t;for(let r of e)if(r.path===""&&Fe(r)!==b){let o=new P([],{});n[Fe(r)]=o}return n}function _C(e,t,n){return n.some(r=>pi(e,t,r)&&Fe(r)!==b)}function NC(e,t,n){return n.some(r=>pi(e,t,r))}function pi(e,t,n){return(e.hasChildren()||t.length>0)&&n.pathMatch==="full"?!1:n.path===""}function AC(e,t,n){return t.length===0&&!e.children[n]}var jc=class{};function RC(e,t,n,r,o,i,s="emptyOnly"){return new Vc(e,t,n,r,o,s,i).recognize()}var OC=31,Vc=class{constructor(t,n,r,o,i,s,a){this.injector=t,this.configLoader=n,this.rootComponentType=r,this.config=o,this.urlTree=i,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.applyRedirects=new Fc(this.urlSerializer,this.urlTree),this.absoluteRedirectCount=0,this.allowRedirects=!0}noMatchError(t){return new v(4002,`'${t.segmentGroup}'`)}recognize(){let t=_h(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(t).pipe(x(({children:n,rootSnapshot:r})=>{let o=new De(r,n),i=new ui("",o),s=$w(r,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,i.url=this.urlSerializer.serialize(s),{state:i,tree:s}}))}match(t){let n=new _n([],Object.freeze({}),Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),b,this.rootComponentType,null,{});return this.processSegmentGroup(this.injector,this.config,t,b,n).pipe(x(r=>({children:r,rootSnapshot:n})),lt(r=>{if(r instanceof Ir)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof br?this.noMatchError(r):r}))}processSegmentGroup(t,n,r,o,i){return r.segments.length===0&&r.hasChildren()?this.processChildren(t,n,r,i):this.processSegment(t,n,r,r.segments,o,!0,i).pipe(x(s=>s instanceof De?[s]:[]))}processChildren(t,n,r,o){let i=[];for(let s of Object.keys(r.children))s==="primary"?i.unshift(s):i.push(s);return z(i).pipe(tn(s=>{let a=r.children[s],c=Yw(n,s);return this.processSegmentGroup(t,c,a,s,o)}),Wi((s,a)=>(s.push(...a),s)),dt(null),Gi(),Y(s=>{if(s===null)return Sn(r);let a=tp(s);return PC(a),y(a)}))}processSegment(t,n,r,o,i,s,a){return z(n).pipe(tn(c=>this.processSegmentAgainstRoute(c._injector??t,n,c,r,o,i,s,a).pipe(lt(u=>{if(u instanceof br)return y(null);throw u}))),je(c=>!!c),lt(c=>{if(Jh(c))return AC(r,o,i)?y(new jc):Sn(r);throw c}))}processSegmentAgainstRoute(t,n,r,o,i,s,a,c){return Fe(r)!==s&&(s===b||!pi(o,i,r))?Sn(o):r.redirectTo===void 0?this.matchSegmentAgainstRoute(t,o,r,i,s,c):this.allowRedirects&&a?this.expandSegmentAgainstRouteUsingRedirect(t,o,n,r,i,s,c):Sn(o)}expandSegmentAgainstRouteUsingRedirect(t,n,r,o,i,s,a){let{matched:c,parameters:u,consumedSegments:l,positionalParamSegments:d,remainingSegments:h}=ep(n,o,i);if(!c)return Sn(n);typeof o.redirectTo=="string"&&o.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>OC&&(this.allowRedirects=!1));let f=new _n(i,u,Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,Nh(o),Fe(o),o.component??o._loadedComponent??null,o,Ah(o)),g=ci(f,a,this.paramsInheritanceStrategy);f.params=Object.freeze(g.params),f.data=Object.freeze(g.data);let T=this.applyRedirects.applyRedirectCommands(l,o.redirectTo,d,f,t);return this.applyRedirects.lineralizeSegments(o,T).pipe(Y(j=>this.processSegment(t,r,n,j.concat(h),s,!1,a)))}matchSegmentAgainstRoute(t,n,r,o,i,s){let a=xC(n,r,o,t,this.urlSerializer);return r.path==="**"&&(n.children={}),a.pipe(ue(c=>c.matched?(t=r._injector??t,this.getChildConfig(t,r,o).pipe(ue(({routes:u})=>{let l=r._loadedInjector??t,{parameters:d,consumedSegments:h,remainingSegments:f}=c,g=new _n(h,d,Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,Nh(r),Fe(r),r.component??r._loadedComponent??null,r,Ah(r)),T=ci(g,s,this.paramsInheritanceStrategy);g.params=Object.freeze(T.params),g.data=Object.freeze(T.data);let{segmentGroup:j,slicedSegments:B}=_h(n,h,f,u);if(B.length===0&&j.hasChildren())return this.processChildren(l,u,j,g).pipe(x(se=>new De(g,se)));if(u.length===0&&B.length===0)return y(new De(g,[]));let ie=Fe(r)===i;return this.processSegment(l,u,j,B,ie?b:i,!0,g).pipe(x(se=>new De(g,se instanceof De?[se]:[])))}))):Sn(n)))}getChildConfig(t,n,r){return n.children?y({routes:n.children,injector:t}):n.loadChildren?n._loadedRoutes!==void 0?y({routes:n._loadedRoutes,injector:n._loadedInjector}):CC(t,n,r,this.urlSerializer).pipe(Y(o=>o?this.configLoader.loadChildren(t,n).pipe(J(i=>{n._loadedRoutes=i.routes,n._loadedInjector=i.injector})):EC(n))):y({routes:[],injector:t})}};function PC(e){e.sort((t,n)=>t.value.outlet===b?-1:n.value.outlet===b?1:t.value.outlet.localeCompare(n.value.outlet))}function kC(e){let t=e.value.routeConfig;return t&&t.path===""}function tp(e){let t=[],n=new Set;for(let r of e){if(!kC(r)){t.push(r);continue}let o=t.find(i=>r.value.routeConfig===i.value.routeConfig);o!==void 0?(o.children.push(...r.children),n.add(o)):t.push(r)}for(let r of n){let o=tp(r.children);t.push(new De(r.value,o))}return t.filter(r=>!n.has(r))}function Nh(e){return e.data||{}}function Ah(e){return e.resolve||{}}function FC(e,t,n,r,o,i){return Y(s=>RC(e,t,n,r,s.extractedUrl,o,i).pipe(x(({state:a,tree:c})=>$(m({},s),{targetSnapshot:a,urlAfterRedirects:c}))))}function LC(e,t){return Y(n=>{let{targetSnapshot:r,guards:{canActivateChecks:o}}=n;if(!o.length)return y(n);let i=new Set(o.map(c=>c.route)),s=new Set;for(let c of i)if(!s.has(c))for(let u of np(c))s.add(u);let a=0;return z(s).pipe(tn(c=>i.has(c)?jC(c,r,e,t):(c.data=ci(c,c.parent,e).resolve,y(void 0))),J(()=>a++),nn(1),Y(c=>a===s.size?y(n):pe))})}function np(e){let t=e.children.map(n=>np(n)).flat();return[e,...t]}function jC(e,t,n,r){let o=e.routeConfig,i=e._resolve;return o?.title!==void 0&&!Zh(o)&&(i[Er]=o.title),VC(i,e,t,r).pipe(x(s=>(e._resolvedData=s,e.data=ci(e,e.parent,n).resolve,null)))}function VC(e,t,n,r){let o=gc(e);if(o.length===0)return y({});let i={};return z(o).pipe(Y(s=>BC(e[s],t,n,r).pipe(je(),J(a=>{if(a instanceof Cr)throw li(new gr,a);i[s]=a}))),nn(1),qi(i),lt(s=>Jh(s)?pe:Jt(s)))}function BC(e,t,n,r){let o=xr(t)??r,i=Pn(e,o),s=i.resolve?i.resolve(t,n):et(o,()=>i(t,n));return yt(s)}function hc(e){return ue(t=>{let n=e(t);return n?z(n).pipe(x(()=>t)):y(t)})}var rp=(()=>{class e{buildTitle(n){let r,o=n.root;for(;o!==void 0;)r=this.getResolvedTitleForRoute(o)??r,o=o.children.find(i=>i.outlet===b);return r}getResolvedTitleForRoute(n){return n.data[Er]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p($C),providedIn:"root"})}}return e})(),$C=(()=>{class e extends rp{constructor(n){super(),this.title=n}updateTitle(n){let r=this.buildTitle(n);r!==void 0&&this.title.setTitle(r)}static{this.\u0275fac=function(r){return new(r||e)(M(Eh))}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),qc=new E("",{providedIn:"root",factory:()=>({})}),HC=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=G({type:e,selectors:[["ng-component"]],standalone:!0,features:[Z],decls:1,vars:0,template:function(r,o){r&1&&F(0,"router-outlet")},dependencies:[Uc],encapsulation:2})}}return e})();function Gc(e){let t=e.children&&e.children.map(Gc),n=t?$(m({},e),{children:t}):m({},e);return!n.component&&!n.loadComponent&&(t||n.loadChildren)&&n.outlet&&n.outlet!==b&&(n.component=HC),n}var Wc=new E(""),UC=(()=>{class e{constructor(){this.componentLoaders=new WeakMap,this.childrenLoaders=new WeakMap,this.compiler=p(Ya)}loadComponent(n){if(this.componentLoaders.get(n))return this.componentLoaders.get(n);if(n._loadedComponent)return y(n._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(n);let r=yt(n.loadComponent()).pipe(x(op),J(i=>{this.onLoadEndListener&&this.onLoadEndListener(n),n._loadedComponent=i}),jn(()=>{this.componentLoaders.delete(n)})),o=new Kt(r,()=>new te).pipe(Qt());return this.componentLoaders.set(n,o),o}loadChildren(n,r){if(this.childrenLoaders.get(r))return this.childrenLoaders.get(r);if(r._loadedRoutes)return y({routes:r._loadedRoutes,injector:r._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(r);let i=zC(r,this.compiler,n,this.onLoadEndListener).pipe(jn(()=>{this.childrenLoaders.delete(r)})),s=new Kt(i,()=>new te).pipe(Qt());return this.childrenLoaders.set(r,s),s}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function zC(e,t,n,r){return yt(e.loadChildren()).pipe(x(op),Y(o=>o instanceof Yn||Array.isArray(o)?y(o):z(t.compileModuleAsync(o))),x(o=>{r&&r(e);let i,s,a=!1;return Array.isArray(o)?(s=o,a=!0):(i=o.create(n).injector,s=i.get(Wc,[],{optional:!0,self:!0}).flat()),{routes:s.map(Gc),injector:i}}))}function qC(e){return e&&typeof e=="object"&&"default"in e}function op(e){return qC(e)?e.default:e}var Zc=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p(GC),providedIn:"root"})}}return e})(),GC=(()=>{class e{shouldProcessUrl(n){return!0}extract(n){return n}merge(n,r){return n}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),WC=new E("");var ZC=new E(""),YC=(()=>{class e{get hasRequestedNavigation(){return this.navigationId!==0}constructor(){this.currentNavigation=null,this.currentTransition=null,this.lastSuccessfulNavigation=null,this.events=new te,this.transitionAbortSubject=new te,this.configLoader=p(UC),this.environmentInjector=p(Ie),this.urlSerializer=p($c),this.rootContexts=p(hi),this.location=p(ir),this.inputBindingEnabled=p(zc,{optional:!0})!==null,this.titleStrategy=p(rp),this.options=p(qc,{optional:!0})||{},this.paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly",this.urlHandlingStrategy=p(Zc),this.createViewTransition=p(WC,{optional:!0}),this.navigationErrorHandler=p(ZC,{optional:!0}),this.navigationId=0,this.afterPreactivation=()=>y(void 0),this.rootComponentType=null;let n=o=>this.events.next(new Ec(o)),r=o=>this.events.next(new xc(o));this.configLoader.onLoadEndListener=r,this.configLoader.onLoadStartListener=n}complete(){this.transitions?.complete()}handleNavigationRequest(n){let r=++this.navigationId;this.transitions?.next($(m(m({},this.transitions.value),n),{id:r}))}setupNavigations(n,r,o){return this.transitions=new K({id:0,currentUrlTree:r,currentRawUrl:r,extractedUrl:this.urlHandlingStrategy.extract(r),urlAfterRedirects:this.urlHandlingStrategy.extract(r),rawUrl:r,extras:{},resolve:()=>{},reject:()=>{},promise:Promise.resolve(!0),source:hr,restoredState:null,currentSnapshot:o.snapshot,targetSnapshot:null,currentRouterState:o,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null}),this.transitions.pipe(ce(i=>i.id!==0),x(i=>$(m({},i),{extractedUrl:this.urlHandlingStrategy.extract(i.rawUrl)})),ue(i=>{let s=!1,a=!1;return y(i).pipe(ue(c=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",we.SupersededByNewNavigation),pe;this.currentTransition=i,this.currentNavigation={id:c.id,initialUrl:c.rawUrl,extractedUrl:c.extractedUrl,targetBrowserUrl:typeof c.extras.browserUrl=="string"?this.urlSerializer.parse(c.extras.browserUrl):c.extras.browserUrl,trigger:c.source,extras:c.extras,previousNavigation:this.lastSuccessfulNavigation?$(m({},this.lastSuccessfulNavigation),{previousNavigation:null}):null};let u=!n.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),l=c.extras.onSameUrlNavigation??n.onSameUrlNavigation;if(!u&&l!=="reload"){let d="";return this.events.next(new Ht(c.id,this.urlSerializer.serialize(c.rawUrl),d,Dc.IgnoredSameUrlNavigation)),c.resolve(!1),pe}if(this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))return y(c).pipe(ue(d=>{let h=this.transitions?.getValue();return this.events.next(new vr(d.id,this.urlSerializer.serialize(d.extractedUrl),d.source,d.restoredState)),h!==this.transitions?.getValue()?pe:Promise.resolve(d)}),FC(this.environmentInjector,this.configLoader,this.rootComponentType,n.config,this.urlSerializer,this.paramsInheritanceStrategy),J(d=>{i.targetSnapshot=d.targetSnapshot,i.urlAfterRedirects=d.urlAfterRedirects,this.currentNavigation=$(m({},this.currentNavigation),{finalUrl:d.urlAfterRedirects});let h=new ii(d.id,this.urlSerializer.serialize(d.extractedUrl),this.urlSerializer.serialize(d.urlAfterRedirects),d.targetSnapshot);this.events.next(h)}));if(u&&this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)){let{id:d,extractedUrl:h,source:f,restoredState:g,extras:T}=c,j=new vr(d,this.urlSerializer.serialize(h),f,g);this.events.next(j);let B=Gh(this.rootComponentType).snapshot;return this.currentTransition=i=$(m({},c),{targetSnapshot:B,urlAfterRedirects:h,extras:$(m({},T),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.finalUrl=h,y(i)}else{let d="";return this.events.next(new Ht(c.id,this.urlSerializer.serialize(c.extractedUrl),d,Dc.IgnoredByUrlHandlingStrategy)),c.resolve(!1),pe}}),J(c=>{let u=new wc(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(u)}),x(c=>(this.currentTransition=i=$(m({},c),{guards:nC(c.targetSnapshot,c.currentSnapshot,this.rootContexts)}),i)),hC(this.environmentInjector,c=>this.events.next(c)),J(c=>{if(i.guardsResult=c.guardsResult,c.guardsResult&&typeof c.guardsResult!="boolean")throw li(this.urlSerializer,c.guardsResult);let u=new Cc(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot,!!c.guardsResult);this.events.next(u)}),ce(c=>c.guardsResult?!0:(this.cancelNavigationTransition(c,"",we.GuardRejected),!1)),hc(c=>{if(c.guards.canActivateChecks.length)return y(c).pipe(J(u=>{let l=new bc(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects),u.targetSnapshot);this.events.next(l)}),ue(u=>{let l=!1;return y(u).pipe(LC(this.paramsInheritanceStrategy,this.environmentInjector),J({next:()=>l=!0,complete:()=>{l||this.cancelNavigationTransition(u,"",we.NoDataFromResolver)}}))}),J(u=>{let l=new Ic(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects),u.targetSnapshot);this.events.next(l)}))}),hc(c=>{let u=l=>{let d=[];l.routeConfig?.loadComponent&&!l.routeConfig._loadedComponent&&d.push(this.configLoader.loadComponent(l.routeConfig).pipe(J(h=>{l.component=h}),x(()=>{})));for(let h of l.children)d.push(...u(h));return d};return zr(u(c.targetSnapshot.root)).pipe(dt(null),Ye(1))}),hc(()=>this.afterPreactivation()),ue(()=>{let{currentSnapshot:c,targetSnapshot:u}=i,l=this.createViewTransition?.(this.environmentInjector,c.root,u.root);return l?z(l).pipe(x(()=>i)):y(i)}),x(c=>{let u=Kw(n.routeReuseStrategy,c.targetSnapshot,c.currentRouterState);return this.currentTransition=i=$(m({},c),{targetRouterState:u}),this.currentNavigation.targetRouterState=u,i}),J(()=>{this.events.next(new Dr)}),tC(this.rootContexts,n.routeReuseStrategy,c=>this.events.next(c),this.inputBindingEnabled),Ye(1),J({next:c=>{s=!0,this.lastSuccessfulNavigation=this.currentNavigation,this.events.next(new Le(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects))),this.titleStrategy?.updateTitle(c.targetRouterState.snapshot),c.resolve(!0)},complete:()=>{s=!0}}),Yi(this.transitionAbortSubject.pipe(J(c=>{throw c}))),jn(()=>{!s&&!a&&this.cancelNavigationTransition(i,"",we.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation=null,this.currentTransition=null)}),lt(c=>{if(a=!0,Kh(c))this.events.next(new st(i.id,this.urlSerializer.serialize(i.extractedUrl),c.message,c.cancellationCode)),eC(c)?this.events.next(new Rn(c.url,c.navigationBehaviorOptions)):i.resolve(!1);else{let u=new yr(i.id,this.urlSerializer.serialize(i.extractedUrl),c,i.targetSnapshot??void 0);try{let l=et(this.environmentInjector,()=>this.navigationErrorHandler?.(u));if(l instanceof Cr){let{message:d,cancellationCode:h}=li(this.urlSerializer,l);this.events.next(new st(i.id,this.urlSerializer.serialize(i.extractedUrl),d,h)),this.events.next(new Rn(l.redirectTo,l.navigationBehaviorOptions))}else{this.events.next(u);let d=n.errorHandler(c);i.resolve(!!d)}}catch(l){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(l)}}return pe}))}))}cancelNavigationTransition(n,r,o){let i=new st(n.id,this.urlSerializer.serialize(n.extractedUrl),r,o);this.events.next(i),n.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let n=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),r=this.currentNavigation?.targetBrowserUrl??this.currentNavigation?.extractedUrl;return n.toString()!==r?.toString()&&!this.currentNavigation?.extras.skipLocationChange}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function QC(e){return e!==hr}var KC=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p(JC),providedIn:"root"})}}return e})(),Bc=class{shouldDetach(t){return!1}store(t,n){}shouldAttach(t){return!1}retrieve(t){return null}shouldReuseRoute(t,n){return t.routeConfig===n.routeConfig}},JC=(()=>{class e extends Bc{static{this.\u0275fac=(()=>{let n;return function(o){return(n||(n=Ca(e)))(o||e)}})()}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),ip=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:()=>p(XC),providedIn:"root"})}}return e})(),XC=(()=>{class e extends ip{constructor(){super(...arguments),this.location=p(ir),this.urlSerializer=p($c),this.options=p(qc,{optional:!0})||{},this.canceledNavigationResolution=this.options.canceledNavigationResolution||"replace",this.urlHandlingStrategy=p(Zc),this.urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred",this.currentUrlTree=new at,this.rawUrlTree=this.currentUrlTree,this.currentPageId=0,this.lastSuccessfulId=-1,this.routerState=Gh(null),this.stateMemento=this.createStateMemento()}getCurrentUrlTree(){return this.currentUrlTree}getRawUrlTree(){return this.rawUrlTree}restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}getRouterState(){return this.routerState}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}registerNonRouterCurrentEntryChangeListener(n){return this.location.subscribe(r=>{r.type==="popstate"&&n(r.url,r.state)})}handleRouterEvent(n,r){if(n instanceof vr)this.stateMemento=this.createStateMemento();else if(n instanceof Ht)this.rawUrlTree=r.initialUrl;else if(n instanceof ii){if(this.urlUpdateStrategy==="eager"&&!r.extras.skipLocationChange){let o=this.urlHandlingStrategy.merge(r.finalUrl,r.initialUrl);this.setBrowserUrl(r.targetBrowserUrl??o,r)}}else n instanceof Dr?(this.currentUrlTree=r.finalUrl,this.rawUrlTree=this.urlHandlingStrategy.merge(r.finalUrl,r.initialUrl),this.routerState=r.targetRouterState,this.urlUpdateStrategy==="deferred"&&!r.extras.skipLocationChange&&this.setBrowserUrl(r.targetBrowserUrl??this.rawUrlTree,r)):n instanceof st&&(n.code===we.GuardRejected||n.code===we.NoDataFromResolver)?this.restoreHistory(r):n instanceof yr?this.restoreHistory(r,!0):n instanceof Le&&(this.lastSuccessfulId=n.id,this.currentPageId=this.browserPageId)}setBrowserUrl(n,r){let o=n instanceof at?this.urlSerializer.serialize(n):n;if(this.location.isCurrentPathEqualTo(o)||r.extras.replaceUrl){let i=this.browserPageId,s=m(m({},r.extras.state),this.generateNgRouterState(r.id,i));this.location.replaceState(o,"",s)}else{let i=m(m({},r.extras.state),this.generateNgRouterState(r.id,this.browserPageId+1));this.location.go(o,"",i)}}restoreHistory(n,r=!1){if(this.canceledNavigationResolution==="computed"){let o=this.browserPageId,i=this.currentPageId-o;i!==0?this.location.historyGo(i):this.currentUrlTree===n.finalUrl&&i===0&&(this.resetState(n),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(r&&this.resetState(n),this.resetUrlToCurrentUrlTree())}resetState(n){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,n.finalUrl??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(n,r){return this.canceledNavigationResolution==="computed"?{navigationId:n,\u0275routerPageId:r}:{navigationId:n}}static{this.\u0275fac=(()=>{let n;return function(o){return(n||(n=Ca(e)))(o||e)}})()}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),dr=function(e){return e[e.COMPLETE=0]="COMPLETE",e[e.FAILED=1]="FAILED",e[e.REDIRECTING=2]="REDIRECTING",e}(dr||{});function eb(e,t){e.events.pipe(ce(n=>n instanceof Le||n instanceof st||n instanceof yr||n instanceof Ht),x(n=>n instanceof Le||n instanceof Ht?dr.COMPLETE:(n instanceof st?n.code===we.Redirect||n.code===we.SupersededByNewNavigation:!1)?dr.REDIRECTING:dr.FAILED),ce(n=>n!==dr.REDIRECTING),Ye(1)).subscribe(()=>{t()})}function tb(e){throw e}var nb={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},rb={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},kn=(()=>{class e{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}constructor(){this.disposed=!1,this.console=p(Wo),this.stateManager=p(ip),this.options=p(qc,{optional:!0})||{},this.pendingTasks=p(wn),this.urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred",this.navigationTransitions=p(YC),this.urlSerializer=p($c),this.location=p(ir),this.urlHandlingStrategy=p(Zc),this._events=new te,this.errorHandler=this.options.errorHandler||tb,this.navigated=!1,this.routeReuseStrategy=p(KC),this.onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore",this.config=p(Wc,{optional:!0})?.flat()??[],this.componentInputBindingEnabled=!!p(zc,{optional:!0}),this.eventsSubscription=new U,this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this,this.currentUrlTree,this.routerState).subscribe({error:n=>{this.console.warn(n)}}),this.subscribeToNavigationEvents()}subscribeToNavigationEvents(){let n=this.navigationTransitions.events.subscribe(r=>{try{let o=this.navigationTransitions.currentTransition,i=this.navigationTransitions.currentNavigation;if(o!==null&&i!==null){if(this.stateManager.handleRouterEvent(r,i),r instanceof st&&r.code!==we.Redirect&&r.code!==we.SupersededByNewNavigation)this.navigated=!0;else if(r instanceof Le)this.navigated=!0;else if(r instanceof Rn){let s=r.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(r.url,o.currentRawUrl),c=m({browserUrl:o.extras.browserUrl,info:o.extras.info,skipLocationChange:o.extras.skipLocationChange,replaceUrl:o.extras.replaceUrl||this.urlUpdateStrategy==="eager"||QC(o.source)},s);this.scheduleNavigation(a,hr,null,c,{resolve:o.resolve,reject:o.reject,promise:o.promise})}}ib(r)&&this._events.next(r)}catch(o){this.navigationTransitions.transitionAbortSubject.next(o)}});this.eventsSubscription.add(n)}resetRootComponentType(n){this.routerState.root.component=n,this.navigationTransitions.rootComponentType=n}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),hr,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((n,r)=>{setTimeout(()=>{this.navigateToSyncWithBrowser(n,"popstate",r)},0)})}navigateToSyncWithBrowser(n,r,o){let i={replaceUrl:!0},s=o?.navigationId?o:null;if(o){let c=m({},o);delete c.navigationId,delete c.\u0275routerPageId,Object.keys(c).length!==0&&(i.state=c)}let a=this.parseUrl(n);this.scheduleNavigation(a,r,s,i)}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return this.navigationTransitions.currentNavigation}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(n){this.config=n.map(Gc),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(n,r={}){let{relativeTo:o,queryParams:i,fragment:s,queryParamsHandling:a,preserveFragment:c}=r,u=c?this.currentUrlTree.fragment:s,l=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":l=m(m({},this.currentUrlTree.queryParams),i);break;case"preserve":l=this.currentUrlTree.queryParams;break;default:l=i||null}l!==null&&(l=this.removeEmptyProps(l));let d;try{let h=o?o.snapshot:this.routerState.snapshot.root;d=Hh(h)}catch{(typeof n[0]!="string"||n[0][0]!=="/")&&(n=[]),d=this.currentUrlTree.root}return Uh(d,n,l,u??null)}navigateByUrl(n,r={skipLocationChange:!1}){let o=$t(n)?n:this.parseUrl(n),i=this.urlHandlingStrategy.merge(o,this.rawUrlTree);return this.scheduleNavigation(i,hr,null,r)}navigate(n,r={skipLocationChange:!1}){return ob(n),this.navigateByUrl(this.createUrlTree(n,r),r)}serializeUrl(n){return this.urlSerializer.serialize(n)}parseUrl(n){try{return this.urlSerializer.parse(n)}catch{return this.urlSerializer.parse("/")}}isActive(n,r){let o;if(r===!0?o=m({},nb):r===!1?o=m({},rb):o=r,$t(n))return xh(this.currentUrlTree,n,o);let i=this.parseUrl(n);return xh(this.currentUrlTree,i,o)}removeEmptyProps(n){return Object.entries(n).reduce((r,[o,i])=>(i!=null&&(r[o]=i),r),{})}scheduleNavigation(n,r,o,i,s){if(this.disposed)return Promise.resolve(!1);let a,c,u;s?(a=s.resolve,c=s.reject,u=s.promise):u=new Promise((d,h)=>{a=d,c=h});let l=this.pendingTasks.add();return eb(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(l))}),this.navigationTransitions.handleNavigationRequest({source:r,restoredState:o,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:n,extras:i,resolve:a,reject:c,promise:u,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),u.catch(d=>Promise.reject(d))}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function ob(e){for(let t=0;t<e.length;t++)if(e[t]==null)throw new v(4008,!1)}function ib(e){return!(e instanceof Dr)&&!(e instanceof Rn)}var fi=(()=>{class e{constructor(n,r,o,i,s,a){this.router=n,this.route=r,this.tabIndexAttribute=o,this.renderer=i,this.el=s,this.locationStrategy=a,this.href=null,this.onChanges=new te,this.preserveFragment=!1,this.skipLocationChange=!1,this.replaceUrl=!1,this.routerLinkInput=null;let c=s.nativeElement.tagName?.toLowerCase();this.isAnchorElement=c==="a"||c==="area",this.isAnchorElement?this.subscription=n.events.subscribe(u=>{u instanceof Le&&this.updateHref()}):this.setTabIndexIfNotOnNativeEl("0")}setTabIndexIfNotOnNativeEl(n){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",n)}ngOnChanges(n){this.isAnchorElement&&this.updateHref(),this.onChanges.next(this)}set routerLink(n){n==null?(this.routerLinkInput=null,this.setTabIndexIfNotOnNativeEl(null)):($t(n)?this.routerLinkInput=n:this.routerLinkInput=Array.isArray(n)?n:[n],this.setTabIndexIfNotOnNativeEl("0"))}onClick(n,r,o,i,s){let a=this.urlTree;if(a===null||this.isAnchorElement&&(n!==0||r||o||i||s||typeof this.target=="string"&&this.target!="_self"))return!0;let c={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(a,c),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let n=this.urlTree;this.href=n!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(n)):null;let r=this.href===null?null:tf(this.href,this.el.nativeElement.tagName.toLowerCase(),"href");this.applyAttributeValue("href",r)}applyAttributeValue(n,r){let o=this.renderer,i=this.el.nativeElement;r!==null?o.setAttribute(i,n,r):o.removeAttribute(i,n)}get urlTree(){return this.routerLinkInput===null?null:$t(this.routerLinkInput)?this.routerLinkInput:this.router.createUrlTree(this.routerLinkInput,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}static{this.\u0275fac=function(r){return new(r||e)(O(kn),O(ct),ba("tabindex"),O(rr),O(rt),O(xn))}}static{this.\u0275dir=yn({type:e,selectors:[["","routerLink",""]],hostVars:1,hostBindings:function(r,o){r&1&&Ga("click",function(s){return o.onClick(s.button,s.ctrlKey,s.shiftKey,s.altKey,s.metaKey)}),r&2&&qa("target",o.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",or],skipLocationChange:[2,"skipLocationChange","skipLocationChange",or],replaceUrl:[2,"replaceUrl","replaceUrl",or],routerLink:"routerLink"},standalone:!0,features:[Ha,Dn]})}}return e})(),sp=(()=>{class e{get isActive(){return this._isActive}constructor(n,r,o,i,s){this.router=n,this.element=r,this.renderer=o,this.cdr=i,this.link=s,this.classes=[],this._isActive=!1,this.routerLinkActiveOptions={exact:!1},this.isActiveChange=new X,this.routerEventsSubscription=n.events.subscribe(a=>{a instanceof Le&&this.update()})}ngAfterContentInit(){y(this.links.changes,y(null)).pipe(Xt()).subscribe(n=>{this.update(),this.subscribeToEachLinkOnChanges()})}subscribeToEachLinkOnChanges(){this.linkInputChangesSubscription?.unsubscribe();let n=[...this.links.toArray(),this.link].filter(r=>!!r).map(r=>r.onChanges);this.linkInputChangesSubscription=z(n).pipe(Xt()).subscribe(r=>{this._isActive!==this.isLinkActive(this.router)(r)&&this.update()})}set routerLinkActive(n){let r=Array.isArray(n)?n:n.split(" ");this.classes=r.filter(o=>!!o)}ngOnChanges(n){this.update()}ngOnDestroy(){this.routerEventsSubscription.unsubscribe(),this.linkInputChangesSubscription?.unsubscribe()}update(){!this.links||!this.router.navigated||queueMicrotask(()=>{let n=this.hasActiveLinks();this.classes.forEach(r=>{n?this.renderer.addClass(this.element.nativeElement,r):this.renderer.removeClass(this.element.nativeElement,r)}),n&&this.ariaCurrentWhenActive!==void 0?this.renderer.setAttribute(this.element.nativeElement,"aria-current",this.ariaCurrentWhenActive.toString()):this.renderer.removeAttribute(this.element.nativeElement,"aria-current"),this._isActive!==n&&(this._isActive=n,this.cdr.markForCheck(),this.isActiveChange.emit(n))})}isLinkActive(n){let r=sb(this.routerLinkActiveOptions)?this.routerLinkActiveOptions:this.routerLinkActiveOptions.exact||!1;return o=>{let i=o.urlTree;return i?n.isActive(i,r):!1}}hasActiveLinks(){let n=this.isLinkActive(this.router);return this.link&&n(this.link)||this.links.some(n)}static{this.\u0275fac=function(r){return new(r||e)(O(kn),O(rt),O(rr),O(Ft),O(fi,8))}}static{this.\u0275dir=yn({type:e,selectors:[["","routerLinkActive",""]],contentQueries:function(r,o,i){if(r&1&&Uf(i,fi,5),r&2){let s;zo(s=qo())&&(o.links=s)}},inputs:{routerLinkActiveOptions:"routerLinkActiveOptions",ariaCurrentWhenActive:"ariaCurrentWhenActive",routerLinkActive:"routerLinkActive"},outputs:{isActiveChange:"isActiveChange"},exportAs:["routerLinkActive"],standalone:!0,features:[Dn]})}}return e})();function sb(e){return!!e.paths}var ab=new E("");function ap(e,...t){return No([{provide:Wc,multi:!0,useValue:e},[],{provide:ct,useFactory:cb,deps:[kn]},{provide:Za,multi:!0,useFactory:ub},t.map(n=>n.\u0275providers)])}function cb(e){return e.routerState.root}function ub(){let e=p(Nt);return t=>{let n=e.get(kt);if(t!==n.components[0])return;let r=e.get(kn),o=e.get(lb);e.get(db)===1&&r.initialNavigation(),e.get(fb,null,S.Optional)?.setUpPreloading(),e.get(ab,null,S.Optional)?.init(),r.resetRootComponentType(n.componentTypes[0]),o.closed||(o.next(),o.complete(),o.unsubscribe())}}var lb=new E("",{factory:()=>new te}),db=new E("",{providedIn:"root",factory:()=>1});var fb=new E("");var gi=class e{static \u0275fac=function(n){return new(n||e)};static \u0275cmp=G({type:e,selectors:[["app-pet-the-cat"]],standalone:!0,features:[Z],decls:1,vars:0,consts:[["src",ef`https://lizavetay.github.io/pet-the-cat/`]],template:function(n,r){n&1&&F(0,"iframe",0)},styles:["[_nghost-%COMP%]{display:contents}"]})};var cp=`<!DOCTYPE html>
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
</html>`;var mi=class e{constructor(t){this.sanitizer=t;this.code=t.bypassSecurityTrustHtml(cp)}code;static \u0275fac=function(n){return new(n||e)(O(ye))};static \u0275cmp=G({type:e,selectors:[["app-lava-checkbox"]],standalone:!0,features:[Z],decls:1,vars:1,consts:[[3,"srcdoc"]],template:function(n,r){n&1&&F(0,"iframe",0),n&2&&oe("srcdoc",r.code,Se)},styles:["[_nghost-%COMP%]{display:contents}"]})};var up=`<!DOCTYPE html>
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
</html>`;var vi=class e{constructor(t){this.sanitizer=t;this.code=t.bypassSecurityTrustHtml(up)}code;static \u0275fac=function(n){return new(n||e)(O(ye))};static \u0275cmp=G({type:e,selectors:[["app-captcha"]],standalone:!0,features:[Z],decls:1,vars:1,consts:[[3,"srcdoc"]],template:function(n,r){n&1&&F(0,"iframe",0),n&2&&oe("srcdoc",r.code,Se)},styles:["[_nghost-%COMP%]{display:contents}"]})};var lp=`<!DOCTYPE html>
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
</html>`;var yi=class e{constructor(t){this.sanitizer=t;this.code=t.bypassSecurityTrustHtml(lp)}code;static \u0275fac=function(n){return new(n||e)(O(ye))};static \u0275cmp=G({type:e,selectors:[["app-fund-the-project"]],standalone:!0,features:[Z],decls:1,vars:1,consts:[[3,"srcdoc"]],template:function(n,r){n&1&&F(0,"iframe",0),n&2&&oe("srcdoc",r.code,Se)},styles:["[_nghost-%COMP%]{display:contents}"]})};var dp=`<!DOCTYPE html>
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
</html>`;var Di=class e{constructor(t){this.sanitizer=t;this.code=t.bypassSecurityTrustHtml(dp)}code;static \u0275fac=function(n){return new(n||e)(O(ye))};static \u0275cmp=G({type:e,selectors:[["app-catch-button"]],standalone:!0,features:[Z],decls:1,vars:1,consts:[[3,"srcdoc"]],template:function(n,r){n&1&&F(0,"iframe",0),n&2&&oe("srcdoc",r.code,Se)},styles:["[_nghost-%COMP%]{display:contents}"]})};var fp=`<!DOCTYPE html>
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
</html>`;var wi=class e{constructor(t){this.sanitizer=t;this.code=t.bypassSecurityTrustHtml(fp)}code;static \u0275fac=function(n){return new(n||e)(O(ye))};static \u0275cmp=G({type:e,selectors:[["app-otp-dials"]],standalone:!0,features:[Z],decls:1,vars:1,consts:[[3,"srcdoc"]],template:function(n,r){n&1&&F(0,"iframe",0),n&2&&oe("srcdoc",r.code,Se)},styles:["[_nghost-%COMP%]{display:contents}"]})};var Ci=class e{static \u0275fac=function(n){return new(n||e)};static \u0275cmp=G({type:e,selectors:[["app-squiggly-text"]],standalone:!0,features:[Z],decls:36,vars:0,consts:[["xmlns","http://www.w3.org/2000/svg","id","exadel-text-squiggly"],["id","exadel-text-squiggly-0"],["id","exadel-text-squiggly-turbulence-0","baseFrequency","0.02","numOctaves","3","result","noise","seed","0"],["in","SourceGraphic","in2","noise","scale","6"],["id","exadel-text-squiggly-1"],["id","exadel-text-squiggly-turbulence-1","baseFrequency","0.02","numOctaves","3","result","noise","seed","1"],["in","SourceGraphic","in2","noise","scale","8"],["id","exadel-text-squiggly-2"],["id","exadel-text-squiggly-turbulence-2","baseFrequency","0.02","numOctaves","3","result","noise","seed","2"],["id","exadel-text-squiggly-3"],["id","exadel-text-squiggly-turbulence-3","baseFrequency","0.02","numOctaves","3","result","noise","seed","3"],["id","exadel-text-squiggly-4"],["id","exadel-text-squiggly-turbulence-4","baseFrequency","0.02","numOctaves","3","result","noise","seed","4"],[1,"form-container","with-joke"],["for","name"],["type","text","id","name","required",""],["for","email"],["type","email","id","email","required",""],["for","subject"],["type","text","id","subject","required",""],["type","submit"]],template:function(n,r){n&1&&(gd(),W(0,"svg",0)(1,"style"),Me(2," #exadel-text-squiggly { display: none; } .with-joke :is(h2, label, button, p) { animation: exadel-text-squiggly-animation 0.34s linear infinite; } @keyframes exadel-text-squiggly-animation { 0% {filter: url('#exadel-text-squiggly-0');} 25% {filter: url('#exadel-text-squiggly-1');} 50% {filter: url('#exadel-text-squiggly-2');} 75% {filter: url('#exadel-text-squiggly-3');} 100% {filter: url('#exadel-text-squiggly-4');} } "),H(),W(3,"defs")(4,"filter",1),F(5,"feTurbulence",2)(6,"feDisplacementMap",3),H(),W(7,"filter",4),F(8,"feTurbulence",5)(9,"feDisplacementMap",6),H(),W(10,"filter",7),F(11,"feTurbulence",8)(12,"feDisplacementMap",3),H(),W(13,"filter",9),F(14,"feTurbulence",10)(15,"feDisplacementMap",6),H(),W(16,"filter",11),F(17,"feTurbulence",12)(18,"feDisplacementMap",3),H()()(),md(),W(19,"div",13)(20,"h2"),Me(21,"Contact Form"),H(),W(22,"form")(23,"label",14),Me(24,"Full Name"),H(),F(25,"input",15),W(26,"label",16),Me(27,"Email Address"),H(),F(28,"input",17),W(29,"label",18),Me(30,"Subject"),H(),F(31,"input",19),W(32,"p"),Me(33," By using our services, you agree to these Terms of Service and accept responsibility for compliance with applicable laws. You must provide accurate information and keep your account details confidential. We reserve all rights to our content, and you may not reuse or distribute any part without explicit permission. Our company is not liable for indirect or consequential damages resulting from your use of our services. We reserve the right to terminate or... "),H(),W(34,"button",20),Me(35,"Send Message"),H()()())},styles:[".form-container[_ngcontent-%COMP%]{background-color:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 12px #0000001a;width:320px;margin-top:2rem}.form-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-top:0;margin-bottom:15px;color:#333;text-align:center}.form-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%], .form-container[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%]{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;box-sizing:border-box}.form-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;padding:10px;background:linear-gradient(90deg,#6a5af9,#d66efd);color:#fff;border:none;border-radius:6px;cursor:pointer;transition:opacity .3s}.form-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{opacity:.8}.form-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]:focus, .form-container[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%]:focus{border-color:#6a5af9;outline:none;box-shadow:0 0 0 3px #6a5af933}"]})};var hp=`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Phone Number Slot Machine</title>
    <style>
        :root {
          --primary-color: #307351;
          --primary-hover-color: #36815c;
          --background-color: #f0f0f0;
          --text-color: #333;
          --light-text-color: #f5f5f5;
          --border-color: #000;
          --container-bg: #fff;
          --shadow-color: rgba(0, 0, 0, 0.2);
        }
        
        body {
          font-family: "Arial", sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: var(--background-color);
          margin: 0;
        }
        
        .form-wrapper {
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0 10px 25px var(--shadow-color);
          margin: 8px;
          width: 300px;
        }
        
        .submit-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        
        .submit-btn {
          background-color: var(--primary-color);
          border-radius: 4px;
          padding: 8px 20px;
          transition: all 0.3s ease-in;
          border: none;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          color: var(--light-text-color);
          cursor: pointer;
        }
        
        .submit-btn:hover:not(:disabled) {
          background-color: var(--primary-hover-color);
        }
        
        button:disabled {
          background-color: var(--text-color);
        }
        
        .input-content-wrapper {
          text-align: center;
          width: 100%;
          display: flex;
          align-items: flex-end;
        }
        
        .slot-machine {
          border-radius: 4px;
          padding: 5px;
          margin: 10px 0;
          display: flex;
          justify-content: center;
          overflow: hidden;
          border: 1px solid var(--border-color);
          cursor: text;
          background: var(--container-bg);
        }
        
        .slot-machine.focused {
          box-shadow: 0 0 0 1px var(--border-color);
        }
        
        .digit-wrapper {
          width: 8px;
          height: 20px;
          margin: 0 2px;
          overflow: hidden;
          position: relative;
        }
        
        .digit-spinner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          transition: top 0.5s ease-in-out;
        }
        
        .digit {
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-weight: bold;
          color: var(--text-color);
        }
        
        .roll-btn {
          border: none;
          padding: 0;
          margin: 10px 0 10px 10px;
          font-size: 18px;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
          height: 30px;
          transition: all 0.3s;
          display: none;
          background: transparent;
        }
        
        .machine-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .dice-icon {
          width: 30px;
          height: 30px;
          background: var(--background-color);
          transition: all 0.3s ease-in-out;
        }
        
        .dice-icon:hover {
          transform: scale(1.15);
        }
        
        .label {
          font-weight: 600;
          font-size: 14px;
          align-self: center;
        }
        
        .label-wrapper {
          margin: 10px 10px 10px 0;
          align-self: center;
        }
        
        .submit-message {
          margin-top: 15px;
          padding: 10px;
          text-align: center;
          font-weight: bold;
          min-height: 20px;
        }
    </style>
</head>

<body>
    <form class="form-wrapper">
        <div class="input-content-wrapper">
            <div class="label-wrapper">
                <label class="label">Contact Number:</label>
            </div>
            <div class="machine-wrapper">
                <div class="slot-machine" id="slot-machine">
                </div>
            </div>
            <button class="roll-btn" id="roll-btn">
                <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-114.3 0c11.6 36 3.1 77-25.4 105.5L320 413.8l0 34.2zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
                    />
                </svg>
            </button>
            <!-- Hidden input that will actually store the value -->
            <input type="hidden" id="phone-input" name="phone" value="">
        </div>
        <div class="submit-wrapper">
            <button class="submit-btn" type="submit" id="submit-btn">Submit</button>
        </div>
        <div class="submit-message" id="submit-message"></div>
    </form>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
          const rollBtn = document.getElementById("roll-btn");
          const slotMachine = document.getElementById("slot-machine");
          const phoneInput = document.getElementById("phone-input");
          const submitBtn = document.getElementById("submit-btn");
          const submitMessageContainer = document.getElementById("submit-message");
          const digitSpinners = [];
          const digitContainers = [];
          let isRolling = false;
          let hasRolledOnce = false;
        
          const generateDigitElements = () => {
            const slotMachineContainer = document.getElementById("slot-machine");
        
            Array.from({ length: 9 }).forEach((_, i) => {
              const digitContainer = document.createElement("div");
              digitContainer.className = "digit-wrapper";
              digitContainer.id = \`wrapper-\${i}\`;
        
              const digitSpinner = document.createElement("div");
              digitSpinner.className = "digit-spinner";
              digitSpinner.id = \`digit-\${i}\`;
        
              Array.from({ length: 2 }).forEach(() => {
                Array.from({ length: 10 }).forEach((_, k) => {
                  const digit = document.createElement("div");
                  digit.className = "digit";
                  digit.textContent = k;
                  digitSpinner.appendChild(digit);
                });
              });
        
              digitContainer.appendChild(digitSpinner);
              slotMachineContainer.appendChild(digitContainer);
              digitSpinners.push(digitSpinner);
              digitContainers.push(digitContainer);
            });
          };
        
          const spinDigit = (digitIndex, finalDigit) => {
            return new Promise((resolve) => {
              const spinner = digitSpinners[digitIndex];
              const container = digitContainers[digitIndex];
        
              digitContainers.forEach((c) => c.classList.remove("active-digit"));
              container.classList.add("active-digit");
              spinner.style.transition = "none";
              spinner.style.top = "0px";
              void spinner.offsetWidth;
              spinner.style.transition = "top 2s cubic-bezier(0.1, 0.7, 0.5, 1)";
              spinner.style.top = \`\${-(finalDigit + 10) * 20}px\`;
        
              setTimeout(() => {
                container.classList.remove("active-digit");
                resolve();
              }, 2000);
            });
          };
        
          const rollAllDigits = async () => {
            if (isRolling) return;
        
            const phoneNumber = [];
            isRolling = true;
            rollBtn.disabled = true;
            submitBtn.disabled = true;
        
            Array.from({ length: 9 }).forEach(() => {
              phoneNumber.push(Math.floor(Math.random() * 10));
            });
        
            for (let i = 0; i < 9; i++) {
              await spinDigit(i, phoneNumber[i]);
            }
        
            phoneInput.value = phoneNumber.join("");
        
            rollBtn.disabled = false;
            submitBtn.disabled = false;
            isRolling = false;
        
            if (!hasRolledOnce) {
              hasRolledOnce = true;
              rollBtn.style.display = "block";
            }
          };
        
          const submitPhone = (e) => {
            if (e) e.preventDefault();
        
            const phoneValue = phoneInput.value;
            if (phoneValue) {
              submitMessageContainer.textContent = \`Nailed it! We'll give you a ring at \${phoneValue} to discuss your winnings.\`;
            } else {
              submitMessageContainer.textContent = "Phone number first!";
            }
          };
        
          rollBtn.addEventListener("click", rollAllDigits);
          submitBtn.addEventListener("click", submitPhone);
          slotMachine.addEventListener("click", rollAllDigits);
          slotMachine.addEventListener("click", () => {
            slotMachine.classList.add("focused");
          });
        
          document.addEventListener("click", (event) => {
            if (!slotMachine.contains(event.target) && event.target !== rollBtn) {
              slotMachine.classList.remove("focused");
            }
          });
        
          // Init
          generateDigitElements();
        
          digitSpinners.forEach((spinner) => {
            spinner.style.top = "20px";
          });
        });
    <\/script>
</body>

</html>`;var bi=class e{constructor(t){this.sanitizer=t;this.code=t.bypassSecurityTrustHtml(hp)}code;static \u0275fac=function(n){return new(n||e)(O(ye))};static \u0275cmp=G({type:e,selectors:[["app-contact-number"]],standalone:!0,features:[Z],decls:1,vars:1,consts:[[3,"srcdoc"]],template:function(n,r){n&1&&F(0,"iframe",0),n&2&&oe("srcdoc",r.code,Se)},styles:["[_nghost-%COMP%]{display:contents}"]})};var Ii=[{path:"pet-the-cat",component:gi,title:"Pet The Cat"},{path:"lava-checkbox",component:mi,title:"Lava Checkbox"},{path:"captcha",component:vi,title:"Captcha Scratch"},{path:"fund-project",component:yi,title:"Fund The Project"},{path:"catch-button",component:Di,title:"Catch The Button"},{path:"otp-dials",component:wi,title:"OTP Dials"},{path:"squiggly-text",component:Ci,title:"Squiggly Text"},{path:"contact-number",component:bi,title:"Contact Number"}];var pp={providers:[Jf({eventCoalescing:!0}),ap(Ii)]};var pb=["content"];function gb(e,t){if(e&1&&(W(0,"li")(1,"a",2),Me(2),H()()),e&2){let n=t.$implicit;nr(),oe("routerLink",n.path),nr(),Go(n.title)}}var Ei=class e{constructor(t,n){this.route=t;this.router=n}pageTitle$;routes=Ii;content;ngOnInit(){this.pageTitle$=this.router.events.pipe(ce(t=>t instanceof Le),x(()=>this.route.firstChild),ue(t=>t?.data||y({})),x(t=>(this.content.nativeElement.scrollIntoView({behavior:"smooth",block:"start"}),t[Object.getOwnPropertySymbols(t)[0]])))}static \u0275fac=function(n){return new(n||e)(O(ct),O(kn))};static \u0275cmp=G({type:e,selectors:[["app-root"]],viewQuery:function(n,r){if(n&1&&zf(pb,5),n&2){let o;zo(o=qo())&&(r.content=o.first)}},standalone:!0,features:[Z],decls:12,vars:4,consts:[["content",""],[4,"ngFor","ngForOf"],["routerLinkActive","active",3,"routerLink"]],template:function(n,r){n&1&&(W(0,"header")(1,"nav")(2,"h1"),Me(3,"JS Jokesters"),H(),W(4,"ul"),za(5,gb,3,2,"li",1),H()()(),W(6,"main")(7,"h2"),Me(8),Gf(9,"async"),H(),F(10,"router-outlet",null,0),H()),n&2&&(nr(5),oe("ngForOf",r.routes),nr(3),Go(Wf(9,2,r.pageTitle$)))},dependencies:[Uc,fi,ph,hh,sp],styles:["main[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;flex:1}nav[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:0 1rem}ul[_ngcontent-%COMP%]{display:flex;list-style:none;gap:1rem;min-width:0}li[_ngcontent-%COMP%]{overflow:hidden}a[_ngcontent-%COMP%]{color:#00005b;text-decoration:none;font-size:1rem;text-transform:uppercase;font-weight:600;padding:.25rem .75rem;border:1px solid blue;background-color:#efefef;transition:background-color .2s ease;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:block}a.active[_ngcontent-%COMP%]{background-color:#00005b;color:#efefef}a[_ngcontent-%COMP%]:hover:not(.active){background-color:#00f;color:#efefef}[_nghost-%COMP%]{display:flex;flex-direction:column}h1[_ngcontent-%COMP%]{margin:0;background:linear-gradient(90deg,#ff6ec4,#7873f5);-webkit-background-clip:text;-webkit-text-fill-color:transparent;white-space:nowrap}h2[_ngcontent-%COMP%]{margin:.75rem}"]})};Ih(Ei,pp).catch(e=>console.error(e));
