<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>회원 삭제</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col><b-alert show variant="danger">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "QnaDelete",
  created() {
    http
      .delete(`/user/delete/${this.$route.params.userinfo}`)
      .then(({ data }) => {
        let msg = "삭제가 완료되었습니다.";
        if (data === "1") {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        // 현재 route를 /list로 변경.
        this.$router.push({ name: "SignIn" });
      });
  },
};
</script>

<style></style>
