import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Promotions from '../views/Promotions.vue'
import Product from '../views/Product.vue'
import ProductGain from '../views/ProductGain.vue'
import CreateTable from '../views/CreateTable.vue'
import PremiumGift from '../views/PremiumGift.vue'
import EndProcess from '../views/EndProcess.vue'
import SearchAndEdit from '../views/SearchAndEdit.vue'

// import Layout Frontend
import FrontendLayout from '@/layouts/Frontend.vue'

const routes = [
  {
    path: '/',
    component: FrontendLayout,
    children: [{
      path: '',
      name: 'Home',
      component: Home
    }],
    meta: {
      title: 'หน้าหลัก'
    }
  },
  {
    path: '/promotions',
    component: FrontendLayout,
    children: [{
      path: '',
      name: 'Promotions',
      component: Promotions
    }],
    meta: {
      title: 'โปรโมชัน'
    }
  },
  {
    path: '/product',
    component: FrontendLayout,
    children: [{
      path: '',
      name: 'Product',
      component: Product
    }],
    meta: {
      title: 'สินค้า'
    }
  },
  {
    path: '/productgain',
    component: FrontendLayout,
    children: [{
      path: '',
      name: 'ProductGain',
      component: ProductGain
    }],
    meta: {
      title: 'เงื่อนไขการจัดรายการ'
    }
  },
  {
    path: '/createtable',
    component: FrontendLayout,
    children: [{
      path: '',
      name: 'CreateTable',
      component: CreateTable
    }],
    meta: {
      title: 'ตารางเงื่อนไขในการแจกของรางวัล'
    }
  },
  {
    path: '/premiumgift',
    component: FrontendLayout,
    children: [{
      path: '',
      name: 'PremiumGift',
      component: PremiumGift
    }],
    meta: {
      title: 'เลือกลูกค้าสำหรับแจกของรางวัล'
    }
  },
  {
    path: '/endprocess',
    component: FrontendLayout,
    children: [{
      path: '',
      name: 'EndProcess',
      component: EndProcess
    }],
    meta: {
      title: 'จบงาน'
    }
  },
  {
    path: '/searchandedit',
    component: FrontendLayout,
    children: [{
      path: '',
      name: 'SearchAndEdit',
      component: SearchAndEdit
    }],
    meta: {
      title: 'ค้าหาและแก้ไขข้อมูล'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
