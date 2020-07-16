from flask import Flask, escape, url_for, render_template, request
import json
from db_operator import Mysql

app = Flask(__name__)


def city_num(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        result = json.loads(f.read())
    return result


def store(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(json.dumps(content))
        f.close()


@app.after_request
def cors(environ):
    environ.headers['Access-Control-Allow-Origin'] = '*'
    environ.headers['Access-Control-Allow-Method'] = '*'
    environ.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return environ


# 城市的饼状图
# 请求各个城市的岗位数量百分比情况
@app.route('/getCityPie')
def get_city_pie():
    data = {
        'code': 1,
        'cityPie': city_num('city_num.json')
    }
    return data


# 城市薪资
# 请求各个城市的薪资情况
@app.route('/getCityWage')
def get_city_wage():
    data = {
        'code': 1,
        'cityWage': city_num('city_salary.json')
    }
    return data


# 行业所占百分比
# 请求各个行业的岗位数量百分比情况
@app.route('/getIndustryPie')
def get_industry_pie():
    data = {
        'code': 1,
        'IndustryPie': city_num('occ.json')
    }
    return data


# 行业薪资情况
# 请求各个行业的薪资情况
@app.route('/getIndustryWage')
def get_industry_wage():
    data = {
        'code': 1,
        'IndustryWage': city_num('occ_salary.json')
    }
    return data


# 请求查询行业的在全国各省份的和薪资情况
# 这是地图情况
@app.route('/getIndustryMap/<string:industry_name>')
def get_industry_map(industry_name):
    result = city_num('occ_loc_salary.json')
    target = result.get(industry_name)
    if target:
        data = {
            'code': 1,
            'mapdata': [target]
        }
    else:
        data = {'code': -1}
    return data


# 请求查询城市的在各行业岗位数和薪资情况
# 这是折线部分的显示
@app.route('/getCityMap/<string:city_name>')
def get_city_map(city_name):
    result = city_num('city_occ_sal.json')
    target = result.get(city_name)
    if target:
        data = {
            'code': 1,
            'mapdata': [target]
        }
    else:
        data = {'code': -1}
    return data


# 教育信息获取接口
@app.route('/getEducation', methods=['GET'])
def get_education():
    parse_result = request.args.to_dict()
    query = city_num('occ_loc_education.json')
    result = query.get(parse_result.get('location')).get(parse_result.get('type'))
    if result:
        data = {
            'code': 1,
            'eduPie': [result]
        }
    else:
        data = {
            'code': -1,
        }
    return data


# 请求列表数据查询结果返回
@app.route('/getListData', methods=['GET'])
def return_r():
    mysql = Mysql()
    parse_result = request.args.to_dict()
    # print(parse_result)
    query_result = mysql.query(parse_result)
    data = {
        'code': 1,
        # 'jobList': city_num('job_dict.json')
        'jobList': query_result
    }
    mysql.end()
    return data


# 埋点路由结果存储
# 数据情况记录
@app.route('/listBuried', methods=['GET'])
def record():
    mysql = Mysql()
    parse_result = request.args.to_dict()
    # print(parse_result)
    mysql.store_data(parse_result)
    query = city_num('loc_occ_buried_point.json')
    location = parse_result.get('location')
    occ_type = parse_result.get('type')
    education = parse_result.get('education')
    loc = query.get(location)
    # print(loc)
    if loc:
        type_occ = loc.get(occ_type)
        if type_occ:
            result = type_occ.get(education)
            if result:
                type_occ[education] += 1
    # print(query)
    store('loc_occ_buried_point.json', query)
    # if edu:
    #     type_occ[education] += 1
    # print(edu)

    data = {
        'code': 1,
        # # 'jobList': city_num('job_dict.json')
        # 'jobList': query_result
    }
    mysql.end()
    return data


# 职业 学历 地点埋点结果路由查询
@app.route('/getListBuried', methods=['GET'])
def get_edu_loc_occ_buried():
    parse_result = request.args.to_dict()
    query = city_num('loc_occ_buried_point.json')
    result = query.get(parse_result.get('location'))
    if result:
        data = {
            'code': 1,
            'eduPie': [result]
        }
    else:
        data = {
            'code': -1,
        }
    return data


# 城市埋点结果获取
@app.route('/getCityBuried', methods=['GET'])
def get_loc_buried():
    query = city_num('loc_buried_point.json')
    data = {
        'code': 1,
        'cityPie': query
    }
    return data


# 行业埋点结果获取
@app.route('/getIndustryBuried', methods=['GET'])
def get_occ_buried():
    query = city_num('occ_buried_point.json')
    data = {
        'code': 1,
        'cityPie': query
    }
    return data


# 数据埋点:三个数据埋点和前面的一个industry list共同作为埋点的数据
@app.route('/IndustryWageBuried/<string:type_name>', methods=['GET'])
def industry_wage(type_name):
    query = city_num('occ_buried_point.json')
    for i in query:
        if i['name'] == type_name:
            i['wage'] += 1
            break
    store('occ_buried_point.json', query)
    data = {
        'code': 1
    }
    return data


@app.route('/IndustryNumBuried/<string:type_name>', methods=['GET'])
def industry_num(type_name):
    query = city_num('occ_buried_point.json')
    for i in query:
        if i['name'] == type_name:
            i['num'] += 1
            break
    store('occ_buried_point.json', query)
    data = {
        'code': 1
    }
    return data


@app.route('/CityBuried/<string:city_name>', methods=['GET'])
def city_buried(city_name):
    query = city_num('loc_buried_point.json')
    for i in query:
        if i['name'] == city_name:
            i['value'] += 1
            break
    store('loc_buried_point.json', query)
    data = {
        'code': 1
    }
    return data


# 预测分析
# 城市预测值
@app.route('/getCityPre', methods=['GET'])
def predict_city():
    mysql = Mysql()
    parse_result = request.args.to_dict()
    query_result = mysql.num_city_salary_pre_query(parse_result)
    if query_result:
        data = {
            'code': 1,
            'cityPie': query_result
        }
    else:
        data = {
            'code': -1,
        }
    mysql.end()
    return data


# 薪资预测
@app.route('/predictType/<string:type_name>', methods=['GET'])
def predict_type(type_name):
    pass


# 城市薪资
@app.route('/predictCitySalary/<string:city_salary>', methods=['GET'])
def predict_city_salary(city_salary):
    pass


# 职业薪资
@app.route('/getIndustryPre', methods=['GET'])
def predict_type_salary():
    mysql = Mysql()
    parse_result = request.args.to_dict()
    query_result = mysql.num_type_salary_pre_query(parse_result)
    if query_result:
        data = {
            'code': 1,
            'cityPie': query_result
        }
    else:
        data = {
            'code': -1,
        }
    mysql.end()
    return data


# 教育预测
@app.route('/getEduPre', methods=['GET'])
def predict_education():
    mysql = Mysql()
    parse_result = request.args.to_dict()
    query_result = mysql.num_edu_salary_pre_query(parse_result)
    if query_result:
        data = {
            'code': 1,
            'cityPie': query_result
        }
    else:
        data = {
            'code': -1,
        }
    mysql.end()
    return data
