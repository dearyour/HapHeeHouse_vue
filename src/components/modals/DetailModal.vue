<template>
<div class="modal" tabindex="-1" id="detailModal">
  <div class="modal-dialog" >
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">글 상세</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table class="table table-hover mt-2 mb-2">
          <tbody>
            <tr style="height:55px;"><td class="bg-primary text-white" style="width:150px;">글번호</td><td>{{ $store.state.board.boardId }}</td></tr>
            <tr style="height:55px;"><td class="bg-primary text-white" style="width:150px;">제목</td><td>{{ $store.state.board.title }}</td></tr>
            <tr style="height:250px;"><td class="bg-primary text-white" style="width:150px;">내용</td><td v-html="$store.state.board.content"></td></tr>
            <tr style="height:55px;"><td class="bg-primary text-white" style="width:150px;">작성자</td><td>{{ $store.state.board.userName }}</td></tr>
            <!-- 아래 코드는 오류 발생 초기 생성 시점에 regDt = {} -->
            <!-- <tr><td>작성일시</td><td>{{ makeDateStr(regDt.date.year, regDt.date.month, regDt.date.day, '.') }}</td></tr> -->
            <tr style="height:55px;"><td class="bg-primary text-white" style="width:150px;">작성일시</td><td>{{ $store.state.board.regDt }}</td></tr>
            <tr style="height:55px;"><td class="bg-primary text-white" style="width:150px;">조회수</td><td>{{ $store.state.board.readCount }}</td></tr>
            <!-- New for FileUpload -->
            <tr style="height:55px;"><td class="bg-primary text-white" style="width:150px;" colspan="2">첨부파일</td></tr>
            <tr>
              <td colspan="2">
                <div v-for="(file, index) in $store.state.board.fileList" :key="index">
                  
                  <span class="fileName etc"   style="width:100px;">{{ file.fileName }}</span>
                  &nbsp;&nbsp;
                  <a type="button" class="btn btn-outline btn-default btn-xs" v-bind:href="file.fileUrl" download>내려받기</a>
                </div>
              </td>
            </tr>
            <!-- / New for FileUpload -->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button v-show="$store.state.board.isOwner" @click="changeToUpdate" class="btn btn-sm btn-primary btn-outline" data-dismiss="modal" type="button">글 수정하기</button>
        <button v-show="$store.state.board.isOwner" @click="changeToDelete" class="btn btn-sm btn-warning btn-outline" data-dismiss="modal" type="button">글 삭제하기</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// 아래 import 사용 X
// import http from "@/common/axios.js";
// import util from "@/common/util.js";

export default {
  name: 'DetailModal',
  // props 사용 X
  // props: ['boardId'],
  // data 사용 X
  // data() {
  //       return {          
  //         title: '',
  //         content: '',
  //         userName: '',
  //         regDt: {},

  //         readCount: 0,
  //         fileList: [],
  //         isOwner: false
  //       }
  //   },
    methods: {
      // http 요청 BoardMain 으로 이동!!
        // boardDetail(){
        //   http.get(
        //     '/boards/' + this.$store.state.board.boardId, // props variable
        //     )
        //     .then(({ data }) => {
        //       console.log("DetailModalVue: data : ");
        //       console.log(data);
              
        //       if( data.result == 'login' ){
        //         this.$router.push("/login")
        //       }else{
        //         this.$store.commit(
        //           'mutateSetBoardDetail',
        //           { 
        //             title: data.dto.title,
        //             content: data.dto.content,
        //             regDt: this.makeDateStr(data.dto.regDt.date.year, data.dto.regDt.date.month, data.dto.regDt.date.day, '.'),
        //             fileList: data.dto.fileList,
        //             isOwner: data.isOwner, // not data.dto.isOwner

        //            }
        //         )
        //         // this.board.title = data.dto.title;              
        //         // this.content = data.dto.content;
        //         // this.regDt = this.makeDateStr(data.dto.regDt.date.year, data.dto.regDt.date.month, data.dto.regDt.date.day, '.');
        //         // this.userName = data.dto.userName;
        //         // this.readCount = data.dto.readCount;
        //         // this.fileList = data.dto.fileList;
        //         // this.isOwner = data.isOwner; // not data.dto.isOwner
        //       }
        //     })
        //     .catch((error) => {
        //       console.log("DetailModalVue: error ");
        //       console.log(error);
        //     });
        // },
        // 이 곳에서 사용 X
        // makeDateStr : util.makeDateStr,
        changeToUpdate(){
          this.$emit( 'call-parent-change-to-update' );
          // data parameter 사용 X
          // this.$emit(
          //   'call-parent-change-to-update', 
          //   { boardId: this.boardId, title: this.title, content: this.content, fileList: this.fileList}
          // ); // need parameter
        },
        changeToDelete(){
          this.$emit( 'call-parent-change-to-delete' );

          // data parameter 사용 X
          // this.$emit(
          //   'call-parent-change-to-delete', 
          //   { boardId: this.boardId }
          // ); // need parameter
        }
    },

    // 데이터를 가져오는 시점

    // created() 는 modal 생성 시점에 boardId 0 이고 limit, offset, searchWord 없이 요청이 먼저 발생 
    // updated() 는 무한 loop request 발생 <-- request 요청 후, title 등 변경되면 다시 요청 반복
    
    // modal 이 show 되는 시점
    // props 로 boardId 를 받지만 BoardMain 에서  boardId 를 변경 후 바로 modal을 show 하므로 
    // 이전 값( 처음에는 0 ) 으로 요청하는 경우 발생
    // mounted() {
    //   // bootstrap modal show event hook
    //   let $this = this;
    //   this.$el.addEventListener('show.bs.modal', function () {
    //     //alert($this.boardId)
    //     $this.boardDetail();
    //   })
    // },

    
    // props boardId 값이 변경되면!!!
    // 단, 이 경우에는 boardId 가 BoardMain 의 변수 이므로 게시글 등록 후에 boardId 를 0 으로 초기화 해줘야 함.
    // 그렇지 않으면, 글 등록 --> 상세 --> 수정 --> 상세 하게 되면 
    // boardId 가 변경되지 않기 때문에 watch 가 동작하지 않아서, 수정된 내용이 보이지 않게 됨
    // watch: {
    //   boardId : function(){
    //     // 초기화 값이 아닌 경우
    //     if( this.boardId != 0 ){
    //       this.boardDetail();
    //     }        
    //   }
    // }

    
}
</script>

<style scoped>

.modal.in{
padding-right: 0 !important;
}
.modal-dialog {
width: 100%;
max-width:1000px;

padding: 0;

}

.modal-content {

overflow:auto;
}

.modal-header{
margin-bottom:-60px;
position:relative;
z-index:10;
}
.modal-body {
padding-top:70px;
height: 100%;
}

.modal-body .in-content{
border-width:0;
width:100%;
overflow:auto;
}
</style>