﻿//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
// MicrosoftAjax.js
Function.__typeName="Function";Function.__class=true;Function.createCallback=function(b,a){return function(){var e=arguments.length;if(e>0){var d=[];for(var c=0;c<e;c++)d[c]=arguments[c];d[e]=a;return b.apply(this,d)}return b.call(this,a)}};Function.createDelegate=function(a,b){return function(){return b.apply(a,arguments)}};Function.emptyFunction=Function.emptyMethod=function(){};Function.validateParameters=function(c,b,a){return Function._validateParams(c,b,a)};Function._validateParams=function(g,e,c){var a,d=e.length;c=c||typeof c==="undefined";a=Function._validateParameterCount(g,e,c);if(a){a.popStackFrame();return a}for(var b=0,i=g.length;b<i;b++){var f=e[Math.min(b,d-1)],h=f.name;if(f.parameterArray)h+="["+(b-d+1)+"]";else if(!c&&b>=d)break;a=Function._validateParameter(g[b],f,h);if(a){a.popStackFrame();return a}}return null};Function._validateParameterCount=function(j,d,i){var a,c,b=d.length,e=j.length;if(e<b){var f=b;for(a=0;a<b;a++){var g=d[a];if(g.optional||g.parameterArray)f--}if(e<f)c=true}else if(i&&e>b){c=true;for(a=0;a<b;a++)if(d[a].parameterArray){c=false;break}}if(c){var h=Error.parameterCount();h.popStackFrame();return h}return null};Function._validateParameter=function(c,a,h){var b,g=a.type,l=!!a.integer,k=!!a.domElement,m=!!a.mayBeNull;b=Function._validateParameterType(c,g,l,k,m,h);if(b){b.popStackFrame();return b}var e=a.elementType,f=!!a.elementMayBeNull;if(g===Array&&typeof c!=="undefined"&&c!==null&&(e||!f)){var j=!!a.elementInteger,i=!!a.elementDomElement;for(var d=0;d<c.length;d++){var n=c[d];b=Function._validateParameterType(n,e,j,i,f,h+"["+d+"]");if(b){b.popStackFrame();return b}}}return null};Function._validateParameterType=function(b,c,k,j,h,d){var a,g;if(typeof b==="undefined")if(h)return null;else{a=Error.argumentUndefined(d);a.popStackFrame();return a}if(b===null)if(h)return null;else{a=Error.argumentNull(d);a.popStackFrame();return a}if(c&&c.__enum){if(typeof b!=="number"){a=Error.argumentType(d,Object.getType(b),c);a.popStackFrame();return a}if(b%1===0){var e=c.prototype;if(!c.__flags||b===0){for(g in e)if(e[g]===b)return null}else{var i=b;for(g in e){var f=e[g];if(f===0)continue;if((f&b)===f)i-=f;if(i===0)return null}}}a=Error.argumentOutOfRange(d,b,String.format(Sys.Res.enumInvalidValue,b,c.getName()));a.popStackFrame();return a}if(j&&(!Sys._isDomElement(b)||b.nodeType===3)){a=Error.argument(d,Sys.Res.argumentDomElement);a.popStackFrame();return a}if(c&&!Sys._isInstanceOfType(c,b)){a=Error.argumentType(d,Object.getType(b),c);a.popStackFrame();return a}if(c===Number&&k)if(b%1!==0){a=Error.argumentOutOfRange(d,b,Sys.Res.argumentInteger);a.popStackFrame();return a}return null};Error.__typeName="Error";Error.__class=true;Error.create=function(d,b){var a=new Error(d);a.message=d;if(b)for(var c in b)a[c]=b[c];a.popStackFrame();return a};Error.argument=function(a,c){var b="Sys.ArgumentException: "+(c?c:Sys.Res.argument);if(a)b+="\n"+String.format(Sys.Res.paramName,a);var d=Error.create(b,{name:"Sys.ArgumentException",paramName:a});d.popStackFrame();return d};Error.argumentNull=function(a,c){var b="Sys.ArgumentNullException: "+(c?c:Sys.Res.argumentNull);if(a)b+="\n"+String.format(Sys.Res.paramName,a);var d=Error.create(b,{name:"Sys.ArgumentNullException",paramName:a});d.popStackFrame();return d};Error.argumentOutOfRange=function(c,a,d){var b="Sys.ArgumentOutOfRangeException: "+(d?d:Sys.Res.argumentOutOfRange);if(c)b+="\n"+String.format(Sys.Res.paramName,c);if(typeof a!=="undefined"&&a!==null)b+="\n"+String.format(Sys.Res.actualValue,a);var e=Error.create(b,{name:"Sys.ArgumentOutOfRangeException",paramName:c,actualValue:a});e.popStackFrame();return e};Error.argumentType=function(d,c,b,e){var a="Sys.ArgumentTypeException: ";if(e)a+=e;else if(c&&b)a+=String.format(Sys.Res.argumentTypeWithTypes,c.getName(),b.getName());else a+=Sys.Res.argumentType;if(d)a+="\n"+String.format(Sys.Res.paramName,d);var f=Error.create(a,{name:"Sys.ArgumentTypeException",paramName:d,actualType:c,expectedType:b});f.popStackFrame();return f};Error.argumentUndefined=function(a,c){var b="Sys.ArgumentUndefinedException: "+(c?c:Sys.Res.argumentUndefined);if(a)b+="\n"+String.format(Sys.Res.paramName,a);var d=Error.create(b,{name:"Sys.ArgumentUndefinedException",paramName:a});d.popStackFrame();return d};Error.format=function(a){var c="Sys.FormatException: "+(a?a:Sys.Res.format),b=Error.create(c,{name:"Sys.FormatException"});b.popStackFrame();return b};Error.invalidOperation=function(a){var c="Sys.InvalidOperationException: "+(a?a:Sys.Res.invalidOperation),b=Error.create(c,{name:"Sys.InvalidOperationException"});b.popStackFrame();return b};Error.notImplemented=function(a){var c="Sys.NotImplementedException: "+(a?a:Sys.Res.notImplemented),b=Error.create(c,{name:"Sys.NotImplementedException"});b.popStackFrame();return b};Error.parameterCount=function(a){var c="Sys.ParameterCountException: "+(a?a:Sys.Res.parameterCount),b=Error.create(c,{name:"Sys.ParameterCountException"});b.popStackFrame();return b};Error.prototype.popStackFrame=function(){if(typeof this.stack==="undefined"||this.stack===null||typeof this.fileName==="undefined"||this.fileName===null||typeof this.lineNumber==="undefined"||this.lineNumber===null)return;var a=this.stack.split("\n"),c=a[0],e=this.fileName+":"+this.lineNumber;while(typeof c!=="undefined"&&c!==null&&c.indexOf(e)===-1){a.shift();c=a[0]}var d=a[1];if(typeof d==="undefined"||d===null)return;var b=d.match(/@(.*):(\d+)$/);if(typeof b==="undefined"||b===null)return;this.fileName=b[1];this.lineNumber=parseInt(b[2]);a.shift();this.stack=a.join("\n")};Object.__typeName="Object";Object.__class=true;Object.getType=function(b){var a=b.constructor;if(!a||typeof a!=="function"||!a.__typeName||a.__typeName==="Object")return Object;return a};Object.getTypeName=function(a){return Object.getType(a).getName()};String.__typeName="String";String.__class=true;String.prototype.endsWith=function(a){return this.substr(this.length-a.length)===a};String.prototype.startsWith=function(a){return this.substr(0,a.length)===a};String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};String.prototype.trimEnd=function(){return this.replace(/\s+$/,"")};String.prototype.trimStart=function(){return this.replace(/^\s+/,"")};String.format=function(){return String._toFormattedString(false,arguments)};String._toFormattedString=function(l,j){var c="",e=j[0];for(var a=0;true;){var f=e.indexOf("{",a),d=e.indexOf("}",a);if(f<0&&d<0){c+=e.slice(a);break}if(d>0&&(d<f||f<0)){c+=e.slice(a,d+1);a=d+2;continue}c+=e.slice(a,f);a=f+1;if(e.charAt(a)==="{"){c+="{";a++;continue}if(d<0)break;var h=e.substring(a,d),g=h.indexOf(":"),k=parseInt(g<0?h:h.substring(0,g),10)+1,i=g<0?"":h.substring(g+1),b=j[k];if(typeof b==="undefined"||b===null)b="";if(b.toFormattedString)c+=b.toFormattedString(i);else if(l&&b.localeFormat)c+=b.localeFormat(i);else if(b.format)c+=b.format(i);else c+=b.toString();a=d+1}return c};Boolean.__typeName="Boolean";Boolean.__class=true;Boolean.parse=function(b){var a=b.trim().toLowerCase();if(a==="false")return false;if(a==="true")return true};Date.__typeName="Date";Date.__class=true;Number.__typeName="Number";Number.__class=true;RegExp.__typeName="RegExp";RegExp.__class=true;if(!window)this.window=this;window.Type=Function;Type.prototype.callBaseMethod=function(a,d,b){var c=Sys._getBaseMethod(this,a,d);if(!b)return c.apply(a);else return c.apply(a,b)};Type.prototype.getBaseMethod=function(a,b){return Sys._getBaseMethod(this,a,b)};Type.prototype.getBaseType=function(){return typeof this.__baseType==="undefined"?null:this.__baseType};Type.prototype.getInterfaces=function(){var a=[],b=this;while(b){var c=b.__interfaces;if(c)for(var d=0,f=c.length;d<f;d++){var e=c[d];if(!Array.contains(a,e))a[a.length]=e}b=b.__baseType}return a};Type.prototype.getName=function(){return typeof this.__typeName==="undefined"?"":this.__typeName};Type.prototype.implementsInterface=function(d){this.resolveInheritance();var c=d.getName(),a=this.__interfaceCache;if(a){var e=a[c];if(typeof e!=="undefined")return e}else a=this.__interfaceCache={};var b=this;while(b){var f=b.__interfaces;if(f)if(Array.indexOf(f,d)!==-1)return a[c]=true;b=b.__baseType}return a[c]=false};Type.prototype.inheritsFrom=function(b){this.resolveInheritance();var a=this.__baseType;while(a){if(a===b)return true;a=a.__baseType}return false};Type.prototype.initializeBase=function(a,b){this.resolveInheritance();if(this.__baseType)if(!b)this.__baseType.apply(a);else this.__baseType.apply(a,b);return a};Type.prototype.isImplementedBy=function(a){if(typeof a==="undefined"||a===null)return false;var b=Object.getType(a);return !!(b.implementsInterface&&b.implementsInterface(this))};Type.prototype.isInstanceOfType=function(a){return Sys._isInstanceOfType(this,a)};Type.prototype.registerClass=function(c,b,d){this.prototype.constructor=this;this.__typeName=c;this.__class=true;if(b){this.__baseType=b;this.__basePrototypePending=true}Sys.__upperCaseTypes[c.toUpperCase()]=this;if(d){this.__interfaces=[];for(var a=2,f=arguments.length;a<f;a++){var e=arguments[a];this.__interfaces.push(e)}}return this};Type.prototype.registerInterface=function(a){Sys.__upperCaseTypes[a.toUpperCase()]=this;this.prototype.constructor=this;this.__typeName=a;this.__interface=true;return this};Type.prototype.resolveInheritance=function(){if(this.__basePrototypePending){var b=this.__baseType;b.resolveInheritance();for(var a in b.prototype){var c=b.prototype[a];if(!this.prototype[a])this.prototype[a]=c}delete this.__basePrototypePending}};Type.getRootNamespaces=function(){return Array.clone(Sys.__rootNamespaces)};Type.isClass=function(a){if(typeof a==="undefined"||a===null)return false;return !!a.__class};Type.isInterface=function(a){if(typeof a==="undefined"||a===null)return false;return !!a.__interface};Type.isNamespace=function(a){if(typeof a==="undefined"||a===null)return false;return !!a.__namespace};Type.parse=function(typeName,ns){var fn;if(ns){fn=Sys.__upperCaseTypes[ns.getName().toUpperCase()+"."+typeName.toUpperCase()];return fn||null}if(!typeName)return null;if(!Type.__htClasses)Type.__htClasses={};fn=Type.__htClasses[typeName];if(!fn){fn=eval(typeName);Type.__htClasses[typeName]=fn}return fn};Type.registerNamespace=function(e){var d=window,c=e.split(".");for(var b=0;b<c.length;b++){var f=c[b],a=d[f];if(!a)a=d[f]={};if(!a.__namespace){if(b===0&&e!=="Sys")Sys.__rootNamespaces[Sys.__rootNamespaces.length]=a;a.__namespace=true;a.__typeName=c.slice(0,b+1).join(".");a.getName=function(){return this.__typeName}}d=a}};Type._checkDependency=function(c,a){var d=Type._registerScript._scripts,b=d?!!d[c]:false;if(typeof a!=="undefined"&&!b)throw Error.invalidOperation(String.format(Sys.Res.requiredScriptReferenceNotIncluded,a,c));return b};Type._registerScript=function(a,c){var b=Type._registerScript._scripts;if(!b)Type._registerScript._scripts=b={};if(b[a])throw Error.invalidOperation(String.format(Sys.Res.scriptAlreadyLoaded,a));b[a]=true;if(c)for(var d=0,f=c.length;d<f;d++){var e=c[d];if(!Type._checkDependency(e))throw Error.invalidOperation(String.format(Sys.Res.scriptDependencyNotFound,a,e))}};Type.registerNamespace("Sys");Sys.__upperCaseTypes={};Sys.__rootNamespaces=[Sys];Sys._isInstanceOfType=function(c,b){if(typeof b==="undefined"||b===null)return false;if(b instanceof c)return true;var a=Object.getType(b);return !!(a===c)||a.inheritsFrom&&a.inheritsFrom(c)||a.implementsInterface&&a.implementsInterface(c)};Sys._getBaseMethod=function(d,e,c){var b=d.getBaseType();if(b){var a=b.prototype[c];return a instanceof Function?a:null}return null};Sys._isDomElement=function(a){var c=false;if(typeof a.nodeType!=="number"){var b=a.ownerDocument||a.document||a;if(b!=a){var d=b.defaultView||b.parentWindow;c=d!=a}else c=typeof b.body==="undefined"}return !c};Array.__typeName="Array";Array.__class=true;Array.add=Array.enqueue=function(a,b){a[a.length]=b};Array.addRange=function(a,b){a.push.apply(a,b)};Array.clear=function(a){a.length=0};Array.clone=function(a){if(a.length===1)return [a[0]];else return Array.apply(null,a)};Array.contains=function(a,b){return Sys._indexOf(a,b)>=0};Array.dequeue=function(a){return a.shift()};Array.forEach=function(b,e,d){for(var a=0,f=b.length;a<f;a++){var c=b[a];if(typeof c!=="undefined")e.call(d,c,a,b)}};Array.indexOf=function(a,c,b){return Sys._indexOf(a,c,b)};Array.insert=function(a,b,c){a.splice(b,0,c)};Array.parse=function(value){if(!value)return [];return eval(value)};Array.remove=function(b,c){var a=Sys._indexOf(b,c);if(a>=0)b.splice(a,1);return a>=0};Array.removeAt=function(a,b){a.splice(b,1)};Sys._indexOf=function(d,e,a){if(typeof e==="undefined")return -1;var c=d.length;if(c!==0){a=a-0;if(isNaN(a))a=0;else{if(isFinite(a))a=a-a%1;if(a<0)a=Math.max(0,c+a)}for(var b=a;b<c;b++)if(typeof d[b]!=="undefined"&&d[b]===e)return b}return -1};Type._registerScript._scripts={"MicrosoftAjaxCore.js":true,"MicrosoftAjaxGlobalization.js":true,"MicrosoftAjaxSerialization.js":true,"MicrosoftAjaxComponentModel.js":true,"MicrosoftAjaxHistory.js":true,"MicrosoftAjaxNetwork.js":true,"MicrosoftAjaxWebServices.js":true};Sys.IDisposable=function(){};Sys.IDisposable.prototype={};Sys.IDisposable.registerInterface("Sys.IDisposable");Sys.StringBuilder=function(a){this._parts=typeof a!=="undefined"&&a!==null&&a!==""?[a.toString()]:[];this._value={};this._len=0};Sys.StringBuilder.prototype={append:function(a){this._parts[this._parts.length]=a},appendLine:function(a){this._parts[this._parts.length]=typeof a==="undefined"||a===null||a===""?"\r\n":a+"\r\n"},clear:function(){this._parts=[];this._value={};this._len=0},isEmpty:function(){if(this._parts.length===0)return true;return this.toString()===""},toString:function(a){a=a||"";var b=this._parts;if(this._len!==b.length){this._value={};this._len=b.length}var d=this._value;if(typeof d[a]==="undefined"){if(a!=="")for(var c=0;c<b.length;)if(typeof b[c]==="undefined"||b[c]===""||b[c]===null)b.splice(c,1);else c++;d[a]=this._parts.join(a)}return d[a]}};Sys.StringBuilder.registerClass("Sys.StringBuilder");Sys.Browser={};Sys.Browser.InternetExplorer={};Sys.Browser.Firefox={};Sys.Browser.Safari={};Sys.Browser.Opera={};Sys.Browser.agent=null;Sys.Browser.hasDebuggerStatement=false;Sys.Browser.name=navigator.appName;Sys.Browser.version=parseFloat(navigator.appVersion);Sys.Browser.documentMode=0;if(navigator.userAgent.indexOf(" MSIE ")>-1){Sys.Browser.agent=Sys.Browser.InternetExplorer;Sys.Browser.version=parseFloat(navigator.userAgent.match(/MSIE (\d+\.\d+)/)[1]);if(Sys.Browser.version>=8)if(document.documentMode>=7)Sys.Browser.documentMode=document.documentMode;Sys.Browser.hasDebuggerStatement=true}else if(navigator.userAgent.indexOf(" Firefox/")>-1){Sys.Browser.agent=Sys.Browser.Firefox;Sys.Browser.version=parseFloat(navigator.userAgent.match(/Firefox\/(\d+\.\d+)/)[1]);Sys.Browser.name="Firefox";Sys.Browser.hasDebuggerStatement=true}else if(navigator.userAgent.indexOf(" AppleWebKit/")>-1){Sys.Browser.agent=Sys.Browser.Safari;Sys.Browser.version=parseFloat(navigator.userAgent.match(/AppleWebKit\/(\d+(\.\d+)?)/)[1]);Sys.Browser.name="Safari"}else if(navigator.userAgent.indexOf("Opera/")>-1)Sys.Browser.agent=Sys.Browser.Opera;Sys.EventArgs=function(){};Sys.EventArgs.registerClass("Sys.EventArgs");Sys.EventArgs.Empty=new Sys.EventArgs;Sys.CancelEventArgs=function(){Sys.CancelEventArgs.initializeBase(this);this._cancel=false};Sys.CancelEventArgs.prototype={get_cancel:function(){return this._cancel},set_cancel:function(a){this._cancel=a}};Sys.CancelEventArgs.registerClass("Sys.CancelEventArgs",Sys.EventArgs);Type.registerNamespace("Sys.UI");Sys._Debug=function(){};Sys._Debug.prototype={_appendConsole:function(a){if(typeof Debug!=="undefined"&&Debug.writeln)Debug.writeln(a);if(window.console&&window.console.log)window.console.log(a);if(window.opera)window.opera.postError(a);if(window.debugService)window.debugService.trace(a)},_appendTrace:function(b){var a=document.getElementById("TraceConsole");if(a&&a.tagName.toUpperCase()==="TEXTAREA")a.value+=b+"\n"},assert:function(c,a,b){if(!c){a=b&&this.assert.caller?String.format(Sys.Res.assertFailedCaller,a,this.assert.caller):String.format(Sys.Res.assertFailed,a);if(confirm(String.format(Sys.Res.breakIntoDebugger,a)))this.fail(a)}},clearTrace:function(){var a=document.getElementById("TraceConsole");if(a&&a.tagName.toUpperCase()==="TEXTAREA")a.value=""},fail:function(message){this._appendConsole(message);if(Sys.Browser.hasDebuggerStatement)eval("debugger")},trace:function(a){this._appendConsole(a);this._appendTrace(a)},traceDump:function(a,b){var c=this._traceDump(a,b,true)},_traceDump:function(a,c,f,b,d){c=c?c:"traceDump";b=b?b:"";if(a===null){this.trace(b+c+": null");return}switch(typeof a){case "undefined":this.trace(b+c+": Undefined");break;case "number":case "string":case "boolean":this.trace(b+c+": "+a);break;default:if(Date.isInstanceOfType(a)||RegExp.isInstanceOfType(a)){this.trace(b+c+": "+a.toString());break}if(!d)d=[];else if(Array.contains(d,a)){this.trace(b+c+": ...");return}Array.add(d,a);if(a==window||a===document||window.HTMLElement&&a instanceof HTMLElement||typeof a.nodeName==="string"){var k=a.tagName?a.tagName:"DomElement";if(a.id)k+=" - "+a.id;this.trace(b+c+" {"+k+"}")}else{var i=Object.getTypeName(a);this.trace(b+c+(typeof i==="string"?" {"+i+"}":""));if(b===""||f){b+="    ";var e,j,l,g,h;if(Array.isInstanceOfType(a)){j=a.length;for(e=0;e<j;e++)this._traceDump(a[e],"["+e+"]",f,b,d)}else for(g in a){h=a[g];if(!Function.isInstanceOfType(h))this._traceDump(h,g,f,b,d)}}}Array.remove(d,a)}}};Sys._Debug.registerClass("Sys._Debug");Sys.Debug=new Sys._Debug;Sys.Debug.isDebug=false;function Sys$Enum$parse(c,e){var a,b,i;if(e){a=this.__lowerCaseValues;if(!a){this.__lowerCaseValues=a={};var g=this.prototype;for(var f in g)a[f.toLowerCase()]=g[f]}}else a=this.prototype;if(!this.__flags){i=e?c.toLowerCase():c;b=a[i.trim()];if(typeof b!=="number")throw Error.argument("value",String.format(Sys.Res.enumInvalidValue,c,this.__typeName));return b}else{var h=(e?c.toLowerCase():c).split(","),j=0;for(var d=h.length-1;d>=0;d--){var k=h[d].trim();b=a[k];if(typeof b!=="number")throw Error.argument("value",String.format(Sys.Res.enumInvalidValue,c.split(",")[d].trim(),this.__typeName));j|=b}return j}}function Sys$Enum$toString(c){if(typeof c==="undefined"||c===null)return this.__string;var d=this.prototype,a;if(!this.__flags||c===0){for(a in d)if(d[a]===c)return a}else{var b=this.__sortedValues;if(!b){b=[];for(a in d)b[b.length]={key:a,value:d[a]};b.sort(function(a,b){return a.value-b.value});this.__sortedValues=b}var e=[],g=c;for(a=b.length-1;a>=0;a--){var h=b[a],f=h.value;if(f===0)continue;if((f&c)===f){e[e.length]=h.key;g-=f;if(g===0)break}}if(e.length&&g===0)return e.reverse().join(", ")}return ""}Type.prototype.registerEnum=function(b,c){Sys.__upperCaseTypes[b.toUpperCase()]=this;for(var a in this.prototype)this[a]=this.prototype[a];this.__typeName=b;this.parse=Sys$Enum$parse;this.__string=this.toString();this.toString=Sys$Enum$toString;this.__flags=c;this.__enum=true};Type.isEnum=function(a){if(typeof a==="undefined"||a===null)return false;return !!a.__enum};Type.isFlags=function(a){if(typeof a==="undefined"||a===null)return false;return !!a.__flags};Sys.CollectionChange=function(e,a,c,b,d){this.action=e;if(a)if(!(a instanceof Array))a=[a];this.newItems=a||null;if(typeof c!=="number")c=-1;this.newStartingIndex=c;if(b)if(!(b instanceof Array))b=[b];this.oldItems=b||null;if(typeof d!=="number")d=-1;this.oldStartingIndex=d};Sys.CollectionChange.registerClass("Sys.CollectionChange");Sys.NotifyCollectionChangedAction=function(){throw Error.notImplemented()};Sys.NotifyCollectionChangedAction.prototype={add:0,remove:1,reset:2};Sys.NotifyCollectionChangedAction.registerEnum("Sys.NotifyCollectionChangedAction");Sys.NotifyCollectionChangedEventArgs=function(a){this._changes=a;Sys.NotifyCollectionChangedEventArgs.initializeBase(this)};Sys.NotifyCollectionChangedEventArgs.prototype={get_changes:function(){return this._changes||[]}};Sys.NotifyCollectionChangedEventArgs.registerClass("Sys.NotifyCollectionChangedEventArgs",Sys.EventArgs);Sys.Observer=function(){};Sys.Observer.registerClass("Sys.Observer");Sys.Observer.makeObservable=function(a){var c=a instanceof Array,b=Sys.Observer;if(a.setValue===b._observeMethods.setValue)return a;b._addMethods(a,b._observeMethods);if(c)b._addMethods(a,b._arrayMethods);return a};Sys.Observer._addMethods=function(c,b){for(var a in b)c[a]=b[a]};Sys.Observer._addEventHandler=function(c,a,b){Sys.Observer._getContext(c,true).events._addHandler(a,b)};Sys.Observer.addEventHandler=function(c,a,b){Sys.Observer._addEventHandler(c,a,b)};Sys.Observer._removeEventHandler=function(c,a,b){Sys.Observer._getContext(c,true).events._removeHandler(a,b)};Sys.Observer.removeEventHandler=function(c,a,b){Sys.Observer._removeEventHandler(c,a,b)};Sys.Observer.raiseEvent=function(b,e,d){var c=Sys.Observer._getContext(b);if(!c)return;var a=c.events.getHandler(e);if(a)a(b,d)};Sys.Observer.addPropertyChanged=function(b,a){Sys.Observer._addEventHandler(b,"propertyChanged",a)};Sys.Observer.removePropertyChanged=function(b,a){Sys.Observer._removeEventHandler(b,"propertyChanged",a)};Sys.Observer.beginUpdate=function(a){Sys.Observer._getContext(a,true).updating=true};Sys.Observer.endUpdate=function(b){var a=Sys.Observer._getContext(b);if(!a||!a.updating)return;a.updating=false;var d=a.dirty;a.dirty=false;if(d){if(b instanceof Array){var c=a.changes;a.changes=null;Sys.Observer.raiseCollectionChanged(b,c)}Sys.Observer.raisePropertyChanged(b,"")}};Sys.Observer.isUpdating=function(b){var a=Sys.Observer._getContext(b);return a?a.updating:false};Sys.Observer._setValue=function(a,j,g){var b,f,k=a,d=j.split(".");for(var i=0,m=d.length-1;i<m;i++){var l=d[i];b=a["get_"+l];if(typeof b==="function")a=b.call(a);else a=a[l];var n=typeof a;if(a===null||n==="undefined")throw Error.invalidOperation(String.format(Sys.Res.nullReferenceInPath,j))}var e,c=d[m];b=a["get_"+c];f=a["set_"+c];if(typeof b==="function")e=b.call(a);else e=a[c];if(typeof f==="function")f.call(a,g);else a[c]=g;if(e!==g){var h=Sys.Observer._getContext(k);if(h&&h.updating){h.dirty=true;return}Sys.Observer.raisePropertyChanged(k,d[0])}};Sys.Observer.setValue=function(b,a,c){Sys.Observer._setValue(b,a,c)};Sys.Observer.raisePropertyChanged=function(b,a){Sys.Observer.raiseEvent(b,"propertyChanged",new Sys.PropertyChangedEventArgs(a))};Sys.Observer.addCollectionChanged=function(b,a){Sys.Observer._addEventHandler(b,"collectionChanged",a)};Sys.Observer.removeCollectionChanged=function(b,a){Sys.Observer._removeEventHandler(b,"collectionChanged",a)};Sys.Observer._collectionChange=function(d,c){var a=Sys.Observer._getContext(d);if(a&&a.updating){a.dirty=true;var b=a.changes;if(!b)a.changes=b=[c];else b.push(c)}else{Sys.Observer.raiseCollectionChanged(d,[c]);Sys.Observer.raisePropertyChanged(d,"length")}};Sys.Observer.add=function(a,b){var c=new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.add,[b],a.length);Array.add(a,b);Sys.Observer._collectionChange(a,c)};Sys.Observer.addRange=function(a,b){var c=new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.add,b,a.length);Array.addRange(a,b);Sys.Observer._collectionChange(a,c)};Sys.Observer.clear=function(a){var b=Array.clone(a);Array.clear(a);Sys.Observer._collectionChange(a,new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.reset,null,-1,b,0))};Sys.Observer.insert=function(a,b,c){Array.insert(a,b,c);Sys.Observer._collectionChange(a,new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.add,[c],b))};Sys.Observer.remove=function(a,b){var c=Array.indexOf(a,b);if(c!==-1){Array.remove(a,b);Sys.Observer._collectionChange(a,new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.remove,null,-1,[b],c));return true}return false};Sys.Observer.removeAt=function(b,a){if(a>-1&&a<b.length){var c=b[a];Array.removeAt(b,a);Sys.Observer._collectionChange(b,new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.remove,null,-1,[c],a))}};Sys.Observer.raiseCollectionChanged=function(b,a){Sys.Observer.raiseEvent(b,"collectionChanged",new Sys.NotifyCollectionChangedEventArgs(a))};Sys.Observer._observeMethods={add_propertyChanged:function(a){Sys.Observer._addEventHandler(this,"propertyChanged",a)},remove_propertyChanged:function(a){Sys.Observer._removeEventHandler(this,"propertyChanged",a)},addEventHandler:function(a,b){Sys.Observer._addEventHandler(this,a,b)},removeEventHandler:function(a,b){Sys.Observer._removeEventHandler(this,a,b)},get_isUpdating:function(){return Sys.Observer.isUpdating(this)},beginUpdate:function(){Sys.Observer.beginUpdate(this)},endUpdate:function(){Sys.Observer.endUpdate(this)},setValue:function(b,a){Sys.Observer._setValue(this,b,a)},raiseEvent:function(b,a){Sys.Observer.raiseEvent(this,b,a)},raisePropertyChanged:function(a){Sys.Observer.raiseEvent(this,"propertyChanged",new Sys.PropertyChangedEventArgs(a))}};Sys.Observer._arrayMethods={add_collectionChanged:function(a){Sys.Observer._addEventHandler(this,"collectionChanged",a)},remove_collectionChanged:function(a){Sys.Observer._removeEventHandler(this,"collectionChanged",a)},add:function(a){Sys.Observer.add(this,a)},addRange:function(a){Sys.Observer.addRange(this,a)},clear:function(){Sys.Observer.clear(this)},insert:function(a,b){Sys.Observer.insert(this,a,b)},remove:function(a){return Sys.Observer.remove(this,a)},removeAt:function(a){Sys.Observer.removeAt(this,a)},raiseCollectionChanged:function(a){Sys.Observer.raiseEvent(this,"collectionChanged",new Sys.NotifyCollectionChangedEventArgs(a))}};Sys.Observer._getContext=function(b,c){var a=b._observerContext;if(a)return a();if(c)return (b._observerContext=Sys.Observer._createContext())();return null};Sys.Observer._createContext=function(){var a={events:new Sys.EventHandlerList};return function(){return a}};Date._appendPreOrPostMatch=function(e,b){var d=0,a=false;for(var c=0,g=e.length;c<g;c++){var f=e.charAt(c);switch(f){case "'":if(a)b.append("'");else d++;a=false;break;case "\\":if(a)b.append("\\");a=!a;break;default:b.append(f);a=false}}return d};Date._expandFormat=function(a,b){if(!b)b="F";var c=b.length;if(c===1)switch(b){case "d":return a.ShortDatePattern;case "D":return a.LongDatePattern;case "t":return a.ShortTimePattern;case "T":return a.LongTimePattern;case "f":return a.LongDatePattern+" "+a.ShortTimePattern;case "F":return a.FullDateTimePattern;case "M":case "m":return a.MonthDayPattern;case "s":return a.SortableDateTimePattern;case "Y":case "y":return a.YearMonthPattern;default:throw Error.format(Sys.Res.formatInvalidString)}else if(c===2&&b.charAt(0)==="%")b=b.charAt(1);return b};Date._expandYear=function(c,a){var d=new Date,e=Date._getEra(d);if(a<100){var b=Date._getEraYear(d,c,e);a+=b-b%100;if(a>c.Calendar.TwoDigitYearMax)a-=100}return a};Date._getEra=function(e,c){if(!c)return 0;var b,d=e.getTime();for(var a=0,f=c.length;a<f;a+=4){b=c[a+2];if(b===null||d>=b)return a}return 0};Date._getEraYear=function(d,b,e,c){var a=d.getFullYear();if(!c&&b.eras)a-=b.eras[e+3];return a};Date._getParseRegExp=function(b,e){if(!b._parseRegExp)b._parseRegExp={};else if(b._parseRegExp[e])return b._parseRegExp[e];var c=Date._expandFormat(b,e);c=c.replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g,"\\\\$1");var a=new Sys.StringBuilder("^"),j=[],f=0,i=0,h=Date._getTokenRegExp(),d;while((d=h.exec(c))!==null){var l=c.slice(f,d.index);f=h.lastIndex;i+=Date._appendPreOrPostMatch(l,a);if(i%2===1){a.append(d[0]);continue}switch(d[0]){case "dddd":case "ddd":case "MMMM":case "MMM":case "gg":case "g":a.append("(\\D+)");break;case "tt":case "t":a.append("(\\D*)");break;case "yyyy":a.append("(\\d{4})");break;case "fff":a.append("(\\d{3})");break;case "ff":a.append("(\\d{2})");break;case "f":a.append("(\\d)");break;case "dd":case "d":case "MM":case "M":case "yy":case "y":case "HH":case "H":case "hh":case "h":case "mm":case "m":case "ss":case "s":a.append("(\\d\\d?)");break;case "zzz":a.append("([+-]?\\d\\d?:\\d{2})");break;case "zz":case "z":a.append("([+-]?\\d\\d?)");break;case "/":a.append("(\\"+b.DateSeparator+")")}Array.add(j,d[0])}Date._appendPreOrPostMatch(c.slice(f),a);a.append("$");var k=a.toString().replace(/\s+/g,"\\s+"),g={"regExp":k,"groups":j};b._parseRegExp[e]=g;return g};Date._getTokenRegExp=function(){return /\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g};Date.parseLocale=function(a){return Date._parse(a,Sys.CultureInfo.CurrentCulture,arguments)};Date.parseInvariant=function(a){return Date._parse(a,Sys.CultureInfo.InvariantCulture,arguments)};Date._parse=function(h,d,i){var a,c,b,f,e,g=false;for(a=1,c=i.length;a<c;a++){f=i[a];if(f){g=true;b=Date._parseExact(h,f,d);if(b)return b}}if(!g){e=d._getDateTimeFormats();for(a=0,c=e.length;a<c;a++){b=Date._parseExact(h,e[a],d);if(b)return b}}return null};Date._parseExact=function(w,D,k){w=w.trim();var g=k.dateTimeFormat,A=Date._getParseRegExp(g,D),C=(new RegExp(A.regExp)).exec(w);if(C===null)return null;var B=A.groups,x=null,e=null,c=null,j=null,i=null,d=0,h,p=0,q=0,f=0,l=null,v=false;for(var s=0,E=B.length;s<E;s++){var a=C[s+1];if(a)switch(B[s]){case "dd":case "d":j=parseInt(a,10);if(j<1||j>31)return null;break;case "MMMM":c=k._getMonthIndex(a);if(c<0||c>11)return null;break;case "MMM":c=k._getAbbrMonthIndex(a);if(c<0||c>11)return null;break;case "M":case "MM":c=parseInt(a,10)-1;if(c<0||c>11)return null;break;case "y":case "yy":e=Date._expandYear(g,parseInt(a,10));if(e<0||e>9999)return null;break;case "yyyy":e=parseInt(a,10);if(e<0||e>9999)return null;break;case "h":case "hh":d=parseInt(a,10);if(d===12)d=0;if(d<0||d>11)return null;break;case "H":case "HH":d=parseInt(a,10);if(d<0||d>23)return null;break;case "m":case "mm":p=parseInt(a,10);if(p<0||p>59)return null;break;case "s":case "ss":q=parseInt(a,10);if(q<0||q>59)return null;break;case "tt":case "t":var z=a.toUpperCase();v=z===g.PMDesignator.toUpperCase();if(!v&&z!==g.AMDesignator.toUpperCase())return null;break;case "f":f=parseInt(a,10)*100;if(f<0||f>999)return null;break;case "ff":f=parseInt(a,10)*10;if(f<0||f>999)return null;break;case "fff":f=parseInt(a,10);if(f<0||f>999)return null;break;case "dddd":i=k._getDayIndex(a);if(i<0||i>6)return null;break;case "ddd":i=k._getAbbrDayIndex(a);if(i<0||i>6)return null;break;case "zzz":var u=a.split(/:/);if(u.length!==2)return null;h=parseInt(u[0],10);if(h<-12||h>13)return null;var m=parseInt(u[1],10);if(m<0||m>59)return null;l=h*60+(a.startsWith("-")?-m:m);break;case "z":case "zz":h=parseInt(a,10);if(h<-12||h>13)return null;l=h*60;break;case "g":case "gg":var o=a;if(!o||!g.eras)return null;o=o.toLowerCase().trim();for(var r=0,F=g.eras.length;r<F;r+=4)if(o===g.eras[r+1].toLowerCase()){x=r;break}if(x===null)return null}}var b=new Date,t,n=g.Calendar.convert;if(n)t=n.fromGregorian(b)[0];else t=b.getFullYear();if(e===null)e=t;else if(g.eras)e+=g.eras[(x||0)+3];if(c===null)c=0;if(j===null)j=1;if(n){b=n.toGregorian(e,c,j);if(b===null)return null}else{b.setFullYear(e,c,j);if(b.getDate()!==j)return null;if(i!==null&&b.getDay()!==i)return null}if(v&&d<12)d+=12;b.setHours(d,p,q,f);if(l!==null){var y=b.getMinutes()-(l+b.getTimezoneOffset());b.setHours(b.getHours()+parseInt(y/60,10),y%60)}return b};Date.prototype.format=function(a){return this._toFormattedString(a,Sys.CultureInfo.InvariantCulture)};Date.prototype.localeFormat=function(a){return this._toFormattedString(a,Sys.CultureInfo.CurrentCulture)};Date.prototype._toFormattedString=function(e,j){var b=j.dateTimeFormat,n=b.Calendar.convert;if(!e||!e.length||e==="i")if(j&&j.name.length)if(n)return this._toFormattedString(b.FullDateTimePattern,j);else{var r=new Date(this.getTime()),x=Date._getEra(this,b.eras);r.setFullYear(Date._getEraYear(this,b,x));return r.toLocaleString()}else return this.toString();var l=b.eras,k=e==="s";e=Date._expandFormat(b,e);var a=new Sys.StringBuilder,c;function d(a){if(a<10)return "0"+a;return a.toString()}function m(a){if(a<10)return "00"+a;if(a<100)return "0"+a;return a.toString()}function v(a){if(a<10)return "000"+a;else if(a<100)return "00"+a;else if(a<1000)return "0"+a;return a.toString()}var h,p,t=/([^d]|^)(d|dd)([^d]|$)/g;function s(){if(h||p)return h;h=t.test(e);p=true;return h}var q=0,o=Date._getTokenRegExp(),f;if(!k&&n)f=n.fromGregorian(this);for(;true;){var w=o.lastIndex,i=o.exec(e),u=e.slice(w,i?i.index:e.length);q+=Date._appendPreOrPostMatch(u,a);if(!i)break;if(q%2===1){a.append(i[0]);continue}function g(a,b){if(f)return f[b];switch(b){case 0:return a.getFullYear();case 1:return a.getMonth();case 2:return a.getDate()}}switch(i[0]){case "dddd":a.append(b.DayNames[this.getDay()]);break;case "ddd":a.append(b.AbbreviatedDayNames[this.getDay()]);break;case "dd":h=true;a.append(d(g(this,2)));break;case "d":h=true;a.append(g(this,2));break;case "MMMM":a.append(b.MonthGenitiveNames&&s()?b.MonthGenitiveNames[g(this,1)]:b.MonthNames[g(this,1)]);break;case "MMM":a.append(b.AbbreviatedMonthGenitiveNames&&s()?b.AbbreviatedMonthGenitiveNames[g(this,1)]:b.AbbreviatedMonthNames[g(this,1)]);break;case "MM":a.append(d(g(this,1)+1));break;case "M":a.append(g(this,1)+1);break;case "yyyy":a.append(v(f?f[0]:Date._getEraYear(this,b,Date._getEra(this,l),k)));break;case "yy":a.append(d((f?f[0]:Date._getEraYear(this,b,Date._getEra(this,l),k))%100));break;case "y":a.append((f?f[0]:Date._getEraYear(this,b,Date._getEra(this,l),k))%100);break;case "hh":c=this.getHours()%12;if(c===0)c=12;a.append(d(c));break;case "h":c=this.getHours()%12;if(c===0)c=12;a.append(c);break;case "HH":a.append(d(this.getHours()));break;case "H":a.append(this.getHours());break;case "mm":a.append(d(this.getMinutes()));break;case "m":a.append(this.getMinutes());break;case "ss":a.append(d(this.getSeconds()));break;case "s":a.append(this.getSeconds());break;case "tt":a.append(this.getHours()<12?b.AMDesignator:b.PMDesignator);break;case "t":a.append((this.getHours()<12?b.AMDesignator:b.PMDesignator).charAt(0));break;case "f":a.append(m(this.getMilliseconds()).charAt(0));break;case "ff":a.append(m(this.getMilliseconds()).substr(0,2));break;case "fff":a.append(m(this.getMilliseconds()));break;case "z":c=this.getTimezoneOffset()/60;a.append((c<=0?"+":"-")+Math.floor(Math.abs(c)));break;case "zz":c=this.getTimezoneOffset()/60;a.append((c<=0?"+":"-")+d(Math.floor(Math.abs(c))));break;case "zzz":c=this.getTimezoneOffset()/60;a.append((c<=0?"+":"-")+d(Math.floor(Math.abs(c)))+":"+d(Math.abs(this.getTimezoneOffset()%60)));break;case "g":case "gg":if(b.eras)a.append(b.eras[Date._getEra(this,l)+1]);break;case "/":a.append(b.DateSeparator)}}return a.toString()};String.localeFormat=function(){return String._toFormattedString(true,arguments)};Number.parseLocale=function(a){return Number._parse(a,Sys.CultureInfo.CurrentCulture)};Number.parseInvariant=function(a){return Number._parse(a,Sys.CultureInfo.InvariantCulture)};Number._parse=function(b,o){b=b.trim();if(b.match(/^[+-]?infinity$/i))return parseFloat(b);if(b.match(/^0x[a-f0-9]+$/i))return parseInt(b);var a=o.numberFormat,g=Number._parseNumberNegativePattern(b,a,a.NumberNegativePattern),h=g[0],e=g[1];if(h===""&&a.NumberNegativePattern!==1){g=Number._parseNumberNegativePattern(b,a,1);h=g[0];e=g[1]}if(h==="")h="+";var j,d,f=e.indexOf("e");if(f<0)f=e.indexOf("E");if(f<0){d=e;j=null}else{d=e.substr(0,f);j=e.substr(f+1)}var c,k,m=d.indexOf(a.NumberDecimalSeparator);if(m<0){c=d;k=null}else{c=d.substr(0,m);k=d.substr(m+a.NumberDecimalSeparator.length)}c=c.split(a.NumberGroupSeparator).join("");var n=a.NumberGroupSeparator.replace(/\u00A0/g," ");if(a.NumberGroupSeparator!==n)c=c.split(n).join("");var l=h+c;if(k!==null)l+="."+k;if(j!==null){var i=Number._parseNumberNegativePattern(j,a,1);if(i[0]==="")i[0]="+";l+="e"+i[0]+i[1]}if(l.match(/^[+-]?\d*\.?\d*(e[+-]?\d+)?$/))return parseFloat(l);return Number.NaN};Number._parseNumberNegativePattern=function(a,d,e){var b=d.NegativeSign,c=d.PositiveSign;switch(e){case 4:b=" "+b;c=" "+c;case 3:if(a.endsWith(b))return ["-",a.substr(0,a.length-b.length)];else if(a.endsWith(c))return ["+",a.substr(0,a.length-c.length)];break;case 2:b+=" ";c+=" ";case 1:if(a.startsWith(b))return ["-",a.substr(b.length)];else if(a.startsWith(c))return ["+",a.substr(c.length)];break;case 0:if(a.startsWith("(")&&a.endsWith(")"))return ["-",a.substr(1,a.length-2)]}return ["",a]};Number.prototype.format=function(a){return this._toFormattedString(a,Sys.CultureInfo.InvariantCulture)};Number.prototype.localeFormat=function(a){return this._toFormattedString(a,Sys.CultureInfo.CurrentCulture)};Number.prototype._toFormattedString=function(e,j){if(!e||e.length===0||e==="i")if(j&&j.name.length>0)return this.toLocaleString();else return this.toString();var o=["n %","n%","%n"],n=["-n %","-n%","-%n"],p=["(n)","-n","- n","n-","n -"],m=["$n","n$","$ n","n $"],l=["($n)","-$n","$-n","$n-","(n$)","-n$","n-$","n$-","-n $","-$ n","n $-","$ n-","$ -n","n- $","($ n)","(n $)"];function g(a,c,d){for(var b=a.length;b<c;b++)a=d?"0"+a:a+"0";return a}function i(j,i,l,n,p){var h=l[0],k=1,o=Math.pow(10,i),m=Math.round(j*o)/o;if(!isFinite(m))m=j;j=m;var b=j.toString(),a="",c,e=b.split(/e/i);b=e[0];c=e.length>1?parseInt(e[1]):0;e=b.split(".");b=e[0];a=e.length>1?e[1]:"";var q;if(c>0){a=g(a,c,false);b+=a.slice(0,c);a=a.substr(c)}else if(c<0){c=-c;b=g(b,c+1,true);a=b.slice(-c,b.length)+a;b=b.slice(0,-c)}if(i>0){if(a.length>i)a=a.slice(0,i);else a=g(a,i,false);a=p+a}else a="";var d=b.length-1,f="";while(d>=0){if(h===0||h>d)if(f.length>0)return b.slice(0,d+1)+n+f+a;else return b.slice(0,d+1)+a;if(f.length>0)f=b.slice(d-h+1,d+1)+n+f;else f=b.slice(d-h+1,d+1);d-=h;if(k<l.length){h=l[k];k++}}return b.slice(0,d+1)+n+f+a}var a=j.numberFormat,d=Math.abs(this);if(!e)e="D";var b=-1;if(e.length>1)b=parseInt(e.slice(1),10);var c;switch(e.charAt(0)){case "d":case "D":c="n";if(b!==-1)d=g(""+d,b,true);if(this<0)d=-d;break;case "c":case "C":if(this<0)c=l[a.CurrencyNegativePattern];else c=m[a.CurrencyPositivePattern];if(b===-1)b=a.CurrencyDecimalDigits;d=i(Math.abs(this),b,a.CurrencyGroupSizes,a.CurrencyGroupSeparator,a.CurrencyDecimalSeparator);break;case "n":case "N":if(this<0)c=p[a.NumberNegativePattern];else c="n";if(b===-1)b=a.NumberDecimalDigits;d=i(Math.abs(this),b,a.NumberGroupSizes,a.NumberGroupSeparator,a.NumberDecimalSeparator);break;case "p":case "P":if(this<0)c=n[a.PercentNegativePattern];else c=o[a.PercentPositivePattern];if(b===-1)b=a.PercentDecimalDigits;d=i(Math.abs(this)*100,b,a.PercentGroupSizes,a.PercentGroupSeparator,a.PercentDecimalSeparator);break;default:throw Error.format(Sys.Res.formatBadFormatSpecifier)}var k=/n|\$|-|%/g,f="";for(;true;){var q=k.lastIndex,h=k.exec(c);f+=c.slice(q,h?h.index:c.length);if(!h)break;switch(h[0]){case "n":f+=d;break;case "$":f+=a.CurrencySymbol;break;case "-":if(/[1-9]/.test(d))f+=a.NegativeSign;break;case "%":f+=a.PercentSymbol}}return f};Sys.CultureInfo=function(c,b,a){this.name=c;this.numberFormat=b;this.dateTimeFormat=a};Sys.CultureInfo.prototype={_getDateTimeFormats:function(){if(!this._dateTimeFormats){var a=this.dateTimeFormat;this._dateTimeFormats=[a.MonthDayPattern,a.YearMonthPattern,a.ShortDatePattern,a.ShortTimePattern,a.LongDatePattern,a.LongTimePattern,a.FullDateTimePattern,a.RFC1123Pattern,a.SortableDateTimePattern,a.UniversalSortableDateTimePattern]}return this._dateTimeFormats},_getIndex:function(c,d,e){var b=this._toUpper(c),a=Array.indexOf(d,b);if(a===-1)a=Array.indexOf(e,b);return a},_getMonthIndex:function(a){if(!this._upperMonths){this._upperMonths=this._toUpperArray(this.dateTimeFormat.MonthNames);this._upperMonthsGenitive=this._toUpperArray(this.dateTimeFormat.MonthGenitiveNames)}return this._getIndex(a,this._upperMonths,this._upperMonthsGenitive)},_getAbbrMonthIndex:function(a){if(!this._upperAbbrMonths){this._upperAbbrMonths=this._toUpperArray(this.dateTimeFormat.AbbreviatedMonthNames);this._upperAbbrMonthsGenitive=this._toUpperArray(this.dateTimeFormat.AbbreviatedMonthGenitiveNames)}return this._getIndex(a,this._upperAbbrMonths,this._upperAbbrMonthsGenitive)},_getDayIndex:function(a){if(!this._upperDays)this._upperDays=this._toUpperArray(this.dateTimeFormat.DayNames);return Array.indexOf(this._upperDays,this._toUpper(a))},_getAbbrDayIndex:function(a){if(!this._upperAbbrDays)this._upperAbbrDays=this._toUpperArray(this.dateTimeFormat.AbbreviatedDayNames);return Array.indexOf(this._upperAbbrDays,this._toUpper(a))},_toUpperArray:function(c){var b=[];for(var a=0,d=c.length;a<d;a++)b[a]=this._toUpper(c[a]);return b},_toUpper:function(a){return a.split("\u00a0").join(" ").toUpperCase()}};Sys.CultureInfo.registerClass("Sys.CultureInfo");Sys.CultureInfo._parse=function(a){var b=a.dateTimeFormat;if(b&&!b.eras)b.eras=a.eras;return new Sys.CultureInfo(a.name,a.numberFormat,b)};Sys.CultureInfo.InvariantCulture=Sys.CultureInfo._parse({"name":"","numberFormat":{"CurrencyDecimalDigits":2,"CurrencyDecimalSeparator":".","IsReadOnly":true,"CurrencyGroupSizes":[3],"NumberGroupSizes":[3],"PercentGroupSizes":[3],"CurrencyGroupSeparator":",","CurrencySymbol":"\u00a4","NaNSymbol":"NaN","CurrencyNegativePattern":0,"NumberNegativePattern":1,"PercentPositivePattern":0,"PercentNegativePattern":0,"NegativeInfinitySymbol":"-Infinity","NegativeSign":"-","NumberDecimalDigits":2,"NumberDecimalSeparator":".","NumberGroupSeparator":",","CurrencyPositivePattern":0,"PositiveInfinitySymbol":"Infinity","PositiveSign":"+","PercentDecimalDigits":2,"PercentDecimalSeparator":".","PercentGroupSeparator":",","PercentSymbol":"%","PerMilleSymbol":"\u2030","NativeDigits":["0","1","2","3","4","5","6","7","8","9"],"DigitSubstitution":1},"dateTimeFormat":{"AMDesignator":"AM","Calendar":{"MinSupportedDateTime":"@-62135568000000@","MaxSupportedDateTime":"@253402300799999@","AlgorithmType":1,"CalendarType":1,"Eras":[1],"TwoDigitYearMax":2029,"IsReadOnly":true},"DateSeparator":"/","FirstDayOfWeek":0,"CalendarWeekRule":0,"FullDateTimePattern":"dddd, dd MMMM yyyy HH:mm:ss","LongDatePattern":"dddd, dd MMMM yyyy","LongTimePattern":"HH:mm:ss","MonthDayPattern":"MMMM dd","PMDesignator":"PM","RFC1123Pattern":"ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","ShortDatePattern":"MM/dd/yyyy","ShortTimePattern":"HH:mm","SortableDateTimePattern":"yyyy'-'MM'-'dd'T'HH':'mm':'ss","TimeSeparator":":","UniversalSortableDateTimePattern":"yyyy'-'MM'-'dd HH':'mm':'ss'Z'","YearMonthPattern":"yyyy MMMM","AbbreviatedDayNames":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"ShortestDayNames":["Su","Mo","Tu","We","Th","Fr","Sa"],"DayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"AbbreviatedMonthNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthNames":["January","February","March","April","May","June","July","August","September","October","November","December",""],"IsReadOnly":true,"NativeCalendarName":"Gregorian Calendar","AbbreviatedMonthGenitiveNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthGenitiveNames":["January","February","March","April","May","June","July","August","September","October","November","December",""]},"eras":[1,"A.D.",null,0]});if(typeof __cultureInfo==="object"){Sys.CultureInfo.CurrentCulture=Sys.CultureInfo._parse(__cultureInfo);delete __cultureInfo}else Sys.CultureInfo.CurrentCulture=Sys.CultureInfo._parse({"name":"en-US","numberFormat":{"CurrencyDecimalDigits":2,"CurrencyDecimalSeparator":".","IsReadOnly":false,"CurrencyGroupSizes":[3],"NumberGroupSizes":[3],"PercentGroupSizes":[3],"CurrencyGroupSeparator":",","CurrencySymbol":"$","NaNSymbol":"NaN","CurrencyNegativePattern":0,"NumberNegativePattern":1,"PercentPositivePattern":0,"PercentNegativePattern":0,"NegativeInfinitySymbol":"-Infinity","NegativeSign":"-","NumberDecimalDigits":2,"NumberDecimalSeparator":".","NumberGroupSeparator":",","CurrencyPositivePattern":0,"PositiveInfinitySymbol":"Infinity","PositiveSign":"+","PercentDecimalDigits":2,"PercentDecimalSeparator":".","PercentGroupSeparator":",","PercentSymbol":"%","PerMilleSymbol":"\u2030","NativeDigits":["0","1","2","3","4","5","6","7","8","9"],"DigitSubstitution":1},"dateTimeFormat":{"AMDesignator":"AM","Calendar":{"MinSupportedDateTime":"@-62135568000000@","MaxSupportedDateTime":"@253402300799999@","AlgorithmType":1,"CalendarType":1,"Eras":[1],"TwoDigitYearMax":2029,"IsReadOnly":false},"DateSeparator":"/","FirstDayOfWeek":0,"CalendarWeekRule":0,"FullDateTimePattern":"dddd, MMMM dd, yyyy h:mm:ss tt","LongDatePattern":"dddd, MMMM dd, yyyy","LongTimePattern":"h:mm:ss tt","MonthDayPattern":"MMMM dd","PMDesignator":"PM","RFC1123Pattern":"ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","ShortDatePattern":"M/d/yyyy","ShortTimePattern":"h:mm tt","SortableDateTimePattern":"yyyy'-'MM'-'dd'T'HH':'mm':'ss","TimeSeparator":":","UniversalSortableDateTimePattern":"yyyy'-'MM'-'dd HH':'mm':'ss'Z'","YearMonthPattern":"MMMM, yyyy","AbbreviatedDayNames":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"ShortestDayNames":["Su","Mo","Tu","We","Th","Fr","Sa"],"DayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"AbbreviatedMonthNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthNames":["January","February","March","April","May","June","July","August","September","October","November","December",""],"IsReadOnly":false,"NativeCalendarName":"Gregorian Calendar","AbbreviatedMonthGenitiveNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthGenitiveNames":["January","February","March","April","May","June","July","August","September","October","November","December",""]},"eras":[1,"A.D.",null,0]});Type.registerNamespace("Sys.Serialization");Sys.Serialization.JavaScriptSerializer=function(){};Sys.Serialization.JavaScriptSerializer.registerClass("Sys.Serialization.JavaScriptSerializer");Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs=[];Sys.Serialization.JavaScriptSerializer._charsToEscape=[];Sys.Serialization.JavaScriptSerializer._dateRegEx=new RegExp('(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"',"g");Sys.Serialization.JavaScriptSerializer._escapeChars={};Sys.Serialization.JavaScriptSerializer._escapeRegEx=new RegExp('["\\\\\\x00-\\x1F]',"i");Sys.Serialization.JavaScriptSerializer._escapeRegExGlobal=new RegExp('["\\\\\\x00-\\x1F]',"g");Sys.Serialization.JavaScriptSerializer._jsonRegEx=new RegExp("[^,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t]","g");Sys.Serialization.JavaScriptSerializer._jsonStringRegEx=new RegExp('"(\\\\.|[^"\\\\])*"',"g");Sys.Serialization.JavaScriptSerializer._serverTypeFieldName="__type";Sys.Serialization.JavaScriptSerializer._init=function(){var c=["\\u0000","\\u0001","\\u0002","\\u0003","\\u0004","\\u0005","\\u0006","\\u0007","\\b","\\t","\\n","\\u000b","\\f","\\r","\\u000e","\\u000f","\\u0010","\\u0011","\\u0012","\\u0013","\\u0014","\\u0015","\\u0016","\\u0017","\\u0018","\\u0019","\\u001a","\\u001b","\\u001c","\\u001d","\\u001e","\\u001f"];Sys.Serialization.JavaScriptSerializer._charsToEscape[0]="\\";Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs["\\"]=new RegExp("\\\\","g");Sys.Serialization.JavaScriptSerializer._escapeChars["\\"]="\\\\";Sys.Serialization.JavaScriptSerializer._charsToEscape[1]='"';Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs['"']=new RegExp('"',"g");Sys.Serialization.JavaScriptSerializer._escapeChars['"']='\\"';for(var a=0;a<32;a++){var b=String.fromCharCode(a);Sys.Serialization.JavaScriptSerializer._charsToEscape[a+2]=b;Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[b]=new RegExp(b,"g");Sys.Serialization.JavaScriptSerializer._escapeChars[b]=c[a]}};Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder=function(b,a){a.append(b.toString())};Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder=function(a,b){if(isFinite(a))b.append(String(a));else throw Error.invalidOperation(Sys.Res.cannotSerializeNonFiniteNumbers)};Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder=function(a,c){c.append('"');if(Sys.Serialization.JavaScriptSerializer._escapeRegEx.test(a)){if(Sys.Serialization.JavaScriptSerializer._charsToEscape.length===0)Sys.Serialization.JavaScriptSerializer._init();if(a.length<128)a=a.replace(Sys.Serialization.JavaScriptSerializer._escapeRegExGlobal,function(a){return Sys.Serialization.JavaScriptSerializer._escapeChars[a]});else for(var d=0;d<34;d++){var b=Sys.Serialization.JavaScriptSerializer._charsToEscape[d];if(a.indexOf(b)!==-1)if(Sys.Browser.agent===Sys.Browser.Opera||Sys.Browser.agent===Sys.Browser.FireFox)a=a.split(b).join(Sys.Serialization.JavaScriptSerializer._escapeChars[b]);else a=a.replace(Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[b],Sys.Serialization.JavaScriptSerializer._escapeChars[b])}}c.append(a);c.append('"')};Sys.Serialization.JavaScriptSerializer._serializeWithBuilder=function(b,a,i,g){var c;switch(typeof b){case "object":if(b)if(Number.isInstanceOfType(b))Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(b,a);else if(Boolean.isInstanceOfType(b))Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(b,a);else if(String.isInstanceOfType(b))Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(b,a);else if(Array.isInstanceOfType(b)){a.append("[");for(c=0;c<b.length;++c){if(c>0)a.append(",");Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(b[c],a,false,g)}a.append("]")}else{if(Date.isInstanceOfType(b)){a.append('"\\/Date(');a.append(b.getTime());a.append(')\\/"');break}var d=[],f=0;for(var e in b){if(e.startsWith("$"))continue;if(e===Sys.Serialization.JavaScriptSerializer._serverTypeFieldName&&f!==0){d[f++]=d[0];d[0]=e}else d[f++]=e}if(i)d.sort();a.append("{");var j=false;for(c=0;c<f;c++){var h=b[d[c]];if(typeof h!=="undefined"&&typeof h!=="function"){if(j)a.append(",");else j=true;Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(d[c],a,i,g);a.append(":");Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(h,a,i,g)}}a.append("}")}else a.append("null");break;case "number":Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(b,a);break;case "string":Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(b,a);break;case "boolean":Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(b,a);break;default:a.append("null")}};Sys.Serialization.JavaScriptSerializer.serialize=function(b){var a=new Sys.StringBuilder;Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(b,a,false);return a.toString()};Sys.Serialization.JavaScriptSerializer.deserialize=function(data,secure){if(data.length===0)throw Error.argument("data",Sys.Res.cannotDeserializeEmptyString);try{var exp=data.replace(Sys.Serialization.JavaScriptSerializer._dateRegEx,"$1new Date($2)");if(secure&&Sys.Serialization.JavaScriptSerializer._jsonRegEx.test(exp.replace(Sys.Serialization.JavaScriptSerializer._jsonStringRegEx,"")))throw null;return eval("("+exp+")")}catch(a){throw Error.argument("data",Sys.Res.cannotDeserializeInvalidJson)}};Type.registerNamespace("Sys.UI");Sys.EventHandlerList=function(){this._list={}};Sys.EventHandlerList.prototype={_addHandler:function(b,a){Array.add(this._getEvent(b,true),a)},addHandler:function(b,a){this._addHandler(b,a)},_removeHandler:function(c,b){var a=this._getEvent(c);if(!a)return;Array.remove(a,b)},removeHandler:function(b,a){this._removeHandler(b,a)},getHandler:function(b){var a=this._getEvent(b);if(!a||a.length===0)return null;a=Array.clone(a);return function(c,d){for(var b=0,e=a.length;b<e;b++)a[b](c,d)}},_getEvent:function(a,b){if(!this._list[a]){if(!b)return null;this._list[a]=[]}return this._list[a]}};Sys.EventHandlerList.registerClass("Sys.EventHandlerList");Sys.CommandEventArgs=function(c,a,b){Sys.CommandEventArgs.initializeBase(this);this._commandName=c;this._commandArgument=a;this._commandSource=b};Sys.CommandEventArgs.prototype={_commandName:null,_commandArgument:null,_commandSource:null,get_commandName:function(){return this._commandName},get_commandArgument:function(){return this._commandArgument},get_commandSource:function(){return this._commandSource}};Sys.CommandEventArgs.registerClass("Sys.CommandEventArgs",Sys.CancelEventArgs);Sys.INotifyPropertyChange=function(){};Sys.INotifyPropertyChange.prototype={};Sys.INotifyPropertyChange.registerInterface("Sys.INotifyPropertyChange");Sys.PropertyChangedEventArgs=function(a){Sys.PropertyChangedEventArgs.initializeBase(this);this._propertyName=a};Sys.PropertyChangedEventArgs.prototype={get_propertyName:function(){return this._propertyName}};Sys.PropertyChangedEventArgs.registerClass("Sys.PropertyChangedEventArgs",Sys.EventArgs);Sys.INotifyDisposing=function(){};Sys.INotifyDisposing.prototype={};Sys.INotifyDisposing.registerInterface("Sys.INotifyDisposing");Sys.Component=function(){if(Sys.Application)Sys.Application.registerDisposableObject(this)};Sys.Component.prototype={_id:null,_initialized:false,_updating:false,get_events:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},get_id:function(){return this._id},set_id:function(a){this._id=a},get_isInitialized:function(){return this._initialized},get_isUpdating:function(){return this._updating},add_disposing:function(a){this.get_events().addHandler("disposing",a)},remove_disposing:function(a){this.get_events().removeHandler("disposing",a)},add_propertyChanged:function(a){this.get_events().addHandler("propertyChanged",a)},remove_propertyChanged:function(a){this.get_events().removeHandler("propertyChanged",a)},beginUpdate:function(){this._updating=true},dispose:function(){if(this._events){var a=this._events.getHandler("disposing");if(a)a(this,Sys.EventArgs.Empty)}delete this._events;Sys.Application.unregisterDisposableObject(this);Sys.Application.removeComponent(this)},endUpdate:function(){this._updating=false;if(!this._initialized)this.initialize();this.updated()},initialize:function(){this._initialized=true},raisePropertyChanged:function(b){if(!this._events)return;var a=this._events.getHandler("propertyChanged");if(a)a(this,new Sys.PropertyChangedEventArgs(b))},updated:function(){}};Sys.Component.registerClass("Sys.Component",null,Sys.IDisposable,Sys.INotifyPropertyChange,Sys.INotifyDisposing);function Sys$Component$_setProperties(a,i){var d,j=Object.getType(a),e=j===Object||j===Sys.UI.DomElement,h=Sys.Component.isInstanceOfType(a)&&!a.get_isUpdating();if(h)a.beginUpdate();for(var c in i){var b=i[c],f=e?null:a["get_"+c];if(e||typeof f!=="function"){var k=a[c];if(!b||typeof b!=="object"||e&&!k)a[c]=b;else Sys$Component$_setProperties(k,b)}else{var l=a["set_"+c];if(typeof l==="function")l.apply(a,[b]);else if(b instanceof Array){d=f.apply(a);for(var g=0,m=d.length,n=b.length;g<n;g++,m++)d[m]=b[g]}else if(typeof b==="object"&&Object.getType(b)===Object){d=f.apply(a);Sys$Component$_setProperties(d,b)}}}if(h)a.endUpdate()}function Sys$Component$_setReferences(c,b){for(var a in b){var e=c["set_"+a],d=$find(b[a]);e.apply(c,[d])}}var $create=Sys.Component.create=function(h,f,d,c,g){var a=g?new h(g):new h,b=Sys.Application,i=b.get_isCreatingComponents();a.beginUpdate();if(f)Sys$Component$_setProperties(a,f);if(d)for(var e in d)a["add_"+e](d[e]);if(a.get_id())b.addComponent(a);if(i){b._createdComponents[b._createdComponents.length]=a;if(c)b._addComponentToSecondPass(a,c);else a.endUpdate()}else{if(c)Sys$Component$_setReferences(a,c);a.endUpdate()}return a};Sys.UI.MouseButton=function(){throw Error.notImplemented()};Sys.UI.MouseButton.prototype={leftButton:0,middleButton:1,rightButton:2};Sys.UI.MouseButton.registerEnum("Sys.UI.MouseButton");Sys.UI.Key=function(){throw Error.notImplemented()};Sys.UI.Key.prototype={backspace:8,tab:9,enter:13,esc:27,space:32,pageUp:33,pageDown:34,end:35,home:36,left:37,up:38,right:39,down:40,del:127};Sys.UI.Key.registerEnum("Sys.UI.Key");Sys.UI.Point=function(a,b){this.x=a;this.y=b};Sys.UI.Point.registerClass("Sys.UI.Point");Sys.UI.Bounds=function(c,d,b,a){this.x=c;this.y=d;this.height=a;this.width=b};Sys.UI.Bounds.registerClass("Sys.UI.Bounds");Sys.UI.DomEvent=function(e){var a=e,b=this.type=a.type.toLowerCase();this.rawEvent=a;this.altKey=a.altKey;if(typeof a.button!=="undefined")this.button=typeof a.which!=="undefined"?a.button:a.button===4?Sys.UI.MouseButton.middleButton:a.button===2?Sys.UI.MouseButton.rightButton:Sys.UI.MouseButton.leftButton;if(b==="keypress")this.charCode=a.charCode||a.keyCode;else if(a.keyCode&&a.keyCode===46)this.keyCode=127;else this.keyCode=a.keyCode;this.clientX=a.clientX;this.clientY=a.clientY;this.ctrlKey=a.ctrlKey;this.target=a.target?a.target:a.srcElement;if(!b.startsWith("key"))if(typeof a.offsetX!=="undefined"&&typeof a.offsetY!=="undefined"){this.offsetX=a.offsetX;this.offsetY=a.offsetY}else if(this.target&&this.target.nodeType!==3&&typeof a.clientX==="number"){var c=Sys.UI.DomElement.getLocation(this.target),d=Sys.UI.DomElement._getWindow(this.target);this.offsetX=(d.pageXOffset||0)+a.clientX-c.x;this.offsetY=(d.pageYOffset||0)+a.clientY-c.y}this.screenX=a.screenX;this.screenY=a.screenY;this.shiftKey=a.shiftKey};Sys.UI.DomEvent.prototype={preventDefault:function(){if(this.rawEvent.preventDefault)this.rawEvent.preventDefault();else if(window.event)this.rawEvent.returnValue=false},stopPropagation:function(){if(this.rawEvent.stopPropagation)this.rawEvent.stopPropagation();else if(window.event)this.rawEvent.cancelBubble=true}};Sys.UI.DomEvent.registerClass("Sys.UI.DomEvent");var $addHandler=Sys.UI.DomEvent.addHandler=function(a,d,e,g){if(!a._events)a._events={};var c=a._events[d];if(!c)a._events[d]=c=[];var b;if(a.addEventListener){b=function(b){return e.call(a,new Sys.UI.DomEvent(b))};a.addEventListener(d,b,false)}else if(a.attachEvent){b=function(){var b={};try{b=Sys.UI.DomElement._getWindow(a).event}catch(c){}return e.call(a,new Sys.UI.DomEvent(b))};a.attachEvent("on"+d,b)}c[c.length]={handler:e,browserHandler:b,autoRemove:g};if(g){var f=a.dispose;if(f!==Sys.UI.DomEvent._disposeHandlers){a.dispose=Sys.UI.DomEvent._disposeHandlers;if(typeof f!=="undefined")a._chainDispose=f}}},$addHandlers=Sys.UI.DomEvent.addHandlers=function(f,d,c,e){for(var b in d){var a=d[b];if(c)a=Function.createDelegate(c,a);$addHandler(f,b,a,e||false)}},$clearHandlers=Sys.UI.DomEvent.clearHandlers=function(a){Sys.UI.DomEvent._clearHandlers(a,false)};Sys.UI.DomEvent._clearHandlers=function(a,g){if(a._events){var e=a._events;for(var b in e){var d=e[b];for(var c=d.length-1;c>=0;c--){var f=d[c];if(!g||f.autoRemove)$removeHandler(a,b,f.handler)}}a._events=null}};Sys.UI.DomEvent._disposeHandlers=function(){Sys.UI.DomEvent._clearHandlers(this,true);var b=this._chainDispose,a=typeof b;if(a!=="undefined"){this.dispose=b;this._chainDispose=null;if(a==="function")this.dispose()}};var $removeHandler=Sys.UI.DomEvent.removeHandler=function(b,a,c){Sys.UI.DomEvent._removeHandler(b,a,c)};Sys.UI.DomEvent._removeHandler=function(a,e,f){var d=null,c=a._events[e];for(var b=0,g=c.length;b<g;b++)if(c[b].handler===f){d=c[b].browserHandler;break}if(a.removeEventListener)a.removeEventListener(e,d,false);else if(a.detachEvent)a.detachEvent("on"+e,d);c.splice(b,1)};Sys.UI.DomElement=function(){};Sys.UI.DomElement.registerClass("Sys.UI.DomElement");Sys.UI.DomElement.addCssClass=function(a,b){if(!Sys.UI.DomElement.containsCssClass(a,b))if(a.className==="")a.className=b;else a.className+=" "+b};Sys.UI.DomElement.containsCssClass=function(b,a){return Array.contains(b.className.split(" "),a)};Sys.UI.DomElement.getBounds=function(a){var b=Sys.UI.DomElement.getLocation(a);return new Sys.UI.Bounds(b.x,b.y,a.offsetWidth||0,a.offsetHeight||0)};var $get=Sys.UI.DomElement.getElementById=function(f,e){if(!e)return document.getElementById(f);if(e.getElementById)return e.getElementById(f);var c=[],d=e.childNodes;for(var b=0;b<d.length;b++){var a=d[b];if(a.nodeType==1)c[c.length]=a}while(c.length){a=c.shift();if(a.id==f)return a;d=a.childNodes;for(b=0;b<d.length;b++){a=d[b];if(a.nodeType==1)c[c.length]=a}}return null};if(document.documentElement.getBoundingClientRect)Sys.UI.DomElement.getLocation=function(b){if(b.self||b.nodeType===9||b===document.documentElement||b.parentNode===b.ownerDocument.documentElement)return new Sys.UI.Point(0,0);var f=b.getBoundingClientRect();if(!f)return new Sys.UI.Point(0,0);var k,e=b.ownerDocument.documentElement,c=Math.round(f.left)+e.scrollLeft,d=Math.round(f.top)+e.scrollTop;if(Sys.Browser.agent===Sys.Browser.InternetExplorer){try{var g=b.ownerDocument.parentWindow.frameElement||null;if(g){var h=g.frameBorder==="0"||g.frameBorder==="no"?2:0;c+=h;d+=h}}catch(l){}if(Sys.Browser.version===7&&!document.documentMode){var i=document.body,j=i.getBoundingClientRect(),a=(j.right-j.left)/i.clientWidth;a=Math.round(a*100);a=(a-a%5)/100;if(!isNaN(a)&&a!==1){c=Math.round(c/a);d=Math.round(d/a)}}if((document.documentMode||0)<8){c-=e.clientLeft;d-=e.clientTop}}return new Sys.UI.Point(c,d)};else if(Sys.Browser.agent===Sys.Browser.Safari)Sys.UI.DomElement.getLocation=function(c){if(c.window&&c.window===c||c.nodeType===9)return new Sys.UI.Point(0,0);var d=0,e=0,a,j=null,g=null,b;for(a=c;a;j=a,(g=b,a=a.offsetParent)){b=Sys.UI.DomElement._getCurrentStyle(a);var f=a.tagName?a.tagName.toUpperCase():null;if((a.offsetLeft||a.offsetTop)&&(f!=="BODY"||(!g||g.position!=="absolute"))){d+=a.offsetLeft;e+=a.offsetTop}if(j&&Sys.Browser.version>=3){d+=parseInt(b.borderLeftWidth);e+=parseInt(b.borderTopWidth)}}b=Sys.UI.DomElement._getCurrentStyle(c);var h=b?b.position:null;if(!h||h!=="absolute")for(a=c.parentNode;a;a=a.parentNode){f=a.tagName?a.tagName.toUpperCase():null;if(f!=="BODY"&&f!=="HTML"&&(a.scrollLeft||a.scrollTop)){d-=a.scrollLeft||0;e-=a.scrollTop||0}b=Sys.UI.DomElement._getCurrentStyle(a);var i=b?b.position:null;if(i&&i==="absolute")break}return new Sys.UI.Point(d,e)};else Sys.UI.DomElement.getLocation=function(d){if(d.window&&d.window===d||d.nodeType===9)return new Sys.UI.Point(0,0);var e=0,f=0,a,i=null,g=null,b=null;for(a=d;a;i=a,(g=b,a=a.offsetParent)){var c=a.tagName?a.tagName.toUpperCase():null;b=Sys.UI.DomElement._getCurrentStyle(a);if((a.offsetLeft||a.offsetTop)&&!(c==="BODY"&&(!g||g.position!=="absolute"))){e+=a.offsetLeft;f+=a.offsetTop}if(i!==null&&b){if(c!=="TABLE"&&c!=="TD"&&c!=="HTML"){e+=parseInt(b.borderLeftWidth)||0;f+=parseInt(b.borderTopWidth)||0}if(c==="TABLE"&&(b.position==="relative"||b.position==="absolute")){e+=parseInt(b.marginLeft)||0;f+=parseInt(b.marginTop)||0}}}b=Sys.UI.DomElement._getCurrentStyle(d);var h=b?b.position:null;if(!h||h!=="absolute")for(a=d.parentNode;a;a=a.parentNode){c=a.tagName?a.tagName.toUpperCase():null;if(c!=="BODY"&&c!=="HTML"&&(a.scrollLeft||a.scrollTop)){e-=a.scrollLeft||0;f-=a.scrollTop||0;b=Sys.UI.DomElement._getCurrentStyle(a);if(b){e+=parseInt(b.borderLeftWidth)||0;f+=parseInt(b.borderTopWidth)||0}}}return new Sys.UI.Point(e,f)};Sys.UI.DomElement.isDomElement=function(a){return Sys._isDomElement(a)};Sys.UI.DomElement.removeCssClass=function(d,c){var a=" "+d.className+" ",b=a.indexOf(" "+c+" ");if(b>=0)d.className=(a.substr(0,b)+" "+a.substring(b+c.length+1,a.length)).trim()};Sys.UI.DomElement.resolveElement=function(b,c){var a=b;if(!a)return null;if(typeof a==="string")a=Sys.UI.DomElement.getElementById(a,c);return a};Sys.UI.DomElement.raiseBubbleEvent=function(c,d){var b=c;while(b){var a=b.control;if(a&&a.onBubbleEvent&&a.raiseBubbleEvent){Sys.UI.DomElement._raiseBubbleEventFromControl(a,c,d);return}b=b.parentNode}};Sys.UI.DomElement._raiseBubbleEventFromControl=function(a,b,c){if(!a.onBubbleEvent(b,c))a._raiseBubbleEvent(b,c)};Sys.UI.DomElement.setLocation=function(b,c,d){var a=b.style;a.position="absolute";a.left=c+"px";a.top=d+"px"};Sys.UI.DomElement.toggleCssClass=function(b,a){if(Sys.UI.DomElement.containsCssClass(b,a))Sys.UI.DomElement.removeCssClass(b,a);else Sys.UI.DomElement.addCssClass(b,a)};Sys.UI.DomElement.getVisibilityMode=function(a){return a._visibilityMode===Sys.UI.VisibilityMode.hide?Sys.UI.VisibilityMode.hide:Sys.UI.VisibilityMode.collapse};Sys.UI.DomElement.setVisibilityMode=function(a,b){Sys.UI.DomElement._ensureOldDisplayMode(a);if(a._visibilityMode!==b){a._visibilityMode=b;if(Sys.UI.DomElement.getVisible(a)===false)if(a._visibilityMode===Sys.UI.VisibilityMode.hide)a.style.display=a._oldDisplayMode;else a.style.display="none";a._visibilityMode=b}};Sys.UI.DomElement.getVisible=function(b){var a=b.currentStyle||Sys.UI.DomElement._getCurrentStyle(b);if(!a)return true;return a.visibility!=="hidden"&&a.display!=="none"};Sys.UI.DomElement.setVisible=function(a,b){if(b!==Sys.UI.DomElement.getVisible(a)){Sys.UI.DomElement._ensureOldDisplayMode(a);a.style.visibility=b?"visible":"hidden";if(b||a._visibilityMode===Sys.UI.VisibilityMode.hide)a.style.display=a._oldDisplayMode;else a.style.display="none"}};Sys.UI.DomElement._ensureOldDisplayMode=function(a){if(!a._oldDisplayMode){var b=a.currentStyle||Sys.UI.DomElement._getCurrentStyle(a);a._oldDisplayMode=b?b.display:null;if(!a._oldDisplayMode||a._oldDisplayMode==="none")switch(a.tagName.toUpperCase()){case "DIV":case "P":case "ADDRESS":case "BLOCKQUOTE":case "BODY":case "COL":case "COLGROUP":case "DD":case "DL":case "DT":case "FIELDSET":case "FORM":case "H1":case "H2":case "H3":case "H4":case "H5":case "H6":case "HR":case "IFRAME":case "LEGEND":case "OL":case "PRE":case "TABLE":case "TD":case "TH":case "TR":case "UL":a._oldDisplayMode="block";break;case "LI":a._oldDisplayMode="list-item";break;default:a._oldDisplayMode="inline"}}};Sys.UI.DomElement._getWindow=function(a){var b=a.ownerDocument||a.document||a;return b.defaultView||b.parentWindow};Sys.UI.DomElement._getCurrentStyle=function(a){if(a.nodeType===3)return null;var c=Sys.UI.DomElement._getWindow(a);if(a.documentElement)a=a.documentElement;var b=c&&a!==c&&c.getComputedStyle?c.getComputedStyle(a,null):a.currentStyle||a.style;if(!b&&Sys.Browser.agent===Sys.Browser.Safari&&a.style){var g=a.style.display,f=a.style.position;a.style.position="absolute";a.style.display="block";var e=c.getComputedStyle(a,null);a.style.display=g;a.style.position=f;b={};for(var d in e)b[d]=e[d];b.display="none"}return b};Sys.IContainer=function(){};Sys.IContainer.prototype={};Sys.IContainer.registerInterface("Sys.IContainer");Sys.ApplicationLoadEventArgs=function(b,a){Sys.ApplicationLoadEventArgs.initializeBase(this);this._components=b;this._isPartialLoad=a};Sys.ApplicationLoadEventArgs.prototype={get_components:function(){return this._components},get_isPartialLoad:function(){return this._isPartialLoad}};Sys.ApplicationLoadEventArgs.registerClass("Sys.ApplicationLoadEventArgs",Sys.EventArgs);Sys._Application=function(){Sys._Application.initializeBase(this);this._disposableObjects=[];this._components={};this._createdComponents=[];this._secondPassComponents=[];this._unloadHandlerDelegate=Function.createDelegate(this,this._unloadHandler);Sys.UI.DomEvent.addHandler(window,"unload",this._unloadHandlerDelegate);this._domReady()};Sys._Application.prototype={_creatingComponents:false,_disposing:false,_deleteCount:0,get_isCreatingComponents:function(){return this._creatingComponents},get_isDisposing:function(){return this._disposing},add_init:function(a){if(this._initialized)a(this,Sys.EventArgs.Empty);else this.get_events().addHandler("init",a)},remove_init:function(a){this.get_events().removeHandler("init",a)},add_load:function(a){this.get_events().addHandler("load",a)},remove_load:function(a){this.get_events().removeHandler("load",a)},add_unload:function(a){this.get_events().addHandler("unload",a)},remove_unload:function(a){this.get_events().removeHandler("unload",a)},addComponent:function(a){this._components[a.get_id()]=a},beginCreateComponents:function(){this._creatingComponents=true},dispose:function(){if(!this._disposing){this._disposing=true;if(this._timerCookie){window.clearTimeout(this._timerCookie);delete this._timerCookie}if(this._endRequestHandler){Sys.WebForms.PageRequestManager.getInstance().remove_endRequest(this._endRequestHandler);delete this._endRequestHandler}if(this._beginRequestHandler){Sys.WebForms.PageRequestManager.getInstance().remove_beginRequest(this._beginRequestHandler);delete this._beginRequestHandler}if(window.pageUnload)window.pageUnload(this,Sys.EventArgs.Empty);var c=this.get_events().getHandler("unload");if(c)c(this,Sys.EventArgs.Empty);var b=Array.clone(this._disposableObjects);for(var a=0,f=b.length;a<f;a++){var d=b[a];if(typeof d!=="undefined")d.dispose()}Array.clear(this._disposableObjects);Sys.UI.DomEvent.removeHandler(window,"unload",this._unloadHandlerDelegate);if(Sys._ScriptLoader){var e=Sys._ScriptLoader.getInstance();if(e)e.dispose()}Sys._Application.callBaseMethod(this,"dispose")}},disposeElement:function(c,j){if(c.nodeType===1){var b,h=c.getElementsByTagName("*"),g=h.length,i=new Array(g);for(b=0;b<g;b++)i[b]=h[b];for(b=g-1;b>=0;b--){var d=i[b],f=d.dispose;if(f&&typeof f==="function")d.dispose();else{var e=d.control;if(e&&typeof e.dispose==="function")e.dispose()}var a=d._behaviors;if(a)this._disposeComponents(a);a=d._components;if(a){this._disposeComponents(a);d._components=null}}if(!j){var f=c.dispose;if(f&&typeof f==="function")c.dispose();else{var e=c.control;if(e&&typeof e.dispose==="function")e.dispose()}var a=c._behaviors;if(a)this._disposeComponents(a);a=c._components;if(a){this._disposeComponents(a);c._components=null}}}},endCreateComponents:function(){var b=this._secondPassComponents;for(var a=0,d=b.length;a<d;a++){var c=b[a].component;Sys$Component$_setReferences(c,b[a].references);c.endUpdate()}this._secondPassComponents=[];this._creatingComponents=false},findComponent:function(b,a){return a?Sys.IContainer.isInstanceOfType(a)?a.findComponent(b):a[b]||null:Sys.Application._components[b]||null},getComponents:function(){var a=[],b=this._components;for(var c in b)a[a.length]=b[c];return a},initialize:function(){if(!this.get_isInitialized()&&!this._disposing){Sys._Application.callBaseMethod(this,"initialize");this._raiseInit();if(this.get_stateString){if(Sys.WebForms&&Sys.WebForms.PageRequestManager){this._beginRequestHandler=Function.createDelegate(this,this._onPageRequestManagerBeginRequest);Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(this._beginRequestHandler);this._endRequestHandler=Function.createDelegate(this,this._onPageRequestManagerEndRequest);Sys.WebForms.PageRequestManager.getInstance().add_endRequest(this._endRequestHandler)}var a=this.get_stateString();if(a!==this._currentEntry)this._navigate(a);else this._ensureHistory()}this.raiseLoad()}},notifyScriptLoaded:function(){},registerDisposableObject:function(b){if(!this._disposing){var a=this._disposableObjects,c=a.length;a[c]=b;b.__msdisposeindex=c}},raiseLoad:function(){var b=this.get_events().getHandler("load"),a=new Sys.ApplicationLoadEventArgs(Array.clone(this._createdComponents),!!this._loaded);this._loaded=true;if(b)b(this,a);if(window.pageLoad)window.pageLoad(this,a);this._createdComponents=[]},removeComponent:function(b){var a=b.get_id();if(a)delete this._components[a]},unregisterDisposableObject:function(a){if(!this._disposing){var e=a.__msdisposeindex;if(typeof e==="number"){var b=this._disposableObjects;delete b[e];delete a.__msdisposeindex;if(++this._deleteCount>1000){var c=[];for(var d=0,f=b.length;d<f;d++){a=b[d];if(typeof a!=="undefined"){a.__msdisposeindex=c.length;c.push(a)}}this._disposableObjects=c;this._deleteCount=0}}}},_addComponentToSecondPass:function(b,a){this._secondPassComponents[this._secondPassComponents.length]={component:b,references:a}},_disposeComponents:function(a){if(a)for(var b=a.length-1;b>=0;b--){var c=a[b];if(typeof c.dispose==="function")c.dispose()}},_domReady:function(){var a,g,f=this;function b(){f.initialize()}var c=function(){Sys.UI.DomEvent.removeHandler(window,"load",c);b()};Sys.UI.DomEvent.addHandler(window,"load",c);if(document.addEventListener)try{document.addEventListener("DOMContentLoaded",a=function(){document.removeEventListener("DOMContentLoaded",a,false);b()},false)}catch(h){}else if(document.attachEvent)if(window==window.top&&document.documentElement.doScroll){var e,d=document.createElement("div");a=function(){try{d.doScroll("left")}catch(c){e=window.setTimeout(a,0);return}d=null;b()};a()}else document.attachEvent("onreadystatechange",a=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",a);b()}})},_raiseInit:function(){var a=this.get_events().getHandler("init");if(a){this.beginCreateComponents();a(this,Sys.EventArgs.Empty);this.endCreateComponents()}},_unloadHandler:function(){this.dispose()}};Sys._Application.registerClass("Sys._Application",Sys.Component,Sys.IContainer);Sys.Application=new Sys._Application;var $find=Sys.Application.findComponent;Sys.UI.Behavior=function(b){Sys.UI.Behavior.initializeBase(this);this._element=b;var a=b._behaviors;if(!a)b._behaviors=[this];else a[a.length]=this};Sys.UI.Behavior.prototype={_name:null,get_element:function(){return this._element},get_id:function(){var a=Sys.UI.Behavior.callBaseMethod(this,"get_id");if(a)return a;if(!this._element||!this._element.id)return "";return this._element.id+"$"+this.get_name()},get_name:function(){if(this._name)return this._name;var a=Object.getTypeName(this),b=a.lastIndexOf(".");if(b!==-1)a=a.substr(b+1);if(!this.get_isInitialized())this._name=a;return a},set_name:function(a){this._name=a},initialize:function(){Sys.UI.Behavior.callBaseMethod(this,"initialize");var a=this.get_name();if(a)this._element[a]=this},dispose:function(){Sys.UI.Behavior.callBaseMethod(this,"dispose");var a=this._element;if(a){var c=this.get_name();if(c)a[c]=null;var b=a._behaviors;Array.remove(b,this);if(b.length===0)a._behaviors=null;delete this._element}}};Sys.UI.Behavior.registerClass("Sys.UI.Behavior",Sys.Component);Sys.UI.Behavior.getBehaviorByName=function(b,c){var a=b[c];return a&&Sys.UI.Behavior.isInstanceOfType(a)?a:null};Sys.UI.Behavior.getBehaviors=function(a){if(!a._behaviors)return [];return Array.clone(a._behaviors)};Sys.UI.Behavior.getBehaviorsByType=function(d,e){var a=d._behaviors,c=[];if(a)for(var b=0,f=a.length;b<f;b++)if(e.isInstanceOfType(a[b]))c[c.length]=a[b];return c};Sys.UI.VisibilityMode=function(){throw Error.notImplemented()};Sys.UI.VisibilityMode.prototype={hide:0,collapse:1};Sys.UI.VisibilityMode.registerEnum("Sys.UI.VisibilityMode");Sys.UI.Control=function(a){Sys.UI.Control.initializeBase(this);this._element=a;a.control=this;var b=this.get_role();if(b)a.setAttribute("role",b)};Sys.UI.Control.prototype={_parent:null,_visibilityMode:Sys.UI.VisibilityMode.hide,get_element:function(){return this._element},get_id:function(){if(!this._element)return "";return this._element.id},set_id:function(){throw Error.invalidOperation(Sys.Res.cantSetId)},get_parent:function(){if(this._parent)return this._parent;if(!this._element)return null;var a=this._element.parentNode;while(a){if(a.control)return a.control;a=a.parentNode}return null},set_parent:function(a){this._parent=a},get_role:function(){return null},get_visibilityMode:function(){return Sys.UI.DomElement.getVisibilityMode(this._element)},set_visibilityMode:function(a){Sys.UI.DomElement.setVisibilityMode(this._element,a)},get_visible:function(){return Sys.UI.DomElement.getVisible(this._element)},set_visible:function(a){Sys.UI.DomElement.setVisible(this._element,a)},addCssClass:function(a){Sys.UI.DomElement.addCssClass(this._element,a)},dispose:function(){Sys.UI.Control.callBaseMethod(this,"dispose");if(this._element){this._element.control=null;delete this._element}if(this._parent)delete this._parent},onBubbleEvent:function(){return false},raiseBubbleEvent:function(a,b){this._raiseBubbleEvent(a,b)},_raiseBubbleEvent:function(b,c){var a=this.get_parent();while(a){if(a.onBubbleEvent(b,c))return;a=a.get_parent()}},removeCssClass:function(a){Sys.UI.DomElement.removeCssClass(this._element,a)},toggleCssClass:function(a){Sys.UI.DomElement.toggleCssClass(this._element,a)}};Sys.UI.Control.registerClass("Sys.UI.Control",Sys.Component);Sys.HistoryEventArgs=function(a){Sys.HistoryEventArgs.initializeBase(this);this._state=a};Sys.HistoryEventArgs.prototype={get_state:function(){return this._state}};Sys.HistoryEventArgs.registerClass("Sys.HistoryEventArgs",Sys.EventArgs);Sys.Application._appLoadHandler=null;Sys.Application._beginRequestHandler=null;Sys.Application._clientId=null;Sys.Application._currentEntry="";Sys.Application._endRequestHandler=null;Sys.Application._history=null;Sys.Application._enableHistory=false;Sys.Application._historyFrame=null;Sys.Application._historyInitialized=false;Sys.Application._historyPointIsNew=false;Sys.Application._ignoreTimer=false;Sys.Application._initialState=null;Sys.Application._state={};Sys.Application._timerCookie=0;Sys.Application._timerHandler=null;Sys.Application._uniqueId=null;Sys._Application.prototype.get_stateString=function(){var a=null;if(Sys.Browser.agent===Sys.Browser.Firefox){var c=window.location.href,b=c.indexOf("#");if(b!==-1)a=c.substring(b+1);else a="";return a}else a=window.location.hash;if(a.length>0&&a.charAt(0)==="#")a=a.substring(1);return a};Sys._Application.prototype.get_enableHistory=function(){return this._enableHistory};Sys._Application.prototype.set_enableHistory=function(a){this._enableHistory=a};Sys._Application.prototype.add_navigate=function(a){this.get_events().addHandler("navigate",a)};Sys._Application.prototype.remove_navigate=function(a){this.get_events().removeHandler("navigate",a)};Sys._Application.prototype.addHistoryPoint=function(c,f){this._ensureHistory();var b=this._state;for(var a in c){var d=c[a];if(d===null){if(typeof b[a]!=="undefined")delete b[a]}else b[a]=d}var e=this._serializeState(b);this._historyPointIsNew=true;this._setState(e,f);this._raiseNavigate()};Sys._Application.prototype.setServerId=function(a,b){this._clientId=a;this._uniqueId=b};Sys._Application.prototype.setServerState=function(a){this._ensureHistory();this._state.__s=a;this._updateHiddenField(a)};Sys._Application.prototype._deserializeState=function(a){var e={};a=a||"";var b=a.indexOf("&&");if(b!==-1&&b+2<a.length){e.__s=a.substr(b+2);a=a.substr(0,b)}var g=a.split("&");for(var f=0,j=g.length;f<j;f++){var d=g[f],c=d.indexOf("=");if(c!==-1&&c+1<d.length){var i=d.substr(0,c),h=d.substr(c+1);e[i]=decodeURIComponent(h)}}return e};Sys._Application.prototype._enableHistoryInScriptManager=function(){this._enableHistory=true};Sys._Application.prototype._ensureHistory=function(){if(!this._historyInitialized&&this._enableHistory){if(Sys.Browser.agent===Sys.Browser.InternetExplorer&&Sys.Browser.documentMode<8){this._historyFrame=document.getElementById("__historyFrame");this._ignoreIFrame=true}this._timerHandler=Function.createDelegate(this,this._onIdle);this._timerCookie=window.setTimeout(this._timerHandler,100);try{this._initialState=this._deserializeState(this.get_stateString())}catch(a){}this._historyInitialized=true}};Sys._Application.prototype._navigate=function(c){this._ensureHistory();var b=this._deserializeState(c);if(this._uniqueId){var d=this._state.__s||"",a=b.__s||"";if(a!==d){this._updateHiddenField(a);__doPostBack(this._uniqueId,a);this._state=b;return}}this._setState(c);this._state=b;this._raiseNavigate()};Sys._Application.prototype._onIdle=function(){delete this._timerCookie;var a=this.get_stateString();if(a!==this._currentEntry){if(!this._ignoreTimer){this._historyPointIsNew=false;this._navigate(a)}}else this._ignoreTimer=false;this._timerCookie=window.setTimeout(this._timerHandler,100)};Sys._Application.prototype._onIFrameLoad=function(a){this._ensureHistory();if(!this._ignoreIFrame){this._historyPointIsNew=false;this._navigate(a)}this._ignoreIFrame=false};Sys._Application.prototype._onPageRequestManagerBeginRequest=function(){this._ignoreTimer=true;this._originalTitle=document.title};Sys._Application.prototype._onPageRequestManagerEndRequest=function(g,f){var d=f.get_dataItems()[this._clientId],c=this._originalTitle;this._originalTitle=null;var b=document.getElementById("__EVENTTARGET");if(b&&b.value===this._uniqueId)b.value="";if(typeof d!=="undefined"){this.setServerState(d);this._historyPointIsNew=true}else this._ignoreTimer=false;var a=this._serializeState(this._state);if(a!==this._currentEntry){this._ignoreTimer=true;if(typeof c==="string"){if(Sys.Browser.agent!==Sys.Browser.InternetExplorer||Sys.Browser.version>7){var e=document.title;document.title=c;this._setState(a);document.title=e}else this._setState(a);this._raiseNavigate()}else{this._setState(a);this._raiseNavigate()}}};Sys._Application.prototype._raiseNavigate=function(){var d=this._historyPointIsNew,c=this.get_events().getHandler("navigate"),b={};for(var a in this._state)if(a!=="__s")b[a]=this._state[a];var e=new Sys.HistoryEventArgs(b);if(c)c(this,e);if(!d){var f;try{if(Sys.Browser.agent===Sys.Browser.Firefox&&window.location.hash&&(!window.frameElement||window.top.location.hash))Sys.Browser.version<3.5?window.history.go(0):(location.hash=this.get_stateString())}catch(g){}}};Sys._Application.prototype._serializeState=function(d){var b=[];for(var a in d){var e=d[a];if(a==="__s")var c=e;else b[b.length]=a+"="+encodeURIComponent(e)}return b.join("&")+(c?"&&"+c:"")};Sys._Application.prototype._setState=function(a,b){if(this._enableHistory){a=a||"";if(a!==this._currentEntry){if(window.theForm){var d=window.theForm.action,e=d.indexOf("#");window.theForm.action=(e!==-1?d.substring(0,e):d)+"#"+a}if(this._historyFrame&&this._historyPointIsNew){this._ignoreIFrame=true;var c=this._historyFrame.contentWindow.document;c.open("javascript:'<html></html>'");c.write("<html><head><title>"+(b||document.title)+"</title><scri"+'pt type="text/javascript">parent.Sys.Application._onIFrameLoad('+Sys.Serialization.JavaScriptSerializer.serialize(a)+");</scri"+"pt></head><body></body></html>");c.close()}this._ignoreTimer=false;this._currentEntry=a;if(this._historyFrame||this._historyPointIsNew){var f=this.get_stateString();if(a!==f){window.location.hash=a;this._currentEntry=this.get_stateString();if(typeof b!=="undefined"&&b!==null)document.title=b}}this._historyPointIsNew=false}}};Sys._Application.prototype._updateHiddenField=function(b){if(this._clientId){var a=document.getElementById(this._clientId);if(a)a.value=b}};if(!window.XMLHttpRequest)window.XMLHttpRequest=function(){var b=["Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP"];for(var a=0,c=b.length;a<c;a++)try{return new ActiveXObject(b[a])}catch(d){}return null};Type.registerNamespace("Sys.Net");Sys.Net.WebRequestExecutor=function(){this._webRequest=null;this._resultObject=null};Sys.Net.WebRequestExecutor.prototype={get_webRequest:function(){return this._webRequest},_set_webRequest:function(a){this._webRequest=a},get_started:function(){throw Error.notImplemented()},get_responseAvailable:function(){throw Error.notImplemented()},get_timedOut:function(){throw Error.notImplemented()},get_aborted:function(){throw Error.notImplemented()},get_responseData:function(){throw Error.notImplemented()},get_statusCode:function(){throw Error.notImplemented()},get_statusText:function(){throw Error.notImplemented()},get_xml:function(){throw Error.notImplemented()},get_object:function(){if(!this._resultObject)this._resultObject=Sys.Serialization.JavaScriptSerializer.deserialize(this.get_responseData());return this._resultObject},executeRequest:function(){throw Error.notImplemented()},abort:function(){throw Error.notImplemented()},getResponseHeader:function(){throw Error.notImplemented()},getAllResponseHeaders:function(){throw Error.notImplemented()}};Sys.Net.WebRequestExecutor.registerClass("Sys.Net.WebRequestExecutor");Sys.Net.XMLDOM=function(d){if(!window.DOMParser){var c=["Msxml2.DOMDocument.3.0","Msxml2.DOMDocument"];for(var b=0,f=c.length;b<f;b++)try{var a=new ActiveXObject(c[b]);a.async=false;a.loadXML(d);a.setProperty("SelectionLanguage","XPath");return a}catch(g){}}else try{var e=new window.DOMParser;return e.parseFromString(d,"text/xml")}catch(g){}return null};Sys.Net.XMLHttpExecutor=function(){Sys.Net.XMLHttpExecutor.initializeBase(this);var a=this;this._xmlHttpRequest=null;this._webRequest=null;this._responseAvailable=false;this._timedOut=false;this._timer=null;this._aborted=false;this._started=false;this._onReadyStateChange=function(){if(a._xmlHttpRequest.readyState===4){try{if(typeof a._xmlHttpRequest.status==="undefined")return}catch(b){return}a._clearTimer();a._responseAvailable=true;try{a._webRequest.completed(Sys.EventArgs.Empty)}finally{if(a._xmlHttpRequest!=null){a._xmlHttpRequest.onreadystatechange=Function.emptyMethod;a._xmlHttpRequest=null}}}};this._clearTimer=function(){if(a._timer!=null){window.clearTimeout(a._timer);a._timer=null}};this._onTimeout=function(){if(!a._responseAvailable){a._clearTimer();a._timedOut=true;a._xmlHttpRequest.onreadystatechange=Function.emptyMethod;a._xmlHttpRequest.abort();a._webRequest.completed(Sys.EventArgs.Empty);a._xmlHttpRequest=null}}};Sys.Net.XMLHttpExecutor.prototype={get_timedOut:function(){return this._timedOut},get_started:function(){return this._started},get_responseAvailable:function(){return this._responseAvailable},get_aborted:function(){return this._aborted},executeRequest:function(){this._webRequest=this.get_webRequest();var c=this._webRequest.get_body(),a=this._webRequest.get_headers();this._xmlHttpRequest=new XMLHttpRequest;this._xmlHttpRequest.onreadystatechange=this._onReadyStateChange;var e=this._webRequest.get_httpVerb();this._xmlHttpRequest.open(e,this._webRequest.getResolvedUrl(),true);this._xmlHttpRequest.setRequestHeader("X-Requested-With","XMLHttpRequest");if(a)for(var b in a){var f=a[b];if(typeof f!=="function")this._xmlHttpRequest.setRequestHeader(b,f)}if(e.toLowerCase()==="post"){if(a===null||!a["Content-Type"])this._xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");if(!c)c=""}var d=this._webRequest.get_timeout();if(d>0)this._timer=window.setTimeout(Function.createDelegate(this,this._onTimeout),d);this._xmlHttpRequest.send(c);this._started=true},getResponseHeader:function(b){var a;try{a=this._xmlHttpRequest.getResponseHeader(b)}catch(c){}if(!a)a="";return a},getAllResponseHeaders:function(){return this._xmlHttpRequest.getAllResponseHeaders()},get_responseData:function(){return this._xmlHttpRequest.responseText},get_statusCode:function(){var a=0;try{a=this._xmlHttpRequest.status}catch(b){}return a},get_statusText:function(){return this._xmlHttpRequest.statusText},get_xml:function(){var a=this._xmlHttpRequest.responseXML;if(!a||!a.documentElement){a=Sys.Net.XMLDOM(this._xmlHttpRequest.responseText);if(!a||!a.documentElement)return null}else if(navigator.userAgent.indexOf("MSIE")!==-1)a.setProperty("SelectionLanguage","XPath");if(a.documentElement.namespaceURI==="http://www.mozilla.org/newlayout/xml/parsererror.xml"&&a.documentElement.tagName==="parsererror")return null;if(a.documentElement.firstChild&&a.documentElement.firstChild.tagName==="parsererror")return null;return a},abort:function(){if(this._aborted||this._responseAvailable||this._timedOut)return;this._aborted=true;this._clearTimer();if(this._xmlHttpRequest&&!this._responseAvailable){this._xmlHttpRequest.onreadystatechange=Function.emptyMethod;this._xmlHttpRequest.abort();this._xmlHttpRequest=null;this._webRequest.completed(Sys.EventArgs.Empty)}}};Sys.Net.XMLHttpExecutor.registerClass("Sys.Net.XMLHttpExecutor",Sys.Net.WebRequestExecutor);Sys.Net._WebRequestManager=function(){this._defaultTimeout=0;this._defaultExecutorType="Sys.Net.XMLHttpExecutor"};Sys.Net._WebRequestManager.prototype={add_invokingRequest:function(a){this._get_eventHandlerList().addHandler("invokingRequest",a)},remove_invokingRequest:function(a){this._get_eventHandlerList().removeHandler("invokingRequest",a)},add_completedRequest:function(a){this._get_eventHandlerList().addHandler("completedRequest",a)},remove_completedRequest:function(a){this._get_eventHandlerList().removeHandler("completedRequest",a)},_get_eventHandlerList:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},get_defaultTimeout:function(){return this._defaultTimeout},set_defaultTimeout:function(a){this._defaultTimeout=a},get_defaultExecutorType:function(){return this._defaultExecutorType},set_defaultExecutorType:function(a){this._defaultExecutorType=a},executeRequest:function(webRequest){var executor=webRequest.get_executor();if(!executor){var failed=false;try{var executorType=eval(this._defaultExecutorType);executor=new executorType}catch(a){failed=true}webRequest.set_executor(executor)}if(executor.get_aborted())return;var evArgs=new Sys.Net.NetworkRequestEventArgs(webRequest),handler=this._get_eventHandlerList().getHandler("invokingRequest");if(handler)handler(this,evArgs);if(!evArgs.get_cancel())executor.executeRequest()}};Sys.Net._WebRequestManager.registerClass("Sys.Net._WebRequestManager");Sys.Net.WebRequestManager=new Sys.Net._WebRequestManager;Sys.Net.NetworkRequestEventArgs=function(a){Sys.Net.NetworkRequestEventArgs.initializeBase(this);this._webRequest=a};Sys.Net.NetworkRequestEventArgs.prototype={get_webRequest:function(){return this._webRequest}};Sys.Net.NetworkRequestEventArgs.registerClass("Sys.Net.NetworkRequestEventArgs",Sys.CancelEventArgs);Sys.Net.WebRequest=function(){this._url="";this._headers={};this._body=null;this._userContext=null;this._httpVerb=null;this._executor=null;this._invokeCalled=false;this._timeout=0};Sys.Net.WebRequest.prototype={add_completed:function(a){this._get_eventHandlerList().addHandler("completed",a)},remove_completed:function(a){this._get_eventHandlerList().removeHandler("completed",a)},completed:function(b){var a=Sys.Net.WebRequestManager._get_eventHandlerList().getHandler("completedRequest");if(a)a(this._executor,b);a=this._get_eventHandlerList().getHandler("completed");if(a)a(this._executor,b)},_get_eventHandlerList:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},get_url:function(){return this._url},set_url:function(a){this._url=a},get_headers:function(){return this._headers},get_httpVerb:function(){if(this._httpVerb===null){if(this._body===null)return "GET";return "POST"}return this._httpVerb},set_httpVerb:function(a){this._httpVerb=a},get_body:function(){return this._body},set_body:function(a){this._body=a},get_userContext:function(){return this._userContext},set_userContext:function(a){this._userContext=a},get_executor:function(){return this._executor},set_executor:function(a){this._executor=a;this._executor._set_webRequest(this)},get_timeout:function(){if(this._timeout===0)return Sys.Net.WebRequestManager.get_defaultTimeout();return this._timeout},set_timeout:function(a){this._timeout=a},getResolvedUrl:function(){return Sys.Net.WebRequest._resolveUrl(this._url)},invoke:function(){Sys.Net.WebRequestManager.executeRequest(this);this._invokeCalled=true}};Sys.Net.WebRequest._resolveUrl=function(b,a){if(b&&b.indexOf("://")!==-1)return b;if(!a||a.length===0){var d=document.getElementsByTagName("base")[0];if(d&&d.href&&d.href.length>0)a=d.href;else a=document.URL}var c=a.indexOf("?");if(c!==-1)a=a.substr(0,c);c=a.indexOf("#");if(c!==-1)a=a.substr(0,c);a=a.substr(0,a.lastIndexOf("/")+1);if(!b||b.length===0)return a;if(b.charAt(0)==="/"){var e=a.indexOf("://"),g=a.indexOf("/",e+3);return a.substr(0,g)+b}else{var f=a.lastIndexOf("/");return a.substr(0,f+1)+b}};Sys.Net.WebRequest._createQueryString=function(c,b,f){b=b||encodeURIComponent;var h=0,e,g,d,a=new Sys.StringBuilder;if(c)for(d in c){e=c[d];if(typeof e==="function")continue;g=Sys.Serialization.JavaScriptSerializer.serialize(e);if(h++)a.append("&");a.append(d);a.append("=");a.append(b(g))}if(f){if(h)a.append("&");a.append(f)}return a.toString()};Sys.Net.WebRequest._createUrl=function(a,b,c){if(!b&&!c)return a;var d=Sys.Net.WebRequest._createQueryString(b,null,c);return d.length?a+(a&&a.indexOf("?")>=0?"&":"?")+d:a};Sys.Net.WebRequest.registerClass("Sys.Net.WebRequest");Sys._ScriptLoaderTask=function(b,a){this._scriptElement=b;this._completedCallback=a};Sys._ScriptLoaderTask.prototype={get_scriptElement:function(){return this._scriptElement},dispose:function(){if(this._disposed)return;this._disposed=true;this._removeScriptElementHandlers();Sys._ScriptLoaderTask._clearScript(this._scriptElement);this._scriptElement=null},execute:function(){this._addScriptElementHandlers();document.getElementsByTagName("head")[0].appendChild(this._scriptElement)},_addScriptElementHandlers:function(){this._scriptLoadDelegate=Function.createDelegate(this,this._scriptLoadHandler);if(Sys.Browser.agent!==Sys.Browser.InternetExplorer){this._scriptElement.readyState="loaded";$addHandler(this._scriptElement,"load",this._scriptLoadDelegate)}else $addHandler(this._scriptElement,"readystatechange",this._scriptLoadDelegate);if(this._scriptElement.addEventListener){this._scriptErrorDelegate=Function.createDelegate(this,this._scriptErrorHandler);this._scriptElement.addEventListener("error",this._scriptErrorDelegate,false)}},_removeScriptElementHandlers:function(){if(this._scriptLoadDelegate){var a=this.get_scriptElement();if(Sys.Browser.agent!==Sys.Browser.InternetExplorer)$removeHandler(a,"load",this._scriptLoadDelegate);else $removeHandler(a,"readystatechange",this._scriptLoadDelegate);if(this._scriptErrorDelegate){this._scriptElement.removeEventListener("error",this._scriptErrorDelegate,false);this._scriptErrorDelegate=null}this._scriptLoadDelegate=null}},_scriptErrorHandler:function(){if(this._disposed)return;this._completedCallback(this.get_scriptElement(),false)},_scriptLoadHandler:function(){if(this._disposed)return;var a=this.get_scriptElement();if(a.readyState!=="loaded"&&a.readyState!=="complete")return;this._completedCallback(a,true)}};Sys._ScriptLoaderTask.registerClass("Sys._ScriptLoaderTask",null,Sys.IDisposable);Sys._ScriptLoaderTask._clearScript=function(a){if(!Sys.Debug.isDebug)a.parentNode.removeChild(a)};Type.registerNamespace("Sys.Net");Sys.Net.WebServiceProxy=function(){};Sys.Net.WebServiceProxy.prototype={get_timeout:function(){return this._timeout||0},set_timeout:function(a){if(a<0)throw Error.argumentOutOfRange("value",a,Sys.Res.invalidTimeout);this._timeout=a},get_defaultUserContext:function(){return typeof this._userContext==="undefined"?null:this._userContext},set_defaultUserContext:function(a){this._userContext=a},get_defaultSucceededCallback:function(){return this._succeeded||null},set_defaultSucceededCallback:function(a){this._succeeded=a},get_defaultFailedCallback:function(){return this._failed||null},set_defaultFailedCallback:function(a){this._failed=a},get_enableJsonp:function(){return !!this._jsonp},set_enableJsonp:function(a){this._jsonp=a},get_path:function(){return this._path||null},set_path:function(a){this._path=a},get_jsonpCallbackParameter:function(){return this._callbackParameter||"callback"},set_jsonpCallbackParameter:function(a){this._callbackParameter=a},_invoke:function(d,e,g,f,c,b,a){c=c||this.get_defaultSucceededCallback();b=b||this.get_defaultFailedCallback();if(a===null||typeof a==="undefined")a=this.get_defaultUserContext();return Sys.Net.WebServiceProxy.invoke(d,e,g,f,c,b,a,this.get_timeout(),this.get_enableJsonp(),this.get_jsonpCallbackParameter())}};Sys.Net.WebServiceProxy.registerClass("Sys.Net.WebServiceProxy");Sys.Net.WebServiceProxy.invoke=function(q,a,m,l,j,b,g,e,w,p){var i=w!==false?Sys.Net.WebServiceProxy._xdomain.exec(q):null,c,n=i&&i.length===3&&(i[1]!==location.protocol||i[2]!==location.host);m=n||m;if(n){p=p||"callback";c="_jsonp"+Sys._jsonp++}if(!l)l={};var r=l;if(!m||!r)r={};var s,h,f=null,k,o=null,u=Sys.Net.WebRequest._createUrl(a?q+"/"+encodeURIComponent(a):q,r,n?p+"=Sys."+c:null);if(n){s=document.createElement("script");s.src=u;k=new Sys._ScriptLoaderTask(s,function(d,b){if(!b||c)t({Message:String.format(Sys.Res.webServiceFailedNoMsg,a)},-1)});function v(){if(f===null)return;f=null;h=new Sys.Net.WebServiceError(true,String.format(Sys.Res.webServiceTimedOut,a));k.dispose();delete Sys[c];if(b)b(h,g,a)}function t(d,e){if(f!==null){window.clearTimeout(f);f=null}k.dispose();delete Sys[c];c=null;if(typeof e!=="undefined"&&e!==200){if(b){h=new Sys.Net.WebServiceError(false,d.Message||String.format(Sys.Res.webServiceFailedNoMsg,a),d.StackTrace||null,d.ExceptionType||null,d);h._statusCode=e;b(h,g,a)}}else if(j)j(d,g,a)}Sys[c]=t;e=e||Sys.Net.WebRequestManager.get_defaultTimeout();if(e>0)f=window.setTimeout(v,e);k.execute();return null}var d=new Sys.Net.WebRequest;d.set_url(u);d.get_headers()["Content-Type"]="application/json; charset=utf-8";if(!m){o=Sys.Serialization.JavaScriptSerializer.serialize(l);if(o==="{}")o=""}d.set_body(o);d.add_completed(x);if(e&&e>0)d.set_timeout(e);d.invoke();function x(d){if(d.get_responseAvailable()){var f=d.get_statusCode(),c=null;try{var e=d.getResponseHeader("Content-Type");if(e.startsWith("application/json"))c=d.get_object();else if(e.startsWith("text/xml"))c=d.get_xml();else c=d.get_responseData()}catch(m){}var k=d.getResponseHeader("jsonerror"),h=k==="true";if(h){if(c)c=new Sys.Net.WebServiceError(false,c.Message,c.StackTrace,c.ExceptionType,c)}else if(e.startsWith("application/json"))c=!c||typeof c.d==="undefined"?c:c.d;if(f<200||f>=300||h){if(b){if(!c||!h)c=new Sys.Net.WebServiceError(false,String.format(Sys.Res.webServiceFailedNoMsg,a));c._statusCode=f;b(c,g,a)}}else if(j)j(c,g,a)}else{var i;if(d.get_timedOut())i=String.format(Sys.Res.webServiceTimedOut,a);else i=String.format(Sys.Res.webServiceFailedNoMsg,a);if(b)b(new Sys.Net.WebServiceError(d.get_timedOut(),i,"",""),g,a)}}return d};Sys.Net.WebServiceProxy._generateTypedConstructor=function(a){return function(b){if(b)for(var c in b)this[c]=b[c];this.__type=a}};Sys._jsonp=0;Sys.Net.WebServiceProxy._xdomain=/^\s*([a-zA-Z0-9\+\-\.]+\:)\/\/([^?#\/]+)/;Sys.Net.WebServiceError=function(d,e,c,a,b){this._timedOut=d;this._message=e;this._stackTrace=c;this._exceptionType=a;this._errorObject=b;this._statusCode=-1};Sys.Net.WebServiceError.prototype={get_timedOut:function(){return this._timedOut},get_statusCode:function(){return this._statusCode},get_message:function(){return this._message},get_stackTrace:function(){return this._stackTrace||""},get_exceptionType:function(){return this._exceptionType||""},get_errorObject:function(){return this._errorObject||null}};Sys.Net.WebServiceError.registerClass("Sys.Net.WebServiceError");
Type.registerNamespace('Sys');Sys.Res={'argumentInteger':'Value must be an integer.','invokeCalledTwice':'Cannot call invoke more than once.','webServiceFailed':'The server method \'{0}\' failed with the following error: {1}','argumentType':'Object cannot be converted to the required type.','argumentNull':'Value cannot be null.','scriptAlreadyLoaded':'The script \'{0}\' has been referenced multiple times. If referencing Microsoft AJAX scripts explicitly, set the MicrosoftAjaxMode property of the ScriptManager to Explicit.','scriptDependencyNotFound':'The script \'{0}\' failed to load because it is dependent on script \'{1}\'.','formatBadFormatSpecifier':'Format specifier was invalid.','requiredScriptReferenceNotIncluded':'\'{0}\' requires that you have included a script reference to \'{1}\'.','webServiceFailedNoMsg':'The server method \'{0}\' failed.','argumentDomElement':'Value must be a DOM element.','invalidExecutorType':'Could not create a valid Sys.Net.WebRequestExecutor from: {0}.','cannotCallBeforeResponse':'Cannot call {0} when responseAvailable is false.','actualValue':'Actual value was {0}.','enumInvalidValue':'\'{0}\' is not a valid value for enum {1}.','scriptLoadFailed':'The script \'{0}\' could not be loaded.','parameterCount':'Parameter count mismatch.','cannotDeserializeEmptyString':'Cannot deserialize empty string.','formatInvalidString':'Input string was not in a correct format.','invalidTimeout':'Value must be greater than or equal to zero.','cannotAbortBeforeStart':'Cannot abort when executor has not started.','argument':'Value does not fall within the expected range.','cannotDeserializeInvalidJson':'Cannot deserialize. The data does not correspond to valid JSON.','invalidHttpVerb':'httpVerb cannot be set to an empty or null string.','nullWebRequest':'Cannot call executeRequest with a null webRequest.','eventHandlerInvalid':'Handler was not added through the Sys.UI.DomEvent.addHandler method.','cannotSerializeNonFiniteNumbers':'Cannot serialize non finite numbers.','argumentUndefined':'Value cannot be undefined.','webServiceInvalidReturnType':'The server method \'{0}\' returned an invalid type. Expected type: {1}','servicePathNotSet':'The path to the web service has not been set.','argumentTypeWithTypes':'Object of type \'{0}\' cannot be converted to type \'{1}\'.','cannotCallOnceStarted':'Cannot call {0} once started.','badBaseUrl1':'Base URL does not contain ://.','badBaseUrl2':'Base URL does not contain another /.','badBaseUrl3':'Cannot find last / in base URL.','setExecutorAfterActive':'Cannot set executor after it has become active.','paramName':'Parameter name: {0}','nullReferenceInPath':'Null reference while evaluating data path: \'{0}\'.','cannotCallOutsideHandler':'Cannot call {0} outside of a completed event handler.','cannotSerializeObjectWithCycle':'Cannot serialize object with cyclic reference within child properties.','format':'One of the identified items was in an invalid format.','assertFailedCaller':'Assertion Failed: {0}\r\nat {1}','argumentOutOfRange':'Specified argument was out of the range of valid values.','webServiceTimedOut':'The server method \'{0}\' timed out.','notImplemented':'The method or operation is not implemented.','assertFailed':'Assertion Failed: {0}','invalidOperation':'Operation is not valid due to the current state of the object.','breakIntoDebugger':'{0}\r\n\r\nBreak into debugger?'};
//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
// MicrosoftAjaxWebForms.js
Type._registerScript("MicrosoftAjaxWebForms.js",["MicrosoftAjaxCore.js","MicrosoftAjaxSerialization.js","MicrosoftAjaxNetwork.js","MicrosoftAjaxComponentModel.js"]);Type.registerNamespace("Sys.WebForms");Sys.WebForms.BeginRequestEventArgs=function(c,b,a){Sys.WebForms.BeginRequestEventArgs.initializeBase(this);this._request=c;this._postBackElement=b;this._updatePanelsToUpdate=a};Sys.WebForms.BeginRequestEventArgs.prototype={get_postBackElement:function(){return this._postBackElement},get_request:function(){return this._request},get_updatePanelsToUpdate:function(){return this._updatePanelsToUpdate?Array.clone(this._updatePanelsToUpdate):[]}};Sys.WebForms.BeginRequestEventArgs.registerClass("Sys.WebForms.BeginRequestEventArgs",Sys.EventArgs);Sys.WebForms.EndRequestEventArgs=function(c,a,b){Sys.WebForms.EndRequestEventArgs.initializeBase(this);this._errorHandled=false;this._error=c;this._dataItems=a||{};this._response=b};Sys.WebForms.EndRequestEventArgs.prototype={get_dataItems:function(){return this._dataItems},get_error:function(){return this._error},get_errorHandled:function(){return this._errorHandled},set_errorHandled:function(a){this._errorHandled=a},get_response:function(){return this._response}};Sys.WebForms.EndRequestEventArgs.registerClass("Sys.WebForms.EndRequestEventArgs",Sys.EventArgs);Sys.WebForms.InitializeRequestEventArgs=function(c,b,a){Sys.WebForms.InitializeRequestEventArgs.initializeBase(this);this._request=c;this._postBackElement=b;this._updatePanelsToUpdate=a};Sys.WebForms.InitializeRequestEventArgs.prototype={get_postBackElement:function(){return this._postBackElement},get_request:function(){return this._request},get_updatePanelsToUpdate:function(){return this._updatePanelsToUpdate?Array.clone(this._updatePanelsToUpdate):[]},set_updatePanelsToUpdate:function(a){this._updated=true;this._updatePanelsToUpdate=a}};Sys.WebForms.InitializeRequestEventArgs.registerClass("Sys.WebForms.InitializeRequestEventArgs",Sys.CancelEventArgs);Sys.WebForms.PageLoadedEventArgs=function(b,a,c){Sys.WebForms.PageLoadedEventArgs.initializeBase(this);this._panelsUpdated=b;this._panelsCreated=a;this._dataItems=c||{}};Sys.WebForms.PageLoadedEventArgs.prototype={get_dataItems:function(){return this._dataItems},get_panelsCreated:function(){return this._panelsCreated},get_panelsUpdated:function(){return this._panelsUpdated}};Sys.WebForms.PageLoadedEventArgs.registerClass("Sys.WebForms.PageLoadedEventArgs",Sys.EventArgs);Sys.WebForms.PageLoadingEventArgs=function(b,a,c){Sys.WebForms.PageLoadingEventArgs.initializeBase(this);this._panelsUpdating=b;this._panelsDeleting=a;this._dataItems=c||{}};Sys.WebForms.PageLoadingEventArgs.prototype={get_dataItems:function(){return this._dataItems},get_panelsDeleting:function(){return this._panelsDeleting},get_panelsUpdating:function(){return this._panelsUpdating}};Sys.WebForms.PageLoadingEventArgs.registerClass("Sys.WebForms.PageLoadingEventArgs",Sys.EventArgs);Sys._ScriptLoader=function(){this._scriptsToLoad=null;this._sessions=[];this._scriptLoadedDelegate=Function.createDelegate(this,this._scriptLoadedHandler)};Sys._ScriptLoader.prototype={dispose:function(){this._stopSession();this._loading=false;if(this._events)delete this._events;this._sessions=null;this._currentSession=null;this._scriptLoadedDelegate=null},loadScripts:function(d,b,c,a){var e={allScriptsLoadedCallback:b,scriptLoadFailedCallback:c,scriptLoadTimeoutCallback:a,scriptsToLoad:this._scriptsToLoad,scriptTimeout:d};this._scriptsToLoad=null;this._sessions[this._sessions.length]=e;if(!this._loading)this._nextSession()},queueCustomScriptTag:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,a)},queueScriptBlock:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,{text:a})},queueScriptReference:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,{src:a})},_createScriptElement:function(c){var a=document.createElement("script");a.type="text/javascript";for(var b in c)a[b]=c[b];return a},_loadScriptsInternal:function(){var b=this._currentSession;if(b.scriptsToLoad&&b.scriptsToLoad.length>0){var c=Array.dequeue(b.scriptsToLoad),a=this._createScriptElement(c);if(a.text&&Sys.Browser.agent===Sys.Browser.Safari){a.innerHTML=a.text;delete a.text}if(typeof c.src==="string"){this._currentTask=new Sys._ScriptLoaderTask(a,this._scriptLoadedDelegate);this._currentTask.execute()}else{document.getElementsByTagName("head")[0].appendChild(a);Sys._ScriptLoaderTask._clearScript(a);this._loadScriptsInternal()}}else{this._stopSession();var d=b.allScriptsLoadedCallback;if(d)d(this);this._nextSession()}},_nextSession:function(){if(this._sessions.length===0){this._loading=false;this._currentSession=null;return}this._loading=true;var a=Array.dequeue(this._sessions);this._currentSession=a;if(a.scriptTimeout>0)this._timeoutCookie=window.setTimeout(Function.createDelegate(this,this._scriptLoadTimeoutHandler),a.scriptTimeout*1000);this._loadScriptsInternal()},_raiseError:function(){var b=this._currentSession.scriptLoadFailedCallback,a=this._currentTask.get_scriptElement();this._stopSession();if(b){b(this,a);this._nextSession()}else{this._loading=false;throw Sys._ScriptLoader._errorScriptLoadFailed(a.src)}},_scriptLoadedHandler:function(a,b){if(b){Array.add(Sys._ScriptLoader._getLoadedScripts(),a.src);this._currentTask.dispose();this._currentTask=null;this._loadScriptsInternal()}else this._raiseError()},_scriptLoadTimeoutHandler:function(){var a=this._currentSession.scriptLoadTimeoutCallback;this._stopSession();if(a)a(this);this._nextSession()},_stopSession:function(){if(this._timeoutCookie){window.clearTimeout(this._timeoutCookie);this._timeoutCookie=null}if(this._currentTask){this._currentTask.dispose();this._currentTask=null}}};Sys._ScriptLoader.registerClass("Sys._ScriptLoader",null,Sys.IDisposable);Sys._ScriptLoader.getInstance=function(){var a=Sys._ScriptLoader._activeInstance;if(!a)a=Sys._ScriptLoader._activeInstance=new Sys._ScriptLoader;return a};Sys._ScriptLoader.isScriptLoaded=function(b){var a=document.createElement("script");a.src=b;return Array.contains(Sys._ScriptLoader._getLoadedScripts(),a.src)};Sys._ScriptLoader.readLoadedScripts=function(){if(!Sys._ScriptLoader._referencedScripts){var c=Sys._ScriptLoader._referencedScripts=[],d=document.getElementsByTagName("script");for(var b=d.length-1;b>=0;b--){var e=d[b],a=e.src;if(a.length)if(!Array.contains(c,a))Array.add(c,a)}}};Sys._ScriptLoader._errorScriptLoadFailed=function(b){var a;a=Sys.Res.scriptLoadFailed;var d="Sys.ScriptLoadFailedException: "+String.format(a,b),c=Error.create(d,{name:"Sys.ScriptLoadFailedException","scriptUrl":b});c.popStackFrame();return c};Sys._ScriptLoader._getLoadedScripts=function(){if(!Sys._ScriptLoader._referencedScripts){Sys._ScriptLoader._referencedScripts=[];Sys._ScriptLoader.readLoadedScripts()}return Sys._ScriptLoader._referencedScripts};Sys.WebForms.PageRequestManager=function(){this._form=null;this._activeDefaultButton=null;this._activeDefaultButtonClicked=false;this._updatePanelIDs=null;this._updatePanelClientIDs=null;this._updatePanelHasChildrenAsTriggers=null;this._asyncPostBackControlIDs=null;this._asyncPostBackControlClientIDs=null;this._postBackControlIDs=null;this._postBackControlClientIDs=null;this._scriptManagerID=null;this._pageLoadedHandler=null;this._additionalInput=null;this._onsubmit=null;this._onSubmitStatements=[];this._originalDoPostBack=null;this._originalDoPostBackWithOptions=null;this._originalFireDefaultButton=null;this._originalDoCallback=null;this._isCrossPost=false;this._postBackSettings=null;this._request=null;this._onFormSubmitHandler=null;this._onFormElementClickHandler=null;this._onWindowUnloadHandler=null;this._asyncPostBackTimeout=null;this._controlIDToFocus=null;this._scrollPosition=null;this._processingRequest=false;this._scriptDisposes={};this._transientFields=["__VIEWSTATEENCRYPTED","__VIEWSTATEFIELDCOUNT"]};Sys.WebForms.PageRequestManager.prototype={_get_eventHandlerList:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},get_isInAsyncPostBack:function(){return this._request!==null},add_beginRequest:function(a){this._get_eventHandlerList().addHandler("beginRequest",a)},remove_beginRequest:function(a){this._get_eventHandlerList().removeHandler("beginRequest",a)},add_endRequest:function(a){this._get_eventHandlerList().addHandler("endRequest",a)},remove_endRequest:function(a){this._get_eventHandlerList().removeHandler("endRequest",a)},add_initializeRequest:function(a){this._get_eventHandlerList().addHandler("initializeRequest",a)},remove_initializeRequest:function(a){this._get_eventHandlerList().removeHandler("initializeRequest",a)},add_pageLoaded:function(a){this._get_eventHandlerList().addHandler("pageLoaded",a)},remove_pageLoaded:function(a){this._get_eventHandlerList().removeHandler("pageLoaded",a)},add_pageLoading:function(a){this._get_eventHandlerList().addHandler("pageLoading",a)},remove_pageLoading:function(a){this._get_eventHandlerList().removeHandler("pageLoading",a)},abortPostBack:function(){if(!this._processingRequest&&this._request){this._request.get_executor().abort();this._request=null}},beginAsyncPostBack:function(c,a,f,d,e){if(d&&typeof Page_ClientValidate==="function"&&!Page_ClientValidate(e||null))return;this._postBackSettings=this._createPostBackSettings(true,c,a);var b=this._form;b.__EVENTTARGET.value=a||"";b.__EVENTARGUMENT.value=f||"";this._isCrossPost=false;this._additionalInput=null;this._onFormSubmit()},_cancelPendingCallbacks:function(){for(var a=0,e=window.__pendingCallbacks.length;a<e;a++){var c=window.__pendingCallbacks[a];if(c){if(!c.async)window.__synchronousCallBackIndex=-1;window.__pendingCallbacks[a]=null;var d="__CALLBACKFRAME"+a,b=document.getElementById(d);if(b)b.parentNode.removeChild(b)}}},_commitControls:function(a,b){if(a){this._updatePanelIDs=a.updatePanelIDs;this._updatePanelClientIDs=a.updatePanelClientIDs;this._updatePanelHasChildrenAsTriggers=a.updatePanelHasChildrenAsTriggers;this._asyncPostBackControlIDs=a.asyncPostBackControlIDs;this._asyncPostBackControlClientIDs=a.asyncPostBackControlClientIDs;this._postBackControlIDs=a.postBackControlIDs;this._postBackControlClientIDs=a.postBackControlClientIDs}if(typeof b!=="undefined"&&b!==null)this._asyncPostBackTimeout=b*1000},_createHiddenField:function(c,d){var b,a=document.getElementById(c);if(a)if(!a._isContained)a.parentNode.removeChild(a);else b=a.parentNode;if(!b){b=document.createElement("span");b.style.cssText="display:none !important";this._form.appendChild(b)}b.innerHTML="<input type='hidden' />";a=b.childNodes[0];a._isContained=true;a.id=a.name=c;a.value=d},_createPageRequestManagerTimeoutError:function(){var b="Sys.WebForms.PageRequestManagerTimeoutException: "+Sys.WebForms.Res.PRM_TimeoutError,a=Error.create(b,{name:"Sys.WebForms.PageRequestManagerTimeoutException"});a.popStackFrame();return a},_createPageRequestManagerServerError:function(a,d){var c="Sys.WebForms.PageRequestManagerServerErrorException: "+(d||String.format(Sys.WebForms.Res.PRM_ServerError,a)),b=Error.create(c,{name:"Sys.WebForms.PageRequestManagerServerErrorException",httpStatusCode:a});b.popStackFrame();return b},_createPageRequestManagerParserError:function(b){var c="Sys.WebForms.PageRequestManagerParserErrorException: "+String.format(Sys.WebForms.Res.PRM_ParserError,b),a=Error.create(c,{name:"Sys.WebForms.PageRequestManagerParserErrorException"});a.popStackFrame();return a},_createPanelID:function(e,b){var c=b.asyncTarget,a=this._ensureUniqueIds(e||b.panelsToUpdate),d=a instanceof Array?a.join(","):a||this._scriptManagerID;if(c)d+="|"+c;return encodeURIComponent(this._scriptManagerID)+"="+encodeURIComponent(d)+"&"},_createPostBackSettings:function(d,a,c,b){return {async:d,asyncTarget:c,panelsToUpdate:a,sourceElement:b}},_convertToClientIDs:function(a,f,e,d){if(a)for(var b=0,h=a.length;b<h;b+=d?2:1){var c=a[b],g=(d?a[b+1]:"")||this._uniqueIDToClientID(c);Array.add(f,c);Array.add(e,g)}},dispose:function(){if(this._form){Sys.UI.DomEvent.removeHandler(this._form,"submit",this._onFormSubmitHandler);Sys.UI.DomEvent.removeHandler(this._form,"click",this._onFormElementClickHandler);Sys.UI.DomEvent.removeHandler(window,"unload",this._onWindowUnloadHandler);Sys.UI.DomEvent.removeHandler(window,"load",this._pageLoadedHandler)}if(this._originalDoPostBack){window.__doPostBack=this._originalDoPostBack;this._originalDoPostBack=null}if(this._originalDoPostBackWithOptions){window.WebForm_DoPostBackWithOptions=this._originalDoPostBackWithOptions;this._originalDoPostBackWithOptions=null}if(this._originalFireDefaultButton){window.WebForm_FireDefaultButton=this._originalFireDefaultButton;this._originalFireDefaultButton=null}if(this._originalDoCallback){window.WebForm_DoCallback=this._originalDoCallback;this._originalDoCallback=null}this._form=null;this._updatePanelIDs=null;this._updatePanelClientIDs=null;this._asyncPostBackControlIDs=null;this._asyncPostBackControlClientIDs=null;this._postBackControlIDs=null;this._postBackControlClientIDs=null;this._asyncPostBackTimeout=null;this._scrollPosition=null;this._activeElement=null},_doCallback:function(d,b,c,f,a,e){if(!this.get_isInAsyncPostBack())this._originalDoCallback(d,b,c,f,a,e)},_doPostBack:function(a,k){var f=window.event;if(!f){var d=arguments.callee?arguments.callee.caller:null;if(d){var j=30;while(d.arguments.callee.caller&&--j)d=d.arguments.callee.caller;f=j&&d.arguments.length?d.arguments[0]:null}}this._additionalInput=null;var h=this._form;if(a===null||typeof a==="undefined"||this._isCrossPost){this._postBackSettings=this._createPostBackSettings(false);this._isCrossPost=false}else{var c=this._masterPageUniqueID,l=this._uniqueIDToClientID(a),g=document.getElementById(l);if(!g&&c)if(a.indexOf(c+"$")===0)g=document.getElementById(l.substr(c.length+1));if(!g)if(Array.contains(this._asyncPostBackControlIDs,a))this._postBackSettings=this._createPostBackSettings(true,null,a);else if(Array.contains(this._postBackControlIDs,a))this._postBackSettings=this._createPostBackSettings(false);else{var e=this._findNearestElement(a);if(e)this._postBackSettings=this._getPostBackSettings(e,a);else{if(c){c+="$";if(a.indexOf(c)===0)e=this._findNearestElement(a.substr(c.length))}if(e)this._postBackSettings=this._getPostBackSettings(e,a);else{var b;try{b=f?f.target||f.srcElement:null}catch(n){}b=b||this._activeElement;var m=/__doPostBack\(|WebForm_DoPostBackWithOptions\(/;function i(b){b=b?b.toString():"";return m.test(b)&&b.indexOf("'"+a+"'")!==-1||b.indexOf('"'+a+'"')!==-1}if(b&&(b.name===a||i(b.href)||i(b.onclick)||i(b.onchange)))this._postBackSettings=this._getPostBackSettings(b,a);else this._postBackSettings=this._createPostBackSettings(false)}}}else this._postBackSettings=this._getPostBackSettings(g,a)}if(!this._postBackSettings.async){h.onsubmit=this._onsubmit;this._originalDoPostBack(a,k);h.onsubmit=null;return}h.__EVENTTARGET.value=a;h.__EVENTARGUMENT.value=k;this._onFormSubmit()},_doPostBackWithOptions:function(a){this._isCrossPost=a&&a.actionUrl;var d=true;if(a.validation)if(typeof Page_ClientValidate=="function")d=Page_ClientValidate(a.validationGroup);if(d){if(typeof a.actionUrl!="undefined"&&a.actionUrl!=null&&a.actionUrl.length>0)theForm.action=a.actionUrl;if(a.trackFocus){var c=theForm.elements["__LASTFOCUS"];if(typeof c!="undefined"&&c!=null)if(typeof document.activeElement=="undefined")c.value=a.eventTarget;else{var b=document.activeElement;if(typeof b!="undefined"&&b!=null)if(typeof b.id!="undefined"&&b.id!=null&&b.id.length>0)c.value=b.id;else if(typeof b.name!="undefined")c.value=b.name}}}if(a.clientSubmit)this._doPostBack(a.eventTarget,a.eventArgument)},_elementContains:function(b,a){while(a){if(a===b)return true;a=a.parentNode}return false},_endPostBack:function(a,d,f){if(this._request===d.get_webRequest()){this._processingRequest=false;this._additionalInput=null;this._request=null}var e=this._get_eventHandlerList().getHandler("endRequest"),b=false;if(e){var c=new Sys.WebForms.EndRequestEventArgs(a,f?f.dataItems:{},d);e(this,c);b=c.get_errorHandled()}if(a&&!b)throw a},_ensureUniqueIds:function(a){if(!a)return a;a=a instanceof Array?a:[a];var c=[];for(var b=0,f=a.length;b<f;b++){var e=a[b],d=Array.indexOf(this._updatePanelClientIDs,e);c.push(d>-1?this._updatePanelIDs[d]:e)}return c},_findNearestElement:function(a){while(a.length>0){var d=this._uniqueIDToClientID(a),c=document.getElementById(d);if(c)return c;var b=a.lastIndexOf("$");if(b===-1)return null;a=a.substring(0,b)}return null},_findText:function(b,a){var c=Math.max(0,a-20),d=Math.min(b.length,a+20);return b.substring(c,d)},_fireDefaultButton:function(a,d){if(a.keyCode===13){var c=a.srcElement||a.target;if(!c||c.tagName.toLowerCase()!=="textarea"){var b=document.getElementById(d);if(b&&typeof b.click!=="undefined"){this._activeDefaultButton=b;this._activeDefaultButtonClicked=false;try{b.click()}finally{this._activeDefaultButton=null}a.cancelBubble=true;if(typeof a.stopPropagation==="function")a.stopPropagation();return false}}}return true},_getPageLoadedEventArgs:function(n,c){var m=[],l=[],k=c?c.version4:false,d=c?c.updatePanelData:null,e,g,h,b;if(!d){e=this._updatePanelIDs;g=this._updatePanelClientIDs;h=null;b=null}else{e=d.updatePanelIDs;g=d.updatePanelClientIDs;h=d.childUpdatePanelIDs;b=d.panelsToRefreshIDs}var a,f,j,i;if(b)for(a=0,f=b.length;a<f;a+=k?2:1){j=b[a];i=(k?b[a+1]:"")||this._uniqueIDToClientID(j);Array.add(m,document.getElementById(i))}for(a=0,f=e.length;a<f;a++)if(n||Array.indexOf(h,e[a])!==-1)Array.add(l,document.getElementById(g[a]));return new Sys.WebForms.PageLoadedEventArgs(m,l,c?c.dataItems:{})},_getPageLoadingEventArgs:function(f){var j=[],i=[],c=f.updatePanelData,k=c.oldUpdatePanelIDs,l=c.oldUpdatePanelClientIDs,n=c.updatePanelIDs,m=c.childUpdatePanelIDs,d=c.panelsToRefreshIDs,a,e,b,g,h=f.version4;for(a=0,e=d.length;a<e;a+=h?2:1){b=d[a];g=(h?d[a+1]:"")||this._uniqueIDToClientID(b);Array.add(j,document.getElementById(g))}for(a=0,e=k.length;a<e;a++){b=k[a];if(Array.indexOf(d,b)===-1&&(Array.indexOf(n,b)===-1||Array.indexOf(m,b)>-1))Array.add(i,document.getElementById(l[a]))}return new Sys.WebForms.PageLoadingEventArgs(j,i,f.dataItems)},_getPostBackSettings:function(a,c){var d=a,b=null;while(a){if(a.id){if(!b&&Array.contains(this._asyncPostBackControlClientIDs,a.id))b=this._createPostBackSettings(true,null,c,d);else if(!b&&Array.contains(this._postBackControlClientIDs,a.id))return this._createPostBackSettings(false);else{var e=Array.indexOf(this._updatePanelClientIDs,a.id);if(e!==-1)if(this._updatePanelHasChildrenAsTriggers[e])return this._createPostBackSettings(true,[this._updatePanelIDs[e]],c,d);else return this._createPostBackSettings(true,null,c,d)}if(!b&&this._matchesParentIDInList(a.id,this._asyncPostBackControlClientIDs))b=this._createPostBackSettings(true,null,c,d);else if(!b&&this._matchesParentIDInList(a.id,this._postBackControlClientIDs))return this._createPostBackSettings(false)}a=a.parentNode}if(!b)return this._createPostBackSettings(false);else return b},_getScrollPosition:function(){var a=document.documentElement;if(a&&(this._validPosition(a.scrollLeft)||this._validPosition(a.scrollTop)))return {x:a.scrollLeft,y:a.scrollTop};else{a=document.body;if(a&&(this._validPosition(a.scrollLeft)||this._validPosition(a.scrollTop)))return {x:a.scrollLeft,y:a.scrollTop};else if(this._validPosition(window.pageXOffset)||this._validPosition(window.pageYOffset))return {x:window.pageXOffset,y:window.pageYOffset};else return {x:0,y:0}}},_initializeInternal:function(f,g,a,b,e,c,d){if(this._prmInitialized)throw Error.invalidOperation(Sys.WebForms.Res.PRM_CannotRegisterTwice);this._prmInitialized=true;this._masterPageUniqueID=d;this._scriptManagerID=f;this._form=Sys.UI.DomElement.resolveElement(g);this._onsubmit=this._form.onsubmit;this._form.onsubmit=null;this._onFormSubmitHandler=Function.createDelegate(this,this._onFormSubmit);this._onFormElementClickHandler=Function.createDelegate(this,this._onFormElementClick);this._onWindowUnloadHandler=Function.createDelegate(this,this._onWindowUnload);Sys.UI.DomEvent.addHandler(this._form,"submit",this._onFormSubmitHandler);Sys.UI.DomEvent.addHandler(this._form,"click",this._onFormElementClickHandler);Sys.UI.DomEvent.addHandler(window,"unload",this._onWindowUnloadHandler);this._originalDoPostBack=window.__doPostBack;if(this._originalDoPostBack)window.__doPostBack=Function.createDelegate(this,this._doPostBack);this._originalDoPostBackWithOptions=window.WebForm_DoPostBackWithOptions;if(this._originalDoPostBackWithOptions)window.WebForm_DoPostBackWithOptions=Function.createDelegate(this,this._doPostBackWithOptions);this._originalFireDefaultButton=window.WebForm_FireDefaultButton;if(this._originalFireDefaultButton)window.WebForm_FireDefaultButton=Function.createDelegate(this,this._fireDefaultButton);this._originalDoCallback=window.WebForm_DoCallback;if(this._originalDoCallback)window.WebForm_DoCallback=Function.createDelegate(this,this._doCallback);this._pageLoadedHandler=Function.createDelegate(this,this._pageLoadedInitialLoad);Sys.UI.DomEvent.addHandler(window,"load",this._pageLoadedHandler);if(a)this._updateControls(a,b,e,c,true)},_matchesParentIDInList:function(c,b){for(var a=0,d=b.length;a<d;a++)if(c.startsWith(b[a]+"_"))return true;return false},_onFormElementActive:function(a,d,e){if(a.disabled)return;this._activeElement=a;this._postBackSettings=this._getPostBackSettings(a,a.name);if(a.name){var b=a.tagName.toUpperCase();if(b==="INPUT"){var c=a.type;if(c==="submit")this._additionalInput=encodeURIComponent(a.name)+"="+encodeURIComponent(a.value);else if(c==="image")this._additionalInput=encodeURIComponent(a.name)+".x="+d+"&"+encodeURIComponent(a.name)+".y="+e}else if(b==="BUTTON"&&a.name.length!==0&&a.type==="submit")this._additionalInput=encodeURIComponent(a.name)+"="+encodeURIComponent(a.value)}},_onFormElementClick:function(a){this._activeDefaultButtonClicked=a.target===this._activeDefaultButton;this._onFormElementActive(a.target,a.offsetX,a.offsetY)},_onFormSubmit:function(i){var f,u,h=true,v=this._isCrossPost;this._isCrossPost=false;if(this._onsubmit)h=this._onsubmit();if(h)for(f=0,u=this._onSubmitStatements.length;f<u;f++)if(!this._onSubmitStatements[f]()){h=false;break}if(!h){if(i)i.preventDefault();return}var o=this._form;if(v)return;if(this._activeDefaultButton&&!this._activeDefaultButtonClicked)this._onFormElementActive(this._activeDefaultButton,0,0);if(!this._postBackSettings||!this._postBackSettings.async)return;var a=new Sys.StringBuilder,x=o.elements.length,r=this._createPanelID(null,this._postBackSettings);a.append(r);for(f=0;f<x;f++){var e=o.elements[f],g=e.name;if(typeof g==="undefined"||g===null||g.length===0||g===this._scriptManagerID)continue;var n=e.tagName.toUpperCase();if(n==="INPUT"){var l=e.type;if(l==="text"||l==="password"||l==="hidden"||(l==="checkbox"||l==="radio")&&e.checked){a.append(encodeURIComponent(g));a.append("=");a.append(encodeURIComponent(e.value));a.append("&")}}else if(n==="SELECT"){var w=e.options.length;for(var p=0;p<w;p++){var s=e.options[p];if(s.selected){a.append(encodeURIComponent(g));a.append("=");a.append(encodeURIComponent(s.value));a.append("&")}}}else if(n==="TEXTAREA"){a.append(encodeURIComponent(g));a.append("=");a.append(encodeURIComponent(e.value));a.append("&")}}a.append("__ASYNCPOST=true&");if(this._additionalInput){a.append(this._additionalInput);this._additionalInput=null}var b=new Sys.Net.WebRequest,c=o.action;if(Sys.Browser.agent===Sys.Browser.InternetExplorer){var q=c.indexOf("#");if(q!==-1)c=c.substr(0,q);var m=c.indexOf("?");if(m!==-1){var t=c.substr(0,m);if(t.indexOf("%")===-1)c=encodeURI(t)+c.substr(m)}else if(c.indexOf("%")===-1)c=encodeURI(c)}b.set_url(c);b.get_headers()["X-MicrosoftAjax"]="Delta=true";b.get_headers()["Cache-Control"]="no-cache";b.set_timeout(this._asyncPostBackTimeout);b.add_completed(Function.createDelegate(this,this._onFormSubmitCompleted));b.set_body(a.toString());var j,d,k=this._get_eventHandlerList().getHandler("initializeRequest");if(k){j=this._postBackSettings.panelsToUpdate;d=new Sys.WebForms.InitializeRequestEventArgs(b,this._postBackSettings.sourceElement,j);k(this,d);h=!d.get_cancel()}if(!h){if(i)i.preventDefault();return}if(d&&d._updated){j=d.get_updatePanelsToUpdate();b.set_body(b.get_body().replace(r,this._createPanelID(j,this._postBackSettings)))}this._scrollPosition=this._getScrollPosition();this.abortPostBack();k=this._get_eventHandlerList().getHandler("beginRequest");if(k){d=new Sys.WebForms.BeginRequestEventArgs(b,this._postBackSettings.sourceElement,j||this._postBackSettings.panelsToUpdate);k(this,d)}if(this._originalDoCallback)this._cancelPendingCallbacks();this._request=b;this._processingRequest=false;b.invoke();if(i)i.preventDefault()},_onFormSubmitCompleted:function(c){this._processingRequest=true;if(c.get_timedOut()){this._endPostBack(this._createPageRequestManagerTimeoutError(),c,null);return}if(c.get_aborted()){this._endPostBack(null,c,null);return}if(!this._request||c.get_webRequest()!==this._request)return;if(c.get_statusCode()!==200){this._endPostBack(this._createPageRequestManagerServerError(c.get_statusCode()),c,null);return}var a=this._parseDelta(c);if(!a)return;var b,e;if(a.asyncPostBackControlIDsNode&&a.postBackControlIDsNode&&a.updatePanelIDsNode&&a.panelsToRefreshNode&&a.childUpdatePanelIDsNode){var r=this._updatePanelIDs,n=this._updatePanelClientIDs,i=a.childUpdatePanelIDsNode.content,p=i.length?i.split(","):[],m=this._splitNodeIntoArray(a.asyncPostBackControlIDsNode),o=this._splitNodeIntoArray(a.postBackControlIDsNode),q=this._splitNodeIntoArray(a.updatePanelIDsNode),g=this._splitNodeIntoArray(a.panelsToRefreshNode),h=a.version4;for(b=0,e=g.length;b<e;b+=h?2:1){var j=(h?g[b+1]:"")||this._uniqueIDToClientID(g[b]);if(!document.getElementById(j)){this._endPostBack(Error.invalidOperation(String.format(Sys.WebForms.Res.PRM_MissingPanel,j)),c,a);return}}var f=this._processUpdatePanelArrays(q,m,o,h);f.oldUpdatePanelIDs=r;f.oldUpdatePanelClientIDs=n;f.childUpdatePanelIDs=p;f.panelsToRefreshIDs=g;a.updatePanelData=f}a.dataItems={};var d;for(b=0,e=a.dataItemNodes.length;b<e;b++){d=a.dataItemNodes[b];a.dataItems[d.id]=d.content}for(b=0,e=a.dataItemJsonNodes.length;b<e;b++){d=a.dataItemJsonNodes[b];a.dataItems[d.id]=Sys.Serialization.JavaScriptSerializer.deserialize(d.content)}var l=this._get_eventHandlerList().getHandler("pageLoading");if(l)l(this,this._getPageLoadingEventArgs(a));Sys._ScriptLoader.readLoadedScripts();Sys.Application.beginCreateComponents();var k=Sys._ScriptLoader.getInstance();this._queueScripts(k,a.scriptBlockNodes,true,false);this._processingRequest=true;k.loadScripts(0,Function.createDelegate(this,Function.createCallback(this._scriptIncludesLoadComplete,a)),Function.createDelegate(this,Function.createCallback(this._scriptIncludesLoadFailed,a)),null)},_onWindowUnload:function(){this.dispose()},_pageLoaded:function(a,c){var b=this._get_eventHandlerList().getHandler("pageLoaded");if(b)b(this,this._getPageLoadedEventArgs(a,c));if(!a)Sys.Application.raiseLoad()},_pageLoadedInitialLoad:function(){this._pageLoaded(true,null)},_parseDelta:function(h){var c=h.get_responseData(),d,i,E,F,D,b=0,e=null,j=[];while(b<c.length){d=c.indexOf("|",b);if(d===-1){e=this._findText(c,b);break}i=parseInt(c.substring(b,d),10);if(i%1!==0){e=this._findText(c,b);break}b=d+1;d=c.indexOf("|",b);if(d===-1){e=this._findText(c,b);break}E=c.substring(b,d);b=d+1;d=c.indexOf("|",b);if(d===-1){e=this._findText(c,b);break}F=c.substring(b,d);b=d+1;if(b+i>=c.length){e=this._findText(c,c.length);break}D=c.substr(b,i);b+=i;if(c.charAt(b)!=="|"){e=this._findText(c,b);break}b++;Array.add(j,{type:E,id:F,content:D})}if(e){this._endPostBack(this._createPageRequestManagerParserError(String.format(Sys.WebForms.Res.PRM_ParserErrorDetails,e)),h,null);return null}var x=[],v=[],p=[],w=[],s=[],C=[],A=[],z=[],u=[],r=[],l,o,t,m,n,q,y,g;for(var k=0,G=j.length;k<G;k++){var a=j[k];switch(a.type){case "#":g=a;break;case "updatePanel":Array.add(x,a);break;case "hiddenField":Array.add(v,a);break;case "arrayDeclaration":Array.add(p,a);break;case "scriptBlock":Array.add(w,a);break;case "scriptStartupBlock":Array.add(s,a);break;case "expando":Array.add(C,a);break;case "onSubmit":Array.add(A,a);break;case "asyncPostBackControlIDs":l=a;break;case "postBackControlIDs":o=a;break;case "updatePanelIDs":t=a;break;case "asyncPostBackTimeout":m=a;break;case "childUpdatePanelIDs":n=a;break;case "panelsToRefreshIDs":q=a;break;case "formAction":y=a;break;case "dataItem":Array.add(z,a);break;case "dataItemJson":Array.add(u,a);break;case "scriptDispose":Array.add(r,a);break;case "pageRedirect":if(g&&parseFloat(g.content)>=4)a.content=unescape(a.content);if(Sys.Browser.agent===Sys.Browser.InternetExplorer){var f=document.createElement("a");f.style.display="none";f.attachEvent("onclick",B);f.href=a.content;this._form.parentNode.insertBefore(f,this._form);f.click();f.detachEvent("onclick",B);this._form.parentNode.removeChild(f);function B(a){a.cancelBubble=true}}else window.location.href=a.content;return null;case "error":this._endPostBack(this._createPageRequestManagerServerError(Number.parseInvariant(a.id),a.content),h,null);return null;case "pageTitle":document.title=a.content;break;case "focus":this._controlIDToFocus=a.content;break;default:this._endPostBack(this._createPageRequestManagerParserError(String.format(Sys.WebForms.Res.PRM_UnknownToken,a.type)),h,null);return null}}return {version4:g?parseFloat(g.content)>=4:false,executor:h,updatePanelNodes:x,hiddenFieldNodes:v,arrayDeclarationNodes:p,scriptBlockNodes:w,scriptStartupNodes:s,expandoNodes:C,onSubmitNodes:A,dataItemNodes:z,dataItemJsonNodes:u,scriptDisposeNodes:r,asyncPostBackControlIDsNode:l,postBackControlIDsNode:o,updatePanelIDsNode:t,asyncPostBackTimeoutNode:m,childUpdatePanelIDsNode:n,panelsToRefreshNode:q,formActionNode:y}},_processUpdatePanelArrays:function(e,q,r,f){var d,c,b;if(e){var i=e.length,j=f?2:1;d=new Array(i/j);c=new Array(i/j);b=new Array(i/j);for(var g=0,h=0;g<i;g+=j,h++){var p,a=e[g],k=f?e[g+1]:"";p=a.charAt(0)==="t";a=a.substr(1);if(!k)k=this._uniqueIDToClientID(a);b[h]=p;d[h]=a;c[h]=k}}else{d=[];c=[];b=[]}var n=[],l=[];this._convertToClientIDs(q,n,l,f);var o=[],m=[];this._convertToClientIDs(r,o,m,f);return {updatePanelIDs:d,updatePanelClientIDs:c,updatePanelHasChildrenAsTriggers:b,asyncPostBackControlIDs:n,asyncPostBackControlClientIDs:l,postBackControlIDs:o,postBackControlClientIDs:m}},_queueScripts:function(scriptLoader,scriptBlockNodes,queueIncludes,queueBlocks){for(var i=0,l=scriptBlockNodes.length;i<l;i++){var scriptBlockType=scriptBlockNodes[i].id;switch(scriptBlockType){case "ScriptContentNoTags":if(!queueBlocks)continue;scriptLoader.queueScriptBlock(scriptBlockNodes[i].content);break;case "ScriptContentWithTags":var scriptTagAttributes;eval("scriptTagAttributes = "+scriptBlockNodes[i].content);if(scriptTagAttributes.src){if(!queueIncludes||Sys._ScriptLoader.isScriptLoaded(scriptTagAttributes.src))continue}else if(!queueBlocks)continue;scriptLoader.queueCustomScriptTag(scriptTagAttributes);break;case "ScriptPath":if(!queueIncludes||Sys._ScriptLoader.isScriptLoaded(scriptBlockNodes[i].content))continue;scriptLoader.queueScriptReference(scriptBlockNodes[i].content)}}},_registerDisposeScript:function(a,b){if(!this._scriptDisposes[a])this._scriptDisposes[a]=[b];else Array.add(this._scriptDisposes[a],b)},_scriptIncludesLoadComplete:function(e,b){if(b.executor.get_webRequest()!==this._request)return;this._commitControls(b.updatePanelData,b.asyncPostBackTimeoutNode?b.asyncPostBackTimeoutNode.content:null);if(b.formActionNode)this._form.action=b.formActionNode.content;var a,d,c;for(a=0,d=b.updatePanelNodes.length;a<d;a++){c=b.updatePanelNodes[a];var j=document.getElementById(c.id);if(!j){this._endPostBack(Error.invalidOperation(String.format(Sys.WebForms.Res.PRM_MissingPanel,c.id)),b.executor,b);return}this._updatePanel(j,c.content)}for(a=0,d=b.scriptDisposeNodes.length;a<d;a++){c=b.scriptDisposeNodes[a];this._registerDisposeScript(c.id,c.content)}for(a=0,d=this._transientFields.length;a<d;a++){var g=document.getElementById(this._transientFields[a]);if(g){var k=g._isContained?g.parentNode:g;k.parentNode.removeChild(k)}}for(a=0,d=b.hiddenFieldNodes.length;a<d;a++){c=b.hiddenFieldNodes[a];this._createHiddenField(c.id,c.content)}if(b.scriptsFailed)throw Sys._ScriptLoader._errorScriptLoadFailed(b.scriptsFailed.src,b.scriptsFailed.multipleCallbacks);this._queueScripts(e,b.scriptBlockNodes,false,true);var i="";for(a=0,d=b.arrayDeclarationNodes.length;a<d;a++){c=b.arrayDeclarationNodes[a];i+="Sys.WebForms.PageRequestManager._addArrayElement('"+c.id+"', "+c.content+");\r\n"}var h="";for(a=0,d=b.expandoNodes.length;a<d;a++){c=b.expandoNodes[a];h+=c.id+" = "+c.content+"\r\n"}if(i.length)e.queueScriptBlock(i);if(h.length)e.queueScriptBlock(h);this._queueScripts(e,b.scriptStartupNodes,true,true);var f="";for(a=0,d=b.onSubmitNodes.length;a<d;a++){if(a===0)f="Array.add(Sys.WebForms.PageRequestManager.getInstance()._onSubmitStatements, function() {\r\n";f+=b.onSubmitNodes[a].content+"\r\n"}if(f.length){f+="\r\nreturn true;\r\n});\r\n";e.queueScriptBlock(f)}e.loadScripts(0,Function.createDelegate(this,Function.createCallback(this._scriptsLoadComplete,b)),null,null)},_scriptIncludesLoadFailed:function(d,c,b,a){a.scriptsFailed={src:c.src,multipleCallbacks:b};this._scriptIncludesLoadComplete(d,a)},_scriptsLoadComplete:function(f,c){var e=c.executor;if(window.__theFormPostData)window.__theFormPostData="";if(window.__theFormPostCollection)window.__theFormPostCollection=[];if(window.WebForm_InitCallback)window.WebForm_InitCallback();if(this._scrollPosition){if(window.scrollTo)window.scrollTo(this._scrollPosition.x,this._scrollPosition.y);this._scrollPosition=null}Sys.Application.endCreateComponents();this._pageLoaded(false,c);this._endPostBack(null,e,c);if(this._controlIDToFocus){var a,d;if(Sys.Browser.agent===Sys.Browser.InternetExplorer){var b=$get(this._controlIDToFocus);a=b;if(b&&!WebForm_CanFocus(b))a=WebForm_FindFirstFocusableChild(b);if(a&&typeof a.contentEditable!=="undefined"){d=a.contentEditable;a.contentEditable=false}else a=null}WebForm_AutoFocus(this._controlIDToFocus);if(a)a.contentEditable=d;this._controlIDToFocus=null}},_splitNodeIntoArray:function(b){var a=b.content,c=a.length?a.split(","):[];return c},_uniqueIDToClientID:function(a){return a.replace(/\$/g,"_")},_updateControls:function(d,a,c,b,e){this._commitControls(this._processUpdatePanelArrays(d,a,c,e),b)},_updatePanel:function(updatePanelElement,rendering){for(var updatePanelID in this._scriptDisposes)if(this._elementContains(updatePanelElement,document.getElementById(updatePanelID))){var disposeScripts=this._scriptDisposes[updatePanelID];for(var i=0,l=disposeScripts.length;i<l;i++)eval(disposeScripts[i]);delete this._scriptDisposes[updatePanelID]}Sys.Application.disposeElement(updatePanelElement,true);updatePanelElement.innerHTML=rendering},_validPosition:function(a){return typeof a!=="undefined"&&a!==null&&a!==0}};Sys.WebForms.PageRequestManager.getInstance=function(){var a=Sys.WebForms.PageRequestManager._instance;if(!a)a=Sys.WebForms.PageRequestManager._instance=new Sys.WebForms.PageRequestManager;return a};Sys.WebForms.PageRequestManager._addArrayElement=function(a){if(!window[a])window[a]=[];for(var b=1,c=arguments.length;b<c;b++)Array.add(window[a],arguments[b])};Sys.WebForms.PageRequestManager._initialize=function(){var a=Sys.WebForms.PageRequestManager.getInstance();a._initializeInternal.apply(a,arguments)};Sys.WebForms.PageRequestManager.registerClass("Sys.WebForms.PageRequestManager");Sys.UI._UpdateProgress=function(a){Sys.UI._UpdateProgress.initializeBase(this,[a]);this._displayAfter=500;this._dynamicLayout=true;this._associatedUpdatePanelId=null;this._beginRequestHandlerDelegate=null;this._startDelegate=null;this._endRequestHandlerDelegate=null;this._pageRequestManager=null;this._timerCookie=null};Sys.UI._UpdateProgress.prototype={get_displayAfter:function(){return this._displayAfter},set_displayAfter:function(a){this._displayAfter=a},get_dynamicLayout:function(){return this._dynamicLayout},set_dynamicLayout:function(a){this._dynamicLayout=a},get_associatedUpdatePanelId:function(){return this._associatedUpdatePanelId},set_associatedUpdatePanelId:function(a){this._associatedUpdatePanelId=a},get_role:function(){return "status"},_clearTimeout:function(){if(this._timerCookie){window.clearTimeout(this._timerCookie);this._timerCookie=null}},_getUniqueID:function(b){var a=Array.indexOf(this._pageRequestManager._updatePanelClientIDs,b);return a===-1?null:this._pageRequestManager._updatePanelIDs[a]},_handleBeginRequest:function(f,e){var b=e.get_postBackElement(),a=true,d=this._associatedUpdatePanelId;if(this._associatedUpdatePanelId){var c=e.get_updatePanelsToUpdate();if(c&&c.length)a=Array.contains(c,d)||Array.contains(c,this._getUniqueID(d));else a=false}while(!a&&b){if(b.id&&this._associatedUpdatePanelId===b.id)a=true;b=b.parentNode}if(a)this._timerCookie=window.setTimeout(this._startDelegate,this._displayAfter)},_startRequest:function(){if(this._pageRequestManager.get_isInAsyncPostBack()){var a=this.get_element();if(this._dynamicLayout)a.style.display="block";else a.style.visibility="visible";if(this.get_role()==="status")a.setAttribute("aria-hidden","false")}this._timerCookie=null},_handleEndRequest:function(){var a=this.get_element();if(this._dynamicLayout)a.style.display="none";else a.style.visibility="hidden";if(this.get_role()==="status")a.setAttribute("aria-hidden","true");this._clearTimeout()},dispose:function(){if(this._beginRequestHandlerDelegate!==null){this._pageRequestManager.remove_beginRequest(this._beginRequestHandlerDelegate);this._pageRequestManager.remove_endRequest(this._endRequestHandlerDelegate);this._beginRequestHandlerDelegate=null;this._endRequestHandlerDelegate=null}this._clearTimeout();Sys.UI._UpdateProgress.callBaseMethod(this,"dispose")},initialize:function(){Sys.UI._UpdateProgress.callBaseMethod(this,"initialize");if(this.get_role()==="status")this.get_element().setAttribute("aria-hidden","true");this._beginRequestHandlerDelegate=Function.createDelegate(this,this._handleBeginRequest);this._endRequestHandlerDelegate=Function.createDelegate(this,this._handleEndRequest);this._startDelegate=Function.createDelegate(this,this._startRequest);if(Sys.WebForms&&Sys.WebForms.PageRequestManager)this._pageRequestManager=Sys.WebForms.PageRequestManager.getInstance();if(this._pageRequestManager!==null){this._pageRequestManager.add_beginRequest(this._beginRequestHandlerDelegate);this._pageRequestManager.add_endRequest(this._endRequestHandlerDelegate)}}};Sys.UI._UpdateProgress.registerClass("Sys.UI._UpdateProgress",Sys.UI.Control);
Type.registerNamespace('Sys.WebForms');Sys.WebForms.Res={'PRM_UnknownToken':'Unknown token: \'{0}\'.','PRM_MissingPanel':'Could not find UpdatePanel with ID \'{0}\'. If it is being updated dynamically then it must be inside another UpdatePanel.','PRM_ServerError':'An unknown error occurred while processing the request on the server. The status code returned from the server was: {0}','PRM_ParserError':'The message received from the server could not be parsed. Common causes for this error are when the response is modified by calls to Response.Write(), response filters, HttpModules, or server trace is enabled.\r\nDetails: {0}','PRM_TimeoutError':'The server request timed out.','PRM_ParserErrorDetails':'Error parsing near \'{0}\'.','PRM_CannotRegisterTwice':'The PageRequestManager cannot be initialized more than once.'};
function WebForm_PostBackOptions(eventTarget, eventArgument, validation, validationGroup, actionUrl, trackFocus, clientSubmit) {
    this.eventTarget = eventTarget;
    this.eventArgument = eventArgument;
    this.validation = validation;
    this.validationGroup = validationGroup;
    this.actionUrl = actionUrl;
    this.trackFocus = trackFocus;
    this.clientSubmit = clientSubmit;
}
function WebForm_DoPostBackWithOptions(options) {
    var validationResult = true;
    if (options.validation) {
        if (typeof(Page_ClientValidate) == 'function') {
            validationResult = Page_ClientValidate(options.validationGroup);
        }
    }
    if (validationResult) {
        if ((typeof(options.actionUrl) != "undefined") && (options.actionUrl != null) && (options.actionUrl.length > 0)) {
            theForm.action = options.actionUrl;
        }
        if (options.trackFocus) {
            var lastFocus = theForm.elements["__LASTFOCUS"];
            if ((typeof(lastFocus) != "undefined") && (lastFocus != null)) {
                if (typeof(document.activeElement) == "undefined") {
                    lastFocus.value = options.eventTarget;
                }
                else {
                    var active = document.activeElement;
                    if ((typeof(active) != "undefined") && (active != null)) {
                        if ((typeof(active.id) != "undefined") && (active.id != null) && (active.id.length > 0)) {
                            lastFocus.value = active.id;
                        }
                        else if (typeof(active.name) != "undefined") {
                            lastFocus.value = active.name;
                        }
                    }
                }
            }
        }
    }
    if (options.clientSubmit) {
        __doPostBack(options.eventTarget, options.eventArgument);
    }
}
var __pendingCallbacks = new Array();
var __synchronousCallBackIndex = -1;
function WebForm_DoCallback(eventTarget, eventArgument, eventCallback, context, errorCallback, useAsync) {
    var postData = __theFormPostData +
                "__CALLBACKID=" + WebForm_EncodeCallback(eventTarget) +
                "&__CALLBACKPARAM=" + WebForm_EncodeCallback(eventArgument);
    if (theForm["__EVENTVALIDATION"]) {
        postData += "&__EVENTVALIDATION=" + WebForm_EncodeCallback(theForm["__EVENTVALIDATION"].value);
    }
    var xmlRequest,e;
    try {
        xmlRequest = new XMLHttpRequest();
    }
    catch(e) {
        try {
            xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(e) {
        }
    }
    var setRequestHeaderMethodExists = true;
    try {
        setRequestHeaderMethodExists = (xmlRequest && xmlRequest.setRequestHeader);
    }
    catch(e) {}
    var callback = new Object();
    callback.eventCallback = eventCallback;
    callback.context = context;
    callback.errorCallback = errorCallback;
    callback.async = useAsync;
    var callbackIndex = WebForm_FillFirstAvailableSlot(__pendingCallbacks, callback);
    if (!useAsync) {
        if (__synchronousCallBackIndex != -1) {
            __pendingCallbacks[__synchronousCallBackIndex] = null;
        }
        __synchronousCallBackIndex = callbackIndex;
    }
    if (setRequestHeaderMethodExists) {
        xmlRequest.onreadystatechange = WebForm_CallbackComplete;
        callback.xmlRequest = xmlRequest;
        // e.g. http:
        var action = theForm.action || document.location.pathname, fragmentIndex = action.indexOf('#');
        if (fragmentIndex !== -1) {
            action = action.substr(0, fragmentIndex);
        }
        if (!__nonMSDOMBrowser) {
            var queryIndex = action.indexOf('?');
            if (queryIndex !== -1) {
                var path = action.substr(0, queryIndex);
                if (path.indexOf("%") === -1) {
                    action = encodeURI(path) + action.substr(queryIndex);
                }
            }
            else if (action.indexOf("%") === -1) {
                action = encodeURI(action);
            }
        }
        xmlRequest.open("POST", action, true);
        xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlRequest.send(postData);
        return;
    }
    callback.xmlRequest = new Object();
    var callbackFrameID = "__CALLBACKFRAME" + callbackIndex;
    var xmlRequestFrame = document.frames[callbackFrameID];
    if (!xmlRequestFrame) {
        xmlRequestFrame = document.createElement("IFRAME");
        xmlRequestFrame.width = "1";
        xmlRequestFrame.height = "1";
        xmlRequestFrame.frameBorder = "0";
        xmlRequestFrame.id = callbackFrameID;
        xmlRequestFrame.name = callbackFrameID;
        xmlRequestFrame.style.position = "absolute";
        xmlRequestFrame.style.top = "-100px"
        xmlRequestFrame.style.left = "-100px";
        try {
            if (callBackFrameUrl) {
                xmlRequestFrame.src = callBackFrameUrl;
            }
        }
        catch(e) {}
        document.body.appendChild(xmlRequestFrame);
    }
    var interval = window.setInterval(function() {
        xmlRequestFrame = document.frames[callbackFrameID];
        if (xmlRequestFrame && xmlRequestFrame.document) {
            window.clearInterval(interval);
            xmlRequestFrame.document.write("");
            xmlRequestFrame.document.close();
            xmlRequestFrame.document.write('<html><body><form method="post"><input type="hidden" name="__CALLBACKLOADSCRIPT" value="t"></form></body></html>');
            xmlRequestFrame.document.close();
            xmlRequestFrame.document.forms[0].action = theForm.action;
            var count = __theFormPostCollection.length;
            var element;
            for (var i = 0; i < count; i++) {
                element = __theFormPostCollection[i];
                if (element) {
                    var fieldElement = xmlRequestFrame.document.createElement("INPUT");
                    fieldElement.type = "hidden";
                    fieldElement.name = element.name;
                    fieldElement.value = element.value;
                    xmlRequestFrame.document.forms[0].appendChild(fieldElement);
                }
            }
            var callbackIdFieldElement = xmlRequestFrame.document.createElement("INPUT");
            callbackIdFieldElement.type = "hidden";
            callbackIdFieldElement.name = "__CALLBACKID";
            callbackIdFieldElement.value = eventTarget;
            xmlRequestFrame.document.forms[0].appendChild(callbackIdFieldElement);
            var callbackParamFieldElement = xmlRequestFrame.document.createElement("INPUT");
            callbackParamFieldElement.type = "hidden";
            callbackParamFieldElement.name = "__CALLBACKPARAM";
            callbackParamFieldElement.value = eventArgument;
            xmlRequestFrame.document.forms[0].appendChild(callbackParamFieldElement);
            if (theForm["__EVENTVALIDATION"]) {
                var callbackValidationFieldElement = xmlRequestFrame.document.createElement("INPUT");
                callbackValidationFieldElement.type = "hidden";
                callbackValidationFieldElement.name = "__EVENTVALIDATION";
                callbackValidationFieldElement.value = theForm["__EVENTVALIDATION"].value;
                xmlRequestFrame.document.forms[0].appendChild(callbackValidationFieldElement);
            }
            var callbackIndexFieldElement = xmlRequestFrame.document.createElement("INPUT");
            callbackIndexFieldElement.type = "hidden";
            callbackIndexFieldElement.name = "__CALLBACKINDEX";
            callbackIndexFieldElement.value = callbackIndex;
            xmlRequestFrame.document.forms[0].appendChild(callbackIndexFieldElement);
            xmlRequestFrame.document.forms[0].submit();
        }
    }, 10);
}
function WebForm_CallbackComplete() {
    for (var i = 0; i < __pendingCallbacks.length; i++) {
        callbackObject = __pendingCallbacks[i];
        if (callbackObject && callbackObject.xmlRequest && (callbackObject.xmlRequest.readyState == 4)) {
            if (!__pendingCallbacks[i].async) {
                __synchronousCallBackIndex = -1;
            }
            __pendingCallbacks[i] = null;
            var callbackFrameID = "__CALLBACKFRAME" + i;
            var xmlRequestFrame = document.getElementById(callbackFrameID);
            if (xmlRequestFrame) {
                xmlRequestFrame.parentNode.removeChild(xmlRequestFrame);
            }
            WebForm_ExecuteCallback(callbackObject);
        }
    }
}
function WebForm_ExecuteCallback(callbackObject) {
    var response = callbackObject.xmlRequest.responseText;
    if (response.charAt(0) == "s") {
        if ((typeof(callbackObject.eventCallback) != "undefined") && (callbackObject.eventCallback != null)) {
            callbackObject.eventCallback(response.substring(1), callbackObject.context);
        }
    }
    else if (response.charAt(0) == "e") {
        if ((typeof(callbackObject.errorCallback) != "undefined") && (callbackObject.errorCallback != null)) {
            callbackObject.errorCallback(response.substring(1), callbackObject.context);
        }
    }
    else {
        var separatorIndex = response.indexOf("|");
        if (separatorIndex != -1) {
            var validationFieldLength = parseInt(response.substring(0, separatorIndex));
            if (!isNaN(validationFieldLength)) {
                var validationField = response.substring(separatorIndex + 1, separatorIndex + validationFieldLength + 1);
                if (validationField != "") {
                    var validationFieldElement = theForm["__EVENTVALIDATION"];
                    if (!validationFieldElement) {
                        validationFieldElement = document.createElement("INPUT");
                        validationFieldElement.type = "hidden";
                        validationFieldElement.name = "__EVENTVALIDATION";
                        theForm.appendChild(validationFieldElement);
                    }
                    validationFieldElement.value = validationField;
                }
                if ((typeof(callbackObject.eventCallback) != "undefined") && (callbackObject.eventCallback != null)) {
                    callbackObject.eventCallback(response.substring(separatorIndex + validationFieldLength + 1), callbackObject.context);
                }
            }
        }
    }
}
function WebForm_FillFirstAvailableSlot(array, element) {
    var i;
    for (i = 0; i < array.length; i++) {
        if (!array[i]) break;
    }
    array[i] = element;
    return i;
}
var __nonMSDOMBrowser = (window.navigator.appName.toLowerCase().indexOf('explorer') == -1);
var __theFormPostData = "";
var __theFormPostCollection = new Array();
function WebForm_InitCallback() {
    var count = theForm.elements.length;
    var element;
    for (var i = 0; i < count; i++) {
        element = theForm.elements[i];
        var tagName = element.tagName.toLowerCase();
        if (tagName == "input") {
            var type = element.type;
            if ((type == "text" || type == "hidden" || type == "password" ||
                ((type == "checkbox" || type == "radio") && element.checked)) &&
                (element.id != "__EVENTVALIDATION")) {
                WebForm_InitCallbackAddField(element.name, element.value);
            }
        }
        else if (tagName == "select") {
            var selectCount = element.options.length;
            for (var j = 0; j < selectCount; j++) {
                var selectChild = element.options[j];
                if (selectChild.selected == true) {
                    WebForm_InitCallbackAddField(element.name, element.value);
                }
            }
        }
        else if (tagName == "textarea") {
            WebForm_InitCallbackAddField(element.name, element.value);
        }
    }
}
function WebForm_InitCallbackAddField(name, value) {
    var nameValue = new Object();
    nameValue.name = name;
    nameValue.value = value;
    __theFormPostCollection[__theFormPostCollection.length] = nameValue;
    __theFormPostData += WebForm_EncodeCallback(name) + "=" + WebForm_EncodeCallback(value) + "&";
}
function WebForm_EncodeCallback(parameter) {
    if (encodeURIComponent) {
        return encodeURIComponent(parameter);
    }
    else {
        return escape(parameter);
    }
}
var __disabledControlArray = new Array();
function WebForm_ReEnableControls() {
    if (typeof(__enabledControlArray) == 'undefined') {
        return false;
    }
    var disabledIndex = 0;
    for (var i = 0; i < __enabledControlArray.length; i++) {
        var c;
        if (__nonMSDOMBrowser) {
            c = document.getElementById(__enabledControlArray[i]);
        }
        else {
            c = document.all[__enabledControlArray[i]];
        }
        if ((typeof(c) != "undefined") && (c != null) && (c.disabled == true)) {
            c.disabled = false;
            __disabledControlArray[disabledIndex++] = c;
        }
    }
    setTimeout("WebForm_ReDisableControls()", 0);
    return true;
}
function WebForm_ReDisableControls() {
    for (var i = 0; i < __disabledControlArray.length; i++) {
        __disabledControlArray[i].disabled = true;
    }
}
function WebForm_FireDefaultButton(event, target) {
    if (event.keyCode == 13) {
        var src = event.srcElement || event.target;
        if (src &&
            ((src.tagName.toLowerCase() == "input") &&
             (src.type.toLowerCase() == "submit" || src.type.toLowerCase() == "button")) ||
            ((src.tagName.toLowerCase() == "a") &&
             (src.href != null) && (src.href != "")) ||
            (src.tagName.toLowerCase() == "textarea")) {
            return true;
        }
        var defaultButton;
        if (__nonMSDOMBrowser) {
            defaultButton = document.getElementById(target);
        }
        else {
            defaultButton = document.all[target];
        }
        if (defaultButton && typeof(defaultButton.click) != "undefined") {
            defaultButton.click();
            event.cancelBubble = true;
            if (event.stopPropagation) event.stopPropagation();
            return false;
        }
    }
    return true;
}
function WebForm_GetScrollX() {
    if (__nonMSDOMBrowser) {
        return window.pageXOffset;
    }
    else {
        if (document.documentElement && document.documentElement.scrollLeft) {
            return document.documentElement.scrollLeft;
        }
        else if (document.body) {
            return document.body.scrollLeft;
        }
    }
    return 0;
}
function WebForm_GetScrollY() {
    if (__nonMSDOMBrowser) {
        return window.pageYOffset;
    }
    else {
        if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
        }
        else if (document.body) {
            return document.body.scrollTop;
        }
    }
    return 0;
}
function WebForm_SaveScrollPositionSubmit() {
    if (__nonMSDOMBrowser) {
        theForm.elements['__SCROLLPOSITIONY'].value = window.pageYOffset;
        theForm.elements['__SCROLLPOSITIONX'].value = window.pageXOffset;
    }
    else {
        theForm.__SCROLLPOSITIONX.value = WebForm_GetScrollX();
        theForm.__SCROLLPOSITIONY.value = WebForm_GetScrollY();
    }
    if ((typeof(this.oldSubmit) != "undefined") && (this.oldSubmit != null)) {
        return this.oldSubmit();
    }
    return true;
}
function WebForm_SaveScrollPositionOnSubmit() {
    theForm.__SCROLLPOSITIONX.value = WebForm_GetScrollX();
    theForm.__SCROLLPOSITIONY.value = WebForm_GetScrollY();
    if ((typeof(this.oldOnSubmit) != "undefined") && (this.oldOnSubmit != null)) {
        return this.oldOnSubmit();
    }
    return true;
}
function WebForm_RestoreScrollPosition() {
    if (__nonMSDOMBrowser) {
        window.scrollTo(theForm.elements['__SCROLLPOSITIONX'].value, theForm.elements['__SCROLLPOSITIONY'].value);
    }
    else {
        window.scrollTo(theForm.__SCROLLPOSITIONX.value, theForm.__SCROLLPOSITIONY.value);
    }
    if ((typeof(theForm.oldOnLoad) != "undefined") && (theForm.oldOnLoad != null)) {
        return theForm.oldOnLoad();
    }
    return true;
}
function WebForm_TextBoxKeyHandler(event) {
    if (event.keyCode == 13) {
        var target;
        if (__nonMSDOMBrowser) {
            target = event.target;
        }
        else {
            target = event.srcElement;
        }
        if ((typeof(target) != "undefined") && (target != null)) {
            if (typeof(target.onchange) != "undefined") {
                target.onchange();
                event.cancelBubble = true;
                if (event.stopPropagation) event.stopPropagation();
                return false;
            }
        }
    }
    return true;
}
function WebForm_TrimString(value) {
    return value.replace(/^\s+|\s+$/g, '')
}
function WebForm_AppendToClassName(element, className) {
    var currentClassName = ' ' + WebForm_TrimString(element.className) + ' ';
    className = WebForm_TrimString(className);
    var index = currentClassName.indexOf(' ' + className + ' ');
    if (index === -1) {
        element.className = (element.className === '') ? className : element.className + ' ' + className;
    }
}
function WebForm_RemoveClassName(element, className) {
    var currentClassName = ' ' + WebForm_TrimString(element.className) + ' ';
    className = WebForm_TrimString(className);
    var index = currentClassName.indexOf(' ' + className + ' ');
    if (index >= 0) {
        element.className = WebForm_TrimString(currentClassName.substring(0, index) + ' ' +
            currentClassName.substring(index + className.length + 1, currentClassName.length));
    }
}
function WebForm_GetElementById(elementId) {
    if (document.getElementById) {
        return document.getElementById(elementId);
    }
    else if (document.all) {
        return document.all[elementId];
    }
    else return null;
}
function WebForm_GetElementByTagName(element, tagName) {
    var elements = WebForm_GetElementsByTagName(element, tagName);
    if (elements && elements.length > 0) {
        return elements[0];
    }
    else return null;
}
function WebForm_GetElementsByTagName(element, tagName) {
    if (element && tagName) {
        if (element.getElementsByTagName) {
            return element.getElementsByTagName(tagName);
        }
        if (element.all && element.all.tags) {
            return element.all.tags(tagName);
        }
    }
    return null;
}
function WebForm_GetElementDir(element) {
    if (element) {
        if (element.dir) {
            return element.dir;
        }
        return WebForm_GetElementDir(element.parentNode);
    }
    return "ltr";
}
function WebForm_GetElementPosition(element) {
    var result = new Object();
    result.x = 0;
    result.y = 0;
    result.width = 0;
    result.height = 0;
    if (element.offsetParent) {
        result.x = element.offsetLeft;
        result.y = element.offsetTop;
        var parent = element.offsetParent;
        while (parent) {
            result.x += parent.offsetLeft;
            result.y += parent.offsetTop;
            var parentTagName = parent.tagName.toLowerCase();
            if (parentTagName != "table" &&
                parentTagName != "body" && 
                parentTagName != "html" && 
                parentTagName != "div" && 
                parent.clientTop && 
                parent.clientLeft) {
                result.x += parent.clientLeft;
                result.y += parent.clientTop;
            }
            parent = parent.offsetParent;
        }
    }
    else if (element.left && element.top) {
        result.x = element.left;
        result.y = element.top;
    }
    else {
        if (element.x) {
            result.x = element.x;
        }
        if (element.y) {
            result.y = element.y;
        }
    }
    if (element.offsetWidth && element.offsetHeight) {
        result.width = element.offsetWidth;
        result.height = element.offsetHeight;
    }
    else if (element.style && element.style.pixelWidth && element.style.pixelHeight) {
        result.width = element.style.pixelWidth;
        result.height = element.style.pixelHeight;
    }
    return result;
}
function WebForm_GetParentByTagName(element, tagName) {
    var parent = element.parentNode;
    var upperTagName = tagName.toUpperCase();
    while (parent && (parent.tagName.toUpperCase() != upperTagName)) {
        parent = parent.parentNode ? parent.parentNode : parent.parentElement;
    }
    return parent;
}
function WebForm_SetElementHeight(element, height) {
    if (element && element.style) {
        element.style.height = height + "px";
    }
}
function WebForm_SetElementWidth(element, width) {
    if (element && element.style) {
        element.style.width = width + "px";
    }
}
function WebForm_SetElementX(element, x) {
    if (element && element.style) {
        element.style.left = x + "px";
    }
}
function WebForm_SetElementY(element, y) {
    if (element && element.style) {
        element.style.top = y + "px";
    }
}

var Page_ValidationVer = "125";
var Page_IsValid = true;
var Page_BlockSubmit = false;
var Page_InvalidControlToBeFocused = null;
var Page_TextTypes = /^(text|password|file|search|tel|url|email|number|range|color|datetime|date|month|week|time|datetime-local)$/i;
function ValidatorUpdateDisplay(val) {
    if (typeof(val.display) == "string") {
        if (val.display == "None") {
            return;
        }
        if (val.display == "Dynamic") {
            val.style.display = val.isvalid ? "none" : "inline";
            return;
        }
    }
    if ((navigator.userAgent.indexOf("Mac") > -1) &&
        (navigator.userAgent.indexOf("MSIE") > -1)) {
        val.style.display = "inline";
    }
    val.style.visibility = val.isvalid ? "hidden" : "visible";
}
function ValidatorUpdateIsValid() {
    Page_IsValid = AllValidatorsValid(Page_Validators);
}
function AllValidatorsValid(validators) {
    if ((typeof(validators) != "undefined") && (validators != null)) {
        var i;
        for (i = 0; i < validators.length; i++) {
            if (!validators[i].isvalid) {
                return false;
            }
        }
    }
    return true;
}
function ValidatorHookupControlID(controlID, val) {
    if (typeof(controlID) != "string") {
        return;
    }
    var ctrl = document.getElementById(controlID);
    if ((typeof(ctrl) != "undefined") && (ctrl != null)) {
        ValidatorHookupControl(ctrl, val);
    }
    else {
        val.isvalid = true;
        val.enabled = false;
    }
}
function ValidatorHookupControl(control, val) {
    if (typeof(control.tagName) != "string") {
        return;  
    }
    if (control.tagName != "INPUT" && control.tagName != "TEXTAREA" && control.tagName != "SELECT") {
        var i;
        for (i = 0; i < control.childNodes.length; i++) {
            ValidatorHookupControl(control.childNodes[i], val);
        }
        return;
    }
    else {
        if (typeof(control.Validators) == "undefined") {
            control.Validators = new Array;
            var eventType;
            if (control.type == "radio") {
                eventType = "onclick";
            } else {
                eventType = "onchange";
                if (typeof(val.focusOnError) == "string" && val.focusOnError == "t") {
                    ValidatorHookupEvent(control, "onblur", "ValidatedControlOnBlur(event); ");
                }
            }
            ValidatorHookupEvent(control, eventType, "ValidatorOnChange(event); ");
            if (Page_TextTypes.test(control.type)) {
                ValidatorHookupEvent(control, "onkeypress", 
                    "event = event || window.event; if (!ValidatedTextBoxOnKeyPress(event)) { event.cancelBubble = true; if (event.stopPropagation) event.stopPropagation(); return false; } ");
            }
        }
        control.Validators[control.Validators.length] = val;
    }
}
function ValidatorHookupEvent(control, eventType, functionPrefix) {
    var ev = control[eventType];
    if (typeof(ev) == "function") {
        ev = ev.toString();
        ev = ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}"));
    }
    else {
        ev = "";
    }
    control[eventType] = new Function("event", functionPrefix + " " + ev);
}
function ValidatorGetValue(id) {
    var control;
    control = document.getElementById(id);
    if (typeof(control.value) == "string") {
        return control.value;
    }
    return ValidatorGetValueRecursive(control);
}
function ValidatorGetValueRecursive(control)
{
    if (typeof(control.value) == "string" && (control.type != "radio" || control.checked == true)) {
        return control.value;
    }
    var i, val;
    for (i = 0; i<control.childNodes.length; i++) {
        val = ValidatorGetValueRecursive(control.childNodes[i]);
        if (val != "") return val;
    }
    return "";
}
function Page_ClientValidate(validationGroup) {
    Page_InvalidControlToBeFocused = null;
    if (typeof(Page_Validators) == "undefined") {
        return true;
    }
    var i;
    for (i = 0; i < Page_Validators.length; i++) {
        ValidatorValidate(Page_Validators[i], validationGroup, null);
    }
    ValidatorUpdateIsValid();
    ValidationSummaryOnSubmit(validationGroup);
    Page_BlockSubmit = !Page_IsValid;
    return Page_IsValid;
}
function ValidatorCommonOnSubmit() {
    Page_InvalidControlToBeFocused = null;
    var result = !Page_BlockSubmit;
    if ((typeof(window.event) != "undefined") && (window.event != null)) {
        window.event.returnValue = result;
    }
    Page_BlockSubmit = false;
    return result;
}
function ValidatorEnable(val, enable) {
    val.enabled = (enable != false);
    ValidatorValidate(val);
    ValidatorUpdateIsValid();
}
function ValidatorOnChange(event) {
    event = event || window.event;
    Page_InvalidControlToBeFocused = null;
    var targetedControl;
    if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
        targetedControl = event.srcElement;
    }
    else {
        targetedControl = event.target;
    }
    var vals;
    if (typeof(targetedControl.Validators) != "undefined") {
        vals = targetedControl.Validators;
    }
    else {
        if (targetedControl.tagName.toLowerCase() == "label") {
            targetedControl = document.getElementById(targetedControl.htmlFor);
            vals = targetedControl.Validators;
        }
    }
    if (vals) {
        for (var i = 0; i < vals.length; i++) {
            ValidatorValidate(vals[i], null, event);
        }
    }
    ValidatorUpdateIsValid();
}
function ValidatedTextBoxOnKeyPress(event) {
    event = event || window.event;
    if (event.keyCode == 13) {
        ValidatorOnChange(event);
        var vals;
        if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
            vals = event.srcElement.Validators;
        }
        else {
            vals = event.target.Validators;
        }
        return AllValidatorsValid(vals);
    }
    return true;
}
function ValidatedControlOnBlur(event) {
    event = event || window.event;
    var control;
    if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
        control = event.srcElement;
    }
    else {
        control = event.target;
    }
    if ((typeof(control) != "undefined") && (control != null) && (Page_InvalidControlToBeFocused == control)) {
        control.focus();
        Page_InvalidControlToBeFocused = null;
    }
}
function ValidatorValidate(val, validationGroup, event) {
    val.isvalid = true;
    if ((typeof(val.enabled) == "undefined" || val.enabled != false) && IsValidationGroupMatch(val, validationGroup)) {
        if (typeof(val.evaluationfunction) == "function") {
            val.isvalid = val.evaluationfunction(val);
            if (!val.isvalid && Page_InvalidControlToBeFocused == null &&
                typeof(val.focusOnError) == "string" && val.focusOnError == "t") {
                ValidatorSetFocus(val, event);
            }
        }
    }
    ValidatorUpdateDisplay(val);
}
function ValidatorSetFocus(val, event) {
    var ctrl;
    if (typeof(val.controlhookup) == "string") {
        var eventCtrl;
        if ((typeof(event) != "undefined") && (event != null)) {
            if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
                eventCtrl = event.srcElement;
            }
            else {
                eventCtrl = event.target;
            }
        }
        if ((typeof(eventCtrl) != "undefined") && (eventCtrl != null) &&
            (typeof(eventCtrl.id) == "string") &&
            (eventCtrl.id == val.controlhookup)) {
            ctrl = eventCtrl;
        }
    }
    if ((typeof(ctrl) == "undefined") || (ctrl == null)) {
        ctrl = document.getElementById(val.controltovalidate);
    }
    if ((typeof(ctrl) != "undefined") && (ctrl != null) &&
        (ctrl.tagName.toLowerCase() != "table" || (typeof(event) == "undefined") || (event == null)) && 
        ((ctrl.tagName.toLowerCase() != "input") || (ctrl.type.toLowerCase() != "hidden")) &&
        (typeof(ctrl.disabled) == "undefined" || ctrl.disabled == null || ctrl.disabled == false) &&
        (typeof(ctrl.visible) == "undefined" || ctrl.visible == null || ctrl.visible != false) &&
        (IsInVisibleContainer(ctrl))) {
        if ((ctrl.tagName.toLowerCase() == "table" && (typeof(__nonMSDOMBrowser) == "undefined" || __nonMSDOMBrowser)) ||
            (ctrl.tagName.toLowerCase() == "span")) {
            var inputElements = ctrl.getElementsByTagName("input");
            var lastInputElement  = inputElements[inputElements.length -1];
            if (lastInputElement != null) {
                ctrl = lastInputElement;
            }
        }
        if (typeof(ctrl.focus) != "undefined" && ctrl.focus != null) {
            ctrl.focus();
            Page_InvalidControlToBeFocused = ctrl;
        }
    }
}
function IsInVisibleContainer(ctrl) {
    if (typeof(ctrl.style) != "undefined" &&
        ( ( typeof(ctrl.style.display) != "undefined" &&
            ctrl.style.display == "none") ||
          ( typeof(ctrl.style.visibility) != "undefined" &&
            ctrl.style.visibility == "hidden") ) ) {
        return false;
    }
    else if (typeof(ctrl.parentNode) != "undefined" &&
             ctrl.parentNode != null &&
             ctrl.parentNode != ctrl) {
        return IsInVisibleContainer(ctrl.parentNode);
    }
    return true;
}
function IsValidationGroupMatch(control, validationGroup) {
    if ((typeof(validationGroup) == "undefined") || (validationGroup == null)) {
        return true;
    }
    var controlGroup = "";
    if (typeof(control.validationGroup) == "string") {
        controlGroup = control.validationGroup;
    }
    return (controlGroup == validationGroup);
}
function ValidatorOnLoad() {
    if (typeof(Page_Validators) == "undefined")
        return;
    var i, val;
    for (i = 0; i < Page_Validators.length; i++) {
        val = Page_Validators[i];
        if (typeof(val.evaluationfunction) == "string") {
            eval("val.evaluationfunction = " + val.evaluationfunction + ";");
        }
        if (typeof(val.isvalid) == "string") {
            if (val.isvalid == "False") {
                val.isvalid = false;
                Page_IsValid = false;
            }
            else {
                val.isvalid = true;
            }
        } else {
            val.isvalid = true;
        }
        if (typeof(val.enabled) == "string") {
            val.enabled = (val.enabled != "False");
        }
        if (typeof(val.controltovalidate) == "string") {
            ValidatorHookupControlID(val.controltovalidate, val);
        }
        if (typeof(val.controlhookup) == "string") {
            ValidatorHookupControlID(val.controlhookup, val);
        }
    }
    Page_ValidationActive = true;
}
function ValidatorConvert(op, dataType, val) {
    function GetFullYear(year) {
        var twoDigitCutoffYear = val.cutoffyear % 100;
        var cutoffYearCentury = val.cutoffyear - twoDigitCutoffYear;
        return ((year > twoDigitCutoffYear) ? (cutoffYearCentury - 100 + year) : (cutoffYearCentury + year));
    }
    var num, cleanInput, m, exp;
    if (dataType == "Integer") {
        exp = /^\s*[-\+]?\d+\s*$/;
        if (op.match(exp) == null)
            return null;
        num = parseInt(op, 10);
        return (isNaN(num) ? null : num);
    }
    else if(dataType == "Double") {
        exp = new RegExp("^\\s*([-\\+])?(\\d*)\\" + val.decimalchar + "?(\\d*)\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        if (m[2].length == 0 && m[3].length == 0)
            return null;
        cleanInput = (m[1] != null ? m[1] : "") + (m[2].length>0 ? m[2] : "0") + (m[3].length>0 ? "." + m[3] : "");
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);
    }
    else if (dataType == "Currency") {
        var hasDigits = (val.digits > 0);
        var beginGroupSize, subsequentGroupSize;
        var groupSizeNum = parseInt(val.groupsize, 10);
        if (!isNaN(groupSizeNum) && groupSizeNum > 0) {
            beginGroupSize = "{1," + groupSizeNum + "}";
            subsequentGroupSize = "{" + groupSizeNum + "}";
        }
        else {
            beginGroupSize = subsequentGroupSize = "+";
        }
        exp = new RegExp("^\\s*([-\\+])?((\\d" + beginGroupSize + "(\\" + val.groupchar + "\\d" + subsequentGroupSize + ")+)|\\d*)"
                        + (hasDigits ? "\\" + val.decimalchar + "?(\\d{0," + val.digits + "})" : "")
                        + "\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        if (m[2].length == 0 && hasDigits && m[5].length == 0)
            return null;
        cleanInput = (m[1] != null ? m[1] : "") + m[2].replace(new RegExp("(\\" + val.groupchar + ")", "g"), "") + ((hasDigits && m[5].length > 0) ? "." + m[5] : "");
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);
    }
    else if (dataType == "Date") {
        var yearFirstExp = new RegExp("^\\s*((\\d{4})|(\\d{2}))([-/]|\\. ?)(\\d{1,2})\\4(\\d{1,2})\\.?\\s*$");
        m = op.match(yearFirstExp);
        var day, month, year;
        if (m != null && (((typeof(m[2]) != "undefined") && (m[2].length == 4)) || val.dateorder == "ymd")) {
            day = m[6];
            month = m[5];
            year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
        }
        else {
            if (val.dateorder == "ymd"){
                return null;
            }
            var yearLastExp = new RegExp("^\\s*(\\d{1,2})([-/]|\\. ?)(\\d{1,2})(?:\\s|\\2)((\\d{4})|(\\d{2}))(?:\\s\u0433\\.|\\.)?\\s*$");
            m = op.match(yearLastExp);
            if (m == null) {
                return null;
            }
            if (val.dateorder == "mdy") {
                day = m[3];
                month = m[1];
            }
            else {
                day = m[1];
                month = m[3];
            }
            year = ((typeof(m[5]) != "undefined") && (m[5].length == 4)) ? m[5] : GetFullYear(parseInt(m[6], 10));
        }
        month -= 1;
        var date = new Date(year, month, day);
        if (year < 100) {
            date.setFullYear(year);
        }
        return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate()) ? date.valueOf() : null;
    }
    else {
        return op.toString();
    }
}
function ValidatorCompare(operand1, operand2, operator, val) {
    var dataType = val.type;
    var op1, op2;
    if ((op1 = ValidatorConvert(operand1, dataType, val)) == null)
        return false;
    if (operator == "DataTypeCheck")
        return true;
    if ((op2 = ValidatorConvert(operand2, dataType, val)) == null)
        return true;
    switch (operator) {
        case "NotEqual":
            return (op1 != op2);
        case "GreaterThan":
            return (op1 > op2);
        case "GreaterThanEqual":
            return (op1 >= op2);
        case "LessThan":
            return (op1 < op2);
        case "LessThanEqual":
            return (op1 <= op2);
        default:
            return (op1 == op2);
    }
}
function CompareValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    var compareTo = "";
    if ((typeof(val.controltocompare) != "string") ||
        (typeof(document.getElementById(val.controltocompare)) == "undefined") ||
        (null == document.getElementById(val.controltocompare))) {
        if (typeof(val.valuetocompare) == "string") {
            compareTo = val.valuetocompare;
        }
    }
    else {
        compareTo = ValidatorGetValue(val.controltocompare);
    }
    var operator = "Equal";
    if (typeof(val.operator) == "string") {
        operator = val.operator;
    }
    return ValidatorCompare(value, compareTo, operator, val);
}
function CustomValidatorEvaluateIsValid(val) {
    var value = "";
    if (typeof(val.controltovalidate) == "string") {
        value = ValidatorGetValue(val.controltovalidate);
        if ((ValidatorTrim(value).length == 0) &&
            ((typeof(val.validateemptytext) != "string") || (val.validateemptytext != "true"))) {
            return true;
        }
    }
    var args = { Value:value, IsValid:true };
    if (typeof(val.clientvalidationfunction) == "string") {
        eval(val.clientvalidationfunction + "(val, args) ;");
    }
    return args.IsValid;
}
function RegularExpressionValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    var rx = new RegExp(val.validationexpression);
    var matches = rx.exec(value);
    return (matches != null && value == matches[0]);
}
function ValidatorTrim(s) {
    var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}
