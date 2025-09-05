// src/components/TermSearchClient.tsx
'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import TermsFilter from './TermsFilter'
import { Category, Term, getDifficultyColor, getDifficultyLabel } from '../lib/microcms'

type SearchableTerm = Pick<Term, 'id' | 'title' | 'slug' | 'category' | 'difficulty' | 'description' | 'publishedAt'> & { search_title?: string };

interface TermSearchClientProps {
  initialTerms: SearchableTerm[];
  categories: Category[];
}

export default function TermSearchClient({ initialTerms, categories }: TermSearchClientProps) {
  const searchParams = useSearchParams();

  const filteredTerms = useMemo(() => {
    const selectedCategory = searchParams.get('category');
    const selectedDifficulty = searchParams.get('difficulty');
    const searchQuery = searchParams.get('q');

    let terms = initialTerms;

    if (selectedCategory) {
      terms = terms.filter(term => term.category?.id === selectedCategory);
    }
    if (selectedDifficulty) {
      terms = terms.filter(term => term.difficulty.includes(selectedDifficulty));
    }
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      terms = terms.filter(term => 
        term.search_title?.toLowerCase().includes(lowerCaseQuery)
      );
    }

    return terms;
  }, [initialTerms, searchParams]);

  return (
    <>
      <header className="bg-white rounded-lg shadow-md p-8 mb-8">
        {/* ▼▼▼ ここから変更 ▼▼▼ */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">IT用語検索</h1>
          <Link href="/super-index" className="text-sm font-medium text-blue-600 hover:underline">
            スーパー索引へ →
          </Link>
        </div>
        {/* ▲▲▲ ここまで変更 ▲▲▲ */}
        <p className="text-gray-600 mb-6">
          情報処理技術者試験で問われるIT用語を網羅的に学習できます。
          キーワード検索や、難易度・カテゴリーでの絞り込みで効率的に学習しましょう。
        </p>
        <TermsFilter categories={categories} totalCount={filteredTerms.length} />
      </header>
      
      {filteredTerms.length > 0 ? (
        <div className="space-y-4 mb-8">
          {filteredTerms.map((term) => (
            <Link
              key={term.id}
              href={`/terms/${term.slug}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 group"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2 flex-wrap">
                    <span className={`text-xs px-2 py-1 rounded-full mr-3 flex-shrink-0 ${getDifficultyColor(term.difficulty)}`}>
                      {getDifficultyLabel(term.difficulty)}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {term.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {term.description}
                  </p>
                </div>
                <div className="flex items-center ml-4 flex-shrink-0">
                    <div className="flex items-center space-x-2 mr-4">
                      <span className="text-lg">{term.category.icon}</span>
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {term.category.name}
                      </span>
                    </div>
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800 hidden sm:inline">
                    詳細を見る →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">用語が見つかりません</h3>
          <p className="text-gray-600 mb-6">
            選択した条件に該当する用語がありません。<br />
            フィルター条件を変更してお試しください。
          </p>
          <Link 
            href="/terms" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            すべての用語を表示
          </Link>
        </div>
      )}
    </>
  )
}