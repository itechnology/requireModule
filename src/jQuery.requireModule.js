/**
 /**************************
 * Author : Robert Hoffmann
 * Home   : https://github.com/itechnology
 *
 * Name    : jQuery.requireModule()
 * Site    : https://github.com/itechnology/requireModule
 * License : MIT
 * Date    : 15/01/12
 * Version : 0.1
 **************************/
;(function($) {
    $.loadedModules = [];
    $.requireModule = function(module, options) {
        var opt = {
            path : "modules/",
            async: true
        };
        $.extend(opt, options);

        if (!$.isArray(module)) {
            module = [module];
        };

        var deferredArray = [];
        var outerDeferred = $.Deferred();

        $(module).each(function(index, value) {
            var currentModule = value.toLowerCase();
            var innerDeferred = $.Deferred();

            if (jQuery.inArray(currentModule, $.loadedModules) === -1) {
                // INFO: push to $.loadedModules before get, as to not do double requests, then remove when failed
                $.loadedModules.push(currentModule);

                $.ajax({
                    url     : opt.path.concat(currentModule, ".js"),
                    dataType: "script",
                    async   : opt.async
                })
                .done(function(){
                        innerDeferred.resolve(currentModule);
                })
                .fail(function(){
                        $.loadedModules.slice(jQuery.inArray(currentModule, $.loadedModules), 1);
                        innerDeferred.reject(currentModule);
                });
            }
            else {
                innerDeferred.resolve(currentModule);
            }

            deferredArray.push(innerDeferred);
        });

        $.when
            .apply(null, deferredArray)
            .then(outerDeferred.resolve, outerDeferred.reject);

        return outerDeferred.promise();
    };
})(jQuery);