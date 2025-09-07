// import React, { useEffect, useState } from 'react'
// import { deleteProduct, fetchProducts } from '../../api/products';
// import { message } from 'antd';
// import { useRef } from 'react';
// import { Button, Input, Space, Table, ConfigProvider } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
// import CIcon from '@coreui/icons-react'
// import { cilTrash, cilPen } from '@coreui/icons'
// import Highlighter from 'react-highlight-words';
// import { useStyle } from '../../components/button';
// import { AntDesignOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { Popconfirm } from 'antd';

// const Product = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { styles } = useStyle();
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const res = await fetchProducts();
//       // console.log(res.data.data);
//       const products = Array.isArray(res.data?.data)
//         ? res.data.data.map((product, index) => ({
//           key: product.id,
//           name: product.name,
//           description: product.description,
//           price: product.price,
//           quantityInstock: product.quantityInstock,
//           image: product.images?.[0]?.path || '',
//         })) : [];
//       setData(products);
//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//       message.error('Failed to fetch products');
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleDelete = async (id) => {
//     try {
//       await deleteProduct(id);
//       message.success('Xóa sản phẩm thành công');
//       loadData();
//     } catch (error) {
//       console.error('Lỗi khi xóa', error);
//       message.error('Xóa sản phẩm thất bại');
//     }
//   }

//   const [searchText, setSearchText] = useState('');
//   const [searchedColumn, setSearchedColumn] = useState('');
//   const searchInput = useRef(null);
//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };
//   const handleReset = clearFilters => {
//     clearFilters();
//     setSearchText('');
//   };
//   const getColumnSearchProps = dataIndex => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
//       <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{ marginBottom: 8, display: 'block' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     filterDropdownProps: {
//       onOpenChange(open) {
//         if (open) {
//           setTimeout(() => {
//             var _a;
//             return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
//           }, 100);
//         }
//       },
//     },
//     render: text =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ''}
//         />
//       ) : (
//         text
//       ),
//   });

//   const columns = [
//     // Object.assign(
//     //   { title: '#', dataIndex: 'key', key: 'key', width: '30%' },
//     //   getColumnSearchProps('name'),
//     // ),
//     {
//       title: 'Hình ảnh',
//       dataIndex: 'image',
//       key: 'image',
//       width: '5%',
//       render: (image) =>
//         image ? (
//           <img src={image} alt="Product" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }} />
//         ) : (
//           'No image'
//         ),
//   //     render: (image) =>
//   // image ? (
//   //   <img
//   //     src={`http://localhost:3001${image}`}
//   //     alt="Product"
//   //     style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
//   //   />
//   // ) : (
//   //   'No image'
//   // ),

//     },
//     Object.assign(
//       { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name', width: '30%' },
//       getColumnSearchProps('name'),
//     ),
//     Object.assign(
//       { title: 'Số lượng trong kho', dataIndex: 'quantityInstock', key: 'quantityInstock', width: '15%' },
//     ),
//     Object.assign(
//       {
//         title: 'Giá', dataIndex: 'price', key: 'price', width: '5%', render: (price) =>
//           new Intl.NumberFormat('vi-VN', {
//             style: 'currency',
//             currency: 'VND'
//           }).format(price)
//       },
//     ),
//     Object.assign(
//       { title: 'Mô tả', dataIndex: 'description', key: 'description', width: '30%' },
//     ),
//     {
//       title: 'Action',
//       key: 'action',
//       width: '10%',
//       render: (text, record) => (
//         <Space size="middle">
//           <button
//             style={{
//               backgroundColor: '#52c41a', // xanh lá
//               color: 'white',
//               border: 'none',
//               borderRadius: 4,
//               width: 32,
//               height: 32,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: 'pointer',
//             }}
//             onClick={() => navigate(`/products/edit/${record.key}`)}
//             // onClick={() => navigate(`/products/edit/`)}
//           >
//             <CIcon icon={cilPen} size="sm" />
//           </button>
//           <Popconfirm
//             title="Bạn có chắc muốn xóa dòng sản phẩm này?"
//             onConfirm={() => handleDelete(record.key)}
//             okText="Xóa"
//             cancelText="Hủy"
//           >
//             <button
//               style={{
//                 backgroundColor: '#ff4d4f', // đỏ
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: 4,
//                 width: 32,
//                 height: 32,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 cursor: 'pointer',
//               }}
//             >
//               <CIcon icon={cilTrash} size="sm" />
//             </button>
//           </Popconfirm>
//         </Space>
//       ),
//     }

//   ]

//   return (
//     <>
//       <ConfigProvider
//         button={{
//           className: styles.linearGradientButton,
//         }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'flex-end',
//             marginBottom: 24,
//             paddingRight: 24
//           }}
//         >
//           <Button type="primary" size="large" icon={<AntDesignOutlined />} onClick={() => navigate('/products/create')}>
//             Thêm sản phẩm
//           </Button>
//         </div>
//       </ConfigProvider>
//       <Table columns={columns} dataSource={data} loading={loading} />
//     </>
//   );
// }

// export default Product


import React, { useEffect, useState, useRef } from 'react';
import { deleteProduct, fetchProducts } from '../../api/products';
import { message, Button, Input, Space, Table, ConfigProvider, Popconfirm } from 'antd';
import { SearchOutlined, AntDesignOutlined } from '@ant-design/icons';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilPen } from '@coreui/icons';
import Highlighter from 'react-highlight-words';
import { useStyle } from '../../components/button';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { styles } = useStyle();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchProducts();
      const products = Array.isArray(res.data?.data)
        ? res.data.data.map((product) => ({
            key: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantityInstock: product.quantityInstock,
            image: product.images?.[0]?.path || '',
          }))
        : [];
      setData(products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      message.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      message.success('Xóa sản phẩm thành công');
      loadData();
    } catch (error) {
      console.error('Lỗi khi xóa', error);
      message.error('Xóa sản phẩm thất bại');
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedRowKeys.map((id) => deleteProduct(id)));
      message.success(`Đã xóa ${selectedRowKeys.length} sản phẩm thành công`);
      setSelectedRowKeys([]);
      loadData();
    } catch (error) {
      console.error(error);
      message.error('Xóa sản phẩm thất bại');
    }
  };

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '5%',
      render: (image) =>
        image ? (
          <img
            src={image}
            alt="Product"
            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
          />
        ) : (
          'No image'
        ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Số lượng trong kho',
      dataIndex: 'quantityInstock',
      key: 'quantityInstock',
      width: '15%',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: '5%',
      render: (price) =>
        new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(price),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '30%',
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <Space size="middle">
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
            onClick={() => navigate(`/products/edit/${record.key}`)}
          >
            <CIcon icon={cilPen} size="sm" />
          </button>
          <Popconfirm
            title="Bạn có chắc muốn xóa dòng sản phẩm này?"
            onConfirm={() => handleDelete(record.key)}
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
    <>
      <ConfigProvider
        button={{
          className: styles.linearGradientButton,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 24,
            padding: '0 24px',
          }}
        >
          <div>
            {selectedRowKeys.length > 0 && (
              <Popconfirm
                title={`Bạn có chắc muốn xóa ${selectedRowKeys.length} sản phẩm?`}
                onConfirm={handleDeleteSelected}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button danger>Xóa các sản phẩm đã chọn</Button>
              </Popconfirm>
            )}
          </div>
          <Button
            type="primary"
            size="large"
            icon={<AntDesignOutlined />}
            onClick={() => navigate('/products/create')}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </ConfigProvider>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </>
  );
};

export default Product;
