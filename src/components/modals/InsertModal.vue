<template>
  <div class="modal" tabindex="-1" id="insertModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header mt-3">
          <h5 class="modal-title">글 쓰기</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <input
              v-model="title"
              type="text"
              class="form-control"
              placeholder="제목"
            />
          </div>
          <div class="mb-3">
            <div id="divEditorInsert"></div>
          </div>
          <div class="form-check mb-3">
            <input
              v-model="attachFile"
              class="form-check-input"
              type="checkbox"
              value=""
              id="chkFileUploadInsert"
            />
            <label class="form-check-label" for="chkFileUploadInsert"
              >파일 추가</label
            >
          </div>
          <div class="mb-3" v-show="attachFile" id="imgFileUploadInsertWrapper">
            <input
              @change="changeFile"
              type="file"
              id="inputFileUploadInsert"
              multiple
            />
            <div id="imgFileUploadInsertThumbnail" class="thumbnail-wrapper">
              <img
                v-for="(file, index) in fileList"
                v-bind:src="file"
                v-bind:key="index"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="boardInsert"
            class="btn btn-sm btn-primary btn-outline"
            data-dismiss="modal"
            type="button"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueAlertify from "vue-alertify";

Vue.use(CKEditor).use(VueAlertify);

import http from "@/util/http-common";

export default {
  name: "InsertModal",
  // data 가 최초 발생하는 곳이므로 store 를 사용하지 않아도 됨.
  data() {
    return {
      title: "",
      CKEditor: "",
      attachFile: false,
      fileList: [],
    };
  },
  methods: {
    initUI() {
      this.title = "";
      this.CKEditor.setData("");
      this.attachFile = false;
      this.fileList = [];
      document.querySelector("#inputFileUploadInsert").value = "";
    },
    changeFile(fileEvent) {
      if (fileEvent.target.files && fileEvent.target.files.length > 0) {
        for (var i = 0; i < fileEvent.target.files.length; i++) {
          const file = fileEvent.target.files[i];
          this.fileList.push(URL.createObjectURL(file));
        }
      }
    },
    boardInsert() {
      var formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.CKEditor.getData());

      // file upload
      var attachFiles = document.querySelector("#inputFileUploadInsert");
      console.log("InsertModalVue: data 1 : ");
      console.log(attachFiles);

      var cnt = attachFiles.files.length;
      for (var i = 0; i < cnt; i++) {
        formData.append("file", attachFiles.files[i]);
      }

      http
        .post("/boards", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(({ data }) => {
          console.log("InsertModalVue: data : ");
          console.log(data);
          if (data.result == "login") {
            this.$router.push("/login");
          } else {
            this.$alertify.success("글이 등록되었습니다.");
            this.closeModal();
          }
        })
        .catch((error) => {
          console.log("InsertModalVue: error ");
          console.log(error);
        });
    },
    closeModal() {
      this.$emit("call-parent-insert");
    },
  },
  mounted() {
    ClassicEditor.create(document.querySelector("#divEditorInsert"))
      .then((editor) => {
        this.CKEditor = editor;
      })
      .catch((err) => {
        console.error(err.stack);
      });

    // bootstrap modal show event hook
    // InsertModal 이 보일 때 초기화
    let $this = this;
    this.$el.addEventListener("show.bs.modal", function () {
      $this.initUI();
    });
  },
};
</script>

<style scoped>
/* CKEditor 는 vue 와 별개로 rendering 되어서 scope 를 넣으면 반영되지 않는다. */
.ck-editor__editable {
  min-height: 300px !important;
}

.thumbnail-wrapper {
  margin-top: 5px;
}

.thumbnail-wrapper img {
  width: 100px !important;
  margin-right: 5px;
  max-width: 100%;
}

.modal.in {
  padding-right: 0 !important;
}
.modal-dialog {
  width: 100%;
  max-width: 1000px;

  padding: 0;
}

.modal-content {
  overflow: auto;
}

.modal-header {
  margin-bottom: -60px;
  position: relative;
  z-index: 10;
}
.modal-body {
  padding-top: 70px;
  height: 100%;
}

.modal-body .in-content {
  border-width: 0;
  width: 100%;
  overflow: auto;
}
</style>
