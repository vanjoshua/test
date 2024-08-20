/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wix/editor-application/dist/esm/platform-frame-api/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/dist/esm/platform-frame-api/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlatformFrameAPI: () => (/* binding */ PlatformFrameAPI)
/* harmony export */ });
/* harmony import */ var _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/public-editor-platform-events */ "./node_modules/@wix/public-editor-platform-events/dist/esm/index.mjs");
/* harmony import */ var _wix_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wix/sdk */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/wixClient.js");
/* harmony import */ var _wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wix/public-editor-platform-errors */ "./node_modules/@wix/public-editor-platform-errors/dist/esm/index.mjs");




class WorkerEventsBridge {
  constructor(platformAppEvents) {
    this.platformAppEvents = platformAppEvents;
  }
  /**
   * Notify by event from Worker Manager (platform infrastructure)
   */
  notify(event) {
    switch (event.type) {
      case _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_0__.PlatformLifecycleEvent.EditorReady:
        this.platformAppEvents.notify({
          ...event,
          // @ts-expect-error TODO: fix me
          type: _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_0__.PlatformAppEvent.EditorReady
        });
        break;
      case _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_0__.PlatformPrivateEvent.HostEvent:
        this.platformAppEvents.notify({
          ...event,
          type: _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_0__.PlatformAppEvent.HostEvent
        });
        break;
    }
  }
  /**
   * Subscribe to Worker (Application) event
   */
  subscribe(cb) {
    this.platformAppEvents.subscribe((event) => {
      cb(event);
    });
  }
}

var PlatformConsumerEnvironmentAPIType = /* @__PURE__ */ ((PlatformConsumerEnvironmentAPIType2) => {
  PlatformConsumerEnvironmentAPIType2["Frame"] = "PLATFORM_FRAME_API";
  PlatformConsumerEnvironmentAPIType2["Worker"] = "PLATFORM_WORKER_API";
  return PlatformConsumerEnvironmentAPIType2;
})(PlatformConsumerEnvironmentAPIType || {});
class AbstractEnvironmentAPI {
  constructor(env) {
    this.env = env;
    this.create();
  }
}

var EditorPlatformApplicationContextErrorCode = /* @__PURE__ */ ((EditorPlatformApplicationContextErrorCode2) => {
  EditorPlatformApplicationContextErrorCode2["IncorrectEnvironment"] = "IncorrectEnvironment";
  EditorPlatformApplicationContextErrorCode2["ClientAuthError"] = "ClientAuthError";
  return EditorPlatformApplicationContextErrorCode2;
})(EditorPlatformApplicationContextErrorCode || {});
class EditorPlatformApplicationContextError extends _wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_1__.BaseError {
  state = {};
  constructor(message, code) {
    super(message, code, "Editor Platform Application Context Error");
  }
  withUrl(url) {
    this.state = { ...this.state, url };
    return this;
  }
  withAppDefinitionId(appDefinitionId) {
    this.state = { ...this.state, appDefinitionId };
    return this;
  }
}
const createEditorPlatformApplicationContextError = (0,_wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_1__.createErrorBuilder)(EditorPlatformApplicationContextError);
async function transformEventPayload(eventPayload, privateAPI) {
  if (!eventPayload?.type) {
    return eventPayload;
  }
  switch (eventPayload.type) {
    case "componentSelectionChanged":
      const componentRefs = eventPayload.componentRefs || [];
      const components = await Promise.all(
        componentRefs.map((ref) => {
          return privateAPI.components.getComponent(ref);
        })
      );
      return {
        type: eventPayload.type,
        components
      };
    default:
      return eventPayload;
  }
}
class ApplicationBoundEvents {
  constructor(appDefinitionId, events, privateAPI) {
    this.appDefinitionId = appDefinitionId;
    this.privateAPI = privateAPI;
    this.events = events;
    this.subscribe = events.subscribe.bind(events);
    this.commit = events.commit.bind(events);
    this.startTransaction = events.startTransaction.bind(events);
    this.silent = events.silent.bind(events);
  }
  events;
  subscribe;
  commit;
  startTransaction;
  silent;
  notify(event) {
    this.events.notify({
      type: event.type,
      payload: event.payload,
      meta: {
        appDefinitionId: this.appDefinitionId
      }
    });
  }
  notifyCustomEvent(type, payload) {
    this.notify({
      type: _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_0__.PlatformAppEvent.CustomEvent,
      payload: {
        ...payload,
        type
      }
    });
  }
  /**
   * TODO: we should use same interface for all events
   * (subscribe vs addEventListener)
   */
  addEventListener(eventType, fn) {
    return this.events.subscribe(async (event) => {
      const isAppMatch = event.meta?.appDefinitionId === this.appDefinitionId || event.meta?.appDefinitionId === null;
      const transformPayload = () => transformEventPayload(event.payload, this.privateAPI);
      if (eventType === "*") {
        fn(await transformPayload());
      } else if (event.type === _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_0__.PlatformAppEvent.CustomEvent) {
        if (eventType === event.payload?.type && !isAppMatch) {
          fn(await transformPayload());
        }
      } else if (event.type === _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_0__.PlatformAppEvent.HostEvent) {
        if (eventType === event.payload?.type && isAppMatch) {
          fn(await transformPayload());
        }
      }
    });
  }
}
const WAIT_INJECTED_TIMEOUT = 200;
const WAIT_INJECTED_RETRY_COUNT = 50;
class ContextInjectionStatus {
  _resolveContextInjected = () => {
  };
  _isInjected = false;
  key;
  constructor(uuid) {
    this.key = `__${uuid}_CONTEXT_INJECTION_STATUS_KEY`;
    if (!globalThis[this.key]) {
      globalThis[this.key] = new Promise((resolve) => {
        this._resolveContextInjected = () => {
          this._isInjected = true;
          resolve();
        };
      });
    }
  }
  isInjected() {
    return !!this._isInjected;
  }
  resolveInjected() {
    this._resolveContextInjected?.();
  }
  waitInjected() {
    return new Promise((resolve, reject) => {
      let injected = false;
      let timeoutId;
      let retryCount = 0;
      const timeout = () => {
        if (injected) {
          return;
        }
        timeoutId = setTimeout(() => {
          retryCount++;
          if (retryCount < WAIT_INJECTED_RETRY_COUNT) {
            if (retryCount % 10 === 0) {
              console.log(
                createEditorPlatformApplicationContextError(
                  EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
                  "contexts are not resolved, still re-trying"
                ).withMessage(`try number ${retryCount}`).message
              );
            }
            timeout();
            return;
          }
          if (!injected) {
            const error = createEditorPlatformApplicationContextError(
              EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
              "contexts are not resolved, threw by timeout"
            );
            reject(error);
          }
        }, WAIT_INJECTED_TIMEOUT);
      };
      timeout();
      const _waitContextInjectedPromise = globalThis[this.key];
      _waitContextInjectedPromise.then(() => {
        injected = true;
        clearTimeout(timeoutId);
        resolve();
      });
    });
  }
}
const ENVIRONMENT_CONTEXT_KEY = "__ENVIRONMENT_CONTEXT_KEY";
var PlatformEnvironment = /* @__PURE__ */ ((PlatformEnvironment2) => {
  PlatformEnvironment2["Worker"] = "Worker";
  PlatformEnvironment2["Frame"] = "Frame";
  PlatformEnvironment2["ComponentPanel"] = "ComponentPanel";
  return PlatformEnvironment2;
})(PlatformEnvironment || {});
class EnvironmentContext {
  constructor(environmentContext) {
    this.environmentContext = environmentContext;
  }
  static status = new ContextInjectionStatus("environment");
  static async inject(context) {
    if (globalThis[ENVIRONMENT_CONTEXT_KEY]) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "Environment context already exists and should not be overridden"
      );
    }
    globalThis[ENVIRONMENT_CONTEXT_KEY] = new EnvironmentContext(context);
    this.status.resolveInjected();
  }
  static async getInstance() {
    await this.status.waitInjected();
    return globalThis[ENVIRONMENT_CONTEXT_KEY];
  }
  getPrivateAPI() {
    return this.environmentContext.privateApi;
  }
  getEvents() {
    return this.environmentContext.events;
  }
  getApplicationAPIs() {
    return this.environmentContext.applicationAPIs ?? {};
  }
  getEnvironment() {
    return this.environmentContext.environment;
  }
}
const APPLICATION_CONTEXT_KEY = "__APPLICATION_CONTEXT_KEY";
class ApplicationContext {
  constructor(applicationContext, environment) {
    this.applicationContext = applicationContext;
    this.environment = environment;
    this.events = new ApplicationBoundEvents(
      this.applicationContext.appDefinitionId,
      this.environment.getEvents(),
      this.environment.getPrivateAPI()
    );
  }
  static status = new ContextInjectionStatus("application");
  /**
   * TODO: use generics for context type
   * - application
   * - editor
   */
  static async inject(context) {
    const environment = await EnvironmentContext.getInstance();
    if (environment.getEnvironment() !== PlatformEnvironment.Frame) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "Application context can be injected only in frame environment"
      );
    }
    if (globalThis[APPLICATION_CONTEXT_KEY]) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "Application context already exists and should not be overridden"
      );
    }
    globalThis[APPLICATION_CONTEXT_KEY] = new ApplicationContext(
      context,
      await EnvironmentContext.getInstance()
    );
    this.status.resolveInjected();
  }
  static async getInstance() {
    const environment = await EnvironmentContext.getInstance();
    if (environment.getEnvironment() === PlatformEnvironment.Frame) {
      await this.status.waitInjected();
      return globalThis[APPLICATION_CONTEXT_KEY];
    } else {
      return __APPLICATION_CONTEXT_KEY;
    }
  }
  events;
  getAppDefinitionId() {
    return this.applicationContext.appDefinitionId;
  }
  getBindings() {
    return this.applicationContext;
  }
  getEvents() {
    return this.events;
  }
  getPrivateAPI() {
    return this.environment.getPrivateAPI();
  }
  getPrivateApplicationAPI() {
    const appDefinitionId = this.getAppDefinitionId();
    if (!appDefinitionId) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "appDefinitionId is not available"
      );
    }
    return this.environment.getApplicationAPIs()[appDefinitionId];
  }
}
const createSDKHost = (props) => {
  const environmentContext = new EnvironmentContext({
    environment: props.environment,
    privateApi: props.privateAPI,
    events: props.events ?? new _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_0__.PlatformAppEventEmitter(),
    applicationAPIs: props.applicationPrivateAPI ? {
      [props.appDefinitionId]: props.applicationPrivateAPI
    } : {}
  });
  const applicationContext = new ApplicationContext(
    {
      appDefinitionId: props.appDefinitionId,
      appDefinitionName: ""
    },
    environmentContext
  );
  return {
    environment: {},
    channel: {
      observeState: async () => {
        return {
          disconnect() {
          }
        };
      }
    },
    environmentContext,
    applicationContext
  };
};
const auth = (appDefinitionId, privateAPI) => {
  return {
    getAuthHeaders: async () => {
      if (!appDefinitionId) {
        throw createEditorPlatformApplicationContextError(
          EditorPlatformApplicationContextErrorCode.ClientAuthError
        );
      }
      const authInstance = await privateAPI.info.getAppInstance(appDefinitionId);
      if (authInstance === void 0) {
        throw createEditorPlatformApplicationContextError(
          EditorPlatformApplicationContextErrorCode.ClientAuthError,
          "empty auth instance"
        ).withAppDefinitionId(appDefinitionId);
      }
      return {
        headers: {
          Authorization: authInstance
        }
      };
    }
  };
};

