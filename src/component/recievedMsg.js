import React from 'react'

export default function RecievedMsg({msg,key}) {
  return (
    <div  style={{width:'80%',padding:'10px 18px 14px 11px',margin:'5px 0px',backgroundColor:'#F2F2F2'}} className=' bg-slate-200' key={key}>{msg}</div>
  )
}
