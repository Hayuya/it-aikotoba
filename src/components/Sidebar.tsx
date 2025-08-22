'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Category } from '../lib/microcms'

interface SidebarProps {
  categories?: Category[]
}

export default function Sidebar({ categories = [] }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // 検索機能の実装（実際の検索ページにリダイレクト）
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="space-y-6">
      {/* サイト内検索 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">サイト内検索</h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="用語を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      {/* カリキュラムもくじ */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">カリキュラムもくじ</h3>
        <nav className="space-y-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id}>
                {/* カテゴリヘッダー */}
                <div className="flex items-center">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-50 transition-colors flex-1"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium text-gray-700">{category.name}</span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedCategories.includes(category.id) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* 展開されたメニュー */}
                {expandedCategories.includes(category.id) && (
                  <div className="ml-6 mt-2 space-y-1">
                    <Link
                      href={`/category/${category.slug}`}
                      className="block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      📋 {category.name}の用語一覧
                    </Link>
                    {category.description && (
                      <div className="py-2 px-3 text-xs text-gray-500">
                        {category.description}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm text-center py-4">
              カテゴリーが見つかりません
            </div>
          )}
        </nav>

        {/* 全カテゴリー表示ボタン */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link
            href="/categories"
            className="block w-full text-center py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            すべてのカテゴリーを見る
          </Link>
        </div>
      </div>

      {/* 解説者プロフィール */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">解説者プロフィール</h3>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            IT
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">セキュリティ専門家</h4>
            <p className="text-sm text-gray-600 mb-3">
              情報処理安全確保支援士（登録セキスペ）として10年以上の実務経験。
              企業のセキュリティ対策や人材育成に従事。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                情報処理安全確保支援士
              </span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                CISSP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 学習のヒント */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200">
        <h3 className="text-lg font-semibold mb-3 text-orange-800">📝 学習のヒント</h3>
        <ul className="text-sm text-orange-700 space-y-2">
          <li>• まずは基本用語から学習しましょう</li>
          <li>• 関連用語を合わせて覚えると効果的</li>
          <li>• 実際の事例と結び付けて理解しましょう</li>
          <li>• 定期的な復習で記憶を定着させましょう</li>
        </ul>
      </div>
    </div>
  )
}