<template>
  <div id="app">
    <el-form label-width="200px">
      <el-form-item label="足迹" required class="housing_input">
        <el-input
          id="suggestId"
          v-model="city"
          placeholder="请输入到达过的地方，点亮地图"
          name="address_detail"
        />
        <div id="allmap"/>
        <el-button @click="add_housing">点亮</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import eventBus from "../utils/eventBus";
export default {
  name: "addInfo",
  data() {
    return {
      city: "",
      address_detail: null, //详细地址
      add_addr_map: {},
      lng: 0.0,
      lat: 0.0,
      oriInputCity :""
    };
  },
  mounted() {
    this.getcity();
  },
  methods: {
    getcity() {
      this.$nextTick(function () {

        console.log("look at me")
        var th = this;
        // 创建Map实例
        var map = new BMap.Map("allmap");
        // 初始化地图,设置中心点坐标，
        var point = new BMap.Point(120.211877, 30.255194); // 创建点坐标，汉得公司的经纬度坐标
        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom();

        var ac = new BMap.Autocomplete({ // 建立一个自动完成的对象
          input: "suggestId",
          location: map,
        });
        var myValue;
        var oriInputCity;
        ac.addEventListener("onconfirm", function (e) {
          // 鼠标点击下拉列表后的事件
          var _value = e.item.value; //获取点击的条目
          myValue =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business; //地址拼接赋给一个变量
          th.oriInputCity  =th.city
          th.city = th.oriInputCity +"：（详细地址： "+myValue+")"; //将地址赋给data中的city
          console.log(th.oriInputCity);
          console.log(th.city);

          setPlace();
          function  setPlace(){
            console.log('123');
            function myFun(){
              th.userlocation = local.getResults().getPoi(0).point // 获取第一个智能搜索的结果
              console.log(th.userlocation)
            }

            var local = new BMap.LocalSearch(map, { // 智能搜索
              onSearchComplete: myFun
            })
            local.search(myValue)
            // 测试输出坐标（指的是输入框最后确定地点的经纬度）
          }
        })


      },)
    },
    // 新增小区 点击的地址增加进list
    add_housing() {
      let lng = this.userlocation.lng;
      let lat = this.userlocation.lat;
      this.add_addr_map={name:this.oriInputCity, value:[lng,lat,30 ]};
      console.log(lng)
      console.log(this.add_addr_map)
      eventBus.$emit("eventData",this.add_addr_map);
      this.add_addr_map =null
    },

  },
};
</script>

<style scoped>
.housingList {
  margin-top: 20px;
}

.delete_button {
  color: #409eff;
  text-decoration: underline;
  border: none;
  background: #fff;
  cursor: pointer;
  margin-left: 20px;
}

.el-input {
  width: 800px;
}

.housing_input .el-input {
  width: 730px;
}

#allmap {
  width: 400px;
  height: 400px;
  font-family: "微软雅黑";
  display: none;
}
</style>
