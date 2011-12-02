var fade=function(){
    var init = function(id,out, cb) {
      this.elem = document.getElementById(id);
      if (!elem) return;
      clearInterval(this.si);
      this.flag = out ? -1 : 1;
      this.target = out ? 0 : 100;
      if (!out) {
        /*make sure element is visible*/
        this.elem.style.display = 'block';
      }
      this.cb = cb
      var opacity = out ? 1 : 0;
      if ( this.elem.style.opacity ) {
        opacity = parseFloat(this.elem.style.opacity);
      }
      this.alpha = opacity * 100;
      this.si = setInterval(function(){tween()}, 20);
    }, 
    tween = function() {
      if(this.alpha == this.target){
        clearInterval(this.si);
        if (this.cb) {
          this.cb();
        }
      }else{
        var value = Math.round(this.alpha + ((this.target - this.alpha) * .05)) + (1 * this.flag);
        this.elem.style.opacity = value / 100;
        this.elem.style.filter = 'alpha(opacity=' + value + ')';
        this.alpha = value
      }
    };

    return{
        in:function(id,cb){
          init(id,false,cb);
        },
        out:function(id,cb){
          init(id,true,cb);
        },
    }
}();
