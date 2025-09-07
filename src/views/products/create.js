// import React, { useEffect, useState } from 'react';
// import { Form, Input, message, Select, Button, ConfigProvider } from 'antd';
// import { AntDesignOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { useStyle } from '../../components/button';
// import { createProduct } from '../../api/products';
// import { fetchProductLines } from '../../api/productlines';

// const CreateProduct = () => {
//   const { styles } = useStyle();
//   const navigate = useNavigate();
//   const [form] = Form.useForm();
//   const [productLines, setProductLines] = useState([]);

//   // Fetch product line options
//   useEffect(() => {
//     const loadProductLines = async () => {
//       try {
//         const res = await fetchProductLines();
//         const lines = res?.data?.data || [];
//         setProductLines(lines);
//       } catch (error) {
//         message.error('Không thể tải dòng sản phẩm');
//       }
//     };
//     loadProductLines();
//   }, []);

//   const handleSubmit = async (values) => {
//     const formattedValues = {
//       ...values,
//       productLine: {
//         id: values.productLine, // wrap ID inside object
//       },
//       quantityInstock: parseInt(values.quantityInstock),
//       price: parseFloat(values.price),
//     };

//     try {
//       await createProduct(formattedValues);
//       navigate('/products', {
//         state: {
//           message: 'Tạo sản phẩm thành công!',
//           type: 'success',
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       message.error('❌ Lỗi khi tạo sản phẩm');
//     }
//   };

//   return (
//     <Form
//       form={form}
//       labelCol={{ span: 7 }}
//       wrapperCol={{ span: 14 }}
//       layout="horizontal"
//       style={{ maxWidth: 600 }}
//       onFinish={handleSubmit}
//     >
//       <Form.Item
//         label="Tên sản phẩm"
//         name="name"
//         rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         label="Mô tả"
//         name="description"
//         rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
//       >
//         <Input.TextArea rows={3} />
//       </Form.Item>

//       <Form.Item
//         label="Số lượng"
//         name="quantityInstock"
//         rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
//       >
//         <Input type="number" min={0} />
//       </Form.Item>

//       <Form.Item
//         label="Giá (VNĐ)"
//         name="price"
//         rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
//       >
//         <Input type="number" min={0} />
//       </Form.Item>

//       <Form.Item
//         label="Dòng sản phẩm"
//         name="productLine"
//         rules={[{ required: true, message: 'Vui lòng chọn dòng sản phẩm' }]}
//       >
//         <Select placeholder="Chọn dòng sản phẩm">
//           {productLines.map((line) => (
//             <Select.Option key={line.id} value={line.id}>
//               {line.name}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
//         <ConfigProvider
//           button={{
//             className: styles.linearGradientButton,
//           }}
//         >
//           <Button type="primary" htmlType="submit" icon={<AntDesignOutlined />}>
//             Lưu
//           </Button>
//         </ConfigProvider>
//       </Form.Item>
//     </Form>
//   );
// };

// export default CreateProduct;

// import React, { useEffect, useState } from 'react';
// import { Form, Input, message, Select, Button, ConfigProvider } from 'antd';
// import { AntDesignOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { useStyle } from '../../components/button';
// import { createProduct } from '../../api/products';
// import { fetchProductLines } from '../../api/productlines';
// import axios from 'axios';

// const CreateProduct = () => {
//   const { styles } = useStyle();
//   const navigate = useNavigate();
//   const [form] = Form.useForm();
//   const [productLines, setProductLines] = useState([]);
//   const [imageFile, setImageFile] = useState(null);

//   const API_BASE = 'http://localhost:3001/api/v1';

