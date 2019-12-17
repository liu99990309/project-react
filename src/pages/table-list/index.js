import React from 'react'
import { connect } from 'react-redux'
import { Table, Tag } from 'antd'
import { del } from '@src/store'

function DataTable({ list, del }) {
    const columns = [
        {
            title: '品牌',
            dataIndex: 'brand'
        },
        {
            title: '车型',
            dataIndex: 'type'
        },
        {
            title: '名称',
            dataIndex: 'name'
        },
        {
            title: '系列',
            dataIndex: 'model'
        },
        {
            title: 'Trans',
            dataIndex: 'trans'
        },
        {
            title: '颜色',
            dataIndex: 'color'
        },
        {
            title: '日期',
            render: (text, item) => (
                `${item.year}年${item.month}月`
            )
        },
        {
            title: '数量',
            dataIndex: 'count'
        },
        {
            title: '价格',
            dataIndex: 'price'
        },
        {
            title: '总额',
            dataIndex: 'total'
        },
        {
            title: '操作',
            dataIndex: 'id',
            render: id => (
                <Tag onClick={() => { del(id) }}>
                    删除
                </Tag>
            )
        },
    ]
    return (
        <div>
            <Table columns={columns} dataSource={list.map(item => ({ ...item, key: item.id }))} />
        </div>
    )
}
const mapStateToProps = state => ({ list: state })
const mapDispatchToProps = {
    del
}
export default connect(mapStateToProps, mapDispatchToProps)(DataTable)
