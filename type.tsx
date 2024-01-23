import { Prisma } from "@prisma/client"

export type Category = {
    id : number,
    name : string,
    slug : string
}

export type Movie = {
    id: number,
    category: string,
    title: string,
    synopsis: string,
    year: string,
    country: string,
    director: string,
    casting: string,
    cover: string,
    hero: string,
    file: string,
    nbViews: number,
    nbComments: number,
    slug: string,
}

export type MovieWithCategory = Prisma.MovieGetPayload<{
    include: {cat: true}
}>

export type CommentWithUser = Prisma.CommentGetPayload<{
    include: {user: true}
}>