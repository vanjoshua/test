/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wix/metro-runtime/dist/esm/flatten-params.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wix/metro-runtime/dist/esm/flatten-params.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toURLSearchParams: () => (/* binding */ toURLSearchParams)
/* harmony export */ });
/* harmony import */ var js_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-base64 */ "./node_modules/js-base64/base64.mjs");

// Flatten a nested object to params object { field: { text: 'foo' } } => { field.text ='foo' }
function flattenParams(data, path = '') {
    const params = {};
    Object.entries(data).forEach(([key, value]) => {
        const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
        const fieldPath = resolvePath(path, key);
        if (isObject) {
            const serializedObject = flattenParams(value, fieldPath);
            Object.assign(params, serializedObject);
        }
        else {
            params[fieldPath] = value;
        }
    });
    return params;
}
function resolvePath(path, key) {
    return `${path}${path ? '.' : ''}${key}`;
}
function toURLSearchParams(params, isComplexRequest) {
    const flatten = flattenParams(params);
    const searchParams = Object.entries(flatten).reduce((urlSearchParams, [key, value]) => {
        // inorder to make `foo: [1,2]` turn into `foo=1&foo=2` and not `foo[]=1&foo[]=2`
        const keyParams = Array.isArray(value) ? value : [value];
        keyParams.forEach((param) => {
            if (param === undefined || param === null) {
                return;
            }
            urlSearchParams.append(key, param);
        });
        return urlSearchParams;
    }, new URLSearchParams());
    // https://github.com/wix-private/server-infra/tree/master/framework/grpc/rest#complex-requests-messages-with-get-mappings
    if (isComplexRequest) {
        searchParams.append('.r', (0,js_base64__WEBPACK_IMPORTED_MODULE_0__.encode)(JSON.stringify(params), true));
    }
    return searchParams;
}
//# sourceMappingURL=flatten-params.js.map

/***/ }),

/***/ "./node_modules/@wix/metro-runtime/dist/esm/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@wix/metro-runtime/dist/esm/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseLeanSchemaRef: () => (/* reexport safe */ _serialization__WEBPACK_IMPORTED_MODULE_0__.parseLeanSchemaRef),
/* harmony export */   resolveUrl: () => (/* reexport safe */ _url_resolver__WEBPACK_IMPORTED_MODULE_1__.resolveUrl),
/* harmony export */   toURLSearchParams: () => (/* reexport safe */ _flatten_params__WEBPACK_IMPORTED_MODULE_2__.toURLSearchParams)
/* harmony export */ });
/* harmony import */ var _serialization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serialization */ "./node_modules/@wix/metro-runtime/dist/esm/serialization/index.js");
/* harmony import */ var _url_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url-resolver */ "./node_modules/@wix/metro-runtime/dist/esm/url-resolver.js");
/* harmony import */ var _flatten_params__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flatten-params */ "./node_modules/@wix/metro-runtime/dist/esm/flatten-params.js");



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wix/metro-runtime/dist/esm/serialization/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wix/metro-runtime/dist/esm/serialization/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseLeanSchemaRef: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.parseLeanSchemaRef)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/@wix/metro-runtime/dist/esm/serialization/utils.js");

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wix/metro-runtime/dist/esm/serialization/utils.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wix/metro-runtime/dist/esm/serialization/utils.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseLeanSchemaRef: () => (/* binding */ parseLeanSchemaRef)
/* harmony export */ });
function parseLeanSchemaRef(renderedSchemaName = '') {
    const [typeOrName, schemaName] = getSchemaNameAndType(renderedSchemaName);
    if (schemaName) {
        return {
            schemaName,
            schemaType: typeOrName,
        };
    }
    return {
        schemaName: typeOrName,
    };
}
// if there is no type, returns only the name
const getSchemaNameAndType = (leanSchema) => leanSchema.split('#');
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/@wix/metro-runtime/dist/esm/url-resolver.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wix/metro-runtime/dist/esm/url-resolver.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveUrl: () => (/* binding */ resolveUrl)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/@wix/metro-runtime/dist/esm/utils.js");

const USER_DOMAIN = '_';
const DOMAINS = ['wix.com', 'editorx.com'];
const WIX_API_DOMAINS = ['42.wixprod.net', 'uw2-edt-1.wixprod.net'];
const DEV_WIX_CODE_DOMAIN = 'dev.wix-code.com';
const REGEX_CAPTURE_PROTO_FIELD = /{(.*)}/;
const REGEX_CAPTURE_DOMAINS = new RegExp(`\\.(${DOMAINS.join('|')})$`);
const REGEX_CAPTURE_API_DOMAINS = new RegExp(`\\.(${WIX_API_DOMAINS.join('|')})$`);
const REGEX_CAPTURE_DEV_WIX_CODE_DOMAIN = new RegExp(`.*\\.${DEV_WIX_CODE_DOMAIN}$`);
function resolveUrl(opts) {
    const domain = resolveDomain(opts.host);
    const mappings = resolveMappingsByDomain(domain, opts.domainToMappings);
    const path = injectDataIntoProtoPath(opts.protoPath, opts.data || {});
    return resolvePath(path, mappings);
}
function injectDataIntoProtoPath(protoPath, data) {
    return protoPath
        .split('/')
        .map((path) => maybeProtoPathToData(path, data))
        .join('/');
}
function maybeProtoPathToData(protoPath, data) {
    const protoRegExpMatch = protoPath.match(REGEX_CAPTURE_PROTO_FIELD) || [];
    const field = protoRegExpMatch[1];
    if (field) {
        const suffix = protoPath.replace(protoRegExpMatch[0], '');
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.findByPath)(data, field, protoPath, suffix);
    }
    return protoPath;
}
function resolveDomain(host) {
    const resolvedHost = fixHostExceptions(host);
    return resolvedHost
        .replace(REGEX_CAPTURE_DOMAINS, '._base_domain_')
        .replace(REGEX_CAPTURE_API_DOMAINS, '._api_base_domain_')
        .replace(REGEX_CAPTURE_DEV_WIX_CODE_DOMAIN, '*.dev.wix-code.com');
}
// hosts which standard string replacing doesn't apply to them, will be fixed here.
function fixHostExceptions(host) {
    // https://system-kb.wixanswers.com/kb/en/article/editorx-domains-matching-to-wixcom
    return host.replace('create.editorx.com', 'editor.editorx.com');
}
function resolveMappingsByDomain(domain, domainToMappings) {
    const mappings = domainToMappings[domain] || domainToMappings[USER_DOMAIN];
    if (!mappings) {
        if (isBaseDomain(domain)) {
            // fallback <lang>.wix.com sub domains to www.wix.com
            // since all of the languages subdomain are not mapped automatically in FP and we want to support those kind of calls
            // for example: fr.wix.com
            return domainToMappings[wwwBaseDomain];
        }
    }
    return mappings;
}
function resolvePath(protoPath, mappings) {
    const mapping = mappings?.find((m) => protoPath.startsWith(m.destPath));
    if (!mapping) {
        // todo: should we return the path? if no - what should we do in case of testings?
        return protoPath;
    }
    return mapping.srcPath + protoPath.slice(mapping.destPath.length);
}
function isBaseDomain(domain) {
    return !!domain.match(/\._base_domain_$/);
}
const wwwBaseDomain = 'www._base_domain_';
//# sourceMappingURL=url-resolver.js.map

/***/ }),

/***/ "./node_modules/@wix/metro-runtime/dist/esm/utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/@wix/metro-runtime/dist/esm/utils.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findByPath: () => (/* binding */ findByPath)
/* harmony export */ });
function findByPath(obj, path, defaultValue, suffix) {
    let result = obj;
    for (const field of path.split('.')) {
        if (!result) {
            return defaultValue;
        }
        result = result[field];
    }
    return `${result}${suffix}`;
}
//# sourceMappingURL=utils.js.map

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
      if (!clientSdk) {
        throw new Error('Wix Site SDK only works in a Wix site environment. Learn more: https://dev.wix.com/docs/sdk/host-modules/site/introduction');
      }
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
    host: options => {
      var _window, _window2;
      const host = createHost(options);
      const apiBaseUrl = getApiBaseUrl();
      return {
        ...host,
        apiBaseUrl,
        essentials: {
          language: (_window = window) == null || (_window = _window.commonConfig) == null ? void 0 : _window.language,
          locale: (_window2 = window) == null || (_window2 = _window2.commonConfig) == null ? void 0 : _window2.locale
        }
      };
    },
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
        getAccessTokenInjector: () => {
          injectorCreated = true;
          return _getAccessTokenFn => {
            resolveAccessTokenFn(_getAccessTokenFn);
          };
        }
      };
    }
  };
};
function getApiBaseUrl() {
  const wixEmbedsAPI = typeof window !== 'undefined' ? window.wixEmbedsAPI : undefined;
  const apiBaseUrl = wixEmbedsAPI == null || wixEmbedsAPI.getExternalBaseUrl == null ? void 0 : wixEmbedsAPI.getExternalBaseUrl();
  if (!apiBaseUrl) {
    return;
  }

  // clean the protocol from the URL
  const parsedUrlObject = new URL(apiBaseUrl);
  if (parsedUrlObject != null && parsedUrlObject.pathname && parsedUrlObject.pathname !== '/') {
    return "" + parsedUrlObject.hostname + parsedUrlObject.pathname;
  }
  return parsedUrlObject.hostname;
}
//# sourceMappingURL=websiteHostModule.js.map

/***/ }),

/***/ "./node_modules/@wix/stores_products/build/es/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@wix/stores_products/build/es/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiscountType: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.DiscountType),
/* harmony export */   FileType: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.FileType),
/* harmony export */   InventoryStatus: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.InventoryStatus),
/* harmony export */   MeasurementUnit: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.MeasurementUnit),
/* harmony export */   MediaItemType: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.MediaItemType),
/* harmony export */   OptionType: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.OptionType),
/* harmony export */   ProductType: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.ProductType),
/* harmony export */   SortOrder: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.SortOrder),
/* harmony export */   Version: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.Version),
/* harmony export */   WebhookIdentityType: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.WebhookIdentityType),
/* harmony export */   addProductMedia: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.addProductMedia),
/* harmony export */   addProductMediaToChoices: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.addProductMediaToChoices),
/* harmony export */   addProductsToCollection: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.addProductsToCollection),
/* harmony export */   bulkAdjustProductProperty: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.bulkAdjustProductProperty),
/* harmony export */   bulkUpdateProductsProperty: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.bulkUpdateProductsProperty),
/* harmony export */   createCollection: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.createCollection),
/* harmony export */   createProduct: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.createProduct),
/* harmony export */   deleteCollection: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.deleteCollection),
/* harmony export */   deleteProduct: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.deleteProduct),
/* harmony export */   deleteProductOptions: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.deleteProductOptions),
/* harmony export */   getCollectionBySlug: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.getCollectionBySlug),
/* harmony export */   getProduct: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.getProduct),
/* harmony export */   getProductOptionsAvailability: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.getProductOptionsAvailability),
/* harmony export */   getStoreVariant: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.getStoreVariant),
/* harmony export */   onProductChanged: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.onProductChanged),
/* harmony export */   onProductCollectionChanged: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.onProductCollectionChanged),
/* harmony export */   onProductCollectionCreated: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.onProductCollectionCreated),
/* harmony export */   onProductCollectionDeleted: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.onProductCollectionDeleted),
/* harmony export */   onProductCreated: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.onProductCreated),
/* harmony export */   onProductDeleted: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.onProductDeleted),
/* harmony export */   onProductVariantsChanged: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.onProductVariantsChanged),
/* harmony export */   publicOnProductChanged: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.publicOnProductChanged),
/* harmony export */   publicOnProductCollectionChanged: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.publicOnProductCollectionChanged),
/* harmony export */   publicOnProductCollectionCreated: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.publicOnProductCollectionCreated),
/* harmony export */   publicOnProductCollectionDeleted: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.publicOnProductCollectionDeleted),
/* harmony export */   publicOnProductCreated: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.publicOnProductCreated),
/* harmony export */   publicOnProductDeleted: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.publicOnProductDeleted),
/* harmony export */   publicOnProductVariantsChanged: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.publicOnProductVariantsChanged),
/* harmony export */   queryProductVariants: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.queryProductVariants),
/* harmony export */   queryProducts: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.queryProducts),
/* harmony export */   queryStoreVariants: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.queryStoreVariants),
/* harmony export */   removeBrand: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.removeBrand),
/* harmony export */   removeProductMedia: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.removeProductMedia),
/* harmony export */   removeProductMediaFromChoices: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.removeProductMediaFromChoices),
/* harmony export */   removeProductsFromCollection: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.removeProductsFromCollection),
/* harmony export */   removeRibbon: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.removeRibbon),
/* harmony export */   resetAllProductVariantData: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.resetAllProductVariantData),
/* harmony export */   updateCollection: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.updateCollection),
/* harmony export */   updateProduct: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.updateProduct),
/* harmony export */   updateProductVariants: () => (/* reexport safe */ _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__.updateProductVariants)
/* harmony export */ });
/* harmony import */ var _src_stores_catalog_v1_product_products_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/stores-catalog-v1-product-products.context */ "./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.context.js");

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.context.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.context.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiscountType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_3__.DiscountType),
/* harmony export */   FileType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_3__.FileType),
/* harmony export */   InventoryStatus: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_3__.InventoryStatus),
/* harmony export */   MeasurementUnit: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_3__.MeasurementUnit),
/* harmony export */   MediaItemType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_3__.MediaItemType),
/* harmony export */   OptionType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_3__.OptionType),
/* harmony export */   ProductType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_3__.ProductType),
/* harmony export */   SortOrder: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_3__.SortOrder),
/* harmony export */   Version: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_3__.Version),
/* harmony export */   WebhookIdentityType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_3__.WebhookIdentityType),
/* harmony export */   addProductMedia: () => (/* binding */ addProductMedia),
/* harmony export */   addProductMediaToChoices: () => (/* binding */ addProductMediaToChoices),
/* harmony export */   addProductsToCollection: () => (/* binding */ addProductsToCollection),
/* harmony export */   bulkAdjustProductProperty: () => (/* binding */ bulkAdjustProductProperty),
/* harmony export */   bulkUpdateProductsProperty: () => (/* binding */ bulkUpdateProductsProperty),
/* harmony export */   createCollection: () => (/* binding */ createCollection),
/* harmony export */   createProduct: () => (/* binding */ createProduct),
/* harmony export */   deleteCollection: () => (/* binding */ deleteCollection),
/* harmony export */   deleteProduct: () => (/* binding */ deleteProduct),
/* harmony export */   deleteProductOptions: () => (/* binding */ deleteProductOptions),
/* harmony export */   getCollectionBySlug: () => (/* binding */ getCollectionBySlug),
/* harmony export */   getProduct: () => (/* binding */ getProduct),
/* harmony export */   getProductOptionsAvailability: () => (/* binding */ getProductOptionsAvailability),
/* harmony export */   getStoreVariant: () => (/* binding */ getStoreVariant),
/* harmony export */   onProductChanged: () => (/* binding */ onProductChanged),
/* harmony export */   onProductCollectionChanged: () => (/* binding */ onProductCollectionChanged),
/* harmony export */   onProductCollectionCreated: () => (/* binding */ onProductCollectionCreated),
/* harmony export */   onProductCollectionDeleted: () => (/* binding */ onProductCollectionDeleted),
/* harmony export */   onProductCreated: () => (/* binding */ onProductCreated),
/* harmony export */   onProductDeleted: () => (/* binding */ onProductDeleted),
/* harmony export */   onProductVariantsChanged: () => (/* binding */ onProductVariantsChanged),
/* harmony export */   publicOnProductChanged: () => (/* reexport safe */ _stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductChanged),
/* harmony export */   publicOnProductCollectionChanged: () => (/* reexport safe */ _stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductCollectionChanged),
/* harmony export */   publicOnProductCollectionCreated: () => (/* reexport safe */ _stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductCollectionCreated),
/* harmony export */   publicOnProductCollectionDeleted: () => (/* reexport safe */ _stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductCollectionDeleted),
/* harmony export */   publicOnProductCreated: () => (/* reexport safe */ _stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductCreated),
/* harmony export */   publicOnProductDeleted: () => (/* reexport safe */ _stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductDeleted),
/* harmony export */   publicOnProductVariantsChanged: () => (/* reexport safe */ _stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductVariantsChanged),
/* harmony export */   queryProductVariants: () => (/* binding */ queryProductVariants),
/* harmony export */   queryProducts: () => (/* binding */ queryProducts),
/* harmony export */   queryStoreVariants: () => (/* binding */ queryStoreVariants),
/* harmony export */   removeBrand: () => (/* binding */ removeBrand),
/* harmony export */   removeProductMedia: () => (/* binding */ removeProductMedia),
/* harmony export */   removeProductMediaFromChoices: () => (/* binding */ removeProductMediaFromChoices),
/* harmony export */   removeProductsFromCollection: () => (/* binding */ removeProductsFromCollection),
/* harmony export */   removeRibbon: () => (/* binding */ removeRibbon),
/* harmony export */   resetAllProductVariantData: () => (/* binding */ resetAllProductVariantData),
/* harmony export */   updateCollection: () => (/* binding */ updateCollection),
/* harmony export */   updateProduct: () => (/* binding */ updateProduct),
/* harmony export */   updateProductVariants: () => (/* binding */ updateProductVariants)
/* harmony export */ });
/* harmony import */ var _stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stores-catalog-v1-product-products.public */ "./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.public.js");
/* harmony import */ var _wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/sdk-runtime/rest-modules */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/rest-modules.js");
/* harmony import */ var _wix_sdk_runtime_event_definition_modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wix/sdk-runtime/event-definition-modules */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/event-definition-modules.js");
/* harmony import */ var _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stores-catalog-v1-product-products.universal */ "./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.universal.js");










