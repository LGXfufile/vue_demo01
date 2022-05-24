<template>
  <el-container>
    <el-header>
      <new-header/>
    </el-header>
    <el-main>
      <div class="yyy">
        <el-input v-model="result.title" class="inputStyle" placeholder="请输入要查询的影视剧名"></el-input>
        <el-button type="primary" @click="searchOne" class="btnStyle">搜索</el-button>
        <el-button type="success" icon="el-icon-download">
          数据导出
        </el-button>
      </div>
      <div class="zzz">
        aaa
      </div>


    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import NewHeader from "./NewHeader";
import axios from "axios";

export default {
  name: "Context",
  components: {NewHeader},
  data() {
    return {
      source: {
        src: 'E:\\javaLearn\\vue\\vue_demo01\\wechatImg.jpg'
      },
      // ruleForm: {
      //   pass: '',
      //   checkPass: '',
      //   age: ''
      // },
      dialogVisible: false,
      cur_page: 1,
      pageSize: 20,
      pagination: {
        defaultPageSize: 12,
      },
      result: {
        title: ""
      },
      baseUrl: "http://localhost:8081",
      filesUploadUrl: "http://localhost:9999/upload",
      tableData: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      console.log(`当前页: ${val}`);
    },
    exportData() {
      // this.$http.post(this.baseUrl+"/selectOne",this.result,{
      //   responseType: "blob"
      // })
      if (this.result.title.length == 0) {
        this.$message.error('搜索内容为空，无数据导出');
      } else {
        axios.post(this.baseUrl + "/selectOne", this.result)
            .then(res => {
              /* 方式1，文件名随机
              let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
              let url = window.URL.createObjectURL(blob);
              window.location.href = url;
              */
              /* 方式2，支持IE10；文件名自定义
               */
              let blob = new Blob([res.data.data], {type: "application/vnd.ms-excel"}); // 将服务端返回的文件流（二进制）excel文件转化为blob
              let fileName = "学生列表.xls";

              if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                // IE
                window.navigator.msSaveOrOpenBlob(blob, fileName);
              } else {
                let objectUrl = (window.URL || window.webkitURL).createObjectURL(
                    blob
                );
                let downFile = document.createElement("a");
                downFile.style.display = "none";
                downFile.href = objectUrl;
                downFile.download = fileName; // 下载后文件名
                document.body.appendChild(downFile);
                downFile.click();
                document.body.removeChild(downFile); // 下载完成移除元素
                // window.location.href = objectUrl
                window.URL.revokeObjectURL(objectUrl); // 只要映射存在，Blob就不能进行垃圾回收，因此一旦不再需要引用，就必须小心撤销URL，释放掉blob对象。
              }
            })
      }


    },
    initData() {
      axios.get(this.baseUrl + "/selectAll")
          .then(res => {
            console.log(res.data)
            this.tableData = res.data.data
            console.log(this.tableData)
          })
    },
    search() {
      axios.get().then(res => {
        console.log(res.data)
      })
    },
    searchOne() {
      axios.post(this.baseUrl + "/selectOne", this.result)
          .then(res => {

            console.log(res.data)
            this.tableData = res.data.data
            console.log(this.tableData)

          })
    },

    sucessFiles(response) {
      console.log(response)
      this.result = response
    },
    downloadFiles() {
      console.log(this.result);
      axios.get(this.result).then(res => {
        console.log(res.data)
        // if(!res.data){
        //   return
        // }
        // var name = this.date
        // var blob = new Blob([res.data]);
        // var url = window.URL.createObjectURL(blob);
        // var aLink = document.createElement("a");
        // aLink.style.display = "none";
        // aLink.href = url;
        // aLink.setAttribute("download", name);
        // document.body.appendChild(aLink);
        // aLink.click();
        // document.body.removeChild(aLink); //下载完成移除元素
        // window.URL.revokeObjectURL(url); //释放掉blob对象
      })

    },
    videoToMusic() {
      axios.get(this.result + "/videoToMusic").then(res => {
        console.log(res.data)

      })

    }
  }

}
</script>

<style scoped>
.zzz{
  height: 80%;
}
.zzStyle {
  width: 80%;
  margin: 20px;
}

.imgStyle {
  margin: 10px 20px;
  width: 80%;
  width: 80%;
}
.yyy{
  height: 20%;
}
.yyyyyy {
  text-align: center;
  margin: 70px 0;
  height: 20px;
}

.inputStyle {
  width: 350px;
  margin: 0 50px;
}

.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  /*字体高度*/
  line-height: 40px;
  /*footer高度*/
  height: 40px !important;
}

.el-header {
  background-color: #B3C0D1;
  text-align: center;
  line-height: 60px;
  color: #333;
  height: 55px !important;
  position: fixed;
  width: 100%;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: calc(100vh - 95px);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>