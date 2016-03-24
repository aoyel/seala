function intval(o){
        var v = parseInt(o);
        if(isNaN(v))
                return 0;
        return v;
}
function floatval(o){
        var v = parseFloat(o);
        if(isNaN(v))
                return 0;
        return v;
}
function isString(o){
        return typeof o == "string"
}

function moneyFormat(o){
  o = floatval(o);
  return o.toFixed(2);
}

function isNumber(o) {
        return typeof o == "number"
}

function trim(o){
        return o == null ? "" : ( o + "" ).replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");
}

function empty(mixed_var,_str_trim){
  if(_str_trim&&isString(mixed_var)){mixed_var=trim(mixed_var)}var undef,key,i,len;var emptyValues=[undef,null,false,0,'','0'];for(i=0,len=emptyValues.length;i<len;i++){if(mixed_var===emptyValues[i]){return true}}if(typeof mixed_var==='object'){for(key in mixed_var){if(mixed_var.hasOwnProperty(key)){return false}}return true}return false
}


function isset(o,v){
        if(typeof(o) != 'object')
                return false;
        return o.hasOwnProperty(v)
}

function isPhone(o){
        return o && /^1[3-9]\d{9}$/.test(o);
}

function isEmail(o){
        return o && /^[0-9a-zA-Z_\-]+@[0-9a-zA-Z_\-]+\.\w{1,5}(\.\w{1,5})?$/.test(o);
}

function isBankCard(o){
        return o && /^\d{16,30}$/.test(o);
}

function isChinaName(o){
        return o && trim(o).length >= 2 && !/^.*\\d{1,}.*$/.test(o);
}
function isIdentityNumber(o){
        if (trim(o) == '' || !/^[0-9]{17}[0-9X]$/.test(o)) {
                return false;
        }
        var weights = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var parityBits = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        var power = 0;
        for (var i = 0; i < 17; i++) {
                power += parseInt(o.charAt(i), 10) * weights[i];
        }
        return parityBits[power % 11] == o.substr(17);
}

function isMobile(){
  var ua = navigator.userAgent;
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  var isAndroid = ua.match(/(Android)\s+([\d.]+)/);
  return isIphone || isAndroid;
}

String.prototype.format= function(){
       var args = arguments;
       return this.replace(/\{(\d+)\}/g,function(s,i){
         return args[i];
       });
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function goBack(_t){
    _t = _t || false;
    if(_t){
        window.location.href=document.referrer;
    }else{
        window.history.back();
    }
}
function numberCheck(t){
  if(t.value.length==1){t.value=t.value.replace(/[^1-9]/g,'')}else{t.value=t.value.replace(/[^0-9]/g,'')}
}

function dateFormat(_t){
  return new Date(parseInt(_t) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

function reload(_duration) {
  if (typeof(_duration) == 'undefined') {
    _duration = 2000;
  }
  setTimeout(function() {
    location.reload(true);
  }, _duration);
}

function lazyLoad(_url,_delay){
  _url = empty(_url) ? "/" : _url;
  if (typeof(_delay) == 'undefined') {
    _delay = 2000;
  }
  setTimeout(function(){
    window.location.href = _url;
  }, _delay)
}
function uuid(){
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}
function notify(content,type,_callback){
    var id = uuid();
    var type = type || "default";
    var css = "position: fixed;padding: 1em 2em;z-index: 999;border-radius: 3px;color: #FFF;top: 50%;font-size: 1em;box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);";
    if(type === "default"){
      css += "background: rgba(0, 0, 0, 0.8);";
    }else if(type === "primary"){
      css += "background: rgba(14, 131, 205, 0.8);";      
    }else if(type === "success"){
      css += "background: rgba(69, 181, 73, 0.8);";
    }else if(type === "error"){
      css += "background: rgba(242, 77, 77, 0.8);";
    }    
    var content = "<div id='"+id+"' style='"+css+"'>"+content+"</div>";
    $('body').append(content);
    var box = $("#"+id);
    var _left = ($(window).width() - box.width()) / 2;
    var _top = parseInt(($(window).height() - box.height()) / 2);
    box.hide();
    box.css({
        "left": _left,
        "top": _top
    }).fadeIn();
    setTimeout(function(){
        box.fadeOut('slow',function(){
            $(this).remove();
        });
    }, 2000);
}