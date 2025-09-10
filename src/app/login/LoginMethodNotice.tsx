'use client'

import React from 'react'

export default function LoginMethodNotice() {
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-br from-[#05a8bd] via-[#05bd92] to-[#f3e50a] px-6 py-4">
        <h2 className="text-xl font-bold text-white">ログイン方法変更のお知らせ</h2>
      </div>

      <div className="px-6 py-6 text-gray-800 space-y-4 text-sm leading-relaxed">
        <p>
          これまでメールリンクによるログインをご利用いただいていた皆さまへ、
          より安定したログインのために、今後は
          <span className="font-semibold text-blue-600">「パスワードによるログイン」</span>
          へ移行をしています。
        </p>

        <p>
          現在のアカウントはそのままご利用いただけますが、
          次回以降のログインをスムーズに行うために、
          <span className="font-semibold text-blue-600">プロフィール画面から「パスワードの設定」</span>
          をお願いいたします。
        </p>

        <p>
          パスワードを設定することで、
          <span className="font-semibold text-green-600">メールを開く手間なく、すぐにログイン</span>
          できるようになります。
        </p>
        <p>
          また、セキュリティ強化のため、
          <span className="font-semibold text-red-600">初回ログイン時にはメール確認が必要</span>
          となっています。登録後に届く確認メールのリンクをクリックすることで、ログインが有効になります。
        </p>
        <p className="text-xs text-gray-500 mt-4 text-center">
          ※以前メールによるログインをされていた方は、パスワード未設定の可能性があります。この場合
          <span className="text-blue-600">
            一度メールからログインし、パスワードを設定する
          </span>
          必要があります
        </p>
        <p>
          ご不明点があれば、
          <span className="underline text-blue-500 cursor-pointer hover:text-blue-700"><a href="https://forms.gle/HqXiC2VWbdNwUpvA7">お気軽にお問い合わせください。</a></span>
        </p>
      </div>
    </div>
  )
}