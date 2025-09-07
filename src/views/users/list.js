import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Space, Table, ConfigProvider } from 'antd';
import Highlighter from 'react-highlight-words';
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPen } from '@coreui/icons'
import { fetchUsers } from '../../api/users';
import { Tag } from 'antd';
import { useStyle } from '../../components/button';
import { AntDesignOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const User = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { styles } = useStyle();
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await fetchUsers();
            // console.log(res.data);
            const users = Array.isArray(res.data?.data)
                ? res.data.data.map((user, index) => ({
                    key: user.id,
                    name: `${user.firstName} ${user.lastName}` || 'N/A',
                    role: user.role?.name || 'N/A',
                    status: user.status?.name || 'Inactive',
                })) : [];
            // setData(res.data.data);
            setData(users);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            message.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }

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
            { title: 'Tên người dùng', dataIndex: 'name', key: 'name', width: '30%' },
            getColumnSearchProps('name'),
        ),
        Object.assign(
            { title: 'Vai trò', dataIndex: 'role', key: 'role', width: '20%' },
            getColumnSearchProps('role'),
        ),
        // Object.assign(
        //     { title: 'Status', dataIndex: 'status', key: 'status', width: '20%' },
        //     getColumnSearchProps('status'),
        // ),
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            width: '20%',
            render: (status) => {
                let color = 'default';

                switch (status.toLowerCase()) {
                    case 'active':
                        color = 'green';
                        break;
                    case 'inactive':
                        color = 'volcano';
                        break;
                    case 'banned':
                        color = 'red';
                        break;
                    default:
                        color = 'geekblue';
                        break;
                }

                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        // Object.assign(
        //     Object.assign(
        //         { title: 'Address', dataIndex: 'address', key: 'address' },
        //         getColumnSearchProps('address'),
        //     ),
        //     {
        //         sorter: (a, b) => a.address.length - b.address.length,
        //         sortDirections: ['descend', 'ascend'],
        //     },
        // ),
        {
            title: 'Action',
            key: 'action',
            width: '10%',
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
                        onClick={() => navigate(`/users/edit/${record.key}`)}
                    >
                        <CIcon icon={cilPen} size="sm" />
                    </button>
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
                </Space>
            ),
        }

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
            justifyContent: 'flex-end',
            marginBottom: 24,
            paddingRight: 24
          }}
        >
          <Button type="primary" size="large" icon={<AntDesignOutlined />} onClick={() => navigate('/users/create')}>
            Thêm người dùng
          </Button>
        </div>
      </ConfigProvider>
      <Table columns={columns} dataSource={data} loading={loading} />
        </>
    );
    // return <Table columns={columns} dataSource={data} loading={loading} />;
};
export default User;



