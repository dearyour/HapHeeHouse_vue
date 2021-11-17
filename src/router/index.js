import Vue from "vue";
import VueRouter from "vue-router";
import Map from "@/views/Map.vue";

import Member from "@/views/Member.vue";
import MemberLogin from "@/components/user/MemberLogin.vue";
import MemberJoin from "@/components/user/MemberJoin.vue";

import Qna from "@/views/Qna.vue";
import QnaList from "@/components/qna/QnaList.vue";
import QnaWrite from "@/components/qna/QnaWrite.vue";
import QnaView from "@/components/qna/QnaView.vue";
import QnaUpdate from "@/components/qna/QnaUpdate.vue";
import QnaDelete from "@/components/qna/QnaDelete.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Map",
    component: Map,
  },
  {
    path: "/user",
    name: "Member",
    component: Member,
    children: [
      {
        path: "singin",
        name: "SignIn",
        component: MemberLogin,
      },
      {
        path: "singup",
        name: "SignUp",
        component: MemberJoin,
      },
    ],
  },
  {
    path: "/qna",
    name: "Qna",
    component: Qna,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "QnaList",
        component: QnaList,
      },
      {
        path: "write",
        name: "QnaWrite",
        component: QnaWrite,
      },
      {
        path: "detail/:qna_id",
        name: "QnaView",
        component: QnaView,
      },
      {
        path: "update/:qna_id",
        name: "QnaUpdate",
        component: QnaUpdate,
      },
      {
        path: "delete/:qna_id",
        name: "QnaDelete",
        component: QnaDelete,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
