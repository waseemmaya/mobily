import React, { useContext } from "react";
import { View, StatusBar } from "react-native";
import { Root } from "native-base";
import Navigator from "./src/Navigator";
import AdContextWrapper from "./src/contexts/AdContext";
import { ThemeContext } from "./src/contexts/ThemeContext";
import SearchContextWrapper from "./src/contexts/SearchContext";
import { Provider } from "@ant-design/react-native";

function App() {
  const themeContext = useContext(ThemeContext);
  const { color } = themeContext;
  return (
    <View style={{ flex: 1, backgroundColor: "#FCFDFF" }}>
      <Root>
        <Provider>
          <AdContextWrapper>
            <SearchContextWrapper>
              <StatusBar
                hidden={false}
                animated={true}
                backgroundColor="#FCFDFF"
                barStyle="dark-content"
              />
              <Navigator />
            </SearchContextWrapper>
          </AdContextWrapper>
        </Provider>
      </Root>
    </View>
  );
}

export default App;
