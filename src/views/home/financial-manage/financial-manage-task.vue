<template>
  <div id="dep-manage-task">
    <bottom :user="1" text="签 到">
      <div slot="title">薪资确认</div>
      <div slot="content">
        <div style="width: 100%; display: flex; justify-content: center; align-items: center">
          <el-button type="primary" @click="dialog = true" icon="el-icon-paperclip">薪资表</el-button>
        </div>
      </div>
    </bottom>


    <el-dialog
        title="薪资表"
        :visible.sync="dialog"
        width="80%">
      <div class="show-dialog">
        <el-table
            id="myTable"
            :data="tableData"
            style="width: 100%">
          <el-table-column
              prop="workid"
              label="员工编号"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="user_pay"
              label="基本薪资"
              width="180">
          </el-table-column>
          <el-table-column
              prop="num"
              label="签到天数"
              width="180">
          </el-table-column>
          <el-table-column
              prop="sum"
              label="合计薪资"
              width="180">
          </el-table-column>
        </el-table>
        <el-button style="margin: 20px" type="primary" @click="exportExcel">导出表格</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import {userFin} from "../../../service/financial";

  export default {
    name: "financial-manage-task",
    components: {
      bottom: () => import('@/components/content/homeCard/sign-card')
    },
    mounted() {
      userFin().then(res => {
        this.tableData = res.data
      })
    },
    data() {
      return {
        dialog: false,
        tableData: {}
      }
    },
    methods: {
      exportExcel () {
        let wb = XLSX.utils.table_to_book(document.querySelector('#myTable'));
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '薪资表.xlsx');
        } catch (e)
        {
          if (typeof console !== 'undefined')
            console.log(e, wbout)
        }
        return wbout
      }
    }
  }
</script>

<style scoped>

</style>