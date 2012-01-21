;(function(jQuery, windo, undefined) {
    // This can be considered as your base class
    window.myNameSpace = {
        // This function is taken from YUI
        // http://yuilibrary.com/yui/docs/api/classes/YUI.html#method_namespace
        // It creates a namespace, given a string
        nameSpace: function() {
            var a = arguments, o, i = 0, j, d, arg;

            for (; i < a.length; i++) {
                o = this; //Reset base object per argument or it will get reused from the last
                arg = a[i];
                if (arg.indexOf('.') > -1) { //Skip this if no "." is present
                    d = arg.split('.');
                    for (j = (d[0] == 'myNameSpace') ? 1 : 0; j < d.length; j++) {
                        o[d[j]] = o[d[j]] || {};
                        o = o[d[j]];
                    }
                } else {
                    o[arg] = o[arg] || {};
                    o = o[arg]; //Reset base object to the new object so it's returned
                }
            }
            return o;
        },

        // This is called automatically when a compliant module loads
        registerModule: function(moduleInfo) {
            // Create the namespace provided by the module ..or change it based on version number, etc.
            var ns = myNameSpace.nameSpace(moduleInfo.nameSpace);

            // This is just for fun, remove it if you consider it unneeded or unsafe
            // But can be very useful for initialising things
            if (typeof moduleInfo.init === 'function') {
                moduleInfo.init();
            }

            // Extend the created namespace object with the actual contents of the module
            $.extend(ns, moduleInfo.module);
        }
    };

    jQuery(window.document).on("module:loaded", function(e) { myNameSpace.registerModule(e.moduleInfo); });
})(jQuery, window);


