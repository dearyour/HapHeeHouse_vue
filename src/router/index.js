import Vue from "vue";
import VueRouter from "vue-router";
import Map from "@/views/Map.vue";

import Member from "@/views/Member.vue";
import MemberLogin from "@/components/user/MemberLogin.vue";
import MemberWrite from "@/components/user/MemberWrite.vue";
import MemberMyPage from "@/components/user/MemberMyPage.vue";
import MemberUpdate from "@/components/user/MemberUpdate.vue";
import MemberDelete from "@/components/user/MemberDelete.vue";
import MemberFind from "@/components/user/MemberFind.vue";

import Qna from "@/views/Qna.vue";
import QnaList from "@/components/qna/QnaList.vue";
import QnaWrite from "@/components/qna/QnaWrite.vue";
import QnaView from "@/components/qna/QnaView.vue";
import QnaUpdate from "@/components/qna/QnaUpdate.vue";
import QnaDelete from "@/components/qna/QnaDelete.vue";

import DetailView from "@/views/DetailView.vue";

import store from "@/store/index.js";
Vue.use(VueRouter);

// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "SignIn" });
    router.push({ name: "SignIn" });
  } else {
    console.log("로그인 완료.");
    next();
  }
};

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
        name: "MemberWrite",
        component: MemberWrite,
      },
      {
        path: "find-userId",
        name: "MemberFind",
        component: MemberFind,
      },
      {
        path: "update",
        name: "MemberUpdate",
        beforeEnter: onlyAuthUser,
        component: MemberUpdate,
      },
      {
        path: "mypage",
        name: "MyPage",
        beforeEnter: onlyAuthUser,
        component: MemberMyPage,
      },

      {
        path: "delete",
        name: "MemberDelete",
        beforeEnter: onlyAuthUser,
        component: MemberDelete,
      },
    ],
  },
  // {
  //   name: "qna",
  //   path: "/qna",
  //   component: Qna,
  //   redirect: "/qna/list",
  //   children: [
  //     {
  //       path: "list",
  //       name: "BookList",
  //       component: () => import("@/components/qna/BookList.vue"),
  //     },
  //     {
  //       path: "write",
  //       name: "book-create",
  //       component: () => import("@/components/qna/BookCreate.vue"),
  //     },
  //     {
  //       path: "view",
  //       name: "book-view",
  //       component: () => import("@/components/qna/BookView.vue"),
  //     },
  //     {
  //       path: "modify/:isbn",
  //       name: "book-modify",
  //       component: () => import("@/components/qna/BookModify.vue"),
  //     },
  //   ],
  // redirect: () => {
  //   return "/qna";
  // },
  // },
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
        path: "update/:articleno",
        name: "QnaUpdate",
        component: QnaUpdate,
      },
      {
        path: "delete/:articleno",
        name: "QnaDelete",
        component: QnaDelete,
      },
      {
        path: "detail/:articleno",
        name: "QnaView",
        component: QnaView,
      },
    ],
  },
  {
    path: "/deal/apt",
    name: "DetailView",
    component: DetailView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
