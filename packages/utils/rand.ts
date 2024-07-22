import { v4 as uuidv4 } from "uuid"

//使用uuid库生成uuid
export const generateUUID = (): string => {
  return uuidv4()
}
