import React, { useState } from 'react'
import './index.less'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { int } from '@src/store'

function transDate(dateNum) {
    const date = new Date(1900, 0, dateNum - 1)
    return {
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }
}

function Index({ int }) {
    const [uploaded, setUploaded] = useState(false)
    const history = useHistory()

    function csvToObject(csvString) {
        const [header, body] = csvString.split(';;;;;;;;;;')
        const headers = header.replace(/[\n]/g, '').split(';')
        headers.pop()
        const bodys = body.split('####').map(item => {
            const list = item.replace(/[\n]/g, '').split(';')
            list.pop()
            return list
        })
        const list = bodys.map(item => {
            return item.reduce((obj, v, index) => {
                const key = headers[index].toLowerCase()
                obj[key] = v
                return obj
            }, {})
        })
        return list
    }

    function readCSVFile(e) {
        setUploaded(true)
        const obj = e.target
        let reader = new FileReader()
        reader.readAsText(obj.files[0])
        reader.onload = function () {
            let data = csvToObject(this.result)
            // dispatch({
            //     type: 'INT',
            //     list: data.map((item, index) => {
            //         const { month, year } = transDate(~~item.date)
            //         return { ...item, id: index + 1, year, month, price: parseInt(item.price, 10), count: parseInt(item.count, 10), total: parseInt(item.total, 10), monthString: `${year}_${('0' + month).slice(-2)}` }

            //     })
            // })
            int(data.map((item, index) => {
                const { month, year } = transDate(~~item.date)
                return { ...item, id: index + 1, year, month, price: parseInt(item.price, 10), count: parseInt(item.count, 10), total: parseInt(item.total, 10), monthString: `${year}_${('0' + month).slice(-2)}` }

            }))
            history.push('/table')
        }
    }

    return (
        <div className="upload-btn">
            {uploaded ? '文件上传成功' : '请选择csv格式文件'}
            <input className="file" type="file" onChange={readCSVFile} />
        </div>
    )
}

const mapDispatchToProps = {
    int
}
export default connect(() => ({}), mapDispatchToProps)(Index)