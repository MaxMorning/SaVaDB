export default class Localizer {
    static getLocalDict(locale) {
        Localizer.currentLocale = locale;

        if (locale === 'en-us') {
            return Localizer.en_US_dict;
        }
        else {
            return Localizer.zh_CN_dict;
        }
    }

    static getCurrentLocalDict() {
        return Localizer.getLocalDict(Localizer.currentLocale);
    }

    static en_US_dict = {
        'HomeAppTitle' : 'Home',
        'SubRegionsTitle' : 'Subscribed Regions',
        'SubLineagesTitle' : 'Subscribed Lineages',
        'SearchTitle' : 'Search',
        'LineagesTitle' : 'Lineages',
        'CompareTitle' : 'Compare',
        'StatisticsTitle' : 'Statistics',
        'StatusTitle' : 'Lineage Status',
        
        'FooterText' : 'Sars-CoV-19 Variant DataBase Created by Morning Han',

        // siders
        'SiderSubscribe' : 'Subscribe',
        'SiderRegions' : 'Regions',
        'SiderLineages' : 'Lineages',
        'SiderVariants' : 'Variants',
        'SiderData' : 'Data',
        'SiderDataSource' : 'Data source',
        'SiderUser' : 'User',
        'SiderInfo' : 'Info',
        'SiderLogout' : 'Log out',
        'SiderLogin' : 'Log in',
        'Edit Info': 'Edit Info',
        'EditInfoTitle': 'Edit Info', 
        'Control Pannel' : 'Control Pannel',
        'Admin' : 'Admin',
        'Status' : 'Status',

        // HomeApp
        'HomeAppIntroduction' : 'Introduction',
        'HomeAppIntroContent' : 
`SaVaDB is a SARS-Cov-19 variant database website that records virus variant data and statistics obtained from the public domain. In addition, the site provides APIs to the public domain for users to perform data analysis. Please pay attention to the copyright of the data source when using the data.
May we come through the epidemic.
`,
        'HomeAppGlobalStat' : 'Global Statistics',
        'HomeAppGlobalStatUpdateTimePrefix' : 'Data updated at ',
        'Confirm case yesterday' : 'Confirm case yesterday',
        'Confirm case total' : 'Confirm case total',
        'Death case yesterday' : 'Death case yesterday',
        'Death case total' : 'Death case total',
        'Cured case yesterday' : 'Cured case yesterday',
        'Cured case total' : 'Cured case total',
        'Notifications' : 'Notifications',

        'Loading...' : 'Loading...',
        '403Hint' : 'Sorry, you are not authorized to access this page.',
        'No Subscribing Region' : 'No Subscribed Region',
        'NoSubRegionHint' : 'You are not subscribing any region.',
        'No Subscribing Lineage' : 'No Subscribing Lineage',
        'NoSubLineageHint' : 'You are not subscribing any lineage.',

        'Lineage' : 'Lineage',
        'Region' : 'Region',
        'Notification' : 'Notification',
        'Search' : 'Search',
        'input search text' : 'input search text',
        'Not Selected' : 'Not Selected',
        'NotSelectedHint' : 'Please select some regions to explore or compare.',

        'First Region' : 'First Region',
        'Second Region' : 'Second Region',
        'First Region Detail' : 'First Region Detail',
        'Second Region Detail' : 'Second Region Detail',

        'Paste sequence here' : 'Paste sequence here',
        'Open FASTA file' : 'Open FASTA file',
        'Upload to compare' : 'Upload to compare',
        'Compare Histroy' : 'Compare Histroy',
        'Compare Result' : 'Compare Result',
        'Levenstain Distance' : 'Levenstain Distance',
        'Simularity' : 'Simularity',
        'status' : 'Status',
        'Time' : 'Time',

        'Get Data' : 'Get Data',
        'Interval' : 'Interval Days',
        'LineageDetail' : 'Lineage Detail',

        'RegionDetail' : 'Region Detail',
        'MonitorLevel' : 'Monitor Level',
        'WHOLabel' : 'WHO Label',

        'DataSource' : 'Data Source',
        'RegionStatSource' : 'Region Statistics',
        'RegionStatSourceDetail' :
`The confirmed, death and cured count of regions comes from a project of Johns Hopkins University.The repository address is \'https://github.com/CSSEGISandData/COVID-19\'.Data was scratched, cleaned and stored by SaVaDB. SaVaDB adjusted the naming of some regions in the original repository based on its own position and international consensus.
In some regions, cure data are missing, so we chooses to use the most recent available cure data.
The repositroy's data comes from the statistics of local governments. Please note that due to the special political nature of THE COVID-19 epidemic, there may be over-reporting or under-reporting of data in some regions. Please pay attention to these situation.
`,
        'BioDataSource' : ' Biological Data',
        'BioDatasourceDetail' : 
`The biological data includes cDNA sequence and lineage info.
The former data were extracted from the National Center for Biotechnology Information, then be cleaned and stored by SaVaDB. As the reference sequence of each variant has not been clearly defined in the academic circle, SaVaDB takes a cDNA sequence of each variant as the reference sequence of this variant.
The latter data comes from http://cov-lineages.org/lineage_list.html, which is crawled and cleaned by SaVaDB and processed by staff and automatically stored in the database.
`,
        'EpidemicDataSource' : 'Epidemic Data',
        'EpidemicDataSourceDetail' :
`At present, the prevention and control data consists of WHO label and monitoring level.
These two data were obtained from who.int, the official website of WHO, and were manually added by the staff.
`, 
        'CopyrightSource' : 'Ownership and Licensing of Data',
        'CopyrightSourceDetail' :
`Data on confirms, deaths, and cures by region are from Johns Hopkins University, USA, under CC BY 4.0 license. JHU All rights reserved.
The cDNA sequence information was obtained from the NCBI database and is in the public domain. NCBI aims to provide the scientific community with a timely and comprehensive source of information. Therefore, NCBI itself has no restrictions on the use or distribution of the data contained therein. However, submitters of some of the original data that have been submitted (or the country of origin of such data) may claim patent, copyright or other intellectual property rights for all or part of the data; SaVaDB does not warrant that it will be able to inform you of this change in a timely manner.
Lineage information from COV-Lineages.org is under CC BY-NC 4.0 license and is not available for commercial use. cov-lineages.org All rights reserved.

SaVaDB does not guarantee the accuracy or completeness or assume any legal responsibility for all data obtained from the system.
All data in SaVaDB is freely available to the public domain, with the exception of user information and some data that we consider inappropriate for disclosure. The final interpretation right belongs to SaVaDB operator.
`,
        ' (Per Week)' : ' (Per Week)',
        'Detail' : 'Detail',
        'Confirmed' : 'Confirmed',
        'Death' : 'Death',
        'Cured' : 'Cured',
        'WHO label' : 'WHO label',
        'Monitor level' : 'Monitor level',
        'Earlist discover date' : 'Earlist discover date',
        'Average incubation' : 'Average incubation',
        'Sequence Count' : 'Sequence Count',
        'Children Count' : 'Children Count',
        'Update time' : 'Update time',
        'Day' : 'Day',
        'Total ' : 'Total ',

        'API Details' : 'API Details',

        'Name duplicated' : 'Name duplicated',
        'Name dup info' : 'New username is used, please use another username.',
        'Change Failed' :  'Change Failed',
        'Change user failed Info' : 'Change username failed because of some unknown reason.',
        'Change password failed Info' : 'Change password failed because of some unknown reason.',

        'Edit Info' : 'Edit Info',
        'Change Username' : 'Change Username',
        'New username' : 'New username',
        'Username empty info' : 'Please input your new username!',
        'Password empty info' : 'Please input your password!',
        'Password' : 'Password',

        'Change password' : 'Change password',
        'Old password empty' : 'Please input your old password!',
        'Old password' : 'Old password',
        'New password empty' : 'Please input your new password!',
        'New password' : 'New password',
        'Confirm Password' : 'Confirm Password',
        'Confirm empty' : 'Please confirm your password!',
        'Comfirm not equal' : 'The two passwords that you entered do not match!',

        'Submit Failed': 'Submit Failed',
        'Entity not exist.' : 'Entity not exist.',
        'Submit failed info' : 'Submit failed because of some unknown reason.',

        'Control Panel' : 'Control Panel',
        'Publish New Notification' : 'Publish New Notification',
        'Notification Title' : 'Notification Title',
        'Notification Content' : 'Notification Content',
        'Noti title empty' : 'Please type in the title.',
        'Noti content empty' : 'Please type in the content.',

        'Set User Compare Time' : 'Set User Compare Time',
        'Username' : 'Username',
        'New Compare Time' : 'New Compare Time',
        'New Time' : 'Time',
        'Username empty time' : 'Please input the username',
        'Comp time empty' : 'Please input the new compare time',

        'Set Monitor Level' : 'Set Monitor Level',
        'Target Variant Name' : 'Target Variant Name',
        'Variant Name' : 'Variant Name',
        'Target variant empty' : 'Please input the target variant',

        'Set WHO Label' : 'Set WHO Label',
        'Target who empty' : 'Please input the WHO label!',

        'Login' : 'Login',
        'Remember me' : 'Remember me',
        'Forgot password' : 'Forgot password',
        'Log in' : 'Log in',

        'Register' : 'Register',
        'Invalid Email info' : 'The input is not valid E-mail!',
        'Email empty info' : 'Please input your E-mail!',

        'Login Failed' : 'Login Failed',
        'Login Failed Info' : 'Wrong username or password.',
        'Register Failed' : 'Register Failed',
        'Register Username Duplicated' : 'The username is already registered, please use another one.',
        'Register Failed Info' : 'Register failed because of some unknown reason.',

        '404Hint' : 'Sorry, the page you visited does not exist.',
        'Withdraw lineage seq' : 'This lineage has been withdrawn thus there is no reference sequence.',
        'Parent Lineage' : 'Parent Lineage',

        'Lineage Family' : 'Lineage Family',
        'Ref Sequence' : 'Ref Sequence',

        'Unsubscribe' : 'Unsubscribe',
        'Subscribe' : 'Subscribe',

        'Verify failed' : 'Verify failed',
        'Wrong verify code.' : 'Wrong verify code.',
        'Unknown error' : 'Unknown error',

        'Get Verify Code Failed' : 'Get Verify Code Failed',
        'Wrong Email.' : 'Wrong Email.',

        'Successfully Reset Password!' : 'Successfully Reset Password!',
        'Go to Home Page' : 'Go to Home Page',

        'Verify Email' : 'Verify Email',
        'Change new password' : 'Change new password',
        'Done' : 'Done',
        'Verify Code' : 'Verify Code',
        'Reset Password' : 'Reset Password',
        'New Password' : 'New Password',
        'Submit' : 'Submit',

        'Get Code' : 'Get Code',

        'Upload Done' : 'Upload Done',
        'Upload done hint' : 'The server will compare the sequence you submitted with those in database.Please wait for a moment and refresh the page.',
        'Compare Time ran out' : 'Compare Time ran out',
        'Compare time ranout hint' : 'You cannot compare sequence any more.',
    }

    static zh_CN_dict = {
        'HomeAppTitle' : '主页',
        'SubRegionsTitle' : '关注地区',
        'SubLineagesTitle' : '关注变种',
        'SearchTitle' : '搜索',
        'LineagesTitle' : '谱系树',
        'CompareTitle' : '序列匹配',
        'StatisticsTitle' : '统计数据',
        'StatusTitle' : '变种状态',

        'FooterText' : 'Sars-CoV-19 病毒变种数据库',

        // 侧边栏
        'SiderSubscribe' : '关注',
        'SiderRegions' : '关注地区',
        'SiderLineages' : '关注变种',
        'SiderVariants' : '变种信息',
        'SiderData' : '数据',
        'SiderDataSource' : '数据来源',
        'SiderUser' : '用户',
        'SiderInfo' : '用户信息',
        'SiderLogout' : '登出',
        'SiderLogin' : '登录',
        'Edit Info' : '修改信息',
        'EditInfoTitle': '修改信息', 
        'Control Pannel' : '控制面板',
        'Admin' : '管理员',
        'Status' : '状态',

        // HomeApp
        'HomeAppIntroduction' : '简介',
        'HomeAppIntroContent' : 
`SaVaDB 是一个 SARS-Cov-19 病毒变种数据库网站，记录了从公开领域获取的病毒变种数据和统计信息。此外，本网站对公共领域提供API，供使用者进行数据分析用。在使用时请注意数据来源的著作权与版权声明。
希望疫情早日结束。`,
        'HomeAppGlobalStat' : '全球数据统计',
        'HomeAppGlobalStatUpdateTimePrefix' : '数据更新于 ',
        'Confirm case yesterday' : '昨日确诊人数',
        'Confirm case total' : '总确诊人数',
        'Death case yesterday' : '昨日死亡人数',
        'Death case total' : '总死亡人数',
        'Cured case yesterday' : '昨日治愈人数',
        'Cured case total' : '总治愈人数',
        'Notifications' : '公告',

        'Loading...' : '加载中...',
        '403Hint' : '抱歉，您无权访问该页面。请尝试登录。',
        'No Subscribing Region' : '无关注地区',
        'NoSubRegionHint' : '您尚未关注任何地区。',
        'No Subscribing Lineage' : '无关注变种',
        'NoSubLineageHint' : '您尚未关注任何变种。',

        'Lineage' : '变种',
        'Region' : '地区',
        'Notification' : '公告',
        'Search' : '搜索',
        'input search text' : '键入搜索内容',
        'Not Selected' : '未选择地区',
        'NotSelectedHint' : '请选择一或两个地区以进行可视化展示。',

        'First Region' : '地区一',
        'Second Region' : '地区二',
        'First Region Detail' : '地区一详细数据',
        'Second Region Detail' : '地区二详细数据',

        'Paste sequence here' : '在此粘贴序列数据',
        'Open FASTA file' : '打开 FASTA 文件',
        'Upload to compare' : '上传以进行匹配',
        'Compare Histroy' : '匹配历史',
        'Compare Result' : '匹配结果',
        'Levenstain Distance' : 'Levenstain 距离',
        'Simularity' : '相似度',
        'Time' : '提交时间',

        'Get Data' : '检索数据',
        'Interval' : '间隔天数',

        'LineageDetail' : '变种详情',
        'RegionDetail' : '地区详情',

        'MonitorLevel' : '监视等级',
        'WHOLabel' : 'WHO 命名',

        'DataSource' : '数据来源',
        'RegionStatSource' : '地区统计数据',
        'RegionStatSourceDetail' :
`各地区确诊、死亡、治愈数据来源于约翰霍普金斯大学的新冠疫情数据统计项目，其数据仓库地址为\'https://github.com/CSSEGISandData/COVID-19\'，由SaVaDB进行爬取、清洗和入库。SaVaDB基于自身立场与国际普遍共识，对原始仓库的部分地区命名进行了调整。
部分地区缺失治愈数据，SaVaDB选择沿用最近的有效治愈数据。
该仓库的数据来源于各地区政府的统计信息。请注意，由于COVID疫情的特殊政治性，部分地区可能存在数据多报与漏报的情况，请注意甄别。
`,
        'BioDataSource' : '生物学数据',
        'BioDatasourceDetail' : 
`生物学信息包括病毒变种cDNA序列和谱系信息。
前者数据来源于美国国家生物技术信息中心，由SaVaDB进行爬取、清洗和入库。由于目前学术界并未明确界定各个变种的参考序列，SaVaDB取各个变种中的一条cDNA序列作为该变种的参考序列。
后者数据来源于http://cov-lineages.org/lineage_list.html，由SaVaDB在爬取、清洗后由工作人员处理并自动入库。
`,
        'EpidemicDataSource' : '疫情防治数据', 
        'EpidemicDataSourceDetail' :
`目前防治数据由WHO命名和监视等级两部分组成。
这两部分数据均来源于世界卫生组织WHO官方网站who.int，由工作人员手动添加。
`,
        'CopyrightSource' : '数据所有权归属与使用许可',
        'CopyrightSourceDetail' :
`各地区确诊、死亡、治愈数据来自美国约翰霍普金斯大学，采用CC BY 4.0协议，版权归约翰霍普金斯大学所有。
cDNA序列信息来自NCBI数据库，属于公共领域。NCBI旨在为科学界提供及时和全面的信息来源。因此，NCBI本身对其中包含的数据的使用或分发没有任何限制。然而，一些已经提交的原始数据(或这些数据的原产国)的提交人可能会要求专利、版权或其他知识产权的全部或部分数据；SaVaDB不保证能够向您及时通知这一变更。
谱系信息来自cov-lineages.org，采用CC BY-NC 4.0协议，版权归cov-lineages.org所有，不可商用。

对于从本系统获得的所有数据，SaVaDB不担保准确性与完整性或承担任何法律责任。
除用户信息和一些我们认为不适宜公开的数据以外，SaVaDB中的其他所有数据免费向公共领域开放。最终解释权归SaVaDB运营方所有。
`,
        ' (Per Week)' : ' (每周)',
        'Detail' : '详情',
        'Confirmed' : '确诊',
        'Death' : '死亡',
        'Cured' : '治愈',
        'WHO label' : 'WHO 命名',
        'Monitor level' : '监视等级',
        'Earlist discover date' : '最早发现日期',
        'Average incubation' : '平均潜伏期',
        'Sequence Count' : 'cDNA序列数量',
        'Children Count' : '子变种数量',
        'Update time' : '更新时间',
        'Day' : '天',
        'Total ' : '累计',

        'API Details' : 'API 详情',

        'Name duplicated' : '用户名重复',
        'Name dup info' : '新用户名已被使用，请使用其他用户名。',
        'Change Failed' : '修改失败',
        'Change user failed Info' : '由于一些未知原因，修改用户名失败。',
        'Change password failed Info' : '由于一些未知原因，修改密码失败。',

        'Edit Info' : '修改信息',
        'Change Username' : '修改用户名',
        'New username' : '新用户名',
        'Username empty info' : '请输入您的新用户名。',
        'Password empty info' : '请输入您的密码。',
        'Password' : '密码',

        'Change password' : '修改密码',
        'Old password empty' : '请输入您的旧密码。',
        'Old password' : '旧密码',
        'New password empty' : '请输入您的新密码。',
        'New password' : '新密码',
        'Confirm Password' : '二次确认密码',
        'Confirm empty' : '请再次确认密码。',
        'Comfirm not equal' : '两次输入密码不一致。',

        'Submit Failed' : '提交失败',
        'Entity not exist.' : '实体不存在。',
        'Submit failed info' : '由于一些未知原因，提交失败。',

        'Control Panel' : '控制面板',
        'Publish New Notification' : '发布新公告',
        'Notification Title' : '公告标题',
        'Notification Content' : '公告内容',
        'Noti title empty' : '请输入公告标题。',
        'Noti content empty' : '请输入公告内容。',

        'Set User Compare Time' : '设置用户可用匹配次数',
        'Username' : '用户名',
        'New Compare Time' : '新的可用匹配次数',
        'New Time' : '新次数',
        'Username empty time' : '请输入用户名。',
        'Comp time empty' : '请输入新的可用匹配次数。',

        'Set Monitor Level' : '设置监视等级',
        'Target Variant Name' : '目标变种',
        'Variant Name' : '变种名称',
        'Target variant empty' : '请输入目标变种名称。',

        'Set WHO Label' : '设置 WHO 命名',
        'Target who empty' : '请输入 WHO 命名。',

        'Login' : '登录',
        'Remember me' : '保持登录',
        'Forgot password' : '忘记密码',
        'Log in' : '登录',

        'Register' : '注册',
        'Invalid Email info' : '输入邮箱名非法。',
        'Email empty info' : '请输入您的邮箱。',
        
        'Login Failed' : '登录失败',
        'Login Failed Info' : '用户名或密码错误。',
        'Register Failed' : '注册失败',
        'Register Username Duplicated' : '当前用户名已被注册，请使用其他用户名。',
        'Register Failed Info' : '由于一些未知原因，注册失败。',

        '404Hint' : '您访问的页面不存在。',
        'Withdraw lineage seq' : '这一谱系已被撤销，因此没有参考序列。',
        'Parent Lineage' : '父变种',

        'Lineage Family' : '血缘树',
        'Ref Sequence' : '参考序列',

        'Unsubscribe' : '取消关注',
        'Subscribe' : '关注',

        'Verify failed' : '校验错误',
        'Wrong verify code.' : '验证码不匹配',
        'Unknown error' : '未知错误',

        'Get Verify Code Failed' : '获取验证码出错',
        'Wrong Email.' : '邮箱地址错误。',

        'Successfully Reset Password!' : '成功重置密码。',
        'Go to Home Page' : '前往主页',

        'Verify Email' : '验证邮箱',
        'Change new password' : '设置新密码',
        'Done' : '完成',
        'Verify Code' : '验证码',
        'Reset Password' : '重置密码',
        'New Password' : '设置新密码',
        'Submit' : '提交',

        'Get Code' : '发送验证码',

        'Upload Done' : '上传完成',
        'Upload done hint' : '服务器将会比较您上传的序列和数据库中的参考序列，请等待一会后刷新页面。',
        'Compare Time ran out' : '无可用匹配次数',
        'Compare time ranout hint' : '您目前不能请求匹配序列。',
}
}