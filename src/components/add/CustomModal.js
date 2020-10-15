import React from 'react'
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import colors from 'Collaap/src/data/colors.js'

const CustomModal = (props) => {
  return(
    <Modal
      visible={props.is_open}
      transparent={true}
      onRequestClose={() => props.toggle_modal()}
      animationType="slide">
      <View style={styles.Modal}>
        <View style={styles.Content}>
          <TouchableOpacity style={styles.CloseBar} onPress={props.toggle_modal}>
            <Text style={styles.CloseText}>Keep these changes</Text>
          </TouchableOpacity>
          {props.children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  Modal: {
    flex: 1,
    backgroundColor: "#000000aa",
    alignItems: "center"
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
  CloseBar: {
    borderWidth: 1,
    borderColor: colors.greenaccept,
    borderRadius: 5,
    marginBottom: 20,
  },
  CloseText: {
    fontSize: 16,
    padding: 5,
    textAlign: "center",
    color: colors.greenaccept
  }
})

export default CustomModal