const createProduct = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.createProduct);
const updateProduct = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.updateProduct);
const deleteProduct = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.deleteProduct);
const updateProductVariants = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.updateProductVariants);
const resetAllProductVariantData = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.resetAllProductVariantData);
const addProductsToCollection = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.addProductsToCollection);
const removeProductsFromCollection = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.removeProductsFromCollection);
const addProductMedia = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.addProductMedia);
const removeProductMedia = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.removeProductMedia);
const addProductMediaToChoices = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.addProductMediaToChoices);
const removeProductMediaFromChoices = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.removeProductMediaFromChoices);
const deleteProductOptions = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.deleteProductOptions);
const removeBrand = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.removeBrand);
const createCollection = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.createCollection);
const updateCollection = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.updateCollection);
const deleteCollection = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.deleteCollection);
const removeRibbon = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.removeRibbon);
const bulkUpdateProductsProperty = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.bulkUpdateProductsProperty);
const bulkAdjustProductProperty = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.bulkAdjustProductProperty);
const queryProducts = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.queryProducts);
const getProduct = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.getProduct);
const getCollectionBySlug = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.getCollectionBySlug);
const getProductOptionsAvailability = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.getProductOptionsAvailability);
const queryProductVariants = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.queryProductVariants);
const queryStoreVariants = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.queryStoreVariants);
const getStoreVariant = (0,_wix_sdk_runtime_rest_modules__WEBPACK_IMPORTED_MODULE_0__.createRESTModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.getStoreVariant);

/**
 * Triggered when a product is created.
 */
const onProductCreated = (0,_wix_sdk_runtime_event_definition_modules__WEBPACK_IMPORTED_MODULE_2__.createEventModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductCreated);

/**
 * Triggered when a product is changed.
 */
const onProductChanged = (0,_wix_sdk_runtime_event_definition_modules__WEBPACK_IMPORTED_MODULE_2__.createEventModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductChanged);

/**
 * Triggered when a product is deleted.
 */
const onProductDeleted = (0,_wix_sdk_runtime_event_definition_modules__WEBPACK_IMPORTED_MODULE_2__.createEventModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductDeleted);

/**
 * Triggered when a collection is created.
 */
const onProductCollectionCreated = (0,_wix_sdk_runtime_event_definition_modules__WEBPACK_IMPORTED_MODULE_2__.createEventModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductCollectionCreated);

/**
 * Triggered when a collection is changed.
 */
const onProductCollectionChanged = (0,_wix_sdk_runtime_event_definition_modules__WEBPACK_IMPORTED_MODULE_2__.createEventModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductCollectionChanged);

/**
 * Triggered when a collection is deleted.
 */
const onProductCollectionDeleted = (0,_wix_sdk_runtime_event_definition_modules__WEBPACK_IMPORTED_MODULE_2__.createEventModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductCollectionDeleted);

/**
 * Triggered when a product variant is changed.
 */
const onProductVariantsChanged = (0,_wix_sdk_runtime_event_definition_modules__WEBPACK_IMPORTED_MODULE_2__.createEventModule)(_stores_catalog_v1_product_products_public__WEBPACK_IMPORTED_MODULE_1__.onProductVariantsChanged);

//# sourceMappingURL=stores-catalog-v1-product-products.context.js.map

/***/ }),

/***/ "./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.http.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.http.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addProductMedia: () => (/* binding */ addProductMedia),
/* harmony export */   addProductMediaToChoices: () => (/* binding */ addProductMediaToChoices),
/* harmony export */   addProductsToCollection: () => (/* binding */ addProductsToCollection),
/* harmony export */   bulkAdjustProductProperties: () => (/* binding */ bulkAdjustProductProperties),
/* harmony export */   bulkUpdateProducts: () => (/* binding */ bulkUpdateProducts),
/* harmony export */   createCollection: () => (/* binding */ createCollection),
/* harmony export */   createProduct: () => (/* binding */ createProduct),
/* harmony export */   deleteCollection: () => (/* binding */ deleteCollection),
/* harmony export */   deleteProduct: () => (/* binding */ deleteProduct),
/* harmony export */   deleteProductOptions: () => (/* binding */ deleteProductOptions),
/* harmony export */   getCollectionBySlug: () => (/* binding */ getCollectionBySlug),
/* harmony export */   getProduct: () => (/* binding */ getProduct),
/* harmony export */   getStoreVariant: () => (/* binding */ getStoreVariant),
/* harmony export */   productOptionsAvailability: () => (/* binding */ productOptionsAvailability),
/* harmony export */   queryProductVariants: () => (/* binding */ queryProductVariants),
/* harmony export */   queryProductsPlatformized: () => (/* binding */ queryProductsPlatformized),
/* harmony export */   queryStoreVariants: () => (/* binding */ queryStoreVariants),
/* harmony export */   removeBrand: () => (/* binding */ removeBrand),
/* harmony export */   removeProductMedia: () => (/* binding */ removeProductMedia),
/* harmony export */   removeProductMediaFromChoices: () => (/* binding */ removeProductMediaFromChoices),
/* harmony export */   removeProductsFromCollection: () => (/* binding */ removeProductsFromCollection),
/* harmony export */   removeRibbon: () => (/* binding */ removeRibbon),
/* harmony export */   resetAllVariantData: () => (/* binding */ resetAllVariantData),
/* harmony export */   updateCollection: () => (/* binding */ updateCollection),
/* harmony export */   updateProduct: () => (/* binding */ updateProduct),
/* harmony export */   updateVariants: () => (/* binding */ updateVariants)
/* harmony export */ });
/* harmony import */ var _wix_metro_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/metro-runtime */ "./node_modules/@wix/metro-runtime/dist/esm/index.js");
/* harmony import */ var _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wix/sdk-runtime/transformations/float */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/float.js");
/* harmony import */ var _wix_sdk_runtime_transformations_timestamp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wix/sdk-runtime/transformations/timestamp */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/timestamp.js");
/* harmony import */ var _wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wix/sdk-runtime/transformations/transform-paths */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/transform-paths.js");







function resolveWixCatalogApiV1CatalogReadApiUrl(opts) {
    const domainToMappings = {
        '*.dev.wix-code.com': [
            {
                srcPath: '/_api/catalog-reader-server',
                destPath: '',
            },
        ],
        _: [
            {
                srcPath: '/_api/catalog-reader-server',
                destPath: '',
            },
        ],
        'manage._base_domain_': [
            {
                srcPath: '/_api/catalog-reader-server',
                destPath: '',
            },
            {
                srcPath: '/catalog-read-proxy',
                destPath: '',
            },
        ],
        'www._base_domain_': [
            {
                srcPath: '/_api/catalog-reader-server',
                destPath: '',
            },
        ],
        'www.wixapis.com': [
            {
                srcPath: '/stores-reader/v1/products',
                destPath: '/v1/products',
            },
            {
                srcPath: '/stores-reader/v1/variants',
                destPath: '/v1/variants',
            },
            {
                srcPath: '/stores-reader/api/v1/products',
                destPath: '/api/v1/products',
            },
        ],
        'api._api_base_domain_': [
            {
                srcPath: '/catalog-read-proxy',
                destPath: '',
            },
        ],
    };
    return (0,_wix_metro_runtime__WEBPACK_IMPORTED_MODULE_0__.resolveUrl)(Object.assign(opts, { domainToMappings }));
}
function resolveWixCatalogApiV1CatalogWriteApiUrl(opts) {
    const domainToMappings = {
        'api._api_base_domain_': [
            {
                srcPath: '/wix-ecommerce-catalog-web',
                destPath: '',
            },
        ],
        'www._base_domain_': [
            {
                srcPath: '/_api/catalog-server',
                destPath: '',
            },
            {
                srcPath: '/wix-ecommerce-catalog',
                destPath: '',
            },
        ],
        _: [
            {
                srcPath: '/_api/catalog-server',
                destPath: '',
            },
        ],
        'ecom._base_domain_': [
            {
                srcPath: '/_api/catalog-server',
                destPath: '',
            },
        ],
        '*.dev.wix-code.com': [
            {
                srcPath: '/_api/catalog-server',
                destPath: '',
            },
        ],
        '*.pub.wix-code.com': [
            {
                srcPath: '/_api/catalog-server',
                destPath: '',
            },
        ],
        'www.wixapis.com': [
            {
                srcPath: '/stores/v1/collections',
                destPath: '/v1/collections',
            },
            {
                srcPath: '/stores/v1/products',
                destPath: '/v1/products',
            },
            {
                srcPath: '/stores/v1/inventoryItems',
                destPath: '/v1/inventoryItems',
            },
            {
                srcPath: '/stores/v2/inventoryItems',
                destPath: '/v2/inventoryItems',
            },
            {
                srcPath: '/stores/v1/variants',
                destPath: '/v1/variants',
            },
            {
                srcPath: '/stores/v1/bulk/products',
                destPath: '/v1/bulk/products',
            },
            {
                srcPath: '/stores/v1/products-digital',
                destPath: '/v1/products-digital',
            },
        ],
        'manage._base_domain_': [
            {
                srcPath: '/wix-ecommerce-catalog',
                destPath: '',
            },
            {
                srcPath: '/_api/catalog-server',
                destPath: '',
            },
        ],
        'editor.wixapps.net': [
            {
                srcPath: '/_api/catalog-server',
                destPath: '',
            },
        ],
        'www.wixgateway.com': [
            {
                srcPath: '/stores/v1/products',
                destPath: '/v1/products',
            },
            {
                srcPath: '/stores/v1/collections',
                destPath: '/v1/collections',
            },
        ],
        'editor._base_domain_': [
            {
                srcPath: '/_api/catalog-server',
                destPath: '',
            },
        ],
        'blocks._base_domain_': [
            {
                srcPath: '/_api/catalog-server',
                destPath: '',
            },
        ],
        'create.editorx': [
            {
                srcPath: '/_api/catalog-server',
                destPath: '',
            },
        ],
    };
    return (0,_wix_metro_runtime__WEBPACK_IMPORTED_MODULE_0__.resolveUrl)(Object.assign(opts, { domainToMappings }));
}
/** Creates a new product. */
function createProduct(payload) {
    function __createProduct({ host }) {
        const serializedData = (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
            {
                transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformSDKFloatToRESTFloat,
                paths: [
                    { path: 'product.weight' },
                    { path: 'product.price.price' },
                    { path: 'product.price.pricePerUnit' },
                    { path: 'product.priceData.price' },
                    { path: 'product.priceData.pricePerUnit' },
                    { path: 'product.convertedPriceData.price' },
                    { path: 'product.convertedPriceData.pricePerUnit' },
                    { path: 'product.costAndProfitData.itemCost' },
                    { path: 'product.variants.variant.priceData.price' },
                    { path: 'product.variants.variant.priceData.pricePerUnit' },
                    { path: 'product.variants.variant.convertedPriceData.price' },
                    { path: 'product.variants.variant.convertedPriceData.pricePerUnit' },
                    { path: 'product.variants.variant.costAndProfitData.itemCost' },
                    { path: 'product.weightRange.minValue' },
                    { path: 'product.weightRange.maxValue' },
                    { path: 'product.price.discountedPrice' },
                    { path: 'product.priceData.discountedPrice' },
                    { path: 'product.convertedPriceData.discountedPrice' },
                    { path: 'product.priceRange.minValue' },
                    { path: 'product.priceRange.maxValue' },
                    { path: 'product.costAndProfitData.profit' },
                    { path: 'product.costAndProfitData.profitMargin' },
                    { path: 'product.costRange.minValue' },
                    { path: 'product.costRange.maxValue' },
                    { path: 'product.pricePerUnitData.totalQuantity' },
                    { path: 'product.pricePerUnitData.baseQuantity' },
                    { path: 'product.discount.value' },
                    { path: 'product.variants.variant.weight' },
                    { path: 'product.variants.variant.priceData.discountedPrice' },
                    {
                        path: 'product.variants.variant.convertedPriceData.discountedPrice',
                    },
                    { path: 'product.variants.variant.costAndProfitData.profit' },
                    { path: 'product.variants.variant.costAndProfitData.profitMargin' },
                ],
            },
            {
                transformFn: _wix_sdk_runtime_transformations_timestamp__WEBPACK_IMPORTED_MODULE_3__.transformSDKTimestampToRESTTimestamp,
                paths: [
                    { path: 'product.lastUpdated' },
                    { path: 'product.createdDate' },
                ],
            },
        ]);
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.CreateProduct',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products',
                data: serializedData,
                host,
            }),
            data: serializedData,
            transformResponse: (payload) => (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
                {
                    transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformRESTFloatToSDKFloat,
                    paths: [
                        { path: 'product.weight' },
                        { path: 'product.price.price' },
                        { path: 'product.price.pricePerUnit' },
                        { path: 'product.priceData.price' },
                        { path: 'product.priceData.pricePerUnit' },
                        { path: 'product.convertedPriceData.price' },
                        { path: 'product.convertedPriceData.pricePerUnit' },
                        { path: 'product.costAndProfitData.itemCost' },
                        { path: 'product.variants.variant.priceData.price' },
                        { path: 'product.variants.variant.priceData.pricePerUnit' },
                        { path: 'product.variants.variant.convertedPriceData.price' },
                        {
                            path: 'product.variants.variant.convertedPriceData.pricePerUnit',
                        },
                        { path: 'product.variants.variant.costAndProfitData.itemCost' },
                        { path: 'product.weightRange.minValue' },
                        { path: 'product.weightRange.maxValue' },
                        { path: 'product.price.discountedPrice' },
                        { path: 'product.priceData.discountedPrice' },
                        { path: 'product.convertedPriceData.discountedPrice' },
                        { path: 'product.priceRange.minValue' },
                        { path: 'product.priceRange.maxValue' },
                        { path: 'product.costAndProfitData.profit' },
                        { path: 'product.costAndProfitData.profitMargin' },
                        { path: 'product.costRange.minValue' },
                        { path: 'product.costRange.maxValue' },
                        { path: 'product.pricePerUnitData.totalQuantity' },
                        { path: 'product.pricePerUnitData.baseQuantity' },
                        { path: 'product.discount.value' },
                        { path: 'product.variants.variant.weight' },
                        { path: 'product.variants.variant.priceData.discountedPrice' },
                        {
                            path: 'product.variants.variant.convertedPriceData.discountedPrice',
                        },
                        { path: 'product.variants.variant.costAndProfitData.profit' },
                        {
                            path: 'product.variants.variant.costAndProfitData.profitMargin',
                        },
                    ],
                },
                {
                    transformFn: _wix_sdk_runtime_transformations_timestamp__WEBPACK_IMPORTED_MODULE_3__.transformRESTTimestampToSDKTimestamp,
                    paths: [
                        { path: 'product.lastUpdated' },
                        { path: 'product.createdDate' },
                    ],
                },
            ]),
        };
        return metadata;
    }
    return __createProduct;
}
/** Updates specified fields in a product. */
function updateProduct(payload) {
    function __updateProduct({ host }) {
        const serializedData = (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
            {
                transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformSDKFloatToRESTFloat,
                paths: [
                    { path: 'product.weight' },
                    { path: 'product.price.price' },
                    { path: 'product.price.pricePerUnit' },
                    { path: 'product.priceData.price' },
                    { path: 'product.priceData.pricePerUnit' },
                    { path: 'product.convertedPriceData.price' },
                    { path: 'product.convertedPriceData.pricePerUnit' },
                    { path: 'product.costAndProfitData.itemCost' },
                    { path: 'product.variants.variant.priceData.price' },
                    { path: 'product.variants.variant.priceData.pricePerUnit' },
                    { path: 'product.variants.variant.convertedPriceData.price' },
                    { path: 'product.variants.variant.convertedPriceData.pricePerUnit' },
                    { path: 'product.variants.variant.costAndProfitData.itemCost' },
                    { path: 'product.weightRange.minValue' },
                    { path: 'product.weightRange.maxValue' },
                    { path: 'product.price.discountedPrice' },
                    { path: 'product.priceData.discountedPrice' },
                    { path: 'product.convertedPriceData.discountedPrice' },
                    { path: 'product.priceRange.minValue' },
                    { path: 'product.priceRange.maxValue' },
                    { path: 'product.costAndProfitData.profit' },
                    { path: 'product.costAndProfitData.profitMargin' },
                    { path: 'product.costRange.minValue' },
                    { path: 'product.costRange.maxValue' },
                    { path: 'product.pricePerUnitData.totalQuantity' },
                    { path: 'product.pricePerUnitData.baseQuantity' },
                    { path: 'product.discount.value' },
                    { path: 'product.variants.variant.weight' },
                    { path: 'product.variants.variant.priceData.discountedPrice' },
                    {
                        path: 'product.variants.variant.convertedPriceData.discountedPrice',
                    },
                    { path: 'product.variants.variant.costAndProfitData.profit' },
                    { path: 'product.variants.variant.costAndProfitData.profitMargin' },
                ],
            },
            {
                transformFn: _wix_sdk_runtime_transformations_timestamp__WEBPACK_IMPORTED_MODULE_3__.transformSDKTimestampToRESTTimestamp,
                paths: [
                    { path: 'product.lastUpdated' },
                    { path: 'product.createdDate' },
                ],
            },
        ]);
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'PATCH',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.UpdateProduct',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products/{product.id}',
                data: serializedData,
                host,
            }),
            data: serializedData,
            transformResponse: (payload) => (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
                {
                    transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformRESTFloatToSDKFloat,
                    paths: [
                        { path: 'product.weight' },
                        { path: 'product.price.price' },
                        { path: 'product.price.pricePerUnit' },
                        { path: 'product.priceData.price' },
                        { path: 'product.priceData.pricePerUnit' },
                        { path: 'product.convertedPriceData.price' },
                        { path: 'product.convertedPriceData.pricePerUnit' },
                        { path: 'product.costAndProfitData.itemCost' },
                        { path: 'product.variants.variant.priceData.price' },
                        { path: 'product.variants.variant.priceData.pricePerUnit' },
                        { path: 'product.variants.variant.convertedPriceData.price' },
                        {
                            path: 'product.variants.variant.convertedPriceData.pricePerUnit',
                        },
                        { path: 'product.variants.variant.costAndProfitData.itemCost' },
                        { path: 'product.weightRange.minValue' },
                        { path: 'product.weightRange.maxValue' },
                        { path: 'product.price.discountedPrice' },
                        { path: 'product.priceData.discountedPrice' },
                        { path: 'product.convertedPriceData.discountedPrice' },
                        { path: 'product.priceRange.minValue' },
                        { path: 'product.priceRange.maxValue' },
                        { path: 'product.costAndProfitData.profit' },
                        { path: 'product.costAndProfitData.profitMargin' },
                        { path: 'product.costRange.minValue' },
                        { path: 'product.costRange.maxValue' },
                        { path: 'product.pricePerUnitData.totalQuantity' },
                        { path: 'product.pricePerUnitData.baseQuantity' },
                        { path: 'product.discount.value' },
                        { path: 'product.variants.variant.weight' },
                        { path: 'product.variants.variant.priceData.discountedPrice' },
                        {
                            path: 'product.variants.variant.convertedPriceData.discountedPrice',
                        },
                        { path: 'product.variants.variant.costAndProfitData.profit' },
                        {
                            path: 'product.variants.variant.costAndProfitData.profitMargin',
                        },
                    ],
                },
                {
                    transformFn: _wix_sdk_runtime_transformations_timestamp__WEBPACK_IMPORTED_MODULE_3__.transformRESTTimestampToSDKTimestamp,
                    paths: [
                        { path: 'product.lastUpdated' },
                        { path: 'product.createdDate' },
                    ],
                },
            ]),
        };
        return metadata;
    }
    return __updateProduct;
}
/** Deletes a product. */
function deleteProduct(payload) {
    function __deleteProduct({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'DELETE',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.DeleteProduct',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products/{id}',
                data: payload,
                host,
            }),
            params: (0,_wix_metro_runtime__WEBPACK_IMPORTED_MODULE_0__.toURLSearchParams)(payload),
        };
        return metadata;
    }
    return __deleteProduct;
}
/** Updates variants of a specified product. */
function updateVariants(payload) {
    function __updateVariants({ host }) {
        const serializedData = (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
            {
                transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformSDKFloatToRESTFloat,
                paths: [
                    { path: 'variants.price' },
                    { path: 'variants.cost' },
                    { path: 'variants.weight' },
                ],
            },
        ]);
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'PATCH',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.UpdateVariants',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products/{id}/variants',
                data: serializedData,
                host,
            }),
            data: serializedData,
            transformResponse: (payload) => (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
                {
                    transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformRESTFloatToSDKFloat,
                    paths: [
                        { path: 'variants.variant.weight' },
                        { path: 'variants.variant.priceData.discountedPrice' },
                        { path: 'variants.variant.convertedPriceData.discountedPrice' },
                        { path: 'variants.variant.costAndProfitData.profit' },
                        { path: 'variants.variant.costAndProfitData.profitMargin' },
                        { path: 'variants.variant.priceData.price' },
                        { path: 'variants.variant.priceData.pricePerUnit' },
                        { path: 'variants.variant.convertedPriceData.price' },
                        { path: 'variants.variant.convertedPriceData.pricePerUnit' },
                        { path: 'variants.variant.costAndProfitData.itemCost' },
                    ],
                },
            ]),
        };
        return metadata;
    }
    return __updateVariants;
}
/** Resets the data (such as the price and the weight) of all variants for a given product to their default values. */
function resetAllVariantData(payload) {
    function __resetAllVariantData({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.ResetAllVariantData',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products/{id}/variants/resetToDefault',
                data: payload,
                host,
            }),
            data: payload,
        };
        return metadata;
    }
    return __resetAllVariantData;
}
/** Adds products to a specified collection. */
function addProductsToCollection(payload) {
    function __addProductsToCollection({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.AddProductsToCollection',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/collections/{id}/productIds',
                data: payload,
                host,
            }),
            data: payload,
        };
        return metadata;
    }
    return __addProductsToCollection;
}
/** Deletes products from a specified collection. */
function removeProductsFromCollection(payload) {
    function __removeProductsFromCollection({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.RemoveProductsFromCollection',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/collections/{id}/productIds/delete',
                data: payload,
                host,
            }),
            data: payload,
        };
        return metadata;
    }
    return __removeProductsFromCollection;
}
/**
 * Adds media items to a specified product, either via URL or existing media ID.
 *
 * > **NOTE:** The URL is not validated and no event is triggered to indicate if the media was added successfully.
 */
