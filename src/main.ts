import App from "@/App.vue";
import { routes } from "@/routes";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "./style.css";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";


import * as VueRouter from "vue-router";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ToastPlugin);
app.mount("#app");
