<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글수정</h3></b-alert>
      </b-col>
    </b-row>
    <member-join type="modify" />
  </b-container>
</template>

<script>
import MemberJoin from "./user/MemberJoin.vue";

export default {
  name: "MemberUpdate",
  components: {
    MemberJoin,
  },
};
</script>

<style></style>
