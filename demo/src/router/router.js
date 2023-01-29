import { createRouter, createWebHashHistory } from "vue-router";
import Product from "@/view/Product.vue";
import AddProduct from "@/view/AddProduct.vue";
import EditProduct from "@/view/EditProduct.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Product,
      alias: "/products",
      name: "Home",
      props: true,

    },
    {
      path: "/add",
      name: "add",
      component: AddProduct,
      props: true,

    },    {
      path: "/edit/:id",
      name: "edit",
      component: EditProduct,
      props: true,
    },
  ],
});
