<template>
  <b-tr>
    <b-td>{{ qnaNo }}</b-td>
    <b-th class="text-left">
      <router-link
        :to="{ name: 'QnaView', params: { qnaNo: qnaNo } }"
        >{{ qnaName }}</router-link
      >
    </b-th>
    <b-td>{{ total }}</b-td>
    <b-td>{{ user_id }}</b-td>
    <b-td>{{ regtime }}</b-td>
  </b-tr>
</template>

<script>
// import moment from "moment";

export default {
  name: "QnaListRow",
  props: {
    qnaNo: Number,
    user_id: String,
    qnaName: String,
    total: Number,
    regtime: String,
  },
  computed: {
    // changeDateFormat() {
    //   return moment(new Date(this.regtime)).format("YY.MM.DD hh:mm:ss");
    // },
  },
};
</script>

<style></style>
