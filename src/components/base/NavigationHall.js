import React from 'react'
import { connect } from 'react-redux'

import AuthStack from 'Collaap/src/components/Stacks/AuthStack'
import Navigation from 'Collaap/src/components/Base/Navigation'

function mapStateToProps(state){
  return {
    session_token: state.session_token
  }
}

const NavigationHall = props => {
    return props.session_token === null ? <AuthStack /> : <Navigation />
}

export default connect(mapStateToProps)(NavigationHall)
