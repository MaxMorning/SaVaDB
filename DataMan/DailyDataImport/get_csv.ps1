$client = new-object System.Net.WebClient
$client.DownloadFile('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv', 'F:\TestCode\Java\SaVaDB\DataMan\DailyDataImport\time_series_covid19_confirmed_global.csv')

$client.DownloadFile('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv', 'F:\TestCode\Java\SaVaDB\DataMan\DailyDataImport\time_series_covid19_deaths_global.csv')

$client.DownloadFile('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv', 'F:\TestCode\Java\SaVaDB\DataMan\DailyDataImport\time_series_covid19_recovered_global.csv')