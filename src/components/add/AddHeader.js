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

import colors from 'Collaap/src/data/colors.js'
import categories from 'Collaap/src/data/categories.js'

class AddHeader extends Component{

  constructor(props){
    super(props)
    this.state = {
      is_open: false
    }
  }

  toggle_modal = () => {
    this.setState({
      is_open: !this.state.is_open
    })
  }

  onSelectCategory = (category_name, backgroundColor) => {
    this.props.onChangeCategory(category_name, backgroundColor)
    this.setState({
      is_open: false,
    })
  }

  componentDidMount(){

  }

  render(){
    return(
      <View style={styles.AddHeader}>
        <TextInput
          onChangeText={this.props.onChangeTitle}
          placeholder="Title"
          value={this.props.item.title}
          style={styles.Title}
        />

        <Pressable onPress={this.toggle_modal}>
          <View style={styles.CategoryPicker}>
            <Image source={categories[this.props.item.category].icon} style={styles.CategoryPickerImage}/>
          </View>
        </Pressable>

        <CustomModal is_open={this.state.is_open} toggle_modal={this.toggle_modal}>
          <FlatList
            numColumns={3}
            keyExtractor={item => categories[item].name}
            data={Object.keys(categories)}
            style={styles.Categories}
            renderItem={({item}) =>
              <Pressable onPress={() => this.onSelectCategory(categories[item].name, categories[item].backgroundColor)}>
                <View style={(categories[item].name === this.props.item.category) ? [styles.CategoryBox, styles.OnCategory] : styles.CategoryBox}>
                  <Image
                    source={categories[item].icon}
                    style={styles.CategoryImage} />
                    <Text style={styles.CategoryText}>{categories[item].title}</Text>
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
    fontSize: 16
  },
  CategoryPicker: {
    width: 50,
    height: 50,
    marginRight: 15,
    marginTop: 10,
  },
  CategoryPickerImage: {
    width: 50,
    height: 50,
  },
  Categories: {
    width: 272,
    flexDirection: 'column',
  },
  CategoryBox: {
    height: 90,
    width: 80,
    margin: 5,
    marginBottom: 10,
    alignItems: "center"
  },
  OnCategory: {
    opacity: 0.1
  },
  CategoryImage: {
    width: 72,
    height: 72
  },
  CategoryText: {
    marginTop: 2,
    fontSize: 11,
    textAlign: "center",
    color: colors.softdark
  }
})

export default AddHeader
