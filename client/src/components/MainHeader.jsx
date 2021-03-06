import React, { Component } from 'react'
import { Layout, Affix, Button, Menu, Input } from 'antd'
import { BrowserRouter as Router, Route, Link, Switch, useHistory, Redirect, withRouter } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined, PictureOutlined, SearchOutlined } from '@ant-design/icons'

import api from '../services/Api'

const { SubMenu } = Menu
const { Header, Content, Footer } = Layout
const { Search } = Input;

class MainHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      menuItems: null,
      photopages: [],
      projectpages: [],
      redirect: null,
    }
  }

  getTestData = () => {
    api.getTestData().then((res) => {
      console.log('aye!', res.data)
      if (res.status === 200) {
        console.log(res)
        // this.$store.commit('stopLoading')
      }
    })
  }

  populateMenuItems = () => {
    // api.getPhotoPages().then((res) => {
    //   console.log('aye!', res.data)
    //   if (res.status === 200) {
    //     console.log(res)
    //     this.setState({ photopages: res.data })
    //     // this.$store.commit('stopLoading')
    //   }
    // })
    // api.getProjectPages().then((res) => {
    //   console.log('aye!', res.data)
    //   if (res.status === 200) {
    //     console.log(res)
    //     this.setState({ projectpages: res.data })
    //     // this.$store.commit('stopLoading')
    //   }
    // })
    api.getPageListOfCategory('Photos').then((res) => {
      // console.log('aye!', res.data)
      if (res.status === 200) {
        console.log('Fetched PhotoPages:', res)
        this.setState({ photopages: res.data })
        // this.$store.commit('stopLoading')
      }
    })
    api.getPageListOfCategory('Projects').then((res) => {
      // console.log('aye!', res.data)
      if (res.status === 200) {
        console.log('Fetched Project Pages:', res)
        this.setState({ projectpages: res.data })
        // this.$store.commit('stopLoading')
      }
    })
  }

  goTo = ({ key }) => {
    console.log('Clicked:', key)
    const dest = key.replace(/ /g, '%20')
    // history.push(props.id)
    // this.props.history.push(dest)
    setTimeout(() => {  //  to prevent menubar animation from freezing
      this.props.history.push(dest)
    }, 300)
    // this.setState({ redirect: dest });  // Use with redirect router method && remove withRouter from export
    // let history = useHistory();
    // history.push(dest)
  }

  render() {
    // if (this.state.redirect) {  // Use with redirect router method && remove withRouter from export
    //   var dest = this.state.redirect
    //   this.setState({ redirect: null });
    //   return <Redirect to={dest} />
    // }
    return (
      <div className='Header-Container'>
        <Header className='Site-Header' style={{ position: 'fixed', width: '100%' }}>
          {/* <div className="logo" /> */}
          <Menu
            theme='dark'
            mode='horizontal'
            className='Site-Header-Menu'
            defaultSelectedKeys={['/']}
            getPopupContainer={(node) => node.parentNode}
          >
            {/*getPopupContainer submenu scroll bug https://github.com/ant-design/ant-design/issues/10145*/}
            <Menu.Item key='/' className='Header-Menu-Item' onClick={(...props) => this.goTo(...props)}>
              Home
            </Menu.Item>
            <SubMenu icon={<SettingOutlined />} title='Projects' className='Header-Menu-Item'>
              {this.state.projectpages.map((value, index) => {
                return (
                  <Menu.Item key={'/Projects/' + value} onClick={(...props) => this.goTo(...props)}>
                    {value}
                  </Menu.Item>
                )
              })}
            </SubMenu>
            <SubMenu icon={<PictureOutlined />} title='Photos' className='Header-Menu-Item'>
              {this.state.photopages.map((value, index) => {
                return (
                  <Menu.Item key={'/Photos/' + value} onClick={(...props) => this.goTo(...props)}>
                    {value}
                  </Menu.Item>
                )
              })}
            </SubMenu>
            <Menu.Item key='/search' className='Header-Menu-Item' onClick={(...props) => this.goTo(...props)}>
            <SearchOutlined className='Header-SearchIcon' />
            </Menu.Item>
            
            
          </Menu>
        </Header>
      </div>
    )
  }

  async componentDidMount() {
    // this.getTestData()
    this.populateMenuItems()
  }
}

export default withRouter(MainHeader)
