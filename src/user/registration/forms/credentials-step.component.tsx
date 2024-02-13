import React from 'react';
import { Form, FormInstance, Input } from 'antd';

export function CredentialsStep({ form }: { form?: FormInstance }) {
  return (
    <>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email' },
          { type: 'email', message: 'Email is not valid' }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password' },
          { pattern: RegExp(/(?=.*[A-Z])/), message: 'Password must contain at least 1 upper case letter' },
          { pattern: RegExp(/(?=.*\d)/), message: 'Password must contain at least 1 digit' },
          { pattern: RegExp(/(?=.{8,})/), message: 'Password must be at least 8 symbols length' },
          {
            validator(_, value) {
              if (value && value.includes(' ')) {
                return Promise.reject(new Error('Password must NOT contain spaces'));
              }
              return Promise.resolve();
            }
          }
        ]} >
        <Input.Password />
      </Form.Item>
    </>
  );
}