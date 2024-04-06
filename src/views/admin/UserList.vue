<!--
 * @Author: 17197
 * @Date: 2024/4/4
 * @Description: UserList.vue
 * @Version: 1.0
 * @Last Modified time : 2024/4/4
-->
<script setup>
import { ref } from 'vue'
import { apiGetUserList, apiAddUser, apiDeleteUser, apiUpdateUser } from '@/api/admin.js'
import { Message, Modal } from '@arco-design/web-vue'
import { useTimeFormat, useWindowHeight } from '@/utils/composables.js'

const query = ref({
    page: 1,
    pageSize: 10,
    userID: '',
    mobile: '',
    role: ''
})
const visibleModal = ref(false)
const visiblePassword = ref(false)
const addUserForm = ref()
const changePasswordForm = ref()
const isEditor = ref(false)
const userForm = ref({
    userName: '',
    password: '',
    userMobile: '',
    email: '',
    role: ''
})
const passwordForm = ref({
    password: '',
    confirmPassword: ''
})
const userRules = {
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    userMobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
            validator: (value, cb) => {
                if (!/^1[3-9]\d{9}$/.test(value)) {
                    cb('请输入正确的手机号')
                } else {
                    cb()
                }
            }
        }
    ],
    role: [{ required: true, message: '请选择角色', trigger: 'blur' }]
}
const columns = [
    { title: '头像', dataIndex: 'avatar', fixed: 'left', slotName: 'avatar', width: 80 },
    { title: '用户ID', dataIndex: 'id', fixed: 'left', width: 100 },
    { title: '用户名', dataIndex: 'username', width: 120 },
    { title: '手机号', dataIndex: 'phone', width: 130, align: 'center' },
    { title: '邮箱', dataIndex: 'email', width: 200, align: 'center' },
    { title: '角色', dataIndex: 'role', slotName: 'role', width: 100, align: 'center' },
    { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at', width: 180, align: 'center' },
    { title: '操作', slotName: 'action', fixed: 'right', width: 240, align: 'center' }
]
const scroll = {
    y: useWindowHeight(120)
}
const total = ref(0)
const pagination = ref({
    size: 'small',
    current: query.value.page,
    pageSize: query.value.pageSize,
    total: total,
    showTotal: true,
    showPageSize: true,
    pageSizeOptions: [10, 20, 50, 100],
    showJumper: true
})
const pageSizeChange = (pageSize) => {
    console.log(pageSize)
    query.value.pageSize = pageSize
    pagination.value.pageSize = pageSize
    query.value.page = 1
    pagination.value.current = 1
    init()
}
const pageChange = (page) => {
    console.log(page)
    query.value.page = page
    pagination.value.current = page
    init()
}
const loading = ref(false)
const userList = ref([])
const init = async () => {
    loading.value = true
    const res = await apiGetUserList(query.value)
    loading.value = false
    if (res.status !== 200) {
        Message.error(res.msg)
        return
    }
    userList.value = res.data.Rows
    total.value = res.data.total
    userList.value.forEach((item) => {
        item.key = item.id
        item.created_at = useTimeFormat(item.created_at)
    })
}
init()
// 搜索
const search = () => {
    query.value.page = 1
    init()
}
// 重置
const reset = () => {
    query.value = {
        page: 1,
        pageSize: 10,
        userID: '',
        mobile: '',
        role: ''
    }
    init()
}

const openModal = () => {
    isEditor.value = false
    visibleModal.value = true
}

const handleCancel = () => {
    addUserForm.value.resetFields()
    visibleModal.value = false
}

const submit = () => {
    addUserForm.value.validate(async (valid) => {
        if (valid) return
        if (isEditor.value) {
            const res = await apiUpdateUser(userForm.value)
            if (res.status !== 200) {
                Message.error(res.msg)
                return
            }
            Message.success('修改成功')
            addUserForm.value.resetFields()
            visibleModal.value = false
            await init()
        } else {
            const res = await apiAddUser(userForm.value)
            if (res.status !== 200) {
                Message.error(res.msg)
                return
            }
            Message.success('新增成功')
            addUserForm.value.resetFields()
            visibleModal.value = false
            await init()
        }
    })
}

const editor = (record) => {
    isEditor.value = true
    userForm.value = {
        id: record.id,
        userName: record.username,
        password: record.password,
        userMobile: record.phone,
        email: record.email,
        role: record.role
    }
    visibleModal.value = true
}

const passwordModal = (record) => {
    passwordForm.value.id = record.id
    visiblePassword.value = true
}

const deleteUser = async (record) => {
    Modal.confirm({
        title: '提示',
        content: '确定要删除该用户吗？',
        onOk: async () => {
            const res = await apiDeleteUser({ id: record.id })
            if (res.status !== 200) {
                Message.error(res.msg)
                return
            }
            Message.success('删除成功')
            await init()
        }
    })
}

const passwordRules = {
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        {
            validator: (value, cb) => {
                if (value !== passwordForm.value.password) {
                    cb('两次输入密码不一致')
                } else {
                    cb()
                }
            }
        }
    ]
}

