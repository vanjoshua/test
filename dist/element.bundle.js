/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wix/site-bookings/dist/cjs/bookings.runtime.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wix/site-bookings/dist/cjs/bookings.runtime.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bookingsRuntime = void 0;
const host_modules_1 = __webpack_require__(/*! @wix/sdk-runtime/host-modules */ "./node_modules/@wix/site-bookings/node_modules/@wix/sdk-runtime/cjs/build/host-modules.js");
exports.bookingsRuntime = (0, host_modules_1.createHostModule)({
    checkoutBooking: ({ channel }) => function checkoutBooking(...args) {
        return channel.invoke({
            namespace: 'bookings',
            method: 'checkoutBooking',
            args,
        });
    },
    getCheckoutOptions: ({ channel }) => function getCheckoutOptions(...args) {
        return channel.invoke({
            namespace: 'bookings',
            method: 'getCheckoutOptions',
            args,
        });
    },
    getServiceAvailability: ({ channel }) => function getServiceAvailability(...args) {
        return channel.invoke({
            namespace: 'bookings',
            method: 'getServiceAvailability',
            args,
        });
    },
});
//# sourceMappingURL=bookings.runtime.js.map

/***/ }),

/***/ "./node_modules/@wix/site-bookings/dist/cjs/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@wix/site-bookings/dist/cjs/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bookings = void 0;
var bookings_runtime_1 = __webpack_require__(/*! ./bookings.runtime */ "./node_modules/@wix/site-bookings/dist/cjs/bookings.runtime.js");
Object.defineProperty(exports, "bookings", ({ enumerable: true, get: function () { return bookings_runtime_1.bookingsRuntime; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wix/site/dist/esm/channel.js":
/*!****************************************************!*\
  !*** ./node_modules/@wix/site/dist/esm/channel.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWebsiteChannel: () => (/* binding */ createWebsiteChannel)
/* harmony export */ });
const createWebsiteChannel = _ref => {
  let {
    clientSdk,
    applicationId
  } = _ref;
  return {
    invoke: async _ref2 => {
      let {
        namespace,
        method,
        args
      } = _ref2;
      return clientSdk.invoke({
        namespace,
        method,
        args,
        applicationId,
        accessToken: 'accessToken'
      });
    },
    getAccessToken: () => {
      throw new Error('Not implemented');
    },
    observeState: () => ({
      disconnect: () => {}
    })
  };
};
//# sourceMappingURL=channel.js.map

/***/ }),

/***/ "./node_modules/@wix/site/dist/esm/hostPlatform.js":
/*!*********************************************************!*\
  !*** ./node_modules/@wix/site/dist/esm/hostPlatform.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHost: () => (/* binding */ createHost)
/* harmony export */ });
/* harmony import */ var _channel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./channel */ "./node_modules/@wix/site/dist/esm/channel.js");

const createHost = function (config) {
  const clientSdk = typeof $wixContext !== 'undefined' && $wixContext.clientSdk || (config == null ? void 0 : config.clientSdk) || window.clientSdk;
  const {
    applicationId
  } = config || {};
  if (!applicationId) {
    throw new Error('"createHost" was called without a required field "applicationId"');
  }
  if (!clientSdk) {
    throw new Error('Wix Site SDK only works in a Wix site environment. Learn more: https://dev.wix.com/docs/sdk/host-modules/site/introduction');
  }
  return {
    // environment: {},
    channel: (0,_channel__WEBPACK_IMPORTED_MODULE_0__.createWebsiteChannel)({
      clientSdk,
      applicationId
    }),
    close: () => {}
  };
};
//# sourceMappingURL=hostPlatform.js.map

/***/ }),

/***/ "./node_modules/@wix/site/dist/esm/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@wix/site/dist/esm/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   site: () => (/* binding */ site)
/* harmony export */ });
/* harmony import */ var _websiteHostModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./websiteHostModule */ "./node_modules/@wix/site/dist/esm/websiteHostModule.js");
/* harmony import */ var _hostPlatform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hostPlatform */ "./node_modules/@wix/site/dist/esm/hostPlatform.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./node_modules/@wix/site/dist/esm/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_2__) if(["default","site"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _types__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


const site = (0,_websiteHostModule__WEBPACK_IMPORTED_MODULE_0__.createWebsiteModule)({
  createHost: _hostPlatform__WEBPACK_IMPORTED_MODULE_1__.createHost
});

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wix/site/dist/esm/types.js":
/*!**************************************************!*\
  !*** ./node_modules/@wix/site/dist/esm/types.js ***!
  \**************************************************/
/***/ (() => {


//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/@wix/site/dist/esm/utils.js":
/*!**************************************************!*\
  !*** ./node_modules/@wix/site/dist/esm/utils.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   withResolvers: () => (/* binding */ withResolvers)
/* harmony export */ });
function withResolvers() {
  let resolve = null;
  let reject = null;
  const promise = new Promise((resolveFn, rejectFn) => {
    resolve = resolveFn;
    reject = rejectFn;
  });
  return {
    promise,
    resolve,
    reject
  };
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/@wix/site/dist/esm/websiteHostModule.js":
/*!**************************************************************!*\
  !*** ./node_modules/@wix/site/dist/esm/websiteHostModule.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWebsiteModule: () => (/* binding */ createWebsiteModule)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/@wix/site/dist/esm/utils.js");

const createWebsiteModule = _ref => {
  let {
    createHost
  } = _ref;
  return {
    __type: 'host',
    create: _host => {
      // Here we can implement module methods that could be used by the SDK via "wixClient.use(website)" api.
      // We don't have any for now, so we just return an empty object.
      return {};
    },
    host: createHost,
    auth: getAccessTokenFn => {
      const wixEmbedsAPI = typeof window !== 'undefined' ? window.wixEmbedsAPI : undefined;
      if (!getAccessTokenFn) {
        /*
        We must call wixEmbedsAPI.getAccessTokenFunction() in the main frame and not from async callbacks / setTimeout calls
        since it uses document.currentScript API behind the scenes
        https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript
        * */
        getAccessTokenFn = wixEmbedsAPI == null || wixEmbedsAPI.getAccessTokenFunction == null ? void 0 : wixEmbedsAPI.getAccessTokenFunction();
      }
      let injectorCreated = false;
      const {
        resolve: resolveAccessTokenFn,
        promise: accessTokenFnPromise
      } = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.withResolvers)();
      return {
        getAuthHeaders: async () => {
          if (!getAccessTokenFn && injectorCreated) {
            getAccessTokenFn = await accessTokenFnPromise;
          }
          if (!getAccessTokenFn) {
            throw new Error('Failed to resolve auth token');
          }
          return {
            headers: {
              Authorization: await getAccessTokenFn()
            }
          };
        },
        createInjector: () => {
          injectorCreated = true;
          return getAccessTokenFn => {
            resolveAccessTokenFn(getAccessTokenFn);
          };
        }
      };
    }
  };
};
//# sourceMappingURL=websiteHostModule.js.map

/***/ }),

