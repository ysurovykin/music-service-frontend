import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/user.actions';
import { ProfileTypeEnum, UserLoginData } from '../store/user.model';
import { Button, Checkbox, Form, Input, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { userSelectors } from '../store/user.selectors';

export function LoginPage() {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const profileType = useSelector(userSelectors.profileType);

  const dispatch = useDispatch()
  const login = (loginData: UserLoginData) => dispatch(userActions.login(loginData));
  const switchUserToArtist = () => dispatch(userActions.switchUserToArtist());
  const switchUserToListener = () => dispatch(userActions.switchUserToListener());

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

  const onFinish = (values: any) => {
    login({ ...values, profileType: values?.artistProfile ? ProfileTypeEnum.artist : ProfileTypeEnum.listener })
  };

  return (
    <div className="login-page">
      <div className="login-page__form-wrapper">
        <Form
          className="login-page__form"
          initialValues={{
            artistProfile: (profileType || localStorage.getItem('profileType') || ProfileTypeEnum.listener) === ProfileTypeEnum.listener ? false : true,
            remember: true
          }}
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

          <div className='login-page__login-options'>
            <Form.Item
              name="remember"
              valuePropName="checked"
              noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
              className='m-0'
              name="artistProfile">
              <Switch
                checked={values?.artistProfile === true}
                onChange={() => values?.artistProfile ? switchUserToListener() : switchUserToArtist()}
                checkedChildren="Artist profile"
                unCheckedChildren="Listener profile" />
            </Form.Item>
          </div>

          <Form.Item >
            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitButtonDisabled}
              className="login-page__confirm-button">
              Log In
            </Button>
          </Form.Item>

          <Link
            className="login-page__registration-link"
            to={'/registration'}>
            Do not have an account?
          </Link>
        </Form>
      </div >
    </div >
  );
}