function addProductMedia(payload) {
    function __addProductMedia({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.AddProductMedia',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products/{id}/media',
                data: payload,
                host,
            }),
            data: payload,
        };
        return metadata;
    }
    return __addProductMedia;
}
/**
 * Removes specified media items from a product.
 * Pass an empty array to remove all media items.
 */
function removeProductMedia(payload) {
    function __removeProductMedia({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.RemoveProductMedia',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products/{id}/media/delete',
                data: payload,
                host,
            }),
            data: payload,
        };
        return metadata;
    }
    return __removeProductMedia;
}
/**
 * Links media items that are already associated with a specific product to a choice within the same product.
 *
 * Media items can only be set for choices within one option at a time - e.g., if you set media items for some or all of the choices within the Colors option (blue, green, and red), you won't be able to also assign media items to choices within the Size option (S, M, and L).
 *
 * To remove all existing media items, call the [Remove Product Media From Choices](https://dev.wix.com/api/rest/wix-stores/catalog/products/remove-product-media-from-choices) endpoint.
 */
function addProductMediaToChoices(payload) {
    function __addProductMediaToChoices({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'PATCH',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.AddProductMediaToChoices',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products/{id}/choices/media',
                data: payload,
                host,
            }),
            data: payload,
        };
        return metadata;
    }
    return __addProductMediaToChoices;
}
/**
 * Removes media items from all or some of a product's choices.
 * (Media items can only be set for choices within one option at a time - e.g., if you set media items for some or all of the choices within the Colors option (blue, green, and red), you won't be able to also assign media items to choices within the Size option (S, M, and L).)
 */
function removeProductMediaFromChoices(payload) {
    function __removeProductMediaFromChoices({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.RemoveProductMediaFromChoices',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products/{id}/choices/media/delete',
                data: payload,
                host,
            }),
            data: payload,
        };
        return metadata;
    }
    return __removeProductMediaFromChoices;
}
/** Delete all options from a specific product. Only available when [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is disabled. */
function deleteProductOptions(payload) {
    function __deleteProductOptions({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'DELETE',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.DeleteProductOptions',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products/{id}/options',
                data: payload,
                host,
            }),
            params: (0,_wix_metro_runtime__WEBPACK_IMPORTED_MODULE_0__.toURLSearchParams)(payload),
        };
        return metadata;
    }
    return __deleteProductOptions;
}
/** Deletes a product's brand. */
function removeBrand(payload) {
    function __removeBrand({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.RemoveBrand',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products/{id}/remove-brand',
                data: payload,
                host,
            }),
            data: payload,
        };
        return metadata;
    }
    return __removeBrand;
}
/** Creates a new collection. */
function createCollection(payload) {
    function __createCollection({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.CreateCollection',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/collections',
                data: payload,
                host,
            }),
            data: payload,
        };
        return metadata;
    }
    return __createCollection;
}
/** Updates specified properties of a collection. To add products to a collection, call the [addProductsToCollection](#addproductstocollection) function. */
function updateCollection(payload) {
    function __updateCollection({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'PATCH',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.UpdateCollection',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/collections/{collection.id}',
                data: payload,
                host,
            }),
            data: payload,
        };
        return metadata;
    }
    return __updateCollection;
}
/** Deletes a collection. */
function deleteCollection(payload) {
    function __deleteCollection({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'DELETE',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.DeleteCollection',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/collections/{id}',
                data: payload,
                host,
            }),
            params: (0,_wix_metro_runtime__WEBPACK_IMPORTED_MODULE_0__.toURLSearchParams)(payload),
        };
        return metadata;
    }
    return __deleteCollection;
}
/** Deletes a product's ribbon. */
function removeRibbon(payload) {
    function __removeRibbon({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.RemoveRibbon',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/products/{id}/remove-ribbon',
                data: payload,
                host,
            }),
            data: payload,
        };
        return metadata;
    }
    return __removeRibbon;
}
/** Updates a specified property for up to 100 products at a time. */
function bulkUpdateProducts(payload) {
    function __bulkUpdateProducts({ host }) {
        const serializedData = (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
            {
                transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformSDKFloatToRESTFloat,
                paths: [
                    { path: 'set.price' },
                    { path: 'set.cost' },
                    { path: 'set.weight' },
                ],
            },
        ]);
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.BulkUpdateProducts',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/bulk/products/update',
                data: serializedData,
                host,
            }),
            data: serializedData,
        };
        return metadata;
    }
    return __bulkUpdateProducts;
}
/**
 * Adjusts a specified numerical property for up to 100 products at a time.
 * The property can be increased or decreased either by percentage or amount.
 */
function bulkAdjustProductProperties(payload) {
    function __bulkAdjustProductProperties({ host }) {
        const serializedData = (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
            {
                transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformSDKFloatToRESTFloat,
                paths: [
                    { path: 'adjust.price.amount' },
                    { path: 'adjust.cost.amount' },
                    { path: 'adjust.weight.amount' },
                ],
            },
        ]);
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogWriteApi.BulkAdjustProductProperties',
            url: resolveWixCatalogApiV1CatalogWriteApiUrl({
                protoPath: '/v1/bulk/products/adjust-properties',
                data: serializedData,
                host,
            }),
            data: serializedData,
        };
        return metadata;
    }
    return __bulkAdjustProductProperties;
}
/** Returns a list of up to 100 products, given the provided paging, sorting and filtering. */
function queryProductsPlatformized(payload) {
    function __queryProductsPlatformized({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogReadApi.QueryProductsPlatformized',
            url: resolveWixCatalogApiV1CatalogReadApiUrl({
                protoPath: '/v1/products/query-platformized',
                data: payload,
                host,
            }),
            data: payload,
            transformResponse: (payload) => (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
                {
                    transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformRESTFloatToSDKFloat,
                    paths: [
                        { path: 'products.weight' },
                        { path: 'products.price.price' },
                        { path: 'products.price.pricePerUnit' },
                        { path: 'products.priceData.price' },
                        { path: 'products.priceData.pricePerUnit' },
                        { path: 'products.convertedPriceData.price' },
                        { path: 'products.convertedPriceData.pricePerUnit' },
                        { path: 'products.costAndProfitData.itemCost' },
                        { path: 'products.variants.variant.priceData.price' },
                        { path: 'products.variants.variant.priceData.pricePerUnit' },
                        { path: 'products.variants.variant.convertedPriceData.price' },
                        {
                            path: 'products.variants.variant.convertedPriceData.pricePerUnit',
                        },
                        { path: 'products.variants.variant.costAndProfitData.itemCost' },
                        { path: 'products.weightRange.minValue' },
                        { path: 'products.weightRange.maxValue' },
                        { path: 'products.price.discountedPrice' },
                        { path: 'products.priceData.discountedPrice' },
                        { path: 'products.convertedPriceData.discountedPrice' },
                        { path: 'products.priceRange.minValue' },
                        { path: 'products.priceRange.maxValue' },
                        { path: 'products.costAndProfitData.profit' },
                        { path: 'products.costAndProfitData.profitMargin' },
                        { path: 'products.costRange.minValue' },
                        { path: 'products.costRange.maxValue' },
                        { path: 'products.pricePerUnitData.totalQuantity' },
                        { path: 'products.pricePerUnitData.baseQuantity' },
                        { path: 'products.discount.value' },
                        { path: 'products.variants.variant.weight' },
                        { path: 'products.variants.variant.priceData.discountedPrice' },
                        {
                            path: 'products.variants.variant.convertedPriceData.discountedPrice',
                        },
                        { path: 'products.variants.variant.costAndProfitData.profit' },
                        {
                            path: 'products.variants.variant.costAndProfitData.profitMargin',
                        },
                    ],
                },
                {
                    transformFn: _wix_sdk_runtime_transformations_timestamp__WEBPACK_IMPORTED_MODULE_3__.transformRESTTimestampToSDKTimestamp,
                    paths: [
                        { path: 'products.lastUpdated' },
                        { path: 'products.createdDate' },
                    ],
                },
            ]),
            fallback: [
                {
                    method: 'POST',
                    url: resolveWixCatalogApiV1CatalogReadApiUrl({
                        protoPath: '/v1/products/query-platformized',
                        data: payload,
                        host,
                    }),
                    data: payload,
                },
            ],
        };
        return metadata;
    }
    return __queryProductsPlatformized;
}
/** Retrieves a product with the provided ID. */
function getProduct(payload) {
    function __getProduct({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'GET',
            methodFqn: 'wix.catalog.api.v1.CatalogReadApi.GetProduct',
            url: resolveWixCatalogApiV1CatalogReadApiUrl({
                protoPath: '/v1/products/{id}',
                data: payload,
                host,
            }),
            params: (0,_wix_metro_runtime__WEBPACK_IMPORTED_MODULE_0__.toURLSearchParams)(payload),
            transformResponse: (payload) => (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
                {
                    transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformRESTFloatToSDKFloat,
                    paths: [
                        { path: 'product.weight' },
                        { path: 'product.price.price' },
                        { path: 'product.price.pricePerUnit' },
                        { path: 'product.priceData.price' },
                        { path: 'product.priceData.pricePerUnit' },
                        { path: 'product.convertedPriceData.price' },
                        { path: 'product.convertedPriceData.pricePerUnit' },
                        { path: 'product.costAndProfitData.itemCost' },
                        { path: 'product.variants.variant.priceData.price' },
                        { path: 'product.variants.variant.priceData.pricePerUnit' },
                        { path: 'product.variants.variant.convertedPriceData.price' },
                        {
                            path: 'product.variants.variant.convertedPriceData.pricePerUnit',
                        },
                        { path: 'product.variants.variant.costAndProfitData.itemCost' },
                        { path: 'product.weightRange.minValue' },
                        { path: 'product.weightRange.maxValue' },
                        { path: 'product.price.discountedPrice' },
                        { path: 'product.priceData.discountedPrice' },
                        { path: 'product.convertedPriceData.discountedPrice' },
                        { path: 'product.priceRange.minValue' },
                        { path: 'product.priceRange.maxValue' },
                        { path: 'product.costAndProfitData.profit' },
                        { path: 'product.costAndProfitData.profitMargin' },
                        { path: 'product.costRange.minValue' },
                        { path: 'product.costRange.maxValue' },
                        { path: 'product.pricePerUnitData.totalQuantity' },
                        { path: 'product.pricePerUnitData.baseQuantity' },
                        { path: 'product.discount.value' },
                        { path: 'product.variants.variant.weight' },
                        { path: 'product.variants.variant.priceData.discountedPrice' },
                        {
                            path: 'product.variants.variant.convertedPriceData.discountedPrice',
                        },
                        { path: 'product.variants.variant.costAndProfitData.profit' },
                        {
                            path: 'product.variants.variant.costAndProfitData.profitMargin',
                        },
                    ],
                },
                {
                    transformFn: _wix_sdk_runtime_transformations_timestamp__WEBPACK_IMPORTED_MODULE_3__.transformRESTTimestampToSDKTimestamp,
                    paths: [
                        { path: 'product.lastUpdated' },
                        { path: 'product.createdDate' },
                    ],
                },
            ]),
            fallback: [
                {
                    method: 'GET',
                    url: resolveWixCatalogApiV1CatalogReadApiUrl({
                        protoPath: '/v1/products/{id}',
                        data: payload,
                        host,
                    }),
                    params: (0,_wix_metro_runtime__WEBPACK_IMPORTED_MODULE_0__.toURLSearchParams)(payload),
                },
            ],
        };
        return metadata;
    }
    return __getProduct;
}
/** Retrieves a collection with the provided slug. */
function getCollectionBySlug(payload) {
    function __getCollectionBySlug({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'GET',
            methodFqn: 'wix.catalog.api.v1.CatalogReadApi.GetCollectionBySlug',
            url: resolveWixCatalogApiV1CatalogReadApiUrl({
                protoPath: '/v1/collections/slug/{slug}',
                data: payload,
                host,
            }),
            params: (0,_wix_metro_runtime__WEBPACK_IMPORTED_MODULE_0__.toURLSearchParams)(payload),
        };
        return metadata;
    }
    return __getCollectionBySlug;
}
/** Gets the availability of relevant product variants based on the product ID and selections provided. See [Use Cases](https://dev.wix.com/api/rest/wix-stores/catalog/use-cases) for an example. */
function productOptionsAvailability(payload) {
    function __productOptionsAvailability({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogReadApi.ProductOptionsAvailability',
            url: resolveWixCatalogApiV1CatalogReadApiUrl({
                protoPath: '/v1/products/{id}/productOptionsAvailability',
                data: payload,
                host,
            }),
            data: payload,
            transformResponse: (payload) => (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
                {
                    transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformRESTFloatToSDKFloat,
                    paths: [
                        { path: 'selectedVariant.weight' },
                        { path: 'selectedVariant.price.price' },
                        { path: 'selectedVariant.price.pricePerUnit' },
                        { path: 'selectedVariant.convertedPriceData.price' },
                        { path: 'selectedVariant.convertedPriceData.pricePerUnit' },
                        { path: 'selectedVariant.price.discountedPrice' },
                        { path: 'selectedVariant.convertedPriceData.discountedPrice' },
                    ],
                },
            ]),
        };
        return metadata;
    }
    return __productOptionsAvailability;
}
/**
 * Retrieves product variants, based on either choices (option-choice key-value pairs) or variant IDs.
 * See [Stores Pagination](https://dev.wix.com/api/rest/wix-stores/pagination) for more information.
 */
