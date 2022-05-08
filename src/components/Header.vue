<template>
  <el-row>
    <el-col :span="4">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="16">
      <div class="aaa">
        <div style="text-align: center">
          <el-menu>
            <el-menu-item class="xxx">文件处理工具</el-menu-item>
          </el-menu>
          <el-divider></el-divider>
          <el-upload :action="filesUploadUrl" :on-success="sucessFiles">
            <el-button size="small" type="primary">点击上传文件</el-button>
          </el-upload>
          <el-form label-width="80px" style="margin: 20px 0">
            <el-form-item label="File Url:">
              <el-input v-model="result">sss</el-input>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
        </div>
        <div style="text-align: center">
          <el-col :span="4">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-button type="primary" @click="downloadFiles()">文件下载</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div >
              <el-button type="primary" @click="videoToMusic()">视频转音频</el-button>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>
<script>

import axios from "axios";

export default {
  name: "Header",
  data() {
    return {
      result: [],
      filesUploadUrl: "http://localhost:9999/upload"
    }
  },
  methods: {
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
.xxx {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

/*.bg-purple {*/
/*  background: #d3dce6;*/
/*}*/

.grid-content {
  border-radius: 4px;
  min-height: 36px;

}

/*.aaa {*/
/*  background: darkcyan;*/
/*}*/

.el-col-16 {
  width: 66.66667%;
  background: cadetblue;
}


</style>