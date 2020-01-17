<!-- 组件说明 -->
<template>
  <div id="message-main" class="message-main">
    <div v-if="messageList.length">
      <div v-for="(item, key) in messageList" :key="key">
        <div v-if="item.showTime" class="message-time">
          <span class="time">{{ item.createdDate | formatTime }}</span>
        </div>
        <message-box :message-item="item" :type="item.sessionId !== userSessionId ? 'me' : 'other'" />
      </div>
    </div>
    <div v-else class="no-message">
      没有历史消息
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import MessageBox from './MessageBox'
moment.locale('zh-cn')
export default {
  components: {
    MessageBox
  },
  filters: {
    formatTime: function(time) {
      // console.log(moment(time).calendar())
      return moment(time).calendar()
    }
  },
  props: {
    messageList: {
      type: Array,
      required: true
    },
    userSessionId: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
  @import "~@/styles/mixin.scss";
  .message-main {
    position: relative;
    height: 500px;
    overflow-y: scroll;
    background-color: #ecedf1;
    .message-time {
      padding: 10px 0;
      text-align: center
    }
    .no-message {
      @include center;
    }
  }
</style>
