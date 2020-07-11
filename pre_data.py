import os
import re
import numpy as np
import pandas as pd
from sklearn import model_selection
from sklearn.preprocessing import LabelEncoder as LE
from sklearn.linear_model import LinearRegression as LR
import matplotlib.pyplot as plt

#数据的预处理
def Pre_data(Csv_Path):
    #读取csv文件
    df = pd.read_csv(Csv_Path)

    zhaopin = df.drop(columns = ['Unnamed: 0', 'request', 'companyName', 'companyType', 'companySize', 'experience', 'education', 'occupation'])

    #统一数据信息
    zhaopin.location= zhaopin.location.astype(str)
    zhaopin.location = zhaopin.location.apply(lambda x: x.split('-')[0] if '-' in x else x)

    zhaopin.salary = zhaopin.salary.astype(str)
    zhaopin.salary = zhaopin.salary.apply(lambda x: ((float(x.split('-')[0])) + (float(x.split('-')[-1])) )/ 2.0 * 10000 if '-' in x else x)

    #职业统一分类

    JobDis = ['前端','后端','运维','算法', '产品', '设计','运营','市场','人事','高级管理','销售','金融','医疗健康','物流','其他']
    Word = {}

    with open('../distinguish.txt', 'r', encoding = 'utf-8') as f:
        content = f.read()
        dis = content.split(',')
        #得到分类匹配词
        for i in range(len(dis)):
            Word[JobDis[i]] = dis[i]
            #print(Word[JobDis[i]])

        #对数据进行匹配,并更改数据
        for i in range(len(dis)):
            if(JobDis[i] != '其他'):
                #print(zhaopin.loc[zhaopin.type.str.contains(Word[JobDis[i]])].type)
                zhaopin.loc[zhaopin.type.str.contains(Word[JobDis[i]]) , 'type'] = JobDis[i]
            else:
                #print(zhaopin.loc[zhaopin.type.str.contains(Word[JobDis[i]])].type)
                zhaopin.loc[~zhaopin.type.str.contains(Word[JobDis[i]]), 'type'] = JobDis[i]

    #删除无用信息
    zhaopin = zhaopin.drop(zhaopin[zhaopin.location == '异地招聘'].index)
    zhaopin = zhaopin.drop(zhaopin[zhaopin.salary == '未提供'].index)

    #去除重复信息
    #zhaopin = zhaopin.drop_duplicates()

    '''
    with open('../test_3.txt', 'a', encoding = 'utf-8') as f:
        t = zhaopin.type.drop_duplicates()
        tt = ','.join(str(i) for i in t)
        f.write(tt)
    '''

    ct = zhaopin.location.value_counts()
    print(ct)
    cu =zhaopin.type.value_counts()
    print(cu)


    zhaopin.to_csv('../new_data.csv', index = 0, encoding = 'utf-8_sig')

    return zhaopin
'''
#构建预测函数
def wage_pred(area, time,  job):
    le = Le()

    area_index = list(le.)
'''
#忽略城市,统计热门职业的的薪资均值,日期和职业为自变量,薪水为因变量
def wage1_pred(Time, Jobtype):
    #去除无用列
    zhaopin_data = pd.read_csv('../new_data.csv')
    zhaopin = zhaopin_data.drop(columns = ['location'])
    #print(zhaopin.head(5))

    #得到热门行业['后端', '前端', '销售', '运维', '人事', 算法]
    #cu = zhaopin.type.value_counts()
    #print(cu)

    #去除无用的行
    zhaopin = zhaopin.drop(zhaopin.loc[~zhaopin.type.str.contains('后端|前端|销售|运维|人事|算法')].index)
    #print(zhaopin.head(5))

    data = zhaopin.groupby(['date','type'])
    new_data = pd.DataFrame(columns=['date', 'type', 'salary'])

    for key, value in data:
        tmp = value.drop(columns = ['salary'])
        tmp = tmp.drop_duplicates()
        tmp['salary'] = value.mean().salary
        new_data = pd.concat([new_data, tmp])
    new_data.index = np.arange(len(new_data.index))
    #print(zhaopin.type.value_counts())
    #print(new_data.head(5))
    #print(new_data.info())

    # 将各字符分类变量重编码为数值分类变量
    #le_date = LE()
    le_type = LE()

    #new_data['date'] = le_date.fit_transform(new_data['date'].values)
    new_data['type'] = le_type.fit_transform(new_data['type'].values)

    t = new_data.date.drop_duplicates()
    tt = ','.join(str(i) for i in t)
    dt = tt.split(',')
    #print(dt)

    #将时间放大，一天代表五天
    for i in range(len(dt)):
        new_data['date'] = new_data['date'].replace(dt[i], i*5)

    with open('../date.txt', 'r', encoding = 'utf-8') as f:
        content = f.read()
        dat = content.split(',')
        #print(dat)

    #print(new_data.head(5))
    #print(le_date.classes_)
    #print(le_type.classes_)

    #特征选择
    x = new_data[['date', 'type']]
    y = new_data['salary']

    #模型学习
    model = LR()
    model.fit(x,y)

    Jobtype_index = list(le_type.classes_).index(Jobtype)
    #Time_index = list(le_date.classes_).index(Time)
    #总共有63个日期，每个日期代表5天
    Time_index = list(dat).index(Time) + 310
    #print(Jobtype)
    #print(Time_index)

    wage_pred = model.predict([[Time_index, Jobtype_index]])
    print('%.2f'%wage_pred)
    return wage_pred

