import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom'
import routes from '@src/router'

const { Header, Sider, Content } = Layout

export default function () {
    return (
        <Router>
            <Layout>
                <Header className='header'>销售数据统计</Header>
                <Layout>
                    <Sider className='side'>
                        {routes.map(item => (
                            <CustomLink key={item.path} to={item.path}>{item.title}</CustomLink>
                        ))}
                    </Sider>
                    <Content className="main">
                        <Switch>
                            {routes.map(item => (
                                <Route exact={item.path === '/' ? true : false} path={item.path} key={item.path} component={item.component}></Route>
                            ))}
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    )
}

function CustomLink(props) {
    const { pathname } = useLocation()
    const { to } = props
    return <Link {...props} className={pathname === to ? 'active navlink' : 'navlink'}>{props.children}</Link>
}