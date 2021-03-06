﻿/*
调用组件用new，this指向组件本身，不用new时指向window
function base(){
base.prototype={
init(){
    console.log('base.prototype.init')
}
}
}
console.log(typeof module === "object" && typeof module.exports === "object")
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports =base
}
*/
var C = {
    Slice: Array.prototype.slice,
    /* 判断传入对象是否为数组 */
    isArr: function (o) {
        return Object.prototype.toString.apply(o) === '[object Array]';
    },
    /*arr.push.apply(arr,C.Gn(nm));
	sliceC考虑用数组对象arr的push方法取代
	*/
    sliceC: function (arr) {
        var a = [];
        a.push.apply(a,arr);
        // for (var i = 0; i < arr.length; i++) {
        // a.push(arr[i]);
        // }
        return a;
    },
    /* 获取并返回传入id的对象 */
    G: function (Id) {
        return typeof (Id) == "string" ? document.getElementById(Id) : Id;
    },
    /*创建并返回传入标签名的元素 */
    Ce: function (Tag) {
        return document.createElement(Tag);
    },
    u: function () {
        return Cookie("u");//sessionStorage.getItem("u");//晚些完成stor.js
    },
    hsu:function(){
        return C.u()!=null;
    },
    //获取当前用户对象
    cu: function () {console.log(C.cu.caller, C.cu.caller.arguments[0])
        if (C.hsu())
        {
            window.cu = JSON.parse(C.u())
            return window.cu;
        }
        else //if(i>0)
        {
            //设置提示信息：并登录成功后回调原来的方法，或者两个弹框
            lgb.tit = "为了您的信息安全，请再次登录";
            //lgb.cb = (function (f) { return function () { f(); pop.close(); } })(C.cu.caller);
             lgb.cb = (function (f,a) {alert(456); return function () {alert(789); f(a); pop.close(); } })(C.cu.caller, C.cu.caller.arguments[0]);
            pop.pop(lgb);
           //  return;
           return false;
           // if(!window.onload)
           // C.AddEvent(window, "load", function () { pop.pop(lgb); })
        }
            /*
        else if(location.pathname!="/login")
        {
            console.log("sessionStorage中不含key为u的对象");
            pop.pop(lgb)
        }*/
    },
    //var a = { b: (function () { return 12 }()) }; a.b
    /* 获取并返回传入document的body元素 */
    Bd: function (d) {
        var d = d || document;
        if(!d.body)
        d.body=C.Gs(d.documentElement, "body")[0]
        return d.body;
    },
    natural: function (img, cb) {
            if (img.naturalWidth)
                cb({w:img.naturalWidth,h:img.naturalHeight});//这里可同步获取，故可以不用cb
           else { // IE6/7/8
                var ti = new Image();
                ti.onload = function () {
                    cb({ w: ti.width, h: ti.height });
                }
                ti.src = img.src;
            }
    },
    /* 获取并返回传入Name的集合对象*/
    Gn: function (Nm, Tg) {
        var a = document.getElementsByName(Nm);
        if (Tg) {
            var es = document.getElementsByTagName(Tg),
                arr = new Array();
            for (var i = 0; i < es.length; i++) {
                var e = es[i];
                if (C.Attr(e, "name") == Nm) {
                    arr.push(e);
                }
            }
            a = arr;
        }
        return a;
    },
    /* 获取并返回传入对象的name的值*/
    Gnm: function (o) {
        return o.name || C.Attr(o, "name");
    },
    /* 获取并返回传入对象和传入标签子元素的数组 */
    Gs: function (prt, tg, Progeny) {
        var prt = typeof prt == "string" ? C.G(prt) : prt,
		         Childs = new Array(),
		         Ds = prt.getElementsByTagName(tg),
                 Progeny = !Progeny ? false : true;
        for (var i = 0; i < Ds.length; i++) {
            if (Ds[i].parentNode == prt || Progeny) {
                Childs.push(Ds[i]);
            }
        }
        return Childs;
    },

    /* 获取并返回具有传入样式名的元素的数组 */
    Cls: function (ClsNm, Tag, Prt) {
        var Tags = Tag || "*",
        Prt = C.G(Prt) || document,
        Reg = new RegExp("(^| )" + ClsNm + "( |$)"),
        t = C.Gs(Prt, Tags, true),
        Arr = [];
        for (var i = 0; i < t.length; i++) {
            if (Reg.test(t[i].className)) {
                Arr.push(t[i]);
            }
        }
        return Arr;
    },
    /*兼容获取传入元素的className*/
    clsNm:function(o){
        return o.getAttribute("class") || o.getAttribute("className")
    },
    /* 浏览器是否为IE,且版本为IE8或以下 */
    ie8:function ()
    {
        return navigator.appName=="Microsoft Internet Explorer"&&parseFloat(navigator.appVersion)<5
    },
    /*全局rt
    弹出全局提示框,约定html中已定义了id为rt的元素
    t:弹出文本，s:弹出s(秒)
    */
    rt: function (t, s) {
        if(t==true||t==undefined)
        {
            t = "操作成功";
        }
        else if (t == false)
        {
            t = "操作失败";
        }
        if (!s) s = 3;//默认弹出三秒后关闭
        if (!rt) rt = C.G("rt");
       // if (!t) t = "操作成功";
        rt.innerText =t;
        rt.style.display = "block";
        setTimeout(function () {rt.style.display = "none"; }, s*1000);
    },
    /*请求源
        iPhone|iPad|iPod|iOS|
        系统
        os:0、未知；1、android；2、ios:
        h5所在环境
        env:0、未知；1、微信；2、小程序；3、app；
        */
    from: function (t) //t:缺省仅取os，1：只取os，2：os、evn均取
    {
        if (C.from.r) return C.from.r;
        var r = {
            os: 0,
            env: 0
        },
          ua = navigator.userAgent,
          reg = /(sy[ab])(\d+)[_](\w{32})?/,//该规则与移动组约定
          ar = ua.match(reg);
        if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
            r.os = 1;
        } else if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) //可以再细分：iPhone|iPad|iPod|iOS
        {
            r.os = 2;
        }
        if (window.__wxjs_environment === 'miniprogram' || /miniProgram/i.test(ua)) {
            r.env = 2;
        }
        else if (ua.match(/micromessenger/i)) {
            r.env = 1;
            //非微信，后面扩展
        }
            /*env是环境，非来源，不应在此处，个性化处理不应该在公用文件内，且项目中未使用 qin190226
            else if(this.param('loginFrom') === 'gygw' || window.sessionStorage.getItem('gygw_login_code')){
              r.env = 5
            }*/
        else if (ar)//新版app中自定义的ua信息数据；1:sya/syb代表android/ios,2:build码，3:token
        {
            r.env = 3;
            r.appua = C.sliceC(ar);
            //console.log(r.appua[2])
            //r.appua =JSON.parse(ar);
        }
        else//老版本不包含该ua标识，须调取appInfo判断app内
            r.toapp = 1
        C.env = r.env;
        return r;
    },
    /* 获取并选回radio选定的元素     */
    radio: function (nm) {
        var es = C.Gn(nm);
        for (var i = 0; i < es.length; i++) {
            t = es[i];
            if (t.checked)
                return t;//.value;
        }
    },
    /* 为传入元素设置T属性和L属性，其值分别为该元素相对于Body元素的偏移量offsetTop和offsetLeft */
    Lt: function (o) {
        o.L = o.offsetLeft;
        o.T = o.offsetTop;
        var Ele = o;
        // while (Ele.offsetParent.tagName.toLowerCase() != "body")
        while (Ele.offsetParent&&Ele.offsetParent.tagName.toLowerCase() != "body") {
			            Ele = Ele.offsetParent;
			var pst=C.Css(Ele,"position");
			if(pst&&pst!=("absolute"))/*relative是否也要过滤？*/
			{
            o.L += Ele.offsetLeft;
		o.T += Ele.offsetTop;
		}
        }
    },
	/*在t对象下方显示提示信息*/
	Sr:function(t)
	{
		var t=C.G(t);
						C.Lt(t)
		/*// if(dw&&dw.offsetLeft<0)
	    // t.L=t.L-dw.offsetLeft;*/
						t.Rpt.style.left=t.L+"px";
						t.Rpt.style.top=t.T+t.offsetHeight+3+"px";
						t.Rpt.style.left=t.L+"px";
	},
	/*获取对象o在css中的a属性的值，也可指定伪类w*/
	Css:function(o,a,w){
            return (getComputedStyle(o,w)[a]);ha
	},

    /* 获取并返回传入元素的上一个非空元素 */
    Pre: function (Ele) {
        return C.Sbl(Ele, "previousSibling");
    },

    /* 获取并返回传入元素的下一个非空元素 */
    Nxt: function (Ele) {
        return C.Sbl(Ele, "nextSibling");
    },
    /* 获取并返回传入父元素的第一个标签元素 firstElementChild
    t为指定的标签名
    */
    fe: function (p,t) {
        var e=p.firstElementChild;
        if(!e)
        {
            e=p.firstChild;
            if(e.nodeType==3)
                e=C.Nxt(e);
        }
        while (t && e.tagName.toLowerCase() != t) {
            e=C.Nxt(e)
            }
        return e;
    },

    /* 获取并返回传入元素的上一个或下一个非空元素 */
    Sbl: function (Ele, Fn) {
        var E = Ele[Fn];
        while (E && (E.nodeType != 1))/*while (E && (E.nodeType != 1 && E.nodeType != 3))*/ {
            E = E[Fn];
        }
        return E;
    },

    /* 获取并返回传入字符串所字义的Json对象 */
    Json: function (Str) {
        if (typeof (Str) == "object")
        return Str;
        else if (Str) {
return eval(Str.startsWith("{") ? "(" + Str + ")" : "({" + Str + "})")
        }
		/*IE7及以下好像不支持
		JSON.parse(jsonstr); //将json字符串转换成json对象 
		JSON.stringify(jsonobj); //将json对象转换成json对符串 
		*/
    },
    /*html转码*/
    htmlEncode: function (html) {
        var temp = document.createElement("div");
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    /*html解码*/
    htmlDecode: function (text) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },
    /* 获取并返回传入对象的p属性,如果元素没有该属性, 则为其添加，且其值为空对象*/
    Pt: function (o) {
        if (!o.ps) {
            var p = C.Attr(o, "p");
            o.ps = C.Json(p);
            o = p ? o.ps : {};
        }
        return o;
    },
    /* 判断元素是否为包含关系*/
    Contains: function (parentNode, childNode) {
        if (parentNode.contains) {
            return parentNode != childNode && parentNode.contains(childNode);
        } else {
            return !!(parentNode.compareDocumentPosition(childNode) & 16);
        }
    },

    /* 获取传入td对应的tr、table */
    table: function (td) {
        var tr = td.parentNode,
            tb = tr.parentNode;
        if (tb.tagName == "TBODY")
            tb = tb.parentNode;
        return { tr: tr, tb: tb };
    },
    /* 获取传入tr中的td数组 
    tds: function (tr) {
        return C.Gs("tr", "td");
    },
    */
    /* 获取传入td对应的tr、table */
    rpt: function (o, r) {
        if (o.code > 1) {
            cls = "ok"
            dc = "no";
        }
        else {
            cls = "no"
            dc = "ok";
        }
        C.DelClass(r, dc);
        C.AddClass(r, cls);
        r.innerHTML = o.msg;
        r.style.visibility = "visible";
    },
	    //将传入字符串中引用的js加载到页面中
    exjs: function (s) {
		/*
		var p=C.Ce("p"),
		 b = C.Bd();
		p.innerHTML=s;
		var st=C.Gs(p,"script");
		p=null;
		for(var i=0;i<st.length;i++)
		{
			var s=st[i];
		 b.appendChild(s);
		s.onload=function(){console.log("onload");eval(s.innerHTML);}
		 }
		return false;
		*/
        var rgx = /<script\b.*?(?:\bsrc\s?=\s?"([^>]*)")?>([\s\S]*?)<\/script>/ig,
        ss,
        b = C.Bd(),
        run = C.Ce('script'),
        rjs = '';
        var i = 0;
        while (ss = rgx.exec(s)) {
            var js = C.Ce('script'),
            src = ss[1];
            if (src)
			{
                key = src.slice(src.lastIndexOf('/') + 1, -3);
                if (key == 'Base')
                    key = 'C';
                /*该对象不存在时，设置src属性，js文件名须与文件中js组件对象名相同*/
                if (!window[key]) {
                    js.src = src;
                   b.appendChild(js);//重复 
                }
               C.exjs.pre = js;//上一个script标记
            }
            else if (ss[2])
			{/*无src的script*/
                var t = ss[2];
                //eval(t);
			if(C.exjs.pre&&C.exjs.pre.src!="")//||typeof C.exjs.pre.onload!="undefined"
			{
				if(typeof C.exjs.pre.onload!="undefined")
				{
				    rjs += t;
				 C.exjs.pre.onload = function ()
				 {
				     //eval(t);
				     js.appendChild(document.createTextNode(rjs));
				     b.appendChild(js);// 重复
                     
					};	
				}
				else
				{/*ie9以下*/
					C.exjs.pre.onreadystatechange=function(){
						console.log(C.exjs.pre.readyState);
						if(C.exjs.pre.readyState == "complete"||C.exjs.pre.readyState == "loaded")
						{
							execScript(t);
						//js.appendChild(document.createTextNode(t));
						//js.innerHTML=t;
						//b.appendChild(js);// 重复
						}
					};
				}
			}
			else// if(C.exjs.pre.src==""||typeof C.exjs.pre.onload=="undefined")/*||typeof C.exjs.pre.onload=="undefined" for ie7、8*/
			{
				//if(navigator.appName!="Microsoft Internet Explorer"&&parseFloat(navigator.appVersion)<5)
                /* 换成append形式
			    if (!C.ie8())
					eval(t);
				else
				    execScript(t);
*/
			    run.innerHTML += t;
				//b.appendChild(js);
				// if()
				// {
					
				// }
			}
			/*else
                C.exjs.pre.onload = function ()
                {
					eval(t);
                    js.appendChild(document.createTextNode(t));
                    b.appendChild(js);// 重复
                }	*/
				//eval(t);//ie9以下执行
            }	
			
			
        }
        //b.appendChild(run);
        b.insertBefore(run,gr);
    },
    /* 隐藏元素 */
    Hide: function (Id) {
        var oE = C.G(Id),
        H = oE.offsetHeight;
        if (H > 0) {
            H--;
        }
        else {
            return;
        }
        oE.style.height = H + "px";
        setTimeout(function () { C.Hide(Id) }, 100);
    },

    /* 显示元素 */
    Show: function (Id) {
        var oE = C.G(Id),
        Max = parseInt(Id.substring(2));
        oE.style.height = !oE.style.height ? "0px" : oE.style.height;
        Ch = parseInt(oE.style.height.slice(0, -2));
        if (Ch < Max) {
            Ch++;
            oE.style.height = Ch + "px";
            setTimeout(function () { C.Show(Id) }, 0);
        }
    },

