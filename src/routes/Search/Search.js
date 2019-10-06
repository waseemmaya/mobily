import React from "react";
import { Block, Text } from "galio-framework";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { grayColor } from "../../config/Constants/Colors";
import { width } from "../../config/Constants/Dimensions";
import RenderSearchBar from "../../components/RenderSearchBar/RenderSearchBar";

function Search() {
  return (
    <Block flex={1}>
      <RenderSearchBar />
    </Block>
  );
}

export default Search;
