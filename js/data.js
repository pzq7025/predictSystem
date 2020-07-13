window.onload = function() {
//数据分析界面
    getInCityPie()
    getInCityWageBar();
    getInIndustryPie();
    getInIndustryWageBar();
    getInJob();
    getInIndustryCityEducationPie();  // 等待接口
    getInCityCompound();
    getInList();
//数据预测界面
    getInPrevailingCities();  // 等待接口
    getInPrevailingIndustries(); // 等待接口
    getInIndustryPredictLine();  // 等待接口
    getInCityPredictLine();  // 等待接口
//数据监控界面
    getInCityIndustryEducationQueryStack();  // 等待接口
    getInCityWageAndJobQueryBar();  // 等待接口
    getInIndustryWageAndJobQueryStack(); // 等待接口
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
        success: function (data) {
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
        success: function (data) {
            if (data.code == 1) {
                console.log(data.cityWage)
                // for (i = 0; i < 25; i++) {
                //     city_Wage_data[i] = data.cityWage[i];
                // }
                city_Wage_data = data.cityWage;
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
                        source: city_Wage_data,
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0
                        }
                    },
                    yAxis: {name: '元/月',},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [{
                        type: 'bar'
                    }, {
                        type: 'bar'
                    },]
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
        success: function (data) {
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
                        center: ['50%', '50%'],
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
        success: function (data) {
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
                        dimensions: ['cityName', '平均薪资', '中位薪资'], // cityName待改正
                        source: industry_Wage_data
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        }
                    },
                    yAxis: {name: '元/月',},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [{
                        type: 'bar'
                    }, {
                        type: 'bar'
                    },]
                };
                // 使用刚指定的配置项和数据显示图表。
                industry_wage.setOption(industry_wage_option);
            }
        },
    });
}

