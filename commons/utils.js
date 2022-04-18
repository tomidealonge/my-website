import jqueryLib from "jquery";

// Extended JSON Parse
export const JSONParse = (str, defaultVal = []) => {
  try {
    if (str != null) {
      return JSON.parse(str);
    } else {
      return defaultVal;
    }
  } catch (e) {
    return defaultVal;
  }
};

// DeAssociate Object/Array
export const deAssociate = obj => {
  return obj ? JSON.parse(JSON.stringify(obj)) : {};
};

export const removeEmptyKeys = obj => {
  if (obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null && v !== "")
    );
  } else {
    return obj;
  }
};

// SSR LocalStorage
export const ssrLocalStorage = {
  getItem(key) {
    if (process.client) {
      return localStorage.getItem(key);
    }
    return null;
  },

  setItem(key, value) {
    if (process.client) {
      localStorage.setItem(key, value);
    }
  },

  removeItem(key) {
    if (process.client) {
      localStorage.removeItem(key);
    }
  },

  clear() {
    if (process.client) {
      localStorage.clear();
    }
  }
};

export const initWebflow = () => {
  setTimeout(() => {
    jqueryLib(document).ready(function() {
      if (window.Webflow !== undefined) {
        window.Webflow.destroy();
        window.Webflow.ready();
        window.Webflow.require("ix2").init();
        // window.Webflow.require('lottie').init()
        // window.Webflow.require('slider').redraw()
        document.dispatchEvent(new Event("readystatechange"));
      }
    });
  }, 500);
};

export const withHttp = (url, { https = true } = {}) => {
  if (typeof url !== "string") {
    throw new TypeError(
      `Expected \`url\` to be of type \`string\`, got \`${typeof url}\``
    );
  }
  url = url.trim();

  if (url.includes("http://") || url.includes("https://")) {
    return url;
  } else if (url.substring(0, 9) === "localhost") {
    return "http://" + url;
  } else {
    return "https://" + url;
  }
};

// Intervals
export const interval = (callback, time) => setInterval(callback, time);

// Check Empty Object
export const isEmpty = obj => {
  if (isObject(obj)) {
    return Object.keys(obj).length === 0;
  } else {
    return true;
  }
};

// Check if Object
export const isObject = obj => {
  return typeof obj === "object" && obj !== null;
};

// Convert String to Number
export const parseNumber = obj => {
  const res = {};
  Object.keys(obj).forEach(key => {
    res[key] = !isNaN(obj[key]) ? parseInt(obj[key], 10) : obj[key];
  });
  return res;
};

// Rename Object Key
export const renameKey = (obj, oldKey, newKey) => {
  if (oldKey !== newKey && Object.hasOwnProperty.call(obj, oldKey)) {
    Object.defineProperty(
      obj,
      newKey,
      Object.getOwnPropertyDescriptor(obj, oldKey)
    );
    delete obj[oldKey];
  }
};

// Rename Object Keys (Array)
export const renameKeys = (obj, oldKeys, newKeys) => {
  if (oldKeys.length === newKeys.length) {
    for (let i = 0; i < oldKeys.length; i++) {
      renameKey(obj, oldKeys[i], newKeys[i]);
    }
  }
};

// Remove Object Keys
export const removeKeys = (obj, keys) => {
  if (obj) {
    obj = deAssociate(obj);
    keys.forEach(key => {
      if (Object.hasOwnProperty.call(obj, key)) {
        delete obj[key];
      }
    });

    return obj;
  }
};

// Remove Object Keys (empty string)
export const removeEmptyString = obj => {
  const objArr = Object.keys(obj);
  objArr.forEach(key => {
    if (!obj[key]) {
      delete obj[key];
    }
  });

  return obj;
};

// Querylize
export const querylize = obj => {
  const str = [];
  for (const prop in obj) {
    if (Object.getOwnPropertyDescriptor(obj, prop)) {
      if (obj[prop]) {
        str.push(
          encodeURIComponent(prop) + "=" + encodeURIComponent(obj[prop])
        );
      }
    }
  }
  return "?" + str.join("&");
};

// Handle error response
export const errMessage = errorObject => {
  if (errorObject.response) {
    if (errorObject.response.data.errors) {
      return errorObject.response.data.errors.join("\n");
    } else {
      return errorObject.response.data.message;
    }
  } else {
    return errorObject;
  }
};

// Validate email for edge cases
export const isEmail = emailStr => {
  return /\S+@\S+\.\S+/.test(emailStr);
};

// Generate Paystack Reference
export const getReference = () => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Handle error response
export const formatError = errObj => {
  const validationErrors = errObj.response?.data?.errors; // Laravel
  const compositeErrors = [];
  if (errObj.response) {
    if (validationErrors) {
      for (const key in validationErrors) {
        if (Object.hasOwnProperty.call(validationErrors, key)) {
          compositeErrors.push(...validationErrors[key]);
        }
      }
      return compositeErrors.join("\n");
    } else {
      return errObj.response.data.message;
    }
  } else {
    return errObj;
  }
};