const DESIGN_SYSTEM_STYLES_MAP = {
  classic: "https://www.unpkg.com/@wix/design-system/dist/statics/tokens-default.global.css",
  studio: "https://www.unpkg.com/@wix/design-system/dist/statics/tokens-studio.global.css"
};
class PlatformFrameAPI extends AbstractEnvironmentAPI {
  type = PlatformConsumerEnvironmentAPIType.Frame;
  #events = new _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_0__.PlatformAppEventEmitter();
  #eventsBridge = new WorkerEventsBridge(this.#events);
  #privateAPI;
  #applicationPrivateAPI;
  constructor() {
    super(PlatformConsumerEnvironmentAPIType.Frame);
  }
  create() {
    if (typeof globalThis?.document?.head?.prepend === "function") {
      const params = new URL(globalThis.location.href).searchParams;
      const host = params.get("editorType") === "CLASSIC" ? "classic" : "studio";
      const url = DESIGN_SYSTEM_STYLES_MAP[host];
      const isAlreadyLoaded = url && !!document.querySelectorAll(`link[type="text/css"][href="${url}"]`)?.length;
      if (url && !isAlreadyLoaded) {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", url);
        globalThis.document.head.prepend(link);
      }
    }
  }
  async initEnvironment(props) {
    const { applicationPrivateAPI, privateAPI, appDefinitionId } = props;
    this.#applicationPrivateAPI = applicationPrivateAPI;
    this.#privateAPI = privateAPI;
    await EnvironmentContext.inject({
      environment: PlatformEnvironment.Frame,
      privateApi: privateAPI,
      events: this.#events,
      applicationAPIs: {
        [appDefinitionId]: this.#applicationPrivateAPI
      }
    });
    await ApplicationContext.inject({
      appDefinitionId,
      appDefinitionName: ""
    });
    const client = (0,_wix_sdk__WEBPACK_IMPORTED_MODULE_2__.createClient)({
      auth: auth(appDefinitionId, privateAPI),
      host: createSDKHost({
        appDefinitionId,
        privateAPI: this.#privateAPI,
        environment: PlatformEnvironment.Frame,
        events: this.#events,
        applicationPrivateAPI: this.#applicationPrivateAPI
      })
    });
    client.enableContext("global");
  }
  notify(event) {
    this.#eventsBridge.notify(event);
  }
  subscribe(cb) {
    this.#eventsBridge.subscribe(cb);
  }
}


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@wix/editor-application/dist/esm/platform-worker-api/index.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/dist/esm/platform-worker-api/index.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlatformWorkerAPI: () => (/* binding */ PlatformWorkerAPI)
/* harmony export */ });
/* harmony import */ var _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wix/public-editor-platform-events */ "./node_modules/@wix/public-editor-platform-events/dist/esm/index.mjs");
/* harmony import */ var _wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wix/public-editor-platform-errors */ "./node_modules/@wix/public-editor-platform-errors/dist/esm/index.mjs");
/* harmony import */ var _wix_public_editor_platform_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/public-editor-platform-interfaces */ "./node_modules/@wix/public-editor-platform-interfaces/dist/index.js");
/* harmony import */ var _wix_public_editor_platform_interfaces__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wix_public_editor_platform_interfaces__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wix_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wix/sdk */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/wixClient.js");





class WorkerEventsBridge {
  constructor(platformAppEvents) {
    this.platformAppEvents = platformAppEvents;
  }
  /**
   * Notify by event from Worker Manager (platform infrastructure)
   */
  notify(event) {
    switch (event.type) {
      case _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__.PlatformLifecycleEvent.EditorReady:
        this.platformAppEvents.notify({
          ...event,
          // @ts-expect-error TODO: fix me
          type: _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__.PlatformAppEvent.EditorReady
        });
        break;
      case _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__.PlatformPrivateEvent.HostEvent:
        this.platformAppEvents.notify({
          ...event,
          type: _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__.PlatformAppEvent.HostEvent
        });
        break;
    }
  }
  /**
   * Subscribe to Worker (Application) event
   */
  subscribe(cb) {
    this.platformAppEvents.subscribe((event) => {
      cb(event);
    });
  }
}

var EditorPlatformApplicationContextErrorCode = /* @__PURE__ */ ((EditorPlatformApplicationContextErrorCode2) => {
  EditorPlatformApplicationContextErrorCode2["IncorrectEnvironment"] = "IncorrectEnvironment";
  EditorPlatformApplicationContextErrorCode2["ClientAuthError"] = "ClientAuthError";
  return EditorPlatformApplicationContextErrorCode2;
})(EditorPlatformApplicationContextErrorCode || {});
class EditorPlatformApplicationContextError extends _wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__.BaseError {
  state = {};
  constructor(message, code) {
    super(message, code, "Editor Platform Application Context Error");
  }
  withUrl(url) {
    this.state = { ...this.state, url };
    return this;
  }
  withAppDefinitionId(appDefinitionId) {
    this.state = { ...this.state, appDefinitionId };
    return this;
  }
}
const createEditorPlatformApplicationContextError = (0,_wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__.createErrorBuilder)(EditorPlatformApplicationContextError);
async function transformEventPayload(eventPayload, privateAPI) {
  if (!eventPayload?.type) {
    return eventPayload;
  }
  switch (eventPayload.type) {
    case "componentSelectionChanged":
      const componentRefs = eventPayload.componentRefs || [];
      const components = await Promise.all(
        componentRefs.map((ref) => {
          return privateAPI.components.getComponent(ref);
        })
      );
      return {
        type: eventPayload.type,
        components
      };
    default:
      return eventPayload;
  }
}
class ApplicationBoundEvents {
  constructor(appDefinitionId, events, privateAPI) {
    this.appDefinitionId = appDefinitionId;
    this.privateAPI = privateAPI;
    this.events = events;
    this.subscribe = events.subscribe.bind(events);
    this.commit = events.commit.bind(events);
    this.startTransaction = events.startTransaction.bind(events);
    this.silent = events.silent.bind(events);
  }
  events;
  subscribe;
  commit;
  startTransaction;
  silent;
  notify(event) {
    this.events.notify({
      type: event.type,
      payload: event.payload,
      meta: {
        appDefinitionId: this.appDefinitionId
      }
    });
  }
  notifyCustomEvent(type, payload) {
    this.notify({
      type: _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__.PlatformAppEvent.CustomEvent,
      payload: {
        ...payload,
        type
      }
    });
  }
  /**
   * TODO: we should use same interface for all events
   * (subscribe vs addEventListener)
   */
  addEventListener(eventType, fn) {
    return this.events.subscribe(async (event) => {
      const isAppMatch = event.meta?.appDefinitionId === this.appDefinitionId || event.meta?.appDefinitionId === null;
      const transformPayload = () => transformEventPayload(event.payload, this.privateAPI);
      if (eventType === "*") {
        fn(await transformPayload());
      } else if (event.type === _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__.PlatformAppEvent.CustomEvent) {
        if (eventType === event.payload?.type && !isAppMatch) {
          fn(await transformPayload());
        }
      } else if (event.type === _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__.PlatformAppEvent.HostEvent) {
        if (eventType === event.payload?.type && isAppMatch) {
          fn(await transformPayload());
        }
      }
    });
  }
}
const WAIT_INJECTED_TIMEOUT = 200;
const WAIT_INJECTED_RETRY_COUNT = 50;
class ContextInjectionStatus {
  _resolveContextInjected = () => {
  };
  _isInjected = false;
  key;
  constructor(uuid) {
    this.key = `__${uuid}_CONTEXT_INJECTION_STATUS_KEY`;
    if (!globalThis[this.key]) {
      globalThis[this.key] = new Promise((resolve) => {
        this._resolveContextInjected = () => {
          this._isInjected = true;
          resolve();
        };
      });
    }
  }
  isInjected() {
    return !!this._isInjected;
  }
  resolveInjected() {
    this._resolveContextInjected?.();
  }
  waitInjected() {
    return new Promise((resolve, reject) => {
      let injected = false;
      let timeoutId;
      let retryCount = 0;
      const timeout = () => {
        if (injected) {
          return;
        }
        timeoutId = setTimeout(() => {
          retryCount++;
          if (retryCount < WAIT_INJECTED_RETRY_COUNT) {
            if (retryCount % 10 === 0) {
              console.log(
                createEditorPlatformApplicationContextError(
                  EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
                  "contexts are not resolved, still re-trying"
                ).withMessage(`try number ${retryCount}`).message
              );
            }
            timeout();
            return;
          }
          if (!injected) {
            const error = createEditorPlatformApplicationContextError(
              EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
              "contexts are not resolved, threw by timeout"
            );
            reject(error);
          }
        }, WAIT_INJECTED_TIMEOUT);
      };
      timeout();
      const _waitContextInjectedPromise = globalThis[this.key];
      _waitContextInjectedPromise.then(() => {
        injected = true;
        clearTimeout(timeoutId);
        resolve();
      });
    });
  }
}
const ENVIRONMENT_CONTEXT_KEY = "__ENVIRONMENT_CONTEXT_KEY";
var PlatformEnvironment = /* @__PURE__ */ ((PlatformEnvironment2) => {
  PlatformEnvironment2["Worker"] = "Worker";
  PlatformEnvironment2["Frame"] = "Frame";
  PlatformEnvironment2["ComponentPanel"] = "ComponentPanel";
  return PlatformEnvironment2;
})(PlatformEnvironment || {});
class EnvironmentContext {
  constructor(environmentContext) {
    this.environmentContext = environmentContext;
  }
  static status = new ContextInjectionStatus("environment");
  static async inject(context) {
    if (globalThis[ENVIRONMENT_CONTEXT_KEY]) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "Environment context already exists and should not be overridden"
      );
    }
    globalThis[ENVIRONMENT_CONTEXT_KEY] = new EnvironmentContext(context);
    this.status.resolveInjected();
  }
  static async getInstance() {
    await this.status.waitInjected();
    return globalThis[ENVIRONMENT_CONTEXT_KEY];
  }
  getPrivateAPI() {
    return this.environmentContext.privateApi;
  }
  getEvents() {
    return this.environmentContext.events;
  }
  getApplicationAPIs() {
    return this.environmentContext.applicationAPIs ?? {};
  }
  getEnvironment() {
    return this.environmentContext.environment;
  }
}
const APPLICATION_CONTEXT_KEY = "__APPLICATION_CONTEXT_KEY";
class ApplicationContext {
  constructor(applicationContext, environment) {
    this.applicationContext = applicationContext;
    this.environment = environment;
    this.events = new ApplicationBoundEvents(
      this.applicationContext.appDefinitionId,
      this.environment.getEvents(),
      this.environment.getPrivateAPI()
    );
  }
  static status = new ContextInjectionStatus("application");
  /**
   * TODO: use generics for context type
   * - application
   * - editor
   */
  static async inject(context) {
    const environment = await EnvironmentContext.getInstance();
    if (environment.getEnvironment() !== PlatformEnvironment.Frame) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "Application context can be injected only in frame environment"
      );
    }
    if (globalThis[APPLICATION_CONTEXT_KEY]) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "Application context already exists and should not be overridden"
      );
    }
    globalThis[APPLICATION_CONTEXT_KEY] = new ApplicationContext(
      context,
      await EnvironmentContext.getInstance()
    );
    this.status.resolveInjected();
  }
  static async getInstance() {
    const environment = await EnvironmentContext.getInstance();
    if (environment.getEnvironment() === PlatformEnvironment.Frame) {
      await this.status.waitInjected();
      return globalThis[APPLICATION_CONTEXT_KEY];
    } else {
      return __APPLICATION_CONTEXT_KEY;
    }
  }
  events;
  getAppDefinitionId() {
    return this.applicationContext.appDefinitionId;
  }
  getBindings() {
    return this.applicationContext;
  }
  getEvents() {
    return this.events;
  }
  getPrivateAPI() {
    return this.environment.getPrivateAPI();
  }
  getPrivateApplicationAPI() {
    const appDefinitionId = this.getAppDefinitionId();
    if (!appDefinitionId) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "appDefinitionId is not available"
      );
    }
    return this.environment.getApplicationAPIs()[appDefinitionId];
  }
}
const createSDKHost = (props) => {
  const environmentContext = new EnvironmentContext({
    environment: props.environment,
    privateApi: props.privateAPI,
    events: props.events ?? new _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__.PlatformAppEventEmitter(),
    applicationAPIs: props.applicationPrivateAPI ? {
      [props.appDefinitionId]: props.applicationPrivateAPI
    } : {}
  });
  const applicationContext = new ApplicationContext(
    {
      appDefinitionId: props.appDefinitionId,
      appDefinitionName: ""
    },
    environmentContext
  );
  return {
    environment: {},
    channel: {
      observeState: async () => {
        return {
          disconnect() {
          }
        };
      }
    },
    environmentContext,
    applicationContext
  };
};
const auth = (appDefinitionId, privateAPI) => {
  return {
    getAuthHeaders: async () => {
      if (!appDefinitionId) {
        throw createEditorPlatformApplicationContextError(
          EditorPlatformApplicationContextErrorCode.ClientAuthError
        );
      }
      const authInstance = await privateAPI.info.getAppInstance(appDefinitionId);
      if (authInstance === void 0) {
        throw createEditorPlatformApplicationContextError(
          EditorPlatformApplicationContextErrorCode.ClientAuthError,
          "empty auth instance"
        ).withAppDefinitionId(appDefinitionId);
      }
      return {
        headers: {
          Authorization: authInstance
        }
      };
    }
  };
};

