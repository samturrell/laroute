(function () {

    var laroute = (function () {

        var routes = {

            absolute: $ABSOLUTE$,
            rootUrl: '$ROOTURL$',
            routes : $ROUTES$,
            prefix: '$PREFIX$',

            route : function (name, parameters, route) {
                route = route || this.getByName(name);

                if ( ! route ) {
                    return undefined;
                }

                return this.toRoute(route, parameters);
            },

            toRoute : function (route, parameters) {
                var uri = this.replaceNamedParameters(route.uri, parameters);
                var qs  = this.getRouteQueryString(parameters);

                if (this.absolute && this.isOtherHost(route)){
                    return "//" + route.host + "/" + uri + qs;
                }

                return this.getCorrectUrl(uri + qs);
            },

            isOtherHost: function (route){
                return route.host && route.host != window.location.hostname;
            },

            replaceNamedParameters : function (uri, parameters) {
                uri = uri.replace(/\{(.*?)\??\}/g, function(match, key) {
                    if (parameters.hasOwnProperty(key)) {
                        var value = parameters[key];
                        delete parameters[key];
                        return value;
                    } else {
                        return match;
                    }
                });

                // Strip out any optional parameters that were not given
                uri = uri.replace(/\/\{.*?\?\}/g, '');

                return uri;
            },

            getRouteQueryString : function (parameters) {
                var qs = [];
                for (var key in parameters) {
                    if (parameters.hasOwnProperty(key)) {
                        qs.push(key + '=' + parameters[key]);
                    }
                }

                if (qs.length < 1) {
                    return '';
                }

                return '?' + qs.join('&');
            },

            getByName : function (name) {
                for (var key in this.routes) {
                    if (this.routes.hasOwnProperty(key) && this.routes[key].name === name) {
                        return this.routes[key];
                    }
                }
            },

            getCorrectUrl: function (uri) {
                var url = this.prefix + '/' + uri.replace(/^\/?/, '');

                if ( ! this.absolute) {
                    return url;
                }

                return this.rootUrl.replace('/\/?$/', '') + url;
            },

            convertUriToRegex: function (route) {
                if (route.substr(0, 1) !== '/') {
                    route = '/' + route;
                }
                return route.replace(/\//g, '\\/').replace(/\/\{.*?\?\}/g, '[a-zA-Z0-9-_]+');
            },

            currentRoute: function () {
                return routes.routes.find(function (route) {
                    var regex = new RegExp('^' + routes.convertUriToRegex(route.uri) + '$');
                    return regex.test(window.location.pathname);
                });
            }
        };

        return {
            // Generate a url for a given named route.
            // $NAMESPACE$.route('routeName', [params = {}])
            route : function (route, parameters) {
                // If no route provided, we'll return
                // the current route data
                if (typeof route === 'undefined') {
                    return routes.currentRoute();
                }

                parameters = parameters || {};

                return routes.route(route, parameters);
            }

        };

    }).call(this);

    /**
     * Expose the class either via AMD, CommonJS or the global object
     */
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return laroute;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = laroute;
    }
    else {
        window.$NAMESPACE$ = laroute;
    }

}).call(this);

