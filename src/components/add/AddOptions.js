import React, { Component } from 'react'

import {
  Text,
  View,
  TextInput,
  Image,
  Switch,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { connect } from 'react-redux'

import colors from 'Collaap/src/data/colors.js'

import helpers from 'Collaap/src/utils/helpers.js'

import CustomModal from './CustomModal'
import DateOption from './DateOption'


function mapStateToProps(state){
  return {
    collaaps: state.collaaps
  }
}

class AddOptions extends Component{

  constructor(props){
    super(props)
    this.state = {
      is_collaborators_open: false,
      is_reminder_open: false,
    }
  }

  toggle_collaborators = () => {
    this.setState({
      is_collaborators_open: !this.state.is_collaborators_open
    })
  }

  toggle_reminder = () => {
    this.setState({
      is_reminder_open: !this.state.is_reminder_open
    })
  }

  componentDidMount(){
  }

  render(){
    return(
      <View style={styles.AddOptions}>
        <TouchableOpacity onPress={this.toggle_collaborators} style={styles.OptionsBox}>
            <Image style={styles.OptionsImage} source={require('Collaap/src/images/collaborator.png')}/>
            <Text style={styles.CollaboratorsCounter}>({this.props.item.array_collaboratos.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.toggle_reminder} style={styles.OptionsBox}>
          <Image style={styles.OptionsImage} source={require('Collaap/src/images/reminder.png')}/>
        </TouchableOpacity>

        <CustomModal is_open={this.state.is_collaborators_open} toggle_modal={this.toggle_collaborators}>
          <FlatList
            keyExtractor={(item) => item.username}
            data={this.props.collaaps}
            renderItem={({item}) =>
              <View style={styles.SingleCollaborator}>
                <Switch
                  trackColor={{ false: "#ccc", true: colors.softcalltoaction }}
                  thumbColor={this.props.item.array_collaboratos.includes(item._id) ? colors.calltoaction : "#fbfbfb"}
                  value={this.props.item.array_collaboratos.includes(item._id)}
                  onValueChange={() => this.props.toggle_array_collaborators(item._id)}
                />
                <Image source={helpers.getIconByName(item.icon)} style={styles.CollaboratorImage}/>
                <Text>{item.first_name} {item.last_name}</Text>
              </View>}
          />
        </CustomModal>

        <CustomModal is_open={this.state.is_reminder_open} toggle_modal={this.toggle_reminder}>
          <View style={[styles.DatesContainer, this.props.item.is_everyday ? styles.OpacityActive : null]}>
            <DateOption
              display_date={this.props.item.start_date}
              apply_change={this.props.apply_start_date}
              mode="date"
              title="Date"
              icon={require('Collaap/src/images/icon-date.png')}
              readable_function={helpers.convertToReadableDate}
              switcher={false}
              switcher_value={true}
            />

            <DateOption
              display_date={this.props.item.end_date}
              apply_change={this.props.apply_end_date}
              mode="date"
              title="End date"
              icon={require('Collaap/src/images/icon-date.png')}
              readable_function={helpers.convertToReadableDate}
              switcher={true}
              switcher_value={this.props.item.use_secondary === 'date' ? true : false}
              on_switcher_change={this.props.change_use_secondary}
            />

            <DateOption
              display_date={this.props.item.time}
              apply_change={this.props.apply_time}
              mode="time"
              title="Time"
              icon={require('Collaap/src/images/icon-time.png')}
              readable_function={helpers.convertToReadableTime}
              switcher={true}
              switcher_value={this.props.item.use_secondary === 'time' ? true : false}
              on_switcher_change={this.props.change_use_secondary}
            />
          </View>

          <View style={styles.OrContainer}>
            <Text style={styles.OrText}>Or</Text>
          </View>

          <View style={styles.EverydayContainer}>
            <Switch
              value={this.props.item.is_everyday ? true : false}
              onValueChange={() => this.props.onChangeEveryday()}
            />
            <Text style={styles.EverydayText}>Everyday</Text>
          </View>
        </CustomModal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  AddOptions: {
    height: 61,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  OptionsBox: {
    flex: 1,
    flexDirection: "row",
    height: 35,
    marginHorizontal: 10,
    justifyContent: "center"
  },
  OptionsImage: {
    width: 35,
    height: 35
  },
  CollaboratorsCounter:{
    lineHeight: 37,
    color: "#aaa",
    marginLeft: 5
  },
  SingleCollaborator: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    height: 60
  },
  CollaboratorImage: {
    width: 42,
    height: 42,
    marginLeft: 12,
    marginRight: 8
  },
  OrContainer: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  OrText: {
    color: "#aaa",
    fontSize: 16
  },
  EverydayContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  EverydayText: {
    fontSize: 14
  },
  OpacityActive: {
    opacity: 0.1
  }
})

export default connect(mapStateToProps)(AddOptions)
