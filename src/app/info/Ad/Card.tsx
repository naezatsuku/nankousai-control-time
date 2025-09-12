"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IoTimeOutline } from 'react-icons/io5'
import { MdOutlinePlace } from 'react-icons/md'
import ClockArc from '../Circle/ClockArc'
import Image from 'next/image';
import { KaiseiDecol } from '@/fonts'
import { ZenKakuGothic } from '@/fonts'
import MiniClockArc from '../Circle/MiniClockArc'
import styles from "./Ad.module.css"
import QRGenerator from '../components/QRgenerateer'
type Event ={
    className:string,
    title:string,
    place:string,
    time:string[],
    comment:string,
    backImg:string,
    frontImg:string,
    types:string[],
    waitTime:number,
    renewTime:string,
    TimeVisible:boolean
    tagline:string,//キャッチコピー
    content:string,
    
}
type Props ={
    data:Event,
    life:number
}
const Card = ({data,life}:Props) => {
        const Tags = [
        {id:"tenji", name:"展示", color:"from-blue-500 via-indigo-500 to-purple-500"},
        {id:"food", name:"フード", color:"from-orange-400 via-orange-400 to-yellow-400"},
        {id:"class", name:"クラス展示", color:"from-blue-500 via-indigo-500 to-purple-500"},
        {id:"club", name:"部活動展示", color:"from-blue-500 via-indigo-500 to-purple-500"},
        {id:"junior", name:"中学", color:"from-pink-300 via-rose-400 to-red-400"},
        {id:"high", name:"高校", color:"from-sky-400 via-blue-400 to-indigo-400"},
        {id:"act", name:"体験", color:"from-green-300 via-teal-400 to-cyan-500"},
        {id:"live", name:"ライブ", color:"from-purple-300 via-fuchsia-400 to-pink-400"},
        {id:"perform", name:"パフォーマンス", color:"from-blue-400 via-sky-300 to-sky-200"},
        {id:"attraction", name:"アトラクション", color:"from-red-200 via-purple-400 to-blue-500"},
        {id:"shopping", name:"ショッピング", color:"from-red-200 to-purple-400"},
        {id:"horror", name:"ホラー", color:"from-red-500 to-rose-300"},
        {id:"cafe", name:"食堂", color:"from-orange-400 via-orange-400 to-yellow-400"},
        {id:"pta", name:"PTA", color:"from-yellow-300 via-lime-400 to-green-400"},
        {id:"rest", name:"休憩", color:"from-cyan-500 to-yellow-300"},
        {id:"j-1", name:"中学1年", color:" from-yellow-300  to-amber-400"},
        {id:"j-2", name:"中学2年", color:"from-pink-300 via-rose-400 to-red-400"},
        {id:"j-3", name:"中学3年", color:"from-sky-400 via-blue-400 to-indigo-400"},
        {id:"h-1", name:"高校1年", color:"from-yellow-300 to-amber-400"},
        {id:"h-2", name:"高校2年", color:"from-pink-300 via-rose-400 to-red-400"},
        {id:"h-3", name:"高校3年", color:"from-sky-400 via-blue-400 to-indigo-400" },
        {id:"other", name:"その他", color:"from-sky-600 to-sky-200"},
    ]
    const rectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const rect = rectRef.current
      // if (rect) {
      //   rect.style.transition = 'none'
      //   rect.style.strokeDashoffset = '496' 
    
      //   requestAnimationFrame(() => {
      //     rect.style.transition = `stroke-dashoffset ${life}s ease-out`
      //     rect.style.strokeDashoffset = '0'
      //   })
      // }
      if (rect) {
        rect.style.animation = 'none'
        rect.style.scale = '1' // 初期化
    
        requestAnimationFrame(() => {
          rect.style.animation = `transition_bar ${life}s `
        })
      }
    }, [data])
    const setTextColor = (e:string[],type:string) => {
        let result = ""

      if(e.includes("クラス展示") || e.includes("部活動展示")){
            result = " from-cyan-400 to-indigo-500 "
        }

        if(e.includes("フード")) {
            result = " from-orange-400 via-orange-400 to-yellow-400"
        }
        
        if(e.includes("ライブ")) {
            result = " from-purple-300 via-fuchsia-400 to-pink-400"
        }

        if(e.includes("パフォーマンス")) {
            result = " from-blue-500 via-sky-300 to-sky-200"
        }

        if(e.includes("アトラクション")) {
            result = " from-red-300 via-purple-400 to-blue-500"
        }

        if(e.includes("体験")) {
            result = "  from-green-500 via-teal-400 to-cyan-500"
        }

        if(e.includes("休憩")) {
            result = " from-cyan-500 to-yellow-300"
        }

        if(e.includes("PTA")) {
            result = "  from-sky-600 to-cyan-400"
        }

        

        if(result == "") {
            result = " from-sky-600 to-sky-100 "
        } 

        if(type == "text" ) {
            result =result + " bg-clip-text text-transparent  bg-gradient-to-br "
        }   
        if(type == "bg") {
          result = result + " bg-gradient-to-br "
        }

        return result
    }

    let adjust_between = 0;
    if(data.types.length % 3 != 0) {
      adjust_between = 3 - data.types.length % 3
    } 
    const contentLength = data.content.length;

  const slideSpeedClass =
    contentLength > 90
      ? styles.text_slide_slow_ad
      : contentLength > 60
      ? styles.text_slide_slow
      : contentLength > 12
      ? styles.text_slide
      : ""
  const baseClass = 'whitespace-nowrap text-nowrap';
  function formatSlot(startDate: Date, endDate: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const month = pad(startDate.getMonth() + 1); // 月は0始まり
  const day = pad(startDate.getDate());
  const startHour = pad(startDate.getHours());
  const startMinute = pad(startDate.getMinutes());
  const endHour = pad(endDate.getHours());
  const endMinute = pad(endDate.getMinutes());

  return `${month}/${day} ${startHour}:${startMinute}~${endHour}:${endMinute}`;
}
  function getNearestUpcomingSlot(slots: string[]): string | null {
    
  const now = new Date();
  try{
    for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const [datePart, timePart] = slot.split(" ");
    const [startTimeStr, endTimeStr] = timePart.split("~");

    const [month, day] = datePart.split("/").map(Number);
    const [startHour, startMinute] = startTimeStr.split(":").map(Number);
    const [endHour, endMinute] = endTimeStr.split(":").map(Number);

    const startDate = new Date(now.getFullYear(), month - 1, day, startHour, startMinute);
    const endDate = new Date(now.getFullYear(), month - 1, day, endHour, endMinute);


    if (now < endDate) {
      console.log(slot)
      return slot;
    }
  }
  }catch(e){
    console.log(e)
    return null
  }
  
  console.log("hello")
  // すべて終了していた場合は null
  return null;
}
  return (
    <>
      <div className="relative hidden w-full max-w-[95vw] sm:max-w-[90vw] 2xl:max-w-[75vw] lg:max-w-[75vw] aspect-[4/5] sm:aspect-[5/4] lg:aspect-[16/10] 2xl:aspect-[16/9] bg-white/30 backdrop-blur-md border-white/40 shadow-xl rounded-[50px] z-20 ">
        <svg viewBox="0 0 160 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-50">
            <defs>
              <linearGradient id="rectStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(61, 200, 194, 1)" />
                <stop offset="30%" stopColor='rgba(206, 216, 0, 1)'/>
                <stop offset="74%" stopColor="rgba(255, 174, 68, 1)" />
                <stop offset="100%" stopColor="rgba(234, 114, 0, 1)" />
              </linearGradient>
            </defs>

            <rect
              x="0.5"
              y="0.5"
              width="159"
              height="99"
              rx="5"
              ry="5"
              stroke="url(#rectStrokeGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="516"
              strokeDashoffset="516"
            />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center z-10">
            {data &&
            
            
            
            <div className="flex w-full h-full 2xl:p-10 xl:p-8 p-6  ">
              <div className="basis-[60%] bg-slate-100 2xl:p-10 xl:p-8 p-6 rounded-l-xl  space-y-4">
                  <div className={`text-3xl xl:text-4xl  2xl:text-5xl text-gray-500 tracking-wide pb-2 ${setTextColor(data.types,"text")} ${KaiseiDecol.className}` } >{data.className}</div>
                  <div className={`flex max-w-3xs lg:max-w-[450px] xl:max-w-[500px] 2xl:max-w-[650px] overflow-hidden xl:text-7xl text-5xl mt-2  font-bold text-gray-800  ${KaiseiDecol.className}`}>
                    <style> 
                      {`@keyframes text-slide {
                          from {
                              transform: translateX(0%);
                          }

                          to {
                              transform: translateX(-100%);
                          }
                      }`}
                    </style>
                    {data.title.length >= 10 ? 
                      <>
                        <p  style={{animation: `text-slide ${6 / 12 * data.title.length}s infinite linear 0.2s both`}} className={`whitespace-nowrap text-nowrap relative lg:bottom-1  ml-8 inline-block                                `}>{data.title}</p>
                        <p  style={{animation: `text-slide ${6 / 12 * data.title.length}s infinite linear 0.2s both`}} className={`whitespace-nowrap text-nowrap  relative lg:bottom-1 inline-block ml-8  
                        `}>{data.title}</p>
                      </>
                      :<p className={`whitespace-nowrap relative lg:bottom-1 text-nowrap inline-block `}>{data.title}</p>
                    }
                  </div>

                  <div className='flex w-full 2xl:mt-16 xl:mt-12 mt-10'>
                    {data.TimeVisible ? 
                      <div className="flex justify-center w-[40%]">
                        <div className='w-full aspect-square hidden md:block'>
                          <ClockArc minutes={data.waitTime} />
                          <div className='flex justify-center text-2xl mt-2'>{data.renewTime || ""}</div>
                        </div>
                        <div className='w-full aspect-square block md:hidden'>
                          <MiniClockArc minutes={data.waitTime} />
                          <div className='flex justify-center text-2xl mt-2'>{data.renewTime || ""}</div>
                        </div>
                    </div>:
                    <div className="flex justify-center w-[40%] aspect-square ">
                      <div className="flex justify-center flex-col w-auto h-auto p-6 bg-slate-50  border-slate-100 shadow-xl rounded-xl">
                          <div className="text-center mt-2 text-black text-lg ">この団体は待ち時間表示をしません</div>
                      </div>
                    </div> 
                    }
                    <div className="flex flex-col gap-[15%] 2xl:gap-[18%] text-gray-700 2xl:ml-10 xl:ml-8 ml-6 justify-center">
                      <div className="flex items-center gap-1">
                        <MdOutlinePlace className="text-blue-500 text-3xl xl:text-4xl 2xl:text-5xl relative top-1" />
                        <span className="text-3xl xl:text-4xl 2xl:text-5xl">{data.place}</span>
                      </div>
                      <div className="flex items-center gap-1">
                          <IoTimeOutline className="text-blue-500 text-3xl xl:text-4xl 2xl:text-5xl relative top-1" />
                          
                              {data.time.length >=3 ? 
                              (<div className=" flex flex-nowrap text-3xl xl:text-2xl 2xl:text-3xl overflow-hidden max-w-xl lg:max-w-[400px] xl:max-w-[500px]">
                                {getNearestUpcomingSlot(data.time)}
                              </div>)
                              :data.time.length ==2 ? 
                              (<div>
                                <div>
                                  {data.time[0].length >=7 ? 
                                  <div className="text-xl xl:text-2xl 2xl:text-3xl">{data.time[0]}</div>
                                  :
                                  <div className="text-3xl xl:text-4xl 2xl:text-5xl">{data.time[0]}</div>  
                                  }
                                  {data.time[0].length >=7 ? 
                                  <div className="text-xl xl:text-2xl 2xl:text-3xl">{data.time[1]}</div>
                                  :
                                  <div className="text-3xl xl:text-4xl 2xl:text-5xl">{data.time[1]}</div>  
                                  }
                                </div>

                              </div>
                              
                              )
                              :(<div>
                                <div>
                                {data.time[0].length >=7 ? 
                                <div className="text-xl xl:text-2xl 2xl:text-3xl">{data.time[0]}</div>
                                :
                                <div className="text-3xl xl:text-4xl 2xl:text-5xl">{data.time[0]}</div>  
                                }
                                </div>
                              
                              </div>)
                              
                              
                              
                              }
                      </div>
                    </div>
                  </div>
                  {/* <div className='flex gap-4'>
                      {data.types.map((value,i)=>(
                          <div key={i}className={`py-3 px-2 min-w-40 bg-gradient-to-br ${
                                            Tags.find((item) => item.name === value)?.color ??
                                            "bg-gradient-to-r from-pink-500 to-pink-300"
                                          }  text-white  rounded-md flex items-center justify-center opacity-90 `}>
                              <p className="m-auto text-base  text-gray-50 font-medium">{value}</p>
                          </div>
                      ))}
                  </div> */}
                  <div className="space-y-1 flex items-center flex-col 2xl:mt-12 xl:mt-8 "> 
                      <div className={`2xl:text-xl xl:text-lg opacity-60 text-gray-700 ` }>{data.tagline}</div>
                      <div className="flex max-w-xl lg:max-w-[400px] xl:max-w-[500px] 2xl:max-w-[600px] overflow-hidden  2xl:mt-1 2xl:text-4xl xl:text-4xl lg:text-3xl text-gray-900  font-light tracking-[-0.01rem]   leading-[160%] text-justify ">
                            <style> 
                              {`@keyframes text-slide {
                                  from {
                                      transform: translateX(0%);
                                  }

                                  to {
                                      transform: translateX(-100%);
                                  }
                              }`}
                            </style>
                            {data.content.length > 12 ? 
                              <>
                                <p  style={{animation: `txt-slide ${4 / 12 * data.content.length}s infinite linear 0.1s both`}} className={`whitespace-nowrap text-nowrap inline-block                                `}>{data.content}</p>
                                <p  style={{animation: `teext-slide ${4 / 12 * data.content.length}s infinite linear 0.1s both`}} className={`whitespace-nowrap text-nowrap  inline-block 
                                `}>{data.content}</p>
                              </>
                              :<p className={`whitespace-nowrap text-nowrap inline-block `}>{data.content}</p>
                            }
                            
                      </div>
                  </div>
              </div>
              <div className="basis-[40%] bg-slate-100 2xl:p-10 xl:p-8 p-6 xl:pl-0 2xl:pl-0 rounded-r-xl 2xl:space-y-6 xl:space-y-4 space-y-4">
                <div className="w-full aspect-square overflow-hidden rounded-xl ">
                  <Image
                    src={`${data.frontImg}`}
                    alt="紹介画像"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className=' flex gap-2 2xl:gap-3 flex-wrap justify-between'>
                      {data.types.map((value,i)=>(
                          <div key={i}className={` 2xl:py-3 xl:py-3 py-2 xl:px-2 px-1 2xl:min-w-40 xl:min-w-32 xl:w-[28%] w-[48%]  bg-gradient-to-br ${
                                            Tags.find((item) => item.name === value)?.color ??
                                            "bg-gradient-to-r from-pink-500 to-pink-300"
                                          }  text-white  rounded-md flex items-center justify-center opacity-90 `}>
                              <p className="m-auto 2xl:text-base text-sm  text-gray-50 font-medium">{value}</p>
                          </div>
                      ))}
                      {adjust_between != 0 && 
                        <div className='2xl:py-3 xl:py-3 py-2 xl:px-2 px-1 2xl:min-w-40 xl:min-w-30 xl:w-[30%] w-[48%]'></div>
                      }
                  </div>  
              </div>
            </div>
            }
        </div>
      {/* QRコード */}
      {/* <div className='fixed -bottom-0 -right-20 z-50 opacity-80'>
            <QRGenerator qr={`https://nankousai.vercel.app/event/introduction?name=${data.className}`}/>
      </div> */}
    </div>
    <div className={`w-full h-full p-10  ${setTextColor(data.types, "bg")}  text-white relative ${ZenKakuGothic.className}`}>
        <div className='absolute h-full right-10 top-0 py-10'>
            <div className='bg-white h-full w-8 rounded-full overflow-hidden text-end'>
              <style> 
                {`@keyframes transition_bar {
                    from {
                        height:0%
                    }

                    to {
                        height: 100%;
                    }
                }`}
              </style>
              <div  ref={rectRef} className='h-auto w-full rounded-full from-fuchsia-300 to-cyan-300 bg-gradient-to-b '></div>
            </div>
        </div>
        <div  className='w-full h-full flex justify-center m-auto'>
            <div className='w-[38%] mr-16'>
              {data.backImg == "" ?
              <Image src={"/homeBackGround.jpg"} width={800} height={800} alt='背景写真' className='w-full h-[50vh] object-cover rounded-xl'></Image>
            : <Image src={data.backImg} width={800} height={800} alt='背景写真' className='w-full h-[50vh] object-cover rounded-xl'></Image>
              }
              
              <div className='flex w-full justify-between text-lg'>
                <div className='w-[16vw] flex flex-col items-center'>
                  <p className='py-3 text-2xl'>rondo</p>
                  {data.frontImg == "" ?
                  <Image src={"/1725741490270.jpg"} width={800} height={800} alt='rondoの写真' className='w-full aspect-square object-cover rounded-xl'></Image>
                :  <Image src={data.frontImg} width={800} height={800} alt='rondoの写真' className='w-full aspect-square object-cover rounded-xl'></Image>}
                </div>
                <div className='w-[16vw] flex flex-col items-center'>
                  <p className='py-3 text-2xl'>クラスページ</p>
                  <div className='w-full hidden xl:block'>
                      <QRGenerator size={180} qr={`https://nankousai.vercel.app/event/introduction?name=${data.className}`}/>
                  </div>
                  <div className='w-full xl:hidden'>
                      <QRGenerator size={160} qr={`https://nankousai.vercel.app/event/introduction?name=${data.className}`}/>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-[45%] '>
              <div className='w-full  h-[50vh] overflow-hidden pb-7'>
                <div className='w-full h-full overflow-hidden'>
                    <style>
                  {`@keyframes text-slide {
                          from {
                              transform: translateX(0%);
                          }

                          to {
                              transform: translateX(-100%);
                          }
                  }`}
                </style> 
                <p className={`text-3xl  font-bold`}>{data.className}</p>
                <div className={`flex text-6xl pt-5 pb-6 font-bold overflow-hidden`}>
                  {data.title.length > 9 ? 
                    <>
                      <p  style={{animation: `text-slide ${4 / 12 * data.title.length}s infinite linear 0.1s both`}} className={`ml-4 whitespace-nowrap text-nowrap inline-block `}>{data.title}</p>
                      <p  style={{animation: `text-slide ${4 / 12 * data.title.length}s infinite linear 0.1s both`}} className={`ml-4 whitespace-nowrap text-nowrap  inline-block 
                      `}>{data.title}</p>
                    </>
                    :<p className=' text-nowrap whitespace-nowrap'>{data.title}</p>
                    }
                </div>
                <div className='bg-white rounded-full inline-block mt-3'>
                    <p className={`text-2xl   ${setTextColor(data.types, "text")} font-bold py-4 px-8`}>{data.tagline}</p>
                </div>    
                <p className={`text-2xl pt-6  `}>{data.content}</p>
                </div>
                
              </div>  
              <div className='flex justify-between w-full'>
                <div className='flex flex-col items-center  w-[16vw]'>
                  <p className='py-3 text-2xl'>待ち時間</p>
                    {data.TimeVisible ? 
                      <div className="flex justify-center w-full items-center">
                        <div className='w-[90%] aspect-square hidden md:flex flex-col justify-center'>
                          <ClockArc minutes={data.waitTime} />
                          <div className='flex justify-center text-2xl mt-2'>{data.renewTime || ""}</div>
                        </div>
                        <div className=' aspect-square block md:hidden'>
                          <MiniClockArc minutes={data.waitTime} />
                          <div className='flex justify-center text-2xl mt-2'>{data.renewTime || ""}</div>
                        </div>
                    </div>:
                    <div className="flex justify-center w-full aspect-square ">
                      <div className="flex justify-center flex-col w-auto h-auto p-6 bg-slate-50  border-slate-100 shadow-xl rounded-xl">
                          <div className="text-center mt-2 text-black text-lg ">この団体は待ち時間表示をしません</div>
                      </div>
                    </div> 
                  }
                </div>
                <div className='w-[22vw] space-y-8 text-3xl h-full my-auto overflow-hidden '>
                  <div className="flex items-center gap-1">
                      <MdOutlinePlace className="text-white text-4xl 2xl:text-5xl relative top-1  mr-1 shrink-0" />
                      <div className='overflow-hidden'>
                        <style>
                          {`@keyframes text-slide {
                                  from {
                                      transform: translateX(0%);
                                  }

                                  to {
                                      transform: translateX(-100%);
                                  }
                          }`}
                        </style> 
                        {data.place != null && 
                        <span className='flex  text-4xl 2xl:text-5xl '>
                          {data.place.length > 7 ? 
                          <>
                            <p  style={{animation: `text-slide ${4 / 12 * data.place.length}s infinite linear 0.1s both`}} className={`ml-4 whitespace-nowrap text-nowrap inline-block `}>{data.place}</p>
                            <p  style={{animation: `text-slide ${4 / 12 * data.place.length}s infinite linear 0.1s both`}} className={`ml-4 whitespace-nowrap text-nowrap  inline-block 
                            `}>{data.place}</p>
                          </>
                          :<p className=' text-nowrap whitespace-nowrap'>{data.place}</p>
                          }
                        </span>
                        }
                        
                      </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <IoTimeOutline className="text-white text-4xl 2xl:text-5xl relative top-1 mr-1" />
                    
                        {data.time.length >=3 ? 
                        (<div className=" flex flex-nowrap text-4xl 2xl:text-5xl overflow-hidden max-w-xl lg:max-w-[400px] xl:max-w-[500px]">
                          {getNearestUpcomingSlot(data.time)}
                        </div>)
                        :data.time.length ==2 ? 
                        (<div>
                          <div>
                            {data.time[0].length >=7 ? 
                            <div className="text-xl xl:text-2xl 2xl:text-3xl">{data.time[0]}</div>
                            :   
                            <div className="text-3xl xl:text-4xl 2xl:text-5xl">{data.time[0]}</div>  
                            }
                            {data.time[0].length >=7 ? 
                            <div className="text-xl xl:text-2xl 2xl:text-3xl">{data.time[1]}</div>
                            :
                            <div className="text-3xl xl:text-4xl 2xl:text-5xl">{data.time[1]}</div>  
                            }
                          </div>

                        </div>
                        
                        )
                        :(<div>
                          <div>
                          {data.time[0].length >=7 ? 
                          <div className="text-xl xl:text-2xl 2xl:text-3xl">{data.time[0]}</div>
                          :
                          <div className="text-3xl xl:text-4xl 2xl:text-5xl">{data.time[0]}</div>  
                          }
                          </div>
                        
                        </div>)
                        
                        
                        
                        }
                      </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    </>


  )
}

export default Card