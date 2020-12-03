module.exports = {
	title: 'IRIS',
	description: 'Just playing around',
	base:'/',
	head:[
		['link', { rel: 'icon', href: '/favicon.ico' }]
	],
	locales: {
		'/': {
			lang: 'English', // 将会被设置为 <html> 的 lang 属性
			title: 'VuePress',
			selectText: 'Languages',
			description: 'Vue-powered Static Site Generator'
			
		},
		'/zh/': {
			lang: '简体中文',
			title: 'VuePress',
			selectText: '选择语言',
			description: 'Vue 驱动的静态网站生成器'
		}
	},
	
	themeConfig: {
		logo:"/assets/img/information.svg",
		
		locales: {
			'/': {
				selectText: 'Languages',
				nav:[
					{text:'Home',link:'/'},
					{text:'news',link:'/test/'},
				]
			},
			'/zh/': {
				selectText: '选择语言',
				nav:[
					{text:'首页',link:'/'},
					{text:'动态资讯',link:'/zh/test/'},
				]
			}
		}
	}
}
