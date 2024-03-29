import React, { useContext } from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native";
import { Image, View, Text, Caption, Row } from "@shoutem/ui";
import moment from "moment";
import { Icon } from "native-base";
import axios from "axios";
import API from "../../config/API/API";
import { getUserID } from "../../config/Helpers/AuthFunctions";
import { AdContext } from "../../contexts/AdContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Toast } from "@ant-design/react-native";
import { grayColor } from "../../config/Constants/Colors";

import CardView from "react-native-cardview";

// removefromfavt

function RenderAd(props) {
  const { ad, removeFromFavt, navigation } = props;
  let adContext = useContext(AdContext);
  const { getUser, user } = adContext;

  const themeContext = useContext(ThemeContext);
  const { color } = themeContext;

  toggleFavt = async _id => {
    if (!user) {
      return;
    }
    let { favtAds } = user;

    let url = `${API}ads/addtofavt`;
    let msg = `Added to`;
    for (let i = 0; i < favtAds.length; i++) {
      if (favtAds[i] === _id) {
        url = `${API}ads/removefromfavt`;
        msg = `Removed from`;
      }
    }
    try {
      let userId = await getUserID();
      let res = await axios({
        method: "post",
        url: url,
        data: {
          id: _id,
          userId: userId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Toast.info(`${msg} Favorite.`, 1);

      // Toast.show({
      //     text: `${msg} Favorite.!`,
      //     position: 'bottom',
      //     type: 'success',
      //     duration: 700
      // });
      getUser();
      if (removeFromFavt) {
        removeFromFavt(_id);
      }
    } catch (error) {
      console.warn("error: ", error);
    }
  };

  let isMatched = false;
  user &&
    user.favtAds &&
    user.favtAds.map(id => {
      if (JSON.stringify(id) === JSON.stringify(ad._id)) {
        isMatched = true;
      }
    });
  let iconName = !isMatched ? "ios-heart-empty" : "ios-heart";

  return (
    <CardView
      key={`${ad._id}${ad.adNumber}`}
      cardElevation={1}
      style={{
        backgroundColor: "#FCFDFF"
      }}
      cardMaxElevation={1}
      cornerRadius={2}
    >
      <Row>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewAd", { ad: ad })}
        >
          <Image
            styleName="medium rounded-corners"
            source={{ uri: ad.adsImages[0].thumb }}
          />
        </TouchableOpacity>
        <View styleName="vertical stretch space-between">
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewAd", { ad: ad })}
            styleName="flexible"
          >
            <Text>
              {ad.adNumber} - {ad.adTitle}
            </Text>
          </TouchableOpacity>
          <View styleName="horizontal space-between">
            <Caption>{moment(ad.postedAt).fromNow()}</Caption>
            <Caption>Rs {ad.price}</Caption>
            <TouchableOpacity onPress={() => toggleFavt(ad._id)}>
              <Icon
                style={{ fontSize: 21, color: grayColor }}
                name={iconName}
                type="Ionicons"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Row>
    </CardView>
  );
}

export default withNavigation(RenderAd);