/***/ "./node_modules/@wix/site-bookings/node_modules/@wix/sdk-runtime/cjs/build/context-v2.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@wix/site-bookings/node_modules/@wix/sdk-runtime/cjs/build/context-v2.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contextualizeSerivcePluginModuleV2 = exports.contextualizeEventDefinitionModuleV2 = exports.contextualizeRESTModuleV2 = exports.contextualizeHostModuleV2 = exports.ServicePluginDefinition = exports.EventDefinition = void 0;
const sdk_types_1 = __webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/sdk-types/build/browser/index.mjs");
Object.defineProperty(exports, "EventDefinition", ({ enumerable: true, get: function () { return sdk_types_1.EventDefinition; } }));
Object.defineProperty(exports, "ServicePluginDefinition", ({ enumerable: true, get: function () { return sdk_types_1.ServicePluginDefinition; } }));
const context_js_1 = __webpack_require__(/*! ./context.js */ "./node_modules/@wix/site-bookings/node_modules/@wix/sdk-runtime/cjs/build/context.js");
function contextualizeHostModuleV2(hostModule, props) {
    return {
        ...hostModule,
        ...Object.fromEntries(props.map((prop) => [
            prop,
            (...args) => {
                const context = (0, context_js_1.resolveContext)();
                if (!context) {
                    throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
                }
                return context
                    .initWixModules(hostModule)[prop].apply(undefined, args);
            },
        ])),
    };
}
exports.contextualizeHostModuleV2 = contextualizeHostModuleV2;
function contextualizeRESTModuleV2(restModule, elevated) {
    return ((...args) => {
        const context = (0, context_js_1.resolveContext)();
        if (!context) {
            // @ts-expect-error - if there is no context, we want to behave like the original module
            return restModule.apply(undefined, args);
        }
        return (context
            .initWixModules(restModule, elevated)
            // @ts-expect-error - we know the args here are meant to be passed to the initalized module
            .apply(undefined, args));
    });
}
exports.contextualizeRESTModuleV2 = contextualizeRESTModuleV2;
function contextualizeEventDefinitionModuleV2(eventDefinition) {
    const contextualMethod = ((...args) => {
        const context = (0, context_js_1.resolveContext)();
        if (!context) {
            // this line should throw, but this would be a breaking change for older SDK versions
            // this is because in wixClient there's code that calls any function it detects and checks
            // if it's an ambassador module (see isAmbassadorModule)
            return () => { };
        }
        return context.initWixModules(eventDefinition).apply(undefined, args);
    });
    contextualMethod.__type = eventDefinition.__type;
    contextualMethod.type = eventDefinition.type;
    contextualMethod.isDomainEvent = eventDefinition.isDomainEvent;
    contextualMethod.transformations = eventDefinition.transformations;
    return contextualMethod;
}
exports.contextualizeEventDefinitionModuleV2 = contextualizeEventDefinitionModuleV2;
function contextualizeSerivcePluginModuleV2(servicePlugin) {
    const contextualMethod = ((...args) => {
        const context = (0, context_js_1.resolveContext)();
        if (!context) {
            // this line should throw, but this would be a breaking change for older SDK versions
            // this is because in wixClient there's code that calls any function it detects and checks
            // if it's an ambassador module (see isAmbassadorModule)
            return () => { };
        }
        return context.initWixModules(servicePlugin).apply(undefined, args);
    });
    contextualMethod.__type = servicePlugin.__type;
    contextualMethod.componentType = servicePlugin.componentType;
    contextualMethod.methods = servicePlugin.methods;
    return contextualMethod;
}
exports.contextualizeSerivcePluginModuleV2 = contextualizeSerivcePluginModuleV2;


/***/ }),

/***/ "./node_modules/@wix/site-bookings/node_modules/@wix/sdk-runtime/cjs/build/context.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@wix/site-bookings/node_modules/@wix/sdk-runtime/cjs/build/context.js ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runWithoutContext = exports.contextualizeSerivcePluginModule = exports.contextualizeEventDefinitionModule = exports.contextualizeRESTModule = exports.contextualizeHostModule = exports.resolveContext = void 0;
const sdk_context_1 = __webpack_require__(/*! @wix/sdk-context */ "./node_modules/@wix/sdk-context/build/browser/index.mjs");
function resolveContext() {
    const oldContext = typeof $wixContext !== 'undefined' && $wixContext.initWixModules
        ? $wixContext.initWixModules
        : typeof globalThis.__wix_context__ !== 'undefined' &&
            globalThis.__wix_context__.initWixModules
            ? globalThis.__wix_context__.initWixModules
            : undefined;
    if (oldContext) {
        return {
            // @ts-expect-error
            initWixModules(modules, elevated) {
                return runWithoutContext(() => oldContext(modules, elevated));
            },
            fetchWithAuth() {
                throw new Error('fetchWithAuth is not available in this context');
            },
            graphql() {
                throw new Error('graphql is not available in this context');
            },
        };
    }
    const contextualClient = typeof $wixContext !== 'undefined'
        ? $wixContext.client
        : typeof sdk_context_1.wixContext.client !== 'undefined'
            ? sdk_context_1.wixContext.client
            : typeof globalThis.__wix_context__ !== 'undefined'
                ? globalThis.__wix_context__.client
                : undefined;
    const elevatedClient = typeof $wixContext !== 'undefined'
        ? $wixContext.elevatedClient
        : typeof sdk_context_1.wixContext.elevatedClient !== 'undefined'
            ? sdk_context_1.wixContext.elevatedClient
            : typeof globalThis.__wix_context__ !== 'undefined'
                ? globalThis.__wix_context__.elevatedClient
                : undefined;
    if (!contextualClient && !elevatedClient) {
        return;
    }
    return {
        initWixModules(wixModules, elevated) {
            if (elevated) {
                if (!elevatedClient) {
                    throw new Error('An elevated client is required to use elevated modules. Make sure to initialize the Wix context with an elevated client before using elevated SDK modules');
                }
                return runWithoutContext(() => elevatedClient.use(wixModules));
            }
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return runWithoutContext(() => contextualClient.use(wixModules));
        },
        fetchWithAuth: (urlOrRequest, requestInit) => {
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return contextualClient.fetchWithAuth(urlOrRequest, requestInit);
        },
        async graphql(query, variables, opts) {
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return contextualClient.graphql(query, variables, opts);
        },
    };
}
exports.resolveContext = resolveContext;
function contextualizeHostModule(hostModule, prop) {
    return (...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context.initWixModules(hostModule)[prop].apply(undefined, args);
    };
}
exports.contextualizeHostModule = contextualizeHostModule;
function contextualizeRESTModule(restModule, expectedArgsLength) {
    return ((...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context
            .initWixModules(restModule, args[expectedArgsLength]?.suppressAuth ? true : false)
            .apply(undefined, args);
    });
}
exports.contextualizeRESTModule = contextualizeRESTModule;
function contextualizeEventDefinitionModule(eventDefinition) {
    return ((...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context.initWixModules(eventDefinition).apply(undefined, args);
    });
}
exports.contextualizeEventDefinitionModule = contextualizeEventDefinitionModule;
function contextualizeSerivcePluginModule(servicePlugin) {
    return ((...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context.initWixModules(servicePlugin).apply(undefined, args);
    });
}
exports.contextualizeSerivcePluginModule = contextualizeSerivcePluginModule;
__exportStar(__webpack_require__(/*! ./context-v2.js */ "./node_modules/@wix/site-bookings/node_modules/@wix/sdk-runtime/cjs/build/context-v2.js"), exports);
function runWithoutContext(fn) {
    const globalContext = globalThis.__wix_context__;
    const moduleContext = {
        client: sdk_context_1.wixContext.client,
        elevatedClient: sdk_context_1.wixContext.elevatedClient,
    };
    let closureContext;
    globalThis.__wix_context__ = undefined;
    sdk_context_1.wixContext.client = undefined;
    sdk_context_1.wixContext.elevatedClient = undefined;
    if (typeof $wixContext !== 'undefined') {
        closureContext = {
            client: $wixContext?.client,
            elevatedClient: $wixContext?.elevatedClient,
        };
        delete $wixContext.client;
        delete $wixContext.elevatedClient;
    }
    try {
        return fn();
    }
    finally {
        globalThis.__wix_context__ = globalContext;
        sdk_context_1.wixContext.client = moduleContext.client;
        sdk_context_1.wixContext.elevatedClient = moduleContext.elevatedClient;
        if (typeof $wixContext !== 'undefined') {
            $wixContext.client = closureContext.client;
            $wixContext.elevatedClient = closureContext.elevatedClient;
        }
    }
}
exports.runWithoutContext = runWithoutContext;


