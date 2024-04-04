<script setup>
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/store/userStore.js'
import { computed } from 'vue'
import { apiLogout } from '@/api/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const userCenter = () => {
    router.push({ name: 'profile' })
}
const userInfo = computed(() => userStore.userInfo)
const logOut = () => {
    apiLogout().then((res) => {
        if (res.status !== 200) {
            Message.error(res.msg)
            return
        }
        Message.success('退出成功')
        // 刷新页面
        location.reload()
    })
}
</script>

<template>
    <!-- 消息和头像，点击头像显示下拉框 -->
    <a-dropdown trigger="click">
        <a-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
            <img alt="avatar" :src="userInfo.avatar" />
        </a-avatar>
        <template #content>
            <div class="dropdown">
                <div class="header">
                    <a-avatar :size="55" :style="{ marginRight: '8px', cursor: 'pointer' }">
                        <img alt="avatar" :src="userInfo.avatar" />
                    </a-avatar>
                    <div>
                        <h2>{{ userInfo.username }}</h2>
                        <span>{{ userInfo.usermobile }}</span>
                    </div>
                </div>
                <a-doption>
                    <a-space @click="userCenter">
                        <icon-user />
                        <span> 个人中心 </span>
                    </a-space>
                </a-doption>
                <a-doption>
                    <a-space @click="logOut">
                        <icon-export />
                        <span> 退出 </span>
                    </a-space>
                </a-doption>
                <!--<a-doption>
					<a-space @click="$router.push({ name: 'Setting' })">
						<icon-settings />
						<span>
							{{ $t('messageBox.userSettings') }}
						</span>
					</a-space>
				</a-doption>
				<a-doption>
					<a-space @click="handleLogout">
						<icon-export />
						<span>
							{{ $t('messageBox.logout') }}
						</span>
					</a-space>
				</a-doption>-->
            </div>
        </template>
    </a-dropdown>
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
.dropdown {
    padding: 10px;
}
.header {
    margin-bottom: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
}
</style>
