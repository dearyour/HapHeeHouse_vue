<template>
  <!-- Modal Content -->
  <div
    class="modal fade"
    id="secessionModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-notification"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-info modal-dialog-centered" role="document">
      <div class="modal-content bg-gradient-danger">
        <div class="modal-header">
          <p class="modal-title" id="modal-title-notification">회원 탈퇴</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="py-3 text-center">
            <span class="modal-icon display-1-lg"
              ><span class="far fa-envelope-open"></span
            ></span>
            <h2 class="h4 modal-title my-3">회원 탈퇴 하시겠습니까?</h2>
            <p>개인 정보가 영구 삭제되며, 복구가 불가능 합니다.</p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="deleteInfo"
            class="btn btn-sm btn-white"
          >
            회원탈퇴
          </button>
          <button type="button" @click="close" class="btn btn-sm btn-dark">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Modal Content -->
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "SecessionModal",
  props: ["MyPage"],
  methods: {
    deleteInfo() {
      //회원삭제 기능구현

      http
        .delete("/user/" + this.$store.state.userInfo.userEmail)
        .then(({ data }) => {
          console.log("UserVue Secession - data : ");
          console.log(data);

          this.$swal({
            icon: "success",
            title: "회원탈퇴 완료",
            showConfirmButton: false,
            timer: 1500,
          });

          this.close();
          this.$store.commit("SET_LOGOUT");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("UserVue Secession - error : ");
          console.log(error);
          if (error.response.status == "404") {
            this.$alertify.error("회원탈퇴에 실패했습니다.");
          } else {
            this.$alertify.error("Opps!! 서버에 문제가 발생했습니다.");
          }
        });
    },
    close() {
      this.$emit("call-parent-secession-close"); // no parameter
    },
  },
  mounted() {},
};
</script>

<style></style>
