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