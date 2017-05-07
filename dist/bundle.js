(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){guarded=require("../src")},{"../src":2}],2:[function(require,module,exports){(function(){"use strict";var fn=require("./lib/fun-function");var setProp=require("./lib/set-prop");var assert=require("./lib/assert");module.exports=guarded;function guarded(options){return setProp("length",options.f.length,setProp("name",options.f.name,fn.compose(fn.curry(assert)(options.output),fn.reArg(fn.tee(fn.curry(assert)(options.inputs)),options.f))))}})()},{"./lib/assert":3,"./lib/fun-function":6,"./lib/set-prop":8}],3:[function(require,module,exports){(function(){"use strict";var stringify=require("./stringify");module.exports=assert;function assert(predicate,subject){if(!predicate(subject)){throw Error("!"+predicate.name+"("+stringify(subject)+")")}return subject}})()},{"./stringify":9}],4:[function(require,module,exports){(function(){"use strict";module.exports=compose;function compose(f,g){if(typeof f!=="function"||typeof g!=="function"){throw Error("f and g must be functions. f:"+f+" g:"+g)}return setProp("length",g.length,setProp("name",dot(f,g),function(){return f(g.apply(null,arguments))}))}function dot(a,b){return a.name+"."+b.name}function setProp(prop,value,target){return Object.defineProperty(target,prop,Object.defineProperty(Object.getOwnPropertyDescriptor(target,prop),"value",{value:value}))}})()},{}],5:[function(require,module,exports){(function(){"use strict";var setProp=require("./set-prop");module.exports=funCurry;function funCurry(f,arity,args){arity=arity||f.length;args=args||[];return setProp("length",arity,function curried(){var newArgs=args.concat(Array.prototype.slice.call(arguments));return newArgs.length>=arity?f.apply(null,newArgs):setProp("length",arity-newArgs.length,funCurry(f,arity,newArgs))})}})()},{"./set-prop":8}],6:[function(require,module,exports){(function(){"use strict";var curry=require("./fun-curry");var funCompose=require("./fun-compose");var unfold=require("./fun-unfold");var setProp=require("./set-prop");module.exports={dimap:curry(dimap),map:curry(map),contramap:curry(contramap),compose:curry(compose),composeAll:composeAll,k:k,id:id,tee:curry(tee),arg:arg,args:args,reArg:curry(reArg),flip:flip,argsToArray:argsToArray,argsToObject:curry(argsToObject),iterate:curry(iterate),apply:curry(apply),applyFrom:curry(applyFrom),curry:curry};function reArg(t,f){return setProp("length",t.length,setProp("name",t.name+"("+f.name+")",result));function result(){return apply(t(Array.prototype.slice.call(arguments)),f)}}function flip(f){return setProp("length",f.length,reArg(reverse,f));function reverse(args){return args.map(id).reverse()}}function argsToArray(f){return reArg(toArray,f);function toArray(args){return args[0]}}function argsToObject(keys,f){return reArg(toObject,f);function toObject(object){return keys.map(function(key){return object[0][key]})}}function args(){return function args(){return Array.prototype.slice.call(arguments)}}function arg(n){return function(){return arguments[n]}}function applyFrom(options,source){return apply(options.inputs(source),options.f(source))}function apply(args,f){return f.apply(null,args)}function iterate(n,f,x){return unfold(next,stop,[0,x])[1];function next(pair){return[pair[0]+1,f(pair[1])]}function stop(pair){return pair[0]>=n}}function map(f,source){return compose(f,source)}function contramap(f,source){return compose(source,f)}function dimap(f,g,source){return composeAll([g,source,f])}function compose(f,g){return funCompose(f,g)}function composeAll(functions){return functions.reduce(compose,id)}function id(a){return a}function tee(f,x){f(x);return x}function k(a){return function(){return a}}})()},{"./fun-compose":4,"./fun-curry":5,"./fun-unfold":7,"./set-prop":8}],7:[function(require,module,exports){(function(){"use strict";module.exports=unfold;function unfold(next,stop,value){while(!stop(value)){value=next(value)}return value}})()},{}],8:[function(require,module,exports){(function(){"use strict";module.exports=setProp;function setProp(key,value,target){return Object.defineProperty(target,key,Object.defineProperty(Object.getOwnPropertyDescriptor(target,key),"value",{value:value}))}})()},{}],9:[function(require,module,exports){(function(){"use strict";module.exports=stringify;function stringify(x){return JSON.stringify(x)}})()},{}]},{},[1]);
