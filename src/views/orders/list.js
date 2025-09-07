// import React, { useEffect, useState } from 'react'
// import { fetchOrders } from '../../api/order';
// import { Button, Input, Space, Table } from 'antd';
// import CIcon from '@coreui/icons-react'
// import { cilTrash, cilPen } from '@coreui/icons'
// import { Popconfirm } from 'antd';


// const ListOders = () => {

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         loadData();
//     }, []);

//     const loadData = async () => {
//         try {
//             setLoading(true);
//             const res = await fetchOrders();
//             const orders = Array.isArray(res.data?.data)
//                 ? res.data.data.map((order, index) => ({
//                     // key: order.id,
//                     // status: order.status,
//                     // totalAmount: order.totalAmount
//                     key: index,
//                     id: order.id,
//                     status: order.status,
//                     totalAmount: order.totalAmount,
//                     orderDate: order.orderDate,
//                     userName: `${order.user?.firstName ?? ''} ${order.user?.lastName ?? ''}`,
//                 })) : [];
//             console.log(orders);
//             setData(orders);
//         } catch (error) {
//             console.error('Failed to fetch orders:', error);
//             message.error('Failed to fetch orders');
//         } finally {
//             setLoading(false);
//         }
//     }

//     const columns = [
//         Object.assign(
//             { title: 'Status', dataIndex: 'status', key: 'status', width: '30%' },
//         ),
//         Object.assign(
//             { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount', width: '30%' },
//         ),
//         Object.assign(
//             { title: 'Customer', dataIndex: 'userName', key: 'userName', width: '30%' },
//         ),
//         Object.assign(
//             { title: 'Order Date', dataIndex: 'orderDate', key: 'orderDate', width: '30%' },
//         ),



//         {
//             title: 'Action',
//             key: 'action',
//             width: '5%',

//             render: (text, record) => (
//                 <Space size="middle">
//                     <button
//                         style={{
//                             backgroundColor: '#52c41a', // xanh lá
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: 4,
//                             width: 32,
//                             height: 32,
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                         }}
//                     >
//                         <CIcon icon={cilPen} size="sm" />
//                     </button>
//                     <Popconfirm
//                         title="Bạn có chắc muốn xóa dòng sản phẩm này?"
//                         onConfirm={() => handleDelete(record.key)}
//                         okText="Xóa"
//                         cancelText="Hủy"
//                     >
//                         <button
//                             style={{
//                                 backgroundColor: '#ff4d4f', // đỏ
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: 4,
//                                 width: 32,
//                                 height: 32,
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             <CIcon icon={cilTrash} size="sm" />
//                         </button>
//                     </Popconfirm>
//                 </Space>
//             ),
//         }
//     ]

//     return (
//         <>
//             <Table columns={columns} dataSource={data} loading={loading} />
//         </>
//     )
// }

// export default ListOders

import React, { useEffect, useState } from 'react';
import { Table, Space, Popconfirm, message } from 'antd';
import { fetchOrders } from '../../api/order';
import { fetchOrderDetails } from '../../api/orderDetail'
import dayjs from 'dayjs';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilPen } from '@coreui/icons';
import { Tag } from 'antd';
import {
    BellOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";

const ListOrdersWithProducts = () => {
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        try {
            setLoading(true);
            const [ordersRes, orderDetailRes] = await Promise.all([
                fetchOrders(),
                fetchOrderDetails(),
            ]);

            const orderList = ordersRes.data?.data || [];
            const orderDetailList = orderDetailRes.data?.data || [];

            const mergedOrders = orderList.map((order) => ({
                key: order.id,
                id: order.id,
                status: order.status,
                totalAmount: order.totalAmount,
                orderDate: dayjs(order.orderDate).format('DD/MM/YYYY HH:mm'),
                userName: `${order.user?.firstName ?? ''} ${order.user?.lastName ?? ''}`,
                products: orderDetailList.filter((d) => d.order?.id === order.id),
            }));
            console.log(mergedOrders);
            setOrders(mergedOrders);
        } catch (error) {
            console.error(error);
            message.error('Không thể tải dữ liệu đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        message.success(`Đã xóa đơn hàng ${id} (giả lập)`);
        setOrders((prev) => prev.filter((order) => order.id !== id));
    };

    const productColumns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: ['product', 'name'],
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá',
            dataIndex: ['product', 'price'],
            key: 'price',
            render: (price) => `${price.toLocaleString()}₫`,
        },
        {
            title: 'Hình ảnh',
            dataIndex: ['product', 'images'],
            key: 'image',
            render: (images) =>
                images?.[0]?.path ? (
                    <img src={images[0].path} alt="" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                ) : null,
        },
    ];

    const orderColumns = [
        { title: 'Mã đơn hàng', dataIndex: 'key', key: 'key' },
        { title: 'Khách hàng', dataIndex: 'userName', key: 'userName' },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'status',
            key: 'status',
            width: '20%',
            render: (status) => {
                let color = 'default';
                let label = status;
                let icon;

                switch (status?.toLowerCase()) {
                    case 'pending':
                        color = 'orange';
                        icon = <ClockCircleOutlined />;
                        label = 'Chờ xác nhận';
                        break;
                    case 'delivered':
                        color = 'blue';
                        icon = <BellOutlined />;
                        label = 'Đang chuẩn bị';
                        break;
                    case 'ready':
                        color = 'green';
                        icon = <CheckCircleOutlined />;
                        label = 'Sẵn sàng giao';
                        break;
                    case 'on the way':
                        color = 'cyan';
                        icon = <ClockCircleOutlined />;
                        label = 'Đang giao';
                        break;
                    case 'cancelled':
                        color = 'red';
                        icon = <CloseCircleOutlined />;
                        label = 'Đã hủy';
                        break;
                    default:
                        color = 'geekblue';
                        label = status;
                }

                return (
                    <Tag color={color} icon={icon}>
                        {label}
                    </Tag>
                );
            },
        },


        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (val) => `${val.toLocaleString()}₫`,
        },
        { title: 'Ngày đặt', dataIndex: 'orderDate', key: 'orderDate' },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <button
                        style={{
                            backgroundColor: '#52c41a',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <CIcon icon={cilPen} size="sm" />
                    </button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa đơn hàng này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <button
                            style={{
                                backgroundColor: '#ff4d4f',
                                color: 'white',
                                border: 'none',
                                borderRadius: 4,
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <CIcon icon={cilTrash} size="sm" />
                        </button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={orderColumns}
            dataSource={orders}
            loading={loading}
            expandable={{
                expandedRowRender: (record) => (
                    <Table
                        columns={productColumns}
                        dataSource={record.products}
                        pagination={false}
                        rowKey="id"
                    />
                ),
                rowExpandable: (record) => record.products?.length > 0,
            }}
            // pagination={{ pageSize: 5 }}
        />
    );
};

export default ListOrdersWithProducts;


// import React, { useEffect, useState } from 'react';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users') // gọi API
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Lỗi khi gọi API');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setUsers(data); // lưu dữ liệu vào state
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Lỗi:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Đang tải...</p>;

//   return (
//     <div>
//       <h2>Danh sách người dùng</h2>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>{user.name} - {user.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;