/*遍历二维数组
arr:二维数组；fa(a,i)：一维元素处理函数,a是回归的一维元素，i是a的索引，fb：二维元素处理函数
*/
    each:function(arr, fa, fb) {
    for (var i = 0; i < arr.length; i++) {
        var a= arr[i];
        //ar.i=i;
        fa(a, i);
        if(fb)
        for (var j = 0; j < a.length; j++) {
            //var a = ar[j];
            //a.pi = i;
            //console.log('a.pi',a.pi)
            //a.i = j;
                fb(a[j], j, i);

        }

    }
},
    /* 用该方法调用函数的原型初始化方法Init，批处理该方法调用函数的实参对象 */
    /* 用该方法调用函数的原型初始化方法Init，批处理该方法调用函数的实参对象
    es6严格模式禁用了caller和arguments,可显式传入Cl,arg
    */
    Batch: function (Cl, arg) {
        if (!Cl) {
            Cl = C.Batch.caller,
            arg = Cl.arguments;
        }
       /* if (!Cl.Initialized) {*/
            var Ns = [],
			oa = [];/*以name为参数对应的元素数组*/
            for (var j = 0; j < arg.length; j++)
			{
                var a = arg[j];
                if (typeof a == "string") {
                    if (Cl.Hn && a.slice(-2).toLowerCase() == "nm")/*组件允许接收以name为参数*/
					{
                        oa = oa.concat(C.sliceC(C.Gn(a)));
                    }
                    else {
                        Ns.push(a);//Ns = C.Slice.apply(arg);C.G(a)
                    }
                }
				else if (!a.length)
				{
				    Ns.push(a);/*Ns = C.Slice.apply(arg);C.G(a)*/
				}
                else if (!a.nodeType) {/*接收到的参数类型为集合、数组*/
                    /*//var arr=C.sliceC(a);
                    //Ns = Ns.concat(arr);
                    //		 oa=oa.concat(C.sliceC(C.Gn(a)));
                    //arr1.push.apply(arr1, [4, 5]);*/
                    if (a.p) {
                        for (var i = 0; i < a.length; i++) {
                            a[i].p = a.p;
                        }
                    }
                    Ns.push.apply(Ns, a);

                }
            }
            if (oa.length) {
                Ns = Ns.concat(oa);
            }
            for (var i = 0; i < Ns.length; i++) {
                var n = Ns[i],
                    o = C.G(n);
				if(!o.Initialized)
                Cl.prototype.Init(o);
				o.initialized=true;
            }
			/*
            Cl.Initialized = true;
        }*/
    },
    /* 获取传入元素的当前样式对象 */
    style: function (o) {
        return document.defaultView.getComputedStyle(o) || o.currentStyle;
        //return getComputedStyle(o) || o.currentStyle;
    },

    AttrStyle: function (Elem, Attr) {
        if (Elem.Attr) {
            return Elem.style[Attr];
        } else if (Elem.currentStyle) {
            return Elem.currentStyle[Attr];
        } else if (document.defaultView && document.defaultView.getComputedStyle) {
            Attr = Attr.replace(/([A-Z])/g, '-$1').toLowerCase();
            return document.defaultView.getComputedStyle(Elem, null).getPropertyValue(Attr);
        } else {
            return null;
        }
    },

    /*将传入的第二个元素的高度设成与等一个元素等高 */
    eh: function (a, b) {
        var a = C.G(a),
            b = C.G(b);
        b.style.height = a.offsetHeight + "px";
    },
    /* 设置传入元素等高 */
    Ehs: function () {
        var Es = [],
        Hs = [];
        for (var i = 0; i < arguments.length; i++) {
            var El = C.G(arguments[i]);
            if (El.nodeType == 1) {
                Es.push(El);
                Hs.push(El.clientHeight);
            }
        }
        for (var j = 0; j < Es.length; j++) {
            Es[j].style.height = Hs.sort(function (a, b) { return b - a; })[0] + "px";
        }
    },
    /* 将传入iFrame的高度设为载入文档的实际高度 */
    Fi: function (Id) {
        var F = C.G(Id),
        Vh = C.Gs(F.contentWindow.document.documentElement, "body")[0].clientHeight;
        F.style.height = Vh + "px";
    },

    /* 获取并返回时间 */
    Ts: function () {
        return "timestamp=" + new Date().getTime().toString();
    },
    /* 获取并返回触发事件的对象*/
    Ge: function (e) {
        var e = e || window.event,
               mt = e.target || e.toElement;
			   /*
			   vartarget=e.target||e.srcElement;
　　varrelatedTarget=e.relatedTarget||e.fromElement;
			   */
        return mt;
    },
    /*是否支持触摸事件*/
    touch:"ontouchend" in document.documentElement,/* function (e) {
        return "ontouchend" in document.documentElement ? true : false;
    },*/
    /* 为对象添加的事件监听  */
    AddEvent: function (obj, ev, fn,arg) {
        obj = C.G(obj);
        var f = fn,
		ags = arguments;//20180624
        if (arg!=undefined)
		{
           f = function(e) { 
		   //fn(arg,e);
		  //  var args=[arg,e];
		 var args=C.Slice.call(ags,3);/*取AddEvent第4个开始往后的实参，以便于支持事件处理函数传多个参数*/
		  args.push(e);/*并向其末尾添加事件对象e，鉴于很多事件处理函数并不需要事件对象e,故此版本中将其后置*/
		  // fn.call(null,arg,e);
		  fn.apply(null,args)
		   };//将e和arg换了位置，这样不需要使用e对象的函数可以只传arg
        }
		/*
        if (arguments.length>3) {
          //old:变更后使用了event对象的组件可能需要修改如Menus、Drags.  f = function (ev) { fn(ev, arg) };
		var fa=C.Slice.call(arguments,3);
		//fn.arguments=C.Slice.call(arguments,3);
		//if(!obj.f)//该判断是否有必要
		obj.f=function(){
		fa.push(arguments[0]);
		//fn.apply(f,fa)
		f.apply(null,fa)
		};

        }
		*/
        /*
        //if (arguments.length > 4)
        //{
        //    Ehd = function () { return function () { fn.apply(obj, C.Slice.call(arguments, 3)); }; }();
        //}
        */
        if (window.addEventListener) {
            obj.addEventListener(ev, f , false);
            //1、注册处理函数时，明确声明为非被动的window.addEventListener('touchmove', f, { passive: false })
        }
        else if (window.attachEvent) {
            obj.attachEvent("on" + ev,f );
        }
        else {
            obj["on" + ev] = obj.f;
        }
    },

    /* 删除对象的事件监听 */
    DelEvent: function (obj, ev, fn) {
        if (window.removeEventListener) {
            obj.removeEventListener(ev, fn, false);
        }
        else if (window.detachEvent) {
            obj.detachEvent("on" + ev, fn);
			/*dom.detachEvent("onpropertychange", evt);*/
        }
        else {
            obj["on" + ev] = null;
        }
    },
    /*// And don't let anyone else see this event.
    //    if (e.stopPropagation) e.stopPropagation();  // Standard
    //else e.cancelBubble = true;                  // IE*/

    /* 阻止事件冒泡 */
    StopBubble: function (e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            //window.event.cancelBubble = true;
            e.cancelBubble = true;
        }
    },

    /* 阻止事件默认行为 */
    PreventDefault: function (e) {
        if (e &&e.preventDefault) {
            e.preventDefault();
        }
        else {
            e.returnValue = false;
        }
		return false;
    },
    /*按回车键提交：fn指定回车事件处理函数，o可指定元素的focus时行为行条件元素*/
    enter: function (fn, o) {
        var o = o || document;
        if (!o.onkeydown)
            o.onkeydown = function (e)
            {
                var e = e || window.event;
                if (e.keyCode == 13) {
                    fn();
                }
            };
},
/*自定义事件并返回，参数:事件名称、是否冒泡、是否可取消的默认动作*/
	evt:function(nm,bb,cc)
	{
		if(!window.evt)
			window.evt={};/*自于存储自定义事件*/
		if(!window.evt[nm])
		{
		var e;
		if(document.createEvent)
		{
			e=document.createEvent("HTMLEvents");//new Event(nm);ie不支持//new Event(nm,{bubbles:bb,cancelable:cc});
			e.initEvent(nm,bb,cc);
		}
		else{
			e=document.createEventObject();
			e.bubbles=bb;
			e.cancelable=cc;
			e.type=nm;
			//a.attachEvent("on" + en,fun);
			//a.fireEvent("on"+en,oe)
		}
	window.evt[nm]=e;
}
	},
	/*触发对象的自定义事件*/
	trg:function(o,e)
	{
		if(o.dispatchEvent)
			o.dispatchEvent(e);
		else
			o.fireEvent("on"+e.type,e)
		//a["on"+e.type]=
	},
    /* 删除传入元素的class属性  */
    DelClass: function (M, Cn) {
        if (M) {
            if (typeof (M) == "string")
                M = C.G(M);
            var Cls = M.getAttribute("class") || M.getAttribute("className");
            if (Cls) {
                if (RegExp("^\\s*" + Cn + "\\s*$").test(Cls)) {
                    C.DelAttr(M, "className");
                    C.DelAttr(M, "class");
                }
                else {
                    M.className = Cls.replace(new RegExp("( ?|^)" + Cn + "\\b"), "");
                }
            }
        }
    },
    //
    /* 添加传入元素的class属性  */
    AddClass: function (M, Cn) {
        if (M) {
            if (typeof (M) == "string")
                M = C.G(M);
            var Cls = M.getAttribute("class") || M.getAttribute("className");
            if (Cls != null) {
                Cn = Cls.indexOf(Cn) == -1 ? Cls + " " + Cn : Cls;
            }
            M.className = Cn;
        }
    },

    /* 获取元素属性  */
    Attr: function (Id, Attr) {
        var obj = C.G(Id), oAttr;
        if (obj.getAttribute(Attr)) {
            oAttr = obj.getAttribute(Attr)
        }
        else if (obj.attributes[Attr]) {
            oAttr = obj.attributes[Attr];
        }
        return oAttr;
    },

    /* 删除元素属性  */
    DelAttr: function (Id, Attr) {
        var obj = C.G(Id), oAttr;
        if (obj.getAttribute(Attr)) {
            obj.removeAttribute(Attr);
        }
        else if (obj.attributes[Attr]) {
            obj.removeAttributeNode(obj.attributes[Attr]);
        }
    },
    /* 删除传入元素的style属性  */
    DelStyle: function (Ele) {
        if (Ele.getAttribute("style")) {
            Ele.removeAttribute("style");
        }
        else if (Ele.attributes["style"]) {
            Ele.removeAttributeNode(Ele.attributes["style"]);
        }
    },
    /* 全选和取消全选  */
    Sa: function (Sp, Intro) {
        var Sp = C.G(Sp),
        Cs = C.Gs(Sp, "input", true),
        Itr = null;
        if (Intro) {
            Itr = C.G(Intro); /* Itr如果是否包含在Cs中，则删除  */
        }
        else {
            switch (Sp.id.charAt(0).toUpperCase()) {
                case "F":
                    Itr = Cs.shift();
                    break;
                case "L":
                    Itr = Cs.pop();
                    break;
            }
        }
        C.AddEvent(Itr, "click", function () {
            for (var i = 0; i < Cs.length; i++) {
                if (Cs[i].type == "checkbox") {
                    Cs[i].checked = Itr.checked ? true : false;
                }
            }
        });
    },
	    /*  获取并返回传入select选中项 */
    So: function (o) {
        return o.options[o.selectedIndex];
    },

    /* 设置select选中和传入值相同的项 */
    Slcted: function (slct, v, vt) {
        for (var i = 0; i < slct.length; i++) {
            if ((vt ? slct.options[i].value : slct.options[i].text) == v) {
                slct.options[i].selected = true;
                break;
            }
        }
    },

    /* 创建并返回一个XMLHttpRequest对象  */
    XHR: function () {
        var XHR;
        try {
            XHR = new XMLHttpRequest();
        }
        catch (e1) {
            try {
                XHR = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e2) {
                try {
                    XHR = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e3) {
                    XHR = false;
                }
            }
        }
        return XHR;
    },
    /* 执行异步请求 暂未加入formdata异步上传文件*/
    EXHR: function (CallBack, Method, Url, Data, Proc, Async) {
        //console.log(arguments.callee.caller)
        var oXHR = this.XHR(),
            Rst = null,
            Junctor = Url.indexOf("?") != -1 ? "&" : "?";
        oXHR.onreadystatechange = function () {
            switch (oXHR.readyState) {
                case 0:
                    Rst = "请求未初始化";
                    break;
                case 1:
                    Rst = "服务器连接已建立";
                    break;
                case 2:
                    Rst = "请求已接收";
                    break;
                case 3:
                    Rst = "请求处理中";
                    break;
                case 4:
                    Rst = "请求已完成，且响应已就绪";
                    if (oXHR.status == 200) {
                        var Rsp = null,
                                 cType = oXHR.getResponseHeader("Content-Type");
                        /*//oXHR.getAllResponseHeaders
                        //获取服务端header里时间戳，在IE下必须做些特殊处理，需要在后端关闭缓存：header( 'Cache-Control: no-store');*/
                        if (cType && cType.indexOf("text/xml") != -1) { Rsp = oXHR.responseXML; }
                        else if (cType && (cType.indexOf("text/json") != -1 ||
                            /*//返回html时eval时会报错20160504 cType.indexOf("text/html") != -1 ||*/
                            cType.indexOf("text/javascript") != -1 ||
                            cType.indexOf("application/javascript") != -1 ||
                            cType.indexOf("application/json") != -1 ||
                            cType.indexOf("application/x-javascript") != -1)) {
                           /* //alert(typeof oXHR.responseText+oXHR.responseText+"\n"+ oXHR.responseText.slice(1,-1));*/


                            Rsp = eval('(' + oXHR.responseText + ')');//oXHR.responseText
                            /*//Rsp = JSON.parse(oXHR.responseText);*/
                        }
                        else {
                            Rsp = oXHR.responseText;
                            //C.exjs(Rsp);
                            //console.log(Rsp)
                        }
                        CallBack(Rsp);/*C.Json(Rsp)*/

                    /*    //CallBack(Rsp,oXHR);传入XHR可以使调用者使用xmlHttpRquest对象，如获取Headers等*/
                    }
                    break;
            }
            if (Proc) { Proc(Rst); }
        };
        Data = Method == "GET" ? null : Data;
        /*//Url += Junctor + "timeStamp=" + new Date().getTime();*/
        Async = Async != false ? true : false;
        oXHR.open(Method, encodeURI(Url), Async);
        //oXHR.setRequestHeader('ajax', 1);//标识为ajax请求
        //标识为ajax请求，此值若改，服务端C.http中也需要做对应修改
        oXHR.setRequestHeader('X-Requested-With', "XMLHttpRequest");
     /*   //oXHR.responseType = "msxml-document";//兼容IE10+版本，调用selectSingleNode类似方法*/
        if (Method == "POST") {
              oXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//formData//设了这个头request.files居然得不到文件
              //表单上传文件、formData必须指定编码类型为"multipart/form-data"，否则request.files得不到文件
           //oXHR.setRequestHeader("Content-type", "multipart/form-data");/**///payload
        }
        oXHR.send(Data);
    },
	/*返回Promise对象*/
	ajax:function(method,url,data,resolve,reject){
	//	'use strict';
    var request = new XMLHttpRequest();
    return new Promise(function ()//resolve, reject
	{
        request.onreadystatechange = function () {
            if (request.readyState === 4)
			{
                if (request.status === 200)
				{
                    resolve(request.responseText);
                } else
				{
                    reject(request.status);
                }
            }
        };
        request.open(method, url);
        request.send(data);
    });

	},
    /*ajax跨域兼容IE*/
    /*C.DXHR = function (fns, method, url, data, Proc, Async) {

        var suc = typeof fns == 'function' ? fns : (fns.suc ? fns.suc : null);
        var nData = (data.indexOf('?') == -1 && url.indexOf('?') == -1) ? '?' + data : data;

        try {
            url = method.toLowerCase() == 'get' ? url + data : url;

            C.EXHR(suc, method, url, data, Proc, Async);
        } catch (e) {
            //IE 789
            var xhr = new XDomainRequest();

            xhr.onload = function () {
                suc(xhr.responseText);
            };

            if (fns.err) { xhr.onerror = fns.err; }
            if (fns.oto) { xhr.ontimeout = fns.oto; };

            xhr.open(method, url + nData);
            xhr.send();
        }
    }，
    */
    /* Jsonp
        */
    Jsp: function (str) {
        var  //rUrl = bu ? bu : "../../ws/Wcf.svc/",/*站群系统中使用*/
        Jt = C.G("Cbf"),
        Jn = Jt.cloneNode(),
        Bd = C.Bd();// C.Gs(document.documentElement, "body")[0];
        Jn.src = str;/*bu + bu：各站点请求的基础url*/
        Jn.id = "cloneCbf";
        Bd.appendChild(Jn);
        /*window.Cb;声明jsonP回调函数*/
        //Bd.replaceChild(Jn, Jt);

        //setTimeout(function () { Jn.parentNode.removeChild(Jn) }, 5000)
        //Jn.parentNode.removeChild(Jn);
    },
    /* 加入收藏 */
    Collect: function (sUrl, Tit) {
        var sUrl = !sUrl ? document.URL : sUrl,
         Tit = !Tit ? document.title : Tit;
        try {
            window.external.addFavorite(sUrl, Tit);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(Tit, sUrl, "");
            }
            catch (eb) {
                alert("对不起，您所使用的浏览器不允许点击收藏!\n请使用Ctrl+D进行收藏。");
            }
        }
    },

    /* 设为首页 */
    SetHome: function (sUrl) {
        var sUrl = !sUrl ? document.URL : sUrl;
        try {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(sUrl);
        }
        catch (e) {
            alert("抱歉!您的浏览器不支持直接设为首页。您可通过浏览器 工具->选项->使用当前页->确定，完成设为首页。");
        }
    },
    /*
     p为格式化日期参数：1：XXXX年X月X日
     */
    date: function (p) {
        var d = new Date();
        d.y = d.getUTCFullYear();
        d.m = (d.getUTCMonth() + 1);
        d.ds = d.getUTCDate();
        d.h = d.getHours();//getUTCHours
        d.mt = d.getUTCMinutes();
        d.s = d.getUTCSeconds();
        d.w = ["日", "一", "二", "三", "四", "五", "六"][d.ds];
        if (p == 1)
            d.r = "{0}年{1}月{2}日".format(d.y, d.m, d.ds);
        return d;//"{0}{1}{2}{3}{4}{5}{6}".format(o.y + a, o.m + a, o.ds + a, o.h + b, o.mt + b, o.s + b, c + o.w);
    },
    /*将时间字符串转成date对象*/
    dateParse: function (s) {
        if(s){
        s = s.replace(/年|月|日/g, '/');
        return new Date(s);
    }
    },
    //获取两个时间间隔,精确到c=0:年、1:天、2:时、3:分、4:秒、5:时、6:转换成X天X时X分X秒
    tmSpan:function(a,b,c)
    {
        a = C.dateParse(a);
        b = C.dateParse(b);
        return Math.floor(Math.abs(Date.parse(a)-Date.parse(b))/(24*3600*1000));
    },
    /* 获取客户机日期并返回字符串
    传入ID的第一个字符代表不同时区： A:当前时区(北京) +8    B:伦敦 0    C:纽约 -9    D:东京 +9    E:芝加哥 -6
    传入ID的第二个字符代表不同的精确模式：D 精确到日期  W 星期 M为精确到分钟 S为精确到秒的时间
    */
    sDate: function () {
        this.Ts = arguments.length == 0 ? this.Ts : C.Slice.apply(arguments);
        var D = new Date,
        Wd = ["日", "一", "二", "三", "四", "五", "六"],
        Y = D.getUTCFullYear(),
        M = (D.getUTCMonth() + 1),
        Ds = D.getUTCDate(),
        H = D.getUTCHours(),
        Mt = D.getUTCMinutes(),
        S = D.getUTCSeconds(),
        W = Wd[D.getDay()];
        for (var i = 0; i < this.Ts.length; i++) {
            var Pl = C.G(this.Ts[i]),
            Str = "",
            Jetlag = -D.getTimezoneOffset(),
            J;
            switch (this.Ts[i].charAt(0).toUpperCase()) {
                case "A":
                    J = 8;
                    break;
                case "B":
                    J = 0;
                    break;
                case "C":
                    J = -4;
                    break;
                case "D":
                    J = 9;
                    break;
                case "E":
                    J = -5;
                    break;
            }
            H = D.getUTCHours() + J;
            if (H >= 24) {
                Ds += 1;
                H = H - 24;
            }
            else if (H < 0) {
                Ds -= 1;
                H += 24;
            }
            S = S.toString().length != 2 ? S = "0" + S : S;
            Mt = Mt.toString().length != 2 ? Mt = "0" + Mt : Mt;
            switch (this.Ts[i].charAt(1).toUpperCase()) {
                case "D":
                    Str = Y + "年" + M + "月" + Ds + "日";
                    break;
                case "W":
                    Str = Y + "年" + M + "月" + Ds + "日" + " 星期" + W;
                    break;
                case "M":
                    Str = H + ":" + Mt;
                    break;
                case "S":
                    Str = H + ":" + Mt + ":" + S;
                    break;
            }
            Pl.innerHTML = Str;
        }
        setTimeout(function () { C.sDate() }, 1000);
    },
    Contain: function (a, b) {
        //console.log(a.compareDocumentPosition(b));
        return a.contains ? a != b && a.contains(b) : a.compareDocumentPosition(b) == 16//!!(a.compareDocumentPosition(b) & 16);
    },
    /* 获取并返回get请求参数        */
    param: function (k, s) {
        if(!s)
		 s=location.search;
			if(k)
			{
				var z=k+"=",
				a=s.indexOf(z);
				if(a>0){
				var b=s.substring(a),
				c=b.indexOf("&");
				if(c==-1)
					c=undefined;
				 return b.substring(z.length,c);
				}
			}
			else
			{
        var ps = s.substring(1).split('&'),
            o = {};
        for (var i = 0; i < ps.length; i++) {
            var p = ps[i],
                k = p.split('=');
            o[k[0]] = k[1];
        }
        return o;
		}
    },
    /* 设置get请求参数，返回相对路径*/
    setParam: function (k, v, p) {
        var p = p || location.pathname + location.search,
          s = p.indexOf('?') > -1 ? '&' : '?',
          i = p.indexOf(k);
        if (i > -1) {
            var o = p.substring(i),
            e = o.indexOf("&"),
            n = o.substring(o.indexOf("=") + 1, e == -1 ? o.length : e);
            p = p.replace(n, v)
            // p.replace(i,v)
        }
        else
            p = p + s + k + '=' + v;
        return p;
    },
};
C["env"]=  C.env||C.from().env;
Function.prototype.Method = function (Nm, Fun) {
    if (!this.prototype[Nm]) {
        this.prototype[Nm] = Fun;
    }
};
String.Method("trim", function () { return this.replace(/^\s+|\s+$/g, ""); });
String.Method("endsWith", function (pattern) { var d = this.length - pattern.length; return d >= 0 && this.lastIndexOf(pattern) === d; });
String.Method("startsWith", function (pattern) { return this.slice(0, pattern.length) === pattern; });
String.Method("format", function (args) {
    var result = this;
    // if (arguments.length < 1) {
    // return result;
    // }
    var data = arguments;       //如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        //如果模板参数是对象
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replace("{" + key + "}", value);
        }
    }
    return result;
});
Array.Method("insert",function(i,o){this.splice(i, 0, o);});
Array.Method("contains", function (item) {
    for (i = 0; i < this.length; i++) {
        if (this[i] == item) { return true; }
    }
    return false;
})
/*
function stringFormat() {
         if (arguments.length == 0)
             return null;
         var str = arguments[0];
         for (var i = 1; i < arguments.length; i++) {
             var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
             str = str.replace(re, arguments[i]);
         }
         return str;
     } 
 
 StringFormat("&Type={0}&Ro={1}&lPlan={2}&Plan={3}&={4}&Id={5}&Id={6}", data1, data2, data3,data4, data5,data6,data7);
*/



//Element.Method("getElementsByName", function ()
//{
//    ;
//});
/*

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }

    var data = arguments;       //如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        //如果模板参数是对象
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replace("{" + key + "}", value);
        }
}
    return result;
}
//两种调用方式
var template1="我是{0}，今年{1}了";
var result1=template1.format("loogn",22);

var template2="我是{name}，今年{age}了";
var result2=template2.format({name:"loogn",age:22});

*/