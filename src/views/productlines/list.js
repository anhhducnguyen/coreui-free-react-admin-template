import React, { useEffect, useState } from 'react'
import { fetchProductLines } from '../../api/productlines';
import { message } from 'antd';
import { useRef } from 'react';
import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPen } from '@coreui/icons'
import Highlighter from 'react-highlight-words';
import { Tooltip, ConfigProvider } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { deleteProductLine } from '../../api/productlines';
import { Popconfirm } from 'antd';
import { useStyle } from '../../components/button';

const ProductLine = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await fetchProductLines();
            // console.log(res.data.data);
            const productLines = Array.isArray(res.data?.data)
                ? res.data.data.map((productline, index) => ({
                    key: productline.id,
                    name: productline.name,
                    description: productline.description,
                    // images: productline.products?.map(
                    //     product => product.images?.[0].path
                    // ).filter(Boolean) || [],
                    images: (productline.products || [])
                        .flatMap(product => product.images?.[0]?.path ? [product.images[0].path] : []),

                    products: productline.products || [],
                })) : [];
            setData(productLines);
        } catch (error) {
            console.error('Failed to fetch product-lines:', error);
            message.error('Failed to fetch product-lines');
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteProductLine(id);
            message.success('Xóa dòng sản phẩm thành công');
            loadData();
        } catch (error) {
            console.error('Lỗi khi xóa:', error);
            message.error('Xóa dòng sản phẩm thất bại');
        }
    }

    const { styles } = useStyle();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => {
                        var _a;
                        return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
                    }, 100);
                }
            },
        },
        render: text =>
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

    const columns = [
        Object.assign(
            { title: 'Dòng sản phẩm', dataIndex: 'name', key: 'name', width: '30%' },
            getColumnSearchProps('name'),
        ),
        {
            title: 'Hình ảnh',
            dataIndex: 'images',
            key: 'images',
            width: '40%',
            render: (images, record) =>
                Array.isArray(record.products) && record.products.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {record.products.map((product, index) => (
                            <Tooltip title={product.name} key={index}>
                                <img
                                    // src={product.images?.[0]?.path}
                                    src={product.images?.[0]?.path || 'http://caryophyvietnam.com/upload/product/matnacaryophy1mieng-7959.jpg'}
                                    alt={product.name}
                                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                                />
                            </Tooltip>
                        ))}
                    </div>
                ) : (
                    'No product'
                ),

        },

        Object.assign(
            { title: 'Mô tả', dataIndex: 'description', key: 'description', width: '30%' },
        ),
        {
            title: 'Action',
            key: 'action',
            width: '5%',
            // render: () => (
            //     <Space size="middle">
            //         <a><CIcon icon={cilPen} /></a>
            //         <a><CIcon icon={cilTrash} /></a>
            //     </Space>
            // ),
            render: (text, record) => (
                <Space size="middle">
                    <button
                        style={{
                            backgroundColor: '#52c41a', // xanh lá
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
                        title="Bạn có chắc muốn xóa dòng sản phẩm này?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <button
                            style={{
                                backgroundColor: '#ff4d4f', // đỏ
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
        }
    ]

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
                        justifyContent: 'flex-end',
                        marginBottom: 24,
                        paddingRight: 24
                    }}
                >
                    <Button type="primary" size="large" icon={<AntDesignOutlined />} onClick={() => navigate('/product-lines/create')}>
                        Thêm dòng sản phẩm
                    </Button>
                </div>
            </ConfigProvider>
            <Table columns={columns} dataSource={data} loading={loading} />


        </>
    );

}

export default ProductLine
