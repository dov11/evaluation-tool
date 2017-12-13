import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../../actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import AssesmentIcon from 'material-ui/svg-icons/action/assessment'
import FlatButton from 'material-ui/FlatButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'

const TITLE = 'Evaluation-tool'
const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
  }

  signOut = (event) => {
    event.preventDefault()
    this.props.signOut()
  }

  signIn = () => {
    this.props.push('/sign-in')
  }

  goHome = () => {
    this.props.push('/')
  }

  render() {
    const { signedIn } = this.props
    return (
      <div>
      <AppBar
        title={TITLE}
        iconElementLeft={
          <IconButton onClick={this.goHome}>
            <AssesmentIcon />
          </IconButton>
        }
        iconElementRight={signedIn ?
          <FlatButton label="Sign out" onClick={this.signOut.bind(this)} /> :
          <FlatButton label="Sign in" onClick={this.signIn} />
        }
      />
      {this.props.loading && <RefreshIndicator
      size={100}
      left={70}
      top={10}
      loadingColor="#FF9800"
      status="loading"
      style={style.refresh}
    />}
    </div>
    )
  }
}

const mapStateToProps = ({ currentUser, loading }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  loading,
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