var EditorPlatformApplicationErrorCode = /* @__PURE__ */ ((EditorPlatformApplicationErrorCode2) => {
  EditorPlatformApplicationErrorCode2["ApplicationRuntimeError"] = "ApplicationRuntimeError";
  EditorPlatformApplicationErrorCode2["ApplicationCreationError"] = "ApplicationCreationError";
  EditorPlatformApplicationErrorCode2["ApplicationLoadError"] = "ApplicationLoadError";
  EditorPlatformApplicationErrorCode2["ApplicationFetchError"] = "ApplicationFetchError";
  EditorPlatformApplicationErrorCode2["ApplicationExecuteError"] = "ApplicationExecuteError";
  EditorPlatformApplicationErrorCode2["ApplicationWasRemoved"] = "ApplicationWasRemoved";
  EditorPlatformApplicationErrorCode2["UndefinedApiMethod"] = "UndefinedApiMethod";
  EditorPlatformApplicationErrorCode2["ApplicationIsNotMutable"] = "ApplicationIsNotMutable";
  EditorPlatformApplicationErrorCode2["FailedToGetPrivateAPI"] = "FailedToGetPrivateAPI";
  EditorPlatformApplicationErrorCode2["ClientAuthError"] = "ClientAuthError";
  return EditorPlatformApplicationErrorCode2;
})(EditorPlatformApplicationErrorCode || {});
class EditorPlatformApplicationError extends _wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__.BaseError {
  state = {};
  constructor(message, code) {
    super(message, code, "Editor Platform Application Error");
  }
  withUrl(url) {
    this.state = { ...this.state, url };
    return this;
  }
  withAppDefinitionId(appDefinitionId) {
    this.state = { ...this.state, appDefinitionId };
    return this;
  }
  withApiMethod(apiMethod) {
    this.state = { ...this.state, apiMethod };
    return this;
  }
  withApiType(apiType) {
    this.state = { ...this.state, apiType };
    return this;
  }
}
const createEditorPlatformApplicationError = (0,_wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__.createErrorBuilder)(EditorPlatformApplicationError);

const APPLICATION_REGISTRY_KEY = "__APPLICATION_REGISTRY_KEY";
async function executeApplication(events, client, spec, bundle) {
  const executable = new Function(
    "$wixContext",
    APPLICATION_CONTEXT_KEY,
    APPLICATION_REGISTRY_KEY,
    bundle
  );
  let instance;
  const applicationRegistryCallback = (_instance) => {
    if (instance) {
      throw createEditorPlatformApplicationError(
        EditorPlatformApplicationErrorCode.ApplicationExecuteError,
        "Application registry called more than once"
      ).withAppDefinitionId(spec.appDefinitionId);
    }
    if (_instance.type !== spec.type) {
      throw createEditorPlatformApplicationError(
        EditorPlatformApplicationErrorCode.ApplicationExecuteError,
        "Application has different type"
      ).withMessage("expected type", spec.type).withMessage("received type", _instance.type);
    }
    instance = _instance;
  };
  try {
    const context = { ...spec };
    executable.call(
      { client },
      new ApplicationContext(context, await EnvironmentContext.getInstance()),
      applicationRegistryCallback
    );
  } catch (e) {
    throw createEditorPlatformApplicationError(
      EditorPlatformApplicationErrorCode.ApplicationExecuteError,
      e.message
    ).withAppDefinitionId(spec.appDefinitionId).withParentError(e);
  }
  return new Promise((resolve, reject) => {
    const unsubscribe = events.subscribe((event) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        unsubscribe();
        if (!instance) {
          reject(
            createEditorPlatformApplicationError(
              EditorPlatformApplicationErrorCode.ApplicationExecuteError,
              "Application registry was not called, threw by timeout"
            ).withAppDefinitionId(spec.appDefinitionId)
          );
        }
      }, 5e3);
      if (event.type === _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__.PlatformAppEvent.ApplicationInit && event.meta.appDefinitionId === spec.appDefinitionId) {
        clearTimeout(timeoutId);
        unsubscribe();
        if (!instance) {
          reject(
            createEditorPlatformApplicationError(
              EditorPlatformApplicationErrorCode.ApplicationExecuteError,
              "Application registry was not called"
            ).withAppDefinitionId(spec.appDefinitionId)
          );
        }
        resolve({ instance });
      }
    });
  });
}

class PlatformApplicationContainer {
  #apps = {};
  #privateAPI;
  #events;
  constructor(privateApi, events) {
    this.#privateAPI = privateApi;
    this.#events = events;
    this.#events.subscribe((event) => {
      switch (event.type) {
        case _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__.PlatformAppEvent.HostEvent: {
          if (event.payload.type === _wix_public_editor_platform_interfaces__WEBPACK_IMPORTED_MODULE_0__.EventType.removeAppCompleted) {
            void this.#events.withEvent(
              this.#events.factories.createApplicationRemovedEvent(
                event.payload.appDefinitionId
              ),
              () => {
                return this.removeApplication(event.payload.appDefinitionId);
              }
            );
          }
          break;
        }
      }
    });
  }
  async runApplication(app) {
    const bundle = await this.loadApplication(app);
    const instance = await this.executeApplication(app, bundle);
    this.setApplication(app.appDefinitionId, instance);
    return instance;
  }
  setApplication(appDefId, instance) {
    this.#apps[appDefId] = instance;
    void this.#events.withEvent(
      this.#events.factories.createApplicationApiInitEvent(
        appDefId,
        // TODO: both types are set here...
        // @ts-expect-error TODO: fix me
        instance?.api?.private ? "private" : "public"
      ),
      () => {
        this.#privateAPI.applicationManager.setApplication(instance);
      }
    );
  }
  getApplication(appDefId) {
    return this.#apps[appDefId];
  }
  getAppDefinitionIds() {
    return Object.keys(this.#apps);
  }
  removeApplication(appDefinitionId) {
    delete this.#apps[appDefinitionId];
  }
  async loadApplication(app) {
    const url = app.url;
    return this.#events.withEvent(
      this.#events.factories.createApplicationLoadEvent(app, url),
      async () => {
        try {
          return await this.loadApplicationBundle(url);
        } catch (e) {
          throw createEditorPlatformApplicationError(
            EditorPlatformApplicationErrorCode.ApplicationLoadError
          ).withUrl(url).withAppDefinitionId(app.appDefinitionId).withParentError(e);
        }
      }
    );
  }
  async loadApplicationBundle(url) {
    const res = await fetch("url", {
      method: "GET"
    });
    const isSuccessfulResponse = res.status >= 200 && res.status <= 299;
    if (!isSuccessfulResponse) {
      throw createEditorPlatformApplicationError(
        EditorPlatformApplicationErrorCode.ApplicationFetchError
      ).withUrl(url);
    }
    return res.text();
  }
  async executeApplication(app, bundle) {
    return this.#events.withEvent(
      this.#events.factories.createApplicationExecuteEvent(app, app.url),
      async () => {
        const client = this.#createWixClient(app.appDefinitionId);
        const { instance } = await executeApplication(
          this.#events,
          client,
          app,
          bundle
        );
        return instance;
      }
    );
  }
  #createWixClient(appDefinitionId) {
    return (0,_wix_sdk__WEBPACK_IMPORTED_MODULE_3__.createClient)({
      auth: auth(appDefinitionId, this.#privateAPI),
      host: createSDKHost({
        appDefinitionId,
        privateAPI: this.#privateAPI,
        environment: PlatformEnvironment.Worker,
        events: this.#events,
        applicationPrivateAPI: {}
      })
    });
  }
}

var PlatformConsumerEnvironmentAPIType = /* @__PURE__ */ ((PlatformConsumerEnvironmentAPIType2) => {
  PlatformConsumerEnvironmentAPIType2["Frame"] = "PLATFORM_FRAME_API";
  PlatformConsumerEnvironmentAPIType2["Worker"] = "PLATFORM_WORKER_API";
  return PlatformConsumerEnvironmentAPIType2;
})(PlatformConsumerEnvironmentAPIType || {});
class AbstractEnvironmentAPI {
  constructor(env) {
    this.env = env;
    this.create();
  }
}

class PlatformWorkerAPI extends AbstractEnvironmentAPI {
  type = PlatformConsumerEnvironmentAPIType.Worker;
  #events = new _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_1__.PlatformAppEventEmitter();
  #eventsBridge = new WorkerEventsBridge(this.#events);
  #container = null;
  #privateAPI;
  #pendingWaiters = [];
  constructor() {
    super(PlatformConsumerEnvironmentAPIType.Worker);
  }
  create() {
  }
  async initEnvironment(props) {
    const { buildPrivateAPI } = props;
    this.#privateAPI = await buildPrivateAPI({
      // TODO: should be per application (within the container before app execution)
      type: "EDITOR_ADDON"
    });
    await EnvironmentContext.inject({
      environment: PlatformEnvironment.Worker,
      events: this.#events,
      privateApi: this.#privateAPI,
      applicationAPIs: {}
    });
    this.#container = new PlatformApplicationContainer(
      this.#privateAPI,
      this.#events
    );
    this.#pendingWaiters.forEach((res) => res(this));
  }
  async notify(event) {
    await this.waitReady();
    this.#eventsBridge.notify(event);
  }
  subscribe(cb) {
    this.#eventsBridge.subscribe(cb);
  }
  async runApplication(app) {
    await this.waitReady();
    await this.#container.runApplication(app);
  }
  waitReady() {
    return new Promise((res) => {
      if (this.#privateAPI) {
        return res(this);
      }
      this.#pendingWaiters.push(res);
    });
  }
}


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@wix/editor-platform-transport/dist/esm/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wix/editor-platform-transport/dist/esm/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsumerChannel: () => (/* binding */ ConsumerChannel),
/* harmony export */   HostChannel: () => (/* binding */ HostChannel),
/* harmony export */   IFrameConsumerChannel: () => (/* binding */ IFrameConsumerChannel),
/* harmony export */   IFrameHostChannel: () => (/* binding */ IFrameHostChannel),
/* harmony export */   WorkerConsumerChannel: () => (/* binding */ WorkerConsumerChannel),
/* harmony export */   WorkerHostChannel: () => (/* binding */ WorkerHostChannel)
/* harmony export */ });
const errorMessage = (message) => {
  return `"editor-platform-transport": ${message}`;
};
const internalErrorMessage = (message) => {
  return errorMessage(`[Internal Error] ${message}`);
};

const FUNCTION_MARKER = "\u0192";
const ACCESSOR_MARKER = "\u2202";
const ACCESSOR_GET_POINTER = "_get_";
const ACCESSOR_SET_POINTER = "_set_";
const WITH_ACCESSOR_INDICATOR = "+";
const NO_ACCESSOR_INDICATOR = "-";
const PATH_SEPARATOR = "\xB7";
const ENCODER_MARKER = "\xD7";
const ENCODER_EMPTY_MARKER = "\xB0";
const extractPointer = (pointer) => pointer[0] === ENCODER_MARKER ? "" : pointer;
const isFinalNode = (instance) => {
  return instance === null || typeof instance === "undefined" || typeof instance === "symbol" || typeof instance === "number" || typeof instance === "boolean" || typeof instance === "function" || typeof instance === "string";
};
const isSerializableType = (instance) => {
  return !!instance && typeof instance === "object" && !Array.isArray(instance) && !(instance instanceof Date) && !(instance instanceof Set) && !(instance instanceof Map);
};
const beautifyPath = (path) => beautifyBreadcrumbs(path.split(PATH_SEPARATOR));
const beautifyBreadcrumbs = (breadcrumbs) => breadcrumbs.map(extractPointer).filter(Boolean).join(".");

function createStructureEncoder(marker, config) {
  return {
    marker,
    ...config
  };
}
const arrayEncoder = createStructureEncoder("A", {
  shouldUse: (instance) => Array.isArray(instance),
  serialize: (instance, next) => {
    if (!instance.length) {
      next("", ENCODER_EMPTY_MARKER);
    } else {
      instance.forEach((value, index) => {
        next(`${index}`, value);
      });
    }
  },
  deserialize: {
    create: () => [],
    has: (instance, key) => !(typeof instance[key] === "undefined"),
    append: (instance, _key, value) => {
      instance.push(value);
    }
  }
});
const mapEncoder = createStructureEncoder("M", {
  shouldUse: (instance) => instance instanceof Map,
  serialize: (instance, next) => {
    instance.forEach((value, key) => {
      next(key, value);
    });
  },
  deserialize: {
    create: () => /* @__PURE__ */ new Map(),
    has: (instance, key) => instance.has(key),
    append: (instance, key, value) => {
      instance.set(key, value);
    }
  }
});
const setEncoder = createStructureEncoder("S", {
  shouldUse: (instance) => instance instanceof Set,
  serialize: (instance, next) => {
    let index = 0;
    instance.forEach((value) => {
      next(`${index++}`, value);
    });
  },
  deserialize: {
    create: () => /* @__PURE__ */ new Set(),
    has: (instance, key) => instance.has(key),
    append: (instance, _key, value) => {
      instance.add(value);
    }
  }
});
const objectEncoder = createStructureEncoder(
  "O",
  {
    shouldUse: (instance) => typeof instance === "object",
    serialize: (root, next) => {
      const forEachMember = (instance) => {
        const keys = Reflect.ownKeys(instance);
        const members = keys.filter((key) => {
          return key !== "constructor";
        }).filter((key) => {
          return typeof key !== "symbol";
        });
        if (!members.length) {
          next("", ENCODER_EMPTY_MARKER);
        } else {
          members.filter((key) => {
            return key !== "constructor";
          }).filter((key) => {
            return typeof key !== "symbol";
          }).forEach((key) => {
            const value = Reflect.get(root, key);
            next(key, value);
          });
        }
        const parent = Reflect.getPrototypeOf(instance);
        if (!parent || parent?.hasOwnProperty("__proto__")) {
          return;
        }
        forEachMember(parent);
      };
      forEachMember(root);
    },
    deserialize: {
      create: () => ({}),
      has: (instance, key) => !!instance[key],
      append: (instance, key, value) => {
        instance[key] = value;
      }
    }
  }
);

