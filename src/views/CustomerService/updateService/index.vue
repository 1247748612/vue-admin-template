<!-- 组件说明 -->
<template>
  <div class="update-service">
    <div class="left">
      <div class="title">
        <span>
          修改客服信息
        </span>
      </div>
      <el-select v-model="updateId" placeholder="请选择要修改的客服">
        <el-option
          v-for="item in helperList"
          :key="item.id"
          :label="item.nickname"
          :value="item.id"
        />
      </el-select>
    </div>
    <div class="right">
      <div class="form">
        <el-form ref="AddHelperForm" :model="form" :rules="rules" label-position="top" label-width="120px">
          <el-form-item required label="账号" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item required label="密码" prop="password">
            <el-input v-model="form.password" type="password" />
          </el-form-item>
          <el-form-item required label="昵称" prop="nickname">
            <el-input v-model="form.nickname" />
          </el-form-item>
          <el-form-item required label="头像地址" prop="iconUrl">
            <el-input v-model="form.iconUrl" />
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="createHelper">立即修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { updateHelper } from '@/api/helper'
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  data() {
    return {
      updateId: null,
      form: {
        name: '',
        nickname: '',
        password: '',
        iconUrl: ''
      },
      rules: {
        name: { required: true, message: '账号名不能为空', trigger: 'blur' },
        nickname: { required: true, message: '昵称不能为空', trigger: 'blur' },
        password: { required: true, message: '密码不能为空', trigger: 'blur' },
        iconUrl: { required: true, message: '头像地址不能为空', trigger: 'blur' }
      }
    }
  },
  computed: {
    ...mapGetters(['helperList'])
  },
  watch: {
    updateId(newVal, oldVal) {
      if (!newVal) {
        return
      }
      const data = this.helperList.filter((item) => {
        return item.id === newVal
      }).pop()
      console.log(data)
      this.form.name = data.name
      this.form.nickname = data.nickname
      this.form.password = data.password
      this.form.iconUrl = data.iconUrl
    }
  },
  methods: {
    createHelper() {
      this.$refs['AddHelperForm'].validate((valid) => {
        if (valid) {
          const data = { id: this.updateId, ...this.form }
          updateHelper(data).then((response) => {
            this.$message({ message: response.msg, type: 'success' })
            this.$refs['AddHelperForm'].resetFields()
            this.$store.dispatch('login_routes/updateRoutes')
            this.updateId = null
          }).catch((error) => {
            this.$message({ message: '请补充完整数据', type: 'danger' })
            console.log(error, '添加失败')
          })
        } else {
          this.$message.error('请补充完整数据')
          console.log('error submit!!')
          return false
        }
      })
    },
    reset() {
      this.$refs['AddHelperForm'].resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>
//@import url()
  .update-service {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .left {
      .title {
        margin: 30px 0;
        text-align: center;
        span {
          font-size: 32px;
          font-weight: bold;
        }
      }
      text-align: center;
    }
    .right {
      flex: 1;
      .form {
        width: 100%;
        max-width: 400px;
        margin: 30px auto;
      }

    }
  }
</style>
