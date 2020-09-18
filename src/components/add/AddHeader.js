import React, { Component } from 'react'

import {
  Text,
  View,
  TextInput,
  Image,
  Modal,
  Pressable,
  FlatList,
  StyleSheet
} from 'react-native'

import CustomModal from './CustomModal'

import categories from 'Collaap/src/data/categories.js'

class AddHeader extends Component{

  constructor(props){
    super(props)
    this.state = {
      is_open: true,
      on_category: null,
      on_category_image: require("Collaap/src/images/categories/shopping.png")
    }
  }

  toggle_modal = () => {
    this.setState({
      is_open: !this.state.is_open
    })
  }

  onSelectCategory = (category_name, category_image, backgroundColor) => {
    this.props.onChangeCategory(category_name, backgroundColor)
    this.setState({
      is_open: false,
      on_category: category_name,
      on_category_image: category_image
    })
  }

  render(){
    return(
      <View style={styles.AddHeader}>
        <TextInput
          onChangeText={this.props.onChangeTitle}
          placeholder="Title"
          style={styles.Title}
        />

        <Pressable onPress={this.toggle_modal}>
          <View style={styles.CategoryPicker}>
            <Image style={styles.CategoryPickerImage} source={this.state.on_category_image} />
          </View>
        </Pressable>

        <CustomModal is_open={this.state.is_open} toggle_modal={this.toggle_modal}>
          <FlatList
            numColumns={3}
            keyExtractor={item => item.name}
            data={categories}
            style={styles.Categories}
            renderItem={({item}) =>
              <Pressable onPress={() => this.onSelectCategory(item.name, item.icon, item.backgroundColor)}>
                <View style={(item.name === this.state.on_category) ? [styles.CategoryBox, styles.On_category] : styles.CategoryBox}>
                  <Image
                    source={item.icon}
                    style={styles.CategoryImage} />
                    <Text style={styles.CategoryText}>{item.title}</Text>
                </View>
              </Pressable>}
          />
        </CustomModal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  AddHeader: {
    flexDirection: "row"
  },
  Title: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 30,
    flex: 1,
    fontSize: 20
  },
  CategoryPicker: {
    width: 50,
    height: 50,
    marginRight: 15,
    marginTop: 15,
    // borderWidth: 1
  },
  CategoryPickerImage: {
    width: 50,
    height: 50,
  },


  Categories: {
    // borderWidth: 1,
    borderColor: "red",
    width: 272,
    flexDirection: 'column',
  },
  CategoryBox: {
    height: 95,
    width: 80,
    margin: 5,
    marginBottom: 15,
    alignItems: "center"
  },
  On_category: {
    borderColor: "red"
  },
  CategoryImage: {
    width: 72,
    height: 72
  },
  CategoryText: {
    marginTop: 2,
    fontSize: 11,
    textAlign: "center"
  }
})

export default AddHeader
