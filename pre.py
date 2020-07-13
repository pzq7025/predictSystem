import warnings
import itertools
import csv
import pandas as pd
import numpy as np
import statsmodels.api as sm
import matplotlib.pyplot as plt
import matplotlib as mpl
plt.style.use('fivethirtyeight')
def job_wage_pred(item):
    # ARIMA
    new_data = pd.read_csv('./salary1.csv')
    front=new_data.drop(new_data.loc[~new_data.type.str.contains(item)].index)
    df=front.drop(columns=['type'])
    df.date = pd.to_datetime(df.date)
    # 设置日期为索引
    df.index = df.date
    df.drop(['date'], axis=1, inplace=True)
    front=df
    # print(df.head())
    p = d = q = range(0, 2)
    # print("p=", p, "d=", d, "q=", q)
    # 产生不同的pdq元组,得到 p d q 全排列
    pdq = list(itertools.product(p, d, q))
    # print("pdq:\n", pdq)
    seasonal_pdq = [(x[0], x[1], x[2], 12) for x in pdq]
    # print('SQRIMAX:{} x {}'.format(pdq[1], seasonal_pdq[1]))
    min_aic = 99999
    min_param = (0, 0, 0)
    min_param_seasonal = (0, 0, 0, 12)
    for param in pdq:
        for param_seasonal in seasonal_pdq:
            try:
                mod = sm.tsa.statespace.SARIMAX(front,
                                                order=param,
                                                seasonal_order=param_seasonal,
                                                enforce_stationarity=False,
                                                enforce_invertibility=False)

                results = mod.fit()
                # print('ARIMA{}x{}12 - AIC:{}'.format(param, param_seasonal, results.aic))
                if results.aic < min_aic:
                    min_aic = results.aic
                    min_param = param
                    min_param_seasonal = param_seasonal
            except:
                continue
    print(min_param)
    print(min_param_seasonal)
    mod = sm.tsa.statespace.SARIMAX(front,
                                    order=min_param,
                                    seasonal_order=min_param_seasonal,
                                    enforce_stationarity=False,
                                    enforce_invertibility=False)

    results = mod.fit()

    # print(results.summary().tables[1])
    results.plot_diagnostics(figsize=(15, 12))
    # plt.show()
    # #进行验证预测
    pred = results.get_prediction(start=pd.to_datetime('2020-07-01'), dynamic=False)
    pred_ci = pred.conf_int()
    # print("pred ci:\n", pred_ci)  # 获得的是一个预测范围，置信区间
    # print("pred:\n", pred)  # 为一个预测对象
    # print("pred mean:\n", pred.predicted_mean)  # 为预测的平均值
    # 进行绘制预测图像
    ax = front['2020-05-01':].plot(label="observed")
    pred.predicted_mean.plot(ax=ax, label="static ForCast", alpha=.7, color='red', linewidth=5)
    # 在某个范围内进行填充
    ax.fill_between(pred_ci.index,
                    pred_ci.iloc[:, 0],
                    pred_ci.iloc[:, 1], color='k', alpha=.2)
    ax.set_xlabel('Date')
    ax.set_ylabel('Salary')
    plt.legend()
    # plt.show()
    # 求取 MSE（均方误差）
    y_forecasted = pred.predicted_mean
    y_truth = front['2020-07-01':]
    mse = ((y_forecasted - y_truth) ** 2).mean()
    # print("MSE:", mse)
    # Get forecast 500 steps ahead in future
    pred_uc = results.get_forecast(steps=60)  # steps 可以代表2个月左右
    # Get confidence intervals of forecasts
    pred_ci = pred_uc.conf_int()
    new_data = pred_uc.predicted_mean
    out_data = pd.DataFrame(columns=[ 'date', 'salary', 'type'])
    out_data['date'] = new_data.index
    out_data['salary'] = new_data.values
    out_data['type'] = item
    print(out_data)
    out_data.to_csv('./out.csv', mode='a', index=False,header=False,encoding='utf-8_sig')
    plt.title("预测", fontsize=15, color="red")
    ax = front.plot(label='observed', figsize=(15, 10))
    pred_uc.predicted_mean.plot(ax=ax, label='Forecast')
    ax.fill_between(pred_ci.index,
                    pred_ci.iloc[:, 0],
                    pred_ci.iloc[:, 1], color='k', alpha=.25)
    ax.set_xlabel('Date', fontsize=15)
    ax.set_ylabel('Salary', fontsize=15)
    plt.legend()
    # plt.show()

if __name__ == '__main__' :
    JobDis = ['前端', '后端', '运维', '数据', '产品', '设计', '运营', '市场', '人事', '高级管理', '销售', '金融', '医疗健康', '物流', '其他']
    for item in JobDis:
        job_wage_pred(item)
