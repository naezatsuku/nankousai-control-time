'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabaseClient'
import ExplanationProfile from '@/components/auth/ExplanationProfile'
import UserProfileCard from '@/components/UserProfileCard'

type UserProfile = {
  name: string
  class_id: string
  role: string
  email: string
}

export default function CompleteProfile() {
  const router = useRouter()
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [name, setName] = useState<string>('')
  const [schoolType, setSchoolType] = useState<string>('')
  const [grade, setGrade] = useState<string>('')
  const [classGroup, setClassGroup] = useState<string>('')
  const [seatNumber, setSeatNumber] = useState<string>('')
  const [class_id, setClass_id] = useState<string>('')
  const [data, setData] = useState<UserProfile | null>(null)

  // schoolType～seatNumber が揃ったら class_id をリアルタイム生成
  useEffect(() => {
    if (schoolType && grade && classGroup && seatNumber) {
      setClass_id(
        `${schoolType}${grade}年${classGroup}組${seatNumber}番`
      )
    } else {
      setClass_id('')
    }
  }, [schoolType, grade, classGroup, seatNumber])
  const fetchProfile = async (user_id: string) => {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user_id)
      .single()
    return profile
  }

  // フォーム送信ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: sessionRes } = await supabase.auth.getSession()
    const user = sessionRes.session?.user

    if (!user) {
      alert('ログインが消えました')
      return router.push('/login')
    }
    const targetData = { name, class_id }

    const { error } = await supabase
      .from('user_profiles')
      .update(targetData)
      .eq('user_id', user.id)

    if (error) {
      console.error(error)
      alert('更新に失敗しました')
    } else {
      alert('プロフィール登録が完了しました')
      router.push('/')
    }
  }

  // 初期読み込み：セッション確認 & プロファイル取得 or INSERT
  useEffect(() => {
    const init = async () => {
      const { data: sessionRes } = await supabase.auth.getSession()
      const user = sessionRes.session?.user

      if (!user) {
        alert('セッションが切れました')
        return router.push('/login')
      }

      const profile = await fetchProfile(user.id)
      console.log('取得したプロファイル:', profile)

      if (profile) {
        setData(profile as UserProfile)
        setName(profile.name)

        //class_idをパース
        const m = profile.class_id.match(
          /(高校|中学)(\d+)年(\d+)組(\d+)番/
        )
        if (m) {
          setSchoolType(m[1])
          setGrade(m[2])
          setClassGroup(m[3])
          setSeatNumber(m[4])
        }
      } else {
        //なければINSERT
        const { data: insRes, error: insErr } = await supabase
          .from('user_profiles')
          .insert({
            user_id: user.id,
            email: user.email,
            role: 'editor',
          })
          .select()

        if (insErr || !insRes?.length) {
          console.error(insErr)
          alert('プロフィール作成に失敗しました')
          return
        }

        const newProfile = insRes[0]
        setData({
          name: '',
          class_id: '',
          role: newProfile.role,
          email: newProfile.email,
        })
      }
    }

    init()
  }, [router])

  return (
    <div className="pt-[min(15vw,80px)] h-screen bg-white md:pt-[13vw] lg:pt-[min(15vw,80px)]">
      <ExplanationProfile />

      <main className="p-6 max-w-md mx-auto">
        <div className="bg-white shadow-xl rounded-xl border border-slate-300 overflow-hidden">
          <div className="bg-gradient-to-br from-[#05a8bd] via-[#05bd92] to-[#f3e50a] p-4">
            <h1 className="text-2xl font-bold text-white">
              プロフィール登録
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-4">
            {/* 名前入力 */}
            <div>
              <label
                htmlFor="name"
                className="block font-medium text-gray-800 mb-1"
              >
                名前
              </label>
              <input
                id="name"
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* クラス／席番号入力 */}
            <div>
              <span className="block font-medium text-gray-800 mb-1">
                所属クラス・出席番号
              </span>

              <div className="flex space-x-2">
                <select
                  id="schoolType"
                  className="border px-3 py-2 rounded bg-white flex-shrink-0"
                  value={schoolType}
                  onChange={(e) => setSchoolType(e.target.value)}
                  required
                >
                  <option value=""  disabled>学校</option>
                  <option value="高校">高校</option>
                  <option value="中学">中学</option>
                </select>

                <input
                  id="grade"
                  type="number"
                  min={1}
                  max={3}
                  placeholder="学年"
                  className="w-20 border px-3 py-2 rounded"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                />

                <input
                  id="classGroup"
                  type="number"
                  min={1}
                  placeholder="組"
                  className="w-20 border px-3 py-2 rounded"
                  value={classGroup}
                  onChange={(e) => setClassGroup(e.target.value)}
                  required
                />

                <input
                  id="seatNumber"
                  type="number"
                  min={1}
                  placeholder="番"
                  className="w-20 border px-3 py-2 rounded"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  required
                />
              </div>

              <p className="mt-2 text-sm italic text-gray-500">
                {class_id || '例：高校1年1組1番'}
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mb-4 py-2 px-8 bg-green-500 text-white font-semibold rounded-md hover:bg-green-300 transition duration-300 hover:scale-105"
              >
                送信
              </button>
            </div>
          </form>
          <div className=" flex justify-center mb-4">
            <button
                onClick={() => setShowPasswordModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition hover:scale-105"
              >
              パスワードを設定する
            </button>
          </div>
        </div>

        <UserProfileCard
          name={data?.name ?? name}
          classId={data?.class_id ?? class_id}
          email={data?.email ?? ''}
          role={data?.role ?? ''}
        />
      </main>
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">パスワード設定</h2>
      
            <input
              type="password"
              placeholder="新しいパスワード（6文字以上）"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                キャンセル
              </button>
              <button
                onClick={async () => {
                  if (!newPassword || newPassword.length < 6) {
                    setPasswordMessage('6文字以上のパスワードを入力してください')
                    return
                  }
                
                  const { error } = await supabase.auth.updateUser({ password: newPassword })
                  if (error) {
                    setPasswordMessage('パスワードの設定に失敗しました')
                  } else {
                    setPasswordMessage('パスワードを設定しました！次回からログインできます')
                    setNewPassword('')
                    setTimeout(() => {
                      setShowPasswordModal(false)
                      setPasswordMessage('')
                    }, 1500)
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                設定する
              </button>
            </div>
              
            {passwordMessage && (
              <p className="mt-4 text-sm text-gray-700 text-center">{passwordMessage}</p>
            )}
          </div>
        </div>
      )}  
    </div>
  )
}