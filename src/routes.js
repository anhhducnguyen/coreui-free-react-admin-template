import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Users
const Users = React.lazy(() => import('./views/users/list'))
const CreateUser = React.lazy(() => import('./views/users/create'))
const EditUser = React.lazy(() => import('./views/users/edit'))

// Products
const Products = React.lazy(() => import('./views/products/list'))
const CreateProduct = React.lazy(() => import('./views/products/create'))
const EditProduct = React.lazy(() => import('./views/products/edit'))

// ProductLines
const ProductLines = React.lazy(() => import('./views/productlines/list'))
const CreateProductLine = React.lazy(() => import('./views/productlines/create'))

// Reviews
const Reviews = React.lazy(() => import('./views/reviews/Review'))

// Orders
const Orders = React.lazy(() => import('./views/orders/list'))
const CreateOrder = React.lazy(() => import('./views/orders/create'))
const EditOrder = React.lazy(() => import('./views/orders/edit'))

const LogoutHandler = React.lazy(() => import('./components/LogoutHandler'))

const routes = [
  { path: '/users', exact: true, name: 'Người dùng', element: Users },
  { path: '/users/create', exact: true, name: 'Thêm người dùng', element: CreateUser },
  { path: '/users/edit/:id', exact: true, name: 'Chỉnh sửa thông tin người dùng', element: EditUser },
  { path: '/products', exact: true, name: 'Sản phẩm', element: Products },
  { path: '/products/create', exact: true, name: 'Thêm sản phẩm', element: CreateProduct },
  { path: '/products/edit/:id', exact: true, name: 'Chỉnh sửa thông tin sản phẩm', element: EditProduct },
  { path: '/product-lines', exact: true, name: 'Dòng sản phẩm', element: ProductLines },
  { path: '/product-lines/create', exact: true, name: 'Thêm dòng sản phẩm', element: CreateProductLine },
  { path: '/reviews', exact: true, name: 'Đánh giá', element: Reviews },
  { path: '/orders', exact: true, name: 'Đơn hàng', element: Orders },
  { path: '/orders/create', exact: true, name: 'CreateOrder', element: CreateOrder },
  { path: '/orders/edit/:id', exact: true, name: 'EditOrder', element: EditOrder },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Tổng quan', element: Dashboard },
  { path: '/logout', name: 'Logout', element: LogoutHandler },
]

export default routes
// rafce