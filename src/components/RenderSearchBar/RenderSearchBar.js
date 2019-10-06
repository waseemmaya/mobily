import React, { useEffect, useContext } from "react";
import { Icon } from "native-base";
import { Block, Input, Text } from "galio-framework";
import { TouchableOpacity, Keyboard } from "react-native";
import { withNavigation } from "react-navigation";
import { grayColor } from "../../config/Constants/Colors";
import { width } from "../../config/Constants/Dimensions";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AdContext } from "../../contexts/AdContext";

RenderSearchBar = props => {
  const themeContext = useContext(ThemeContext);
  const { color } = themeContext;

  const adContext = useContext(AdContext);
  const { adsArr, totalAds } = adContext;

  return (
    <Block
      style={{
        height: 54,
        backgroundColor: color
      }}
      row
    >
      <Block style={{ marginTop: 16, marginLeft: 10 }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon
            style={{ fontSize: 25, color: "white" }}
            type="Ionicons"
            name="md-arrow-back"
          />
        </TouchableOpacity>
      </Block>
      <Input
        autofocus={true}
        placeholder="What are you looking for?"
        borderless
        placeholderTextColor={grayColor}
        style={{
          height: 37,
          borderRadius: 30,
          width: width - 46,
          marginHorizontal: 10
        }}
        right
        iconContent={
          <TouchableOpacity styleName="flexible">
            <Icon
              style={{ fontSize: 22, color: grayColor }}
              name={true ? "ios-close" : "ios-search"}
              type="Ionicons"
            />
          </TouchableOpacity>
        }
      />
    </Block>
  );
};

export default withNavigation(RenderSearchBar);
