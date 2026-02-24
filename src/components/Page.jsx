import { View, Text } from "react-native";
import styled from "@emotion/native";

export const Page = styled(View)`
  background-color: ${({ theme }) => theme.primary};
  padding: ${({ theme }) => theme.spacing(10)};
  border-bottom: ${({ borderBottom, theme }) =>
    borderBottom ? `${theme.spacing(1)} solid ${theme.borderColor}` : ""};
`;

export const Title = styled(Text)`
  font-size: ${({ theme }) => theme.spacing(8)};
  font-weight: bold;
  color: ${({ theme, contrast = false }) =>
    contrast ? theme.contrastText : theme.textColor};
`;

export const Accent = styled(Title)`
  color: ${({ theme }) => theme.secondary};
`;