function queryProductVariants(payload) {
    function __queryProductVariants({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogReadApi.QueryProductVariants',
            url: resolveWixCatalogApiV1CatalogReadApiUrl({
                protoPath: '/v1/products/{id}/variants/query',
                data: payload,
                host,
            }),
            data: payload,
            transformResponse: (payload) => (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
                {
                    transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_2__.transformRESTFloatToSDKFloat,
                    paths: [
                        { path: 'variants.variant.weight' },
                        { path: 'variants.variant.priceData.discountedPrice' },
                        { path: 'variants.variant.convertedPriceData.discountedPrice' },
                        { path: 'variants.variant.costAndProfitData.profit' },
                        { path: 'variants.variant.costAndProfitData.profitMargin' },
                        { path: 'variants.variant.priceData.price' },
                        { path: 'variants.variant.priceData.pricePerUnit' },
                        { path: 'variants.variant.convertedPriceData.price' },
                        { path: 'variants.variant.convertedPriceData.pricePerUnit' },
                        { path: 'variants.variant.costAndProfitData.itemCost' },
                    ],
                },
            ]),
        };
        return metadata;
    }
    return __queryProductVariants;
}
/** Retrieves up to 100 store variants, given the provided paging, filtering, and sorting. */
function queryStoreVariants(payload) {
    function __queryStoreVariants({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'POST',
            methodFqn: 'wix.catalog.api.v1.CatalogReadApi.QueryStoreVariants',
            url: resolveWixCatalogApiV1CatalogReadApiUrl({
                protoPath: '/v1/variants/query',
                data: payload,
                host,
            }),
            data: payload,
            transformResponse: (payload) => (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
                {
                    transformFn: _wix_sdk_runtime_transformations_timestamp__WEBPACK_IMPORTED_MODULE_3__.transformRESTTimestampToSDKTimestamp,
                    paths: [
                        { path: 'variants.media.image.urlExpirationDate' },
                        { path: 'variants.media.video.urlExpirationDate' },
                        { path: 'variants.media.video.resolutions.urlExpirationDate' },
                        {
                            path: 'variants.media.video.resolutions.poster.urlExpirationDate',
                        },
                        { path: 'variants.media.video.posters.urlExpirationDate' },
                    ],
                },
            ]),
        };
        return metadata;
    }
    return __queryStoreVariants;
}
/** Retrieves a store variant with the provided ID. */
function getStoreVariant(payload) {
    function __getStoreVariant({ host }) {
        const metadata = {
            entityFqdn: 'wix.stores.catalog.v1.product',
            method: 'GET',
            methodFqn: 'wix.catalog.api.v1.CatalogReadApi.GetStoreVariant',
            url: resolveWixCatalogApiV1CatalogReadApiUrl({
                protoPath: '/v1/variants/{id}',
                data: payload,
                host,
            }),
            params: (0,_wix_metro_runtime__WEBPACK_IMPORTED_MODULE_0__.toURLSearchParams)(payload),
            transformResponse: (payload) => (0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_1__.transformPaths)(payload, [
                {
                    transformFn: _wix_sdk_runtime_transformations_timestamp__WEBPACK_IMPORTED_MODULE_3__.transformRESTTimestampToSDKTimestamp,
                    paths: [
                        { path: 'variant.media.image.urlExpirationDate' },
                        { path: 'variant.media.video.urlExpirationDate' },
                        { path: 'variant.media.video.resolutions.urlExpirationDate' },
                        {
                            path: 'variant.media.video.resolutions.poster.urlExpirationDate',
                        },
                        { path: 'variant.media.video.posters.urlExpirationDate' },
                    ],
                },
            ]),
        };
        return metadata;
    }
    return __getStoreVariant;
}
//# sourceMappingURL=stores-catalog-v1-product-products.http.js.map

/***/ }),

/***/ "./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.public.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.public.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiscountType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.DiscountType),
/* harmony export */   FileType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.FileType),
/* harmony export */   InventoryStatus: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.InventoryStatus),
/* harmony export */   MeasurementUnit: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.MeasurementUnit),
/* harmony export */   MediaItemType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.MediaItemType),
/* harmony export */   OptionType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.OptionType),
/* harmony export */   ProductType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.ProductType),
/* harmony export */   SortOrder: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.SortOrder),
/* harmony export */   Version: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.Version),
/* harmony export */   WebhookIdentityType: () => (/* reexport safe */ _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.WebhookIdentityType),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   addProductMedia: () => (/* binding */ addProductMedia),
/* harmony export */   addProductMediaToChoices: () => (/* binding */ addProductMediaToChoices),
/* harmony export */   addProductsToCollection: () => (/* binding */ addProductsToCollection),
/* harmony export */   bulkAdjustProductProperty: () => (/* binding */ bulkAdjustProductProperty),
/* harmony export */   bulkUpdateProductsProperty: () => (/* binding */ bulkUpdateProductsProperty),
/* harmony export */   createCollection: () => (/* binding */ createCollection),
/* harmony export */   createProduct: () => (/* binding */ createProduct),
/* harmony export */   deleteCollection: () => (/* binding */ deleteCollection),
/* harmony export */   deleteProduct: () => (/* binding */ deleteProduct),
/* harmony export */   deleteProductOptions: () => (/* binding */ deleteProductOptions),
/* harmony export */   getCollectionBySlug: () => (/* binding */ getCollectionBySlug),
/* harmony export */   getProduct: () => (/* binding */ getProduct),
/* harmony export */   getProductOptionsAvailability: () => (/* binding */ getProductOptionsAvailability),
/* harmony export */   getStoreVariant: () => (/* binding */ getStoreVariant),
/* harmony export */   onProductChanged: () => (/* binding */ onProductChanged),
/* harmony export */   onProductCollectionChanged: () => (/* binding */ onProductCollectionChanged),
/* harmony export */   onProductCollectionCreated: () => (/* binding */ onProductCollectionCreated),
/* harmony export */   onProductCollectionDeleted: () => (/* binding */ onProductCollectionDeleted),
/* harmony export */   onProductCreated: () => (/* binding */ onProductCreated),
/* harmony export */   onProductDeleted: () => (/* binding */ onProductDeleted),
/* harmony export */   onProductVariantsChanged: () => (/* binding */ onProductVariantsChanged),
/* harmony export */   queryProductVariants: () => (/* binding */ queryProductVariants),
/* harmony export */   queryProducts: () => (/* binding */ queryProducts),
/* harmony export */   queryStoreVariants: () => (/* binding */ queryStoreVariants),
/* harmony export */   removeBrand: () => (/* binding */ removeBrand),
/* harmony export */   removeProductMedia: () => (/* binding */ removeProductMedia),
/* harmony export */   removeProductMediaFromChoices: () => (/* binding */ removeProductMediaFromChoices),
/* harmony export */   removeProductsFromCollection: () => (/* binding */ removeProductsFromCollection),
/* harmony export */   removeRibbon: () => (/* binding */ removeRibbon),
/* harmony export */   resetAllProductVariantData: () => (/* binding */ resetAllProductVariantData),
/* harmony export */   updateCollection: () => (/* binding */ updateCollection),
/* harmony export */   updateProduct: () => (/* binding */ updateProduct),
/* harmony export */   updateProductVariants: () => (/* binding */ updateProductVariants)
/* harmony export */ });
/* harmony import */ var _wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wix/sdk-runtime/rename-all-nested-keys */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/rename-all-nested-keys.js");
/* harmony import */ var _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wix/sdk-runtime/transformations/float */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/float.js");
/* harmony import */ var _wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wix/sdk-runtime/transformations/transform-paths */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/transform-paths.js");
/* harmony import */ var _wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/sdk-types/build/browser/index.mjs");
/* harmony import */ var _stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stores-catalog-v1-product-products.universal */ "./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.universal.js");





const __metadata = { PACKAGE_NAME: '@wix/stores' };
function createProduct(httpClient) {
    return (product) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.createProduct)(product, 
    // @ts-ignore
    { httpClient });
}
function updateProduct(httpClient) {
    return (_id, product) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.updateProduct)(_id, product, 
    // @ts-ignore
    { httpClient });
}
function deleteProduct(httpClient) {
    return (_id) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.deleteProduct)(_id, 
    // @ts-ignore
    { httpClient });
}
function updateProductVariants(httpClient) {
    return (_id, variants) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.updateProductVariants)(_id, variants, 
    // @ts-ignore
    { httpClient });
}
function resetAllProductVariantData(httpClient) {
    return (_id) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.resetAllProductVariantData)(_id, 
    // @ts-ignore
    { httpClient });
}
function addProductsToCollection(httpClient) {
    return (_id, productIds) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.addProductsToCollection)(_id, productIds, 
    // @ts-ignore
    { httpClient });
}
function removeProductsFromCollection(httpClient) {
    return (_id, productIds) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.removeProductsFromCollection)(_id, productIds, 
    // @ts-ignore
    { httpClient });
}
function addProductMedia(httpClient) {
    return (_id, media) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.addProductMedia)(_id, media, 
    // @ts-ignore
    { httpClient });
}
function removeProductMedia(httpClient) {
    return (_id, mediaIds) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.removeProductMedia)(_id, mediaIds, 
    // @ts-ignore
    { httpClient });
}
function addProductMediaToChoices(httpClient) {
    return (_id, media) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.addProductMediaToChoices)(_id, media, 
    // @ts-ignore
    { httpClient });
}
function removeProductMediaFromChoices(httpClient) {
    return (_id, media) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.removeProductMediaFromChoices)(_id, media, 
    // @ts-ignore
    { httpClient });
}
function deleteProductOptions(httpClient) {
    return (_id) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.deleteProductOptions)(_id, 
    // @ts-ignore
    { httpClient });
}
function removeBrand(httpClient) {
    return (_id) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.removeBrand)(_id, 
    // @ts-ignore
    { httpClient });
}
function createCollection(httpClient) {
    return (collection) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.createCollection)(collection, 
    // @ts-ignore
    { httpClient });
}
function updateCollection(httpClient) {
    return (_id, collection) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.updateCollection)(_id, collection, 
    // @ts-ignore
    { httpClient });
}
function deleteCollection(httpClient) {
    return (_id) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.deleteCollection)(_id, 
    // @ts-ignore
    { httpClient });
}
function removeRibbon(httpClient) {
    return (_id) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.removeRibbon)(_id, 
    // @ts-ignore
    { httpClient });
}
function bulkUpdateProductsProperty(httpClient) {
    return (ids, set) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.bulkUpdateProductsProperty)(ids, set, 
    // @ts-ignore
    { httpClient });
}
function bulkAdjustProductProperty(httpClient) {
    return (adjust, ids) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.bulkAdjustProductProperty)(adjust, ids, 
    // @ts-ignore
    { httpClient });
}
function queryProducts(httpClient) {
    return () => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.queryProducts)(
    // @ts-ignore
    { httpClient });
}
function getProduct(httpClient) {
    return (_id, options) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.getProduct)(_id, options, 
    // @ts-ignore
    { httpClient });
}
function getCollectionBySlug(httpClient) {
    return (slug) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.getCollectionBySlug)(slug, 
    // @ts-ignore
    { httpClient });
}
function getProductOptionsAvailability(httpClient) {
    return (_id, options) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.getProductOptionsAvailability)(_id, options, 
    // @ts-ignore
    { httpClient });
}
function queryProductVariants(httpClient) {
    return (_id, options) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.queryProductVariants)(_id, options, 
    // @ts-ignore
    { httpClient });
}
function queryStoreVariants(httpClient) {
    return (query) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.queryStoreVariants)(query, 
    // @ts-ignore
    { httpClient });
}
function getStoreVariant(httpClient) {
    return (_id) => (0,_stores_catalog_v1_product_products_universal__WEBPACK_IMPORTED_MODULE_0__.getStoreVariant)(_id, 
    // @ts-ignore
    { httpClient });
}
const onProductCreated = (0,_wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__.EventDefinition)('com.wix.ecommerce.catalog.api.v1.ProductCreated', false, (event) => (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_2__.renameKeysFromRESTResponseToSDKResponse)((0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_3__.transformPaths)(event, [
    {
        transformFn: _wix_sdk_runtime_transformations_float__WEBPACK_IMPORTED_MODULE_4__.transformRESTFloatToSDKFloat,
        paths: [
            { path: 'data.price.price' },
            { path: 'data.price.pricePerUnit' },
            { path: 'data.costAndProfitData.itemCost' },
            { path: 'data.price.discountedPrice' },
            { path: 'data.costAndProfitData.profit' },
            { path: 'data.costAndProfitData.profitMargin' },
        ],
    },
])))();
const onProductChanged = (0,_wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__.EventDefinition)('com.wix.ecommerce.catalog.api.v1.ProductChanged', false, (event) => (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_2__.renameKeysFromRESTResponseToSDKResponse)(event))();
const onProductDeleted = (0,_wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__.EventDefinition)('com.wix.ecommerce.catalog.api.v1.ProductDeleted', false, (event) => (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_2__.renameKeysFromRESTResponseToSDKResponse)(event))();
const onProductCollectionCreated = (0,_wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__.EventDefinition)('com.wix.ecommerce.catalog.api.v1.CollectionCreated', false, (event) => (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_2__.renameKeysFromRESTResponseToSDKResponse)(event))();
const onProductCollectionChanged = (0,_wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__.EventDefinition)('com.wix.ecommerce.catalog.api.v1.CollectionChanged', false, (event) => (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_2__.renameKeysFromRESTResponseToSDKResponse)(event))();
const onProductCollectionDeleted = (0,_wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__.EventDefinition)('com.wix.ecommerce.catalog.api.v1.CollectionDeleted', false, (event) => (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_2__.renameKeysFromRESTResponseToSDKResponse)(event))();
const onProductVariantsChanged = (0,_wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__.EventDefinition)('com.wix.ecommerce.catalog.api.v1.VariantsChanged', false, (event) => (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_2__.renameKeysFromRESTResponseToSDKResponse)(event))();

//# sourceMappingURL=stores-catalog-v1-product-products.public.js.map

/***/ }),

