import React, { Component } from 'react';
import { Icon } from 'native-base';
import { Text, Block, Input, Card } from 'galio-framework';
import { StatusBar, Keyboard, Image, TouchableOpacity } from 'react-native';
import { primaryColor, grayColor } from '../Constants/Colors';
import { width } from '../Constants/Dimensions';
import { ScrollView } from 'react-native-gesture-handler';
import { DotIndicator } from 'react-native-indicators';


const API_KEY = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA';
const END_POINT = 'https://www.googleapis.com/youtube/v3/search/?';
let API_KEY_END_POINT = `${END_POINT}key=${API_KEY}`;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchingEnabled : false,
      vidsArr: [],
      searchQuery: 'Atif Aslam',
      nextPage: '',
      searching: false,
      fetchingMore: false,
    };
  }
  render() {
    const {isSearchingEnabled, vidsArr}= this.state;
    if (vidsArr.length < 1) {
      return <DotIndicator color={primaryColor} size={10} />
       
    }
    return (
      <Block style={{ flex: 1 }}>
        <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
        <Block>{this.renderSearchBar()}</Block>
        <ScrollView>
          {!isSearchingEnabled && <Block>
            {this.state.vidsArr.map((v, i) => {
              return (
                <TouchableOpacity key={i} activeOpacity={0.6}
                onPress={() => this.props.navigation.navigate("ViewAd")}
                >
                  {/* <Image
                    style={{ height: 210 }}
                    source={{ uri: v.snippet.thumbnails.high.url }}
                  />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ marginBottom: 10, fontSize: 18 }}
                  >
                    {v.snippet.title}
                  </Text> */}
                  <Block>
                    <Card
                      card
                      shadow
                      borderless
                      neutral
                      fullBackgroundImage
                      image={v.snippet.thumbnails.high.url}
                      authorImageSrc={v.snippet.thumbnails.high.url}
                      title={v.snippet.title}
                      authorSubTitle="420 minutes ago"
                    />
                  </Block>
                </TouchableOpacity>
              );
            })}
          </Block>}
        </ScrollView>
      </Block>
    );
  }

  componentWillUnmount = ()=> {
    this.setState({
      isSearchingEnabled : false
    })
  }

  search = () => {
    var { vidsArr, searchQuery } = this.state;

    this.setState({
      searching: true,
    });
    var { vidsArr } = this.state;
    vidsArr = [];
    this.setState({
      vidsArr,
    });

    let c = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchQuery}&key=${API_KEY}`;
    fetch(c)
      .then(res => res.json())
      .then(val => {
        let newArr = vidsArr.concat(val.items);
        this.setState({
          searchQuery: searchQuery,
          nextPage: val.nextPageToken,
          vidsArr: newArr,
          searching: false,
          isSearchingEnabled : false
        });
      });
  };

  componentDidMount() {
    this.initialsearch();
  }

  initialsearch = () => {
    this.setState({
      fetchingMore: true,
    });
    var { vidsArr, searchQuery } = this.state;

    let a = `www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id&key=${API_KEY}&q=${searchQuery}`;
    let b = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=${API_KEY}&q=${searchQuery}`;
    let c = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchQuery}&key=${API_KEY}`;
    // fetch(`${API_KEY_END_POINT}&part=snippet,id&maxResults=10&q=${query}`)
    fetch(c)
      .then(res => res.json())
      .then(val => {
        let newArr = vidsArr.concat(val.items);
        this.setState({
          nextPage: val.nextPageToken,
          vidsArr: newArr,
          fetchingMore: false,
        });
      });
  };

  renderSearchBar = () => {
    const { searchQuery } = this.state;
    return (
      <Block style={{ height: 70, backgroundColor: primaryColor }}>
        <Input
          value={searchQuery}
          onChangeText={searchQuery => this.setState({ searchQuery })}
          placeholder="Search..."
          borderless
          onFocus={()=> this.setState({isSearchingEnabled : true})}
          placeholderTextColor={grayColor}
          onSubmitEditing={this.search}
          style={{
            borderRadius: 1,
            height: 38,
            width: width - 32,
            marginHorizontal: 14,
            marginTop: 10,
          }}
          right
          iconContent={
            <Icon
              onPress={() => {
                if (searchQuery.length > 0) {
                  this.setState({ searchQuery: '', isSearchingEnabled : false });
                  // Keyboard.dismiss();
                }
              }}
              style={{ fontSize: 21, color: grayColor }}
              name={searchQuery.length > 0 ? 'ios-close' : 'ios-search'}
              type="Ionicons"
            />
          }
        />
      </Block>
    );
  };
}
