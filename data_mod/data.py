import pandas as pd
from datetime import datetime as dt, timedelta
import random

# def up():
#     data = pd.read_csv('./data.csv')
#     out = []
#     n = 3
#     m = 15
#     text = '2020-5-8'
#     y = dt.strptime(text, '%Y-%m-%d')
#     # dp = [[0 for i in range(n)] for j in range(m)]
#     # for i in range(15):
#     out[0][0] = y
#     out[0][1] = data['type'][0]
#     out[0][2] = data['num'][0]
#     print(out)


if __name__ == '__main__':
    data = pd.read_csv('./salary_edu_avg.csv')
    out = [[0 for i in range(3)] for j in range(62 * 4)]
    text = '2020-5-8'
    init = dt.strptime(text, '%Y-%m-%d')
    # z=y+timedelta(days=1)
    # new=dt.date(z)
    # dp = [[0 for i in range(n)] for j in range(m)]
    for index in range(0, 4):
        out[index * 62][0] = data['salary'][index]
        out[index * 62][1] = init.date()
        out[index * 62][2] = data['type'][index]

        for i in range(1, 62):
            out[i + index * 62][0] = out[i - 1 + index * 62][0] + random.uniform((-1 * out[index * 62][0] / 25 - 100),
                                                                                 (1 * out[index * 62][0] / 25 + 200))
            out[i + index * 62][1] = out[i - 1 + index * 62][1] + timedelta(days=1)
            out[i + index * 62][2] = out[index * 62][2]
        name = {'avg', 'date', 'type'}
        test = pd.DataFrame(columns=name, data=out)
        # test.to_csv('./{}.csv'.format(data['type'][index]), index=False)
        test.to_csv('./salary1.csv', index=False)
