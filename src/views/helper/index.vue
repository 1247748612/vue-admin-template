<!-- 组件说明 -->
<template>
  <div class="helper-wrapper">

    <user-sidebar v-if="users.length" :users="users">
      <message-panel ref="message-panel" :user-session-id="userSessionId" :message-list="messageList" />
    </user-sidebar>
    <div v-else class="no-data">没有用户与此客服有联系</div>
  </div>
</template>

<script>

import { Loading } from 'element-ui'
import UserSidebar from './component/UserSidebar'
import MessagePanel from './component/MessagePanel'
import { getHelperUser, deleteUser } from '@/api/helper'
import { getHelperAndUserMessage, deleteAllMessage } from '@/api/history-message'

export default {
  provide() {
    return {
      getHelperAndUserMessage: this.getHelperAndUserMessage,
      setUserSessionId: this.setUserSessionId,
      deleteAllMessage: this.deleteAllMessage,
      deleteUser: this.deleteUser
    }
  },
  components: {
    UserSidebar,
    MessagePanel
  },
  props: {
    helperId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      messageList: [], // 消息列表
      users: [], // 用户列表
      userSessionId: ''
    }
  },
  computed: {

  },
  watch: {
  },
  created() {
    this.getHelperUser()
    console.log(this.helperId, 'helperId')
  },
  methods: {
    getHelperUser() {
      // 传入helperId
      getHelperUser(this.helperId).then((response) => {
        const { data } = response
        this.users = data
        if (data.length) {
          console.log(data[0], '第一次')
          this.setUserSessionId(data[0].sessionId)
          this.getHelperAndUserMessage(data[0].id)
        }
        console.log(response, '所有用户获取成功')
      }).catch((error) => {
        this.users = []
        console.log(error, '所有用户获取失败')
      })
    },
    getHelperAndUserMessage(userId) {
      const options = {
        text: '正在加载······',
        target: this.$el
      }
      const loadingInstance = Loading.service(options)

      const params = {
        helperId: this.helperId,
        userId
      }
      // 先为空
      this.messageList = []
      getHelperAndUserMessage(params).then((res) => {
        const data = res.data.records
        console.log(res)
        if (!data || !data.length) {
          loadingInstance.close()
          return
        }
        data.sort((a, b) => {
          return a.createdDate - b.createdDate
        })
        this.setShowMessageTime(data)
        loadingInstance.close()
        console.log(res, '获取历史消息')
      }).catch((err) => {
        loadingInstance.close()
        console.log(err, '失败')
      })
    },
    setShowMessageTime(data) {
      // 默认第一个展示时间
      let flag = data[0]
      data[0].showTime = true

      data.forEach((msgItem, index) => {
        const differenceMinute = (msgItem.createdDate - flag.createdDate) / (1000 * 60)
        // console.log(differenceMinute)
        if (differenceMinute > 3) {
          // console.log(data[index + 1])
          data[index].showTime = true
        }
        flag = msgItem
      })
      console.log(data)
      this.messageList = data
    },
    setUserSessionId(sessionId) {
      this.userSessionId = sessionId
      console.log(this.userSessionId)
    },
    deleteAllMessage() {
      const deleteIdList = []
      this.messageList.forEach((item) => {
        deleteIdList.push(item.id)
      })
      deleteAllMessage(deleteIdList).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.messageList = []
      }).catch((error) => {
        console.log(error)
        this.$message({
          message: '删除失败',
          type: 'danger'
        })
      })
    },
    deleteUser(id) {
      deleteUser(id).then((response) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getHelperUser()
      }).catch((error) => {
        console.log(error)
        this.$message({
          message: '删除失败',
          type: 'danger'
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  @import "~@/styles/mixin.scss";
  .helper-wrapper {
    // display: inline-block;
    position: relative;
    height: calc(100vh - 50px);
    .no-data {
      @include center;
    }
  }
</style>