/***/ "./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.universal.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.universal.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiscountType: () => (/* binding */ DiscountType),
/* harmony export */   FileType: () => (/* binding */ FileType),
/* harmony export */   InventoryStatus: () => (/* binding */ InventoryStatus),
/* harmony export */   MeasurementUnit: () => (/* binding */ MeasurementUnit),
/* harmony export */   MediaItemType: () => (/* binding */ MediaItemType),
/* harmony export */   OptionType: () => (/* binding */ OptionType),
/* harmony export */   ProductType: () => (/* binding */ ProductType),
/* harmony export */   SortOrder: () => (/* binding */ SortOrder),
/* harmony export */   Version: () => (/* binding */ Version),
/* harmony export */   WebhookIdentityType: () => (/* binding */ WebhookIdentityType),
/* harmony export */   addProductMedia: () => (/* binding */ addProductMedia),
/* harmony export */   addProductMediaToChoices: () => (/* binding */ addProductMediaToChoices),
/* harmony export */   addProductsToCollection: () => (/* binding */ addProductsToCollection),
/* harmony export */   bulkAdjustProductProperty: () => (/* binding */ bulkAdjustProductProperty),
/* harmony export */   bulkUpdateProductsProperty: () => (/* binding */ bulkUpdateProductsProperty),
/* harmony export */   createCollection: () => (/* binding */ createCollection),
/* harmony export */   createProduct: () => (/* binding */ createProduct),
/* harmony export */   deleteCollection: () => (/* binding */ deleteCollection),
/* harmony export */   deleteProduct: () => (/* binding */ deleteProduct),
/* harmony export */   deleteProductOptions: () => (/* binding */ deleteProductOptions),
/* harmony export */   getCollectionBySlug: () => (/* binding */ getCollectionBySlug),
/* harmony export */   getProduct: () => (/* binding */ getProduct),
/* harmony export */   getProductOptionsAvailability: () => (/* binding */ getProductOptionsAvailability),
/* harmony export */   getStoreVariant: () => (/* binding */ getStoreVariant),
/* harmony export */   queryProductVariants: () => (/* binding */ queryProductVariants),
/* harmony export */   queryProducts: () => (/* binding */ queryProducts),
/* harmony export */   queryStoreVariants: () => (/* binding */ queryStoreVariants),
/* harmony export */   removeBrand: () => (/* binding */ removeBrand),
/* harmony export */   removeProductMedia: () => (/* binding */ removeProductMedia),
/* harmony export */   removeProductMediaFromChoices: () => (/* binding */ removeProductMediaFromChoices),
/* harmony export */   removeProductsFromCollection: () => (/* binding */ removeProductsFromCollection),
/* harmony export */   removeRibbon: () => (/* binding */ removeRibbon),
/* harmony export */   resetAllProductVariantData: () => (/* binding */ resetAllProductVariantData),
/* harmony export */   updateCollection: () => (/* binding */ updateCollection),
/* harmony export */   updateProduct: () => (/* binding */ updateProduct),
/* harmony export */   updateProductVariants: () => (/* binding */ updateProductVariants)
/* harmony export */ });
/* harmony import */ var _wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wix/sdk-runtime/transform-error */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transform-error.js");
/* harmony import */ var _wix_sdk_runtime_query_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wix/sdk-runtime/query-builder */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/query-builder.js");
/* harmony import */ var _wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/sdk-runtime/rename-all-nested-keys */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/rename-all-nested-keys.js");
/* harmony import */ var _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stores-catalog-v1-product-products.http */ "./node_modules/@wix/stores_products/build/es/src/stores-catalog-v1-product-products.http.js");
/* harmony import */ var _wix_sdk_runtime_transformations_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wix/sdk-runtime/transformations/image */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/image.js");
/* harmony import */ var _wix_sdk_runtime_transformations_video_v2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wix/sdk-runtime/transformations/video-v2 */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/video-v2.js");
/* harmony import */ var _wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wix/sdk-runtime/transformations/transform-paths */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/transform-paths.js");




// @ts-ignore



var ProductType;
(function (ProductType) {
    ProductType["unspecified_product_type"] = "unspecified_product_type";
    ProductType["physical"] = "physical";
    ProductType["digital"] = "digital";
})(ProductType || (ProductType = {}));
var InventoryStatus;
(function (InventoryStatus) {
    InventoryStatus["IN_STOCK"] = "IN_STOCK";
    InventoryStatus["OUT_OF_STOCK"] = "OUT_OF_STOCK";
    InventoryStatus["PARTIALLY_OUT_OF_STOCK"] = "PARTIALLY_OUT_OF_STOCK";
})(InventoryStatus || (InventoryStatus = {}));
var MeasurementUnit;
(function (MeasurementUnit) {
    MeasurementUnit["UNSPECIFIED"] = "UNSPECIFIED";
    MeasurementUnit["ML"] = "ML";
    MeasurementUnit["CL"] = "CL";
    MeasurementUnit["L"] = "L";
    MeasurementUnit["CBM"] = "CBM";
    MeasurementUnit["MG"] = "MG";
    MeasurementUnit["G"] = "G";
    MeasurementUnit["KG"] = "KG";
    MeasurementUnit["MM"] = "MM";
    MeasurementUnit["CM"] = "CM";
    MeasurementUnit["M"] = "M";
    MeasurementUnit["SQM"] = "SQM";
    MeasurementUnit["OZ"] = "OZ";
    MeasurementUnit["LB"] = "LB";
    MeasurementUnit["FLOZ"] = "FLOZ";
    MeasurementUnit["PT"] = "PT";
    MeasurementUnit["QT"] = "QT";
    MeasurementUnit["GAL"] = "GAL";
    MeasurementUnit["IN"] = "IN";
    MeasurementUnit["FT"] = "FT";
    MeasurementUnit["YD"] = "YD";
    MeasurementUnit["SQFT"] = "SQFT";
})(MeasurementUnit || (MeasurementUnit = {}));
var MediaItemType;
(function (MediaItemType) {
    MediaItemType["unspecified_media_item_type"] = "unspecified_media_item_type";
    MediaItemType["image"] = "image";
    MediaItemType["video"] = "video";
    MediaItemType["audio"] = "audio";
    MediaItemType["document"] = "document";
    MediaItemType["zip"] = "zip";
})(MediaItemType || (MediaItemType = {}));
var OptionType;
(function (OptionType) {
    OptionType["unspecified_option_type"] = "unspecified_option_type";
    OptionType["drop_down"] = "drop_down";
    OptionType["color"] = "color";
})(OptionType || (OptionType = {}));
var DiscountType;
(function (DiscountType) {
    DiscountType["UNDEFINED"] = "UNDEFINED";
    /** No discount */
    DiscountType["NONE"] = "NONE";
    DiscountType["AMOUNT"] = "AMOUNT";
    DiscountType["PERCENT"] = "PERCENT";
})(DiscountType || (DiscountType = {}));
var FileType;
(function (FileType) {
    FileType["UNSPECIFIED"] = "UNSPECIFIED";
    FileType["SECURE_PICTURE"] = "SECURE_PICTURE";
    FileType["SECURE_VIDEO"] = "SECURE_VIDEO";
    FileType["SECURE_DOCUMENT"] = "SECURE_DOCUMENT";
    FileType["SECURE_MUSIC"] = "SECURE_MUSIC";
    FileType["SECURE_ARCHIVE"] = "SECURE_ARCHIVE";
})(FileType || (FileType = {}));
var Version;
(function (Version) {
    Version["V1_CATALOG"] = "V1_CATALOG";
    Version["V3_CATALOG"] = "V3_CATALOG";
})(Version || (Version = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));
var WebhookIdentityType;
(function (WebhookIdentityType) {
    WebhookIdentityType["UNKNOWN"] = "UNKNOWN";
    WebhookIdentityType["ANONYMOUS_VISITOR"] = "ANONYMOUS_VISITOR";
    WebhookIdentityType["MEMBER"] = "MEMBER";
    WebhookIdentityType["WIX_USER"] = "WIX_USER";
    WebhookIdentityType["APP"] = "APP";
})(WebhookIdentityType || (WebhookIdentityType = {}));
/**
 * Creates a new product.
 * @param product - Product information.
 * @public
 * @requiredField product
 * @requiredField product.costAndProfitData.itemCost
 * @requiredField product.name
 * @requiredField product.priceData
 * @requiredField product.priceData.price
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function createProduct(product) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[1];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({ product: product });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.createProduct(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(result.data);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { product: '$[0]' },
            singleArgumentUnchanged: false,
        }, ['product']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Updates specified fields in a product.
 * @param _id - Product ID (generated automatically by the catalog).
 * @public
 * @requiredField _id
 * @requiredField product
 * @param product - Product info to update.
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function updateProduct(_id, product) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        product: { ...product, id: _id },
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.updateProduct(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(result.data);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: { product: '$[1]' },
            explicitPathsToArguments: { 'product.id': '$[0]' },
            singleArgumentUnchanged: false,
        }, ['_id', 'product']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Deletes a product.
 * @param _id - ID of the product to delete.
 * @public
 * @requiredField _id
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function deleteProduct(_id) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[1];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({ id: _id });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.deleteProduct(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]' },
            singleArgumentUnchanged: false,
        }, ['_id']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Updates variants of a specified product.
 * @param _id - ID of the product with managed variants.
 * @param variants - Variant info to update.
 * @public
 * @documentationMaturity preview
 * @requiredField _id
 * @requiredField variants
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function updateProductVariants(_id, variants) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        id: _id,
        variants: variants,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.updateVariants(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(result.data);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]', variants: '$[1]' },
            singleArgumentUnchanged: false,
        }, ['_id', 'variants']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Resets the data (such as the price and the weight) of all variants for a given product to their default values.
 * @param _id - Product ID.
 * @public
 * @documentationMaturity preview
 * @requiredField _id
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function resetAllProductVariantData(_id) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[1];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({ id: _id });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.resetAllVariantData(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]' },
            singleArgumentUnchanged: false,
        }, ['_id']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Adds products to a specified collection.
 * @param _id - Collection ID.
 * @param productIds - IDs of the products to add to the collection, separated by commas.
 * @public
 * @requiredField _id
 * @requiredField productIds
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function addProductsToCollection(_id, productIds) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        id: _id,
        productIds: productIds,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.addProductsToCollection(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]', productIds: '$[1]' },
            singleArgumentUnchanged: false,
        }, ['_id', 'productIds']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Deletes products from a specified collection.
 * @param _id - ID of the collection from which to remove products.
 * @param productIds - IDs of the products to remove from the collection.
 * @public
 * @requiredField _id
 * @requiredField productIds
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function removeProductsFromCollection(_id, productIds) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        id: _id,
        productIds: productIds,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.removeProductsFromCollection(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]', productIds: '$[1]' },
            singleArgumentUnchanged: false,
        }, ['_id', 'productIds']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Adds media items to a specified product, either via URL or existing media ID.
 *
 * > **NOTE:** The URL is not validated and no event is triggered to indicate if the media was added successfully.
 * @param _id - Product ID.
 * @param media - Sources of media items already uploaded to the Wix site.
 * @public
 * @requiredField _id
 * @requiredField media
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function addProductMedia(_id, media) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        id: _id,
        media: media,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.addProductMedia(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]', media: '$[1]' },
            singleArgumentUnchanged: false,
        }, ['_id', 'media']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Removes specified media items from a product.
 * Pass an empty array to remove all media items.
 * @param _id - Product ID.
 * @param mediaIds - List of media IDs to remove. Pass an empty array to delete all media items for the product.
 * @public
 * @requiredField _id
 * @requiredField mediaIds
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function removeProductMedia(_id, mediaIds) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        id: _id,
        mediaIds: mediaIds,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.removeProductMedia(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]', mediaIds: '$[1]' },
            singleArgumentUnchanged: false,
        }, ['_id', 'mediaIds']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Links media items that are already associated with a specific product to a choice within the same product.
 *
 * Media items can only be set for choices within one option at a time - e.g., if you set media items for some or all of the choices within the Colors option (blue, green, and red), you won't be able to also assign media items to choices within the Size option (S, M, and L).
 *
 * To remove all existing media items, call the [Remove Product Media From Choices](https://dev.wix.com/api/rest/wix-stores/catalog/products/remove-product-media-from-choices) endpoint.
 * @param _id - Product ID.
 * @param media - Product media items and the choices to add the media to.
 * @public
 * @requiredField _id
 * @requiredField media
 * @requiredField media.choice
 * @requiredField media.option
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function addProductMediaToChoices(_id, media) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        id: _id,
        media: media,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.addProductMediaToChoices(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]', media: '$[1]' },
            singleArgumentUnchanged: false,
        }, ['_id', 'media']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Removes media items from all or some of a product's choices.
 * (Media items can only be set for choices within one option at a time - e.g., if you set media items for some or all of the choices within the Colors option (blue, green, and red), you won't be able to also assign media items to choices within the Size option (S, M, and L).)
 * @param _id - Product ID from whose choices to remove media items.
 * @param media - Media to remove from choices. If an empty array is passed, all media will be removed from all choices for the given product.
 * @public
 * @requiredField _id
 * @requiredField media
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function removeProductMediaFromChoices(_id, media) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        id: _id,
        media: media,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.removeProductMediaFromChoices(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]', media: '$[1]' },
            singleArgumentUnchanged: false,
        }, ['_id', 'media']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Delete all options from a specific product. Only available when [variant management](https://support.wix.com/en/article/wix-stores-adding-and-customizing-product-options#setting-different-prices-for-variants) is disabled.
 * @param _id - ID of the product with options to delete.
 * @public
 * @requiredField _id
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function deleteProductOptions(_id) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[1];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({ id: _id });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.deleteProductOptions(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]' },
            singleArgumentUnchanged: false,
        }, ['_id']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Deletes a product's brand.
 * @param _id - Product ID.
 * @public
 * @documentationMaturity preview
 * @requiredField _id
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function removeBrand(_id) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[1];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({ id: _id });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.removeBrand(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]' },
            singleArgumentUnchanged: false,
        }, ['_id']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Creates a new collection.
 * @param collection - Collection info.
 * @public
 * @documentationMaturity preview
 * @requiredField collection
 * @requiredField collection.name
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function createCollection(collection) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[1];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        collection: collection,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.createCollection(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(result.data);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { collection: '$[0]' },
            singleArgumentUnchanged: false,
        }, ['collection']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Updates specified properties of a collection. To add products to a collection, call the [addProductsToCollection](#addproductstocollection) function.
 * @param _id - Collection ID (generated automatically by the catalog).
 * @public
 * @requiredField _id
 * @requiredField collection
 * @param collection - Collection info to update.
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function updateCollection(_id, collection) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        collection: { ...collection, id: _id },
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.updateCollection(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(result.data);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: { collection: '$[1]' },
            explicitPathsToArguments: { 'collection.id': '$[0]' },
            singleArgumentUnchanged: false,
        }, ['_id', 'collection']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Deletes a collection.
 * @public
 * @requiredField _id
 * @param _id - ID of the collection to delete.
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function deleteCollection(_id) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[1];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({ id: _id });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.deleteCollection(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]' },
            singleArgumentUnchanged: false,
        }, ['_id']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Deletes a product's ribbon.
 * @param _id - Product ID.
 * @public
 * @documentationMaturity preview
 * @requiredField _id
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function removeRibbon(_id) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[1];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({ id: _id });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.removeRibbon(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]' },
            singleArgumentUnchanged: false,
        }, ['_id']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Updates a specified property for up to 100 products at a time.
 * @param ids - Product IDs.
 * @param set - Field to update.
 * @public
 * @documentationMaturity preview
 * @requiredField ids
 * @requiredField set
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function bulkUpdateProductsProperty(ids, set) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({ ids: ids, set: set });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.bulkUpdateProducts(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(result.data);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { ids: '$[0]', set: '$[1]' },
            singleArgumentUnchanged: false,
        }, ['ids', 'set']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Adjusts a specified numerical property for up to 100 products at a time.
 * The property can be increased or decreased either by percentage or amount.
 * @param adjust - Numerical property to adjust.
 * @param ids - Product IDs.
 * @public
 * @documentationMaturity preview
 * @requiredField adjust
 * @requiredField ids
 * @permissionId WIX_STORES.MODIFY_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @applicableIdentity APP
 */
async function bulkAdjustProductProperty(adjust, ids) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        adjust: adjust,
        ids: ids,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.bulkAdjustProductProperties(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(result.data);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { adjust: '$[0]', ids: '$[1]' },
            singleArgumentUnchanged: false,
        }, ['adjust', 'ids']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Returns a list of up to 100 products, given the provided paging, sorting and filtering.
 * @public
 * @documentationMaturity preview
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @permissionScope Read Stores - all read permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
 * @permissionScope Read Products
 * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
 * @permissionScope Manage Restaurants - all permissions
 * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
 * @permissionScope Manage Orders
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
 * @permissionId WIX_STORES.READ_PRODUCTS
 * @applicableIdentity APP
 * @applicableIdentity VISITOR
 */
function queryProducts() {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[0];
    return (0,_wix_sdk_runtime_query_builder__WEBPACK_IMPORTED_MODULE_3__.queryBuilder)({
        func: async (payload) => {
            const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.queryProductsPlatformized(payload);
            sideEffects?.onSiteCall?.();
            try {
                const result = await httpClient.request(reqOpts);
                sideEffects?.onSuccess?.(result);
                return result;
            }
            catch (err) {
                sideEffects?.onError?.(err);
                throw err;
            }
        },
        requestTransformer: (query) => {
            const args = [query, {}];
            return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
                ...args?.[1],
                query: args?.[0],
            });
        },
        responseTransformer: ({ data, }) => {
            const transformedData = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(data);
            return {
                items: transformedData?.products,
                pagingMetadata: transformedData?.metadata,
            };
        },
        errorTransformer: (err) => {
            const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
                spreadPathsToArguments: {},
                explicitPathsToArguments: { query: '$[0]' },
                singleArgumentUnchanged: false,
            });
            throw transformedError;
        },
        pagingMethod: 'OFFSET',
        transformationPaths: {},
    });
}
/**
 * Retrieves a product with the provided ID.
 * @param _id - Requested product ID.
 * @public
 * @documentationMaturity preview
 * @requiredField _id
 * @permissionId WIX_STORES.READ_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @permissionScope Read Stores - all read permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
 * @permissionScope Read Products
 * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
 * @permissionScope Manage Restaurants - all permissions
 * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
 * @permissionScope Manage Orders
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
 * @applicableIdentity APP
 * @applicableIdentity VISITOR
 */