const encoders = [arrayEncoder, setEncoder, mapEncoder];
function getDescriptor(obj, key) {
  let _instance = obj;
  while (_instance) {
    const descriptor = Object.getOwnPropertyDescriptor(_instance, key);
    if (descriptor) {
      return descriptor;
    }
    _instance = Reflect.getPrototypeOf(_instance);
  }
  return null;
}
function forEachMember(root, callback) {
  const ancestors = /* @__PURE__ */ new WeakMap();
  const getContextPointer = (breadcrumbs) => {
    const _breadcrumbs = breadcrumbs.slice(1).map(extractPointer).filter(Boolean);
    return _breadcrumbs.slice(1).reduce(
      (acc, pointer) => {
        return {
          context: acc.context[acc.pointer],
          pointer
        };
      },
      {
        context: root,
        pointer: _breadcrumbs[0]
      }
    );
  };
  const iterateStructure = (instance, breadcrumbs = []) => {
    if (ancestors.has(instance)) {
      const hasDuplicates = ancestors.get(instance)?.some((p) => breadcrumbs.join(".").startsWith(p));
      if (hasDuplicates) {
        callback(breadcrumbs, {
          ...getContextPointer(breadcrumbs),
          value: "[Circular]"
        });
        return;
      }
    }
    if (instance && !isFinalNode(instance)) {
      if (ancestors.has(instance)) {
        ancestors.set(instance, []);
      }
      ancestors.set(instance, [
        ...ancestors.get(instance) ?? [],
        breadcrumbs.join(".")
      ]);
    }
    if (isFinalNode(instance)) {
      callback(breadcrumbs, {
        ...getContextPointer(breadcrumbs),
        value: instance
      });
      return;
    }
    const encoder = encoders.find((_encoder) => _encoder.shouldUse(instance)) ?? objectEncoder;
    if (encoder) {
      encoder.serialize(instance, (key, value) => {
        iterateStructure(value, [
          ...breadcrumbs,
          `${ENCODER_MARKER}${encoder.marker}`,
          key
        ]);
      });
      return;
    }
  };
  return iterateStructure(root);
}
const serialize = (input, registerFunctionMarker) => {
  if (!isSerializableType(input)) {
    throw new Error(
      errorMessage("only objects are serializable at the root level")
    );
  }
  const buffer = {
    data: []
  };
  const appendValue = (path, value) => {
    buffer.data.push([path, value]);
  };
  const appendFunction = (path, config) => {
    registerFunctionMarker(beautifyPath(path), (...args) => {
      return config.context[config.pointer](...args);
    });
    appendValue(path, FUNCTION_MARKER);
  };
  forEachMember(input, (breadcrumbs, { value, context, pointer }) => {
    const path = breadcrumbs.slice(1).join(PATH_SEPARATOR);
    const descriptor = getDescriptor(context, pointer);
    if (descriptor?.get || descriptor?.set) {
      if (descriptor?.get) {
        registerFunctionMarker(
          beautifyBreadcrumbs([...breadcrumbs, ACCESSOR_GET_POINTER]),
          () => context[pointer]
        );
      }
      if (descriptor?.set) {
        registerFunctionMarker(
          beautifyBreadcrumbs([...breadcrumbs, ACCESSOR_SET_POINTER]),
          (_value) => {
            context[pointer] = _value;
          }
        );
      }
      const marker = [
        descriptor?.get ? WITH_ACCESSOR_INDICATOR : NO_ACCESSOR_INDICATOR,
        descriptor?.set ? WITH_ACCESSOR_INDICATOR : NO_ACCESSOR_INDICATOR
      ];
      appendValue(path, `${ACCESSOR_MARKER}${marker.join("")}`);
    } else if (typeof value === "function") {
      appendFunction(path, { context, pointer });
    } else {
      appendValue(path, value);
    }
  });
  return buffer;
};
const deserialize = (input, replaceFunctionMarker) => {
  if (typeof input !== "object" || input === null) {
    return input;
  }
  return input.data.reduce(
    (acc, [breadcrumbs, value]) => {
      let pointer = acc;
      const pointers = breadcrumbs.split(PATH_SEPARATOR);
      let encoder = objectEncoder;
      let key = null;
      for (let i = 0; i < pointers.length; i++) {
        const point = pointers[i];
        if (point[0] === ENCODER_MARKER) {
          const has = encoder.deserialize.has(pointer, key);
          encoder = [objectEncoder, ...encoders].find(
            (_iterator) => _iterator.marker === point[1]
          );
          if (!encoder) {
            throw new Error(errorMessage(`unknown marker "${point[1]}"`));
          }
          if (!has) {
            pointer[key] = encoder.deserialize.create();
          }
          pointer = pointer[key];
        } else {
          key = point;
        }
      }
      if (value?.toString() === ENCODER_EMPTY_MARKER) {
        return acc;
      } else if (value?.toString() === FUNCTION_MARKER) {
        encoder.deserialize.append(
          pointer,
          key,
          replaceFunctionMarker(beautifyBreadcrumbs(pointers))
        );
      } else if (value?.toString()[0] === ACCESSOR_MARKER) {
        const hasGetter = value?.toString()[1] === WITH_ACCESSOR_INDICATOR;
        const hasSetter = value?.toString()[2] === WITH_ACCESSOR_INDICATOR;
        const descriptor = {};
        if (hasGetter) {
          const getter = replaceFunctionMarker(
            beautifyBreadcrumbs([...pointers, ACCESSOR_GET_POINTER])
          );
          descriptor.get = () => getter();
        }
        if (hasSetter) {
          descriptor.set = replaceFunctionMarker(
            beautifyBreadcrumbs([...pointers, ACCESSOR_SET_POINTER])
          );
        }
        Object.defineProperty(pointer, key, descriptor);
      } else {
        encoder.deserialize.append(pointer, key, value);
      }
      return acc;
    },
    // TODO: define as enumrable
    {
      [Symbol("transferred object")]: `${(JSON.stringify(input.data).length / 1024).toFixed(2)}Kb`
    }
  );
};

var MessageType = /* @__PURE__ */ ((MessageType2) => {
  MessageType2["ExposeAPI"] = "ExposeAPI";
  MessageType2["Call"] = "Call";
  MessageType2["Response"] = "Response";
  MessageType2["Cleanup"] = "Cleanup";
  return MessageType2;
})(MessageType || {});
class Message {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
  correlationId = `M-${performance.now()}`;
  parentCorrelationId;
  withParentCorrelationId(correlationId) {
    this.parentCorrelationId = correlationId;
    return this;
  }
  serialize(registerFunctionMarker) {
    return JSON.stringify({
      parentCorrelationId: this.parentCorrelationId,
      correlationId: this.correlationId,
      type: this.type,
      payload: serialize(this.payload, (path, value) => {
        registerFunctionMarker(this.correlationId, path, value);
      })
    });
  }
  static fromEvent(data, replaceFunctionMarker) {
    const parsed = JSON.parse(data);
    return new Message(
      parsed.type,
      deserialize(parsed.payload, (breadcrumbs) => {
        return replaceFunctionMarker(parsed.correlationId, breadcrumbs);
      })
    ).withParentCorrelationId(parsed.correlationId);
  }
}
class MessageCleanup extends Message {
  constructor(payload) {
    super("Cleanup" /* Cleanup */, payload);
  }
}
class MessageResponse extends Message {
  constructor(payload) {
    super("Response" /* Response */, payload);
  }
}
class MessageResponseError extends Message {
  constructor(payload) {
    super("Response" /* Response */, payload);
  }
}
class MessageCall extends Message {
  constructor(payload) {
    super("Call" /* Call */, payload);
  }
}

const buildFunctionMarkerKey = (correlationId, path) => {
  return `${correlationId}_${path}`;
};
class ThreadChannel {
  constructor(handshake) {
    this.handshake = handshake;
  }
  #registry = new FinalizationRegistry((params) => {
    this.postMessage(new MessageCleanup(params));
  });
  #messageEvents = {
    [MessageType.Cleanup]: (message) => {
      const functionMarkerKey = message.payload.functionMarkerKey;
      const callId = message.payload.callId;
      delete this.#functionMarkers[functionMarkerKey];
      if (callId) {
        delete this.#pendingFunctionResponse[callId];
      }
    },
    /**
     * Return function response between threads
     */
    [MessageType.Response]: async (message) => {
      const callId = message.payload.callId;
      const _errorMessage = message.payload.errorMessage;
      if (_errorMessage) {
        const errorStack = message.payload.errorStack;
        if (errorStack) {
          const error = new Error(_errorMessage);
          error.stack = message.payload.errorStack;
          this.#pendingFunctionResponse[callId]?.reject(error);
        } else {
          this.#pendingFunctionResponse[callId]?.reject(_errorMessage);
        }
      } else {
        const response = message.payload.response;
        this.#pendingFunctionResponse[callId]?.resolve(response);
      }
      delete this.#pendingFunctionResponse[callId];
    },
    /**
     * Calling function between threads
     */
    [MessageType.Call]: async (message) => {
      const functionMarkerKey = message.payload.functionMarkerKey;
      const marker = this.#functionMarkers[functionMarkerKey];
      if (!marker) {
        this.postMessage(
          new MessageResponseError({
            callId: message.payload.callId,
            errorMessage: errorMessage("function is not available")
          })
        );
        return;
      }
      try {
        const response = await marker.value(...message.payload.props ?? []);
        this.postMessage(
          new MessageResponse({
            callId: message.payload.callId,
            response
          })
        );
      } catch (error) {
        this.postMessage(
          new MessageResponseError({
            callId: message.payload.callId,
            /**
             * for better DX we need to pass Error object to keep stack trace available
             * but in some cases our custom error messages are not serialized correctly
             */
            errorMessage: error.message,
            errorStack: error.stack
          })
        );
      }
    }
  };
  #functionMarkers = {};
  #pendingFunctionResponse = {};
  queue = [];
  isConnected = false;
  async run(port) {
    return this.handshake.run(port);
  }
  registerMessageListener() {
    if (!this.port) {
      throw new Error(
        internalErrorMessage(
          "it is not possible to listen on port events because port is not defined"
        )
      );
    }
    this.port.onmessage = (e) => {
      this.onMessage(e);
    };
  }
  onMessage(event) {
    const message = Message.fromEvent(event.data, (correlationId, path) => {
      const replacedFunction = this.replaceTransferredFunction(
        correlationId,
        path
      );
      this.#registry.register(replacedFunction, {
        functionMarkerKey: buildFunctionMarkerKey(correlationId, path)
        // callId: message.payload?.callId,
      });
      return replacedFunction;
    });
    this.#messageEvents[message.type]?.(message);
    this.messageEvents[message.type]?.(message);
  }
  postMessage(message) {
    if (!this.port) {
      throw new Error(
        internalErrorMessage(
          "it is not possible to post message on port because port is not defined"
        )
      );
    }
    this.port.postMessage(
      message.serialize(this.registerTransferredFunction.bind(this))
    );
  }
  registerTransferredFunction(correlationId, path, value) {
    const functionMarkerKey = buildFunctionMarkerKey(correlationId, path);
    this.#functionMarkers[functionMarkerKey] = {
      path,
      value
    };
  }
  replaceTransferredFunction(correlationId, path) {
    return (...props) => {
      const callId = `CALL-${crypto.randomUUID()}`;
      this.postMessage(
        new MessageCall({
          callId,
          functionMarkerKey: buildFunctionMarkerKey(correlationId, path),
          props
        })
      );
      return new Promise((resolve, reject) => {
        this.#pendingFunctionResponse[callId] = { resolve, reject };
      });
    };
  }
  flush() {
    if (!this.port) {
      return;
    }
    this.queue.forEach((message) => {
      this.postMessage(message);
    });
    this.queue = [];
  }
}

class ConsumerChannel extends ThreadChannel {
  port = void 0;
  messageEvents = {};
  constructor(handshake) {
    super(handshake);
    void this.init();
  }
  async init() {
    const port = await this.run();
    if (port) {
      this.port = port;
      this.registerMessageListener();
      this.flush();
    } else {
      console.error(
        internalErrorMessage(
          "consumer did not receive message port from the host"
        )
      );
    }
  }
  expose(instance) {
    if (!instance.type) {
      throw new Error(
        errorMessage('wrong exposed API instance, "type" property is required')
      );
    }
    this.queue.push(new Message(MessageType.ExposeAPI, instance));
    this.flush();
  }
}

