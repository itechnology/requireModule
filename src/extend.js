/**
 Taken from:
 http://yuilibrary.com/yui/docs/api/classes/YUI.html#method_namespace

Adds a namespace object onto the imm global if called statically.

  // creates imm.your.namespace.here as nested objects
 imm.namespace("your.namespace.here");

 If called as a method on a imm <em>instance</em>, it creates the
namespace on the instance.

     // creates imm.property.package
    imm.namespace("property.package");

Dots in the input string cause `namespace` to create nested objects for
each token. If any part of the requested namespace already exists, the
current object will be left in place.  This allows multiple calls to
`namespace` to preserve existing namespaced properties.

If the first token in the namespace string is "imm", the token is
discarded.

Be careful with namespace tokens. Reserved words may work in some browsers
and not others. For instance, the following will fail in some browsers
because the supported version of JavaScript reserves the word "long":

     Y.namespace("really.long.nested.namespace");

<em>Note: If you pass multiple arguments to create multiple namespaces, only
the last one created is returned from this function.</em>

@method namespace
@param  {String} namespace* namespaces to create.
@return {Object}  A reference to the last namespace object created.
**/
var imm = {
    namespace: function() {
        var a = arguments, o, i = 0, j, d, arg;

        for (; i < a.length; i++) {
            o = this; //Reset base object per argument or it will get reused from the last
            arg = a[i];
            if (arg.indexOf('.') > -1) { //Skip this if no "." is present
                d = arg.split('.');
                for (j = (d[0] == 'imm') ? 1 : 0; j < d.length; j++) {
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

    registerModule: function(namespace, module) {
        // TODO: need some way of deciding if we should overwrite an existing object or return a new object
        var obj = imm.namespace(namespace);
        return $.extend(obj, module);
    }
};


