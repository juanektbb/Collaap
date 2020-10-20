import React, { Component } from 'react'
import {
  View,
  Text,
  Switch,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'
import DateTimePicker from '@react-native-community/datetimepicker'

class DateOption extends Component{

  state = {
    is_open: false
  }

  toggle_date_option = () => {
    if(this.props.switcher_value){
      this.setState({
        is_open: !this.state.is_open
      })
    }
  }

  double_functionality = (event) => {
    if(event.type == "dismissed"){
      this.toggle_date_option()

    }else{
      this.toggle_date_option()
      this.props.apply_change(event.nativeEvent.timestamp)
    }
  }

  render(){
    return(<>
      <View style={styles.DatesElement}>
        <TouchableOpacity onPress={this.toggle_date_option}>
          <Image style={[styles.DatesImage, !this.props.switcher_value ? styles.OpacityOn: null]} source={this.props.icon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.InsideContent} onPress={this.toggle_date_option}>
          <View style={!this.props.switcher_value ? styles.OpacityOn: null}>
            <Text style={styles.DatesTitle}>
              {this.props.title}
            </Text>
            <Text style={styles.DatesValue}>
              {this.props.switcher_value ? this.props.readable_function(this.props.display_date) : "N/A"}
            </Text>
          </View>
        </TouchableOpacity>

        {this.props.switcher &&
          <Switch
            value={this.props.switcher_value}
            onValueChange={() => this.props.on_switcher_change(this.props.switcher_value ? null : this.props.mode)}
            style={styles.Switcher}
          />}
      </View>

      {this.state.is_open &&
        <DateTimePicker
          value={this.props.display_date}
          testID="dateTimePicker"
          mode={this.props.mode}
          is24Hour={true}
          display={this.props.mode === "date" ? "default" : "spinner"}
          onChange={this.double_functionality}
        />}
    </>)
  }

}

const styles = StyleSheet.create({
  OpacityOn: {
    opacity: 0.2
  },
  DatesElement: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  InsideContent: {
    flex: 1
  },
  DatesImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  DatesTitle: {
    fontSize: 18
  },
  DatesValue: {
    fontSize: 12,
    lineHeight: 14,
    color: colors.calltoaction
  }
})

export default DateOption
