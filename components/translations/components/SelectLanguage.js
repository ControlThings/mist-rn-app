// @flow
import React from "react";
import styled from "styled-components/native";
import { FormattedMessage } from "react-intl";

import constants from "../../constants";
import messages from "../../translations/messages";
import { Regular } from "../commission/components/Fonts";
import LanguageList from "./LanguageList";

const Container = styled.View`
  padding: ${constants.spacing.xxl}px;
`;

const BackButton = styled.TouchableOpacity`
  margin-bottom: ${constants.spacing.s};
`;

type Props = {
  navigation: {
    goBack: () => void
  }
};

const SelectLanguage = (props: Props) => {
  return (
    <Container>
      <BackButton onPress={() => props.navigation.goBack()}>
        <Regular>
          <FormattedMessage {...messages.back}>{(msg) => msg.toUpperCase()}</FormattedMessage>
        </Regular>
      </BackButton>
      <LanguageList />
    </Container>
  );
};

export default SelectLanguage;
