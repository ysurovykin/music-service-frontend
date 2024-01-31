import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user.actions';
import { UserLoginData } from '../store/user.model';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

export function LoginPage() {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setIsSubmitButtonDisabled(false);
      },
      () => {
        setIsSubmitButtonDisabled(true);
      },
    );
  }, [form, values]);
  const dispatch = useDispatch()
  const login = (loginData: UserLoginData) => dispatch(userActions.loginStart(loginData));
  
  const onFinish = (values: any) => {
    login({...values})
  };

  return (
    <div className="login-page">
      <div className="login-page form-wrapper">
        <Form
          style={{ width: '100%', maxWidth: 300 }}
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout='vertical'>
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
            rules={[{ required: true, message: 'Please input your password' }]} >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked" 
              noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link 
              className="login-page-forgot-password"
              to={'/reset-password'}>
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item >
            <Button 
              type="primary" 
              htmlType="submit" 
              disabled={isSubmitButtonDisabled}
              className="login-page-button">
              Log In
            </Button>
          </Form.Item>

          <Link 
            className="login-page-registration-link"
            to={'/registration'}>
            Do not have an account?
          </Link>
        </Form>
      </div>
    </div>
  );
}
