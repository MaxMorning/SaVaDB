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

        // HomeApp
        'HomeAppIntroduction' : 'Introduction',
        'HomeAppIntroContent' : 'This is a ...',
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
    }

    static zh_CN_dict = {
        'HomeAppTitle' : '主页',
        'SubRegionsTitle' : '关注地区',
        'SubLineagesTitle' : '关注变种',
        'SearchTitle' : '搜索',
        'LineagesTitle' : '谱系树',
        'CompareTitle' : '序列匹配',
        'StatisticsTitle' : '统计数据',

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

        // HomeApp
        'HomeAppIntroduction' : '简介',
        'HomeAppIntroContent' : '这是一个 SARS-Cov-19 病毒变种数据库网站，记录了从公开领域获取的病毒变种数据和统计信息。此外，本网站对公共领域提供API，供使用者进行数据分析用。\n希望疫情早日结束。',
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
    }
}