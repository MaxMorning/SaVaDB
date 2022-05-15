/**
 * @file SummaryCleaner.cpp
 * @brief 清洗从NCBI下载的CSV文件，清洗出Accession、变种名、发现时间、序列长度；每种变种取一个即可
 * @author Morning Han
 * @date 2022/5/13
 */

#include <fstream>
#include <iostream>
#include <string>
#include <cstring>

#define CSV_PATH "sequencesSummary.csv"
#define TARGET_PATH "cleanedSequence.csv"
#define RESULT_HEADER "Accession,Pangolin,Length,Release_Date"

// 要清洗的数据长这样
/*
Accession,Release_Date,Pangolin,PangoVersions,Length
ON394272.1,2022-05-02T00:00:00Z,A,4.0.6/1.8/v0.1.10/0.3.17,29782
MW837147.1,2022-04-30T00:00:00Z,A,4.0.6/1.8/v0.1.10/0.3.17,29877
ON311149.1,2022-04-29T00:00:00Z,A,4.0.6/1.8/v0.1.10/0.3.17,29782
*/

using namespace std;

int main() {
    string line;
    ifstream file_in(CSV_PATH);
    ofstream file_out(TARGET_PATH);

    // 先消耗掉第一行标题
    getline(file_in, line);

    file_out << RESULT_HEADER << endl;

    char split_buffer[5][32];
    char prev_lineage[32] = {};

    while (getline(file_in, line)) {
        int idx = 0;
        int current_idx = 0;

        bool new_lineage = true;

        for (int i = 0; i < line.length(); ++i) {
            if (line[i] == ',') {
                split_buffer[idx][current_idx] = '\0';

                // 判断重复Lineage
                if (idx == 2) {
                    if (strcmp(prev_lineage, split_buffer[idx]) == 0) {
                        // 当前Lineage和前一个Lineage相同，舍去这一行
                        new_lineage = false;
                        break;
                    }
                    else {
                        new_lineage = true;
                        memcpy(prev_lineage, split_buffer[idx], 32);
                    }
                }
                ++idx;
                current_idx = 0;
            }
            else if (line[i] == '\r' || line[i] == '\n') {
                break;
            }
            else {
                split_buffer[idx][current_idx] = line[i];
                ++current_idx;
            }
        }

        if (new_lineage) {
            file_out << split_buffer[0] << ',' << split_buffer[2] << ',' << split_buffer[4] << ',' << split_buffer[1] << endl;
            cout << "New Lineage : " << split_buffer[2] << endl;
        }
    }

    file_out.close();
    file_in.close();
    return 0;
}