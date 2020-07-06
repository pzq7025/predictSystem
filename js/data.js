// 基于准备好的dom，初始化echarts实例
var city_pie = echarts.init(document.getElementById('city_pie'), 'light');
var city_pie_data = [{
    value: 29201,
    name: '北京'
}, {
    value: 26536,
    name: '上海'
}, {
    value: 24952,
    name: '深圳'
}, {
    value: 15723,
    name: '杭州'
}];
$.ajax({
    url: "http://49.234.154.17:5555/model_search.php", //填一下登录接口就好了
    type: "post", // 提交方式
    data: { "search_text": '图书馆' }, // data为String类型，必须为 Key/Value 格式。
    dataType: "json", // 服务器端返回的数据类型
    xhrFields: {
        withCredentials: true // 这里设置了withCredentials
    },
    success: function(data) {
        // console.log(data);
        if (data.code == 200) {
            city_pie_data = JSON.stringify(data.products);
        }
    },
});
var city_pie_option = {
    title: {
        text: '城市岗位数量占比',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['北京', '上海', '广州', '深圳', '杭州']
    },
    series: [{
        name: '城市名:',
        type: 'pie',
        radius: '55%',
        center: ['40%', '50%'],
        data: city_pie_data,
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
}

// 使用刚指定的配置项和数据显示图表。
city_pie.setOption(city_pie_option);