import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import { connect } from 'react-redux'

import colors from 'Collaap/src/data/colors.js'
import helpers from 'Collaap/src/shared/helpers.js'

function mapStateToProps(state){
  return {
    user_id: state.user_id,
    collaaps: state.collaaps,
    icon_image: state.icon_image
  }
}

class HomeElement extends Component{

  state = {
    on_delete: false,
    on_delete_text: "",
    def_to_delete: null,
    loading: false
  }

  //What to show about the time
  buildTime = (time, use_secondary, is_everyday) => {
    if(is_everyday === true || use_secondary !== 'time'){
      return "All day"

    }else{
      return "Time: " + helpers.convertToReadableTime(new Date(time))
    }
  }

  triggerDelete = async (item) => {
    this.setState({ loading: true })
    await this.state.def_to_delete(item)
    this.setState({ loading: false })
  }

  componentDidMount(){

    //This is the owner of the note
    if(this.props.item.user === this.props.user_id){  
      this.setState({ 
        on_delete_text: "Delete this element", 
        def_to_delete: this.props.deleteThisItem, 
      })
      
    //This is not the owner
    }else{
      this.setState({ 
        on_delete_text: "Take me out from this element", 
        def_to_delete: this.props.deleteMyCollaap 
      })
    }

  }

  render(){
    const thisOwner = this.props.collaaps.find(c => c._id === this.props.item.user)

    return(<>
      {this.state.loading &&
      <View style={styles.IndicatorShape}>
        <ActivityIndicator size="large" color={colors.maintone}/>
        <Text style={styles.IndicatorText}>Loading</Text>
      </View>}

      {this.state.on_delete && !this.state.loading &&
      <View style={styles.OnDelete}>
        <TouchableOpacity
          style={styles.OnDeleteButton}
          onPress={() => this.triggerDelete(this.props.item)}>
            <Text style={styles.OnDeleteButtonText}>
              {this.state.on_delete_text}
            </Text>
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
                style={[styles.SmallCollaap, (Platform.OS === 'android' && styles.SmallCollaapAndroid)]}
                source={helpers.getIconByName(thisOwner.icon)}
              />}

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
                  {this.props.collaaps.find(c => c._id === item) !== undefined && item !== this.props.user_id ?
                  <Image
                    style={styles.LittleCollaap}
                    source={helpers.getIconByName(this.props.collaaps.find(c => c._id === item).icon)}
                  /> :
                  <Image
                    style={styles.LittleCollaap}
                    source={this.props.icon_image}
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
    flexDirection: "row"
  },
  Time: {
    fontSize: 13
  },
  SmallCollaap: {
    width: 15,
    height: 15,
    marginRight: 5,
    borderRadius: 5,
    justifyContent: "center"
  },
  SmallCollaapAndroid: {
    marginTop: 2
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
    alignItems: "center",
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
    color: colors.softgrey,
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
    color: colors.white,
    lineHeight: 76,
    textAlign: "center"
  },
  OnDeleteCancel: {
    width: 78,
  },
  OnDeleteCancelText: {
    fontSize: 50,
    color: colors.softgrey,
    lineHeight: 76,
    textAlign: "center",
  },
})

export default connect(mapStateToProps)(HomeElement)
