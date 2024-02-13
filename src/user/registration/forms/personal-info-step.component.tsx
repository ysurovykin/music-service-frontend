import React, { useEffect, useState } from 'react';
import { Col, Form, FormInstance, Input, Row, Select, Typography } from 'antd';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { renderFieldErrorMessage, renderTextWithToolTip } from '../../../helpers/react/form.helper';

const { Text } = Typography;

export function PersonalInfoStep({ form }: { form: FormInstance }) {
  const values = Form.useWatch([], form);
  const [birthDateErrors, setBirthDateError] = useState<Array<string>>([]);

  useEffect(() => {
    form.validateFields({ dirty: true, validateOnly: true }).then(
      () => {
        setBirthDateError([]);
      },
      (formValues) => {
        const formBirthDateErrors = formValues?.errorFields
          .filter((err: any) => ['day', 'month', 'year'].includes(err?.name.join()));
        setBirthDateError(formBirthDateErrors.map((err: any) => err.errors.join()));
      },
    );
  }, [form, values]);

  return (
    <>
      <Row gutter={8}>
        <Col span={24}>
          <Form.Item
            label={renderTextWithToolTip("Name", "This name will appear on your profile")}
            name="name"
            rules={[
              { required: true, message: 'Please input name' }
            ]}
            help={renderFieldErrorMessage(form.getFieldError('name'))}>
            <Input
              placeholder="Jack Sparrow"
              maxLength={30} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col xs={12}>
          <Form.Item
            label={renderTextWithToolTip('Gender', 'We use your gender to help personalize our content recommendations for you.')}
            name="gender"
            rules={[
              { required: true, message: 'Please input gender' }
            ]}>
            <Select>
              <Select.Option value='Man'>Man</Select.Option>
              <Select.Option value='Woman'>Woman</Select.Option>
              <Select.Option value='Prefer not to say'>Prefer not to say</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            label={renderTextWithToolTip("Country", 'We use your country to help personalize our content recommendations for you.')}
            name="country"
            rules={[
              { required: true, message: 'Please input gender' }
            ]}>
            <Select
              showSearch>
              <Select.Option value='Ukraine'>Ukraine</Select.Option>
              <Select.Option value='Italy'>Italy</Select.Option>
              <Select.Option value='Spain'>Spain</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        required
        label={renderTextWithToolTip("BirthDate", "In order to use the the Music Service you need to be older than 13 years of age")}>
        <Row>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                name="day"
                className="mb-0"
                rules={[
                  { required: true, message: 'Day required' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const amountOfDaysInMonth = new Date(getFieldValue('year'), getFieldValue('month'), 0).getDate();
                      if (+value > +amountOfDaysInMonth) {
                        return Promise.reject(new Error(`Day of birth must be between 1 and ${amountOfDaysInMonth}`));
                      }
                      return Promise.resolve();
                    }
                  })
                ]}
                help=''
                dependencies={['month', 'year']}>
                <Input
                  maxLength={2}
                  min={1}
                  max={31}
                  placeholder="Day" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="mb-0"
                name="month"
                rules={[
                  { required: true, message: 'Month required' }
                ]}
                help=''>
                <Select
                  placeholder="Month">
                  <Select.Option value='1'>January</Select.Option>
                  <Select.Option value='2'>February</Select.Option>
                  <Select.Option value='3'>March</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                className="mb-0"
                name="year"
                rules={[
                  { required: true, message: 'Birth year required' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (+value < 1900) {
                        return Promise.reject(new Error('Please enter a birth year from 1900 onwards'));
                      }
                      const birthDate = new Date(getFieldValue('year'), +getFieldValue('month') - 1, getFieldValue('day'));
                      if ((moment().diff(birthDate, 'years', true)) < 14) {
                        return Promise.reject(new Error('Registration for users under 14 years of age is prohibited'));
                      }
                      return Promise.resolve();
                    }
                  })
                ]}
                help=''>
                <Input
                  maxLength={4}
                  min={1920}
                  max={2024}
                  placeholder="Year" />
              </Form.Item>
            </Col>
          </Row>
        </Row>
        {birthDateErrors.map(errorMessage =>
          errorMessage ? <Row gutter={16}>
            <Col span={24}>
              <Text type="danger" key={errorMessage}>
                <ExclamationCircleOutlined></ExclamationCircleOutlined> {errorMessage}
              </Text>
            </Col>
          </Row> : null
        )}
      </Form.Item>
    </>
  );
}