async function getProduct(_id, options) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        id: _id,
        includeMerchantSpecificData: options?.includeMerchantSpecificData,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.getProduct(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(result.data);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: {
                id: '$[0]',
                includeMerchantSpecificData: '$[1].includeMerchantSpecificData',
            },
            singleArgumentUnchanged: false,
        }, ['_id', 'options']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Retrieves a collection with the provided slug.
 * @param slug - Slug of the collection to retrieve.
 * @public
 * @requiredField slug
 * @permissionId WIX_STORES.READ_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @permissionScope Read Stores - all read permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
 * @permissionScope Read Products
 * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
 * @permissionScope Manage Restaurants - all permissions
 * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
 * @permissionScope Manage Orders
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
 * @applicableIdentity APP
 * @applicableIdentity VISITOR
 */
async function getCollectionBySlug(slug) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[1];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({ slug: slug });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.getCollectionBySlug(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(result.data);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { slug: '$[0]' },
            singleArgumentUnchanged: false,
        }, ['slug']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Gets the availability of relevant product variants based on the product ID and selections provided. See [Use Cases](https://dev.wix.com/api/rest/wix-stores/catalog/use-cases) for an example.
 * @param _id - Requested product ID.
 * @param options - Array containing the selected options. For example, `["color": "Blue", "size": "Large"]`.
 * @public
 * @requiredField _id
 * @requiredField options
 * @permissionId WIX_STORES.READ_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @permissionScope Read Stores - all read permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
 * @permissionScope Read Products
 * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
 * @permissionScope Manage Restaurants - all permissions
 * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
 * @permissionScope Manage Orders
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
 * @applicableIdentity APP
 * @applicableIdentity VISITOR
 */
async function getProductOptionsAvailability(_id, options) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        id: _id,
        options: options,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.productOptionsAvailability(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(result.data);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]', options: '$[1]' },
            singleArgumentUnchanged: false,
        }, ['_id', 'options']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Retrieves product variants, based on either choices (option-choice key-value pairs) or variant IDs.
 * See [Stores Pagination](https://dev.wix.com/api/rest/wix-stores/pagination) for more information.
 * @param _id - Requested product ID.
 * @public
 * @documentationMaturity preview
 * @requiredField _id
 * @permissionId WIX_STORES.READ_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @permissionScope Read Stores - all read permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
 * @permissionScope Read Products
 * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
 * @permissionScope Manage Restaurants - all permissions
 * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
 * @permissionScope Manage Orders
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
 * @applicableIdentity APP
 * @applicableIdentity VISITOR
 */
async function queryProductVariants(_id, options) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[2];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({
        id: _id,
        choices: options?.choices,
        variantIds: options?.variantIds,
        paging: options?.paging,
        includeMerchantSpecificData: options?.includeMerchantSpecificData,
    });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.queryProductVariants(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)(result.data);
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: {
                id: '$[0]',
                choices: '$[1].choices',
                variantIds: '$[1].variantIds',
                paging: '$[1].paging',
                includeMerchantSpecificData: '$[1].includeMerchantSpecificData',
            },
            singleArgumentUnchanged: false,
        }, ['_id', 'options']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Retrieves up to 100 store variants, given the provided paging, filtering, and sorting.
 * @param query - Query options.
 * @public
 * @documentationMaturity preview
 * @requiredField query
 * @permissionId WIX_STORES.READ_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @permissionScope Read Stores - all read permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
 * @permissionScope Read Products
 * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
 * @permissionScope Manage Restaurants - all permissions
 * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
 * @permissionScope Manage Orders
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
 * @applicableIdentity APP
 * @applicableIdentity VISITOR
 */
async function queryStoreVariants(query) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[1];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({ query: query });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.queryStoreVariants(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)((0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_4__.transformPaths)(result.data, [
            {
                transformFn: _wix_sdk_runtime_transformations_image__WEBPACK_IMPORTED_MODULE_5__.transformRESTImageToSDKImage,
                paths: [{ path: 'variants.media.image' }],
            },
            {
                transformFn: _wix_sdk_runtime_transformations_video_v2__WEBPACK_IMPORTED_MODULE_6__.transformRESTVideoV2ToSDKVideoV2,
                paths: [{ path: 'variants.media.video' }],
            },
        ]));
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { query: '$[0]' },
            singleArgumentUnchanged: false,
        }, ['query']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
/**
 * Retrieves a store variant with the provided ID.
 * @param _id - Store variant ID. Comprised of the `productId` and the `variantId`, separated by a hyphen. For example, `{productId}-{variantId}`.
 * @public
 * @documentationMaturity preview
 * @requiredField _id
 * @permissionId WIX_STORES.READ_PRODUCTS
 * @permissionScope Manage Stores - all permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
 * @permissionScope Manage Products
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-PRODUCTS
 * @permissionScope Read Stores - all read permissions
 * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
 * @permissionScope Read Products
 * @permissionScopeId SCOPE.DC-STORES.READ-PRODUCTS
 * @permissionScope Manage Restaurants - all permissions
 * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
 * @permissionScope Manage Orders
 * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
 * @applicableIdentity APP
 * @applicableIdentity VISITOR
 */
async function getStoreVariant(_id) {
    // @ts-ignore
    const { httpClient, sideEffects } = arguments[1];
    const payload = (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromSDKRequestToRESTRequest)({ id: _id });
    const reqOpts = _stores_catalog_v1_product_products_http__WEBPACK_IMPORTED_MODULE_1__.getStoreVariant(payload);
    sideEffects?.onSiteCall?.();
    try {
        const result = await httpClient.request(reqOpts);
        sideEffects?.onSuccess?.(result);
        return (0,_wix_sdk_runtime_rename_all_nested_keys__WEBPACK_IMPORTED_MODULE_0__.renameKeysFromRESTResponseToSDKResponse)((0,_wix_sdk_runtime_transformations_transform_paths__WEBPACK_IMPORTED_MODULE_4__.transformPaths)(result.data, [
            {
                transformFn: _wix_sdk_runtime_transformations_image__WEBPACK_IMPORTED_MODULE_5__.transformRESTImageToSDKImage,
                paths: [{ path: 'variant.media.image' }],
            },
            {
                transformFn: _wix_sdk_runtime_transformations_video_v2__WEBPACK_IMPORTED_MODULE_6__.transformRESTVideoV2ToSDKVideoV2,
                paths: [{ path: 'variant.media.video' }],
            },
        ]));
    }
    catch (err) {
        const transformedError = (0,_wix_sdk_runtime_transform_error__WEBPACK_IMPORTED_MODULE_2__.transformError)(err, {
            spreadPathsToArguments: {},
            explicitPathsToArguments: { id: '$[0]' },
            singleArgumentUnchanged: false,
        }, ['_id']);
        sideEffects?.onError?.(err);
        throw transformedError;
    }
}
//# sourceMappingURL=stores-catalog-v1-product-products.universal.js.map

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
/* harmony import */ var _wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/sdk/node_modules/@wix/sdk-types/build/browser/index.mjs");
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



function buildRESTDescriptor(origFunc, publicMetadata, boundFetch, wixAPIFetch, getActiveToken, options) {
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
        getActiveToken,
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
/* harmony import */ var _wix_sdk_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/sdk/node_modules/@wix/sdk-types/build/browser/index.mjs");
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
                ...config.host?.essentials?.passThroughHeaders,
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
            }, authStrategy.getActiveToken, { HTTPHost: apiBaseUrl });
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
        /**
         * @param relativeUrl The URL to fetch relative to the API base URL
         * @param options The fetch options
         * @returns The fetch Response object
         * @deprecated Use `fetchWithAuth` instead
         */
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
/* harmony import */ var _wix_sdk_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/sdk/node_modules/@wix/sdk-types/build/browser/index.mjs");
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


/***/ }),

/***/ "./node_modules/@wix/sdk/node_modules/@wix/sdk-types/build/browser/index.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wix/sdk/node_modules/@wix/sdk-types/build/browser/index.mjs ***!
  \***********************************************************************************/
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

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/constants.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/constants.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_LIMIT: () => (/* binding */ DEFAULT_LIMIT),
/* harmony export */   ITEMS_RESULT_PROPERTY_NAME: () => (/* binding */ ITEMS_RESULT_PROPERTY_NAME),
/* harmony export */   PAGING_METADATA_RESULT_PROPERTY_NAME: () => (/* binding */ PAGING_METADATA_RESULT_PROPERTY_NAME),
/* harmony export */   RESTResponseToSDKResponseRenameMap: () => (/* binding */ RESTResponseToSDKResponseRenameMap),
/* harmony export */   SDKRequestToRESTRequestRenameMap: () => (/* binding */ SDKRequestToRESTRequestRenameMap),
/* harmony export */   WIX_PROTOCOL: () => (/* binding */ WIX_PROTOCOL)
/* harmony export */ });
const WIX_PROTOCOL = 'wix:';
const SDKRequestToRESTRequestRenameMap = {
    _id: 'id',
    _createdDate: 'createdDate',
    _updatedDate: 'updatedDate',
};
const RESTResponseToSDKResponseRenameMap = {
    id: '_id',
    createdDate: '_createdDate',
    updatedDate: '_updatedDate',
};
const ITEMS_RESULT_PROPERTY_NAME = 'items';
const PAGING_METADATA_RESULT_PROPERTY_NAME = 'pagingMetadata';
const DEFAULT_LIMIT = 50;


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/context-v2.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/context-v2.js ***!
  \*********************************************************************************************/
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
/* harmony import */ var _wix_sdk_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/node_modules/@wix/sdk-types/build/browser/index.mjs");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/context.js");



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

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/context.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/context.js ***!
  \******************************************************************************************/
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
/* harmony import */ var _context_v2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context-v2.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/context-v2.js");

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


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/event-definition-modules.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/event-definition-modules.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createEventModule: () => (/* binding */ createEventModule)
/* harmony export */ });
/* harmony import */ var _context_v2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context-v2.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/context-v2.js");

