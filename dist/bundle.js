(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){guarded=require("../src")},{"../src":2}],2:[function(require,module,exports){(function(){"use strict";var fn=require("./lib/fun-function");var setProp=require("./lib/set-prop");var assert=require("./lib/assert");module.exports=fn.curry(guarded);function guarded(inputsGuard,outputGuard,f){return setProp("length",f.length,setProp("name",f.name,fn.compose(fn.curry(assert)(outputGuard),fn.reArg(fn.tee(fn.curry(assert)(inputsGuard)),f))))}})()},{"./lib/assert":3,"./lib/fun-function":4,"./lib/set-prop":6}],3:[function(require,module,exports){(function(){"use strict";var stringify=require("./stringify-anything");module.exports=assert;function assert(predicate,subject){if(!predicate(subject)){throw Error("!"+predicate.name+"("+stringify(subject)+")")}return subject}})()},{"./stringify-anything":7}],4:[function(require,module,exports){(function(){"use strict";var stringify=require("./stringify-anything");var unfold=require("./fun-unfold");var setProp=require("./set-prop");module.exports={dimap:curry(dimap),map:curry(map),contramap:curry(contramap),compose:curry(compose),composeAll:composeAll,k:k,id:id,tee:curry(tee),arg:arg,args:args,reArg:curry(reArg),flip:flip,argsToArray:argsToArray,argsToObject:curry(argsToObject),iterate:curry(iterate),apply:curry(apply),applyFrom:curry(applyFrom),curry:curry};function curry(f,arity,args){arity=arity||f.length;args=args||[];return setProp("name",partialName(f,args),setProp("length",arity,function(){var newPartialArgs=Array.prototype.slice.call(arguments);var newArgs=args.concat(newPartialArgs.length?newPartialArgs:[undefined]);return newArgs.length>=arity?f.apply(null,newArgs):setProp("length",arity-newArgs.length,curry(f,arity,newArgs))}));function partialName(f,args){return stringify(f)+"("+stringify(args)+")"}}function reArg(t,f){return setProp("length",t.length,setProp("name",t.name+"("+f.name+")",result));function result(){return apply(t(Array.prototype.slice.call(arguments)),f)}}function flip(f){return setProp("length",f.length,reArg(reverse,f));function reverse(args){return args.map(id).reverse()}}function argsToArray(f){return reArg(toArray,f);function toArray(args){return args[0]}}function argsToObject(keys,f){return reArg(toObject,f);function toObject(object){return keys.map(function(key){return object[0][key]})}}function args(){return function args(){return Array.prototype.slice.call(arguments)}}function arg(n){return function(){return arguments[n]}}function applyFrom(options,source){return apply(options.inputs(source),options.f(source))}function apply(args,f){return f.apply(null,args)}function iterate(n,f,x){return unfold(next,stop,[0,x])[1];function next(pair){return[pair[0]+1,f(pair[1])]}function stop(pair){return pair[0]>=n}}function map(f,source){return compose(f,source)}function contramap(f,source){return compose(source,f)}function dimap(f,g,source){return composeAll([g,source,f])}function compose(f,g){return setProp("length",g.length,setProp("name",stringify(f)+"."+stringify(g),function(){return f(g.apply(null,arguments))}))}function composeAll(functions){return functions.reduce(compose,id)}function id(a){return a}function tee(f,x){f(x);return x}function k(a){return function(){return a}}})()},{"./fun-unfold":5,"./set-prop":6,"./stringify-anything":7}],5:[function(require,module,exports){(function(){"use strict";module.exports=unfold;function unfold(next,stop,value){while(!stop(value)){value=next(value)}return value}})()},{}],6:[function(require,module,exports){(function(){"use strict";module.exports=setProp;function setProp(key,value,target){return Object.defineProperty(target,key,Object.defineProperty(Object.getOwnPropertyDescriptor(target,key),"value",{value:value}))}})()},{}],7:[function(require,module,exports){(function(){"use strict";module.exports=stringify;function stringify(anything){if(isPrimitive(anything)){return JSON.stringify(anything)}if(anything===undefined){return"undefined"}if(anything instanceof Function){return anything.name?anything.name+"("+repeat(anything.length,"").join(",")+")":"("+repeat(anything.length,"").join(",")+")=>"}if(anything instanceof RegExp||anything instanceof Error){return anything.toString()}if(anything instanceof Array){return"["+anything.map(stringify).join(",")+"]"}if(anything instanceof Object){return"{"+zipWith(join,Object.keys(anything),values(anything).map(stringify)).join(",")+"}"}}function isPrimitive(x){return x===null||typeof x==="boolean"||typeof x==="number"||typeof x==="string"}function repeat(n,s){return Array.apply(null,{length:n}).map(function(){return s})}function zipWith(f,a1,a2){return a1.map(function(e,i){return f(e,a2[i])})}function values(object){return Object.keys(object).map(function(key){return object[key]})}function join(key,value){return key+":"+value}})()},{}]},{},[1]);
