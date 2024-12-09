export interface Tv {
    success: boolean
    data: Data
  }
  
  export interface Data {
    playlist: Playlist[]
    key: string
  }
  
  export interface Playlist {
    title: string
    id: string
    folder: Folder[]
  }
  
  export interface Folder {
    episode: string
    title: string
    id: string
    folder: [Folder2, Folder3, any[]]
  }
  
  export interface Folder2 {
    file: string
    end_tag: any
    title: string
    id: string
  }
  
  export interface Folder3 {
    file: string
    end_tag: any
    title: string
    id: string
  }
  