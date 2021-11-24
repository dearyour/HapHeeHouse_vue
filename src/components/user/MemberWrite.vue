<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <member-join type="register" />
  </b-container>
</template>

<script>
import MemberJoin from "./MemberJoin.vue";

export default {
  name: "MemberWrite",
  components: {
    MemberJoin,
  },
};
</script>

<style></style>
