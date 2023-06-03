const env = process.env.NODE_ENV || 'development';
const ip = process.env.NODE_ENV_IP;

export const Status = {
	success:0,
	noData:1,
	requestFailed:2,
	networkFailed:3,
	searchNoData:4,
	loading:5
}

// let hintImages = [null,
// 	require('@/common/images/baseLoading/icon_no_content.png'),
// 	require('@/common/images/baseLoading/icon_no_wifi.png'),
// 	require('@/common/images/baseLoading/icon_no_wifi.png'),
// 	require('@/common/images/baseLoading/search_new.png')];
// let hintTexts = ['', '暂无数据', '页面被UFO抓走啦，请刷新页面~', '页面被UFO抓走啦，请刷新页面~','未查找到对应数据，请检查关键词是否正确'];


let envConfig = {
  development: {
    apiBaseURL: ''
  },
  production: {
    apiBaseURL: ''
  }
};

export default envConfig;
