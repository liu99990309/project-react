import React, { useRef, useState } from 'react'
import './index.less'

export default function () {
    const inputEl = useRef(null)
    const [img, setImg] = useState([])
    function handleChange(e) {
        window.URL = window.URL || window.webkitURL;
        handleImage(e.target.files)
    }
    function prevent(e) {
        e.stopPropagation()
        e.preventDefault()
    }
    function handleDrop(e) {
        e.stopPropagation()
        e.preventDefault()
        const dt = e.dataTransfer
        const files = dt.files
        handleImage(files)
    }
    function handleImage(files) {
        const URL = window.URL || window.webkitURL
        const list = [...files].filter(item => /^image\//.test(item.type)).map(item => URL.createObjectURL(item))
        setImg([...img, ...list])
        // for (let image of files) {
        //     const type = image.type
        //     if (!/^image\//.test(type)) {
        //         continue
        //     }
        // const reader = new FileReader()
        // reader.onload = function (e) {
        //     setImg([...img, e.target.result])
        // }
        // reader.readAsDataURL(image)
        // }
    }
    function clear(e) {
        const URL = window.URL || window.webkitURL
        URL.revokeObjectURL(e.target.src)
    }
    return (
        <div>
            <h1>请选择图片</h1>
            <input type="file" ref={inputEl} className="file" multiple accept="image/*" onChange={handleChange} />
            <div className="file-btn" onClick={() => { inputEl.current.click() }}>请选择文件</div>
            <h1>拖拽选择图片</h1>
            <div className="img-upload-btn" onDragEnter={prevent} onDragOver={prevent} onDrop={handleDrop}>+</div>
            {
                img.map(item => (<img src={item} key={item} onLoad={clear} className="img" />))
            }
        </div>
    )
}