window.onload = function() {
    //数据分析界面
    getInCityPie()
    getInCityWageBar();
    getInIndustryPie();
    getInIndustryWageBar();
    getInJob('default');
    getInIndustryCityEducationPie();
    getInCityCompound('default');
    getInList('default');
    //数据预测界面
    getInPrevailingCities(); // 等待接口
    getInPrevailingIndustries(); // 等待接口
    getInIndustryPredictLine();
    getInCityPredictLine();
    getInEducationPredictLine();
    //数据监控界面
    getInIndustryWageAndJobQueryStack();
    getInCityWageAndJobQueryBar();
    getInCityIndustryEducationQueryStack();
}


// 城市岗位占比饼图
function getInCityPie() {
    var city_pie = echarts.init(document.getElementById('city_pie'), 'light');
    var city_pie_data = [];
    var city_name = [];
    $.ajax({
        url: "http://114.55.245.217:5000/getCityPie ",
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                // console.log(data.cityPie)
                var j = 0;
                for (i = 0; i < data.cityPie.length / 2; i++) {
                    city_pie_data[j] = data.cityPie[i];
                    j = j + 2;
                }
                j = 1;
                for (i = Math.floor(data.cityPie.length / 2); i < data.cityPie.length; i++) {
                    city_pie_data[j] = data.cityPie[i];
                    j = j + 2;
                }
                var city_pie_option = {
                        title: {
                            text: '城市岗位数量占比',
                            // subtext: '纯属虚构',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        // legend: {
                        //     type: 'scroll',
                        //     orient: 'vertical',
                        //     right: 10,
                        //     top: 20,
                        //     bottom: 20,
                        //     data: city_name,
                        // },
                        series: [{
                            name: '城市名:',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
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
            }
        },
    });
}


// 城市薪资柱状图
function getInCityWageBar() {
    var city_wage = echarts.init(document.getElementById('city_wage'), 'light');
    var city_Wage_data = [];
    $.ajax({
        url: "http://114.55.245.217:5000/getCityWage ",
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                for (var i = 0; i < 15; i++) {
                    city_Wage_data[i] = data.cityWage[i];
                }
                // city_Wage_data = data.cityWage;
                var city_wage_option = {
                    title: {
                        text: '城市薪资柱状图',
                        // subtext: '纯属虚构',
                        left: 'left'

                    },
                    legend: {},
                    tooltip: {},
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    dataset: {
                        dimensions: ['cityName', '平均薪资', '中位薪资'],
                        source: city_Wage_data
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0
                        }
                    },
                    yAxis: { name: '元/月', },
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [{
                        type: 'bar'
                    }, {
                        type: 'bar'
                    }, ]
                };
                // 使用刚指定的配置项和数据显示图表。
                city_wage.setOption(city_wage_option);
            }
        },
    });
}


// 行业岗位占比饼图
function getInIndustryPie() {
    var industry_pie = echarts.init(document.getElementById('industry_pie'), 'light');
    var industry_pie_data = [];
    var industry_name = [];
    $.ajax({
        url: "http://114.55.245.217:5000/getIndustryPie ",
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                // city_pie_data = JSON.stringify(data.cityPie);
                industry_pie_data = data.IndustryPie;
                for (i = 0; i < data.IndustryPie.length; i++) {
                    industry_name[i] = industry_pie_data[i].name;
                }
                var industry_pie_option = {
                    title: {
                        text: '行业岗位数量占比',
                        // subtext: '纯属虚构',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    // legend: {
                    //     type: 'scroll',
                    //     orient: 'vertical',
                    //     right: 10,
                    //     top: 20,
                    //     bottom: 20,
                    //     data: industry_name
                    // },
                    series: [{
                        name: '行业名:',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: industry_pie_data,
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
                industry_pie.setOption(industry_pie_option);
            }
        },
    });
}


// 行业薪资柱状图
function getInIndustryWageBar() {
    var industry_wage = echarts.init(document.getElementById('industry_wage'), 'light');
    var industry_Wage_data = [];
    $.ajax({
        url: "http://114.55.245.217:5000/getIndustryWage ",
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                industry_Wage_data = data.IndustryWage;
                var industry_wage_option = {
                    title: {
                        text: '行业薪资柱状图',
                        // subtext: '纯属虚构',
                        left: 'left'

                    },
                    legend: {},
                    tooltip: {},
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    dataset: {
                        dimensions: ['IndustryName', '中位薪资', '平均薪资'], // cityName待改正
                        source: industry_Wage_data
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        }
                    },
                    yAxis: {
                        name: '元/月'
                    },
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [{
                        type: 'bar'
                    }, {
                        type: 'bar'
                    }, ]
                };
                // 使用刚指定的配置项和数据显示图表。
                industry_wage.setOption(industry_wage_option);
            }
        },
    });
}