/***/ }),

/***/ "./node_modules/@wix/site-bookings/node_modules/@wix/sdk-runtime/cjs/build/host-modules.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@wix/site-bookings/node_modules/@wix/sdk-runtime/cjs/build/host-modules.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createHostModule = void 0;
const context_v2_js_1 = __webpack_require__(/*! ./context-v2.js */ "./node_modules/@wix/site-bookings/node_modules/@wix/sdk-runtime/cjs/build/context-v2.js");
function createHostModule(hostModuleAPI) {
    return (0, context_v2_js_1.contextualizeHostModuleV2)({
        __type: 'host',
        create: (host) => Object.entries(hostModuleAPI).reduce((acc, [key, fn]) => ({
            ...acc,
            [key]: fn(host),
        }), {}),
    }, Object.keys(hostModuleAPI));
}
exports.createHostModule = createHostModule;


/***/ }),

/***/ "./node_modules/@wix/sdk-context/build/browser/index.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/@wix/sdk-context/build/browser/index.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wixContext: () => (/* binding */ wixContext)
/* harmony export */ });
// src/index.ts
var wixContext = {};



/***/ }),

/***/ "./node_modules/@wix/sdk-types/build/browser/index.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/@wix/sdk-types/build/browser/index.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventDefinition: () => (/* binding */ EventDefinition),
/* harmony export */   SERVICE_PLUGIN_ERROR_TYPE: () => (/* binding */ SERVICE_PLUGIN_ERROR_TYPE),
/* harmony export */   ServicePluginDefinition: () => (/* binding */ ServicePluginDefinition)
/* harmony export */ });
// src/event-handlers-modules.ts
function EventDefinition(type, isDomainEvent = false, transformations = (x) => x) {
  return () => ({
    __type: "event-definition",
    type,
    isDomainEvent,
    transformations
  });
}

// src/service-plugins.ts
function ServicePluginDefinition(componentType, methods) {
  return {
    __type: "service-plugin-definition",
    componentType,
    methods
  };
}
var SERVICE_PLUGIN_ERROR_TYPE = "wix_spi_error";



/***/ }),

/***/ "./node_modules/@wix/sdk/build/ambassador-modules.js":
/*!***********************************************************!*\
  !*** ./node_modules/@wix/sdk/build/ambassador-modules.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAmbassadorModule: () => (/* binding */ isAmbassadorModule),
/* harmony export */   toHTTPModule: () => (/* binding */ toHTTPModule)
/* harmony export */ });
const parseMethod = (method) => {
    switch (method) {
        case 'get':
        case 'GET':
            return 'GET';
        case 'post':
        case 'POST':
            return 'POST';
        case 'put':
        case 'PUT':
            return 'PUT';
        case 'delete':
        case 'DELETE':
            return 'DELETE';
        case 'patch':
        case 'PATCH':
            return 'PATCH';
        case 'head':
        case 'HEAD':
            return 'HEAD';
        case 'options':
        case 'OPTIONS':
            return 'OPTIONS';
        default:
            throw new Error(`Unknown method: ${method}`);
    }
};
const toHTTPModule = (factory) => (httpClient) => async (payload) => {
    let requestOptions;
    const HTTPFactory = (context) => {
        requestOptions = factory(payload)(context);
        if (requestOptions.url === undefined) {
            throw new Error('Url was not successfully created for this request, please reach out to support channels for assistance.');
        }
        const { method, url, params } = requestOptions;
        return {
            ...requestOptions,
            method: parseMethod(method),
            url,
            data: requestOptions.data,
            params,
        };
    };
    try {
        const response = await httpClient.request(HTTPFactory);
        if (requestOptions === undefined) {
            throw new Error('Request options were not created for this request, please reach out to support channels for assistance.');
        }
        const transformations = Array.isArray(requestOptions.transformResponse)
            ? requestOptions.transformResponse
            : [requestOptions.transformResponse];
        /**
         * Based on Axios implementation:
         * https://github.com/axios/axios/blob/3f53eb6960f05a1f88409c4b731a40de595cb825/lib/core/transformData.js#L22
         */
        let data = response.data;
        transformations.forEach((transform) => {
            if (transform) {
                data = transform(response.data, response.headers);
            }
        });
        return data;
    }
    catch (e) {
        if (typeof e === 'object' &&
            e !== null &&
            'response' in e &&
            typeof e.response === 'object' &&
            e.response !== null &&
            'data' in e.response) {
            throw e.response.data;
        }
        throw e;
    }
};
/*
 * Because of issues with tree-shaking, we cant really put static parameter on module.
 * We still have check for __isAmbassador for backward compatibility
 */
const isAmbassadorModule = (module) => {
    if (module.__isAmbassador) {
        return true;
    }
    const fn = module();
    return Boolean(fn.__isAmbassador);
};


/***/ }),

/***/ "./node_modules/@wix/sdk/build/bi/biHeaderGenerator.js":
/*!*************************************************************!*\
  !*** ./node_modules/@wix/sdk/build/bi/biHeaderGenerator.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WixBIHeaderName: () => (/* binding */ WixBIHeaderName),
/* harmony export */   biHeaderGenerator: () => (/* binding */ biHeaderGenerator)
/* harmony export */ });
const WixBIHeaderName = 'x-wix-bi-gateway';
function biHeaderGenerator(apiMetadata, publicMetadata) {
    return {
        [WixBIHeaderName]: objectToKeyValue({
            environment: 'js-sdk',
            'package-name': apiMetadata.packageName ?? publicMetadata?.PACKAGE_NAME,
            'method-fqn': apiMetadata.methodFqn,
            entity: apiMetadata.entityFqdn,
        }),
    };
}
function objectToKeyValue(input) {
    return Object.entries(input)
        .filter(([_, value]) => Boolean(value))
        .map(([key, value]) => `${key}=${value}`)
        .join(',');
}


/***/ }),

/***/ "./node_modules/@wix/sdk/build/common.js":
/*!***********************************************!*\
  !*** ./node_modules/@wix/sdk/build/common.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_API_URL: () => (/* binding */ DEFAULT_API_URL),
/* harmony export */   FORCE_WRITE_API_URLS: () => (/* binding */ FORCE_WRITE_API_URLS),
/* harmony export */   PUBLIC_METADATA_KEY: () => (/* binding */ PUBLIC_METADATA_KEY)
/* harmony export */ });
const PUBLIC_METADATA_KEY = '__metadata';
const DEFAULT_API_URL = 'www.wixapis.com';
const FORCE_WRITE_API_URLS = ['/ecom/v1/carts/current'];


/***/ }),