function createEventModule(eventDefinition) {
    return (0,_context_v2_js__WEBPACK_IMPORTED_MODULE_0__.contextualizeEventDefinitionModuleV2)(eventDefinition);
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/query-builder.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/query-builder.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   queryBuilder: () => (/* binding */ queryBuilder)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/constants.js");
/* harmony import */ var _query_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query-filter.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/query-filter.js");
/* harmony import */ var _query_iterators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query-iterators.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/query-iterators.js");



function queryBuilder(opts) {
    const createQueryBuilder = (query) => {
        return {
            query,
            async find() {
                try {
                    const request = opts.requestTransformer(opts.pagingMethod === 'CURSOR' &&
                        query.cursorPaging.cursor
                        ? {
                            cursorPaging: query.cursorPaging,
                        }
                        : query);
                    const response = await opts.func(request);
                    const { [_constants_js__WEBPACK_IMPORTED_MODULE_0__.ITEMS_RESULT_PROPERTY_NAME]: items, [_constants_js__WEBPACK_IMPORTED_MODULE_0__.PAGING_METADATA_RESULT_PROPERTY_NAME]: pagingMetadata, } = opts.responseTransformer(response);
                    if (opts.pagingMethod === 'OFFSET') {
                        const offsetQuery = query;
                        return new _query_iterators_js__WEBPACK_IMPORTED_MODULE_1__.OffsetBasedIterator({
                            items: items ?? [],
                            fetchNextPage: () => {
                                return createQueryBuilder({
                                    ...offsetQuery,
                                    paging: {
                                        offset: offsetQuery.paging.offset + offsetQuery.paging.limit,
                                        limit: offsetQuery.paging.limit,
                                    },
                                }).find();
                            },
                            fetchPrevPage: () => {
                                return createQueryBuilder({
                                    ...query,
                                    paging: {
                                        offset: Math.max(offsetQuery.paging.offset - offsetQuery.paging.limit, 0),
                                        limit: offsetQuery.paging.limit,
                                    },
                                }).find();
                            },
                            offset: offsetQuery.paging.offset,
                            limit: offsetQuery.paging.limit,
                            totalCount: pagingMetadata?.total,
                            tooManyToCount: pagingMetadata?.tooManyToCount,
                            originQuery: this,
                        });
                    }
                    const paging = query.cursorPaging;
                    return new _query_iterators_js__WEBPACK_IMPORTED_MODULE_1__.CursorBasedIterator({
                        items: items ?? [],
                        limit: paging.limit,
                        originQuery: this,
                        fetchNextPage: () => {
                            return createQueryBuilder({
                                ...query,
                                cursorPaging: {
                                    cursor: pagingMetadata?.cursors?.next ?? undefined,
                                    limit: paging.limit,
                                },
                            }).find();
                        },
                        fetchPrevPage: () => {
                            return createQueryBuilder({
                                ...query,
                                cursorPaging: {
                                    cursor: pagingMetadata?.cursors?.prev ?? undefined,
                                    limit: paging.limit,
                                },
                            }).find();
                        },
                        prevCursor: pagingMetadata?.cursors?.prev ?? undefined,
                        nextCursor: pagingMetadata?.cursors?.next ?? undefined,
                    });
                }
                catch (err) {
                    throw opts.errorTransformer(err);
                }
            },
            skipTo(cursor) {
                return createQueryBuilder({
                    ...query,
                    cursorPaging: {
                        cursor,
                        limit: query.cursorPaging.limit,
                    },
                });
            },
            eq(field, value) {
                const serializableValue = typeof value === 'undefined' ? null : value;
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: serializableValue,
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            ne(field, value) {
                const serializableValue = typeof value === 'undefined' ? null : value;
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: {
                        $ne: serializableValue,
                    },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            ge(field, value) {
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: {
                        $gte: value,
                    },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            gt(field, value) {
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: { $gt: value },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            le(field, value) {
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: {
                        $lte: value,
                    },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            lt(field, value) {
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: { $lt: value },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            isNotEmpty(field) {
                return this.ne(field, null);
            },
            isEmpty(field) {
                return this.eq(field, null);
            },
            startsWith(field, value) {
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: {
                        $startsWith: value,
                    },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            endsWith(field, value) {
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: {
                        $endsWith: value,
                    },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            contains(field, value) {
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: {
                        $contains: value,
                    },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            hasSome(field, ...values) {
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: {
                        $hasSome: Array.isArray(values[0]) ? values[0] : values,
                    },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            hasAll(field, ...values) {
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: {
                        $hasAll: Array.isArray(values[0]) ? values[0] : values,
                    },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            between(field, from, to) {
                return this.ge(field, from).lt(field, to);
            },
            in(field, values) {
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: {
                        $in: values,
                    },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            exists(field, value = true) {
                const newFilter = {
                    [renameFieldByPaths(opts.transformationPaths, field)]: {
                        $exists: value,
                    },
                };
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, newFilter),
                });
            },
            or(orQuery) {
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.or)(query.filter, orQuery.query.filter),
                });
            },
            and(andQuery) {
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.and)(query.filter, andQuery.query.filter),
                });
            },
            not(notQuery) {
                return createQueryBuilder({
                    ...query,
                    filter: (0,_query_filter_js__WEBPACK_IMPORTED_MODULE_2__.not)(notQuery.query.filter),
                });
            },
            ascending(...fieldNames) {
                return createQueryBuilder({
                    ...query,
                    sort: [
                        ...(query.sort ?? []),
                        ...fieldNames.map((fieldName) => ({
                            fieldName: renameFieldByPaths(opts.transformationPaths, fieldName),
                            order: 'ASC',
                        })),
                    ],
                });
            },
            descending(...fieldNames) {
                return createQueryBuilder({
                    ...query,
                    sort: [
                        ...(query.sort ?? []),
                        ...fieldNames.map((fieldName) => ({
                            fieldName: renameFieldByPaths(opts.transformationPaths, fieldName),
                            order: 'DESC',
                        })),
                    ],
                });
            },
            skip(offset) {
                return createQueryBuilder({
                    ...query,
                    paging: {
                        offset,
                        limit: 'limit' in query.paging
                            ? query.paging.limit
                            : _constants_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_LIMIT,
                    },
                });
            },
            limit(limit) {
                if (opts.pagingMethod === 'CURSOR') {
                    const cursorQuery = query;
                    return createQueryBuilder({
                        ...query,
                        cursorPaging: {
                            limit,
                            cursor: 'cursor' in cursorQuery.cursorPaging
                                ? cursorQuery.cursorPaging.cursor
                                : undefined,
                        },
                    });
                }
                const offsetQuery = query;
                return createQueryBuilder({
                    ...query,
                    paging: {
                        limit,
                        offset: 'offset' in offsetQuery.paging ? offsetQuery.paging.offset : 0,
                    },
                });
            },
        };
    };
    return createQueryBuilder({
        filter: {},
        ...(opts.pagingMethod === 'OFFSET'
            ? { paging: { offset: 0, limit: _constants_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_LIMIT } }
            : { cursorPaging: { limit: _constants_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_LIMIT } }),
    });
}
function renameFieldByPaths(transformationPaths, fieldPath) {
    const transformationPath = Object.entries(transformationPaths).find(([path]) => path === fieldPath || fieldPath.startsWith(`${path}.`))?.[0];
    if (transformationPath) {
        return fieldPath.replace(transformationPath, transformationPaths[transformationPath]);
    }
    return fieldPath
        .split('.')
        .map((segment) => transformationPaths[segment] ??
        _constants_js__WEBPACK_IMPORTED_MODULE_0__.SDKRequestToRESTRequestRenameMap[segment] ??
        segment)
        .join('.');
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/query-filter.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/query-filter.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   and: () => (/* binding */ and),
/* harmony export */   isAndOperator: () => (/* binding */ isAndOperator),
/* harmony export */   isLogicalOperator: () => (/* binding */ isLogicalOperator),
/* harmony export */   isNotOperator: () => (/* binding */ isNotOperator),
/* harmony export */   isOrOperator: () => (/* binding */ isOrOperator),
/* harmony export */   not: () => (/* binding */ not),
/* harmony export */   or: () => (/* binding */ or)
/* harmony export */ });
function isLogicalOperator(filter) {
    return isAndOperator(filter) || isOrOperator(filter) || isNotOperator(filter);
}
function isAndOperator(filter) {
    return (Object.keys(filter).length === 1 &&
        '$and' in filter &&
        Array.isArray(filter.$and));
}
function isOrOperator(filter) {
    return (Object.keys(filter).length === 1 &&
        '$or' in filter &&
        Array.isArray(filter.$or));
}
function isNotOperator(filter) {
    return (Object.keys(filter).length === 1 &&
        '$not' in filter &&
        typeof filter.$not === 'object');
}
function and(a, b) {
    if (typeof a === 'undefined' || Object.keys(a).length === 0) {
        return b;
    }
    else if (typeof b === 'undefined' || Object.keys(b).length === 0) {
        return a;
    }
    else {
        return {
            $and: [
                ...(isAndOperator(a) ? a.$and : [a]),
                ...(isAndOperator(b) ? b.$and : [b]),
            ],
        };
    }
}
function or(a, b) {
    if (typeof a === 'undefined' || Object.keys(a).length === 0) {
        return b;
    }
    else if (typeof b === 'undefined' || Object.keys(b).length === 0) {
        return a;
    }
    else {
        return {
            $or: [
                ...(isOrOperator(a) ? a.$or : [a]),
                ...(isOrOperator(b) ? b.$or : [b]),
            ],
        };
    }
}
function not(a) {
    if (typeof a === 'undefined' || Object.keys(a).length === 0) {
        return undefined;
    }
    else if (isNotOperator(a)) {
        return a.$not;
    }
    else {
        return { $not: a };
    }
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/query-iterators.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/query-iterators.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CursorBasedIterator: () => (/* binding */ CursorBasedIterator),
/* harmony export */   Iterator: () => (/* binding */ Iterator),
/* harmony export */   OffsetBasedIterator: () => (/* binding */ OffsetBasedIterator)
/* harmony export */ });
class Iterator {
    _items;
    _fetchNextPage;
    _fetchPrevPage;
    _originQuery;
    _limit;
    constructor({ items, originQuery, fetchNextPage, fetchPrevPage, limit, }) {
        this._items = items;
        this._fetchNextPage = fetchNextPage;
        this._fetchPrevPage = fetchPrevPage;
        this._originQuery = originQuery;
        this._limit = limit;
    }
    get items() {
        return this._items;
    }
    get length() {
        return this._items.length;
    }
    get pageSize() {
        return this._limit;
    }
    get query() {
        return this._originQuery;
    }
    async next() {
        if (!this.hasNext()) {
            throw new Error('No next page to fetch');
        }
        const nextPageIterator = await this._fetchNextPage();
        return nextPageIterator;
    }
    async prev() {
        if (!this.hasPrev()) {
            throw new Error('No previous page to fetch');
        }
        const previousPageIterator = await this._fetchPrevPage();
        return previousPageIterator;
    }
}
class CursorBasedIterator extends Iterator {
    _nextCursor;
    _prevCursor;
    cursors;
    constructor({ items, originQuery, fetchNextPage, fetchPrevPage, limit, nextCursor, prevCursor, }) {
        super({ items, originQuery, fetchNextPage, fetchPrevPage, limit });
        this._nextCursor = nextCursor;
        this._prevCursor = prevCursor;
        this.cursors = {
            next: nextCursor,
            prev: prevCursor,
        };
    }
    hasNext() {
        return !!this._nextCursor;
    }
    hasPrev() {
        return !!this._prevCursor;
    }
}
class OffsetBasedIterator extends Iterator {
    _totalCount;
    _offset;
    _tooManyToCount;
    constructor({ items, fetchNextPage, fetchPrevPage, offset, originQuery, limit, totalCount, tooManyToCount, }) {
        super({ items, fetchNextPage, fetchPrevPage, originQuery, limit });
        this._totalCount = totalCount;
        this._offset = offset;
        this._tooManyToCount = tooManyToCount;
    }
    get currentPage() {
        return this._limit === 0
            ? undefined
            : Math.floor(this._offset / this._limit);
    }
    get totalPages() {
        return this._tooManyToCount || this._limit === 0
            ? undefined
            : Math.ceil(this._totalCount / this._limit);
    }
    get totalCount() {
        return this._tooManyToCount ? undefined : this._totalCount;
    }
    hasNext() {
        return Boolean(this._limit !== 0 &&
            this.currentPage !== undefined && // currentPage 0 is the first page
            this.totalPages !== undefined &&
            this.currentPage < this.totalPages - 1);
    }
    hasPrev() {
        return Boolean(this._limit !== 0 && this.currentPage && this.currentPage > 0);
    }
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/rename-all-nested-keys.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/rename-all-nested-keys.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renameAllNestedKeys: () => (/* binding */ renameAllNestedKeys),
/* harmony export */   renameKeysFromRESTResponseToSDKResponse: () => (/* binding */ renameKeysFromRESTResponseToSDKResponse),
/* harmony export */   renameKeysFromSDKRequestToRESTRequest: () => (/* binding */ renameKeysFromSDKRequestToRESTRequest)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/constants.js");

/**
 * Recursively rename nested keys provided in `renameMap` in the given object.
 * Providing a list of paths to ignore will prevent renaming of keys in nested objects.
 *
 * Paths are provided in the format of 'path.to.nested.field'
 * @param payload The object to rename keys for
 * @param renameMap A map of keys to rename, where the key is the original key and the value is the new key
 * @param ignorePaths Paths of nested fields to ignore while traversing the object
 * @returns The object with renamed keys
 */
function renameAllNestedKeys(payload, renameMap, ignorePaths) {
    const isIgnored = (path) => ignorePaths.includes(path);
    const traverse = (obj, path) => {
        if (Array.isArray(obj)) {
            obj.forEach((item) => {
                traverse(item, path);
            });
        }
        else if (typeof obj === 'object' && obj !== null) {
            const objAsRecord = obj;
            Object.keys(objAsRecord).forEach((key) => {
                const newPath = path === '' ? key : `${path}.${key}`;
                if (isIgnored(newPath)) {
                    return;
                }
                if (key in renameMap && !(renameMap[key] in objAsRecord)) {
                    objAsRecord[renameMap[key]] = objAsRecord[key];
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                    delete objAsRecord[key];
                }
                traverse(objAsRecord[key], newPath);
            });
        }
    };
    traverse(payload, '');
    return payload;
}
function renameKeysFromSDKRequestToRESTRequest(payload, ignorePaths = []) {
    return renameAllNestedKeys(payload, _constants_js__WEBPACK_IMPORTED_MODULE_0__.SDKRequestToRESTRequestRenameMap, ignorePaths);
}
function renameKeysFromRESTResponseToSDKResponse(payload, ignorePaths = []) {
    return renameAllNestedKeys(payload, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESTResponseToSDKResponseRenameMap, ignorePaths);
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/rest-modules.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/rest-modules.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRESTModule: () => (/* binding */ createRESTModule)
/* harmony export */ });
/* harmony import */ var _context_v2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context-v2.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/context-v2.js");

function createRESTModule(descriptor, elevated = false) {
    return (0,_context_v2_js__WEBPACK_IMPORTED_MODULE_0__.contextualizeRESTModuleV2)(descriptor, elevated);
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transform-error.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transform-error.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformError: () => (/* binding */ transformError)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/utils.js");

const isValidationError = (httpClientError) => 'validationError' in (httpClientError.response?.data?.details ?? {});
const isApplicationError = (httpClientError) => 'applicationError' in
    (httpClientError.response?.data?.details ?? {});
const isClientError = (httpClientError) => (httpClientError.response?.status ?? -1) >= 400 &&
    (httpClientError.response?.status ?? -1) < 500;
function transformError(httpClientError, pathsToArguments = {
    explicitPathsToArguments: {},
    spreadPathsToArguments: {},
    singleArgumentUnchanged: false,
}, argumentNames = []) {
    if (typeof httpClientError !== 'object' || httpClientError === null) {
        throw httpClientError;
    }
    if (isValidationError(httpClientError)) {
        return buildValidationError(httpClientError.response.data, pathsToArguments, argumentNames);
    }
    if (isApplicationError(httpClientError)) {
        return buildApplicationError(httpClientError);
    }
    if (isClientError(httpClientError)) {
        const statusText = httpClientError.response?.statusText ?? 'UNKNOWN';
        const message = httpClientError.response?.data?.message ?? statusText;
        const details = {
            applicationError: {
                description: statusText,
                code: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.constantCase)(statusText),
                data: {},
            },
        };
        return buildError({
            message: JSON.stringify({
                message,
                details,
            }, null, 2),
            extraProperties: { details },
        });
    }
    return buildSystemError(httpClientError);
}
const buildValidationError = (validationErrorResponse, pathsToArguments, argumentNames) => {
    const { fieldViolations } = validationErrorResponse.details.validationError;
    const transformedFieldViolations = violationsWithRenamedFields(pathsToArguments, fieldViolations, argumentNames).sort((a, b) => (a.field < b.field ? -1 : 1));
    const message = `INVALID_ARGUMENT: ${transformedFieldViolations
        .map(({ field, description }) => `"${field}" ${description}`)
        .join(', ')}`;
    const details = {
        validationError: { fieldViolations: transformedFieldViolations },
    };
    return buildError({
        message: JSON.stringify({ message, details }, null, 2),
        extraProperties: { details },
    });
};
const buildError = ({ message, extraProperties = {}, }) => {
    const error = new Error(message);
    for (const [key, value] of Object.entries(extraProperties)) {
        if (value !== undefined) {
            error[key] = value;
        }
    }
    return error;
};
const buildApplicationError = (httpClientError) => {
    const statusText = httpClientError.response?.statusText ?? 'UNKNOWN';
    const message = httpClientError.response?.data?.message ?? statusText;
    const description = httpClientError.response?.data?.details?.applicationError?.description ??
        statusText;
    const code = httpClientError.response?.data?.details?.applicationError?.code ??
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.constantCase)(statusText);
    const data = httpClientError.response?.data?.details?.applicationError?.data ?? {};
    const combinedMessage = message === description ? message : `${message}: ${description}`;
    const details = {
        applicationError: {
            description,
            code,
            data,
        },
    };
    return buildError({
        message: JSON.stringify({ message: combinedMessage, details }, null, 2),
        extraProperties: { details },
    });
};
const buildSystemError = (httpClientError) => {
    const message = httpClientError.requestId
        ? `System error occurred, request-id: ${httpClientError.requestId}`
        : 'System error occurred';
    return buildError({
        message,
        extraProperties: {
            requestId: httpClientError.requestId,
            code: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.constantCase)(httpClientError.response?.statusText ?? 'UNKNOWN'),
            ...(!httpClientError.response && {
                runtimeError: httpClientError,
            }),
        },
    });
};
const violationsWithRenamedFields = ({ spreadPathsToArguments, explicitPathsToArguments, singleArgumentUnchanged, }, fieldViolations, argumentNames) => {
    const allPathsToArguments = {
        ...spreadPathsToArguments,
        ...explicitPathsToArguments,
    };
    const allPathsToArgumentsKeys = Object.keys(allPathsToArguments);
    return fieldViolations
        .filter((fieldViolation) => {
        // In some cases, the violations error will include both some.nested and some.nested.path,
        // so we'll pick the more specific one if it's covered by the paths in the transformation.
        const containedInAMoreSpecificViolationField = fieldViolations.some((anotherViolation) => anotherViolation.field.length > fieldViolation.field.length &&
            anotherViolation.field.startsWith(fieldViolation.field) &&
            allPathsToArgumentsKeys.includes(anotherViolation.field));
        return !containedInAMoreSpecificViolationField;
    })
        .map((fieldViolation) => {
        // This means we've got some.nested.field in the violation,
        // matched against { some: { nested: { field: $[0].a.b.c } } } in the transformation.
        // some.nested.field is replaced entirely with $[0].a.b.c, with $[0] replaced with the name of argument 0
        const exactMatchArgumentExpression = explicitPathsToArguments[fieldViolation.field];
        if (exactMatchArgumentExpression) {
            return {
                ...fieldViolation,
                field: withRenamedArgument(exactMatchArgumentExpression, argumentNames),
            };
        }
        const longestPartialPathMatch = allPathsToArgumentsKeys
            .sort((a, b) => b.length - a.length)
            .find((path) => fieldViolation.field.startsWith(path));
        if (longestPartialPathMatch) {
            // This means we've got some.nested.field in the violation,
            // matched against { some: { nested: { *: $[0].a.b.c } } } in the transformation.
            // Only the prefix some.nested is replaced with $[0].a.b.c, with $[0] replaced with the name of argument 0
            // This can also happen in the case where the #wrap function is used.
            const partialMatchArgumentExpression = allPathsToArguments[longestPartialPathMatch];
            if (partialMatchArgumentExpression) {
                return {
                    ...fieldViolation,
                    field: fieldViolation.field.replace(longestPartialPathMatch, withRenamedArgument(partialMatchArgumentExpression, argumentNames)),
                };
            }
        }
        if (singleArgumentUnchanged) {
            return {
                ...fieldViolation,
                field: `${argumentNames[0]}.${fieldViolation.field}`,
            };
        }
        return fieldViolation;
    });
};
const withRenamedArgument = (fieldValue, argumentNames) => {
    const argIndex = getArgumentIndex(fieldValue);
    if (argIndex !== null && typeof argIndex !== 'undefined') {
        return fieldValue.replace(`$[${argIndex}]`, argumentNames[argIndex]);
    }
    return fieldValue;
};
const getArgumentIndex = (s) => {
    const match = s.match(/\$\[(?<argIndex>\d+)\]/);
    return match && match.groups && Number(match.groups.argIndex);
};


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/float.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/float.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformRESTFloatToSDKFloat: () => (/* binding */ transformRESTFloatToSDKFloat),
/* harmony export */   transformSDKFloatToRESTFloat: () => (/* binding */ transformSDKFloatToRESTFloat)
/* harmony export */ });
function transformSDKFloatToRESTFloat(val) {
    return isFinite(val) ? val : val.toString();
}
function transformRESTFloatToSDKFloat(val) {
    if (val === 'NaN') {
        return NaN;
    }
    if (val === 'Infinity') {
        return Infinity;
    }
    if (val === '-Infinity') {
        return -Infinity;
    }
    return val;
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/image.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/image.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformRESTImageToSDKImage: () => (/* binding */ transformRESTImageToSDKImage),
/* harmony export */   transformSDKImageToRESTImage: () => (/* binding */ transformSDKImageToRESTImage)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/utils.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/constants.js");


function transformSDKImageToRESTImage(val) {
    if (!val) {
        return;
    }
    const alignedImage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.alignIfLegacy)(val, 'image');
    const { protocol, hash, pathname } = new URL(alignedImage);
    const params = new URLSearchParams(hash.replace('#', ''));
    const height = params.get('originHeight');
    const width = params.get('originWidth');
    const [id, filenameOrAltText] = pathname
        .replace(`image://v1/`, '')
        .split('/');
    const decodedFilenameOrAltText = decodeURIComponent(filenameOrAltText);
    if (protocol === _constants_js__WEBPACK_IMPORTED_MODULE_1__.WIX_PROTOCOL) {
        const res = { id, height: Number(height), width: Number(width) };
        if (!decodedFilenameOrAltText) {
            return res;
        }
        return {
            ...res,
            altText: decodedFilenameOrAltText,
            filename: decodedFilenameOrAltText,
        };
    }
    return { url: val };
}
function transformRESTImageToSDKImage(payload) {
    if (!payload) {
        return;
    }
    let fileNameOrAltText = '';
    if (payload.filename || payload.altText) {
        fileNameOrAltText = `/${encodeURIComponent((payload.filename || payload.altText))}`;
    }
    return payload.id
        ? `wix:image://v1/${payload.id}${fileNameOrAltText}#originWidth=${payload.width}&originHeight=${payload.height}`
        : payload.url;
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/timestamp.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/timestamp.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformRESTTimestampToSDKTimestamp: () => (/* binding */ transformRESTTimestampToSDKTimestamp),
/* harmony export */   transformSDKTimestampToRESTTimestamp: () => (/* binding */ transformSDKTimestampToRESTTimestamp)
/* harmony export */ });
function transformSDKTimestampToRESTTimestamp(val) {
    return val?.toISOString();
}
function transformRESTTimestampToSDKTimestamp(val) {
    return val ? new Date(val) : undefined;
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/transform-paths.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/transform-paths.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformPaths: () => (/* binding */ transformPaths)
/* harmony export */ });
function transformPath(obj, { path, isRepeated, isMap, }, transformFn) {
    const pathParts = path.split('.');
    if (pathParts.length === 1 && path in obj) {
        obj[path] = isRepeated
            ? obj[path].map(transformFn)
            : isMap
                ? Object.fromEntries(Object.entries(obj[path]).map(([key, value]) => [key, transformFn(value)]))
                : transformFn(obj[path]);
        return obj;
    }
    const [first, ...rest] = pathParts;
    if (first.endsWith('{}')) {
        const cleanPath = first.slice(0, -2);
        obj[cleanPath] = Object.fromEntries(Object.entries(obj[cleanPath]).map(([key, value]) => [
            key,
            transformPath(value, { path: rest.join('.'), isRepeated, isMap }, transformFn),
        ]));
    }
    else if (Array.isArray(obj[first])) {
        obj[first] = obj[first].map((item) => transformPath(item, { path: rest.join('.'), isRepeated, isMap }, transformFn));
    }
    else if (first in obj &&
        typeof obj[first] === 'object' &&
        obj[first] !== null) {
        obj[first] = transformPath(obj[first], { path: rest.join('.'), isRepeated, isMap }, transformFn);
    }
    return obj;
}
function transformPaths(obj, transformations) {
    return transformations.reduce((acc, { paths, transformFn }) => paths.reduce((transformerAcc, path) => transformPath(transformerAcc, path, transformFn), acc), obj);
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/video-v2.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/transformations/video-v2.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformRESTVideoV2ToSDKVideoV2: () => (/* binding */ transformRESTVideoV2ToSDKVideoV2),
/* harmony export */   transformSDKVideoV2ToRESTVideoV2: () => (/* binding */ transformSDKVideoV2ToRESTVideoV2)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/utils.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/constants.js");


function transformSDKVideoV2ToRESTVideoV2(val) {
    if (!val) {
        return;
    }
    const alignedVideo = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.alignIfLegacy)(val, 'video');
    const { protocol, hash, pathname } = new URL(alignedVideo);
    const params = new URLSearchParams(hash.replace('#', ''));
    const posterUri = params.get('posterUri');
    const height = params.get('posterHeight');
    const width = params.get('posterWidth');
    const [id, fileName] = pathname.replace(`video://v1/`, '').split('/');
    if (protocol === _constants_js__WEBPACK_IMPORTED_MODULE_1__.WIX_PROTOCOL) {
        let res = { id };
        if (fileName) {
            res = { ...res, filename: decodeURIComponent(fileName) };
        }
        if (!posterUri) {
            return res;
        }
        return {
            ...res,
            posters: [
                {
                    id: posterUri.toString(),
                    height: Number(height),
                    width: Number(width),
                },
            ],
        };
    }
    return { url: val };
}
function transformRESTVideoV2ToSDKVideoV2(val) {
    if (!val) {
        return;
    }
    let fileName = '';
    if (val?.filename) {
        fileName = `/${encodeURIComponent(val.filename)}`;
    }
    let posterData = '';
    if (val.posters?.length) {
        const [poster1, poster2] = val.posters;
        const poster = poster2 || poster1;
        let posterId = poster.id || '';
        if (!posterId && poster.url) {
            const idx = poster.url.lastIndexOf('/');
            if (idx !== -1) {
                posterId = poster.url.substring(idx + 1);
            }
        }
        if (posterId) {
            posterData = `#posterUri=${posterId}&posterWidth=${poster.width}&posterHeight=${poster.height}`;
        }
    }
    return val.id ? `wix:video://v1/${val.id}${fileName}${posterData}` : val.url;
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/utils.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/utils.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alignIfLegacy: () => (/* binding */ alignIfLegacy),
/* harmony export */   constantCase: () => (/* binding */ constantCase),
/* harmony export */   removeUndefinedKeys: () => (/* binding */ removeUndefinedKeys),
/* harmony export */   split: () => (/* binding */ split)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/build/constants.js");

function alignIfLegacy(url, type) {
    const { protocol } = new URL(url);
    return protocol === `${type}:` ? `${_constants_js__WEBPACK_IMPORTED_MODULE_0__.WIX_PROTOCOL}${url}` : url;
}
function removeUndefinedKeys(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined));
}
function constantCase(input) {
    return split(input)
        .map((part) => part.toLocaleUpperCase())
        .join('_');
}
const SPLIT_LOWER_UPPER_RE = /([\p{Ll}\d])(\p{Lu})/gu;
const SPLIT_UPPER_UPPER_RE = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu;
const SPLIT_REPLACE_VALUE = '$1\0$2';
const DEFAULT_STRIP_REGEXP = /[^\p{L}\d]+/giu;
function split(value) {
    let result = value.trim();
    result = result
        .replace(SPLIT_LOWER_UPPER_RE, SPLIT_REPLACE_VALUE)
        .replace(SPLIT_UPPER_UPPER_RE, SPLIT_REPLACE_VALUE);
    result = result.replace(DEFAULT_STRIP_REGEXP, '\0');
    let start = 0;
    let end = result.length;
    // Trim the delimiter from around the output string.
    while (result.charAt(start) === '\0') {
        start++;
    }
    if (start === end) {
        return [];
    }
    while (result.charAt(end - 1) === '\0') {
        end--;
    }
    return result.slice(start, end).split(/\0/g);
}


