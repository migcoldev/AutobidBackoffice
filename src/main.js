import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import Axios from "axios";
import "element-plus/lib/theme-chalk/index.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Toggle from "@vueform/toggle";
import "@vueform/toggle/themes/default.css";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "./assets/scss/argon.scss";
import Autocomplete from 'vue3-autocomplete'
// Optional: Import default CSS
import 'vue3-autocomplete/dist/vue3-autocomplete.css'

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(Loading);
appInstance.use(Toggle);
appInstance.use(Autocomplete);
// appInstance.use(Vue3ColorPicker);

const token = localStorage.getItem("token");
appInstance.config.globalProperties.$http = Axios;
appInstance.config.globalProperties.$axios = Axios;
appInstance.config.globalProperties.$http.defaults.headers.common["Authorization"] = "Bearer " + token;

appInstance.mount("#app");