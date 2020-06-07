<template>
  <div id="human">
    <div class="title">
      人员管理
    </div>
    <div class="hd">
      <el-row :gutter="18">
        <el-col :span="6">
          <div><el-select v-model="part" slot="prepend" placeholder="部门">
            <el-option label="生产部" value="1"></el-option>
            <el-option label="销售部" value="2"></el-option>
            <el-option label="策划部" value="3"></el-option>
            <el-option label="运营部" value="4"></el-option>
            <el-option label="财务部" value="5"></el-option>
          </el-select></div>
        </el-col>
        <el-col :span="6">
          <div><el-select v-model="age" slot="prepend" placeholder="年龄">
            <el-option label="20 以下" value="1"></el-option>
            <el-option label="20 - 30" value="2"></el-option>
            <el-option label="30 - 40" value="3"></el-option>
            <el-option label="40 - 50" value="4"></el-option>
            <el-option label="50 以上" value="5"></el-option>
          </el-select></div>
        </el-col>
        <el-col :span="6">
          <div class="test"><el-button type="primary" @click="submit()">提交</el-button></div>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="test" style="display: flex; flex-direction: row-reverse">
        <el-button type="primary" @click="addForm = true">添加</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="bd">
      <myTable @refresh="re()" :userData="showData"></myTable>
    </div>


    <el-dialog
        title="添加用户"
        :visible.sync="addForm"
        width="80%">
      <div class="showEdit">
        <el-form ref="form" :model="form" label-width="80px">
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
          <el-form-item label="员工密码">
            <el-input show-password v-model="form.password" style="width: 120px;"></el-input>
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
        <el-button type="primary" @click="add()">确认添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { allUser,addUser } from "../../service/userService";
  export default {
    name: "human",
    mounted() {
      allUser().then(res => {
        this.userData = res.data
        this.showData = res.data
      })
    },
    data() {
      return {
        part: '',
        age: '',
        userData: [],
        showData: [],
        addForm: false,
        form: {}
      }
    },
    methods: {
      submit() {
        if (this.part == '' && this.age == '') {
          this.$message.error({
            message: "请选择筛选的内容",
            offset: 110
          })
        } else {
          let tmp = []
          for (let item of this.userData) {
            if (this.part == '' || item.id == this.part) {
              if (this.age != '') {
                if (this.age == 1 && item.user_age < 20) {
                  tmp.push(item)
                } else if (this.age == 2 && 20 < item.user_age && item.user_age <= 30) {
                  tmp.push(item)
                } else if (this.age == 3 && 30 < item.user_age && item.user_age <= 40) {
                  tmp.push(item)
                } else if (this.age == 4 && 40 < item.user_age && item.user_age <= 50) {
                  tmp.push(item)
                } else if (this.age == 5 && 50 < item.user_age) {
                  tmp.push(item)
                }
              } else {
                tmp.push(item)
              }
            }
          }
          this.showData = tmp
        }
      },
      re() {
        allUser().then(res => {
          this.userData = res.data
          this.showData = res.data
        })
      },
      add() {
        if (this.form.name == null||this.form.dep == null||this.form.position == null||this.form.user_name == null||this.form.password == null||this.form.age==null||this.form.tel==null||this.form.sex==null||this.form.pay==null||this.form.addr==null) {
          this.$message.error("请输入完整的信息")
        } else {
          addUser(this.form).then(res => {
            if (res.data.state == 200) {
              this.$message.success(res.data.message)
              this.addForm = false
              this.re()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      }
    },
    components: {
      myTable: () => import('./myTable')
    }
  }
</script>

<style scoped>
  .title {
    padding: 20px 0 0 30px;
    font-size: 25px;
    font-weight: bold;
    color: #7C9AAD;
  }

  .el-row {
    width: 800px;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
    margin: 0 20px;
  }

  .hd {
    display: flex;
  }

  .test {
    border-radius: 4px;
    min-height: 36px;
  }
</style>