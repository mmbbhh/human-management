<template>
  <div id="myTable">
    <el-table
        ref="filterTable"
        :data="userData"
        class="myTable">
      <el-table-column
          prop="workid"
          label="编号">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="Dname"
          label="部门">
      </el-table-column>
      <el-table-column
          prop="Rname"
          label="职位">
      </el-table-column>
      <el-table-column
          prop="user_name"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="user_phone"
          label="电话">
      </el-table-column>
      <el-table-column
          prop="user_age"
          label="年龄">
      </el-table-column>
      <el-table-column
          prop="user_sex"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="user_pay"
          label="薪资">
      </el-table-column>
      <el-table-column
          prop="user_addr"
          label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="提示"
        :visible.sync="dialogConfirm"
        width="30%"
        top="30vh">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirm = false">取 消</el-button>
        <el-button type="primary" @click="disable(form.id)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="编辑用户"
        :visible.sync="dialogEdit"
        width="80%">
      <div class="showEdit">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="员工编号">
            <el-input v-model="form.id" :disabled="true" style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名">
            <el-input v-model="form.name" style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="员工部门">
            <el-select v-model="form.dep" placeholder="请选择部门">
              <el-option label="生产部" :value="1"></el-option>
              <el-option label="销售部" :value="2"></el-option>
              <el-option label="策划部" :value="3"></el-option>
              <el-option label="运营部" :value="4"></el-option>
              <el-option label="财务部" :value="5" :disabled="true"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工职位">
            <el-select v-model="form.position" placeholder="请选择职位">
              <el-option label="人事主管" :disabled="true" :value="1"></el-option>
              <el-option label="部门主管" :value="2"></el-option>
              <el-option label="普通员工" :value="3"></el-option>
              <el-option label="财务总监" :disabled="true" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工名称">
            <el-input v-model="form.user_name" style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="员工电话">
            <el-input v-model="form.tel"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                      maxlength="11"
                      style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="员工年龄">
            <el-input v-model="form.age"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                      maxlength="2"
                      style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="员工性别">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工薪酬">
            <el-input v-model="form.pay"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                      style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="员工地址">
            <el-input v-model="form.addr" style="width: 250px;"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitEdit()">提交修改</el-button>
        <el-button type="danger" @click="disableC()">删除员工</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {delUser} from "../../service/userService";
  import {EditUser} from "../../service/userService";

  export default {
    name: 'myTable',
    data() {
      return {
        dialogEdit: false,
        dialogConfirm: false,
        form: {
          id: '',
          name: '',
          dep: '',
          position: '',
          user_name: '',
          tel: '',
          age: '',
          sex: '',
          pay: '',
          addr: ''
        }
      }
    },
    props: {
      userData: {
        type: Array,
        default: []
      }
    },
    methods: {
      disable(id) {
        delUser(id).then(res => {
          if (res.data.state == 200) {
            this.$message.success(res.data.message)
            this.$emit('refresh')
            this.dialogConfirm = false
            this.dialogEdit = false
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      edit(data) {
        this.form.id = data.workid
        this.form.name = data.name
        this.form.dep = data.id
        this.form.position = data.rid
        this.form.user_name = data.user_name
        this.form.tel = data.user_phone
        this.form.age = data.user_age
        this.form.sex = data.user_sex
        this.form.pay = data.user_pay
        this.form.addr = data.user_addr
        this.dialogEdit = true
      },
      submitEdit() {
        EditUser(this.form).then(res => {
          if (res.data.state == 200) {
            this.$message.success(res.data.message)
            this.$emit('refresh')
            this.dialogConfirm = false
            this.dialogEdit = false
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      disableC() {
        this.dialogConfirm = true
      }
    }
  }
</script>

<style scoped>
  .myTable {
    padding: 20px;
  }
</style>