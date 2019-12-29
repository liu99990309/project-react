import Index from '@src/pages/index'
import TableList from '@src/pages/table-list'
import Chart from '@src/pages/chart'
import FileUpload from '@src/pages/file-upload'

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
    },
    {
        path: '/file-upload',
        title: '图片上传',
        component: FileUpload
    }
]
