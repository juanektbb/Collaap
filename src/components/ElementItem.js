import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

class ElementItem extends Component{

  constructor(props){
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount(){
    this.setState({
      data: this.props.item
    })
  }

  render(){
    return(
      <TouchableOpacity onPress={() => this.props.loadNewItemScreen(this.state.data)}>
        <View style={styles.SubItem}>
          <View style={styles.CategoryBox}>
            <Image source={this.props.icon} style={styles.CategoryIcon} />
          </View>

          <View style={styles.Main}>
            <Text style={styles.Title}>
              {this.state.data.title}
            </Text>
            <Text style={styles.Time}>
              {this.state.data.time}
            </Text>
          </View>

          <View style={styles.Collaborators}>
            <Text>One</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
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
    height: 48,
  },
  Main: {
    flexBasis: '60%',
    marginHorizontal: 10
  },
  Collaborators: {
    borderColor: 'blue',
    borderWidth: 1,
    flex: 1
  },
  Title: {
    fontSize: 18
  },
  Time: {
    fontSize: 13,
    marginTop: 4
  }
})

export default ElementItem
