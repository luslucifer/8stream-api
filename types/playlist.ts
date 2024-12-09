export type Playlist = Root2[]

export interface Root2 {
  title: string
  id: string
  folder: Folder[]
}

export interface Folder {
  episode: string
  title: string
  id: string
  folder: [Folder2, Folder3, any[]]
  get?:string
}

export interface Folder2 {
  file: string
  end_tag: any
  title: string
  id: string
  get?:string
}

export interface Folder3 {
  file: string
  end_tag: any
  title: string
  id: string
  get?:string
}