class HostChannel extends ThreadChannel {
  #consumerAPIInstances = {};
  #consumerAPIInstancesResolvers = [];
  #messageChannel = new MessageChannel();
  port = this.#messageChannel.port1;
  messageEvents = {
    [MessageType.ExposeAPI]: (message) => {
      const pendingTypeInstances = this.#consumerAPIInstancesResolvers.filter(
        ({ type }) => type === message.payload.type
      );
      this.#consumerAPIInstancesResolvers = this.#consumerAPIInstancesResolvers.filter(
        ({ type }) => type !== message.payload.type
      );
      pendingTypeInstances.forEach(({ cb }) => {
        cb(message.payload);
      });
    }
  };
  constructor(handshake) {
    super(handshake);
    void this.init();
  }
  async init() {
    await this.run(this.#messageChannel.port2);
    this.registerMessageListener();
  }
  waitAPI(type) {
    return new Promise((resolve) => {
      this.onAPICallback(type, (_workerApi) => {
        resolve(_workerApi);
      });
    });
  }
  onAPICallback(type, cb) {
    if (this.#consumerAPIInstances[type]) {
      cb(this.#consumerAPIInstances[type]);
      return;
    }
    this.#consumerAPIInstancesResolvers.push({
      type,
      cb
    });
  }
}

class AbstractHandshake {
  constructor(communicationAPI) {
    this.communicationAPI = communicationAPI;
  }
}

class BothDirectionalHandshake extends AbstractHandshake {
  static iframe = {
    host: (frame) => {
      return new BothDirectionalHandshake({
        postMessage: (message, ports) => {
          const contentWindow = frame.contentWindow;
          if (!contentWindow) {
            return;
          }
          contentWindow.postMessage(message, "*", ports);
        },
        onMessage: (cb) => {
          const _cb = (event) => {
            if (event.origin !== new URL(frame.src).origin || frame.contentWindow !== event.source) {
              return;
            }
            cb(event);
          };
          globalThis.addEventListener("message", _cb);
          return () => globalThis.removeEventListener("message", _cb);
        }
      });
    },
    consumer: () => {
      return new BothDirectionalHandshake({
        postMessage: (message) => {
          globalThis.parent.postMessage(message, "*");
        },
        onMessage: (cb) => {
          globalThis.addEventListener("message", cb);
          return () => {
            globalThis.removeEventListener("message", cb);
          };
        }
      });
    }
  };
  static worker = {
    host: (worker) => {
      return new BothDirectionalHandshake({
        postMessage: (message, ports) => {
          worker.postMessage(message, ports);
        },
        onMessage: (cb) => {
          worker.addEventListener("message", cb);
          return () => worker.removeEventListener("message", cb);
        }
      });
    },
    consumer: () => {
      return new BothDirectionalHandshake({
        postMessage: (message) => {
          globalThis.postMessage(message);
        },
        onMessage: (cb) => {
          globalThis.addEventListener("message", cb);
          return () => {
            globalThis.removeEventListener("message", cb);
          };
        }
      });
    }
  };
  #unsubscribe;
  #isConnected = false;
  run(port) {
    return new Promise((resolve) => {
      if (port) {
        this.#startAsHost(port, () => resolve(void 0));
      } else {
        this.#startAsConsumer(resolve);
      }
    });
  }
  #startAsHost(port, resolve) {
    if (!port) {
      throw new Error(
        internalErrorMessage("port should exists on host handshake")
      );
    }
    const memberId = "Host" /* Host */;
    this.communicationAPI.postMessage(
      JSON.stringify({
        memberId,
        type: "Greeting" /* Greeting */
      }),
      []
    );
    this.#subscribe(memberId, (message) => {
      switch (message.type) {
        /**
         * on Greeting event from consumer response with Greeting from host
         * Consumer should send RequestPort event
         */
        case "Greeting" /* Greeting */: {
          this.communicationAPI.postMessage(
            JSON.stringify({
              memberId,
              type: "Greeting" /* Greeting */
            }),
            []
          );
          break;
        }
        /**
         * on RequestPort event from consumer
         * response with the port
         */
        case "RequestPort" /* RequestPort */: {
          if (this.#isConnected) {
            return;
          }
          this.#isConnected = true;
          this.communicationAPI.postMessage(
            JSON.stringify({
              memberId,
              type: "Port" /* Port */
            }),
            [port]
          );
          this.#unsubscribe?.();
          resolve();
          break;
        }
      }
    });
  }
  #startAsConsumer(resolve) {
    const memberId = "Consumer" /* Consumer */;
    this.communicationAPI.postMessage(
      JSON.stringify({
        memberId,
        type: "Greeting" /* Greeting */
      }),
      []
    );
    this.#subscribe(memberId, (message, port) => {
      switch (message.type) {
        /**
         * on Greeting from host
         * response with simple RequestPort
         */
        case "Greeting" /* Greeting */: {
          this.communicationAPI.postMessage(
            JSON.stringify({
              memberId,
              type: "RequestPort" /* RequestPort */
            }),
            []
          );
          break;
        }
        /**
         * on Port from host
         * consumer should receive the port
         */
        case "Port" /* Port */: {
          this.#isConnected = true;
          this.#unsubscribe?.();
          resolve(port);
          break;
        }
      }
    });
  }
  #subscribe(memberId, cb) {
    this.#unsubscribe?.();
    this.#unsubscribe = this.communicationAPI.onMessage((event) => {
      try {
        const message = typeof event.data === "string" ? JSON.parse(event.data) : {};
        if (!message.memberId || message.memberId === memberId) {
          return;
        }
        cb(message, event.ports[0]);
      } catch (e) {
        console.error(e);
      }
    });
  }
}

class IFrameConsumerChannel extends ConsumerChannel {
  constructor() {
    super(BothDirectionalHandshake.iframe.consumer());
  }
}

class IFrameHostChannel extends HostChannel {
  constructor(frame) {
    super(BothDirectionalHandshake.iframe.host(frame));
  }
}

class WorkerConsumerChannel extends ConsumerChannel {
  constructor() {
    super(BothDirectionalHandshake.worker.consumer());
  }
}

class WorkerHostChannel extends HostChannel {
  constructor(worker) {
    super(BothDirectionalHandshake.worker.host(worker));
  }
}


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@wix/editor/dist/esm/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@wix/editor/dist/esm/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   application: () => (/* binding */ index$4),
/* harmony export */   components: () => (/* binding */ components),
/* harmony export */   editor: () => (/* binding */ editor),
/* harmony export */   events: () => (/* binding */ index$3),
/* harmony export */   info: () => (/* binding */ index$2),
/* harmony export */   inputs: () => (/* binding */ index),
/* harmony export */   widget: () => (/* binding */ index$1)
/* harmony export */ });
/* harmony import */ var _wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wix/public-editor-platform-errors */ "./node_modules/@wix/public-editor-platform-errors/dist/esm/index.mjs");
/* harmony import */ var _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wix/public-editor-platform-events */ "./node_modules/@wix/public-editor-platform-events/dist/esm/index.mjs");
/* harmony import */ var _wix_editor_platform_transport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wix/editor-platform-transport */ "./node_modules/@wix/editor-platform-transport/dist/esm/index.js");
/* harmony import */ var _wix_editor_application_platform_frame_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/editor-application/platform-frame-api */ "./node_modules/@wix/editor-application/dist/esm/platform-frame-api/index.js");
/* harmony import */ var _wix_editor_application_platform_worker_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wix/editor-application/platform-worker-api */ "./node_modules/@wix/editor-application/dist/esm/platform-worker-api/index.js");
/* harmony import */ var _wix_sdk_runtime_host_modules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wix/sdk-runtime/host-modules */ "./node_modules/@wix/editor/node_modules/@wix/sdk-runtime/build/host-modules.js");







var EditorPlatformApplicationContextErrorCode = /* @__PURE__ */ ((EditorPlatformApplicationContextErrorCode2) => {
  EditorPlatformApplicationContextErrorCode2["IncorrectEnvironment"] = "IncorrectEnvironment";
  EditorPlatformApplicationContextErrorCode2["ClientAuthError"] = "ClientAuthError";
  return EditorPlatformApplicationContextErrorCode2;
})(EditorPlatformApplicationContextErrorCode || {});
class EditorPlatformApplicationContextError extends _wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__.BaseError {
  state = {};
  constructor(message, code) {
    super(message, code, "Editor Platform Application Context Error");
  }
  withUrl(url) {
    this.state = { ...this.state, url };
    return this;
  }
  withAppDefinitionId(appDefinitionId) {
    this.state = { ...this.state, appDefinitionId };
    return this;
  }
}
const createEditorPlatformApplicationContextError = (0,_wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__.createErrorBuilder)(EditorPlatformApplicationContextError);
async function transformEventPayload(eventPayload, privateAPI) {
  if (!eventPayload?.type) {
    return eventPayload;
  }
  switch (eventPayload.type) {
    case "componentSelectionChanged":
      const componentRefs = eventPayload.componentRefs || [];
      const components = await Promise.all(
        componentRefs.map((ref) => {
          return privateAPI.components.getComponent(ref);
        })
      );
      return {
        type: eventPayload.type,
        components
      };
    default:
      return eventPayload;
  }
}
class ApplicationBoundEvents {
  constructor(appDefinitionId, events, privateAPI) {
    this.appDefinitionId = appDefinitionId;
    this.privateAPI = privateAPI;
    this.events = events;
    this.subscribe = events.subscribe.bind(events);
    this.commit = events.commit.bind(events);
    this.startTransaction = events.startTransaction.bind(events);
    this.silent = events.silent.bind(events);
  }
  events;
  subscribe;
  commit;
  startTransaction;
  silent;
  notify(event) {
    this.events.notify({
      type: event.type,
      payload: event.payload,
      meta: {
        appDefinitionId: this.appDefinitionId
      }
    });
  }
  notifyCustomEvent(type, payload) {
    this.notify({
      type: _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_3__.PlatformAppEvent.CustomEvent,
      payload: {
        ...payload,
        type
      }
    });
  }
  /**
   * TODO: we should use same interface for all events
   * (subscribe vs addEventListener)
   */
  addEventListener(eventType, fn) {
    return this.events.subscribe(async (event) => {
      const isAppMatch = event.meta?.appDefinitionId === this.appDefinitionId || event.meta?.appDefinitionId === null;
      const transformPayload = () => transformEventPayload(event.payload, this.privateAPI);
      if (eventType === "*") {
        fn(await transformPayload());
      } else if (event.type === _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_3__.PlatformAppEvent.CustomEvent) {
        if (eventType === event.payload?.type && !isAppMatch) {
          fn(await transformPayload());
        }
      } else if (event.type === _wix_public_editor_platform_events__WEBPACK_IMPORTED_MODULE_3__.PlatformAppEvent.HostEvent) {
        if (eventType === event.payload?.type && isAppMatch) {
          fn(await transformPayload());
        }
      }
    });
  }
}
const WAIT_INJECTED_TIMEOUT = 200;
const WAIT_INJECTED_RETRY_COUNT = 50;
class ContextInjectionStatus {
  _resolveContextInjected = () => {
  };
  _isInjected = false;
  key;
  constructor(uuid) {
    this.key = `__${uuid}_CONTEXT_INJECTION_STATUS_KEY`;
    if (!globalThis[this.key]) {
      globalThis[this.key] = new Promise((resolve) => {
        this._resolveContextInjected = () => {
          this._isInjected = true;
          resolve();
        };
      });
    }
  }
  isInjected() {
    return !!this._isInjected;
  }
  resolveInjected() {
    this._resolveContextInjected?.();
  }
  waitInjected() {
    return new Promise((resolve, reject) => {
      let injected = false;
      let timeoutId;
      let retryCount = 0;
      const timeout = () => {
        if (injected) {
          return;
        }
        timeoutId = setTimeout(() => {
          retryCount++;
          if (retryCount < WAIT_INJECTED_RETRY_COUNT) {
            if (retryCount % 10 === 0) {
              console.log(
                createEditorPlatformApplicationContextError(
                  EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
                  "contexts are not resolved, still re-trying"
                ).withMessage(`try number ${retryCount}`).message
              );
            }
            timeout();
            return;
          }
          if (!injected) {
            const error = createEditorPlatformApplicationContextError(
              EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
              "contexts are not resolved, threw by timeout"
            );
            reject(error);
          }
        }, WAIT_INJECTED_TIMEOUT);
      };
      timeout();
      const _waitContextInjectedPromise = globalThis[this.key];
      _waitContextInjectedPromise.then(() => {
        injected = true;
        clearTimeout(timeoutId);
        resolve();
      });
    });
  }
}
const ENVIRONMENT_CONTEXT_KEY = "__ENVIRONMENT_CONTEXT_KEY";
var PlatformEnvironment = /* @__PURE__ */ ((PlatformEnvironment2) => {
  PlatformEnvironment2["Worker"] = "Worker";
  PlatformEnvironment2["Frame"] = "Frame";
  PlatformEnvironment2["ComponentPanel"] = "ComponentPanel";
  return PlatformEnvironment2;
})(PlatformEnvironment || {});
class EnvironmentContext {
  constructor(environmentContext) {
    this.environmentContext = environmentContext;
  }
  static status = new ContextInjectionStatus("environment");
  static async inject(context) {
    if (globalThis[ENVIRONMENT_CONTEXT_KEY]) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "Environment context already exists and should not be overridden"
      );
    }
    globalThis[ENVIRONMENT_CONTEXT_KEY] = new EnvironmentContext(context);
    this.status.resolveInjected();
  }
  static async getInstance() {
    await this.status.waitInjected();
    return globalThis[ENVIRONMENT_CONTEXT_KEY];
  }
  getPrivateAPI() {
    return this.environmentContext.privateApi;
  }
  getEvents() {
    return this.environmentContext.events;
  }
  getApplicationAPIs() {
    return this.environmentContext.applicationAPIs ?? {};
  }
  getEnvironment() {
    return this.environmentContext.environment;
  }
}
const APPLICATION_CONTEXT_KEY = "__APPLICATION_CONTEXT_KEY";
class ApplicationContext {
  constructor(applicationContext, environment) {
    this.applicationContext = applicationContext;
    this.environment = environment;
    this.events = new ApplicationBoundEvents(
      this.applicationContext.appDefinitionId,
      this.environment.getEvents(),
      this.environment.getPrivateAPI()
    );
  }
  static status = new ContextInjectionStatus("application");
  /**
   * TODO: use generics for context type
   * - application
   * - editor
   */
  static async inject(context) {
    const environment = await EnvironmentContext.getInstance();
    if (environment.getEnvironment() !== PlatformEnvironment.Frame) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "Application context can be injected only in frame environment"
      );
    }
    if (globalThis[APPLICATION_CONTEXT_KEY]) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "Application context already exists and should not be overridden"
      );
    }
    globalThis[APPLICATION_CONTEXT_KEY] = new ApplicationContext(
      context,
      await EnvironmentContext.getInstance()
    );
    this.status.resolveInjected();
  }
  static async getInstance() {
    const environment = await EnvironmentContext.getInstance();
    if (environment.getEnvironment() === PlatformEnvironment.Frame) {
      await this.status.waitInjected();
      return globalThis[APPLICATION_CONTEXT_KEY];
    } else {
      return __APPLICATION_CONTEXT_KEY;
    }
  }
  events;
  getAppDefinitionId() {
    return this.applicationContext.appDefinitionId;
  }
  getBindings() {
    return this.applicationContext;
  }
  getEvents() {
    return this.events;
  }
  getPrivateAPI() {
    return this.environment.getPrivateAPI();
  }
  getPrivateApplicationAPI() {
    const appDefinitionId = this.getAppDefinitionId();
    if (!appDefinitionId) {
      throw createEditorPlatformApplicationContextError(
        EditorPlatformApplicationContextErrorCode.IncorrectEnvironment,
        "appDefinitionId is not available"
      );
    }
    return this.environment.getApplicationAPIs()[appDefinitionId];
  }
}