//   // Fetch product line options
//   useEffect(() => {
//     const loadProductLines = async () => {
//       try {
//         const res = await fetchProductLines();
//         const lines = res?.data?.data || [];
//         setProductLines(lines);
//       } catch (error) {
//         message.error('Không thể tải dòng sản phẩm');
//       }
//     };
//     loadProductLines();
//   }, []);

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     const res = await axios.post(`${API_BASE}/files/upload`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     // ✅ Sửa tại đây: Lấy path đúng từ res.data.file.path
//     return res?.data?.file?.path;
//   };


//   const saveProductImage = async (path, productId) => {
//     await axios.post(`${API_BASE}/product-images`, {
//       path,
//       product: { id: productId },
//     });
//   };

//   const handleSubmit = async (values) => {
//     try {
//       let imagePath = null;

//       if (imageFile) {
//         imagePath = await uploadImage(imageFile);
//       }

//       const formattedValues = {
//         ...values,
//         productLine: {
//           id: values.productLine,
//         },
//         quantityInstock: parseInt(values.quantityInstock),
//         price: parseFloat(values.price),
//       };

//       const productRes = await createProduct(formattedValues);
//       const productId = productRes?.data?.id;

//       if (imagePath && productId) {
//         await saveProductImage(imagePath, productId);
//       }

//       navigate('/products', {
//         state: {
//           message: 'Tạo sản phẩm thành công!',
//           type: 'success',
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       message.error('❌ Lỗi khi tạo sản phẩm');
//     }
//   };

//   return (
//     <Form
//       form={form}
//       labelCol={{ span: 7 }}
//       wrapperCol={{ span: 14 }}
//       layout="horizontal"
//       style={{ maxWidth: 600 }}
//       onFinish={handleSubmit}
//     >
//       <Form.Item
//         label="Tên sản phẩm"
//         name="name"
//         rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         label="Mô tả"
//         name="description"
//         rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
//       >
//         <Input.TextArea rows={3} />
//       </Form.Item>

//       <Form.Item
//         label="Số lượng"
//         name="quantityInstock"
//         rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
//       >
//         <Input type="number" min={0} />
//       </Form.Item>

//       <Form.Item
//         label="Giá (VNĐ)"
//         name="price"
//         rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
//       >
//         <Input type="number" min={0} />
//       </Form.Item>

//       <Form.Item
//         label="Dòng sản phẩm"
//         name="productLine"
//         rules={[{ required: true, message: 'Vui lòng chọn dòng sản phẩm' }]}
//       >
//         <Select placeholder="Chọn dòng sản phẩm">
//           {productLines.map((line) => (
//             <Select.Option key={line.id} value={line.id}>
//               {line.name}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item label="Ảnh sản phẩm" required>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImageFile(e.target.files[0])}
//         />
//       </Form.Item>

//       <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
//         <ConfigProvider
//           button={{
//             className: styles.linearGradientButton,
//           }}
//         >
//           <Button type="primary" htmlType="submit" icon={<AntDesignOutlined />}>
//             Lưu
//           </Button>
//         </ConfigProvider>
//       </Form.Item>
//     </Form>
//   );
// };

// export default CreateProduct;

import React, { useEffect, useState } from 'react';
import { Form, Input, message, Select, Button, ConfigProvider } from 'antd';
import { AntDesignOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useStyle } from '../../components/button';
import { createProduct } from '../../api/products';
import { fetchProductLines } from '../../api/productlines';
import axios from 'axios';

const CreateProduct = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [productLines, setProductLines] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const API_BASE = 'http://localhost:3001/api/v1';

  useEffect(() => {
    const loadProductLines = async () => {
      try {
        const res = await fetchProductLines();
        const lines = res?.data?.data || [];
        setProductLines(lines);
      } catch (error) {
        message.error('Không thể tải dòng sản phẩm');
      }
    };
    loadProductLines();
  }, []);

  const uploadImages = async (files) => {
    const paths = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post(`${API_BASE}/files/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const path = res?.data?.file?.path;
      if (path) paths.push(path);
    }

    return paths;
  };

  const saveProductImage = async (path, productId) => {
    await axios.post(`${API_BASE}/product-images`, {
      path,
      product: { id: productId },
    });
  };

  const handleSubmit = async (values) => {
    try {
      let imagePaths = [];

      if (imageFiles.length > 0) {
        imagePaths = await uploadImages(imageFiles);
      }

      const formattedValues = {
        ...values,
        productLine: {
          id: values.productLine,
        },
        quantityInstock: parseInt(values.quantityInstock),
        price: parseFloat(values.price),
      };

      const productRes = await createProduct(formattedValues);
      const productId = productRes?.data?.id;

      if (productId && imagePaths.length > 0) {
        for (const path of imagePaths) {
          await saveProductImage(path, productId);
        }
      }

      navigate('/products', {
        state: {
          message: 'Tạo sản phẩm thành công!',
          type: 'success',
        },
      });
    } catch (error) {
      console.error(error);
      message.error('❌ Lỗi khi tạo sản phẩm');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const limitedFiles = files.slice(0, 5 - imageFiles.length);
    const newFiles = [...imageFiles, ...limitedFiles];

    if (newFiles.length > 5) {
      message.warning('Chỉ được chọn tối đa 5 ảnh!');
      return;
    }

    const newUrls = limitedFiles.map((file) => URL.createObjectURL(file));
    setImageFiles(newFiles);
    setPreviewUrls([...previewUrls, ...newUrls]);
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...imageFiles];
    const newUrls = [...previewUrls];

    newFiles.splice(index, 1);
    URL.revokeObjectURL(previewUrls[index]); // tránh memory leak
    newUrls.splice(index, 1);

    setImageFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <Form
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Tên sản phẩm"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="Số lượng"
        name="quantityInstock"
        rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
      >
        <Input type="number" min={0} />
      </Form.Item>

      <Form.Item
        label="Giá (VNĐ)"
        name="price"
        rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
      >
        <Input type="number" min={0} />
      </Form.Item>

      <Form.Item
        label="Dòng sản phẩm"
        name="productLine"
        rules={[{ required: true, message: 'Vui lòng chọn dòng sản phẩm' }]}
      >
        <Select placeholder="Chọn dòng sản phẩm">
          {productLines.map((line) => (
            <Select.Option key={line.id} value={line.id}>
              {line.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Ảnh sản phẩm (tối đa 5)" required>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      </Form.Item>

      {/* Preview ảnh đã chọn */}
      <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {previewUrls.map((url, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img
                src={url}
                alt={`preview-${index}`}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 4,
                  border: '1px solid #ccc',
                }}
              />
              <CloseCircleOutlined
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  fontSize: 18,
                  color: 'red',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                }}
              />
            </div>
          ))}
        </div>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
        <ConfigProvider
          button={{
            className: styles.linearGradientButton,
          }}
        >
          <Button type="primary" htmlType="submit" icon={<AntDesignOutlined />}>
            Lưu
          </Button>
        </ConfigProvider>
      </Form.Item>
    </Form>
  );
};

export default CreateProduct;
