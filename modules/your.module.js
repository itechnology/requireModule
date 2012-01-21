;(function($, w, undefined){
    // Module is declared here as a plain object, name of the module does not matter here
    var module = {
      // Now just start adding a bunch of functions
      doStuff: function() {
          return "doing something else";
      }
    };


    // Must declare some basic info about the module here, so we can make decisions later
    var moduleInfo = {
        nameSpace: "test.utilities",
        version  : 1.1,
        module   : module,

        // If you like, add extra stuff here, like a init function to call on load...
        init: function(){ alert("whoops"); }
    };

    // This is executed once the module is loaded
    $(w.document).triggerHandler({ type: "module:loaded", moduleInfo: moduleInfo });
})(jQuery, window);
