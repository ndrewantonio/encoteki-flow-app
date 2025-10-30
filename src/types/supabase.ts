// Partners
export interface PartnerResponse {
  id: number
  name: string
  deals: string
  subtopic: string
  image_url: string
  partner_url: string
  tnc: string
  type: string
}

// SDGs
export interface SDGResponse {
  id: number
  name: string
  sdg_number: number
  bg_color: string
  text_color: string
}

export interface FamilyResponse {
  id: number
  name: string
  image_url: string
  link?: string
}