function RequiredFieldValidatorEvaluateIsValid(val) {
    return (ValidatorTrim(ValidatorGetValue(val.controltovalidate)) != ValidatorTrim(val.initialvalue))
}
function RangeValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    return (ValidatorCompare(value, val.minimumvalue, "GreaterThanEqual", val) &&
            ValidatorCompare(value, val.maximumvalue, "LessThanEqual", val));
}
function ValidationSummaryOnSubmit(validationGroup) {
    if (typeof(Page_ValidationSummaries) == "undefined")
        return;
    var summary, sums, s;
    var headerSep, first, pre, post, end;
    for (sums = 0; sums < Page_ValidationSummaries.length; sums++) {
        summary = Page_ValidationSummaries[sums];
        summary.style.display = "none";
        if (!Page_IsValid && IsValidationGroupMatch(summary, validationGroup)) {
            var i;
            if (summary.showsummary != "False") {
                summary.style.display = "";
                if (typeof(summary.displaymode) != "string") {
                    summary.displaymode = "BulletList";
                }
                switch (summary.displaymode) {
                    case "List":
                        headerSep = "<br>";
                        first = "";
                        pre = "";
                        post = "<br>";
                        end = "";
                        break;
                    case "BulletList":
                    default:
                        headerSep = "";
                        first = "<ul>";
                        pre = "<li>";
                        post = "</li>";
                        end = "</ul>";
                        break;
                    case "SingleParagraph":
                        headerSep = " ";
                        first = "";
                        pre = "";
                        post = " ";
                        end = "<br>";
                        break;
                }
                s = "";
                if (typeof(summary.headertext) == "string") {
                    s += summary.headertext + headerSep;
                }
                s += first;
                for (i=0; i<Page_Validators.length; i++) {
                    if (!Page_Validators[i].isvalid && typeof(Page_Validators[i].errormessage) == "string") {
                        s += pre + Page_Validators[i].errormessage + post;
                    }
                }
                s += end;
                summary.innerHTML = s;
                window.scrollTo(0,0);
            }
            if (summary.showmessagebox == "True") {
                s = "";
                if (typeof(summary.headertext) == "string") {
                    s += summary.headertext + "\r\n";
                }
                var lastValIndex = Page_Validators.length - 1;
                for (i=0; i<=lastValIndex; i++) {
                    if (!Page_Validators[i].isvalid && typeof(Page_Validators[i].errormessage) == "string") {
                        switch (summary.displaymode) {
                            case "List":
                                s += Page_Validators[i].errormessage;
                                if (i < lastValIndex) {
                                    s += "\r\n";
                                }
                                break;
                            case "BulletList":
                            default:
                                s += "- " + Page_Validators[i].errormessage;
                                if (i < lastValIndex) {
                                    s += "\r\n";
                                }
                                break;
                            case "SingleParagraph":
                                s += Page_Validators[i].errormessage + " ";
                                break;
                        }
                    }
                }
                alert(s);
            }
        }
    }
}
