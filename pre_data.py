import os
import re
import numpy as np
import pandas as pd
from sklearn import model_selection
from sklearn.preprocessing import LabelEncoder as LE
from sklearn.linear_model import LinearRegression as LR

#数据的预处理
def Pre_data(Old_Csv_Path, Disting_Path, New_Csv_Path):
    #读取csv文件
    df = pd.read_csv(Old_Csv_Path)

    zhaopin = df.drop(columns = ['Unnamed: 0', 'request', 'companyName', 'companyType', 'companySize', 'experience', 'education', 'occupation'])

    #统一数据信息
    zhaopin.location= zhaopin.location.astype(str)
    zhaopin.location = zhaopin.location.apply(lambda x: x.split('-')[0] if '-' in x else x)

    zhaopin.salary = zhaopin.salary.astype(str)
    zhaopin.salary = zhaopin.salary.apply(lambda x: ((float(x.split('-')[0])) + (float(x.split('-')[-1])) )/ 2.0 * 10000 if '-' in x else x)

    #职业统一分类

    JobDis = ['前端','后端','运维','数据', '产品', '设计','运营','市场','人事','高级管理','销售','金融','医疗健康','物流','其他']
    Word = {}

    with open(Disting_Path, 'r', encoding = 'utf-8') as f:
        content = f.read()
        dis = content.split(',')
        #得到分类匹配词
        for i in range(len(dis)):
            Word[JobDis[i]] = dis[i]

        #对数据进行匹配,并更改数据
        for i in range(len(dis)):
            if(JobDis[i] != '其他'):
                zhaopin.loc[zhaopin.type.str.contains(Word[JobDis[i]]) , 'type'] = JobDis[i]
            else:
                zhaopin.loc[~zhaopin.type.str.contains(Word[JobDis[i]]), 'type'] = JobDis[i]

    #删除无用信息
    zhaopin = zhaopin.drop(zhaopin[zhaopin.location == '异地招聘'].index)
    zhaopin = zhaopin.drop(zhaopin[zhaopin.salary == '未提供'].index)

    '''
    with open('../test_4.txt', 'a', encoding = 'utf-8') as f:
        t = zhaopin.type.drop_duplicates()
        tt = ','.join(str(i) for i in t)
        f.write(tt)
    '''

    '''
    ct = zhaopin.location.value_counts()
    print(ct)
    cu =zhaopin.type.value_counts()
    print(cu)
    '''

    zhaopin.index = np.arange(len(zhaopin.index))
    zhaopin.to_csv(New_Csv_Path, index = 0, encoding = 'utf-8_sig')

    return zhaopin


#忽略城市,统计热门职业的的薪资均值,日期和职业为自变量,薪水为因变量
def top_job_wage_pred(new_csv_data, date_path):
    #去除无用列
    zhaopin = new_csv_data.drop(columns = ['location'])

    #得到热门行业['后端', '前端', '销售', '运维', '数据']
    zhaopin = zhaopin.drop(zhaopin.loc[~zhaopin.type.str.contains('后端|前端|销售|运维|数据')].index)

    zhaopin.salary = zhaopin.salary.astype(float)
    data = zhaopin.groupby(['date','type'])
    new_data = pd.DataFrame(columns=['date', 'type', 'salary'])

    for key, value in data:
        tmp = value.drop(columns = ['salary'])
        tmp = tmp.drop_duplicates()
        tmp['salary'] = value.mean().salary
        new_data = pd.concat([new_data, tmp])
    new_data.index = np.arange(len(new_data.index))

    # 将各字符分类变量重编码为数值分类变量
    le_type = LE()

    new_data['type'] = le_type.fit_transform(new_data['type'].values)

    t = new_data.date.drop_duplicates()
    tt = ','.join(str(i) for i in t)
    dt = tt.split(',')

    #将时间放大，一天代表五天,(可改变增长率)
    for i in range(len(dt)):
        new_data['date'] = new_data['date'].replace(dt[i], i*5)

    with open(date_path, 'r', encoding = 'utf-8') as f:
        content = f.read()
        dat = content.split(',')

    #得到类型列表
    Type_name = le_type.classes_

    #特征选择
    x = new_data[['date', 'type']]
    y = new_data['salary']

    #模型学习
    model = LR()
    model.fit(x,y)

    Type = {}

    for i in range(len(dat)):
        for k in range(len(Type_name)):
            if (Type_name[k] not in Type.keys()):
                Type[Type_name[k]] = [0 for tmp_y in range(len(dat))]
            Type[Type_name[k]][i] = model.predict([[i + 310, k]])

    return Type

