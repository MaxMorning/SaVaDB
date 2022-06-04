from bs4 import BeautifulSoup
import requests
import pymysql
import datetime
import csv

def init_db(cursor):
    cursor.execute("delete from lineage")

    # init_sql = "insert into lineage values (%s, null), (%s, null)"
    # A_id = select_lineage_in_db(cursor, 'A')[0]['v_id']
    # B_id = select_lineage_in_db(cursor, 'B')[0]['v_id']
    # cursor.execute(init_sql, [A_id, B_id])

def select_lineage_in_db(cursor, lineage_name):
    select_sql = "select * from pango_nomenclature where variant = %s"
    cursor.execute(select_sql, lineage_name)
    return cursor.fetchall()

def insert_lineage_relation(cursor, parent_lineage_id, child_lineage_id):
    insert_sql = "insert into lineage value (%s, %s)"

    cursor.execute(insert_sql, [child_lineage_id, parent_lineage_id])


def get_variant_cnt(cursor):
    cursor.execute("select count(*) from variant")
    return cursor.fetchall()[0]['count(*)']


def insert_withdraw_lineage(cursor, lineage_name, earliest_date):
    if len(earliest_date) == 0:
        earliest_date = None

    select_result = select_lineage_in_db(cursor, lineage_name)
    if len(select_result) != 0:
        # 待withdraw的lineage已存在，修改为withdraw即可
        cursor.execute("update variant set v_status = 'Withdraw' where v_id=%s", select_result[0]['v_id'])
    else:
        idx = get_variant_cnt(cursor)
        cursor.execute("insert into variant value (%s, %s, 'None', -1, -1, 1, null, 'Withdraw', now())", [idx, earliest_date])
        cursor.execute("insert into pango_nomenclature value (%s, %s)", [idx, lineage_name])


def get_parent_name(child_name):
    i = len(child_name)
    for i in range(len(child_name) - 1, -1, -1):
        if child_name[i] == '.':
            break

    return child_name[0:i]


# 该函数保证返回一个int
# 如果不存在，会新插入一个
def get_lineage_idx(cursor, lineage_name, earliest_date):
    if len(earliest_date) == 0:
        earliest_date = None

    select_result = select_lineage_in_db(cursor, lineage_name)
    if len(select_result) == 0:
        # 不存在
        idx = get_variant_cnt(cursor)
        cursor.execute("insert into variant value (%s, %s, 'None', -1, -1, 1, null, 'Normal', now())",
                       [idx, earliest_date])
        cursor.execute("insert into pango_nomenclature value (%s, %s)", [idx, lineage_name])

        return idx

    else:
        return select_result[0]['v_id']


def process(cursor, lineage, earliest_date, description):
    if lineage == 'A' or lineage == 'B':
        return -1

    if description.find('Withdrawn') != -1:
        # 该分支已被取消
        insert_withdraw_lineage(cursor, lineage, earliest_date)

    else:
        # 先尝试找父变种
        parent_name = get_parent_name(lineage)
        child_idx = get_lineage_idx(cursor, lineage, earliest_date)

        parent_select_result = select_lineage_in_db(cursor, parent_name)
        if len(parent_select_result) == 0:
            # 没找到，应该是某分支的别名
            alias_name = description[9:(description.find(','))]
            parent_name = get_parent_name(alias_name)

        # 再找一次
        parent_select_result = select_lineage_in_db(cursor, parent_name)
        if len(parent_select_result) == 0:
            # 重组谱系，有两个父变种
            between_parents_and_idx = description.find(' and ')
            parent_1_name = description[len('Recombinant lineage of '):between_parents_and_idx]
            parent_2_name = description[between_parents_and_idx + len(' and '):]

            parent_1_idx = select_lineage_in_db(cursor, parent_1_name)[0]['v_id']
            insert_lineage_relation(cursor, parent_1_idx, child_idx)

            parent_2_idx = select_lineage_in_db(cursor, parent_2_name)[0]['v_id']
            insert_lineage_relation(cursor, parent_2_idx, child_idx)

        else:
            # 并非重组谱系
            # 此时parent已经入库
            parent_idx = select_lineage_in_db(cursor, parent_name)[0]['v_id']

            # 关系入库
            insert_lineage_relation(cursor, parent_idx, child_idx)


    print(str(datetime.datetime.now()) + "\t[INFO]\t" + lineage + " done.")
    return 0


if __name__ == '__main__':
    # headers = {
    #     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36'
    # }
    # response = requests.get('https://cov-lineages.org/lineage_list.html', headers=headers)
    #
    # print(str(datetime.datetime.now()) + "\t[INFO]\tResponse Status Code : " + str(response.status_code))
    #
    # html_content = response.text
    # response.close()
    #
    # soup = BeautifulSoup(html_content, 'lxml')
    # lineage_data = soup.select("#myTable > tr > td:nth-child(1) > a")
    # earliest_date_data = soup.select("#myTable > tr > td:nth-child(3)")
    # description_data = soup.select("#myTable > tr > td.desc-td")
    #
    # print(str(datetime.datetime.now()) + "\t[INFO]\tParse HTML done.")
    # cnt = 0
    #
    # with open("lineages.csv", 'w') as csv_file:
    #     csv_file.write("lineage,earliest_date,description\n")
    #     for (lineage_tag, earliest_date_tag, description_tag) in zip(lineage_data, earliest_date_data,
    #                                                                  description_data):
    #         lineage = lineage_tag.get_text()
    #         earliest_date = earliest_date_tag.get_text()
    #         description = description_tag.get_text()
    #         csv_file.write(lineage + ',' + earliest_date + ',' + description + '\n')



    connection = pymysql.connect(host='127.0.0.1', port=3306, user='savaer', password='Sava@1951581', db='SaVa',
                                 cursorclass=pymysql.cursors.DictCursor)

    cursor = connection.cursor()
    init_db(cursor)

    with open("lineages.csv", 'r') as csv_file:
        reader = csv.DictReader(csv_file)

        for line in reader:
            lineage = line.get("lineage")
            earliest_date = line.get("earliest_date")
            description = line.get("description")

            if -1 == process(cursor, lineage, earliest_date, description):
                continue


    # for (lineage_tag, earliest_date_tag, description_tag) in zip(lineage_data, earliest_date_data, description_data):
    #     lineage = lineage_tag.get_text()
    #     earliest_date = earliest_date_tag.get_text()
    #     description = description_tag.get_text()
    #
    #     if -1 == process(cursor, lineage, earliest_date, description):
    #         continue

    connection.commit()