/***/ }),

/***/ "./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/node_modules/@wix/sdk-types/build/browser/index.mjs":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/@wix/stores_products/node_modules/@wix/sdk-runtime/node_modules/@wix/sdk-types/build/browser/index.mjs ***!
  \*****************************************************************************************************************************/
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

/***/ "./node_modules/js-base64/base64.mjs":
/*!*******************************************!*\
  !*** ./node_modules/js-base64/base64.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base64: () => (/* binding */ gBase64),
/* harmony export */   VERSION: () => (/* binding */ VERSION),
/* harmony export */   atob: () => (/* binding */ _atob),
/* harmony export */   atobPolyfill: () => (/* binding */ atobPolyfill),
/* harmony export */   btoa: () => (/* binding */ _btoa),
/* harmony export */   btoaPolyfill: () => (/* binding */ btoaPolyfill),
/* harmony export */   btou: () => (/* binding */ btou),
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode),
/* harmony export */   encodeURI: () => (/* binding */ encodeURI),
/* harmony export */   encodeURL: () => (/* binding */ encodeURI),
/* harmony export */   extendBuiltins: () => (/* binding */ extendBuiltins),
/* harmony export */   extendString: () => (/* binding */ extendString),
/* harmony export */   extendUint8Array: () => (/* binding */ extendUint8Array),
/* harmony export */   fromBase64: () => (/* binding */ decode),
/* harmony export */   fromUint8Array: () => (/* binding */ fromUint8Array),
/* harmony export */   isValid: () => (/* binding */ isValid),
/* harmony export */   toBase64: () => (/* binding */ encode),
/* harmony export */   toUint8Array: () => (/* binding */ toUint8Array),
/* harmony export */   utob: () => (/* binding */ utob),
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
/**
 *  base64.ts
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 * @author Dan Kogai (https://github.com/dankogai)
 */
const version = '3.7.7';
/**
 * @deprecated use lowercase `version`.
 */
const VERSION = version;
const _hasBuffer = typeof Buffer === 'function';
const _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
const _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
const b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const b64chs = Array.prototype.slice.call(b64ch);
const b64tab = ((a) => {
    let tab = {};
    a.forEach((c, i) => tab[c] = i);
    return tab;
})(b64chs);
const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
const _fromCC = String.fromCharCode.bind(String);
const _U8Afrom = typeof Uint8Array.from === 'function'
    ? Uint8Array.from.bind(Uint8Array)
    : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
const _mkUriSafe = (src) => src
    .replace(/=/g, '').replace(/[+\/]/g, (m0) => m0 == '+' ? '-' : '_');
const _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, '');
/**
 * polyfill version of `btoa`
 */
const btoaPolyfill = (bin) => {
    // console.log('polyfilled');
    let u32, c0, c1, c2, asc = '';
    const pad = bin.length % 3;
    for (let i = 0; i < bin.length;) {
        if ((c0 = bin.charCodeAt(i++)) > 255 ||
            (c1 = bin.charCodeAt(i++)) > 255 ||
            (c2 = bin.charCodeAt(i++)) > 255)
            throw new TypeError('invalid character found');
        u32 = (c0 << 16) | (c1 << 8) | c2;
        asc += b64chs[u32 >> 18 & 63]
            + b64chs[u32 >> 12 & 63]
            + b64chs[u32 >> 6 & 63]
            + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
/**
 * does what `window.btoa` of web browsers do.
 * @param {String} bin binary string
 * @returns {string} Base64-encoded string
 */
const _btoa = typeof btoa === 'function' ? (bin) => btoa(bin)
    : _hasBuffer ? (bin) => Buffer.from(bin, 'binary').toString('base64')
        : btoaPolyfill;
const _fromUint8Array = _hasBuffer
    ? (u8a) => Buffer.from(u8a).toString('base64')
    : (u8a) => {
        // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326
        const maxargs = 0x1000;
        let strs = [];
        for (let i = 0, l = u8a.length; i < l; i += maxargs) {
            strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
        }
        return _btoa(strs.join(''));
    };
/**
 * converts a Uint8Array to a Base64 string.
 * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
 * @returns {string} Base64 string
 */
const fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const utob = (src: string) => unescape(encodeURIComponent(src));
// reverting good old fationed regexp
const cb_utob = (c) => {
    if (c.length < 2) {
        var cc = c.charCodeAt(0);
        return cc < 0x80 ? c
            : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))
                + _fromCC(0x80 | (cc & 0x3f)))
                : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))
                    + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
                    + _fromCC(0x80 | (cc & 0x3f)));
    }
    else {
        var cc = 0x10000
            + (c.charCodeAt(0) - 0xD800) * 0x400
            + (c.charCodeAt(1) - 0xDC00);
        return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))
            + _fromCC(0x80 | ((cc >>> 12) & 0x3f))
            + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
            + _fromCC(0x80 | (cc & 0x3f)));
    }
};
const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-8 string
 * @returns {string} UTF-16 string
 */
const utob = (u) => u.replace(re_utob, cb_utob);
//
const _encode = _hasBuffer
    ? (s) => Buffer.from(s, 'utf8').toString('base64')
    : _TE
        ? (s) => _fromUint8Array(_TE.encode(s))
        : (s) => _btoa(utob(s));
/**
 * converts a UTF-8-encoded string to a Base64 string.
 * @param {boolean} [urlsafe] if `true` make the result URL-safe
 * @returns {string} Base64 string
 */
const encode = (src, urlsafe = false) => urlsafe
    ? _mkUriSafe(_encode(src))
    : _encode(src);
/**
 * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
 * @returns {string} Base64 string
 */
const encodeURI = (src) => encode(src, true);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const btou = (src: string) => decodeURIComponent(escape(src));
// reverting good old fationed regexp
const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
const cb_btou = (cccc) => {
    switch (cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                | ((0x3f & cccc.charCodeAt(1)) << 12)
                | ((0x3f & cccc.charCodeAt(2)) << 6)
                | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;
            return (_fromCC((offset >>> 10) + 0xD800)
                + _fromCC((offset & 0x3FF) + 0xDC00));
        case 3:
            return _fromCC(((0x0f & cccc.charCodeAt(0)) << 12)
                | ((0x3f & cccc.charCodeAt(1)) << 6)
                | (0x3f & cccc.charCodeAt(2)));
        default:
            return _fromCC(((0x1f & cccc.charCodeAt(0)) << 6)
                | (0x3f & cccc.charCodeAt(1)));
    }
};
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */
const btou = (b) => b.replace(re_btou, cb_btou);
/**
 * polyfill version of `atob`
 */
const atobPolyfill = (asc) => {
    // console.log('polyfilled');
    asc = asc.replace(/\s+/g, '');
    if (!b64re.test(asc))
        throw new TypeError('malformed base64.');
    asc += '=='.slice(2 - (asc.length & 3));
    let u24, bin = '', r1, r2;
    for (let i = 0; i < asc.length;) {
        u24 = b64tab[asc.charAt(i++)] << 18
            | b64tab[asc.charAt(i++)] << 12
            | (r1 = b64tab[asc.charAt(i++)]) << 6
            | (r2 = b64tab[asc.charAt(i++)]);
        bin += r1 === 64 ? _fromCC(u24 >> 16 & 255)
            : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255)
                : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
};
/**
 * does what `window.atob` of web browsers do.
 * @param {String} asc Base64-encoded string
 * @returns {string} binary string
 */
const _atob = typeof atob === 'function' ? (asc) => atob(_tidyB64(asc))
    : _hasBuffer ? (asc) => Buffer.from(asc, 'base64').toString('binary')
        : atobPolyfill;
//
const _toUint8Array = _hasBuffer
    ? (a) => _U8Afrom(Buffer.from(a, 'base64'))
    : (a) => _U8Afrom(_atob(a).split('').map(c => c.charCodeAt(0)));
/**
 * converts a Base64 string to a Uint8Array.
 */
const toUint8Array = (a) => _toUint8Array(_unURI(a));
//
const _decode = _hasBuffer
    ? (a) => Buffer.from(a, 'base64').toString('utf8')
    : _TD
        ? (a) => _TD.decode(_toUint8Array(a))
        : (a) => btou(_atob(a));
const _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == '-' ? '+' : '/'));
/**
 * converts a Base64 string to a UTF-8 string.
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {string} UTF-8 string
 */
const decode = (src) => _decode(_unURI(src));
/**
 * check if a value is a valid Base64 string
 * @param {String} src a value to check
  */
const isValid = (src) => {
    if (typeof src !== 'string')
        return false;
    const s = src.replace(/\s+/g, '').replace(/={0,2}$/, '');
    return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
//
const _noEnum = (v) => {
    return {
        value: v, enumerable: false, writable: true, configurable: true
    };
};
/**
 * extend String.prototype with relevant methods
 */
const extendString = function () {
    const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
    _add('fromBase64', function () { return decode(this); });
    _add('toBase64', function (urlsafe) { return encode(this, urlsafe); });
    _add('toBase64URI', function () { return encode(this, true); });
    _add('toBase64URL', function () { return encode(this, true); });
    _add('toUint8Array', function () { return toUint8Array(this); });
};
/**
 * extend Uint8Array.prototype with relevant methods
 */
const extendUint8Array = function () {
    const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
    _add('toBase64', function (urlsafe) { return fromUint8Array(this, urlsafe); });
    _add('toBase64URI', function () { return fromUint8Array(this, true); });
    _add('toBase64URL', function () { return fromUint8Array(this, true); });
};
/**
 * extend Builtin prototypes with relevant methods
 */
const extendBuiltins = () => {
    extendString();
    extendUint8Array();
};
const gBase64 = {
    version: version,
    VERSION: VERSION,
    atob: _atob,
    atobPolyfill: atobPolyfill,
    btoa: _btoa,
    btoaPolyfill: btoaPolyfill,
    fromBase64: decode,
    toBase64: encode,
    encode: encode,
    encodeURI: encodeURI,
    encodeURL: encodeURI,
    utob: utob,
    btou: btou,
    decode: decode,
    isValid: isValid,
    fromUint8Array: fromUint8Array,
    toUint8Array: toUint8Array,
    extendString: extendString,
    extendUint8Array: extendUint8Array,
    extendBuiltins: extendBuiltins
};
// makecjs:CUT //




















// and finally,



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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/*!*************************!*\
  !*** ./src/element2.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wix_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/sdk */ "./node_modules/@wix/sdk/build/wixClient.js");
/* harmony import */ var _wix_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wix/site */ "./node_modules/@wix/site/dist/esm/index.js");
/* harmony import */ var _wix_stores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wix/stores */ "./node_modules/@wix/stores_products/build/es/index.js");




const myWixClient = (0,_wix_sdk__WEBPACK_IMPORTED_MODULE_0__.createClient)({
  auth: _wix_site__WEBPACK_IMPORTED_MODULE_1__.site.auth(),
  host: _wix_site__WEBPACK_IMPORTED_MODULE_1__.site.host({ applicationId: "7dea53d2-fbd3-463a-990a-22216a7cfb35" }),
  modules: {
    products: _wix_stores__WEBPACK_IMPORTED_MODULE_2__
  },
});

class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    this.accessTokenListener = myWixClient.auth.getAccessTokenInjector();
  }

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
    this.container.style.borderRadius = '10px';
    this.container.style.padding = '10px';
    this.shadowRoot.appendChild(this.container);

    // Create a container for the text content
    this.textElement = document.createElement('h2');

    const root = document.documentElement;
    const font = getComputedStyle(root).getPropertyValue('--wst-font-style-h2');
    console.log(font); // Output: the value of the CSS variable

    this.textElement.style.font = font;

    this.container.appendChild(this.textElement);

    // Set the initial color and text content
    this.setColor(this.getAttribute('color'));
    this.setTextContent("...");

    this.getProduct(this.getAttribute('product-id'))
  }

  static get observedAttributes() {
    return ['color', 'product-id'];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color' && oldValue !== newValue) {
      console.log("Color attribute changed");
      this.setColor(newValue);
    } else if (name === 'product-id' && oldValue !== newValue) {
      if (myWixClient) {
        this.getProduct(newValue)
      } else { console.log("No client") }
    }
  }

  async getProduct(productId) {
    console.log("Client: ", myWixClient);
    try {
      //const myService = await myWixClient.services.getService(serviceId);
     // console.log("Service object: ", JSON.stringify(myService));

      const product = await myWixClient.products.getProduct(productid);
      
      this.setTextContent(JSON.stringify(product));
    } catch (error) {
      console.error("Error getting product:", error);
      this.setTextContent("Error getting product");
    }
  }
}

customElements.define('ce-josh', MyCustomElement);
})();

/******/ })()
;