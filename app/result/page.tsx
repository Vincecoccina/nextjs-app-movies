"use client"
import MovieList from '@/components/MovieList'
import PageContainer from '@/components/PageContainer'
import { useSearch } from '@/hooks/useSearch';
import formatSlug from '@/utils/FormatSlug';
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function ResultPage() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const { data: movies, isFetching, refetch } = useSearch(search as string);

  useEffect(() => {
    refetch()
  }, [search]);

  return (
    <PageContainer>
        <main className="py-10 px-4">
        <div className="h-[50px] flex items center gap-3 mb-5">
            <h1 className="text-[25px] font-semibold text-black dark:text-slate-300 capitalize italic">
              {formatSlug(search as string)}
            </h1>
          </div>
          <MovieList movies={movies}/>
        </main>
    </PageContainer>
  )
}