#忽略城市,将每个职位的岗位数量,日期为自变量和职业,岗位需求数是因变量
def top_job_station_pred(new_csv_data, date_path):

    zhaopin = new_csv_data.drop(columns=['location'])

    zhaopin = zhaopin.drop(zhaopin.loc[~zhaopin.type.str.contains('后端|前端|销售|运维|数据')].index)

    data = zhaopin.groupby(['date', 'type'])
    new_data = pd.DataFrame(columns=['date', 'type', 'count'])

    for key, value in data:
        tmp = value.drop(columns = ['salary'])
        tmp = tmp.drop_duplicates()
        tmp['count'] = value.count().type
        new_data = pd.concat([new_data, tmp])
    new_data.index = np.arange(len(new_data.index))

    le_type = LE()

    new_data['type'] = le_type.fit_transform(new_data['type'].values)

    t = new_data.date.drop_duplicates()
    tt = ','.join(str(i) for i in t)
    dt = tt.split(',')

    for i in range(len(dt)):
        new_data['date'] = new_data['date'].replace(dt[i], i*5)

    with open(date_path, 'r', encoding = 'utf-8') as f:
        content = f.read()
        dat = content.split(',')

    x = new_data[['date', 'type']]
    y = new_data['count']

    # 得到类型列表
    Type_name = le_type.classes_

    # 模型学习
    model = LR()
    model.fit(x, y)

    Type = {}

    for i in range(len(dat)):
        for k in range(len(Type_name)):
            if (Type_name[k] not in Type.keys()):
                Type[Type_name[k]] = [0 for tmp_y in range(len(dat))]
            Type[Type_name[k]][i] = int(model.predict([[i + 310, k]]))

    return Type


#城市薪资, 忽略职业,自变量是城市和时间，因变量是城市薪资
def top_city_wage_pred(new_csv_data, date_path):

    zhaopin = new_csv_data.drop(columns=['type'])

    # 得到热门城市['北京', '上海', '广州', '深圳', '武汉']
    zhaopin = zhaopin.drop(zhaopin.loc[~zhaopin.location.str.contains('北京|上海|广州|深圳|武汉')].index)

    zhaopin.salary = zhaopin.salary.astype(float)
    data = zhaopin.groupby(['location', 'date'])
    new_data = pd.DataFrame(columns=['location', 'date', 'salary'])

    for key, value in data:
        tmp = value.drop(columns = ['salary'])
        tmp = tmp.drop_duplicates()
        tmp['salary'] = value.mean().salary
        new_data = pd.concat([new_data, tmp])
    new_data.index = np.arange(len(new_data.index))

    le_location = LE()

    new_data['location'] = le_location.fit_transform(new_data['location'].values)

    t = new_data.date.drop_duplicates()
    tt = ','.join(str(i) for i in t)
    dt = tt.split(',')

    for i in range(len(dt)):
        new_data['date'] = new_data['date'].replace(dt[i], i * 5)

    with open(date_path, 'r', encoding='utf-8') as f:
        content = f.read()
        dat = content.split(',')

    x = new_data[['location', 'date']]
    y = new_data['salary']

    City_name = le_location.classes_

    # 模型学习
    model = LR()
    model.fit(x, y)

    City = {}

    for i in range(len(dat)):
        for j in range(len(City_name)):
            if (City_name[j] not in City.keys()):
                City[City_name[j]] = [0 for tmp_x in range(len(dat))]
            City[City_name[j]][i] = model.predict( [[ j, i + 310]])

    return City

