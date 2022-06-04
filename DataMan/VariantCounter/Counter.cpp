/**
 * @file Counter.cpp
 * @brief 清洗从NCBI下载的CSV文件，该文件包括不完整序列的变种，清洗出变种名、最早发现时间、序列数量
 * @author Morning Han
 * @date 2022/5/31
 */

#include <fstream>
#include <iostream>
#include <string>
#include <cstring>

#define CSV_PATH "sequences.csv"
#define TARGET_PATH "countResult.csv"
#define RESULT_HEADER "Pangolin,SeqCount,CollectionDate"

// 要清洗的数据长这样
/*
Accession,Pangolin,PangoVersions,Collection_Date
ON612533,A,4.0.6/1.8/v0.1.10/0.3.17,2020-05-13
ON613139,A,4.0.6/1.8/v0.1.10/0.3.17,2020-03-17
ON532638,A,4.0.6/1.8/v0.1.10/0.3.17,2022-02-15
ON532639,A,4.0.6/1.8/v0.1.10/0.3.17,2022-02-15
ON532640,A,4.0.6/1.8/v0.1.10/0.3.17,2022-02-15
*/

using namespace std;

int main() {
    string line;
    ifstream file_in(CSV_PATH);
    ofstream file_out(TARGET_PATH);

    // 先消耗掉第一行标题
    getline(file_in, line);

    file_out << RESULT_HEADER << endl;

    char split_buffer[4][32];
    char prev_lineage[32] = {};
    int var_cnt = 0;

    int idx = 0;
    int current_idx = 0;

    int seq_count = 0;
    int min_date_value = 2147483647;
    int current_year, current_month, current_date;
    char date_buffer[32]{};

    while (getline(file_in, line)) {
        idx = 0;
        current_idx = 0;

        for (int i = 0; i < line.length(); ++i) {
            if (line[i] == ',') {
                split_buffer[idx][current_idx] = '\0';
                ++idx;
                current_idx = 0;
            }
            else if (line[i] == '\r' || line[i] == '\n') {
                split_buffer[idx][current_idx] = '\0';
                break;
            }
            else {
                split_buffer[idx][current_idx] = line[i];
                ++current_idx;
            }
        }

        int date_length = strlen(split_buffer[3]);
        sscanf_s(split_buffer[3], "%d", &current_year);
        if (date_length > 5) {
            sscanf_s(&(split_buffer[3][0]) + 5, "%d", &current_month);

            if (date_length > 8) {
                sscanf_s(&(split_buffer[3][0]) + 8, "%d", &current_date);
            }
            else {
                current_date = 28;
            }
        }
        else {
            current_month = 12;
        }

        int date_value = 10000 * current_year + 100 * current_month + current_date;
        if (min_date_value > date_value) {
            min_date_value = date_value;
        }

        ++seq_count;

        // 判断重复Lineage
        if (strcmp(prev_lineage, split_buffer[1]) != 0) {
            // 当前Lineage和前一个Lineage不同
            if (var_cnt == 0) {
                // CSV中第一条记录
                memcpy(prev_lineage, split_buffer[1], 32);
                ++var_cnt;
                continue;
            }

            // 记录最早采集日期
            int min_year = min_date_value / 10000;
            min_date_value = min_date_value % 10000;
            int min_month = min_date_value / 100;
            int min_date = min_date_value % 100;
            min_date_value = 2147483647;
            sprintf_s(date_buffer, 32, "%04d-%02d-%02d", min_year, min_month, min_date);

            file_out << prev_lineage << ',' << seq_count << ',' << date_buffer << endl;
            cout << "New Lineage : " << prev_lineage << endl;

            seq_count = 0;
            memcpy(prev_lineage, split_buffer[1], 32);
            ++var_cnt;
        }
    }

    // 最后再处理一下
    // 记录最早采集日期
    int min_year = min_date_value / 10000;
    min_date_value = min_date_value % 10000;
    int min_month = min_date_value / 100;
    int min_date = min_date_value % 100;
    min_date_value = 2147483647;
    sprintf_s(date_buffer, 32, "%04d-%02d-%02d", min_year, min_month, min_date);

    file_out << prev_lineage << ',' << seq_count << ',' << date_buffer << endl;
    cout << "New Lineage : " << prev_lineage << endl;

    file_out.close();
    file_in.close();
    return 0;
}