/***/ "./node_modules/@wix/sdk/build/event-handlers-modules.js":
/*!***************************************************************!*\
  !*** ./node_modules/@wix/sdk/build/event-handlers-modules.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildEventDefinition: () => (/* binding */ buildEventDefinition),
/* harmony export */   eventHandlersModules: () => (/* binding */ eventHandlersModules),
/* harmony export */   isEventHandlerModule: () => (/* binding */ isEventHandlerModule)
/* harmony export */ });
/* harmony import */ var _wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/sdk-types/build/browser/index.mjs");
/* harmony import */ var _nanoevents_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nanoevents.js */ "./node_modules/@wix/sdk/build/nanoevents.js");


const isEventHandlerModule = (val) => val.__type === 'event-definition';
function buildEventDefinition(eventDefinition, registerHandler) {
    return (handler) => {
        registerHandler(eventDefinition, handler);
    };
}
function runHandler(eventDefinition, handler, payload, baseEventMetadata) {
    let envelope;
    if (eventDefinition.isDomainEvent) {
        const domainEventPayload = payload;
        const { deletedEvent, actionEvent, createdEvent, updatedEvent, ...domainEventMetadata } = domainEventPayload;
        const metadata = {
            ...baseEventMetadata,
            ...domainEventMetadata,
        };
        if (deletedEvent) {
            if (deletedEvent?.deletedEntity) {
                envelope = {
                    entity: deletedEvent?.deletedEntity,
                    metadata,
                };
            }
            else {
                envelope = { metadata };
            }
        }
        else if (actionEvent) {
            envelope = {
                data: actionEvent.body,
                metadata,
            };
        }
        else {
            envelope = {
                entity: createdEvent?.entity ?? updatedEvent?.currentEntity,
                metadata,
            };
        }
    }
    else {
        envelope = {
            data: payload,
            metadata: baseEventMetadata,
        };
    }
    const transformFromRESTFn = eventDefinition.transformations ?? ((x) => x);
    return handler(transformFromRESTFn(envelope));
}
function eventHandlersModules(authStrategy) {
    const eventHandlers = new Map();
    const webhooksEmitter = (0,_nanoevents_js__WEBPACK_IMPORTED_MODULE_0__.createNanoEvents)();
    const client = {
        ...webhooksEmitter,
        getRegisteredEvents: () => eventHandlers,
        async process(jwt, opts = {
            expectedEvents: [],
        }) {
            const { eventType, identity, instanceId, payload } = await this.parseJWT(jwt);
            const allExpectedEvents = [
                ...opts.expectedEvents,
                ...Array.from(eventHandlers.keys()).map((type) => ({ type })),
            ];
            if (allExpectedEvents.length > 0 &&
                !allExpectedEvents.some(({ type }) => type === eventType)) {
                throw new Error(`Unexpected event type: ${eventType}. Expected one of: ${allExpectedEvents
                    .map((x) => x.type)
                    .join(', ')}`);
            }
            const handlers = eventHandlers.get(eventType) ?? [];
            await Promise.all(handlers.map(({ eventDefinition, handler }) => runHandler(eventDefinition, handler, payload, {
                instanceId,
                identity,
            })));
            return {
                instanceId,
                eventType,
                payload,
                identity,
            };
        },
        async processRequest(request, opts) {
            const body = await request.text();
            return this.process(body, opts);
        },
        async parseJWT(jwt) {
            if (!authStrategy.decodeJWT) {
                throw new Error('decodeJWT is not supported by the authentication strategy');
            }
            const { decoded, valid } = await authStrategy.decodeJWT(jwt);
            if (!valid) {
                throw new Error('JWT is not valid');
            }
            if (typeof decoded.data !== 'string') {
                throw new Error(`Unexpected type of JWT data: expected string, got ${typeof decoded.data}`);
            }
            const parsedDecoded = JSON.parse(decoded.data);
            const eventType = parsedDecoded.eventType;
            const instanceId = parsedDecoded.instanceId;
            const identity = parsedDecoded.identity
                ? JSON.parse(parsedDecoded.identity)
                : undefined;
            const payload = JSON.parse(parsedDecoded.data);
            return {
                instanceId,
                eventType,
                payload,
                identity,
            };
        },
        async parseRequest(request) {
            const jwt = await request.text();
            return this.parseJWT(jwt);
        },
        async executeHandlers(event) {
            const allExpectedEvents = Array.from(eventHandlers.keys()).map((type) => ({ type }));
            if (allExpectedEvents.length > 0 &&
                !allExpectedEvents.some(({ type }) => type === event.eventType)) {
                throw new Error(`Unexpected event type: ${event.eventType}. Expected one of: ${allExpectedEvents
                    .map((x) => x.type)
                    .join(', ')}`);
            }
            const handlers = eventHandlers.get(event.eventType) ?? [];
            await Promise.all(handlers.map(({ eventDefinition, handler }) => runHandler(eventDefinition, handler, event.payload, {
                instanceId: event.instanceId,
                identity: event.identity,
            })));
        },
        apps: {
            AppInstalled: (0,_wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__.EventDefinition)('AppInstalled')(),
            AppRemoved: (0,_wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__.EventDefinition)('AppRemoved')(),
        },
    };
    return {
        initModule(eventDefinition) {
            return (handler) => {
                const handlers = eventHandlers.get(eventDefinition.type) ?? [];
                handlers.push({ eventDefinition, handler });
                eventHandlers.set(eventDefinition.type, handlers);
                webhooksEmitter.emit('registered', eventDefinition);
            };
        },
        client,
    };
}


/***/ }),

/***/ "./node_modules/@wix/sdk/build/fetch-error.js":
/*!****************************************************!*\
  !*** ./node_modules/@wix/sdk/build/fetch-error.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FetchErrorResponse: () => (/* binding */ FetchErrorResponse)
/* harmony export */ });
class FetchErrorResponse extends Error {
    message;
    response;
    constructor(message, response) {
        super(message);
        this.message = message;
        this.response = response;
    }
    async details() {
        const dataError = await this.response.json();
        return errorBuilder(this.response.status, dataError?.message, dataError?.details, {
            requestId: this.response.headers.get('X-Wix-Request-Id'),
            details: dataError,
        });
    }
}
const errorBuilder = (code, description, details, data) => {
    return {
        details: {
            ...(!details?.validationError && {
                applicationError: {
                    description,
                    code,
                    data,
                },
            }),
            ...details,
        },
        message: description,
    };
};


/***/ }),

/***/ "./node_modules/@wix/sdk/build/helpers.js":
/*!************************************************!*\
  !*** ./node_modules/@wix/sdk/build/helpers.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultContentHeader: () => (/* binding */ getDefaultContentHeader),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   parsePublicKeyIfEncoded: () => (/* binding */ parsePublicKeyIfEncoded)
/* harmony export */ });
// we follow a simplified version of the axios convention
// https://github.com/axios/axios/blob/649d739288c8e2c55829ac60e2345a0f3439c730/lib/defaults/index.js#L65
const getDefaultContentHeader = (options) => {
    if (options?.method &&
        ['post', 'put', 'patch'].includes(options.method.toLocaleLowerCase()) &&
        options.body) {
        return { 'Content-Type': 'application/json' };
    }
    return {};
};
const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val);
function parsePublicKeyIfEncoded(publicKey) {
    if (publicKey.includes('\n') || publicKey.includes('\r')) {
        // publicKey is multi-line string, can be used as is
        return publicKey.trim();
    }
    else {
        // publicKey is base64 encoded
        return typeof atob !== 'undefined'
            ? atob(publicKey)
            : Buffer.from(publicKey, 'base64').toString('utf-8');
    }
}


