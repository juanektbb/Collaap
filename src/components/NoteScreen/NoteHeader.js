import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  TextInput,
  StyleSheet
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'
import categories from 'Collaap/src/data/categories.js'

import ModalCustom from 'Collaap/src/components/General/ModalCustom'

class NoteHeader extends Component{

  state = {
    is_open: false
  }

  toggle_modal = () => {
    this.setState({
      is_open: !this.state.is_open
    })
  }

  onSelectCategory = (category_name) => {
    this.props.onChangeCategory(category_name)
    this.setState({
      is_open: false
    })
  }

  render(){
    return(
      <View style={styles.NoteHeader}>
        <TextInput
          maxLength={45}
          placeholder="Title"
          style={styles.Title}
          value={this.props.item.title}
          onChangeText={this.props.onChangeTitle}/>

        <Pressable onPress={this.toggle_modal}>
          <View style={styles.CategoryPicker}>
            <Image source={categories[this.props.item.category].icon} style={styles.CategoryPickerImage}/>
          </View>
        </Pressable>

        <ModalCustom is_open={this.state.is_open} toggle_modal={this.toggle_modal} title="Choose a category">
          <FlatList
            numColumns={3}
            keyExtractor={item => categories[item].name}
            data={Object.keys(categories)}
            style={styles.Categories}
            renderItem={({item}) =>
              <Pressable onPress={() => this.onSelectCategory(categories[item].name)}>
                <View style={(categories[item].name === this.props.item.category) ? [styles.CategoryBox, styles.OnCategory] : styles.CategoryBox}>
                  <Image
                    source={categories[item].icon}
                    style={styles.CategoryImage} />
                    <Text style={styles.CategoryText}>{categories[item].title}</Text>
                </View>
              </Pressable>}
          />
        </ModalCustom>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  NoteHeader: {
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
    opacity: 0.25
  },
  CategoryImage: {
    width: 72,
    height: 72
  },
  CategoryText: {
    marginTop: 2,
    fontSize: 11,
    textAlign: "center",
    color: colors.charcoal
  }
})

export default NoteHeader
