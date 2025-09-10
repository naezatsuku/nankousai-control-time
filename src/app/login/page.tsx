'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import LoginMethodNotice from './LoginMethodNotice';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [mode, setMode] = useState<'login' | 'signup' | 'magic'>('login')

  const handleAuth = async () => {
    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setMessage('登録に失敗しました。すでに登録済みか、形式が正しくありません。')
      } else {
        setMessage('登録成功！ログインしてください。')
        setMode('login')
      }
    } else if (mode === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setMessage('ログインに失敗しました。パスワード未設定の可能性があります。')
      } else {
        setMessage('ログイン成功！')
        router.push("/auth/callback")
      }
    } else if (mode === 'magic') {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) {
        setMessage('メール送信に失敗しました。')
      } else {
        setMessage('メールを送信しました。受信箱をご確認ください。')
      }
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl mb-6">
        {mode === 'signup' ? '新規登録' : mode === 'login' ? 'ログイン' : 'メールで届くログインリンク'}
      </h1>

      <input
        type="email"
        placeholder="your@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border px-3 py-2 mb-4 w-72"
      />

      {mode !== 'magic' && (
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border px-3 py-2 mb-4 w-72"
        />
      )}

      <button
        onClick={handleAuth}
        className="bg-blue-600 text-white px-4 py-2 rounded w-72"
      >
        {mode === 'signup' ? '登録する' : mode === 'login' ? 'ログイン' : 'リンクを送信'}
      </button>

      <div className="mt-6 text-sm text-blue-500 flex flex-col items-center gap-2">
        {mode !== 'signup' && (
          <button onClick={() => setMode('signup')} className="underline">
            新規登録はこちら
          </button>
        )}
        {mode !== 'login' && (
          <button onClick={() => setMode('login')} className="underline">
            パスワードでログイン
          </button>
        )}
        {mode !== 'magic' && (
          <button onClick={() => setMode('magic')} className="underline">
            メールで届くログインリンク
          </button>
        )}
      </div>

      {message && <p className="mt-4 text-gray-700 text-center">{message}</p>}
      <LoginMethodNotice/>
    </main>
  )
}