// 地图薪资按钮点击时的请求
function getInJob() {
    var mapdata = [];
    var sel_in = document.getElementById('industry_select_1').value;
    $.ajax({
        url: "http://114.55.245.217:5000/getIndustryMap/" + sel_in,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
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
                console.log(mapdata)
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
function getInIndustryCityEducationPie(){
    // 基于准备好的dom，初始化echarts实例
    var industry_city_education_pie = echarts.init(document.getElementById('industry_city_education_pie'), 'light');
    var industry_city_education_pie_option = {
        title: {
            text: '从业人员学历分布图',
            //subtext: '暂时虚构',
            left: 'center',
            align: 'right',
            padding: [5, 10]
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            data: ['大专', '本科', '硕士', '博士'],
            bottom: 0
        },
        series: [{
            name: '学历要求',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            data: [{
                value: 335,
                name: '大专'
            }, {
                value: 310,
                name: '本科'
            }, {
                value: 234,
                name: '硕士'
            }, {
                value: 135,
                name: '博士'
            }]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    industry_city_education_pie.setOption(industry_city_education_pie_option);
}


//城市行业薪资与岗位数量复合图点击查询时的请求
function getInCityCompound() {
    var industry_wage_compound = echarts.init(document.getElementById('industry_wage_compound'), 'light');
    var sel_in = document.getElementById('city_select_1').value;
    $.ajax({
        url: "http://114.55.245.217:5000/getCityMap/" + sel_in,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
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
function getInList() {
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
        success: function (data) {
            if (data.code == 1) {
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
                    salary_td.innerHTML = data_row['salary'];
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
function getInPrevailingCities(){
    var table = document.getElementById('prevailing_cities_table');
    var body = document.getElementById('prevailing_cities_table_body');
    data = {
        code: 1,
        cityList: {
            0: {
                cityName: '北京',
                wageIncreasingRate: '10%',
                jobIncreasingRate: '10%'
            },
            1: {
                cityName: '上海',
                wageIncreasingRate: '9%',
                jobIncreasingRate: '9%'
            },
            2: {
                cityName: '广州',
                wageIncreasingRate: '8%',
                jobIncreasingRate: '8%'
            },
            3: {
                cityName: '深圳',
                wageIncreasingRate: '7%',
                jobIncreasingRate: '7%'
            },
            4: {
                cityName: '杭州',
                wageIncreasingRate: '6%',
                jobIncreasingRate: '6%'
            },
            5: {
                cityName: '厦门',
                wageIncreasingRate: '5%',
                jobIncreasingRate: '5%'
            },
            6: {
                cityName: '西安',
                wageIncreasingRate: '4%',
                jobIncreasingRate: '4%'
            },
            7: {
                cityName: '武汉',
                wageIncreasingRate: '3%',
                jobIncreasingRate: '3%'
            },
            8: {
                cityName: '重庆',
                wageIncreasingRate: '2%',
                jobIncreasingRate: '2%'
            },
            9: {
                cityName: '南京',
                wageIncreasingRate: '1%',
                jobIncreasingRate: '1%'
            },
        }
    }
    for (let key in data.cityList) {
        var data_row = data.cityList[key];
        var new_tr = document.createElement('tr');
        var rank_td = document.createElement('td');
        var city_td = document.createElement('td');
        var wage_td = document.createElement('td');
        var job_td = document.createElement('td');
        rank_td.innerHTML = parseInt(key) + 1;
        city_td.innerHTML = data_row['cityName'];
        wage_td.innerHTML = data_row['wageIncreasingRate'];
        job_td.innerHTML = data_row['jobIncreasingRate'];
        new_tr.appendChild(rank_td);
        new_tr.appendChild(city_td);
        new_tr.appendChild(wage_td);
        new_tr.appendChild(job_td);
        body.appendChild(new_tr);
    }
    table.appendChild(body);
}

//前十热门行业
function getInPrevailingIndustries(){
    var table = document.getElementById('prevailing_industries_table');
    var body = document.getElementById('prevailing_industries_table_body');
    data = {
        code: 1,
        industryList: {
            0: {
                industryName: '前端',
                wageIncreasingRate: '10%',
                jobIncreasingRate: '10%'
            },
            1: {
                industryName: '后端',
                wageIncreasingRate: '9%',
                jobIncreasingRate: '9%'
            },
            2: {
                industryName: '运维',
                wageIncreasingRate: '8%',
                jobIncreasingRate: '8%'
            },
            3: {
                industryName: '算法',
                wageIncreasingRate: '7%',
                jobIncreasingRate: '7%'
            },
            4: {
                industryName: '产品',
                wageIncreasingRate: '6%',
                jobIncreasingRate: '6%'
            },
            5: {
                industryName: '运营',
                wageIncreasingRate: '5%',
                jobIncreasingRate: '5%'
            },
            6: {
                industryName: '人事',
                wageIncreasingRate: '4%',
                jobIncreasingRate: '4%'
            },
            7: {
                industryName: '设计',
                wageIncreasingRate: '3%',
                jobIncreasingRate: '3%'
            },
            8: {
                industryName: '销售',
                wageIncreasingRate: '2%',
                jobIncreasingRate: '2%'
            },
            9: {
                industryName: '物流',
                wageIncreasingRate: '1%',
                jobIncreasingRate: '1%'
            },
        }
    }
    for (let key in data.industryList) {
        var data_row = data.industryList[key];
        var new_tr = document.createElement('tr');
        var rank_td = document.createElement('td');
        var industry_td = document.createElement('td');
        var wage_td = document.createElement('td');
        var job_td = document.createElement('td');
        rank_td.innerHTML = parseInt(key) + 1;
        industry_td.innerHTML = data_row['industryName'];
        wage_td.innerHTML = data_row['wageIncreasingRate'];
        job_td.innerHTML = data_row['jobIncreasingRate'];
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
    var industry_predict_line_option = {
        title: {
            text: '预测薪资和预测数量折线图',
            subtext: '纯属虚构',
            left: 'center',
            align: 'right'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        legend: {
            data: ['薪资', '数量'],
            left: 10
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
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                onZero: false
            },
            data: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
            ]
        }],
        yAxis: [{
            name: '薪资(元)',
            type: 'value',
            max: 30000
        }, {
            name: '数量',
            max: 200,
            type: 'value'
        }],
        series: [{
            name: '薪资',
            type: 'line',
            data: [
                17870, 6507, 21245, 12818, 19352, 10715, 7270, 17915, 22833, 12027, 24587, 9229, 7938, 9102, 8456, 29845, 13169, 6650, 8860, 17846, 12809, 23902, 22048, 12531, 25484, 17772, 19309, 25684, 13881, 7720
            ]
        }, {
            name: '数量',
            type: 'line',
            yAxisIndex: 1,
            data: [
                65, 90, 98, 193, 41, 183, 169, 22, 15, 12, 128, 141, 141, 151, 38, 193, 150, 48, 177, 45, 129, 111, 83, 49, 77, 77, 164, 126, 46, 15
            ]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    industry_predict_line.setOption(industry_predict_line_option);
}

//数据预测界面城市预测图点击查询
function getInCityPredictLine() {
    // 基于准备好的dom，初始化echarts实例
    var city_predict_line = echarts.init(document.getElementById('city_predict_line'), 'light');
    var city_predict_line_option = {
        title: {
            text: '岗位数量和平均薪资折线图',
            subtext: '纯属虚构',
            left: 'center',
            align: 'right'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        legend: {
            data: ['薪资', '数量'],
            left: 10
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
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                onZero: false
            },
            data: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
            ]
        }],
        yAxis: [{
            name: '薪资(元)',
            type: 'value',
            max: 30000
        }, {
            name: '数量',
            max: 200,
            type: 'value'
        }],
        series: [{
            name: '薪资',
            type: 'line',
            data: [
                17870, 6507, 21245, 12818, 19352, 10715, 7270, 17915, 22833, 12027, 24587, 9229, 7938, 9102, 8456, 29845, 13169, 6650, 8860, 17846, 12809, 23902, 22048, 12531, 25484, 17772, 19309, 25684, 13881, 7720
            ]
        }, {
            name: '数量',
            type: 'line',
            yAxisIndex: 1,
            data: [
                65, 90, 98, 193, 41, 183, 169, 22, 15, 12, 128, 141, 141, 151, 38, 193, 150, 48, 177, 45, 129, 111, 83, 49, 77, 77, 164, 126, 46, 15
            ]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    city_predict_line.setOption(city_predict_line_option);
}



//以下为数据监控页面相关内容
//数据监控页面各行业岗位薪资和岗位数查询次数
function getInIndustryWageAndJobQueryStack(){
    var industry_wage_and_job_query_stack = echarts.init(document.getElementById('industry_wage_and_job_query_stack'), 'light');
    var industry_wage_and_job_query_stack_option = {
        title: {
            text: '各行业岗位薪资和岗位数查询次数',
            subtext: '暂时虚构',
            left: 'center',
            align: 'right'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
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
            data: ['薪资', '岗位数'],
            left: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['前端', '运维', '算法', '产品', '运营', '设计', '销售', '人事', '物流', '市场', '金融', '医疗健康', '高级管理', '其他行业']
        }],
        yAxis: [{
            name: '次数(查询)',
            type: 'value'
        }],
        series: [{
            name: '薪资',
            type: 'bar',
            stack: '数据',
            data: [8367, 7419, 7259, 7883, 5134, 6405, 7003, 9411, 6925, 6352, 9918, 7034, 9133, 6150]
        }, {
            name: '岗位数',
            type: 'bar',
            stack: '数据',
            data: [7141, 5191, 9805, 7118, 9543, 7030, 9930, 6287, 5780, 6709, 7814, 6036, 5901, 7775]
        }]
    };
    industry_wage_and_job_query_stack.setOption(industry_wage_and_job_query_stack_option);
}

//数据监控页面各城市行业薪资和岗位数量查询次数
function getInCityWageAndJobQueryBar(){
    var city_wage_and_job_query_bar = echarts.init(document.getElementById('city_wage_and_job_query_bar'), 'light');
    var city_wage_and_job_query_bar_option = {
        title: {
            text: '各城市查询次数',
            subtext: '暂时虚构',
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
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['北京', '上海', '广州', '深圳', '武汉', '杭州', '重庆', '南京', '宁波', '天津', '合肥', '长沙', '大连'],
        },
        yAxis: {
            name: '次数(查询)',
            type: 'value',
        },
        series: [{
            data: [35709, 41100, 44547, 47697, 34821, 34252, 42352, 44406, 47697, 34821, 45194, 41100, 34821],
            type: 'bar'
        }]
    };
    city_wage_and_job_query_bar.setOption(city_wage_and_job_query_bar_option);
}

//数据监控页面不同学历的用户对城市与行业的倾向图点击查询
function getInCityIndustryEducationQueryStack(){
    var city_industry_education_query_stack = echarts.init(document.getElementById('city_industry_education_query_stack'), 'light');
    var city = '北京';
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
            data: ['大专', '本科', '硕士', '博士'],
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
            data: ['前端', '运维', '算法', '产品', '运营', '设计', '销售', '人事', '物流', '市场', '金融', '医疗健康', '高级管理', '其他行业'],
            axisLabel: {
                interval: 0,
                rotate: 60
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
            data: [8367, 7419, 7259, 7883, 5134, 6405, 7003, 9411, 6925, 6352, 9918, 7034, 9133, 6150]
        }, {
            name: '本科',
            type: 'bar',
            stack: '学历',
            data: [7141, 5191, 9805, 7118, 9543, 7030, 9930, 6287, 5780, 6709, 7814, 6036, 5901, 7775]
        }, {
            name: '硕士',
            type: 'bar',
            stack: '学历',
            data: [7546, 6259, 9917, 9023, 5475, 7464, 5893, 8421, 6306, 9343, 7501, 7646, 9102, 9106]
        }, {
            name: '博士',
            type: 'bar',
            stack: '学历',
            data: [5420, 8022, 7632, 9238, 8007, 6596, 8910, 7619, 5210, 9494, 8242, 6501, 7524, 5787]
        }]
    };
    city_industry_education_query_stack.setOption(city_industry_education_query_stack_option);
}

function changeInput_city_select_4(obj) {
    // console.log($(obj)[0].innerHTML);
    document.getElementById('city_select_4').value = $(obj)[0].innerHTML;
}