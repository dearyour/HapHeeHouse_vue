<template>
  <div>
    <b-sidebar
      bg-variant="dark"
      id="sidebar-backdrop"
      aria-labelledby="sidebar-backdrop-title"
      text-variant="light"
      backdrop
      shadow
    >
      <template #default="{ hide }">
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide"
                ><router-link :to="{ name: 'Map' }" class="link"
                  ><b-icon icon="house" font-scale="1"></b-icon> HOME</router-link
                ></b-nav-item
              >
              <b-nav-item href="#link-1" @click="hide"
                ><router-link :to="{ name: 'Qna' }" class="link"
                  ><b-icon icon="journal" font-scale="1"></b-icon> Q&A</router-link
                ></b-nav-item
              >
              <b-nav-item href="#link-1" @click="hide"
                ><router-link :to="{ name: 'Board' }" class="link"
                  ><b-icon icon="journal" font-scale="1"></b-icon> 게시판</router-link
                ></b-nav-item
              >
              <b-nav-item href="#link-1" @click="hide"
                ><router-link :to="{ name: 'MyPage' }" class="link"
                  ><b-icon icon="journal" font-scale="1"></b-icon> 마이페이지</router-link
                ></b-nav-item
              >
            </b-nav>
          </nav>
          <!-- <b-button variant="primary" block @click="hide">Close Sidebar</b-button> -->
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
