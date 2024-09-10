import { Resource, ResourceTag } from "./types/resource" 
import { ResourceType } from "./types/resourceType"

export const resourceTypes: ResourceType[] = [
  { id: 1, name: "book", createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: "article", createdAt: new Date(), updatedAt: new Date() },
  { id: 3, name: "online course", createdAt: new Date(), updatedAt: new Date() },
  { id: 4, name: "website", createdAt: new Date(), updatedAt: new Date() },
]

export const resources: Resource[] = [
  {
    id: 1,
    name: "OrbStack",
    description: "OrbStack is a platform for building web3 products",
    resourceUrl: "https://orbstack.dev",
    resourceType: "website",
    resourceTypeId: String(4),
    imageUrl: "https://jimmyswebnote.com/wp-content/uploads/2024/04/00230-2048x1365.jpg",
    tags: [
      {
        id: 1,
        name: "container"
      },
      {
        id: 2,
        name: "docker"
      },
      {
        id: 3,
        name: "docker desktop"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "資料密集型應用系統設計",
    description: "在當今的系統設計中，資料是許多挑戰的中心。需要克服各種困難，如可擴展性、一致性、可靠性、效率和可維護性。我們有各式各樣的工具可以選擇，包括關聯式資料庫、NoSQL資料儲存、串流或批次處理機以及訊息中介，又該如何做出正確的選擇？如何理解所有這些熱門詞彙？ ",
    resourceUrl: "https://www.books.com.tw/products/0010892828",
    resourceType: "book",
    resourceTypeId: String(1),
    tags: [
      {
        id: 4,
        name: "database"
      },
      {
        id: 5,
        name: "data"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "React 思維進化",
    description: "React 本身的設計基於了許多程式領域的設計模式，而這些設計模式的概念大多都與「還沒有使用前端框架時的程式運作思維與習慣」相去甚遠。因此當你沒有真正理解這些設計模式時，你會覺得 React 的許多設計與行為都很不直覺甚至莫名其妙。並且，如果你不熟悉這些觀念或原理的話，則非常容易在實際開發時寫出有問題但卻不自知的程式碼，為專案的程式碼品質和軟體產品的可靠性埋下巨大的隱患。",
    resourceUrl: "https://www.books.com.tw/products/0010982322",
    resourceType: "book",
    resourceTypeId: String(1),
    tags: [
      {
        id: 6,
        name: "react"
      },
      {
        id: 7,
        name: "frontend"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "CORS 完全手冊",
    description: "",
    resourceUrl: "https://blog.huli.tw/2021/02/19/cors-guide-1",
    resourceType: "article",
    resourceTypeId: String(2),
    tags: [
      {
        id: 8,
        name: "cors"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const resourceTags: ResourceTag[] = [
  { id: 1, name: "container" },
  { id: 2, name: "docker" },
  { id: 3, name: "docker desktop" },
  { id: 4, name: "database" },
  { id: 5, name: "data" },
  { id: 6, name: "react" },
  { id: 7, name: "frontend" },
  { id: 8, name: "cors" },
]