/***/ }),

/***/ "./node_modules/@wix/sdk/build/host-modules.js":
/*!*****************************************************!*\
  !*** ./node_modules/@wix/sdk/build/host-modules.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildHostModule: () => (/* binding */ buildHostModule),
/* harmony export */   isHostModule: () => (/* binding */ isHostModule)
/* harmony export */ });
const isHostModule = (val) => val.__type === 'host';
function buildHostModule(val, host) {
    return val.create(host);
}


/***/ }),

/***/ "./node_modules/@wix/sdk/build/nanoevents.js":
/*!***************************************************!*\
  !*** ./node_modules/@wix/sdk/build/nanoevents.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNanoEvents: () => (/* binding */ createNanoEvents)
/* harmony export */ });
// Inlined from https://github.com/ai/nanoevents/blob/main/index.js
/**
 * Create event emitter.
 *
 * ```js
 * import { createNanoEvents } from 'nanoevents'
 *
 * class Ticker {
 * constructor() {
 * this.emitter = createNanoEvents()
 * }
 * on(...args) {
 * return this.emitter.on(...args)
 * }
 * tick() {
 * this.emitter.emit('tick')
 * }
 * }
 * ```
 * @returns Event emitter.
 */
function createNanoEvents() {
    return {
        emit(event, ...args) {
            for (let i = 0, callbacks = this.events[event] || [], length = callbacks.length; i < length; i++) {
                callbacks[i](...args);
            }
        },
        events: {},
        on(event, cb) {
            (this.events[event] ||= []).push(cb);
            return () => {
                this.events[event] = this.events[event]?.filter((i) => cb !== i);
            };
        },
    };
}


/***/ }),

/***/ "./node_modules/@wix/sdk/build/rest-modules.js":
/*!*****************************************************!*\
  !*** ./node_modules/@wix/sdk/build/rest-modules.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildRESTDescriptor: () => (/* binding */ buildRESTDescriptor)
/* harmony export */ });
/* harmony import */ var _bi_biHeaderGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bi/biHeaderGenerator.js */ "./node_modules/@wix/sdk/build/bi/biHeaderGenerator.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ "./node_modules/@wix/sdk/build/common.js");
/* harmony import */ var _wix_sdk_runtime_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/sdk-runtime/context */ "./node_modules/@wix/sdk/node_modules/@wix/sdk-runtime/build/context.js");



function buildRESTDescriptor(origFunc, publicMetadata, boundFetch, wixAPIFetch, options) {
    return (0,_wix_sdk_runtime_context__WEBPACK_IMPORTED_MODULE_0__.runWithoutContext)(() => origFunc({
        request: async (factory) => {
            const requestOptions = factory({
                host: options?.HTTPHost || _common_js__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_API_URL,
            });
            let request = requestOptions;
            if (request.method === 'GET' &&
                request.fallback?.length &&
                request.params.toString().length > 4000) {
                request = requestOptions.fallback[0];
            }
            const domain = options?.HTTPHost ?? _common_js__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_API_URL;
            let url = `https://${domain}${request.url}`;
            if (request.params && request.params.toString()) {
                url += `?${request.params.toString()}`;
            }
            try {
                const biHeader = (0,_bi_biHeaderGenerator_js__WEBPACK_IMPORTED_MODULE_2__.biHeaderGenerator)(requestOptions, publicMetadata);
                const res = await boundFetch(url, {
                    method: request.method,
                    ...(request.data && {
                        body: JSON.stringify(request.data),
                    }),
                    headers: {
                        ...biHeader,
                    },
                });
                if (res.status !== 200) {
                    let dataError = null;
                    try {
                        dataError = await res.json();
                    }
                    catch (e) {
                        //
                    }
                    throw errorBuilder(res.status, dataError?.message, dataError?.details, {
                        requestId: res.headers.get('X-Wix-Request-Id'),
                        details: dataError,
                    });
                }
                const data = await res.json();
                return {
                    data,
                    headers: res.headers,
                    status: res.status,
                    statusText: res.statusText,
                };
            }
            catch (e) {
                if (e.message?.includes('fetch is not defined')) {
                    console.error('Node.js v18+ is required');
                }
                throw e;
            }
        },
        fetchWithAuth: boundFetch,
        wixAPIFetch,
    }));
}
const errorBuilder = (code, description, details, data) => {
    return {
        response: {
            data: {
                details: {
                    ...(!details?.validationError && {
                        applicationError: {
                            description,
                            code,
                            data,
                        },
                    }),
                    ...details,
                },
                message: description,
            },
            status: code,
        },
    };
};


/***/ }),

/***/ "./node_modules/@wix/sdk/build/service-plugin-modules.js":
/*!***************************************************************!*\
  !*** ./node_modules/@wix/sdk/build/service-plugin-modules.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isServicePluginModule: () => (/* binding */ isServicePluginModule),
/* harmony export */   servicePluginsModules: () => (/* binding */ servicePluginsModules)
/* harmony export */ });
/* harmony import */ var _nanoevents_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nanoevents.js */ "./node_modules/@wix/sdk/build/nanoevents.js");

const isServicePluginModule = (val) => val.__type === 'service-plugin-definition';
function servicePluginsModules(authStrategy) {
    const servicePluginsImplementations = new Map();
    const servicePluginsEmitter = (0,_nanoevents_js__WEBPACK_IMPORTED_MODULE_0__.createNanoEvents)();
    const client = {
        ...servicePluginsEmitter,
        getRegisteredServicePlugins: () => servicePluginsImplementations,
        async parseJWT(jwt) {
            if (!authStrategy.decodeJWT) {
                throw new Error('decodeJWT is not supported by the authentication strategy');
            }
            const { decoded, valid } = await authStrategy.decodeJWT(jwt, true);
            if (!valid) {
                throw new Error('JWT is not valid');
            }
            if (typeof decoded.data !== 'object' ||
                decoded.data === null ||
                !('metadata' in decoded.data) ||
                typeof decoded.data.metadata !== 'object' ||
                decoded.data.metadata === null ||
                !('appExtensionType' in decoded.data.metadata) ||
                typeof decoded.data.metadata.appExtensionType !== 'string') {
                throw new Error('Unexpected JWT data: expected object with metadata.appExtensionType string');
            }
            return decoded.data;
        },
        async process(request) {
            const servicePluginRequest = await this.parseJWT(request.body);
            return this.executeHandler(servicePluginRequest, request.url);
        },
        async parseRequest(request) {
            const body = await request.text();
            return this.parseJWT(body);
        },
        async processRequest(request) {
            const url = request.url;
            const body = await request.text();
            const implMethodResult = await this.process({ url, body });
            return Response.json(implMethodResult);
        },
        async executeHandler(servicePluginRequest, url) {
            const componentType = servicePluginRequest.metadata.appExtensionType.toLowerCase();
            const implementations = servicePluginsImplementations.get(componentType) ?? [];
            if (implementations.length === 0) {
                throw new Error(`No service plugin implementations found for component type ${componentType}`);
            }
            else if (implementations.length > 1) {
                throw new Error(`Multiple service plugin implementations found for component type ${componentType}. This is currently not supported`);
            }
            const { implementation: impl, servicePluginDefinition } = implementations[0];
            const method = servicePluginDefinition.methods.find((m) => url.endsWith(m.primaryHttpMappingPath));
            if (!method) {
                throw new Error('Unexpect request: request url did not match any method: ' + url);
            }
            const implMethod = impl[method.name];
            if (!implMethod) {
                throw new Error(`Got request for service plugin method ${method.name} but no implementation was provided. Available methods: ${Object.keys(impl).join(', ')}`);
            }
            return method.transformations.toREST(await implMethod(method.transformations.fromREST(servicePluginRequest)));
        },
    };
    return {
        initModule(servicePluginDefinition) {
            return (implementation) => {
                const implementations = servicePluginsImplementations.get(servicePluginDefinition.componentType.toLowerCase()) ?? [];
                implementations.push({ servicePluginDefinition, implementation });
                servicePluginsImplementations.set(servicePluginDefinition.componentType.toLowerCase(), implementations);
                servicePluginsEmitter.emit('registered', servicePluginDefinition);
            };
        },
        client,
    };
}


