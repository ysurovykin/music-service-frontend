import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user.actions';
import { ProfileTypeEnum, UserRegistrationData } from '../store/user.model';
import { Button, Col, Form, Row, Steps, message } from 'antd';
import { IdcardFilled, InfoCircleFilled, LockFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialsStep } from './forms/credentials-step.component';
import { PersonalInfoStep } from './forms/personal-info-step.component';
import { AccountTypeStep } from './forms/account-type-step.component';
import { useSelector } from 'react-redux';
import { userSelectors } from '../store/user.selectors';

export function RegistrationPage() {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [current, setCurrent] = useState(0);
  const [registrationData, setRegistrationData] = useState<UserRegistrationData>();

  const profileType = useSelector(userSelectors.profileType);
  const dispatch = useDispatch()
  const registration = (registrationData: UserRegistrationData) => dispatch(userActions.registration(registrationData));

  const next = () => {
    const formValues = form.getFieldsValue();
    setRegistrationData(currentState => ({ ...currentState, ...formValues }));
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Account Type',
      icon: <InfoCircleFilled />,
      content: () => <AccountTypeStep form={form} />,
    },
    {
      title: 'Credentials',
      icon: <LockFilled />,
      content: () => <CredentialsStep form={form} />,
    },
    {
      title: 'Personal Info',
      icon: <IdcardFilled />,
      content: () => <PersonalInfoStep form={form} />,
    }
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setIsSubmitButtonDisabled(false);
      },
      (error) => {
        if (!error.errorFields.length) {
          setIsSubmitButtonDisabled(false);
        } else {
          setIsSubmitButtonDisabled(true);
        }
      },
    );
  }, [form, values, current]);

  const onFinish = () => {
    const formValues = form.getFieldsValue();
    registration({ ...registrationData!, ...formValues, profileType: profileType as ProfileTypeEnum });
  };

  return (
    <div className="registration-page">
      <div className="registration-page__form-wrapper">
        <Steps
          current={current}
          items={items}
          size='default'
          labelPlacement='vertical' />
        <Form
          className="registration-page__form"
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout={current === 0 ? 'horizontal' : 'vertical'}>
          {steps[current].content()}
          <Row
            className="place-center"
            gutter={16}>
            <Col>
              <>
                {current < steps.length - 1 && (
                  <Button
                    type="primary"
                    disabled={isSubmitButtonDisabled}
                    onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    disabled={isSubmitButtonDisabled}
                    htmlType="submit"
                    onClick={() => message.success('Processing complete!')}>
                    Sign Up
                  </Button>
                )}
              </>
            </Col>
            {current > 0 && (
              <Col>
                <Button
                  className='registration-page__back-button'
                  onClick={() => prev()}>
                  Previous
                </Button>
              </Col>
            )}
          </Row>
        </Form>
        <Link
          className="registration-page__login-link"
          to={'/login'}>
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