class EditorPlatformSDKAuthError extends _wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__.BaseError {
  state = {};
  constructor(message, code) {
    super(message, code, "Auth Strategy Error");
  }
  withAppDefinitionId(appDefinitionId) {
    this.state = { ...this.state, appDefinitionId };
    return this;
  }
}
const createAuthStrategyShapeError = (0,_wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__.createErrorBuilder)(EditorPlatformSDKAuthError);
const auth = () => {
  return {
    getAuthHeaders: async () => {
      const context = await ApplicationContext.getInstance();
      const privateAPI = context.getPrivateAPI();
      const bindings = context.getBindings();
      if (!bindings.appDefinitionId) {
        throw createAuthStrategyShapeError(
          "EmptyAppDefinitionId" /* EmptyAppDefinitionId */
        );
      }
      const authInstance = await privateAPI.info.getAppInstance(
        bindings.appDefinitionId
      );
      if (authInstance === void 0) {
        throw createAuthStrategyShapeError(
          "EmptyAppAuthInstance" /* EmptyAppAuthInstance */
        ).withAppDefinitionId(bindings.appDefinitionId);
      }
      return {
        headers: {
          Authorization: authInstance
        }
      };
    }
  };
};

const isWorker = typeof importScripts === "function";
if (isWorker) {
  const channel = new _wix_editor_platform_transport__WEBPACK_IMPORTED_MODULE_4__.WorkerConsumerChannel();
  channel.expose(new _wix_editor_application_platform_worker_api__WEBPACK_IMPORTED_MODULE_1__.PlatformWorkerAPI());
} else {
  const channel = new _wix_editor_platform_transport__WEBPACK_IMPORTED_MODULE_4__.IFrameConsumerChannel();
  channel.expose(new _wix_editor_application_platform_frame_api__WEBPACK_IMPORTED_MODULE_0__.PlatformFrameAPI());
}

class PlatformSDKShape {
  constructor(namespace, shape) {
    this.namespace = namespace;
    this.shape = shape;
  }
  build() {
    return (0,_wix_sdk_runtime_host_modules__WEBPACK_IMPORTED_MODULE_5__.createHostModule)(
      Object.fromEntries(
        Object.entries(this.shape).map(([key, value]) => [
          key,
          (host) => {
            if (host?.environmentContext && host?.applicationContext) {
              return value({
                environmentContext: host.environmentContext,
                applicationContext: host.applicationContext
              });
            }
            return async (...args) => {
              const environmentContext = await EnvironmentContext.getInstance();
              const applicationContext = await ApplicationContext.getInstance();
              return value({
                environmentContext,
                applicationContext
              })(...args);
            };
          }
        ])
      )
    );
  }
}

const applicationShape = new PlatformSDKShape("application", {
  getPrivateAPI({ applicationContext }) {
    return async () => {
      return applicationContext.getPrivateApplicationAPI();
    };
  },
  getPublicAPI({ applicationContext }) {
    return async (appDefinitionId) => {
      const privateAPI = applicationContext.getPrivateAPI();
      return privateAPI.applicationManager.getPublicApplicationAPI(
        appDefinitionId
      );
    };
  },
  getAppInstance({ applicationContext }) {
    return async () => {
      const privateAPI = applicationContext.getPrivateAPI();
      const bindings = applicationContext.getBindings();
      return privateAPI.info.getAppInstance(bindings.appDefinitionId);
    };
  }
});
var index$4 = applicationShape.build();

const componentsShape = new PlatformSDKShape("components", {
  getSelectedComponents({ applicationContext }) {
    return async () => {
      const privateAPI = applicationContext.getPrivateAPI();
      const refs = await privateAPI.components.getSelectedComponents();
      return Promise.all(
        refs.map((ref) => privateAPI.components.getComponent(ref))
      );
    };
  }
});
var components = componentsShape.build();

const eventsShape = new PlatformSDKShape("events", {
  addEventListener({ applicationContext }) {
    return async (name, cb) => {
      return applicationContext.getEvents().addEventListener(name, cb);
    };
  }
});
var index$3 = eventsShape.build();

const infoShape = new PlatformSDKShape("info", {
  getViewMode({ applicationContext }) {
    return async () => {
      const privateAPI = applicationContext.getPrivateAPI();
      return privateAPI.info.getViewMode();
    };
  },
  getLanguageCode({ applicationContext }) {
    return async () => {
      const privateAPI = applicationContext.getPrivateAPI();
      return privateAPI.info.getLanguageCode();
    };
  }
});
var index$2 = infoShape.build();

var WidgetShapeErrorCode = /* @__PURE__ */ ((WidgetShapeErrorCode2) => {
  WidgetShapeErrorCode2["UndefinedCompRef"] = "UndefinedCompRef";
  return WidgetShapeErrorCode2;
})(WidgetShapeErrorCode || {});
class WidgetShapeError extends _wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__.BaseError {
  constructor(message, code) {
    super(message, code, "Widget Error");
  }
}
const createWidgetShapeError = (0,_wix_public_editor_platform_errors__WEBPACK_IMPORTED_MODULE_2__.createErrorBuilder)(WidgetShapeError);

const getSelectedComponentRef = async () => {
  const selected = await components.getSelectedComponents();
  const compRef = selected[0]?.compRef;
  if (!compRef) {
    throw createWidgetShapeError(WidgetShapeErrorCode.UndefinedCompRef);
  }
  return compRef;
};
const widgetShape = new PlatformSDKShape("widget", {
  getProp({ applicationContext }) {
    return async (propName) => {
      const privateAPI = applicationContext.getPrivateAPI();
      const compRef = await getSelectedComponentRef();
      return privateAPI.customElement.getAttribute(compRef, propName);
    };
  },
  setProp({ applicationContext }) {
    return async (propName, value) => {
      const privateAPI = applicationContext.getPrivateAPI();
      const compRef = await getSelectedComponentRef();
      await privateAPI.customElement.setAttribute(compRef, propName, value);
    };
  }
});
var index$1 = widgetShape.build();

const fonts = {
  transformFontInternalValue: (value) => {
    if (value) {
      const { theme, ...rest } = fonts.normalize(value);
      return {
        ...rest,
        editorKey: theme
      };
    } else {
      return {
        editorKey: "font_7",
        family: "helvetica-w01-roman",
        size: 16,
        style: {}
      };
    }
  },
  transformFontPublicValue: (value) => {
    if (!value) {
      return null;
    }
    return {
      ...fonts.normalize(value),
      theme: value.editorKey
    };
  },
  normalize: ({
    theme,
    editorKey,
    preset,
    ...rest
  }) => {
    return {
      ...rest,
      theme: theme ?? editorKey
    };
  }
};
const inputsShape = new PlatformSDKShape("inputs", {
  selectColor({ applicationContext }) {
    return async (value, onColorChange) => {
      const privateAPI = applicationContext.getPrivateAPI();
      let _value = value ? {
        color: value.color,
        theme: value?.theme
      } : null;
      await privateAPI.inputs.openColorPicker(
        {
          color: value?.theme ? value.theme : value?.color
        },
        ({
          color,
          theme
        }) => {
          const _color = { color, theme };
          _value = _color;
          onColorChange?.(_color);
        }
      );
      return _value;
    };
  },
  selectFont({ applicationContext }) {
    return async (value, options, onFontChange) => {
      const privateAPI = applicationContext.getPrivateAPI();
      let _value = fonts.transformFontPublicValue(value);
      const applyChanges = (...changes) => {
        if (!_value) {
          _value = fonts.transformFontPublicValue(
            fonts.transformFontInternalValue(value)
          );
        }
        switch (changes[0]) {
          case "theme":
            Object.assign(_value, {
              theme: changes[1]
            });
            break;
          case "size":
            Object.assign(_value, {
              size: changes[1]
            });
            break;
          case "bold":
            Object.assign(_value, {
              style: {
                ..._value.style,
                bold: changes[1]
              }
            });
            break;
          case "italic":
            Object.assign(_value, {
              style: {
                ..._value.style,
                italic: changes[1]
              }
            });
            break;
          case "underline":
            Object.assign(_value, {
              style: {
                ..._value.style,
                underline: changes[1]
              }
            });
            break;
          case "family":
            Object.assign(_value, {
              family: changes[1]
            });
            break;
        }
      };
      await privateAPI.inputs.openFontPicker(
        {
          ...options,
          componentStyle: fonts.transformFontInternalValue(value)
        },
        (...changes) => {
          applyChanges(...changes);
          onFontChange?.(_value);
        }
      );
      return _value;
    };
  }
});
var index = inputsShape.build();

const editorPlatformFrameHost = () => {
  return {
    environment: {},
    channel: {
      observeState: async () => {
        return { disconnect() {
        } };
      }
    }
  };
};

const editorPlatformWorkerHost = () => {
  return {
    environment: {},
    channel: {
      observeState: async () => {
        return { disconnect() {
        } };
      }
    }
  };
};

const editor = {
  host: () => {
    const isWorker = typeof importScripts === "function";
    if (isWorker) {
      return editorPlatformWorkerHost();
    }
    return editorPlatformFrameHost();
  },
  auth
};


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@wix/public-editor-platform-interfaces/dist/EventType.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@wix/public-editor-platform-interfaces/dist/EventType.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventType = void 0;
/**
 * Duplicated types from editor-platform-sdk-types/src/events/EventType.ts
 * to allow use them in public packages
 */
var EventType;
(function (EventType) {
    EventType["removeAppCompleted"] = "removeAppCompleted";
    EventType["componentSelectionChanged"] = "componentSelectionChanged";
    EventType["appInstalled"] = "appInstalled";
    EventType["appUpdateCompleted"] = "appUpdateCompleted";
})(EventType || (exports.EventType = EventType = {}));