/***/ }),

/***/ "./node_modules/@wix/sdk/build/wixClient.js":
/*!**************************************************!*\
  !*** ./node_modules/@wix/sdk/build/wixClient.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createClient: () => (/* binding */ createClient)
/* harmony export */ });
/* harmony import */ var _wix_sdk_context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wix/sdk-context */ "./node_modules/@wix/sdk-context/build/browser/index.mjs");
/* harmony import */ var _wix_sdk_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/sdk-types/build/browser/index.mjs");
/* harmony import */ var _ambassador_modules_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ambassador-modules.js */ "./node_modules/@wix/sdk/build/ambassador-modules.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common.js */ "./node_modules/@wix/sdk/build/common.js");
/* harmony import */ var _fetch_error_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./fetch-error.js */ "./node_modules/@wix/sdk/build/fetch-error.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@wix/sdk/build/helpers.js");
/* harmony import */ var _host_modules_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./host-modules.js */ "./node_modules/@wix/sdk/build/host-modules.js");
/* harmony import */ var _rest_modules_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rest-modules.js */ "./node_modules/@wix/sdk/build/rest-modules.js");
/* harmony import */ var _event_handlers_modules_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-handlers-modules.js */ "./node_modules/@wix/sdk/build/event-handlers-modules.js");
/* harmony import */ var _service_plugin_modules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-plugin-modules.js */ "./node_modules/@wix/sdk/build/service-plugin-modules.js");
/* harmony import */ var _wix_sdk_runtime_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wix/sdk-runtime/context */ "./node_modules/@wix/sdk/node_modules/@wix/sdk-runtime/build/context.js");











