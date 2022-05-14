import Vue from "vue";
import "splitting/dist/splitting.css";
import Splitting from "splitting";
import * as utils from "@/commons/utils";

Vue.use(Splitting);

for (const k in utils) {
  if (Object.hasOwnProperty.call(utils, k)) {
    const v = utils[k];
    Vue.prototype["$" + k] = v;
  }
}
