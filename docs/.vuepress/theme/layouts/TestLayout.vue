<template>
	<div>
		<Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>
		
		<div class="layout_container">
			<div class="layout_content">
				<Content class="title" slot-key="title"/>
			</div>
		</div>
		<div class="layout_news_list_container">
			<ul class="layout_news_list_content_wrap">
				<li class="layout_news_item_content" v-for="(item,index) in newsListData" :key="index">
					<div class="news_left_content">
						<div class="news_left_top_content">
							<div class="news_left_top_month_content">{{item.month}}</div>
							<div class="news_left_top_day_content">{{item.day}}</div>
						</div>
						<div class="news_left_bottom_content">{{item.year}}</div>
					</div>
					<div class="news_right_content">
						<div class="news_right_top_content"><a :href="item.link" target="_blank" rel="noopener noreferrer">{{item.title}}</a></div>
						<div class="news_right_bottom_content">{{item.details}}</div>
					</div>
				</li>
			</ul>
		</div>
		<div id="certify">
			<swiper ref="mySwiper" :options="swiperOption" class="my-swipe">
				<swiper-slide style="display: flex;justify-content:center;" v-for="(item ,index) in swiperArray" :key="index">
					<div style="height: 3.2rem;margin:0 40px;">
						<img  style="display:block;height:100%;" :src="item.src" alt="">
					</div>
				</swiper-slide>
			
			</swiper>
		</div>
		<Content/>
		<!--<div class="content_container">
			<Content/>
		</div>-->
	</div>
</template>

<script>
	import {resolveSidebarItems} from "../util";
	import Navbar from "../components/Navbar";
	export default {
		name: "TestLayout",
		components: {Navbar},
		data () {
			return {
				newsList: [],
				swiperArray:[
					{
						src:require('../../../img/logo.png')
					},
					{
						src:require('../../../img/logo.png')
					},
					{
						src:require('../../../img/logo.png')
					},
					{
						src:require('../../../img/logo.png')
					}
				],
				swiperOption:{
					watchSlidesProgress: true,
					slidesPerView: "auto",
					centeredSlides: true,
					loop: true,
					speed: 1000,
					// loopedSlides: 12,
					autoplay: true,
					/*autoplay: {
					delay: 0,
					stopOnLastSlide: false,
					disableOnInteraction: true,
					},*/
					// grabCursor: true,
					pagination: {
						el: '.swiper-pagination',
						// clickable :true,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					on:{
						progress: function(progress) {
							// for (let i = 0; i < this.slides.length; i++) {
							// 	var slide = this.slides.eq(i);
							// 	var slideProgress = this.slides[i].progress;
							// 	let modify = 1;
							// 	if (Math.abs(slideProgress) > 1) {
							// 		modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
							// 	}
							// 	let translate = slideProgress * modify * 260 + 'px';
							// 	let scale = 1 - Math.abs(slideProgress) / 5;
							// 	let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
							// 	slide.transform('translateX(' + translate + ') scale(' + scale + ')');
							// 	slide.css('zIndex', zIndex);
							// 	slide.css('opacity', 1);
							// 	if (Math.abs(slideProgress) > 3) {
							// 		slide.css('opacity', 0);
							// 	}
							// }
						},
						setTransition: function(transition) {
							for (var i = 0; i < this.slides.length; i++) {
								var slide = this.slides.eq(i);
								slide.transition(transition);
							}
							
						}
				}
			}
		}
		},
		
		mounted(){
			let swiper = document.getElementsByClassName('mySwiper')[0];
			if (swiper) {
				swiper.style.alignItems = 'center';
			}
			console.log(this,"！！！")
			console.log(this.$frontmatter,">>>>>>>>")
			console.log(this.$page.frontmatter.features)
		},
		computed: {
			newsListData(){
				return this.$page.frontmatter.features
			},
			shouldShowNavbar () {
				const { themeConfig } = this.$site
				const { frontmatter } = this.$page
				if (
					frontmatter.navbar === false
					|| themeConfig.navbar === false) {
					return false
				}
				return (
					this.$title
					|| themeConfig.logo
					|| themeConfig.repo
					|| themeConfig.nav
					|| this.$themeLocaleConfig.nav
				)
			},
			
			shouldShowSidebar () {
				const { frontmatter } = this.$page
				return (
					!frontmatter.home
					&& frontmatter.sidebar !== false
					&& this.sidebarItems.length
				)
			},
			
			sidebarItems () {
				return resolveSidebarItems(
					this.$page,
					this.$page.regularPath,
					this.$site,
					this.$localePath
				)
			},
			
			pageClasses () {
				const userPageClass = this.$page.frontmatter.pageClass
				return [
					{
						'no-navbar': !this.shouldShowNavbar,
						'sidebar-open': this.isSidebarOpen,
						'no-sidebar': !this.shouldShowSidebar
					},
					userPageClass
				]
			}
		},
		methods:{
			toggleSidebar (to) {
				this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
				this.$emit('toggle-sidebar', this.isSidebarOpen)
			},
		}
	}
</script>

<style scoped lang="stylus">
	.layout_container
		width 100%
		height 100%
		display flex
		align-items center
		justify-content center
		.layout_content
			width 100%
			height: 600px
			background url("../public/information.svg") no-repeat center center
			background-size cover
			display flex
			align-items center
			justify-content center
	.title
		font-size 50px
		color #fff
	.content_container{
		max-width 1200px
		margin 0 auto
		padding-bottom 60px
	}
	.layout_news_list_container{
		width 100%
		margin-top 40px
		.layout_news_list_content_wrap{
			display flex
			flex-wrap wrap
			max-width 1200px
			margin 0 auto
			list-style none
			.layout_news_item_content{
				box-sizing border-box
				max-width 525px
				margin 0 20px 40px 20px
				display flex
				.news_left_content{
					min-width 62px
					text-align center
					margin-right 50px
					.news_left_top_content{
						background url("../public/news_month_day_bg.png") no-repeat center center
						background-size cover
						.news_left_top_month_content{
							font-size 15px
							color #ffffff
							padding-top 8px
						}
						.news_left_top_day_content{
							font-size 24px
							color #ffffff
						}
					}
					.news_left_bottom_content{
						background #0b243e
						height: 60px
						line-height 60px
						color #ffffff
						margin-top 1px
						font-size 15px
					}
				}
				.news_right_content{
					flex 1
					overflow hidden
					.news_right_top_content{
						overflow hidden
						text-overflow ellipsis
						white-space nowrap
						a{
							width 100%
							color #0054E3
							font-weight 700
						}
					}
					.news_right_bottom_content{
						margin-top 24px
						text-indent 30px
						font-size 14px
						color #696e75
						line-height 28px
						text-align justify
						overflow hidden
					}
				}
			}
		}
	}
	
	#certify {
		position: relative;
		max-width: 900px;
		width: 100%;
		margin: 0 auto;
		padding-bottom: 0.6rem;
		height: 1000px
		.swiper-pagination {
			position: static;
			display: none;
		}
		
		.my-swipe {
			/deep/ .swiper-wrapper{
				display flex !important
			}
			&:first-child {
				display: flex;
				align-items: center;
			}
			margin-left: auto;
			margin-right: auto;
			position: relative;
			overflow: hidden;
			list-style: none;
			padding: 0;
			z-index: 1;
			
			.swiper-slide {
				width: auto !important;
				
			}
			
		}
	}
	
</style>
