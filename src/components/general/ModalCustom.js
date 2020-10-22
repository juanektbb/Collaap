import React from 'react'
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'

const ModalCustom = (props) => {
  return(
    <Modal
      visible={props.is_open}
      transparent={true}
      onRequestClose={() => props.toggle_modal()}
      animationType="slide">
      <View style={styles.Modal}>
        <View style={styles.Content}>
          <Text style={styles.Title}>{props.title}</Text>
          {props.children}
          <TouchableOpacity style={styles.CloseBar} onPress={props.toggle_modal}>
            <Text style={styles.CloseText}>Keep changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  Modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000aa"
  },
  Content: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 50,
    width: 320,
    padding: 23,
    flex: 1
  },
  Title: {
    fontSize: 16,
    color: "#999",
    marginBottom: 25,
    textAlign: "center"
  },
  CloseBar: {
    marginTop: 20,
    borderRadius: 5,
    paddingVertical: 2,
    backgroundColor: colors.calltoaction
  },
  CloseText: {
    fontSize: 16,
    padding: 5,
    textAlign: "center",
    color: "#fff"
  }
})

export default ModalCustom
