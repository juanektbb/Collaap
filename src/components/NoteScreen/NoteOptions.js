import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Switch,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { connect } from 'react-redux'

import colors from 'Collaap/src/data/colors.js'
import helpers from 'Collaap/src/shared/helpers.js'

import OptionDate from 'Collaap/src/components/NoteScreen/Options/OptionDate'
import OptionTime from 'Collaap/src/components/NoteScreen/Options/OptionTime'
import ModalCustom from 'Collaap/src/components/General/ModalCustom'

function mapStateToProps(state){
  return {
    collaaps: state.collaaps
  }
}

class NoteOptions extends Component{

  state = {
    is_collaborators_open: false,
    is_reminder_open: false
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

  render(){
    return(
      <View style={styles.NoteOptions}>
        <TouchableOpacity onPress={this.toggle_collaborators} style={styles.OptionsBox}>
          <Image style={styles.OptionsImage} source={require('Collaap/src/images/collaborator.png')}/>

          <Text style={styles.CollaboratorsCounter}>
            ({this.props.item.array_collaboratos.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.toggle_reminder} style={styles.OptionsBox}>
          <Image style={styles.OptionsImage} source={require('Collaap/src/images/reminder.png')}/>
        </TouchableOpacity>

        <ModalCustom 
          is_open={this.state.is_collaborators_open} 
          toggle_modal={this.toggle_collaborators} 
          title="Choose your collaaps?">
          <FlatList
            keyExtractor={(item) => item.username}
            data={this.props.collaaps}
            renderItem={({item}) =>
              <View style={styles.SingleCollaborator}>

                {this.props.item_user_id !== item._id ?
                  <Switch
                    trackColor={{ false: colors.softgrey, true: colors.softcalltoaction }}
                    thumbColor={this.props.item.array_collaboratos.includes(item._id) ? colors.calltoaction : "#fbfbfb"}
                    value={this.props.item.array_collaboratos.includes(item._id)}
                    onValueChange={() => this.props.toggle_array_collaborators(item._id)}
                  /> 
                  :
                  <View style={styles.OwnerBox}>
                    <Text style={styles.Owner}>Owner</Text>
                  </View>}

                <Image
                  source={helpers.getIconByName(item.icon)}
                  style={styles.CollaboratorImage}
                />

                <Text>{item.first_name} {item.last_name}</Text>
              </View>}
          />
        </ModalCustom>

        <ModalCustom 
          is_open={this.state.is_reminder_open} 
          toggle_modal={this.toggle_reminder} 
          title="Choose a date and/or time">
          <ScrollView 
            style={{flex: 1}} 
            showsVerticalScrollIndicator={false}>
            <View style={styles.DatesContainer}>
              <OptionDate
                title="Date"
                display_date={this.props.item.start_date}
                apply_change={this.props.apply_start_date}
                is_everyday={this.props.item.is_everyday}
                switcher={false}
                switcher_value={true}
                min_date={null}
              />

              <OptionDate
                title="End date"
                display_date={this.props.item.end_date}
                apply_change={this.props.apply_end_date}
                is_everyday={this.props.item.is_everyday}
                switcher={true}
                switcher_value={this.props.item.use_secondary === 'date' ? true : false}
                on_switcher_change={this.props.change_use_secondary}
                min_date={this.props.min_end_date}
              />

              <OptionTime
                display_date={this.props.item.time}
                apply_change={this.props.apply_time}
                is_everyday={this.props.item.is_everyday}
                switcher={true}
                switcher_value={this.props.item.use_secondary === 'time' ? true : false}
                on_switcher_change={this.props.change_use_secondary}
              />
            </View>

            <View style={styles.OrContainer}>
              <Text style={styles.OrText}>Or</Text>
            </View>

            <View style={styles.EverydayContainer}>
              <Text style={styles.EverydayText}>Everyday</Text>
              <Switch
                trackColor={{ false: colors.softgrey, true: colors.softcalltoaction }}
                thumbColor={this.props.item.is_everyday ? colors.calltoaction : "#fbfbfb"}
                value={this.props.item.is_everyday ? true : false}
                onValueChange={() => this.props.onChangeEveryday()}
              />
            </View>
          </ScrollView>
        </ModalCustom>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  NoteOptions: {
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
  OwnerBox: {
    width: 46
  },
  Owner: {
    color: "#bbb",
    textAlign: "center"
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
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  EverydayText: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 6
  },
  OpacityActive: {
    opacity: 0.1
  }
})

export default connect(mapStateToProps)(NoteOptions)