// 地图薪资按钮点击时的请求
function getInJob(mark) {
    var mapdata = [];
    var sel_in = document.getElementById('industry_select_1').value;
    $.ajax({
        url: "http://114.55.245.217:5000/getIndustryMap/" + sel_in,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                if (mark === 'search') {
                    $.ajax({
                        url: "http://114.55.245.217:5000/IndustryNumBuried/" + sel_in,
                        type: "get",
                        data: {},
                        dataType: "json",
                        success: function(data) {

                        }
                    });
                }
                mapdata = [{
                        name: "南海诸岛",
                        value: 0
                    }, {
                        name: '北京',
                        value: 0
                    }, {
                        name: '天津',
                        value: 0
                    }, {
                        name: '上海',
                        value: 0
                    }, {
                        name: '重庆',
                        value: 0
                    }, {
                        name: '河北',
                        value: 0
                    }, {
                        name: '河南',
                        value: 0
                    }, {
                        name: '云南',
                        value: 0
                    }, {
                        name: '辽宁',
                        value: 0
                    }, {
                        name: '黑龙江',
                        value: 0
                    }, {
                        name: '湖南',
                        value: 0
                    }, {
                        name: '安徽',
                        value: 0
                    }, {
                        name: '山东',
                        value: 0
                    }, {
                        name: '新疆',
                        value: 0
                    }, {
                        name: '江苏',
                        value: 0
                    }, {
                        name: '浙江',
                        value: 0
                    }, {
                        name: '江西',
                        value: 0
                    }, {
                        name: '湖北',
                        value: 0
                    }, {
                        name: '广西',
                        value: 0
                    }, {
                        name: '甘肃',
                        value: 0
                    }, {
                        name: '山西',
                        value: 0
                    }, {
                        name: '内蒙古',
                        value: 0
                    }, {
                        name: '陕西',
                        value: 0
                    }, {
                        name: '吉林',
                        value: 0
                    }, {
                        name: '福建',
                        value: 0
                    }, {
                        name: '贵州',
                        value: 0
                    }, {
                        name: '广东',
                        value: 0
                    }, {
                        name: '青海',
                        value: 0
                    }, {
                        name: '西藏',
                        value: 0
                    }, {
                        name: '四川',
                        value: 0
                    }, {
                        name: '成都',
                        value: 0
                    }, {
                        name: '宁夏',
                        value: 0
                    }, {
                        name: '海南',
                        value: 0,
                    }, {
                        name: '台湾',
                        value: 0
                    }, {
                        name: '香港',
                        value: 0
                    }, {
                        name: '澳门',
                        value: 0
                    }]
                    // var in_mapdata = [];
                var max_job = -1;　　　　
                for (var i in data.mapdata[0]) {　　
                    let city = i; //获取到上海北京这些城市名
                    let pro_name;
                    //判断属于哪个省份
                    provinces.forEach((item, index) => {
                        item.city.forEach((itt, idx) => {
                            if (itt.name.search(city) != -1) {
                                pro_name = item.name;
                            }
                        })
                    })
                    mapdata.forEach((it, idx) => {
                        if (pro_name) {
                            if (pro_name.search(it.name) != -1) {
                                it.value = it.value + data.mapdata[0][i].num; //岗位数
                                if (data.mapdata[0][i].mid > max_job) {
                                    max_job = data.mapdata[0][i].num;
                                }
                            }
                        }
                    })　
                }　　　　
                var mapChart = echarts.init(document.getElementById('map'));
                mapoption = {
                    tooltip: {
                        formatter: function(params, ticket, callback) {
                                return params.seriesName + '<br />' + params.name + '：' + params.value
                            } //数据格式化
                    },
                    title: {
                        text: sel_in + '岗位数全国分布图',
                        // subtext: '纯属虚构',
                        left: 'center'

                    },
                    visualMap: {
                        min: 0,
                        // max: max_job,
                        max: 1000,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'], //取值范围的文字
                        inRange: {
                            color: ['#e0ffff', '#006edd'] //取值范围的颜色
                        },
                        show: true //图注
                    },
                    geo: {
                        map: 'china',
                        roam: false, //不开启缩放和平移
                        zoom: 1.23, //视角缩放比例
                        label: {
                            normal: {
                                show: true,
                                fontSize: '10',
                                color: 'rgba(0,0,0,0.7)'
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            emphasis: {
                                areaColor: '#F3B329', //鼠标选择区域颜色
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    series: [{
                        name: '岗位数量',
                        type: 'map',
                        geoIndex: 0,
                        data: mapdata
                    }]
                };
                // console.log(mapdata)
                mapChart.setOption(mapoption);
                mapChart.on('click', function(params) {
                    alert(params.name);
                });
            }
        },
    });
}

// 地图岗位按钮点击查询时的请求
function getInWage() {
    var mapdata = [];
    var sel_in = document.getElementById('industry_select_1').value;
    $.ajax({
        url: "http://114.55.245.217:5000/getIndustryMap/" + sel_in,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                $.ajax({
                    url: "http://114.55.245.217:5000/IndustryWageBuried/" + sel_in,
                    type: "get",
                    data: {},
                    dataType: "json",
                    success: function(data) {

                    }
                });
                mapdata = [{
                        name: "南海诸岛",
                        value: 0
                    }, {
                        name: '北京',
                        value: 0
                    }, {
                        name: '天津',
                        value: 0
                    }, {
                        name: '上海',
                        value: 0
                    }, {
                        name: '重庆',
                        value: 0
                    }, {
                        name: '河北',
                        value: 0
                    }, {
                        name: '河南',
                        value: 0
                    }, {
                        name: '云南',
                        value: 0
                    }, {
                        name: '辽宁',
                        value: 0
                    }, {
                        name: '黑龙江',
                        value: 0
                    }, {
                        name: '湖南',
                        value: 0
                    }, {
                        name: '安徽',
                        value: 0
                    }, {
                        name: '山东',
                        value: 0
                    }, {
                        name: '新疆',
                        value: 0
                    }, {
                        name: '江苏',
                        value: 0
                    }, {
                        name: '浙江',
                        value: 0
                    }, {
                        name: '江西',
                        value: 0
                    }, {
                        name: '湖北',
                        value: 0
                    }, {
                        name: '广西',
                        value: 0
                    }, {
                        name: '甘肃',
                        value: 0
                    }, {
                        name: '山西',
                        value: 0
                    }, {
                        name: '内蒙古',
                        value: 0
                    }, {
                        name: '陕西',
                        value: 0
                    }, {
                        name: '吉林',
                        value: 0
                    }, {
                        name: '福建',
                        value: 0
                    }, {
                        name: '贵州',
                        value: 0
                    }, {
                        name: '广东',
                        value: 0
                    }, {
                        name: '青海',
                        value: 0
                    }, {
                        name: '西藏',
                        value: 0
                    }, {
                        name: '四川',
                        value: 0
                    }, {
                        name: '成都',
                        value: 0
                    }, {
                        name: '宁夏',
                        value: 0
                    }, {
                        name: '海南',
                        value: 0,
                    }, {
                        name: '台湾',
                        value: 0
                    }, {
                        name: '香港',
                        value: 0
                    }, {
                        name: '澳门',
                        value: 0
                    }]
                    // var in_mapdata = [];　　
                var max_wage = -1;　　
                for (var i in data.mapdata[0]) {　　
                    let city = i; //获取到上海北京这些城市名
                    let pro_name;
                    //判断属于哪个省份
                    provinces.forEach((item, index) => {
                        item.city.forEach((itt, idx) => {
                            if (itt.name.search(city) != -1) {
                                pro_name = item.name;
                            }
                        })
                    })
                    mapdata.forEach((it, idx) => {
                        if (pro_name) {
                            if (pro_name.search(it.name) != -1) {
                                it.value = data.mapdata[0][i].mid; //中位薪资数
                                if (data.mapdata[0][i].mid > max_wage) {
                                    max_wage = data.mapdata[0][i].mid;
                                }
                            }
                        }
                    })　
                }　　　　
                var mapChart = echarts.init(document.getElementById('map'));
                mapoption = {
                    title: {
                        text: sel_in + '薪资全国分布图',
                        // subtext: '纯属虚构',
                        left: 'center'

                    },
                    tooltip: {
                        formatter: function(params, ticket, callback) {
                                return params.seriesName + '<br />' + params.name + '：' + params.value
                            } //数据格式化
                    },
                    visualMap: {
                        min: 0,
                        // max: max_wage,
                        max: 20000,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'], //取值范围的文字
                        inRange: {
                            color: ['#e0ffff', '#006edd'] //取值范围的颜色
                        },
                        show: true //图注
                    },
                    geo: {
                        map: 'china',
                        roam: false, //不开启缩放和平移
                        zoom: 1.23, //视角缩放比例
                        label: {
                            normal: {
                                show: true,
                                fontSize: '10',
                                color: 'rgba(0,0,0,0.7)'
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            emphasis: {
                                areaColor: '#F3B329', //鼠标选择区域颜色
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    series: [{
                        name: '中位薪资',
                        type: 'map',
                        geoIndex: 0,
                        data: mapdata
                    }]
                };
                console.log(mapdata)
                mapChart.setOption(mapoption);
                mapChart.on('click', function(params) {
                    alert(params.name);
                });
            }
        },
    });
}

//从业人员学历分布图点击查询
function getInIndustryCityEducationPie() {
    var city = document.getElementById('city_select_5').value;
    var type = document.getElementById('industry_select_4').value;
    var sel_in = "?location=" + city + "&type=" + type;
    $.ajax({
        url: "http://114.55.245.217:5000/getEducation" + sel_in,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                var industry_city_education_pie = echarts.init(document.getElementById('industry_city_education_pie'), 'light');
                var legend_data = [];
                var series_data = [];
                var chart_data = data.eduPie[0];
                ['大专', '本科', '硕士', '博士'].forEach(function(education) {
                    if (chart_data.hasOwnProperty(education)) {
                        legend_data.push(education);
                        series_data.push({ value: chart_data[education], name: education });
                    }
                })

                var industry_city_education_pie_option = {
                    title: {
                        text: '从业人员学历分布图',
                        left: 'center',
                        align: 'right',
                        padding: [5, 10]
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        data: legend_data, //['大专', '本科', '硕士', '博士'],
                        bottom: 0
                    },
                    series: [{
                        name: '学历要求',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        data: series_data
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                industry_city_education_pie.setOption(industry_city_education_pie_option);
            }
        },
    });

}


//城市行业薪资与岗位数量复合图点击查询时的请求
function getInCityCompound(mark) {
    var industry_wage_compound = echarts.init(document.getElementById('industry_wage_compound'), 'light');
    var sel_in = document.getElementById('city_select_1').value;
    $.ajax({
        url: "http://114.55.245.217:5000/getCityMap/" + sel_in,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                if (mark === 'search') {
                    $.ajax({
                        url: "http://114.55.245.217:5000/CityBuried/" + sel_in,
                        type: "get",
                        data: {},
                        dataType: "json",
                        success: function(data) {

                        }
                    });
                }
                let xaxis_data = [];
                let yaxis_average = [];
                let yaxis_mid = [];
                let yaxis_num = [];
                for (var industry in data.mapdata[0]) {
                    xaxis_data.push(industry);
                    yaxis_average.push(data.mapdata[0][industry]['average'])
                    yaxis_num.push(data.mapdata[0][industry]['num'])
                    yaxis_mid.push(data.mapdata[0][industry]['mid'])
                }

                var maxY1 = Math.max.apply(Math, yaxis_num)
                var maxY2 = Math.max.apply(Math, yaxis_average);
                var maxY3 = Math.max.apply(Math, yaxis_mid);

                var industry_wage_compound_option = {
                    title: {
                        text: sel_in + '各行业岗位和薪资图',
                        //subtext: '纯属虚构',
                        left: 'center',
                        align: 'right'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    grid: {
                        right: '15%'
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    legend: {
                        data: ['中位薪资', '平均薪资'],
                        left: 10,
                        top: 0,
                        bottom: 20,
                    },
                    xAxis: [{
                        type: 'category',
                        data: xaxis_data, //['前端', '后端', '运维', '算法', '产品', '运营', '高级管理', '设计', '销售', '人事', '物流', '市场', '金融', '医疗健康', '其他'],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: 60
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '岗位数量',
                        min: 0,
                        max: Math.ceil(maxY1 * 1.2),
                        interval: Math.ceil(maxY1 * 1.2 / 6),
                    }, {
                        type: 'value',
                        name: '平均薪资',
                        min: 0,
                        max: Math.ceil(maxY2 * 1.2),
                        interval: Math.ceil(maxY2 * 1.2 / 6),
                    }, {
                        type: 'value',
                        name: '中位薪资',
                        min: 0,
                        max: Math.ceil(maxY3 * 1.2),
                        interval: Math.ceil(maxY3 * 1.2 / 6),
                        offset: 60,
                    }],
                    series: [{
                        name: '岗位数量',
                        type: 'bar',
                        data: yaxis_num //[126, 722, 121, 348, 967, 504, 222, 312, 734, 295]
                    }, {
                        name: '平均薪资',
                        type: 'line',
                        yAxisIndex: 1,
                        data: yaxis_average //[19891, 22947, 13718, 6789, 13066, 13013, 7828, 16471, 19346, 8180]
                    }, {
                        name: '中位薪资',
                        type: 'line',
                        yAxisIndex: 2,
                        data: yaxis_mid //[28109, 10427, 23300, 25720, 10319, 25420, 24303, 19816, 8776, 26984]
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                industry_wage_compound.setOption(industry_wage_compound_option);
            } else if (data.code == -1) {
                alert("暂无数据, 十分抱歉!")
            }
        },
    });
}

//工作信息列表加载时的默认请求
function getInList(mark) {
    var city = document.getElementById('city_select_3').value;
    var type = document.getElementById('industry_select_3').value;
    var education = document.getElementById('education_select_1').value;
    var sel_in = "?location=" + city + "&type=" + type + "&education=" + education;
    var table = document.getElementById('information_table');
    var body = document.getElementById('information_table_body');
    table.removeChild(body);
    $.ajax({
        url: "http://114.55.245.217:5000/getListData" + sel_in,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                if (mark === 'search') {
                    $.ajax({
                        url: "http://114.55.245.217:5000/listBuried" + sel_in,
                        type: "get",
                        data: {},
                        dataType: "json",
                        success: function(data) {

                        }
                    });
                }
                var body = document.createElement('tbody');
                body.setAttribute('id', 'information_table_body');
                for (let key in data.jobList) {
                    var data_row = data.jobList[key];
                    var new_tr = document.createElement('tr');
                    var id_td = document.createElement('td')
                    var job_td = document.createElement('td')
                    var company_td = document.createElement('td')
                    var city_td = document.createElement('td')
                    var education_td = document.createElement('td')
                    var salary_td = document.createElement('td')
                    var time_td = document.createElement('td')
                    id_td.innerHTML = parseInt(key) + 1;
                    job_td.innerHTML = data_row['jobName'];
                    company_td.innerHTML = data_row['companyName'];
                    city_td.innerHTML = data_row['cityName'];
                    education_td.innerHTML = data_row['edu'];
                    salary_td.innerHTML = data_row['salary'].split('-').map(function(bound) { return parseInt(bound * 10) + 'k' }).join('-');
                    time_td.innerHTML = data_row['putdata'];
                    new_tr.appendChild(id_td);
                    new_tr.appendChild(job_td);
                    new_tr.appendChild(company_td);
                    new_tr.appendChild(city_td);
                    new_tr.appendChild(education_td);
                    new_tr.appendChild(salary_td);
                    new_tr.appendChild(time_td);
                    body.appendChild(new_tr);
                }
                table.appendChild(body);
            }
        },
    });
}

function setCityDefault(obj) {
    if (obj.value === '') {
        return '北京';
    } else {
        return obj.value;
    }
}

function setIndustryDefault(obj) {
    if (obj.value === '') {
        return '前端';
    } else {
        return obj.value;
    }
}

function changeInput_industry_select_1(obj) {
    // console.log($(obj)[0].innerHTML);
    document.getElementById('industry_select_1').value = $(obj)[0].innerHTML;
}

function changeInput_industry_select_2(obj) {
    // console.log($(obj)[0].innerHTML);
    document.getElementById('industry_select_2').value = $(obj)[0].innerHTML;
}

function changeInput_city_select_1(obj) {
    // console.log($(obj)[0].innerHTML);
    document.getElementById('city_select_1').value = $(obj)[0].innerHTML;
}

function changeInput_city_select_2(obj) {
    // console.log($(obj)[0].innerHTML);
    document.getElementById('city_select_2').value = $(obj)[0].innerHTML;
}



//以下为数据预测页面相关内容

//前十热门城市
function getInPrevailingCities() {
    var table = document.getElementById('prevailing_cities_table');
    var body = document.getElementById('prevailing_cities_table_body');
    data = {
        code: 1,
        cityList: {
            '0': {
                cityName: '杭州',
                wageIncreasingRate: '6.70%',
                jobIncreasingRate: '8.48%',
                rank_status: 'droping',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '1': {
                cityName: '上海',
                wageIncreasingRate: '7.03%',
                jobIncreasingRate: '6.50%',
                rank_status: 'droping',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '2': {
                cityName: '武汉',
                wageIncreasingRate: '4.59%',
                jobIncreasingRate: '8.82%',
                rank_status: 'droping',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '3': {
                cityName: '重庆',
                wageIncreasingRate: '6.52%',
                jobIncreasingRate: '6.14%',
                rank_status: 'rising',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '4': {
                cityName: '西安',
                wageIncreasingRate: '7.21%',
                jobIncreasingRate: '4.18%',
                rank_status: 'droping',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '5': {
                cityName: '广州',
                wageIncreasingRate: '5.99%',
                jobIncreasingRate: '5.16%',
                rank_status: 'rising',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '6': {
                cityName: '深圳',
                wageIncreasingRate: '6.66%',
                jobIncreasingRate: '2.50%',
                rank_status: 'rising',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '7': {
                cityName: '南京',
                wageIncreasingRate: '-4.60%',
                jobIncreasingRate: '6.55%',
                rank_status: 'droping',
                job_status: 'rising',
                wage_status: 'droping'
            },
            '8': {
                cityName: '北京',
                wageIncreasingRate: '-2.84%',
                jobIncreasingRate: '4.61%',
                rank_status: 'droping',
                job_status: 'rising',
                wage_status: 'droping'
            },

            '9': {
                cityName: '厦门',
                wageIncreasingRate: '-10.91%',
                jobIncreasingRate: '7.10%',
                rank_status: 'droping',
                job_status: 'rising',
                wage_status: 'droping'
            },



        }
    }
    for (let key in data.cityList) {
        var data_row = data.cityList[key];
        var new_tr = document.createElement('tr');
        var rank_td = document.createElement('td');
        var city_td = document.createElement('td');
        var wage_td = document.createElement('td');
        var img_wage = document.createElement('img');
        img_wage.setAttribute('src', './fonts/' + data.cityList[key]['wage_status'] + '.svg');
        img_wage.setAttribute('style', 'width: 24px;');
        var job_td = document.createElement('td');
        var img_job = document.createElement('img');
        img_job.setAttribute('src', './fonts/' + data.cityList[key]['job_status'] + '.svg');
        img_job.setAttribute('style', 'width: 24px;');
        rank_td.innerHTML = parseInt(key) + 1;
        city_td.innerHTML = data_row['cityName'];
        wage_td.innerHTML = data_row['wageIncreasingRate'];
        wage_td.appendChild(img_wage);
        job_td.innerHTML = data_row['jobIncreasingRate'];
        job_td.appendChild(img_job);
        new_tr.appendChild(rank_td);
        new_tr.appendChild(city_td);
        new_tr.appendChild(wage_td);
        new_tr.appendChild(job_td);
        body.appendChild(new_tr);
    }
    table.appendChild(body);
}

//前十热门行业
function getInPrevailingIndustries() {
    var table = document.getElementById('prevailing_industries_table');
    var body = document.getElementById('prevailing_industries_table_body');
    data = {
        code: 1,
        industryList: {
            '0': {
                industryName: '数据',
                wageIncreasingRate: '6.42%',
                jobIncreasingRate: '9.92%',
                rank_status: 'rising',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '1': {
                industryName: '产品',
                wageIncreasingRate: '8.84%',
                jobIncreasingRate: '4.88%',
                rank_status: 'droping',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '2': {
                industryName: '运营',
                wageIncreasingRate: '2.30%',
                jobIncreasingRate: '8.71%',
                rank_status: 'rising',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '3': {
                industryName: '前端',
                wageIncreasingRate: '4.41%',
                jobIncreasingRate: '6.43%',
                rank_status: 'droping',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '4': {
                industryName: '销售',
                wageIncreasingRate: '5.96%',
                jobIncreasingRate: '3.44%',
                rank_status: 'rising',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '5': {
                industryName: '物流',
                wageIncreasingRate: '4.69%',
                jobIncreasingRate: '4.56%',
                rank_status: 'rising',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '6': {
                industryName: '设计',
                wageIncreasingRate: '3.30%',
                jobIncreasingRate: '5.86%',
                rank_status: 'rising',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '7': {
                industryName: '后端',
                wageIncreasingRate: '1.78%',
                jobIncreasingRate: '1.39%',
                rank_status: 'droping',
                job_status: 'rising',
                wage_status: 'rising'
            },
            '8': {
                industryName: '运维',
                wageIncreasingRate: '-2.46%',
                jobIncreasingRate: '4.27%',
                rank_status: 'rising',
                job_status: 'rising',
                wage_status: 'droping'
            },
            '9': {
                industryName: '人事',
                wageIncreasingRate: '-2.11%',
                jobIncreasingRate: '1.50%',
                rank_status: 'droping',
                job_status: 'rising',
                wage_status: 'droping'
            },


        }
    }
    for (let key in data.industryList) {
        var data_row = data.industryList[key];
        var new_tr = document.createElement('tr');
        var rank_td = document.createElement('td');
        var industry_td = document.createElement('td');
        var wage_td = document.createElement('td');
        var img_wage = document.createElement('img');
        img_wage.setAttribute('src', './fonts/' + data.industryList[key]['wage_status'] + '.svg');
        img_wage.setAttribute('style', 'width: 24px;');
        var job_td = document.createElement('td');
        var img_job = document.createElement('img');
        img_job.setAttribute('src', './fonts/' + data.industryList[key]['job_status'] + '.svg');
        img_job.setAttribute('style', 'width: 24px;');
        rank_td.innerHTML = parseInt(key) + 1;
        industry_td.innerHTML = data_row['industryName'];
        wage_td.innerHTML = data_row['wageIncreasingRate'];
        wage_td.appendChild(img_wage);
        job_td.innerHTML = data_row['jobIncreasingRate'];
        job_td.appendChild(img_job);
        new_tr.appendChild(rank_td);
        new_tr.appendChild(industry_td);
        new_tr.appendChild(wage_td);
        new_tr.appendChild(job_td);
        body.appendChild(new_tr);
    }
    table.appendChild(body);
}

//数据预测界面行业预测图点击查询
function getInIndustryPredictLine() {
    // 基于准备好的dom，初始化echarts实例
    var industry_predict_line = echarts.init(document.getElementById('industry_predict_line'), 'light');
    var industry = document.getElementById('industry_select_2').value;
    var sel_in = '?type=' + industry;
    $.ajax({
        url: "http://114.55.245.217:5000/getIndustryPre" + sel_in,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                var chart_data = data.cityPie;
                var map = { num: '岗位数量', salary: '薪资' };
                // console.log(chart_data);
                let num_arr = [];
                let salary_arr = [];
                for (var index in chart_data) {

                    num_arr.push(chart_data[index]['num']);
                    salary_arr.push(chart_data[index]['salary']);
                }
                var max_num = Math.max.apply(Math, num_arr);
                var min_num = Math.min.apply(Math, num_arr);
                var max_salary = Math.max.apply(Math, salary_arr);
                var min_salary = Math.min.apply(Math, salary_arr);

                var industry_predict_line_option = {
                    title: {
                        text: industry + '岗位薪资和岗位数量预测图',
                        // subtext: '纯属虚构',
                        left: 'center',
                        align: 'right'
                    },
                    legend: {
                        data: ['num', 'salary'],
                        left: 10,
                        formatter: function(name) {
                            return map[name];
                        }
                    },
                    dataZoom: [{
                        show: true,
                        realtime: true,
                        start: 65,
                        end: 85
                    }, {
                        type: 'inside',
                        realtime: true,
                        start: 65,
                        end: 85
                    }],
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(data) {
                            var tip = data[0].value['date'] + '<br/>' + '岗位数量: ' + data[0].value['num'] + '<br/>' + '薪资: ' + data[0].value['salary'];
                            return tip;
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    dataset: {
                        dimensions: ['date', 'salary', 'num'], // cityName待改正
                        source: chart_data
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 20
                        }
                    },
                    yAxis: [{
                        name: '薪资(元)',
                        min: Math.ceil(min_salary),
                        max: Math.ceil(max_salary),
                        interval: Math.round((max_salary - min_salary) / 5),
                        // type: 'value',
                        // max: 30000
                    }, {
                        name: '数量',
                        min: Math.ceil(min_num),
                        max: Math.ceil(max_num),
                        interval: Math.round((max_num - min_num) / 5),
                        // type: 'value',
                        // max: 200,
                    }],
                    series: [{
                        type: 'line'
                    }, {
                        type: 'line',
                        yAxisIndex: 1,
                    }, ]
                };
                // 使用刚指定的配置项和数据显示图表。
                industry_predict_line.setOption(industry_predict_line_option);
            }
        }
    });
}

//数据预测界面城市预测图点击查询
function getInCityPredictLine() {
    // 基于准备好的dom，初始化echarts实例
    var city_predict_line = echarts.init(document.getElementById('city_predict_line'), 'light');
    var city = document.getElementById('city_select_2').value;
    var sel_in = '?location=' + city;
    $.ajax({
        url: "http://114.55.245.217:5000/getCityPre" + sel_in,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                var chart_data = data.cityPie;
                var map = { num: '岗位数量', salary: '薪资' };
                // console.log(chart_data);
                let num_arr = [];
                let salary_arr = [];
                for (var index in chart_data) {

                    num_arr.push(chart_data[index]['num']);
                    salary_arr.push(chart_data[index]['salary']);
                }
                var max_num = Math.max.apply(Math, num_arr);
                var min_num = Math.min.apply(Math, num_arr);
                var max_salary = Math.max.apply(Math, salary_arr);
                var min_salary = Math.min.apply(Math, salary_arr);

                var city_predict_line_option = {
                    title: {
                        text: city + '岗位薪资和岗位数量预测图',
                        // subtext: '纯属虚构',
                        left: 'center',
                        align: 'right'
                    },
                    legend: {
                        data: ['num', 'salary'],
                        left: 10,
                        formatter: function(name) {
                            return map[name];
                        }
                    },
                    dataZoom: [{
                        show: true,
                        realtime: true,
                        start: 65,
                        end: 85
                    }, {
                        type: 'inside',
                        realtime: true,
                        start: 65,
                        end: 85
                    }],
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(data) {
                            var tip = data[0].value['date'] + '<br/>' + '岗位数量: ' + data[0].value['num'] + '<br/>' + '薪资: ' + data[0].value['salary'];
                            return tip;
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    dataset: {
                        dimensions: ['date', 'salary', 'num'], // cityName待改正
                        source: chart_data
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 20
                        }
                    },
                    yAxis: [{
                        name: '薪资(元)',
                        min: Math.ceil(min_salary),
                        max: Math.ceil(max_salary),
                        interval: Math.round((max_salary - min_salary) / 5),
                        // type: 'value',
                        // max: 30000
                    }, {
                        name: '数量',
                        min: Math.ceil(min_num),
                        max: Math.ceil(max_num),
                        interval: Math.round((max_num - min_num) / 5),
                        // type: 'value',
                        // max: 200,
                    }],
                    series: [{
                        type: 'line'
                    }, {
                        type: 'line',
                        yAxisIndex: 1,
                    }, ]
                };
                // 使用刚指定的配置项和数据显示图表。
                city_predict_line.setOption(city_predict_line_option);
            }
        }
    });
}

//不同学历的岗位薪资和数量预测图点击查询
function getInEducationPredictLine() {
    var education_predict_line = echarts.init(document.getElementById('education_predict_line'), 'light');
    var education = document.getElementById('education_select_2').value;
    var sel_in = '?education=' + education;
    $.ajax({
        url: "http://114.55.245.217:5000/getEduPre" + sel_in,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                var chart_data = data.cityPie;
                var map = { num: '岗位数量', salary: '薪资' };
                // console.log(chart_data);
                let num_arr = [];
                let salary_arr = [];
                for (var index in chart_data) {

                    num_arr.push(chart_data[index]['num']);
                    salary_arr.push(chart_data[index]['salary']);
                }
                var max_num = Math.max.apply(Math, num_arr);
                var min_num = Math.min.apply(Math, num_arr);
                var max_salary = Math.max.apply(Math, salary_arr);
                var min_salary = Math.min.apply(Math, salary_arr);

                var education_predict_line_option = {
                    title: {
                        text: education + '岗位薪资和岗位数量预测图',
                        // subtext: '纯属虚构',
                        left: 'center',
                        align: 'right'
                    },
                    legend: {
                        data: ['num', 'salary'],
                        left: 10,
                        formatter: function(name) {
                            return map[name];
                        }
                    },
                    dataZoom: [{
                        show: true,
                        realtime: true,
                        start: 65,
                        end: 85
                    }, {
                        type: 'inside',
                        realtime: true,
                        start: 65,
                        end: 85
                    }],
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(data) {
                            var tip = data[0].value['date'] + '<br/>' + '岗位数量: ' + data[0].value['num'] + '<br/>' + '薪资: ' + data[0].value['salary'];
                            return tip;
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    dataset: {
                        dimensions: ['date', 'salary', 'num'], // cityName待改正
                        source: chart_data
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 20
                        }
                    },
                    yAxis: [{
                        name: '薪资(元)',
                        min: Math.ceil(min_salary),
                        max: Math.ceil(max_salary),
                        interval: Math.round((max_salary - min_salary) / 5),
                        // type: 'value',
                        // max: 30000
                    }, {
                        name: '数量',
                        min: Math.ceil(min_num),
                        max: Math.ceil(max_num),
                        interval: Math.round((max_num - min_num) / 5),
                        // type: 'value',
                        // max: 200,
                    }],
                    series: [{
                        type: 'line'
                    }, {
                        type: 'line',
                        yAxisIndex: 1,
                    }, ]
                };
                // 使用刚指定的配置项和数据显示图表。
                education_predict_line.setOption(education_predict_line_option);
            }
        }
    });
}



//以下为数据监控页面相关内容
//数据监控页面各行业岗位薪资和岗位数查询次数
function getInIndustryWageAndJobQueryStack() {
    $.ajax({
        url: "http://114.55.245.217:5000/getIndustryBuried",
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                var chart_data = data.cityPie;
                var map = { num: '岗位数量', wage: '薪资' };
                var industry_wage_and_job_query_stack = echarts.init(document.getElementById('industry_wage_and_job_query_stack'), 'light');
                var industry_wage_and_job_query_stack_option = {
                    title: {
                        text: '各行业岗位薪资和岗位数查询次数',
                        left: 'center',
                        align: 'right'
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(data) {
                            var tip = data[0].value['name'] + '<br/>' + '岗位数量: ' + data[0].value['num'] + '<br/>' + '薪资: ' + data[0].value['wage'];
                            return tip;
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    legend: {
                        data: ['num', 'wage'],
                        left: 10,
                        formatter: function(name) {
                            return map[name];
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    dataset: {
                        dimensions: ['name', 'num', 'wage'],
                        source: chart_data
                    },
                    xAxis: [{
                        type: 'category',
                        // data: ['前端', '运维', '算法', '产品', '运营', '设计', '销售', '人事', '物流', '市场', '金融', '医疗健康', '高级管理', '其他行业']
                    }],
                    yAxis: [{
                        name: '次数(查询)',
                        type: 'value'
                    }],
                    series: [{
                        // name: '薪资',
                        type: 'bar',
                        stack: '数据',
                        // data: [8367, 7419, 7259, 7883, 5134, 6405, 7003, 9411, 6925, 6352, 9918, 7034, 9133, 6150]
                    }, {
                        // name: '岗位数',
                        type: 'bar',
                        stack: '数据',
                        // data: [7141, 5191, 9805, 7118, 9543, 7030, 9930, 6287, 5780, 6709, 7814, 6036, 5901, 7775]
                    }]
                };
                industry_wage_and_job_query_stack.setOption(industry_wage_and_job_query_stack_option);
            }
        }
    });
}

//数据监控页面各城市行业薪资和岗位数量查询次数
function getInCityWageAndJobQueryBar() {
    $.ajax({
        url: "http://114.55.245.217:5000/getCityBuried",
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                var chart_data = data.cityPie;
                var city_wage_and_job_query_bar = echarts.init(document.getElementById('city_wage_and_job_query_bar'), 'light');
                var city_wage_and_job_query_bar_option = {
                    title: {
                        text: '各城市查询次数',
                        // subtext: '暂时虚构',
                        left: 'center',
                        align: 'right'
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            return '查询次数' + '<br />' + params[0].name + ': ' + params[0].data.value;
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    dataset: {
                        dimensions: ['name', 'value'],
                        source: chart_data
                    },
                    xAxis: {
                        type: 'category',
                        //data: ['北京', '上海', '广州', '深圳', '武汉', '杭州', '重庆', '南京', '宁波', '天津', '合肥', '长沙', '大连'],
                        axisLabel: {
                            interval: 0,
                            rotate: 45
                        }
                    },
                    yAxis: {
                        name: '次数(查询)',
                        type: 'value',
                    },
                    series: [{
                        // data: [35709, 41100, 44547, 47697, 34821, 34252, 42352, 44406, 47697, 34821, 45194, 41100, 34821],
                        type: 'bar'
                    }]
                };
                city_wage_and_job_query_bar.setOption(city_wage_and_job_query_bar_option);
            }
        }
    });
}

//数据监控页面不同学历的用户对城市与行业的倾向图点击查询
function getInCityIndustryEducationQueryStack() {
    var city = document.getElementById('city_select_4').value;
    var sel_in = '?location=' + city;
    $.ajax({
        url: "http://114.55.245.217:5000/getListBuried" + sel_in,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                var chart_data = data.eduPie[0];

                var industry_list = ['前端', '后端', '运维', '数据', '产品', '运营', '设计', '销售', '人事', '物流', '市场', '金融', '医疗健康', '高级管理', '其他'];
                var education_list = ['大专', '本科', '硕士', '博士'];
                var education_per_list = [];
                education_list.forEach(function(education) {
                    education_per_list[education] = [];
                });
                industry_list.forEach(function(industry) {
                    education_list.forEach(function(education) {
                        if (chart_data[industry].hasOwnProperty(education)) {
                            education_per_list[education].push(chart_data[industry][education])
                        } else {
                            education_per_list[education].push(0);
                        }
                    })
                })

                var city_industry_education_query_stack = echarts.init(document.getElementById('city_industry_education_query_stack'), 'light');
                var city_industry_education_query_stack_option = {
                    title: {
                        text: '不同学历的用户对' + city + '各行业的倾向',
                        //subtext: '暂时虚构',
                        left: 'center',
                        align: 'right'
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        data: education_list,
                        top: 25
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: industry_list,
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        }
                    }],
                    yAxis: [{
                        name: '次数(查询)',
                        type: 'value'
                    }],
                    series: [{
                        name: '大专',
                        type: 'bar',
                        stack: '学历',
                        data: education_per_list['大专']
                    }, {
                        name: '本科',
                        type: 'bar',
                        stack: '学历',
                        data: education_per_list['本科']
                    }, {
                        name: '硕士',
                        type: 'bar',
                        stack: '学历',
                        data: education_per_list['硕士']
                    }, {
                        name: '博士',
                        type: 'bar',
                        stack: '学历',
                        data: education_per_list['博士']
                    }]
                };
                city_industry_education_query_stack.setOption(city_industry_education_query_stack_option);
            }
        }
    });
}

function changeInput_city_select_4(obj) {
    // console.log($(obj)[0].innerHTML);
    document.getElementById('city_select_4').value = $(obj)[0].innerHTML;
}