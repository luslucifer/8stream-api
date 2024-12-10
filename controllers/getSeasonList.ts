// import { Request, Response } from "express";
// import getInfo from "../lib/getInfo";

// export default async function getSeasonList(req: Request, res: Response) {
//   const { id } = req.query;
//   const protocol = req.protocol; // 'http' or 'https'
//   const host = req.get('host');  // e.g. 'localhost:3000'
//   const origin = `${protocol}://${host}`;
//   if (!id) {
//     return res.json({
//       success: false,
//       message: "Please provide a valid id",
//     });
//   }
//   try {
//     const mediaInfo = await getInfo(origin as string,id as string);
//     if (!mediaInfo.success) {
//       return res.json({ success: false, message: "Media not found" });
//     }
//     const playlist = mediaInfo?.data?.playlist;
//     // if series
//     const seasons: { season: string; totalEpisodes: number; lang: string[] }[] =
//       [];
//     if (playlist[0]?.title.includes("Season")) {
//       playlist.forEach((season: any, i: number) => {
//         let totalEpisodes = playlist[i]?.folder?.length;
//         let lang: string[] = [];
//         playlist[i]?.folder[0]?.folder?.forEach((item: any) => {
//           if (item?.title) lang.push(item.title);
//         });
//         seasons.push({
//           season: season.title,
//           totalEpisodes,
//           lang,
//         });
//       });
//       return res.json({
//         success: true,
//         data: { seasons, type: "tv" },
//       });
//     } else {
//       // if movie
//       let lang: string[] = [];
//       playlist?.forEach((item: any) => {
//         if (item?.title) lang.push(item.title);
//       });
//       return res.json({
//         success: true,
//         data: {
//           seasons: [
//             {
//               lang,
//             },
//           ],
//           type: "movie",
//         },
//       });
//     }
//   } catch (err) {
//     console.log("error: ", err);
//     res.json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// }
