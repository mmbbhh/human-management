<template>
  <div id="dep-manage-task">
    <bottom :user="1" text="个人签到">
      <div slot="title">签到确认</div>
      <div slot="content">
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 700px; transform: translateY(-10px)"
            height="200px"
            border
            @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="80">
          </el-table-column>
          <el-table-column
              prop="date"
              label="日期"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              width="180">
          </el-table-column>
          <el-table-column
              label="操作"
              show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-check" circle @click="submit(scope.row,1)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="submit(scope.row,-1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button type="primary" round @click="checkSelection(1)">确认选中签到</el-button>
          <el-button type="danger" round @click="checkSelection(-1)">拒绝选中签到</el-button>
        </div>
      </div>
    </bottom>
  </div>
</template>

<script>
  import { checkSign, submitSign } from "../../../service/sign";
  import { signInfo } from "../../../service/sign";

  export default {
    name: "dep-manage-card",
    components: {
      bottom: () => import('@/components/content/homeCard/sign-card')
    },
    mounted() {
      checkSign().then(res => {
        const mySign = signInfo.create(res.data)
        this.tableData = mySign.content
      })
    },
    data() {
      return {
        tableData: [],
        multipleSelection: []
      }
    },
    methods: {
      checkSelection(type) {
        let array = new Array()
        for (let item of this.multipleSelection) {
          array.push(item.id)
        }
        if (array.length == 0) {
          this.$message({
            message: '请选中至少一项',
            offset: 110
          })
        } else {
          submitSign(array, type).then(res => {
            if (res.data.state == 200) {
              checkSign().then(res => {
                const mySign = signInfo.create(res.data)
                this.tableData = mySign.content
              })
              this.$message.success({
                message: res.data.message,
                offset: 110
              })
            } else {
              this.$message.error({
                message: res.data.message,
                offset: 110
              })
            }
          })
        }
      },
      submit(row, type) {
        let id = []
        id.push(row.id)
        submitSign(id, type).then(res => {
          if (res.data.state == 200) {
            checkSign().then(res => {
              const mySign = signInfo.create(res.data)
              this.tableData = mySign.content
            })
            this.$message.success({
              message: res.data.message,
              offset: 110
            })
          } else {
            this.$message.error({
              message: res.data.message,
              offset: 110
            })
          }
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style scoped>

</style>