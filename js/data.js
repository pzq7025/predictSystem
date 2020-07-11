window.onload = function() {
    getInJob();
    getInCityCompound();
}


// 城市岗位占比饼图
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


// 城市薪资折线图
var city_wage = echarts.init(document.getElementById('city_wage'), 'light');
var city_Wage_data = [];
$.ajax({
    url: "http://114.55.245.217:5000/getCityWage ",
    type: "get",
    data: {},
    dataType: "json",
    success: function(data) {
        if (data.code == 1) {
            console.log(data.cityWage)
                // for (i = 0; i < 25; i++) {
                //     city_Wage_data[i] = data.cityWage[i];
                // }
            city_Wage_data = data.cityWage;
            var city_wage_option = {
                title: {
                    text: '城市薪资折线图',
                    // subtext: '纯属虚构',
                    left: 'left'

                },
                legend: {},
                tooltip: {},
                dataset: {
                    dimensions: ['cityName', '平均薪资', '中位薪资'],
                    source: city_Wage_data,
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 0,
                        rotate: 60
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


// 行业岗位占比饼图
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


// 行业薪资折线图
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
                    text: '行业薪资折线图',
                    // subtext: '纯属虚构',
                    left: 'left'

                },
                legend: {},
                tooltip: {},
                dataset: {
                    dimensions: ['IndustryName', '平均薪资', '中位薪资'],
                    source: industry_Wage_data
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 0,
                        rotate: 60
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
            industry_wage.setOption(industry_wage_option);
        }
    },
});

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
// 地图岗位按钮点击时的请求
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
$.ajax({
    url: "http://114.55.245.217:5000/getListData?education=大专",
    type: "get",
    data: {},
    dataType: "json",
    success: function(data) {
        if (data.code == 1) {
            var body = document.getElementById('information-table-body')
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
                id_td.innerHTML = key;
                job_td.innerHTML = data_row['jobName'];
                company_td.innerHTML = data_row['companyName'];
                city_td.innerHTML = data_row['cityName'];
                education_td.innerHTML = data_row['edu'];
                salary_td.innerHTML = data_row['salary'];
                time_td.innerHTML = data_row['putdate'];
                new_tr.appendChild(id_td);
                new_tr.appendChild(job_td);
                new_tr.appendChild(company_td);
                new_tr.appendChild(city_td);
                new_tr.appendChild(education_td);
                new_tr.appendChild(salary_td);
                new_tr.appendChild(time_td);
                body.appendChild(new_tr);
            }
        }
    },
});

//数据预测界面行业预测图点击查询时, 待完成
function getInIndustryPredict() {

}

//数据预测界面城市预测图点击查询时, 待完成
function getInCityPredict() {

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