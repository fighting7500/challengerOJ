<script setup>
import { ref } from 'vue'
import { removeToken } from '@/utils/auth'
import { useUserStore } from '@/store/userStore'
const userStore = useUserStore()

const props = defineProps({
	userInfo: {
		type: Object,
		default: () => { }
	}
})

const handleItem = (command) => {
	if (command == 1) {
		console.log('个人中心');
	} else if (command == 2) {
		// 退出登录
		removeToken('token')
		// 清空缓存
		localStorage.removeItem('userInfo')
		// 删除store中的token和userInfo
		userStore.setToken('')
		userStore.setUserInfo({})
		location.reload()
		
	}
}

</script>

<template>
	<!-- 消息和头像，点击头像显示下拉框 -->
	<el-dropdown @command="handleItem">
		<span class="el-dropdown-link">
			<el-avatar :size="40" :src="userInfo.avatar" v-if="userInfo.avatar"/>
			<span>{{ userInfo.username || userInfo.usermobile }}<i class="iconfont icon-xiala" style="font-size: 12px;margin-left: 3px;"></i></span>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item command="1">个人中心</el-dropdown-item>
				<el-dropdown-item command="2">退出</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>


<style lang="scss" scoped>
 .el-dropdown-link:focus {
      outline: none;
    }
.el-dropdown-link {
	display: flex;
	align-items: center;
	cursor: pointer;
	.iconfont {
		display: inline-block;
		transition: all 0.3s ease;
	}
	
	&:hover .iconfont {
		transform: rotate(180deg);
	}
}
</style>