const changePassword = () => {
    changePasswordForm.value.validate(async (valid) => {
        if (valid) return
        const res = await apiUpdateUser(passwordForm.value)
        if (res.status !== 200) {
            Message.error(res.msg)
            return
        }
        Message.success('修改成功')
        changePasswordForm.value.resetFields()
        visiblePassword.value = false
        await init()
    })
}

const closePasswordModal = () => {
    changePasswordForm.value.resetFields()
    visiblePassword.value = false
}
</script>

<template>
    <div id="container">
        <a-row :gutter="16">
            <a-col :span="6">
                <a-input v-model="query.userID" placeholder="输入用户编号" @press-enter="search" @clear="search" :allow-clear="true">
                    <template #prepend> 用户ID </template>
                </a-input>
            </a-col>
            <a-col :span="6">
                <a-input v-model="query.mobile" placeholder="输入手机号" @press-enter="search" @clear="search" :allow-clear="true" :max-length="11">
                    <template #prepend> 手机号 </template>
                </a-input>
            </a-col>
            <a-col :span="4">
                <a-select placeholder="请选择" v-model="query.role" :trigger-props="{ autoFitPopupMinWidth: true }" :allow-clear="true" @change="search">
                    <template #prefix>角色</template>
                    <a-option :value="0">管理员</a-option>
                    <a-option :value="1">普通用户</a-option>
                </a-select>
            </a-col>
            <a-col :span="4">
                <a-space>
                    <a-button type="primary" @click="search">
                        <template #icon>
                            <icon-search />
                        </template>
                        搜索
                    </a-button>
                    <a-button @click="reset">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        重置
                    </a-button>
                    <a-button type="primary" status="success" @click="openModal">
                        <template #icon>
                            <icon-plus />
                        </template>
                        新增
                    </a-button>
                </a-space>
            </a-col>
        </a-row>
        <a-table
            class="table"
            :data="userList"
            :columns="columns"
            :loading="loading"
            :scroll="scroll"
            :pagination="pagination"
            @page-change="pageChange"
            @page-size-change="pageSizeChange"
            page-position="bl"
        >
            <template #avatar="{ record }">
                <a-avatar :imageUrl="record.avatar" />
            </template>
            <template #role="{ record }">
                <a-tag :color="record.role === '0' ? '#ffb400' : '#00b42a'">{{ record.role === '0' ? '管理员' : '普通用户' }} </a-tag>
            </template>
            <template #action="{ record }">
                <a-space>
                    <a-button type="primary" size="small" @click="editor(record)">编辑</a-button>
                    <a-button type="primary" size="small" @click="passwordModal(record)">修改密码</a-button>
                    <a-button size="small" @click="deleteUser(record)">注销</a-button>
                </a-space>
            </template>
        </a-table>
    </div>
    <!--	新增用户的弹窗-->
    <a-modal :visible="visibleModal" :title="isEditor ? '编辑用户' : '新增用户'" @cancel="handleCancel" @ok="submit" :mask-closable="false">
        <a-form ref="addUserForm" :model="userForm" :rules="userRules" label-col="{ span: 4 }" wrapper-col="{ span: 10 }">
            <a-form-item field="id" label="用户ID" name="id" disabled v-if="isEditor">
                <a-input v-model="userForm.id" />
            </a-form-item>
            <a-form-item field="userName" label="用户名" name="userName" validate-trigger="blur">
                <a-input v-model="userForm.userName" />
            </a-form-item>
            <a-form-item field="password" label="密码" name="password" validate-trigger="blur" v-if="!isEditor">
                <a-input v-model="userForm.password" />
            </a-form-item>
            <a-form-item field="userMobile" label="手机号" name="userMobile" validate-trigger="blur">
                <a-input v-model="userForm.userMobile" :max-length="11" />
            </a-form-item>
            <a-form-item field="email" label="邮箱" name="email">
                <a-input v-model="userForm.email" />
            </a-form-item>
            <a-form-item field="role" label="角色" name="role" validate-trigger="blur">
                <a-select v-model="userForm.role">
                    <a-option value="0">管理员</a-option>
                    <a-option value="1">普通用户</a-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>
    <!--	修改密码的弹窗-->
    <a-modal :visible="visiblePassword" title="修改密码" @cancel="closePasswordModal" @ok="changePassword" :mask-closable="false">
        <a-form ref="changePasswordForm" :model="passwordForm" :rules="passwordRules" label-col="{ span: 4 }" wrapper-col="{ span: 10 }">
            <a-form-item field="password" label="密码" name="password" validate-trigger="blur">
                <a-input v-model="passwordForm.password" />
            </a-form-item>
            <a-form-item field="confirmPassword" label="确认密码" name="confirmPassword" validate-trigger="blur">
                <a-input v-model="passwordForm.confirmPassword" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style scoped lang="scss">
.table {
    margin-top: 20px;
}
</style>
