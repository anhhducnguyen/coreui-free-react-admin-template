// // import React from 'react'
// // import { useState } from 'react';
// // import {
// //     Form,
// //     Input,
// // } from 'antd';
// // import { createStyles } from 'antd-style';
// // import { Button, ConfigProvider } from 'antd';
// // import { AntDesignOutlined } from '@ant-design/icons';

// // const useStyle = createStyles(({ prefixCls, css }) => ({
// //     linearGradientButton: css`
// //     &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
// //       > span {
// //         position: relative;
// //       }

// //       &::before {
// //         content: '';
// //         background: linear-gradient(135deg, #6253e1, #04befe);
// //         position: absolute;
// //         inset: -1px;
// //         opacity: 1;
// //         transition: all 0.3s;
// //         border-radius: inherit;
// //       }

// //       &:hover::before {
// //         opacity: 0;
// //       }
// //     }
// //   `,
// // }));

// // const CreateProductLine = () => {
// //     const [componentDisabled, setComponentDisabled] = useState(true);
// //     const { styles } = useStyle();
// //     return (
// //         <>
// //             <Form
// //                 labelCol={{ span: 7 }}
// //                 wrapperCol={{ span: 14 }}
// //                 layout="horizontal"
// //                 style={{ maxWidth: 600 }}
// //             >

// //                 <Form.Item label="Tên dòng sản phẩm">
// //                     <Input />
// //                 </Form.Item>

// //                 <Form.Item label="Mô tả">
// //                     <Input />
// //                 </Form.Item>

// //             </Form>
// //             <ConfigProvider
// //                 button={{
// //                     className: styles.linearGradientButton,
// //                 }}
// //             >
// //                 <div
// //                     style={{
// //                         display: 'flex',
// //                         justifyContent: 'flex-end',
// //                         marginBottom: 24,   // tạo khoảng cách với bảng
// //                         paddingRight: 24 // nếu bảng có padding
// //                     }}
// //                 >
// //                     <Button type="primary" size="large" icon={<AntDesignOutlined />} onClick={() => navigate('/product-lines/create')}>
// //                         Lưu
// //                     </Button>
// //                 </div>
// //             </ConfigProvider>
// //         </>
// //     );
// // }

// // export default CreateProductLine

// import React from 'react';
// import { useState } from 'react';
// import { Form, Input, message } from 'antd';
// import { createStyles } from 'antd-style';
// import { Button, ConfigProvider } from 'antd';
// import { AntDesignOutlined } from '@ant-design/icons';
// import { createProductLine } from '../../api/productlines';
// import { useNavigate } from 'react-router-dom';

// const useStyle = createStyles(({ prefixCls, css }) => ({
//   linearGradientButton: css`
//     &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
//       > span {
//         position: relative;
//       }

//       &::before {
//         content: '';
//         background: linear-gradient(135deg, #6253e1, #04befe);
//         position: absolute;
//         inset: -1px;
//         opacity: 1;
//         transition: all 0.3s;
//         border-radius: inherit;
//       }

//       &:hover::before {
//         opacity: 0;
//       }
//     }
//   `,
// }));

// const CreateProductLine = () => {
//   const { styles } = useStyle();
//   const navigate = useNavigate();
//   const [form] = Form.useForm();

//   const handleSubmit = async (values) => {
//     try {
//       await createProductLine(values);
//       message.success('Tạo dòng sản phẩm thành công!');
//       navigate('/product-lines');
//     } catch (error) {
//       console.error(error);
//       message.error('Lỗi khi tạo dòng sản phẩm');
//     }
//   };

//   return (
//     <>
//       <Form
//         form={form}
//         labelCol={{ span: 7 }}
//         wrapperCol={{ span: 14 }}
//         layout="horizontal"
//         style={{ maxWidth: 600 }}
//         onFinish={handleSubmit}
//       >
//         <Form.Item
//           label="Tên dòng sản phẩm"
//           name="name"
//           rules={[{ required: true, message: 'Vui lòng nhập tên dòng sản phẩm' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Mô tả"
//           name="description"
//           rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
//         >
//           <Input.TextArea rows={3} />
//         </Form.Item>

//         <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
//           <ConfigProvider
//             button={{
//               className: styles.linearGradientButton,
//             }}
//           >
//             <Button type="primary" htmlType="submit" icon={<AntDesignOutlined />}>
//               Lưu
//             </Button>
//           </ConfigProvider>
//         </Form.Item>
//       </Form>
//     </>
//   );
// };

// export default CreateProductLine;

import React from 'react';
import { Form, Input, message } from 'antd';
import { Button, ConfigProvider } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { createProductLine } from '../../api/productlines';
import { useNavigate } from 'react-router-dom';
import { useStyle } from '../../components/button';

const CreateProductLine = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await createProductLine(values);
      navigate('/product-lines', {
        state: {
          message: 'Tạo dòng sản phẩm thành công!',
          type: 'success',
        },
      });
    } catch (error) {
      console.error(error);
      message.error('❌ Lỗi khi tạo dòng sản phẩm');
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
      <Form.Item
        label="Tên dòng sản phẩm"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên dòng sản phẩm' }]}
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

export default CreateProductLine;
