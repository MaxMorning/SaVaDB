export default class Localizer {
    static getLocalDict(locale) {
        if (locale === 'en-us') {
            return Localizer.en_US_dict;
        }
        else {
            return Localizer.zh_CN_dict;
        }
    }

    static en_US_dict = {
        'HomeAppTitle' : 'Home'
    }

    static zh_CN_dict = {
        'HomeAppTitle' : '主页'
    }
}