import { createApp } from 'vue'
import App from './App.vue'
import '@/common/style/theme.css'
import '@/assets/main.css'
import router from '@/router/index'
import 'lib-flexible/flexible'
import 'vant/es/toast/style'
import { createPinia } from 'pinia'
import { ActionBar, ActionBarIcon, ActionBarButton, Divider, Popup, Overlay, Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, SubmitBar, Toast, Skeleton } from 'vant'


//初始化vue实例
const app = createApp(App)

app.use(createPinia())
//注册router
app.use(router)
app.use(ActionBarButton)
    .use(ActionBarIcon)
    .use(ActionBar)
    .use(Divider)
    .use(Popup)
    .use(Overlay)
    .use(Loading)
    .use(Dialog)
    .use(Toast)
    .use(ContactCard)
    .use(Form)
    .use(AddressEdit)
    .use(AddressList)
    .use(Field)
    .use(CellGroup)
    .use(Cell)
    .use(SwipeCell)
    .use(Icon)
    .use(Stepper)
    .use(Card)
    .use(Button)
    .use(Swipe)
    .use(SwipeItem)
    .use(PullRefresh)
    .use(List)
    .use(Tab)
    .use(Tabs)
    .use(SubmitBar)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Skeleton)


//全局过滤器
// 在 app.config.globalProperties 属性上挂载都属性，
// 都可以称为全局属性，在 template 模板中，可直接使用，
// 如上述 $filters.prefix(item.goodsCoverImg) ，
// 就是将 item.goodsCoverImg 作为 prefix 方法的参数传入，
// 内部判断是否有图片主路径，防止图片加载失败。
app.config.globalProperties.$filters = {
    prefix(url) {
        if (url && url.startsWith('http')) {
            return url
        } else {
            url = `http://backend-api-01.newbee.ltd${url}`
            return url
        }
    }
}
//挂载vue实例
app.mount('#app')
