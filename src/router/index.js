import Index from '@src/pages/index'
import TableList from '@src/pages/table-list'
import Chart from '@src/pages/chart'

export default [
    {
        path: '/',
        title: '上传数据',
        component: Index
    },
    {
        path: '/table',
        title: '查看列表',
        component: TableList
    },
    {
        path: '/chart',
        title: '查看图表',
        component: Chart
    }
]
