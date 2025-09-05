"use client"
import { supabase } from '@/lib/supabaseClient'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import PageInner from './PageInner'

type classMap ={
  id:number,
  className:string,
  waitTime:number,
  prevTime:number,
  renewTime:string;
  TimeVisible:boolean;
}
const Page = () => {
  const [classMap,setClassMap] = useState<classMap[]>();
  const channelRef = useRef<string>("realtime");
  useEffect(()=>{
    channelRef.current = crypto.randomUUID();
    const channel = supabase
      .channel(channelRef.current)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'contents',
      }, (payload) => {
        console.log('変更検知');
        const tmp = payload.new;
        const updated:classMap = {
          id:tmp.id as number,
          className:tmp.className as string,
          waitTime:tmp.waitTime as number ,
          prevTime:tmp.prevTime as number,
          renewTime:tmp.renewTime as string,
          TimeVisible:tmp.TimeVisible as boolean
        }
        setClassMap((prev)=>{
          if(!prev) return prev
          return prev.map((item)=>item.id == updated.id ? updated : item)
        })
      })
      .subscribe()
    
    const fetch = async ()=>{
      const {data,error} = await supabase.from("contents").select("id,className,waitTime,prevTime,renewTime,TimeVisible");
      if(!data?.[0] || error){
        return alert("error");
      }
      const tmp = data as classMap[];
      setClassMap(tmp);
    }
    fetch();
    return () => {
      supabase.removeChannel(channel)
    }
    
  },[])
  return (
    <Suspense>
      {classMap && 
        <PageInner classMap={classMap}/>
      }
      
    </Suspense>
  )
}

export default Page