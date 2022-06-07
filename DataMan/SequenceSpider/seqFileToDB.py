import os
import pymysql

seq_path = r"G:\FTP\TransTemp\Seme6\genome_data"

def select_lineage_in_db(cursor, lineage_name):
    select_sql = "select * from pango_nomenclature where variant = %s"
    cursor.execute(select_sql, lineage_name)
    return cursor.fetchall()

def store_to_db(path_map):
    connection = pymysql.connect(host='127.0.0.1', port=3306, user='savaer', password='Sava@1951581', db='SaVa',
                                 cursorclass=pymysql.cursors.DictCursor)

    cursor = connection.cursor()

    cursor.execute("delete from gene_info")

    insert_sql = "insert into gene_info value (%s, %s)"

    for lineage, path in path_map.items():
        # 假定所有的分支都已经入库
        lineage_idx = select_lineage_in_db(cursor, lineage)[0]['v_id']

        cursor.execute(insert_sql, [lineage_idx, path])

    connection.commit()


if __name__ == '__main__':
    seq_files = os.listdir(seq_path)

    name_path_map = {}

    for file_name in seq_files:
        if file_name[-6:] == '.fasta':
            name_path_map[file_name[:-6]] = os.path.join(seq_path, file_name)

    store_to_db(name_path_map)