#忽略城市,将每个职位的岗位数量,日期为自变量和职业,岗位需求数是因变量
def wage2_pred(Time, Jobtype):

    zhaopin_data = pd.read_csv('../new_data.csv')
    zhaopin = zhaopin_data.drop(columns=['location'])

    zhaopin = zhaopin.drop(zhaopin.loc[~zhaopin.type.str.contains('后端|前端|销售|运维|人事|算法')].index)

    data = zhaopin.groupby(['date', 'type'])
    new_data = pd.DataFrame(columns=['date', 'type', 'count'])

    for key, value in data:
        tmp = value.drop(columns = ['salary'])
        tmp = tmp.drop_duplicates()
        tmp['count'] = value.count().type
        new_data = pd.concat([new_data, tmp])
    new_data.index = np.arange(len(new_data.index))
    #print(new_data)
    #print(new_data.type.value_counts())

    le_type = LE()

    new_data['type'] = le_type.fit_transform(new_data['type'].values)

    t = new_data.date.drop_duplicates()
    tt = ','.join(str(i) for i in t)
    dt = tt.split(',')

    for i in range(len(dt)):
        new_data['date'] = new_data['date'].replace(dt[i], i*5)

    with open('../date.txt', 'r', encoding = 'utf-8') as f:
        content = f.read()
        dat = content.split(',')

    x = new_data[['date', 'type']]
    y = new_data['count']

    # 模型学习
    model = LR()
    model.fit(x, y)

    Jobtype_index = list(le_type.classes_).index(Jobtype)
    # Time_index = list(le_date.classes_).index(Time)
    # 总共有63个日期，每个日期代表5天
    Time_index = list(dat).index(Time) + 310
    # print(Jobtype)
    # print(Time_index)

    wage_pred = model.predict([[Time_index, Jobtype_index]])
    print('%d' % int(wage_pred))
    return int(wage_pred)

#城市薪资, 忽略职业,自变量是城市和时间，因变量是城市薪资
def wage3_pred(City, Time):

    zhaopin_data = pd.read_csv('../new_data.csv')
    zhaopin = zhaopin_data.drop(columns=['type'])

    #cu = zhaopin.location.value_counts()
    #print(cu)
    #print(zhaopin.head(5))

    data = zhaopin.groupby(['location', 'date'])
    new_data = pd.DataFrame(columns=['location', 'date', 'salary'])

    for key, value in data:
        tmp = value.drop(columns = ['salary'])
        tmp = tmp.drop_duplicates()
        tmp['salary'] = value.mean().salary
        new_data = pd.concat([new_data, tmp])
    new_data.index = np.arange(len(new_data.index))
    #print(new_data.location.value_counts())

    le_location = LE()
    new_data['location'] = le_location.fit_transform(new_data['location'].values)


    t = new_data.date.drop_duplicates()
    tt = ','.join(str(i) for i in t)
    dt = tt.split(',')

    for i in range(len(dt)):
        new_data['date'] = new_data['date'].replace(dt[i], i * 5)

    with open('../date.txt', 'r', encoding='utf-8') as f:
        content = f.read()
        dat = content.split(',')

    x = new_data[['location', 'date']]
    y = new_data['salary']

    # 模型学习
    model = LR()
    model.fit(x, y)

    City_index = list(le_location.classes_).index(City)
    # Time_index = list(le_date.classes_).index(Time)
    # 总共有63个日期，每个日期代表5天
    Time_index = list(dat).index(Time) + 310

    wage_pred = model.predict([[City_index, Time_index]])
    print('%.2f' % wage_pred)
    return wage_pred

