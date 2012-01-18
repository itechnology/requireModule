(function($, window, undefined){
    var namespace = "imm.utilities";

    var module = {
      doStuff: function() {
          console.log("doing stuff");
      }
    };

    // TODO: need some way of deciding if we should overwrite an existing object or return a new object
    // preferably the decision should be made on the defer() side, not here
    window.imm.registerModule(namespace, module);
})(jQuery, window);
