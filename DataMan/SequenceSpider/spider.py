import os.path
import random
import time

from bs4 import BeautifulSoup
import requests
import csv


def get_all_lineages(csv_path):
    """
    从CSV加载所有的变种，及其编号
    :param csv_path: csv文件路径
    :return: list[][2]，list[][0]为Accession，list[][1]为Lineage
    """
    with open(csv_path, "r") as csv_file:
        reader = csv.DictReader(csv_file)
        result_list = []
        for entry in reader:
            result_list.append([entry["Accession"], entry["Pangolin"]])

        return result_list


headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    }


def scratch_fasta(lineage_list, fasta_dir):
    """
    爬取fasta数据
    :param lineage_list: get_all_lineages返回的列表
    :param fasta_dir: 存储
    :return: None
    """
    for entry in lineage_list:
        response = requests.get('https://www.ncbi.nlm.nih.gov/nuccore/{}?report=fasta'.format(entry[0]), headers=headers)

        html_content = response.text

        soup = BeautifulSoup(html_content, 'lxml')
        fasta_data = soup.select("#viewercontent1")

        fasta_id = fasta_data[0]["val"]

        # 再次请求数据
        fasta_response = requests.get('https://www.ncbi.nlm.nih.gov/sviewer/viewer.fcgi?id={}&db=nuccore&report=fasta&extrafeat=null&conwithfeat=on&hide-cdd=on&retmode=html&withmarkup=on&tool=portal&log$=seqview&maxdownloadsize=1000000'.format(fasta_id), headers=headers)
        with open(os.path.join(fasta_dir, entry[1] + ".fasta"), "w") as fasta_out:
            fasta_out.write(fasta_response.text)

        print("[LOG]\tLineage {} data get.".format(entry[1]))

        # 不用睡，连接很慢，对服务器造不成太大压力
        # # 随机睡眠时长，避免为服务器造成过大压力
        # time.sleep(random.random())


if __name__ == '__main__':
    load_result = get_all_lineages("cleanedSequence.csv")

    print("[LOG]\tCSV load done.")

    scratch_fasta(load_result, "genome_data")
