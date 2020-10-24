import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import { connect } from 'react-redux'

import helpers from 'Collaap/src/helpers.js'
import colors from 'Collaap/src/data/colors.js'
import { color } from 'react-native-reanimated'

function mapStateToProps(state){
  return {
    user_id: state.user_id,
    collaaps: state.collaaps
  }
}

class Element extends Component{

  state = {
    on_delete: false,
    loading: false
  }

  //What to show about the time
  buildTime = (time, use_secondary, is_everyday) => {
    if(is_everyday === true || use_secondary !== 'time'){
      return "All day"

    }else{
      const to_time = new Date(time)
      return to_time.getUTCHours() + ":" + to_time.getUTCMinutes()
    }
  }

  triggerDelete = (item_id) => {
    this.setState({ loading: true })
    this.props.deleteThisItem(item_id)
  }

  render(){
    const thisOwner = this.props.collaaps.find(c => c._id === this.props.item.user)

    return(<>
      {this.state.loading &&
      <View style={styles.IndicatorShape}>
        <ActivityIndicator size="large" color={colors.maintone}/>
        <Text style={styles.IndicatorText}>Deleting</Text>
      </View>}

      {this.state.on_delete && !this.state.loading &&
      <View style={styles.OnDelete}>
        <TouchableOpacity
          style={styles.OnDeleteButton}
          onPress={() => this.triggerDelete(this.props.item._id)}>
            <Text style={styles.OnDeleteButtonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.OnDeleteCancel} onPress={() => this.setState({ on_delete: false })}>
          <Text style={styles.OnDeleteCancelText}>&#10005;</Text>
        </TouchableOpacity>
      </View>}

      {!this.state.on_delete && !this.state.loading &&
      <TouchableOpacity
        onPress={() => this.props.loadNewItemScreen(this.props.item)}
        onLongPress={() => this.setState({ on_delete: true })}>
        <View style={styles.SubItem}>
          <View style={styles.CategoryBox}>
            <Image source={this.props.icon} style={styles.CategoryIcon} />
          </View>

          <View style={styles.Main}>
            <Text style={styles.Title}>
              {this.props.item.title}
            </Text>

            <View style={styles.LineTime}>
              {thisOwner !== undefined && this.props.item.user !== this.props.user_id && 
              <Image
                style={styles.SmallCollaap}
                source={helpers.getIconByName(thisOwner.icon)}/>}

              <Text style={styles.Time}>
                {this.buildTime(this.props.item.time, this.props.item.use_secondary, this.props.item.is_everyday)}
              </Text>
            </View>
          </View>

          <View style={styles.Collaborators}>
            {this.props.item.collaborators.includes(this.props.user_id) &&
              <Text style={styles.You}>You</Text>}
            
            <FlatList
              numColumns={2}
              keyExtractor={(item) => item}
              data={this.props.item.collaborators}
              style={styles.Collaaps}
              ListEmptyComponent={() =>
                <Text style={styles.NoCollaaps}>Empty</Text>}
              renderItem={({item}) =>
                <>
                  {this.props.collaaps.find(c => c._id === item) !== undefined && item !== this.props.user_id &&
                  <Image
                    style={styles.LittleCollaap}
                    source={helpers.getIconByName(this.props.collaaps.find(c => c._id === item).icon)}
                  />}
                </>}
            />
          </View>
        </View>
      </TouchableOpacity>}
    </>)
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
    marginRight: 5
  },
  CategoryIcon: {
    width: 48,
    height: 48
  },
  Main: {
    flex: 1,
    paddingHorizontal: 5
  },
  Title: {
    flex: 1,
    fontSize: 16
  },
  LineTime: {
    marginTop: 4,
    borderColor: "red",
    flexDirection: "row"
  },
  Time: {
    fontSize: 13
  },
  SmallCollaap: {
    width: 15,
    height: 15,
    marginTop: 2,
    marginRight: 5,
    borderRadius: 5,
    justifyContent: "center"
  },
  Collaborators: {
    width: 55,
    paddingLeft: 5,
    borderLeftWidth: 1,
    paddingVertical: 3,
    borderColor: '#e4e4e4',
    justifyContent: "center"
  },
  Collaaps: {
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  You: {
    borderWidth: 1,
    textAlign: "center",
    marginBottom: 3,
    color: colors.maintone,
    borderColor: colors.maintone
  },
  LittleCollaap: {
    width: 20,
    height: 20,
    opacity: 0.9,
    borderRadius: 11,
    marginVertical: 1,
    marginHorizontal: 1,
  },
  NoCollaaps: {
    fontSize: 8,
    color: "#ccc",
    textAlign: "center"
  },
  IndicatorShape: {
    flex: 1,
    height: 78,
    justifyContent: "center"
  },
  IndicatorText: {
    textAlign: "center",
    marginTop: 2,
    fontSize: 12,
    color: colors.secondtone
  },
  OnDelete: {
    height: 78,
    flexDirection: "row"
  },
  OnDeleteButton: {
    flex: 1,
    backgroundColor: colors.calltoaction,
  },
  OnDeleteButtonText: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 76,
    textAlign: "center"
  },
  OnDeleteCancel: {
    width: 78,
  },
  OnDeleteCancelText: {
    fontSize: 50,
    color: "#ccc",
    lineHeight: 76,
    textAlign: "center",
  },
})

export default connect(mapStateToProps)(Element)
