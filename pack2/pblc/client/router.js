(function(){
  router = {
    set: function(query){
      if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + $.param(query);
        window.history.pushState({path:newurl},'',newurl);
      }
    },
    get: function(){
      var urlParams;
      (window.onpopstate = function () {
          var match,
              pl     = /\+/g,  // Regex for replacing addition symbol with a space
              search = /([^&=]+)=?([^&]*)/g,
              decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
              query  = window.location.search.substring(1);

          urlParams = {};
          while (match = search.exec(query))
             urlParams[decode(match[1])] = decode(match[2]);
      })();
      return urlParams;
    },
    put: function(obj){
      this.data? this.data = this.get() : void(0);
      for (var i in obj){
        this.data[i] = obj[i];
        this.set(this.data);
      }
    },
    data: {}
  }
})();
