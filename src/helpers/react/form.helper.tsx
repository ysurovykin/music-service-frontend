import { ExclamationCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";

const { Text } = Typography;

export function renderFieldErrorMessage (errorMessages: Array<string>) {
  return (
    errorMessages.map(errorMessage => (
      <Text type="danger" key={errorMessage}>
        <ExclamationCircleOutlined></ExclamationCircleOutlined> {errorMessage}
      </Text>
    ))
  );
};

export function renderTextWithToolTip (text: string, tooltipText: string) {
  return (
    <Text style={{color: 'white'}}>
      {text}
      <Tooltip title={tooltipText}> <QuestionCircleOutlined /></Tooltip>
    </Text>
  );
};