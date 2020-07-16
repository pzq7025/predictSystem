import pymysql


class Mysql:
    def __init__(self):
        self.content = pymysql.Connect(
            host='xxxxxxxxxxxxxxx',  # 主机ip
            port=3306,  # 端口
            user='xxxxxxxxxxxxxxxxxxx',  # 用户名
            passwd='xxxxxxxxx',  # 密码
            db='xxxxxxxxxxx',  # 数据库名
            charset='utf8',  # 字符集
        )
        self.cursor = self.content.cursor()

    def query(self, param_dic):
        # 工作列表查询
        convert = [f'{i}' + '=' + f'"{param_dic.get(i)}"' for i in param_dic.keys()]
        # print(' and '.join(convert))
        sql = f'select * from joblist where {" and ".join(convert)} LIMIT 10;'
        self.cursor.execute(sql)
        result = {}
        for index, row in enumerate(self.cursor.fetchall()):
            pass_result = {
                str(index): {'jobName': row[8],
                             'companyName': row[1],
                             'cityName': row[2],
                             'salary': row[3],
                             'putdata': row[4],
                             'edu': row[5]
                             }
            }
            result.update(pass_result)
        # print(f"一共查找到：{self.cursor.rowcount}")
        return result

    def store_data(self, param_dic):
        # 记录埋点数据
        key_record = list(i[0] for i in param_dic.items())
        value_record = list(f'"{i[1]}"' for i in param_dic.items())
        # print(key_record)
        # print(value_record)
        # print(' and '.join(convert))
        # sql1 = 'insert into record (location) VALUES ("背景");'
        sql = f'insert into record ({",".join(key_record)}) values ({",".join(value_record)});'
        self.cursor.execute(sql)
        self.content.commit()
        # print("finish!")

    def num_city_salary_pre_query(self, param_dic):
        # 城市岗位薪资的预测查询
        convert = [f'{i}' + '=' + f'"{param_dic.get(i)}"' for i in param_dic.keys()]
        sql = f'select * from numcitysalarypre where {" and ".join(convert)};'
        self.cursor.execute(sql)
        result = []
        for index, date_, num_, city_num, salary_ in self.cursor.fetchall():
            pass_result = {
                'num': num_,
                'date': date_,
                'salary': salary_
            }
            result.append(pass_result)
        return result

    def num_edu_salary_pre_query(self, param_dic):
        # 教育薪资岗位预测查询
        convert = [f'{i}' + '=' + f'"{param_dic.get(i)}"' for i in param_dic.keys()]
        sql = f'select * from numedusalarypre where {" and ".join(convert)};'
        self.cursor.execute(sql)
        result = []
        for index, date_, num_, education, salary_ in self.cursor.fetchall():
            pass_result = {
                'num': num_,
                'date': date_,
                'salary': salary_
            }
            result.append(pass_result)
        return result

    def num_type_salary_pre_query(self, param_dic):
        # 岗位数量薪资预测
        convert = [f'{i}' + '=' + f'"{param_dic.get(i)}"' for i in param_dic.keys()]
        sql = f'select * from numtypesalarypre where {" and ".join(convert)};'
        self.cursor.execute(sql)
        result = []
        for index, date_, num_, city_num, salary_ in self.cursor.fetchall():
            pass_result = {
                'num': num_,
                'date': date_,
                'salary': salary_
            }
            result.append(pass_result)
        return result

    def end(self):
        self.cursor.close()
        self.content.close()


if __name__ == '__main__':
    mysql = Mysql()
"""
{'1': {'jobName': 'Unity3D游戏开发工程师', 'companyName': '北京米兜科技有限公司', 'cityName': '北京-海淀区', 'salary': '0.8-1.0', 'putdate': '07-03', 'edu': '本科'}, '2': {'jobName': '高级Python开发工程师', 'companyName': '北京博兴高科科技有限公司', 'cityName': '北京-海淀区', 'salary': '1.5-2.0', 'putdate': '07-03', 'edu': '本科'}, '3': {'jobName': 'Java开发工程师', 'companyName': '北京瑞天欣实数据科技有限公司', 'cityName': '广州-天河区', 'salary': '0.8-1.2', 'putdate': '06-17', 'edu': '大专'}, '4': {'jobName': '运维工程师', 'companyName': '北京慧博融信科技有限公司', 'cityName': '广州-越秀区', 'salary': '0.6-0.8', 'putdate': '06-19', 'edu': '大专'}, '5': {'jobName': '全栈工程师', 'companyName': '北京慧博融信科技有限公司', 'cityName': '广州-天河区', 'salary': '1.5-2.8', 'putdate': '06-19', 'edu': '本科'}, '6': {'jobName': '初级Web前端开发工程师', 'companyName': '广州市简美网络科技有限公司', 'cityName': '广州-越秀区', 'salary': '0.4-0.6', 'putdate': '06-21', 'edu': '大专'}}
"""
