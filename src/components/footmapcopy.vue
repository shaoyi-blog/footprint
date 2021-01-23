<template>
    <div>
        <div id="da" ref="MapMountNode"></div>

    </div>
</template>
<script>

    import echarts from 'echarts'
    import 'echarts/map/js/china'  ///   npm 安装后必须这样引入
    import eventBus from "../utils/eventBus";

    export default {
        data() {
            return {
                myChart: null, // 存放echarts实例
                // datas: [
                //     {name: '海门', value: 30},
                //     {name: '鄂尔多斯', value: 30},
                //     {name: '招远', value: 30},
                //     {name: '舟山', value: 30},
                //     {name: '齐齐哈尔', value: 30},
                //     {name: '盐城', value: 30},
                //     {name: '赤峰', value: 30},
                //
                // ], //  放数据
                // geoCoordMap: {
                //     '海门': [121.15, 31.89],
                //     '鄂尔多斯': [109.781327, 39.608266],
                //     '招远': [120.38, 37.35],
                //     '舟山': [122.207216, 29.985295],
                //     '齐齐哈尔': [123.97, 47.33],
                //     '盐城': [120.13, 33.38],
                //     '赤峰': [118.87, 42.28]
                // }, // 放ip
                mapdata:[
                  {name: '鄂尔多斯', value: [109.781327, 39.608266,30]},
                ]

            }
        },
      methods: {
        updateData(){
          let thats = this //这个this是vue的实例 重新声明一下 好区分evevntBus中的vue实例
          eventBus.$on('eventData', (e) => {
            var newname = e['name']
            var newvalue = e['value']

            thats.datas.push({name:newname, value:newvalue})
            console.log(thats.datas)
            console.log(thats.geoCoordMap)
          })},
            // 绘制地图
          chinaTu(){
              console.log("重新绘图ing")
              var that = this;
              var convertData = this.mapdata
              // var convertData = function (datas) {
              //     var data = datas;
              //     var res = [];
              //     for (var i = 0; i < data.length; i++) {
              //         var geoCoord = that.geoCoordMap[data[i].name];
              //         if (geoCoord) {
              //             res.push({
              //                 name: data[i].name,
              //                 value: geoCoord.concat(data[i].value)
              //             });
              //         }
              //     }
              //     console.log(res);
              //
              //     return res;
              // };  //  主要是convertData 函数  与后台对接主要是更新datas 的数据
              var option = {
                  //backgroundColor: '#404a59',
                  title: {
                      text: '我的旅行足迹',
                      subtext: '我的足迹终将遍布全世界',
                      left: 'center',
                      textStyle: {
                          color: '#e6e6e6'
                      }
                  },

                  // 做了修改  自定义的悬浮方式
                  tooltip: {
                      formatter: function (p) {
                          console.log(p);
                          var text = "旅行小记:真开心";
                          return text;
                      },

                      trigger: 'item'
                  },
                  legend: {
                      orient: 'vertical',
                      y: 'bottom',
                      x: 'right',
                      data: ['pm2.5'],
                      textStyle: {
                          color: '#fff'
					  },
					  show: false
                  },
                  geo: {
                      map: 'china',
                      label: {
                          emphasis: {
                              show: false
                          }
                      },
                      roam: true,
                      itemStyle: {
                          normal: {
                              areaColor: '#e6e6e6',
                              borderColor: '#111'
                          },
                          emphasis: {
                              areaColor: '#cccccc'
                          }
					  },
					  bottom: 0,
					  layoutCenter: ['50%', '50%'],
					// 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
					layoutSize: '100%',
                    zoom : 1.3

                  },
                  series: [
                      {
                          name: 'pm2.5',
                          type: 'scatter',
                          coordinateSystem: 'geo',
                          data: convertData(this.datas),
                          symbolSize: function (val) {
                              return val[2] / 10;
                          },
                          label: {
                              normal: {
                                  formatter: '{b}',
                                  position: 'right',
                                  show: false
                              },
                              emphasis: {
                                  show: true
                              }
                          },
                          itemStyle: {
                              normal: {
                                  color: '#4d4d4d'
                              }
                          }
                      },
                      {
                          name: '预警详情',
                          type: 'effectScatter',
                          coordinateSystem: 'geo',
                          data: convertData(this.datas.sort(function (a, b) {
                              return b.value - a.value;
                          }).slice(0, 3)),// 截取3个点
                          symbolSize: function (val) {


                              return val[2] / 10;

                          },
                          showEffectOn: 'render',
                          rippleEffect: {
                              period: 2.5, // 波纹秒数
                              brushType: 'fill', // stroke (涟漪) fill（扩散）
                              scale: 2, // 波纹范围

                          },
                          hoverAnimation: true,
                          label: {
                              normal: {
                                  formatter: '{b}',
                                  position: 'right',
                                  show: true
                              }
                          },
                          itemStyle: {
                              normal: {
                                  color: '#4d4d4d',
                                  shadowBlur: 10,
                                  shadowColor: '#333'
                              }
                          },
                          zlevel: 1
                      }
                  ]
              };
             this.myChart = echarts.init(document.getElementById("da"));
             this.myChart.setOption(option,true);
              // 直接用这种方法来实现 图表的自适应
              window.addEventListener("resize", () => {  this.myChart .resize();});
          },
        },
        beforeDestroy () {
            // 组件销毁之前清空，释放资源
            if (!this.myChart ) {
                return
            };
            this.myChart.dispose(); //释放资源
            this.myChart = null;
        //   window.removeEventListener('resize', this.chinaTu, 20);

        },

        mounted() {
            this.$nextTick(() => {
              this.updateData(),
              this.chinaTu()
            })
        },
        watch: {
          geoCoordMap:function(newVal, oldVal) {
            if (this.myChart) {
              if (newVal) {
                this.myChart.setOption(newVal);
              } else {
                this.myChart.setOption(oldVal);
              }
            } else {
              this.init();
            }
          },
          deep: true //对象内部属性的监听，关键。
        }
    }
</script>
<style scoped>
    #da {
        width: 100%;
        height: 700px;
        border: 1px solid #333;
    }

</style>
