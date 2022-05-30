import csv
import pymysql
import copy
import datetime

confirm_csv_path = "time_series_covid19_confirmed_global.csv"
death_csv_path = "time_series_covid19_deaths_global.csv"
recovered_csv_path = "time_series_covid19_recovered_global.csv"

start_date = datetime.date(2020, 1, 22)


def init(db_cursor):
    delete_region_sql = "DELETE FROM `region`"
    delete_stat_sql = "DELETE FROM `statistic`"
    delete_cache_sql = "DELETE FROM `cached_world_stat_info`"
    db_cursor.execute(delete_stat_sql)
    db_cursor.execute(delete_region_sql)
    db_cursor.execute(delete_cache_sql)


def store_region_to_db(db_cursor, data):
    insert_region_sql = "INSERT INTO `region` (`region_id`, `region_name`) VALUES (%s, %s)"

    db_cursor.execute(insert_region_sql, data)


def load_csv_dict():
    stat_dict = {}

    with open(confirm_csv_path, "r") as confirm_csv:
        reader = csv.DictReader(confirm_csv)
        date_cnt = len(reader.fieldnames) - 4

        for entry in reader:
            stat_data_region = stat_dict.get(entry['Country/Region'], None)
            if stat_data_region is None:
                stat_data_region = []
                for i in range(date_cnt):
                    stat_data_region.append([0, 0, 0])

                stat_dict[entry['Country/Region']] = stat_data_region

            date_idx = 0
            for key, value in entry.items():
                if key[0] > '9' or key[0] < '0':
                    continue

                stat_data_region[date_idx][0] += int(value)

                date_idx += 1

    with open(death_csv_path, "r") as death_csv:
        reader = csv.DictReader(death_csv)

        for entry in reader:
            stat_data_region = stat_dict.get(entry['Country/Region'], None)
            if stat_data_region is None:
                stat_data_region = []
                for i in range(date_cnt):
                    stat_data_region.append([0, 0, 0])

                stat_dict[entry['Country/Region']] = stat_data_region

            date_idx = 0
            for key, value in entry.items():
                if key[0] > '9' or key[0] < '0':
                    continue

                stat_data_region[date_idx][1] += int(value)

                date_idx += 1

    with open(recovered_csv_path, "r") as recovered_csv:
        reader = csv.DictReader(recovered_csv)

        for entry in reader:
            stat_data_region = stat_dict.get(entry['Country/Region'], None)
            if stat_data_region is None:
                stat_data_region = []
                for i in range(date_cnt):
                    stat_data_region.append([0, 0, 0])

                stat_dict[entry['Country/Region']] = stat_data_region

            date_idx = 0
            for key, value in entry.items():
                if key[0] > '9' or key[0] < '0':
                    continue

                stat_data_region[date_idx][2] += int(value)

                date_idx += 1

    print("[LOG]\tLoad CSV done.")

    return stat_dict


def store_to_db_dict(db_cursor, stat_dict):
    region_idx = 0
    insert_stat_sql = "INSERT INTO `statistic` (`region_id`, `stat_date`, `existing_confirmed_cnt`, `death_cnt`, `cured_cnt`) VALUES (%s, %s, %s, %s, %s)"

    for key, data in stat_dict.items():
        # 源数据有问题，需要特判
        if key == "China":
            store_region_to_db(db_cursor, [region_idx, "China(Mainland)"])
        elif key == "Taiwan*":
            store_region_to_db(db_cursor, [region_idx, "Taiwan(PRC)"])
        else:
            store_region_to_db(db_cursor, [region_idx, key])

        date_idx = 0
        max_data_per_day = [0, 0, 0]
        for data_per_day in data:
            stat_date = start_date + datetime.timedelta(days=date_idx)

            # 一些地区没有数据为0，SaVa中沿用最近的有效数据
            max_data_per_day = [max(max_data_per_day[0], data_per_day[0]),
                                max(max_data_per_day[1], data_per_day[1]),
                                max(max_data_per_day[2], data_per_day[2])]

            db_cursor.execute(insert_stat_sql, (region_idx,
                                                "{year}-{mon}-{date} 00:00:00".format(year=stat_date.year,
                                                                                      mon=stat_date.month,
                                                                                      date=stat_date.day)
                                                , max_data_per_day[0], max_data_per_day[1], max_data_per_day[2],))
            date_idx += 1

        region_idx += 1

    print("[LOG]\tInsert done.")


def update_cache(db_cursor):
    update_sql = "insert into cached_world_stat_info select stat_date, sum(ALL existing_confirmed_cnt), sum(ALL death_cnt), sum(ALL cured_cnt) from statistic group by stat_date"
    db_cursor.execute(update_sql)


if __name__ == '__main__':
    connection = pymysql.connect(host='127.0.0.1', port=3306, user='savaer', password='Sava@1951581', db='SaVa',
                                 cursorclass=pymysql.cursors.DictCursor)

    cursor = connection.cursor()

    init(cursor)
    print("[LOG]\tInit done.")

    global_stat_dict = load_csv_dict()

    store_to_db_dict(cursor, global_stat_dict)

    update_cache(cursor)

    connection.commit()
    print("[LOG]\tCommit done.")
