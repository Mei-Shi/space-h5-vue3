import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCart } from '@/service/cart'
export const useCartStore = defineStore('cart', () => {
    //记录购物车的count数量
    const count = ref(0)
    //更新购物车数量的action
    async function updateCart() {
        const { data = [] } = await getCart()
        count.value = data.length
    }
    // 返回一个对象，对象内包含购物车数量count，更新购物车数量的方法 updateCart
    return { count, updateCart }
})