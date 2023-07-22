import React from 'react'

export default function SentMsg({msg,key}) {
  return (
    <div style={{width:'80%',padding:'10px 18px 14px 11px',backgroundColor:'#F2F2F2'}} className='float-right bg-slate-200' key={key}>{msg}</div>
  )
}
