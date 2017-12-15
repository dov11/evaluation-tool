import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import ClassLobby from './ClassLobby'
import { connect } from 'react-redux'
import fetchBatches from '../actions/batches/fetch'
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import BatchEditor from '../components/batches/BatchEditor'
import destroyBatch from '../actions/batches/destroyBatch'
import DeleteIcon from 'material-ui/svg-icons/action/highlight-off'
import { push } from 'react-router-redux'



chai.use(chaiEnzyme())

describe('<ClassLobby />', () => {
  const classLobby = shallow(<ClassLobby />)

  it('contains a subheader', () => {
    expect(claasLobby).to.have.descendants(Subheader)
  })
})