#忽略职业,岗位需求,统计城市工作需求量,自变量是时间和城市，因变量是该城市的工作岗位
def wage4_pred(City, Time):

    zhaopin_data = pd.read_csv('../new_data.csv')
    zhaopin = zhaopin_data.drop(columns=['type'])

    #cu = zhaopin.location.value_counts()
    #print(cu)
    #print(zhaopin.head(5))

    data = zhaopin.groupby(['location', 'date'])
    new_data = pd.DataFrame(columns=['location', 'date', 'count'])

    for key, value in data:
        tmp = value.drop(columns = ['salary'])
        tmp = tmp.drop_duplicates()
        tmp['count'] = value.count().salary
        new_data = pd.concat([new_data, tmp])
    new_data.index = np.arange(len(new_data.index))
    #print(new_data.head(5))
    #print(new_data.location.value_counts())


    le_location = LE()
    new_data['location'] = le_location.fit_transform(new_data['location'].values)


    t = new_data.date.drop_duplicates()
    tt = ','.join(str(i) for i in t)
    dt = tt.split(',')

    for i in range(len(dt)):
        new_data['date'] = new_data['date'].replace(dt[i], i * 5)

    with open('../date.txt', 'r', encoding='utf-8') as f:
        content = f.read()
        dat = content.split(',')

    x = new_data[['location', 'date']]
    y = new_data['count']

    # 模型学习
    model = LR()
    model.fit(x, y)

    City_index = list(le_location.classes_).index(City)
    # Time_index = list(le_date.classes_).index(Time)
    # 总共有63个日期，每个日期代表5天
    Time_index = list(dat).index(Time) + 310

    wage_pred = model.predict([[City_index, Time_index]])
    print('%d' % int(wage_pred))
    return int(wage_pred)

#画出结果趋势图:
def draw_Picture_salary(Csv_Obj):

    with open('../date.txt', 'r', encoding='utf-8') as f:
        content = f.read()
        dat = content.split(',')
        print(dat)
    Csv_Obj = Csv_Obj.drop(Csv_Obj.loc[~Csv_Obj.type.str.contains('后端|前端|销售|运维|人事|算法')].index)

    t = Csv_Obj.location.drop_duplicates()
    tt = ','.join(str(i) for i in t)
    City_name = tt.split(',')
    print(City_name)

    f = Csv_Obj.type.drop_duplicates()
    ff = ','.join(str(i) for i in f)
    Type_name = ff.split(',')
    print(Type_name)

    City = {}
    Type = {}

    for i in range(len(dat)):
        for j in range(len(City_name)):
            if(City_name[j] not in City.keys()):
                City[City_name[j]] = [0 for tmp_x in range(len(dat))]
            City[City_name[j]][i] = wage3_pred(City_name[j], dat[i])
        for k in range(len(Type_name)):
            if(Type_name[k] not in Type.keys()):
                Type[Type_name[k]] = [0 for tmp_y in range(len(dat))]
            Type[Type_name[k]][i] = wage1_pred(dat[i], Type_name[k])

    print(City)
    print(Type)

    '''
    fig = plt.figure(figsize=(8, 3))

    plt.show()
    '''

def draw_Picture_jobnum(Csv_Obj):

    with open('../date.txt', 'r', encoding='utf-8') as f:
        content = f.read()
        dat = content.split(',')




if __name__ == '__main__' :
#zhaopin_data = Pre_data('../result_new.csv')
    zhaopin_data =  pd.read_csv('../new_data.csv')
#print(zhaopin_data.info())

#将各字符分类变量重编码为数值分类变量
    '''
    le_city = LE()
    le_date = LE()
    le_type = LE()
    #城市重编码,日期重编码,岗位类型重编码
    zhaopin_data['location'] = le_city.fit_transform(zhaopin_data['location'].values)
    zhaopin_data['date'] = le_date.fit_transform(zhaopin_data['date'].values)
    zhaopin_data['type'] = le_type.fit_transform(zhaopin_data['type'].values)
    #t = zhaopin_data.location.drop_duplicates()
    #print(t)
    print(le_city.classes_)
    print(le_date.classes_)
    print(le_type.classes_)
    '''

    '''
    ct = zhaopin_data.location.value_counts()
    print(ct)
    #print(ct.info())
    print(type(ct))
    cu = zhaopin_data.type.value_counts()
    print(cu)
    #print(cu.info())
    print(type(cu))

    '''
    #时间范围设定为 07-05 ~ 09-30

    #wage1_pred('08-04','前端')
    #wage2_pred('08-01','运维')
    #wage3_pred('北京','08-03')
    #wage4_pred('北京','08-03')

    draw_Picture_salary(zhaopin_data)