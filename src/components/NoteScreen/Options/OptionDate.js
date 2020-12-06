import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Switch,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'
import helpers from 'Collaap/src/shared/helpers.js'
import DateTimePicker from '@react-native-community/datetimepicker'

class OptionDate extends Component{

  state = {
    is_open: false
  }

  //Close the picker
  toggle_date_option = () => {
    if(this.props.switcher_value)
      this.setState({is_open: !this.state.is_open})
  }

  //Picker on change
  double_functionality = (event) => {
    if(event.type == "dismissed"){
      this.toggle_date_option()

    }else{
      if(Platform.OS == 'android')
        this.toggle_date_option()

      this.props.apply_change(event.nativeEvent.timestamp)
    }
  }

  render(){
    return(<>
      <View style={styles.DatesElement}>
        <Pressable onPress={this.toggle_date_option}>
          <Image 
            style={[styles.DatesImage, !this.props.switcher_value || this.props.is_everyday ? styles.OpacityOn: null]} 
            source={require('Collaap/src/images/icon-date.png')}
          />
        </Pressable>

        <TouchableOpacity style={styles.InsideContent} onPress={this.toggle_date_option} activeOpacity={this.props.is_everyday ? 1 : 0.2}>
          <View style={!this.props.switcher_value || this.props.is_everyday ? styles.OpacityOn : null}>
            <Text style={styles.DatesTitle}>
              {this.props.title}
            </Text>
            <Text style={styles.DatesValue}>
              {this.props.switcher_value ? helpers.convertToReadableDate(this.props.display_date) : "N/A"}
            </Text>
          </View>
        </TouchableOpacity>

        {this.props.switcher &&
          <View style={styles.Switcher}>
            <Switch
              trackColor={{ false: colors.softgrey, true: colors.softcalltoaction }}
              thumbColor={this.props.switcher_value ? colors.calltoaction : "#fbfbfb"}
              disabled={this.props.is_everyday}
              value={this.props.switcher_value}
              onValueChange={(e) => {
                  this.props.on_switcher_change(this.props.switcher_value ? null : "date")
                  if(e === false) 
                    this.setState({is_open: false})
                }
              }
            />
          </View>}
      </View>

      {this.state.is_open && !this.props.is_everyday &&
        <View style={(Platform.OS === "ios" && styles.DateTimePicker)}>
          <DateTimePicker
            value={this.props.display_date}
            testID="dateTimePicker"
            mode="date"
            display="spinner"
            onChange={this.double_functionality}
            minimumDate={this.props.min_date}
          />
        </View>}
    </>)
  }

}

const styles = StyleSheet.create({
  OpacityOn: {
    opacity: 0.2
  },
  DatesElement: {
    flexDirection: "row",
    marginBottom: 20
  },
  InsideContent: {
    flex: 1,
    justifyContent: "center"
  },
  DatesImage: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  DatesTitle: {
    fontSize: 18
  },
  DatesValue: {
    fontSize: 12,
    lineHeight: 13,
    color: colors.calltoaction
  },
  Switcher: {
    justifyContent: "center"
  },
  DateTimePicker: {
    borderColor: "#f8f8f8", 
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 25
  }
})

export default OptionDate
