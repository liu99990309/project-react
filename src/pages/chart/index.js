import React, { useRef, useEffect, useState } from 'react'
import * as echarts from 'echarts'
import { connect } from 'react-redux'
import './index.less'
import { Select } from 'antd'

const { Option } = Select;
const xKeyOptions = [
    {
        label: 'Month',
        value: 'monthString'
    },
    {
        label: 'Color',
        value: 'color'
    },
    {
        label: 'Trans',
        value: 'trans'
    },
    {
        label: 'Brand',
        value: 'brand'
    }
]
const yKeyOptions = [
    {
        label: 'Count',
        value: 'count'
    },
    {
        label: 'TotalPrice',
        value: 'total'
    }
]
function getInitData(list) {
    const years = getKey(list, 'year')
    const yearList = years.reduce((arr, year) => {
        Array.from({ length: 12 }, (item, index) => {
            arr.push(`${year}_` + `0${index + 1}`.slice(-2))
        })
        return arr
    }, [])
    return {
        monthString: yearList,
        color: getKey(list, 'color'),
        trans: getKey(list, 'trans'),
        brand: getKey(list, 'brand')
    }
}

function getKey(data, key) {
    return [...new Set(data.map(item => item[key]))]
}

function ChartPage({ list }) {
    const chartEl = useRef(null)
    const [xKey, setXKey] = useState('monthString')
    const [yKey, setYKey] = useState('total')
    const [monthIndex, setMonthIndex] = useState(0)

    const initData = getInitData(list)
    const monthList = Array.from({ length: Math.ceil(initData.monthString.length / 4) }, (item, index) => {
        return {
            label: `${initData.monthString[index * 4]}-${initData.monthString[index * 4 + 3]}`,
            value: index
        }
    })
    const getChartData = (data) => {
        const initObj =
            initData[xKey] &&
            initData[xKey].reduce((obj, key) => {
                obj[key] = []
                return obj
            }, {})
        data.map(item => {
            const key = item[xKey]
            initObj[key].push(item)
        })
        const types = getKey(data, 'type')
        const initTypeData = types.reduce((obj, type) => {
            obj[type] = 0
            return obj
        }, {})
        const source = Object.keys(initObj).map(key => {
            return initObj[key].reduce(
                (obj, item) => {
                    const v = item.type
                    obj[v] += item[yKey]
                    return obj
                },
                { ...initTypeData, [xKey]: key }
            )
        })
        const dimensions = [xKey, ...types]
        const series = types.map(() => ({ type: 'bar' }))
        return {
            dimensions,
            source: xKey === 'monthString' ? source.slice(monthIndex * 4, (monthIndex + 1) * 4) : source,
            series
        }
    }
    const chartData = getChartData(list)

    useEffect(() => {
        const saleChart = echarts.init(chartEl.current)
        const { dimensions, source, series } = chartData
        const option = {
            legend: {},
            tooltip: {},
            dataset: {
                dimensions,
                source
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series
        }
        saleChart.setOption(option)
        return () => {
            saleChart.dispose()
        }
    })
    return (
        <>
            <div>
                <Select value={xKey} onChange={setXKey} style={{ width: 180 }}>
                    {
                        xKeyOptions.map(item =>
                            (<Option key={item.value} value={item.value}>{item.label}</Option>)
                        )
                    }
                </Select>
                {xKey === 'monthString' && <Select value={monthIndex} onChange={setMonthIndex} style={{ width: 180 }}>
                    {
                        monthList.map(item => (
                            <Option key={item.value} value={item.value}>{item.label}</Option>
                        ))
                    }
                </Select>}
                <Select value={yKey} onChange={setYKey} style={{ width: 180 }}>
                    {
                        yKeyOptions.map(item => (
                            <Option key={item.value} value={item.value}>{item.label}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="chart" ref={chartEl}></div>
        </>
    )
}
const mapStateToProps = state => ({ list: state })
export default connect(mapStateToProps)(ChartPage)
