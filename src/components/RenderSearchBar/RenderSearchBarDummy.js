import React, { useContext } from "react";
import { Block, Text, Input } from "galio-framework";
import { Icon } from "native-base";
import { withNavigation } from "react-navigation";
import { grayColor } from "../../config/Constants/Colors";
import { width } from "../../config/Constants/Dimensions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "../../contexts/ThemeContext";
import CardView from "react-native-cardview";

function RenderSearchBarDummy(props) {
  console.log("props: ", props);
  const themeContext = useContext(ThemeContext);
  const { color } = themeContext;

  const { navigation } = props;

  return (
    <CardView
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        // backgroundColor: "#ffffff"
        backgroundColor: "#FCFDFF"
      }}
      cardElevation={2}
      cardMaxElevation={2}
      cornerRadius={2}
    >
      <Block
        style={{
          height: 40,
          backgroundColor: "#FCFDFF"
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Block
            style={{
              // backgroundColor: "white",
              backgroundColor: "#FCFDFF",
              borderRadius: 30,
              width: width - 32,
              marginHorizontal: 20,
              marginTop: 5
            }}
            row
          >
            <Block style={{ marginLeft: 15, marginTop: 6 }}>
              <Icon
                style={{ fontSize: 20, color: grayColor }}
                name={false ? "ios-close" : "ios-search"}
                type="Ionicons"
              />
            </Block>
            <Block style={{ marginLeft: 10, marginTop: 5 }}>
              <Text p muted size={14}>
                What are you looking for?
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    </CardView>
  );
}

export default withNavigation(RenderSearchBarDummy);
