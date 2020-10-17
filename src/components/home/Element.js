import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import helpers from 'Collaap/src/utils/helpers.js'
import { connect } from 'react-redux'

function mapStateToProps(state){
  return {
    collaaps: state.collaaps
  }
}

const Element = (props) => {
  return(
    <TouchableOpacity onPress={() => props.loadNewItemScreen(props.item)}>
      <View style={styles.SubItem}>
        <View style={styles.CategoryBox}>
          <Image source={props.icon} style={styles.CategoryIcon} />
        </View>

        <View style={styles.Main}>
          <Text style={styles.Title}>
            {props.item.title}
          </Text>
          <Text style={styles.Time}>
            {props.item.time}
          </Text>
        </View>

        <View style={styles.Collaborators}>
          <FlatList
            keyExtractor={(item) => item}
            data={props.item.collaborators}
            ListEmptyComponent={() =>
              <Text style={styles.NoCollaaps}>Empty</Text>}
            renderItem={({item}) =>
              <Image
                style={styles.LittleCollaap}
                source={helpers.getIconByName(props.collaaps.find(c => c._id === item).icon)}
              />}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  SubItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row'
  },
  CategoryBox: {
    width: 48,
    height: 48
  },
  CategoryIcon: {
    width: 48,
    height: 48
  },
  Main: {
    flexBasis: '60%',
    marginHorizontal: 10
  },
  Collaborators: {
    flex: 1,
    padding: 5,
    borderLeftWidth: 1,
    borderColor: '#e4e4e4',
    alignItems: "flex-start",
    justifyContent: "center",
  },
  LittleCollaap: {
    width: 20,
    height: 20,
    opacity: 0.9,
    borderRadius: 11
  },
  NoCollaaps: {
    fontSize: 8,
    color: "#ccc",
    textAlign: "center"
  },
  Title: {
    fontSize: 18
  },
  Time: {
    fontSize: 13,
    marginTop: 4
  }
})

export default connect(mapStateToProps)(Element)
