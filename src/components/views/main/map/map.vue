<template>
  <div>
     <div id="map" style="height: 600px;height: 500px; marign:30px 0;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return{}
  },

  created() {
  },
  mounted() {
    let chartOption = this.$echarts.init(document.getElementById("map"));
    // 进行相关配置
    chartOption = {
      tooltip: {
        // 鼠标移到图里面的浮动提示框
        formatter(params, ticket, callback) {
          // params.data 就是series配置项中的data数据遍历
          // let localValue, perf, downloadSpeep, usability, point;
          let localValue;
          if (params.mapData) {
            localValue = params.mapData.all_cnt;
          } else {
            // 为了防止没有定义数据的时候报错写的
            localValue = 0;
          }

          let htmlStr = `
           <div style='font-size:18px;'> ${params.name}</div>
           <p style='text-align:left;margin-top:-10px;'>
	           区域对应数据value：${localValue}<br/>
           </p>
         `;
          return htmlStr;
        }
        // backgroundColor:"#ff7f50",//提示标签背景颜色
        // textStyle:{color:"#fff"} //提示标签字体颜色
      },
      // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
      visualMap: {
        // 左下角的颜色区域
        type: "piecewise", // 定义为分段型 visualMap
        min: 0,
        max: 100,
        itemWidth: 10, // 图形的宽度，即每个小块的宽度
        itemHeight: 10,
        realtime: false,
        calculable: true,
        itemGap: 5,
        textStyle: {
          fontSize: 10
        },
        bottom: 60,
        left: 20,
        inRange: {
          color: [
            "#ffffff",
            "#E0DAFF",
            "#ADBFFF",
            "#9CB4FF",
            "#6A9DFF",
            "#3889FF"
          ]
        }
      },
      geo: {
        // 地理坐标系组件用于地图的绘制
        map: "china", // 表示中国地图
        // roam: true, // 是否开启鼠标缩放和平移漫游
        zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
        label: {
          show: true
        },
        itemStyle: {
          // 地图区域的多边形 图形样式。
          borderColor: "rgba(0, 0, 0, 0.2)",
          emphasis: {
            // 高亮状态下的多边形和标签样式
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          dataView: {
            readOnly: false
          },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: "人数", // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
          type: "map",
          geoIndex: 0,
          label: {
            show: true
          },
          // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
          data: this.arr
          //  data: [{
          //       name: '北京',
          //       value: 32,
          //     }, {
          //       name: '天津',
          //       value: 22
          //     }
        }
      ]
    };
    // 使用刚指定的配置项和数据显示地图数据
    this.chinachart.setOption(chartOption);
    // 处理点击事件并且弹出数据名称
    map.on('click', function (params) {
        alert(params.name);
    })
}
}
</script>

<style lang="less" scoped>
</style>