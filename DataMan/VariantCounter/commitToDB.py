import csv
import pymysql

csv_path = "countResult.csv"

def update_time(db_cursor):
    update_sql = "insert into info_map value ('variant_update_time', sysdate())"
    db_cursor.execute(update_sql)

def insert_to_db(db_cursor):
    insert_sql = "insert into variant values (%s, %s, 'None', -1, -1, %s, null, 'Normal', now())"
    insert_name_sql = "insert into pango_nomenclature values (%s, %s)"
    with open(csv_path, 'r') as csv_file:
        reader = csv.DictReader(csv_file)
        idx = 0

        for line in reader:
            db_cursor.execute(insert_sql, [idx, line['CollectionDate'], line['SeqCount']])
            db_cursor.execute(insert_name_sql, [idx, line['Pangolin']])

            print("[LOG]\t" + line['Pangolin'] + " done.")
            idx += 1


if __name__ == '__main__':
    connection = pymysql.connect(host='127.0.0.1', port=3306, user='savaer', password='Sava@1951581', db='SaVa',
                                 cursorclass=pymysql.cursors.DictCursor)

    cursor = connection.cursor()
    insert_to_db(cursor)
    connection.commit()