#忽略职业,岗位需求,统计城市工作需求量,自变量是时间和城市，因变量是该城市的工作岗位
def top_city_station_pred(new_csv_data, date_path):

    zhaopin = new_csv_data.drop(columns=['type'])

    # 得到热门城市['北京', '上海', '广州', '深圳', '武汉']
    zhaopin = zhaopin.drop(zhaopin.loc[~zhaopin.location.str.contains('北京|上海|广州|深圳|武汉')].index)

    data = zhaopin.groupby(['location', 'date'])
    new_data = pd.DataFrame(columns=['location', 'date', 'count'])

    for key, value in data:
        tmp = value.drop(columns = ['salary'])
        tmp = tmp.drop_duplicates()
        tmp['count'] = value.count().salary
        new_data = pd.concat([new_data, tmp])
    new_data.index = np.arange(len(new_data.index))

    le_location = LE()

    new_data['location'] = le_location.fit_transform(new_data['location'].values)


    t = new_data.date.drop_duplicates()
    tt = ','.join(str(i) for i in t)
    dt = tt.split(',')

    for i in range(len(dt)):
        new_data['date'] = new_data['date'].replace(dt[i], i * 5)

    with open(date_path, 'r', encoding='utf-8') as f:
        content = f.read()
        dat = content.split(',')

    x = new_data[['location', 'date']]
    y = new_data['count']

    City_name = le_location.classes_

    # 模型学习
    model = LR()
    model.fit(x, y)

    City = {}

    for i in range(len(dat)):
        for j in range(len(City_name)):
            if (City_name[j] not in City.keys()):
                City[City_name[j]] = [0 for tmp_x in range(len(dat))]
            City[City_name[j]][i] = int(model.predict([[j, i + 310]]))

    return City

'''
with open('./station_City.txt', 'a', encoding='utf-8') as f:
    for k, v in City.items():
        s = k
        t = ', '.join(str(i) for i in v)
        f.write(s + '\n')
        f.write(t + '\n')
'''
def job_wage_pred(new_csv_data, date_path):
    zhaopin = new_csv_data.drop(columns=['location'])
    zhaopin = zhaopin.drop(zhaopin.loc[~zhaopin.type.str.contains('前端')].index)
    data = zhaopin.groupby('data')
    data.mean()['salary']
    print((data))
    # new_data = pd.DataFrame(columns=['date', 'avg'])
    # for key, value in data:
    #     tmp = value.drop(columns=['type'])
    #     tmp['avg'] = value.mean()['salary']
    #     print(tmp)
    #     new_data = pd.concat([new_data, tmp])
    # new_data.index = np.arange(len(new_data.index))
    # print(new_data)




if __name__ == '__main__' :

    # Old_Csv_Path = './old_data.csv'
    # Disting_Path ='./distinguish.txt'
    # New_Csv_Path ='./new_data.csv'
    Date_Path = './date.txt'

    # zhaopin_data = Pre_data(Old_Csv_Path, Disting_Path , New_Csv_Path)
    zhaopin_data=pd.read_csv('./new_data.csv')
    job_wage_pred(zhaopin_data, Date_Path)
    # Job_wage = top_job_wage_pred(zhaopin_data, Date_Path)
    # print(Job_wage)
    # Job_station = top_job_station_pred(zhaopin_data, Date_Path)
    # print(Job_station)
    # City_wage = top_city_wage_pred(zhaopin_data, Date_Path)
    # print(City_wage)
    # City_station = top_city_station_pred(zhaopin_data, Date_Path)
    # print(City_station)