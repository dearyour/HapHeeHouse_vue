<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글작성</h3></b-alert>
      </b-col>
    </b-row>
    <reply-write-form type="register" />
  </b-container>
</template>

<script>
import ReplyWriteForm from "./reply/ReplyWriteForm.vue";

export default {
  name: "ReplyWrite",
  components: {
    ReplyWriteForm,
  },
};
</script>

<style></style>
