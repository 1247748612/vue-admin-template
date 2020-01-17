<!-- 组件说明 -->
<template>
  <div class="user-sidebar">
    <el-tabs :tab-position="tabPosition" class="tabs" @tab-click="handleTab">
      <el-tab-pane v-for="(user, index) in users" :key="index" :label="user.name">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ user.name }}</span>
            <el-button style="float: right; padding: 3px" type="text" @click="deleteUser(user.id)">删除用户</el-button>
            <el-button style="float: right; padding: 3px 0" type="text" @click="deleteAllMessage">删除该用户聊天记录</el-button>
          </div>
          <div class="content">
            <slot />
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import x from ''
export default {
  inject: ['getHelperAndUserMessage', 'setUserSessionId', 'deleteAllMessage', 'deleteUser'],
  components: {
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tabPosition: 'left'
    }
  },
  computed: {

  },
  methods: {
    handleTab(tab, even) {
      const user = this.users[+tab.index]
      this.setUserSessionId(user.sessionId)
      this.getHelperAndUserMessage(user.id)
      console.log(tab, even)
    }
  }
}
</script>

<style lang='scss' scoped>
//@import url()
  .user-sidebar {
    height: 100%;
    .tabs {
      height: 100%;
      /deep/ .el-tabs__content, .el-tab-pane{
        height: 100%;
      }
    }
    .box-card {
      height: 100%;
      // box-sizing: border-box;
      margin: 10px 10px 0 0;
      // max-width: 500px;
      .content {
        height: 100%;
      }
    }
  }
</style>
