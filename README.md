# SaVaDB
A SARS-CoV-2 Variants Database online

## 部署
### 1. 前端
由于SaVaDB使用动态路由，无法打包成静态网站，因此需要在npm中启动。  
在SaVaDB前端目录(/Frontend/sava_frontend)处执行如下代码；运行前需要确认node.js及其相关依赖已安装。  
    
    npm start

#### 环境变量配置
由于我没有公网IP，SaVaDB的前后端服务器在局域网中交换信息。后端服务器地址在/Frontend/sava_frontend/src/utils/Requester.js中指定，默认为192.168.0.103:8080，可以替换为部署时的后端服务器地址。

### 2. 数据库
0. 配置前需要先安装MySQL或者mariaDB；
1. 接着创建sava数据库；
2. 使用拥有sava数据库完全访问权限的用户执行schema.sql脚本


### 3. 后端
使用如下代码启动后端。启动前需要Java环境。jar文件需要自行编译

    java -jar Backend-1.0.0.jar -spring.config.location=application.yaml

#### 环境变量配置
后端相关的配置项均在jar文件同目录的application.yaml中。

| 键 | 含义 |
| -- | -- |
| spring.datasource.username | MySQL(mariaDB)中拥有sava数据库完全访问权限的用户 |
| spring.datasource.password | 上述用户的密码 |
| seq_file_info.comp_result_dir | 存放匹配结果的目录路径 
| seq_file_info.comp_exe_path | Cuda匹配程序的路径
| seq_file_info.ref_seq_dir | 存放参考序列的目录路径

## 4. 数据爬取
### 4.1 疫情统计数据爬取
运行/DataMan/DailyDataImport/importDailyToDB.py脚本可以自动爬取、清洗并入库。

#### 4.2 变种参考序列爬取
1. 先从NBCI下载包含所有变种序列信息的sequences.csv文件，将其放置于/DataMan/SequenceSpider目录下；
2. 编译并运行SummaryCleaner.cpp；
3. 运行spider.py爬取所有参考序列；
4. 运行seqFileToDB.py，将参考序列的信息存入数据库

#### 4.3 变种血统关系爬取
运行/DataMan/LineageToDB/LineageToDB.py脚本可以自动爬取数据并清洗入库。由于源网站一直在变动，可能需要人工的介入。

#### 4.4 变种统计数据获取
1. 将“变种参考序列爬取”中取得的sequences.csv文件移动一份到/DataMan/VariantCounter目录；
2. 编译并运行Counter.cpp，得到countResult.csv；
3. 运行commitToDB.py，将数据导入数据库。