function createClient(config) {
    const _headers = config.headers || { Authorization: '' };
    const authStrategy = config.auth ||
        {
            getAuthHeaders: (_) => Promise.resolve({ headers: {} }),
        };
    const boundGetAuthHeaders = authStrategy.getAuthHeaders.bind(undefined, config.host);
    authStrategy.getAuthHeaders = boundGetAuthHeaders;
    const { client: servicePluginsClient, initModule: initServicePluginModule } = (0,_service_plugin_modules_js__WEBPACK_IMPORTED_MODULE_0__.servicePluginsModules)(authStrategy);
    const { client: eventHandlersClient, initModule: initEventHandlerModule } = (0,_event_handlers_modules_js__WEBPACK_IMPORTED_MODULE_1__.eventHandlersModules)(authStrategy);
    const boundFetch = async (url, options) => {
        const authHeaders = await boundGetAuthHeaders();
        const defaultContentTypeHeader = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_2__.getDefaultContentHeader)(options);
        return fetch(url, {
            ...options,
            headers: {
                ...defaultContentTypeHeader,
                ..._headers,
                ...authHeaders?.headers,
                ...options?.headers,
            },
        });
    };
    // This is typed as `any` because when trying to properly type it as defined
    // on the WixClient, typescript starts failing with `Type instantiation is
    // excessively deep and possibly infinite.`
    const use = (modules, metadata) => {
        if ((0,_event_handlers_modules_js__WEBPACK_IMPORTED_MODULE_1__.isEventHandlerModule)(modules)) {
            return initEventHandlerModule(modules);
        }
        else if ((0,_service_plugin_modules_js__WEBPACK_IMPORTED_MODULE_0__.isServicePluginModule)(modules)) {
            return initServicePluginModule(modules);
        }
        else if ((0,_host_modules_js__WEBPACK_IMPORTED_MODULE_3__.isHostModule)(modules) && config.host) {
            return (0,_host_modules_js__WEBPACK_IMPORTED_MODULE_3__.buildHostModule)(modules, config.host);
        }
        else if (typeof modules === 'function') {
            // The generated namespaces all have the error classes on them and
            // a class is also a function, so we need to explicitly ignore these
            // error classes using a static field that exists on them.
            if ('__type' in modules && modules.__type === _wix_sdk_types__WEBPACK_IMPORTED_MODULE_4__.SERVICE_PLUGIN_ERROR_TYPE) {
                return modules;
            }
            const apiBaseUrl = config.host?.apiBaseUrl ?? _common_js__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_API_URL;
            return (0,_rest_modules_js__WEBPACK_IMPORTED_MODULE_6__.buildRESTDescriptor)((0,_wix_sdk_runtime_context__WEBPACK_IMPORTED_MODULE_7__.runWithoutContext)(() => (0,_ambassador_modules_js__WEBPACK_IMPORTED_MODULE_8__.isAmbassadorModule)(modules))
                ? (0,_ambassador_modules_js__WEBPACK_IMPORTED_MODULE_8__.toHTTPModule)(modules)
                : modules, metadata ?? {}, boundFetch, (relativeUrl, fetchOptions) => {
                const finalUrl = new URL(relativeUrl, `https://${apiBaseUrl}`);
                finalUrl.host = apiBaseUrl;
                finalUrl.protocol = 'https';
                return boundFetch(finalUrl.toString(), fetchOptions);
            }, { HTTPHost: apiBaseUrl });
        }
        else if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(modules)) {
            return Object.fromEntries(Object.entries(modules).map(([key, value]) => {
                return [key, use(value, modules[_common_js__WEBPACK_IMPORTED_MODULE_5__.PUBLIC_METADATA_KEY])];
            }));
        }
        else {
            return modules;
        }
    };
    const setHeaders = (headers) => {
        for (const k in headers) {
            _headers[k] = headers[k];
        }
    };
    const wrappedModules = config.modules
        ? use(config.modules)
        : {};
    return {
        ...wrappedModules,
        auth: authStrategy,
        setHeaders,
        use,
        enableContext(contextType, opts = { elevated: false }) {
            if (contextType === 'global') {
                if (globalThis.__wix_context__ != null) {
                    if (opts.elevated) {
                        globalThis.__wix_context__.elevatedClient = this;
                    }
                    else {
                        globalThis.__wix_context__.client = this;
                    }
                }
                else {
                    if (opts.elevated) {
                        globalThis.__wix_context__ = { elevatedClient: this };
                    }
                    else {
                        globalThis.__wix_context__ = { client: this };
                    }
                }
            }
            else {
                if (opts.elevated) {
                    _wix_sdk_context__WEBPACK_IMPORTED_MODULE_9__.wixContext.elevatedClient = this;
                }
                else {
                    _wix_sdk_context__WEBPACK_IMPORTED_MODULE_9__.wixContext.client = this;
                }
            }
        },
        fetch: (relativeUrl, options) => {
            const apiBaseUrl = config.host?.apiBaseUrl ?? _common_js__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_API_URL;
            const finalUrl = new URL(relativeUrl, `https://${apiBaseUrl}`);
            finalUrl.host = apiBaseUrl;
            finalUrl.protocol = 'https';
            return boundFetch(finalUrl.toString(), options);
        },
        fetchWithAuth: async (urlOrRequest, requestInit) => {
            if (typeof urlOrRequest === 'string' || urlOrRequest instanceof URL) {
                return fetch(urlOrRequest, {
                    ...requestInit,
                    headers: {
                        ...requestInit?.headers,
                        ...(await boundGetAuthHeaders()).headers,
                    },
                });
            }
            else {
                for (const [k, v] of Object.entries((await boundGetAuthHeaders()).headers)) {
                    urlOrRequest.headers.set(k, v);
                }
                return fetch(urlOrRequest, requestInit);
            }
        },
        async graphql(query, variables, opts = {
            apiVersion: 'alpha',
        }) {
            const apiBaseUrl = config?.host?.apiBaseUrl ?? _common_js__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_API_URL;
            const res = await boundFetch(`https://${apiBaseUrl}/graphql/${opts.apiVersion}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, variables }),
            });
            if (res.status !== 200) {
                throw new _fetch_error_js__WEBPACK_IMPORTED_MODULE_10__.FetchErrorResponse(`GraphQL request failed with status ${res.status}`, res);
            }
            const { data, errors } = await res.json();
            return { data: data ?? {}, errors };
        },
        webhooks: eventHandlersClient,
        servicePlugins: servicePluginsClient,
    };
}


/***/ }),

/***/ "./node_modules/@wix/sdk/node_modules/@wix/sdk-runtime/build/context-v2.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@wix/sdk/node_modules/@wix/sdk-runtime/build/context-v2.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventDefinition: () => (/* reexport safe */ _wix_sdk_types__WEBPACK_IMPORTED_MODULE_0__.EventDefinition),
/* harmony export */   ServicePluginDefinition: () => (/* reexport safe */ _wix_sdk_types__WEBPACK_IMPORTED_MODULE_0__.ServicePluginDefinition),
/* harmony export */   contextualizeEventDefinitionModuleV2: () => (/* binding */ contextualizeEventDefinitionModuleV2),
/* harmony export */   contextualizeHostModuleV2: () => (/* binding */ contextualizeHostModuleV2),
/* harmony export */   contextualizeRESTModuleV2: () => (/* binding */ contextualizeRESTModuleV2),
/* harmony export */   contextualizeSerivcePluginModuleV2: () => (/* binding */ contextualizeSerivcePluginModuleV2)
/* harmony export */ });
/* harmony import */ var _wix_sdk_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/sdk-types/build/browser/index.mjs");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context.js */ "./node_modules/@wix/sdk/node_modules/@wix/sdk-runtime/build/context.js");



function contextualizeHostModuleV2(hostModule, props) {
    return {
        ...hostModule,
        ...Object.fromEntries(props.map((prop) => [
            prop,
            (...args) => {
                const context = (0,_context_js__WEBPACK_IMPORTED_MODULE_1__.resolveContext)();
                if (!context) {
                    throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
                }
                return context
                    .initWixModules(hostModule)[prop].apply(undefined, args);
            },
        ])),
    };
}
function contextualizeRESTModuleV2(restModule, elevated) {
    return ((...args) => {
        const context = (0,_context_js__WEBPACK_IMPORTED_MODULE_1__.resolveContext)();
        if (!context) {
            // @ts-expect-error - if there is no context, we want to behave like the original module
            return restModule.apply(undefined, args);
        }
        return (context
            .initWixModules(restModule, elevated)
            // @ts-expect-error - we know the args here are meant to be passed to the initalized module
            .apply(undefined, args));
    });
}
function contextualizeEventDefinitionModuleV2(eventDefinition) {
    const contextualMethod = ((...args) => {
        const context = (0,_context_js__WEBPACK_IMPORTED_MODULE_1__.resolveContext)();
        if (!context) {
            // this line should throw, but this would be a breaking change for older SDK versions
            // this is because in wixClient there's code that calls any function it detects and checks
            // if it's an ambassador module (see isAmbassadorModule)
            return () => { };
        }
        return context.initWixModules(eventDefinition).apply(undefined, args);
    });
    contextualMethod.__type = eventDefinition.__type;
    contextualMethod.type = eventDefinition.type;
    contextualMethod.isDomainEvent = eventDefinition.isDomainEvent;
    contextualMethod.transformations = eventDefinition.transformations;
    return contextualMethod;
}
function contextualizeSerivcePluginModuleV2(servicePlugin) {
    const contextualMethod = ((...args) => {
        const context = (0,_context_js__WEBPACK_IMPORTED_MODULE_1__.resolveContext)();
        if (!context) {
            // this line should throw, but this would be a breaking change for older SDK versions
            // this is because in wixClient there's code that calls any function it detects and checks
            // if it's an ambassador module (see isAmbassadorModule)
            return () => { };
        }
        return context.initWixModules(servicePlugin).apply(undefined, args);
    });
    contextualMethod.__type = servicePlugin.__type;
    contextualMethod.componentType = servicePlugin.componentType;
    contextualMethod.methods = servicePlugin.methods;
    return contextualMethod;
}


/***/ }),

/***/ "./node_modules/@wix/sdk/node_modules/@wix/sdk-runtime/build/context.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@wix/sdk/node_modules/@wix/sdk-runtime/build/context.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventDefinition: () => (/* reexport safe */ _context_v2_js__WEBPACK_IMPORTED_MODULE_1__.EventDefinition),
/* harmony export */   ServicePluginDefinition: () => (/* reexport safe */ _context_v2_js__WEBPACK_IMPORTED_MODULE_1__.ServicePluginDefinition),
/* harmony export */   contextualizeEventDefinitionModule: () => (/* binding */ contextualizeEventDefinitionModule),
/* harmony export */   contextualizeEventDefinitionModuleV2: () => (/* reexport safe */ _context_v2_js__WEBPACK_IMPORTED_MODULE_1__.contextualizeEventDefinitionModuleV2),
/* harmony export */   contextualizeHostModule: () => (/* binding */ contextualizeHostModule),
/* harmony export */   contextualizeHostModuleV2: () => (/* reexport safe */ _context_v2_js__WEBPACK_IMPORTED_MODULE_1__.contextualizeHostModuleV2),
/* harmony export */   contextualizeRESTModule: () => (/* binding */ contextualizeRESTModule),
/* harmony export */   contextualizeRESTModuleV2: () => (/* reexport safe */ _context_v2_js__WEBPACK_IMPORTED_MODULE_1__.contextualizeRESTModuleV2),
/* harmony export */   contextualizeSerivcePluginModule: () => (/* binding */ contextualizeSerivcePluginModule),
/* harmony export */   contextualizeSerivcePluginModuleV2: () => (/* reexport safe */ _context_v2_js__WEBPACK_IMPORTED_MODULE_1__.contextualizeSerivcePluginModuleV2),
/* harmony export */   resolveContext: () => (/* binding */ resolveContext),
/* harmony export */   runWithoutContext: () => (/* binding */ runWithoutContext)
/* harmony export */ });
/* harmony import */ var _wix_sdk_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/sdk-context */ "./node_modules/@wix/sdk-context/build/browser/index.mjs");
/* harmony import */ var _context_v2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context-v2.js */ "./node_modules/@wix/sdk/node_modules/@wix/sdk-runtime/build/context-v2.js");

function resolveContext() {
    const oldContext = typeof $wixContext !== 'undefined' && $wixContext.initWixModules
        ? $wixContext.initWixModules
        : typeof globalThis.__wix_context__ !== 'undefined' &&
            globalThis.__wix_context__.initWixModules
            ? globalThis.__wix_context__.initWixModules
            : undefined;
    if (oldContext) {
        return {
            // @ts-expect-error
            initWixModules(modules, elevated) {
                return runWithoutContext(() => oldContext(modules, elevated));
            },
            fetchWithAuth() {
                throw new Error('fetchWithAuth is not available in this context');
            },
            graphql() {
                throw new Error('graphql is not available in this context');
            },
        };
    }
    const contextualClient = typeof $wixContext !== 'undefined'
        ? $wixContext.client
        : typeof _wix_sdk_context__WEBPACK_IMPORTED_MODULE_0__.wixContext.client !== 'undefined'
            ? _wix_sdk_context__WEBPACK_IMPORTED_MODULE_0__.wixContext.client
            : typeof globalThis.__wix_context__ !== 'undefined'
                ? globalThis.__wix_context__.client
                : undefined;
    const elevatedClient = typeof $wixContext !== 'undefined'
        ? $wixContext.elevatedClient
        : typeof _wix_sdk_context__WEBPACK_IMPORTED_MODULE_0__.wixContext.elevatedClient !== 'undefined'
            ? _wix_sdk_context__WEBPACK_IMPORTED_MODULE_0__.wixContext.elevatedClient
            : typeof globalThis.__wix_context__ !== 'undefined'
                ? globalThis.__wix_context__.elevatedClient
                : undefined;
    if (!contextualClient && !elevatedClient) {
        return;
    }
    return {
        initWixModules(wixModules, elevated) {
            if (elevated) {
                if (!elevatedClient) {
                    throw new Error('An elevated client is required to use elevated modules. Make sure to initialize the Wix context with an elevated client before using elevated SDK modules');
                }
                return runWithoutContext(() => elevatedClient.use(wixModules));
            }
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return runWithoutContext(() => contextualClient.use(wixModules));
        },
        fetchWithAuth: (urlOrRequest, requestInit) => {
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return contextualClient.fetchWithAuth(urlOrRequest, requestInit);
        },
        async graphql(query, variables, opts) {
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return contextualClient.graphql(query, variables, opts);
        },
    };
}
function contextualizeHostModule(hostModule, prop) {
    return (...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context.initWixModules(hostModule)[prop].apply(undefined, args);
    };
}
function contextualizeRESTModule(restModule, expectedArgsLength) {
    return ((...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context
            .initWixModules(restModule, args[expectedArgsLength]?.suppressAuth ? true : false)
            .apply(undefined, args);
    });
}
function contextualizeEventDefinitionModule(eventDefinition) {
    return ((...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context.initWixModules(eventDefinition).apply(undefined, args);
    });
}
function contextualizeSerivcePluginModule(servicePlugin) {
    return ((...args) => {
        const context = resolveContext();
        if (!context) {
            throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
        }
        return context.initWixModules(servicePlugin).apply(undefined, args);
    });
}

function runWithoutContext(fn) {
    const globalContext = globalThis.__wix_context__;
    const moduleContext = {
        client: _wix_sdk_context__WEBPACK_IMPORTED_MODULE_0__.wixContext.client,
        elevatedClient: _wix_sdk_context__WEBPACK_IMPORTED_MODULE_0__.wixContext.elevatedClient,
    };
    let closureContext;
    globalThis.__wix_context__ = undefined;
    _wix_sdk_context__WEBPACK_IMPORTED_MODULE_0__.wixContext.client = undefined;
    _wix_sdk_context__WEBPACK_IMPORTED_MODULE_0__.wixContext.elevatedClient = undefined;
    if (typeof $wixContext !== 'undefined') {
        closureContext = {
            client: $wixContext?.client,
            elevatedClient: $wixContext?.elevatedClient,
        };
        delete $wixContext.client;
        delete $wixContext.elevatedClient;
    }
    try {
        return fn();
    }
    finally {
        globalThis.__wix_context__ = globalContext;
        _wix_sdk_context__WEBPACK_IMPORTED_MODULE_0__.wixContext.client = moduleContext.client;
        _wix_sdk_context__WEBPACK_IMPORTED_MODULE_0__.wixContext.elevatedClient = moduleContext.elevatedClient;
        if (typeof $wixContext !== 'undefined') {
            $wixContext.client = closureContext.client;
            $wixContext.elevatedClient = closureContext.elevatedClient;
        }
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/element.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wix_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/sdk */ "./node_modules/@wix/sdk/build/wixClient.js");
/* harmony import */ var _wix_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wix/site */ "./node_modules/@wix/site/dist/esm/index.js");
/* harmony import */ var _wix_site_bookings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wix/site-bookings */ "./node_modules/@wix/site-bookings/dist/cjs/index.js");




let wixClient;

class MyCustomElement extends HTMLElement {
  setColor(color) {
    this.container.style.backgroundColor = color || 'white';
  }

  setTextContent(text) {
    this.textElement.textContent = text || '';
  }

  connectedCallback() {
    // Create a shadow root
    this.attachShadow({ mode: 'open' });

    // Create a container for the content
    this.container = document.createElement('div');
    this.container.style.padding = '10px';
    this.shadowRoot.appendChild(this.container);

    // Create a container for the text content
    this.textElement = document.createElement('span');
    this.textElement.style.fontSize = '18px';
    this.container.appendChild(this.textElement);

    // Set the initial color and text content
    this.setColor(this.getAttribute('color'));
    this.setTextContent("init");

    // Handle wixClient initialization as needed (adjust based on your requirements)
    // ...
  }

  static get observedAttributes() {
    return ['color', 'bookingsserviceid'];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color' && oldValue !== newValue) {
      console.log("Color attribute changed");
      this.setColor(newValue);
    } else if (name === 'bookingsserviceid' && oldValue !== newValue) {
      if (wixClient) {
        this.setAvailability(newValue)
      } else { console.log("No client") }
    }
  }

  accessTokenListener(accessTokenGetter) {
    wixClient = (0,_wix_sdk__WEBPACK_IMPORTED_MODULE_0__.createClient)({
      host: _wix_site__WEBPACK_IMPORTED_MODULE_1__.site.host({ applicationId: "7dea53d2-fbd3-463a-990a-22216a7cfb35" }),
      auth: _wix_site__WEBPACK_IMPORTED_MODULE_1__.site.auth(accessTokenGetter),
      modules: { bookings: _wix_site_bookings__WEBPACK_IMPORTED_MODULE_2__.bookings },
    });
    console.log(`createClient`, wixClient)
    this.setAvailability(this.getAttribute('bookingsserviceid'))
  }

  async setAvailability(serviceId) {
    try {
      const availability = await wixClient.bookings.getServiceAvailability(serviceId);
      const slots = availability.slots;
      const firstSlot = slots[0];
      console.log(firstSlot);
      const options = { weekday: "long", day: "numeric", month: "short" };
      const firstSlotDate = firstSlot.startDateTime.toLocaleDateString(
        "en-US",
        options,
      );
      this.setTextContent("Next availability: " + firstSlotDate);
    } catch (error) {
      console.error("Error fetching availability:", error);
      // Handle the error appropriately, e.g., display an error message to the user
      this.setTextContent("Error fetching availability");
    }
  }
}

customElements.define('ce-josh', MyCustomElement);
})();

/******/ })()
;