"use client";
import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const icons = {
    bold:`<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M6 4.75c0-.69.56-1.25 1.25-1.25h5a4.752 4.752 0 0 1 3.888 7.479A5 5 0 0 1 14 20.5H7.25c-.69 0-1.25-.56-1.25-1.25ZM8.5 13v5H14a2.5 2.5 0 1 0 0-5Zm0-2.5h3.751A2.25 2.25 0 0 0 12.25 6H8.5Z"></path></svg>`,
    italics : `<svg stroke="currentColor" style='transform:scale(0.80);' fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M320 48v32a16 16 0 0 1-16 16h-62.76l-80 320H208a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h62.76l80-320H112a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16z"></path></svg>`,
    underline: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"></path></svg>`,
    strikethrough : `<svg stroke="currentColor" style='transform:scale(1.2);' fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.85 7.08C6.85 4.37 9.45 3 12.24 3c1.64 0 3 .49 3.9 1.28.77.65 1.46 1.73 1.46 3.24h-3.01c0-.31-.05-.59-.15-.85-.29-.86-1.2-1.28-2.25-1.28-1.86 0-2.34 1.02-2.34 1.7 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.21-.34-.54-.89-.54-1.92zM21 12v-2H3v2h9.62c1.15.45 1.96.75 1.96 1.97 0 1-.81 1.67-2.28 1.67-1.54 0-2.93-.54-2.93-2.51H6.4c0 .55.08 1.13.24 1.58.81 2.29 3.29 3.3 5.67 3.3 2.27 0 5.3-.89 5.3-4.05 0-.3-.01-1.16-.48-1.94H21V12z"></path></svg>`,
    ol : `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M61.77 401l17.5-20.15a19.92 19.92 0 0 0 5.07-14.19v-3.31C84.34 356 80.5 352 73 352H16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h22.83a157.41 157.41 0 0 0-11 12.31l-5.61 7c-4 5.07-5.25 10.13-2.8 14.88l1.05 1.93c3 5.76 6.29 7.88 12.25 7.88h4.73c10.33 0 15.94 2.44 15.94 9.09 0 4.72-4.2 8.22-14.36 8.22a41.54 41.54 0 0 1-15.47-3.12c-6.49-3.88-11.74-3.5-15.6 3.12l-5.59 9.31c-3.72 6.13-3.19 11.72 2.63 15.94 7.71 4.69 20.38 9.44 37 9.44 34.16 0 48.5-22.75 48.5-44.12-.03-14.38-9.12-29.76-28.73-34.88zM496 224H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM16 160h64a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H64V40a8 8 0 0 0-8-8H32a8 8 0 0 0-7.14 4.42l-8 16A8 8 0 0 0 24 64h8v64H16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8zm-3.91 160H80a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H41.32c3.29-10.29 48.34-18.68 48.34-56.44 0-29.06-25-39.56-44.47-39.56-21.36 0-33.8 10-40.46 18.75-4.37 5.59-3 10.84 2.8 15.37l8.58 6.88c5.61 4.56 11 2.47 16.12-2.44a13.44 13.44 0 0 1 9.46-3.84c3.33 0 9.28 1.56 9.28 8.75C51 248.19 0 257.31 0 304.59v4C0 316 5.08 320 12.09 320z"></path></svg>`,
    ul : `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>`,
    indentOut : `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11 17h10v-2H11v2zm-8-5 4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"></path></svg>`,
    indentIn: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"></path></svg>`,
    sub: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"  height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M22 18h-2v1h3v1h-4v-2c0-.55.45-1 1-1h2v-1h-3v-1h3c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1zM5.88 18h2.66l3.4-5.42h.12l3.4 5.42h2.66l-4.65-7.27L17.81 4h-2.68l-3.07 4.99h-.12L8.85 4H6.19l4.32 6.73L5.88 18z"></path></svg>`,
    sup: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M22 7h-2v1h3v1h-4V7c0-.55.45-1 1-1h2V5h-3V4h3c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1zM5.88 20h2.66l3.4-5.42h.12l3.4 5.42h2.66l-4.65-7.27L17.81 6h-2.68l-3.07 4.99h-.12L8.85 6H6.19l4.32 6.73L5.88 20z"></path></svg>`,
}

export default function WYSIWYG({value,setValue}:{value:string,setValue:(v:string)=>void}) {
    const toolbar = React.useRef<HTMLDivElement>(null);
    const quill = React.useRef<ReactQuill>(null);
    useEffect(() => {
        if (!toolbar.current) return;
        if(document){
            // document.querySelectorAll('.ql-bold').forEach((bold)=>bold.innerHTML = icons.bold)
            // document.querySelectorAll('.ql-italic').forEach((italic)=>italic.innerHTML = icons.italics)
            // document.querySelectorAll('.ql-underline').forEach((underline)=>underline.innerHTML = icons.underline)
            // document.querySelectorAll('.ql-strike').forEach((strike)=>strike.innerHTML = icons.strikethrough)
            // document.querySelectorAll('.ql-list[value="ordered"]').forEach((ol)=>ol.innerHTML = icons.ol)
            // document.querySelectorAll('.ql-list[value="bullet"]').forEach((ul)=>ul.innerHTML = icons.ul)
            // document.querySelectorAll('.ql-indent[value="-1"]').forEach((indentOut)=>indentOut.innerHTML = icons.indentOut)
            // document.querySelectorAll('.ql-indent[value="+1"]').forEach((indentIn)=>indentIn.innerHTML = icons.indentIn)
            // document.querySelectorAll('.ql-script[value="sub"]').forEach((sub)=>sub.innerHTML = icons.sub)
            // document.querySelectorAll('.ql-script[value="super"]').forEach((sup)=>sup.innerHTML = icons.sup)

        }
    }, []);

    return (
        <div className='w-full h-full border border-border rounded-md overflow-hidden'>
            <div id="toolbar" className='flex justify-between items-center'>
                <select className="ql-size outline-none" defaultValue={'small'}>
                    <option value="small">small</option>
                    <option value="large">large</option>
                    <option value="huge">huge</option>
                </select>
                <button className="ql-bold"><div dangerouslySetInnerHTML={{__html:icons.bold}}></div></button>
                <button className="ql-italic"><div dangerouslySetInnerHTML={{__html:icons.italics}}></div></button>
                <button className="ql-underline"><div dangerouslySetInnerHTML={{__html:icons.underline}}></div></button>
                <button className="ql-strike"><div dangerouslySetInnerHTML={{__html:icons.strikethrough}}></div></button>
                <button className="ql-list" value={'ordered'}><div dangerouslySetInnerHTML={{__html:icons.ol}}></div></button>
                <button className="ql-list" value={'bullet'}><div dangerouslySetInnerHTML={{__html:icons.ul}}></div></button>
                <button className="ql-indent" value={'-1'}><div dangerouslySetInnerHTML={{__html:icons.indentOut}}></div></button>
                <button className="ql-indent" value={'+1'}><div dangerouslySetInnerHTML={{__html:icons.indentIn}}></div></button>
                <button className="ql-script" value="sub"><div dangerouslySetInnerHTML={{__html:icons.sub}}></div></button>
                <button className="ql-script" value="super"><div dangerouslySetInnerHTML={{__html:icons.sup}}></div></button>
            </div>
            <div className='w-[90%] h-auto border-t border-border mx-auto'></div>
            {<ReactQuill
                ref={quill}
                style={{ borderColor: 'transparent' }}
                className='w-full h-80 border-none'
                value={value}
                onChange={setValue}
                modules={{
                    toolbar: '#toolbar',
                }}
            />}
        </div>
    );
}