/***/ }),

/***/ "./node_modules/@wix/public-editor-platform-interfaces/dist/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wix/public-editor-platform-interfaces/dist/index.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventType = exports.WixSDKTypes = void 0;
const WixSDKTypes = __importStar(__webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/sdk-types/build/browser/index.mjs"));
exports.WixSDKTypes = WixSDKTypes;
var EventType_1 = __webpack_require__(/*! ./EventType */ "./node_modules/@wix/public-editor-platform-interfaces/dist/EventType.js");
Object.defineProperty(exports, "EventType", ({ enumerable: true, get: function () { return EventType_1.EventType; } }));


/***/ }),

/***/ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/ambassador-modules.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/ambassador-modules.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ambassadorModuleOptions: () => (/* binding */ ambassadorModuleOptions),
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
const ambassadorModuleOptions = () => ({
    HTTPHost: self.location.host,
});
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

/***/ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/bi/biHeaderGenerator.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/bi/biHeaderGenerator.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/common.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/common.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_URL: () => (/* binding */ API_URL),
/* harmony export */   FORCE_WRITE_API_URLS: () => (/* binding */ FORCE_WRITE_API_URLS),
/* harmony export */   PUBLIC_METADATA_KEY: () => (/* binding */ PUBLIC_METADATA_KEY),
/* harmony export */   READ_ONLY_API_URL: () => (/* binding */ READ_ONLY_API_URL)
/* harmony export */ });
const PUBLIC_METADATA_KEY = '__metadata';
const API_URL = 'www.wixapis.com';
const READ_ONLY_API_URL = 'readonly.wixapis.com';
const FORCE_WRITE_API_URLS = ['/ecom/v1/carts/current'];


/***/ }),

/***/ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/event-handlers-modules.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/event-handlers-modules.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildEventDefinition: () => (/* binding */ buildEventDefinition),
/* harmony export */   eventHandlersModules: () => (/* binding */ eventHandlersModules),
/* harmony export */   isEventHandlerModule: () => (/* binding */ isEventHandlerModule)
/* harmony export */ });
/* harmony import */ var _wix_sdk_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/sdk-types/build/browser/index.mjs");
/* harmony import */ var nanoevents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoevents */ "./node_modules/nanoevents/index.js");


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
    const webhooksEmitter = (0,nanoevents__WEBPACK_IMPORTED_MODULE_0__.createNanoEvents)();
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

/***/ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/fetch-error.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/fetch-error.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/helpers.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/helpers.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/host-modules.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/host-modules.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildHostModule: () => (/* binding */ buildHostModule),
/* harmony export */   isHostModule: () => (/* binding */ isHostModule)
/* harmony export */ });
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/helpers.js");

const isHostModule = (val) => (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(val) && val.__type === 'host';
function buildHostModule(val, host) {
    return val.create(host);
}


/***/ }),

/***/ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/rest-modules.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/rest-modules.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildRESTDescriptor: () => (/* binding */ buildRESTDescriptor),
/* harmony export */   getDefaultDomain: () => (/* binding */ getDefaultDomain)
/* harmony export */ });
/* harmony import */ var _bi_biHeaderGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bi/biHeaderGenerator.js */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/bi/biHeaderGenerator.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/common.js");


const getDefaultDomain = (_method, _url) => _common_js__WEBPACK_IMPORTED_MODULE_0__.API_URL;
function buildRESTDescriptor(origFunc, publicMetadata, boundFetch, wixAPIFetch, options) {
    return origFunc({
        request: async (factory) => {
            const requestOptions = factory({ host: options?.HTTPHost || _common_js__WEBPACK_IMPORTED_MODULE_0__.API_URL });
            let request = requestOptions;
            if (request.method === 'GET' &&
                request.fallback?.length &&
                request.params.toString().length > 4000) {
                request = requestOptions.fallback[0];
            }
            const domain = options?.HTTPHost ?? getDefaultDomain(request.method, request.url);
            let url = `https://${domain}${request.url}`;
            if (request.params && request.params.toString()) {
                url += `?${request.params.toString()}`;
            }
            try {
                const biHeader = (0,_bi_biHeaderGenerator_js__WEBPACK_IMPORTED_MODULE_1__.biHeaderGenerator)(requestOptions, publicMetadata);
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
    });
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

/***/ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/service-plugin-modules.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/service-plugin-modules.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isServicePluginModule: () => (/* binding */ isServicePluginModule),
/* harmony export */   servicePluginsModules: () => (/* binding */ servicePluginsModules)
/* harmony export */ });
/* harmony import */ var nanoevents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoevents */ "./node_modules/nanoevents/index.js");

const isServicePluginModule = (val) => val.__type === 'service-plugin-definition';
function servicePluginsModules(authStrategy) {
    const servicePluginsImplementations = new Map();
    const servicePluginsEmitter = (0,nanoevents__WEBPACK_IMPORTED_MODULE_0__.createNanoEvents)();
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

/***/ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/wixClient.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/wixClient.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createClient: () => (/* binding */ createClient)
/* harmony export */ });
/* harmony import */ var _wix_sdk_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wix/sdk-context */ "./node_modules/@wix/sdk-context/build/browser/index.mjs");
/* harmony import */ var _wix_sdk_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wix/sdk-types */ "./node_modules/@wix/sdk-types/build/browser/index.mjs");
/* harmony import */ var _ambassador_modules_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ambassador-modules.js */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/ambassador-modules.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common.js */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/common.js");
/* harmony import */ var _fetch_error_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./fetch-error.js */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/fetch-error.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/helpers.js");
/* harmony import */ var _host_modules_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./host-modules.js */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/host-modules.js");
/* harmony import */ var _rest_modules_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rest-modules.js */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/rest-modules.js");
/* harmony import */ var _event_handlers_modules_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-handlers-modules.js */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/event-handlers-modules.js");
/* harmony import */ var _service_plugin_modules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-plugin-modules.js */ "./node_modules/@wix/editor-application/node_modules/@wix/sdk/build/service-plugin-modules.js");










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
            const { module, options } = (0,_ambassador_modules_js__WEBPACK_IMPORTED_MODULE_5__.isAmbassadorModule)(modules)
                ? {
                    module: (0,_ambassador_modules_js__WEBPACK_IMPORTED_MODULE_5__.toHTTPModule)(modules),
                    options: (0,_ambassador_modules_js__WEBPACK_IMPORTED_MODULE_5__.ambassadorModuleOptions)(),
                }
                : { module: modules, options: undefined };
            return (0,_rest_modules_js__WEBPACK_IMPORTED_MODULE_6__.buildRESTDescriptor)(module, metadata ?? {}, boundFetch, (relativeUrl, fetchOptions) => {
                const finalUrl = new URL(relativeUrl, `https://${_common_js__WEBPACK_IMPORTED_MODULE_7__.API_URL}`);
                finalUrl.host = _common_js__WEBPACK_IMPORTED_MODULE_7__.API_URL;
                finalUrl.protocol = 'https';
                return boundFetch(finalUrl.toString(), fetchOptions);
            }, options);
        }
        else if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(modules)) {
            return Object.fromEntries(Object.entries(modules).map(([key, value]) => {
                return [key, use(value, modules[_common_js__WEBPACK_IMPORTED_MODULE_7__.PUBLIC_METADATA_KEY])];
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
                    _wix_sdk_context__WEBPACK_IMPORTED_MODULE_8__.wixContext.elevatedClient = this;
                }
                else {
                    _wix_sdk_context__WEBPACK_IMPORTED_MODULE_8__.wixContext.client = this;
                }
            }
        },
        fetch: (relativeUrl, options) => {
            const finalUrl = new URL(relativeUrl, `https://${_common_js__WEBPACK_IMPORTED_MODULE_7__.API_URL}`);
            finalUrl.host = _common_js__WEBPACK_IMPORTED_MODULE_7__.API_URL;
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
            const res = await boundFetch(`https://${_common_js__WEBPACK_IMPORTED_MODULE_7__.API_URL}/graphql/${opts.apiVersion}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, variables }),
            });
            if (res.status !== 200) {
                throw new _fetch_error_js__WEBPACK_IMPORTED_MODULE_9__.FetchErrorResponse(`GraphQL request failed with status ${res.status}`, res);
            }
            const { data, errors } = await res.json();
            return { data: data ?? {}, errors };
        },
        webhooks: eventHandlersClient,
        servicePlugins: servicePluginsClient,
    };
}


/***/ }),

/***/ "./node_modules/@wix/editor/node_modules/@wix/sdk-runtime/build/context-v2.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@wix/editor/node_modules/@wix/sdk-runtime/build/context-v2.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context.js */ "./node_modules/@wix/editor/node_modules/@wix/sdk-runtime/build/context.js");



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

/***/ "./node_modules/@wix/editor/node_modules/@wix/sdk-runtime/build/context.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@wix/editor/node_modules/@wix/sdk-runtime/build/context.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _context_v2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context-v2.js */ "./node_modules/@wix/editor/node_modules/@wix/sdk-runtime/build/context-v2.js");

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

/***/ "./node_modules/@wix/editor/node_modules/@wix/sdk-runtime/build/host-modules.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@wix/editor/node_modules/@wix/sdk-runtime/build/host-modules.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHostModule: () => (/* binding */ createHostModule)
/* harmony export */ });
/* harmony import */ var _context_v2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context-v2.js */ "./node_modules/@wix/editor/node_modules/@wix/sdk-runtime/build/context-v2.js");

function createHostModule(hostModuleAPI) {
    return (0,_context_v2_js__WEBPACK_IMPORTED_MODULE_0__.contextualizeHostModuleV2)({
        __type: 'host',
        create: (host) => Object.entries(hostModuleAPI).reduce((acc, [key, fn]) => ({
            ...acc,
            [key]: fn(host),
        }), {}),
    }, Object.keys(hostModuleAPI));
}


/***/ }),

/***/ "./node_modules/@wix/public-editor-platform-errors/dist/esm/index.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/@wix/public-editor-platform-errors/dist/esm/index.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseError: () => (/* binding */ BaseError),
/* harmony export */   EditorPlatformInternalErrorCode: () => (/* binding */ EditorPlatformInternalErrorCode),
/* harmony export */   createEditorPlatformInternalError: () => (/* binding */ createEditorPlatformInternalError),
/* harmony export */   createErrorBuilder: () => (/* binding */ createErrorBuilder)
/* harmony export */ });
class BaseError extends Error {
  state = {};
  displayName;
  prefix;
  errorMessage;
  parent;
  messages = [];
  code;
  constructor(_message, _code, _prefix) {
    const message = _message ? ` ${_message}` : "";
    const displayName = `[${_prefix}]#${_code}`;
    super(`${displayName}.${message}`);
    this.displayName = displayName;
    this.errorMessage = _message;
    this.prefix = _prefix;
    this.code = _code;
    this.name = displayName;
    Object.defineProperty(this, "message", {
      get: () => {
        return this.getDisplayMessage();
      }
    });
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError);
    }
  }
  get parentError() {
    const parent = this.parent;
    if (!parent) {
      return null;
    }
    if (this.parent instanceof BaseError) {
      return this.parent;
    }
    const displayName = parent.name ?? "[Unknown Error]";
    return {
      getBreadcrumbs() {
        return [displayName];
      },
      getMessage() {
        return [displayName, parent.message ?? "unknown error message"].join(
          "\n"
        );
      }
    };
  }
  /**
   * Returns formatted error message with breadcrumbs
   */
  getDisplayMessage() {
    const breadcrumbs = this.parentError ? this.getBreadcrumbs() : [];
    return [breadcrumbs.join(" -> "), this.getMessage()].filter((x) => x.trim().length).join("\n");
  }
  /**
   * Returns formatted error message
   */
  getMessage() {
    const state = Object.entries(this.state).reduce((acc, [key, value]) => {
      if (value) {
        acc.push(` \u2013 ${key}: ${value}`);
      }
      return acc;
    }, []).join("\n");
    const messages = this.messages.reduce((acc, _messages) => {
      acc.push(` - ${_messages.join(" ")}`);
      return acc;
    }, []).join("\n");
    const parentError = this.parentError;
    const parentErrorMessage = parentError ? ["", parentError.getMessage(), ""].join("\n") : "";
    const thrownErrorMessage = this.errorMessage ? `${this.displayName}: ${this.errorMessage}` : this.displayName;
    return [parentErrorMessage, thrownErrorMessage, state, messages].filter((x) => x.trim().length).join("\n");
  }
  getBreadcrumbs() {
    const parentError = this.parentError;
    if (!parentError) {
      return [this.displayName];
    }
    return [...parentError.getBreadcrumbs(), this.displayName];
  }
  withParentError(e) {
    this.parent = e;
    return this;
  }
  withMessage(...messages) {
    this.messages.push(messages);
    return this;
  }
}
function createErrorBuilder(factory) {
  return function throwException(code, message = "") {
    const instance = new factory(message, code);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(instance, throwException);
    }
    return instance;
  };
}

