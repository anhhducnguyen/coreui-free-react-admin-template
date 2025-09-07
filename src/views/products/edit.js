// import React from 'react'

// const EditProduct = () => {
//   return (
//     <div>
//       <h1>
//         Edit Product
//         Hello
//       </h1>
//     </div>
//   )
// }

// export default EditProduct

import React, { useEffect, useState } from 'react';
import { Form, Input, message, Select, Button, ConfigProvider } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useStyle } from '../../components/button';
import axios from 'axios';

const EditProduct = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [productLines, setProductLines] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [existingImagePath, setExistingImagePath] = useState(null);

  const API_BASE = 'http://localhost:3001/api/v1';

  // Load product lines
  useEffect(() => {
    const loadProductLines = async () => {
      try {
        const res = await axios.get(`${API_BASE}/product-lines`);
        setProductLines(res.data.data || []);
      } catch {
        message.error('Không thể tải dòng sản phẩm');
      }
    };

    const loadProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products/${id}`);
        const product = res.data;
        form.setFieldsValue({
          name: product.name,
          description: product.description,
          quantityInstock: product.quantityInstock,
          price: product.price,
          productLine: product.productLine?.id,
        });
        setExistingImagePath(product.images?.[0]?.path || null);
      } catch (error) {
        console.error(error);
        message.error('Không thể tải sản phẩm');
      }
    };

    loadProductLines();
    loadProduct();
  }, [id, form]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post(`${API_BASE}/files/upload`, formData);
    return res?.data?.file?.path;
  };

  const saveProductImage = async (path) => {
    await axios.post(`${API_BASE}/product-images`, {
      path,
      product: { id },
    });
  };

  const handleSubmit = async (values) => {
    try {
      let imagePath = existingImagePath;

      if (imageFile) {
        imagePath = await uploadImage(imageFile);
      }

      const payload = {
        ...values,
        productLine: {
          id: values.productLine,
        },
        quantityInstock: parseInt(values.quantityInstock),
        price: parseFloat(values.price),
      };

      await axios.put(`${API_BASE}/products/${id}`, payload);

      if (imagePath && imagePath !== existingImagePath) {
        await saveProductImage(imagePath);
      }

      navigate('/products', {
        state: {
          message: '✅ Cập nhật sản phẩm thành công!',
          type: 'success',
        },
      });
    } catch (error) {
      console.error(error);
      message.error('❌ Lỗi khi cập nhật sản phẩm');
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit}
    >
      <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Số lượng" name="quantityInstock" rules={[{ required: true }]}>
        <Input type="number" min={0} />
      </Form.Item>

      <Form.Item label="Giá" name="price" rules={[{ required: true }]}>
        <Input type="number" min={0} />
      </Form.Item>

      <Form.Item label="Dòng sản phẩm" name="productLine" rules={[{ required: true }]}>
        <Select placeholder="Chọn dòng sản phẩm">
          {productLines.map((line) => (
            <Select.Option key={line.id} value={line.id}>
              {line.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Ảnh sản phẩm">
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        {existingImagePath && (
          <div style={{ marginTop: 8 }}>
            <img src={existingImagePath} alt="Sản phẩm" style={{ width: 100 }} />
          </div>
        )}
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
        <ConfigProvider
          button={{
            className: styles.linearGradientButton,
          }}
        >
          <Button type="primary" htmlType="submit" icon={<AntDesignOutlined />}>
            Cập nhật
          </Button>
        </ConfigProvider>
      </Form.Item>
    </Form>
  );
};

export default EditProduct;
