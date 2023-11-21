
import { YOUTUBE_API_KEY } from "@/constants/youtube.js";
import client from '@/http/client'

export function fetchYoutubeVideos({
  maxSizeItems,
  optionOfSort,
  query
}) {
 return client
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        key: YOUTUBE_API_KEY,
        q: query,
        type: "video",
        part: "snippet",
        chart: "mostPopular",
        order: optionOfSort,
        maxResults: maxSizeItems,
      },
    })
}