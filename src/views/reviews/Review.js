import React, { useEffect, useState } from 'react'
import { fetchReviews } from '../../api/reviews';
import { message } from 'antd';
import { useRef } from 'react';
import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPen } from '@coreui/icons'
import Highlighter from 'react-highlight-words';

const Review = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await fetchReviews();
            console.log(res.data.data);
            const reviews = Array.isArray(res.data?.data)
            ? res.data.data.map((review, index) => ({
                key: review.id,
                reviewText: review.reviewText,
                rating: review.rating,
            })) : [];
            setData(reviews);
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
            message.error('Failed to fetch reviews');
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
          { title: 'reviewText', dataIndex: 'reviewText', key: 'reviewText', width: '30%' },
          getColumnSearchProps('reviewText'),
        ),
        Object.assign(
          { title: 'rating', dataIndex: 'rating', key: 'rating', width: '10%' },
        ),
        {
          title: 'Action',
          key: 'action',
          width: '5%',
          render: () => (
            <Space size="middle">
              <a><CIcon icon={cilPen} /></a>
              <a><CIcon icon={cilTrash} /></a>
            </Space>
          ),
        }
      ]
    
      return <Table columns={columns} dataSource={data} loading={loading}/>;

    // return (
    //     <div>
    //         Review
    //     </div>
    // )
}

export default Review
