<!-- 组件说明 -->
<template>
  <div class="add-service">
    <div class="title">
      <span>
        添加客服
      </span>
    </div>
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
          <el-button type="primary" @click="createHelper">立即创建</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addHelper } from '@/api/helper'
export default {
  components: {

  },
  data() {
    return {
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

  },
  methods: {
    createHelper() {
      this.$refs['AddHelperForm'].validate((valid) => {
        if (valid) {
          console.log(this.form)
          addHelper(this.form).then((response) => {
            this.$message({ message: response.msg, type: 'success' })
            this.$refs['AddHelperForm'].resetFields()
            this.$store.dispatch('login_routes/updateRoutes')
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
  .add-service {
    width: 100%;
    .title {
      margin-top: 30px;
      text-align: center;
      span {
        font-size: 32px;
        font-weight: bold;
      }
    }
    .form {
      max-width: 400px;
      margin: 30px auto;
    }
  }
</style>
