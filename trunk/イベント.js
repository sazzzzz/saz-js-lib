//http://labo.shimi-zoo.com/?q=node/9
observeAndCache: function(element, name, observer, useCapture)
	{
		if (!this.observers) this.observers = [];
		if (element.addEventListener) {
		this.observers.push([element, name, observer, useCapture]);
		element.addEventListener(name, observer, useCapture);
	} else if (element.attachEvent) {
		this.observers.push([element, name, observer, useCapture]);
		element.attachEvent('on' + name, observer);
	}
}


//http://mykits.blog80.fc2.com/?q=attachEvent
function addEvent(obj, eventType, fn){
	if (obj.addEventListener){
		obj.addEventListener(eventType, fn, false);
		return true;
	}
	else if (obj.attachEvent){
		var r = obj.attachEvent("on"+eventType, fn);
		return r;
	}
	else {
		return false;
	}
}

//http://diaspar.jp/node/51
DXBL.ie.w3c.addEventListener = function(elm, lsns) {
    return function(type, listener, useCapture) {
        if (useCapture) { return; }
        var wrapper = function(evt) {
            DXBL.ie.event(evt, elm);
            listener(evt);
        }
        lsns.push({ type: type, listener: listener, wrapper: wrapper});
        elm.attachEvent("on" + type, wrapper);
    }
}
DXBL.ie.w3c.removeEventListener = function(elm, lsns) {
    return function(type, listener, useCapture) {
        if (useCapture) { return; }
        for (var i in lsns) {
            if (lsns[i].type == type && lsns[i].listener == listener) {
                elm.detachEvent("on" + lsns[i].type, lsns[i].wrapper);
                lsns.splice(i, 1);
                break;
            }
        }
    }
}



//http://www.u-ziq.com/blog/2007/05/domscript.html
//attachEventの記述方法はイベントタイプにonをつけることとcaptureが不要な点がaddEventListenerとの違いになります。
function addListener(elem, eventType, func, cap)
{
    if(elem.addEventListener)
    {
        elem.addEventListener(eventType, func, cap);
    }
    else if(elem.attachEvent)
    {
        elem.attachEvent('on' + eventType, func);
    }
}
