import axios from "axios";
import * as cheerio from "cheerio";
import { getPlayerUrl } from "./getPlayerUrl";
import { Folder3, Playlist } from "../types/playlist";
export default async function getInfo(origin:string,id: string ,ss?:undefined ,ep?:undefined ) {
  try {
    const playerUrl = await getPlayerUrl();
    console.log(`Player URL: ${playerUrl}`);
    const response = await axios.get(`${playerUrl}/play/${id}`, {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        DNT: "1",
        "sec-ch-ua":
          '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        Origin: "https://allmovieland.fun/",
        Referer: "https://google.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
      },
    });
    const $ = cheerio.load(response.data);
    // get last script tag
    const script = $("script").last().html()!;
    if (!script) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
    // get json data from script tag
    const content =
      script.match(/(\{[^;]+});/)?.[1] || script.match(/\((\{.*\})\)/)?.[1];
    if (!content) {
      return {
        success: false,
        message: "Media not found",
      };
    }
    const data = JSON.parse(content);

    const file = data["file"];
    const key = data["key"];
    const playlistRes = await axios.get(`${playerUrl}${file}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        Origin: process.env.BASE_URL,
        "X-Csrf-Token": key,
        Referer: `${process.env.BASE_URL}/play/${id}`,
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
      },
    });

    if (ss && ep ){
      const playlist:Playlist = playlistRes.data;
      const ssObj =  playlist.find(obj=> obj.id == ss  )
      if (ssObj){
        const epObj = ssObj.folder.find(obj => obj.episode == ep)
        if (epObj){
          const newEpObjArr = epObj.folder.map((obj:any)=>{
           
          obj['get'] = `${origin}/getStream?file=${encodeURIComponent(obj.file)}&key=${encodeURIComponent(key)}`
          return obj
          })
          return newEpObjArr
        }
      }
    }else{
      const  playList:Folder3[] =  playlistRes.data;
      const newArr = playList.map((obj)=>{
        obj['get'] = `${origin}/getStream?file=${encodeURIComponent(obj.file)}&key=${encodeURIComponent(key)}`
        return obj
      })
      return newArr
    }


    // return {
    //   success: true,
    //   data: {
    //     playlist,
    //     key,
    //   },
    // };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
