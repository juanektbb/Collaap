import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

class CalendarSubItem extends Component{

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
      <View style={styles.SubItem}>
        <View style={styles.CategoryBox}></View>

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
    backgroundColor: 'orange',
    borderWidth: 1,
    width: 48,
    height: 48
  },
  Main: {
    backgroundColor: 'lightblue',
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
  }
})

export default CalendarSubItem
