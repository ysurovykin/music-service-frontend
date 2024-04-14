import { ExclamationCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import { TitleProps } from "antd/lib/typography/Title";

const { Text, Title } = Typography;

export function renderFieldErrorMessage(errorMessages: Array<string>) {
  return (
    errorMessages.map(errorMessage => (
      <Text type="danger" key={errorMessage}>
        <ExclamationCircleOutlined></ExclamationCircleOutlined> {errorMessage}
      </Text>
    ))
  );
};

export function renderTextWithToolTip(text: string, tooltipText: string) {
  return (
    <Text style={{ color: 'white' }}>
      {text}
      <Tooltip title={tooltipText}> <QuestionCircleOutlined /></Tooltip>
    </Text>
  );
};

export function renderTitleWithToolTip(text: string, tooltipText: string, level: 1 | 2 | 3 | 4 | 5 | undefined = 3,
  removeMargin: boolean) {
  return (
    <Title className={removeMargin ? 'm-0' : ''} level={level} style={{ color: 'white' }}>
      {text}
      <Tooltip title={tooltipText}> <QuestionCircleOutlined /></Tooltip>
    </Title>
  );
};

export function formatCreditCardNumber(value: string) {
  if (!value) {
    return value;
  }
  value = value.replace(/\D+/g, '');
  return `${value.slice(0, 4)} ${value.slice(4, 8)} ${value.slice(8, 12)} ${value.slice(12, 19)}`.trim();
}

export function formatCreditCardCVV(value: string) {
  return value.replace(/\D+/g, '').slice(0, 3);
}

export function formatCreditCardExpirationDate(value: string) {
  value = value.replace(/\D+/g, '');

  if (value.length >= 3) {
    return `${value.slice(0, 2)}/${value.slice(2, 4)}`;
  }

  return value;
}