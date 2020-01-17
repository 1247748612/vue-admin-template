<!-- 组件说明 -->
<template>
  <div>
    <el-button style="width: 100%">
      <el-table
        ref="multipleTable"
        :data="helperList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="创建日期"
          width="200"
        >
          <template slot-scope="scope">{{ (scope.row.createdDate || new Date()) | formatTime }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="账号"
          width="120"
        />
        <el-table-column
          prop="password"
          label="密码"
          width="120"
        />
        <el-table-column
          prop="nickname"
          label="姓名"
          width="120"
        />
        <el-table-column
          label="最后一次登录时间"
          width="200"
        >
          <template slot-scope="scope">
            <div>
              {{ (scope.row.lastLoginTime || scope.row.createDate ) | formatTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="当前状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              <el-tag>
                {{ scope.row.status === 0 ? '在线' : '离线' }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="deleteHelper">删除选中客服</el-button>
        <el-button @click="cancelSelected">取消选择</el-button>
      </div>
    </el-button>
  </div>
</template>

<script>
import { deleteHelper } from '@/api/helper'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: {

  },
  filters: {
    formatTime(time) {
      return moment(time).format('YYYY年M月D日')
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters(['helperList'])
  },
  created() {
  },
  methods: {
    deleteHelper() {
      const data = this.multipleSelection.map((item) => {
        return item.id
      })
      console.log(data)
      deleteHelper(data).then((response) => {
        this.$message({ type: 'success', message: response.msg })
        setTimeout(() => {
          this.$store.dispatch('login_routes/updateRoutes')
        }, 1500)
        console.log(response, '删除成功')
      }).catch((error) => {
        this.$message.fail('删除失败')
        console.log(error, '删除失败')
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    cancelSelected() {
      this.$refs.multipleTable.clearSelection()
    }
  }
}
</script>

<style lang='scss' scoped>
//@import url()

</style>