var EditorPlatformInternalErrorCode = /* @__PURE__ */ ((EditorPlatformInternalErrorCode2) => {
  EditorPlatformInternalErrorCode2["UnexpectedError"] = "UnexpectedError";
  return EditorPlatformInternalErrorCode2;
})(EditorPlatformInternalErrorCode || {});
class EditorPlatformInternalError extends BaseError {
  state = {};
  constructor(message, code) {
    super(message, code, "Editor Platform Internal Error");
  }
  withHost(host) {
    this.state = { ...this.state, host };
    return this;
  }
}
const createEditorPlatformInternalError = createErrorBuilder(EditorPlatformInternalError);


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./node_modules/@wix/public-editor-platform-events/dist/esm/index.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/@wix/public-editor-platform-events/dist/esm/index.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DMEventsBridge: () => (/* binding */ DMEventsBridge),
/* harmony export */   EventEmitter: () => (/* binding */ EventEmitter),
/* harmony export */   PlatformAppEvent: () => (/* binding */ PlatformAppEvent),
/* harmony export */   PlatformAppEventEmitter: () => (/* binding */ PlatformAppEventEmitter),
/* harmony export */   PlatformLifecycleEvent: () => (/* binding */ PlatformLifecycleEvent),
/* harmony export */   PlatformPrivateEvent: () => (/* binding */ PlatformPrivateEvent),
/* harmony export */   PlatformPrivateEventEmitter: () => (/* binding */ PlatformPrivateEventEmitter)
/* harmony export */ });
/* harmony import */ var _wix_public_editor_platform_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/public-editor-platform-interfaces */ "./node_modules/@wix/public-editor-platform-interfaces/dist/index.js");


class EventEmitter {
  static biEvents = {
    PLATFORM_WORKER_SPAWN: 123,
    PLATFORM_APP_RUNNER_INIT_APP_API: 124,
    PLATFORM_APP_RUNNER_RUN_APP: 125,
    PLATFORM_APP_RUNNER_REMOVE_APP: 126,
    PLATFORM_WORKER_APP_BUNDLE_LOAD: 127,
    PLATFORM_WORKER_APP_BUNDLE_EXECUTE: 128,
    PLATFORM_IFRAME_INIT: 129,
    PLATFORM_APP_API_INIT: 130,
    PLATFORM_APP_API_GET: 131
  };
  static EventSteps = {
    Start: "start",
    End: "end",
    Error: "error"
  };
  uid = 0;
  callbacks = /* @__PURE__ */ new Map();
  inTransaction = false;
  isSilent = false;
  queue = [];
  silent(isSilent = true) {
    this.isSilent = isSilent;
  }
  startTransaction() {
    this.inTransaction = true;
  }
  commit() {
    this.inTransaction = false;
    const queue = this.queue;
    this.queue = [];
    if (!this.isSilent) {
      queue.forEach((event) => {
        this.notify(event);
      });
    }
  }
  notify(event) {
    if (this.isSilent) {
      return;
    }
    if (this.inTransaction) {
      this.queue.push(event);
    } else {
      this.callbacks.forEach((callback) => {
        callback(event);
      });
    }
  }
  subscribe(callback) {
    const uid = this.uid++;
    this.callbacks.set(uid, callback);
    return () => {
      this.callbacks.delete(uid);
    };
  }
  notifyWithStep(event, step) {
    this.notify({
      ...event,
      meta: {
        ...event.meta,
        step
      }
    });
  }
  async withEvent(event, cb) {
    let result = cb();
    if (result && result.hasOwnProperty("then")) {
      try {
        this.notifyWithStep(event, EventEmitter.EventSteps.Start);
        result = await result;
        this.notifyWithStep(event, EventEmitter.EventSteps.End);
        return result;
      } catch (e) {
        this.notifyWithStep(
          {
            ...event,
            meta: {
              ...event.meta,
              error: e
            }
          },
          EventEmitter.EventSteps.Error
        );
        throw e;
      }
    } else {
      this.notify(event);
      return result;
    }
  }
}

var PlatformPrivateEvent = /* @__PURE__ */ ((PlatformPrivateEvent2) => {
  PlatformPrivateEvent2["WorkerSpawn"] = "WorkerSpawn";
  PlatformPrivateEvent2["HostEvent"] = "HostEvent";
  PlatformPrivateEvent2["ApplicationsSpecsReceived"] = "ApplicationsSpecsReceived";
  PlatformPrivateEvent2["InitApplicationApi"] = "InitApplicationApi";
  PlatformPrivateEvent2["RunApplication"] = "RunApplication";
  PlatformPrivateEvent2["getApplicationApi"] = "getApplicationApi";
  PlatformPrivateEvent2["IframeInit"] = "IframeInit";
  return PlatformPrivateEvent2;
})(PlatformPrivateEvent || {});
var PlatformLifecycleEvent = /* @__PURE__ */ ((PlatformLifecycleEvent2) => {
  PlatformLifecycleEvent2["EditorReady"] = "EditorReady";
  return PlatformLifecycleEvent2;
})(PlatformLifecycleEvent || {});
class PlatformPrivateEventFactories {
  createWorkerSpawnEvent({
    url,
    workerId,
    strategy
  }) {
    return {
      type: "WorkerSpawn" /* WorkerSpawn */,
      payload: {
        url
      },
      meta: {
        bi: {
          evid: PlatformPrivateEventEmitter.biEvents.PLATFORM_WORKER_SPAWN,
          workerId,
          strategy
        }
      }
    };
  }
  createRunApplicationEvent(app) {
    return {
      type: "RunApplication" /* RunApplication */,
      payload: {
        appDefinitionId: app.appDefinitionId
      },
      meta: {
        bi: {
          appType: app.type,
          appDefId: app.appDefinitionId,
          evid: PlatformPrivateEventEmitter.biEvents.PLATFORM_APP_RUNNER_RUN_APP
        }
      }
    };
  }
  createGetApplicationApiEvent(targetAppDefId, scope) {
    return {
      type: "getApplicationApi" /* getApplicationApi */,
      payload: {},
      meta: {
        bi: {
          targetAppDefId,
          scope,
          evid: PlatformPrivateEventEmitter.biEvents.PLATFORM_APP_API_GET
        }
      }
    };
  }
  createInitApplicationApiEvent(appDefinitionId) {
    return {
      type: "InitApplicationApi" /* InitApplicationApi */,
      payload: {
        appDefinitionId
      },
      meta: {
        bi: {
          appDefId: appDefinitionId,
          evid: PlatformPrivateEventEmitter.biEvents.PLATFORM_APP_API_INIT
        }
      }
    };
  }
  createIframeInitEvent(frameUrl, iframeId) {
    return {
      type: "IframeInit" /* IframeInit */,
      payload: {},
      meta: {
        bi: {
          frameUrl,
          iframeId,
          evid: PlatformPrivateEventEmitter.biEvents.PLATFORM_IFRAME_INIT
        }
      }
    };
  }
}
class PlatformPrivateEventEmitter extends EventEmitter {
  factories = new PlatformPrivateEventFactories();
  notify(event) {
    super.notify(event);
  }
}

var PlatformAppEvent = /* @__PURE__ */ ((PlatformAppEvent2) => {
  PlatformAppEvent2["ApplicationInit"] = "ApplicationInit";
  PlatformAppEvent2["ApplicationExecute"] = "ApplicationExecute";
  PlatformAppEvent2["ApplicationRemoved"] = "ApplicationRemoved";
  PlatformAppEvent2["ApplicationLoad"] = "ApplicationLoad";
  PlatformAppEvent2["ApplicationApiInit"] = "ApplicationApiInit";
  PlatformAppEvent2["CustomEvent"] = "CustomEvent";
  PlatformAppEvent2["HostEvent"] = "HostEvent";
  PlatformAppEvent2["EditorReady"] = "EditorReady";
  return PlatformAppEvent2;
})(PlatformAppEvent || {});
class PlatformAppEventsFactories {
  createApplicationRemovedEvent(appDefinitionId) {
    return {
      type: "ApplicationRemoved" /* ApplicationRemoved */,
      payload: {
        appDefinitionId
      },
      meta: {
        bi: {
          evid: PlatformAppEventEmitter.biEvents.PLATFORM_WORKER_SPAWN,
          appDefId: appDefinitionId
        }
      }
    };
  }
  createApplicationLoadEvent(app, url) {
    return {
      type: "ApplicationLoad" /* ApplicationLoad */,
      payload: {
        appDefinitionId: app.appDefinitionId,
        url
      },
      meta: {
        bi: {
          evid: PlatformAppEventEmitter.biEvents.PLATFORM_WORKER_APP_BUNDLE_LOAD,
          appDefId: app.appDefinitionId,
          appType: app.appType,
          bundleUrl: url
        }
      }
    };
  }
  createApplicationExecuteEvent(app, url) {
    return {
      type: "ApplicationExecute" /* ApplicationExecute */,
      payload: {
        appDefinitionId: app.appDefinitionId,
        url
      },
      meta: {
        bi: {
          evid: PlatformAppEventEmitter.biEvents.PLATFORM_WORKER_APP_BUNDLE_EXECUTE,
          appDefId: app.appDefinitionId,
          appType: app.appType,
          bundleUrl: url
        }
      }
    };
  }
  createApplicationApiInitEvent(appDefinitionId, scope) {
    return {
      type: "ApplicationApiInit" /* ApplicationApiInit */,
      payload: { appDefinitionId },
      meta: {
        bi: {
          evid: PlatformAppEventEmitter.biEvents.PLATFORM_APP_API_INIT,
          appDefId: appDefinitionId,
          scope
        }
      }
    };
  }
}
class PlatformAppEventEmitter extends EventEmitter {
  factories = new PlatformAppEventsFactories();
}

class DMEventsBridge {
  constructor(events) {
    this.events = events;
  }
  static allowedEvents = [
    _wix_public_editor_platform_interfaces__WEBPACK_IMPORTED_MODULE_0__.EventType.componentSelectionChanged,
    _wix_public_editor_platform_interfaces__WEBPACK_IMPORTED_MODULE_0__.EventType.appInstalled,
    _wix_public_editor_platform_interfaces__WEBPACK_IMPORTED_MODULE_0__.EventType.appUpdateCompleted,
    _wix_public_editor_platform_interfaces__WEBPACK_IMPORTED_MODULE_0__.EventType.removeAppCompleted
  ];
  mapToPlatformHostEvent(event) {
    if (typeof event === "string") {
      try {
        event = JSON.parse(event);
      } catch (e) {
      }
    }
    return {
      type: PlatformPrivateEvent.HostEvent,
      payload: {
        type: event.args.eventType,
        ...event.args.eventPayload
      },
      meta: {
        appDefinitionId: event.appDefinitionId ?? null,
        intent: event.intent
      }
    };
  }
  /**
   * Notify by event from Worker Manager (platform infrastructure)
   */
  notify(_event) {
    const event = this.mapToPlatformHostEvent(_event);
    if (DMEventsBridge.allowedEvents.includes(event.payload.type)) {
      this.events.notify(event);
    }
  }
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./node_modules/@wix/sdk-context/build/browser/index.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/@wix/sdk-context/build/browser/index.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ "./node_modules/nanoevents/index.js":
/*!******************************************!*\
  !*** ./node_modules/nanoevents/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNanoEvents: () => (/* binding */ createNanoEvents)
/* harmony export */ });
let createNanoEvents = () => ({
  emit(event, ...args) {
    for (
      let i = 0,
        callbacks = this.events[event] || [],
        length = callbacks.length;
      i < length;
      i++
    ) {
      callbacks[i](...args)
    }
  },
  events: {},
  on(event, cb) {
    ;(this.events[event] ||= []).push(cb)
    return () => {
      this.events[event] = this.events[event]?.filter(i => cb !== i)
    }
  }
})


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
/*!**********************!*\
  !*** ./src/panel.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateColor: () => (/* binding */ updateColor)
/* harmony export */ });
/* harmony import */ var _wix_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wix/editor */ "./node_modules/@wix/editor/dist/esm/index.js");
/* harmony import */ var _wix_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wix/sdk */ "./node_modules/@wix/sdk/build/wixClient.js");
console.log('before import');





console.log('after import');

const client = (0,_wix_sdk__WEBPACK_IMPORTED_MODULE_0__.createClient)({
    host: _wix_editor__WEBPACK_IMPORTED_MODULE_1__.editor.host(),
    modules: {
        widget: _wix_editor__WEBPACK_IMPORTED_MODULE_1__.widget,
    },
});

function updateColor(color) {
    console.log("update color")
    client.widget.setProp('color', color);
};

/******/ })()
;