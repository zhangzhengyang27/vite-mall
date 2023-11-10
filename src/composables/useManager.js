import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { logout, updatePassword } from '@/api/manager'
import { showModal, toast } from '@/composables/util'

export function useRePassword() {
  const router = useRouter()
  const store = useStore()

  const formDrawerRef = ref(null)
  const form = reactive({
    oldPassword: '',
    password: '',
    rePassword: ''
  })

  const rules = {
    oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
    newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    confirmPassword: [
      { required: true, message: '请确认新密码', trigger: 'blur' }
    ]
  }

  const formRef = ref(null)
  const onSubmit = () => {
    formRef.value.validate(async (valid) => {
      if (!valid) {
        return false
      }
    })
    formDrawerRef.value.showLoading()
    updatePassword(form)
      .then((res) => {
        toast('修改密码成功，请重新登录')
        store.dispatch('logout')
        router.push('/login')
      })
      .catch((err) => {
        formDrawerRef.value.hideLoading()
      })
  }
  const openRePasswordForm = () => formDrawerRef.value.open()
  return {
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmit,
    openRePasswordForm
  }
}

export function useLogout() {
  const router = useRouter()
  const store = useStore()
  function handleLogout() {
    showModal('是否要退出登录？').then((res) => {
      logout().finally(() => {
        store.dispatch('logout')
        router.push('/login')
        toast('退出登录成功')
      })
    })
  }

  return {
    handleLogout
  }
}
