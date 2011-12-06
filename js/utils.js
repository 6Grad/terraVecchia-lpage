/**
 Select (byId, more to come) and enhance objects with additional functions. 
 Design inspired by jQuery. 
 
 @author Cédric Reginster <cedric.reginster@6grad.ch>
*/
(function(w){
    
  /*private variables*/
  var utils = function(id) {
    return new utils.prototype.init(id);  
  },
  /*fade helpers*/
  fade_init = function(elem,out, cb) {
    
    if (!elem) return;
    
    var ctx = {
      elem: elem,
      flag: (out ? -1 : 1),
      target: (out ? 0 : 100),
      cb: cb,
      opacity: (out ? 1 : 0),
    };
    
    ctx.alpha = ctx.opacity * 100;
    
    clearInterval(ctx.si);
    
    if (!out) {
      /*make sure element is visible*/
      elem.style.display = 'block';
    }
    
    if ( elem.style.opacity ) {
      ctx.opacity = parseFloat(elem.style.opacity);
    }

    ctx.si = setInterval(function(){fade_tween(ctx)}, 20);
  }, 
  fade_tween = function(ctx) {
    if(ctx.alpha == ctx.target){
      clearInterval(ctx.si);
      if (ctx.fade_cb) {
        ctx.fade_cb();
      }
    }else{
      var value = Math.round(ctx.alpha + ((ctx.target - ctx.alpha) * .05)) + (1 * ctx.flag);
      ctx.elem.style.opacity = value / 100;
      ctx.elem.style.filter = 'alpha(opacity=' + value + ')';
      ctx.alpha = value
    }
  }/*end fade helpers*/
  
  /*end private variables*/;
  
  /*name of utility, avoid multiple loading*/
  if(!w.u) {
    w.u = utils;
  }
  
  utils.prototype = {
    constructor: utils,
    /*only id selector supported*/
    init: function (selector) {
      
      // Handle $(""), $(null), or $(undefined)
      if ( !selector ) {
        return this;
      }
      // Handle $(DOMElement)
      if ( selector.nodeType ) {
        this[0] = selector;
        return this;
      }
      
      // id selector
      if (typeof selector === "string") {
        this[0] = document.getElementById(selector);
        return this;
      }
    },
    
    fadeIn: function(cb) {
      fade_init(this[0],false,cb);  
    },
    
    fadeOut: function(cb) {
      fade_init(this[0],true,cb);  
    },
    /*Code from jQuery*/
    addClass: function (value) {
      var classNames, elem, setClass;
      if ( value && typeof value === "string" ) {
        classNames = value.split( ' ' );
      
        elem = this[ 0 ];

        if ( elem.nodeType === 1 ) {
          if ( !elem.className && classNames.length === 1 ) {
            elem.className = value;

          } else {
            setClass = " " + elem.className + " ";

            for ( c = 0, cl = classNames.length; c < cl; c++ ) {
              if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
                setClass += classNames[ c ] + " ";
              }
            }
            elem.className = utils.trim( setClass );
          }
        }
      
      }
    },
    /*Code from jQuery*/    
    removeClass: function (value) {
      var classNames, elem, setClass;
      if ( (value && typeof value === "string") || value === undefined ) {
        classNames = ( value || "" ).split( ' ' );
        elem = this[ 0 ]; //no support for multiple elements for now
        if ( elem.nodeType === 1 && elem.className ) {
          if ( value ) {
            className = (" " + elem.className + " ").replace( /[\n\t\r]/g , " " );
            for ( c = 0, cl = classNames.length; c < cl; c++ ) {
              className = className.replace(" " + classNames[ c ] + " ", " ");
            }
            elem.className = utils.trim( className );

          } else {
            elem.className = "";
          }
        }
      }
    }
  }; /* end of utils prototype*/
  
  utils.prototype.init.prototype = utils.prototype;
  
  /*static utilities*/
  utils.version = function () {
    return "0.1";
  }
  
  utils.trim = function (text) {
    var trim = String.prototype.trim;
    if (trim) {
      return text != null ? trim.call(text) : "";
    } else {
      /*do nothing*/
      return text;
    }
  }
  

})(window);
