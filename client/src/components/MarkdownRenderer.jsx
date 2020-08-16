// ReactJS
import React, { Component } from 'react'
import ReactMarkdown from "react-markdown";

// Components
import api from '../services/Api'

// UI Elements
import { Layout, Affix, Button } from 'antd'


const { Header, Footer, Sider, Content } = Layout

// Main Class
export default class MarkdownRenderer extends Component {
	constructor(props) {
    super(props)
    this.state = {
      markdown: '# NULL',
      prevProps: null
    }
	}

  componentWillMount() {
    // console.log(this.props.match.params.id, this.props.page)
    this.updateInfo()
  }
  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      prevProps = this.props
      this.updateInfo();
    }
  }

  updateInfo () {
    api.getPageContent(this.props.page, 'index.md').then((res) => {
      console.log('Got Markdown Data: ', res)
      if (res.status === 200) {
        console.log(res)
        // this.$store.commit('stopLoading')
        this.setState({ markdown: res.data })
      }
    })
  }

  

	render() {
		return (
      <div>
        <ReactMarkdown source={this.state.markdown} />
      </div>
		)
	}
}
